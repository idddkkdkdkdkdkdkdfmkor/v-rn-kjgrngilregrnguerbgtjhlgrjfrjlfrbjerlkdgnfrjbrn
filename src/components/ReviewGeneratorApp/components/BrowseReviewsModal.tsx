import React, { useState, useMemo } from 'react';
import { Search, X, Check, Copy, ExternalLink, Star, Filter, Sparkles } from 'lucide-react';
import { REVIEWS_DATASET, REVIEW_CATEGORIES, ReviewItemData } from '../data/reviewsDataset';
import { GOOGLE_DIRECT_WRITE_REVIEW_URL } from '../data/customerSuggestions';

interface BrowseReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReview: (reviewText: string) => void;
  currentCategory?: string;
}

export const BrowseReviewsModal: React.FC<BrowseReviewsModalProps> = ({
  isOpen,
  onClose,
  onSelectReview,
  currentCategory = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedLanguage, setSelectedLanguage] = useState<'All' | 'English' | 'Hinglish' | 'Hindi'>('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [displayLimit, setDisplayLimit] = useState(30);

  const filteredReviews = useMemo(() => {
    return REVIEWS_DATASET.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Language filter
      if (selectedLanguage !== 'All' && item.language !== selectedLanguage) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText = item.review.toLowerCase().includes(q);
        const matchesPersona = item.persona.toLowerCase().includes(q);
        const matchesLocation = item.location.toLowerCase().includes(q);
        const matchesKeywords = item.seoKeywords.some((k) => k.toLowerCase().includes(q));
        return matchesText || matchesPersona || matchesLocation || matchesKeywords;
      }
      return true;
    });
  }, [selectedCategory, selectedLanguage, searchQuery]);

  if (!isOpen) return null;

  const handleCopyReview = async (item: ReviewItemData) => {
    try {
      await navigator.clipboard.writeText(item.review);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectAndClose = (reviewText: string) => {
    onSelectReview(reviewText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white text-slate-900 w-full max-w-4xl h-[90vh] max-h-[850px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Browse 1,600+ Verified Templates
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Select any real customer review or copy directly to Google Maps
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-200/80 hover:bg-stone-300 flex items-center justify-center transition-colors text-stone-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTROLS BAR: SEARCH & FILTERS */}
        <div className="p-4 border-b border-stone-100 bg-white flex flex-col gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keywords (e.g. RFID, Principal, Lucknow, Satin Lanyard, Trophy)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayLimit(30);
              }}
              className="w-full bg-stone-100 pl-10 pr-10 py-2.5 rounded-full text-sm outline-none border border-transparent focus:border-amber-400 focus:bg-white transition-all text-stone-900 placeholder:text-stone-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {REVIEW_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setDisplayLimit(30);
                }}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Language Switcher & Result Count */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400 font-medium hidden sm:inline">Language:</span>
              {(['All', 'English', 'Hinglish', 'Hindi'] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => {
                    setSelectedLanguage(lng);
                    setDisplayLimit(30);
                  }}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    selectedLanguage === lng
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'text-stone-500 hover:text-stone-900 bg-stone-50'
                  }`}
                >
                  {lng === 'Hindi' ? 'हिन्दी' : lng}
                </button>
              ))}
            </div>

            <div className="text-stone-500 font-semibold">
              Showing <span className="text-stone-900 font-bold">{Math.min(displayLimit, filteredReviews.length)}</span> of {filteredReviews.length}
            </div>
          </div>
        </div>

        {/* REVIEW LIST CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/50">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <Filter className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-base font-semibold text-stone-600">No matching reviews found</p>
              <p className="text-xs text-stone-400 mt-1">Try broadening your search term or selecting another category</p>
            </div>
          ) : (
            filteredReviews.slice(0, displayLimit).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 group"
              >
                {/* Review Header Meta */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      {item.persona[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                        <span>{item.persona}</span>
                        <span className="text-stone-300">•</span>
                        <span className="text-stone-500 text-xs font-medium">{item.location}</span>
                      </div>
                      <div className="text-[11px] text-stone-400 flex items-center gap-1">
                        <span className="text-amber-500 font-bold">★★★★★</span>
                        <span>•</span>
                        <span>{item.orderSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      {item.language}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      #{item.id}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-stone-800 text-sm leading-relaxed font-sans">
                  {item.review}
                </p>

                {/* Keywords Used */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.seoKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                    >
                      🏷️ {kw}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                  <span className="text-stone-400 font-mono text-[11px]">
                    {item.wordCount} words
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyReview(item)}
                      className="px-3 py-1.5 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold flex items-center gap-1 transition-all"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleSelectAndClose(item.review)}
                      className="px-4 py-1.5 rounded-full bg-stone-900 hover:bg-black text-white font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Use this Review</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Load More Button */}
          {displayLimit < filteredReviews.length && (
            <div className="text-center pt-2 pb-4">
              <button
                onClick={() => setDisplayLimit((prev) => prev + 40)}
                className="px-6 py-2.5 rounded-full bg-white border border-stone-300 hover:border-stone-900 text-stone-800 font-bold text-xs shadow-sm transition-all"
              >
                Load More (+40 reviews)
              </button>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-stone-100 bg-white flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All 1,600+ reviews comply with Google Maps guidelines</span>
          </div>

          <a
            href={GOOGLE_DIRECT_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
          >
            Open Google Maps directly <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
