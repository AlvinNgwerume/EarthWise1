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
    { id: 'gallery', label: 'Our Work' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#162019] text-[#D8E4DC] text-xs py-2 px-4 border-b border-[#25362B] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-[#A5C4B1]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#50966A]" />
              <span className="font-medium tracking-wide">Act 36/1947 & SAPCA Registered</span>
            </span>
            <span className="flex items-center space-x-1.5 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-[#A5C4B1]" />
              <span>Cape Town & Winelands</span>
            </span>
            <span className="flex items-center space-x-1.5 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-[#A5C4B1]" />
              <span>Mon - Sat: 07:00 - 18:00 (24/7 Emergency)</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-zinc-400">Emergency Dispatch:</span>
            <a 
              href="tel:+270215550194" 
              className="font-semibold text-white hover:text-[#50966A] transition-colors flex items-center space-x-1"
            >
              <Phone className="w-3 h-3 text-[#50966A]" />
              <span>+27 (021) 555-0194</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FBFBF9]/95 backdrop-blur-md shadow-sm border-b border-zinc-200/80 py-3' 
            : 'bg-[#FBFBF9] py-5 border-b border-zinc-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="group text-left flex items-center space-x-3 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1E3A2B] text-white flex items-center justify-center shadow-sm group-hover:bg-[#2A4D3B] transition-colors">
                <Leaf className="w-5 h-5 text-[#86C29B] group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-xl tracking-tight text-[#162019] group-hover:text-[#1E3A2B] transition-colors">
                    EARTHWISE
                  </span>
                  <span className="text-[10px] uppercase tracking-widest bg-[#E8EFEA] text-[#1E3A2B] px-1.5 py-0.5 rounded font-semibold border border-[#C5DACD]">
                    Cape Town
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                  Precision Eco-Pest Control
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'text-[#1E3A2B] bg-[#E8EFEA] font-semibold'
                        : 'text-zinc-600 hover:text-[#162019] hover:bg-zinc-100/70'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#1E3A2B] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <a 
                href="tel:+270215550194"
                className="px-3.5 py-2 rounded-lg border border-zinc-300 text-zinc-700 text-sm font-semibold hover:border-[#1E3A2B] hover:text-[#1E3A2B] transition-colors flex items-center space-x-1.5"
              >
                <Phone className="w-4 h-4 text-[#1E3A2B]" />
                <span className="hidden lg:inline">021 555 0194</span>
                <span className="lg:hidden">Call</span>
              </a>

              <button
                onClick={onOpenBookingModal}
                className="px-4 py-2.5 rounded-xl bg-[#1E3A2B] hover:bg-[#2A4D3B] text-white text-sm font-medium shadow-sm transition-all duration-200 flex items-center space-x-2 group"
              >
                <CalendarCheck className="w-4 h-4 text-[#86C29B] group-hover:scale-110 transition-transform" />
                <span>Book Inspection</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={onOpenBookingModal}
                className="p-2 rounded-lg bg-[#1E3A2B] text-white text-xs font-semibold flex items-center space-x-1"
                aria-label="Book inspection"
              >
                <CalendarCheck className="w-4 h-4 text-[#86C29B]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FBFBF9] border-b border-zinc-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                    currentPage === item.id
                      ? 'bg-[#1E3A2B] text-white'
                      : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {currentPage === item.id && <Leaf className="w-4 h-4 text-[#86C29B]" />}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-3 rounded-xl bg-[#1E3A2B] text-white font-semibold flex items-center justify-center space-x-2 shadow-sm"
              >
                <CalendarCheck className="w-5 h-5 text-[#86C29B]" />
                <span>Schedule Property Inspection</span>
              </button>

              <a
                href="tel:+270215550194"
                className="w-full py-2.5 rounded-xl border border-zinc-300 text-zinc-800 text-sm font-semibold flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-[#1E3A2B]" />
                <span>Call Hotline: +27 (021) 555-0194</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
