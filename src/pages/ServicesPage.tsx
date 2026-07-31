import React, { useState } from 'react';
import { PageId } from '../types';
import { SERVICES_DATA, FAQ_ITEMS } from '../data/earthwiseData';
import birdImg from '../assets/images/bird_proofing_1785463150744.jpg';
import ceilingImg from '../assets/images/ceiling_hygiene_1785463164905.jpg';
import { 
  ShieldCheck, 
  Bird, 
  Sparkles, 
  Trees, 
  Building2, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  FileCheck,
  Sun,
  Flame,
  Wind,
  Phone
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const filteredServices = activeTab === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.id === activeTab || s.category.toLowerCase().includes(activeTab));

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-[#E8EFEA]/50 to-[#FBFBF9] pt-12 pb-16 border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#E8EFEA] text-[#1E3A2B] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5DACD]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E5E40]" />
            <span>Bio-Rational Protocols</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-italic font-bold text-[#162019]">
            Precision Pest Control. <span className="text-[#1E3A2B]">Naturally Solved.</span>
          </h1>

          <p className="text-zinc-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Advanced biological pest management engineered for Cape Town's coastal humidity, heritage architecture, and delicate botanical micro-climates.
          </p>
        </div>
      </section>

      {/* Bento Grid Feature Spotlight: Humane Bird Proofing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] bg-[#E8EFEA] px-3.5 py-1.5 rounded-full border border-[#C5DACD]">
              Architectural Exclusion
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#162019]">
              Humane Avian Proofing Systems
            </h2>
            <p className="text-zinc-600 text-sm">
              Protect solar panels, balconies, and commercial roofs from roosting pigeons, starlings, and seagulls without visual impact.
            </p>
          </div>

          <button
            onClick={() => onOpenBookingModal('bird-proofing')}
            className="px-6 py-3 rounded-xl bg-[#1E3A2B] hover:bg-[#2A4D3B] text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-2 shrink-0"
          >
            <Bird className="w-4 h-4 text-[#86C29B]" />
            <span>Schedule Bird Proofing Survey</span>
          </button>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Item 1 - Large Feature */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-4 max-w-lg z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A2B] bg-[#E8EFEA] px-3 py-1 rounded-full border border-[#C5DACD]">
                Perimeter Netting Matrix
              </span>
              <h3 className="text-2xl font-serif-italic font-bold text-[#162019]">
                Discreet Stone & Black HDPE Netting
              </h3>
              <p className="text-zinc-600 text-xs leading-relaxed">
                UV-stabilized high-density polyethylene netting tensioned with 316 marine-grade stainless steel cables. Perfectly calibrated to blend into Cape Town plaster and brickwork with zero view obstruction.
              </p>

              <ul className="space-y-2 text-xs text-zinc-700 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E5E40]" />
                  <span>10-Year Tension Guarantee</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E5E40]" />
                  <span>Zero harm to birds — 100% physical exclusion</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 h-48 rounded-2xl overflow-hidden relative">
              <img
                src={birdImg}
                alt="Bird Netting Installation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Bento Item 2 - Solar Panel Guards */}
          <div className="bg-[#162019] text-white rounded-3xl p-8 border border-[#2E4737] shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A4D3B] text-[#86C29B] flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif-italic font-bold text-white">
                Solar Panel Mesh Guards
              </h3>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Pigeons nesting beneath warm solar panels chew electrical cables and create severe fire hazards. Our non-drill perimeter clips secure UV-coated mesh without voiding solar panel warranties.
              </p>
            </div>

            <button
              onClick={() => onOpenBookingModal('bird-proofing')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#86C29B] hover:bg-[#9AD4AF] text-[#162019] font-bold text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <span>Protect Solar Investment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bento Item 3 - Stainless Spike Tracks */}
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#1E3A2B] flex items-center justify-center">
              <Bird className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif-italic font-bold text-[#162019]">
              316 Marine Stainless Spikes
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              Durable anti-roosting tracks mounted on window ledges, signage, and roof edges using weatherproof silicone adhesives.
            </p>
          </div>

          {/* Bento Item 4 - Optical Gel Deterrents */}
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#1E3A2B] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#1E3A2B]" />
            </div>
            <h3 className="text-lg font-serif-italic font-bold text-[#162019]">
              Optical Gel Deterrent Discs
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              Reflects UV light to appear as flames to avian eyes, discouraging landing without requiring physical barrier spikes.
            </p>
          </div>

          {/* Bento Item 5 - Guano Sanitisation */}
          <div className="bg-[#E8EFEA] rounded-3xl p-6 border border-[#C5DACD] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#1E3A2B] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif-italic font-bold text-[#1E3A2B]">
              Bio-Hazard Guano Cleaning
            </h3>
            <p className="text-zinc-700 text-xs leading-relaxed">
              Removal of acidic pigeon droppings that corrode solar panels, roof tiles, and exterior paintwork.
            </p>
          </div>

        </div>

      </section>

      {/* Dark Contrast Section: Roof Cavity & Ceiling Hygiene */}
      <section className="bg-[#162019] text-[#E0E7E2] py-16 border-y border-[#263D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#263D2E] text-[#86C29B] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#35543F]">
                <Sparkles className="w-3.5 h-3.5 text-[#86C29B]" />
                <span>Roof Space Restoration</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-white">
                Ceiling Space Hygiene & Sanitisation
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Nesting rodents and birds leave airborne allergens, guano pathogens, and mites in roof cavities. Our specialized sanitisation team restores indoor air quality.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-2xl bg-[#1F2F24] border border-[#2B4233] space-y-2">
                  <Wind className="w-5 h-5 text-[#86C29B]" />
                  <h4 className="font-bold text-white">HEPA Vacuum Extraction</h4>
                  <p className="text-zinc-400">Industrial vacuuming of all droppings, old nesting materials, and debris.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1F2F24] border border-[#2B4233] space-y-2">
                  <Flame className="w-5 h-5 text-[#86C29B]" />
                  <h4 className="font-bold text-white">Thermal Insulation Renewal</h4>
                  <p className="text-zinc-400">Installation of fire-rated eco-cellulose thermal insulation batts.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBookingModal('ceiling-hygiene')}
                  className="px-8 py-3.5 rounded-xl bg-[#86C29B] hover:bg-[#9AD4AF] text-[#162019] font-bold text-sm transition-all shadow-md flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Request Ceiling Space Assessment</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#2E4737] shadow-2xl">
                <img
                  src={ceilingImg}
                  alt="Ceiling space hygiene"
                  className="w-full h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Services Tabs / Catalog Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-serif-italic font-bold text-[#162019]">
            Complete Protocol Directory
          </h2>
          <p className="text-zinc-600 text-sm">
            Filter our certified pest control solutions by category or target organism.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Protocols' },
            { id: 'eco-treatments', label: 'Precision Eco-Treatments' },
            { id: 'bird-proofing', label: 'Bird Proofing' },
            { id: 'ceiling-hygiene', label: 'Ceiling Hygiene' },
            { id: 'termite-woodborer', label: 'Termites & Woodborer' },
            { id: 'commercial-protocol', label: 'Commercial HACCP' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1E3A2B] text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filtered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider bg-[#E8EFEA] text-[#1E3A2B] px-2.5 py-1 rounded">
                  {service.category}
                </span>
                <h3 className="text-xl font-serif-italic font-bold text-[#162019]">
                  {service.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 space-y-1">
                  <span className="text-[11px] font-bold text-zinc-700 block">Target Pests:</span>
                  <div className="flex flex-wrap gap-1">
                    {service.targetPests.map((pest) => (
                      <span key={pest} className="text-[10px] bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                        {pest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenBookingModal(service.id)}
                className="w-full py-2.5 rounded-xl bg-[#1E3A2B] hover:bg-[#2A4D3B] text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Book This Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#86C29B]" />
              </button>
            </div>
          ))}
        </div>

      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#E8EFEA] text-[#1E3A2B] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#2E5E40]" />
            <span>Eco-Safety & Protocol FAQs</span>
          </div>
          <h2 className="text-3xl font-serif-italic font-bold text-[#162019]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  className="w-full p-5 text-left font-semibold text-sm sm:text-base text-[#162019] flex items-center justify-between hover:text-[#1E3A2B] transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#1E3A2B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100/80 animate-in fade-in duration-200">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#162019] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold">
            Ready for a Cleaner Tomorrow?
          </h2>
          <p className="text-zinc-300 text-sm max-w-xl mx-auto">
            Book your eco-friendly property assessment with our Cape Town master entomologist team.
          </p>
          <button
            onClick={() => onOpenBookingModal()}
            className="px-8 py-3.5 rounded-xl bg-[#86C29B] hover:bg-[#9AD4AF] text-[#162019] font-bold text-sm transition-all inline-flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Request Inspection Now</span>
          </button>
        </div>
      </section>

    </div>
  );
};
