import React from 'react';
import { PageId } from '../types';
import { SERVICES_DATA } from '../data/earthwiseData';
import heroImg from '../assets/images/hero_pest_control_1785463119745.jpg';
import { PestCalculator } from '../components/PestCalculator';
import { SuburbChecker } from '../components/SuburbChecker';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Leaf, 
  Award, 
  Clock, 
  Users, 
  Phone, 
  Star,
  Bird,
  Sparkles,
  Trees,
  Building2,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: (serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBookingModal }) => {
  const iconMap: Record<string, any> = {
    ShieldCheck,
    Bird,
    Sparkles,
    Trees,
    Building2,
    ShieldAlert
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 pb-16 bg-gradient-to-b from-[#E8EFEA]/40 via-[#FBFBF9] to-[#FBFBF9]">
        
        {/* Decorative subtle ambient background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#86C29B]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center space-x-2 bg-[#E8EFEA] border border-[#C5DACD] text-[#1E3A2B] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                <Leaf className="w-3.5 h-3.5 text-[#2E5E40]" />
                <span>Precision Protection Since 1994</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-italic font-bold tracking-tight text-[#162019] leading-[1.12]">
                Eco-Friendly Pest Solutions for <span className="text-[#1E3A2B]">Cape Town</span>
              </h1>

              <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Professional Pest Control & Ceiling Services in Cape Town.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => onOpenBookingModal()}
                  className="px-8 py-4 rounded-xl bg-[#1E3A2B] hover:bg-[#2A4D3B] text-white font-semibold text-base shadow-lg shadow-[#1E3A2B]/20 transition-all duration-200 flex items-center justify-center space-x-3 group"
                >
                  <ShieldCheck className="w-5 h-5 text-[#86C29B] group-hover:scale-110 transition-transform" />
                  <span>Request Inspection</span>
                  <ArrowRight className="w-4 h-4 text-[#86C29B] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="px-7 py-4 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-base shadow-sm transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Explore Our Services</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-200/80 text-xs">
                <div className="flex items-center space-x-2 text-zinc-700">
                  <Award className="w-4 h-4 text-[#1E3A2B] shrink-0" />
                  <span>30+ Yrs Heritage</span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-700">
                  <Leaf className="w-4 h-4 text-[#1E3A2B] shrink-0" />
                  <span>Act 36 Certified</span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-700">
                  <Clock className="w-4 h-4 text-[#1E3A2B] shrink-0" />
                  <span>Rapid Dispatch</span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-700">
                  <Users className="w-4 h-4 text-[#1E3A2B] shrink-0" />
                  <span>1,200+ Protected</span>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Banner Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={heroImg}
                  alt="Professional Pest Control Inspection"
                  className="w-full h-[450px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Overlay Badge Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#162019]/90 backdrop-blur-md p-5 rounded-2xl border border-[#2E4737] text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#86C29B]">
                      Zero Harsh Fumes
                    </span>
                    <span className="flex items-center space-x-1 text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">4.9/5 Rating</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-normal">
                    "Earthwise bird netting saved our Atlantic Seaboard rooftop while keeping our sea views 100% pristine!"
                  </p>
                  <p className="text-[11px] text-zinc-400 font-semibold">— Camps Bay Villa Owner</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] bg-[#E8EFEA] px-3.5 py-1.5 rounded-full border border-[#C5DACD]">
            Precision Protocols
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#162019]">
            Targeted Eco-Friendly Services
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Engineered specifically for Cape Town's micro-climates, residential estates, and commercial food hospitality environments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => {
            const IconComponent = iconMap[service.iconName] || ShieldCheck;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1E3A2B] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#162019]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#2E4737]">
                      {service.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] text-[#1E3A2B] flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 text-[#1E3A2B]" />
                      </div>
                      <h3 className="text-xl font-serif-italic font-bold text-[#162019] group-hover:text-[#1E3A2B] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs font-semibold text-[#1E3A2B]">
                      {service.tagline}
                    </p>

                    <p className="text-zinc-600 text-xs leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-100 space-y-1.5">
                      {service.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-start space-x-2 text-[11px] text-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5E40] shrink-0 mt-0.5" />
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
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F0F4F1] group-hover:bg-[#1E3A2B] text-[#1E3A2B] group-hover:text-white font-semibold text-xs transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Request Service Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Interactive Pest Quote Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PestCalculator onSelectServiceForBooking={onOpenBookingModal} />
      </section>

      {/* Why Earthwise Section */}
      <section className="bg-[#F4F6F4] py-16 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] bg-white px-3.5 py-1.5 rounded-full border border-[#C5DACD]">
                The Earthwise Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#162019]">
                Why Cape Town Choice Earthwise Since 1994
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Traditional pest control relies on harsh aerosol sprays that leave chemical residues. Earthwise utilizes botanical micro-encapsulation, biological gel matrices, and structural exclusion.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-xl bg-[#1E3A2B] text-white font-semibold text-sm hover:bg-[#2A4D3B] transition-colors inline-flex items-center space-x-2"
                >
                  <span>Meet Our Entomologists</span>
                  <ArrowRight className="w-4 h-4 text-[#86C29B]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  title: 'Heritage Architectural Care',
                  desc: '316 marine grade stainless steel bird spikes and UV netting that preserve historic facade aesthetics.',
                  icon: Building2
                },
                {
                  title: 'Guaranteed Results & Warranty',
                  desc: 'Up to 5 years warranty on subterranean termite barriers and 10 years on bird proofing netting.',
                  icon: Award
                }
              ].map((pillar, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200/80 space-y-2 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#1E3A2B] flex items-center justify-center">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#162019]">{pillar.title}</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Suburb Coverage Checker Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SuburbChecker onOpenBookingModal={() => onOpenBookingModal()} />
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#162019] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 relative overflow-hidden shadow-2xl border border-[#263D2E]">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-white">
              Ready for a Cleaner, Pest-Free Space?
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Schedule your eco-friendly property assessment today. Our senior Cape Town technicians provide rapid on-site inspection and transparent fixed proposals.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => onOpenBookingModal()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#86C29B] hover:bg-[#9AD4AF] text-[#162019] font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Book Property Inspection</span>
            </button>

            <a
              href="tel:+270215550194"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-600 text-zinc-200 hover:text-white hover:border-white font-semibold text-sm transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#86C29B]" />
              <span>Call 021 555 0194</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
