import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Lock, Server, FileDigit, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TrustCenterPage: React.FC = () => {
  const navigate = useNavigate();

  const securityPillars = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      desc: 'All institutional data, including high-resolution photographs and PII, is encrypted at rest using AES-256 and in transit via TLS 1.3.'
    },
    {
      icon: Server,
      title: 'Data Sovereignty',
      desc: '100% of our infrastructure is hosted on AWS Mumbai (ap-south-1). Your student and employee data never leaves Indian jurisdiction.'
    },
    {
      icon: FileDigit,
      title: 'Auto-Destruction Protocol',
      desc: 'Raw student data and uncompressed photographs are permanently wiped from our active servers 30 days after the physical cards are dispatched.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen font-sans">
      <Helmet>
        <title>Trust & Security Center | IDCraft India</title>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-[#0F172A] pt-20 pb-32 px-4 sm:px-6 relative overflow-hidden -mt-24 mb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full flex justify-center opacity-10 pointer-events-none">
          <ShieldCheck className="w-[800px] h-[800px] text-white -translate-y-1/4" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint0/10 border border-brand-mint0/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Lock className="w-3.5 h-3.5" /> Enterprise Security
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Your Institution's Data is <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Fort Knox Secure.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We process sensitive data for thousands of students and employees daily. We treat your PII with military-grade encryption and strict localized compliance.
          </p>
        </div>
      </div>

      {/* Security Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 mb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {securityPillars.map((pillar, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-brand-mint flex items-center justify-center text-brand-primary mb-6">
                <pillar.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
              <p className="text-slate-500 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance & Standards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Compliance & Certifications</h2>
            <p className="text-slate-500 mb-8 text-lg">
              We align with global security frameworks and the Indian Digital Personal Data Protection (DPDP) Act to ensure total compliance for educational and corporate entities.
            </p>
            <div className="space-y-4">
              {[
                'ISO 27001:2022 Information Security Management',
                'DPDP Act (India) Compliant Data Processing',
                'SOC 2 Type II Audited Infrastructure (AWS)',
                'Regular Third-Party Penetration Testing'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
              <Key className="w-10 h-10 text-slate-400 mb-3" />
              <div className="font-bold text-slate-900">AES-256</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">Encryption</div>
            </div>
            <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
              <Server className="w-10 h-10 text-slate-400 mb-3" />
              <div className="font-bold text-slate-900">Mumbai</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">Data Residency</div>
            </div>
          </div>
        </div>
      </div>

      {/* The 30-Day Rule */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-10 flex flex-col sm:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center shrink-0 text-amber-600">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-amber-900 mb-2">The 30-Day Purge Policy</h3>
            <p className="text-amber-800 leading-relaxed">
              Unlike local printers who keep your students' photos on unencrypted USB drives forever, our system automatically purges all raw data 30 days after dispatch. We only retain the structural mapping necessary for future re-prints (e.g., lost cards), which is heavily pseudonymized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
