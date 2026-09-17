import React, { useState } from 'react';
import {
  RotateCw,
  ZoomIn,
  X,
  Sparkles,
  ShieldCheck,
  Filter,
  Check,
  Layers,
  MapPin,
} from 'lucide-react';
import { GALLERY_CARDS } from '../data/mockData';
import { GalleryCard } from '../types';

export const GallerySection: React.FC<{ onOpenQuote: (instName: string) => void }> = ({
  onOpenQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [lightboxCard, setLightboxCard] = useState<GalleryCard | null>(null);

  // Showcase only institutional cards on page showcase
  const galleryItems = GALLERY_CARDS.filter((c) => c.category !== 'events');

  const filterTabs = [
    { id: 'all', label: `All Samples (${galleryItems.length})` },
    { id: 'schools', label: 'Schools & K-12' },
    { id: 'corporate', label: 'Corporate Tech' },
    { id: 'hospital', label: 'Hospitals' },
    { id: 'college', label: 'Universities' },
    { id: 'factory', label: 'Manufacturing' },
  ];

  const filteredCards =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((c) => c.category === activeCategory);

  const toggleCardFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="gallery-section" className="py-24 md:py-28 lg:py-[136px] bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-primary mb-3 block">
            Production portfolio
          </span>
          <h2 className="font-semibold text-[30px] md:text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-[#0F172A] mb-4">
            Institutional cards delivered across Indian campuses
          </h2>
          <p className="font-normal text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.01em] text-[#334155] max-w-[680px] text-left">
            Select any card to examine high-resolution front and reverse prints, anti-scratch protective overlays, and custom-woven identification lanyards.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-colors ${
                activeCategory === tab.id
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'bg-slate-100 text-[#334155] hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((card) => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <div
                key={card.id}
                onClick={() => setLightboxCard(card)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg hover:border-blue-400 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                {/* Visual Area with Flip Toggle */}
                <div className="relative h-64 bg-slate-900 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={isFlipped ? card.backImage : card.frontImage}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-200 group-hover:scale-105"
                  />

                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Flip Action Button */}
                  <button
                    onClick={(e) => toggleCardFlip(card.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 hover:bg-black text-white text-[12px] font-medium backdrop-blur-md transition-colors flex items-center gap-1 shadow-xs"
                    title="Flip Card View"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{isFlipped ? 'Back' : 'Front'}</span>
                  </button>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3 text-white text-[12px] font-medium tracking-wide flex items-center gap-1 drop-shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{card.city}</span>
                  </div>

                  {/* Zoom hint on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
                    <span className="px-3 py-1.5 rounded-full bg-white text-[#0F172A] text-[13px] font-medium shadow-md flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-brand-primary" /> Inspect specs
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#0F172A] leading-tight group-hover:text-brand-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[13px] text-[#64748B] font-normal mt-1">{card.institution}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {card.features.map((feat, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-normal px-2 py-0.5 rounded-md bg-slate-100 text-[#334155]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
                    <span className="text-[#64748B] font-light">{card.thickness}</span>
                    <span className="font-medium text-brand-primary">Sample proof</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= LIGHTBOX MODAL ================= */}
        {lightboxCard && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setLightboxCard(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxCard(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Card Images */}
                <div className="bg-slate-900 p-6 flex flex-col items-center justify-center gap-4">
                  <div className="w-full max-w-[260px] aspect-[1/1.58] rounded-xl overflow-hidden shadow-2xl border border-white/20">
                    <img
                      src={lightboxCard.frontImage}
                      alt="Front"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[12px] font-medium tracking-wide text-slate-400">
                    Front & reverse preview
                  </span>
                </div>

                {/* Specs Info */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-mint text-blue-800">
                      {lightboxCard.category}
                    </span>
                    <h3 className="text-[20px] font-semibold text-[#0F172A] mt-2">
                      {lightboxCard.title}
                    </h3>
                    <p className="text-[13px] text-[#64748B] font-normal">
                      {lightboxCard.institution} • {lightboxCard.city}
                    </p>

                    <div className="mt-5 space-y-3">
                      <div>
                        <span className="text-[12px] font-medium text-[#64748B] block">
                          Card substrate
                        </span>
                        <p className="text-[14px] font-medium text-[#0F172A]">
                          {lightboxCard.thickness} (ISO 7810 ID-1 standard)
                        </p>
                      </div>

                      <div>
                        <span className="text-[12px] font-medium text-[#64748B] block">
                          Lanyard specification
                        </span>
                        <p className="text-[14px] font-medium text-[#0F172A]">
                          {lightboxCard.lanyardType}
                        </p>
                      </div>

                      <div>
                        <span className="text-[12px] font-medium text-[#64748B] block">
                          Key inclusions
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {lightboxCard.features.map((f, i) => (
                            <span
                              key={i}
                              className="text-[12px] font-normal px-2.5 py-0.5 rounded-md bg-slate-100 text-[#334155]"
                            >
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => {
                        const inst = lightboxCard.institution;
                        setLightboxCard(null);
                        onOpenQuote(inst);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-[14px] font-medium shadow-xs transition-colors"
                    >
                      Request batch quote for this specification
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
