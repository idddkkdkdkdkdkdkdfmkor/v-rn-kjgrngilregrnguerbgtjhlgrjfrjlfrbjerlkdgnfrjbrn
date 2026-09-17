import React, { useState } from 'react';
import {
  Star,
  ChevronDown,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Building,
  HelpCircle,
} from 'lucide-react';
import { REVIEWS, FAQS, COMPANY_INFO } from '../data/mockData';

export const TestimonialsFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-24 md:py-28 lg:py-[136px] bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= TESTIMONIALS ================= */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-primary mb-3 block">
              Institutional testimonials
            </span>
            <h2 className="font-semibold text-[30px] md:text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-[#0F172A] mb-4">
              Trusted by school principals and operations directors
            </h2>
            <p className="font-normal text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.01em] text-[#334155] max-w-[680px] text-left">
              Review how administrative heads and facility managers assess card edge durability, photographic color accuracy, and dispatch reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>

                  {/* Feedback Quote */}
                  <p className="text-[14px] leading-[1.6] text-[#334155] font-normal">
                    "{t.comment}"
                  </p>

                  <div className="mt-4 inline-block px-2.5 py-1 rounded-md bg-brand-mint text-blue-800 text-[11px] font-medium">
                    Order volume: {t.cardsPrinted}
                  </div>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-[13px] font-semibold text-[#0F172A]">{t.author}</h4>
                    <p className="text-[12px] text-brand-primary font-medium">{t.role}</p>
                    <p className="text-[11px] text-[#64748B] font-normal">
                      {t.organization} • {t.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aggregate Rating Banner */}
          <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[14px] font-medium text-[#0F172A]">
                4.9 / 5.0 rating across 640+ verified institutional dispatches
              </span>
            </div>
            <div className="flex items-center gap-5 text-[13px] font-normal text-[#334155]">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> 100% replacement warranty
              </span>
              <span className="flex items-center gap-1.5 text-brand-dark">
                <ShieldCheck className="w-4 h-4" /> Formal GST invoicing (HSN 3920)
              </span>
            </div>
          </div>
        </div>

        {/* ================= FAQ SECTION ================= */}
        <div className="max-w-3xl">
          <div className="mb-10 text-left">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-primary mb-2 block">
              Frequently asked questions
            </span>
            <h2 className="font-semibold text-[26px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-[#0F172A] mb-3">
              Procurement specifications and ordering guidelines
            </h2>
            <p className="font-normal text-[15px] leading-[1.6] text-[#64748B]">
              Clear information regarding turnaround times, minimum batch quantities, sample proofs, and data security standards.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-[15px] text-[#0F172A] hover:text-brand-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-primary' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-[14px] leading-[1.65] text-[#334155] border-t border-slate-100 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
