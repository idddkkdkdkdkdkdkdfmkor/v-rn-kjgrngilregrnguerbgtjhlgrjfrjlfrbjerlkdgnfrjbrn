import React from 'react';
import { Star, CheckCircle2, Sparkles, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playTactileClick, triggerHaptic } from '../utils/audioFeedback';

interface GoogleReviewPreviewCardProps {
  reviewText: string;
  rating: number;
  onRatingChange: (stars: number) => void;
  language: string;
  categoryName: string;
  onAppendTag: (tagText: string) => void;
  onShuffle: () => void;
  isShuffling: boolean;
}

const QUICK_PRAISE_CHIPS = [
  { id: 'quality', label: '+ Top Print Finish', text: ' The print resolution and vibrant colors on the cards look crisp and professional.' },
  { id: 'delivery', label: '+ Fast Turnaround', text: ' Really impressed with their quick turnaround time and prompt communication.' },
  { id: 'lanyards', label: '+ Durable Lanyards', text: ' The lanyard material and sturdy metal hook clips feel built to last.' },
  { id: 'pricing', label: '+ Affordable Rates', text: ' Extremely fair and budget-friendly pricing for bulk institutional orders.' },
];

export const GoogleReviewPreviewCard: React.FC<GoogleReviewPreviewCardProps> = ({
  reviewText,
  rating,
  onRatingChange,
  language,
  categoryName,
  onAppendTag,
  onShuffle,
  isShuffling,
}) => {
  return (
    <div className="stitch-card stitch-seam rounded-2xl p-4 sm:p-5 space-y-3.5 transition-all relative overflow-hidden texture-lanyard-ribbon">
      {/* ID Badge Lanyard Punch Slot (Physical Craft Detail) */}
      <div className="flex items-center justify-center -mt-2.5 pb-1">
        <div className="w-16 h-2 rounded-full bg-stone-200 border border-stone-300 shadow-inner flex items-center justify-center">
          <div className="w-10 h-0.5 rounded-full bg-stone-300"></div>
        </div>
      </div>

      {/* Google Maps Header Simulation */}
      <div className="flex items-center justify-between border-b border-stone-200/60 pb-3 gap-2 relative z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-500 via-amber-600 to-yellow-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0 ring-2 ring-amber-200">
            <span>G</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs sm:text-sm font-bold text-stone-900 font-display">
                You (Verified Client)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-500 pt-1">
              <span>Posting for IDCraft Technologies</span>
              <span>•</span>
              <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Public
              </span>
            </div>
          </div>
        </div>

        {/* Shuffle Button with Stitched Needlework Tag */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          type="button"
          onClick={() => {
            playTactileClick();
            triggerHaptic(20);
            onShuffle();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100/70 hover:bg-amber-100 text-amber-950 border border-dashed border-amber-400/90 transition-colors shadow-2xs cursor-pointer min-h-[36px]"
          title="Shuffle to another authentic suggestion"
        >
          <motion.span
            animate={{ rotate: isShuffling ? 360 : 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
          </motion.span>
          <span>🎲 Shuffle</span>
        </motion.button>
      </div>

      {/* Interactive 5-Star Rating Selector with Thread Border */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-50/90 px-3 py-2 rounded-xl border border-dashed border-amber-300/80 relative z-20">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-stone-700">Rating:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((starVal) => {
              const isFilled = starVal <= rating;
              return (
                <button
                  key={starVal}
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    triggerHaptic(15);
                    onRatingChange(starVal);
                  }}
                  className="cursor-pointer p-0.5 transition-transform hover:scale-125 active:scale-95"
                  title={`${starVal} Star`}
                >
                  <Star
                    className={`w-5 h-5 transition-colors ${
                      isFilled
                        ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md border border-dashed border-amber-400/70">
            5.0★ Experience
          </span>
          <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
            {language}
          </span>
        </div>
      </div>

      {/* 1-Tap Quick Praise Add-ons with Embroidered Stitched Edge */}
      <div className="space-y-1.5 pt-0.5 relative z-20">
        <div className="flex items-center justify-between text-[11px] text-stone-500">
          <span className="font-semibold text-stone-700 flex items-center gap-1">
            <Plus className="w-3 h-3 text-amber-700" />
            1-Tap Quick Praise (embroidered praise tags):
          </span>
          <span className="text-[10px] text-stone-400">Optional</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {QUICK_PRAISE_CHIPS.map((chip) => (
            <motion.button
              whileTap={{ scale: 0.94 }}
              key={chip.id}
              type="button"
              onClick={() => {
                playTactileClick();
                triggerHaptic(20);
                onAppendTag(chip.text);
              }}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white hover:bg-amber-50 active:bg-amber-100 text-stone-800 hover:text-amber-950 border border-dashed border-stone-300 hover:border-amber-400 transition-colors shrink-0 whitespace-nowrap shadow-2xs cursor-pointer"
            >
              {chip.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
