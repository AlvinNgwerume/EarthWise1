import React, { useState } from 'react';
import { SUBURB_COVERAGE } from '../data/earthwiseData';
import { MapPin, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SuburbCheckerProps {
  onOpenBookingModal: (serviceId?: string, initialData?: { suburb?: string; notes?: string }) => void;
}

export const SuburbChecker: React.FC<SuburbCheckerProps> = ({ onOpenBookingModal }) => {
  const [selectedSuburb, setSelectedSuburb] = useState<string>('City Bowl & CBD');

  const current = SUBURB_COVERAGE.find((s) => s.name === selectedSuburb) || SUBURB_COVERAGE[0];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div>
            <span className="inline-flex items-center space-x-1.5 bg-[#F4F7F5] text-[#1B4332] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#D8ECE0] shadow-2xs mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#52B788]" />
              <span>Service Radius & Regional Fleet</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-italic font-bold text-[#1B4332]">
            Greater Cape Town Coverage & Dispatch Times
          </h2>
          <p className="text-[#4A5568] text-sm">
            Select your suburb zone to view dedicated mobile unit response times and localized pest risk profiles.
          </p>
        </div>
      </div>

      {/* Suburb Grid Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUBURB_COVERAGE.map((sub) => {
          const isSelected = selectedSuburb === sub.name;
          return (
            <button
              key={sub.name}
              onClick={() => setSelectedSuburb(sub.name)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer ${
                isSelected
                  ? 'bg-white/95 backdrop-blur-md border-[#1B4332] shadow-lg ring-2 ring-[#1B4332]/20 scale-[1.01]'
                  : 'bg-white/60 backdrop-blur-xs border-[#E2E8F0] hover:bg-white/90 hover:border-[#1B4332]/40 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between w-full">
                <div>
                  <h3 className="font-bold text-sm text-[#1B4332]">{sub.name}</h3>
                  <div className="flex items-center space-x-1 text-[11px] text-[#4A5568] mt-0.5 font-medium">
                    <Clock className="w-3 h-3 text-[#1B4332]" />
                    <span>Avg Dispatch: <strong>{sub.dispatchTime}</strong></span>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-[#52B788] shrink-0" />
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {sub.popularServices.map((serviceName) => (
                  <span
                    key={serviceName}
                    className="text-[10px] bg-white/80 border border-[#E2E8F0] text-[#4A5568] px-2 py-0.5 rounded-md font-medium"
                  >
                    {serviceName}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Zone Deep Dive Banner */}
      <div className="bg-[#1B4332]/95 backdrop-blur-xl text-white rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#52B788]" />
            <h4 className="font-bold text-lg font-serif-italic !text-white text-white tracking-wide">
              Active Fleet Assigned to {current.name}
            </h4>
          </div>
          <div className="flex items-center space-x-2 text-xs text-[#52B788] pt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
            <span className="font-medium text-[#D8ECE0]">Certified mobile unit on call • Avg response: {current.dispatchTime}</span>
          </div>
        </div>

        <button
          onClick={() => onOpenBookingModal('cockroaches', { suburb: current.name, notes: `Inquiry for ${current.name} fleet dispatch (Avg response: ${current.dispatchTime})` })}
          className="px-6 py-3 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm transition-all duration-200 shrink-0 flex items-center space-x-2 shadow-md hover:shadow-lg cursor-pointer"
        >
          <span>Schedule an assessment.</span>
          <ArrowRight className="w-4 h-4 text-[#1B4332]" />
        </button>
      </div>

    </div>
  );
};
