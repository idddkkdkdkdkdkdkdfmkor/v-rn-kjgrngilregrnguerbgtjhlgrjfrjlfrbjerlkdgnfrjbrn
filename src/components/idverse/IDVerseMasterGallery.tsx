import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  SlidersHorizontal,
  GraduationCap,
  Briefcase,
  BookOpen,
  Building,
  HeartPulse,
  Factory,
  UserCheck,
  Crown,
  Cpu,
  Shield,
  Layers,
  FileSpreadsheet,
  CheckCircle,
  Sparkles,
  Printer,
} from 'lucide-react';
import { IDVerseCategory, IDVerseRecord, IDVerseTheme } from '../../types/idverse';
import {
  ALL_IDVERSE_RECORDS,
  IDVERSE_CATEGORIES_META,
  THEME_COLOR_CONFIG,
  exportIDVerseRecordsToCSV,
} from '../../data/idverseMaster';
import { PhysicalPVCCard } from './PhysicalPVCCard';
import { CardInspectionModal } from './CardInspectionModal';

interface IDVerseMasterGalleryProps {
  onOpenBulkOrder?: (categoryName: string) => void;
}

export const IDVerseMasterGallery: React.FC<IDVerseMasterGalleryProps> = ({
  onOpenBulkOrder,
}) => {
  // Active selected category
  const [selectedCategory, setSelectedCategory] = useState<IDVerseCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedOrientation, setSelectedOrientation] = useState<'all' | 'vertical' | 'horizontal'>('all');
  const [activeModalRecord, setActiveModalRecord] = useState<IDVerseRecord | null>(null);
  const [flipAllBack, setFlipAllBack] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Icon resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" />;
      case 'Building':
        return <Building className="w-4 h-4" />;
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4" />;
      case 'Factory':
        return <Factory className="w-4 h-4" />;
      case 'UserCheck':
        return <UserCheck className="w-4 h-4" />;
      case 'Crown':
        return <Crown className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Shield':
        return <Shield className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  // Filter records
  const filteredRecords = useMemo(() => {
    return ALL_IDVERSE_RECORDS.filter((rec) => {
      // Category match
      if (selectedCategory !== 'all' && rec.category !== selectedCategory) {
        return false;
      }
      // Orientation match
      if (selectedOrientation !== 'all' && rec.orientation !== selectedOrientation) {
        return false;
      }
      // Theme match
      if (selectedTheme !== 'all' && rec.theme !== selectedTheme) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          rec.holderName.toLowerCase().includes(q) ||
          rec.organization.toLowerCase().includes(q) ||
          rec.idNumber.toLowerCase().includes(q) ||
          rec.designationOrRole.toLowerCase().includes(q) ||
          rec.departmentOrClass.toLowerCase().includes(q) ||
          rec.city.toLowerCase().includes(q) ||
          rec.bloodGroup.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedOrientation, selectedTheme, searchQuery]);

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = exportIDVerseRecordsToCSV(filteredRecords);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `IDVerse_PVC_Cards_${selectedCategory}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification(`Exported ${filteredRecords.length} records to CSV!`);
    setTimeout(() => setNotification(null), 3000);
  };

  // Export JSON
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(filteredRecords, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `IDVerse_All_Records_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification(`Exported ${filteredRecords.length} records to JSON!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const activeCategoryMeta = IDVERSE_CATEGORIES_META.find((c) => c.id === selectedCategory);

  return (
    <section id="pvc-showcase" className="relative py-20 bg-slate-950 text-slate-100 overflow-hidden">
      {/* Background Subtle Tech Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-brand-dark/50 text-blue-300 text-xs font-semibold mb-4 shadow-sm backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>IDVERSE MASTER SPECIFICATION ARCHIVE • 200 DUMMY PVC CARDS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            ISO Standard PVC ID Cards
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              For Every Indian Institution
            </span>
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered to exact <strong>ISO/IEC 7810 ID-1</strong> specifications (85.60 × 53.98 mm, 30 Mil thickness).
            Explore all 10 specialized categories with 20 realistic Indian dummy cardholders per sector, dual-sided layouts, genuine Code128 barcodes, encrypted QR payloads, and embedded RFID/NFC chips.
          </p>
        </div>

        {/* NOTIFICATION TOAST */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white font-medium text-xs rounded-xl shadow-2xl animate-bounce">
            <CheckCircle className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* 10 CATEGORY PILLS BAR */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select ID Card Category ({IDVERSE_CATEGORIES_META.length} Sectors):
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              Showing {filteredRecords.length} of {ALL_IDVERSE_RECORDS.length} cards
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30 scale-102 ring-2 ring-blue-400/40'
                  : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 10 Categories</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-brand-mint">
                200
              </span>
            </button>

            {IDVERSE_CATEGORIES_META.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/30 scale-102 ring-2 ring-blue-400/40'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 opacity-80">
                  20
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE CATEGORY BANNER */}
        {activeCategoryMeta && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-slate-950 border border-blue-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <span>Active Sector</span>
                <span>•</span>
                <span>{activeCategoryMeta.badge}</span>
              </div>
              <h4 className="text-lg font-extrabold text-white mt-0.5">
                {activeCategoryMeta.name}
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                {activeCategoryMeta.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenBulkOrder && (
                <button
                  onClick={() => onOpenBulkOrder(activeCategoryMeta.name)}
                  className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-mint0 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Order Bulk {activeCategoryMeta.name}s</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* CONTROLS TOOLBAR: Search, Filters, Quick Actions, CSV/JSON Export */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dummy name, ID number, role, blood group, city..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-mint0 focus:ring-1 focus:ring-brand-mint0 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns & Toggles */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Orientation Filter */}
            <select
              value={selectedOrientation}
              onChange={(e) => setSelectedOrientation(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-brand-mint0"
            >
              <option value="all">All Orientations</option>
              <option value="vertical">Vertical (Portrait)</option>
              <option value="horizontal">Horizontal (Landscape)</option>
            </select>

            {/* Theme Filter */}
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-brand-mint0"
            >
              <option value="all">All Theme Palettes</option>
              {Object.entries(THEME_COLOR_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>

            {/* CSV / JSON Exports */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-900/30 hover:bg-emerald-800/40 text-emerald-300 border border-emerald-700/50 text-xs font-semibold transition-colors"
              title="Download filtered cards as Excel CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors"
              title="Download complete 200-card JSON database"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Master JSON</span>
            </button>
          </div>
        </div>

        {/* CARDS GRID */}
        {filteredRecords.length === 0 ? (
          <div className="py-20 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-pulse" />
            <h4 className="text-base font-bold text-slate-300">No matching PVC ID cards found</h4>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search keywords or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTheme('all');
                setSelectedOrientation('all');
              }}
              className="mt-4 px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-semibold hover:bg-brand-mint0 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6 justify-items-center items-start">
            {filteredRecords.map((record) => (
              <PhysicalPVCCard
                key={record.id}
                record={record}
                onSelectForModal={(rec) => setActiveModalRecord(rec)}
              />
            ))}
          </div>
        )}

        {/* CARD INSPECTION MODAL */}
        <CardInspectionModal
          record={activeModalRecord}
          onClose={() => setActiveModalRecord(null)}
          onOpenBulkOrder={onOpenBulkOrder}
        />
      </div>
    </section>
  );
};
