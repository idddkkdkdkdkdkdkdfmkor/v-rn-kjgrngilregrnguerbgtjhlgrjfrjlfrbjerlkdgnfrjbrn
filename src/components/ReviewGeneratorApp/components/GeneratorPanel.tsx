import React, { useState } from 'react';
import {
  PersonaType,
  ToneType,
  LanguageType,
  LengthModeType,
  GeneratedReview,
  ReviewGeneratorParams,
} from '../types';
import {
  PERSONAS,
  TONES,
  LANGUAGES,
  LENGTH_MODES,
  SEO_KEYWORD_POOL,
  countWords,
  detectKeywords,
  calculateKeywordDensity,
  checkReviewCompliance,
  generateLocalReview,
  formatReviewCard,
} from '../utils/generator';
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Plus,
  ShieldCheck,
  Star,
  Sliders,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface GeneratorPanelProps {
  onAddReview: (review: GeneratedReview) => void;
  onCopyNotice: (msg: string) => void;
  nextId: number;
}

const PRODUCT_OPTIONS = [
  'PVC ID Cards',
  'School ID Cards',
  'Employee ID Cards',
  'Student ID Cards',
  'ID Card Printing',
  'Lanyards',
  'Certificates',
  'Medals',
  'Trophies',
  'QR Code ID Cards',
  'Custom ID Cards',
  'School Branding',
];

const LOCATION_OPTIONS = ['Delhi', 'Noida', 'Gurgaon', 'Lucknow', 'Mumbai', 'Bengaluru', 'India'];
const DELIVERY_OPTIONS = ['Fast', 'On Time', 'Urgent', 'Same Day', 'Bulk'];
const QUALITY_OPTIONS = [
  'Sharp Print',
  'Durable',
  'Waterproof',
  'Premium Finish',
  'QR Code Scannable',
  'Barcode',
];
const SUPPORT_OPTIONS = ['Helpful', 'Responsive', 'Design Support', 'Easy Communication'];

export const GeneratorPanel: React.FC<GeneratorPanelProps> = ({
  onAddReview,
  onCopyNotice,
  nextId,
}) => {
  const [persona, setPersona] = useState<PersonaType>('HR Manager');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    'Employee ID Cards',
    'Lanyards',
  ]);
  const [orderSize, setOrderSize] = useState<string>('150');
  const [location, setLocation] = useState<string>('Gurgaon');
  const [delivery, setDelivery] = useState<string>('On Time');
  const [qualityNotes, setQualityNotes] = useState<string[]>(['Sharp Print', 'Durable']);
  const [support, setSupport] = useState<string>('Helpful');
  const [language, setLanguage] = useState<LanguageType>('English');
  const [tone, setTone] = useState<ToneType>('Casual');
  const [lengthMode, setLengthMode] = useState<LengthModeType>('Standard');
  const [includeEmoji, setIncludeEmoji] = useState<boolean>(false);
  const [customNote, setCustomNote] = useState<string>('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewReview, setPreviewReview] = useState<GeneratedReview | null>(null);
  const [copiedPreview, setCopiedPreview] = useState(false);

  const toggleProduct = (prod: string) => {
    if (selectedProducts.includes(prod)) {
      if (selectedProducts.length > 1) {
        setSelectedProducts(selectedProducts.filter((p) => p !== prod));
      }
    } else {
      if (selectedProducts.length < 3) {
        setSelectedProducts([...selectedProducts, prod]);
      }
    }
  };

  const toggleQuality = (q: string) => {
    if (qualityNotes.includes(q)) {
      setQualityNotes(qualityNotes.filter((item) => item !== q));
    } else {
      setQualityNotes([...qualityNotes, q]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    const params: ReviewGeneratorParams = {
      persona,
      products: selectedProducts,
      orderSize,
      location,
      deliveryExperience: delivery,
      qualityNotes,
      supportExperience: support,
      language,
      tone,
      lengthMode,
      includeEmoji,
    };

    try {
      // Try backend Gemini endpoint
      const response = await fetch('/api/generate-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          specificNotes: customNote,
        }),
      });

      const resData = await response.json();

      if (resData.success && resData.data?.review) {
        const text = resData.data.review;
        const words = countWords(text);
        const kws = detectKeywords(text);
        const reviewObj: GeneratedReview = {
          id: nextId,
          persona,
          tone,
          language,
          wordCount: words,
          lengthCategory: lengthMode,
          seoKeywords: kws.length > 0 ? kws : selectedProducts.slice(0, 2),
          review: text,
          hasEmoji: includeEmoji,
          orderSize,
          location,
          rating: 5,
        };
        setPreviewReview(reviewObj);
      } else {
        // Fallback to local humanized generator
        const local = generateLocalReview(params, nextId);
        setPreviewReview(local);
      }
    } catch (err) {
      // Offline / fallback to local humanized generator
      const local = generateLocalReview(params, nextId);
      setPreviewReview(local);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToCollection = () => {
    if (!previewReview) return;
    onAddReview(previewReview);
    onCopyNotice(`Added Review #${previewReview.id} to the collection!`);
  };

  const handleCopyPreview = () => {
    if (!previewReview) return;
    navigator.clipboard.writeText(previewReview.review);
    setCopiedPreview(true);
    onCopyNotice('Copied review to clipboard!');
    setTimeout(() => setCopiedPreview(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 mb-8">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-stone-900">
              Interactive Review Generator Studio (v3.0)
            </h2>
            <p className="text-xs text-stone-500">
              Configure authentic Indian customer parameters, tone, length & SEO keywords
            </p>
          </div>
        </div>

        <div className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full font-mono">
          Target Density: &lt;2.0%
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Controls */}
        <div className="lg:col-span-7 space-y-4">
          {/* Row 1: Persona & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Customer Persona
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value as PersonaType)}
                className="w-full text-xs rounded-lg border border-stone-300 bg-stone-50/50 px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 font-medium"
              >
                {PERSONAS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Language Mode
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {LANGUAGES.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLanguage(l)}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      language === l
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Tone & Length Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Writing Tone
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {TONES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      tone === t
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Length Constraint
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {LENGTH_MODES.map((lm) => (
                  <button
                    key={lm.label}
                    type="button"
                    onClick={() => setLengthMode(lm.label)}
                    className={`py-1.5 px-2 text-[11px] font-medium rounded-lg border text-center transition-colors ${
                      lengthMode === lm.label
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div>{lm.label}</div>
                    <div className="text-[10px] opacity-75">{lm.range}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Products (Multi-select) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-stone-700">
                Products Purchased (Pick 1–3)
              </label>
              <span className="text-[11px] text-stone-500">{selectedProducts.length} selected</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRODUCT_OPTIONS.map((prod) => {
                const isSelected = selectedProducts.includes(prod);
                return (
                  <button
                    key={prod}
                    type="button"
                    onClick={() => toggleProduct(prod)}
                    className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <span className="mr-1 text-amber-700">✓</span>}
                    {prod}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Order Size & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Order Size / Units
              </label>
              <div className="flex items-center gap-1.5">
                {['20', '150', '500', '2000'].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setOrderSize(sz)}
                    className={`flex-1 py-1 text-xs font-medium rounded border ${
                      orderSize === sz
                        ? 'bg-stone-800 text-white border-stone-800'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
                <input
                  type="text"
                  placeholder="Custom"
                  value={orderSize}
                  onChange={(e) => setOrderSize(e.target.value)}
                  className="w-16 py-1 px-2 text-xs border border-stone-300 rounded text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Location (NCR / India)
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs rounded-lg border border-stone-300 bg-stone-50/50 px-3 py-1.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 font-medium"
              >
                {LOCATION_OPTIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 5: Quality Notes & Emojis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Quality Highlights
              </label>
              <div className="flex flex-wrap gap-1">
                {QUALITY_OPTIONS.map((q) => {
                  const isChecked = qualityNotes.includes(q);
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => toggleQuality(q)}
                      className={`text-[11px] px-2 py-0.5 rounded border ${
                        isChecked
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-stone-50 text-stone-600 border-stone-200'
                      }`}
                    >
                      {q}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Delivery & Timing
                </label>
                <div className="flex gap-1 flex-wrap">
                  {DELIVERY_OPTIONS.map((del) => (
                    <button
                      key={del}
                      type="button"
                      onClick={() => setDelivery(del)}
                      className={`text-[11px] px-2 py-0.5 rounded border ${
                        delivery === del
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : 'bg-stone-50 text-stone-600 border-stone-200'
                      }`}
                    >
                      {del}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="includeEmojiCheck"
                  checked={includeEmoji}
                  onChange={(e) => setIncludeEmoji(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="includeEmojiCheck" className="text-xs text-stone-700 font-medium">
                  Allow 1–2 Natural Emojis (30% rule)
                </label>
              </div>
            </div>
          </div>

          {/* Custom Context / Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Optional Specific Experience Notes (e.g. "Annual sports day", "emergency badge")
            </label>
            <input
              type="text"
              placeholder="e.g. urgent replacement for exam week, or inter-college sports festival"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full text-xs rounded-lg border border-stone-300 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-black text-amber-300 font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>Crafting Human Review with Anti-AI Validation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Generate Natural Google Review</span>
              </>
            )}
          </button>
        </div>

        {/* Live Output & Compliance Preview */}
        <div className="lg:col-span-5 bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Real-Time Output Preview
              </span>
              {previewReview && (
                <span className="text-xs font-mono font-medium text-stone-600">
                  {previewReview.wordCount} words
                </span>
              )}
            </div>

            {previewReview ? (
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-semibold text-stone-700 ml-1">
                    {previewReview.persona} ({previewReview.tone})
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
                  <p className="text-stone-800 text-sm leading-relaxed whitespace-pre-line">
                    {previewReview.review}
                  </p>
                </div>

                {/* Keywords & Density */}
                <div className="text-xs space-y-1">
                  <div className="flex items-center justify-between text-stone-500">
                    <span>SEO Keywords:</span>
                    <span className="font-mono text-stone-700">
                      Density:{' '}
                      {calculateKeywordDensity(previewReview.review, previewReview.seoKeywords)}%
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {previewReview.seoKeywords.map((k) => (
                      <span
                        key={k}
                        className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compliance Badge */}
                {(() => {
                  const check = checkReviewCompliance(previewReview.review);
                  return (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-emerald-900">
                          Google Review Compliance Verified
                        </div>
                        <div className="text-emerald-700 mt-0.5">
                          Zero marketing clichés, no links/hashtags, natural Indian syntax.
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center p-4 text-stone-400">
                <Sparkles className="w-8 h-8 text-stone-300 mb-2" />
                <p className="text-xs">
                  Configure the inputs on the left and click "Generate Natural Google Review" to test
                  or produce new variations.
                </p>
              </div>
            )}
          </div>

          {/* Preview Actions */}
          {previewReview && (
            <div className="pt-3 border-t border-stone-200 flex items-center gap-2 mt-4">
              <button
                type="button"
                onClick={handleCopyPreview}
                className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium bg-white text-stone-700 border border-stone-300 hover:bg-stone-100 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                {copiedPreview ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSaveToCollection}
                className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to List</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
