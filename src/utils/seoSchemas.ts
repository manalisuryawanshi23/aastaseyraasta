export interface SchemaBreadcrumbItem {
  name: string;
  url: string;
}

export interface SchemaFAQItem {
  question: string;
  answer: string;
}

const DEFAULT_BASE_URL = 'https://aasthaserasta.com';
const ORGANIZATION_NAME = 'Aastha Sey Raasta Seva';
const LOGO_URL = 'https://aasthaserasta.com/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg';

export function getBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return DEFAULT_BASE_URL;
}

/**
 * Organization & LocalBusiness JSON-LD Schema
 */
export function buildOrganizationSchema() {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'TravelAgency'],
    '@id': `${baseUrl}/#organization`,
    name: ORGANIZATION_NAME,
    alternateName: 'Aastha Sey Raasta - Ujjain Temple Pooja & Yatra Seva',
    url: baseUrl,
    logo: LOGO_URL,
    image: LOGO_URL,
    description:
      "Aastha Sey Raasta Seva is India's premier spiritual pilgrimage organization providing certified Vedic Pandits for temple rituals in Ujjain Mahakaleshwar, Omkareshwar, Baglamukhi Nalkheda, Char Dham Yatra, and Himalayan Treks.",
    telephone: '+91 98765 43210',
    email: 'contact@aasthaserasta.com',
    priceRange: '₹500 - ₹51000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mahakal Marg, Near Ramghat',
      addressLocality: 'Ujjain',
      addressRegion: 'Madhya Pradesh',
      postalCode: '456001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.1765,
      longitude: 75.7885,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: [
      'https://www.facebook.com/aasthaserasta',
      'https://www.instagram.com/aasthaserasta',
      'https://www.youtube.com/@aasthaserasta',
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Ujjain',
      },
      {
        '@type': 'City',
        name: 'Omkareshwar',
      },
      {
        '@type': 'City',
        name: 'Nalkheda',
      },
      {
        '@type': 'State',
        name: 'Madhya Pradesh',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
  };
}

/**
 * WebSite Schema with Sitelinks Searchbox
 */
export function buildWebSiteSchema() {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Aastha Sey Raasta Seva',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/pooja-services?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function buildBreadcrumbSchema(items: SchemaBreadcrumbItem[]) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * FAQPage Schema for Answer Engine Optimization (AEO & AI Search)
 */
export function buildFAQSchema(faqs: SchemaFAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

/**
 * Service / Event Schema for Poojas & Rituals
 */
export function buildPoojaServiceSchema(pooja: {
  name: string;
  hindiName?: string;
  slug: string;
  shortDescription: string;
  description?: string;
  featuredImage?: string;
  templeName?: string;
  city?: string;
  price?: number | null;
  packages?: Array<{ name: string; price: number; description: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}) {
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/pooja/${pooja.slug}`;

  const defaultPrice = pooja.price || 1100;
  const minPrice = pooja.packages?.length
    ? Math.min(...pooja.packages.map((p) => p.price))
    : defaultPrice;
  const maxPrice = pooja.packages?.length
    ? Math.max(...pooja.packages.map((p) => p.price))
    : defaultPrice * 3;

  const image = pooja.featuredImage
    ? pooja.featuredImage.startsWith('http')
      ? pooja.featuredImage
      : `${baseUrl}${pooja.featuredImage}`
    : LOGO_URL;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}/#service`,
    name: pooja.name,
    alternateName: pooja.hindiName,
    url: pageUrl,
    image,
    description: pooja.description || pooja.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'Aastha Sey Raasta Seva',
      url: baseUrl,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: pooja.city || 'Ujjain, Madhya Pradesh',
    },
    serviceType: 'Vedic Pooja & Temple Ritual',
    termsOfService: `${baseUrl}/terms-and-conditions`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: minPrice,
      highPrice: maxPrice,
      offerCount: pooja.packages?.length || 1,
    },
  };

  return schema;
}

/**
 * TouristTrip / Trip / Product Schema for Spiritual Tours & Treks
 */
export function buildTourSchema(tour: {
  name: string;
  slug: string;
  shortDescription: string;
  description?: string;
  featuredImage?: string;
  duration?: string | null;
  startingPoint?: string;
  destinations?: string[];
  price?: number | null;
  packages?: Array<{ name: string; price: number; description: string }>;
  itinerary?: Array<{ dayNumber?: number; day?: number; title: string; description: string }>;
}) {
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/spiritual-tours/${tour.slug}`;

  const defaultPrice = tour.price || 2500;
  const minPrice = tour.packages?.length
    ? Math.min(...tour.packages.map((p) => p.price))
    : defaultPrice;
  const maxPrice = tour.packages?.length
    ? Math.max(...tour.packages.map((p) => p.price))
    : defaultPrice * 3;

  const image = tour.featuredImage
    ? tour.featuredImage.startsWith('http')
      ? tour.featuredImage
      : `${baseUrl}${tour.featuredImage}`
    : LOGO_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${pageUrl}/#touristtrip`,
    name: tour.name,
    url: pageUrl,
    image,
    description: tour.description || tour.shortDescription,
    touristType: ['Pilgrimage', 'Spiritual Traveler', 'Trekker', 'Cultural Tourist'],
    itinerary: tour.itinerary?.map((it) => ({
      '@type': 'City',
      name: `Day ${it.dayNumber || it.day || 1}: ${it.title}`,
      description: it.description,
    })),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: minPrice,
      highPrice: maxPrice,
      offerCount: tour.packages?.length || 1,
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Aastha Sey Raasta Seva',
      url: baseUrl,
    },
  };
}

/**
 * BlogPosting / Article Schema
 */
export function buildBlogSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  publishedAt?: string;
  updatedAt?: string;
  category: string;
}) {
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/blog/${post.slug}`;

  const image = post.featuredImage
    ? post.featuredImage.startsWith('http')
      ? post.featuredImage
      : `${baseUrl}${post.featuredImage}`
    : LOGO_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${pageUrl}/#article`,
    headline: post.title,
    url: pageUrl,
    description: post.excerpt,
    articleBody: post.content,
    image,
    datePublished: post.publishedAt || new Date().toISOString(),
    dateModified: post.updatedAt || post.publishedAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: post.author || 'Acharya Ji',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aastha Sey Raasta Seva',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
}
