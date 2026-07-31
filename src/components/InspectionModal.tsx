import React, { useState } from 'react';
import { SERVICES_DATA, SUBURB_COVERAGE } from '../data/earthwiseData';
import { X, Calendar, Clock, MapPin, ShieldCheck, CheckCircle2, User, Mail, Phone, Home, FileText } from 'lucide-react';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({ isOpen, onClose, preselectedServiceId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceId: preselectedServiceId || 'eco-treatments',
    suburb: 'City Bowl & CBD',
    propertyType: 'Residential',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: 'Morning (08:00 - 12:00)',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomRef = `EW-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(randomRef);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FBFBF9] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#162019] text-white p-6 rounded-t-2xl flex items-center justify-between border-b border-[#25362B]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A4D3B] text-[#86C29B] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white font-serif-italic">
                Schedule Property Inspection
              </h2>
              <p className="text-xs text-zinc-300">
                Cape Town Eco-Pest Assessment • Fast Dispatch Confirmation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#25362B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E8EFEA] text-[#1E3A2B] mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#2E5E40]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#2E5E40] font-bold bg-[#E8EFEA] px-3 py-1 rounded-full border border-[#C5DACD]">
                  Inspection Scheduled
                </span>
                <h3 className="text-2xl font-serif-italic font-bold text-[#162019]">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-zinc-600 text-sm max-w-md mx-auto">
                  Your property inspection request has been logged into our Cape Town dispatch system. An Earthwise technician will call you within 15 minutes.
                </p>
              </div>

              <div className="bg-[#E8EFEA]/80 border border-[#C5DACD] rounded-xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#C5DACD] pb-2">
                  <span className="text-zinc-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-[#1E3A2B]">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Target Service:</span>
                  <span className="font-semibold text-zinc-800">
                    {SERVICES_DATA.find(s => s.id === formData.serviceId)?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Suburb:</span>
                  <span className="font-semibold text-zinc-800">{formData.suburb}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Requested Window:</span>
                  <span className="font-semibold text-zinc-800">{formData.preferredDate} ({formData.preferredTime})</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center space-x-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-[#1E3A2B] hover:bg-[#2A4D3B] text-white font-medium text-sm transition-colors shadow-sm"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Smith"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-none text-sm transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="julian@example.co.za"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-none text-sm transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="082 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-none text-sm transition-all"
                  />
                </div>

                {/* Property Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center space-x-1">
                    <Home className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>Property Type</span>
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-none text-sm bg-white transition-all"
                  >
                    <option value="Residential">Residential Home / Apartment</option>
                    <option value="Commercial">Commercial Office / Retail</option>
                    <option value="Hospitality / Food Service">Restaurant / Hotel / Winery</option>
                    <option value="Estate / HOA">Estate / Body Corporate</option>
                  </select>
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>Required Service Protocol *</span>
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-none text-sm bg-white transition-all"
                  >
                    {SERVICES_DATA.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title} ({service.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Suburb */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>Cape Town Suburb *</span>
                  </label>
                  <select
                    value={formData.suburb}
                    onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-none text-sm bg-white transition-all"
                  >
                    {SUBURB_COVERAGE.map((sub) => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name} ({sub.zone})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-none text-sm bg-white transition-all"
                  />
                </div>

                {/* Preferred Time Window */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['Morning (08:00 - 12:00)', 'Afternoon (12:00 - 16:00)', 'Emergency Dispatch'].map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setFormData({ ...formData, preferredTime: slot })}
                        className={`py-2 px-3 rounded-lg border text-center font-medium transition-all ${
                          formData.preferredTime === slot
                            ? 'bg-[#1E3A2B] text-white border-[#1E3A2B]'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>Pest Infestation Details / Roof Access Notes</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the pests observed, property access details, or specific concerns..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-none text-sm transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between border-t border-zinc-200">
                <p className="text-[11px] text-zinc-500 max-w-xs">
                  🔒 No pushy sales calls. Your data is strictly kept confidential under Act 36 protocol.
                </p>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 text-sm font-semibold hover:bg-zinc-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#1E3A2B] hover:bg-[#2A4D3B] text-white text-sm font-semibold shadow-md transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Logging Request...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#86C29B]" />
                        <span>Confirm Inspection</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
