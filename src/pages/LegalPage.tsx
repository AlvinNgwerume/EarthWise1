import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  CheckCircle2, 
  ArrowLeft, 
  CalendarCheck, 
  Phone, 
  Mail, 
  Scale, 
  AlertCircle 
} from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'act36';
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ 
  initialTab = 'privacy', 
  onNavigate,
  onOpenBookingModal 
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'act36'>(
    initialTab === 'terms' ? 'terms' : initialTab === 'act36' ? 'act36' : 'privacy'
  );

  useEffect(() => {
    if (initialTab === 'terms') {
      setActiveTab('terms');
    } else if (initialTab === 'act36') {
      setActiveTab('act36');
    } else {
      setActiveTab('privacy');
    }
  }, [initialTab]);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F4F7F5] via-[#F4F7F5]/70 to-white pt-12 pb-14 border-b border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#1B4332] bg-white hover:bg-[#F4F7F5] border border-[#D8ECE0] px-3.5 py-2 rounded-xl transition-all shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 text-[#52B788]" />
              <span>Back to Home</span>
            </button>

            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#1B4332] bg-white px-3 py-1 rounded-full border border-[#D8ECE0] shadow-2xs">
              Official Legal & Regulatory Documentation
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-italic font-bold text-[#1B4332]">
              Privacy Policy & Terms of Service
            </h1>
            <p className="text-[#4A5568] text-sm sm:text-base max-w-3xl leading-relaxed">
              Earthwise Pest Management (Pty) Ltd operates in full compliance with the South African Protection of Personal Information Act (POPIA No. 4 of 2013) and the Fertilizers, Farm Feeds, Agricultural Remedies and Stock Remedies Act (Act No. 36 of 1947).
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="pt-4 flex flex-wrap items-center gap-2 border-t border-[#E2E8F0]">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'privacy'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-white text-[#4A5568] hover:bg-[#F4F7F5] border border-[#CBD5E1]'
              }`}
            >
              <Lock className="w-4 h-4 text-[#52B788]" />
              <span>Privacy Policy (POPIA)</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'terms'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-white text-[#4A5568] hover:bg-[#F4F7F5] border border-[#CBD5E1]'
              }`}
            >
              <FileText className="w-4 h-4 text-[#52B788]" />
              <span>Terms of Service & Guarantees</span>
            </button>

            <button
              onClick={() => setActiveTab('act36')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'act36'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-white text-[#4A5568] hover:bg-[#F4F7F5] border border-[#CBD5E1]'
              }`}
            >
              <Scale className="w-4 h-4 text-[#52B788]" />
              <span>Act 36/1947 Compliance</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TAB 1: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-200 shadow-xl">
            <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#52B788]">
                POPIA Compliance Notice • Republic of South Africa
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-italic font-bold text-[#1B4332]">
                Privacy Policy & Personal Data Protection
              </h2>
              <p className="text-xs text-[#4A5568]">
                Last Revised: March 2026 • Applies to all residential, commercial, and agricultural clients in Cape Town and the Western Cape.
              </p>
            </div>

            <div className="space-y-6 text-sm text-[#4A5568] leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">1. Introduction & Responsible Party</h3>
                <p>
                  Earthwise Pest Management (Pty) Ltd ("Earthwise", "we", "our", "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy governs the processing of personal information collected through our website, mobile communications, WhatsApp dispatch, phone lines, and on-site property inspection documentation in accordance with the Protection of Personal Information Act, 2013 (Act 4 of 2013) ("POPIA").
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">2. Categories of Information We Collect</h3>
                <p>To schedule inspections, dispatch mobile technical units, and fulfill biological pest management contracts, we may collect:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Contact Identifiers:</strong> Name, physical residential/business address in the Western Cape, contact telephone number, and email address.</li>
                  <li><strong>Property Parameters:</strong> Structure type, building age, presence of pets or young children, history of pest infestations, roof cavity access points, and solar array configurations.</li>
                  <li><strong>Service Logs:</strong> Date of application, Act 36 batch numbers utilized, warranty certificates, and technician findings.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">3. Purpose of Processing</h3>
                <p>Your personal information is collected solely for legitimate business operations, including:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Coordinating fast-dispatch technicians to your specific Cape Town suburb.</li>
                  <li>Customizing bio-rational treatment formulas to ensure safety for domestic pets and infants.</li>
                  <li>Issuing legally recognized Wood-destroying Insect Clearance Certificates (Beetle Compliance) and long-term termite/avian warranties.</li>
                  <li>Sending warranty follow-up notifications and emergency re-service dispatch.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">4. Data Security & Storage</h3>
                <p>
                  We implement robust administrative, technical, and physical safeguards to prevent unauthorized access, loss, misuse, or alteration of personal data. Service records and contact logs are stored securely with encryption and restricted to certified Earthwise operational staff.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">5. Non-Disclosure to Third Parties</h3>
                <p>
                  Earthwise never sells, rents, or monetizes customer personal information to third-party advertisers. Information is only shared with authorized statutory bodies when required by South African law or to complete conveyancing certificates requested directly by your transferring conveyancer.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">6. Your Rights Under POPIA</h3>
                <p>
                  You have the statutory right to request access to, correction of, or deletion of your personal records. For inquiries or data amendments, contact our designated Information Officer at <a href="mailto:info@earthwise-pest.co.za" className="text-[#1B4332] font-bold underline">info@earthwise-pest.co.za</a>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Terms of Service */}
        {activeTab === 'terms' && (
          <div className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-200 shadow-xl">
            <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#52B788]">
                Service Agreement & Operational Terms
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-italic font-bold text-[#1B4332]">
                Terms of Service & Warranty Conditions
              </h2>
              <p className="text-xs text-[#4A5568]">
                Standard Operating Conditions for Residential and Commercial Pest Management in Greater Cape Town.
              </p>
            </div>

            <div className="space-y-6 text-sm text-[#4A5568] leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">1. Scope of Services</h3>
                <p>
                  Earthwise Pest Management delivers professional pest inspection, eco-treatment, rodent exclusion, and humane wildlife management services using Department of Agriculture Act 36/1947 approved formulations and SAPCA-certified techniques.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">2. Property Inspection & Quotations</h3>
                <p>
                  Preliminary evaluations and quotations are provided based on technician assessment. Quotations remain valid for 30 calendar days. Any unforeseen structural vulnerabilities or extensive sub-slab termite activity uncovered during physical barrier installation will be quoted prior to additional work.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">3. Client Preparation & Safety Protocols</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Standard Eco-Sprays & Gel Baits:</strong> Odourless and non-volatile. Pets and occupants may remain in non-treated zones and safely access treated rooms after 30 minutes.</li>
                  <li><strong>ULV Misting & Cavity Sanitisation:</strong> Occupants and domestic animals must vacate the immediate ceiling or treated enclosed chamber for 60 to 90 minutes during active misting and ventilation.</li>
                  <li><strong>Hygiene & Access:</strong> Kitchen cupboards and perimeter skirting should be reasonably clear to allow technician bait placement.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">4. Service Guarantees & Warranties</h3>
                <div className="bg-[#F4F7F5]/80 p-4 rounded-2xl border border-[#D8ECE0] space-y-2">
                  <div className="flex items-center space-x-2 text-[#1B4332] font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
                    <span>Official Earthwise Warranty Schedules:</span>
                  </div>
                  <ul className="text-xs text-[#4A5568] space-y-1 pl-6 list-disc">
                    <li><strong>General Pest Treatments (Cockroaches, Ants):</strong> 3-Month to 6-Month re-service warranty if pests persist.</li>
                    <li><strong>Subterranean Termite Barriers:</strong> 5-Year transferable structural barrier guarantee certificate.</li>
                    <li><strong>Avian Proofing (Tension Netting & Marine Spikes):</strong> 10-Year hardware and structural tension warranty.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">5. Limitation of Liability</h3>
                <p>
                  While all care is taken by licensed technicians, Earthwise is not liable for pre-existing structural timber decay, dry rot preceding termite treatment, or concealed wiring damage previously caused by rodents prior to technician intervention.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1B4332]">6. Payment & Invoicing</h3>
                <p>
                  Payment is due upon completion of service via Electronic Funds Transfer (EFT), mobile card terminal, or authorized commercial account invoice terms (30 days net).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Act 36 Compliance */}
        {activeTab === 'act36' && (
          <div className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-200 shadow-xl">
            <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#52B788]">
                Statutory Compliance • Department of Agriculture
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-italic font-bold text-[#1B4332]">
                Act 36 of 1947 & SAPCA Standards
              </h2>
              <p className="text-xs text-[#4A5568]">
                Detailed overview of environmental certifications, chemical registrations, and occupational safety codes.
              </p>
            </div>

            <div className="space-y-6 text-sm text-[#4A5568] leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#F4F7F5]/80 border border-[#D8ECE0] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-white flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-[#52B788]" />
                  </div>
                  <h4 className="font-bold text-sm text-[#1B4332]">Registered Formulations Only</h4>
                  <p className="text-xs text-[#4A5568]">
                    100% of biological agents, bio-rational gels, and micro-sprays applied by Earthwise carry active 'L' registration numbers issued by the Registrar of Act 36 of 1947.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F4F7F5]/80 border border-[#D8ECE0] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-white flex items-center justify-center">
                    <Scale className="w-4 h-4 text-[#52B788]" />
                  </div>
                  <h4 className="font-bold text-sm text-[#1B4332]">SAPCA Certified Technicians</h4>
                  <p className="text-xs text-[#4A5568]">
                    All senior field operators hold Department of Agriculture Pest Control Operator (PCO) licenses and South African Pest Control Association credentials.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-base text-[#1B4332]">Environmental & Wildlife Stewardship</h3>
                <p>
                  Earthwise prioritizes Integrated Pest Management (IPM). We minimize broad-spectrum sprays to safeguard Cape Town's indigenous biodiversity, honeybees, predatory birds, domestic pets, and groundwater reservoirs.
                </p>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* Bottom Action Footer on Legal Page */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#132A20]">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-lg font-serif-italic">Have questions regarding safety or warranties?</h3>
            <p className="text-xs text-[#D8ECE0]">Our Cape Town technical advisory desk is available for immediate consultations.</p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenBookingModal}
              className="px-5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-[#1B4332] hover:bg-[#F4F7F5] text-xs font-bold transition-all shadow-xs"
            >
              Book Inspection
            </button>
            <a
              href="tel:+27622118851"
              className="px-5 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold transition-all border border-[#52B788]/40 flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#52B788]" />
              <span>+27 62 211 8851</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
