import React from 'react';
import {
  GraduationCap,
  Building2,
  Stethoscope,
  Briefcase,
  Factory,
  Ticket,
  Dumbbell,
  Landmark,
  ArrowUpRight,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { INDUSTRIES } from '../data/mockData';

interface IndustriesServedProps {
  onSelectIndustry: (industryName: string) => void;
}

export const IndustriesServed: React.FC<IndustriesServedProps> = ({ onSelectIndustry }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'schools':
        return <GraduationCap className="w-6 h-6 text-blue-600" />;
      case 'universities':
        return <Building2 className="w-6 h-6 text-indigo-600" />;
      case 'hospitals':
        return <Stethoscope className="w-6 h-6 text-emerald-600" />;
      case 'corporate':
        return <Briefcase className="w-6 h-6 text-slate-800" />;
      case 'manufacturing':
        return <Factory className="w-6 h-6 text-amber-600" />;
      case 'events':
        return <Ticket className="w-6 h-6 text-purple-600" />;
      default:
        return <Landmark className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="industries-section" className="py-24 md:py-28 lg:py-[136px] bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-blue-600 mb-3 block">
            Specialized sectors
          </span>
          <h2 className="font-semibold text-[30px] md:text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-[#0F172A] mb-4">
            Tailored card architecture for every sector
          </h2>
          <p className="font-normal text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.01em] text-[#334155] max-w-[680px] text-left">
            Every sector has distinct operational demands—from CBSE transport guidelines and hospital antiseptic wiping to corporate biometric turnstiles and shop-floor grease resistance.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-lg hover:border-blue-400 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(ind.id)}
                  </div>
                  <span className="text-[12px] font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    {ind.turnaroundTime}
                  </span>
                </div>

                <h3 className="card-title group-hover:text-blue-600 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-[13px] font-medium text-[#64748B] mt-1">{ind.tagline}</p>

                <p className="text-[14px] font-normal leading-[1.6] text-[#334155] mt-3">{ind.description}</p>

                {/* Key Features */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">
                    Sector inclusions
                  </p>
                  {ind.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[14px] font-normal text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[12px] text-[#64748B] block font-light">Typical batch</span>
                  <span className="text-[13px] font-medium text-[#0F172A]">{ind.typicalVolume}</span>
                </div>
                <button
                  onClick={() => onSelectIndustry(ind.name)}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-[13px] font-medium hover:bg-blue-600 transition-colors group-hover:bg-blue-600"
                >
                  <span>Explore sector</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
