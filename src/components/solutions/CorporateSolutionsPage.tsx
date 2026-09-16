import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Building, Briefcase, ScanLine, ShieldAlert,
  Fingerprint, Clock, Building2, UserPlus,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CorporateSolutionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <Helmet>
        <title>Corporate Identity Solutions | IDCraft India</title>
        <meta name="description" content="Identity Solutions Built for Companies. Employee onboarding IDs, visitor badges, RFID access, and automated HR dashboards." />
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold mb-6">
            <Building className="w-4 h-4" />
            <span>Enterprise & Corporate</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
            Secure Identity Management for <span className="text-blue-600">Modern Workplaces.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#334155] leading-relaxed mb-10 max-w-2xl mx-auto">
            Streamline employee onboarding, manage visitor access, and integrate RFID/NFC smart cards with your existing attendance systems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/portal/register')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              Register Organization
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-medium transition-colors"
            >
              Speak to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Features */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Enterprise Grade Security & Access</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">From daily employees to temporary contractors, manage every identity seamlessly.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Briefcase, title: 'Employee Onboarding IDs', 
                desc: 'Automate new hire ID printing. Integrate with your HR portal via bulk Excel upload.' 
              },
              { 
                icon: ShieldAlert, title: 'Visitor & Contractor Passes', 
                desc: 'Easily recognizable color-coded temporary IDs for factory contractors and daily visitors.' 
              },
              { 
                icon: ScanLine, title: 'RFID & NFC Access', 
                desc: 'Smart cards encoded for your existing HID or MiFare attendance and access control systems.' 
              },
              { 
                icon: Fingerprint, title: 'Biometric Integration', 
                desc: 'High-quality PVC that supports biometric mapping, barcodes, and secure QR codes.' 
              },
              { 
                icon: Building2, title: 'Department-wise Colors', 
                desc: 'Distinctive lanyard colors and card headers to visually separate departments on large campuses.' 
              },
              { 
                icon: Clock, title: 'Rapid Replacements', 
                desc: 'Order replacement IDs for lost cards with a single click. Delivered securely within 24 hours.' 
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automated HR Dashboard */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-16 overflow-hidden relative border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Automated HR Dashboard</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Empower your HR team with a centralized identity portal. Upload new batches of employees, approve digital proofs, and download GST tax invoices effortlessly.
              </p>
              <ul className="space-y-5">
                {[
                  'Bulk employee data upload via secure CSV',
                  'Branch-wise delivery for multinational offices',
                  'Digital proof approval workflow',
                  'Downloadable GST invoices and Purchase Orders'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-500/20 p-1.5 rounded-full text-blue-400 border border-blue-500/30">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <span className="text-slate-200 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/portal/register')}
                className="mt-10 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors"
              >
                Create Corporate Account
              </button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="HR Dashboard UI" 
                className="rounded-2xl shadow-2xl border border-slate-700 opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
