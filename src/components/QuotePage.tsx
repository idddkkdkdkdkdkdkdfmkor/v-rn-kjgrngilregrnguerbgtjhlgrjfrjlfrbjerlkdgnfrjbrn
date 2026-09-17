import React, { useState } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  MessageCircle,
  Calculator,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BulkPricingCalculator } from './BulkPricingCalculator';
import { BulkPackages } from './BulkPackages';
import { COMPANY_INFO } from '../data/mockData';

interface QuotePageProps {
  onBackToHome: () => void;
  onOpenWhatsApp: () => void;
  onOpenSampleKit: () => void;
  onSelectPackage: (title: string, count: number) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({
  onBackToHome,
  onOpenWhatsApp,
  onOpenSampleKit,
  onSelectPackage,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + '?page=quote';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const url = window.location.origin + window.location.pathname + '?page=quote';
    const text = `Hello! Here is the IDCraft India Bulk Pricing & Proforma Calculator link to get instantaneous factory estimates: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-primary selection:text-white pt-[72px]">
      {/* Top Utility Bar for Dedicated Client Page */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to IDCraft India</span>
          </button>

          {/* Page Badge */}
          <div className="hidden md:flex items-center gap-2 text-[12px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-800">Factory direct estimator</span>
            <span>•</span>
            <span className="font-normal">Bulk volume tiers & GST input credit</span>
          </div>

          {/* Share Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-medium transition-all border ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-300 shadow-2xs'
              }`}
              title="Copy shareable link for clients"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy link'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
              title="Share link via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Share on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[12px] font-semibold uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          Wholesale volume pricing
        </span>
        <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#0F172A] tracking-[-0.025em] leading-[1.15]">
          Institutional bulk pricing & proforma calculator
        </h1>
        <p className="mt-2.5 text-[15px] text-[#334155] max-w-2xl mx-auto font-normal leading-[1.6]">
          Configure card gauges, printed satin lanyards, and smart chips. Real-time factory rates include eligible 18% GST input credit.
        </p>
      </div>

      {/* Main Bulk Pricing Calculator */}
      <div className="pb-10">
        <BulkPricingCalculator onOpenSampleKit={onOpenSampleKit} />
      </div>

      {/* Turnkey Institutional Bulk Packages */}
      <div className="pb-16 border-t border-slate-200 bg-white">
        <BulkPackages onSelectPackage={onSelectPackage} />
      </div>

      {/* Bottom Assistance Banner */}
      <div className="border-t border-slate-200 bg-slate-900 text-white py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-[15px] font-semibold text-white">Need an official proforma invoice for tender or purchase committee approval?</h4>
            <p className="text-[13px] text-slate-400 font-normal mt-0.5">We issue stamped proformas with itemized HSN and GST breakdown within 15 minutes.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[13px] flex items-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Request stamped proforma</span>
            </button>
            <button
              onClick={onBackToHome}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-[13px] transition-colors"
            >
              Back to website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
