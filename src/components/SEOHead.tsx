import React, { useEffect } from 'react';
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
} from '../utils/seoSchemas';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Aastha Sey Raasta Seva | Official Pooja Services & Spiritual Tours Ujjain',
  description = 'Book authentic Vedic Poojas, Rudrabhishek, Bhat Pooja, Kaal Sarp Dosh Shanti, Baglamukhi Havan & Spiritual Pilgrimage Yatras in Ujjain Mahakaleshwar, Omkareshwar, Nalkheda & Char Dham.',
  keywords = 'Ujjain Pooja Booking, Mahakaleshwar Rudrabhishek, Kaal Sarp Dosh Pooja Ujjain, Mangalnath Bhat Pooja, Baglamukhi Havan Nalkheda, 84 Mahadev Yatra, Char Dham Yatra Package, Aastha Sey Raasta Seva',
  canonicalUrl,
  ogImage = '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg',
  ogType = 'website',
  noindex = false,
  jsonLd,
}) => {
  useEffect(() => {
    // Set title
    document.title = title;

    // Helper to set or update meta tag
    const setMeta = (nameAttr: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'author', 'Aastha Sey Raasta Seva Foundation');
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    
    // Geo Meta Tags (Local SEO & GEO for Ujjain, MP)
    setMeta('name', 'geo.region', 'IN-MP');
    setMeta('name', 'geo.placename', 'Ujjain, Madhya Pradesh, India');
    setMeta('name', 'geo.position', '23.1765;75.7885');
    setMeta('name', 'ICBM', '23.1765, 75.7885');

    // OpenGraph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', 'Aastha Sey Raasta Seva');
    setMeta('property', 'og:locale', 'en_IN');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`);

    // Canonical Link
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : '');
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // Dynamic JSON-LD Schema Graph
    const orgSchema = buildOrganizationSchema();
    const siteSchema = buildWebSiteSchema();

    let schemasToInject: object[] = [orgSchema, siteSchema];

    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        schemasToInject = [...schemasToInject, ...jsonLd];
      } else {
        schemasToInject.push(jsonLd);
      }
    }

    const fullGraphSchema = {
      '@context': 'https://schema.org',
      '@graph': schemasToInject,
    };

    let scriptJsonLd = document.querySelector('script[type="application/ld+json"]#seo-schema');
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement('script');
      scriptJsonLd.setAttribute('type', 'application/ld+json');
      scriptJsonLd.setAttribute('id', 'seo-schema');
      document.head.appendChild(scriptJsonLd);
    }
    scriptJsonLd.textContent = JSON.stringify(fullGraphSchema, null, 2);
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, noindex, jsonLd]);

  return null;
};

