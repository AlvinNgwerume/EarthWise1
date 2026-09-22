import React from 'react';
import { PageId } from '../types';
import { Leaf, ShieldCheck, Phone, Mail, MapPin, Award, Instagram, Facebook, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <footer className="bg-[#1B4332] text-[#F4F7F5] border-t border-[#132A20] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#2D6A4F]/40">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center shadow-md">
                <Leaf className="w-5 h-5 text-[#52B788]" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  EARTHWISE
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[#52B788] font-bold">
                  Pest Management • Cape Town
                </span>
              </div>
            </div>

            <p className="text-[#D8ECE0]/90 text-sm leading-relaxed max-w-md">
              Cape Town's trusted authority in bio-rational pest exclusion, eco-friendly micro-encapsulated treatments, and humane bird proofing. Safeguarding homes and heritage with eco-friendly solutions.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs text-[#EAF4EE] bg-[#132A20] px-3 py-1.5 rounded-lg border border-[#52B788]/30">
                <ShieldCheck className="w-4 h-4 text-[#52B788]" />
                <span className="font-semibold">Act 36/1947 Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#EAF4EE] bg-[#132A20] px-3 py-1.5 rounded-lg border border-[#52B788]/30">
                <Award className="w-4 h-4 text-[#52B788]" />
                <span className="font-semibold">SAPCA Registered</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#D8ECE0]/80 font-bold block">
                Connect With Us
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#132A20] hover:bg-[#2D6A4F] text-[#52B788] hover:text-white border border-[#52B788]/30 flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105"
                  aria-label="Follow Earthwise Pest Management on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#132A20] hover:bg-[#2D6A4F] text-[#52B788] hover:text-white border border-[#52B788]/30 flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105"
                  aria-label="Follow Earthwise Pest Management on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#132A20] hover:bg-[#2D6A4F] text-[#52B788] hover:text-white border border-[#52B788]/30 flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105"
                  aria-label="Connect with Earthwise Pest Management on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
            <ul className="space-y-2.5 text-sm text-[#D8ECE0]/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#52B788] transition-colors font-medium">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#52B788] transition-colors font-medium">
                  Pest Control Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#52B788] transition-colors font-medium">
                  About Earthwise
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#52B788] transition-colors font-medium">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services Quick Access */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Pest Services</h3>
            <ul className="space-y-2.5 text-sm text-[#D8ECE0]/80">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#52B788] transition-colors text-left font-medium">
                  Cockroaches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#52B788] transition-colors text-left font-medium">
                  Ants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#52B788] transition-colors text-left font-medium">
                  Rats & Mice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#52B788] transition-colors text-left font-medium">
                  Mole Treatment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#52B788] transition-colors text-left font-medium">
                  Bedbugs & Fleas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#52B788] transition-colors text-left font-medium">
                  Bird Proofing & Bat Removal
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support & Address */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Cape Town HQ</h3>
            <div className="space-y-3 text-sm text-[#D8ECE0]/90">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#52B788] shrink-0 mt-0.5" />
                <span>Unit 4, Botanical Park, Constantia Main Rd, Cape Town, 7806</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#52B788] shrink-0" />
                <a href="tel:+27622118851" className="hover:text-white transition-colors font-semibold">
                  +27 62 211 8851
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#52B788] shrink-0" />
                <a href="mailto:info@earthwise-pest.co.za" className="hover:text-white transition-colors font-medium">
                  info@earthwise-pest.co.za
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#D8ECE0]/70 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Earthwise Pest Management (Pty) Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('privacy')} 
              className="hover:text-white transition-colors cursor-pointer text-xs underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onNavigate('act36')} 
              className="hover:text-white transition-colors cursor-pointer text-xs underline-offset-2 hover:underline"
            >
              Act 36 Compliance
            </button>
            <button 
              onClick={() => onNavigate('terms')} 
              className="hover:text-white transition-colors cursor-pointer text-xs underline-offset-2 hover:underline"
            >
              Terms of Service
            </button>
            <span className="text-[#52B788] font-semibold">Cape Town, South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
