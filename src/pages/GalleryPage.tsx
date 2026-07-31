import React, { useState } from 'react';
import { PageId, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/earthwiseData';
import { LightboxModal } from '../components/LightboxModal';
import { Camera, MapPin, Maximize2, ShieldCheck, ArrowRight, Filter } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: (serviceId?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Bird Proofing', 'Ceiling Hygiene', 'Eco-Treatments', 'Commercial'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#E8EFEA]/40 to-[#FBFBF9] pt-12 pb-14 border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#E8EFEA] text-[#1E3A2B] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5DACD]">
            <Camera className="w-3.5 h-3.5 text-[#2E5E40]" />
            <span>Visual Project Archive</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif-italic font-bold text-[#162019]">
            Our Work in <span className="text-[#1E3A2B]">Focus</span>
          </h1>

          <p className="text-zinc-600 text-base max-w-2xl mx-auto leading-relaxed">
            Explore our visual record of precision bird proofing netting, roof cavity HEPA restorations, and non-toxic pest exclusion projects across Cape Town.
          </p>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Filter Bar */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-zinc-500 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1E3A2B] text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-[#1E3A2B] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  
                  <span className="absolute top-4 left-4 bg-[#162019]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#2E4737]">
                    {item.category}
                  </span>

                  <button className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-white/90 text-[#1E3A2B] hover:bg-white shadow-md transition-transform group-hover:scale-110">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-1.5 text-xs text-zinc-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#1E3A2B]" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="text-xl font-serif-italic font-bold text-[#162019] group-hover:text-[#1E3A2B] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center justify-between text-xs font-bold text-[#1E3A2B] pt-3 border-t border-zinc-100">
                  <span>Inspect Case Specs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#2E5E40]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Lightbox Component */}
      <LightboxModal
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        onOpenBooking={() => onOpenBookingModal()}
      />

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#162019] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif-italic font-bold">
            Ready for a Cleaner Environment?
          </h2>
          <p className="text-zinc-300 text-sm max-w-xl mx-auto">
            Get an expert on-site structural evaluation and custom proofing proposal for your property.
          </p>
          <button
            onClick={() => onOpenBookingModal()}
            className="px-8 py-3.5 rounded-xl bg-[#86C29B] hover:bg-[#9AD4AF] text-[#162019] font-bold text-sm transition-all inline-flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Book Property Inspection</span>
          </button>
        </div>
      </section>

    </div>
  );
};
