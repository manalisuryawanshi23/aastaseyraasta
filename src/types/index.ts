export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Booked' | 'Completed' | 'Cancelled' | 'Spam';

export interface PoojaCategory {
  id: string;
  name: string;
  hindiName?: string;
  slug: string;
  description?: string;
  hindiDescription?: string;
  icon?: string;
}

export interface PoojaService {
  id: string;
  name: string;
  hindiName?: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  hindiCategoryName?: string;
  shortDescription: string;
  hindiShortDescription?: string;
  description?: string;
  hindiDescription?: string;
  templeName?: string;
  hindiTempleName?: string;
  location?: string;
  hindiLocation?: string;
  city: string;
  hindiCity?: string;
  state: string;
  hindiState?: string;
  country: string;
  whatWeOffer?: string[];
  hindiWhatWeOffer?: string[];
  benefits?: string[];
  hindiBenefits?: string[];
  preparation?: string[];
  hindiPreparation?: string[];
  whoIsItFor?: string[];
  hindiWhoIsItFor?: string[];
  ritualDetails?: string;
  hindiRitualDetails?: string;
  duration?: string | null;
  hindiDuration?: string | null;
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
  aeoQuestions?: { question: string; answer: string }[];
  keyTakeaways?: string[];
  geoCity?: string;
  geoRegion?: string;
  geoEntities?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface TourDay {
  dayNumber: number;
  title: string;
  hindiTitle?: string;
  description: string;
  hindiDescription?: string;
  places?: string[];
  hindiPlaces?: string[];
  meals?: string[];
  accommodation?: string;
  hindiAccommodation?: string;
  notes?: string;
}

export interface TourCategory {
  id: string;
  name: string;
  hindiName?: string;
  slug: string;
}

export interface Tour {
  id: string;
  name: string;
  hindiName?: string;
  slug: string;
  category?: string;
  hindiCategory?: string;
  shortDescription: string;
  hindiShortDescription?: string;
  description?: string;
  hindiDescription?: string;
  startingPoint: string;
  hindiStartingPoint?: string;
  endingPoint: string;
  hindiEndingPoint?: string;
  duration?: string | null;
  hindiDuration?: string | null;
  destinations: string[];
  hindiDestinations?: string[];
  placesCovered: string[];
  hindiPlacesCovered?: string[];
  templesCovered: string[];
  hindiTemplesCovered?: string[];
  itinerary: TourDay[];
  hindiItinerary?: TourDay[];
  included?: string[];
  hindiIncluded?: string[];
  excluded?: string[];
  hindiExcluded?: string[];
  travelDetails?: string;
  hindiTravelDetails?: string;
  stayDetails?: string;
  hindiStayDetails?: string;
  foodDetails?: string;
  hindiFoodDetails?: string;
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
  aeoQuestions?: { question: string; answer: string }[];
  keyTakeaways?: string[];
  geoCity?: string;
  geoRegion?: string;
  geoEntities?: string[];
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
  hindiShortDescription?: string;
  description: string;
  hindiDescription?: string;
  heroImage?: string;
  gallery?: string[];
  placesToVisit: string[];
  hindiPlacesToVisit?: string[];
  temples: string[];
  hindiTemples?: string[];
  travelInformation?: string;
  hindiTravelInformation?: string;
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
  hindiTitle?: string;
  slug: string;
  excerpt: string;
  hindiExcerpt?: string;
  content: string;
  hindiContent?: string;
  featuredImage?: string;
  author: string;
  hindiAuthor?: string;
  category: string;
  hindiCategory?: string;
  tags: string[];
  focusKeyword?: string;
  secondaryKeywords?: string[];
  readingTime?: string;
  hindiReadingTime?: string;
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  aeoQuestions?: { question: string; answer: string }[];
  keyTakeaways?: string[];
  geoCity?: string;
  geoRegion?: string;
  geoEntities?: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  hindiQuestion?: string;
  answer: string;
  hindiAnswer?: string;
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
  hindiName?: string;
  location: string;
  hindiLocation?: string;
  rating: number; // 1 to 5
  testimonial: string;
  hindiTestimonial?: string;
  photo?: string;
  service?: string;
  hindiService?: string;
  tour?: string;
  category?: 'Pooja' | 'Tour' | 'Bhat Pooja' | 'General';
  date?: string;
  verified?: boolean;
  helpfulCount?: number;
  reviewImage?: string;
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

export interface SocialHandle {
  id: string;
  platform: 'Facebook' | 'Instagram' | 'YouTube' | 'X (Twitter)' | 'WhatsApp Channel' | 'Telegram' | 'LinkedIn' | 'Pinterest' | 'Google Business' | string;
  handle: string;
  url: string;
  icon?: string;
  isActive: boolean;
}

export interface BrandColorPalette {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  headerBg: string;
  heroGradientStart: string;
  heroGradientEnd: string;
  presetName?: string;
}

export interface SiteSettings {
  businessName: string;
  hindiBusinessName: string;
  tagline: string;
  hindiTagline?: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  emergencyHelpline?: string;
  email: string;
  address: string;
  hindiAddress?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  logoText: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialYoutube?: string;
  googleBusinessProfile?: string;
  socialHandles?: SocialHandle[];
  defaultSeoTitle: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  businessHours: string;
  footerDescription: string;
  hindiFooterDescription?: string;
  announcementBanner?: {
    text: string;
    secondaryText?: string;
    link?: string;
    buttonText?: string;
    badgeText?: string;
    isActive: boolean;
    isMarquee?: boolean;
    speed?: 'slow' | 'medium' | 'fast';
    themeColor?: 'amber' | 'red' | 'emerald' | 'purple' | 'dark';
    pauseOnHover?: boolean;
  };
  trustStats?: {
    devoteesCount: string;
    panditCount: string;
    templesCount: string;
    satisfactionRate: string;
  };
  aboutMissionText?: string;
  brandPalette?: BrandColorPalette;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'Super Admin' | 'Content Manager' | 'Lead Manager' | 'SEO Manager';
  email: string;
}

export type AdminRole = 'Admin' | 'Manager' | 'Editor';

export interface AdminPermission {
  canViewOverview: boolean;
  canManageLeads: boolean;
  canManageBlogs: boolean;
  canManageServices: boolean;
  canManageSettings: boolean;
  canManageSocials: boolean;
  canManageStaff: boolean;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  passcode: string;
  phone?: string;
  avatar?: string;
  status: 'Active' | 'Inactive';
  lastLogin?: string;
  permissions: AdminPermission;
}
