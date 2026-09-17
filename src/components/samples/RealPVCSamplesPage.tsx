import React, { useState } from 'react';
import { REAL_PVC_SAMPLES, PVCSampleCardData } from '../../data/realPVCSamplesData';
import { HandHeldCardPair } from './HandHeldCardPair';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  CheckCircle2,
  FileCheck,
  Phone,
  MessageCircle,
  Eye,
  Camera,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

interface RealPVCSamplesPageProps {
  onBackToHome: () => void;
  onOpenWhatsApp: () => void;
  onOpenSampleKit: () => void;
  onOpenInquiry: (productOrInstName?: string) => void;
}

export const RealPVCSamplesPage: React.FC<RealPVCSamplesPageProps> = ({
  onBackToHome,
  onOpenWhatsApp,
  onOpenSampleKit,
  onOpenInquiry,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredSamples = selectedFilter === 'all'
    ? REAL_PVC_SAMPLES
    : REAL_PVC_SAMPLES.filter((s) => s.id === selectedFilter || s.theme.includes(selectedFilter));

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20 pt-[72px] selection:bg-brand-primary selection:text-white">
      {/* Sticky Top Navigation Bar */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-mint text-brand-dark border border-brand-mint">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              Printed PVC Portfolio
            </span>
            <button
              onClick={onOpenSampleKit}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Get Physical Sample Kit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/70 text-blue-800 text-xs font-bold mb-3 border border-brand-mint/80">
            <ShieldCheck className="w-4 h-4 text-brand-dark" />
            OFFICIAL ID CARD MANUFACTURER SAMPLE PROOFS
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Printed PVC Sample Proofs
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            All physical sample proofs and institutional production cards housed in this dedicated proofing showcase.
            Front and back faces displayed together with studio lighting, physical PVC texture, and privacy blurs.
          </p>

          {/* Key Manufacturing Specs Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-slate-700">
            <span className="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-2xs font-semibold">
              ✔ ISO/IEC 7810 ID-1 (CR-80: 85.60 × 53.98 mm)
            </span>
            <span className="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-2xs font-semibold">
              ✔ 30 Mil (0.76 mm) Solid Fused PVC
            </span>
            <span className="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-2xs font-semibold">
              ✔ Matte PolyGuard Anti-Scratch
            </span>
            <span className="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-2xs font-semibold">
              ✔ Standard 14 × 3 mm Oval Lanyard Slot
            </span>
          </div>
        </div>

        {/* Real Physical Hand-Held Samples Showcase */}
        <div className="mt-12">
          {/* Institution Filter Tabs */}
          <div className="mb-8 flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                All 5 Samples
              </button>
              <button
                onClick={() => setSelectedFilter('sample-cbse-school')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedFilter === 'sample-cbse-school'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                1. CBSE School
              </button>
              <button
                onClick={() => setSelectedFilter('sample-it-company')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedFilter === 'sample-it-company'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                2. IT Company
              </button>
              <button
                onClick={() => setSelectedFilter('sample-hospital-staff')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedFilter === 'sample-hospital-staff'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                3. Hospital Staff
              </button>
              <button
                onClick={() => setSelectedFilter('sample-engineering-college')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedFilter === 'sample-engineering-college'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                4. Engineering College
              </button>
              <button
                onClick={() => setSelectedFilter('sample-gym-club')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedFilter === 'sample-gym-club'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                5. Gym / Club VIP
              </button>
            </div>
          </div>

          {/* The 5 Real Samples Showcase Grid */}
          <div className="space-y-12">
            {filteredSamples.map((sample) => (
              <HandHeldCardPair
                key={sample.id}
                sample={sample}
                onOpenInquiry={(inst) => onOpenInquiry(`Custom PVC Cards like ${inst}`)}
              />
            ))}
          </div>
        </div>

        {/* Bottom Order & Inquiry Callout */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 rounded-2xl p-6 sm:p-10 text-white border border-slate-800 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Print Identity Cards for Your Organization?
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              We manufacture customized solid PVC cards for schools, universities, hospitals, and corporate clients across India.
              Enjoy 48-hour rush dispatch, free proofing, and zero-defect quality guarantee.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onOpenInquiry('Solid PVC ID Cards')}
                className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-md transition-colors"
              >
                Request Instant Bulk Quote
              </button>
              <button
                onClick={onOpenWhatsApp}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp (+91 {COMPANY_INFO.whatsappNumber})
              </button>
              <button
                onClick={onOpenSampleKit}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
              >
                Order Free Physical Sample Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
