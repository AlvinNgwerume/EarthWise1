import React, { useState } from 'react';
import { PageId } from '../types';
import { SERVICES_DATA, SUBURB_COVERAGE } from '../data/earthwiseData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  MessageSquare, 
  User, 
  Home, 
  AlertCircle,
  CalendarCheck,
  ExternalLink,
  FileSpreadsheet
} from 'lucide-react';
import { getAccessToken } from '../services/googleAuth';
import { appendLeadToGoogleSheet } from '../services/googleSheets';
import { validateContactForm } from '../utils/validation';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
  onOpenGoogleSheets?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenBookingModal, onOpenGoogleSheets }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceId: 'cockroaches',
    suburb: 'City Bowl & CBD',
    propertyType: 'Residential',
    message: ''
  });

  // Spam protection: honeypot trap & timing
  const [honeypotCheck, setHoneypotCheck] = useState('');
  const [formLoadedAt] = useState<number>(() => Date.now());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setValidationErrors({});

    const validation = validateContactForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    });

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setErrorMessage('Please check the highlighted fields before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          website_check_hp: honeypotCheck,
          submission_duration: Date.now() - formLoadedAt,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const refCode = data.reference || `EW-${Math.floor(1000 + Math.random() * 9000)}`;
        setSubmittedRef(refCode);

        // Also asynchronously append to connected Google Sheet if authenticated
        getAccessToken().then(async (token) => {
          if (token) {
            try {
              await appendLeadToGoogleSheet(token, {
                reference: refCode,
                fullName: formData.fullName,
                phone: formData.phone,
                email: formData.email,
                suburb: formData.suburb,
                service: formData.serviceId,
                propertyType: formData.propertyType,
                source: 'Contact Form Inquiry',
                notes: formData.message,
              });
            } catch (sheetErr) {
              console.warn('Google Sheet append error from contact form:', sheetErr);
            }
          }
        });

        // Open live calendar in a new tab on confirmed submission while keeping confirmation visible
        try {
          const link = document.createElement('a');
          link.href = 'https://calendar.app.google/Joc3dfkudXDNvmSJ8';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch {
          // Keep confirmation visible on screen
        }
      } else {
        if (data.errors) {
          setValidationErrors(data.errors);
        }
        setErrorMessage(data.message || 'There was an issue processing your request. Please check the form.');
      }
    } catch {
      setErrorMessage('Unable to reach the dispatch server right now. Please try again or call/WhatsApp +27 62 211 8851.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F4F7F5] to-[#FFFFFF] pt-12 pb-14 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#F4F7F5] text-[#1B4332] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D8ECE0]">
            <Phone className="w-3.5 h-3.5 text-[#52B788]" />
            <span>Direct Cape Town Dispatch</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif-italic font-bold text-[#1B4332]">
            Let's breathe life back into your space.
          </h1>

          <p className="text-[#4A5568] text-base max-w-2xl mx-auto leading-relaxed">
            Reach our team directly or request a same-day property assessment across Greater Cape Town.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Form + HQ Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
            
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">
                Immediate Enquiry
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-italic font-bold text-[#1B4332]">
                Request a Custom Service Proposal
              </h2>
            </div>

            {submittedRef ? (
              <div className="bg-[#F4F7F5]/90 border border-[#D8ECE0] rounded-2xl p-6 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#1B4332] text-white mx-auto flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-7 h-7 text-[#52B788]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif-italic text-[#1B4332]">
                    Enquiry Logged Successfully!
                  </h3>
                  <p className="text-xs text-[#4A5568] mt-1">
                    Booking Reference: <strong className="text-[#1B4332] font-mono">{submittedRef}</strong>
                  </p>
                  <p className="text-xs text-[#4A5568] max-w-sm mx-auto mt-2">
                    Thank you, {formData.fullName}. An Earthwise Cape Town technician will review your request and call you shortly.
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <a
                    href="https://calendar.app.google/Joc3dfkudXDNvmSJ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332] transition-colors inline-flex items-center space-x-1.5 shadow-2xs"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#52B788]" />
                    <span>Calendar Booking</span>
                    <ExternalLink className="w-3 h-3 text-white/80" />
                  </a>
                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setErrorMessage(null);
                      setValidationErrors({});
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        serviceId: 'cockroaches',
                        suburb: 'City Bowl & CBD',
                        propertyType: 'Residential',
                        message: ''
                      });
                    }}
                    className="px-5 py-2 rounded-xl bg-[#1B4332] text-white text-xs font-bold hover:bg-[#132A20] transition-colors cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot Spam Trap (Hidden from genuine users) */}
                <div 
                  style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }} 
                  aria-hidden="true"
                >
                  <label htmlFor="contact_website_check_hp">Company Website Url</label>
                  <input
                    id="contact_website_check_hp"
                    type="text"
                    name="website_check_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypotCheck}
                    onChange={(e) => setHoneypotCheck(e.target.value)}
                  />
                </div>
                {errorMessage && (
                  <div className="bg-red-50/90 backdrop-blur-xs border border-red-200 rounded-xl p-3.5 text-xs text-red-700 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (validationErrors.fullName) setValidationErrors(prev => ({ ...prev, fullName: '' }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${validationErrors.fullName ? 'border-red-500' : 'border-[#CBD5E1]'} bg-white/90 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-sm text-[#4A5568] transition-all`}
                    />
                    {validationErrors.fullName && (
                      <p className="text-[11px] text-red-600">{validationErrors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="082 555 1234"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (validationErrors.phone) setValidationErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${validationErrors.phone ? 'border-red-500' : 'border-[#CBD5E1]'} bg-white/90 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-sm text-[#4A5568] transition-all`}
                    />
                    {validationErrors.phone && (
                      <p className="text-[11px] text-red-600">{validationErrors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <Mail className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@domain.co.za"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (validationErrors.email) setValidationErrors(prev => ({ ...prev, email: '' }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${validationErrors.email ? 'border-red-500' : 'border-[#CBD5E1]'} bg-white/90 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-sm text-[#4A5568] transition-all`}
                    />
                    {validationErrors.email && (
                      <p className="text-[11px] text-red-600">{validationErrors.email}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Required Service</span>
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-sm text-[#4A5568] bg-white/90 transition-all cursor-pointer"
                    >
                      {SERVICES_DATA.map((svc) => (
                        <option key={svc.id} value={svc.id}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Suburb */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Suburb</span>
                    </label>
                    <select
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-sm text-[#4A5568] bg-white/90 transition-all cursor-pointer"
                    >
                      {SUBURB_COVERAGE.map((sub) => (
                        <option key={sub.name} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Property Description / Observations</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please share details about your pest concerns, roof cavity status, or property size..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white/90 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-sm text-[#4A5568] transition-all resize-none"
                    />
                  </div>

                </div>

                {/* Open Live Calendar Integration Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#F4F7F5] via-[#EBF3EE] to-[#F4F7F5] border border-[#D8ECE0] flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <CalendarCheck className="w-4 h-4 text-[#52B788]" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-[#1B4332]">Open Live Calendar</span>
                        <span className="text-[9px] bg-[#1B4332] text-white px-1.5 py-0.2 rounded-full font-mono">LIVE SYNC</span>
                      </div>
                      <p className="text-[11px] text-[#4A5568] leading-tight">
                        Select real-time inspection slots directly on Google Calendar.
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://calendar.app.google/Joc3dfkudXDNvmSJ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#1B4332] hover:bg-[#1B4332] hover:text-white text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer"
                    title="Open live Google Calendar in new tab"
                  >
                    <span>Live Calendar</span>
                    <ExternalLink className="w-3 h-3 text-[#52B788]" />
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer group"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#1B4332]/30 border-t-[#1B4332] rounded-full animate-spin" />
                      <span>Connecting to Live Calendar...</span>
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="w-4 h-4 text-[#1B4332] group-hover:scale-110 transition-transform" />
                      <span>Calendar Booking</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#52B788]" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#4A5568]">
                  Logs your proposal assessment request & opens Google Calendar.
                </p>
              </form>
            )}

          </div>

          {/* HQ & Support Details Side */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#1B4332]/95 backdrop-blur-xl text-white rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
              <h2 className="text-2xl font-serif-italic font-bold text-white">
                Cape Town Headquarters
              </h2>

              <div className="space-y-4 text-xs text-[#D8ECE0]">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-[#52B788] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Physical Address</h4>
                    <p className="text-[#D8ECE0]/80 mt-0.5">7 Buzad Road, Pelican Park, Cape Town, 7941</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-[#52B788] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Direct Phone Line</h4>
                    <a href="tel:+27622118851" className="text-[#52B788] hover:underline font-bold block mt-0.5">
                      +27 62 211 8851
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-[#52B788] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Email Correspondence</h4>
                    <a href="mailto:hello@earthwisepestmanagement.co.za" className="text-[#D8ECE0] hover:text-white block mt-0.5">
                      hello@earthwisepestmanagement.co.za
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-[#52B788] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Operational Hours</h4>
                    <p className="text-[#D8ECE0]/80 mt-0.5">Mon - Sat: 07:00 – 18:00</p>
                    <span className="inline-block mt-1 text-[10px] bg-[#2D6A4F] text-[#52B788] px-2 py-0.5 rounded font-bold border border-[#52B788]/30">
                      24/7 Emergency Dispatch Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rapid Callout Alert Box */}
            <div className="glass-card rounded-3xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center space-x-2 text-[#1B4332]">
                <AlertCircle className="w-5 h-5 text-[#1B4332]" />
                <h3 className="font-bold text-base font-serif-italic">Active Infestation Emergency?</h3>
              </div>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                If you have an urgent rodent breach, roof rat swarm, or aggressive wasp nest, call our priority mobile response team immediately for same-day dispatch.
              </p>
              <a
                href="tel:+27622118851"
                className="w-full py-3 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm flex items-center justify-center space-x-2 shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-[#1B4332]" />
                <span>Call Emergency Line Now (+27 62 211 8851)</span>
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
