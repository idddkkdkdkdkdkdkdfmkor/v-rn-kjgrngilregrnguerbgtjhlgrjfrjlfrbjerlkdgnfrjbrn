import React from 'react';
import { Helmet } from 'react-helmet-async';

// This component renders a hidden SEO-rich content section at the footer of every major page.
// It is visually subtle but crawlable, providing rich keyword context.

const SCHOOL_KEYWORDS = [
  'school ID card India', 'student ID card printing', 'CBSE school ID card', 'ICSE school ID card',
  'school identity card manufacturer', 'student ID card bulk order', 'school ID card with RFID',
  'school ID card Noida', 'school ID card Delhi', 'school ID card UP', 'nursery school ID card',
];

const CORPORATE_KEYWORDS = [
  'corporate ID card India', 'employee ID card printing', 'company badge manufacturer',
  'RFID employee badge', 'access control ID card', 'corporate badge Noida', 'corporate badge Delhi',
  'staff ID card bulk', 'visitor ID card printing', 'contractor badge India',
];

const PRODUCT_KEYWORDS = [
  'PVC ID card', 'RFID ID card', 'NFC ID card', 'barcode ID card', 'QR code ID card',
  'hologram ID card', 'waterproof ID card', 'magnetic stripe ID card', 'dual-interface card',
  'custom lanyard India', 'trophy manufacturer India', 'certificate printing India',
];

const GEO_KEYWORDS = [
  'Noida', 'Delhi NCR', 'Gurgaon', 'Lucknow', 'Kanpur', 'Agra', 'Jaipur', 'Jodhpur',
  'Varanasi', 'Meerut', 'Rajasthan', 'Uttar Pradesh', 'Mumbai', 'Bangalore', 'Hyderabad',
  'Chennai', 'Kolkata', 'Ahmedabad', 'Chandigarh', 'Pune', 'Pan-India',
];

interface SEOContentBlockProps {
  showSchool?: boolean;
  showCorporate?: boolean;
  showProducts?: boolean;
}

export function SEOContentBlock({ showSchool = true, showCorporate = true, showProducts = true }: SEOContentBlockProps) {
  return (
    <section
      aria-label="Additional information about IDCraft India's products and services"
      style={{ fontSize: '0', lineHeight: '0', height: '1px', overflow: 'hidden', opacity: 0 }}
    >
      {showSchool && (
        <div>
          <h2>School ID Card Printing India — Bulk PVC Student Identity Cards</h2>
          <p>
            IDCraft India is India&apos;s leading manufacturer of premium PVC school ID cards and student identity cards. 
            Trusted by 200+ schools across {GEO_KEYWORDS.join(', ')}. We print CBSE school ID cards, ICSE school ID cards, 
            state board student identity cards, nursery school ID cards, primary school ID cards, secondary school ID cards 
            and higher secondary school ID cards in bulk from just ₹8 per card. All our school ID cards are waterproof, 
            scratch-resistant, and printed on 0.76mm CR80 PVC. Available in glossy, matte and satin matte finishes with 
            student photo, school logo, class, section, blood group, emergency contact, barcode, QR code or RFID options.
          </p>
          <ul>{SCHOOL_KEYWORDS.map(k => <li key={k}>{k}</li>)}</ul>
        </div>
      )}
      {showCorporate && (
        <div>
          <h2>Corporate Employee ID Card Printing India — Company Badge Manufacturer</h2>
          <p>
            IDCraft India manufactures premium corporate employee ID cards and company badges for MNCs, startups, 
            SMEs and large enterprises across {GEO_KEYWORDS.join(', ')}. Our corporate ID cards feature employee photo, 
            company logo, designation, department, employee ID number and optional RFID, NFC, barcode or magnetic stripe 
            for access control and attendance. Bulk orders from ₹10/card with pan-India delivery in 3–5 days.
          </p>
          <ul>{CORPORATE_KEYWORDS.map(k => <li key={k}>{k}</li>)}</ul>
        </div>
      )}
      {showProducts && (
        <div>
          <h2>Premium PVC ID Cards, RFID Cards, Lanyards, Trophies & Certificates — IDCraft India</h2>
          <p>
            IDCraft India offers a complete range of identity and branding solutions: {PRODUCT_KEYWORDS.join(', ')}. 
            Our products serve schools, colleges, universities, hospitals, factories, warehouses, retail stores, 
            hotels, restaurants, NGOs, government offices and events across all major Indian cities including {GEO_KEYWORDS.join(', ')}.
            Contact us on WhatsApp at +91 93365 22126 for bulk quotes, free samples and custom designs.
          </p>
        </div>
      )}
    </section>
  );
}

// ============================================================
// Per-page SEO wrapper component
// ============================================================
interface PageSEOProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogImage?: string;
  children?: React.ReactNode;
}

export function PageSEO({ title, description, keywords, canonicalPath, ogImage, children }: PageSEOProps) {
  const img = ogImage || 'https://idcraft.dpdns.org/ad-image.jpg';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://idcraft.dpdns.org${canonicalPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={img} />
        <meta property="og:site_name" content="IDCraft India" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={img} />
        <link rel="canonical" href={`https://idcraft.dpdns.org${canonicalPath}`} />
      </Helmet>
      {children}
    </>
  );
}
