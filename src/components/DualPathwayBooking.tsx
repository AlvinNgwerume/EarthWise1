import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  ExternalLink, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  MapPin, 
  Lock,
  FileSpreadsheet,
  Send,
  User as UserIcon,
  Mail,
  Home
} from 'lucide-react';
import { getAccessToken, subscribeToAuth } from '../services/googleAuth';
import { appendLeadToGoogleSheet, getStoredSpreadsheetId, getStoredSpreadsheetUrl } from '../services/googleSheets';
import type { User } from 'firebase/auth';

const LIVE_CALENDAR_URL = 'https://calendar.app.google/Joc3dfkudXDNvmSJ8';
const WHATSAPP_URL = 'https://wa.me/27622118851?text=Hello%20Earthwise%20Pest%20Management%2C%20I%20would%20like%20a%20free%205-minute%20telephonic%20assessment%20for%20my%20property.';
const PHONE_NUMBER = '+27 62 211 8851';
const PHONE_HREF = 'tel:+27622118851';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const CAPE_TOWN_SUBURBS = [
  'City Bowl & CBD',
  'Atlantic Seaboard (Camps Bay, Clifton, Sea Point)',
  'Southern Suburbs (Constantia, Claremont, Rondebosch)',
  'Northern Suburbs (Durbanville, Bellville, Century City)',
  'South Peninsula (Hout Bay, Simon\'s Town, Noordhoek)',
  'West Coast & Blouberg (Table View, Milnerton, Big Bay)',
  'Winelands & Helderberg (Stellenbosch, Somerset West, Paarl)',
];

interface DualPathwayBookingProps {
  isModal?: boolean;
  onCloseModal?: () => void;
  preselectedServiceId?: string;
  initialData?: {
    fullName?: string;
    phone?: string;
    email?: string;
    suburb?: string;
    notes?: string;
  };
  onOpenGoogleSheets?: () => void;
}

export const DualPathwayBooking: React.FC<DualPathwayBookingProps> = ({
  isModal = false,
  onCloseModal,
  preselectedServiceId,
  initialData,
  onOpenGoogleSheets,
}) => {
  const [activeTab, setActiveTab] = useState<'onsite' | 'phone'>('onsite');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [redirecting, setRedirecting] = useState<string | null>(null);

  // Google Workspace connection state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [hasStoredSheet, setHasStoredSheet] = useState<boolean>(() => Boolean(getStoredSpreadsheetId()));

  // Calendar slot selection & lead capture form state
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    `${today.getDate()} ${MONTH_NAMES[today.getMonth()]} ${today.getFullYear()}`
  );

  const [leadForm, setLeadForm] = useState({
    fullName: initialData?.fullName || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    suburb: initialData?.suburb || 'City Bowl & CBD',
    service: preselectedServiceId || 'eco-treatments',
    preferredTime: 'Morning Slot (08:00 - 12:00)',
    propertyType: 'Residential',
    notes: initialData?.notes || '',
  });

  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [submittedLeadRef, setSubmittedLeadRef] = useState<string | null>(null);
  const [sheetSyncStatus, setSheetSyncStatus] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToAuth((user, token) => {
      setCurrentUser(user);
      setGoogleToken(token);
      setHasStoredSheet(Boolean(getStoredSpreadsheetId()));
    });
    return () => unsub();
  }, []);

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startingDayIndex = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (dayNum: number) => {
    const dateStr = `${dayNum} ${MONTH_NAMES[month]} ${year}`;
    setSelectedDateStr(dateStr);
  };

  const openGoogleCalendarDirect = (slotLabel?: string) => {
    setRedirecting(slotLabel || 'Live Calendar');
    try {
      const link = document.createElement('a');
      link.href = LIVE_CALENDAR_URL;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = LIVE_CALENDAR_URL;
    }
    if (onCloseModal) {
      setTimeout(onCloseModal, 400);
    }
    setTimeout(() => {
      setRedirecting(null);
    }, 2000);
  };

  const handleCaptureLeadAndSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!leadForm.fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!leadForm.phone.trim() && !leadForm.email.trim()) {
      setValidationError('Please provide at least a phone number or email address for dispatch.');
      return;
    }

    setIsSubmittingLead(true);
    const refCode = `EW-${Math.floor(10000 + Math.random() * 90000)}`;

    const leadRecord = {
      reference: refCode,
      fullName: leadForm.fullName.trim(),
      phone: leadForm.phone.trim(),
      email: leadForm.email.trim(),
      suburb: leadForm.suburb,
      service: leadForm.service,
      preferredDate: selectedDateStr,
      preferredTime: leadForm.preferredTime,
      propertyType: leadForm.propertyType,
      source: 'Calendar Booking Form',
      notes: leadForm.notes,
    };

    let syncedToGoogleSheet = false;

    // 1. Google Sheets Live Capture
    try {
      const token = googleToken || (await getAccessToken());
      if (token) {
        await appendLeadToGoogleSheet(token, leadRecord);
        syncedToGoogleSheet = true;
        setSheetSyncStatus('Logged directly to Google Sheets!');
      } else {
        // Queue in localStorage for pending sync when owner logs in
        try {
          const existingQueue = JSON.parse(localStorage.getItem('earthwise_pending_leads') || '[]');
          existingQueue.push({ ...leadRecord, queuedAt: new Date().toISOString() });
          localStorage.setItem('earthwise_pending_leads', JSON.stringify(existingQueue));
        } catch {
          // Ignore storage errors
        }
      }
    } catch (sheetErr: any) {
      console.warn('Google Sheets append error (graceful fallback):', sheetErr);
    }

    // 2. Server API fallback storage & HubSpot sync
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: leadRecord.fullName,
          phone: leadRecord.phone || '+27 00 000 0000',
          email: leadRecord.email || 'calendar-lead@earthwisepestmanagement.co.za',
          suburb: leadRecord.suburb,
          serviceId: leadRecord.service,
          preferredDate: leadRecord.preferredDate,
          preferredTime: leadRecord.preferredTime,
          propertyType: leadRecord.propertyType,
          source: 'Calendar Booking Form',
          notes: `${leadRecord.notes ? leadRecord.notes + ' | ' : ''}Slot Selected: ${leadRecord.preferredDate} (${leadRecord.preferredTime})${syncedToGoogleSheet ? ' [Google Sheets Logged]' : ''}`,
        }),
      });
    } catch (serverErr) {
      console.warn('Server lead backup notice:', serverErr);
    }

    setSubmittedLeadRef(refCode);
    setIsSubmittingLead(false);

    // 3. Open Live Google Calendar appointment slot picker in new tab
    openGoogleCalendarDirect(selectedDateStr);
  };

  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  return (
    <div className={`w-full ${isModal ? 'space-y-3' : 'space-y-5'}`}>
      
      {/* Component Header with Google Sheets Status Badge */}
      <div className="text-center max-w-2xl mx-auto space-y-1.5">
        <div className="flex items-center justify-center space-x-2 flex-wrap gap-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-[#F4F7F5] border border-[#D8ECE0] text-[#1B4332] px-3 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#52B788]" />
            <span>Inspection & Calendar Dispatch</span>
          </div>

          {/* Google Sheets Live Status Indicator */}
          {onOpenGoogleSheets && (
            <button
              type="button"
              onClick={onOpenGoogleSheets}
              className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer shadow-2xs ${
                currentUser && googleToken
                  ? 'bg-[#EAF4EE] text-[#1B4332] border-[#52B788]/60 hover:bg-[#d8ece0]'
                  : 'bg-white text-[#4A5568] border-[#CBD5E1] hover:border-[#1B4332] hover:text-[#1B4332]'
              }`}
              title="Google Sheets Lead Hub"
            >
              <FileSpreadsheet className="w-3 h-3 text-[#52B788]" />
              <span>{currentUser && googleToken ? 'Google Sheets Live' : 'Connect Google Sheets'}</span>
            </button>
          )}
        </div>

        {(preselectedServiceId || initialData?.notes) && (
          <div className="pt-1">
            <span className="inline-flex items-center space-x-1.5 bg-[#EAF4EE] border border-[#D8ECE0] text-[#1B4332] px-3 py-1 rounded-full text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#52B788]" />
              <span>
                {initialData?.notes
                  ? initialData.notes.replace(/^Inquiry (regarding|referencing) (field study|case study): /i, '')
                  : `Selected Focus: ${preselectedServiceId.replace(/-/g, ' ').toUpperCase()}`}
              </span>
            </span>
          </div>
        )}

        <p className="text-xs text-[#4A5568] leading-relaxed max-w-lg mx-auto">
          Choose on-site dispatch to log your inspection into our Google Sheets schedule, or speak to our technical team in 5 minutes.
        </p>
      </div>

      {/* Mobile Switcher */}
      <div className="flex lg:hidden items-center p-1 bg-[#F4F7F5] rounded-xl border border-[#D8ECE0] max-w-sm mx-auto shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab('onsite')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeTab === 'onsite'
              ? 'bg-[#1B4332] text-white shadow-xs'
              : 'text-[#4A5568] hover:text-[#1B4332]'
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5 text-[#52B788]" />
          <span>On-Site Inspection</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('phone')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeTab === 'phone'
              ? 'bg-[#1B4332] text-white shadow-xs'
              : 'text-[#4A5568] hover:text-[#1B4332]'
          }`}
        >
          <Phone className="w-3.5 h-3.5 text-[#52B788]" />
          <span>Free Telephonic</span>
        </button>
      </div>

      {/* Split-View Grid: Calendar Lead Capture + Phone Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
        
        {/* ================================================================= */}
        {/* PATH 1: ON-SITE INSPECTION & GOOGLE SHEETS CALENDAR CAPTURE       */}
        {/* ================================================================= */}
        <div 
          className={`lg:col-span-7 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#1B4332] shadow-md p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-200 ${
            activeTab === 'onsite' ? 'block' : 'hidden lg:flex'
          }`}
        >
          {/* Priority Dispatch Ribbon */}
          <div className="absolute top-0 right-0 bg-[#1B4332] text-white px-3 py-0.5 rounded-bl-xl text-[10px] font-extrabold uppercase tracking-wider flex items-center space-x-1 shadow-xs">
            <Zap className="w-3 h-3 text-[#52B788] fill-[#52B788]" />
            <span>Priority Dispatch</span>
          </div>

          <div className="space-y-3">
            
            {/* Header / Pathway Title */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#2D6A4F] bg-[#EAF4EE] px-2 py-0.5 rounded-full border border-[#D8ECE0]">
                  <ShieldCheck className="w-3 h-3 text-[#52B788]" />
                  <span>Commercial & Residential</span>
                </div>
                <span className="text-[10px] text-[#52B788] font-bold flex items-center space-x-1">
                  <FileSpreadsheet className="w-3 h-3" />
                  <span>Google Sheets Sync</span>
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif-italic font-bold text-[#1B4332]">
                Calendar Booking & On-Site Inspection
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Select your preferred inspection date, confirm property details, and sync directly to our technicians' Google Sheet schedule.
              </p>
            </div>

            {/* Submission Success Confirmation Banner */}
            {submittedLeadRef ? (
              <div className="bg-[#EAF4EE] border border-[#52B788]/60 rounded-2xl p-4 text-center space-y-2 animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-[#1B4332] text-white mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#52B788]" />
                </div>
                <h4 className="font-bold text-sm text-[#1B4332]">Lead Recorded & Slot Reserved!</h4>
                <p className="text-xs text-[#2D6A4F]">
                  Reference Code: <strong className="font-mono">{submittedLeadRef}</strong>
                </p>
                <p className="text-[11px] text-[#4A5568]">
                  Target Date: <strong>{selectedDateStr}</strong> ({leadForm.preferredTime})
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openGoogleCalendarDirect(selectedDateStr)}
                    className="px-4 py-2 rounded-xl bg-[#1B4332] text-white text-xs font-bold flex items-center space-x-1.5 shadow-2xs hover:bg-[#132A20]"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#52B788]" />
                    <span>Re-open Google Calendar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmittedLeadRef(null)}
                    className="px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white text-[#1B4332] text-xs font-semibold hover:bg-gray-50"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Clickable Calendar Module */}
                <div className="bg-[#F4F7F5] rounded-xl p-3 border border-[#D8ECE0] space-y-2 shadow-2xs">
                  
                  {/* Calendar Month Header */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs sm:text-sm font-bold text-[#1B4332]">
                        {MONTH_NAMES[month]} {year}
                      </span>
                      <span className="text-[9px] bg-[#1B4332] text-white px-1.5 py-0.2 rounded-full font-mono font-bold">
                        LIVE
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 rounded bg-white hover:bg-[#E2E8F0] text-[#1B4332] transition-colors border border-[#D8ECE0] cursor-pointer"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 rounded bg-white hover:bg-[#E2E8F0] text-[#1B4332] transition-colors border border-[#D8ECE0] cursor-pointer"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Days Header */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {DAY_NAMES.map((day) => (
                      <span key={day} className="text-[10px] font-bold text-[#4A5568]/80 py-0.5">
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startingDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-6 sm:h-7" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const dateString = `${dayNum} ${MONTH_NAMES[month]} ${year}`;
                      const isSelected = selectedDateStr === dateString;
                      const isToday = isCurrentMonth && dayNum === todayDate;
                      const dayOfWeek = (startingDayIndex + i) % 7;
                      const isSunday = dayOfWeek === 6;
                      const isPast = isCurrentMonth && dayNum < todayDate;

                      return (
                        <button
                          key={`day-${dayNum}`}
                          type="button"
                          onClick={() => handleSelectDay(dayNum)}
                          disabled={isPast}
                          className={`h-6 sm:h-7 rounded-md text-[11px] font-semibold flex flex-col items-center justify-center relative transition-all duration-150 cursor-pointer ${
                            isPast 
                              ? 'text-gray-300 cursor-not-allowed bg-transparent'
                              : isSelected
                              ? 'bg-[#1B4332] text-white shadow-xs font-bold ring-2 ring-[#52B788]'
                              : isToday
                              ? 'bg-[#EAF4EE] text-[#1B4332] font-bold border border-[#52B788]'
                              : isSunday
                              ? 'text-[#718096] bg-white/70 hover:bg-[#1B4332] hover:text-white border border-[#E2E8F0]'
                              : 'bg-white hover:bg-[#1B4332] hover:text-white text-[#1B4332] border border-[#CBD5E1]/60 shadow-2xs hover:shadow-xs'
                          }`}
                          title={`Select ${dayNum} ${MONTH_NAMES[month]}`}
                        >
                          <span className="leading-none">{dayNum}</span>
                          {!isPast && (
                            <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-[#52B788]' : isToday ? 'bg-[#1B4332]' : 'bg-[#2D6A4F]/60'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[11px] text-[#1B4332] font-semibold pt-1 flex items-center justify-between border-t border-[#D8ECE0]">
                    <span>Selected Date: <strong>{selectedDateStr}</strong></span>
                    <span className="text-[10px] text-[#718096]">Click any date to pick</span>
                  </div>
                </div>

                {/* Integrated Lead Capture Form into Google Sheets */}
                <form onSubmit={handleCaptureLeadAndSchedule} className="space-y-3 pt-1">
                  
                  {validationError && (
                    <div className="p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs">
                      {validationError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <UserIcon className="w-3.5 h-3.5 text-[#52B788] absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          required
                          value={leadForm.fullName}
                          onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                          placeholder="e.g. David van der Merwe"
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#CBD5E1] bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4332] text-xs text-[#1B4332]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-[#52B788] absolute left-2.5 top-2.5" />
                        <input
                          type="tel"
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="e.g. 082 123 4567"
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#CBD5E1] bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4332] text-xs text-[#1B4332]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-[#52B788] absolute left-2.5 top-2.5" />
                        <input
                          type="email"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="client@example.co.za"
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#CBD5E1] bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4332] text-xs text-[#1B4332]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                        Cape Town Suburb
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-[#52B788] absolute left-2.5 top-2.5" />
                        <select
                          value={leadForm.suburb}
                          onChange={(e) => setLeadForm({ ...leadForm, suburb: e.target.value })}
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#CBD5E1] bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4332] text-xs text-[#1B4332] appearance-none"
                        >
                          {CAPE_TOWN_SUBURBS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                        Preferred Arrival Window
                      </label>
                      <select
                        value={leadForm.preferredTime}
                        onChange={(e) => setLeadForm({ ...leadForm, preferredTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4332] text-xs text-[#1B4332]"
                      >
                        <option value="Morning Slot (08:00 - 12:00)">Morning Slot (08:00 - 12:00)</option>
                        <option value="Afternoon Slot (12:00 - 16:00)">Afternoon Slot (12:00 - 16:00)</option>
                        <option value="Late Afternoon (16:00 - 18:00)">Late Afternoon (16:00 - 18:00)</option>
                        <option value="Emergency Same-Day First Available">Emergency Same-Day First Available</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                        Property Footprint
                      </label>
                      <div className="relative">
                        <Home className="w-3.5 h-3.5 text-[#52B788] absolute left-2.5 top-2.5" />
                        <select
                          value={leadForm.propertyType}
                          onChange={(e) => setLeadForm({ ...leadForm, propertyType: e.target.value })}
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#CBD5E1] bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4332] text-xs text-[#1B4332] appearance-none"
                        >
                          <option value="Residential House / Townhouse">Residential House / Townhouse</option>
                          <option value="Apartment / Flat">Apartment / Flat</option>
                          <option value="Commercial / Office / Retail">Commercial / Office / Retail</option>
                          <option value="Restaurant / Food Hospitality">Restaurant / Food Hospitality</option>
                          <option value="Industrial / Warehouse">Industrial / Warehouse</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#132A20] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group disabled:opacity-50"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-[#52B788] group-hover:scale-110 transition-transform" />
                      <span>
                        {isSubmittingLead
                          ? 'Logging to Google Sheets...'
                          : `Capture to Google Sheets & Open Calendar (${selectedDateStr})`}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                    </button>

                    <div className="flex items-center justify-between text-[10px] text-[#4A5568] px-1">
                      <button
                        type="button"
                        onClick={() => openGoogleCalendarDirect(selectedDateStr)}
                        className="text-[#2D6A4F] hover:text-[#1B4332] font-semibold underline cursor-pointer"
                      >
                        Skip & jump directly to Google Calendar
                      </button>
                      <span className="flex items-center space-x-1">
                        <Lock className="w-3 h-3 text-[#52B788]" />
                        <span>Instant Confirmation</span>
                      </span>
                    </div>
                  </div>

                </form>
              </>
            )}

          </div>

          <div className="pt-2 border-t border-[#E2E8F0] mt-3 flex items-center justify-between text-[10px] text-[#718096]">
            <span>Greater Cape Town & Winelands</span>
            <span>POPIA & Act 36 Compliant</span>
          </div>

        </div>

        {/* ================================================================= */}
        {/* PATH 2: FREE TELEPHONIC ASSESSMENT (Secondary)                   */}
        {/* ================================================================= */}
        <div 
          className={`lg:col-span-5 rounded-2xl sm:rounded-3xl bg-[#F4F7F5] border border-[#D8ECE0] p-4 sm:p-5 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-all duration-200 ${
            activeTab === 'phone' ? 'block' : 'hidden lg:flex'
          }`}
        >
          
          <div className="space-y-3">
            
            {/* Header / Pathway Title */}
            <div className="space-y-1 pt-0.5">
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-[#D8ECE0] shadow-2xs text-[#52B788]">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif-italic font-bold text-[#1B4332]">
                Free Telephonic Assessment
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Uncertain about pest severity or need a ballpark estimate first? Talk with one of our Cape Town senior experts in under 5 minutes.
              </p>
            </div>

            {/* What to expect during your 5-minute call */}
            <div className="bg-white/90 rounded-xl p-3 border border-[#CBD5E1]/60 space-y-2">
              <span className="text-[10px] font-bold text-[#1B4332] uppercase tracking-wider block">
                What to expect during your 5-minute call:
              </span>
              
              <ul className="space-y-1.5 text-[11px] text-[#4A5568]">
                <li className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788] shrink-0 mt-0.5" />
                  <span><strong>Instant Pest Diagnosis:</strong> Identify pest species and severity stage over the phone.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788] shrink-0 mt-0.5" />
                  <span><strong>Photo & Video Identification:</strong> Send images directly via WhatsApp for rapid inspection triage.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788] shrink-0 mt-0.5" />
                  <span><strong>Transparent Price Range:</strong> Clear price brackets with honest advisory.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Action Channels: WhatsApp Icon Link & Direct Phone Call */}
          <div className="pt-3 space-y-2">
            
            {/* Primary Channel: WhatsApp Link with Official Icon */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <svg
                className="w-4 h-4 fill-current text-white shrink-0 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Chat on WhatsApp ({PHONE_NUMBER})</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>

            {/* Direct Phone Call Button */}
            <a
              href={PHONE_HREF}
              className="w-full py-2 px-4 rounded-xl bg-white hover:bg-[#F4F7F5] border border-[#CBD5E1] text-[#1B4332] font-bold text-xs shadow-2xs hover:shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Call Direct: {PHONE_NUMBER}</span>
            </a>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-[#718096] pt-0.5">
              <span>🔒 POPIA Compliant</span>
              <span>•</span>
              <span>Mon–Sat (07:00–18:00)</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
