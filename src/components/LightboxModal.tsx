import React from 'react';
import { GalleryItem } from '../types';
import { X, MapPin, Tag, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, onOpenBooking }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FBFBF9] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 relative grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image side */}
        <div className="relative min-h-[300px] md:min-h-full bg-zinc-900">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-bold uppercase tracking-widest bg-[#2E5E40] text-white px-3 py-1 rounded-full">
              {item.category}
            </span>
          </div>
        </div>

        {/* Content Details side */}
        <div className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-zinc-500 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#1E3A2B]" />
                <span className="font-semibold text-zinc-700">{item.location}</span>
              </div>
              <h2 className="text-2xl font-bold font-serif-italic text-[#162019]">
                {item.title}
              </h2>
            </div>

            <p className="text-zinc-600 text-sm leading-relaxed">
              {item.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-zinc-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                Key Execution Highlights
              </h3>
              <ul className="space-y-2 text-xs text-zinc-700">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3A2B] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 space-y-3">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full py-3 px-6 rounded-xl bg-[#1E3A2B] hover:bg-[#2A4D3B] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#86C29B]" />
              <span>Book Similar Project Assessment</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-zinc-300 text-zinc-700 text-xs font-semibold hover:bg-zinc-100 transition-colors"
            >
              Close Archive Details
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
