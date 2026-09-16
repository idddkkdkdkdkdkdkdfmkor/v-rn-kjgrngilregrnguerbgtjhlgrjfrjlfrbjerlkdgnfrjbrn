import React, { useMemo, useRef, useState } from 'react';
import {
  CheckSquare,
  Download,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  Loader2,
  Printer,
  Search,
  Square,
  UploadCloud,
  X,
} from 'lucide-react';
import readXlsxFile from 'read-excel-file/browser';
import { toast } from 'sonner';
import {
  DYNAMIC_PLACEHOLDERS,
  DynamicPlaceholder,
  IDCardMember,
  ID_CARD_TEMPLATES,
  IDCardTemplateId,
  PREMIUM_TEMPLATE_IDS,
  SAMPLE_MEMBERS,
  TEMPLATE_CATEGORIES,
} from '../../data/idCardTemplates';
import { PrintableIDCard } from './PrintableIDCard';
import {
  BatchExportSettings,
  exportMembersCsv,
  exportMembersToZipPngs,
  printMembers,
} from '../../lib/idCardExport';

type Mapping = Partial<Record<DynamicPlaceholder, string>>;
type ScopeFilter = 'school' | 'class' | 'section' | 'selected';

const FIELD_SYNONYMS: Record<DynamicPlaceholder, string[]> = {
  student_name: ['student name', 'name', 'full name', 'student'],
  photo: ['photo', 'photo url', 'image', 'image url'],
  school_logo: ['school logo', 'logo'],
  school_name: ['school name', 'institution', 'institution name'],
  class: ['class', 'grade', 'standard'],
  section: ['section', 'sec'],
  roll_number: ['roll no', 'roll number', 'roll'],
  admission_number: ['admission no', 'admission number', 'adm no', 'id', 'id number'],
  session: ['session', 'academic year', 'year'],
  dob: ['dob', 'date of birth', 'birth date'],
  blood_group: ['blood group', 'blood'],
  father_name: ['father name', 'parent name', 'guardian name'],
  mother_name: ['mother name'],
  phone: ['phone', 'mobile', 'contact', 'emergency contact'],
  address: ['address', 'student address'],
  transport_route: ['transport route', 'route', 'bus route'],
  house: ['house', 'house color'],
  principal_signature: ['principal signature', 'signature'],
  qr_code: ['qr', 'qr code', 'qr payload'],
  barcode: ['barcode', 'barcode number'],
};

const defaultSettings: BatchExportSettings = {
  format: 'pdf',
  side: 'both',
  sheetSize: 'a4',
  orientation: 'portrait',
  cropMarks: true,
  bleed: true,
  transparent: false,
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function detectMapping(headers: string[]): Mapping {
  const normalized = headers.map((header) => [header, normalize(header)] as const);
  return Object.fromEntries(
    DYNAMIC_PLACEHOLDERS.map((placeholder) => {
      const match = normalized.find(([, header]) => FIELD_SYNONYMS[placeholder].some((alias) => header === alias || header.includes(alias)));
      return [placeholder, match?.[0]];
    }).filter(([, value]) => Boolean(value))
  ) as Mapping;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      value += '"';
      i++;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(value);
      value = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i++;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = '';
    } else {
      value += char;
    }
  }
  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

function tableToObjects(table: unknown[][]): Record<string, unknown>[] {
  const headers = table[0]?.map((cell) => String(cell ?? '').trim()).filter(Boolean) ?? [];
  return table.slice(1).map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, row[index] ?? '']))
  );
}

function valueFrom(row: Record<string, unknown>, mapping: Mapping, field: DynamicPlaceholder, fallback = ''): string {
  const column = mapping[field];
  if (!column) return fallback;
  return String(row[column] ?? fallback).trim();
}

function rowsToMembers(rows: Record<string, unknown>[], mapping: Mapping, templateId: IDCardTemplateId): IDCardMember[] {
  return rows.map((row, index) => {
    const admission = valueFrom(row, mapping, 'admission_number', `IMP-${String(index + 1).padStart(4, '0')}`);
    const className = valueFrom(row, mapping, 'class', 'I');
    const section = valueFrom(row, mapping, 'section', 'A');
    const phone = valueFrom(row, mapping, 'phone', '+91 90000 00000');
    const barcode = valueFrom(row, mapping, 'barcode', admission.replace(/\D/g, '').padEnd(12, '0').slice(0, 12));
    return {
      id: `import-${admission}-${index}`,
      templateId,
      institutionName: valueFrom(row, mapping, 'school_name', 'Delhi Public Academy'),
      tagline: `Session ${valueFrom(row, mapping, 'session', '2026-27')}`,
      personName: valueFrom(row, mapping, 'student_name', `Student ${index + 1}`),
      designation: 'STUDENT',
      idNumber: admission,
      admissionNumber: admission,
      rollNumber: valueFrom(row, mapping, 'roll_number', String(index + 1)),
      className,
      section,
      departmentOrClass: `Class ${className} - ${section}`,
      session: valueFrom(row, mapping, 'session', '2026-27'),
      dob: valueFrom(row, mapping, 'dob', '-'),
      bloodGroup: valueFrom(row, mapping, 'blood_group', '-'),
      fatherName: valueFrom(row, mapping, 'father_name', valueFrom(row, mapping, 'mother_name', '-')),
      motherName: valueFrom(row, mapping, 'mother_name', '-'),
      validUpto: 'MAY 2027',
      emergencyPhone: phone,
      phone,
      address: valueFrom(row, mapping, 'address', '-'),
      photoUrl: valueFrom(row, mapping, 'photo', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'),
      barcodeNumber: barcode,
      qrPayload: valueFrom(row, mapping, 'qr_code', `https://idcraftindia.com/verify?id=${admission}`),
      transportRoute: valueFrom(row, mapping, 'transport_route', '-'),
      house: valueFrom(row, mapping, 'house', '-'),
      website: 'www.idcraftindia.com',
      email: 'office@school.edu.in',
    };
  });
}

export const BulkCardGenerator: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [baseMembers, setBaseMembers] = useState<IDCardMember[]>(SAMPLE_MEMBERS);
  const [rawRows, setRawRows] = useState<Record<string, unknown>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Mapping>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(SAMPLE_MEMBERS.slice(0, 8).map((m) => m.id)));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<IDCardTemplateId>(PREMIUM_TEMPLATE_IDS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>('school');
  const [settings, setSettings] = useState<BatchExportSettings>(defaultSettings);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, label: '' });

  const mappedImportedMembers = useMemo(
    () => (rawRows.length > 0 ? rowsToMembers(rawRows, mapping, selectedTemplateId) : []),
    [mapping, rawRows, selectedTemplateId]
  );

  const members = rawRows.length > 0 ? mappedImportedMembers : baseMembers.map((member) => ({ ...member, templateId: selectedTemplateId }));

  const templates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PREMIUM_TEMPLATE_IDS.map((id) => ID_CARD_TEMPLATES[id]).filter((template) => {
      const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
      const matchesSearch = !q || template.name.toLowerCase().includes(q) || template.subtitle.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const filteredMembers = useMemo(() => {
    if (scopeFilter === 'selected') return members.filter((m) => selectedIds.has(m.id));
    if (scopeFilter === 'class') return members.filter((m) => m.className === members[0]?.className);
    if (scopeFilter === 'section') return members.filter((m) => m.className === members[0]?.className && m.section === members[0]?.section);
    return members;
  }, [members, scopeFilter, selectedIds]);

  const selectedMembers = filteredMembers.filter((m) => selectedIds.has(m.id));
  const exportMembers = selectedMembers.length > 0 ? selectedMembers : filteredMembers;
  const allFilteredSelected = filteredMembers.length > 0 && filteredMembers.every((m) => selectedIds.has(m.id));

  const handleFile = async (file: File) => {
    const rows =
      file.name.toLowerCase().endsWith('.csv')
        ? tableToObjects(parseCsv(await file.text()))
        : tableToObjects((await readXlsxFile(file)) as unknown as unknown[][]);
    const nextHeaders = rows[0] ? Object.keys(rows[0]) : [];
    const nextMapping = detectMapping(nextHeaders);
    setHeaders(nextHeaders);
    setRawRows(rows);
    setMapping(nextMapping);
    setBaseMembers([]);
    setSelectedIds(new Set(rows.map((_, index) => `import-${valueFrom(rows[index], nextMapping, 'admission_number', `IMP-${String(index + 1).padStart(4, '0')}`)}-${index}`)));
    toast.success(`Imported ${rows.length} student row(s) from ${file.name}`);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      filteredMembers.forEach((m) => (allFilteredSelected ? next.delete(m.id) : next.add(m.id)));
      return next;
    });
  };

  const handleExport = async (format: BatchExportSettings['format']) => {
    if (exportMembers.length === 0) {
      toast.error('Import or select at least one student first');
      return;
    }
    const nextSettings = { ...settings, format };
    if (format === 'pdf') {
      printMembers(exportMembers, nextSettings);
      toast.success(`Opening PDF-ready print preview for ${exportMembers.length} student(s)`);
      return;
    }
    abortRef.current = new AbortController();
    setIsExporting(true);
    setProgress({ current: 0, total: exportMembers.length, label: 'Preparing export' });
    try {
      const count = await exportMembersToZipPngs(
        exportMembers,
        nextSettings,
        setProgress,
        abortRef.current.signal
      );
      toast.success(`Created ZIP with ${count} ${format.toUpperCase()} file(s)`);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') toast.info('Export cancelled');
      else toast.error('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      abortRef.current = null;
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-[32px] font-black text-slate-900 tracking-tight">Generate & Batch Print</h2>
          <p className="text-[16px] font-medium text-slate-500 mt-1">
            One-click Excel import, auto-fill, front/back preview, and print-ready export.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 bg-white border border-slate-200 hover:border-[#14764B] rounded-[12px] text-[13px] font-bold text-slate-700 flex items-center gap-2 transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            Import Excel/CSV
          </button>
          <button
            onClick={toggleSelectAll}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:border-[#14764B] rounded-[12px] text-[13px] font-bold text-slate-700 flex items-center gap-2 transition-colors"
          >
            {allFilteredSelected ? <CheckSquare className="w-4 h-4 text-[#14764B]" /> : <Square className="w-4 h-4" />}
            {allFilteredSelected ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] gap-8">
        <aside className="space-y-6">
          <section className="bg-white border border-slate-100 rounded-[18px] p-5 shadow-sm">
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Step 1 - Select Template</h3>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[13px] focus:outline-none focus:border-emerald-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[13px] font-bold text-slate-700 mb-4"
            >
              <option value="all">All Categories</option>
              {TEMPLATE_CATEGORIES.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="max-h-[330px] overflow-y-auto space-y-2 pr-1">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                  className={`w-full text-left p-3 rounded-[12px] border transition-colors ${
                    selectedTemplateId === template.id ? 'border-[#14764B] bg-emerald-50' : 'border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded-md" style={{ background: template.headerGradient }} />
                    <div className="min-w-0">
                      <p className="text-[13px] font-black text-slate-900 truncate">{template.name}</p>
                      <p className="text-[11px] font-bold text-slate-500 truncate">{template.category}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-100 rounded-[18px] p-5 shadow-sm">
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Step 2 - Select Students</h3>
            <select
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value as ScopeFilter)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[13px] font-bold text-slate-700"
            >
              <option value="school">Entire School</option>
              <option value="class">Current Class</option>
              <option value="section">Current Section</option>
              <option value="selected">Selected Students</option>
            </select>
            <p className="text-[12px] font-bold text-slate-500 mt-3">
              {selectedMembers.length || filteredMembers.length} of {filteredMembers.length} student(s) queued.
            </p>
          </section>

          <section className="bg-white border border-slate-100 rounded-[18px] p-5 shadow-sm">
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Step 3 - Print Settings</h3>
            <div className="grid grid-cols-2 gap-3">
              <select value={settings.side} onChange={(e) => setSettings({ ...settings, side: e.target.value as BatchExportSettings['side'] })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[12px] font-bold">
                <option value="both">Front + Back</option>
                <option value="front">Front Only</option>
                <option value="back">Back Only</option>
              </select>
              <select value={settings.sheetSize} onChange={(e) => setSettings({ ...settings, sheetSize: e.target.value as BatchExportSettings['sheetSize'] })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[12px] font-bold">
                <option value="cr80">CR80 PVC</option>
                <option value="a4">A4 Sheet</option>
                <option value="a3">A3 Sheet</option>
              </select>
              <select value={settings.orientation} onChange={(e) => setSettings({ ...settings, orientation: e.target.value as BatchExportSettings['orientation'] })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[12px] font-bold">
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
              <label className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[12px] font-bold flex items-center gap-2">
                <input type="checkbox" checked={settings.transparent} onChange={(e) => setSettings({ ...settings, transparent: e.target.checked })} />
                Transparent
              </label>
              <label className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[12px] font-bold flex items-center gap-2">
                <input type="checkbox" checked={settings.cropMarks} onChange={(e) => setSettings({ ...settings, cropMarks: e.target.checked })} />
                Crop Marks
              </label>
              <label className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[12px] font-bold flex items-center gap-2">
                <input type="checkbox" checked={settings.bleed} onChange={(e) => setSettings({ ...settings, bleed: e.target.checked })} />
                Bleed
              </label>
            </div>
          </section>
        </aside>

        <main className="space-y-6">
          {headers.length > 0 && (
            <section className="bg-white border border-slate-100 rounded-[18px] p-5 shadow-sm">
              <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Column Mapping</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {DYNAMIC_PLACEHOLDERS.filter((field) => ['student_name', 'class', 'section', 'roll_number', 'admission_number', 'dob', 'blood_group', 'father_name', 'phone', 'address', 'photo'].includes(field)).map((placeholder) => (
                  <label key={placeholder} className="text-[11px] font-black text-slate-500 uppercase">
                    {placeholder.replace(/_/g, ' ')}
                    <select
                      value={mapping[placeholder] ?? ''}
                      onChange={(e) => setMapping({ ...mapping, [placeholder]: e.target.value || undefined })}
                      className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[10px] text-[12px] font-bold text-slate-700"
                    >
                      <option value="">Not mapped</option>
                      {headers.map((header) => (
                        <option key={header} value={header}>{header}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </section>
          )}

          <section className="bg-white border border-slate-100 rounded-[18px] p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
              <div>
                <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">Step 4 - Live Preview</h3>
                <p className="text-[12px] font-bold text-slate-500 mt-1">{ID_CARD_TEMPLATES[selectedTemplateId].name} at CR80 85.6 x 54 mm, 300 DPI.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => handleExport('pdf')} className="px-4 py-2.5 bg-[#14764B] text-white rounded-[12px] text-[12px] font-black flex items-center gap-2"><Printer className="w-4 h-4" /> PDF / Print</button>
                <button onClick={() => handleExport('png')} disabled={isExporting} className="px-4 py-2.5 bg-slate-900 disabled:opacity-50 text-white rounded-[12px] text-[12px] font-black flex items-center gap-2"><FileImage className="w-4 h-4" /> PNG ZIP</button>
                <button onClick={() => handleExport('jpeg')} disabled={isExporting} className="px-4 py-2.5 bg-slate-900 disabled:opacity-50 text-white rounded-[12px] text-[12px] font-black flex items-center gap-2"><FileArchive className="w-4 h-4" /> JPEG ZIP</button>
                <button onClick={() => handleExport('zip')} disabled={isExporting} className="px-4 py-2.5 bg-slate-900 disabled:opacity-50 text-white rounded-[12px] text-[12px] font-black flex items-center gap-2"><Download className="w-4 h-4" /> ZIP</button>
                <button onClick={() => exportMembersCsv(exportMembers)} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-[12px] text-[12px] font-black flex items-center gap-2"><FileSpreadsheet className="w-4 h-4" /> CSV</button>
              </div>
            </div>

            {isExporting && (
              <div className="mb-5 rounded-[14px] bg-emerald-50 border border-emerald-100 p-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-[13px] font-black text-emerald-800">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Exporting {progress.current} / {progress.total}: {progress.label}
                  </div>
                  <button onClick={() => abortRef.current?.abort()} className="text-[12px] font-black text-red-600 flex items-center gap-1"><X className="w-4 h-4" /> Cancel</button>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[#14764B]" style={{ width: `${progress.total ? (progress.current / progress.total) * 100 : 0}%` }} />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 pb-4">
              {filteredMembers.slice(0, 18).map((member) => (
                <div key={member.id} className="flex flex-col items-center">
                  <div className="flex flex-col gap-3">
                    {(settings.side === 'front' || settings.side === 'both') && (
                      <PrintableIDCard member={member} selected={selectedIds.has(member.id)} onToggleSelect={() => toggleSelect(member.id)} compact side="front" />
                    )}
                    {(settings.side === 'back' || settings.side === 'both') && (
                      <PrintableIDCard member={member} selected={selectedIds.has(member.id)} onToggleSelect={() => toggleSelect(member.id)} compact side="back" />
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-[13px] font-black text-slate-900">{member.personName}</p>
                    <p className="text-[11px] font-bold text-slate-500">{member.idNumber}</p>
                  </div>
                </div>
              ))}
            </div>
            {filteredMembers.length > 18 && (
              <p className="text-center text-[13px] font-bold text-slate-500">Showing first 18 previews. Export will include all queued students.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};
