import React, { useState } from 'react';
import { SUBURB_COVERAGE } from '../data/earthwiseData';
import { MapPin, Search, Clock, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface SuburbCheckerProps {
  onOpenBookingModal: () => void;
}

export const SuburbChecker: React.FC<SuburbCheckerProps> = ({ onOpenBookingModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');

  const filteredSuburbs = SUBURB_COVERAGE.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.zone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'All' || sub.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const zones = ['All', 'City Bowl', 'Atlantic Seaboard', 'Southern Suburbs', 'Northern Suburbs', 'Helderberg'];

  return (
    <div className="bg-[#E8EFEA]/80 border border-[#C5DACD] rounded-3xl p-6 sm:p-10 space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#1E3A2B] bg-white px-3.5 py-1.5 rounded-full border border-[#C5DACD]">
            <MapPin className="w-3.5 h-3.5 text-[#2E5E40]" />
            <span>Cape Town Coverage Grid</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-italic font-bold text-[#162019]">
            Instant Dispatch & Suburb Service Checker
          </h2>
          <p className="text-zinc-600 text-sm">
            We operate active technician teams across all major Cape Town zones with guaranteed emergency response times.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search your suburb..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-zinc-300 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-none text-sm transition-all"
          />
        </div>
      </div>

      {/* Zone Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {zones.map((z) => (
          <button
            key={z}
            onClick={() => setSelectedZone(z)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedZone === z
                ? 'bg-[#1E3A2B] text-white shadow-sm'
                : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
            }`}
          >
            {z}
          </button>
        ))}
      </div>

      {/* Suburb Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuburbs.length > 0 ? (
          filteredSuburbs.map((sub) => (
            <div
              key={sub.name}
              className="bg-white rounded-2xl p-5 border border-zinc-200 hover:border-[#1E3A2B] transition-all duration-200 shadow-sm space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#162019] group-hover:text-[#1E3A2B] transition-colors">
                    {sub.name}
                  </h3>
                  <span className="text-[11px] text-zinc-500">{sub.zone}</span>
                </div>
                <span className="flex items-center space-x-1 text-[11px] font-semibold text-[#1E3A2B] bg-[#E8EFEA] px-2.5 py-1 rounded-full border border-[#C5DACD]">
                  <CheckCircle className="w-3 h-3 text-[#2E5E40]" />
                  <span>Available</span>
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-zinc-600">
                <Clock className="w-3.5 h-3.5 text-[#1E3A2B]" />
                <span>Rapid Dispatch: <strong className="text-zinc-800">{sub.dispatchTime}</strong></span>
              </div>

              <div className="pt-2 border-t border-zinc-100">
                <p className="text-[11px] text-zinc-400 mb-1 font-medium">Popular Local Services:</p>
                <div className="flex flex-wrap gap-1">
                  {sub.popularServices.map((svc) => (
                    <span key={svc} className="text-[10px] bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded font-medium">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center space-y-2 bg-white rounded-2xl border border-dashed border-zinc-300">
            <p className="text-zinc-600 text-sm font-medium">No direct suburb matches for "{searchQuery}".</p>
            <p className="text-xs text-zinc-500">Don't worry, we cover all surrounding areas in the Greater Cape Town metropolitan area.</p>
            <button
              onClick={onOpenBookingModal}
              className="mt-2 inline-flex items-center space-x-1.5 text-xs font-bold text-[#1E3A2B] hover:underline"
            >
              <span>Enquire directly for your address</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
