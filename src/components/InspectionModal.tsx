import React from 'react';
import { X } from 'lucide-react';
import { DualPathwayBooking } from './DualPathwayBooking';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  initialData?: {
    fullName?: string;
    phone?: string;
    email?: string;
    suburb?: string;
    notes?: string;
  };
  onOpenGoogleSheets?: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  initialData,
  onOpenGoogleSheets
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog: Modern Dual-Pathway Split-View */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-4xl lg:max-w-5xl border border-white/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden relative my-auto transition-all duration-300">
        
        {/* Top subtle decorative accent gradient line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1B4332] via-[#52B788] to-[#1B4332]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F4F7F5] hover:bg-[#E2E8F0] text-[#4A5568] hover:text-[#1B4332] transition-colors cursor-pointer z-20 shadow-2xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 lg:p-7">
          <DualPathwayBooking
            isModal={true}
            onCloseModal={onClose}
            preselectedServiceId={preselectedServiceId}
            initialData={initialData}
            onOpenGoogleSheets={onOpenGoogleSheets}
          />
        </div>

      </div>

    </div>
  );
};
