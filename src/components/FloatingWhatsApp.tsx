import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuickQuery, setSelectedQuickQuery] = useState('');

  const handleSendQuery = (customMsg?: string) => {
    const query = customMsg || selectedQuickQuery || 'Hello IDCraft India! I need a quote for ID cards.';
    const text = encodeURIComponent(query);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 select-none">
      {/* Popover Quick Chat Bubble */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-88 max-w-sm rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                  ID
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-600 animate-pulse" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-white">Factory WhatsApp desk</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" /> Active now · Average reply 2 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body with Quick Prompt Pills */}
          <div className="p-4 space-y-3 bg-slate-50">
            <p className="text-[#334155] text-[13px] font-normal leading-relaxed">
              How can our engineering team assist your institution today?
            </p>

            <div className="space-y-1.5">
              {[
                'Need quote for 500+ student ID cards',
                'Need pricing for corporate staff badges and lanyards',
                'Request complimentary physical sample kit',
                'Urgent 48-hour rush delivery for hospital staff',
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendQuery(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-[12px] font-medium text-[#0F172A] transition-colors flex items-center justify-between"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <Send className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1.5" />
                </button>
              ))}
            </div>

            <button
              onClick={() => handleSendQuery()}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[13px] shadow-xs transition-colors flex items-center justify-center gap-1.5 mt-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[13px] shadow-lg transition-transform hover:scale-105 active:scale-95"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
        </span>

        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline-block">WhatsApp quote</span>
      </button>
    </div>
  );
};
