import React, { useEffect } from 'react';
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
} from '../utils/seoSchemas';
import { formatTitleWithBrand } from '../utils/seoTitles';
import { StoreService } from '../services/store';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Official Pooja Services & Spiritual Tours Ujjain',
  description = 'Book authentic Vedic Poojas, Rudrabhishek, Bhat Pooja, Kaal Sarp Dosh Shanti, Baglamukhi Havan & Spiritual Pilgrimage Yatras in Ujjain Mahakaleshwar, Omkareshwar, Nalkheda & Char Dham.',
  keywords = 'Ujjain Pooja Booking, Mahakaleshwar Rudrabhishek, Kaal Sarp Dosh Pooja Ujjain, Mangalnath Bhat Pooja, Baglamukhi Havan Nalkheda, 84 Mahadev Yatra, Char Dham Yatra Package, Aastha Sey Raasta Seva',
  canonicalUrl,
  ogImage,
  ogImageAlt,
  ogType = 'website',
  noindex = false,
  jsonLd,
}) => {
  const formattedTitle = formatTitleWithBrand(title);

  useEffect(() => {
    // Set document title
    document.title = formattedTitle;

    // Helper to set or update meta tag safely
    const setMeta = (nameAttr: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://aasthasaysrasta.com';
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : origin);

    // Resolve absolute image URL for Social Media previews (WhatsApp, Facebook, Twitter, LinkedIn, iMessage)
    const resolveImageUrl = (img?: string): string => {
      if (!img) {
        return `${origin}/assets/images/header_bg_spiritual_1786196057015.jpg`;
      }
      if (img.startsWith('http://') || img.startsWith('https://')) {
        return img;
      }
      const normalized = img.replace(/^\/(?:src|public)\/assets\//, '/assets/');
      const cleanPath = normalized.startsWith('/') ? normalized : `/${normalized}`;
      return `${origin}${cleanPath}`;
    };

    const getImageMimeType = (url: string): string => {
      const lower = url.toLowerCase();
      if (lower.endsWith('.png')) return 'image/png';
      if (lower.endsWith('.webp')) return 'image/webp';
      if (lower.endsWith('.gif')) return 'image/gif';
      if (lower.endsWith('.svg')) return 'image/svg+xml';
      return 'image/jpeg';
    };

    const resolvedOgImage = resolveImageUrl(ogImage);
    const resolvedOgImageAlt = ogImageAlt || formattedTitle;
    const mimeType = getImageMimeType(resolvedOgImage);

    // Baseline Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'author', 'Aastha Sey Raasta Seva Foundation');
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    
    // Geo Meta Tags (Local SEO & GEO for Ujjain, MP)
    setMeta('name', 'geo.region', 'IN-MP');
    setMeta('name', 'geo.placename', 'Ujjain, Madhya Pradesh, India');
    setMeta('name', 'geo.position', '23.1765;75.7885');
    setMeta('name', 'ICBM', '23.1765, 75.7885');

    // Schema / Itemprop Meta
    setMeta('itemprop', 'name', formattedTitle);
    setMeta('itemprop', 'description', description);
    setMeta('itemprop', 'image', resolvedOgImage);

    // OpenGraph (Facebook, WhatsApp, LinkedIn, Pinterest)
    setMeta('property', 'og:site_name', 'Aastha Sey Raasta Seva');
    setMeta('property', 'og:title', formattedTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', currentUrl);
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('property', 'og:image', resolvedOgImage);
    setMeta('property', 'og:image:secure_url', resolvedOgImage.replace(/^http:/, 'https:'));
    setMeta('property', 'og:image:type', mimeType);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', resolvedOgImageAlt);

    // Twitter Card (X, Discord, Slack)
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', '@AasthaSeyRaasta');
    setMeta('name', 'twitter:creator', '@AasthaSeyRaasta');
    setMeta('name', 'twitter:title', formattedTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', resolvedOgImage);
    setMeta('name', 'twitter:image:alt', resolvedOgImageAlt);
    setMeta('name', 'twitter:url', currentUrl);

    // Canonical Link Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // Dynamic JSON-LD Schema Graph
    const settings = StoreService.getSettings();
    const orgSchema = buildOrganizationSchema(settings);
    const siteSchema = buildWebSiteSchema();

    let schemasToInject: any[] = [orgSchema, siteSchema];

    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        schemasToInject = [...schemasToInject, ...jsonLd];
      } else {
        schemasToInject.push(jsonLd);
      }
    }

    // Deduplicate and clean schemas for the @graph container:
    // Schema.org standard: Elements inside an @graph MUST NOT have nested @context definitions.
    // Having '@context' inside @graph items causes Google Rich Results parser to fail with
    // "Invalid object type for field '<parent_node>'".
    const cleanGraphItems: any[] = [];
    const seenKeys = new Set<string>();

    for (const schema of schemasToInject) {
      if (!schema || typeof schema !== 'object') continue;

      const schemaId = (schema as any)['@id'] || (schema as any)['@type'];
      if (schemaId && seenKeys.has(schemaId)) {
        continue;
      }
      if (schemaId) {
        seenKeys.add(schemaId);
      }

      // Strip redundant nested @context from graph element
      const { '@context': _context, ...cleanItem } = schema as any;
      cleanGraphItems.push(cleanItem);
    }

    const fullGraphSchema = {
      '@context': 'https://schema.org',
      '@graph': cleanGraphItems,
    };

    let scriptJsonLd = document.querySelector('script[type="application/ld+json"]#seo-schema');
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement('script');
      scriptJsonLd.setAttribute('type', 'application/ld+json');
      scriptJsonLd.setAttribute('id', 'seo-schema');
      document.head.appendChild(scriptJsonLd);
    }
    scriptJsonLd.textContent = JSON.stringify(fullGraphSchema, null, 2);
  }, [title, description, keywords, canonicalUrl, ogImage, ogImageAlt, ogType, noindex, jsonLd]);

  return null;
};

