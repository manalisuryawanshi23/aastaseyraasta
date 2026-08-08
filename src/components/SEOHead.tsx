import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Aastha Sey Raasta Seva | Authentic Pooja Services & Spiritual Tours Ujjain',
  description = 'Book authentic Vedic Poojas, Rudrabhishek, Bhat Pooja, Jaap & Havan and Spiritual Pilgrimage Tours in Ujjain, Omkareshwar, Nalkheda & Char Dham.',
  canonicalUrl,
  ogImage = '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg',
  ogType = 'website',
  jsonLd,
}) => {
  useEffect(() => {
    // Set title
    document.title = title;

    // Helper to update meta tag
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
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:type', ogType);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // Canonical
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // JSON-LD
    let scriptJsonLd = document.querySelector('script[type="application/ld+json"]#seo-schema');
    if (jsonLd) {
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.setAttribute('type', 'application/ld+json');
        scriptJsonLd.setAttribute('id', 'seo-schema');
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = JSON.stringify(jsonLd);
    } else if (scriptJsonLd) {
      scriptJsonLd.remove();
    }
  }, [title, description, canonicalUrl, ogImage, ogType, jsonLd]);

  return null;
};
