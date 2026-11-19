import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import nodemailer from "nodemailer";
import { Client as HubSpotClient } from "@hubspot/api-client";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { escapeHtml } from "./src/utils/validation";
import { extractTriageUpdates } from "./src/utils/triageLogic";

const app = express();
const PORT = 3000;

// Trust reverse proxy (Google Cloud Run / Nginx)
app.enable("trust proxy");

// ---------------------------------------------------------------------------
// Security Middleware: Force HTTPS in production & Security Headers
// ---------------------------------------------------------------------------
app.use((req: Request, res: Response, next) => {
  const forwardedProto = req.headers["x-forwarded-proto"];
  
  // Force HTTPS when running in production behind reverse proxy
  if (forwardedProto && forwardedProto === "http" && process.env.NODE_ENV === "production") {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }

  // Security Headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  if (req.secure || forwardedProto === "https") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  next();
});

// ---------------------------------------------------------------------------
// Rate Limiting (Spam & Abuse Protection)
// ---------------------------------------------------------------------------
interface RateLimitBucket {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitBucket>();

function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = rateLimitMap.get(key);

  if (!bucket || now > bucket.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (bucket.count >= limit) {
    return true;
  }

  bucket.count += 1;
  return false;
}

// 1. CORS Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2. Body-parsing Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ---------------------------------------------------------------------------
// Input Validation Helper
// ---------------------------------------------------------------------------
interface ContactSubmissionPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  serviceId?: string;
  suburb?: string;
  propertyType?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  notes?: string;
  source?: string;
}

function validateSubmissionPayload(body: any): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const isBotSource = Boolean(
    body.source?.toString().toLowerCase().includes("bot") ||
    body.isBotLead
  );

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (!fullName) {
    if (!isBotSource) errors.fullName = "Full name is required.";
  } else if (fullName.length < 2 && !isBotSource) {
    errors.fullName = "Full name must be at least 2 characters long.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    if (!isBotSource) errors.email = "Email address is required.";
  } else if (!emailRegex.test(email) && !isBotSource) {
    errors.email = "Please enter a valid email address.";
  }

  if (!phone) {
    if (!isBotSource) errors.phone = "Phone number is required.";
  } else if (phone.length < 7 && !isBotSource) {
    errors.phone = "Please enter a valid phone number.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// 1. HubSpot Integration via Private Access Token
// ---------------------------------------------------------------------------
async function syncToHubSpot(data: ContactSubmissionPayload, refCode: string) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_PRIVATE_APP_TOKEN;

  if (!token) {
    console.warn("⚠️ HubSpot Access Token missing in process.env. Skipping CRM sync.");
    return { synced: false, status: "Skipped - HUBSPOT_ACCESS_TOKEN not configured" };
  }

  try {
    const hubspotClient = new HubSpotClient({ accessToken: token });

    const nameParts = (data.fullName || "").trim().split(" ");
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";
    const fullNotes = data.message || data.notes || "No message provided";

    const contactProperties = {
      email: data.email,
      firstname,
      lastname,
      phone: data.phone || "",
      city: "Cape Town",
      state: "Western Cape",
      hs_content_membership_notes: `[Ref: ${refCode}] Suburb: ${data.suburb || "N/A"} | Service: ${data.serviceId || "N/A"} | Property: ${data.propertyType || "N/A"} | Notes: ${fullNotes}`,
      message: fullNotes,
    };

    // Attempt to create contact or update if exists
    let contactId: string | undefined;
    try {
      const createResponse = await hubspotClient.crm.contacts.basicApi.create({
        properties: contactProperties,
        associations: [],
      });
      contactId = createResponse.id;
    } catch (createErr: any) {
      // If contact already exists (HTTP 409 conflict), search for it and update
      if (createErr.code === 409 || createErr.status === 409 || (createErr.body && createErr.body.category === "CONFLICT")) {
        console.log("Contact exists in HubSpot. Searching to update...");
        const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: "email",
                  operator: "EQ" as any,
                  value: data.email,
                },
              ],
            },
          ],
          sorts: [],
          properties: ["email"],
          limit: 1,
          after: "0",
        });

        if (searchResponse.results && searchResponse.results.length > 0) {
          contactId = searchResponse.results[0].id;
          await hubspotClient.crm.contacts.basicApi.update(contactId, {
            properties: {
              firstname,
              lastname,
              phone: data.phone || "",
              hs_content_membership_notes: contactProperties.hs_content_membership_notes,
            },
          });
        }
      } else {
        throw createErr;
      }
    }

    // Optionally attach a note timeline engagement to the contact
    if (contactId) {
      try {
        await hubspotClient.crm.objects.notes.basicApi.create({
          properties: {
            hs_timestamp: new Date().toISOString(),
            hs_note_body: `📥 <strong>New Pest Control Enquiry [${escapeHtml(refCode)}]</strong><br/>
              <b>Name:</b> ${escapeHtml(data.fullName || "")}<br/>
              <b>Email:</b> ${escapeHtml(data.email || "")}<br/>
              <b>Phone:</b> ${escapeHtml(data.phone || "")}<br/>
              <b>Service:</b> ${escapeHtml(data.serviceId || "Eco-Treatments")}<br/>
              <b>Suburb:</b> ${escapeHtml(data.suburb || "Cape Town")}<br/>
              <b>Property Type:</b> ${escapeHtml(data.propertyType || "Residential")}<br/>
              ${data.preferredDate ? `<b>Preferred Date:</b> ${escapeHtml(data.preferredDate)} (${escapeHtml(data.preferredTime || "Anytime")})<br/>` : ""}
              <b>Notes/Message:</b> ${escapeHtml(fullNotes)}`,
          },
          associations: [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: "HUBSPOT_DEFINED" as any,
                  associationTypeId: 202, // Note to Contact association
                },
              ],
            },
          ],
        });
      } catch (noteErr) {
        console.warn("Could not attach note to HubSpot contact, contact was still created/updated:", noteErr);
      }
    }

    console.log(`✅ Successfully synced contact to HubSpot (ID: ${contactId || "Created"})`);
    return { synced: true, contactId, status: "Successfully synced to HubSpot CRM" };
  } catch (error: any) {
    console.error("❌ HubSpot CRM Sync Error:", error?.response?.body || error?.message || error);
    return { synced: false, error: error?.message || "HubSpot API Error" };
  }
}

// ---------------------------------------------------------------------------
// 2. Personal Email Notification System via Nodemailer
// ---------------------------------------------------------------------------
async function sendNotificationEmail(data: ContactSubmissionPayload, refCode: string) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notificationRecipient = process.env.NOTIFICATION_EMAIL || smtpUser || "hello@earthwisepestmanagement.co.za";

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("⚠️ SMTP Credentials missing in environment variables. Skipping Nodemailer dispatch.");
    return { sent: false, status: "Skipped - SMTP credentials not configured in environment" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587/25
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const fullMessage = data.message || data.notes || "N/A";
    const safeFullName = escapeHtml(data.fullName || "Valued Customer");
    const safeEmail = escapeHtml(data.email || "");
    const safePhone = escapeHtml(data.phone || "");
    const safeService = escapeHtml(data.serviceId || "General Eco-Pest Protocol");
    const safeSuburb = escapeHtml(data.suburb || "Cape Town");
    const safePropertyType = escapeHtml(data.propertyType || "Residential");
    const safePreferredDate = data.preferredDate ? escapeHtml(data.preferredDate) : "";
    const safePreferredTime = escapeHtml(data.preferredTime || "Morning");
    const safeMessageHtml = escapeHtml(fullMessage).replace(/\n/g, "<br/>");
    const cleanReplyTo = (data.email || "").replace(/[\r\n]/g, "").trim();
    const cleanSubjectName = (data.fullName || "Customer").replace(/[\r\n]/g, " ").trim();
    const cleanSubjectSuburb = (data.suburb || "Cape Town").replace(/[\r\n]/g, " ").trim();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f4; color: #162019; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #dcdfdc; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background-color: #1E3A2B; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 4px 0 0 0; font-size: 13px; color: #86C29B; }
          .badge { display: inline-block; background: #E8EFEA; color: #1E3A2B; font-weight: bold; padding: 4px 12px; border-radius: 12px; font-size: 12px; margin-bottom: 12px; }
          .content { padding: 24px; }
          .data-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          .data-table th, .data-table td { text-align: left; padding: 12px; border-bottom: 1px solid #eef0ee; font-size: 14px; }
          .data-table th { background-color: #f8faf8; color: #1E3A2B; font-weight: 600; width: 35%; }
          .message-box { background: #f8faf8; border-left: 4px solid #1E3A2B; padding: 16px; border-radius: 4px; margin-top: 20px; font-size: 14px; line-height: 1.5; color: #2e3d32; }
          .footer { background: #f4f6f4; text-align: center; padding: 16px; font-size: 12px; color: #6b7280; border-top: 1px solid #eef0ee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">Reference: ${escapeHtml(refCode)}</span>
            <h1>New Pest Control Enquiry Received</h1>
            <p>Cape Town Professional Pest Control & Ceiling Services</p>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>A new customer submission has been recorded on the Earthwise Pest Control website. Details below:</p>
            
            <table class="data-table">
              <tr>
                <th>Full Name</th>
                <td><strong>${safeFullName}</strong></td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td><a href="tel:${safePhone}">${safePhone}</a></td>
              </tr>
              <tr>
                <th>Requested Service</th>
                <td>${safeService}</td>
              </tr>
              <tr>
                <th>Suburb / Zone</th>
                <td>${safeSuburb}</td>
              </tr>
              <tr>
                <th>Property Type</th>
                <td>${safePropertyType}</td>
              </tr>
              ${safePreferredDate ? `
              <tr>
                <th>Preferred Window</th>
                <td>${safePreferredDate} (${safePreferredTime})</td>
              </tr>
              ` : ""}
            </table>

            <div class="message-box">
              <strong>Property Description / Customer Notes:</strong><br/>
              ${safeMessageHtml}
            </div>
          </div>
          <div class="footer">
            Automated Dispatch Notification • Earthwise Cape Town • CRM Synced
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Earthwise Dispatch" <${smtpUser}>`,
      to: notificationRecipient,
      replyTo: cleanReplyTo || undefined,
      subject: `🚨 [${refCode}] New Enquiry from ${cleanSubjectName} - ${cleanSubjectSuburb}`,
      html: htmlContent,
      text: `New Enquiry [Ref: ${refCode}]\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.serviceId}\nSuburb: ${data.suburb}\nProperty: ${data.propertyType}\nMessage: ${fullMessage}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email notification sent to ${notificationRecipient} (MessageID: ${info.messageId})`);

    // Optional confirmation email to client
    if (cleanReplyTo) {
      try {
        await transporter.sendMail({
          from: `"Earthwise Pest Control" <${smtpUser}>`,
          to: cleanReplyTo,
          subject: `Your Pest Control Request Confirmation [Ref: ${refCode}]`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; max-width: 500px; color: #162019;">
              <h2 style="color: #1E3A2B;">Thank you for contacting Earthwise Pest Control, ${safeFullName}!</h2>
              <p>We have logged your request under reference number <strong>${escapeHtml(refCode)}</strong>.</p>
              <p>A senior technician from our Cape Town team will review your suburb (${safeSuburb}) and service protocol and get in touch with you shortly.</p>
              <br/>
              <p style="font-size: 12px; color: #666;">Earthwise Pest Control & Ceiling Services Cape Town</p>
            </div>
          `,
        });
      } catch (clientMailErr) {
        console.warn("Client acknowledgement email failed, main notification succeeded:", clientMailErr);
      }
    }

    return { sent: true, messageId: info.messageId, recipient: notificationRecipient };
  } catch (error: any) {
    console.error("❌ Nodemailer Email Error:", error);
    return { sent: false, error: error?.message || "Failed to send email via SMTP" };
  }
}

// ---------------------------------------------------------------------------
// API Endpoint: POST /api/contact & /api/inspection
// ---------------------------------------------------------------------------
const handleSubmission = async (req: Request, res: Response) => {
  try {
    const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "unknown_client";

    // 1. Spam & Rate Limiting Check: Max 10 submissions per 5 minutes per IP
    if (isRateLimited(`submit_${clientIp}`, 10, 5 * 60 * 1000)) {
      return res.status(429).json({
        success: false,
        message: "Too many submission attempts detected. Please wait a few minutes before trying again.",
      });
    }

    // 2. Honeypot Spam Trap Check
    // If hidden fields are populated, silently acknowledge without forwarding to CRM or SMTP
    const honeypotVal = req.body.website_check_hp || req.body.company_url_hp || req.body.address_hp;
    if (typeof honeypotVal === "string" && honeypotVal.trim().length > 0) {
      console.warn(`🛡️ Honeypot spam trap triggered from ${clientIp}. Silent discard.`);
      return res.status(200).json({
        success: true,
        reference: `EW-${Math.floor(10000 + Math.random() * 90000)}`,
        message: "Enquiry submitted and processed successfully.",
      });
    }

    // 3. Automated Speed Trap (if submission occurred < 900ms from form load)
    const submissionDuration = Number(req.body.submission_duration);
    if (submissionDuration && submissionDuration > 0 && submissionDuration < 900) {
      console.warn(`🛡️ Sub-second bot submission detected (${submissionDuration}ms) from ${clientIp}. Silent discard.`);
      return res.status(200).json({
        success: true,
        reference: `EW-${Math.floor(10000 + Math.random() * 90000)}`,
        message: "Enquiry submitted and processed successfully.",
      });
    }

    // 4. Input Validation
    const { isValid, errors } = validateSubmissionPayload(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Input validation failed. Please check required fields.",
        errors,
      });
    }

    const payload: ContactSubmissionPayload = {
      fullName: req.body.fullName || (req.body.source?.includes("Bot") ? "Chatbot Prospect" : "Valued Customer"),
      email: req.body.email || (req.body.source?.includes("Bot") ? `bot-lead-${Date.now()}@lead.earthwise-pest.co.za` : "hello@earthwisepestmanagement.co.za"),
      phone: req.body.phone || "Awaiting phone in triage",
      serviceId: req.body.serviceId || req.body.service || "eco-treatments",
      suburb: req.body.suburb || "City Bowl & CBD",
      propertyType: req.body.propertyType || "Residential",
      preferredDate: req.body.preferredDate,
      preferredTime: req.body.preferredTime,
      message: req.body.message || req.body.notes || "",
      notes: req.body.notes || req.body.message || "",
      source: req.body.source || "Website Form",
    };

    const refCode = `EW-${Math.floor(10000 + Math.random() * 90000)}`;

    // 5. Perform HubSpot CRM Sync and Nodemailer in parallel
    const [hubspotResult, emailResult] = await Promise.all([
      syncToHubSpot(payload, refCode),
      sendNotificationEmail(payload, refCode),
    ]);

    return res.status(200).json({
      success: true,
      reference: refCode,
      message: "Enquiry submitted and processed successfully.",
      hubspot: hubspotResult,
      email: emailResult,
      dataReceived: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        suburb: payload.suburb,
      },
    });
  } catch (err: any) {
    console.error("Server API handler error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error processing form submission.",
      error: err?.message || "Unknown error",
    });
  }
};

app.post("/api/contact", handleSubmission);
app.post("/api/inspection", handleSubmission);
app.post("/api/book-inspection", handleSubmission);
app.post("/api/leads", handleSubmission);

// ---------------------------------------------------------------------------
// Earthwise Digital Dispatch: AI Bot Training Framework Implementation
// ---------------------------------------------------------------------------
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

const BOT_SYSTEM_PROMPT = `You are Eco-Bot, the virtual assistant for Earthwise Pest Management in Cape Town, South Africa. The objective is to provide expert, eco-conscious guidance and collect qualified lead details for pest control service assessments.

BRAND VOICE & COMPLIANCE:
1. Tone: Professional, reassuring, eco-conscious, and efficient.
2. Compliance: Emphasize child-safe, pet-safe, and environmentally responsible methods compliant with Act No. 36 of 1947 standards.
3. Conciseness: Keep responses under 3 sentences. Ask only ONE question at a time to maintain natural conversation.
4. Primary Suburbs Covered: Cape Town City Bowl, Atlantic Seaboard, Southern Suburbs, Northern Suburbs, and Helderberg.

QUALIFICATION & LEAD CAPTURE WORKFLOW:
Systematically collect the following four datapoints:
1. Pest Type (e.g., cockroaches, rodents/rats, ants, bedbugs, fleas, termites, wasps).
2. Property Type (Residential or Commercial).
3. Suburb / Area in Cape Town.
4. Contact Details (Client Name and Phone/WhatsApp number).

BOOKING & LINK DIRECTIVE:
- When a customer asks to view available inspection dates, book an appointment, or choose a time slot, provide the direct booking link:
  "You can view open inspection slots and select a date directly on our calendar here: https://calendar.app.google/Joc3dfkudXDNvmSJ8"
- If the user prefers to share their details directly in chat instead of clicking the link, request their Phone/WhatsApp number and Suburb so an Earthwise technician can confirm the inspection slot with them directly.

HANDOFF TRIGGER:
Once contact details or a booking request are submitted, confirm that an Earthwise field technician will reach out via WhatsApp/call shortly to confirm the property inspection details.`;

// Fallback deterministic response generator strictly matching Eco-Bot workflow & handoff rules
function generateDeterministicDispatchResponse(
  userText: string,
  _history: Array<{ role: 'user' | 'assistant'; content: string }>,
  currentTriage: {
    pest?: string | null;
    propertyType?: string | null;
    suburb?: string | null;
    name?: string | null;
    fullName?: string | null;
    phone?: string | null;
    email?: string | null;
    phase?: number;
  } = {}
) {
  const text = userText.toLowerCase();
  const prevState = {
    pest: currentTriage.pest || null,
    propertyType: currentTriage.propertyType || null,
    suburb: currentTriage.suburb || null,
    fullName: currentTriage.fullName || currentTriage.name || null,
    phone: currentTriage.phone || null,
    email: currentTriage.email || null,
  };
  const updates = extractTriageUpdates(userText, prevState);
  const nextTriage = { ...prevState, ...updates };

  // 1. HANDOFF TRIGGER: Once contact details or a booking request are submitted
  if (updates.phone || (updates.fullName && nextTriage.phone)) {
    const greeting = nextTriage.fullName ? `Thank you, ${nextTriage.fullName}! ` : "Thank you! ";
    return {
      text: `${greeting}An Earthwise field technician will reach out via WhatsApp or call shortly to confirm the property inspection details.`,
      actionType: "book",
      suggestedNext: "Thank you, noted",
      phase: 4
    };
  }

  // 2. BOOKING & LINK DIRECTIVE: When customer asks to view available inspection dates, book an appointment, or choose a time slot
  if (
    text.includes("book") ||
    text.includes("calendar") ||
    text.includes("slot") ||
    text.includes("date") ||
    text.includes("appointment") ||
    text.includes("schedule") ||
    text.includes("available inspection") ||
    text.includes("open inspection") ||
    text.includes("time slot")
  ) {
    return {
      text: "You can view open inspection slots and select a date directly on our calendar here: https://calendar.app.google/Joc3dfkudXDNvmSJ8\nIf you prefer to share your details directly in chat instead of clicking the link, what is your Phone/WhatsApp number and Suburb so an Earthwise technician can confirm the inspection slot with you directly?",
      actionType: "calendar",
      suggestedNext: "082 123 4567, City Bowl",
      calendarLink: "https://calendar.app.google/Joc3dfkudXDNvmSJ8",
      phase: 4
    };
  }

  // 3. Safety / Pet / Child Compliance FAQ (Act No. 36 of 1947)
  if (text.includes("pet") || text.includes("child") || text.includes("dog") || text.includes("cat") || text.includes("safe") || text.includes("toxic") || text.includes("chemical") || text.includes("act 36")) {
    return {
      text: "All Earthwise treatments are child-safe, pet-safe, and environmentally responsible, compliant with Act No. 36 of 1947 standards. What specific pest issue are you currently experiencing on your property?",
      actionType: "book",
      suggestedNext: "I have an issue with rodents",
      phase: currentTriage.phase || 1
    };
  }

  // 4. Cost / Pricing FAQ
  if (text.includes("cost") || text.includes("price") || text.includes("how much") || text.includes("quote") || text.includes("rate") || text.includes("fee")) {
    return {
      text: "Our pricing is transparent and tailored to your property layout and pest severity following a brief assessment. What type of pest are you currently experiencing on your property?",
      actionType: "book",
      suggestedNext: "Cockroaches in the kitchen",
      phase: currentTriage.phase || 1
    };
  }

  // 5. Speed / Turnaround FAQ
  if (text.includes("how fast") || text.includes("how soon") || text.includes("dispatch") || text.includes("emergency") || text.includes("turnaround") || text.includes("arrival") || text.includes("urgent")) {
    return {
      text: "We provide rapid turnaround times across Cape Town with same-day emergency dispatch and routine inspections within 24 to 48 hours. Is your property residential or commercial?",
      actionType: "book",
      suggestedNext: "Residential property",
      phase: 2
    };
  }

  // 6. Suburb / Area in Cape Town provided -> Request Contact Details (Datapoint 4)
  if (updates.suburb || (nextTriage.suburb && !nextTriage.phone)) {
    const formattedSuburb = nextTriage.suburb || "Cape Town";
    return {
      text: `We service ${formattedSuburb} daily with Act No. 36 compliant, pet-safe methods. Could you please provide your Client Name and Phone/WhatsApp number so an Earthwise technician can confirm your service assessment?`,
      actionType: "book",
      suggestedNext: "Sarah, 082 123 4567",
      phase: 4
    };
  }

  // 7. Property Type provided (Residential or Commercial) -> Request Suburb / Area in Cape Town (Datapoint 3)
  if (updates.propertyType || (nextTriage.propertyType && !nextTriage.suburb)) {
    const pType = (nextTriage.propertyType || "Residential").toLowerCase();
    return {
      text: `Understood, we have dedicated ${pType} teams across Cape Town. Which suburb or area in Cape Town is the property located in?`,
      actionType: "book",
      suggestedNext: "City Bowl / Atlantic Seaboard",
      phase: 3
    };
  }

  // 8. Pest Type provided -> Request Property Type (Datapoint 2)
  if (updates.pest || (nextTriage.pest && !nextTriage.propertyType)) {
    return {
      text: "Our eco-conscious treatments resolve infestations safely for children and pets compliant with Act No. 36 standards. Is this for a residential or commercial property?",
      actionType: "book",
      suggestedNext: "Residential property",
      phase: 2
    };
  }

  // Initial Entry Greeting
  return {
    text: "Hello! I am Eco-Bot, the virtual assistant for Earthwise Pest Management in Cape Town. We provide expert, eco-conscious guidance compliant with Act No. 36 of 1947 standards. What pest issue are you currently experiencing on your property?",
    actionType: "book",
    suggestedNext: "Cockroaches in the kitchen",
    phase: 1
  };
}

// POST /api/bot/chat - Trained Dispatcher Chat Endpoint
app.post("/api/bot/chat", async (req: Request, res: Response) => {
  try {
    const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "unknown_client";

    // Rate limiting: Max 35 chat requests per minute per IP
    if (isRateLimited(`chat_${clientIp}`, 35, 60 * 1000)) {
      return res.status(429).json({
        error: "Too many messages sent. Please wait a moment before sending another message.",
        reply: "You're sending messages a bit fast. Please take a moment and feel free to call our dispatch desk directly at +27 62 211 8851.",
      });
    }

    const { userMessage, history = [], triageData = {} } = req.body;

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ error: "userMessage is required" });
    }

    const ai = getGenAI();

    // If Gemini API Key is available, use gemini-3.8-flash with the trained prompt
    if (ai) {
      try {
        const chatMessages = [
          ...history.map((h: any) => ({
            role: h.role === "assistant" || h.role === "bot" ? "model" : "user",
            parts: [{ text: h.content || h.text || "" }],
          })),
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ];

        const geminiPromise = ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: chatMessages,
          config: {
            systemInstruction: BOT_SYSTEM_PROMPT,
            temperature: 0.4,
          },
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Gemini API call timed out")), 8000)
        );

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);
        const replyText = response?.text || "";
        if (replyText.trim()) {
          return res.json({
            reply: replyText.trim(),
            source: "gemini-trained-dispatch",
            actionType: "book",
            status: "Active",
            trainingStage: "Active",
          });
        }
      } catch (geminiErr: any) {
        console.log("Gemini dispatch fallback invoked:", geminiErr?.message || "fallback");
      }
    }

    // Deterministic fallback calibrated to Eco-Bot workflow & guardrails
    const result = generateDeterministicDispatchResponse(userMessage, history, triageData);
    return res.json({
      reply: result.text,
      source: "rule-calibrated-dispatch",
      actionType: result.actionType,
      suggestedNext: result.suggestedNext,
      calendarLink: (result as any).calendarLink,
      phase: result.phase,
      status: "Active",
      trainingStage: "Active",
    });
  } catch (error: any) {
    console.error("Bot chat API error:", error);
    return res.status(500).json({
      error: "Failed to process chat message",
      message: error?.message,
    });
  }
});

// GET /api/bot/status & /api/bot/training-status
const handleBotStatus = (req: Request, res: Response) => {
  res.json({
    status: "Active",
    botName: "Eco-Bot",
    frameworkName: "Earthwise Eco-Bot Virtual Assistant",
    version: "4.0-eco-bot",
    persona: "Eco-Bot, Virtual Assistant for Earthwise Pest Management in Cape Town",
    tone: "Professional, reassuring, eco-conscious, and efficient",
    compliance: "Act No. 36 of 1947 standards (child-safe, pet-safe, environmentally responsible)",
    primarySuburbs: ["Cape Town City Bowl", "Atlantic Seaboard", "Southern Suburbs", "Northern Suburbs", "Helderberg"],
    bookingLink: "https://calendar.app.google/Joc3dfkudXDNvmSJ8",
    coreTasks: [
      "1. Pest Type (e.g., cockroaches, rodents/rats, ants, bedbugs, fleas, termites, wasps)",
      "2. Property Type (Residential or Commercial)",
      "3. Suburb / Area in Cape Town",
      "4. Contact Details (Client Name and Phone/WhatsApp number)"
    ],
    behaviorRules: [
      "Keep responses under 3 sentences",
      "Ask only ONE question at a time to maintain natural conversation",
      "Provide calendar link (https://calendar.app.google/Joc3dfkudXDNvmSJ8) for appointment or inspection slot inquiries",
      "Once contact details or booking request are submitted, confirm Earthwise field technician will reach out via WhatsApp/call shortly"
    ],
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY)
  });
};

app.get("/api/bot/status", handleBotStatus);
app.get("/api/bot/training-status", handleBotStatus);

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    hubspotConfigured: Boolean(process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_PRIVATE_APP_TOKEN),
    nodemailerConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
  });
});

// Explicit SEO Routes for robots.txt and sitemap.xml
app.get("/robots.txt", (req: Request, res: Response) => {
  res.type("text/plain");
  res.send("User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://earthwise-pest.co.za/sitemap.xml\n");
});

app.get("/sitemap.xml", (req: Request, res: Response) => {
  res.type("application/xml");
  res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
});

// ---------------------------------------------------------------------------
// Vite Middleware / Static Server Setup
// ---------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Earthwise Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
