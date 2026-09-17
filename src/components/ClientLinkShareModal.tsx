import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Calculator,
  FileSpreadsheet,
  Package,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface ClientLinkShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (page: 'home' | 'studio' | 'quote' | 'data-collection' | 'samples') => void;
}

export const ClientLinkShareModal: React.FC<ClientLinkShareModalProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const baseUrl = window.location.origin + window.location.pathname;

  const links = [
    {
      id: 'samples',
      title: 'Sample Proofs Portfolio (5 Real Cards)',
      description: 'Studio proof photographs of 5 printed solid PVC cards (CBSE School, IT Company, Hospital, Engineering College, Gym VIP) showing front & back dual-sided manufacturing standards.',
      page: 'samples' as const,
      url: `${baseUrl}?page=samples`,
      icon: Eye,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      id: 'studio',
      title: 'Interactive 3D ID Card Studio',
      description: 'Allows clients to customize school/company cards live with real-time 3D front & back preview, photo upload, and lanyard branding.',
      page: 'studio' as const,
      url: `${baseUrl}?page=studio`,
      icon: Sparkles,
      color: 'text-brand-primary bg-brand-mint border-brand-mint',
    },
    {
      id: 'quote',
      title: 'Bulk Pricing & Proforma Calculator',
      description: 'Interactive estimator for schools & HR teams to calculate bulk volume discounts (up to 35% off), lanyard add-ons, and 18% GST.',
      page: 'quote' as const,
      url: `${baseUrl}?page=quote`,
      icon: Calculator,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'data-collection',
      title: 'Bulk Data Collector & Google Forms',
      description: 'One-click Google Forms generator for collecting student photos/details directly into Google Drive, plus standardized CSV templates.',
      page: 'data-collection' as const,
      url: `${baseUrl}?page=data-collection`,
      icon: FileSpreadsheet,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  ];

  const handleCopy = (key: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleShareAllWhatsApp = () => {
    const text =
      `Hello! Here are the direct IDCraft India client links for your institution:\n\n` +
      `🎨 *Interactive 3D Card Studio:* ${baseUrl}?page=studio\n` +
      `💰 *Bulk Pricing Calculator:* ${baseUrl}?page=quote\n` +
      `📋 *Student Data Collection Portal:* ${baseUrl}?page=data-collection\n\n` +
      `For any questions or custom layout proofs, feel free to reply directly on WhatsApp!`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/30 text-blue-400 flex items-center justify-center border border-brand-mint0/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-white flex items-center gap-2">
                Client links and standalone portals
                <span className="text-[10px] uppercase font-medium tracking-wider px-2 py-0.5 rounded-full bg-brand-mint0/20 text-blue-300 border border-brand-mint0/30">
                  Direct access
                </span>
              </h3>
              <p className="text-[13px] text-slate-400 font-normal mt-0.5">
                Share these dedicated links directly with clients without navigating the main website.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body list of links */}
        <div className="p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          <div className="p-3.5 rounded-2xl bg-brand-mint border border-brand-mint text-blue-950 text-[13px] font-normal flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#0F172A]">Standalone client links</p>
              <p className="text-blue-900 text-[12px] mt-0.5">
                The Interactive Studio, Bulk Pricing Calculator, and Data Collector are separated as standalone modules so the homepage stays fast and clean. Copy the exact URL below or send directly via WhatsApp.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {links.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedKey === item.id;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0F172A]">{item.title}</h4>
                        <p className="text-[12px] text-[#64748B] font-normal">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* URL Box & Actions */}
                  <div className="mt-3 flex flex-col sm:flex-row items-center gap-2">
                    <div className="w-full font-mono text-[12px] bg-slate-100 px-3 py-2 rounded-xl text-[#334155] border border-slate-200/80 truncate">
                      {item.url}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => handleCopy(item.id, item.url)}
                        className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied' : 'Copy link'}</span>
                      </button>

                      <button
                        onClick={() => {
                          const text = `Here is the link for ${item.title}: ${item.url}`;
                          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                        }}
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onNavigatePage(item.page);
                        }}
                        className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                        title="Open page now"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleShareAllWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[13px] shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Send all links to client via WhatsApp</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-[13px] font-medium text-slate-600 hover:bg-slate-100 transition-colors text-center"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
