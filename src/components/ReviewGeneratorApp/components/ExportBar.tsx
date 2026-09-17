import React from 'react';
import { GeneratedReview, PersonaType, ToneType, LanguageType, LengthModeType } from '../types';
import { PERSONAS, TONES, LANGUAGES, LENGTH_MODES, formatReviewCard } from '../utils/generator';
import { Download, Copy, Check, Filter, Search, FileText, FileSpreadsheet, RotateCcw, BookOpen } from 'lucide-react';

interface ExportBarProps {
  reviews: GeneratedReview[];
  filteredCount: number;
  selectedPersona: string;
  setSelectedPersona: (p: string) => void;
  selectedTone: string;
  setSelectedTone: (t: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (l: string) => void;
  selectedLength: string;
  setSelectedLength: (len: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onResetFilters: () => void;
  onCopyNotice: (msg: string) => void;
  onOpenRules: () => void;
}

export const ExportBar: React.FC<ExportBarProps> = ({
  reviews,
  filteredCount,
  selectedPersona,
  setSelectedPersona,
  selectedTone,
  setSelectedTone,
  selectedLanguage,
  setSelectedLanguage,
  selectedLength,
  setSelectedLength,
  searchQuery,
  setSearchQuery,
  onResetFilters,
  onCopyNotice,
  onOpenRules,
}) => {
  const [copiedAll, setCopiedAll] = React.useState(false);

  const handleCopyAll = () => {
    const fullText = reviews.map((r) => formatReviewCard(r)).join('\n\n---\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    onCopyNotice(`Copied all ${reviews.length} reviews formatted!`);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadTxt = () => {
    const fullText = reviews
      .map((r) => formatReviewCard(r))
      .join('\n\n========================================\n\n');

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idcraft-google-reviews-v3-${reviews.length}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onCopyNotice('Downloaded reviews as formatted TXT');
  };

  const handleDownloadCsv = () => {
    const headers = [
      'Review #',
      'Persona',
      'Tone',
      'Language',
      'Word Count',
      'Length Category',
      'SEO Keywords',
      'Review Text',
      'Google Maps URL',
    ];

    const escapeCsv = (val: string) => `"${(val || '').replace(/"/g, '""')}"`;

    const rows = reviews.map((r) => [
      r.id,
      escapeCsv(r.persona),
      escapeCsv(r.tone),
      escapeCsv(r.language),
      r.wordCount,
      escapeCsv(r.lengthCategory),
      escapeCsv(r.seoKeywords.join(', ')),
      escapeCsv(r.review),
      escapeCsv('https://maps.app.goo.gl/Swyyj8i3fuG7sDbx7'),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idcraft-google-reviews-${reviews.length}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onCopyNotice('Downloaded reviews as CSV');
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(reviews, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idcraft-google-reviews-${reviews.length}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onCopyNotice('Downloaded reviews as JSON');
  };

  const hasActiveFilters =
    selectedPersona !== 'all' ||
    selectedTone !== 'all' ||
    selectedLanguage !== 'all' ||
    selectedLength !== 'all' ||
    searchQuery !== '';

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 mb-6 space-y-4">
      {/* Top action row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-stone-900">
            Reviews Directory ({reviews.length} total, showing {filteredCount})
          </span>
          <button
            type="button"
            onClick={onOpenRules}
            className="text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium transition-colors"
          >
            <BookOpen className="w-3 h-3" />
            <span>v3.0 Engine Rules</span>
          </button>
        </div>

        {/* Batch download & copy buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 text-white hover:bg-black transition-colors shadow-2xs"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied All {reviews.length}!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>Copy All {reviews.length}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 transition-colors shadow-2xs"
            title="Download formatted text file"
          >
            <FileText className="w-3.5 h-3.5 text-stone-500" />
            <span>TXT</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 transition-colors shadow-2xs"
            title="Download spreadsheet CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>CSV</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadJson}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 transition-colors shadow-2xs"
            title="Download JSON format"
          >
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Search row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search keywords or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800"
          />
        </div>

        {/* Persona Filter */}
        <div>
          <select
            value={selectedPersona}
            onChange={(e) => setSelectedPersona(e.target.value)}
            className="w-full py-1.5 px-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800"
          >
            <option value="all">All Personas (10 types)</option>
            {PERSONAS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Tone Filter */}
        <div>
          <select
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            className="w-full py-1.5 px-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800"
          >
            <option value="all">All Tones</option>
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full py-1.5 px-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800"
          >
            <option value="all">All Languages</option>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Length Filter */}
        <div className="flex items-center gap-1.5">
          <select
            value={selectedLength}
            onChange={(e) => setSelectedLength(e.target.value)}
            className="w-full py-1.5 px-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800"
          >
            <option value="all">All Lengths</option>
            {LENGTH_MODES.map((len) => (
              <option key={len.label} value={len.label}>
                {len.label} ({len.range})
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg shrink-0"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
