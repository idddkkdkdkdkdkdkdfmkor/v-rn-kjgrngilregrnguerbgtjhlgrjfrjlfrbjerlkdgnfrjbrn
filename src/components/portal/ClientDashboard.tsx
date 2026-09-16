import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  UploadCloud, CheckSquare, Receipt, Building2, Bell, 
  Search, ShieldCheck, Printer, ArrowRight, Activity,
  CreditCard, Sparkles, ChevronRight, FileDigit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IDCraftLogo } from '../IDCraftLogo';

type Tab = 'overview' | 'upload' | 'approvals' | 'billing';

export const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'upload', label: 'Data Ingestion' },
    { id: 'approvals', label: 'Proofs' },
    { id: 'billing', label: 'Billing' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans selection:bg-[#635BFF]/20 selection:text-[#635BFF] relative overflow-hidden pb-32">
      <Helmet>
        <title>Client Portal | IDCraft India</title>
      </Helmet>

      {/* Stripe-style Ambient Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-center">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#E3F2FD] to-[#F3E5F5] blur-[100px] opacity-70"></div>
        <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-bl from-[#E8EAF6] to-[#E0F7FA] blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#FFF8E1] to-[#FCE4EC] blur-[150px] opacity-50"></div>
        {/* Fine Stripe-style diagonal grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDQwbDQwLTQwSDAwbDQwIDQweiIgZmlsbD0iI2Y5ZmFmYiIgZmlsbC1vcGFjaXR5PSIwLjM1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-40 mix-blend-overlay"></div>
      </div>

      {/* Ultra-Clean Floating Navbar */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
        <nav className="bg-white/80 backdrop-blur-2xl rounded-full px-2 py-2 flex items-center justify-between w-full max-w-[1200px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 md:gap-6 px-4">
            <IDCraftLogo variant="icon" size="sm" theme="color" onClick={() => navigate('/')} className="cursor-pointer hover:scale-105 transition-transform origin-left" />
            <div className="h-6 w-[1px] bg-slate-200/60 hidden md:block"></div>
            
            <div className="hidden md:flex items-center gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all duration-300 ease-out ${
                    activeTab === tab.id 
                      ? 'bg-slate-900 text-white shadow-[0_4px_12px_rgba(15,23,42,0.15)]' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 pr-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)] shadow-[0_2px_8px_rgba(16,185,129,0.08)]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
              <span className="text-emerald-700 text-[11px] font-bold tracking-[0.05em]">Live</span>
            </div>
            
            <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_10px_rgba(0,0,0,0.05)] rounded-full transition-all relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#635BFF] rounded-full border-2 border-white"></span>
            </button>
            
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#635BFF] to-[#8E87FF] shadow-[0_4px_12px_rgba(99,91,255,0.3)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] flex items-center justify-center text-white text-xs font-bold shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300">
              SX
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 pt-28 max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Bento Grid */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
            
            {/* Massive Hero Bento (Span 8) */}
            <div className="md:col-span-8 bg-white/80 backdrop-blur-xl rounded-[24px] p-6 md:p-8 shadow-[0_2px_40px_rgba(0,0,0,0.04)] shadow-[inset_0_0_0_1px_rgba(255,255,255,1),inset_0_0_0_2px_rgba(0,0,0,0.02)] relative overflow-hidden group">
              {/* Playful abstract decoration */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#635BFF]/10 to-[#00D4FF]/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                <Sparkles className="w-6 h-6 text-[#635BFF]/30" />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="px-3 py-1.5 bg-[#635BFF]/10 text-[#635BFF] rounded-full text-[10px] font-bold tracking-[0.05em] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" /> Institutional Account
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold tracking-[0.05em]">
                      ID: B-4095
                    </span>
                  </div>
                  
                  <h1 className="text-[36px] md:text-[42px] font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.1] mb-4">
                    Welcome back,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#635BFF] to-[#00D4FF]">St. Xavier College.</span>
                  </h1>
                  
                  <p className="text-slate-500 text-[15px] max-w-md leading-[1.5] mb-8 font-medium">
                    Upload student data, review digital proofs, and track high-definition PVC card manufacturing in real-time.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setActiveTab('upload')} className="px-6 py-3 bg-[#635BFF] hover:bg-[#5249E5] text-white rounded-[14px] font-semibold text-[14px] transition-all duration-300 shadow-[0_4px_14px_rgba(99,91,255,0.39)] hover:shadow-[0_6px_20px_rgba(99,91,255,0.23)] hover:-translate-y-0.5 flex items-center gap-2">
                    <UploadCloud className="w-4 h-4" /> Issue New Cards
                  </button>
                  <button onClick={() => setActiveTab('approvals')} className="px-6 py-3 bg-white text-slate-700 hover:text-slate-900 rounded-[14px] font-semibold text-[14px] transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.05)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#635BFF]" /> Pending Approvals
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full ml-1 font-bold">12</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats Column (Span 4) */}
            <div className="md:col-span-4 flex flex-col gap-4 md:gap-5">
              
              {/* Stat 1: Highly polished */}
              <div className="flex-1 bg-white/90 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_2px_40px_rgba(0,0,0,0.04)] shadow-[inset_0_0_0_1px_rgba(255,255,255,1),inset_0_0_0_2px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E3F2FD]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] shadow-[inset_0_0_0_1px_rgba(33,150,243,0.1)] flex items-center justify-center">
                    <Printer className="w-5 h-5 text-[#1976D2]" />
                  </div>
                </div>
                <h3 className="text-[14px] font-semibold text-slate-500 mb-1 relative z-10">Total Cards Printed</h3>
                <div className="text-[40px] font-extrabold text-slate-900 tracking-[-0.02em] leading-none mb-3 relative z-10">
                  2,400
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[12px] font-semibold border border-emerald-100 relative z-10">
                  <ShieldCheck className="w-3.5 h-3.5" /> Standard PVC + Matte
                </div>
              </div>

              {/* Stat 2: Pending Orders */}
              <div className="flex-1 bg-white/90 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_2px_40px_rgba(0,0,0,0.04)] shadow-[inset_0_0_0_1px_rgba(255,255,255,1),inset_0_0_0_2px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <CreditCard className="w-5 h-5 text-slate-600" />
                  </div>
                </div>
                <h3 className="text-[14px] font-semibold text-slate-500 mb-1">Pending Orders</h3>
                <div className="text-[40px] font-extrabold text-slate-900 tracking-[-0.02em] leading-none mb-3">
                  0
                </div>
                <p className="text-[13px] font-medium text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> All batches shipped
                </p>
              </div>
            </div>

            {/* Live Manufacturing Tracker (Span 12) - Beautiful horizontal card */}
            <div className="md:col-span-12 bg-white/90 backdrop-blur-xl rounded-[24px] p-6 md:p-8 shadow-[0_2px_40px_rgba(0,0,0,0.04)] shadow-[inset_0_0_0_1px_rgba(255,255,255,1),inset_0_0_0_2px_rgba(0,0,0,0.02)] delay-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-[22px] font-bold text-slate-900 tracking-[-0.01em]">Active Manufacturing Run</h3>
                  <p className="text-[15px] text-slate-500 mt-1">Batch #B-4095 • Initiated Today, 09:30 AM</p>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#635BFF]/10 text-[#635BFF] rounded-xl text-[13px] font-bold shadow-[inset_0_0_0_1px_rgba(99,91,255,0.2)]">
                  <Activity className="w-4 h-4" /> Est. Delivery: Tomorrow
                </span>
              </div>
              
              {/* Stripe-style playful progress pipeline */}
              <div className="relative">
                {/* The background track */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  {/* The filled track with gradient */}
                  <div className="h-full bg-gradient-to-r from-[#00D4FF] to-[#635BFF] w-[60%] relative rounded-full">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
                  </div>
                </div>
                
                {/* The nodes */}
                <div className="relative flex justify-between z-10">
                  {[
                    { label: 'Data Verified', active: true, done: true },
                    { label: 'Proofs Approved', active: true, done: true },
                    { label: 'Factory Printing', active: true, done: false },
                    { label: 'Dispatched', active: false, done: false }
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 group cursor-default">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 bg-white transition-all duration-500 ease-out ${
                        step.done ? 'border-[#635BFF] shadow-[0_0_0_4px_rgba(99,91,255,0.15)] group-hover:scale-110' : 
                        step.active ? 'border-[#00D4FF] shadow-[0_0_0_4px_rgba(0,212,255,0.15)] group-hover:scale-110' : 
                        'border-slate-200'
                      }`}>
                        {step.done ? (
                          <CheckSquare className="w-4 h-4 text-[#635BFF]" />
                        ) : (
                          <div className={`w-3 h-3 rounded-full ${step.active ? 'bg-[#00D4FF] animate-pulse' : 'bg-slate-200'}`}></div>
                        )}
                      </div>
                      <span className={`text-[12px] font-bold ${
                        step.active ? 'text-slate-900' : 'text-slate-400'
                      }`}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generic Beautiful Placeholder for other tabs */}
        {activeTab !== 'overview' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-16 shadow-[0_2px_40px_rgba(0,0,0,0.04)] shadow-[inset_0_0_0_1px_rgba(255,255,255,1),inset_0_0_0_2px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center min-h-[50vh] animate-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 rounded-[2rem] bg-slate-50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] flex items-center justify-center mb-8 rotate-3">
              {activeTab === 'upload' && <UploadCloud className="w-10 h-10 text-[#635BFF]" />}
              {activeTab === 'approvals' && <CheckSquare className="w-10 h-10 text-[#00D4FF]" />}
              {activeTab === 'billing' && <Receipt className="w-10 h-10 text-emerald-500" />}
            </div>
            <h2 className="text-[32px] font-bold text-slate-900 tracking-[-0.02em] mb-4">
              {activeTab === 'upload' && 'Upload Institutional Roster'}
              {activeTab === 'approvals' && 'Review Pre-Press Proofs'}
              {activeTab === 'billing' && 'Billing & Invoices'}
            </h2>
            <p className="text-slate-500 text-[17px] max-w-lg mx-auto leading-[1.6]">
              This highly secure module utilizes edge-encryption to protect your institution's sensitive data before it reaches our servers.
            </p>
            <button onClick={() => setActiveTab('overview')} className="mt-8 px-6 py-3 bg-white text-slate-700 shadow-[0_2px_10px_rgba(0,0,0,0.06)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 rounded-2xl font-semibold text-[15px] transition-all">
              Return to Overview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
