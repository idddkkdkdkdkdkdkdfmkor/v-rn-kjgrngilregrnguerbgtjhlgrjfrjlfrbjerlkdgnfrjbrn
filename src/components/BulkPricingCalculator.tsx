import React, { useState } from 'react';
import {
  Calculator,
  MessageCircle,
  Sparkles,
  Percent,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { CalculatorState, QuoteBreakdown } from '../types';
import { COMPANY_INFO } from '../data/mockData';

export const BulkPricingCalculator: React.FC<{ onOpenSampleKit: () => void }> = ({
  onOpenSampleKit,
}) => {
  const [calc, setCalc] = useState<CalculatorState>({
    quantity: 500,
    isDoubleSided: true,
    thickness: '30mil',
    finish: 'gloss',
    lanyard: 'satin-20mm-printed',
    lanyardColor: '#2563eb',
    holder: 'hard-acrylic',
    techAddon: 'barcode-qr',
    hologramSeal: true,
  });

  const calculateQuote = (): QuoteBreakdown => {
    // Base card pricing per quantity tier
    let baseRate = 26;
    if (calc.quantity >= 5000) baseRate = 12;
    else if (calc.quantity >= 2500) baseRate = 14;
    else if (calc.quantity >= 1000) baseRate = 16;
    else if (calc.quantity >= 500) baseRate = 18;
    else if (calc.quantity >= 250) baseRate = 22;
    else if (calc.quantity >= 100) baseRate = 25;

    // Single vs double sided
    if (!calc.isDoubleSided) {
      baseRate -= 2;
    }

    // 40mil extra gauge
    if (calc.thickness === '40mil') {
      baseRate += 4;
    }

    // Lanyard add-on
    let lanyardRate = 0;
    if (calc.lanyard === 'plain-16mm') lanyardRate = 6;
    else if (calc.lanyard === 'satin-20mm-printed') lanyardRate = 11;
    else if (calc.lanyard === 'premium-doghook') lanyardRate = 15;

    // Card holder add-on
    let holderRate = 0;
    if (calc.holder === 'soft-pouch') holderRate = 3;
    else if (calc.holder === 'hard-acrylic') holderRate = 7;
    else if (calc.holder === 'magnetic-badge') holderRate = 16;

    // Tech chip add-on
    let techRate = 0;
    if (calc.techAddon === 'barcode-qr') techRate = 0; // Included free
    else if (calc.techAddon === 'rfid-1356') techRate = 12;
    else if (calc.techAddon === 'nfc-ntag213') techRate = 18;
    else if (calc.techAddon === 'magnetic-stripe') techRate = 6;

    // Hologram seal
    const holoRate = calc.hologramSeal ? 2 : 0;

    const totalPerCard = baseRate + lanyardRate + holderRate + techRate + holoRate;
    const subtotal = totalPerCard * calc.quantity;

    // Bulk discount tiers
    let discountPct = 0;
    if (calc.quantity >= 5000) discountPct = 35;
    else if (calc.quantity >= 2500) discountPct = 25;
    else if (calc.quantity >= 1000) discountPct = 20;
    else if (calc.quantity >= 500) discountPct = 15;
    else if (calc.quantity >= 250) discountPct = 10;

    const originalSubtotal = (totalPerCard + 8) * calc.quantity; // benchmarked against low-quantity retail
    const savings = originalSubtotal - subtotal;
    const discountedSubtotal = subtotal;
    const gstAmount = Math.round(discountedSubtotal * 0.18);
    const estimatedTotal = discountedSubtotal + gstAmount;

    return {
      baseCardPrice: baseRate,
      lanyardPrice: lanyardRate,
      holderPrice: holderRate,
      techPrice: techRate,
      hologramPrice: holoRate,
      totalPerCard,
      subtotal,
      discountPercentage: discountPct,
      savings,
      discountedSubtotal,
      gstAmount,
      estimatedTotal,
    };
  };

  const quote = calculateQuote();

  const handleWhatsAppOrderQuote = () => {
    const text = encodeURIComponent(
      `Hello IDCraft India! I calculated a bulk quote on your website:\n` +
        `• Quantity: ${calc.quantity} Cards\n` +
        `• Thickness: ${calc.thickness} (${calc.finish} finish, ${
          calc.isDoubleSided ? 'Dual-Sided' : 'Single-Sided'
        })\n` +
        `• Lanyard: ${calc.lanyard}\n` +
        `• Holder: ${calc.holder}\n` +
        `• Tech: ${calc.techAddon}\n` +
        `• Hologram: ${calc.hologramSeal ? 'Yes' : 'No'}\n\n` +
        `Please confirm sample proof and dispatch timeline.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="pricing-section" className="py-24 md:py-28 lg:py-[136px] bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2563EB] mb-3 block">
            INSTITUTIONAL PRICING ESTIMATOR
          </span>
          <h2 className="font-bold text-[30px] md:text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-[#0F172A] mb-4">
            Instant bulk pricing calculator
          </h2>
          <p className="font-normal text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.01em] text-[#334155] max-w-[680px]">
            Configure card gauge, custom lanyard branding, RFID microchips, and protective card holders. Volume manufacturing tiers are calculated automatically.
          </p>
        </div>

        {/* Two Columns: Configurator on Left, Live Quotation Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= CONTROLS (7 cols) ================= */}
          <div className="lg:col-span-7 bg-[#F8FAFC] p-6 sm:p-8 rounded-[24px] border border-[#E2E8F0] shadow-2xs space-y-6">
            {/* 1. Quantity Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  1. Order Quantity (Cards)
                </label>
                <span className="text-lg font-bold text-[#2563EB]">
                  {calc.quantity.toLocaleString('en-IN')} Cards
                </span>
              </div>

              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={calc.quantity}
                onChange={(e) =>
                  setCalc((prev) => ({ ...prev, quantity: parseInt(e.target.value) || 50 }))
                }
                className="w-full h-2.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />

              {/* Preset Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[100, 250, 500, 1000, 2500, 5000].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setCalc((prev) => ({ ...prev, quantity: qty }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      calc.quantity === qty
                        ? 'bg-[#2563EB] text-white shadow-2xs'
                        : 'bg-white text-[#334155] hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB]'
                    }`}
                  >
                    {qty} Cards
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Thickness & Sides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-2">
                  2. Card Thickness (Gauge)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCalc((prev) => ({ ...prev, thickness: '30mil' }))}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      calc.thickness === '30mil'
                        ? 'border-[#2563EB] bg-white text-[#2563EB] ring-1 ring-[#2563EB] font-bold shadow-2xs'
                        : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#2563EB] font-medium'
                    }`}
                  >
                    <span className="block">30 mil (0.76mm)</span>
                    <span className="text-[10px] text-[#64748B]">Standard Bank ID</span>
                  </button>
                  <button
                    onClick={() => setCalc((prev) => ({ ...prev, thickness: '40mil' }))}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      calc.thickness === '40mil'
                        ? 'border-[#2563EB] bg-white text-[#2563EB] ring-1 ring-[#2563EB] font-bold shadow-2xs'
                        : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#2563EB] font-medium'
                    }`}
                  >
                    <span className="block">40 mil (1.0mm)</span>
                    <span className="text-[10px] text-[#64748B]">Heavy Industrial</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-2">
                  Print Sides
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCalc((prev) => ({ ...prev, isDoubleSided: true }))}
                    className={`p-3 rounded-xl border text-center text-xs transition-all ${
                      calc.isDoubleSided
                        ? 'border-[#2563EB] bg-white text-[#2563EB] ring-1 ring-[#2563EB] font-bold shadow-2xs'
                        : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#2563EB] font-medium'
                    }`}
                  >
                    <span>Dual-Sided Color</span>
                  </button>
                  <button
                    onClick={() => setCalc((prev) => ({ ...prev, isDoubleSided: false }))}
                    className={`p-3 rounded-xl border text-center text-xs transition-all ${
                      !calc.isDoubleSided
                        ? 'border-[#2563EB] bg-white text-[#2563EB] ring-1 ring-[#2563EB] font-bold shadow-2xs'
                        : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#2563EB] font-medium'
                    }`}
                  >
                    <span>Single-Sided</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Lanyard Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-2">
                3. Neck Lanyard Ribbon
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'plain-16mm', label: '16mm Plain Satin', desc: 'Standard width' },
                  {
                    id: 'satin-20mm-printed',
                    label: '20mm Custom Printed Logo',
                    desc: 'Best Value',
                  },
                  {
                    id: 'premium-doghook',
                    label: 'Metal Clasp Executive',
                    desc: 'Premium Feel',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCalc((prev) => ({ ...prev, lanyard: item.id as any }))}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      calc.lanyard === item.id
                        ? 'border-[#2563EB] bg-white text-[#2563EB] ring-1 ring-[#2563EB] font-bold shadow-2xs'
                        : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#2563EB] font-medium'
                    }`}
                  >
                    <p className="leading-tight">{item.label}</p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Protective Card Holder */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-2">
                4. Protective Card Holder / Case
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'Slot-Punch Only', desc: 'Direct Clip' },
                  { id: 'soft-pouch', label: 'Clear Soft Pouch', desc: 'Lightweight' },
                  { id: 'hard-acrylic', label: 'Rigid Acrylic Case', desc: 'Durable' },
                  { id: 'magnetic-badge', label: 'Magnetic Badge', desc: 'Damage-Free' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCalc((prev) => ({ ...prev, holder: item.id as any }))}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      calc.holder === item.id
                        ? 'border-[#2563EB] bg-white text-[#2563EB] ring-1 ring-[#2563EB] font-bold shadow-2xs'
                        : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#2563EB] font-medium'
                    }`}
                  >
                    <p className="leading-tight text-[11px]">{item.label}</p>
                    <p className="text-[9px] text-[#64748B] mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Technology & Security Addon */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-2">
                5. Scannable Technology & Smart Chips
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'barcode-qr', label: 'Code 128 / Dynamic QR', desc: 'Included FREE' },
                  { id: 'rfid-1356', label: 'RFID 13.56 MHz (Mifare 1K)', desc: 'Contactless' },
                  { id: 'nfc-ntag213', label: 'Smart NFC (NTAG213)', desc: 'Tap-to-scan' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCalc((prev) => ({ ...prev, techAddon: item.id as any }))}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      calc.techAddon === item.id
                        ? 'border-[#2563EB] bg-white text-[#2563EB] ring-1 ring-[#2563EB] font-bold shadow-2xs'
                        : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#2563EB] font-medium'
                    }`}
                  >
                    <p className="leading-tight">{item.label}</p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Hologram Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <span className="text-xs font-medium text-[#0F172A]">
                  Apply 3D Tamper-Evident Holographic Seal
                </span>
              </div>
              <input
                type="checkbox"
                checked={calc.hologramSeal}
                onChange={(e) => setCalc((prev) => ({ ...prev, hologramSeal: e.target.checked }))}
                className="w-4 h-4 text-[#2563EB] rounded focus:ring-[#2563EB] cursor-pointer accent-[#2563EB]"
              />
            </div>
          </div>

          {/* ================= LIVE QUOTATION PROFORMA (5 cols) ================= */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white p-6 sm:p-8 rounded-[24px] shadow-xl sticky top-28 border border-[#1E293B]">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#64748B]">
                  INSTITUTIONAL ESTIMATE
                </span>
                <h3 className="text-xl font-bold text-white">Proforma Quotation</h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 text-xs font-bold flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Save ~{quote.discountPercentage}%</span>
              </div>
            </div>

            {/* Action Driven Configuration Summary */}
            <div className="space-y-3 text-sm border-b border-[#1E293B] pb-6 mb-6 text-slate-300">
              <p>You have configured a package of <strong>{calc.quantity} units</strong>.</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
                <li>Base PVC ({calc.thickness}, {calc.isDoubleSided ? 'Dual' : 'Single'} Side)</li>
                {quote.lanyardPrice > 0 && <li>Custom Lanyard Ribbon included</li>}
                {quote.holderPrice > 0 && <li>Protective Case / Holder included</li>}
                {quote.techPrice > 0 && <li>Smart RFID/NFC Chip Core</li>}
                {quote.hologramPrice > 0 && <li>3D Security Hologram Stamp</li>}
              </ul>
              <div className="mt-4 p-3 bg-blue-900/30 border border-blue-800 rounded-lg">
                <p className="text-xs text-blue-200">
                  Submit this configuration to get a customized price quote with our best B2B wholesale rates.
                </p>
              </div>
            </div>

            {/* Assurance Bullet points */}
            <div className="space-y-1.5 text-[11px] text-slate-400 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                <span>Free digital mockups & sample card proof prior to production</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                <span>GST Tax Invoice provided for institutional input credit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                <span>100% Replacement guarantee for any print or chip defects</span>
              </div>
            </div>

            {/* Actions: Primary WhatsApp & Secondary Sample Kit */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppOrderQuote}
                className="w-full py-3.5 px-4 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Lock Quote & Order on WhatsApp</span>
              </button>

              <button
                onClick={onOpenSampleKit}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Request Free Physical Sample Kit First</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
