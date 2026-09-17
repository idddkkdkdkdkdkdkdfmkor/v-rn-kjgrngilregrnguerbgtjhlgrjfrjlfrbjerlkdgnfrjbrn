import React from 'react';
import { ExternalLink, Star, ShieldCheck, Sparkles, MapPin, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-lg shadow-xs tracking-tight">
            ID
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-stone-900 tracking-tight">
                IDCraft Technologies
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Human Review Engine v3.0
              </span>
            </div>
            <p className="text-xs text-stone-500">
              PVC ID Cards • School & Corporate Branding • Lanyards • Awards & Medals
            </p>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <a
            href="http://idcraft.dpdns.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span>idcraft.dpdns.org</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          <a
            href="https://maps.app.goo.gl/Swyyj8i3fuG7sDbx7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>Google Business Profile</span>
            <ExternalLink className="w-3 h-3 text-blue-200" />
          </a>
        </div>
      </div>
    </header>
  );
};
