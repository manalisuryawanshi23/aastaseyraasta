export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Booked' | 'Completed' | 'Cancelled' | 'Spam';

export interface PoojaCategory {
  id: string;
  name: string;
  hindiName?: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface PoojaService {
  id: string;
  name: string;
  hindiName?: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  shortDescription: string;
  description?: string;
  hindiDescription?: string;
  templeName?: string;
  location?: string;
  city: string;
  state: string;
  country: string;
  whatWeOffer?: string[];
  benefits?: string[];
  preparation?: string[];
  whoIsItFor?: string[];
  ritualDetails?: string;
  duration?: string | null;
  price?: number | null;
  priceType?: 'Fixed' | 'Starting From' | 'Custom / On Request';
  featuredImage?: string;
  gallery?: string[];
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface TourDay {
  dayNumber: number;
  title: string;
  description: string;
  places?: string[];
  meals?: string[];
  accommodation?: string;
  notes?: string;
}

export interface TourCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Tour {
  id: string;
  name: string;
  slug: string;
  category?: string;
  shortDescription: string;
  description?: string;
  startingPoint: string;
  endingPoint: string;
  duration?: string | null;
  destinations: string[];
  placesCovered: string[];
  templesCovered: string[];
  itinerary: TourDay[];
  included?: string[];
  excluded?: string[];
  travelDetails?: string;
  stayDetails?: string;
  foodDetails?: string;
  price?: number | null;
  priceType?: 'Fixed' | 'Starting From' | 'On Request';
  featuredImage?: string;
  gallery?: string[];
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Destination {
  id: string;
  name: string;
  hindiName?: string;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage?: string;
  gallery?: string[];
  placesToVisit: string[];
  temples: string[];
  travelInformation?: string;
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  category: string;
  tags: string[];
  focusKeyword?: string;
  secondaryKeywords?: string[];
  readingTime?: string;
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string; // 'General' | 'Pooja' | 'Tour' | 'Destination'
  relatedPoojaId?: string;
  relatedTourId?: string;
  relatedDestinationId?: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number; // 1 to 5
  testimonial: string;
  photo?: string;
  service?: string;
  tour?: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  altText: string;
  category: 'Pooja' | 'Temples' | 'Ujjain' | 'Tours' | 'Events';
  location?: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  whatsapp?: string;
  serviceType: 'Pooja' | 'Tour' | 'Destination' | 'General';
  serviceName?: string;
  poojaId?: string;
  tourId?: string;
  destinationId?: string;
  preferredDate?: string;
  numberOfPeople?: number;
  message?: string;
  source?: string;
  landingPage?: string;
  status: LeadStatus;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Redirect {
  id: string;
  source: string;
  destination: string;
  statusCode: 301 | 302;
  isActive: boolean;
  createdAt: string;
}

export interface SiteSettings {
  businessName: string;
  hindiBusinessName: string;
  tagline: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  logoText: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialYoutube?: string;
  googleBusinessProfile?: string;
  defaultSeoTitle: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  businessHours: string;
  footerDescription: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'Super Admin' | 'Content Manager' | 'Lead Manager' | 'SEO Manager';
  email: string;
}
