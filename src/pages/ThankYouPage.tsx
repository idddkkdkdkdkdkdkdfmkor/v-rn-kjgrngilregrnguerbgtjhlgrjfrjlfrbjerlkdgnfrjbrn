import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-32 pb-20 bg-slate-50 px-4">
      <Helmet>
        <title>Request Received | ID Craft India</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-slate-200">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Request Received!
        </h1>
        
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Thank you for reaching out to IDCraft Technologies. We have successfully received your request. Our corporate sales team will review your requirements and get back to you shortly with a detailed proposal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-dark transition-colors shadow-md shadow-brand-primary/20 gap-2"
          >
            Return to Homepage
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/919336522126"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
