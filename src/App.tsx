import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InspectionModal } from './components/InspectionModal';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { FloatingEcoBot } from './components/FloatingEcoBot';
import { CookieConsent } from './components/CookieConsent';
import { MobileStickyCta } from './components/MobileStickyCta';
import { initAuth } from './services/googleAuth';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

import { ArrowUp } from 'lucide-react';

const getInitialPage = (): PageId => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const validPages: PageId[] = ['home', 'services', 'about', 'contact', 'privacy', 'terms', 'act36'];
  if (validPages.includes(path as PageId)) {
    return path as PageId;
  }
  return 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isGoogleSheetsModalOpen, setIsGoogleSheetsModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [bookingInitialData, setBookingInitialData] = useState<{
    fullName?: string;
    phone?: string;
    email?: string;
    suburb?: string;
    notes?: string;
  } | undefined>(undefined);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [servicesFilter, setServicesFilter] = useState<string>('all');

  // Initialize Firebase Auth listener once on app mount
  useEffect(() => {
    const unsub = initAuth();
    return () => {
      if (unsub) unsub();
    };
  }, []);

  // Sync navigation with browser history
  const handleNavigate = (page: PageId, serviceFilterId?: string) => {
    if (page === 'services') {
      setServicesFilter(serviceFilterId || 'all');
    }
    setCurrentPage(page);
    try {
      const targetPath = page === 'home' ? '/' : `/${page}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page }, '', targetPath);
      }
    } catch {}
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic SEO Meta Title and Description based on active page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let title = 'Earthwise Pest Management | Precision Eco-Friendly Pest Control Cape Town';
    let description = 'Precision eco-friendly pest control in Cape Town. Sub-3-minute dispatch response, SAPCA & Act 36/1947 certified technicians, and family-safe, non-toxic treatments.';

    if (currentPage === 'services') {
      title = 'Eco-Friendly Pest Control Services Cape Town | Earthwise Pest Management';
      description = 'Targeted, eco-friendly pest control services across Greater Cape Town: cockroach eradication, rodent proofing, non-toxic termite barriers, bird protection & ceiling hygiene.';
    } else if (currentPage === 'about') {
      title = 'About Us & Credentials | Earthwise Pest Management Cape Town';
      description = 'Meet the certified entomologists at Earthwise Pest Management. SAPCA-registered, Act 36/1947 compliant pest control specialists serving Greater Cape Town.';
    } else if (currentPage === 'contact') {
      title = 'Contact Dispatch & Rapid Response | Earthwise Pest Management Cape Town';
      description = 'Contact Earthwise Pest Management for rapid dispatch across Cape Town and Winelands. Sub-3-minute response SLA, 24/7 emergency dispatch: +27 62 211 8851.';
    } else if (currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'act36') {
      title = 'POPIA Compliance, Act 36/1947 & Service Terms | Earthwise Pest Management';
      description = 'Official POPIA compliance documentation, Act 36/1947 statutory remedy standards, and transparent client service terms for Earthwise Pest Management.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBookingModal = (
    serviceId?: string, 
    initialData?: { fullName?: string; phone?: string; email?: string; suburb?: string; notes?: string }
  ) => {
    setPreselectedServiceId(serviceId);
    setBookingInitialData(initialData);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setPreselectedServiceId(undefined);
    setBookingInitialData(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#4A5568] font-sans pb-16 md:pb-0">
      
      {/* Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Main Page Render */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenGoogleSheets={() => setIsGoogleSheetsModalOpen(true)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            initialServiceFilter={servicesFilter}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenBookingModal={() => handleOpenBookingModal()}
            onOpenGoogleSheets={() => setIsGoogleSheetsModalOpen(true)}
          />
        )}

        {(currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'act36') && (
          <LegalPage
            initialTab={currentPage === 'terms' ? 'terms' : currentPage === 'act36' ? 'act36' : 'privacy'}
            onNavigate={handleNavigate}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Global Property Inspection Modal */}
      <InspectionModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        preselectedServiceId={preselectedServiceId}
        initialData={bookingInitialData}
        onOpenGoogleSheets={() => setIsGoogleSheetsModalOpen(true)}
      />

      {/* Google Sheets Lead Hub Modal */}
      <GoogleSheetsModal
        isOpen={isGoogleSheetsModalOpen}
        onClose={() => setIsGoogleSheetsModalOpen(false)}
      />

      {/* Cookie Consent Banner (POPIA / GDPR compliant, non-intrusive) */}
      <CookieConsent onNavigate={handleNavigate} />

      {/* Mobile Sticky Quick-Action Bar */}
      <MobileStickyCta onOpenBookingModal={() => handleOpenBookingModal()} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end space-y-3">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-[#1B4332] text-[#52B788] flex items-center justify-center shadow-lg border border-[#132A20] hover:scale-105 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating Eco-Bot */}
        <FloatingEcoBot
          onOpenBookingModal={handleOpenBookingModal}
          onNavigate={handleNavigate}
        />
      </div>

    </div>
  );
}
