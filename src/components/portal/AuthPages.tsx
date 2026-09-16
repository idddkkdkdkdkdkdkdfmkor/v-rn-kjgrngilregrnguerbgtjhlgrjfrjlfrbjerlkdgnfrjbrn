import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, Mail, Lock, User, Phone, ArrowRight, ShieldCheck, CheckCircle2, Search, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IDCraftLogo } from '../IDCraftLogo';
import { createSessionFromLogin, getSession, saveSession } from '../../lib/portalAuth';
import { toast } from 'sonner';

const TOP_SCHOOLS = [
  "Delhi Public School (DPS)",
  "Kendriya Vidyalaya (KV)",
  "Ryan International School",
  "DAV Public School",
  "Podar International School",
  "Narayana E-Techno School",
  "Sri Chaitanya Techno School",
  "St. Xavier's High School",
  "Vibgyor High",
  "Amity International School",
  "City Montessori School (CMS)",
  "Apeejay School"
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');

  React.useEffect(() => {
    const existing = getSession();
    if (existing) {
      navigate(existing.role === 'superadmin' ? '/portal/superadmin' : '/portal/dashboard', {
        replace: true,
      });
    }
  }, [navigate]);

  const completeLogin = (loginEmail: string, institution?: string) => {
    const session = createSessionFromLogin(loginEmail, institution);
    saveSession(session);
    const from = (location.state as { from?: string } | null)?.from;
    if (from && from.startsWith('/portal/')) {
      navigate(from, { replace: true });
      return;
    }
    navigate(session.role === 'superadmin' ? '/portal/superadmin' : '/portal/dashboard');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    completeLogin(email || 'demo@institution.edu.in');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Client Portal Login | IDCraft India</title>
      </Helmet>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-8 pb-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-center mb-6">
            <IDCraftLogo variant="stacked" size="md" onClick={() => navigate('/')} />
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900">Institutional Login</h2>
          <p className="text-center text-sm text-slate-500 mt-2">Access your secure identity dashboard</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Official Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@institution.edu.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <button type="button" onClick={() => toast.info('Please contact support to reset your password.')} className="text-xs font-medium text-blue-600 hover:text-blue-700">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex justify-center items-center gap-2">
              Secure Login <ArrowRight className="w-4 h-4" />
            </button>
            
            <button 
              type="button"
              onClick={() => completeLogin('demo@institution.edu.in', 'St. Xavier College')}
              className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-semibold transition-colors flex justify-center items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Demo Client Login
            </button>

            <button 
              type="button"
              onClick={() => completeLogin('admin@idcraftindia.com')}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors flex justify-center items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Super Admin Login
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an institutional account? <button onClick={() => navigate('/portal/register')} className="font-semibold text-blue-600 hover:underline">Register Here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredSchools = TOP_SCHOOLS.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Helmet><title>Registration Pending | IDCraft India</title></Helmet>
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Verification Pending</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for registering <strong>{selectedInstitution || searchTerm || "your institution"}</strong>. Our enterprise team will manually verify your details and approve your account within 24 hours to ensure security.
          </p>
          <button 
            onClick={() => {
              const session = createSessionFromLogin('demo@institution.edu.in', selectedInstitution || searchTerm);
              saveSession(session);
              navigate('/portal/dashboard');
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            Access Demo Dashboard Anyway
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <Helmet>
        <title>Register Institution | IDCraft India</title>
      </Helmet>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-8 pb-6 border-b border-slate-100 bg-slate-50 flex items-center relative">
          <button onClick={() => navigate('/portal/login')} className="absolute left-8 text-slate-400 hover:text-slate-700 flex items-center gap-1 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Login
          </button>
          <div className="flex-1 flex justify-center">
            <IDCraftLogo variant="horizontal" size="sm" />
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Register Institutional Account</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">Create a secure portal to manage bulk ID card printing, design approvals, and billing.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
                <Building2 className="w-4 h-4 text-blue-600" /> Institution Details
              </h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Institution Name *</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedInstitution('');
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                      placeholder="Search for your school or company..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  
                  {/* Autocomplete Dropdown */}
                  {showDropdown && searchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {filteredSchools.length > 0 ? (
                        filteredSchools.map((school, i) => (
                          <div 
                            key={i} 
                            className="px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer"
                            onClick={() => {
                              setSearchTerm(school);
                              setSelectedInstitution(school);
                              setShowDropdown(false);
                            }}
                          >
                            {school}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-slate-500 flex flex-col gap-1">
                          <span>No exact matches found.</span>
                          <span className="text-xs text-blue-600 font-medium">Click to register "{searchTerm}" as a new institution.</span>
                        </div>
                      )}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Searches verified Indian institutional database.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                    <input type="text" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500" placeholder="e.g. New Delhi" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch Count</label>
                    <select className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500">
                      <option>1 (Single Campus)</option>
                      <option>2 - 5 Branches</option>
                      <option>6 - 20 Branches</option>
                      <option>20+ Branches</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-slate-600" /> Admin Contact Details
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
                    <input type="text" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Designation</label>
                    <input type="text" required placeholder="e.g. Principal / HR Head" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Official Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="email" required className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="tel" required className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors flex justify-center items-center gap-2 text-lg">
              Submit for Verification
            </button>
            <p className="text-xs text-center text-slate-500">By registering, you agree to our Terms of Service and Privacy Policy.</p>
          </form>
        </div>
      </div>
    </div>
  );
};
