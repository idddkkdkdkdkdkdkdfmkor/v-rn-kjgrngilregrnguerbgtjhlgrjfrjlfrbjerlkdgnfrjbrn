import React, { useState, useRef } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Droplets,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-24 md:py-28 lg:py-[136px] bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2563EB] mb-3 block">
            QUALITY BENCHMARK
          </span>
          <h2 className="font-bold text-[30px] md:text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-[#0F172A] mb-4">
            Laminated paper cards compared with solid fused PVC
          </h2>
          <p className="font-normal text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.01em] text-[#334155] max-w-[680px] text-left">
            Inspect why institutions transition from peeling paper pouches to our 30mil thermal-fused polymer cards with 5-year anti-fade guarantees.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[430px] sm:h-[460px] rounded-[24px] overflow-hidden shadow-xl border-4 border-[#0F172A] select-none cursor-ew-resize bg-[#0F172A]"
          >
            {/* RIGHT SIDE: IDCRAFT ULTRA HD PVC (Background full view) */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex flex-col justify-between p-4 sm:p-8 md:p-12">
              {/* Badge */}
              <div className="flex justify-end">
                <span className="px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wider bg-[#22C55E]/20 text-emerald-300 border border-[#22C55E]/40 flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  IDCraft Solid PVC 30mil
                </span>
              </div>

              {/* Card Representation */}
              <div className="max-w-md mx-auto sm:ml-auto sm:mr-8 bg-white text-[#0F172A] rounded-2xl p-6 shadow-2xl border border-white/60">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 mb-4">
                  <div>
                    <h4 className="text-[14px] font-bold text-[#2563EB]">Delhi Public School</h4>
                    <p className="text-[11px] text-[#64748B] font-normal">CBSE Affiliated • New Delhi</p>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-mint text-[#2563EB]">
                    2025–26
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <img
                    src="/ceo-photo.jpg"
                    alt="Pristine HD Student"
                    className="w-20 h-24 object-cover rounded-xl border-2 border-[#2563EB] shadow-md"
                  />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-[#0F172A] text-sm">Jagjeet Singh</p>
                    <p className="text-[#2563EB] font-medium">Class X – B • Roll 4491</p>
                    <p className="text-[#334155] text-[11px]">Blood Group: B +ve</p>
                    <p className="text-[#16A34A] font-semibold text-[11px] flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-[#22C55E]" /> 100% waterproof fused core
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <div className="font-mono text-xs text-[#0F172A] font-semibold tracking-wider">
                    |||| || ||||| |||| ||
                  </div>
                  <span className="text-[11px] font-medium text-[#64748B]">
                    ISO 7810 ID-1 Standard
                  </span>
                </div>
              </div>

              {/* Inclusions checklist */}
              <div className="flex flex-wrap gap-4 text-[13px] font-normal text-slate-300 justify-end">
                <span className="flex items-center gap-1 text-[#22C55E]">
                  ✓ Scratch & alcohol proof
                </span>
                <span className="flex items-center gap-1 text-[#22C55E]">✓ Laser-sharp barcodes</span>
                <span className="flex items-center gap-1 text-[#22C55E]">✓ 5-year anti-peel warranty</span>
              </div>
            </div>

            {/* LEFT SIDE: CHEAP PAPER LAMINATED CARD (Clipped via sliderPosition) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-stone-900 via-neutral-900 to-stone-900 text-white flex flex-col justify-between p-4 sm:p-8 md:p-12 border-r-2 border-white"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Badge */}
              <div className="flex justify-start">
                <span className="px-4 py-1.5 rounded-full text-[12px] font-medium uppercase tracking-wider bg-rose-500/25 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Standard paper pouch card
                </span>
              </div>

              {/* Degraded Card Mockup */}
              <div className="max-w-md bg-stone-200 text-stone-800 rounded-lg p-6 shadow-inner border-2 border-amber-600/40 rotate-[-1.5deg] filter blur-[0.2px]">
                <div className="flex items-center justify-between border-b border-stone-300 pb-3 mb-4 opacity-75">
                  <div>
                    <h4 className="text-[14px] font-semibold text-stone-700 line-through">Delhi Public School</h4>
                    <p className="text-[11px] text-stone-500">Paper edge peeling...</p>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-stone-300 text-stone-700">
                    Faded ink
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <img
                      src="/ceo-photo.jpg"
                      alt="Faded Student"
                      className="w-20 h-24 object-cover rounded border border-stone-400 opacity-60 filter grayscale contrast-75"
                    />
                  </div>
                  <div className="space-y-1 text-xs opacity-75">
                    <p className="font-semibold text-stone-900 text-sm">Jagjeet Singh</p>
                    <p className="text-stone-600">Class X – B (Smudged)</p>
                    <p className="text-rose-700 font-medium text-[11px] flex items-center gap-1">
                      <Droplets className="w-3 h-3" /> Moisture leakage
                    </p>
                    <p className="text-stone-500 text-[10px]">Unreadable by scanner</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-300 flex items-center justify-between opacity-50">
                  <div className="font-mono text-xs text-stone-500">||| | | | ||| |</div>
                  <span className="text-[10px] text-rose-700 font-medium">Uncertified paper pouch</span>
                </div>
              </div>

              {/* Warnings */}
              <div className="flex flex-wrap gap-4 text-[13px] font-normal text-amber-200">
                <span className="text-rose-400">✗ Edges peel within 3 months</span>
                <span className="text-rose-400">✗ Rain destroys print layers</span>
                <span className="text-rose-400">✗ Frequent re-prints needed</span>
              </div>
            </div>

            {/* DRAGGABLE SLIDER DIVIDER LINE */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#0F172A] shadow-2xl flex items-center justify-center border-2 border-[#2563EB] font-semibold text-xs pointer-events-auto cursor-ew-resize">
                ⇄
              </div>
            </div>
          </div>

          <p className="text-center text-[14px] font-normal text-[#64748B] mt-4">
            Drag the handle horizontally to compare card edge durability and ink longevity.
          </p>
        </div>
      </div>
    </section>
  );
};
