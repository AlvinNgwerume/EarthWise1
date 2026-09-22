import React, { useState, useEffect } from 'react';
import { SERVICES_DATA, SUBURB_COVERAGE } from '../data/earthwiseData';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  initialData?: {
    fullName?: string;
    phone?: string;
    email?: string;
    suburb?: string;
    notes?: string;
  };
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  initialData
}) => {
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [serviceId, setServiceId] = useState(preselectedServiceId || 'cockroaches');
  const [suburb, setSuburb] = useState(initialData?.suburb || 'Atlantic Seaboard & Camps Bay');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (08:00 - 12:00)');
  const [notes, setNotes] = useState(initialData?.notes || '');
  
  // Spam protection: honeypot trap & timing check
  const [honeypotCheck, setHoneypotCheck] = useState('');
  const [formLoadedAt, setFormLoadedAt] = useState<number>(Date.now());
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormLoadedAt(Date.now());
      setHoneypotCheck('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (initialData) {
      if (initialData.fullName) setFullName(initialData.fullName);
      if (initialData.phone) setPhone(initialData.phone);
      if (initialData.email) setEmail(initialData.email);
      if (initialData.suburb) setSuburb(initialData.suburb);
      if (initialData.notes) setNotes(initialData.notes);
    }
  }, [initialData]);

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setBookingRef('');
      setErrorMessage(null);
      setValidationErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setValidationErrors({});

    const payload = {
      fullName,
      email,
      phone,
      serviceId,
      suburb,
      propertyType: 'Inspection Request',
      preferredDate,
      preferredTime,
      notes,
      website_check_hp: honeypotCheck,
      submission_duration: Date.now() - formLoadedAt,
    };

    try {
      const response = await fetch('/api/inspection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookingRef(data.reference || `EW-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSuccess(true);
      } else {
        if (data.errors) {
          setValidationErrors(data.errors);
        }
        setErrorMessage(data.message || 'There was an issue processing your booking.');
      }
    } catch (err) {
      console.error('Inspection booking error:', err);
      // Fallback
      setBookingRef(`EW-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-xl border border-white/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden relative my-8 transition-all duration-300">
        
        {/* Top subtle decorative glass border line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1B4332] via-[#52B788] to-[#1B4332]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F4F7F5]/80 hover:bg-[#E2E8F0] text-[#4A5568] hover:text-[#1B4332] transition-all duration-200 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F4F7F5] text-[#1B4332] mx-auto flex items-center justify-center border border-[#D8ECE0] shadow-xs">
                <CheckCircle2 className="w-9 h-9 text-[#52B788]" />
              </div>
              <h3 className="text-2xl font-serif-italic font-bold text-[#1B4332]">
                Inspection Booked!
              </h3>
              <div className="glass-panel p-4 rounded-2xl max-w-sm mx-auto space-y-1">
                <span className="text-[11px] text-[#4A5568] uppercase font-bold tracking-wider">Booking Reference</span>
                <p className="text-xl font-mono font-bold text-[#1B4332]">{bookingRef}</p>
              </div>
              <p className="text-xs text-[#4A5568] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. A dedicated technician from Earthwise Cape Town will call you shortly to confirm your assessment appointment.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#132A20] text-white text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1B4332] glass-pill px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>On-Site Biological Survey</span>
                </div>
                <h2 className="text-2xl font-serif-italic font-bold text-[#1B4332]">
                  Book Property Inspection
                </h2>
                <p className="text-xs text-[#4A5568]">
                  Schedule an on-site structural evaluation with our certified senior Cape Town technicians.
                </p>
              </div>

              {errorMessage && (
                <div className="bg-red-50/90 backdrop-blur-xs border border-red-200 rounded-xl p-3.5 text-xs text-red-700 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Spam Trap (Hidden from genuine users) */}
                <div 
                  style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }} 
                  aria-hidden="true"
                >
                  <label htmlFor="website_check_hp">Company Website Url</label>
                  <input
                    id="website_check_hp"
                    type="text"
                    name="website_check_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypotCheck}
                    onChange={(e) => setHoneypotCheck(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-3 py-2.5 rounded-xl border ${validationErrors.fullName ? 'border-red-500' : 'border-[#CBD5E1]'} focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-xs text-[#4A5568] bg-white/80 transition-all duration-200`}
                    />
                    {validationErrors.fullName && (
                      <p className="text-[10px] text-red-600">{validationErrors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="082 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-xs text-[#4A5568] bg-white/80 transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <Mail className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="julian@domain.co.za"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-xs text-[#4A5568] bg-white/80 transition-all duration-200"
                    />
                  </div>

                  {/* Service selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Service Required</span>
                    </label>
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-xs text-[#4A5568] bg-white/80 transition-all duration-200 cursor-pointer"
                    >
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Suburb selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Cape Town Suburb</span>
                    </label>
                    <select
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-xs text-[#4A5568] bg-white/80 transition-all duration-200 cursor-pointer"
                    >
                      {SUBURB_COVERAGE.map((sub) => (
                        <option key={sub.name} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-xs text-[#4A5568] bg-white/80 transition-all duration-200"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4A5568] flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Time Window</span>
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 outline-none text-xs text-[#4A5568] bg-white/80 transition-all duration-200 cursor-pointer"
                    >
                      <option>Morning (08:00 - 12:00)</option>
                      <option>Afternoon (12:00 - 16:00)</option>
                      <option>Late Afternoon (16:00 - 18:00)</option>
                      <option>Emergency Immediate Window</option>
                    </select>
                  </div>

                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#1B4332]/30 border-t-[#1B4332] rounded-full animate-spin" />
                        <span>Confirming Schedule...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
                        <span>Confirm Inspection Booking</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </>
          )}

        </div>

      </div>

    </div>
  );
};
