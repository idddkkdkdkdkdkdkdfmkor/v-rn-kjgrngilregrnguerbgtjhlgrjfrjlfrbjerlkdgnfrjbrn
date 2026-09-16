import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Eye,
  HelpCircle,
} from 'lucide-react';
import { LiveIDCardGenerator } from './LiveIDCardGenerator';
import { COMPANY_INFO } from '../data/mockData';

interface StudioPageProps {
  onBackToHome: () => void;
  onOpenWhatsApp: () => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({
  onBackToHome,
  onOpenWhatsApp,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + '?page=studio';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const url = window.location.origin + window.location.pathname + '?page=studio';
    const text = `Hello! Here is the IDCraft India Interactive 3D ID Card Studio link to design and preview institutional cards in real time: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-blue-600 selection:text-white pt-[72px]">
      {/* Top Utility Bar for Dedicated Client Page */}
      <div className="sticky top-[72px] z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to IDCraft India</span>
          </button>

          {/* Page Badge */}
          <div className="hidden md:flex items-center gap-2 text-[12px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-medium text-slate-200">Institutional client portal</span>
            <span>•</span>
            <span className="font-normal">Live 3D customizer & proofing</span>
          </div>

          {/* Share Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-medium transition-colors border ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border-slate-700'
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
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[12px] font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive 3D proofing studio
        </span>
        <h1 className="text-[28px] sm:text-[36px] font-semibold text-white tracking-[-0.025em] leading-[1.15]">
          Customize institutional identity cards in real-time
        </h1>
        <p className="mt-2.5 text-[15px] text-slate-300 max-w-2xl mx-auto font-normal leading-[1.6]">
          Choose formats, edit institutional details, test color themes, and inspect front and reverse sides in 3D before placing your manufacturing order.
        </p>
      </div>

      {/* Main Live Generator Component */}
      <div className="pb-16">
        <LiveIDCardGenerator />
      </div>

      {/* Bottom Floating Assistance Banner */}
      <div className="border-t border-slate-800 bg-slate-950 py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-[15px] font-semibold text-white">Need customized template artwork or ERP sync?</h4>
            <p className="text-[13px] text-slate-400 font-normal mt-0.5">Our pre-press prep department creates custom production proofs at zero charge.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[13px] flex items-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send design on WhatsApp</span>
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
