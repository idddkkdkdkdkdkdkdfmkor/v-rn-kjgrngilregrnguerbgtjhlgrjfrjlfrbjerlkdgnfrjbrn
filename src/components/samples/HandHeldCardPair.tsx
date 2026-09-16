import React from 'react';
import { PVCSampleCardData } from '../../data/realPVCSamplesData';
import { Shield, Award, CheckCircle, Globe, Mail, MapPin, Calendar, AlertCircle } from 'lucide-react';

interface HandHeldCardPairProps {
  sample: PVCSampleCardData;
  onOpenInquiry?: (institutionName: string) => void;
}

export const HandHeldCardPair: React.FC<HandHeldCardPairProps> = ({
  sample,
  onOpenInquiry,
}) => {
  const { front, back } = sample;

  // Render specific emblem icon
  const renderEmblem = () => {
    switch (front.emblemType) {
      case 'school':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-950 border-2 border-amber-300 flex items-center justify-center text-amber-300 shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              {/* Flame / Diya */}
              <path d="M12 2C11.5 5 9 6.5 9 9C9 10.66 10.34 12 12 12C13.66 12 15 10.66 15 9C15 6.5 12.5 5 12 2Z" />
              {/* Open Book */}
              <path d="M19 14.5C17.5 13.5 14.5 13.5 12 14.5C9.5 13.5 6.5 13.5 5 14.5V20.5C6.5 19.5 9.5 19.5 12 20.5C14.5 19.5 17.5 19.5 19 20.5V14.5Z" opacity="0.9" />
            </svg>
          </div>
        );
      case 'corporate':
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
        );
      case 'medical':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald-900 border-2 border-emerald-300 flex items-center justify-center text-emerald-300 shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 10.5H13.5V5C13.5 4.17 12.83 3.5 12 3.5C11.17 3.5 10.5 4.17 10.5 5V10.5H5C4.17 10.5 3.5 11.17 3.5 12C3.5 12.83 4.17 13.5 5 13.5H10.5V19C10.5 19.83 11.17 20.5 12 20.5C12.83 20.5 13.5 19.83 13.5 19V13.5H19C19.83 13.5 20.5 12.83 20.5 12C20.5 11.17 19.83 10.5 19 10.5Z" />
            </svg>
          </div>
        );
      case 'university':
        return (
          <div className="w-10 h-10 rounded-full bg-rose-950 border-2 border-rose-300 flex items-center justify-center text-amber-200 shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
        );
      case 'luxury-gym':
        return (
          <div className="w-10 h-10 rounded-full bg-black border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 rounded-2xl p-4 sm:p-7 shadow-xs">
      {/* Studio Lighting DSLR Showcase Stage (White / Light Grey Background) */}
      <div className="relative w-full rounded-xl bg-gradient-to-b from-[#fafcff] via-[#f1f5f9] to-[#e2e8f0] p-4 sm:p-8 pt-6 pb-12 border border-slate-200/80 overflow-hidden shadow-inner">
        {/* Softbox Studio Light Falloff Simulation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.95)_0%,rgba(241,245,249,0.7)_60%,rgba(226,232,240,0.85)_100%)] pointer-events-none" />

        {/* Studio Product Photography Labels */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white shadow-xs">
              {sample.categoryLabel.split('.')[1]?.trim() || sample.categoryLabel}
            </span>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              • 30 Mil Fused Solid PVC • Matte PolyGuard
            </span>
          </div>
          <div className="text-[11px] font-medium text-slate-500 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
            DSLR Studio Shot • Dual-Sided Production Proof
          </div>
        </div>

        {/* The Card Pair Grid (Front & Back Side Dual-Sided Studio Proof) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-10 xl:gap-14 justify-items-center items-center max-w-5xl mx-auto">
          
          {/* ========================================================= */}
          {/* FRONT CARD (STUDIO PROOF) */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center w-full">
            <div className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              Front Side Face (Obverse)
            </div>

            <div className="relative pb-6 flex justify-center w-full">
              {/* Physical Solid PVC Card (Front) */}
              <div
                className="relative w-[280px] sm:w-[315px] max-w-[calc(100vw-3rem)] h-[455px] sm:h-[495px] rounded-[14px] bg-white overflow-hidden select-none
                           border border-slate-200 shadow-[0_22px_45px_-10px_rgba(15,23,42,0.22),0_8px_18px_-4px_rgba(15,23,42,0.12)]
                           transition-transform duration-300 hover:scale-[1.01]"
              >
                {/* 30 Mil (0.76mm) Plastic Edge Highlight */}
                <div className="absolute inset-0 rounded-[14px] pointer-events-none shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.95),inset_0_-1px_1.5px_rgba(0,0,0,0.15)] z-20" />

                {/* Matte Lamination Studio Light Specular Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />

                {/* --- LANYARD SLOT PUNCH CUTOUT (14 x 3 mm standard oval) --- */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="w-12 h-2.5 rounded-full bg-slate-300/90 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.5),0_1px_0.5px_rgba(255,255,255,0.9)] border border-slate-400/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-500/50 via-slate-400/30 to-slate-200/20" />
                  </div>
                </div>

                {/* --- CARD FRONT CONTENT --- */}
                <div className="h-full flex flex-col justify-between pt-7 pb-4 px-4">
                  {/* Top Institution Banner */}
                  <div className={`-mx-4 -mt-7 pt-7 pb-3 px-4 bg-gradient-to-r ${front.headerBg} border-b border-black/10 shadow-xs text-center relative`}>
                    {/* Security Micro-Pattern Tint */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

                    <div className="relative flex items-center justify-center gap-2.5">
                      {renderEmblem()}
                      <div className="text-left">
                        <h4 className="text-[13px] sm:text-[14px] font-extrabold tracking-tight leading-tight" style={{ color: front.headerTextColor }}>
                          {front.emblemTitle}
                        </h4>
                        <p className="text-[9.5px] font-semibold tracking-wider uppercase opacity-85" style={{ color: front.headerTextColor }}>
                          {front.emblemSubtitle}
                        </p>
                      </div>
                    </div>

                    {front.affiliationText && (
                      <p className="mt-1.5 text-[8.5px] font-medium tracking-tight text-white/75 truncate border-t border-white/10 pt-1">
                        {front.affiliationText}
                      </p>
                    )}
                  </div>

                  {/* Badge Ribbon */}
                  <div className="flex items-center justify-between mt-2.5">
                    <span
                      className="text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-full uppercase shadow-xs"
                      style={{ backgroundColor: `${front.accentColor}18`, color: front.accentColor }}
                    >
                      {front.badgeText}
                    </span>
                    {front.subBadge && (
                      <span className="text-[8.5px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200">
                        {front.subBadge}
                      </span>
                    )}
                  </div>

                  {/* Photo & Identity Core */}
                  <div className="flex flex-col items-center my-1 relative">
                    <div className="relative">
                      {/* Photo Container with Realistic Laminated Border */}
                      <div
                        className="w-24 h-30 sm:w-26 sm:h-32 rounded-xl overflow-hidden shadow-md relative border-2"
                        style={{ borderColor: front.accentColor }}
                      >
                        {/* Real Portrait Photo */}
                        <img
                          src={front.photoUrl}
                          alt="ID Card Photo Sample"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />

                        {/* PRIVACY REQUIREMENT: Face Blur Filter & Redaction Overlay */}
                        <div className="absolute inset-0 backdrop-blur-[6px] bg-slate-900/10 flex flex-col items-center justify-center">
                          <span className="text-[9px] font-bold text-white/90 bg-slate-900/80 px-2 py-0.5 rounded-full backdrop-blur-xs shadow-xs">
                            FACE BLURRED
                          </span>
                        </div>
                      </div>

                      {/* Printed Holographic Verification Seal (No NFC / No Smart Chip) */}
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-tr from-amber-300 via-emerald-200 to-sky-300 border border-white/80 shadow-xs flex items-center justify-center text-[7px] font-black text-slate-800">
                        PVC★
                      </div>
                    </div>

                    {/* PRIVACY REQUIREMENT: Name Blurred while typography and weight remain visible */}
                    <div className="mt-2.5 text-center w-full px-2">
                      <div className="relative inline-block">
                        <span className="text-[14px] sm:text-[15px] font-extrabold text-slate-900 tracking-wide select-none filter blur-[4px]">
                          {front.dummyName}
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider bg-white/70 px-1.5 rounded">
                            NAME REDACTED
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] sm:text-[12px] font-bold text-slate-800 mt-0.5 leading-tight">
                        {front.roleOrClass}
                      </p>
                      <p className="text-[10px] font-medium text-slate-500">
                        {front.departmentOrProgram}
                      </p>
                    </div>
                  </div>

                  {/* Primary Front Credential Strip */}
                  <div className="bg-slate-50/90 rounded-lg p-2.5 border border-slate-200/80 text-[10.5px] space-y-1 shadow-2xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-semibold uppercase text-[9.5px]">ID NUMBER:</span>
                      <span className="font-mono font-bold text-slate-800 filter blur-[3.5px] select-none">
                        {front.dummyIdNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-semibold uppercase text-[9.5px]">BLOOD GROUP:</span>
                      <span className="font-bold text-rose-600 filter blur-[3.5px] select-none">
                        {front.dummyBloodGroup}
                      </span>
                    </div>
                    {front.extraFrontField && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-semibold uppercase text-[9.5px]">{front.extraFrontField.label}:</span>
                        <span className="font-medium text-slate-800">{front.extraFrontField.value}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500 font-bold uppercase text-[9.5px]">VALID TILL:</span>
                      <span className="font-bold text-emerald-700 tracking-wide">{front.validTill}</span>
                    </div>
                  </div>

                  {/* Bottom Footer Border Bar */}
                  <div className="-mx-4 -mb-4 mt-2 px-4 py-1.5 bg-slate-900 text-white flex items-center justify-between text-[9px] font-bold tracking-wider">
                    <span>SOLID PVC ID-1</span>
                    <span className="opacity-80">VERIFIED CARD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BACK CARD (STUDIO PROOF - STRICT UNIFORM STRUCTURE) */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center w-full">
            <div className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              Back Side Face (Reverse)
            </div>

            <div className="relative pb-6 flex justify-center w-full">
              {/* Physical Solid PVC Card (Back) */}
              <div
                className="relative w-[280px] sm:w-[315px] max-w-[calc(100vw-3rem)] h-[455px] sm:h-[495px] rounded-[14px] bg-white overflow-hidden select-none
                           border border-slate-200 shadow-[0_22px_45px_-10px_rgba(15,23,42,0.22),0_8px_18px_-4px_rgba(15,23,42,0.12)]
                           transition-transform duration-300 hover:scale-[1.01]"
              >
                {/* 30 Mil Plastic Edge Highlight */}
                <div className="absolute inset-0 rounded-[14px] pointer-events-none shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.95),inset_0_-1px_1.5px_rgba(0,0,0,0.15)] z-20" />

                {/* Matte Lamination Studio Light Specular Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />

                {/* --- LANYARD SLOT PUNCH CUTOUT --- */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="w-12 h-2.5 rounded-full bg-slate-300/90 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.5),0_1px_0.5px_rgba(255,255,255,0.9)] border border-slate-400/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-500/50 via-slate-400/30 to-slate-200/20" />
                  </div>
                </div>

                {/* --- STRICT UNIFORM BACK SIDE CONTENT --- */}
                <div className="h-full flex flex-col justify-between pt-7 pb-4 px-4 text-slate-800">
                  {/* Header Title */}
                  <div className="text-center pb-2 border-b border-slate-200">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                      TERMS OF ISSUANCE & HOLDER DETAILS
                    </p>
                    <p className="text-[8.5px] font-medium text-slate-400">
                      Property of {sample.institutionName}. Non-transferable.
                    </p>
                  </div>

                  {/* 1. Photo Thumbnail & Holder Core Info (Blurred Personal Data) */}
                  <div className="flex items-start gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 my-1">
                    {/* Blurred Photo Thumbnail */}
                    <div className="w-12 h-14 rounded-md overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative">
                      <img
                        src={back.photoThumbnailUrl}
                        alt="Holder Thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 backdrop-blur-[5px] bg-slate-900/10" />
                    </div>

                    {/* Data Fields */}
                    <div className="flex-1 min-w-0 text-[10px] space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-semibold uppercase text-[8.5px]">ID NO:</span>
                        <span className="font-mono font-bold text-slate-800 filter blur-[3.5px] select-none">
                          {back.dummyIdNumber}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-semibold uppercase text-[8.5px]">DOB:</span>
                        <span className="font-bold text-slate-800 filter blur-[3.5px] select-none">
                          {back.dummyDob}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-semibold uppercase text-[8.5px]">BLOOD GROUP:</span>
                        <span className="font-bold text-rose-600 filter blur-[3.5px] select-none">
                          {back.dummyBloodGroup}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-semibold uppercase text-[8.5px]">EMERGENCY:</span>
                        <span className="font-bold text-slate-800 filter blur-[3.5px] select-none">
                          {back.dummyEmergencyContact}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Residential Address (Blurred) */}
                  <div className="text-[9px] bg-slate-50/70 p-2 rounded-md border border-slate-200/70">
                    <span className="text-slate-400 font-bold uppercase text-[8.5px] block mb-0.5">
                      PERMANENT / RESIDENTIAL ADDRESS:
                    </span>
                    <p className="text-slate-700 leading-tight filter blur-[3.5px] select-none">
                      {back.dummyAddress}
                    </p>
                  </div>

                  {/* 3. Machine Readable Section: QR Code (Visible design, blurred content) & Barcode */}
                  <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-lg border border-slate-200">
                    {/* QR Code Container */}
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-white p-1 rounded border border-slate-300 relative flex items-center justify-center">
                        {/* Realistic 2D QR Code SVG Matrix */}
                        <svg width="48" height="48" viewBox="0 0 33 33" className="text-slate-900">
                          {/* Top-Left Finder */}
                          <rect x="0" y="0" width="7" height="7" fill="currentColor" />
                          <rect x="1" y="1" width="5" height="5" fill="#fff" />
                          <rect x="2" y="2" width="3" height="3" fill="currentColor" />
                          {/* Top-Right Finder */}
                          <rect x="26" y="0" width="7" height="7" fill="currentColor" />
                          <rect x="27" y="1" width="5" height="5" fill="#fff" />
                          <rect x="28" y="2" width="3" height="3" fill="currentColor" />
                          {/* Bottom-Left Finder */}
                          <rect x="0" y="26" width="7" height="7" fill="currentColor" />
                          <rect x="1" y="27" width="5" height="5" fill="#fff" />
                          <rect x="2" y="28" width="3" height="3" fill="currentColor" />
                          {/* Inner Matrix Pixels (Blurred Payload) */}
                          <g filter="url(#qr-blur)">
                            <rect x="9" y="3" width="2" height="4" fill="currentColor" />
                            <rect x="13" y="1" width="3" height="2" fill="currentColor" />
                            <rect x="18" y="2" width="2" height="3" fill="currentColor" />
                            <rect x="10" y="10" width="4" height="4" fill="currentColor" />
                            <rect x="16" y="12" width="5" height="2" fill="currentColor" />
                            <rect x="12" y="18" width="6" height="3" fill="currentColor" />
                            <rect x="22" y="10" width="3" height="5" fill="currentColor" />
                            <rect x="20" y="18" width="4" height="2" fill="currentColor" />
                            <rect x="10" y="24" width="4" height="3" fill="currentColor" />
                            <rect x="17" y="26" width="3" height="4" fill="currentColor" />
                          </g>
                          <defs>
                            <filter id="qr-blur">
                              <feGaussianBlur stdDeviation="0.9" />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                      <span className="text-[7.5px] font-bold text-slate-400 mt-0.5">QR VERIFY</span>
                    </div>

                    {/* Barcode (Visible design with blurred human-readable number) */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full h-9 flex items-center justify-center px-1">
                        {/* Authentic Code 128 vertical barcode bars */}
                        <div className="flex items-stretch justify-center h-8 gap-[1.5px] w-full">
                          {[2,1,3,1,1,2,3,1,2,1,1,3,2,1,1,2,1,3,1,2,2,1,3,1,1,2,1,2,3,1,1,2,2,1].map((width, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-900 inline-block h-full"
                              style={{ width: `${width * 1.3}px` }}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Barcode number: blurred */}
                      <span className="font-mono text-[9px] tracking-widest text-slate-600 filter blur-[3.5px] select-none">
                        *{back.barcodeCode}*
                      </span>
                    </div>
                  </div>

                  {/* 4. Valid Till & Organization Info */}
                  <div className="text-[8.5px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-200">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-500">VALID TILL:</span>
                      <span className="text-emerald-700 text-[9.5px]">{back.validTill}</span>
                    </div>
                    <p className="text-slate-600 truncate">
                      <span className="font-bold text-slate-500">ORG ADDR:</span> {back.organizationAddress}
                    </p>
                    <div className="flex justify-between items-center pt-0.5">
                      <span><span className="font-bold text-slate-500">WEB:</span> {back.website}</span>
                      <span><span className="font-bold text-slate-500">EMAIL:</span> {back.email}</span>
                    </div>
                  </div>

                  {/* 5. Signature Strip with Blurred Cursive Handwriting */}
                  <div className="mt-1 pt-1.5 border-t border-slate-200">
                    <div className="flex items-end justify-between gap-2">
                      <div className="text-[8px] text-slate-400 font-medium">
                        If found, please return to the organization address above.
                      </div>

                      {/* Signature Box */}
                      <div className="w-32 bg-slate-50 border border-dashed border-slate-300 rounded p-1 text-center relative">
                        {/* Cursive Handwriting SVG with Privacy Blur */}
                        <div className="h-5 flex items-center justify-center filter blur-[3.5px] opacity-85 select-none">
                          <svg width="90" height="20" viewBox="0 0 90 20" fill="none">
                            <path
                              d="M 5 15 C 15 5, 25 18, 35 8 C 45 3, 50 15, 60 7 C 70 18, 80 8, 85 14"
                              stroke="#0f172a"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="text-[7.5px] font-bold text-slate-500 uppercase border-t border-slate-200 mt-0.5 pt-0.5">
                          {back.signatoryTitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- INSTITUTION NAME BELOW THE PAIR (STRICT REQUIREMENT) --- */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-200/90 text-center max-w-2xl mx-auto">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {sample.institutionName}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5">
            {sample.tagline} • <span className="font-bold text-slate-700">{sample.city}, India</span>
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenInquiry?.(sample.institutionName)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Order Similar PVC Cards →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
