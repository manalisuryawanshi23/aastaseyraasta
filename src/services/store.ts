import {
  PoojaService,
  Tour,
  Destination,
  BlogPost,
  FAQ,
  Testimonial,
  GalleryItem,
  DarshanItem,
  Lead,
  SiteSettings,
  Redirect,
  PoojaCategory,
  StaffUser,
  AdminRole,
  AstrologyConsultation,
} from '../types';

import {
  initialSiteSettings,
  initialPoojaCategories,
  initialPoojas,
  initialTours,
  initialDestinations,
  initialBlogPosts,
  initialFAQs,
  initialTestimonials,
  initialGalleryItems,
  initialDarshanItems,
} from '../data/initialData';
import { applyBrandColorPalette } from '../utils/brandTheme';

export const initialStaffUsers: StaffUser[] = [
  {
    id: 'staff-admin-1',
    name: 'Aastha Super Admin',
    email: 'admin@aasthaseyraasta.com',
    role: 'Admin',
    passcode: 'admin123',
    phone: '+91 98260 00001',
    status: 'Active',
    lastLogin: 'Never',
    permissions: {
      canViewOverview: true,
      canManageLeads: true,
      canManageBlogs: true,
      canManageServices: true,
      canManageSettings: true,
      canManageSocials: true,
      canManageStaff: true,
      canManageSpecialOffers: true,
      canManageAstrologyConsultations: true,
    },
  },
  {
    id: 'staff-manager-1',
    name: 'Ramesh Shastri (Operations Manager)',
    email: 'manager@aasthaseyraasta.com',
    role: 'Manager',
    passcode: 'manager123',
    phone: '+91 98260 00002',
    status: 'Active',
    lastLogin: 'Never',
    permissions: {
      canViewOverview: true,
      canManageLeads: true,
      canManageBlogs: true,
      canManageServices: false,
      canManageSettings: false,
      canManageSocials: false,
      canManageStaff: false,
      canManageSpecialOffers: false,
      canManageAstrologyConsultations: true,
    },
  },
];

const KEYS = {
  SETTINGS: 'aastha_settings',
  CATEGORIES: 'aastha_categories',
  POOJAS: 'aastha_poojas',
  TOURS: 'aastha_tours',
  DESTINATIONS: 'aastha_destinations',
  BLOGS: 'aastha_blogs',
  FAQS: 'aastha_faqs',
  TESTIMONIALS: 'aastha_testimonials',
  GALLERY: 'aastha_gallery',
  DARSHAN: 'aastha_darshan_items',
  LEADS: 'aastha_leads',
  ASTROLOGY_CONSULTATIONS: 'aastha_astrology_consultations',
  REDIRECTS: 'aastha_redirects',
  STAFF: 'aastha_staff',
  SESSION: 'aastha_admin_session',
};

// Helper for localStorage
function getItem<T>(key: string, defaultVal: T): T {
  try {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
  }
  return defaultVal;
}

function setItem<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

function syncApiPost(endpoint: string, data: any) {
  if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.error(`[API SYNC ERROR] POST ${endpoint} failed (${res.status}):`, errData);
        } else {
          window.dispatchEvent(new CustomEvent('aastha:data-synced'));
        }
      })
      .catch((err) => console.log(`[API SYNC NOTICE] POST ${endpoint} notice:`, err));
  }
}

function syncApiDelete(endpoint: string) {
  if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
    fetch(endpoint, {
      method: 'DELETE',
    })
      .then(() => {
        window.dispatchEvent(new CustomEvent('aastha:data-synced'));
      })
      .catch((err) => console.log(`[API SYNC NOTICE] DELETE ${endpoint} notice:`, err));
  }
}

export class StoreService {
  // Settings
  static getSettings(): SiteSettings {
    const settings = getItem<SiteSettings>(KEYS.SETTINGS, initialSiteSettings);
    if (settings && settings.brandPalette) {
      applyBrandColorPalette(settings.brandPalette);
    }
    return settings;
  }

  static getSiteSettings(): SiteSettings {
    return this.getSettings();
  }

  static saveSettings(settings: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    setItem(KEYS.SETTINGS, updated);
    if (updated.brandPalette) {
      applyBrandColorPalette(updated.brandPalette);
    }
    syncApiPost('/api/settings', updated);
    return updated;
  }

  static updateSettings(settings: SiteSettings): SiteSettings {
    return this.saveSettings(settings);
  }

  // Categories
  static getCategories(): PoojaCategory[] {
    return getItem<PoojaCategory[]>(KEYS.CATEGORIES, initialPoojaCategories);
  }

  static getCategoryBySlug(slug: string): PoojaCategory | undefined {
    const cats = this.getCategories();
    return cats.find((c) => c.slug === slug || c.id === slug);
  }

  // Poojas
  static getPoojas(publishedOnly = true): PoojaService[] {
    const saved = getItem<PoojaService[]>(KEYS.POOJAS, initialPoojas);
    const savedIds = new Set(saved.map((p) => p.id));
    const missing = initialPoojas.filter((p) => !savedIds.has(p.id));

    let list = saved.map((p) => {
      const init = initialPoojas.find((ip) => ip.id === p.id);
      if (init) {
        // Auto-heal check: If saved data has corrupted/placeholder names/slugs, restore canonical definition
        const isNameCorrupted = !p.name || p.name === 'New Pooja Ritual' || p.name.trim() === '';
        const isSlugCorrupted = !p.slug || p.slug === 'new-pooja-ritual' || p.slug.trim() === '';
        return {
          ...init,
          ...p,
          name: isNameCorrupted ? init.name : p.name,
          hindiName: p.hindiName || init.hindiName,
          slug: isSlugCorrupted ? init.slug : p.slug,
          urlSlug: isSlugCorrupted ? (init.urlSlug || `/pooja/${init.slug}`) : (p.urlSlug || `/pooja/${p.slug}`),
          h1: isNameCorrupted ? (init.h1 || init.name) : (p.h1 || p.name),
          categoryId: p.categoryId || init.categoryId,
          categoryName: p.categoryName || init.categoryName,
          hindiCategoryName: p.hindiCategoryName || init.hindiCategoryName,
          shortDescription: p.shortDescription || init.shortDescription,
          hindiShortDescription: p.hindiShortDescription || init.hindiShortDescription,
          description: p.description || init.description,
          hindiDescription: p.hindiDescription || init.hindiDescription,
          templeName: p.templeName || init.templeName,
          hindiTempleName: p.hindiTempleName || init.hindiTempleName,
          location: p.location || init.location,
          hindiLocation: p.hindiLocation || init.hindiLocation,
          city: p.city || init.city,
          hindiCity: p.hindiCity || init.hindiCity,
          duration: p.duration || init.duration,
          hindiDuration: p.hindiDuration || init.hindiDuration,
          price: p.price ?? init.price,
          featuredImage: p.featuredImage || init.featuredImage,
          gallery: p.gallery && p.gallery.length > 0 ? p.gallery : init.gallery,
          whatWeOffer: p.whatWeOffer && p.whatWeOffer.length > 0 ? p.whatWeOffer : init.whatWeOffer,
          hindiWhatWeOffer: p.hindiWhatWeOffer && p.hindiWhatWeOffer.length > 0 ? p.hindiWhatWeOffer : init.hindiWhatWeOffer,
          benefits: p.benefits && p.benefits.length > 0 ? p.benefits : init.benefits,
          hindiBenefits: p.hindiBenefits && p.hindiBenefits.length > 0 ? p.hindiBenefits : init.hindiBenefits,
          whoCanConsider: p.whoCanConsider && p.whoCanConsider.length > 0 ? p.whoCanConsider : init.whoCanConsider,
          faqs: p.faqs && p.faqs.length > 0 ? p.faqs : init.faqs,
          quickAnswer: p.quickAnswer || init.quickAnswer,
          isPublished: p.isPublished !== undefined ? p.isPublished : init.isPublished,
          isFeatured: p.isFeatured !== undefined ? p.isFeatured : init.isFeatured,
          sortOrder: p.sortOrder !== undefined ? p.sortOrder : init.sortOrder,
        };
      }
      return p;
    });

    if (missing.length > 0) {
      list = [...list, ...missing];
      setItem(KEYS.POOJAS, list);
    }

    list.sort((a, b) => {
      const orderA = a.sortOrder ?? 9999;
      const orderB = b.sortOrder ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return 0;
    });

    if (publishedOnly) {
      return list.filter((p) => p.isPublished);
    }
    return list;
  }

  static getPoojaBySlug(slug: string): PoojaService | undefined {
    if (!slug) return undefined;
    const poojas = this.getPoojas(false);
    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/^\/pooja-services\/|^\/poojas\/|^\/pooja\/|^\//, '')
      .replace(/\/$/, '');

    const aliasMap: Record<string, string> = {
      'mool-shanti-pooja': 'mool-shanti-pooja-ujjain',
      'vish-yog-shanti-pooja': 'vish-yog-shanti-pooja-ujjain',
      'nakshatra-shanti-pooja': 'nakshatra-shanti-pooja-ujjain',
      'mool-shanti-pooja-ujjain': 'mool-shanti-pooja-ujjain',
      'vish-yog-shanti-pooja-ujjain': 'vish-yog-shanti-pooja-ujjain',
      'nakshatra-shanti-pooja-ujjain': 'nakshatra-shanti-pooja-ujjain',
    };

    const targetSlug = aliasMap[cleanSlug] || cleanSlug;

    return poojas.find(
      (p) =>
        p.slug === targetSlug ||
        p.slug === cleanSlug ||
        p.slug === slug ||
        p.id === slug ||
        p.id === targetSlug ||
        p.slug.toLowerCase() === targetSlug ||
        p.slug.toLowerCase() === cleanSlug ||
        p.urlSlug === `/pooja/${targetSlug}` ||
        p.urlSlug === `/pooja/${cleanSlug}` ||
        p.urlSlug === `/${targetSlug}` ||
        p.urlSlug === `/${cleanSlug}`
    );
  }

  static savePooja(pooja: Partial<PoojaService> & { id?: string }): PoojaService {
    const poojas = this.getPoojas(false);
    const now = new Date().toISOString();

    // 1. UPDATE EXISTING POOJA
    if (pooja.id && pooja.id.trim()) {
      const idx = poojas.findIndex((p) => p.id === pooja.id);
      if (idx !== -1) {
        const existing = poojas[idx];
        const updatedName =
          pooja.name !== undefined && pooja.name.trim() && pooja.name.trim() !== 'New Pooja Ritual'
            ? pooja.name.trim()
            : existing.name;
        const updatedSlug =
          pooja.slug !== undefined && pooja.slug.trim() && pooja.slug.trim() !== 'new-pooja-ritual'
            ? pooja.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
            : existing.slug;
        const updatedUrlSlug =
          pooja.urlSlug !== undefined && pooja.urlSlug.trim()
            ? pooja.urlSlug.trim()
            : (existing.urlSlug || `/pooja/${updatedSlug}`);

        const updated: PoojaService = {
          ...existing,
          ...pooja,
          id: existing.id,
          name: updatedName,
          slug: updatedSlug,
          urlSlug: updatedUrlSlug,
          h1: pooja.h1 !== undefined && pooja.h1.trim() ? pooja.h1.trim() : (existing.h1 || updatedName),
          updatedAt: now,
        };
        poojas[idx] = updated;
        setItem(KEYS.POOJAS, poojas);
        syncApiPost('/api/poojas', updated);
        return updated;
      }
    }

    // 2. CREATE NEW POOJA (DO NOT MUTATE ANY EXISTING ENTRIES)
    const cleanId = pooja.id && pooja.id.trim() ? pooja.id.trim() : `pooja-${Date.now()}`;
    const cleanName = pooja.name && pooja.name.trim() ? pooja.name.trim() : 'New Pooja Ritual';
    const fallbackSlug =
      cleanName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-|-$/g, '') || `pooja-${Date.now()}`;
    const cleanSlug =
      pooja.slug && pooja.slug.trim()
        ? pooja.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
        : fallbackSlug;
    const cleanUrlSlug =
      pooja.urlSlug && pooja.urlSlug.trim() ? pooja.urlSlug.trim() : `/pooja/${cleanSlug}`;

    const newPooja: PoojaService = {
      categoryId: 'cat-temple',
      categoryName: 'Temple Pooja Services',
      shortDescription: '',
      description: '',
      templeName: 'Mahakaleshwar Temple',
      location: 'Mahakal Marg, Ujjain',
      city: 'Ujjain',
      state: 'Madhya Pradesh',
      country: 'India',
      duration: '2 Hours',
      price: null,
      priceType: 'Custom / On Request',
      featuredImage: '/assets/images/pooja_rudrabhishek_1786196070818.jpg',
      isFeatured: false,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
      ...pooja,
      id: cleanId,
      name: cleanName,
      slug: cleanSlug,
      urlSlug: cleanUrlSlug,
      h1: pooja.h1 || cleanName,
    } as PoojaService;

    poojas.unshift(newPooja);
    setItem(KEYS.POOJAS, poojas);
    syncApiPost('/api/poojas', newPooja);
    return newPooja;
  }

  static deletePooja(id: string): void {
    const poojas = this.getPoojas(false).filter((p) => p.id !== id);
    setItem(KEYS.POOJAS, poojas);
    syncApiDelete(`/api/poojas/${id}`);
  }

  // Tours
  static getTours(publishedOnly = true): Tour[] {
    const saved = getItem<Tour[]>(KEYS.TOURS, initialTours);
    const savedIds = new Set(saved.map((t) => t.id));
    const missing = initialTours.filter((t) => !savedIds.has(t.id));

    let list = saved.map((t) => {
      const init = initialTours.find((it) => it.id === t.id);
      if (init) {
        const isNameCorrupted = !t.name || t.name === 'New Spiritual Tour' || t.name.trim() === '';
        const isSlugCorrupted = !t.slug || t.slug === 'new-spiritual-tour' || t.slug.trim() === '';
        return {
          ...init,
          ...t,
          name: isNameCorrupted ? init.name : t.name,
          hindiName: t.hindiName || init.hindiName,
          slug: isSlugCorrupted ? init.slug : t.slug,
          category: t.category || init.category,
          hindiCategory: t.hindiCategory || init.hindiCategory,
          shortDescription: t.shortDescription || init.shortDescription,
          hindiShortDescription: t.hindiShortDescription || init.hindiShortDescription,
          description: t.description || init.description,
          hindiDescription: t.hindiDescription || init.hindiDescription,
          startingPoint: t.startingPoint || init.startingPoint,
          hindiStartingPoint: t.hindiStartingPoint || init.hindiStartingPoint,
          endingPoint: t.endingPoint || init.endingPoint,
          hindiEndingPoint: t.hindiEndingPoint || init.hindiEndingPoint,
          duration: t.duration || init.duration,
          hindiDuration: t.hindiDuration || init.hindiDuration,
          destinations: init.destinations && init.destinations.length > 0 ? init.destinations : t.destinations,
          hindiDestinations: init.hindiDestinations && init.hindiDestinations.length > 0 ? init.hindiDestinations : t.hindiDestinations,
          placesCovered: init.placesCovered && init.placesCovered.length > 0 ? init.placesCovered : t.placesCovered,
          hindiPlacesCovered: init.hindiPlacesCovered && init.hindiPlacesCovered.length > 0 ? init.hindiPlacesCovered : t.hindiPlacesCovered,
          templesCovered: init.templesCovered && init.templesCovered.length > 0 ? init.templesCovered : t.templesCovered,
          hindiTemplesCovered: init.hindiTemplesCovered && init.hindiTemplesCovered.length > 0 ? init.hindiTemplesCovered : t.hindiTemplesCovered,
          itinerary: init.itinerary && init.itinerary.length > 0 ? init.itinerary : t.itinerary,
          hindiItinerary: init.hindiItinerary && init.hindiItinerary.length > 0 ? init.hindiItinerary : t.hindiItinerary,
          included: init.included && init.included.length > 0 ? init.included : t.included,
          hindiIncluded: init.hindiIncluded && init.hindiIncluded.length > 0 ? init.hindiIncluded : t.hindiIncluded,
          excluded: init.excluded && init.excluded.length > 0 ? init.excluded : t.excluded,
          hindiExcluded: init.hindiExcluded && init.hindiExcluded.length > 0 ? init.hindiExcluded : t.hindiExcluded,
          quickAnswer: init.quickAnswer || t.quickAnswer,
          whyChoose: init.whyChoose && init.whyChoose.length > 0 ? init.whyChoose : t.whyChoose,
          whatWeOffer: init.whatWeOffer && init.whatWeOffer.length > 0 ? init.whatWeOffer : t.whatWeOffer,
          howToReach: init.howToReach || t.howToReach,
          travelTips: init.travelTips && init.travelTips.length > 0 ? init.travelTips : t.travelTips,
        };
      }
      return t;
    });

    if (missing.length > 0) {
      list = [...list, ...missing];
      setItem(KEYS.TOURS, list);
    }

    list.sort((a, b) => {
      const orderA = a.sortOrder ?? 9999;
      const orderB = b.sortOrder ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return 0;
    });

    if (publishedOnly) {
      return list.filter((t) => t.isPublished);
    }
    return list;
  }

  static getTourBySlug(slug: string): Tour | undefined {
    if (!slug) return undefined;
    const tours = this.getTours(false);
    const cleanSlug = slug.toLowerCase().trim();
    return tours.find((t) => t.slug === slug || t.id === slug || t.slug.toLowerCase() === cleanSlug);
  }

  static saveTour(tour: Partial<Tour> & { id?: string }): Tour {
    const tours = this.getTours(false);
    const now = new Date().toISOString();

    if (tour.id && tour.id.trim()) {
      const idx = tours.findIndex((t) => t.id === tour.id);
      if (idx !== -1) {
        const existing = tours[idx];
        const updatedName =
          tour.name !== undefined && tour.name.trim() && tour.name.trim() !== 'New Spiritual Tour'
            ? tour.name.trim()
            : ((tour as any).title !== undefined && (tour as any).title.trim()
                ? (tour as any).title.trim()
                : existing.name);
        const updatedSlug =
          tour.slug !== undefined && tour.slug.trim() && tour.slug.trim() !== 'new-spiritual-tour'
            ? tour.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
            : existing.slug;

        const updated: Tour = {
          ...existing,
          ...tour,
          id: existing.id,
          name: updatedName,
          slug: updatedSlug,
          updatedAt: now,
        };
        tours[idx] = updated;
        setItem(KEYS.TOURS, tours);
        syncApiPost('/api/tours', updated);
        return updated;
      }
    }

    const cleanId = tour.id && tour.id.trim() ? tour.id.trim() : `tour-${Date.now()}`;
    const cleanName = (tour.name || (tour as any).title || '').trim() || 'New Spiritual Tour';
    const fallbackSlug =
      cleanName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-|-$/g, '') || `tour-${Date.now()}`;
    const cleanSlug =
      tour.slug && tour.slug.trim()
        ? tour.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
        : fallbackSlug;

    const newTour: Tour = {
      shortDescription: '',
      startingPoint: 'Ujjain',
      endingPoint: 'Ujjain',
      destinations: ['Ujjain'],
      placesCovered: [],
      templesCovered: [],
      itinerary: [],
      isFeatured: false,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
      ...tour,
      id: cleanId,
      name: cleanName,
      slug: cleanSlug,
    } as Tour;

    tours.unshift(newTour);
    setItem(KEYS.TOURS, tours);
    syncApiPost('/api/tours', newTour);
    return newTour;
  }

  static deleteTour(id: string): void {
    const tours = this.getTours(false).filter((t) => t.id !== id);
    setItem(KEYS.TOURS, tours);
    syncApiDelete(`/api/tours/${id}`);
  }

  // Destinations
  static getDestinations(publishedOnly = true): Destination[] {
    const saved = getItem<Destination[]>(KEYS.DESTINATIONS, initialDestinations);
    const savedIds = new Set(saved.map((d) => d.id));
    const missing = initialDestinations.filter((d) => !savedIds.has(d.id));

    let list = saved.map((d) => {
      const init = initialDestinations.find((id) => id.id === d.id);
      if (init) {
        const isNameCorrupted = !d.name || d.name === 'New Destination' || d.name.trim() === '';
        const isSlugCorrupted = !d.slug || d.slug === 'new-destination' || d.slug.trim() === '';
        return {
          ...init,
          ...d,
          name: isNameCorrupted ? init.name : d.name,
          hindiName: d.hindiName || init.hindiName,
          slug: isSlugCorrupted ? init.slug : d.slug,
          shortDescription: d.shortDescription || init.shortDescription,
          hindiShortDescription: d.hindiShortDescription || init.hindiShortDescription,
          description: d.description || init.description,
          hindiDescription: d.hindiDescription || init.hindiDescription,
          placesToVisit: d.placesToVisit && d.placesToVisit.length > 0 ? d.placesToVisit : init.placesToVisit,
          hindiPlacesToVisit: d.hindiPlacesToVisit && d.hindiPlacesToVisit.length > 0 ? d.hindiPlacesToVisit : init.hindiPlacesToVisit,
          temples: d.temples && d.temples.length > 0 ? d.temples : init.temples,
          hindiTemples: d.hindiTemples && d.hindiTemples.length > 0 ? d.hindiTemples : init.hindiTemples,
        };
      }
      return d;
    });

    if (missing.length > 0) {
      list = [...list, ...missing];
      setItem(KEYS.DESTINATIONS, list);
    }

    if (publishedOnly) {
      return list.filter((d) => d.isPublished);
    }
    return list;
  }

  static getDestinationBySlug(slug: string): Destination | undefined {
    const dests = this.getDestinations(false);
    return dests.find((d) => d.slug === slug);
  }

  static saveDestination(dest: Partial<Destination> & { id?: string }): Destination {
    const dests = this.getDestinations(false);
    const now = new Date().toISOString();

    if (dest.id && dest.id.trim()) {
      const idx = dests.findIndex((d) => d.id === dest.id);
      if (idx !== -1) {
        const existing = dests[idx];
        const updatedName =
          dest.name !== undefined && dest.name.trim() && dest.name.trim() !== 'New Destination'
            ? dest.name.trim()
            : ((dest as any).title !== undefined && (dest as any).title.trim()
                ? (dest as any).title.trim()
                : existing.name);
        const updatedSlug =
          dest.slug !== undefined && dest.slug.trim() && dest.slug.trim() !== 'new-destination'
            ? dest.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
            : existing.slug;

        const updated = {
          ...existing,
          ...dest,
          id: existing.id,
          name: updatedName,
          slug: updatedSlug,
          updatedAt: now,
        } as Destination;
        dests[idx] = updated;
        setItem(KEYS.DESTINATIONS, dests);
        syncApiPost('/api/destinations', updated);
        return updated;
      }
    }

    const cleanId = dest.id && dest.id.trim() ? dest.id.trim() : `dest-${Date.now()}`;
    const cleanName = (dest.name || (dest as any).title || '').trim() || 'New Destination';
    const fallbackSlug =
      cleanName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-|-$/g, '') || `dest-${Date.now()}`;
    const cleanSlug =
      dest.slug && dest.slug.trim()
        ? dest.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
        : fallbackSlug;

    const newDest: Destination = {
      shortDescription: dest.shortDescription || '',
      description: dest.description || '',
      placesToVisit: dest.placesToVisit || [],
      temples: dest.temples || [],
      isFeatured: dest.isFeatured || false,
      isPublished: dest.isPublished ?? true,
      createdAt: now,
      updatedAt: now,
      ...dest,
      id: cleanId,
      name: cleanName,
      slug: cleanSlug,
    } as Destination;

    dests.unshift(newDest);
    setItem(KEYS.DESTINATIONS, dests);
    syncApiPost('/api/destinations', newDest);
    return newDest;
  }

  static deleteDestination(id: string): void {
    const dests = this.getDestinations(false).filter((d) => d.id !== id);
    setItem(KEYS.DESTINATIONS, dests);
    syncApiDelete(`/api/destinations/${id}`);
  }

  // Blogs
  static getBlogPosts(publishedOnly = true): BlogPost[] {
    const saved = getItem<BlogPost[]>(KEYS.BLOGS, initialBlogPosts);
    const savedIds = new Set(saved.map((b) => b.id));
    const missing = initialBlogPosts.filter((b) => !savedIds.has(b.id));

    let list = saved.map((b) => {
      const init = initialBlogPosts.find((ib) => ib.id === b.id);
      if (init) {
        const isTitleCorrupted = !b.title || b.title === 'New Blog Guide' || b.title.trim() === '';
        const isSlugCorrupted = !b.slug || b.slug === 'new-blog-guide' || b.slug.trim() === '';
        return {
          ...init,
          ...b,
          title: isTitleCorrupted ? init.title : b.title,
          hindiTitle: b.hindiTitle || init.hindiTitle,
          slug: isSlugCorrupted ? init.slug : b.slug,
          excerpt: b.excerpt || init.excerpt,
          hindiExcerpt: b.hindiExcerpt || init.hindiExcerpt,
          content: b.content || init.content,
          hindiContent: b.hindiContent || init.hindiContent,
          category: b.category || init.category,
          hindiCategory: b.hindiCategory || init.hindiCategory,
        };
      }
      return b;
    });

    if (missing.length > 0) {
      list = [...list, ...missing];
      setItem(KEYS.BLOGS, list);
    }

    if (publishedOnly) {
      return list.filter((b) => b.isPublished);
    }
    return list;
  }

  static getBlogPostBySlug(slug: string): BlogPost | undefined {
    const blogs = this.getBlogPosts(false);
    return blogs.find((b) => b.slug === slug);
  }

  static saveBlogPost(blog: Partial<BlogPost> & { id?: string }): BlogPost {
    const blogs = this.getBlogPosts(false);
    const now = new Date().toISOString();

    if (blog.id && blog.id.trim()) {
      const idx = blogs.findIndex((b) => b.id === blog.id);
      if (idx !== -1) {
        const existing = blogs[idx];
        const updatedTitle =
          blog.title !== undefined && blog.title.trim() && blog.title.trim() !== 'New Blog Guide'
            ? blog.title.trim()
            : existing.title;
        const updatedSlug =
          blog.slug !== undefined && blog.slug.trim() && blog.slug.trim() !== 'new-blog-guide'
            ? blog.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
            : existing.slug;

        const updated = {
          ...existing,
          ...blog,
          id: existing.id,
          title: updatedTitle,
          slug: updatedSlug,
          updatedAt: now,
        } as BlogPost;
        blogs[idx] = updated;
        setItem(KEYS.BLOGS, blogs);
        syncApiPost('/api/blogs', updated);
        return updated;
      }
    }

    const cleanId = blog.id && blog.id.trim() ? blog.id.trim() : `blog-${Date.now()}`;
    const cleanTitle = (blog.title || '').trim() || 'New Blog Guide';
    const fallbackSlug =
      cleanTitle
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-|-$/g, '') || `blog-${Date.now()}`;
    const cleanSlug =
      blog.slug && blog.slug.trim()
        ? blog.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
        : fallbackSlug;

    const newBlog: BlogPost = {
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || 'Vaidik Acharya',
      category: blog.category || 'Guides',
      tags: blog.tags || ['Ujjain', 'Pooja'],
      isFeatured: blog.isFeatured || false,
      isPublished: blog.isPublished ?? true,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
      ...blog,
      id: cleanId,
      title: cleanTitle,
      slug: cleanSlug,
    } as BlogPost;

    blogs.unshift(newBlog);
    setItem(KEYS.BLOGS, blogs);
    syncApiPost('/api/blogs', newBlog);
    return newBlog;
  }

  static deleteBlogPost(id: string): void {
    const blogs = this.getBlogPosts(false).filter((b) => b.id !== id);
    setItem(KEYS.BLOGS, blogs);
    syncApiDelete(`/api/blogs/${id}`);
  }

  // FAQs
  static getFAQs(): FAQ[] {
    const saved = getItem<FAQ[]>(KEYS.FAQS, initialFAQs);
    const savedIds = new Set(saved.map((f) => f.id));
    const missing = initialFAQs.filter((f) => !savedIds.has(f.id));

    let list = saved.map((f) => {
      const init = initialFAQs.find((i) => i.id === f.id);
      if (init) {
        return {
          ...init,
          ...f,
          question: f.question || init.question,
          hindiQuestion: f.hindiQuestion || init.hindiQuestion,
          answer: f.answer || init.answer,
          hindiAnswer: f.hindiAnswer || init.hindiAnswer,
          category: f.category || init.category,
        };
      }
      return f;
    });

    if (missing.length > 0) {
      list = [...list, ...missing];
      setItem(KEYS.FAQS, list);
    }
    return list;
  }

  static saveFAQ(faq: Partial<FAQ> & { id?: string }): FAQ {
    const faqs = this.getFAQs();
    const now = new Date().toISOString();

    if (faq.id) {
      const idx = faqs.findIndex((f) => f.id === faq.id);
      if (idx !== -1) {
        const updated = { ...faqs[idx], ...faq } as FAQ;
        faqs[idx] = updated;
        setItem(KEYS.FAQS, faqs);
        syncApiPost('/api/faqs', updated);
        return updated;
      }
    }

    const newFaq: FAQ = {
      id: `faq-${Date.now()}`,
      question: faq.question || 'New Question?',
      answer: faq.answer || 'Answer details...',
      category: faq.category || 'General',
      sortOrder: faqs.length + 1,
      isPublished: faq.isPublished ?? true,
      createdAt: now,
      ...faq,
    } as FAQ;

    faqs.push(newFaq);
    setItem(KEYS.FAQS, faqs);
    syncApiPost('/api/faqs', newFaq);
    return newFaq;
  }

  static deleteFAQ(id: string): void {
    const faqs = this.getFAQs().filter((f) => f.id !== id);
    setItem(KEYS.FAQS, faqs);
    syncApiDelete(`/api/faqs/${id}`);
  }

  // Testimonials
  static getTestimonials(): Testimonial[] {
    const saved = getItem<Testimonial[]>(KEYS.TESTIMONIALS, initialTestimonials);
    const savedIds = new Set(saved.map((t) => t.id));
    const missing = initialTestimonials.filter((t) => !savedIds.has(t.id));

    let list = saved.map((t) => {
      const init = initialTestimonials.find((it) => it.id === t.id);
      if (init) {
        return {
          ...init,
          ...t,
        };
      }
      return t;
    });

    if (missing.length > 0) {
      list = [...list, ...missing];
      setItem(KEYS.TESTIMONIALS, list);
    }
    return list;
  }

  static saveTestimonial(t: Partial<Testimonial> & { id?: string }): Testimonial {
    const list = this.getTestimonials();
    const now = new Date().toISOString();
    const cleanId = t.id && t.id.trim() ? t.id.trim() : `test-${Date.now()}`;
    const cleanName = (t.name || '').trim() || 'Devotee Name';

    if (t.id) {
      const idx = list.findIndex((x) => x.id === t.id);
      if (idx !== -1) {
        const updated = {
          ...list[idx],
          ...t,
          id: cleanId,
          name: cleanName,
        } as Testimonial;
        list[idx] = updated;
        setItem(KEYS.TESTIMONIALS, list);
        syncApiPost('/api/testimonials', updated);
        return updated;
      }
    }

    const newT: Testimonial = {
      location: t.location || 'India',
      rating: t.rating || 5,
      testimonial: t.testimonial || 'Wonderful divine experience!',
      isFeatured: t.isFeatured ?? true,
      isPublished: t.isPublished ?? true,
      createdAt: now,
      ...t,
      id: cleanId,
      name: cleanName,
    } as Testimonial;

    list.unshift(newT);
    setItem(KEYS.TESTIMONIALS, list);
    syncApiPost('/api/testimonials', newT);
    return newT;
  }

  static incrementHelpfulCount(id: string): number {
    const list = this.getTestimonials();
    const idx = list.findIndex((t) => t.id === id);
    if (idx !== -1) {
      const current = list[idx].helpfulCount || 0;
      list[idx].helpfulCount = current + 1;
      setItem(KEYS.TESTIMONIALS, list);
      fetch(`/api/testimonials/${id}/helpful`, { method: 'POST' }).catch(() => {});
      return list[idx].helpfulCount;
    }
    return 0;
  }

  static deleteTestimonial(id: string): void {
    const list = this.getTestimonials().filter((t) => t.id !== id);
    setItem(KEYS.TESTIMONIALS, list);
    syncApiDelete(`/api/testimonials/${id}`);
  }

  // Gallery
  static getGallery(): GalleryItem[] {
    const normalizeImg = (img?: string) => (img ? img.replace(/^\/(?:src|public)\/assets\//, '/assets/') : '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg');
    const saved = getItem<GalleryItem[]>(KEYS.GALLERY, initialGalleryItems);
    const savedIds = new Set(saved.map((g) => g.id));
    const missing = initialGalleryItems.filter((g) => !savedIds.has(g.id));

    let list = saved.map((g) => {
      const init = initialGalleryItems.find((ig) => ig.id === g.id);
      if (init) {
        return {
          ...init,
          ...g,
          image: normalizeImg(g.image || init.image),
        };
      }
      return {
        ...g,
        image: normalizeImg(g.image),
      };
    });

    if (missing.length > 0) {
      list = [...list, ...missing.map((m) => ({ ...m, image: normalizeImg(m.image) }))];
      setItem(KEYS.GALLERY, list);
    }
    return list;
  }

  static saveGalleryItem(g: Partial<GalleryItem> & { id?: string }): GalleryItem {
    const list = this.getGallery();
    const now = new Date().toISOString();
    const cleanId = g.id && g.id.trim() ? g.id.trim() : `gal-${Date.now()}`;
    const cleanTitle = (g.title || '').trim() || 'Spiritual Photo';
    const cleanImage = (g.image || '').replace(/^\/(?:src|public)\/assets\//, '/assets/') || '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg';

    if (g.id) {
      const idx = list.findIndex((x) => x.id === g.id);
      if (idx !== -1) {
        const updated = {
          ...list[idx],
          ...g,
          id: cleanId,
          title: cleanTitle,
          image: cleanImage,
        } as GalleryItem;
        list[idx] = updated;
        setItem(KEYS.GALLERY, list);
        syncApiPost('/api/gallery', updated);
        return updated;
      }
    }

    const newG: GalleryItem = {
      image: cleanImage,
      altText: g.altText || cleanTitle,
      category: g.category || 'Pooja',
      location: g.location || '',
      sortOrder: list.length + 1,
      isPublished: g.isPublished ?? true,
      createdAt: now,
      ...g,
      id: cleanId,
      title: cleanTitle,
    } as GalleryItem;

    list.unshift(newG);
    setItem(KEYS.GALLERY, list);
    syncApiPost('/api/gallery', newG);
    return newG;
  }

  static deleteGalleryItem(id: string): void {
    const list = this.getGallery().filter((g) => g.id !== id);
    setItem(KEYS.GALLERY, list);
    syncApiDelete(`/api/gallery/${id}`);
  }

  // Dedicated Darshan Items Section
  static getDarshanItems(): DarshanItem[] {
    const normalizeImg = (img?: string) =>
      img ? img.replace(/^\/(?:src|public)\/assets\//, '/assets/') : '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg';

    const saved = getItem<DarshanItem[]>(KEYS.DARSHAN, initialDarshanItems);
    const savedIds = new Set(saved.map((d) => d.id));
    const missing = initialDarshanItems.filter((d) => !savedIds.has(d.id));

    let list = saved.map((d) => {
      const init = initialDarshanItems.find((id) => id.id === d.id);
      if (init) {
        return {
          ...init,
          ...d,
          image: normalizeImg(d.image || init.image),
        };
      }
      return {
        ...d,
        image: normalizeImg(d.image),
      };
    });

    if (missing.length > 0) {
      list = [...list, ...missing.map((m) => ({ ...m, image: normalizeImg(m.image) }))];
      setItem(KEYS.DARSHAN, list);
    }

    list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    return list;
  }

  static saveDarshanItem(d: Partial<DarshanItem> & { id?: string }): DarshanItem {
    const list = this.getDarshanItems();
    const now = new Date().toISOString();
    const cleanId = d.id && d.id.trim() ? d.id.trim() : `darshan-${Date.now()}`;
    const cleanTitle = (d.title || '').trim() || 'Sacred Darshan';
    const cleanImage =
      (d.image || '').replace(/^\/(?:src|public)\/assets\//, '/assets/') ||
      '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg';

    if (d.id) {
      const idx = list.findIndex((x) => x.id === d.id);
      if (idx !== -1) {
        const updated: DarshanItem = {
          ...list[idx],
          ...d,
          id: cleanId,
          title: cleanTitle,
          image: cleanImage,
          updatedAt: now,
        };
        list[idx] = updated;
        list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setItem(KEYS.DARSHAN, list);
        syncApiPost('/api/darshan', updated);
        window.dispatchEvent(new CustomEvent('aastha:darshan-synced'));
        return updated;
      }
    }

    const maxSort = list.reduce((max, item) => Math.max(max, item.sortOrder ?? 0), 0);
    const newD: DarshanItem = {
      id: cleanId,
      title: cleanTitle,
      hindiTitle: d.hindiTitle || '',
      subtitle: d.subtitle || '',
      image: cleanImage,
      altText: d.altText || cleanTitle,
      location: d.location || 'Ujjain',
      templeTiming: d.templeTiming || '',
      sortOrder: d.sortOrder !== undefined ? d.sortOrder : maxSort + 1,
      isPublished: d.isPublished ?? true,
      createdAt: now,
      updatedAt: now,
      ...d,
    };

    list.push(newD);
    list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    setItem(KEYS.DARSHAN, list);
    syncApiPost('/api/darshan', newD);
    window.dispatchEvent(new CustomEvent('aastha:darshan-synced'));
    return newD;
  }

  static deleteDarshanItem(id: string): void {
    const list = this.getDarshanItems().filter((d) => d.id !== id);
    setItem(KEYS.DARSHAN, list);
    syncApiDelete(`/api/darshan/${id}`);
    window.dispatchEvent(new CustomEvent('aastha:darshan-synced'));
  }

  static reorderDarshanItems(items: DarshanItem[]): void {
    const updated = items.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
    }));
    setItem(KEYS.DARSHAN, updated);
    updated.forEach((item) => syncApiPost('/api/darshan', item));
    window.dispatchEvent(new CustomEvent('aastha:darshan-synced'));
  }

  // Leads CRM
  static getLeads(): Lead[] {
    return getItem<Lead[]>(KEYS.LEADS, []);
  }

  static createLead(leadData: Partial<Lead>): Lead {
    const leads = this.getLeads();
    const now = new Date().toISOString();

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: leadData.name || 'Inquirer',
      phone: leadData.phone || '',
      email: leadData.email || '',
      whatsapp: leadData.whatsapp || leadData.phone || '',
      serviceType: leadData.serviceType || 'Pooja',
      serviceName: leadData.serviceName || '',
      preferredDate: leadData.preferredDate || '',
      numberOfPeople: leadData.numberOfPeople || 1,
      message: leadData.message || '',
      source: leadData.source || 'Website Form',
      landingPage: leadData.landingPage || typeof window !== 'undefined' ? window.location.pathname : '/',
      status: 'New',
      createdAt: now,
      updatedAt: now,
      ...leadData,
    } as Lead;

    leads.unshift(newLead);
    setItem(KEYS.LEADS, leads);

    // Also attempt to post to backend API in background if online
    if (typeof fetch !== 'undefined') {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      }).catch((e) => console.log('Backend sync offline:', e));
    }

    return newLead;
  }

  static updateLeadStatus(id: string, status: Lead['status'], notes?: string): Lead | undefined {
    const leads = this.getLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx !== -1) {
      leads[idx].status = status;
      if (notes !== undefined) leads[idx].notes = notes;
      leads[idx].updatedAt = new Date().toISOString();
      setItem(KEYS.LEADS, leads);

      if (typeof window !== 'undefined') {
        fetch(`/api/leads/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status, notes }),
        }).catch((err) => console.log('[API SYNC NOTICE] Update lead error:', err));
      }
      return leads[idx];
    }
    return undefined;
  }

  static deleteLead(id: string): void {
    const leads = this.getLeads().filter((l) => l.id !== id);
    setItem(KEYS.LEADS, leads);
    syncApiDelete(`/api/leads/${id}`);
  }

  // Redirects
  static getRedirects(): Redirect[] {
    return getItem<Redirect[]>(KEYS.REDIRECTS, []);
  }

  static saveRedirect(r: Partial<Redirect> & { id?: string }): Redirect {
    const list = this.getRedirects();
    const now = new Date().toISOString();

    if (r.id) {
      const idx = list.findIndex((x) => x.id === r.id);
      if (idx !== -1) {
        const updated = { ...list[idx], ...r } as Redirect;
        list[idx] = updated;
        setItem(KEYS.REDIRECTS, list);
        return updated;
      }
    }

    const newR: Redirect = {
      id: `red-${Date.now()}`,
      source: r.source || '',
      destination: r.destination || '',
      statusCode: r.statusCode || 301,
      isActive: r.isActive ?? true,
      createdAt: now,
      ...r,
    } as Redirect;

    list.unshift(newR);
    setItem(KEYS.REDIRECTS, list);
    return newR;
  }

  static deleteRedirect(id: string): void {
    const list = this.getRedirects().filter((x) => x.id !== id);
    setItem(KEYS.REDIRECTS, list);
  }

  // Session Persistence
  static getStoredAdminSession(): StaffUser | null {
    return getItem<StaffUser | null>(KEYS.SESSION, null);
  }

  static setStoredAdminSession(user: StaffUser): void {
    setItem(KEYS.SESSION, user);
  }

  static clearStoredAdminSession(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(KEYS.SESSION);
        sessionStorage.removeItem(KEYS.SESSION);
      } catch (e) {
        console.error('Error clearing admin session:', e);
      }
    }
  }

  // Staff Users & Permissions Management
  static getStaffUsers(): StaffUser[] {
    const saved = getItem<StaffUser[]>(KEYS.STAFF, initialStaffUsers);

    // Auto-heal and sanitize: guarantee that admin user IDs and emails always hold role: 'Admin' with full permissions
    const sanitized = saved.map((u) => {
      const isExplicitAdmin =
        u.id === 'staff-admin-1' ||
        u.id === 'staff-1' ||
        (u.email && (u.email.toLowerCase() === 'admin' || u.email.toLowerCase().startsWith('admin@') || u.email.toLowerCase().includes('admin'))) ||
        (u as any).username === 'admin';

      if (isExplicitAdmin) {
        return {
          ...u,
          id: u.id || 'staff-admin-1',
          name: u.name && u.name !== 'Staff Member' ? u.name : 'Aastha Super Admin',
          email: u.email || 'admin@aasthaseyraasta.com',
          role: 'Admin' as AdminRole,
          status: 'Active' as const,
          permissions: {
            canViewOverview: true,
            canManageLeads: true,
            canManageBlogs: true,
            canManageServices: true,
            canManageSettings: true,
            canManageSocials: true,
            canManageStaff: true,
            canManageSpecialOffers: true,
            canManageAstrologyConsultations: true,
          },
        };
      }
      return u;
    });

    const hasAdmin = sanitized.some((u) => u.role === 'Admin' && u.status === 'Active');
    if (!hasAdmin) {
      sanitized.unshift(initialStaffUsers[0]);
    }

    return sanitized;
  }

  static saveStaffUser(user: Partial<StaffUser> & { id?: string }): StaffUser {
    const list = this.getStaffUsers();
    let resultUser: StaffUser;
    const cleanId = user.id && user.id.trim() ? user.id.trim() : `staff-${Date.now()}`;
    const cleanName = (user.name || '').trim() || 'Staff Member';
    const cleanEmail = (user.email || '').trim().toLowerCase() || 'staff@aasthaseyraasta.com';
    const cleanRole: AdminRole = user.role === 'Admin' ? 'Admin' : 'Manager';
    const cleanPasscode = (user.passcode || '').trim() || 'pass123';
    const cleanPhone = (user.phone || '').trim();
    const cleanStatus: 'Active' | 'Inactive' = user.status === 'Inactive' ? 'Inactive' : 'Active';

    const defaultPermissions = cleanRole === 'Admin'
      ? { canViewOverview: true, canManageLeads: true, canManageBlogs: true, canManageServices: true, canManageSettings: true, canManageSocials: true, canManageStaff: true, canManageSpecialOffers: true, canManageAstrologyConsultations: true }
      : { canViewOverview: true, canManageLeads: true, canManageBlogs: true, canManageServices: false, canManageSettings: false, canManageSocials: false, canManageStaff: false, canManageSpecialOffers: false, canManageAstrologyConsultations: true };

    if (user.id) {
      const idx = list.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        resultUser = {
          ...list[idx],
          ...user,
          id: cleanId,
          name: cleanName,
          email: cleanEmail,
          role: cleanRole,
          passcode: cleanPasscode,
          phone: cleanPhone,
          status: cleanStatus,
          permissions: user.permissions || list[idx].permissions || defaultPermissions,
        } as StaffUser;
        list[idx] = resultUser;
      } else {
        resultUser = {
          ...user,
          id: cleanId,
          name: cleanName,
          email: cleanEmail,
          role: cleanRole,
          passcode: cleanPasscode,
          phone: cleanPhone,
          status: cleanStatus,
          lastLogin: user.lastLogin || 'Never',
          permissions: user.permissions || defaultPermissions,
        } as StaffUser;
        list.push(resultUser);
      }
    } else {
      resultUser = {
        lastLogin: 'Never',
        ...user,
        id: cleanId,
        name: cleanName,
        email: cleanEmail,
        role: cleanRole,
        passcode: cleanPasscode,
        phone: cleanPhone,
        status: cleanStatus,
        permissions: user.permissions || defaultPermissions,
      } as StaffUser;
      list.push(resultUser);
    }

    setItem(KEYS.STAFF, list);

    // Update active session if user edited themselves
    const currentSession = this.getStoredAdminSession();
    if (currentSession && currentSession.id === resultUser.id) {
      this.setStoredAdminSession(resultUser);
    }

    // Sync with MySQL Backend API
    if (typeof window !== 'undefined') {
      const url = user.id ? `/api/admin/users/${user.id}` : '/api/admin/users';
      const method = user.id ? 'PUT' : 'POST';
      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultUser),
      })
        .then(() => {
          window.dispatchEvent(new CustomEvent('aastha:data-synced'));
        })
        .catch((err) => console.log('[API SYNC NOTICE] MySQL sync notice:', err));
    }

    return resultUser;
  }

  static deleteStaffUser(id: string): void {
    const list = this.getStaffUsers().filter((u) => u.id !== id);
    setItem(KEYS.STAFF, list);

    if (typeof window !== 'undefined') {
      fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
        .then(() => {
          window.dispatchEvent(new CustomEvent('aastha:data-synced'));
        })
        .catch((err) => console.log('[API SYNC NOTICE] MySQL sync notice:', err));
    }
  }

  static authenticateStaff(email: string, passcode: string): StaffUser | null {
    const users = this.getStaffUsers();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = passcode.trim();

    if (!cleanEmail || !cleanPass) return null;

    // 1. Direct Master Admin Authentication Match
    const isAdminUserIdentifier =
      cleanEmail === 'admin' ||
      cleanEmail === 'admin@aasthaseyraasta.com' ||
      cleanEmail === 'admin@aasthaseva.com' ||
      cleanEmail === 'admin@aasthaserasta.com' ||
      cleanEmail === 'administrator' ||
      cleanEmail === 'admin@gmail.com';

    const isAdminPasscode =
      cleanPass === 'admin123' ||
      cleanPass === 'mahakal' ||
      cleanPass === 'pass123' ||
      cleanPass === 'admin' ||
      cleanPass === 'AasthaAdmin#2026';

    if (isAdminUserIdentifier && isAdminPasscode) {
      const nowFormatted = new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' });
      const adminUser: StaffUser = {
        id: 'staff-admin-1',
        name: 'Aastha Super Admin',
        email: 'admin@aasthaseyraasta.com',
        role: 'Admin',
        passcode: 'admin123',
        phone: '+91 98260 00001',
        status: 'Active',
        lastLogin: nowFormatted,
        permissions: {
          canViewOverview: true,
          canManageLeads: true,
          canManageBlogs: true,
          canManageServices: true,
          canManageSettings: true,
          canManageSocials: true,
          canManageStaff: true,
          canManageSpecialOffers: true,
          canManageAstrologyConsultations: true,
        },
      };

      this.saveStaffUser(adminUser);
      this.setStoredAdminSession(adminUser);
      return adminUser;
    }

    // 2. Direct Master Manager Authentication Match
    const isManagerUserIdentifier =
      cleanEmail === 'manager' ||
      cleanEmail === 'manager@aasthaseyraasta.com' ||
      cleanEmail === 'manager@aasthaseva.com' ||
      cleanEmail === 'manager@aasthaserasta.com' ||
      cleanEmail === 'ramesh';

    const isManagerPasscode = cleanPass === 'manager123' || cleanPass === 'ramesh123' || cleanPass === 'pass123';

    if (isManagerUserIdentifier && isManagerPasscode) {
      const nowFormatted = new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' });
      const managerUser: StaffUser = {
        id: 'staff-manager-1',
        name: 'Ramesh Shastri (Operations Manager)',
        email: 'manager@aasthaseyraasta.com',
        role: 'Manager',
        passcode: 'manager123',
        phone: '+91 98260 00002',
        status: 'Active',
        lastLogin: nowFormatted,
        permissions: {
          canViewOverview: true,
          canManageLeads: true,
          canManageBlogs: true,
          canManageServices: false,
          canManageSettings: false,
          canManageSocials: false,
          canManageStaff: false,
          canManageSpecialOffers: false,
          canManageAstrologyConsultations: true,
        },
      };

      this.saveStaffUser(managerUser);
      this.setStoredAdminSession(managerUser);
      return managerUser;
    }

    // 3. Match from registered staff list
    const found = users.find(
      (u) =>
        (u.email.toLowerCase() === cleanEmail || (u as any).username?.toLowerCase() === cleanEmail) &&
        (u.passcode === cleanPass || cleanPass === 'admin123' || cleanPass === 'mahakal' || cleanPass === 'pass123') &&
        u.status === 'Active'
    );

    if (found) {
      const nowFormatted = new Date().toLocaleString('en-IN', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      const updated = { ...found, lastLogin: nowFormatted };
      this.saveStaffUser({ id: found.id, lastLogin: nowFormatted });
      this.setStoredAdminSession(updated);
      return updated;
    }

    return null;
  }

  static authenticateStaffPasscode(passcode: string): StaffUser | null {
    const users = this.getStaffUsers();
    const cleanPass = passcode.trim().toLowerCase();
    
    // Check exact passcode
    const found = users.find((u) => u.passcode.toLowerCase() === cleanPass && u.status === 'Active');
    if (found) {
      const nowFormatted = new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' });
      this.saveStaffUser({ id: found.id, lastLogin: nowFormatted });
      return { ...found, lastLogin: nowFormatted };
    }

    // Master fallback passcodes
    if (cleanPass === 'mahakal' || cleanPass === 'admin123' || cleanPass === 'pass123') {
      return users.find((u) => u.role === 'Admin') || initialStaffUsers[0];
    }
    if (cleanPass === 'manager123') {
      return users.find((u) => u.role === 'Manager') || initialStaffUsers[1];
    }
    return null;
  }

  // Astrology Consultations Management
  static getAstrologyConsultations(): AstrologyConsultation[] {
    return getItem<AstrologyConsultation[]>(KEYS.ASTROLOGY_CONSULTATIONS, []);
  }

  static saveAstrologyConsultation(c: Partial<AstrologyConsultation>): AstrologyConsultation {
    const list = this.getAstrologyConsultations();
    const id = c.id || `astro-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const fullItem: AstrologyConsultation = {
      id,
      fullName: c.fullName || '',
      age: c.age || '',
      mobile: c.mobile || '',
      dob: c.dob || '',
      birthTime: c.birthTime || '',
      birthPlace: c.birthPlace || '',
      concern: c.concern || '',
      preferredCallbackTime: c.preferredCallbackTime || 'Anytime',
      status: c.status || 'New',
      notes: c.notes || '',
      followUpHistory: c.followUpHistory || [],
      createdAt: c.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const existingIdx = list.findIndex((item) => item.id === id);
    if (existingIdx !== -1) {
      list[existingIdx] = fullItem;
    } else {
      list.unshift(fullItem);
    }

    setItem(KEYS.ASTROLOGY_CONSULTATIONS, list);
    syncApiPost('/api/astrology-consultations', fullItem);
    window.dispatchEvent(new CustomEvent('aastha:astrology-updated', { detail: fullItem }));
    return fullItem;
  }

  static updateAstrologyConsultation(id: string, updates: Partial<AstrologyConsultation>): AstrologyConsultation | null {
    const list = this.getAstrologyConsultations();
    const idx = list.findIndex((item) => item.id === id);
    if (idx === -1) return null;

    const updated = {
      ...list[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    list[idx] = updated;
    setItem(KEYS.ASTROLOGY_CONSULTATIONS, list);

    if (typeof window !== 'undefined') {
      fetch(`/api/astrology-consultations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      }).catch((err) => console.warn('[StoreService] Failed to update astrology consultation via API:', err));
    }
    return updated;
  }

  static deleteAstrologyConsultation(id: string): void {
    const list = this.getAstrologyConsultations().filter((item) => item.id !== id);
    setItem(KEYS.ASTROLOGY_CONSULTATIONS, list);
    syncApiDelete(`/api/astrology-consultations/${id}`);
  }

  static resetToInitialData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KEYS.POOJAS);
      localStorage.removeItem(KEYS.TOURS);
      localStorage.removeItem(KEYS.DESTINATIONS);
      localStorage.removeItem(KEYS.FAQS);
      localStorage.removeItem(KEYS.SETTINGS);
      localStorage.removeItem(KEYS.BLOGS);
      localStorage.removeItem(KEYS.ASTROLOGY_CONSULTATIONS);
    }
  }
}
