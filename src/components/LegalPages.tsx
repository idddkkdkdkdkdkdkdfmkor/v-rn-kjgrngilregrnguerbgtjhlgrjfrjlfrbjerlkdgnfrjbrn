import React from 'react';
import { ShieldCheck, FileText, Truck, RefreshCcw, Cookie, Building } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

const LegalPageContainer = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16">
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h1>
    </div>
    <div className="prose prose-slate prose-blue max-w-none text-slate-600">
      {children}
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalPageContainer title="Privacy Policy" icon={ShieldCheck}>
    <p><strong>Effective Date:</strong> January 1, 2026</p>
    
    <h3>1. Information We Collect</h3>
    <p>At ID Craft India, we collect personal and institutional information necessary to fulfill our ID card printing services. This includes:</p>
    <ul>
      <li><strong>Contact Information:</strong> Submitted through inquiry forms (Name, Email, Phone Number, WhatsApp Number).</li>
      <li><strong>Order Data:</strong> Uploaded logos, student/employee photographs, Excel sheets containing personal ID information, and institutional details.</li>
      <li><strong>Technical Data:</strong> Cookies and analytics data regarding your use of our website.</li>
    </ul>

    <h3>2. How We Use Your Data</h3>
    <p>All uploaded files, photos, and Excel sheets are used <strong>strictly and exclusively</strong> for the manufacturing and fulfillment of your ID card order. We do not sell, rent, or distribute your institutional data to any third parties.</p>

    <h3>3. Data Security</h3>
    <p>We implement stringent data security practices. All data transfers on our website are encrypted using HTTPS. Uploaded institutional data is stored securely and deleted from our active production servers after order completion and the standard retention period (for easy re-ordering), unless requested otherwise.</p>

    <h3>4. User Rights</h3>
    <p>Institutions have the right to request the immediate deletion of their uploaded data (Excel sheets, photos, logos) from our servers at any time after the order is fulfilled. To exercise this right, please contact us.</p>

    <h3>5. Contact Us</h3>
    <p>For any privacy-related inquiries or data deletion requests, please email us at <strong>{COMPANY_INFO.email}</strong>.</p>
  </LegalPageContainer>
);

export const TermsConditions = () => (
  <LegalPageContainer title="Terms & Conditions" icon={FileText}>
    <h3>1. Business Services</h3>
    <p>ID Craft India provides bulk PVC ID card manufacturing, lanyard printing, and related institutional branding services.</p>

    <h3>2. Order & Design Approval</h3>
    <p>Before bulk production begins, a digital proof or physical sample proof will be provided. The customer is fully responsible for verifying names, spelling, colors, and layouts. Once design approval is explicitly given, ID Craft India is not liable for errors present in the approved design.</p>

    <h3>3. Payment Terms</h3>
    <p>A standard advance payment is required to initiate bulk production, as ID cards are highly customized goods. The remaining balance must be cleared prior to dispatch or as per the agreed-upon corporate terms.</p>

    <h3>4. Intellectual Property</h3>
    <p>The customer guarantees they have the legal right and authority to use all uploaded logos, trademarks, and institutional names. The customer retains all IP rights to their logos and data.</p>

    <h3>5. Limitation of Liability</h3>
    <p>ID Craft India's liability is limited strictly to the replacement of defective cards or the refund of the purchase price. We are not liable for indirect or consequential losses.</p>

    <h3>6. Governing Law</h3>
    <p>These terms shall be governed by and constructed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Uttar Pradesh, India.</p>
  </LegalPageContainer>
);

export const ShippingPolicy = () => (
  <LegalPageContainer title="Shipping & Delivery Policy" icon={Truck}>
    <h3>1. Pan India Delivery</h3>
    <p>ID Craft India proudly offers express Pan-India logistics coverage. We deliver to all tier 1, 2, and 3 cities across the country.</p>

    <h3>2. Production & Shipping Timelines</h3>
    <ul>
      <li><strong>Standard Production:</strong> 3 to 5 business days after final design approval and advance payment.</li>
      <li><strong>Transit Time:</strong> 2 to 5 business days depending on the destination pin code.</li>
    </ul>

    <h3>3. Courier Partners</h3>
    <p>We partner with premier logistics providers including BlueDart, DTDC, and Speed Post to ensure secure and timely delivery of your customized ID cards.</p>

    <h3>4. Tracking & Packaging</h3>
    <p>Once dispatched, a tracking AWB number will be shared via email and WhatsApp. All ID cards are securely packed in damage-resistant, waterproof corrugated boxes to ensure they reach you in pristine condition.</p>
  </LegalPageContainer>
);

export const RefundPolicy = () => (
  <LegalPageContainer title="Refund & Cancellation Policy" icon={RefreshCcw}>
    <h3>1. Order Cancellation</h3>
    <p>Orders can only be cancelled for a full refund <strong>before</strong> the design approval and bulk printing process begins. Because ID cards are custom-manufactured goods, orders cannot be cancelled once production has commenced.</p>

    <h3>2. Design Revisions</h3>
    <p>We offer unlimited design revisions before the final proof is approved. We urge clients to thoroughly check spelling and layout during this phase.</p>

    <h3>3. Replacement Policy</h3>
    <p>If you receive damaged cards or cards with printing defects caused by our manufacturing process, we will replace the defective cards free of charge. Claims must be raised within 7 days of delivery.</p>

    <h3>4. Non-Refundable Items</h3>
    <p>Once custom printing has started, the products are strictly non-refundable as they hold no resale value. We do not offer refunds for errors (e.g., spelling mistakes) that were present in the customer-approved proof.</p>
  </LegalPageContainer>
);

export const CookiePolicy = () => (
  <LegalPageContainer title="Cookie Policy" icon={Cookie}>
    <h3>1. What Are Cookies?</h3>
    <p>Cookies are small text files placed on your device to help our website function efficiently and provide us with analytics.</p>

    <h3>2. Types of Cookies We Use</h3>
    <ul>
      <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., remembering your quote selections).</li>
      <li><strong>Analytics Cookies:</strong> Used to understand how visitors interact with our website (e.g., Google Analytics).</li>
      <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
    </ul>

    <h3>3. Managing Your Preferences</h3>
    <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our website may not function properly.</p>
  </LegalPageContainer>
);

export const ContactUsPage = () => (
  <LegalPageContainer title="Contact & Business Information" icon={Building}>
    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
      <h3 className="text-xl font-bold text-slate-900 mb-6 mt-0">Registered Business Details</h3>
      <div className="space-y-4">
        <div><strong className="text-slate-900">Business Name:</strong> ID Craft India Pvt. Ltd.</div>
        <div><strong className="text-slate-900">GSTIN:</strong> 09AAACI1234F1Z8</div>
        <div><strong className="text-slate-900">Central Works Address:</strong> {COMPANY_INFO.factoryAddress}</div>
        <div><strong className="text-slate-900">Email Address:</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-blue-600 hover:underline">{COMPANY_INFO.email}</a></div>
        <div><strong className="text-slate-900">Phone Number:</strong> <a href={`tel:${COMPANY_INFO.phone}`} className="text-blue-600 hover:underline">{COMPANY_INFO.phone}</a></div>
        <div><strong className="text-slate-900">WhatsApp Number:</strong> <a href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} className="text-blue-600 hover:underline">{COMPANY_INFO.phone}</a></div>
        <div><strong className="text-slate-900">Business Hours:</strong> Monday – Saturday: 9:00 AM – 7:30 PM IST</div>
      </div>
    </div>
  </LegalPageContainer>
);
