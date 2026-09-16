import React, { useState } from 'react';
import {
  Maximize2,
  RefreshCw,
  Wifi,
  ShieldCheck,
  QrCode,
  Droplets,
  PhoneCall,
  MapPin,
  Sparkles,
  Printer,
  CheckCircle2,
} from 'lucide-react';
import { IDVerseRecord } from '../../types/idverse';

interface PhysicalPVCCardProps {
  record: IDVerseRecord;
  onSelectForModal?: (record: IDVerseRecord) => void;
  interactive?: boolean;
}

export const PhysicalPVCCard: React.FC<PhysicalPVCCardProps> = ({
  record,
  onSelectForModal,
  interactive = true,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHoloGlint, setShowHoloGlint] = useState(false);

  const isLandscape = record.orientation === 'horizontal';

  // Realistic Barcode lines generator based on Code128 pattern
  const renderBarcodeLines = (numStr: string) => {
    const bars = [];
    for (let i = 0; i < 48; i++) {
      const charCode = numStr.charCodeAt(i % numStr.length);
      const width = (charCode + i) % 3 === 0 ? 'w-[3px]' : (charCode + i) % 2 === 0 ? 'w-[2px]' : 'w-[1px]';
      const isSpace = (charCode * 3 + i) % 7 === 0;
      bars.push(
        <div
          key={i}
          className={`h-full ${isSpace ? 'bg-transparent' : 'bg-slate-900'} ${width}`}
        />
      );
    }
    return bars;
  };

  return (
    <div className="flex flex-col items-center group select-none">
      {/* 3D Card Shell */}
      <div
        className={`relative perspective-1000 transition-transform duration-300 ${
          isLandscape
            ? 'w-[340px] sm:w-[380px] h-[220px] sm:h-[240px]'
            : 'w-[260px] sm:w-[280px] h-[380px] sm:h-[410px]'
        }`}
        onMouseEnter={() => setShowHoloGlint(true)}
        onMouseLeave={() => setShowHoloGlint(false)}
      >
        <div
          className={`w-full h-full relative transition-transform duration-700 ease-out transform-style-3d rounded-2xl ${
            isFlipped ? 'rotate-y-180' : ''
          } shadow-[0_20px_45px_-12px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_60px_-15px_rgba(37,99,235,0.35)] border border-slate-700/50`}
        >
          {/* ===================== FRONT SIDE ===================== */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden flex flex-col justify-between p-3.5 bg-gradient-to-br ${
              record.theme === 'black-luxury'
                ? 'from-zinc-950 via-neutral-900 to-black text-amber-100 border border-amber-500/30'
                : record.theme === 'navy-gold'
                ? 'from-slate-950 via-blue-950 to-slate-900 text-slate-100 border border-amber-400/30'
                : record.theme === 'emerald-green'
                ? 'from-emerald-950 via-teal-950 to-black text-emerald-100 border border-emerald-500/30'
                : record.theme === 'crimson-red'
                ? 'from-rose-950 via-red-950 to-black text-rose-100 border border-rose-500/30'
                : record.theme === 'purple-gradient'
                ? 'from-purple-950 via-slate-900 to-black text-purple-100 border border-purple-500/30'
                : record.theme === 'orange-modern'
                ? 'from-orange-950 via-stone-900 to-black text-orange-100 border border-orange-500/30'
                : record.theme === 'sky-blue-corporate'
                ? 'from-sky-950 via-blue-900 to-slate-950 text-sky-100 border border-sky-400/30'
                : record.theme === 'maroon-academic'
                ? 'from-red-950 via-stone-900 to-neutral-950 text-amber-100 border border-amber-600/30'
                : 'from-slate-950 via-indigo-950 to-neutral-950 text-white border border-blue-400/30'
            }`}
          >
            {/* Slot Punch Cutout Indicator (Top Center) */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner z-30 flex items-center justify-center">
              <span className="w-6 h-0.5 rounded-full bg-slate-950"></span>
            </div>

            {/* Holographic Security Overlay with Foil Sheen */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 bg-gradient-to-tr from-transparent via-cyan-400/10 to-amber-300/15 mix-blend-color-dodge z-20 ${
                showHoloGlint ? 'opacity-100' : 'opacity-40'
              }`}
            />

            {/* Authentic Hologram Seal Badge */}
            <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1 bg-gradient-to-r from-amber-400/30 via-yellow-200/40 to-amber-500/30 px-1.5 py-0.5 rounded border border-amber-300/40 backdrop-blur-xs">
              <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
              <span className="text-[8px] font-mono tracking-wider font-bold text-amber-200 uppercase">
                PVC 30 MIL
              </span>
            </div>

            {/* RFID Contactless Wave Icon (if NFC supported) */}
            {record.nfcSupported && (
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 text-slate-400/90">
                <Wifi className="w-3.5 h-3.5 text-cyan-400 rotate-90" />
                <span className="text-[7px] font-mono tracking-tighter text-cyan-300 uppercase">
                  NFC 13.56MHz
                </span>
              </div>
            )}

            {/* HEADER ZONE */}
            <div className="pt-2 z-10">
              <div className="flex items-center gap-2 pr-16">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md border border-white/20 shrink-0"
                  style={{ backgroundColor: record.accentColor }}
                >
                  {record.logoText}
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] font-extrabold tracking-tight truncate leading-tight uppercase">
                    {record.organization}
                  </h4>
                  <p className="text-[8px] opacity-75 font-medium truncate tracking-wide">
                    {record.subTitle}
                  </p>
                </div>
              </div>
              <div
                className="h-0.5 w-full mt-2 rounded-full opacity-60"
                style={{ backgroundColor: record.accentColor }}
              />
            </div>

            {/* BODY ZONE: Cardholder Visual & Details */}
            {isLandscape ? (
              /* LANDSCAPE LAYOUT */
              <div className="flex items-center gap-3 my-auto z-10">
                {/* Photo & Blood Group */}
                <div className="relative shrink-0">
                  <div className="w-18 h-22 rounded-lg overflow-hidden border-2 border-white/40 shadow-md bg-slate-800">
                    <img
                      src={record.holderPhoto}
                      alt={record.holderName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  {record.bloodGroup && record.bloodGroup !== 'N/A' && (
                    <div className="absolute -bottom-1.5 -right-1 bg-red-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded shadow flex items-center gap-0.5">
                      <Droplets className="w-2 h-2 text-white" />
                      {record.bloodGroup}
                    </div>
                  )}
                </div>

                {/* Details Column */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="text-[14px] font-black tracking-tight text-white truncate">
                    {record.holderName}
                  </div>
                  <div className="text-[10px] font-bold text-amber-300 truncate">
                    {record.designationOrRole}
                  </div>
                  <div className="text-[8.5px] opacity-80 truncate">
                    {record.departmentOrClass}
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 pt-1 text-[8px]">
                    <div>
                      <span className="opacity-60 block">ID NUMBER:</span>
                      <span className="font-mono font-bold tracking-wide text-cyan-300">
                        {record.idNumber}
                      </span>
                    </div>
                    <div>
                      <span className="opacity-60 block">VALID THRU:</span>
                      <span className="font-mono font-bold">{record.validity}</span>
                    </div>
                    {record.frontExtraFields?.slice(0, 2).map((item, i) => (
                      <div key={i} className="truncate">
                        <span className="opacity-60 block uppercase text-[7px]">{item.label}:</span>
                        <span className="font-semibold truncate text-[7.5px]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* PORTRAIT / VERTICAL LAYOUT */
              <div className="flex flex-col items-center text-center my-auto py-1 z-10">
                {/* Photo with Frame */}
                <div className="relative mb-2">
                  <div className="w-22 h-26 rounded-xl overflow-hidden border-2 border-white/50 shadow-lg bg-slate-800 ring-2 ring-black/40">
                    <img
                      src={record.holderPhoto}
                      alt={record.holderName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {record.bloodGroup && record.bloodGroup !== 'N/A' && (
                    <div className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-red-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow flex items-center gap-0.5 whitespace-nowrap">
                      <Droplets className="w-2 h-2 text-white fill-white" />
                      {record.bloodGroup}
                    </div>
                  )}
                </div>

                {/* Name & Role */}
                <h3 className="text-[13px] font-black tracking-tight text-white leading-tight uppercase mt-1 line-clamp-1">
                  {record.holderName}
                </h3>
                <div className="text-[10px] font-bold text-amber-300 truncate max-w-full">
                  {record.designationOrRole}
                </div>
                <div className="text-[8px] opacity-75 truncate max-w-full">
                  {record.departmentOrClass}
                </div>

                {/* Extra Front Meta Badges */}
                <div className="w-full mt-2 pt-1 border-t border-white/10 grid grid-cols-2 gap-1 text-[7.5px]">
                  <div className="bg-black/30 rounded px-1.5 py-0.5 text-left truncate">
                    <span className="opacity-50 block text-[6.5px]">EMP / ADM ID</span>
                    <span className="font-mono font-bold text-cyan-300 truncate block">
                      {record.admissionOrEmpId}
                    </span>
                  </div>
                  <div className="bg-black/30 rounded px-1.5 py-0.5 text-left truncate">
                    <span className="opacity-50 block text-[6.5px]">VALID UNTIL</span>
                    <span className="font-mono font-bold text-emerald-300 truncate block">
                      {record.validity}
                    </span>
                  </div>
                </div>

                {/* Custom Category Fields */}
                {record.frontExtraFields && record.frontExtraFields.length > 0 && (
                  <div className="w-full mt-1 bg-white/5 rounded px-2 py-0.5 text-left flex items-center justify-between text-[7px] border border-white/10">
                    <span className="opacity-60 font-medium">
                      {record.frontExtraFields[0].label}:
                    </span>
                    <span className="font-bold text-amber-200 truncate ml-1">
                      {record.frontExtraFields[0].value}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* FOOTER ZONE: Category Badge & Verification UID */}
            <div className="pt-1.5 border-t border-white/15 flex items-center justify-between z-10">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[7.5px] font-mono uppercase tracking-widest text-slate-300">
                  {record.category.replace('-', ' ')}
                </span>
              </div>
              <div className="text-[7px] font-mono text-cyan-400/90 tracking-tighter">
                {record.idNumber}
              </div>
            </div>
          </div>

          {/* ===================== BACK SIDE ===================== */}
          <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180 flex flex-col justify-between p-3.5 bg-slate-900 text-slate-100 border border-slate-700 shadow-2xl">
            {/* Slot Punch Indicator Back */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-slate-950 border border-slate-800 shadow-inner z-30"></div>

            {/* Magnetic Stripe / Tech Bar (Realistic PVC aesthetic) */}
            <div className="w-full h-7 -mx-3.5 -mt-3.5 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border-b border-zinc-800 flex items-center justify-between px-3 text-[7px] font-mono text-zinc-500">
              <span>HICO 2750 OE MAGSTRIPE (OPTIONAL)</span>
              <span className="text-zinc-600">IDVERSE PVC SECURITY</span>
            </div>

            {/* Body Content Back */}
            <div className="space-y-1.5 my-auto text-[8px] pt-1">
              {/* Emergency Contact */}
              <div className="bg-slate-800/80 rounded-lg p-1.5 border border-slate-700">
                <div className="flex items-center gap-1 text-rose-400 font-bold text-[7.5px] uppercase">
                  <PhoneCall className="w-2.5 h-2.5" /> Emergency Contacts
                </div>
                <div className="flex justify-between font-mono font-semibold text-[8px] mt-0.5 text-slate-200">
                  <span>Primary: {record.primaryPhone}</span>
                  <span className="text-rose-300">{record.emergencyPhone}</span>
                </div>
              </div>

              {/* Address / Campus */}
              <div className="text-[7.5px] text-slate-300 leading-tight">
                <div className="flex items-center gap-1 text-slate-400 font-semibold uppercase text-[7px]">
                  <MapPin className="w-2.5 h-2.5 text-amber-400" /> Authorized Campus / Facility
                </div>
                <p className="mt-0.5 text-slate-300 line-clamp-2">{record.address}</p>
              </div>

              {/* Terms & Return Instruction */}
              <div className="text-[6.5px] text-slate-400 leading-tight bg-black/40 p-1 rounded border border-slate-800">
                <p>
                  <strong>PROPERTY OF ISSUING AUTHORITY:</strong>{' '}
                  {record.terms ||
                    'This card is non-transferable and must be displayed on premises. If found, please return to the administrative security desk or mail to the campus address.'}
                </p>
              </div>

              {/* Authorized Signatory Line */}
              <div className="flex items-end justify-between pt-1">
                <div className="text-[6.5px] text-slate-400">
                  <span>RFID UID:</span>
                  <span className="font-mono block text-cyan-400 text-[7px]">
                    {record.rfidNumber}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-serif italic text-[9px] text-amber-300/90 -mb-0.5">
                    {record.authorizedSignatory}
                  </div>
                  <div className="w-24 h-[1px] bg-slate-600 mt-0.5"></div>
                  <span className="text-[6px] text-slate-400 uppercase tracking-wider block">
                    Authorized Signatory
                  </span>
                </div>
              </div>
            </div>

            {/* BARCODE & QR FOOTER ZONE */}
            <div className="bg-white rounded-lg p-1.5 text-slate-950 flex items-center justify-between gap-2 shadow-inner">
              {/* Code 128 Realistic Barcode */}
              <div className="flex-1 min-w-0">
                <div className="h-5 flex items-center justify-center gap-[1px] overflow-hidden">
                  {renderBarcodeLines(record.barcodeNumber)}
                </div>
                <div className="text-[7px] font-mono text-center tracking-widest font-bold mt-0.5 text-slate-700">
                  *{record.barcodeNumber}*
                </div>
              </div>

              {/* QR Code Matrix Box */}
              <div className="w-9 h-9 bg-slate-950 text-white rounded p-0.5 flex flex-col items-center justify-center shrink-0">
                <QrCode className="w-7 h-7 text-white" />
                <span className="text-[5px] font-mono text-emerald-400 font-bold uppercase -mt-0.5">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BAR (Under Card) */}
      {interactive && (
        <div className="w-full max-w-[280px] sm:max-w-[340px] mt-3 flex items-center justify-between gap-2 px-1 text-xs">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 font-medium text-[11px] transition-colors shadow-sm"
            title="Flip to inspect front and back faces"
          >
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span>{isFlipped ? 'Show Front' : 'Show Back'}</span>
          </button>

          {onSelectForModal && (
            <button
              type="button"
              onClick={() => onSelectForModal(record)}
              className="flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-medium text-[11px] transition-colors shadow-sm"
              title="Inspect specifications & print-ready details"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Inspect</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
