import { IDCardMember, ID_CARD_TEMPLATES } from '../data/idCardTemplates';

/** CR80 at 300 DPI - print-ready pixel dimensions */
export const CARD_EXPORT_WIDTH = 1011;
export const CARD_EXPORT_HEIGHT = 638;

export type ExportFormat = 'pdf' | 'png' | 'jpeg' | 'zip';
export type PrintSide = 'front' | 'back' | 'both';
export type SheetSize = 'cr80' | 'a4' | 'a3';
export type PrintOrientation = 'portrait' | 'landscape';

export interface BatchExportSettings {
  format: ExportFormat;
  side: PrintSide;
  sheetSize: SheetSize;
  orientation: PrintOrientation;
  cropMarks: boolean;
  bleed: boolean;
  transparent: boolean;
}

export interface BatchExportProgress {
  current: number;
  total: number;
  label: string;
}

function escapeXml(value = ''): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function field(member: IDCardMember, key: keyof IDCardMember, fallback = ''): string {
  return String(member[key] ?? fallback);
}

function fitText(value: string, max = 22): string {
  return value.length > max ? `${value.slice(0, max - 1)}.` : value;
}

function renderBarcodeBars(barcode: string, width = 320, height = 46): string {
  const step = width / 56;
  let bars = '';
  for (let i = 0; i < 56; i++) {
    const code = barcode.charCodeAt(i % Math.max(barcode.length, 1));
    const barWidth = (code + i) % 3 === 0 ? 4 : (code + i) % 2 === 0 ? 3 : 2;
    const gap = (code * 3 + i) % 7 === 0;
    if (!gap) {
      bars += `<rect x="${Math.round(i * step)}" y="0" width="${barWidth}" height="${height}" fill="#0F172A"/>`;
    }
  }
  return bars;
}

function renderQrMark(label: string, color = '#0F172A'): string {
  const blocks = [
    [12, 12, 38], [98, 12, 38], [12, 98, 38], [62, 62, 14], [84, 62, 14],
    [62, 84, 14], [106, 84, 14], [84, 106, 14], [42, 62, 12], [116, 116, 12],
  ];
  return `
    <rect width="150" height="150" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3"/>
    ${blocks.map(([x, y, s]) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="3" fill="${color}"/>`).join('')}
    <text x="75" y="82" fill="#64748B" font-family="Arial, sans-serif" font-size="12" font-weight="800" text-anchor="middle">${escapeXml(label)}</text>`;
}

function frontLayout(member: IDCardMember): string {
  const template = ID_CARD_TEMPLATES[member.templateId];
  const nameSize = member.personName.length > 22 ? 30 : 38;
  const commonHeader = `
    <text x="52" y="58" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="900">${escapeXml(fitText(member.institutionName, 32))}</text>
    <text x="52" y="92" fill="${template.accentColor}" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="800" letter-spacing="2">${escapeXml(member.tagline.toUpperCase())}</text>`;

  if (template.layout === 'split') {
    return `
      <rect width="365" height="${CARD_EXPORT_HEIGHT}" fill="url(#templateGrad)"/>
      <circle cx="870" cy="80" r="150" fill="${template.accentColor}" opacity="0.55"/>
      ${commonHeader}
      <rect x="430" y="72" width="220" height="270" rx="30" fill="#F8FAFC" stroke="${template.primaryColor}" stroke-width="5"/>
      <image href="${escapeXml(member.photoUrl)}" x="450" y="92" width="180" height="230" clip-path="url(#roundedPhoto)" preserveAspectRatio="xMidYMid slice"/>
      <text x="52" y="248" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="${nameSize}" font-weight="900">${escapeXml(member.personName.toUpperCase())}</text>
      <text x="52" y="292" fill="${template.accentColor}" font-family="Arial, sans-serif" font-size="22" font-weight="800">${escapeXml(member.departmentOrClass)}</text>
      <text x="52" y="350" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="18" font-weight="700">ADM ${escapeXml(field(member, 'admissionNumber', member.idNumber))}</text>
      <text x="52" y="382" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="18" font-weight="700">ROLL ${escapeXml(field(member, 'rollNumber', '-'))} | SESSION ${escapeXml(field(member, 'session', '2026-27'))}</text>
      <g transform="translate(760, 352)">${renderQrMark('VERIFY', template.primaryColor)}</g>`;
  }

  if (template.layout === 'edge') {
    return `
      <rect width="${CARD_EXPORT_WIDTH}" height="${CARD_EXPORT_HEIGHT}" fill="url(#templateGrad)"/>
      <path d="M690 0 L1011 0 L1011 638 L785 638 C720 470 695 265 690 0Z" fill="#FFFFFF" opacity="0.96"/>
      ${commonHeader}
      <circle cx="505" cy="248" r="86" fill="#FFFFFF" opacity="0.18"/>
      <image href="${escapeXml(member.photoUrl)}" x="421" y="164" width="168" height="168" clip-path="url(#circlePhoto)" preserveAspectRatio="xMidYMid slice"/>
      <text x="52" y="390" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="${nameSize}" font-weight="900">${escapeXml(member.personName.toUpperCase())}</text>
      <text x="52" y="430" fill="${template.accentColor}" font-family="Arial, sans-serif" font-size="20" font-weight="800">${escapeXml(member.departmentOrClass)}</text>
      <text x="52" y="490" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="18" font-weight="800">DOB ${escapeXml(field(member, 'dob', '-'))} | BLOOD ${escapeXml(member.bloodGroup)}</text>
      <g transform="translate(805, 94)">${renderQrMark('QR', template.secondaryColor)}</g>
      <text x="835" y="520" fill="${template.secondaryColor}" font-family="Arial, sans-serif" font-size="18" font-weight="900">Principal Signature</text>`;
  }

  if (template.layout === 'band') {
    return `
      <rect width="${CARD_EXPORT_WIDTH}" height="${CARD_EXPORT_HEIGHT}" fill="#FFFFFF"/>
      <rect width="${CARD_EXPORT_WIDTH}" height="142" fill="url(#templateGrad)"/>
      <rect x="0" y="505" width="${CARD_EXPORT_WIDTH}" height="86" fill="${template.primaryColor}"/>
      <path d="M0 142 C260 210 440 90 1011 170 L1011 230 C560 160 330 290 0 210Z" fill="${template.highlightColor}" opacity="0.9"/>
      ${commonHeader}
      <image href="${escapeXml(member.photoUrl)}" x="70" y="205" width="190" height="230" clip-path="url(#bandPhoto)" preserveAspectRatio="xMidYMid slice"/>
      <text x="312" y="252" fill="#0F172A" font-family="Arial, sans-serif" font-size="${nameSize}" font-weight="900">${escapeXml(member.personName.toUpperCase())}</text>
      <text x="312" y="294" fill="${template.primaryColor}" font-family="Arial, sans-serif" font-size="21" font-weight="900">${escapeXml(member.departmentOrClass)}</text>
      <text x="312" y="350" fill="#334155" font-family="Arial, sans-serif" font-size="18" font-weight="700">Admission ${escapeXml(field(member, 'admissionNumber', member.idNumber))}</text>
      <text x="312" y="386" fill="#334155" font-family="Arial, sans-serif" font-size="18" font-weight="700">Roll ${escapeXml(field(member, 'rollNumber', '-'))} | House ${escapeXml(field(member, 'house', '-'))}</text>
      <g transform="translate(785, 300)">${renderQrMark('SCAN', template.primaryColor)}</g>`;
  }

  if (template.layout === 'badge') {
    return `
      <rect width="${CARD_EXPORT_WIDTH}" height="${CARD_EXPORT_HEIGHT}" fill="#F8FAFC"/>
      <rect x="32" y="32" width="947" height="574" rx="32" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="4"/>
      <rect x="32" y="32" width="947" height="118" rx="32" fill="url(#templateGrad)"/>
      <rect x="32" y="120" width="947" height="30" fill="url(#templateGrad)"/>
      ${commonHeader}
      <image href="${escapeXml(member.photoUrl)}" x="84" y="204" width="176" height="176" clip-path="url(#softPhoto)" preserveAspectRatio="xMidYMid slice"/>
      <text x="306" y="238" fill="#0F172A" font-family="Arial, sans-serif" font-size="${nameSize}" font-weight="900">${escapeXml(member.personName.toUpperCase())}</text>
      <text x="306" y="282" fill="${template.primaryColor}" font-family="Arial, sans-serif" font-size="21" font-weight="800">${escapeXml(member.departmentOrClass)}</text>
      <rect x="306" y="320" width="330" height="54" rx="27" fill="${template.accentColor}"/>
      <text x="330" y="354" fill="${template.secondaryColor}" font-family="Arial, sans-serif" font-size="18" font-weight="900">ADM ${escapeXml(field(member, 'admissionNumber', member.idNumber))}</text>
      <g transform="translate(790, 232)">${renderQrMark('VERIFY', template.primaryColor)}</g>
      <text x="84" y="520" fill="#64748B" font-family="Arial, sans-serif" font-size="18" font-weight="700">Session ${escapeXml(field(member, 'session', '2026-27'))} | Blood ${escapeXml(member.bloodGroup)}</text>`;
  }

  return `
    <rect width="${CARD_EXPORT_WIDTH}" height="${CARD_EXPORT_HEIGHT}" fill="#FFFFFF"/>
    <rect width="${CARD_EXPORT_WIDTH}" height="160" rx="28" fill="url(#templateGrad)"/>
    <rect y="130" width="${CARD_EXPORT_WIDTH}" height="30" fill="url(#templateGrad)"/>
    <circle cx="860" cy="48" r="130" fill="${template.accentColor}" opacity="0.35"/>
    ${commonHeader}
    <circle cx="505" cy="248" r="84" fill="#F1F5F9" stroke="${template.primaryColor}" stroke-width="6"/>
    <image href="${escapeXml(member.photoUrl)}" x="425" y="168" width="160" height="160" clip-path="url(#circlePhoto)" preserveAspectRatio="xMidYMid slice"/>
    <text x="505" y="382" fill="#0F172A" font-family="Arial, sans-serif" font-size="${nameSize}" font-weight="900" text-anchor="middle">${escapeXml(member.personName.toUpperCase())}</text>
    <text x="505" y="424" fill="${template.primaryColor}" font-family="Arial, sans-serif" font-size="21" font-weight="900" text-anchor="middle">${escapeXml(member.departmentOrClass)}</text>
    <text x="70" y="506" fill="#64748B" font-family="Arial, sans-serif" font-size="17" font-weight="800">ADM</text>
    <text x="128" y="506" fill="#0F172A" font-family="Arial, sans-serif" font-size="17" font-weight="900">${escapeXml(field(member, 'admissionNumber', member.idNumber))}</text>
    <text x="70" y="542" fill="#64748B" font-family="Arial, sans-serif" font-size="17" font-weight="800">ROLL</text>
    <text x="135" y="542" fill="#0F172A" font-family="Arial, sans-serif" font-size="17" font-weight="900">${escapeXml(field(member, 'rollNumber', '-'))}</text>
    <g transform="translate(790, 410)">${renderQrMark('QR', template.primaryColor)}</g>`;
}

function backLayout(member: IDCardMember): string {
  const template = ID_CARD_TEMPLATES[member.templateId];
  return `
    <rect width="${CARD_EXPORT_WIDTH}" height="${CARD_EXPORT_HEIGHT}" rx="28" fill="#FFFFFF"/>
    <rect width="${CARD_EXPORT_WIDTH}" height="92" fill="url(#templateGrad)"/>
    <text x="52" y="58" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="30" font-weight="900">${escapeXml(member.institutionName)}</text>
    <text x="52" y="132" fill="#0F172A" font-family="Arial, sans-serif" font-size="24" font-weight="900">Student Information</text>
    <text x="52" y="180" fill="#475569" font-family="Arial, sans-serif" font-size="18" font-weight="700">Parent: ${escapeXml(field(member, 'fatherName', '-'))}</text>
    <text x="52" y="218" fill="#475569" font-family="Arial, sans-serif" font-size="18" font-weight="700">DOB: ${escapeXml(field(member, 'dob', '-'))}    Blood Group: ${escapeXml(member.bloodGroup)}</text>
    <text x="52" y="256" fill="#475569" font-family="Arial, sans-serif" font-size="18" font-weight="700">Emergency: ${escapeXml(member.emergencyPhone)}</text>
    <text x="52" y="294" fill="#475569" font-family="Arial, sans-serif" font-size="18" font-weight="700">Route: ${escapeXml(field(member, 'transportRoute', '-'))}    House: ${escapeXml(field(member, 'house', '-'))}</text>
    <text x="52" y="348" fill="#0F172A" font-family="Arial, sans-serif" font-size="21" font-weight="900">Address</text>
    <text x="52" y="384" fill="#475569" font-family="Arial, sans-serif" font-size="18" font-weight="700">${escapeXml(fitText(member.address, 72))}</text>
    <text x="52" y="455" fill="#0F172A" font-family="Arial, sans-serif" font-size="21" font-weight="900">Rules</text>
    <text x="52" y="490" fill="#475569" font-family="Arial, sans-serif" font-size="16" font-weight="700">This card is school property. If found, please return it to the school office.</text>
    <text x="52" y="522" fill="#475569" font-family="Arial, sans-serif" font-size="16" font-weight="700">${escapeXml(field(member, 'website', 'www.idcraftindia.com'))} | ${escapeXml(field(member, 'email', 'office@school.edu.in'))}</text>
    <g transform="translate(785, 150)">${renderQrMark('VERIFY', template.primaryColor)}</g>
    <g transform="translate(620, 500)">${renderBarcodeBars(member.barcodeNumber, 330, 48)}<text x="0" y="66" fill="#64748B" font-family="monospace" font-size="15">${escapeXml(member.barcodeNumber)}</text></g>
    <line x1="52" y1="590" x2="290" y2="590" stroke="#CBD5E1" stroke-width="3"/>
    <text x="52" y="615" fill="#64748B" font-family="Arial, sans-serif" font-size="14" font-weight="800">Principal Signature</text>`;
}

export function renderIDCardSvg(member: IDCardMember, side: 'front' | 'back' = 'front', scale = 1): string {
  const template = ID_CARD_TEMPLATES[member.templateId];
  const w = CARD_EXPORT_WIDTH * scale;
  const h = CARD_EXPORT_HEIGHT * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${CARD_EXPORT_WIDTH} ${CARD_EXPORT_HEIGHT}">
  <defs>
    <linearGradient id="templateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${template.primaryColor}"/>
      <stop offset="100%" stop-color="${template.secondaryColor}"/>
    </linearGradient>
    <clipPath id="circlePhoto"><circle cx="505" cy="248" r="80"/></clipPath>
    <clipPath id="roundedPhoto"><rect x="450" y="92" width="180" height="230" rx="24"/></clipPath>
    <clipPath id="bandPhoto"><rect x="70" y="205" width="190" height="230" rx="24"/></clipPath>
    <clipPath id="softPhoto"><rect x="84" y="204" width="176" height="176" rx="34"/></clipPath>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="${CARD_EXPORT_WIDTH}" height="${CARD_EXPORT_HEIGHT}" rx="28" fill="#FFFFFF" filter="url(#shadow)"/>
  ${side === 'front' ? frontLayout(member) : backLayout(member)}
  <rect x="18" y="18" width="${CARD_EXPORT_WIDTH - 36}" height="${CARD_EXPORT_HEIGHT - 36}" rx="18" fill="none" stroke="${template.highlightColor}" stroke-width="2" opacity="0.45"/>
</svg>`;
}

async function svgToImageBlob(svg: string, type: 'image/png' | 'image/jpeg', transparent = false): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = CARD_EXPORT_WIDTH;
      canvas.height = CARD_EXPORT_HEIGHT;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Canvas unavailable'));
        return;
      }
      if (!transparent || type === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Image export failed'))), type, 0.95);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('SVG render failed'));
    };
    img.src = url;
  });
}

function downloadBlob(blob: Blob, filename: string): void {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export async function exportMemberToPng(member: IDCardMember): Promise<void> {
  const blob = await svgToImageBlob(renderIDCardSvg(member), 'image/png');
  downloadBlob(blob, `${member.idNumber.replace(/[^a-zA-Z0-9-_]/g, '_')}_front.png`);
}

function crc32(bytes: Uint8Array): number {
  let crc = -1;
  for (const byte of bytes) {
    crc ^= byte;
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ -1) >>> 0;
}

function writeUint(view: DataView, offset: number, value: number, bytes: 2 | 4): void {
  if (bytes === 2) view.setUint16(offset, value, true);
  else view.setUint32(offset, value, true);
}

function createZip(files: { name: string; blob: Blob }[]): Promise<Blob> {
  return Promise.all(files.map(async (file) => ({ ...file, bytes: new Uint8Array(await file.blob.arrayBuffer()) }))).then((items) => {
    const encoder = new TextEncoder();
    const localParts: Uint8Array[] = [];
    const centralParts: Uint8Array[] = [];
    let offset = 0;

    items.forEach((item) => {
      const nameBytes = encoder.encode(item.name);
      const crc = crc32(item.bytes);
      const local = new Uint8Array(30 + nameBytes.length);
      const localView = new DataView(local.buffer);
      writeUint(localView, 0, 0x04034b50, 4);
      writeUint(localView, 8, 0, 2);
      writeUint(localView, 14, crc, 4);
      writeUint(localView, 18, item.bytes.length, 4);
      writeUint(localView, 22, item.bytes.length, 4);
      writeUint(localView, 26, nameBytes.length, 2);
      local.set(nameBytes, 30);
      localParts.push(local, item.bytes);

      const central = new Uint8Array(46 + nameBytes.length);
      const centralView = new DataView(central.buffer);
      writeUint(centralView, 0, 0x02014b50, 4);
      writeUint(centralView, 10, 0, 2);
      writeUint(centralView, 16, crc, 4);
      writeUint(centralView, 20, item.bytes.length, 4);
      writeUint(centralView, 24, item.bytes.length, 4);
      writeUint(centralView, 28, nameBytes.length, 2);
      writeUint(centralView, 42, offset, 4);
      central.set(nameBytes, 46);
      centralParts.push(central);
      offset += local.length + item.bytes.length;
    });

    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22);
    const endView = new DataView(end.buffer);
    writeUint(endView, 0, 0x06054b50, 4);
    writeUint(endView, 8, items.length, 2);
    writeUint(endView, 10, items.length, 2);
    writeUint(endView, 12, centralSize, 4);
    writeUint(endView, 16, offset, 4);
    return new Blob([...localParts, ...centralParts, end], { type: 'application/zip' });
  });
}

function sidesFor(settings: BatchExportSettings): ('front' | 'back')[] {
  if (settings.side === 'front') return ['front'];
  if (settings.side === 'back') return ['back'];
  return ['front', 'back'];
}

export async function exportMembersToZipPngs(
  members: IDCardMember[],
  settings: BatchExportSettings = {
    format: 'zip',
    side: 'both',
    sheetSize: 'cr80',
    orientation: 'portrait',
    cropMarks: true,
    bleed: true,
    transparent: false,
  },
  onProgress?: (progress: BatchExportProgress) => void,
  signal?: AbortSignal
): Promise<number> {
  const files: { name: string; blob: Blob }[] = [];
  const selectedSides = sidesFor(settings);
  const type = settings.format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const ext = settings.format === 'jpeg' ? 'jpg' : 'png';
  const total = members.length * selectedSides.length;
  let current = 0;

  for (const member of members) {
    for (const side of selectedSides) {
      if (signal?.aborted) throw new DOMException('Export cancelled', 'AbortError');
      const blob = await svgToImageBlob(renderIDCardSvg(member, side), type, settings.transparent);
      const classFolder = field(member, 'className', 'Class').replace(/[^\w-]+/g, '_');
      const sectionFolder = field(member, 'section', 'Section').replace(/[^\w-]+/g, '_');
      const studentFolder = member.personName.replace(/[^\w-]+/g, '_');
      files.push({
        name: `${classFolder}/${sectionFolder}/${studentFolder}/${member.idNumber}_${side}.${ext}`,
        blob,
      });
      current++;
      onProgress?.({ current, total, label: `${member.personName} ${side}` });
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  const zip = await createZip(files);
  downloadBlob(zip, `idcraft_batch_${members.length}_cards.zip`);
  return files.length;
}

export function printMembers(
  members: IDCardMember[],
  settings: Partial<BatchExportSettings> = {}
): void {
  const effective: BatchExportSettings = {
    format: 'pdf',
    side: settings.side ?? 'both',
    sheetSize: settings.sheetSize ?? 'a4',
    orientation: settings.orientation ?? 'portrait',
    cropMarks: settings.cropMarks ?? true,
    bleed: settings.bleed ?? true,
    transparent: false,
  };
  const printWindow = window.open('', '_blank', 'width=1200,height=900');
  if (!printWindow) return;
  const selectedSides = sidesFor(effective);
  const cardsHtml = members
    .flatMap((member) => selectedSides.map((side) => `<div class="print-card ${effective.cropMarks ? 'crop' : ''}">${renderIDCardSvg(member, side)}</div>`))
    .join('');

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>IDCraft India - Print ${members.length} Card(s)</title>
  <style>
    @page { size: ${effective.sheetSize === 'a3' ? 'A3' : 'A4'} ${effective.orientation}; margin: 12mm; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, sans-serif; background: #fff; }
    .print-grid { display: grid; grid-template-columns: repeat(${effective.sheetSize === 'cr80' ? 1 : 2}, minmax(0, 1fr)); gap: 8mm; padding: 8mm; }
    .print-card { page-break-inside: avoid; display: flex; justify-content: center; position: relative; padding: ${effective.bleed ? '1.5mm' : '0'}; }
    .print-card svg { width: 85.6mm; height: 53.98mm; border: 0.2mm solid #CBD5E1; border-radius: 3mm; }
    .crop:before, .crop:after { content: ""; position: absolute; inset: 0; pointer-events: none; border: 0.2mm dashed #94A3B8; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="no-print" style="padding:16px;text-align:center;background:#F4F6F3;border-bottom:1px solid #E2E8F0;">
    <strong>IDCraft India Print Preview</strong> - ${members.length} student(s), ${selectedSides.join(' + ')} at 300 DPI CR80 scale
    <br/><button onclick="window.print()" style="margin-top:12px;padding:10px 24px;background:#14764B;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Print / Save PDF</button>
  </div>
  <div class="print-grid">${cardsHtml}</div>
  <script>window.onload = () => setTimeout(() => window.print(), 400);</script>
</body>
</html>`);
  printWindow.document.close();
}

export function exportMembersCsv(members: IDCardMember[]): void {
  const headers = [
    'Admission Number',
    'Student Name',
    'Class',
    'Section',
    'Roll Number',
    'DOB',
    'Blood Group',
    'Father Name',
    'Phone',
    'Address',
    'Template',
  ];
  const rows = members.map((m) =>
    [
      m.admissionNumber ?? m.idNumber,
      m.personName,
      m.className ?? m.departmentOrClass,
      m.section ?? '',
      m.rollNumber ?? '',
      m.dob ?? '',
      m.bloodGroup,
      m.fatherName ?? '',
      m.phone ?? m.emergencyPhone,
      m.address,
      m.templateId,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `idcraft_export_${members.length}_students.csv`);
}
