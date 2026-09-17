import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, Printer, ExternalLink, QrCode as QrIcon, Check, Copy } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
  googleMapsUrl: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  appUrl,
  googleMapsUrl,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // The QR points to this applet URL so when clients scan it on their phones, they land on this quick review suggestion screen!
  const targetScanUrl = appUrl || window.location.href;

  useEffect(() => {
    if (isOpen && targetScanUrl) {
      QRCode.toDataURL(targetScanUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#1c1917',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Error creating QR code:', err));
    }
  }, [isOpen, targetScanUrl]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'idcraft-review-qr-code.png';
    a.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetScanUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl overflow-hidden print:p-0 print:border-none print:shadow-none">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50 print:hidden">
          <div className="flex items-center gap-2">
            <QrIcon className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-stone-900 text-sm">
              Scan & Review QR Code (For Counter / Parcel)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Standee Card */}
        <div id="printable-standee" className="p-6 text-center space-y-4 stitch-seam relative bg-[#fcfbf9] overflow-hidden texture-lanyard-ribbon">
          {/* Lanyard punch slot at top of standee */}
          <div className="flex items-center justify-center -mt-2 pb-1">
            <div className="w-14 h-2 rounded-full bg-stone-200 border border-stone-300 shadow-inner flex items-center justify-center">
              <div className="w-8 h-0.5 rounded-full bg-stone-300"></div>
            </div>
          </div>

          <div className="space-y-1 relative z-20">
            <div className="inline-block px-3 py-1 bg-stone-950 text-amber-400 text-xs font-bold rounded-md tracking-wider uppercase stitch-dark-seam border border-dashed border-amber-400/80 font-display">
              IDCraft Technologies
            </div>
            <h2 className="text-lg font-bold text-stone-900 pt-1 font-display">
              Love Your Order? Scan &amp; Review Us!
            </h2>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Scan with any phone camera to get instant pre-written review suggestions &amp; post in 5 seconds.
            </p>
          </div>

          {/* QR Code Container with Stitched Needlework Frame */}
          <div className="inline-block p-3 bg-white border-2 border-dashed border-stone-900 rounded-2xl shadow-xs relative z-20">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Scan to review IDCraft Technologies"
                className="w-52 h-52 mx-auto rounded-lg"
              />
            ) : (
              <div className="w-52 h-52 flex items-center justify-center text-xs text-stone-400">
                Generating QR...
              </div>
            )}
          </div>

          <div className="text-xs text-stone-600 font-medium space-y-1 relative z-20">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-sm">
              ★ ★ ★ ★ ★
            </div>
            <p className="text-[11px] text-stone-400">
              Opens instant suggestion helper → 1-tap copy → Paste on Google Maps
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-stone-50 border-t border-dashed border-stone-200 flex items-center justify-between gap-2 print:hidden">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold border border-dashed border-stone-300 bg-white text-stone-700 hover:bg-stone-100 flex items-center justify-center gap-1.5 shadow-2xs hover:border-amber-400"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold border border-dashed border-stone-300 bg-white text-stone-700 hover:bg-stone-100 flex items-center justify-center gap-1.5 shadow-2xs hover:border-amber-400"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Save QR</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-stone-950 text-white hover:bg-black border border-dashed border-amber-400 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Print Standee</span>
          </button>
        </div>
      </div>
    </div>
  );
};
