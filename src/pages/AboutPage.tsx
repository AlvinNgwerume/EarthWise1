import React from 'react';
import { PageId } from '../types';
import { TEAM_MEMBERS } from '../data/earthwiseData';
import { 
  ShieldCheck, 
  Leaf, 
  Award, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  Phone, 
  BookOpen,
  Check
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#E8EFEA]/50 to-[#FBFBF9] pt-12 pb-16 border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#E8EFEA] text-[#1E3A2B] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5DACD]">
            <Award className="w-3.5 h-3.5 text-[#2E5E40]" />
            <span>30+ Years Legacy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-italic font-bold text-[#162019]">
            Precision Protection <span className="text-[#1E3A2B]">Since 1994</span>
          </h1>

          <p className="text-zinc-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Over three decades of protecting Cape Town homes, heritage estates, and commercial spaces with biological science and uncompromised care.
          </p>
        </div>
      </section>

      {/* The Earthwise Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] bg-[#E8EFEA] px-3.5 py-1.5 rounded-full border border-[#C5DACD]">
            Our Core Pillars
          </span>
          <h2 className="text-3xl font-serif-italic font-bold text-[#162019]">
            The Earthwise Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Eco-Conscious Science',
              subtitle: 'Bio-rational formulations',
              desc: 'We replace harsh synthetic neurotoxins with plant-derived micro-encapsulated compounds that specifically target pest nervous systems while remaining 100% harmless to mammals and endemic fynbos flora.',
              icon: Leaf
            },
            {
              title: 'Quietly Competent',
              subtitle: 'Discreet professional execution',
              desc: 'We operate discreetly with unmarked vehicles upon request, arriving precisely on schedule with industrial-grade safety gear and clear step-by-step communication.',
              icon: ShieldCheck
            },
            {
              title: 'Legacy Since 1994',
              subtitle: 'Deep Cape Town expertise',
              desc: 'Founded in 1994 by senior entomologist Julian Thorne, our team understands the unique structural challenges of Cape Town Victorian heritage homes, coastal weather, and micro-climates.',
              icon: Award
            }
          ].map((pillar, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E8EFEA] text-[#1E3A2B] flex items-center justify-center">
                <pillar.icon className="w-6 h-6 text-[#1E3A2B]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B]">
                  {pillar.subtitle}
                </span>
                <h3 className="text-2xl font-serif-italic font-bold text-[#162019]">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Guardians Section */}
      <section className="bg-[#F4F6F4] py-16 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] bg-white px-3.5 py-1.5 rounded-full border border-[#C5DACD]">
              Leadership & Specialists
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold text-[#162019]">
              Meet the Guardians
            </h2>
            <p className="text-zinc-600 text-sm">
              Our registered pest control officers, chemical safety auditors, and structural exclusion engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden relative bg-zinc-100">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-[#162019]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded">
                      {member.experienceYears} Years Exp.
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-xl font-serif-italic font-bold text-[#162019]">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#1E3A2B]">
                      {member.role}
                    </p>
                    <p className="text-zinc-600 text-xs leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-zinc-100">
                  <div className="space-y-1 pt-2">
                    {member.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 text-[10px] text-zinc-600">
                        <Check className="w-3 h-3 text-[#2E5E40]" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Certifications & Compliance grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-[#162019] text-white rounded-3xl p-8 sm:p-12 border border-[#2E4737] space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#86C29B]">
              Regulatory Trust
            </span>
            <h2 className="text-3xl font-serif-italic font-bold text-white">
              Official Certifications & Audits
            </h2>
            <p className="text-zinc-300 text-sm">
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
              <div key={idx} className="bg-[#1F2F24] p-5 rounded-2xl border border-[#2B4233] space-y-2">
                <CheckCircle2 className="w-5 h-5 text-[#86C29B]" />
                <h3 className="font-bold text-base text-white">{cert.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E8EFEA] rounded-3xl p-8 sm:p-12 text-center text-[#162019] space-y-6 border border-[#C5DACD]">
          <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold">
            Experience the Earthwise Way
          </h2>
          <p className="text-zinc-600 text-sm max-w-xl mx-auto">
            Book your eco-friendly property assessment with senior Cape Town entomologist Julian Thorne and team.
          </p>
          <button
            onClick={onOpenBookingModal}
            className="px-8 py-3.5 rounded-xl bg-[#1E3A2B] hover:bg-[#2A4D3B] text-white font-bold text-sm transition-all shadow-md inline-flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#86C29B]" />
            <span>Schedule Property Inspection</span>
          </button>
        </div>
      </section>

    </div>
  );
};
