import React, { useState } from 'react';
import {
  Layers,
  Printer,
  Scissors,
  Cpu,
  ShieldCheck,
  Sparkles,
  Truck,
  FileCheck,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { MANUFACTURING_STEPS } from '../data/mockData';

export const ManufacturingQuality: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-blue-600" />;
      case 'Printer':
        return <Printer className="w-5 h-5 text-indigo-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-600" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-amber-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-500" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-blue-700" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="manufacturing-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            Zero-Defect Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Industrial-Grade Manufacturing Process
          </h2>
          <p className="mt-3 text-base text-slate-600">
            How we transform raw German imported PVC substrate into waterproof, scannable,
            bank-grade credentials across our high-capacity central Lucknow manufacturing facility.
          </p>
        </div>

        {/* 8-Step Timeline Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {MANUFACTURING_STEPS.map((item, index) => {
            const isSelected = activeStep === index;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      STEP {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center">
                      {getStepIcon(item.icon)}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Spotlight of the Active Step */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-extrabold tracking-widest text-blue-400 uppercase">
                SPOTLIGHT: STEP {MANUFACTURING_STEPS[activeStep].step}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4 font-display">
                {MANUFACTURING_STEPS[activeStep].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {MANUFACTURING_STEPS[activeStep].description}
              </p>

              <div className="flex flex-wrap gap-4 mt-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> 100% Guaranteed Tolerance
                </span>
                <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Optical Verification
                </span>
                <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> ISO/IEC 7810 ID-1 Spec
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center mb-3">
                  {getStepIcon(MANUFACTURING_STEPS[activeStep].icon)}
                </div>
                <h4 className="text-sm font-bold text-white">Daily Production Capacity</h4>
                <p className="text-2xl font-black text-emerald-400 font-display mt-1">
                  50,000+ Cards
                </p>
                <p className="text-[11px] text-slate-400 mt-1">24/7 Automated Production Lines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
