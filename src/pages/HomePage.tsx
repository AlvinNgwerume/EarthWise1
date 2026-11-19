import React from 'react';
import { PageId } from '../types';
import { SERVICES_DATA } from '../data/earthwiseData';
import heroImg from '../assets/images/hero_man_inspection_1789391435749.jpg';
import { ServiceVectorArt } from '../components/ServiceVectorArt';
import { SuburbChecker } from '../components/SuburbChecker';
import { DualPathwayBooking } from '../components/DualPathwayBooking';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Leaf, 
  Award, 
  Clock, 
  Users, 
  Star,
  Building2,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: (
    serviceId?: string,
    initialData?: { fullName?: string; phone?: string; email?: string; suburb?: string; notes?: string }
  ) => void;
  onOpenGoogleSheets?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBookingModal, onOpenGoogleSheets }) => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 pb-16 bg-gradient-to-b from-[#F4F7F5] via-[#FFFFFF] to-[#FFFFFF]">
        
        {/* Decorative subtle ambient background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#52B788]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center space-x-2 bg-[#F4F7F5] border border-[#D8ECE0] text-[#1B4332] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                <Leaf className="w-3.5 h-3.5 text-[#52B788]" />
                <span>Precision Protection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-italic font-bold tracking-tight text-[#1B4332] leading-[1.12]">
                Eco-Friendly Pest Solutions
              </h1>

              <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Professional Pest Control & Ceiling Services in Cape Town. Safe for children, pets, and the planet.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => onOpenBookingModal()}
                  className="px-7 py-4 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <ShieldCheck className="w-5 h-5 text-[#1B4332] group-hover:scale-110 transition-transform" />
                  <span>Request Inspection</span>
                  <ArrowRight className="w-4 h-4 text-[#1B4332] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="px-7 py-4 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm shadow-sm transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Explore Our Services</span>
                  <ChevronRight className="w-4 h-4 text-[#1B4332]" />
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E2E8F0] text-xs">
                <div className="flex items-center space-x-2 text-[#4A5568]">
                  <Award className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span className="font-medium">SAPCA Certified</span>
                </div>
                <div className="flex items-center space-x-2 text-[#4A5568]">
                  <Leaf className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span className="font-medium">Act 36 Approved</span>
                </div>
                <div className="flex items-center space-x-2 text-[#4A5568]">
                  <Clock className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span className="font-medium">Rapid Dispatch</span>
                </div>
                <div className="flex items-center space-x-2 text-[#4A5568]">
                  <Users className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span className="font-medium">1,200+ Protected</span>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Banner Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={heroImg}
                  alt="Earthwise Pest Management Specialist Conducting Home Inspection"
                  className="w-full h-[450px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Overlay Badge Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#1B4332]/95 backdrop-blur-md p-5 rounded-2xl border border-[#132A20] text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#52B788]">
                      Zero Harsh Fumes
                    </span>
                    <span className="flex items-center space-x-1 text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">4.9/5 Rating</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#D8ECE0] leading-normal">
                    "Earthwise bird netting saved our Atlantic Seaboard rooftop while keeping our sea views 100% pristine!"
                  </p>
                  <p className="text-[11px] text-[#A3B899] font-semibold">— Camps Bay Villa Owner</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Services Section with Sophisticated Vector Art */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div>
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#1B4332] bg-[#F4F7F5] px-4 py-1.5 rounded-full border border-[#D8ECE0] shadow-2xs">
              Precision Protocols
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#1B4332] tracking-tight leading-snug">
            Targeted Pest Control Services
          </h2>
          <p className="text-[#4A5568] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Engineered specifically for Cape Town's micro-climates, residential estates, and commercial food hospitality environments.
          </p>
        </div>

        {/* Services Grid with Vector Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#1B4332]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Sophisticated Vector Artwork */}
                <div className="h-48 w-full bg-[#F4F7F5]/80 border-b border-[#E2E8F0] p-4 flex items-center justify-center relative overflow-hidden group-hover:bg-[#EAF4EE]/70 transition-colors">
                  <div className="w-full h-full max-w-[260px]">
                    <ServiceVectorArt serviceId={service.id} className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#1B4332] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-[#D8ECE0] shadow-xs">
                    {service.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif-italic font-bold text-[#1B4332]">
                      {service.title}
                    </h3>
                    <p className="text-xs font-bold text-[#2D6A4F]">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-[#4A5568] text-xs leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  <div className="pt-2 border-t border-[#E2E8F0]/80 space-y-1.5">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-[11px] text-[#4A5568]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenBookingModal(service.id)}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#CBD5E1] bg-white/90 backdrop-blur-xs hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-xs transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <span>Request Service Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#52B788] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Details Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('services')}
            className="px-8 py-3.5 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm shadow-sm transition-all inline-flex items-center space-x-2"
          >
            <span>View Full Services & Field Case Studies</span>
            <ChevronRight className="w-4 h-4 text-[#1B4332]" />
          </button>
        </div>

      </section>

      {/* Why Earthwise Section */}
      <section className="bg-[#F4F7F5] py-16 border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-[#1B4332] bg-white px-3 py-1 rounded-full border border-[#D8ECE0] shadow-2xs mb-2">
                  The Earthwise Difference
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#1B4332]">
                Why Cape Town Chooses Earthwise
              </h2>
              <p className="text-[#4A5568] text-sm sm:text-base leading-relaxed">
                Traditional pest control relies on harsh aerosol sprays that leave chemical residues. Earthwise utilizes botanical micro-encapsulation, biological gel matrices, and structural exclusion.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm shadow-sm transition-all inline-flex items-center space-x-2"
                >
                  <span>Why Choose Earthwise</span>
                  <ArrowRight className="w-4 h-4 text-[#52B788]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: 'Zero Toxic Fumes',
                  desc: 'Formulations pass Act 36 safety guidelines. No house evacuation required for standard applications.',
                  icon: Leaf
                },
                {
                  title: 'Pet & Child Protected',
                  desc: 'Micro-encapsulated baits target pest digestive systems without risk to domestic pets.',
                  icon: ShieldCheck
                },
                {
                  title: 'Guaranteed Results & Warranty',
                  desc: 'Up to 5 years warranty on subterranean termite barriers and 100% satisfaction re-service guarantee.',
                  icon: Award
                }
              ].map((pillar, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F4F7F5] text-[#1B4332] flex items-center justify-center border border-[#D8ECE0]">
                      <pillar.icon className="w-5 h-5 text-[#1B4332]" />
                    </div>
                    <h3 className="font-bold text-base text-[#1B4332]">{pillar.title}</h3>
                    <p className="text-[#4A5568] text-xs leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Dedicated Scheduling & Inspection Section (Dual-Pathway Split-View) */}
      <section id="scheduling-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 rounded-3xl p-4 sm:p-7 border border-[#D8ECE0] shadow-sm">
          <DualPathwayBooking onOpenGoogleSheets={onOpenGoogleSheets} />
        </div>
      </section>

      {/* Suburb Coverage Checker Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SuburbChecker onOpenBookingModal={onOpenBookingModal} />
      </section>

    </div>
  );
};
