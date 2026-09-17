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
    <div className="w-full max-w-[400px] mx-auto bg-[#fdfaf5] min-h-[600px] rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col p-6 sm:p-8 font-sans border-8 border-stone-950">
      
      {/* Header Profile */}
      <div className="flex items-center gap-4 mt-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-b from-stone-900 to-black rounded-[20px] shadow-xl flex items-center justify-center p-2 relative shrink-0">
           {/* Gold Shield */}
           <svg viewBox="0 0 100 120" className="w-full h-full fill-amber-300 drop-shadow-md">
             <path d="M50 0 L100 15 L100 70 C100 95 50 120 50 120 C50 120 0 95 0 70 L0 15 Z" className="fill-stone-950 stroke-amber-300 stroke-[4px]" />
           </svg>
           <span className="absolute font-bold text-amber-300 text-2xl sm:text-3xl tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>ID</span>
           {/* Lanyard punch hole simulation */}
           <div className="absolute top-2 w-4 h-1 bg-black/50 rounded-full"></div>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight tracking-tight">IDCraft<br/>Technologies</h1>
          <p className="text-[10px] sm:text-xs text-stone-600 font-medium mt-1">Custom PVC Cards, Lanyards & Trophies</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] sm:text-xs font-bold text-stone-800">
            <span>4.9</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-stone-300 mx-1">|</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
            <span className="text-blue-600">Verified on Google</span>
          </div>
        </div>
      </div>

      {/* Main Call to Action */}
      <div className="mt-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          Leave us a <br />
          <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-400">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span> Review
        </h2>
        <p className="text-sm text-stone-500 mt-2 font-medium">Your feedback helps our small business grow ??</p>
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
              className={\w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 \\} 
            />
          </motion.button>
        ))}
      </div>
      <p className="text-center text-[11px] text-stone-400 mt-2">Tap to rate (5 stars)</p>

      {/* Review Text Box */}
      <div className="mt-8 bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm relative">
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed pr-2">
          {reviewText}
          <span className="inline-block w-[2px] h-4 bg-amber-400 animate-pulse ml-1 align-middle"></span>
        </p>
        <div className="text-right text-[10px] text-stone-400 mt-3 font-mono">
          {reviewText.length}/500
        </div>
      </div>

      {/* Huge Gold Action Button */}
      <div className="mt-8 relative z-10 flex flex-col items-center">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleCopyAndOpen}
          className="w-full bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full py-4 px-6 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-shadow border border-amber-300 cursor-pointer"
        >
          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
             <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-red-500 to-yellow-500 text-sm">G</span>
          </div>
          <span className="font-black text-stone-900 text-lg">Copy & Open Google</span>
          <ChevronRight className="w-6 h-6 text-stone-900" />
        </motion.button>
        
        <p className="flex items-center gap-1.5 text-xs text-stone-500 mt-4 font-medium">
          <span className="text-[10px]">??</span> Safe & opens directly to Google Maps
        </p>
      </div>

      <div className="mt-auto pt-8 text-center">
        <p className="text-[9px] font-bold tracking-[0.2em] text-stone-300">PEOPLE | IDENTITIES | ACHIEVEMENTS</p>
      </div>
    </div>
  );
};
