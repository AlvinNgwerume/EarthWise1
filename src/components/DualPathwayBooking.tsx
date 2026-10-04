import React, { useState } from 'react';
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
  Lock 
} from 'lucide-react';

const LIVE_CALENDAR_URL = 'https://calendar.app.google/Joc3dfkudXDNvmSJ8';
const WHATSAPP_URL = 'https://wa.me/27622118851?text=Hello%20Earthwise%20Pest%20Management%2C%20I%20would%20like%20a%20free%205-minute%20telephonic%20assessment%20for%20my%20property.';
const PHONE_NUMBER = '+27 62 211 8851';
const PHONE_HREF = 'tel:+27622118851';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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
}

export const DualPathwayBooking: React.FC<DualPathwayBookingProps> = ({
  isModal = false,
  onCloseModal,
  preselectedServiceId,
  initialData
}) => {
  const [activeTab, setActiveTab] = useState<'onsite' | 'phone'>('onsite');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [redirecting, setRedirecting] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of month (0 = Sun, 1 = Mon ... 6 = Sat)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Monday as 0, Sunday as 6
  const startingDayIndex = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const redirectToCalendar = (slotLabel?: string) => {
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

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  return (
    <div className={`w-full ${isModal ? 'space-y-3' : 'space-y-5'}`}>
      
      {/* Component Header */}
      <div className="text-center max-w-2xl mx-auto space-y-1.5">
        <div className="inline-flex items-center space-x-1.5 bg-[#F4F7F5] border border-[#D8ECE0] text-[#1B4332] px-3 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase shadow-2xs">
          <Sparkles className="w-3 h-3 text-[#52B788]" />
          <span>Booking Form</span>
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
          Need an emergency physical survey or immediate quote? Choose on-site dispatch, or speak to our technical team in 5 minutes.
        </p>
      </div>

      {/* Mobile Switcher (Visible on small screens for rapid toggle) */}
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

      {/* Split-View Grid: Trim & Reactive for Website and Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
        
        {/* ================================================================= */}
        {/* PATH 1: ON-SITE INSPECTION (Primary)                             */}
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
              <div className="inline-flex items-center space-x-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#2D6A4F] bg-[#EAF4EE] px-2 py-0.5 rounded-full border border-[#D8ECE0]">
                <ShieldCheck className="w-3 h-3 text-[#52B788]" />
                <span>Commercial & Residential</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif-italic font-bold text-[#1B4332]">
                On-Site Inspection
              </h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Guaranteed technician dispatch to conduct a thorough structural survey, identify ingress points, and provide a fixed quote.
              </p>
            </div>

            {/* Core Value Props Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 border-t border-[#E2E8F0]">
              {[
                { title: 'Guaranteed Dispatch', desc: 'Same-day emergency or 24-48h routine slot' },
                { title: 'Structural & Ingress Survey', desc: 'Roof cavities, sub-floor & perimeter audit' },
                { title: 'Act 36 Pet & Child Safe', desc: 'Zero toxic airborne fumes or evacuation' },
                { title: 'Exact Fixed Quotation', desc: 'Transparent itemized pricing with 0 hidden fees' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-[#4A5568]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B4332] block font-semibold leading-tight">{item.title}</strong>
                    <span className="text-[10px] text-[#718096] leading-tight">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Clickable Calendar Module (Trimmed & Responsive) */}
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

              {/* Calendar Grid (Compact & Trimmed) */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startingDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-6 sm:h-7" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const isToday = isCurrentMonth && dayNum === todayDate;
                  const dayOfWeek = (startingDayIndex + i) % 7;
                  const isSunday = dayOfWeek === 6;
                  const isPast = isCurrentMonth && dayNum < todayDate;

                  return (
                    <button
                      key={`day-${dayNum}`}
                      type="button"
                      onClick={() => redirectToCalendar(`${dayNum} ${MONTH_NAMES[month]}`)}
                      disabled={isPast}
                      className={`h-6 sm:h-7 rounded-md text-[11px] font-semibold flex flex-col items-center justify-center relative transition-all duration-150 cursor-pointer ${
                        isPast 
                          ? 'text-gray-300 cursor-not-allowed bg-transparent'
                          : isToday
                          ? 'bg-[#1B4332] text-white shadow-2xs font-bold ring-1.5 ring-[#52B788]'
                          : isSunday
                          ? 'text-[#718096] bg-white/70 hover:bg-[#1B4332] hover:text-white border border-[#E2E8F0]'
                          : 'bg-white hover:bg-[#1B4332] hover:text-white text-[#1B4332] border border-[#CBD5E1]/60 shadow-2xs hover:shadow-xs'
                      }`}
                      title={`Select ${dayNum} ${MONTH_NAMES[month]} on Live Calendar`}
                    >
                      <span className="leading-none">{dayNum}</span>
                      {!isPast && (
                        <span className={`w-1 h-1 rounded-full mt-0.5 ${isToday ? 'bg-[#52B788]' : 'bg-[#2D6A4F]/60'}`} />
                      )}
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Primary Action CTA */}
          <div className="pt-3 space-y-1.5">
            <a
              href={LIVE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#132A20] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <CalendarCheck className="w-4 h-4 text-[#52B788] group-hover:scale-110 transition-transform" />
              <span>
                {redirecting ? `Connecting to ${redirecting}...` : 'Confirm Booking Slot Picker'}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-white/80" />
            </a>

            <div className="flex items-center justify-between text-[10px] text-[#4A5568] px-1">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#52B788]" />
                <span>Greater Cape Town & Winelands</span>
              </span>
              <span className="flex items-center space-x-1">
                <Lock className="w-3 h-3 text-[#52B788]" />
                <span>Instant Confirmation • Mon–Sat</span>
              </span>
            </div>
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
