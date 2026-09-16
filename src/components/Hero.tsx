import React, { useState } from 'react';
import {
  MessageCircle,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Truck,
  RotateCw,
  QrCode,
  Wifi,
  Package,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface HeroProps {
  onOpenWhatsApp: () => void;
  onExploreProducts: () => void;
  onOpenSampleKit: () => void;
  onOpenStudioLink: () => void;
  onOpenQuoteLink: () => void;
  onOpenSamples?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenWhatsApp,
  onExploreProducts,
  onOpenSampleKit,
  onOpenStudioLink,
  onOpenQuoteLink,
  onOpenSamples,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(37,99,235,0.07),rgba(255,255,255,1))] bg-white"
    >
      {/* Subtle background tech grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* Soft ambient blue mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Section Label */}
            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2563EB] mb-4 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              FACTORY-DIRECT PRODUCTION • ISO 7810 ID-1 SPECIFICATION
            </span>

            {/* Hero Heading: 700 weight, 64px desktop / 52px tablet / 38px mobile, line height 1.05, tracking -0.04em, no gradient */}
            <h1 className="font-bold text-[38px] md:text-[52px] lg:text-[64px] leading-[1.05] tracking-[-0.04em] text-[#0F172A] mb-6">
              Premium PVC identity cards for schools and companies.
            </h1>

            {/* Subheadline: 400 weight, 18px desktop / 16px mobile, line height 1.7, tracking -0.01em, max width 680px, left aligned */}
            <p className="font-normal text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.01em] text-[#334155] max-w-[680px] mb-8 text-left">
              Engineered with solid fused PVC, scratch-resistant thermal overlay layers, and optional 13.56 MHz RFID chips. Delivered across India with digital pre-press proofing within 4 hours.
            </p>

            {/* CTAs: 500 weight, 16px, tracking -0.01em, rounded with balanced padding */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-start gap-3 mb-8">
              {/* WhatsApp CTA: Background: #22C55E, Text: White, Hover: #16A34A */}
              <button
                id="hero-quote-whatsapp-btn"
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-[16px] tracking-[-0.01em] text-white bg-[#22C55E] hover:bg-[#16A34A] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get instant quote on WhatsApp</span>
              </button>

              {/* Primary CTA: Background: #2563EB, Text: White, Hover: #1D4ED8, Soft blue shadow on hover */}
              <button
                id="hero-products-btn"
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-[16px] tracking-[-0.01em] text-white bg-[#2563EB] hover:bg-[#1D4ED8] hover:shadow-lg hover:shadow-blue-600/20 transition-all group"
              >
                <span>Explore products</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Secondary Button: White background, Blue border, Blue text, Light gray hover */}
              <button
                id="hero-sample-kit-btn"
                onClick={onOpenSampleKit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-[15px] tracking-[-0.01em] text-[#2563EB] bg-white border border-[#2563EB] hover:bg-[#F8FAFC] transition-colors"
              >
                <Package className="w-4 h-4 text-[#2563EB]" />
                <span>Request sample kit</span>
              </button>
            </div>

            {/* Direct Client Tools Quick Links Banner */}
            <div className="flex flex-wrap items-center justify-start gap-2 text-[14px] text-[#64748B] mb-8 bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-2xs max-w-[680px]">
              <span className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                Direct client portals:
              </span>
              <button
                onClick={onOpenStudioLink}
                className="font-medium text-[#2563EB] hover:underline"
              >
                Interactive 3D Studio →
              </button>
              <span className="text-[#E2E8F0]">•</span>
              <button
                onClick={onOpenQuoteLink}
                className="font-medium text-[#2563EB] hover:underline"
              >
                Bulk price calculator →
              </button>
              {onOpenSamples && (
                <>
                  <span className="text-[#E2E8F0]">•</span>
                  <button
                    onClick={onOpenSamples}
                    className="font-semibold text-[#2563EB] hover:underline inline-flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                    Sample Proofs (5 Real Cards) →
                  </button>
                </>
              )}
            </div>

            {/* Key Bullet Highlights: font-normal 14px, #334155 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#E2E8F0] text-left max-w-[680px]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span className="text-[14px] font-normal text-[#334155]">100% waterproof PVC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span className="text-[14px] font-normal text-[#334155]">Turnstile RFID & barcode</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span className="text-[14px] font-normal text-[#334155]">Multi-color satin lanyard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span className="text-[14px] font-normal text-[#334155]">Fast 48-hour rush dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span className="text-[14px] font-normal text-[#334155]">Free sample kit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span className="text-[14px] font-normal text-[#334155]">18% GST input credit</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Floating Realistic Card Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Lanyard Top Suspension */}
            <div className="relative w-full flex flex-col items-center select-none">
              {/* Lanyard Ribbon */}
              <div className="w-14 h-16 bg-gradient-to-b from-blue-700 to-blue-800 rounded-t-sm shadow-md flex items-center justify-center overflow-hidden border-x border-blue-900/40 relative">
                <div className="text-[9px] text-blue-200/90 font-bold uppercase tracking-widest rotate-90 whitespace-nowrap">
                  IDCRAFT INDIA • PREMIUM
                </div>
                <div className="absolute inset-y-0 left-0 w-1 bg-white/20" />
                <div className="absolute inset-y-0 right-0 w-1 bg-black/20" />
              </div>

              {/* Lanyard Chrome Doghook Clasp */}
              <div className="w-10 h-7 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 rounded-b-md shadow-sm border border-slate-400 flex flex-col items-center justify-end pb-1 relative z-10">
                <div className="w-4 h-2 rounded-full border border-slate-600 bg-slate-100" />
              </div>

              {/* 3D Perspective Card Container */}
              <div
                className="perspective-1000 w-full max-w-[320px] sm:max-w-[340px] aspect-[1/1.58] cursor-pointer mt-1 group"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsFlipped(!isFlipped)}
                title="Click to flip card front/back"
              >
                <div
                  className={`w-full h-full relative duration-500 preserve-3d shadow-2xl rounded-2xl border border-slate-200/80 transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transform: isFlipped
                      ? `rotateY(180deg) rotateX(${mousePosition.y * -15}deg) rotateZ(${mousePosition.x * 5}deg)`
                      : `rotateY(${mousePosition.x * 20}deg) rotateX(${mousePosition.y * -20}deg)`,
                  }}
                >
                  {/* ================= CARD FRONT ================= */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-white flex flex-col justify-between p-5 border border-slate-200/90 shadow-inner">
                    {/* Glossy Reflective Sheen Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-tr from-transparent via-white/50 to-transparent"
                      style={{
                        transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
                      }}
                    />

                    {/* Card Slot Punch Hole */}
                    <div className="self-center w-12 h-3.5 rounded-full bg-slate-200/80 border border-slate-300/70 mb-1 flex items-center justify-center">
                      <div className="w-8 h-1 bg-slate-400/50 rounded-full" />
                    </div>

                    {/* Institution Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                          DPS
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">
                            DELHI PUBLIC SCHOOL
                          </h4>
                          <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                            GURUGRAM • ACADEMIC 2025–26
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Wifi className="w-4 h-4 text-blue-600 rotate-90" title="RFID 13.56 MHz" />
                      </div>
                    </div>

                    {/* Student Photo & Identity Core */}
                    <div className="flex flex-col items-center my-3 relative">
                      <div className="relative">
                        <img
                          src="/ceo-photo.jpg"
                          alt="Student Profile Sample"
                          className="w-24 h-28 object-cover rounded-xl border-2 border-blue-600 shadow-md"
                        />
                        {/* Hologram Security Seal */}
                        <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full hologram-effect border border-white shadow-xs flex items-center justify-center text-[8px] font-bold text-slate-800">
                          ID★
                        </div>
                      </div>

                      <h3 className="mt-3 text-base font-semibold text-[#0F172A]">Jagjeet Singh</h3>
                      <p className="text-[12px] font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full mt-0.5">
                        Class X – Section B
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="bg-slate-50/90 rounded-xl p-2.5 text-[11px] space-y-1 border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Roll No:</span>
                        <span className="font-bold text-slate-900">DPS-2025-4491</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Blood Group:</span>
                        <span className="font-bold text-rose-600">B +ve</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Emergency:</span>
                        <span className="font-bold text-slate-900">+91 98112 34567</span>
                      </div>
                    </div>

                    {/* Scannable Barcode Strip */}
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="font-mono text-[9px] text-slate-400 tracking-tighter">
                        ||| | |||| || ||||| |||| ||
                      </div>
                      <div className="text-[9px] font-semibold text-slate-400">
                        STUDENT IDENTITY CARD
                      </div>
                    </div>
                  </div>

                  {/* ================= CARD BACK ================= */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-white flex flex-col justify-between p-5 border border-slate-200/90 shadow-inner">
                    {/* Card Slot Punch Hole */}
                    <div className="self-center w-12 h-3.5 rounded-full bg-slate-200/80 border border-slate-300/70 mb-1 flex items-center justify-center">
                      <div className="w-8 h-1 bg-slate-400/50 rounded-full" />
                    </div>

                    {/* Header Instructions */}
                    <div className="text-center pb-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                        Terms & Instructions
                      </p>
                      <p className="text-[9px] text-slate-500 leading-tight mt-0.5">
                        This card must be worn at all times within school premises and school buses.
                      </p>
                    </div>

                    {/* QR Code & Bus Route */}
                    <div className="flex items-center gap-3 bg-blue-50/70 p-2.5 rounded-xl border border-blue-100">
                      <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                        <QrCode className="w-14 h-14 text-slate-900" />
                      </div>
                      <div className="text-[10px] space-y-0.5">
                        <p className="font-bold text-blue-900">Bus Route: 42-A</p>
                        <p className="text-slate-600">Stop: Sector 45 Gate 2</p>
                        <p className="text-[9px] text-slate-500">Scan QR for Live GPS & Parent Portal</p>
                      </div>
                    </div>

                    {/* Residential Address */}
                    <div className="text-[10px] text-slate-600 space-y-0.5 px-1">
                      <p className="font-bold text-slate-800">Residential Address:</p>
                      <p className="text-slate-500 text-[9px] leading-tight">
                        Flat 402, DLF Phase 4, Galleria Market Road, Gurugram, Haryana - 122002
                      </p>
                    </div>

                    {/* Signatory & Microchip ID */}
                    <div className="border-t border-slate-100 pt-2 flex items-end justify-between">
                      <div>
                        <p className="text-[8px] text-slate-400 uppercase">RFID UID: 4A:9C:31:FE</p>
                        <p className="text-[8px] text-slate-400">Mfg: IDCraft India ISO-7810</p>
                      </div>
                      <div className="text-right">
                        <div className="font-serif italic text-xs font-semibold text-blue-900">
                          P. K. Verma
                        </div>
                        <p className="text-[8px] font-bold text-slate-500 uppercase">Principal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Flip Hint */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer transition-colors"
              >
                <RotateCw className="w-3 h-3 text-blue-600" />
                <span>Click card to inspect {isFlipped ? 'Front' : 'Back'} side</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Statistics Strip */}
        <div className="mt-16 pt-8 border-t border-[#E2E8F0]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:border-[#2563EB] transition-colors">
              <div className="text-[28px] sm:text-[32px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight">
                {COMPANY_INFO.stats.cardsPrinted}
              </div>
              <div className="text-[14px] font-normal text-[#64748B] mt-1">
                Cards manufactured
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:border-[#2563EB] transition-colors">
              <div className="text-[28px] sm:text-[32px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight">
                {COMPANY_INFO.stats.institutions}
              </div>
              <div className="text-[14px] font-normal text-[#64748B] mt-1">
                Institutions served
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:border-[#2563EB] transition-colors">
              <div className="text-[28px] sm:text-[32px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight">
                {COMPANY_INFO.stats.onTimeRate}
              </div>
              <div className="text-[14px] font-normal text-[#64748B] mt-1">
                On-time dispatch rate
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:border-[#2563EB] transition-colors">
              <div className="text-[28px] sm:text-[32px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight">
                {COMPANY_INFO.stats.deliveryPincodes}
              </div>
              <div className="text-[14px] font-normal text-[#64748B] mt-1">
                PIN codes delivered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
