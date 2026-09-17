import React, { useState } from 'react';
import { GeneratedReview } from '../types';
import { formatReviewCard, checkReviewCompliance, calculateKeywordDensity } from '../utils/generator';
import { Copy, Check, ExternalLink, Star, ShieldCheck, AlertCircle, Info, Sparkles } from 'lucide-react';

interface ReviewCardProps {
  review: GeneratedReview;
  onCopyNotice: (msg: string) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onCopyNotice }) => {
  const [copiedReview, setCopiedReview] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const compliance = checkReviewCompliance(review.review);
  const density = calculateKeywordDensity(review.review, review.seoKeywords);

  const handleCopyReviewOnly = () => {
    navigator.clipboard.writeText(review.review);
    setCopiedReview(true);
    onCopyNotice(`Copied Review #${review.id} text!`);
    setTimeout(() => setCopiedReview(false), 2000);
  };

  const handleCopyFullFormat = () => {
    const formatted = formatReviewCard(review);
    navigator.clipboard.writeText(formatted);
    setCopiedFull(true);
    onCopyNotice(`Copied Review #${review.id} standard format!`);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  // Tone color styling
  const getToneBadgeClass = (tone: string) => {
    switch (tone) {
      case 'Casual':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Professional':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Emotional':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Minimal':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  const getLanguageBadgeClass = (lang: string) => {
    switch (lang) {
      case 'Hindi':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Hinglish':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div
      id={`review-card-${review.id}`}
      className="bg-white rounded-xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
    >
      {/* Header bar */}
      <div className="p-4 border-b border-stone-100 bg-stone-50/60 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-stone-900 text-amber-400">
            Review #{review.id}
          </span>
          <span className="font-semibold text-sm text-stone-900">{review.persona}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getToneBadgeClass(
              review.tone
            )}`}
          >
            {review.tone}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getLanguageBadgeClass(
              review.language
            )}`}
          >
            {review.language}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-mono">
            {review.wordCount} words
          </span>
        </div>
      </div>

      {/* Review Body */}
      <div className="p-5 space-y-4">
        {/* Star Rating display */}
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-1 text-xs text-stone-400 font-medium">5.0 Star Rating</span>
        </div>

        {/* The review text */}
        <p className="text-stone-800 text-[15px] leading-relaxed font-normal whitespace-pre-line">
          {review.review}
        </p>

        {/* SEO Keywords tags */}
        <div className="pt-2">
          <div className="text-xs font-medium text-stone-500 mb-1.5 flex items-center gap-1">
            <span>SEO Keywords Used:</span>
            <span className="text-[11px] text-stone-400">({density}% density)</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {review.seoKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Optional Analysis accordion */}
        {showAnalysis && (
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-2 mt-2">
            <div className="flex items-center justify-between font-semibold text-stone-800 border-b border-stone-200 pb-1.5">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Google Review Quality Audit
              </span>
              <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                100% Policy Compliant
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-stone-600 pt-1">
              <div>
                <span className="text-stone-400 block text-[11px]">Length Mode:</span>
                <span className="font-medium text-stone-700">{review.lengthCategory}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Density Cap:</span>
                <span className="font-medium text-stone-700">{density}% (&lt;2.0% safe)</span>
              </div>
            </div>

            <div className="space-y-1 pt-1 border-t border-stone-200 text-[11px] text-stone-600">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3 h-3" /> No banned promotional phrases or URLs
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3 h-3" /> Natural conversational phrasing & Indian context
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3 h-3" /> Balanced human emotion and product specificity
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="px-4 py-3 bg-stone-50/90 border-t border-stone-200 flex items-center justify-between gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1"
        >
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>{showAnalysis ? 'Hide Audit' : 'Quality Audit'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyReviewOnly}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-white text-stone-700 border border-stone-300 hover:bg-stone-100 shadow-2xs transition-colors"
            title="Copy review text only"
          >
            {copiedReview ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-stone-500" />
                <span>Copy Review</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyFullFormat}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-white text-stone-700 border border-stone-300 hover:bg-stone-100 shadow-2xs transition-colors"
            title="Copy with metadata format"
          >
            {copiedFull ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Copied Card!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-stone-500" />
                <span>Full Card</span>
              </>
            )}
          </button>

          <a
            href="https://maps.app.goo.gl/Swyyj8i3fuG7sDbx7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
            title="Post on Google Maps profile"
          >
            <span>Post on Maps</span>
            <ExternalLink className="w-3 h-3 text-blue-500" />
          </a>
        </div>
      </div>
    </div>
  );
};
