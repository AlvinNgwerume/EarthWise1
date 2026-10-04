import React, { useState } from 'react';
import { Shield, Sparkles, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SERVICES_DATA } from '../data/earthwiseData';

interface PestCalculatorProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const PestCalculator: React.FC<PestCalculatorProps> = ({ onSelectServiceForBooking }) => {
  const [selectedPest, setSelectedPest] = useState<string>('cockroaches');
  const [propertySize, setPropertySize] = useState<'small' | 'medium' | 'large' | 'commercial'>('medium');
  const [hasPetOrChildren, setHasPetOrChildren] = useState(true);

  const pestConfigs: Record<string, any> = {
    cockroaches: {
      title: 'Cockroaches',
      serviceId: 'cockroaches',
      badge: 'Botanical Micro-Gel Matrix',
      timeframe: '30-45 min application',
      strategy: 'Low-toxicity micro-encapsulated bait gel and targeted pheromone barriers applied directly into nesting crevices.',
      safetyNote: 'Odourless, zero harsh fumes. Safe for children, pets, and food preparation areas.'
    },
    ants: {
      title: 'Ants',
      serviceId: 'ants',
      badge: 'Colony Eradication System',
      timeframe: 'Same-day targeted treatment',
      strategy: 'Non-repellent transfer technology and natural botanical perimeter barriers to eliminate entire nests.',
      safetyNote: 'Safe for children, pets, and the planet.'
    },
    'rats-mice': {
      title: 'Rats & Mice',
      serviceId: 'rats-mice',
      badge: 'Exclusion & Smart Control',
      timeframe: 'Inspection + Exclusion fitment',
      strategy: 'Architectural sealing of roof and wall entry points with tamper-proof child/pet-safe stations.',
      safetyNote: 'Tamper-resistant bait containment safe around domestic pets.'
    },
    'mole-treatment': {
      title: 'Mole Treatment',
      serviceId: 'mole-treatment',
      badge: 'Specialized Lawn Protection',
      timeframe: 'Sub-surface ground application',
      strategy: 'Non-invasive subterranean remediation protecting lawns, putting greens, and gardens.',
      safetyNote: 'Zero lawn damage, non-hazardous to soil biology and domestic animals.'
    },
    'bedbugs-fleas': {
      title: 'Bedbugs & Fleas',
      serviceId: 'bedbugs-fleas',
      badge: 'Thermal & Botanical Sanitation',
      timeframe: 'Comprehensive multi-stage treatment',
      strategy: 'Targeted botanical sprays and heat extraction treating mattresses, carpets, upholstery, and floor skirting.',
      safetyNote: 'Hypoallergenic, rapid re-entry, non-staining botanical formulations.'
    },
    'bird-proofing': {
      title: 'Bird Proofing',
      serviceId: 'bird-proofing',
      badge: '316 Marine Stainless & Netting',
      timeframe: 'Custom architectural fitment',
      strategy: 'UV-stabilised netting, solar panel guards, and marine-grade stainless steel spike barriers.',
      safetyNote: '100% Humane physical exclusion with up to 2-year tension guarantee.'
    },
    'bat-removal': {
      title: 'Bat Removal',
      serviceId: 'bat-removal',
      badge: 'Humane One-Way Exclusion',
      timeframe: 'Specialized seasonal exclusion',
      strategy: 'Compliant one-way exclusion valves and roof cavity sealing followed by bio-sanitisation.',
      safetyNote: 'Strictly humane and environmentally compliant under wildlife guidelines.'
    }
  };

  const currentConfig = pestConfigs[selectedPest] || pestConfigs['cockroaches'];

  return (
    <div className="bg-[#1B4332]/95 backdrop-blur-xl text-[#F4F7F5] rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#52B788]/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2D6A4F]/20 rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl space-y-3 mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#F4F7F5] bg-[#0D1F17] border border-[#2D6A4F] px-4 py-1.5 rounded-full shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#74C69D]" />
          <span className="text-[#F4F7F5] tracking-wider">Interactive Pest & Solution Assistant</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-italic text-white">
          Select your property's specific challenge and book your inspection
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Step 1 & 2 Selectors */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Select Pest Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#D8ECE0] block">
              1. Select Primary Pest Issue
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'cockroaches', label: 'Cockroaches', icon: '🪳' },
                { id: 'ants', label: 'Ants', icon: '🐜' },
                { id: 'rats-mice', label: 'Rats & Mice', icon: '🐀' },
                { id: 'mole-treatment', label: 'Mole Treatment', icon: '🐾' },
                { id: 'bedbugs-fleas', label: 'Bedbugs & Fleas', icon: '🛏️' },
                { id: 'bird-proofing', label: 'Bird Proofing', icon: '🕊️' },
                { id: 'bat-removal', label: 'Bat Removal', icon: '🦇' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedPest(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedPest === item.id
                      ? 'bg-[#2D6A4F] text-white border-[#52B788] shadow-md ring-2 ring-[#52B788]/40 scale-[1.02]'
                      : 'bg-[#132A20]/80 backdrop-blur-xs text-[#D8ECE0] border-[#2D6A4F]/80 hover:border-[#52B788]/70 hover:bg-[#132A20]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </div>
                  {selectedPest === item.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#52B788] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Select Property Scale */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#D8ECE0] block">
              2. Property Footprint Scale
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
              {[
                { id: 'small', label: 'Apartment' },
                { id: 'medium', label: 'Standard House' },
                { id: 'large', label: 'Large Estate' },
                { id: 'commercial', label: 'Commercial' }
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => setPropertySize(size.id as any)}
                  className={`py-2.5 px-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                    propertySize === size.id
                      ? 'bg-[#2D6A4F] text-white border-[#52B788] font-bold shadow-xs scale-[1.02]'
                      : 'bg-[#132A20]/80 text-[#D8ECE0]/80 border-[#2D6A4F]/80 hover:text-white hover:border-[#52B788]/50'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eco-Safety Check */}
          <div className="p-4 rounded-2xl bg-[#132A20]/80 backdrop-blur-xs border border-[#2D6A4F] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-[#52B788]" />
              <div>
                <p className="text-xs font-semibold text-white">Eco & Pet Safety Priority</p>
                <p className="text-[11px] text-[#D8ECE0]/80">Safe for children, pets, and the planet</p>
              </div>
            </div>
            <button
              onClick={() => setHasPetOrChildren(!hasPetOrChildren)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                hasPetOrChildren 
                  ? 'bg-[#52B788] text-[#1B4332] shadow-xs' 
                  : 'bg-zinc-700 text-zinc-300'
              }`}
            >
              {hasPetOrChildren ? 'Enabled' : 'Standard'}
            </button>
          </div>

        </div>

        {/* Step 3 Estimated Protocol Blueprint Card */}
        <div className="lg:col-span-6 bg-[#132A20]/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5 shadow-xl">
          
          <div className="flex items-center justify-between border-b border-[#2D6A4F] pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#52B788] font-bold">
                {currentConfig.badge}
              </span>
              <h3 className="text-xl font-bold text-white font-serif-italic">
                {currentConfig.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#D8ECE0]/80 block">Assessment</span>
              <span className="text-xs font-bold text-[#52B788] glass-pill px-2 py-0.5 rounded-full">On-Site Inspection</span>
            </div>
          </div>

          {/* Protocol Strategy */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D8ECE0]">
              Recommended Solution
            </h4>
            <p className="text-xs text-[#D8ECE0] leading-relaxed bg-[#1B4332]/90 p-4 rounded-2xl border border-[#2D6A4F]">
              {currentConfig.strategy}
            </p>
          </div>

          {/* Safety & Timeframe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#1B4332]/90 p-3.5 rounded-2xl border border-[#2D6A4F] space-y-1">
              <span className="text-[#D8ECE0]/70 block text-[10px] uppercase">Service Timeframe</span>
              <span className="font-semibold text-white">{currentConfig.timeframe}</span>
            </div>
            <div className="bg-[#1B4332]/90 p-3.5 rounded-2xl border border-[#2D6A4F] space-y-1">
              <span className="text-[#D8ECE0]/70 block text-[10px] uppercase">Safety Guarantee</span>
              <span className="font-semibold text-[#52B788]">100% Eco-Safe</span>
            </div>
          </div>

          <div className="flex items-start space-x-2 text-[11px] text-[#D8ECE0]/80">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{currentConfig.safetyNote}</span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => onSelectServiceForBooking(currentConfig.serviceId)}
              className="w-full py-3.5 px-6 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Book Property Inspection</span>
              <ArrowRight className="w-4 h-4 text-[#1B4332] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
