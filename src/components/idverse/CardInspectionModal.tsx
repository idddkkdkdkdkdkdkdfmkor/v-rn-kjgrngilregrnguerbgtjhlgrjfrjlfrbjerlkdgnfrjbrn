import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  Shield,
  Layers,
  Cpu,
  QrCode,
  Sparkles,
  Download,
  Share2,
  ExternalLink,
  Info,
} from 'lucide-react';
import { IDVerseRecord } from '../../types/idverse';
import { PhysicalPVCCard } from './PhysicalPVCCard';

interface CardInspectionModalProps {
  record: IDVerseRecord | null;
  onClose: () => void;
  onOpenBulkOrder?: (categoryName: string) => void;
}

export const CardInspectionModal: React.FC<CardInspectionModalProps> = ({
  record,
  onClose,
  onOpenBulkOrder,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'payload' | 'security'>('specs');

  if (!record) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(record, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: record.accentColor }}
            />
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {record.organization}
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {record.categoryLabel}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Card UID: <span className="font-mono text-cyan-400">{record.idNumber}</span> • ISO/IEC 7810 ID-1 Standard PVC
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 3D Card Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-950/70 p-6 rounded-xl border border-slate-800">
            <p className="text-xs font-medium text-slate-400 mb-4 text-center">
              Click <strong className="text-cyan-400">Show Back</strong> to preview double-sided PVC layout
            </p>
            <PhysicalPVCCard record={record} interactive={true} />

            <div className="w-full mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">THICKNESS</span>
                <span className="font-bold text-white font-mono">30 MIL / 0.76 MM</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">CORNER RADIUS</span>
                <span className="font-bold text-white font-mono">3.18 MM ISO</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Technical Specs */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 text-xs font-semibold gap-4">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                PVC Print Specifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`pb-2 transition-colors ${
                  activeTab === 'security'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                RFID & Security Layers
              </button>
              <button
                onClick={() => setActiveTab('payload')}
                className={`pb-2 transition-colors ${
                  activeTab === 'payload'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Dummy Data Payload (JSON)
              </button>
            </div>

            {/* TAB 1: Specs */}
            {activeTab === 'specs' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">CARD STANDARD</span>
                    <span className="font-bold text-white">ISO/IEC 7810 ID-1</span>
                    <span className="text-[10px] text-slate-500 block">CR-80 Dimensions</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">PHYSICAL SIZE</span>
                    <span className="font-bold text-white font-mono">85.60 × 53.98 mm</span>
                    <span className="text-[10px] text-slate-500 block">3.370 × 2.125 inches</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">CORE MATERIAL</span>
                    <span className="font-bold text-white">Solid Core PVC</span>
                    <span className="text-[10px] text-slate-500 block">Non-Delaminating</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">PRINT ENGINE</span>
                    <span className="font-bold text-white">Retransfer 600 DPI</span>
                    <span className="text-[10px] text-slate-500 block">Over-the-edge bleed</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">LAMINATION</span>
                    <span className="font-bold text-white">1.0 Mil PolyGuard</span>
                    <span className="text-[10px] text-slate-500 block">Anti-scratch & UV safe</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">SLOT PUNCH</span>
                    <span className="font-bold text-white font-mono">14 × 3 mm Oval</span>
                    <span className="text-[10px] text-slate-500 block">Top center punch</span>
                  </div>
                </div>

                {/* Cardholder Summary Info */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-400" /> Holder Profile Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
                    <div>
                      <span className="text-slate-500">Full Name:</span> {record.holderName}
                    </div>
                    <div>
                      <span className="text-slate-500">Role:</span> {record.designationOrRole}
                    </div>
                    <div>
                      <span className="text-slate-500">Dept/Class:</span> {record.departmentOrClass}
                    </div>
                    <div>
                      <span className="text-slate-500">Blood Group:</span> {record.bloodGroup}
                    </div>
                    <div>
                      <span className="text-slate-500">Validity:</span> {record.validity}
                    </div>
                    <div>
                      <span className="text-slate-500">City:</span> {record.city}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Security */}
            {activeTab === 'security' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Smart RFID / Contactless Chip</h5>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Encrypted 13.56 MHz Mifare Classic 1K / NFC ISO 14443A chip inlay embedded between PVC substrate sheets.
                    </p>
                    <div className="mt-2 font-mono text-[11px] text-cyan-400 bg-black/50 px-2 py-1 rounded inline-block">
                      UID: {record.rfidNumber}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Encrypted 2D Matrix QR Code</h5>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      High-density QR containing digitally signed payload for rapid security checkpoint verification without internet requirement.
                    </p>
                    <div className="mt-2 font-mono text-[10px] text-emerald-400 bg-black/50 px-2 py-1 rounded break-all">
                      Payload: {record.qrValue}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Optical Security Hologram</h5>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      High-resolution 2D/3D kinetic light diffractive holographic patch with tamper-evident release and micro-text borders.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Payload JSON */}
            {activeTab === 'payload' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">records[0].json</span>
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="max-h-60 overflow-y-auto p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-300 leading-relaxed">
                  {JSON.stringify(record, null, 2)}
                </pre>
              </div>
            )}

            {/* Action Bottom Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-300" />
                  <span>Print Spec Sheet</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{copied ? 'Copied' : 'Copy Record'}</span>
                </button>
              </div>

              {onOpenBulkOrder && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBulkOrder(record.categoryLabel);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <span>Order Bulk PVC For This Template</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
