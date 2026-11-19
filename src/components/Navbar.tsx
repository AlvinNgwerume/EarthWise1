import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Leaf, Phone, ShieldCheck, Menu, X, CalendarCheck, Clock, MapPin } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#1B4332] text-[#F4F7F5] text-xs py-2 px-4 border-b border-[#132A20] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-[#EAF4EE]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
              <span className="font-medium tracking-wide">Act 36/1947 & SAPCA Registered</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#EAF4EE]/90">
              <MapPin className="w-3.5 h-3.5 text-[#52B788]" />
              <span>Cape Town & Winelands</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#EAF4EE]/90">
              <Clock className="w-3.5 h-3.5 text-[#52B788]" />
              <span>Mon - Sat: 07:00 - 18:00 (24/7 Emergency)</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#EAF4EE]/80">Emergency Dispatch:</span>
            <a 
              href="tel:+27622118851" 
              className="font-bold text-white hover:text-[#52B788] transition-colors flex items-center space-x-1"
            >
              <Phone className="w-3 h-3 text-[#52B788]" />
              <span>+27 62 211 8851</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(27,67,50,0.06)] border-b border-[#1B4332]/10 py-2.5' 
            : 'bg-white/90 backdrop-blur-md py-3.5 border-b border-[#E2E8F0]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="group text-left flex items-center space-x-3 focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-sm group-hover:bg-[#2D6A4F] group-hover:scale-105 transition-all duration-200">
                <Leaf className="w-5 h-5 text-[#52B788] group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-xl tracking-tight text-[#1B4332] group-hover:text-[#2D6A4F] transition-colors">
                    EARTHWISE
                  </span>
                  <span className="text-[9px] uppercase tracking-widest glass-pill text-[#1B4332] px-2.5 py-0.5 rounded-full font-bold shadow-2xs inline-flex items-center whitespace-nowrap shrink-0">
                    Cape Town
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-[#4A5568] font-medium">
                  Precision Eco-Pest Control
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 p-1 bg-[#F4F7F5]/70 backdrop-blur-md rounded-2xl border border-[#D8ECE0]/80">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative cursor-pointer ${
                      isActive
                        ? 'text-[#1B4332] bg-white shadow-xs font-bold border border-[#D8ECE0]'
                        : 'text-[#4A5568] hover:text-[#1B4332] hover:bg-white/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons: WhatsApp Symbol + Book Inspection */}
            <div className="hidden sm:flex items-center space-x-3">
              <a 
                href="https://wa.me/27622118851?text=Hello%20Earthwise%20Pest%20Management%2C%20I%20would%20like%20to%20inquire%20about%20your%20pest%20control%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all duration-200 flex items-center justify-center shadow-xs hover:shadow-md hover:scale-105 active:scale-95 border border-white/40 cursor-pointer"
                aria-label="WhatsApp +27 62 211 8851"
                title="Chat on WhatsApp (+27 62 211 8851)"
              >
                <svg
                  className="w-5 h-5 fill-current text-white shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>

              <button
                onClick={onOpenBookingModal}
                className="px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white/90 backdrop-blur-sm text-[#1B4332] text-sm font-bold hover:border-[#1B4332] hover:bg-[#F4F7F5] hover:shadow-xs transition-all duration-200 flex items-center space-x-1.5 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#1B4332]" />
                <span>Book Inspection</span>
              </button>
            </div>

            {/* Mobile Action Icons (Uniform dimensions and symmetrical spacing) */}
            <div className="flex md:hidden items-center space-x-2 sm:space-x-2.5">
              <a
                href="https://wa.me/27622118851?text=Hello%20Earthwise%20Pest%20Management%2C%20I%20would%20like%20to%20inquire%20about%20your%20pest%20control%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xs active:scale-95 transition-all shrink-0 cursor-pointer"
                aria-label="Chat on WhatsApp"
                title="WhatsApp Dispatch"
              >
                <svg
                  className="w-[18px] h-[18px] fill-current text-white shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <button
                onClick={onOpenBookingModal}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] flex items-center justify-center shadow-2xs active:scale-95 transition-all shrink-0 cursor-pointer"
                aria-label="Book inspection"
                title="Book Property Inspection"
              >
                <CalendarCheck className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1B4332] hover:bg-[#F4F7F5] text-[#1B4332] flex items-center justify-center shadow-2xs active:scale-95 transition-all shrink-0 cursor-pointer focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFFFF] border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200 shadow-lg">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#1B4332] text-white'
                      : 'text-[#4A5568] hover:bg-[#F4F7F5]'
                  }`}
                >
                  <span>{item.label}</span>
                  {currentPage === item.id && <Leaf className="w-4 h-4 text-[#52B788]" />}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
              <a
                href="https://wa.me/27622118851?text=Hello%20Earthwise%20Pest%20Management%2C%20I%20would%20like%20to%20inquire%20about%20your%20pest%20control%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-bold flex items-center justify-center space-x-2 hover:bg-[#20bd5a] transition-colors shadow-xs"
              >
                <svg
                  className="w-4 h-4 fill-current text-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>WhatsApp: +27 62 211 8851</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-[#1B4332] text-sm font-bold flex items-center justify-center space-x-2 hover:border-[#1B4332] hover:bg-[#F4F7F5] transition-colors"
              >
                <CalendarCheck className="w-4 h-4 text-[#1B4332]" />
                <span>Book Inspection</span>
              </button>

              <a
                href="tel:+27622118851"
                className="w-full py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-[#1B4332] text-sm font-bold flex items-center justify-center space-x-2 hover:border-[#1B4332] hover:bg-[#F4F7F5] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#1B4332]" />
                <span>Call Hotline: +27 62 211 8851</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
