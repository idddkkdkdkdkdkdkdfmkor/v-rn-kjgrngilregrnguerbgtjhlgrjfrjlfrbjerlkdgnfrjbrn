import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export const TrustedByMarquee: React.FC = () => {
  const logos = [
    { name: 'Delhi Public School', type: 'K-12 Network', badge: 'DPS' },
    { name: 'Apollo Hospitals', type: 'Healthcare Chain', badge: 'Apollo' },
    { name: 'IIT Roorkee', type: 'National Institute', badge: 'IITR' },
    { name: 'Tata Motors', type: 'Automotive Plant', badge: 'TATA' },
    { name: 'Ryan International', type: 'Education Group', badge: 'Ryan' },
    { name: 'Infosys Campus Hub', type: 'IT Enterprise', badge: 'Infosys' },
    { name: 'FIITJEE Hub', type: 'Premier Coaching', badge: 'FIITJEE' },
    { name: 'Max Healthcare', type: 'Super Speciality', badge: 'MAX' },
    { name: 'Amity University', type: 'Deemed University', badge: 'Amity' },
    { name: 'Larsen & Toubro', type: 'Heavy Industrial', badge: 'L&T' },
    { name: 'Allen Career Institute', type: 'National Coaching', badge: 'ALLEN' },
  ];

  return (
    <section className="py-12 bg-[#F8FAFC] border-y border-[#E2E8F0] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2563EB]">
            TRUSTED BY 1,450+ INSTITUTIONS ACROSS INDIA
          </p>
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#334155]">
            <Award className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span>CBSE, ICSE & ISO 7810 ID-1 manufacturing standards</span>
          </div>
        </div>
      </div>

      {/* Marquee Row */}
      <div className="relative w-full flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-6 sm:gap-8 items-center py-2">
          {logos.concat(logos).map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs hover:border-[#2563EB] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-bold text-[12px] text-[#0F172A]">
                {item.badge}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#0F172A] leading-tight">{item.name}</p>
                <p className="text-[12px] font-normal text-[#64748B]">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
