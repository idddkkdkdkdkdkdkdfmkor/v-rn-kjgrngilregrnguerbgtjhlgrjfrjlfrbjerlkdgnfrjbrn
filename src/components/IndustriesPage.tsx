import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, Stethoscope, Factory, Landmark, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IndustriesPage: React.FC = () => {
  const navigate = useNavigate();

  const industries = [
    {
      id: 'education',
      title: 'K-12 & Higher Education',
      icon: Building2,
      color: 'blue',
      description: 'Comprehensive identity programs for students, staff, and faculty with integrated access control and library management.',
      features: ['Multi-branch Data Sync', 'Library Barcodes', 'Bus Transport RFID', 'Parent Escort Cards'],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'healthcare',
      title: 'Hospitals & Healthcare',
      icon: Stethoscope,
      color: 'emerald',
      description: 'Medical-grade identity solutions with strict access control for restricted areas, ICUs, and staff time-tracking.',
      features: ['Role-based Color Coding', 'NFC Ward Access', 'Antibacterial Coatings', 'Emergency Protocols'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'corporate',
      title: 'Corporate & Tech Parks',
      icon: Users,
      color: 'purple',
      description: 'Enterprise-grade employee badges combining visual identity, logical access, and physical security.',
      features: ['HID/Mifare Integration', 'Visitor Management', 'Cafeteria Payments', 'Parking Access'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'manufacturing',
      title: 'Factories & Manufacturing',
      icon: Factory,
      color: 'amber',
      description: 'Ruggedized ID cards built to withstand harsh industrial environments, chemicals, and extreme temperatures.',
      features: ['Polycarbonate Core', 'Shift Attendance', 'Heavy Machinery Auth', 'Safety Certifications'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'government',
      title: 'Government & Defense',
      icon: Landmark,
      color: 'slate',
      description: 'High-security credentials with micro-text, holograms, and biometric integration for classified environments.',
      features: ['UV Ghost Images', 'Guilloche Patterns', 'FIPS Compliant', 'Anti-Counterfeit'],
      image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC] min-h-screen">
      <Helmet>
        <title>Industries We Serve | IDCraft India</title>
      </Helmet>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight mb-6">
          Purpose-Built for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
            Every Industry
          </span>
        </h1>
        <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
          From K-12 schools to high-security defense contractors, IDCraft India engineers identity solutions tailored to the unique operational and security demands of your sector.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {industries.map((industry, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={industry.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={industry.image} 
                    alt={industry.title} 
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute bottom-6 ${isEven ? 'left-6' : 'right-6'} z-20`}>
                    <div className={`w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-${industry.color}-600`}>
                      <industry.icon className="w-7 h-7" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">
                  {industry.title}
                </h2>
                <p className="text-[#64748B] text-lg mb-8 leading-relaxed">
                  {industry.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {industry.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 text-${industry.color}-500 shrink-0`} />
                      <span className="text-[#334155] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => navigate('/quote')}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-${industry.color}-600 hover:bg-${industry.color}-700 transition-colors shadow-lg shadow-${industry.color}-600/20`}
                >
                  Request a Proposal <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-[#0F172A] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Don't see your industry?</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
              We build custom identity solutions for NGOs, event management, transportation fleets, and more. Let's discuss your unique requirements.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0F172A] rounded-xl font-extrabold hover:bg-slate-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
