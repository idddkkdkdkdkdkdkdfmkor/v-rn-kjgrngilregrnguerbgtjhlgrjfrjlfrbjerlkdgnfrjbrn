import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  CATEGORIES,
  CLIENT_REVIEWS,
  GOOGLE_REVIEW_URL,
  GOOGLE_DIRECT_WRITE_REVIEW_URL,
  GOOGLE_MAPS_LISTING_URL,
  OFFICIAL_WEBSITE_URL,
  ClientReviewItem,
} from './data/customerSuggestions';
import { QRCodeModal } from './components/QRCodeModal';
import { GoogleReviewPreviewCard } from './components/GoogleReviewPreviewCard';
import { playTactileClick, playChimeSuccess, triggerHaptic } from './utils/audioFeedback';
import { fireReviewConfetti } from './utils/confetti';
import {
  Star,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  QrCode,
  ShieldCheck,
  Pencil,
  Globe,
  Smartphone,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type LanguageFilter = 'random' | 'Hinglish' | 'English' | 'Hindi';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageFilter>('random');
  const [currentReviewId, setCurrentReviewId] = useState<string>(() => {
    // Pick random English or Hinglish review on initial load
    const initialPool = CLIENT_REVIEWS.filter(
      (r) => r.language === 'English' || r.language === 'Hinglish'
    );
    const randomIndex = Math.floor(Math.random() * initialPool.length);
    return initialPool[randomIndex]?.id || CLIENT_REVIEWS[0].id;
  });
  const [customText, setCustomText] = useState<string>('');
  const [copiedState, setCopiedState] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [redirectNotice, setRedirectNotice] = useState<boolean>(false);
  const [isScannedVisitor, setIsScannedVisitor] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(5);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  const reviewSectionRef = useRef<HTMLDivElement>(null);

  // Detect if visitor scanned QR code via URL parameter or hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const hash = window.location.hash;
      if (search.includes('scan=') || hash.includes('review')) {
        setIsScannedVisitor(true);
      }
    }
  }, []);

  // Helper to pick a distinct random review from a pool
  const pickRandomFromPool = (pool: ClientReviewItem[], excludeId?: string): string => {
    if (pool.length === 0) return CLIENT_REVIEWS[0].id;
    const candidates = pool.filter((r) => r.id !== excludeId);
    const valid = candidates.length > 0 ? candidates : pool;
    const picked = valid[Math.floor(Math.random() * valid.length)];
    return picked.id;
  };

  // Filter reviews based on category and language
  const filteredSuggestions = useMemo(() => {
    let pool = CLIENT_REVIEWS;
    if (selectedLanguage === 'random') {
      pool = CLIENT_REVIEWS.filter((r) => r.language === 'English' || r.language === 'Hinglish');
    } else {
      pool = CLIENT_REVIEWS.filter((r) => r.language === selectedLanguage);
    }

    if (selectedCategory !== 'all') {
      const matchCat = pool.filter((r) => r.category === selectedCategory);
      if (matchCat.length > 0) pool = matchCat;
    }
    return pool.length > 0 ? pool : CLIENT_REVIEWS;
  }, [selectedCategory, selectedLanguage]);

  // Current active review suggestion
  const activeReviewItem: ClientReviewItem = useMemo(() => {
    const found = filteredSuggestions.find((r) => r.id === currentReviewId);
    return found || filteredSuggestions[0] || CLIENT_REVIEWS[0];
  }, [filteredSuggestions, currentReviewId]);

  // Display text: custom edit or suggestion
  const displayReviewText = customText !== '' ? customText : activeReviewItem.text;

  // Category select
  const handleCategorySelect = (catId: string) => {
    playTactileClick();
    triggerHaptic(15);
    setSelectedCategory(catId);
    let pool = CLIENT_REVIEWS;
    if (selectedLanguage === 'random') {
      pool = CLIENT_REVIEWS.filter((r) => r.language === 'English' || r.language === 'Hinglish');
    } else {
      pool = CLIENT_REVIEWS.filter((r) => r.language === selectedLanguage);
    }
    if (catId !== 'all') {
      const matchCat = pool.filter((r) => r.category === catId);
      if (matchCat.length > 0) pool = matchCat;
    }
    const nextId = pickRandomFromPool(pool, currentReviewId);
    setCurrentReviewId(nextId);
    setCustomText('');
    setCopiedState(false);
  };

  // Language select
  const handleLanguageSelect = (lang: LanguageFilter) => {
    playTactileClick();
    triggerHaptic(15);
    setSelectedLanguage(lang);
    let pool = CLIENT_REVIEWS;
    if (lang === 'random') {
      pool = CLIENT_REVIEWS.filter((r) => r.language === 'English' || r.language === 'Hinglish');
    } else {
      pool = CLIENT_REVIEWS.filter((r) => r.language === lang);
    }
    if (selectedCategory !== 'all') {
      const matchCat = pool.filter((r) => r.category === selectedCategory);
      if (matchCat.length > 0) pool = matchCat;
    }
    const nextId = pickRandomFromPool(pool, currentReviewId);
    setCurrentReviewId(nextId);
    setCustomText('');
    setCopiedState(false);
  };

  // Next suggestion shuffle (guarantees picking a different review)
  const handleNextSuggestion = () => {
    setIsShuffling(true);
    const nextId = pickRandomFromPool(filteredSuggestions, currentReviewId);
    setCurrentReviewId(nextId);
    setCustomText('');
    setCopiedState(false);
    setTimeout(() => setIsShuffling(false), 350);
  };

  // Append quick praise snippet to current review
  const handleAppendPraiseTag = (tagSnippet: string) => {
    const current = displayReviewText.trim();
    if (!current.includes(tagSnippet.trim())) {
      setCustomText(`${current} ${tagSnippet.trim()}`);
      setCopiedState(false);
    }
  };

  // Robust clipboard copy with fallback
  const copyTextToClipboard = (text: string) => {
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        copied = false;
      }
    }
    if (!copied) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('Copy fallback failed:', err);
      }
    }
  };

  // Primary Action: Copy text, trigger celebration sound/confetti, and open Google Write Review
  const handleCopyAndOpenGoogle = (e?: React.MouseEvent) => {
    copyTextToClipboard(displayReviewText);
    setCopiedState(true);
    setRedirectNotice(true);

    // Rich audiovisual and haptic celebration
    playChimeSuccess();
    triggerHaptic(40);
    fireReviewConfetti();

    // Direct window open if not an active anchor default
    if (!e || (e.currentTarget.tagName !== 'A')) {
      try {
        window.open(GOOGLE_DIRECT_WRITE_REVIEW_URL, '_blank', 'noopener,noreferrer');
      } catch {
        window.location.href = GOOGLE_DIRECT_WRITE_REVIEW_URL;
      }
    }

    setTimeout(() => {
      setRedirectNotice(false);
    }, 10000);
  };

  // Copy Only (discrete)
  const handleJustCopy = () => {
    playTactileClick();
    triggerHaptic(25);
    copyTextToClipboard(displayReviewText);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2500);
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-stone-900 font-sans flex flex-col justify-between selection:bg-amber-200 texture-lanyard-ribbon">
      {/* Precision Brand Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Foundry Obsidian & Stitched Gold Monogram */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center font-bold text-xs sm:text-sm tracking-wider shadow-xs stitch-dark-seam ring-1 ring-amber-500/50 shrink-0">
              ID
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight leading-tight font-display">
                  IDCraft Technologies
                </h1>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500">
                <span className="flex items-center text-amber-600 font-semibold">
                  4.9 <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500 inline ml-0.5" />
                </span>
                <span>•</span>
                <span className="truncate max-w-[180px] sm:max-w-none">
                  Custom PVC Cards, Lanyards & Trophies
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setShowQrModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-stone-50 text-stone-800 border border-dashed border-stone-300 hover:border-amber-500 transition-colors shadow-2xs cursor-pointer min-h-[36px]"
              title="Print QR Standee for Store Desk"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">QR Standee</span>
              <span className="sm:hidden text-[11px]">QR Standee</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Single-View Layout */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-3 sm:px-4 py-3 sm:py-5 space-y-3 sm:space-y-4 pb-6">
        {/* Scanned Visitor Welcome Banner with Stitched Seam */}
        {isScannedVisitor && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 rounded-xl shadow-xs flex items-center gap-2.5 border-2 border-dashed border-stone-950/40 relative overflow-hidden"
          >
            <Smartphone className="w-5 h-5 shrink-0" />
            <div className="text-xs leading-tight">
              <span className="font-bold font-display">QR Code Scanned! </span>
              <span>Pick your product, copy your 5★ review, and paste directly on Google.</span>
            </div>
          </motion.div>
        )}

        {/* Hero Section */}
        <div ref={reviewSectionRef} id="review-section" className="space-y-2.5 sm:space-y-3">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center gap-1 text-amber-500 py-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <motion.button
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  key={s}
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    triggerHaptic(20);
                    setUserRating(s);
                  }}
                  className="cursor-pointer p-0.5"
                >
                  <Star
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                      s <= userRating
                        ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                        : 'text-stone-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            <h2 className="text-base sm:text-xl font-bold text-stone-900 tracking-tight font-display">
              Rate IDCraft Technologies 5★ on Google
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-600 max-w-md mx-auto">
              1-tap copy, customize if you like, and paste directly to Google Maps!
            </p>
          </div>

          {/* Success Redirect Toast Notice */}
          <AnimatePresence>
            {redirectNotice && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 sm:p-4 bg-emerald-50 border-2 border-dashed border-emerald-500 rounded-2xl text-xs text-emerald-950 space-y-3 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-sm text-emerald-950 flex items-center gap-1.5 font-display">
                      <span>Review Copied to Clipboard!</span>
                    </div>
                    <div className="text-xs text-emerald-900 leading-relaxed">
                      Google Review box is opening in your browser. Follow these 2 quick steps:
                    </div>
                  </div>
                </div>

                {/* 2-Step Visual Flow */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-stone-800">
                  <div className="bg-white/95 p-2.5 rounded-xl border border-dashed border-emerald-300 text-center space-y-1">
                    <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Step 1
                    </span>
                    <p className="text-[11px] font-semibold text-stone-900">Tap Review Box</p>
                    <p className="text-[10px] text-stone-500">Tap into the empty text field on Google</p>
                  </div>
                  <div className="bg-white/95 p-2.5 rounded-xl border border-dashed border-amber-400 text-center space-y-1">
                    <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                      Step 2
                    </span>
                    <p className="text-[11px] font-semibold text-stone-900">Tap &quot;Paste&quot;</p>
                    <p className="text-[10px] text-stone-500">Long-press &amp; Paste (or tap clipboard on keyboard)</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-dashed border-emerald-200 text-[11px]">
                  <span className="text-emerald-800 text-[10px]">
                    🔒 Protected by Google Account Privacy Policy
                  </span>
                  <a
                    href={GOOGLE_DIRECT_WRITE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs"
                  >
                    <span>Re-open Google Box</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Master Review Workstation Card with Tailored Stitched Border */}
          <div className="stitch-card stitch-seam rounded-2xl p-3.5 sm:p-5 space-y-3.5 border border-stone-200">
            {/* Category Selector with Embroidered Patch Tabs */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-amber-700" /> What did you order?
                </span>
                <span className="text-[11px] text-stone-400 font-normal">Swipe embroidered tags</span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 shadow-2xs min-h-[40px] cursor-pointer ${
                        isSelected
                          ? 'bg-stone-950 text-amber-300 shadow-sm border border-dashed border-amber-400 font-bold stitch-dark-seam'
                          : 'bg-stone-50 text-stone-700 border border-dashed border-stone-300 hover:border-amber-400 hover:bg-white active:bg-stone-100'
                      }`}
                    >
                      <span className="text-sm">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Language Style Selector as Tailored Ribbon Swatches */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-50/90 p-2.5 rounded-xl border border-dashed border-stone-300 gap-2">
              <div className="flex items-center gap-1.5 pl-0.5">
                <span className="text-xs font-semibold text-stone-800">Language Style:</span>
                <span className="text-[10px] text-stone-500 hidden sm:inline">(shuffles automatically)</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { id: 'random' as const, label: '🎲 Random' },
                  { id: 'Hinglish' as const, label: 'Hinglish' },
                  { id: 'English' as const, label: 'English' },
                  { id: 'Hindi' as const, label: 'Hindi' },
                ].map((item) => {
                  const isSelected = selectedLanguage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleLanguageSelect(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs shrink-0 whitespace-nowrap min-h-[36px] cursor-pointer active:scale-95 ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 font-bold shadow-xs border border-dashed border-stone-900'
                          : 'text-stone-600 bg-white hover:bg-stone-100 border border-dashed border-stone-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Live Google Review Card with Stitched Lanyard Punch */}
            <GoogleReviewPreviewCard
              reviewText={displayReviewText}
              rating={userRating}
              onRatingChange={(s) => setUserRating(s)}
              language={activeReviewItem.language}
              categoryName={activeCategoryObj.name}
              onAppendTag={handleAppendPraiseTag}
              onShuffle={handleNextSuggestion}
              isShuffling={isShuffling}
            />

            {/* Editable Review Textarea with Stitched Inset Border */}
            <div className="space-y-1.5 pt-0.5">
              <div className="relative">
                <textarea
                  value={displayReviewText}
                  onChange={(e) => {
                    setCustomText(e.target.value);
                    setCopiedState(false);
                  }}
                  rows={3}
                  className="w-full text-base sm:text-sm text-stone-800 leading-relaxed p-3 bg-stone-50/90 rounded-xl border-2 border-dashed border-stone-300 focus:border-amber-500 focus:outline-none focus:bg-white resize-y shadow-inner font-sans transition-colors"
                  placeholder="Your review text will appear here..."
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-400 px-1">
                <span className="flex items-center gap-1">
                  <Pencil className="w-3 h-3 text-amber-700" />
                  Tap above to tailor your review words
                </span>
                <span>
                  {displayReviewText.trim().split(/\s+/).filter(Boolean).length} words • {displayReviewText.length} chars
                </span>
              </div>
            </div>

            {/* THE MASTER PRIMARY ACTION: Stitched Lanyard Strap Button */}
            <div className="pt-2 space-y-2.5">
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={GOOGLE_DIRECT_WRITE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCopyAndOpenGoogle}
                className="w-full py-3.5 sm:py-4 px-4 rounded-xl text-sm sm:text-base font-bold bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-stone-950 shadow-md flex flex-col items-center justify-center gap-1 transition-all cursor-pointer text-center no-underline select-none min-h-[56px] border-2 border-dashed border-stone-950/40 stitch-btn-strap relative overflow-hidden group"
              >
                <div className="flex items-center justify-center gap-2 relative z-20">
                  {copiedState ? (
                    <>
                      <Check className="w-5 h-5 text-stone-950 animate-bounce" />
                      <span className="font-extrabold font-display tracking-wide">
                        Copied! Opening Google Reviews...
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 text-stone-950" />
                      <span className="font-extrabold font-display tracking-wide">
                        Copy Review &amp; Open Google
                      </span>
                      <ExternalLink className="w-4 h-4 text-stone-900" />
                    </>
                  )}
                </div>
                <span className="text-[11px] font-medium text-stone-900/85 relative z-20">
                  {copiedState
                    ? '✓ Text in clipboard • Simply tap "Paste" on Google'
                    : '1-tap copies text & opens Google review box ready to paste'}
                </span>
              </motion.a>

              {/* Touch-Friendly Action Tiles with Stitched Dashed Seams */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <button
                  type="button"
                  onClick={handleJustCopy}
                  className="p-2.5 rounded-xl bg-white active:bg-stone-100 border border-dashed border-stone-300 text-[11px] font-semibold text-stone-700 flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[44px] transition-colors shadow-2xs hover:border-amber-400"
                >
                  <Copy className="w-4 h-4 text-stone-600" />
                  <span>Just Copy</span>
                </button>

                <a
                  href={GOOGLE_DIRECT_WRITE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-amber-50 active:bg-amber-100 border border-dashed border-amber-300 text-[11px] font-bold text-amber-900 flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors shadow-2xs"
                >
                  <Star className="w-4 h-4 fill-amber-500 text-amber-600" />
                  <span>Direct Box</span>
                </a>

                <a
                  href={GOOGLE_MAPS_LISTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white active:bg-stone-100 border border-dashed border-stone-300 text-[11px] font-semibold text-stone-700 flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors shadow-2xs hover:border-amber-400"
                >
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Maps Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Single Page Footer */}
      <footer className="bg-white border-t border-stone-200 py-3 text-center text-xs text-stone-500">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-stone-700">IDCraft Technologies</span>
            <span>•</span>
            <a
              href={OFFICIAL_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-800 underline flex items-center gap-0.5 truncate"
            >
              <Globe className="w-3 h-3" /> idcraft.dpdns.org
            </a>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium hidden sm:inline"
            >
              Maps Listing
            </a>
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setShowQrModal(true);
              }}
              className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Standee</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Full Screen Standee Modal (opens when clicking QR Standee) */}
      <QRCodeModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        appUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/?scan=review#review-section`}
        googleMapsUrl={GOOGLE_REVIEW_URL}
      />
    </div>
  );
}
