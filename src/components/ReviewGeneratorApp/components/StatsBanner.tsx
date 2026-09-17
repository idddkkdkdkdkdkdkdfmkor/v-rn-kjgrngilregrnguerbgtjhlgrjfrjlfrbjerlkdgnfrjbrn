import React from 'react';
import { GeneratedReview } from '../types';
import { calculateKeywordDensity } from '../utils/generator';
import { Award, CheckCircle2, MapPin, Users, HeartHandshake, FileCheck } from 'lucide-react';

interface StatsBannerProps {
  reviews: GeneratedReview[];
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ reviews }) => {
  const casualCount = reviews.filter((r) => r.tone === 'Casual').length;
  const profCount = reviews.filter((r) => r.tone === 'Professional').length;
  const emotCount = reviews.filter((r) => r.tone === 'Emotional').length;
  const minCount = reviews.filter((r) => r.tone === 'Minimal').length;

  const total = reviews.length || 1;
  const casualPct = Math.round((casualCount / total) * 100);
  const profPct = Math.round((profCount / total) * 100);
  const emotPct = Math.round((emotCount / total) * 100);
  const minPct = Math.round((minCount / total) * 100);

  // Average density
  const totalDensity = reviews.reduce(
    (acc, r) => acc + calculateKeywordDensity(r.review, r.seoKeywords),
    0
  );
  const avgDensity = (totalDensity / total).toFixed(1);

  return (
    <div className="bg-stone-900 text-stone-200 rounded-2xl p-5 sm:p-6 mb-8 border border-stone-800 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Brand & Purpose description */}
        <div className="max-w-xl space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">
              Operational Quality Audit
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-xs text-stone-400">Google Business Profile Optimization</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Human Google Review Suite (25 Unique Personas)
          </h2>
          <p className="text-xs text-stone-400 leading-relaxed">
            Every review follows natural Indian conversational psychology across schools, colleges, corporate HRs, and startups in Delhi NCR, Mumbai, and Lucknow. Strictly avoids AI detection, marketing clichés, and keyword stuffing.
          </p>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-stone-800/80 rounded-xl p-3 border border-stone-700/60">
            <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
              <FileCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Reviews</span>
            </div>
            <div className="text-lg font-bold text-white">{reviews.length} Ready</div>
            <div className="text-[11px] text-emerald-400">100% Unique</div>
          </div>

          <div className="bg-stone-800/80 rounded-xl p-3 border border-stone-700/60">
            <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Personas</span>
            </div>
            <div className="text-lg font-bold text-white">10 Types</div>
            <div className="text-[11px] text-stone-400">Principals, HR, Startups</div>
          </div>

          <div className="bg-stone-800/80 rounded-xl p-3 border border-stone-700/60">
            <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>SEO Density</span>
            </div>
            <div className="text-lg font-bold text-white">{avgDensity}%</div>
            <div className="text-[11px] text-emerald-400">≤2.0% Safe Cap</div>
          </div>

          <div className="bg-stone-800/80 rounded-xl p-3 border border-stone-700/60">
            <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
              <span>Sentiments</span>
            </div>
            <div className="text-xs font-medium text-white space-y-0.5">
              <div>Casual {casualPct}% • Prof {profPct}%</div>
              <div className="text-[10px] text-stone-400">Warm {emotPct}% • Min {minPct}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
