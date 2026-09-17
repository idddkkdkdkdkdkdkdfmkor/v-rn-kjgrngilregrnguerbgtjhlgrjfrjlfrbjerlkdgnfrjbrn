import React from 'react';
import {
  ShieldCheck,
  Building2,
  Cpu,
  Layers,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  MessageCircle,
  PackageCheck,
  Quote,
  Factory,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { IDCraftLogoSymbol } from './IDCraftLogo';

interface AboutCEOSectionProps {
  onOpenSampleKit: () => void;
  onOpenWhatsApp: () => void;
  onOpenQuote?: () => void;
}

export const AboutCEOSection: React.FC<AboutCEOSectionProps> = ({
  onOpenSampleKit,
  onOpenWhatsApp,
  onOpenQuote,
}) => {
  const { ceo, about } = COMPANY_INFO;

  return (
    <section id="about-section" className="py-20 sm:py-24 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint border border-brand-mint text-brand-dark text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Factory className="w-3.5 h-3.5 text-brand-primary" />
            <span>Direct B2B Manufacturing Facility</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
            About IDCraft India & Leadership
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {about.subheadline}
          </p>
        </div>

        {/* 1. About Company: Mission & 4 Industrial Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: Mission & Factory Credentials (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Subtle background circuit / grid pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/30 border border-brand-mint0/40 flex items-center justify-center text-blue-400 shadow-md">
                  <IDCraftLogoSymbol theme="white" size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white">IDCraft Technologies</h3>
                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    ISO 7810 ID-1 Standards Compliant
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-bold text-white tracking-tight leading-snug">
                  Our Institutional Mission
                </h4>
                <p className="text-sm text-slate-300 font-normal leading-relaxed">
                  {about.mission}
                </p>
              </div>

              {/* Manufacturing Stats Pill Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <p className="text-2xl font-bold text-white">{COMPANY_INFO.stats.cardsPrinted}</p>
                  <p className="text-xs text-slate-400 font-normal mt-0.5">Cards Printed to Date</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <p className="text-2xl font-bold text-emerald-400">{COMPANY_INFO.stats.institutions}</p>
                  <p className="text-xs text-slate-400 font-normal mt-0.5">Campuses & Corporates</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <p className="text-2xl font-bold text-blue-400">{COMPANY_INFO.stats.onTimeRate}</p>
                  <p className="text-xs text-slate-400 font-normal mt-0.5">On-Time Dispatch Rate</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <p className="text-2xl font-bold text-amber-400">{COMPANY_INFO.stats.deliveryPincodes}</p>
                  <p className="text-xs text-slate-400 font-normal mt-0.5">Pincodes Supported</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                Works: {COMPANY_INFO.factoryAddress}
              </span>
              <span className="text-emerald-400 font-medium">GST Registered</span>
            </div>
          </div>

          {/* Right Column: 4 Factory Quality Highlights (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {about.keyHighlights.map((hl, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-primary flex items-center justify-center mb-4">
                    {idx === 0 && <Factory className="w-5 h-5" />}
                    {idx === 1 && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
                    {idx === 2 && <Cpu className="w-5 h-5 text-purple-600" />}
                    {idx === 3 && <Clock className="w-5 h-5 text-brand-primary" />}
                  </div>
                  <h4 className="text-base font-bold text-[#0F172A] tracking-tight">{hl.title}</h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {hl.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-brand-primary">
                  <Check className="w-3.5 h-3.5" />
                  <span>Factory Verified Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Featured CEO Message Box */}
        <div className="relative bg-white rounded-3xl border-2 border-brand-mint shadow-xl overflow-hidden">
          {/* Top accent banner */}
          <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-mint0 to-emerald-500" />

          <div className="p-8 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* CEO Profile Badge & Verification (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-10">
                <div className="relative mb-5">
                  {/* Executive Avatar Container */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-slate-900 via-blue-950 to-blue-900 p-1 shadow-xl relative overflow-hidden flex items-center justify-center text-white">
                    <img
                      src="/ceo-photo.jpg"
                      alt="CEO Photo"
                      className="w-full h-full rounded-[22px] object-cover bg-slate-900"
                    />

                    {/* Verified badge icon */}
                    <div
                      className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-md"
                      title="Verified CEO & Founder"
                    >
                      <CheckCircle2 className="w-5 h-5 fill-current text-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-mint border border-brand-mint text-brand-dark text-xs font-semibold mb-2">
                    <Award className="w-3 h-3 text-brand-primary" />
                    <span>Founder & Chief Executive</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight">{ceo.name}</h3>
                  <p className="text-sm font-medium text-slate-600 mt-0.5">
                    Chief Executive Officer & Head of Works
                  </p>
                  <p className="text-xs text-slate-500 font-normal mt-1">
                    IDCraft Technologies India Pvt. Ltd.
                  </p>
                </div>

                {/* Direct Executive Contact Contacts */}
                <div className="mt-6 pt-5 border-t border-slate-200 w-full space-y-2 text-xs">
                  <a
                    href={`mailto:${ceo.directContact}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-brand-primary transition-colors font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>{ceo.directContact}</span>
                  </a>

                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-brand-primary transition-colors font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{COMPANY_INFO.phone} (Factory Desk)</span>
                  </a>
                </div>
              </div>

              {/* CEO Statement & Guarantee (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-2 text-brand-primary">
                  <Quote className="w-8 h-8 text-brand-mint0/30 -scale-x-100" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-dark">
                    A Message from Our Leadership
                  </span>
                </div>

                <blockquote className="text-base sm:text-lg lg:text-xl font-normal text-[#1E293B] leading-relaxed italic">
                  "{ceo.message}"
                </blockquote>

                {/* Signature Block & Commitments */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <p className="text-2xl sm:text-3xl font-serif italic text-[#0F172A] tracking-wide select-none">
                      {ceo.signature}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                      {ceo.name} • Chief Executive Officer
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={onOpenSampleKit}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-mint hover:bg-brand-mint text-brand-dark font-semibold text-xs sm:text-sm border border-brand-mint transition-colors shadow-2xs"
                    >
                      <PackageCheck className="w-4 h-4 text-brand-primary" />
                      <span>Request Free Sample Kit</span>
                    </button>

                    <button
                      onClick={onOpenWhatsApp}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat with Factory Team</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom assurance footer bar */}
          <div className="bg-slate-900 text-slate-300 px-6 sm:px-12 py-3.5 text-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Backed by 100% Solid PVC Thermal Fused Quality Guarantee. Zero Paper Laminates.</span>
            </div>
            <div className="text-slate-400">
              Direct Invoicing with GST HSN Code 3920
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
