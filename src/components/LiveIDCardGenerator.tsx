import React, { useState, useRef } from 'react';
import {
  RotateCw,
  Upload,
  Sparkles,
  Download,
  Printer,
  MessageCircle,
  QrCode,
  Wifi,
  ShieldCheck,
  Palette,
  Check,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { CardCustomizerData } from '../types';
import { COMPANY_INFO } from '../data/mockData';

const TEMPLATES: Record<
  string,
  {
    name: string;
    institution: string;
    tagline: string;
    person: string;
    role: string;
    id: string;
    dept: string;
    blood: string;
    valid: string;
    color: string;
    lanyardText: string;
    lanyardColor: string;
    photo: string;
  }
> = {
  school: {
    name: 'School / Academy',
    institution: 'DELHI PUBLIC ACADEMY',
    tagline: 'Affiliated to CBSE • New Delhi',
    person: 'JAGJEET SINGH',
    role: 'STUDENT',
    id: 'DPA-2025-0841',
    dept: 'Class XI - Sci A',
    blood: 'B +ve',
    valid: 'MAY 2026',
    color: '#1d4ed8', // Blue
    lanyardText: 'DELHI PUBLIC ACADEMY • EXCELLENCE IN EDUCATION',
    lanyardColor: '#1d4ed8',
    photo: '/ceo-photo.jpg',
  },
  corporate: {
    name: 'Corporate / IT Park',
    institution: 'TECHCORP SOLUTIONS LTD',
    tagline: 'Cyber City, Gurugram • DLF Phase 3',
    person: 'PRIYA NAIR',
    role: 'SR. SOFTWARE ARCHITECT',
    id: 'TC-EMP-4099',
    dept: 'Cloud Engineering',
    blood: 'O +ve',
    valid: 'DEC 2027',
    color: '#0f172a', // Navy
    lanyardText: 'TECHCORP SOLUTIONS • ACCESS BADGE',
    lanyardColor: '#0f172a',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
  hospital: {
    name: 'Hospital / Healthcare',
    institution: 'APEX MULTISPECIALITY HOSPITAL',
    tagline: 'Emergency & Critical Care Wing',
    person: 'DR. KAVITA MENON',
    role: 'CONSULTANT CARDIOLOGIST',
    id: 'AMH-DOC-112',
    dept: 'Department of Cardiology',
    blood: 'AB +ve',
    valid: 'PERMANENT',
    color: '#0d9488', // Teal
    lanyardText: 'APEX HOSPITALS • MEDICAL STAFF',
    lanyardColor: '#0f766e',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
  },
  club: {
    name: 'VIP Club / Gym',
    institution: 'ROYAL HERITAGE CLUB & SPA',
    tagline: 'Exclusive Member Privileges',
    person: 'VIKRAMADITYA RAO',
    role: 'GOLD PRIVILEGE MEMBER',
    id: 'RHC-VIP-889',
    dept: 'All-Access Tier',
    blood: 'A +ve',
    valid: 'DEC 2028',
    color: '#b45309', // Amber / Gold
    lanyardText: 'ROYAL HERITAGE CLUB • VIP MEMBER',
    lanyardColor: '#78350f',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
};

const COLOR_PALETTES = [
  { name: 'Royal Enterprise Blue', hex: '#2563eb' },
  { name: 'Executive Midnight Navy', hex: '#0f172a' },
  { name: 'Medical & Clinical Teal', hex: '#0d9488' },
  { name: 'Emerald Forest Green', hex: '#16a34a' },
  { name: 'Crimson Red / Cardinal', hex: '#dc2626' },
  { name: 'Regal Gold / Bronze', hex: '#b45309' },
  { name: 'Amethyst Deep Purple', hex: '#7c3aed' },
];

export const LiveIDCardGenerator: React.FC = () => {
  const [activeTemplateKey, setActiveTemplateKey] = useState<string>('school');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showLanyard, setShowLanyard] = useState<boolean>(true);
  const [savedProofToast, setSavedProofToast] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [cardData, setCardData] = useState<CardCustomizerData>({
    template: 'school',
    institutionName: TEMPLATES.school.institution,
    tagline: TEMPLATES.school.tagline,
    personName: TEMPLATES.school.person,
    designation: TEMPLATES.school.role,
    idNumber: TEMPLATES.school.id,
    departmentOrClass: TEMPLATES.school.dept,
    bloodGroup: TEMPLATES.school.blood,
    validUpto: TEMPLATES.school.valid,
    emergencyPhone: '+91 93365 22126',
    address: 'Plot 45, Knowledge Park III, Greater Noida, UP - 201306',
    themeColor: TEMPLATES.school.color,
    photoUrl: TEMPLATES.school.photo,
    logoUrl: '',
    lanyardText: TEMPLATES.school.lanyardText,
    lanyardColor: TEMPLATES.school.lanyardColor,
    barcodeNumber: '890123456789',
    qrPayload: 'https://idcraftindia.com/verify?id=DPA-2025-0841',
    showHoloSeal: true,
  });

  const handleTemplateChange = (key: string) => {
    const t = TEMPLATES[key];
    setActiveTemplateKey(key);
    setCardData((prev) => ({
      ...prev,
      template: key as any,
      institutionName: t.institution,
      tagline: t.tagline,
      personName: t.person,
      designation: t.role,
      idNumber: t.id,
      departmentOrClass: t.dept,
      bloodGroup: t.blood,
      validUpto: t.valid,
      themeColor: t.color,
      photoUrl: t.photo,
      lanyardText: t.lanyardText,
      lanyardColor: t.lanyardColor,
      barcodeNumber: '890' + Math.floor(100000000 + Math.random() * 900000000),
      qrPayload: `https://idcraftindia.com/verify?id=${t.id}`,
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCardData((prev) => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCardData((prev) => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrintProof = () => {
    window.print();
  };

  const handleWhatsAppOrderThisDesign = () => {
    const text = encodeURIComponent(
      `Hello IDCraft India! I designed an ID card on your website:\n` +
        `• Institution: ${cardData.institutionName}\n` +
        `• Theme Color: ${cardData.themeColor}\n` +
        `• Lanyard: ${cardData.lanyardText}\n` +
        `• Emergency Contact & QR features enabled.\n` +
        `I would like to get an official quote for 500+ cards for this design.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="studio-section" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint border border-brand-mint text-brand-dark text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            Interactive 3D ID Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Design & Preview Your ID Card in Real-Time
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Customize typography, institution credentials, lanyard branding, and scannable QR/barcodes.
            Watch your card update instantaneously on both front and back.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= CONTROLS COLUMN (7 cols) ================= */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
            {/* Step 1: Preset Templates */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                1. Select Industry Archetype Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.keys(TEMPLATES).map((key) => {
                  const isActive = activeTemplateKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleTemplateChange(key)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all border ${
                        isActive
                          ? 'border-brand-primary bg-brand-mint/70 text-brand-dark shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{TEMPLATES[key].name}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-brand-primary" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Theme Accent Color */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                2. Card & Lanyard Brand Color
              </label>
              <div className="flex flex-wrap items-center gap-2.5">
                {COLOR_PALETTES.map((c) => {
                  const isSelected = cardData.themeColor === c.hex;
                  return (
                    <button
                      key={c.hex}
                      onClick={() =>
                        setCardData((prev) => ({
                          ...prev,
                          themeColor: c.hex,
                          lanyardColor: c.hex,
                        }))
                      }
                      className={`w-8 h-8 rounded-full transition-transform flex items-center justify-center ${
                        isSelected ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Institution & Cardholder Details */}
            <div className="space-y-4 mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                3. Customize Text & Credentials
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    Institution / Company Name
                  </span>
                  <input
                    type="text"
                    value={cardData.institutionName}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, institutionName: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    Campus Location / Tagline
                  </span>
                  <input
                    type="text"
                    value={cardData.tagline}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, tagline: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Identity Data */}
            <div className="mb-6 pt-4 border-t border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                3. Identity Variables
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    Holder Name
                  </span>
                  <input
                    type="text"
                    value={cardData.personName}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, personName: e.target.value.toUpperCase() }))
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    Designation / Role
                  </span>
                  <input
                    type="text"
                    value={cardData.designation}
                    onChange={(e) =>
                      setCardData((prev) => ({
                        ...prev,
                        designation: e.target.value.toUpperCase(),
                      }))
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    Unique ID No.
                  </span>
                  <input
                    type="text"
                    value={cardData.idNumber}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, idNumber: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    Class & Sec / Department
                  </span>
                  <input
                    type="text"
                    value={cardData.departmentOrClass}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, departmentOrClass: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">Blood Group</span>
                  <select
                    value={cardData.bloodGroup}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, bloodGroup: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0 bg-white text-slate-900"
                  >
                    <option value="A +ve">A +ve</option>
                    <option value="A -ve">A -ve</option>
                    <option value="B +ve">B +ve</option>
                    <option value="B -ve">B -ve</option>
                    <option value="O +ve">O +ve</option>
                    <option value="O -ve">O -ve</option>
                    <option value="AB +ve">AB +ve</option>
                    <option value="AB -ve">AB -ve</option>
                  </select>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    Emergency Phone
                  </span>
                  <input
                    type="text"
                    value={cardData.emergencyPhone}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, emergencyPhone: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Photo and Lanyard Controls */}
            <div className="pt-4 border-t border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                4. Photo Upload & Lanyard Ribbon Branding
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Photo Upload */}
                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Upload Custom Photo
                  </span>
                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-300 hover:border-brand-mint0 cursor-pointer bg-slate-50 hover:bg-brand-mint/50 transition-colors text-xs font-medium text-slate-600">
                    <Upload className="w-4 h-4 text-brand-primary" />
                    <span>Choose PNG/JPG photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Lanyard Text */}
                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Custom Lanyard Ribbon Text
                  </span>
                  <input
                    type="text"
                    value={cardData.lanyardText}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, lanyardText: e.target.value }))
                    }
                    placeholder="e.g. DELHI PUBLIC SCHOOL"
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-semibold text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLanyard}
                    onChange={(e) => setShowLanyard(e.target.checked)}
                    className="rounded text-brand-primary focus:ring-brand-mint0"
                  />
                  <span>Show Branded Satin Lanyard</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cardData.showHoloSeal}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, showHoloSeal: e.target.checked }))
                    }
                    className="rounded text-brand-primary focus:ring-brand-mint0"
                  />
                  <span>Include Holographic 3D Security Stamp</span>
                </label>
              </div>
            </div>
          </div>

          {/* ================= LIVE CARD PREVIEW COLUMN (5 cols) ================= */}
          <div className="lg:col-span-5 flex flex-col items-center sticky top-28">
            {/* Lanyard Ribbon Preview if enabled */}
            {showLanyard && (
              <div className="w-16 h-20 rounded-t-md shadow-md flex items-center justify-center overflow-hidden border-x border-black/30 relative select-none"
                   style={{ backgroundColor: cardData.lanyardColor }}>
                <div className="text-[9px] text-white font-extrabold uppercase tracking-widest rotate-90 whitespace-nowrap drop-shadow-xs">
                  {cardData.lanyardText || 'IDCRAFT INDIA • PREMIUM'}
                </div>
                <div className="absolute inset-y-0 left-0 w-1.5 bg-white/25" />
                <div className="absolute inset-y-0 right-0 w-1.5 bg-black/25" />
              </div>
            )}

            {showLanyard && (
              /* Chrome Doghook Clasp */
              <div className="w-11 h-7 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 rounded-b-md shadow-xs border border-slate-400 flex flex-col items-center justify-end pb-1 relative z-10 -mt-0.5 select-none">
                <div className="w-4 h-2 rounded-full border border-slate-600 bg-slate-100" />
              </div>
            )}

            {/* 3D Perspective Card Container */}
            <div
              ref={cardRef}
              onClick={() => setIsFlipped(!isFlipped)}
              className="perspective-1000 w-full max-w-[320px] aspect-[1/1.58] cursor-pointer mt-1 select-none"
              title="Click to flip between Front and Back"
            >
              <div
                className={`w-full h-full relative duration-500 preserve-3d shadow-2xl rounded-2xl border border-slate-200/90 transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* ================= FRONT ================= */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-white flex flex-col justify-between p-5 border border-slate-200 shadow-inner">
                  {/* Slot Punch */}
                  <div className="self-center w-12 h-3.5 rounded-full bg-slate-200/80 border border-slate-300/70 mb-1 flex items-center justify-center">
                    <div className="w-8 h-1 bg-slate-400/50 rounded-full" />
                  </div>

                  {/* Header Bar */}
                  <div
                    className="p-3 rounded-xl text-white mb-2 shadow-xs"
                    style={{ backgroundColor: cardData.themeColor }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="pr-1">
                        <h4 className="text-xs font-black tracking-tight leading-tight uppercase">
                          {cardData.institutionName || 'INSTITUTION NAME'}
                        </h4>
                        <p className="text-[9px] opacity-90 tracking-wide">
                          {cardData.tagline || 'CAMPUS IDENTIFICATION'}
                        </p>
                      </div>
                      <Wifi className="w-3.5 h-3.5 shrink-0 opacity-80 rotate-90" />
                    </div>
                  </div>

                  {/* Photo & Name */}
                  <div className="flex flex-col items-center my-auto">
                    <div className="relative">
                      <img
                        src={cardData.photoUrl}
                        alt="Profile"
                        className="w-24 h-28 object-cover rounded-xl shadow-md border-2"
                        style={{ borderColor: cardData.themeColor }}
                      />
                      {cardData.showHoloSeal && (
                        <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full hologram-effect border border-white shadow-sm flex items-center justify-center text-[8px] font-black text-slate-800">
                          ID★
                        </div>
                      )}
                    </div>

                    <h3 className="mt-3 text-base font-extrabold text-slate-900 tracking-tight text-center uppercase">
                      {cardData.personName || 'PERSON NAME'}
                    </h3>
                    <span
                      className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mt-1 text-white shadow-2xs"
                      style={{ backgroundColor: cardData.themeColor }}
                    >
                      {cardData.designation || 'CREDENTIAL'}
                    </span>
                  </div>

                  {/* Credentials Table */}
                  <div className="bg-slate-50 rounded-xl p-2 text-[10px] space-y-1 border border-slate-100 mt-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">ID No:</span>
                      <span className="font-bold text-slate-900">{cardData.idNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Department / Class:</span>
                      <span className="font-bold text-slate-900">{cardData.departmentOrClass}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Blood Group:</span>
                      <span className="font-extrabold text-rose-600">{cardData.bloodGroup}</span>
                    </div>
                  </div>

                  {/* Barcode Footer */}
                  <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-[9px]">
                    <span className="font-mono text-slate-400">||| | |||| || ||||| ||</span>
                    <span className="font-semibold text-slate-400">ISO 7810 30MIL</span>
                  </div>
                </div>

                {/* ================= BACK ================= */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-white flex flex-col justify-between p-5 border border-slate-200 shadow-inner">
                  {/* Slot Punch */}
                  <div className="self-center w-12 h-3.5 rounded-full bg-slate-200/80 border border-slate-300/70 mb-1 flex items-center justify-center">
                    <div className="w-8 h-1 bg-slate-400/50 rounded-full" />
                  </div>

                  {/* Reverse Instructions */}
                  <div className="text-center border-b border-slate-100 pb-2">
                    <p className="text-[10px] font-bold text-slate-700 uppercase">
                      Official Identification Card
                    </p>
                    <p className="text-[8px] text-slate-500 mt-0.5 leading-tight">
                      Property of {cardData.institutionName}. If found, please return to the
                      administrative office.
                    </p>
                  </div>

                  {/* QR Box */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                      <QrCode className="w-14 h-14 text-slate-900" />
                    </div>
                    <div className="text-[9px] space-y-0.5">
                      <p className="font-bold text-slate-900">Valid Upto: {cardData.validUpto}</p>
                      <p className="text-slate-600">Emergency: {cardData.emergencyPhone}</p>
                      <p className="text-[8px] text-brand-dark font-medium">Scan QR to verify authentic record</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="text-[9px] text-slate-600 space-y-0.5">
                    <p className="font-bold text-slate-800">Campus Address:</p>
                    <p className="text-slate-500 text-[8px] leading-tight">{cardData.address}</p>
                  </div>

                  {/* Signatory */}
                  <div className="border-t border-slate-100 pt-2 flex items-end justify-between">
                    <div>
                      <p className="text-[8px] font-mono text-slate-400">RFID: 8A:99:FC:12</p>
                      <p className="text-[8px] text-slate-400">Manufactured by IDCraft.in</p>
                    </div>
                    <div className="text-right">
                      <div className="font-serif italic text-xs font-bold text-blue-900">
                        Authorized Sign
                      </div>
                      <p className="text-[8px] font-bold text-slate-500 uppercase">Issuing Officer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flip Hint Bar */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
              >
                <RotateCw className="w-3.5 h-3.5 text-brand-primary" />
                <span>Flip to {isFlipped ? 'Front View' : 'Back View'}</span>
              </button>
            </div>

            {/* Action Bar */}
            <div className="w-full max-w-[320px] mt-6 flex flex-col gap-2">
              <button
                onClick={handleWhatsAppOrderThisDesign}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order This Design on WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePrintProof}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print Proof</span>
                </button>

                <button
                  onClick={() => {
                    setSavedProofToast(
                      `Card proof for "${cardData.institutionName}" saved! Our engineering team can print this exact layout with your roster.`
                    );
                    setTimeout(() => setSavedProofToast(null), 4000);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-mint border border-brand-mint text-brand-dark text-xs font-semibold hover:bg-brand-mint transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Save Proof</span>
                </button>
              </div>

              {savedProofToast && (
                <div className="mt-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{savedProofToast}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
