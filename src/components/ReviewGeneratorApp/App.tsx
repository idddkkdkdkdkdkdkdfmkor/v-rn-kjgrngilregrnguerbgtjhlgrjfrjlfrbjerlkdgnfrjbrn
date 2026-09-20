import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import {
  Star,
  Shuffle,
  Copy,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import {
  getRandomFilteredReview,
  getFilteredReviews,
  detectKeywords,
  countWords,
} from './utils/generator';
import { REVIEW_CATEGORIES, ReviewItemData } from './data/reviewsDataset';
import {
  GOOGLE_DIRECT_WRITE_REVIEW_URL,
  GOOGLE_MAPS_LISTING_URL,
} from './data/customerSuggestions';
import { fireReviewConfetti } from './utils/confetti';

export default function ReviewGeneratorApp() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState<'Random' | 'English' | 'Hinglish' | 'Hindi'>('Random');
  const [currentReviewItem, setCurrentReviewItem] = useState<ReviewItemData>(() =>
    getRandomFilteredReview('all', 'Random')
  );
  const [reviewText, setReviewText] = useState(currentReviewItem.review);
  const [rating, setRating] = useState(5);
  const [copied, setCopied] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // When category or language changes, pick a matching review
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const newReview = getRandomFilteredReview(catId, selectedLanguage, currentReviewItem.id);
    setCurrentReviewItem(newReview);
    setReviewText(newReview.review);
  };

  const handleLanguageChange = (lang: 'Random' | 'English' | 'Hinglish' | 'Hindi') => {
    setSelectedLanguage(lang);
    const newReview = getRandomFilteredReview(selectedCategory, lang, currentReviewItem.id);
    setCurrentReviewItem(newReview);
    setReviewText(newReview.review);
  };

  const handleShuffle = () => {
    setIsShuffling(true);
    const newReview = getRandomFilteredReview(selectedCategory, selectedLanguage, currentReviewItem.id);
    setCurrentReviewItem(newReview);
    setReviewText(newReview.review);
    setTimeout(() => setIsShuffling(false), 200);
    toast.success('Loaded a fresh verified review template!');
  };

  const handleCopyAndOpen = async () => {
    try {
      await navigator.clipboard.writeText(reviewText);
      setCopied(true);
      fireReviewConfetti();
      toast.success('Review copied to clipboard! Opening Google Maps...');
      setTimeout(() => setCopied(false), 4000);
    } catch (err) {
      toast.error('Failed to copy. Please copy manually from the text box.');
    }

    // Open Google Review Link directly in new tab
    window.open(GOOGLE_DIRECT_WRITE_REVIEW_URL, '_blank');
  };

  const detectedKeywords = useMemo(() => detectKeywords(reviewText), [reviewText]);
  const wordCount = useMemo(() => countWords(reviewText), [reviewText]);

  const matchingCount = useMemo(() => {
    return getFilteredReviews(selectedCategory, selectedLanguage).length;
  }, [selectedCategory, selectedLanguage]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 py-8 px-4 sm:px-6 flex flex-col items-center justify-center font-sans selection:bg-amber-400 selection:text-black">
      <div className="w-full max-w-[460px] flex flex-col gap-5">
        
        {/* TOP BRAND HEADER */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-16 rounded-2xl bg-stone-900 text-amber-400 flex flex-col items-center justify-center font-black text-xl border-2 border-amber-400 shadow-md relative overflow-hidden flex-shrink-0">
              <div className="w-6 h-1.5 bg-amber-400 rounded-full mb-1"></div>
              <span>ID</span>
            </div>

            <div>
              <h1 className="text-xl font-black text-stone-900 leading-tight">
                IDCraft Technologies
              </h1>
              <p className="text-xs text-stone-500 font-medium">
                PVC ID Cards, Lanyards & Trophies
              </p>
              <div className="flex items-center gap-2 mt-1.5 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <span>⭐ 4.9</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                <span className="text-blue-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified on Google
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HERO TITLE & CALL TO ACTION */}
        <div className="text-center px-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
            Leave us a <span className="bg-gradient-to-r from-blue-600 via-red-500 to-amber-500 bg-clip-text text-transparent">Google</span> Review
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Choose your product, pick an authentic review, and tap to submit on Google Maps 💛
          </p>
        </div>

        {/* CATEGORY SELECTOR CHIPS */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1 text-xs text-stone-500 font-semibold">
            <span>Select Product / Deliverable:</span>
            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
              {matchingCount} Templates Available
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {REVIEW_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm border ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md scale-[1.02]'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* LANGUAGE SWITCHER BAR */}
        <div className="bg-white rounded-2xl p-1.5 border border-stone-200/80 shadow-sm flex items-center justify-between gap-1">
          {(['Random', 'English', 'Hinglish', 'Hindi'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                selectedLanguage === lang
                  ? 'bg-amber-400 text-stone-950 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {lang === 'Hindi' ? 'हिन्दी' : lang}
            </button>
          ))}
        </div>

        {/* MAIN REVIEW CARD */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-lg flex flex-col gap-4 relative">
          
          {/* Review Card Header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                {currentReviewItem.persona[0] || 'V'}
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <span>{currentReviewItem.persona || 'Verified Customer'}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500 text-xs font-medium">{currentReviewItem.location || 'India'}</span>
                </div>
                <div className="text-[11px] text-stone-400 font-medium">
                  Public review on Google Maps • {currentReviewItem.orderSize || 'Bulk Order'}
                </div>
              </div>
            </div>

            {/* Shuffle Button */}
            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className={`px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${
                isShuffling ? 'opacity-70 scale-95' : ''
              }`}
              title="Click to get another random review"
            >
              <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>Shuffle 🎲</span>
            </button>
          </div>

          {/* Interactive 5 Stars */}
          <div className="flex items-center justify-between border-y border-stone-100 py-2.5">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  className="focus:outline-none transition-transform hover:scale-110 active:scale-90"
                  aria-label={`${s} star rating`}
                >
                  <Star
                    className={`w-7 h-7 ${
                      s <= rating
                        ? 'fill-amber-400 text-amber-500 drop-shadow-sm'
                        : 'fill-transparent text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              5.0 Star Rating
            </span>
          </div>

          {/* Review Text Area */}
          <div className="relative">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={5}
              placeholder="Your review experience..."
              className="w-full bg-stone-50 border border-stone-200 focus:border-amber-400 focus:bg-white rounded-2xl p-3.5 text-sm text-stone-800 leading-relaxed outline-none transition-all resize-none font-sans"
            />

            <div className="flex items-center justify-between mt-1 px-1 text-[11px] text-stone-400 font-mono">
              <span>{wordCount} words</span>
              <span>{reviewText.length}/500 chars</span>
            </div>
          </div>

          {/* Detected Keywords Badges */}
          {detectedKeywords.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Keywords:</span>
              {detectedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* BIG GOOGLE COPY & POST BUTTON */}
          <button
            onClick={handleCopyAndOpen}
            className="w-full mt-2 py-4 px-6 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all cursor-pointer border-2 border-amber-300"
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
              <svg viewBox="0 0 48 48" width="20" height="20">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.6 15.5 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6.1 6.8l6.2 5.2C39 36.7 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"
                />
              </svg>
            </div>

            <span>{copied ? 'Copied! Opening Google...' : 'Copy & Open Google Review →'}</span>
          </button>

          <div className="text-center text-xs text-stone-400 flex items-center justify-center gap-1.5 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Copies text to clipboard & automatically opens 5-star review page</span>
          </div>
        </div>

        {/* QUICK SHARE / QR CODE FOOTER */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 text-center flex flex-col items-center gap-2 shadow-sm">
          <p className="text-xs font-bold text-stone-600">
            Scan QR to open this Review Tool on your mobile device:
          </p>
          <img
            src="/review-qr.png"
            alt="Scan QR for Review Tool"
            className="w-24 h-24 rounded-xl border border-stone-200 shadow-sm"
            onError={(e) => {
              // Hide image if not present on server
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex items-center gap-3 text-xs font-medium text-stone-500 pt-1">
            <a
              href={GOOGLE_MAPS_LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              View Google Maps Listing <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
