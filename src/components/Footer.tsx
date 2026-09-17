import React from 'react';
import {
  CreditCard,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Award,
  Truck,
  ArrowUp,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { IDCraftLogo } from './IDCraftLogo';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenSampleKit: () => void;
  onOpenWhatsApp: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigatePage: (page: 'home' | 'studio' | 'quote' | 'data-collection' | 'samples' | 'schools' | 'corporate' | 'login' | 'register' | 'dashboard' | 'industries' | 'case-studies' | 'trust-center') => void;
  onOpenShareHub: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSampleKit,
  onOpenWhatsApp,
  onNavigateSection,
  onNavigatePage,
  onOpenShareHub,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-slate-400 border-t border-slate-900 select-none">
      {/* Top Value Banner - Trust Badges */}
      <div className="border-b border-white/5 py-10 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center md:text-left">
            <div className="flex flex-col items-center gap-2 justify-center">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-[13px] font-semibold text-white">Privacy Protected</h4>
                <p className="text-[11px] font-normal text-slate-400">100% Secure Data</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 justify-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-[13px] font-semibold text-white">Pan India Delivery</h4>
                <p className="text-[11px] font-normal text-slate-400">Express Logistics</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 justify-center">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-[13px] font-semibold text-white">Business Support</h4>
                <p className="text-[11px] font-normal text-slate-400">Dedicated Managers</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 justify-center">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-[13px] font-semibold text-white">GST Invoice Available</h4>
                <p className="text-[11px] font-normal text-slate-400">HSN 3920</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 justify-center">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-[13px] font-semibold text-white">Secure Payments</h4>
                <p className="text-[11px] font-normal text-slate-400">Encrypted checkout</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 justify-center">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-[13px] font-semibold text-white">HTTPS Secure</h4>
                <p className="text-[11px] font-normal text-slate-400">SSL Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Intro (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => onNavigatePage('home')}>
              <IDCraftLogo variant="horizontal" theme="white" size="md" showTagline={true} />
            </div>

            <p className="text-[13px] text-slate-400 leading-[1.6] max-w-sm font-normal">
              Manufacturer of high-definition waterproof PVC identity cards, institutional credentials, and thermal sublimation satin lanyards for educational institutions
              and corporate enterprises.
            </p>

            <div className="text-[13px] space-y-1 text-slate-400 font-normal">
              <p>
                <strong className="font-semibold text-white">GSTIN:</strong> 09AAACI1234F1Z8
              </p>
              <p>
                <strong className="font-semibold text-white">Central Works:</strong> {COMPANY_INFO.factoryAddress}
              </p>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-white">ID card products</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors text-slate-400 font-normal text-left"
                >
                  Student Identity Cards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors text-slate-400 font-normal text-left"
                >
                  Corporate Staff Badges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors text-slate-400 font-normal text-left"
                >
                  Faculty & Teacher ID Cards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors text-slate-400 font-normal text-left"
                >
                  Hospital Doctor Badges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors text-slate-400 font-normal text-left"
                >
                  Sublimation Satin Lanyards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products-section')}
                  className="hover:text-white transition-colors text-slate-400 font-normal text-left"
                >
                  Rigid Acrylic Card Cases
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sectors & Tools */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-white">
              Client links & tools
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <button
                  onClick={() => onNavigatePage('samples')}
                  className="hover:text-white transition-colors text-amber-400 font-medium flex items-center gap-1.5"
                >
                  <span>Sample Proofs (Real PVC Cards)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('studio')}
                  className="hover:text-white transition-colors text-blue-400 font-medium flex items-center gap-1.5"
                >
                  <span>3D Card Studio (Direct Link)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('quote')}
                  className="hover:text-white transition-colors text-emerald-400 font-medium flex items-center gap-1.5"
                >
                  <span>Bulk Price Calculator (Direct Link)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('data-collection')}
                  className="hover:text-white transition-colors text-purple-400 font-medium flex items-center gap-1.5"
                >
                  <span>Bulk Data & Forms (Direct Link)</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigateSection('industries-section')}
                  className="hover:text-white transition-colors text-slate-400 font-normal"
                >
                  Schools & Universities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('trust-center')}
                  className="hover:text-white transition-colors text-emerald-400 font-medium"
                >
                  Trust & Security Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about-section')}
                  className="hover:text-white transition-colors text-slate-300 font-medium"
                >
                  About Us & CEO Message
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('samples')}
                  className="hover:text-white transition-colors text-slate-400 font-normal"
                >
                  Sample Proofs Archive
                </button>
              </li>
              <li>
                <button onClick={onOpenSampleKit} className="hover:text-white transition-colors text-amber-400 font-medium">
                  Request Free Sample Kit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Working Hours */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-white">Direct connect</h4>
            <div className="space-y-2 text-[13px]">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-normal"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-normal"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <button
                onClick={onOpenWhatsApp}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp: {COMPANY_INFO.phone}</span>
              </button>
              <p className="text-[12px] text-slate-500 pt-2 font-normal">
                Mon – Sat: 9:00 AM – 7:30 PM IST (Admissions rush desk available Sundays)
              </p>
            </div>
          </div>
        </div>

        {/* Pan India Coverage Cities */}
        <div className="mt-12 pt-6 border-t border-white/10 text-[12px] text-slate-500 leading-relaxed font-normal">
          <strong className="font-semibold text-slate-400">Pan-India express logistics coverage:</strong> Lucknow, New Delhi,
          Noida, Gurugram, Kanpur, Varanasi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Surat,
          Jaipur, Chandigarh, Dehradun, Indore, Bhopal, Kochi, Coimbatore, Patna,
          Bhubaneswar, Guwahati, and all Tier 1, 2, and 3 districts across India.
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-[12px] text-slate-500 font-normal justify-center md:justify-start">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="text-slate-700">|</span>
          <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <span className="text-slate-700">|</span>
          <Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
          <span className="text-slate-700">|</span>
          <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          <span className="text-slate-700">|</span>
          <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          <span className="text-slate-700">|</span>
          <Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-500 font-normal">
          <p>© 2026 IDCraft India. All Rights Reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
