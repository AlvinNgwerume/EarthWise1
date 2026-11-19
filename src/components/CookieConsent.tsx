import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { PageId } from '../types';

interface CookieConsentProps {
  onNavigate: (page: PageId) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('earthwise_cookie_consent');
      if (!consent) {
        // Slight delay so it doesn't pop in immediately on page load
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage exceptions in private browsing
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('earthwise_cookie_consent', 'all');
    } catch {}
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('earthwise_cookie_consent', 'essential');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-36 md:bottom-6 left-4 right-4 sm:right-auto sm:left-6 sm:max-w-md z-40 animate-in fade-in slide-in-from-bottom-5 duration-300"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#CBD5E1] rounded-2xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(27,67,50,0.15)] text-[#4A5568]">
        <div className="flex items-start justify-between gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-[#52B788] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>

          <div className="flex-1 text-xs leading-relaxed">
            <p className="font-bold text-sm text-[#1B4332] mb-1">
              POPIA & Cookie Compliance
            </p>
            <p className="text-[#4A5568]">
              We use essential cookies to maintain rapid dispatch triage, guarantee sub-3-minute response times, and adhere to the South African Protection of Personal Information Act (POPIA).
            </p>
          </div>

          <button
            onClick={handleEssentialOnly}
            className="text-[#64748B] hover:text-[#1B4332] p-1 rounded-lg hover:bg-[#F4F7F5] transition-colors focus:outline-none"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E2E8F0]">
          <button
            onClick={() => onNavigate('privacy')}
            className="text-[11px] font-semibold text-[#2D6A4F] hover:text-[#1B4332] underline hover:no-underline cursor-pointer"
          >
            Privacy & Cookie Policy
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleEssentialOnly}
              className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-[11px] font-bold text-[#4A5568] hover:text-[#1B4332] hover:bg-[#F4F7F5] transition-colors cursor-pointer"
            >
              Essential Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-3.5 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#2D6A4F] text-[11px] font-bold text-white transition-colors shadow-xs cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
