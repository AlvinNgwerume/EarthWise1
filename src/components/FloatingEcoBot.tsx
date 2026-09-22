import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  CalendarCheck, 
  Leaf, 
  RefreshCw,
  CheckCircle2,
  Clock,
  MapPin,
  Building,
  UserCheck,
  AlertTriangle,
  Minus,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { PageId } from '../types';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionType?: 'book' | 'whatsapp' | 'services' | 'quick-slot';
  quickSlots?: string[];
  bookingData?: {
    serviceId?: string;
    suburb?: string;
    fullName?: string;
    phone?: string;
    notes?: string;
  };
}

interface TriageState {
  pest: string | null;
  propertyType: string | null;
  suburb: string | null;
  urgency: 'Immediate threat' | 'General inspection' | 'Recurring service' | null;
  fullName: string | null;
  phone: string | null;
  email: string | null;
  phase: 1 | 2 | 3 | 4;
  leadSynced: boolean;
  referenceCode: string | null;
}

interface FloatingEcoBotProps {
  onOpenBookingModal: (
    serviceId?: string, 
    initialData?: { fullName?: string; phone?: string; email?: string; suburb?: string; notes?: string }
  ) => void;
  onNavigate: (page: PageId) => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-init-1',
    sender: 'bot',
    text: "Hello! I'm Eco-Bot 🌱, the virtual assistant for Earthwise Pest Management in Cape Town. We provide expert, eco-conscious pest guidance that is child-safe, pet-safe, and compliant with Act No. 36 of 1947 standards. What pest issue are you currently experiencing on your property?",
    timestamp: 'Just now',
    actionType: 'book'
  }
];

const SUGGESTED_QUESTIONS = [
  "Cockroaches in my kitchen",
  "Rodents or rats in the roof",
  "Are your treatments child-safe and pet-safe?",
  "Residential termite inspection",
  "Commercial kitchen pest assessment"
];

export const FloatingEcoBot: React.FC<FloatingEcoBotProps> = ({
  onOpenBookingModal,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSyncingLead, setIsSyncingLead] = useState(false);
  
  // Triage state tracking the 4 core tasks
  const [triage, setTriage] = useState<TriageState>({
    pest: null,
    propertyType: null,
    suburb: null,
    urgency: null,
    fullName: null,
    phone: null,
    email: null,
    phase: 1,
    leadSynced: false,
    referenceCode: null
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Extracts triage information from customer inputs
  const extractTriageData = (input: string, prev: TriageState): Partial<TriageState> => {
    const text = input.toLowerCase();
    const updates: Partial<TriageState> = {};

    // 1. Detect Pest Issue
    if (!prev.pest) {
      if (text.includes('rat') || text.includes('rodent') || text.includes('mice') || text.includes('mouse') || text.includes('dropping')) {
        updates.pest = 'Rats & Rodents';
      } else if (text.includes('cockroach') || text.includes('roach')) {
        updates.pest = 'Cockroaches';
      } else if (text.includes('termite') || text.includes('wood')) {
        updates.pest = 'Termites';
      } else if (text.includes('ant')) {
        updates.pest = 'Ants';
      } else if (text.includes('bedbug') || text.includes('bed bug') || text.includes('flea') || text.includes('bite')) {
        updates.pest = 'Bed Bugs & Fleas';
      } else if (text.includes('bird') || text.includes('pigeon') || text.includes('seagull')) {
        updates.pest = 'Bird Proofing';
      } else if (text.includes('bat')) {
        updates.pest = 'Bat Removal';
      } else if (text.includes('mole')) {
        updates.pest = 'Mole Treatment';
      } else if (text.includes('wasp') || text.includes('bee') || text.includes('hornet')) {
        updates.pest = 'Wasps & Bees';
      }
    }

    // 2. Detect Property Type & Suburb
    if (!prev.propertyType) {
      if (text.includes('house') || text.includes('home') || text.includes('residential') || text.includes('flat') || text.includes('apartment') || text.includes('cottage')) {
        updates.propertyType = 'Residential';
      } else if (text.includes('commercial') || text.includes('office') || text.includes('restaurant') || text.includes('hotel') || text.includes('warehouse') || text.includes('factory') || text.includes('kitchen') || text.includes('business')) {
        updates.propertyType = 'Commercial';
      }
    }

    if (!prev.suburb) {
      const primaryCapeTownSuburbs = [
        'City Bowl', 'Gardens', 'Camps Bay', 'Sea Point', 'Green Point', 'Atlantic Seaboard',
        'Claremont', 'Rondebosch', 'Newlands', 'Constantia', 'Southern Suburbs', 'Hout Bay',
        'Durbanville', 'Bellville', 'Northern Suburbs', 'Blouberg', 'Table View',
        'Somerset West', 'Helderberg', 'Strand', "Gordon's Bay", 'Pinelands', 'Kenilworth', 'Waterfront', 'Bantry Bay', 'Fresnaye'
      ];
      for (const s of primaryCapeTownSuburbs) {
        if (text.includes(s.toLowerCase())) {
          updates.suburb = s;
          break;
        }
      }
    }

    // 3. Detect Contact Details (Client Name and Phone/WhatsApp number)
    const phoneMatch = input.match(/(?:(?:\+27|0)\s*\d{2}\s*\d{3}\s*\d{4}|\d{10})/);
    if (phoneMatch && !prev.phone) {
      updates.phone = phoneMatch[0].replace(/\s+/g, '');
    }

    const emailMatch = input.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch && !prev.email) {
      updates.email = emailMatch[0];
    }

    if (!prev.fullName) {
      const nameMatch = input.match(/(?:i'm|im|i am|name is|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
      if (nameMatch && nameMatch[1]) {
        const candidate = nameMatch[1].trim();
        if (!['seeing', 'calling', 'looking', 'wondering', 'noticing', 'having', 'dealing'].includes(candidate.toLowerCase())) {
          updates.fullName = candidate;
        }
      }
    }

    return updates;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Compute updated triage state
    const triageUpdates = extractTriageData(text, triage);
    const updatedTriage: TriageState = { ...triage, ...triageUpdates };
    
    // Check phase progression based on gathered data (1: Pest -> 2: Property Type -> 3: Suburb -> 4: Contact & Handoff)
    let calculatedPhase: 1 | 2 | 3 | 4 = 1;
    if (updatedTriage.phone || (updatedTriage.fullName && updatedTriage.phone)) {
      calculatedPhase = 4;
    } else if (updatedTriage.suburb) {
      calculatedPhase = 4;
    } else if (updatedTriage.propertyType) {
      calculatedPhase = 3;
    } else if (updatedTriage.pest) {
      calculatedPhase = 2;
    }
    updatedTriage.phase = calculatedPhase;
    setTriage(updatedTriage);

    // Call server AI endpoint with fallback to instant local training engine
    let botReply = '';
    let action: 'book' | 'whatsapp' | 'services' | 'quick-slot' | undefined = 'book';
    let quickSlots: string[] | undefined;

    try {
      const historyPayload = messages.slice(-4).map(m => ({
        role: m.sender === 'bot' ? 'assistant' : 'user',
        content: m.text
      }));

      const res = await fetch('/api/bot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: text,
          history: historyPayload,
          triageData: updatedTriage
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          botReply = data.reply;
        }
      }
    } catch {
      // Offline / network failure: handled by local training engine
    }

    // If no server reply was obtained, run the local deterministic engine calibrated to Eco-Bot rules
    if (!botReply) {
      const lower = text.toLowerCase();

      // FAQ Guardrails (Concise under 3 sentences, 1 question at a time, Act No. 36 child/pet safe)
      if (lower.includes('pet') || lower.includes('child') || lower.includes('dog') || lower.includes('cat') || lower.includes('safe') || lower.includes('toxic') || lower.includes('chemical') || lower.includes('act 36')) {
        botReply = "All Earthwise treatments are child-safe, pet-safe, and environmentally responsible, fully compliant with Act No. 36 of 1947 standards. What specific pest issue are you currently experiencing?";
        action = 'book';
      }
      else if (lower.includes('cost') || lower.includes('price') || lower.includes('how much') || lower.includes('quote') || lower.includes('rate') || lower.includes('fee')) {
        botReply = "Our pricing is transparent and tailored to your property layout and pest severity following a brief assessment. What type of pest are you seeing on your property?";
        action = 'book';
      }
      else if (lower.includes('fast') || lower.includes('soon') || lower.includes('how quickly') || lower.includes('time') || lower.includes('emergency') || lower.includes('dispatch') || lower.includes('turnaround')) {
        botReply = "We provide rapid turnaround across Cape Town with same-day emergency dispatch and standard assessments within 24 to 48 hours. Is your property residential or commercial?";
        action = 'quick-slot';
        quickSlots = ['Residential property', 'Commercial property'];
      }
      // HANDOFF TRIGGER: Client provides phone number or contact details
      else if (updatedTriage.phone || (updatedTriage.fullName && updatedTriage.phone)) {
        const nameGreeting = updatedTriage.fullName ? `Thank you, ${updatedTriage.fullName}! ` : "Thank you! ";
        const summary = `Pest: ${updatedTriage.pest || 'Pest Assessment'} | Property: ${updatedTriage.propertyType || 'Residential'} | Location: ${updatedTriage.suburb || 'Cape Town'} | Contact: ${updatedTriage.phone}`;
        botReply = `${nameGreeting}An Earthwise technician will contact you shortly via WhatsApp or call to arrange your service assessment. Request Summary: ${summary}.`;
        action = 'book';
      }
      // Step 3: Suburb/Location provided -> Request Contact Details (Name & Phone/WhatsApp)
      else if (updatedTriage.suburb) {
        botReply = `We service ${updatedTriage.suburb} daily with Act No. 36 compliant, pet-safe solutions. Could you please provide your full name and phone or WhatsApp number so our technician can contact you?`;
        action = 'book';
      }
      // Step 2: Property Type provided -> Request Suburb/Location in Cape Town
      else if (updatedTriage.propertyType) {
        botReply = `Understood, we have specialized ${updatedTriage.propertyType.toLowerCase()} teams operating across Cape Town. Which suburb or area in Cape Town is the property located in?`;
        action = 'quick-slot';
        quickSlots = ['City Bowl / Atlantic Seaboard', 'Southern Suburbs', 'Northern Suburbs', 'Helderberg'];
      }
      // Step 1: Pest identified -> Request Property Type (Residential or Commercial)
      else if (updatedTriage.pest) {
        botReply = "Dealing with pests can be stressful, but our eco-conscious treatments resolve infestations safely for children and pets. Is this for a residential or commercial property?";
        action = 'quick-slot';
        quickSlots = ['Residential property', 'Commercial property'];
      }
      // Initial Entry Prompt
      else {
        botReply = "Hello! I am Eco-Bot, your virtual assistant for Earthwise Pest Management in Cape Town. What pest issue are you currently experiencing on your property?";
        action = 'book';
      }
    }

    // Auto-sync lead to HubSpot if name and phone are now available
    if (updatedTriage.phone && !updatedTriage.leadSynced) {
      triggerBackgroundLeadSync(updatedTriage);
    }

    // Push bot message to conversation
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: botReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionType: action,
      quickSlots,
      bookingData: {
        serviceId: mapPestToServiceId(updatedTriage.pest),
        suburb: updatedTriage.suburb || undefined,
        fullName: updatedTriage.fullName || undefined,
        phone: updatedTriage.phone || undefined,
        notes: `Eco-Bot Triage: Pest: ${updatedTriage.pest || 'Not specified'} | Type: ${updatedTriage.propertyType || 'Residential'} | Suburb: ${updatedTriage.suburb || 'Cape Town'} | Urgency: ${updatedTriage.urgency || 'Standard'}${updatedTriage.email ? ` | Email: ${updatedTriage.email}` : ''}`
      }
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  // Helper: map detected pest name to serviceId
  const mapPestToServiceId = (pest: string | null): string => {
    if (!pest) return 'cockroaches';
    const p = pest.toLowerCase();
    if (p.includes('rat') || p.includes('rodent') || p.includes('mice') || p.includes('mouse')) return 'rats-mice';
    if (p.includes('cockroach') || p.includes('roach') || p.includes('termite') || p.includes('silverfish')) return 'cockroaches';
    if (p.includes('ant')) return 'ants';
    if (p.includes('bird') || p.includes('pigeon') || p.includes('seagull')) return 'bird-proofing';
    if (p.includes('bedbug') || p.includes('bed bug') || p.includes('flea') || p.includes('mite')) return 'bedbugs-fleas';
    if (p.includes('wasp') || p.includes('bee') || p.includes('hornet')) return 'wasps-bees';
    return 'cockroaches';
  };

  // Syncs captured triage lead with server & HubSpot CRM
  const triggerBackgroundLeadSync = async (leadData: TriageState) => {
    setIsSyncingLead(true);
    try {
      const response = await fetch('/api/inspection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: leadData.fullName || 'Triage Prospect',
          phone: leadData.phone || '0821234567',
          email: leadData.email || `${(leadData.fullName || 'triage').toLowerCase().replace(/[^a-z0-9]/g, '') || 'client'}@lead.earthwise-pest.co.za`,
          serviceId: mapPestToServiceId(leadData.pest),
          suburb: leadData.suburb || 'City Bowl & CBD',
          propertyType: leadData.propertyType || 'Residential',
          message: `Eco-Bot Qualified Lead: Pest: ${leadData.pest || 'N/A'}, Suburb: ${leadData.suburb || 'N/A'}, Property: ${leadData.propertyType || 'Residential'}, Urgency: ${leadData.urgency || 'General'}.`,
          notes: `Eco-Bot Qualified Lead: Pest: ${leadData.pest || 'N/A'}, Suburb: ${leadData.suburb || 'N/A'}, Property: ${leadData.propertyType || 'Residential'}, Urgency: ${leadData.urgency || 'General'}.`,
          source: 'Eco-Bot AI Assistant'
        })
      });
      if (response.ok) {
        const resData = await response.json();
        setTriage(prev => ({
          ...prev,
          leadSynced: true,
          referenceCode: resData.reference || `EW-${Math.floor(10000 + Math.random() * 90000)}`
        }));
      }
    } catch (e) {
      console.warn('Background HubSpot lead sync deferred:', e);
    } finally {
      setIsSyncingLead(false);
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setTriage({
      pest: null,
      propertyType: null,
      suburb: null,
      urgency: null,
      fullName: null,
      phone: null,
      email: null,
      phase: 1,
      leadSynced: false,
      referenceCode: null
    });
  };

  const launchInspectionSurvey = (customNotes?: string) => {
    setIsOpen(false);
    onOpenBookingModal(mapPestToServiceId(triage.pest), {
      fullName: triage.fullName || undefined,
      phone: triage.phone || undefined,
      email: triage.email || undefined,
      suburb: triage.suburb || undefined,
      notes: customNotes || `Eco-Bot Qualified Lead: ${triage.pest || 'Pest Control'} for ${triage.propertyType || 'property'} in ${triage.suburb || 'Cape Town'}. Urgency: ${triage.urgency || 'General inspection'}.`
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          id="ecobot-launcher-btn"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group flex items-center bg-[#1B4332]/95 backdrop-blur-md hover:bg-[#132A20] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_10px_35px_rgba(27,67,50,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 border border-[#52B788]/60 cursor-pointer"
          aria-label="Open Eco-Bot Assistant"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52B788] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#52B788]"></span>
            </span>

            <div className="w-8 h-8 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white">
              <Bot className="w-5 h-5 text-[#52B788] group-hover:rotate-6 transition-transform" />
            </div>
          </div>

          <div className="hidden sm:flex flex-col text-left ml-3 pr-1">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-extrabold text-white leading-tight">
                Eco-Bot
              </span>
              <span className="text-[9px] bg-[#2D6A4F] text-[#52B788] font-bold px-1.5 py-0.2 rounded border border-[#52B788]/40">
                Active
              </span>
            </div>
            <span className="text-[10px] text-[#D8ECE0] leading-tight">
              Book property inspection
            </span>
          </div>
        </button>
      )}

      {/* Minimized Docked Bar */}
      {isOpen && isMinimized && (
        <div
          id="ecobot-minimized-bar"
          onClick={() => setIsMinimized(false)}
          className="group flex items-center justify-between bg-[#1B4332]/95 backdrop-blur-xl hover:bg-[#153427] text-white px-3.5 py-2.5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all duration-300 border border-[#52B788]/70 cursor-pointer w-[92vw] sm:w-[350px] select-none"
        >
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-xl bg-[#2D6A4F] flex items-center justify-center text-white border border-[#52B788]/40 shadow-xs">
                <Bot className="w-4 h-4 text-[#52B788]" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#52B788] rounded-full border-2 border-[#1B4332]"></span>
            </div>
            <div className="flex flex-col truncate text-left">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-white truncate">Eco-Bot</span>
                <span className="text-[9px] uppercase tracking-wider bg-[#52B788] text-[#1B4332] px-1.5 py-0.2 rounded font-extrabold">
                  Active
                </span>
              </div>
              <span className="text-[10px] text-[#D8ECE0]/90 truncate">
                Click to expand • Phase {triage.phase}/4
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
            <button
              id="ecobot-minimized-expand-btn"
              onClick={() => setIsMinimized(false)}
              className="p-1.5 rounded-lg text-[#D8ECE0] hover:text-white hover:bg-[#2D6A4F] transition-colors cursor-pointer"
              title="Expand chat"
              aria-label="Expand chat"
            >
              <Maximize2 className="w-4 h-4 text-[#52B788]" />
            </button>
            <button
              id="ecobot-minimized-close-btn"
              onClick={() => {
                setIsMinimized(false);
                setIsOpen(false);
                setIsMaximized(false);
              }}
              className="p-1.5 rounded-lg text-[#D8ECE0] hover:text-white hover:bg-[#2D6A4F] transition-colors cursor-pointer"
              title="Close chat"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && !isMinimized && (
        <div
          id="ecobot-chat-window"
          className={`bg-white/95 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_20px_60px_rgba(27,67,50,0.22)] flex flex-col overflow-hidden transition-all duration-300 ease-out z-50 ${
            isMaximized
              ? 'w-[96vw] sm:w-[840px] md:w-[940px] lg:w-[1020px] h-[88vh] max-h-[920px]'
              : 'w-[94vw] sm:w-[420px] h-[580px] max-h-[88vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#1B4332]/95 backdrop-blur-md text-white p-4 flex items-center justify-between border-b border-[#132A20] shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-[#2D6A4F] border border-[#52B788]/40 flex items-center justify-center text-white shadow-sm">
                  <Bot className="w-6 h-6 text-[#52B788]" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#52B788] border-2 border-[#1B4332] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm text-white">Eco-Bot</h3>
                  <span className="text-[9px] uppercase tracking-wider bg-[#52B788] text-[#1B4332] px-2 py-0.5 rounded-full font-extrabold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] inline-block"></span>
                    <span>Active</span>
                  </span>
                </div>
                <p className="text-[11px] text-[#D8ECE0]/90 flex items-center space-x-1">
                  <span>Eco-Friendly Pest Support</span>
                  <span>•</span>
                  <span>Cape Town</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                id="ecobot-reset-btn"
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 rounded-lg text-[#D8ECE0] hover:text-white hover:bg-[#2D6A4F] transition-colors cursor-pointer"
                aria-label="Restart chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Minimize Toggle Button */}
              <button
                id="ecobot-minimize-btn"
                onClick={() => setIsMinimized(true)}
                title="Minimize chat"
                className="p-1.5 rounded-lg text-[#D8ECE0] hover:text-white hover:bg-[#2D6A4F] transition-colors cursor-pointer"
                aria-label="Minimize chat"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Maximize / Expand / Restore Toggle Button */}
              <button
                id="ecobot-maximize-btn"
                onClick={() => setIsMaximized(!isMaximized)}
                title={isMaximized ? "Restore standard view" : "Maximize / Expand chat"}
                className="p-1.5 rounded-lg text-[#D8ECE0] hover:text-white hover:bg-[#2D6A4F] transition-colors cursor-pointer"
                aria-label={isMaximized ? "Restore standard view" : "Maximize / Expand chat"}
              >
                {isMaximized ? (
                  <Minimize2 className="w-4 h-4 text-[#52B788]" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              {/* Close Button */}
              <button
                id="ecobot-close-btn"
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                  setIsMaximized(false);
                }}
                className="p-1.5 rounded-lg text-[#D8ECE0] hover:text-white hover:bg-[#2D6A4F] transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Window Body Container */}
          <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
            {/* Main Chat Pane */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0">
              {/* Messages Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAFCFB]">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                          isBot
                            ? 'bg-white text-[#1B4332] border border-[#E2E8F0] shadow-xs'
                            : 'bg-[#1B4332] text-white font-medium'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Quick Slot Options if bot proposes inspection times */}
                        {isBot && msg.quickSlots && msg.quickSlots.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] space-y-1.5">
                            <span className="text-[10px] font-bold text-[#4A5568] uppercase tracking-wider block">
                              Select Inspection Window:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.quickSlots.map((slot, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => {
                                    if (slot.toLowerCase().includes('schedule custom') || slot.toLowerCase().includes('custom survey')) {
                                      launchInspectionSurvey(`Preferred Schedule: Custom Survey Date requested from digital dispatch`);
                                    } else {
                                      handleSendMessage(slot);
                                    }
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg bg-[#F4F7F5] hover:bg-[#E2EFE7] border border-[#CBD5E1] text-[#1B4332] text-[11px] font-semibold transition-all hover:scale-102 active:scale-98 flex items-center space-x-1 cursor-pointer"
                                >
                                  <Clock className="w-3 h-3 text-[#52B788]" />
                                  <span>{slot}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Primary Booking Call-To-Action inside Bot Replies */}
                        {isBot && (
                          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => launchInspectionSurvey()}
                              className="px-3 py-1.5 rounded-xl bg-[#1B4332] hover:bg-[#132A20] text-white text-[11px] font-bold flex items-center space-x-1.5 transition-all shadow-xs hover:scale-102 cursor-pointer"
                            >
                              <CalendarCheck className="w-3.5 h-3.5 text-[#52B788]" />
                              <span>Book On-Site Property Inspection</span>
                            </button>

                            <a
                              href="https://wa.me/27622118851?text=Hello%20Earthwise%20Pest%20Management%2C%20I%20am%20chatting%20with%20the%20Eco-Bot%20and%20need%20to%20schedule%20an%20urgent%20property%20inspection."
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold flex items-center space-x-1 transition-all shadow-xs"
                              title="WhatsApp Urgent Dispatch (+27 62 211 8851)"
                            >
                              <Phone className="w-3 h-3 text-white" />
                              <span>WhatsApp Dispatch</span>
                            </a>
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-[#A0AEC0] mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl border border-[#E2E8F0] w-20 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#52B788] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#52B788] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#52B788] animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Lead Sync Status pill if captured */}
              {triage.leadSynced && (
                <div className="bg-[#E2EFE7] px-4 py-1.5 border-t border-[#52B788]/40 flex items-center justify-between text-[11px] text-[#1B4332] shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" />
                    <span>Inspection Lead Synced to Dispatch {triage.referenceCode && `(${triage.referenceCode})`}</span>
                  </div>
                  <button
                    onClick={() => launchInspectionSurvey()}
                    className="font-bold underline text-[10px] hover:text-[#2D6A4F] cursor-pointer"
                  >
                    Review Booking Form
                  </button>
                </div>
              )}

              {/* Quick Prompts Carousel Matching the Training Framework */}
              <div className="p-2.5 bg-white border-t border-[#E2E8F0] space-y-1.5 shrink-0">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-[#4A5568] px-1">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-[#52B788]" />
                    <span>Quick Inquiries & Booking:</span>
                  </span>
                  <span className="text-[#52B788]">Click to send</span>
                </div>
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="whitespace-nowrap text-[11px] bg-[#F4F7F5] hover:bg-[#EAF4EE] text-[#1B4332] px-2.5 py-1 rounded-full border border-[#D8ECE0] font-medium transition-colors shrink-0 cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-[#E2E8F0] flex items-center space-x-2 shrink-0"
              >
                <input
                  type="text"
                  placeholder="Ask about pest issue, pricing, or book inspection..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-xs text-[#1B4332]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-[#1B4332] hover:bg-[#132A20] disabled:opacity-40 text-white transition-all cursor-pointer shadow-xs"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Pane: Live Dispatch & Inspection Control Desk (Active when Maximized on md+) */}
            {isMaximized && (
              <div className="hidden md:flex flex-col w-72 lg:w-80 border-l border-[#E2E8F0] bg-[#F8FAF9] p-4 overflow-y-auto space-y-4 shrink-0 text-left">
                {/* Dispatch Qualification Status */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#D8ECE0] shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1B4332] flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#52B788]" />
                      <span>Live Triage Lead File</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#52B788] bg-[#E2EFE7] px-2 py-0.5 rounded-full font-bold">
                      HubSpot Sync
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start justify-between p-2 rounded-xl bg-[#F4F7F5] border border-[#E2E8F0]">
                      <div className="flex items-center space-x-2 text-[#4A5568]">
                        <ShieldCheck className={`w-3.5 h-3.5 ${triage.pest ? 'text-[#52B788]' : 'text-[#64748B]'}`} />
                        <span className="font-medium text-[11px]">Pest Issue:</span>
                      </div>
                      <span className={`text-[11px] font-bold ${triage.pest ? 'text-[#1B4332]' : 'text-[#64748B] italic'}`}>
                        {triage.pest || 'Pending'}
                      </span>
                    </div>

                    <div className="flex items-start justify-between p-2 rounded-xl bg-[#F4F7F5] border border-[#E2E8F0]">
                      <div className="flex items-center space-x-2 text-[#4A5568]">
                        <Building className={`w-3.5 h-3.5 ${triage.propertyType ? 'text-[#52B788]' : 'text-[#64748B]'}`} />
                        <span className="font-medium text-[11px]">Environment:</span>
                      </div>
                      <span className={`text-[11px] font-bold ${triage.propertyType ? 'text-[#1B4332]' : 'text-[#64748B] italic'}`}>
                        {triage.propertyType || 'Pending'}
                      </span>
                    </div>

                    <div className="flex items-start justify-between p-2 rounded-xl bg-[#F4F7F5] border border-[#E2E8F0]">
                      <div className="flex items-center space-x-2 text-[#4A5568]">
                        <MapPin className={`w-3.5 h-3.5 ${triage.suburb ? 'text-[#52B788]' : 'text-[#64748B]'}`} />
                        <span className="font-medium text-[11px]">Cape Suburb:</span>
                      </div>
                      <span className={`text-[11px] font-bold ${triage.suburb ? 'text-[#1B4332]' : 'text-[#64748B] italic'}`}>
                        {triage.suburb || 'Pending'}
                      </span>
                    </div>

                    <div className="flex items-start justify-between p-2 rounded-xl bg-[#F4F7F5] border border-[#E2E8F0]">
                      <div className="flex items-center space-x-2 text-[#4A5568]">
                        <UserCheck className={`w-3.5 h-3.5 ${triage.fullName && triage.phone ? 'text-[#52B788]' : 'text-[#64748B]'}`} />
                        <span className="font-medium text-[11px]">Client Contact:</span>
                      </div>
                      <span className={`text-[11px] font-bold truncate max-w-[120px] ${triage.fullName && triage.phone ? 'text-[#1B4332]' : 'text-[#64748B] italic'}`}>
                        {triage.fullName ? `${triage.fullName} (${triage.phone || 'Phone pending'})` : 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] text-[#4A5568]">
                      <span>Triage Stage</span>
                      <span className="font-bold text-[#1B4332]">Phase {triage.phase} of 4</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#52B788] transition-all duration-300"
                        style={{ width: `${(triage.phase / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Inspection Booking CTA Card */}
                <div className="bg-[#1B4332] text-white p-4 rounded-2xl border border-[#132A20] shadow-sm space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#52B788] text-[11px] font-extrabold uppercase tracking-wider">
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Priority Dispatch</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      Book On-Site Property Inspection
                    </h4>
                    <p className="text-[11px] text-[#D8ECE0]/90 leading-relaxed">
                      Technicians dispatched in 24–48 hours across Greater Cape Town. Comprehensive on-site property evaluation and exact quote.
                    </p>
                  </div>

                  <button
                    id="ecobot-maximized-book-btn"
                    onClick={() => launchInspectionSurvey()}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#52B788] hover:bg-[#40916C] text-[#1B4332] hover:text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Open Booking Form</span>
                  </button>
                </div>

                {/* Emergency Contacts */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] space-y-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#718096] block">
                    Direct Dispatch Channels
                  </span>
                  <a
                    href="https://wa.me/27622118851?text=Hello%20Earthwise%20Pest%20Management%2C%20I%20need%20urgent%20dispatch%20for%20a%20pest%20inspection."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp (+27 62 211 8851)</span>
                  </a>
                  <a
                    href="tel:+27622118851"
                    className="w-full py-2 px-3 rounded-xl bg-[#F4F7F5] hover:bg-[#E2E8F0] text-[#1B4332] text-xs font-bold flex items-center justify-center space-x-2 transition-all border border-[#CBD5E1]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#1B4332]" />
                    <span>Direct Line: +27 62 211 8851</span>
                  </a>
                </div>

                {/* Eco & Safety Guardrails */}
                <div className="p-3 bg-[#E2EFE7]/50 rounded-xl border border-[#52B788]/30 space-y-1.5 text-[10px] text-[#1B4332]">
                  <div className="font-bold flex items-center space-x-1.5 text-[#1B4332]">
                    <Leaf className="w-3.5 h-3.5 text-[#52B788]" />
                    <span>Earthwise Safety Guarantee</span>
                  </div>
                  <p className="text-[#4A5568] leading-tight">
                    Targeted treatments that are 100% safe for domestic pets and children once dry. Registered SAPCA pest control specialists.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
