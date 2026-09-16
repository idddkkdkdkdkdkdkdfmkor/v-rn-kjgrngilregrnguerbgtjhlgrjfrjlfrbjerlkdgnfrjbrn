import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Quote, Building2, TrendingUp, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CaseStudiesPage: React.FC = () => {
  const navigate = useNavigate();

  const caseStudies = [
    {
      id: 'dps',
      client: 'Delhi Public School Society',
      category: 'Education',
      title: 'Deploying 15,000+ Smart ID Cards Across 12 Branches in 14 Days',
      metric: '99.8%',
      metricLabel: 'Accuracy Rate',
      challenge: 'Managing fragmented identity data across multiple independent branches, resulting in delayed ID card issuance and manual data entry errors.',
      solution: 'Implemented the IDCraft Bulk Data Ingestion Engine, allowing individual principals to upload and approve data via a unified cloud dashboard.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
      logo: 'DPS'
    },
    {
      id: 'fortis',
      client: 'Apex Healthcare Network',
      category: 'Healthcare',
      title: 'Securing ICU Access with NFC-Enabled Medical Badges',
      metric: '0',
      metricLabel: 'Security Breaches',
      challenge: 'Unauthorized access to restricted medical zones and fading visual IDs due to constant sanitization protocols.',
      solution: 'Transitioned to solid PVC core cards with embedded NXP MIFARE chips and anti-bacterial overlays, integrating seamlessly with existing HID readers.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      logo: 'APEX'
    },
    {
      id: 'techmahindra',
      client: 'Global Tech Park',
      category: 'Corporate',
      title: 'Unifying Cafeteria Payments and Building Access for 5,000 Employees',
      metric: '3x',
      metricLabel: 'Faster Onboarding',
      challenge: 'Employees carrying separate cards for building access, parking, and cashless cafeteria payments.',
      solution: 'Engineered a dual-frequency smart card (125 kHz + 13.56 MHz) with premium edge-to-edge matte printing that serves as a single unified credential.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      logo: 'GTP'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <Helmet>
        <title>Case Studies & Success Stories | IDCraft India</title>
      </Helmet>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Customer Success</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-6">
            How India's Top Institutions Scale Their Identity
          </h1>
          <p className="text-lg text-[#64748B]">
            Discover how we've helped schools, hospitals, and tech parks solve complex identity, security, and logistics challenges.
          </p>
        </div>
      </div>

      {/* Featured Case Study (The first one) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="bg-[#0F172A] rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl relative">
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                {caseStudies[0].category}
              </span>
              <span className="text-white/60 text-sm font-medium">{caseStudies[0].client}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              {caseStudies[0].title}
            </h2>
            
            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
              "{caseStudies[0].challenge}"
            </p>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <div className="text-4xl font-black text-blue-400 mb-1">{caseStudies[0].metric}</div>
                <div className="text-sm text-slate-400 font-medium">{caseStudies[0].metricLabel}</div>
              </div>
              <div>
                <div className="text-4xl font-black text-emerald-400 mb-1">14 Days</div>
                <div className="text-sm text-slate-400 font-medium">Turnaround Time</div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors self-start"
            >
              Read Full Story <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="lg:w-1/2 relative min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-transparent z-10 hidden lg:block"></div>
            <img 
              src={caseStudies[0].image} 
              alt={caseStudies[0].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Grid Case Studies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10">
          {caseStudies.slice(1).map((study) => (
            <div 
              key={study.id}
              onClick={() => navigate('/contact')}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {study.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="text-sm font-bold text-blue-600 mb-3">{study.client}</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  {study.title}
                </h3>
                <p className="text-slate-600 mb-8 flex-1">
                  {study.solution}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                      {study.logo.substring(0, 2)}
                    </div>
                    <div>
                      <div className="text-xl font-black text-slate-900 leading-none">{study.metric}</div>
                      <div className="text-xs font-medium text-slate-500">{study.metricLabel}</div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Stats Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 border-t border-slate-100 pt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-slate-900 mb-1">500+</div>
            <div className="text-sm font-medium text-slate-500">Institutions Trust Us</div>
          </div>
          <div>
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-slate-900 mb-1">5M+</div>
            <div className="text-sm font-medium text-slate-500">Secure IDs Issued</div>
          </div>
          <div>
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-slate-900 mb-1">48hr</div>
            <div className="text-sm font-medium text-slate-500">Average Production Time</div>
          </div>
          <div>
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-slate-900 mb-1">99%</div>
            <div className="text-sm font-medium text-slate-500">Client Retention Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
