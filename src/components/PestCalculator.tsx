import React, { useState } from 'react';
import { Shield, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/earthwiseData';

interface PestCalculatorProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const PestCalculator: React.FC<PestCalculatorProps> = ({ onSelectServiceForBooking }) => {
  const [selectedPest, setSelectedPest] = useState<'rodents' | 'birds' | 'ants-roaches' | 'termites' | 'ceiling'>('birds');
  const [propertySize, setPropertySize] = useState<'small' | 'medium' | 'large' | 'commercial'>('medium');
  const [hasPetOrChildren, setHasPetOrChildren] = useState(true);

  const pestConfigs = {
    birds: {
      title: 'Roosting Pigeons & Seagulls',
      serviceId: 'bird-proofing',
      badge: 'High-Tension Netting & Spikes',
      estimateRange: 'R 2,400 - R 6,500',
      timeframe: 'Same-day structural fitment',
      strategy: 'Marine-grade 316 stainless steel spike tracks & UV-coated polyethylene perimeter netting.',
      safetyNote: '100% Humane, zero harm to avian species, preserving architectural facade views.'
    },
    rodents: {
      title: 'Roof Rats & House Mice',
      serviceId: 'rodent-exclusion',
      badge: 'Exclusion & Structural Sealing',
      estimateRange: 'R 1,800 - R 4,200',
      timeframe: '2 Visits (Initial + Proofing)',
      strategy: 'Architectural sealing of weep holes, copper mesh installation & non-toxic smart traps.',
      safetyNote: 'Bio-rational non-repellent matrix safe around house pets & food prep areas.'
    },
    'ants-roaches': {
      title: 'German Cockroaches & Ants',
      serviceId: 'eco-treatments',
      badge: 'Botanical Micro-Gel Matrix',
      estimateRange: 'R 1,200 - R 2,800',
      timeframe: '30-minute application window',
      strategy: 'Low-toxicity micro-encapsulated bait gel applied directly into nesting crevices.',
      safetyNote: 'Odourless, zero fumes. No house evacuation required.'
    },
    termites: {
      title: 'Subterranean Termites & Woodborer',
      serviceId: 'termite-woodborer',
      badge: '5-Year Barrier & Clearance Certs',
      estimateRange: 'R 3,500 - R 9,000',
      timeframe: 'Comprehensive Sub-slab Injection',
      strategy: 'Perimeter liquid soil termiticide barrier injection & SAPCA Beetle Clearance inspection.',
      safetyNote: 'Non-repellent transfer technology that destroys subterranean queen colonies.'
    },
    ceiling: {
      title: 'Contaminated Ceiling & Guano',
      serviceId: 'ceiling-hygiene',
      badge: 'HEPA Vacuum & Virucidal Misting',
      estimateRange: 'R 2,900 - R 7,800',
      timeframe: 'Full 1-day space restoration',
      strategy: 'Industrial HEPA guano vacuuming, virucidal fogging & mineral batt thermal insulation renewal.',
      safetyNote: 'Hospital-grade sanitisation eliminating respiratory mites and air-borne pathogens.'
    }
  };

  const currentConfig = pestConfigs[selectedPest];
  const targetService = SERVICES_DATA.find(s => s.id === currentConfig.serviceId);

  return (
    <div className="bg-[#162019] text-[#E0E7E2] rounded-3xl p-6 sm:p-10 border border-[#263D2E] shadow-xl relative overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A4D3B]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl space-y-3 mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#86C29B] bg-[#22382A] px-3.5 py-1.5 rounded-full border border-[#2E543D]">
          <Sparkles className="w-3.5 h-3.5 text-[#86C29B]" />
          <span>Interactive Pest & Protocol Assistant</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-italic text-white">
          Identify Your Pest & Calculate Recommended Solution
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Select your property's specific challenge to generate a bio-rational treatment blueprint and estimated Cape Town service scope.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Step 1 & 2 Selectors */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Select Pest Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              1. Select Primary Pest Issue
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'birds', label: 'Roosting Birds & Seagulls', icon: '🕊️' },
                { id: 'rodents', label: 'Rats & Mice Infestation', icon: '🐀' },
                { id: 'ants-roaches', label: 'Cockroaches & Ants', icon: '🪳' },
                { id: 'termites', label: 'Termites & Woodborer', icon: '🪵' },
                { id: 'ceiling', label: 'Roof Cavity & Guano Cleanup', icon: '🛖' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedPest(item.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                    selectedPest === item.id
                      ? 'bg-[#2A4D3B] text-white border-[#86C29B] shadow-md ring-1 ring-[#86C29B]/30'
                      : 'bg-[#1F2F24] text-zinc-300 border-[#2B4233] hover:border-zinc-500'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </div>
                  {selectedPest === item.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#86C29B] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Select Property Scale */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              2. Property Footprint Scale
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
              {[
                { id: 'small', label: 'Apartment / Flat' },
                { id: 'medium', label: 'Standard House' },
                { id: 'large', label: 'Large Estate' },
                { id: 'commercial', label: 'Commercial' }
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => setPropertySize(size.id as any)}
                  className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                    propertySize === size.id
                      ? 'bg-[#2E5E40] text-white border-[#86C29B]'
                      : 'bg-[#1F2F24] text-zinc-400 border-[#2B4233] hover:text-white'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eco-Safety Check */}
          <div className="p-4 rounded-2xl bg-[#1F2F24] border border-[#2B4233] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-[#86C29B]" />
              <div>
                <p className="text-xs font-semibold text-white">Eco & Pet Safety Priority</p>
                <p className="text-[11px] text-zinc-400">Strict Act 36 zero-VOC formulation protocol</p>
              </div>
            </div>
            <button
              onClick={() => setHasPetOrChildren(!hasPetOrChildren)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                hasPetOrChildren 
                  ? 'bg-[#86C29B] text-[#162019]' 
                  : 'bg-zinc-700 text-zinc-300'
              }`}
            >
              {hasPetOrChildren ? 'Enabled' : 'Standard'}
            </button>
          </div>

        </div>

        {/* Step 3 Estimated Protocol Blueprint Card */}
        <div className="lg:col-span-6 bg-[#1F2F24] rounded-2xl p-6 border border-[#2E4737] space-y-5">
          
          <div className="flex items-center justify-between border-b border-[#2E4737] pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#86C29B] font-bold">
                {currentConfig.badge}
              </span>
              <h3 className="text-xl font-bold text-white font-serif-italic">
                {currentConfig.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-400 block">Estimated Scope</span>
              <span className="text-lg font-extrabold text-[#86C29B]">{currentConfig.estimateRange}</span>
            </div>
          </div>

          {/* Protocol Strategy */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Recommended Protocol Blueprint
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed bg-[#162019] p-3 rounded-xl border border-[#2B4233]">
              {currentConfig.strategy}
            </p>
          </div>

          {/* Safety & Timeframe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#162019] p-3 rounded-xl border border-[#2B4233] space-y-1">
              <span className="text-zinc-400 block text-[10px] uppercase">Service Timeframe</span>
              <span className="font-semibold text-white">{currentConfig.timeframe}</span>
            </div>
            <div className="bg-[#162019] p-3 rounded-xl border border-[#2B4233] space-y-1">
              <span className="text-zinc-400 block text-[10px] uppercase">Safety Guarantee</span>
              <span className="font-semibold text-[#86C29B]">100% Eco-Safe</span>
            </div>
          </div>

          <div className="flex items-start space-x-2 text-[11px] text-zinc-400">
            <AlertTriangle className="w-4 h-4 text-[#D4A359] shrink-0 mt-0.5" />
            <span>{currentConfig.safetyNote}</span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => onSelectServiceForBooking(currentConfig.serviceId)}
              className="w-full py-3.5 px-6 rounded-xl bg-[#86C29B] hover:bg-[#9AD4AF] text-[#162019] font-bold text-sm transition-all duration-200 shadow-md flex items-center justify-center space-x-2 group"
            >
              <span>Book This Recommended Protocol</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
