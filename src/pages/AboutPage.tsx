import React from 'react';
import { PageId } from '../types';
import { 
  ShieldCheck, 
  Leaf, 
  Clock, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  Phone
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F4F7F5] to-[#FFFFFF] pt-12 pb-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#F4F7F5] text-[#1B4332] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D8ECE0]">
            <Award className="w-3.5 h-3.5 text-[#52B788]" />
            <span>Cape Town Pest Specialists</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-italic font-bold text-[#1B4332]">
            About <span className="text-[#52B788]">Earthwise</span>
          </h1>

          <p className="text-[#4A5568] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Protecting your property while respecting the environment with safe, effective, and affordable pest management.
          </p>
        </div>
      </section>

      {/* Why Choose Earthwise? Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div>
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-[#1B4332] bg-[#F4F7F5] px-3 py-1 rounded-full border border-[#D8ECE0] shadow-2xs mb-2">
              Our Commitment
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#1B4332]">
            Why Choose Earthwise?
          </h2>
          <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed">
            At Earthwise Pest Management, we believe in protecting your property while respecting the environment. Based in Cape Town, we are a locally owned and operated company dedicated to providing safe, effective, and affordable pest solutions.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Licensed & Insured',
              desc: 'Fully certified pest control operators.',
              icon: ShieldCheck
            },
            {
              title: 'Eco-Friendly Products',
              desc: 'Safe for children, pets, and the planet.',
              icon: Leaf
            },
            {
              title: 'Fast Response',
              desc: 'Same-day service available for urgent infestations.',
              icon: Clock
            },
            {
              title: 'Guaranteed Results',
              desc: 'We stand by our work with a satisfaction guarantee.',
              icon: Award
            },
            {
              title: 'On-Site Inspections & Quotes',
              desc: 'Transparent pricing, no hidden fees.',
              icon: FileCheck
            }
          ].map((item, i) => (
            <div
              key={i}
              className={`glass-card rounded-3xl p-8 shadow-sm space-y-4 hover:shadow-xl hover:border-[#1B4332]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 ${
                i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F7F5]/80 text-[#1B4332] flex items-center justify-center border border-[#D8ECE0]">
                  <item.icon className="w-6 h-6 text-[#1B4332]" />
                </div>
                <h3 className="text-xl font-serif-italic font-bold text-[#1B4332]">
                  {item.title}
                </h3>
                <p className="text-[#4A5568] text-sm leading-relaxed">
                  — {item.desc}
                </p>
              </div>
              <div className="pt-2">
                <div className="w-full h-1 bg-[#F4F7F5] rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-[#52B788]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Compliance grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-[#1B4332]/95 backdrop-blur-xl text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#F4F7F5] bg-[#0D1F17] border border-[#2D6A4F] px-4 py-1.5 rounded-full shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-[#74C69D]" />
              <span className="text-[#F4F7F5] tracking-wider">Regulatory Trust</span>
            </div>
            <h2 className="text-3xl font-serif-italic font-bold text-white pt-2">
              Official Certifications & Safety Standards
            </h2>
            <p className="text-[#D8ECE0] text-sm">
              We operate under full legal compliance with South African pesticide legislation and environmental safety guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Act 36 of 1947', desc: 'All chemical formulations registered and approved under Department of Agriculture rules.' },
              { title: 'SAPCA Certified', desc: 'Full corporate membership with the South African Pest Control Association.' },
              { title: 'HACCP Audit Ready', desc: 'Compliant with strict international food hygiene & safety standards.' },
              { title: 'SABS Approved', desc: 'Equipped with South African Bureau of Standards verified protection methods.' }
            ].map((cert, idx) => (
              <div key={idx} className="bg-[#132A20]/90 backdrop-blur-xs p-5 rounded-2xl border border-[#2D6A4F] space-y-2 hover:border-[#52B788]/60 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#52B788]" />
                <h3 className="font-bold text-base text-white">{cert.title}</h3>
                <p className="text-[#D8ECE0]/80 text-xs leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F7F5] rounded-3xl p-8 sm:p-12 text-center text-[#1B4332] space-y-6 border border-[#D8ECE0]">
          <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#1B4332]">
            Experience the Earthwise Way
          </h2>
          <p className="text-[#4A5568] text-sm max-w-xl mx-auto leading-relaxed">
            Get in touch with our Cape Town team for advice, on-site property assessments, and guaranteed eco-friendly pest management.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-6 py-3 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm shadow-sm transition-all flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
              <span>Book Property Inspection</span>
            </button>
            <a
              href="tel:+27622118851"
              className="px-6 py-3 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] font-bold text-sm shadow-sm transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#1B4332]" />
              <span>Call +27 62 211 8851</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
