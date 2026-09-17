import React, { useState } from 'react';
import {
  CreditCard,
  Wifi,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Clock,
  Check,
  Filter,
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { IDCardProduct } from '../types';

interface ProductsShowcaseProps {
  onSelectProductForCustomizer: (productId: string) => void;
  onOpenQuickQuote: (productName?: string) => void;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onSelectProductForCustomizer,
  onOpenQuickQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Showcase only standard institutional products on page showcase
  const showcaseProducts = PRODUCTS.filter(
    (p) => p.category !== 'tech' && p.category !== 'events'
  );

  const categories = [
    { id: 'all', label: `All Cards (${showcaseProducts.length})` },
    { id: 'education', label: 'Schools & Colleges' },
    { id: 'corporate', label: 'Corporate & HR' },
    { id: 'healthcare', label: 'Hospitals & Medical' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? showcaseProducts
      : showcaseProducts.filter((p) => p.category === selectedCategory);

  return (
    <section id="products-section" className="py-24 md:py-28 lg:py-[136px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2563EB] mb-3 block">
            MANUFACTURING SPECIFICATIONS
          </span>
          <h2 className="font-bold text-[30px] md:text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-[#0F172A] mb-4">
            Precision engineered cards for institutional identity
          </h2>
          <p className="font-normal text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.01em] text-[#334155] max-w-[680px] text-left">
            From student identification cards to corporate staff badges, every batch is manufactured to ISO/IEC 7810 ID-1 standards with thermal dye-sublimation print clarity.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-[14px] font-medium tracking-[-0.01em] transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group relative rounded-[24px] bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-lg hover:border-[#2563EB] hover:-translate-y-1 transition-all duration-250 flex flex-col justify-between overflow-hidden"
              >
                {/* Badge if present */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#2563EB] text-white shadow-xs">
                    {product.badge}
                  </div>
                )}



                {/* Top Image Preview (Neutral background, clean, no colorful overlays) */}
                <div className="relative h-56 bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden flex items-center justify-center p-6">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-103 transition-transform duration-300 shadow-xs"
                  />

                  {/* Category Tag on Image */}
                  <div className="absolute bottom-3 left-4 text-[#0F172A] bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide shadow-2xs flex items-center gap-1.5 border border-[#E2E8F0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    {product.popularFor[0]}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[13px] text-[#2563EB] font-medium mt-1">{product.tagline}</p>
                    <p className="text-[14px] leading-[1.6] text-[#334155] mt-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-4 space-y-2 border-t border-[#E2E8F0] pt-3">
                      {product.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-[14px] font-normal text-[#334155]">
                          <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
                          <span className="line-clamp-1">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specifications Panel */}
                  <div className="mt-5 pt-3 border-t border-[#E2E8F0] bg-[#F8FAFC] -mx-6 -mb-6 p-6 rounded-b-[24px]">
                    <div className="grid grid-cols-2 gap-2 text-[12px] mb-4">
                      <div>
                        <span className="text-[#64748B] block font-normal">Gauge / Thickness</span>
                        <span className="font-semibold text-[#0F172A]">{product.specs.thickness}</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block font-normal">Material</span>
                        <span className="font-semibold text-[#0F172A] line-clamp-1">
                          {product.specs.material}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block font-normal">Printing</span>
                        <span className="font-semibold text-[#0F172A]">{product.specs.printing}</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block font-normal">Durability</span>
                        <span className="font-semibold text-[#16A34A]">
                          {product.specs.durability}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons: Secondary & Primary */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProductForCustomizer(product.id)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white text-[#2563EB] hover:bg-[#F8FAFC] text-[13px] font-medium border border-[#2563EB] transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>Customize 3D</span>
                      </button>
                      <button
                        onClick={() => onOpenQuickQuote(product.name)}
                        className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] hover:shadow-md hover:shadow-brand-primary/20 text-white text-[13px] font-medium transition-all"
                      >
                        <span>Bulk quote</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
