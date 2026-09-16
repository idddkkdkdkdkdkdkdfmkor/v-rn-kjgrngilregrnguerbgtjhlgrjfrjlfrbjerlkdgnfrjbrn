import React from 'react';
import { Check, MessageCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { BULK_PACKAGES, COMPANY_INFO } from '../data/mockData';

interface BulkPackagesProps {
  onSelectPackage: (packageTitle: string, count: number) => void;
}

export const BulkPackages: React.FC<BulkPackagesProps> = ({ onSelectPackage }) => {
  const handleOrderPackage = (pkg: (typeof BULK_PACKAGES)[0]) => {
    const text = encodeURIComponent(
      `Hello IDCraft India! I would like to order the "${pkg.title}" (${pkg.cardsCount} cards). Please share the onboarding process and sample proof.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="py-24 md:py-28 lg:py-[136px] bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2563EB] mb-3 block">
            CURATED INSTITUTIONAL BUNDLES
          </span>
          <h2 className="font-bold text-[30px] md:text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-[#0F172A] mb-4">
            Popular bulk ID card packages
          </h2>
          <p className="font-normal text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.01em] text-[#334155] max-w-[680px]">
            Turnkey manufacturing bundles with everything included: waterproof solid PVC cards, custom printed lanyards, scannable QR/barcodes, and express door delivery.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 items-stretch">
          {BULK_PACKAGES.map((pkg) => {
            const isPopular = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-[24px] bg-white p-5 flex flex-col justify-between transition-all duration-250 ${
                  isPopular
                    ? 'border-2 border-[#2563EB] shadow-lg lg:-translate-y-2'
                    : 'border border-[#E2E8F0] shadow-2xs hover:border-[#2563EB] hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2563EB] text-white shadow-xs whitespace-nowrap">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    {pkg.badge}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] leading-tight">
                    {pkg.title}
                  </h3>
                  <div className="mt-4 pb-4 border-b border-[#E2E8F0]">
                    <p className="text-sm font-bold text-[#0F172A]">
                      Volume: {pkg.cardsCount} cards
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-1">Dispatch: {pkg.turnaround}</p>
                  </div>

                  {/* Inclusions */}
                  <div className="mt-4 space-y-2">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                        <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button: WhatsApp CTA standard #22C55E */}
                <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                  <button
                    onClick={() => handleOrderPackage(pkg)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
