import React from 'react';
import { X, ShieldCheck, AlertTriangle, CheckCircle, Award, BookOpen } from 'lucide-react';

interface RulesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesGuideModal: React.FC<RulesGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-xl p-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-stone-900">
              IDCraft Technologies — Human Review Guidelines (v3.0)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-5 text-xs text-stone-700 leading-relaxed">
          {/* Section 1 */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Humanization & Psychology
            </div>
            <p>
              Reviews reflect authentic Indian context (e.g. NCR, Gurgaon, Lucknow, school academic sessions, volunteer drives). Randomize natural conversational anchors ("Honestly...", "The best part was...", "Worth the price", "Cards arrived before time").
            </p>
          </div>

          {/* Section 2: Prohibited */}
          <div className="p-3 bg-red-50/70 rounded-xl border border-red-200 space-y-1.5">
            <div className="font-semibold text-red-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Prohibited Patterns (Anti-AI & Anti-Spam)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-red-800">
              <li>Never say "best in India", "100% guaranteed", or marketing hype.</li>
              <li>No phone numbers, website URLs, discount codes, or hashtags.</li>
              <li>No excessive ALL CAPS or repetitive sentence openings.</li>
              <li>Strictly avoid robotic keyword stuffing.</li>
            </ul>
          </div>

          {/* Section 3: SEO Rules */}
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1.5">
            <div className="font-semibold text-amber-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-700" />
              Local SEO & Keyword Density
            </div>
            <p className="text-amber-800">
              Pool: PVC ID Cards, School ID Cards, Employee ID Cards, Student ID Cards, ID Card Printing, Lanyards, Certificates, Medals, Trophies, QR Code ID Cards, Custom ID Cards, School Branding.
            </p>
            <p className="text-amber-800 font-medium">
              Maximum Keyword Density: ≤2.0%. 2 to 4 keywords blended naturally per review.
            </p>
          </div>

          {/* Section 4: Target Distributions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div className="font-semibold text-stone-900 mb-1">Sentiment Target</div>
              <div>• 40% Casual</div>
              <div>• 25% Professional</div>
              <div>• 20% Warm / Emotional</div>
              <div>• 15% Concise / Minimal</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div className="font-semibold text-stone-900 mb-1">Length Targets</div>
              <div>• Short: 35–60 words</div>
              <div>• Standard: 60–110 words</div>
              <div>• Detailed: 110–180 words</div>
              <div>• Story: 180–250 words</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
