import React, { useState, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Keep regular imports for homepage components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedByMarquee } from './components/TrustedByMarquee';
import { ProductsShowcase } from './components/ProductsShowcase';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { IndustriesServed } from './components/IndustriesServed';
import { AboutCEOSection } from './components/AboutCEOSection';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { ContactInquirySection } from './components/ContactInquirySection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toaster } from 'sonner';
import { FreeSampleKitModal } from './components/FreeSampleKitModal';
import { ClientLinkShareModal } from './components/ClientLinkShareModal';
import { COMPANY_INFO } from './data/mockData';

export type PageView = 'home' | 'studio' | 'quote' | 'data-collection' | 'samples' | 'schools' | 'corporate' | 'login' | 'register' | 'dashboard' | 'industries' | 'case-studies' | 'trust-center';

// Lazy loaded components
const RealPVCSamplesPage = React.lazy(() => import('./components/samples/RealPVCSamplesPage').then(m => ({ default: m.RealPVCSamplesPage })));
const StudioPage = React.lazy(() => import('./components/StudioPage').then(m => ({ default: m.StudioPage })));
const QuotePage = React.lazy(() => import('./components/QuotePage').then(m => ({ default: m.QuotePage })));
const DataCollectionPage = React.lazy(() => import('./components/DataCollectionPage').then(m => ({ default: m.DataCollectionPage })));
const ReviewGenerator = React.lazy(() => import('./components/ReviewGeneratorApp/App'));
const MarketingGuidePage = React.lazy(() => import('./components/MarketingGuidePage').then(m => ({ default: m.MarketingGuidePage })));

const SchoolSolutionsPage = React.lazy(() => import('./components/solutions/SchoolSolutionsPage').then(m => ({ default: m.SchoolSolutionsPage })));
const CorporateSolutionsPage = React.lazy(() => import('./components/solutions/CorporateSolutionsPage').then(m => ({ default: m.CorporateSolutionsPage })));
const IndustriesPage = React.lazy(() => import('./components/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const TrustCenterPage = React.lazy(() => import('./components/TrustCenterPage').then(m => ({ default: m.TrustCenterPage })));
const ThankYouPage = React.lazy(() => import('./pages/ThankYouPage'));
const CaseStudiesPage = React.lazy(() => import('./components/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const LoginPage = React.lazy(() => import('./components/portal/AuthPages').then(m => ({ default: m.LoginPage })));
const RegisterPage = React.lazy(() => import('./components/portal/AuthPages').then(m => ({ default: m.RegisterPage })));
const ClientDashboard = React.lazy(() => import('./components/portal/ClientDashboard').then(m => ({ default: m.ClientDashboard })));
const SuperAdminPanel = React.lazy(() => import('./components/portal/SuperAdminPanel').then(m => ({ default: m.SuperAdminPanel })));
const ProtectedRoute = React.lazy(() => import('./components/portal/ProtectedRoute').then(m => ({ default: m.ProtectedRoute })));

import {
  PrivacyPolicy,
  TermsConditions,
  ShippingPolicy,
  RefundPolicy,
  CookiePolicy,
  ContactUsPage
} from './components/LegalPages';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSampleKitModalOpen, setIsSampleKitModalOpen] = useState(false);
  const [isShareHubOpen, setIsShareHubOpen] = useState(false);
  const [prefilledContactProduct, setPrefilledContactProduct] = useState<string | undefined>(undefined);

  let currentPage: PageView = 'home';
  if (location.pathname === '/samples') currentPage = 'samples';
  if (location.pathname === '/studio') currentPage = 'studio';
  if (location.pathname === '/quote') currentPage = 'quote';
  if (location.pathname === '/data-collection') currentPage = 'data-collection';
  if (location.pathname === '/solutions/schools') currentPage = 'schools';
  if (location.pathname === '/solutions/corporate') currentPage = 'corporate';
  if (location.pathname === '/portal/login') currentPage = 'login';
  if (location.pathname === '/portal/register') currentPage = 'register';
  if (location.pathname === '/portal/dashboard') currentPage = 'dashboard';

  const handleNavigatePage = (page: PageView) => {
    let path = '/';
    if (page === 'schools') path = '/solutions/schools';
    else if (page === 'corporate') path = '/solutions/corporate';
    else if (page === 'login') path = '/portal/login';
    else if (page === 'register') path = '/portal/register';
    else if (page === 'dashboard') path = '/portal/dashboard';
    else if (page === 'industries') path = '/industries';
    else if (page === 'case-studies') path = '/case-studies';
    else if (page === 'trust-center') path = '/trust-center';
    else if (page !== 'home') path = `/${page}`;
    
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWhatsApp = () => {
    window.open(
      `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20IDCraft%20India!%20I%20would%20like%20to%20inquire%20about%20bulk%20ID%20card%20printing%20for%20our%20institution.`,
      '_blank'
    );
  };

  const handleScrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      handleNavigatePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuickQuote = (productName?: string) => {
    setPrefilledContactProduct(productName);
    handleScrollToSection('contact-section');
  };

  const Loader = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
    </div>
  );

  const isDashboard = location.pathname.startsWith('/portal/dashboard') || location.pathname.startsWith('/portal/superadmin');
  const isReviewGen = location.pathname.startsWith('/review-gen');
  const isMarketingGuide = location.pathname.startsWith('/marketing-guide');
  const hideLayout = isDashboard || isReviewGen || isMarketingGuide;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-brand-primary selection:text-white flex flex-col">
      <Helmet>
        <title>ID Craft India | Premium PVC ID Cards</title>
        <meta name="description" content="Premium PVC ID Cards for Schools, Colleges & Companies Across India." />
      </Helmet>

      {!hideLayout && (
        <Navbar 
          currentPage={currentPage}
          onNavigatePage={handleNavigatePage}
          onScrollToSection={handleScrollToSection}
          onOpenSampleKit={() => setIsSampleKitModalOpen(true)}
          onOpenWhatsApp={handleOpenWhatsApp}
          onOpenShareHub={() => setIsShareHubOpen(true)}
        />
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <div className="pt-[72px]">
              <Hero onOpenWhatsApp={handleOpenWhatsApp} />
              <TrustedByMarquee />
              <div id="products-section"><ProductsShowcase onOpenQuickQuote={handleOpenQuickQuote} /></div>
              <div id="comparison-section"><BeforeAfterSlider /></div>
              <div id="industries-section"><IndustriesServed onSelectIndustry={() => handleNavigatePage('industries')} /></div>
              <AboutCEOSection />
              <div id="faq-section"><TestimonialsFAQ /></div>
              <div id="contact-section">
                <ContactInquirySection 
                  onOpenWhatsApp={handleOpenWhatsApp} 
                  prefilledProduct={prefilledContactProduct}
                />
              </div>
            </div>
          } />

          <Route path="/review-gen" element={
            <Suspense fallback={<Loader />}>
              <Helmet><title>Leave a Review | ID Craft India</title></Helmet>
              <div className="pt-[72px] review-gen-wrapper">
                 <ReviewGenerator />
              </div>
            </Suspense>
          } />

          <Route path="/marketing-guide" element={
            <Suspense fallback={<Loader />}>
              <MarketingGuidePage />
            </Suspense>
          } />

          <Route path="/samples" element={
            <Suspense fallback={<Loader />}>
              <Helmet>
                <title>Sample Proofs | ID Craft India</title>
                <meta name="description" content="View high-resolution DSLR sample proofs of our premium printed PVC ID cards." />
              </Helmet>
              <RealPVCSamplesPage
                onBackToHome={() => handleNavigatePage('home')}
                onOpenWhatsApp={handleOpenWhatsApp}
                onOpenSampleKit={() => setIsSampleKitModalOpen(true)}
                onOpenInquiry={handleOpenQuickQuote}
              />
            </Suspense>
          } />
          
          <Route path="/studio" element={
            <Suspense fallback={<Loader />}>
              <Helmet>
                <title>Card Studio | ID Craft India</title>
                <meta name="description" content="Design and customize your premium PVC ID cards in our Card Studio." />
              </Helmet>
              <StudioPage
                onBackToHome={() => handleNavigatePage('home')}
                onOpenWhatsApp={handleOpenWhatsApp}
              />
            </Suspense>
          } />

          <Route path="/quote" element={
            <Suspense fallback={<Loader />}>
              <Helmet>
                <title>Bulk Quote Calculator | ID Craft India</title>
                <meta name="description" content="Get an instant bulk quote for premium PVC ID card printing." />
              </Helmet>
              <QuotePage
                onBackToHome={() => handleNavigatePage('home')}
                onOpenWhatsApp={handleOpenWhatsApp}
                onOpenSampleKit={() => setIsSampleKitModalOpen(true)}
                onSelectPackage={(title, count) => {
                  handleNavigatePage('home');
                  handleOpenQuickQuote(`${title} (${count} Cards)`);
                }}
              />
            </Suspense>
          } />

          <Route path="/data-collection" element={
            <Suspense fallback={<Loader />}>
              <Helmet>
                <title>Data Collection | ID Craft India</title>
                <meta name="description" content="Submit your ID card data securely for bulk printing." />
              </Helmet>
              <DataCollectionPage
                onBackToHome={() => handleNavigatePage('home')}
                onOpenWhatsApp={handleOpenWhatsApp}
              />
            </Suspense>
          } />

          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<><Helmet><title>Privacy Policy | ID Craft India</title></Helmet><PrivacyPolicy /></>} />
          <Route path="/terms-conditions" element={<><Helmet><title>Terms & Conditions | ID Craft India</title></Helmet><TermsConditions /></>} />
          <Route path="/shipping-policy" element={<><Helmet><title>Shipping & Delivery Policy | ID Craft India</title></Helmet><ShippingPolicy /></>} />
          <Route path="/refund-policy" element={<><Helmet><title>Refund & Cancellation Policy | ID Craft India</title></Helmet><RefundPolicy /></>} />
          <Route path="/cookie-policy" element={<><Helmet><title>Cookie Policy | ID Craft India</title></Helmet><CookiePolicy /></>} />
          <Route path="/contact" element={<><Helmet><title>Contact Us | ID Craft India</title></Helmet><ContactUsPage /></>} />
          <Route path="/thank-you" element={<Suspense fallback={<Loader />}><ThankYouPage /></Suspense>} />

          {/* Client Portal & Authentication */}
          <Route path="/portal/login" element={<Suspense fallback={<Loader />}><LoginPage /></Suspense>} />
          <Route path="/portal/register" element={<Suspense fallback={<Loader />}><RegisterPage /></Suspense>} />
          <Route path="/portal/dashboard" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute requiredRole="client">
                <ClientDashboard />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/portal/superadmin" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute requiredRole="superadmin">
                <SuperAdminPanel />
              </ProtectedRoute>
            </Suspense>
          } />

          {/* Solutions Pages */}
          <Route path="/solutions/schools" element={<Suspense fallback={<Loader />}><SchoolSolutionsPage /></Suspense>} />
          <Route path="/solutions/corporate" element={<Suspense fallback={<Loader />}><CorporateSolutionsPage /></Suspense>} />
          <Route path="/industries" element={<Suspense fallback={<Loader />}><IndustriesPage /></Suspense>} />
          <Route path="/case-studies" element={<Suspense fallback={<Loader />}><CaseStudiesPage /></Suspense>} />
          <Route path="/trust-center" element={<Suspense fallback={<Loader />}><TrustCenterPage /></Suspense>} />

        </Routes>
      </main>

      {!hideLayout && (
        <>
          <Footer
            onOpenSampleKit={() => setIsSampleKitModalOpen(true)}
            onOpenWhatsApp={handleOpenWhatsApp}
            onNavigateSection={handleScrollToSection}
            onNavigatePage={handleNavigatePage}
            onOpenShareHub={() => setIsShareHubOpen(true)}
          />
          <FloatingWhatsApp phoneNumber={COMPANY_INFO.whatsappNumber} />
          <FreeSampleKitModal isOpen={isSampleKitModalOpen} onClose={() => setIsSampleKitModalOpen(false)} />
          <ClientLinkShareModal isOpen={isShareHubOpen} onClose={() => setIsShareHubOpen(false)} />
        </>
      )}
      <Toaster position="top-center" />
    </div>
  );
}
