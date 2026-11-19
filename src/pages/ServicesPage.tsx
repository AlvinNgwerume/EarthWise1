import React, { useState, useEffect } from 'react';
import { PageId, GalleryItem } from '../types';
import { SERVICES_DATA, GALLERY_ITEMS, FAQ_ITEMS } from '../data/earthwiseData';
import { ServiceVectorArt } from '../components/ServiceVectorArt';
import { PestCalculator } from '../components/PestCalculator';
import { LightboxModal } from '../components/LightboxModal';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Sun,
  Flame,
  Wind,
  Award,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  Phone,
  Eye
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: (
    serviceId?: string,
    initialData?: { fullName?: string; phone?: string; email?: string; suburb?: string; notes?: string }
  ) => void;
  initialServiceFilter?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenBookingModal, initialServiceFilter }) => {
  const [activeServiceFilter, setActiveServiceFilter] = useState<string>(initialServiceFilter || 'all');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (initialServiceFilter) {
      setActiveServiceFilter(initialServiceFilter);
    }
  }, [initialServiceFilter]);

  const filteredServices = activeServiceFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.id === activeServiceFilter);

  const filteredGallery = selectedGalleryCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category.toLowerCase().includes(selectedGalleryCategory.toLowerCase()));

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Header Section */}
      <section className="bg-gradient-to-b from-[#F4F7F5] via-[#F4F7F5]/60 to-[#FFFFFF] pt-12 pb-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white text-[#1B4332] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D8ECE0] shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
            <span>Act 36/1947 & SAPCA Certified Protocols</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-italic font-bold text-[#1B4332]">
            Pest Control & Specialized Solutions
          </h1>

          <p className="text-[#4A5568] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Safe for children, pets, and the planet. Precision bio-rational treatments, structural exclusion, and humane wildlife protocols engineered for Cape Town homes and businesses.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs text-[#1B4332] font-semibold">
            <span className="bg-[#EAF4EE] px-3 py-1.5 rounded-lg border border-[#D8ECE0]">🌿 100% Odourless & Non-Toxic</span>
            <span className="bg-[#EAF4EE] px-3 py-1.5 rounded-lg border border-[#D8ECE0]">🛡️ Guaranteed Results</span>
            <span className="bg-[#EAF4EE] px-3 py-1.5 rounded-lg border border-[#D8ECE0]">⚡ Same-Day Emergency Response</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Pest & Solution Assistant (Moved from Home Page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PestCalculator onSelectServiceForBooking={onOpenBookingModal} />
      </section>

      {/* 3. The 7 Core Pest Control Services with Vector Art */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#F4F7F5] text-[#1B4332] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D8ECE0]">
            <Layers className="w-3.5 h-3.5 text-[#52B788]" />
            <span>Targeted Eradication & Exclusion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#1B4332]">
            Our Pest Control Services
          </h2>
          <p className="text-[#4A5568] text-sm sm:text-base">
            Naturalised, low-toxicity methodologies targeting the root causes of infestations across residential and commercial environments.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {[
            { id: 'all', label: 'All 7 Services' },
            { id: 'cockroaches', label: 'Cockroaches' },
            { id: 'ants', label: 'Ants' },
            { id: 'rats-mice', label: 'Rats & Mice' },
            { id: 'mole-treatment', label: 'Mole Treatment' },
            { id: 'bedbugs-fleas', label: 'Bedbugs & Fleas' },
            { id: 'bird-proofing', label: 'Bird Proofing' },
            { id: 'bat-removal', label: 'Bat Removal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveServiceFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeServiceFilter === tab.id
                  ? 'bg-[#1B4332] text-white shadow-sm'
                  : 'bg-white text-[#4A5568] hover:bg-[#F4F7F5] border border-[#CBD5E1]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid with Vector Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#1B4332]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Sophisticated Vector Artwork Illustration */}
                <div className="h-52 w-full bg-[#F4F7F5]/80 border-b border-[#E2E8F0] p-4 flex items-center justify-center relative overflow-hidden group-hover:bg-[#EAF4EE]/70 transition-colors">
                  <div className="w-full h-full max-w-[280px]">
                    <ServiceVectorArt serviceId={service.id} className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1B4332] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-[#D8ECE0] shadow-xs">
                    {service.category}
                  </span>
                </div>

                {/* Card Information */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif-italic font-bold text-[#1B4332]">
                      {service.title}
                    </h3>
                    <p className="text-xs font-bold text-[#2D6A4F]">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Target Pests Chips */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-[#1B4332] block uppercase tracking-wide">
                      Target Pests / Species:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.targetPests.map((pest) => (
                        <span key={pest} className="text-[10px] bg-white/80 text-[#1B4332] font-semibold px-2.5 py-0.5 rounded-full border border-[#D8ECE0]">
                          {pest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="pt-3 border-t border-[#E2E8F0]/80 space-y-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-[#4A5568]">
                        <CheckCircle2 className="w-4 h-4 text-[#52B788] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenBookingModal(service.id)}
                  className="w-full py-3 px-4 rounded-xl border border-[#CBD5E1] bg-white/90 backdrop-blur-xs hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-xs transition-all duration-200 flex items-center justify-center space-x-2 shadow-2xs hover:shadow-xs group-hover:border-[#1B4332] cursor-pointer"
                >
                  <span>Book {service.title} Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#52B788] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Merged "Our Work in Focus" / Real-World Project Field Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div>
              <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-[#1B4332] bg-[#F4F7F5] px-3 py-1 rounded-full border border-[#D8ECE0] shadow-2xs mb-2">
                Proven Results Across Cape Town
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#1B4332]">
              Our Field Work & Case Studies
            </h2>
            <p className="text-[#4A5568] text-sm">
              Real-world implementations from Atlantic Seaboard villas and Constantia estates to residential communities across Cape Town.
            </p>
          </div>

          {/* Quick Filter */}
          <div className="flex items-center space-x-2 flex-wrap">
            {['all', 'Bird Proofing', 'Eco-Treatments', 'Ceiling Hygiene'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedGalleryCategory === cat
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-white text-[#4A5568] hover:bg-[#F4F7F5] border border-[#CBD5E1]'
                }`}
              >
                {cat === 'all' ? 'All Case Studies' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
            >
              {/* Interactive Photo Thumbnail */}
              <div 
                onClick={() => setSelectedGalleryItem(item)}
                className="relative h-48 w-full overflow-hidden cursor-pointer group/img bg-zinc-900"
                title="Click to view full photo and case study specifications"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white p-1.5 rounded-full opacity-80 group-hover/img:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-[#1B4332]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full border border-[#52B788]/40">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-semibold text-white/90 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#52B788]" />
                    <span>{item.location}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-white/80 text-[#1B4332] px-2.5 py-1 rounded-full border border-[#D8ECE0]">
                    Field Project
                  </span>
                  <button
                    onClick={() => setSelectedGalleryItem(item)}
                    className="text-xs text-[#1B4332] hover:text-[#2D6A4F] font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#52B788]" />
                    <span>View Photos & Specs</span>
                  </button>
                </div>

                <h3 
                  onClick={() => setSelectedGalleryItem(item)}
                  className="text-xl font-serif-italic font-bold text-[#1B4332] group-hover:text-[#2D6A4F] transition-colors cursor-pointer"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-[#4A5568] leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-[#E2E8F0]/80 space-y-1.5">
                  {item.details.map((det, i) => (
                    <div key={i} className="flex items-center space-x-2 text-[11px] text-[#4A5568]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788] shrink-0" />
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => {
                    const mappedService = item.category === 'Bird Proofing' ? 'bird-proofing' :
                      item.category === 'Ceiling Hygiene' ? 'cockroaches' : 'cockroaches';
                    onOpenBookingModal(mappedService, {
                      notes: `Inquiry referencing field study: ${item.title} (${item.location})`
                    });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#CBD5E1] bg-white/90 backdrop-blur-xs hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-xs transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <span>Request Similar Project Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#52B788]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#F4F7F5] text-[#1B4332] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D8ECE0]">
            <HelpCircle className="w-3.5 h-3.5 text-[#52B788]" />
            <span>Eco-Safety & Protocol FAQs</span>
          </div>
          <h2 className="text-3xl font-serif-italic font-bold text-[#1B4332]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#4A5568] text-sm">
            Everything you need to know about our Act 36 formulations, safety, and warranties.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#1B4332] flex items-center justify-between hover:text-[#2D6A4F] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#52B788] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#4A5568] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#4A5568] leading-relaxed border-t border-[#E2E8F0]/80 animate-in fade-in duration-200">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Call To Action Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B4332] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 border border-[#132A20] shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 z-10 relative">
            <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-white">
              Ready to Safeguard Your Property?
            </h2>
            <p className="text-[#D8ECE0] text-sm sm:text-base leading-relaxed">
              Book your property inspection and quote today. Same-day emergency teams available across Cape Town and the Winelands.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-10 relative">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-8 py-3.5 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm transition-all inline-flex items-center space-x-2 shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
              <span>Book Property Inspection</span>
            </button>

            <a
              href="https://wa.me/27622118851?text=Hello%20Earthwise%20Pest%20Management%2C%20I%20would%20like%20to%20request%20a%20quote%20for%20my%20property."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all inline-flex items-center space-x-2 shadow-md"
            >
              <span>Instant Quote on WhatsApp (+27 62 211 8851)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Case Study Full Lightbox Archive Modal */}
      {selectedGalleryItem && (
        <LightboxModal
          item={selectedGalleryItem}
          onClose={() => setSelectedGalleryItem(null)}
          onOpenBooking={() => {
            const currentItem = selectedGalleryItem;
            setSelectedGalleryItem(null);
            if (currentItem) {
              const mappedService = currentItem.category === 'Bird Proofing' ? 'bird-proofing' : 'cockroaches';
              onOpenBookingModal(mappedService, {
                notes: `Inquiry regarding case study: ${currentItem.title} (${currentItem.location})`
              });
            } else {
              onOpenBookingModal();
            }
          }}
        />
      )}

    </div>
  );
};
