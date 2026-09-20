import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  structuredData?: object | object[];
}

const BASE_URL = 'https://idcraft.dpdns.org';
const DEFAULT_OG_IMAGE = `${BASE_URL}/ad-image.jpg`;

export function useSEO({
  title,
  description,
  keywords = [],
  canonicalPath = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // ---- Title ----
    document.title = title;

    // ---- Utility: set or create meta tag ----
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta') as HTMLMetaElement;
        document.head.appendChild(el);
      }
      el.setAttribute(attr === 'name' ? 'name' : 'property', selector.match(/\[(?:name|property)="([^"]+)"\]/)?.[1] || attr);
      el.setAttribute('content', value);
    };

    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta') as HTMLMetaElement; el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setMetaProp = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta') as HTMLMetaElement; el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) { el = document.createElement('link') as HTMLLinkElement; el.setAttribute('rel', rel); document.head.appendChild(el); }
      el.setAttribute('href', href);
    };

    // ---- Meta Tags ----
    setMetaName('description', description);
    if (keywords.length > 0) setMetaName('keywords', keywords.join(', '));

    // Open Graph
    setMetaProp('og:title', title);
    setMetaProp('og:description', description);
    setMetaProp('og:type', ogType);
    setMetaProp('og:url', `${BASE_URL}${canonicalPath}`);
    setMetaProp('og:image', ogImage);
    setMetaProp('og:site_name', 'IDCraft India');
    setMetaProp('og:locale', 'en_IN');

    // Twitter
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
    setMetaName('twitter:image', ogImage);

    // Canonical
    setLink('canonical', `${BASE_URL}${canonicalPath}`);

    // ---- Structured Data ----
    if (structuredData) {
      const existing = document.querySelector('script[data-page-schema]');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-page-schema', 'true');
      script.textContent = JSON.stringify(Array.isArray(structuredData) ? { '@context': 'https://schema.org', '@graph': structuredData } : structuredData);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup page-specific structured data on unmount
      const pageSchema = document.querySelector('script[data-page-schema]');
      if (pageSchema) pageSchema.remove();
    };
  }, [title, description, keywords, canonicalPath, ogImage, ogType, structuredData]);
}
