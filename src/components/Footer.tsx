import React from 'react';
import { PageId } from '../types';
import { Leaf, ShieldCheck, Phone, Mail, MapPin, Award, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <footer className="bg-[#162019] text-[#D8E4DC] border-t border-[#25362B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#25362B]">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A4D3B] text-white flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#86C29B]" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  EARTHWISE
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[#86C29B] font-semibold">
                  Pest Management • Est. 1994
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Cape Town's trusted authority in bio-rational pest exclusion, eco-friendly micro-encapsulated treatments, and humane bird proofing. Safeguarding homes and heritage since 1994.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2 text-xs text-[#A5C4B1] bg-[#1F2F24] px-3 py-1.5 rounded-lg border border-[#2E4535]">
                <ShieldCheck className="w-4 h-4 text-[#50966A]" />
                <span>Act 36/1947 Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#A5C4B1] bg-[#1F2F24] px-3 py-1.5 rounded-lg border border-[#2E4535]">
                <Award className="w-4 h-4 text-[#50966A]" />
                <span>SAPCA Registered</span>
              </div>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Precision Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                  Our Work in Focus
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About the Guardians
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact & Inspection
                </button>
              </li>
            </ul>
          </div>

          {/* Services Quick Access */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Specialist Solutions</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#86C29B] transition-colors text-left">
                  Humane Bird Proofing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#86C29B] transition-colors text-left">
                  Ceiling Space Hygiene
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#86C29B] transition-colors text-left">
                  Precision Eco-Treatments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#86C29B] transition-colors text-left">
                  Termite & Woodborer Barriers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#86C29B] transition-colors text-left">
                  Commercial HACCP Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support & Address */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Cape Town HQ</h3>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#86C29B] shrink-0 mt-0.5" />
                <span>Unit 4, Botanical Park, Constantia Main Rd, Cape Town, 7806</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#86C29B] shrink-0" />
                <a href="tel:+270215550194" className="hover:text-white transition-colors">
                  +27 (021) 555-0194
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#86C29B] shrink-0" />
                <a href="mailto:info@earthwise-pest.co.za" className="hover:text-white transition-colors">
                  info@earthwise-pest.co.za
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBookingModal}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2A4D3B] hover:bg-[#35614A] text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors group"
              >
                <span>Book Property Inspection</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#86C29B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 space-y-4 md:space-y-0">
          <p>© 1994 - {new Date().getFullYear()} Earthwise Pest Management (Pty) Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Act 36 Compliance</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="text-[#86C29B]">Cape Town, South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
