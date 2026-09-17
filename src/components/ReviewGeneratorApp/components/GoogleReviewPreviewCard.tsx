import React from 'react';
import { Star, CheckCircle2, ChevronRight, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { playTactileClick, triggerHaptic } from '../utils/audioFeedback';
import { GOOGLE_DIRECT_WRITE_REVIEW_URL } from '../data/customerSuggestions';

interface GoogleReviewPreviewCardProps {
  reviewText: string;
  rating: number;
  onRatingChange: (stars: number) => void;
  language?: string;
  categoryName?: string;
  onAppendTag?: (tagText: string) => void;
  onShuffle?: () => void;
  isShuffling?: boolean;
}

export const GoogleReviewPreviewCard: React.FC<GoogleReviewPreviewCardProps> = ({
  reviewText,
  rating,
  onRatingChange,
  onShuffle,
  isShuffling
}) => {
  const handleCopyAndOpen = async () => {
    playTactileClick();
    triggerHaptic(50);
    try {
      await navigator.clipboard.writeText(reviewText);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    window.open(GOOGLE_DIRECT_WRITE_REVIEW_URL, '_blank');
  };

  return (
    <div className="w-full max-w-[400px] mx-auto bg-[#fdfaf5] min-h-[700px] rounded-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden relative flex flex-col p-6 sm:p-8 font-sans border-[14px] border-black ring-4 ring-stone-800 outline outline-2 outline-stone-400">
      
      {/* Phone Notch / Speaker simulation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl flex items-center justify-center gap-2">
        <div className="w-12 h-1.5 bg-stone-800 rounded-full"></div>
        <div className="w-2 h-2 bg-blue-900 rounded-full opacity-50"></div>
      </div>

      {/* Main Call to Action */}
      <div className="mt-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          Leave us a <br />
          <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-400">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span> Review
        </h2>
      </div>

      {/* 5 Stars */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRatingChange(star)}
            className="focus:outline-none cursor-pointer"
          >
            <Star 
              className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 ${star <= rating ? 'fill-amber-400 text-amber-500 drop-shadow-sm scale-110' : 'fill-transparent text-stone-300'}`} 
            />
          </motion.button>
        ))}
      </div>
      <p className="text-center text-[11px] text-stone-400 mt-2">Tap to rate (5 stars)</p>

      {/* Review Text Box */}
      <div className="mt-8 bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm relative group">
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed pr-2">
          {reviewText}
          <span className="inline-block w-[2px] h-4 bg-amber-400 animate-pulse ml-1 align-middle"></span>
        </p>
        <div className="text-right text-[10px] text-stone-400 mt-3 font-mono">
          {reviewText.length}/500
        </div>
      </div>

      {/* Huge Gold Action Button + Shuffle */}
      <div className="mt-8 relative z-10 flex flex-col items-center">
        <div className="flex w-full gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleCopyAndOpen}
            className="flex-1 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full py-4 px-4 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-shadow border border-amber-300 cursor-pointer"
          >
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
               <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-red-500 to-yellow-500 text-sm">G</span>
            </div>
            <span className="font-black text-stone-900 text-base sm:text-lg">Copy & Open Google</span>
            <ChevronRight className="w-5 h-5 text-stone-900" />
          </motion.button>
          
          {onShuffle && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onShuffle}
              disabled={isShuffling}
              className="w-[60px] h-[60px] shrink-0 bg-white border-2 border-stone-200 shadow-lg rounded-full flex items-center justify-center text-stone-500 hover:text-amber-600 hover:border-amber-400 transition-all cursor-pointer disabled:opacity-50"
              title="Shuffle for a new suggestion"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isShuffling ? "animate-spin" : ""}>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </motion.button>
          )}
        </div>
        
        <p className="flex items-center gap-1.5 text-xs text-stone-500 mt-4 font-medium">
          Safe & opens directly to Google Maps
        </p>
      </div>

      <div className="mt-auto pt-8 text-center">
        <p className="text-[9px] font-bold tracking-[0.2em] text-stone-300">PEOPLE | IDENTITIES | ACHIEVEMENTS</p>
      </div>
    </div>
  );
};
