import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  GraduationCap, Users, Bus, Building2, 
  ShieldCheck, ArrowRight, BookOpen, Shield,
  FileSpreadsheet, UploadCloud, CheckCircle2,
  Settings, UserPlus, RefreshCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SchoolSolutionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <Helmet>
        <title>School ID Card Printing in Delhi NCR, Noida & Lucknow | IDCraft</title>
        <meta name="description" content="Premium PVC School ID Card printing services for 200+ educational institutions across Delhi, Gurugram, Noida, Lucknow, and Rajasthan. Bulk manufacturing with smart RFID." />
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-6">
            <GraduationCap className="w-4 h-4" />
            <span>K-12 & Higher Education</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
            Identity Solutions Built for Schools with <span className="text-blue-600">Multiple Branches.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#334155] leading-relaxed mb-10 max-w-2xl mx-auto">
            Manage your entire institution's identity lifecycle. From new admissions to lost cards, our enterprise dashboard handles student IDs, teacher badges, and visitor passes effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/portal/register')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              Register Institution
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-xl font-medium transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Complete Identity Suite */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">A Complete Identity Suite</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to secure your campus and identify your people.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: GraduationCap, label: 'Student IDs' },
              { icon: BookOpen, label: 'Teacher IDs' },
              { icon: Users, label: 'Staff IDs' },
              { icon: Building2, label: 'Hostel IDs' },
              { icon: Bus, label: 'Bus Route IDs' },
              { icon: Shield, label: 'Visitor Passes' },
              { icon: ShieldCheck, label: 'Exam Badges' },
              { icon: Users, label: 'Sports Badges' },
              { icon: BookOpen, label: 'Library Cards' },
              { icon: Building2, label: 'House-wise Cards' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:border-blue-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Multi-Branch Management Dashboard</h2>
            <p className="text-lg text-slate-600 mb-8">
              A centralized command center for your entire group of schools. Provide separate logins for each branch principal while maintaining top-level visibility for the chairman's office.
            </p>
            <ul className="space-y-4">
              {[
                'Branch-wise student counts & active orders',
                'Separate logos and branding per branch',
                'Live dispatch and tracking status',
                'Centralized billing and GST invoices'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full text-blue-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600" 
              alt="Dashboard Preview" 
              className="rounded-xl shadow-2xl border border-slate-200 relative z-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center flex-row-reverse">
          <div className="order-2 lg:order-1 bg-slate-100 rounded-3xl p-8 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600" 
              alt="Bulk Upload Data" 
              className="rounded-xl shadow-2xl border border-slate-200 relative z-10"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Intelligent Bulk Upload Portal</h2>
            <p className="text-lg text-slate-600 mb-8">
              Ditch the manual email threads. Upload your student data via Excel and bulk zip photos directly to our secure cloud. Our system automatically maps student names to their photos using Admission Numbers.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <FileSpreadsheet className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-semibold text-slate-900">Excel / CSV Support</h4>
                <p className="text-sm text-slate-600">Map columns like Class, Section, Blood Group instantly.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <UploadCloud className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-slate-900">Bulk ZIP Photos</h4>
                <p className="text-sm text-slate-600">Upload thousands of photos at once. Auto-mapped.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Identity Program */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Annual Identity Management Program</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We partner with you for the entire academic year. Whenever a student loses a card or a new teacher joins, simply click "Reorder" from your dashboard.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
              <UserPlus className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">New Admissions</h3>
              <p className="text-slate-400">Easily add new students mid-session without needing to redesign the entire batch.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
              <RefreshCcw className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Lost Card Replacements</h3>
              <p className="text-slate-400">Search by Admission Number and click "Reprint". The new card dispatches in 24 hours.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
              <Settings className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Academic Session Updates</h3>
              <p className="text-slate-400">Promote students to the next class and auto-generate the new batch of ID cards instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approval Workflow */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Principal Approval Workflow</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Zero printing errors. You have full control before production begins.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-blue-100 -translate-y-1/2 z-0"></div>
          {[
            { step: '1', title: 'Upload Data', desc: 'Securely upload student data & photos' },
            { step: '2', title: 'Digital Preview', desc: 'System generates digital proofs instantly' },
            { step: '3', title: 'Principal Approval', desc: 'Review & approve or request revisions' },
            { step: '4', title: 'Production', desc: 'We print, laminate, and QC check' },
            { step: '5', title: 'Dispatch', desc: 'Securely delivered to your campus' }
          ].map((item, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center max-w-[200px] mb-8 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                {item.step}
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
