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
export function buildLocalBusinessSchema(customSettings?: any) {
  const baseUrl = getBaseUrl();
  const phone = customSettings?.phone1 || '+91 98765 43210';
  const altPhone = customSettings?.phone2 || '+91 91111 22233';
  const email = customSettings?.email || 'contact@aasthaserasta.com';
  const businessName = customSettings?.businessName || ORGANIZATION_NAME;
  const addressStr = customSettings?.address || 'Mahakal Marg, Near Ramghat & Mahakaleshwar Temple';
  const city = customSettings?.city || 'Ujjain';
  const state = customSettings?.state || 'Madhya Pradesh';
  const pincode = customSettings?.pincode || '456001';

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ReligiousOrganization', 'TravelAgency', 'ProfessionalService'],
    '@id': `${baseUrl}/#localbusiness-ujjain`,
    name: businessName,
    alternateName: [
      'Aastha Sey Raasta - Ujjain Temple Pooja & Yatra Seva Kendra',
      'Ujjain Mahakaleshwar Pandit Booking Kendra',
      'Aastha Sey Raasta Seva Foundation Ujjain',
    ],
    url: baseUrl,
    logo: LOGO_URL,
    image: [
      LOGO_URL,
      `${baseUrl}/assets/images/header_bg_spiritual_1786196057015.jpg`,
      `${baseUrl}/assets/images/pooja_rudrabhishek_1786196070818.jpg`,
    ],
    description:
      'Certified Gurukul Brahmins & Vedic Acharyas in Ujjain providing authentic Mahakaleshwar Rudrabhishek, Mangalnath Bhat Pooja, Kaal Sarp Dosh Shanti, Pitru Dosh Narayan Bali, Baglamukhi Havan at Nalkheda, and spiritual pilgrimage yatra packages across Madhya Pradesh.',
    telephone: phone,
    email: email,
    priceRange: '₹500 - ₹51000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
    address: {
      '@type': 'PostalAddress',
      streetAddress: addressStr,
      addressLocality: city,
      addressRegion: state,
      postalCode: pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.1765,
      longitude: 75.7885,
    },
    hasMap: 'https://maps.google.com/?q=23.1765,75.7885',
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
        description: '24/7 Helpline & Sankalp Booking Center for Ujjain Temple Poojas & Yatras',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: phone,
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: 'IN',
        availableLanguage: ['Hindi', 'English', 'Sanskrit'],
      },
      {
        '@type': 'ContactPoint',
        telephone: altPhone,
        contactType: 'reservations',
        areaServed: 'IN',
        availableLanguage: ['Hindi', 'English'],
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Ujjain' },
      { '@type': 'City', name: 'Omkareshwar' },
      { '@type': 'City', name: 'Nalkheda' },
      { '@type': 'City', name: 'Indore' },
      { '@type': 'City', name: 'Agar Malwa' },
      { '@type': 'City', name: 'Dewas' },
      { '@type': 'City', name: 'Ratlam' },
      { '@type': 'State', name: 'Madhya Pradesh' },
      { '@type': 'Country', name: 'India' },
    ],
    knowsAbout: [
      'Ujjain Mahakaleshwar Temple',
      'Rudrabhishek Pooja Vidhi & Samagri',
      'Mangalnath & Angareshwar Bhat Pooja for Mangal Dosh Shanti',
      'Kaal Sarp Dosh Shanti Pooja Ujjain',
      'Pitru Dosh & Narayan Bali Pooja at Ramghat Ujjain',
      'Maa Baglamukhi Havan at Nalkheda',
      'Mahamrityunjaya Jaap & Chandi Path',
      '84 Mahadev Yatra Ujjain',
      'Ujjain Omkareshwar Tour Packages',
      'Char Dham Yatra Uttarakhand',
    ],
    sameAs: [
      'https://www.facebook.com/aasthaserasta',
      'https://www.instagram.com/aasthaserasta',
      'https://www.youtube.com/@aasthaserasta',
    ],
  };
}

export function buildOrganizationSchema() {
  return buildLocalBusinessSchema();
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
