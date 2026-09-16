import React, { useState, useEffect, useRef } from 'react';
import {
  CreditCard,
  Phone,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  PackageCheck,
  ChevronRight,
  ShieldCheck,
  Share2,
  Calculator,
  FileSpreadsheet,
  ChevronDown,
  ArrowLeft,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { IDCraftLogo } from './IDCraftLogo';

interface NavbarProps {
  currentPage: 'home' | 'studio' | 'quote' | 'data-collection' | 'samples' | 'schools' | 'corporate' | 'login' | 'register' | 'dashboard' | 'industries' | 'case-studies' | 'trust-center';
  onNavigatePage: (page: 'home' | 'studio' | 'quote' | 'data-collection' | 'samples' | 'schools' | 'corporate' | 'login' | 'register' | 'dashboard' | 'industries' | 'case-studies' | 'trust-center') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenSampleKit: () => void;
  onOpenWhatsApp: () => void;
  onOpenShareHub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onScrollToSection,
  onOpenSampleKit,
  onOpenWhatsApp,
  onOpenShareHub,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const homeSections = [
    { id: 'products-section', label: 'Products' },
    { id: 'comparison-section', label: 'Why Solid PVC' },
    { id: 'industries-section', label: 'Institutions' },
    { id: 'about-section', label: 'About & CEO' },
    { id: 'faq-section', label: 'FAQ' },
    { id: 'contact-section', label: 'Inquiry' },
  ];

  const handleSectionClick = (sectionId: string) => {
    if (currentPage !== 'home') {
      onNavigatePage('home');
      setTimeout(() => {
        onScrollToSection(sectionId);
      }, 100);
    } else {
      onScrollToSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E2E8F0] py-2.5'
          : 'bg-white/40 backdrop-blur-md border-b border-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => onNavigatePage('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <IDCraftLogo variant="horizontal" theme="color" size="md" />
            <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" />
              ISO 7810
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 xl:gap-2">
            {currentPage === 'home' ? (
              <>
                {homeSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleSectionClick(sec.id)}
                    className={`px-3 py-2 text-[14px] font-medium transition-all relative whitespace-nowrap ${
                      false
                        ? 'text-[#2563EB] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-[#2563EB]'
                        : 'text-[#334155] hover:text-[#2563EB]'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </>
            ) : (
              <button
                onClick={() => onNavigatePage('home')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-medium text-[#2563EB] bg-white border border-[#2563EB] hover:bg-[#F8FAFC] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Return to main website</span>
              </button>
            )}

            <button
              onClick={() => onNavigatePage('industries')}
              className={`px-3 py-2 text-[14px] font-medium transition-all whitespace-nowrap ${
                currentPage === 'industries' ? 'text-[#2563EB]' : 'text-[#334155] hover:text-[#2563EB]'
              }`}
            >
              Industries
            </button>

            <button
              onClick={() => onNavigatePage('case-studies')}
              className={`px-3 py-2 text-[14px] font-medium transition-all whitespace-nowrap ${
                currentPage === 'case-studies' ? 'text-[#2563EB]' : 'text-[#334155] hover:text-[#2563EB]'
              }`}
            >
              Case Studies
            </button>

            <button
              onClick={() => onNavigatePage('schools')}
              className={`px-3 py-2 text-[14px] font-medium transition-all whitespace-nowrap ${
                currentPage === 'schools' ? 'text-[#2563EB]' : 'text-[#334155] hover:text-[#2563EB]'
              }`}
            >
              School Solutions
            </button>

            <button
              onClick={() => onNavigatePage('corporate')}
              className={`px-3 py-2 text-[14px] font-medium transition-all whitespace-nowrap ${
                currentPage === 'corporate' ? 'text-[#2563EB]' : 'text-[#334155] hover:text-[#2563EB]'
              }`}
            >
              Corporate Solutions
            </button>


            {/* Dedicated Samples Section Button */}
            <button
              onClick={() => onNavigatePage('samples')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13.5px] font-semibold transition-all ${
                currentPage === 'samples'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white text-[#2563EB] border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Sample Proofs</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                currentPage === 'samples' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#2563EB]'
              }`}>
                Real PVC
              </span>
            </button>

            {/* Direct Client Portals Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[14px] font-medium text-[#334155] hover:text-[#2563EB] hover:bg-[#F8FAFC] transition-colors whitespace-nowrap"
              >
                <Share2 className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Client links</span>
                <ChevronDown className="w-3 h-3 text-[#64748B]" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-[#E2E8F0] mb-1">
                    <p className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                      Standalone client portals
                    </p>
                    <p className="text-[12px] text-[#334155] font-normal">
                      Share direct links with clients
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setToolsDropdownOpen(false);
                      onNavigatePage('samples');
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#2563EB]">
                          Sample Proofs Portfolio
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-[#2563EB] font-bold">
                          5 Real Cards
                        </span>
                      </div>
                      <p className="text-[12px] text-[#64748B] font-normal">Real physical dual-sided PVC proofs</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setToolsDropdownOpen(false);
                      onNavigatePage('studio');
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#2563EB]">
                          3D ID card studio
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-[#2563EB] font-medium">
                          Link
                        </span>
                      </div>
                      <p className="text-[12px] text-[#64748B] font-normal">Card and lanyard customizer</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setToolsDropdownOpen(false);
                      onNavigatePage('quote');
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#2563EB]">
                          Bulk price calculator
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-[#2563EB] font-medium">
                          Link
                        </span>
                      </div>
                      <p className="text-[12px] text-[#64748B] font-normal">Volume tiers and quotation</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setToolsDropdownOpen(false);
                      onNavigatePage('data-collection');
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#2563EB]">
                          Bulk data collector
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-[#2563EB] font-medium">
                          Link
                        </span>
                      </div>
                      <p className="text-[12px] text-[#64748B] font-normal">Google Forms and CSV templates</p>
                    </div>
                  </button>


                </div>
              )}
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Free Sample Kit Button (Secondary Button) */}
            <button
              id="header-sample-kit-btn"
              onClick={onOpenSampleKit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-[#0F172A] bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#F8FAFC] rounded-xl transition-all whitespace-nowrap"
            >
              <PackageCheck className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Sample kit</span>
            </button>

            {/* Instant WhatsApp CTA (Background: #22C55E, Text: White, Hover: #16A34A) */}
            <button
              id="header-whatsapp-btn"
              onClick={onOpenWhatsApp}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-[#22C55E] hover:bg-[#16A34A] rounded-xl transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp quote</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-1">
            {currentPage !== 'home' && (
              <button
                onClick={() => {
                  onNavigatePage('home');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-blue-700 bg-blue-50"
              >
                <span>← Return to Main Website</span>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </button>
            )}

            {homeSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSectionClick(sec.id)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-left text-slate-700 hover:bg-slate-50"
              >
                <span>{sec.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            {/* Mobile Solutions Links */}
            <div className="pt-2 mt-2 border-t border-slate-100">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Enterprise Solutions
              </p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigatePage('schools');
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span>School Solutions</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigatePage('corporate');
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span>Corporate Solutions</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>


            {/* Mobile Direct Links section */}
            <div className="pt-3 mt-2 border-t border-slate-100">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Standalone Client Links
              </p>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigatePage('samples');
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#2563EB] bg-blue-50/70 mb-1.5 border border-blue-100"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Printed PVC Samples (5 Real Cards)</span>
                </div>
                <span className="text-[9px] bg-[#2563EB] text-white px-1.5 py-0.5 rounded font-bold">PORTFOLIO</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigatePage('studio');
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>3D Card Studio</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigatePage('quote');
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Bulk Price Calculator</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigatePage('data-collection');
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Bulk Data Collector</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
              </button>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-2 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShareHub();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#2563EB] bg-white border border-[#2563EB] hover:bg-[#F8FAFC] rounded-xl transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#2563EB]" />
                <span>Share Client Links with Customers</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSampleKit();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#0F172A] bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] rounded-xl transition-colors"
              >
                <PackageCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Request Free Physical Sample Kit</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#22C55E] hover:bg-[#16A34A] rounded-xl transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
