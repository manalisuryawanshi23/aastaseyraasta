import { PoojaService, Tour, Destination, BlogPost } from '../types';

export const DEFAULT_BRAND_NAME = 'Aastha Sey Raasta';

/**
 * Ensures the title ends with a clean, brand-consistent suffix without duplicating it.
 * Keeps title length within standard SERP limit (55-60 chars target, max ~65 chars).
 */
export const formatTitleWithBrand = (title: string, brand: string = DEFAULT_BRAND_NAME): string => {
  if (!title) {
    return `Official Pooja Services & Spiritual Tours Ujjain | ${brand}`;
  }

  // If title already contains the brand, format neatly
  const lowerTitle = title.toLowerCase();
  const lowerBrand = brand.toLowerCase();

  if (lowerTitle.includes(lowerBrand)) {
    // If it's already structured well, return it cleaned up
    return title.trim().replace(/\s+/g, ' ');
  }

  // Remove existing trailing separators if any
  let cleanTitle = title.trim().replace(/[\s\-|:|—]+$/, '');

  // Truncate cleanTitle if appending brand would exceed ~65 chars
  const maxTitleLen = 65 - (brand.length + 3); // 3 chars for " | "
  if (cleanTitle.length > maxTitleLen) {
    cleanTitle = cleanTitle.substring(0, maxTitleLen - 3).trim() + '...';
  }

  return `${cleanTitle} | ${brand}`;
};

/**
 * Clean raw name strings by removing administrative or venue artifacts like " — At Navgraha..."
 */
const cleanRawName = (name: string): string => {
  return name
    .replace(/\s*—\s*At\s+.*$/i, '')
    .replace(/\s*-\s*At\s+.*$/i, '')
    .replace(/\s*—\s*.*$/i, '')
    .trim();
};

/**
 * Dynamically generates descriptive, keyword-rich meta title for an individual Pooja service.
 * Example output: "Kaal Sarp Dosh Shanti Pooja in Ujjain | Aastha Sey Raasta"
 */
export const generatePoojaTitle = (pooja: Partial<PoojaService>, brand: string = DEFAULT_BRAND_NAME): string => {
  if (pooja.seoTitle && pooja.seoTitle.trim().length > 0) {
    return formatTitleWithBrand(pooja.seoTitle, brand);
  }

  const rawName = pooja.name ? cleanRawName(pooja.name) : 'Vedic Pooja';
  const city = pooja.city || 'Ujjain';

  // Check if name already includes city name
  const nameHasCity = rawName.toLowerCase().includes(city.toLowerCase());

  let baseTitle = rawName;
  if (!nameHasCity) {
    baseTitle = `${rawName} in ${city}`;
  }

  // Ensure "Pooja" or "Puja" or "Jaap" or "Havan" is present
  const hasRitualType = /pooja|puja|jaap|havan|anushthan|abhishek|shanti/i.test(baseTitle);
  if (!hasRitualType) {
    baseTitle = `${baseTitle} Pooja`;
  }

  return formatTitleWithBrand(baseTitle, brand);
};

/**
 * Dynamically generates descriptive, keyword-rich meta title for a Spiritual Tour.
 * Example output: "Ujjain Omkareshwar Spiritual Tour Package | Aastha Sey Raasta"
 */
export const generateTourTitle = (tour: Partial<Tour>, brand: string = DEFAULT_BRAND_NAME): string => {
  if (tour.seoTitle && tour.seoTitle.trim().length > 0) {
    return formatTitleWithBrand(tour.seoTitle, brand);
  }

  const rawName = tour.name ? cleanRawName(tour.name) : 'Spiritual Tour';
  
  // Ensure Tour / Yatra keyword is clear
  let baseTitle = rawName;
  const hasTourKeyword = /tour|yatra|package|pilgrimage|darshan/i.test(baseTitle);
  
  if (!hasTourKeyword) {
    baseTitle = `${baseTitle} Tour Package`;
  } else if (!/package|in ujjain|ujjain/i.test(baseTitle)) {
    baseTitle = `${baseTitle} Package`;
  }

  return formatTitleWithBrand(baseTitle, brand);
};

/**
 * Dynamically generates descriptive, keyword-rich meta title for a Destination Guide.
 * Example output: "Mahakaleshwar Temple Ujjain Guide & Timings | Aastha Sey Raasta"
 */
export const generateDestinationTitle = (dest: Partial<Destination>, brand: string = DEFAULT_BRAND_NAME): string => {
  if (dest.seoTitle && dest.seoTitle.trim().length > 0) {
    return formatTitleWithBrand(dest.seoTitle, brand);
  }

  const rawName = dest.name ? cleanRawName(dest.name) : 'Sacred Shrine';

  let baseTitle = rawName;
  if (!/guide|temple|shrine|darshan|timings|ujjain/i.test(baseTitle)) {
    baseTitle = `${baseTitle} Temple & Travel Guide`;
  }

  return formatTitleWithBrand(baseTitle, brand);
};

/**
 * Dynamically generates descriptive, keyword-rich meta title for a Blog article.
 * Example output: "Rudrabhishek Pooja Vidhi & Benefits in Ujjain | Aastha Sey Raasta"
 */
export const generateBlogTitle = (post: Partial<BlogPost>, brand: string = DEFAULT_BRAND_NAME): string => {
  if (post.seoTitle && post.seoTitle.trim().length > 0) {
    return formatTitleWithBrand(post.seoTitle, brand);
  }

  const title = post.title || 'Spiritual Article';
  return formatTitleWithBrand(title, brand);
};

/**
 * Dynamic Title Generator for Pooja Listing Page (with optional category / search filters)
 */
export const generatePoojaListingTitle = (
  categoryName?: string,
  searchQuery?: string,
  brand: string = DEFAULT_BRAND_NAME
): string => {
  if (searchQuery && searchQuery.trim().length > 0) {
    return formatTitleWithBrand(`Pooja Services for "${searchQuery.trim()}" in Ujjain`, brand);
  }

  if (categoryName && categoryName.trim().length > 0 && categoryName !== 'All') {
    return formatTitleWithBrand(`${categoryName} in Ujjain`, brand);
  }

  return formatTitleWithBrand('Authentic Vedic Pooja Services in Ujjain', brand);
};

/**
 * Dynamic Title Generator for Tour Listing Page (with optional category / search filters)
 */
export const generateTourListingTitle = (
  categoryName?: string,
  searchQuery?: string,
  brand: string = DEFAULT_BRAND_NAME
): string => {
  if (searchQuery && searchQuery.trim().length > 0) {
    return formatTitleWithBrand(`Spiritual Tours for "${searchQuery.trim()}"`, brand);
  }

  if (categoryName && categoryName.trim().length > 0 && categoryName !== 'All') {
    return formatTitleWithBrand(`${categoryName} Tour Packages in Ujjain`, brand);
  }

  return formatTitleWithBrand('Spiritual Tours & Yatra Packages in Ujjain', brand);
};

/**
 * Dynamic Title Generator for Destination Listing Page
 */
export const generateDestinationListingTitle = (brand: string = DEFAULT_BRAND_NAME): string => {
  return formatTitleWithBrand('Sacred Destinations & Temple Guides in Ujjain', brand);
};

/**
 * Dynamic Title Generator for Blog Listing Page
 */
export const generateBlogListingTitle = (categoryName?: string, brand: string = DEFAULT_BRAND_NAME): string => {
  if (categoryName && categoryName.trim().length > 0 && categoryName !== 'All') {
    return formatTitleWithBrand(`${categoryName} Guides & Articles`, brand);
  }
  return formatTitleWithBrand('Spiritual Blog & Vedic Ritual Guides', brand);
};
