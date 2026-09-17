import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Printer,
  Copy,
  Check,
} from 'lucide-react';

interface UniversalQRCardProps {
  onScrollToReview?: () => void;
}

export const UniversalQRCard: React.FC<UniversalQRCardProps> = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showMobileQR, setShowMobileQR] = useState<boolean>(false);

  // Dynamic current origin with scan query and hash
  const smartScanUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?scan=review#review-section`
    : 'https://maps.app.goo.gl/Swyyj8i3fuG7sDbx7';

  useEffect(() => {
    QRCode.toDataURL(smartScanUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#1c1917',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed generating QR code:', err));
  }, [smartScanUrl]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'idcraft-review-qr-code.png';
    a.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(smartScanUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrintStandee = () => {
    window.print();
  };

  return (
    <section
      id="universal-qr-section"
      className="bg-white rounded-2xl border-2 border-stone-300 shadow-sm p-4 sm:p-6 space-y-4"
    >
      {/* Title & Mobile Quick Toggle */}
      <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-2xs">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900 leading-tight">
              Customer QR Standee & Print Asset
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-500">
              For reception counter, bills, parcel stickers & invoices
            </p>
          </div>
        </div>

        {/* Mobile quick expand/hide button */}
        <button
          type="button"
          onClick={() => setShowMobileQR(!showMobileQR)}
          className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 flex items-center gap-1 shrink-0 cursor-pointer min-h-[36px]"
        >
          <span>{showMobileQR ? 'Hide QR' : 'Show QR'}</span>
        </button>
      </div>

      {/* Main QR Display Grid (Always on desktop, toggleable on phone) */}
      <div className={`${showMobileQR ? 'block' : 'hidden'} sm:grid grid-cols-1 md:grid-cols-12 gap-5 items-center`}>
        {/* Visual QR Card (Printable) */}
        <div className="md:col-span-5 flex flex-col items-center text-center p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
          <div className="inline-block px-2.5 py-0.5 bg-stone-900 text-amber-400 text-[10px] font-bold rounded tracking-wider uppercase">
            IDCraft Technologies
          </div>

          <div className="p-2.5 bg-white rounded-xl border-2 border-stone-800 shadow-sm inline-block">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Universal Review QR Code"
                className="w-40 h-40 sm:w-48 sm:h-48 object-contain rounded"
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center text-xs text-stone-400">
                Generating QR...
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-bold">
              ★ ★ ★ ★ ★
            </div>
            <p className="text-[11px] font-medium text-stone-700">
              Scan with camera → 1-tap copy review → Post to Google Maps
            </p>
          </div>
        </div>

        {/* Actions & Print Options */}
        <div className="md:col-span-7 space-y-3 pt-3 sm:pt-0">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-stone-900">
              Printable Standee & Sticker Asset
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Print this QR code to place on your counter or attach to product delivery boxes. When clients scan with their phone camera, it loads the 5-star review helper directly.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-black transition-colors shadow-2xs cursor-pointer min-h-[44px]"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download PNG</span>
            </button>

            <button
              type="button"
              onClick={handlePrintStandee}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer min-h-[44px]"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Print Standee</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer min-h-[44px]"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Copy Scan Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
