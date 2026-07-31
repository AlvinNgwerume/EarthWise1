import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InspectionModal } from './components/InspectionModal';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { CalendarCheck, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBookingModal = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setPreselectedServiceId(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#1C201D] font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Main Page Render */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={setCurrentPage}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={setCurrentPage}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onNavigate={setCurrentPage}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={setCurrentPage}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={setCurrentPage}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentPage}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Global Property Inspection Modal */}
      <InspectionModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        preselectedServiceId={preselectedServiceId}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-[#162019] text-[#86C29B] flex items-center justify-center shadow-lg border border-[#2E4737] hover:scale-105 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => handleOpenBookingModal()}
          className="px-4 py-3 rounded-full bg-[#1E3A2B] hover:bg-[#2A4D3B] text-white shadow-xl border border-[#3A6B4E] flex items-center space-x-2 transition-all hover:scale-105 group"
        >
          <CalendarCheck className="w-5 h-5 text-[#86C29B] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide hidden sm:inline">Book Inspection</span>
        </button>
      </div>

    </div>
  );
}
