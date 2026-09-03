/**
 * useApiSync — Fetches live data from the MySQL API and syncs it into
 * localStorage so that StoreService.getPoojas() / getTours() etc. always
 * returns up-to-date database content, NOT stale initialData.ts defaults.
 *
 * Called ONCE at App root on mount. Every page automatically picks up the
 * fresh data because they read from localStorage via StoreService.
 */

import { useEffect } from 'react';

const KEYS = {
  POOJAS: 'aastha_poojas',
  TOURS: 'aastha_tours',
  DESTINATIONS: 'aastha_destinations',
  BLOGS: 'aastha_blogs',
  FAQS: 'aastha_faqs',
  SETTINGS: 'aastha_settings',
  GALLERY: 'aastha_gallery',
  DARSHAN: 'aastha_darshan_items',
  TESTIMONIALS: 'aastha_testimonials',
  LEADS: 'aastha_leads',
  STAFF: 'aastha_staff',
  ASTROLOGY_CONSULTATIONS: 'aastha_astrology_consultations',
};

const API_BASE = ''; // same origin — Vite proxies to Express on :3001

async function fetchAndCache(endpoint: string, storageKey: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) return false;
    const json = await res.json();

    // API returns { success: true, data: [...] } or { success: true, data: {...} }
    if (json.success && json.data !== undefined) {
      localStorage.setItem(storageKey, JSON.stringify(json.data));
      return true;
    }
  } catch (err) {
    console.warn(`[ApiSync] Could not fetch ${endpoint}:`, err);
  }
  return false;
}

/**
 * Force a full page re-render after sync by dispatching a custom event.
 * Pages that subscribe to window events (or are on React re-render cycle)
 * will pick up localStorage changes.
 */
function dispatchSyncEvent() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('aastha:data-synced'));
  }
}

export function useApiSync() {
  useEffect(() => {
    let cancelled = false;

    async function syncAll() {
      let anyUpdated = false;

      // 1. Sync poojas
      const poojaOk = await fetchAndCache('/api/poojas', KEYS.POOJAS);
      if (poojaOk) anyUpdated = true;

      // 2. Sync tours
      const tourOk = await fetchAndCache('/api/tours', KEYS.TOURS);
      if (tourOk) anyUpdated = true;

      // 3. Sync destinations
      const destOk = await fetchAndCache('/api/destinations', KEYS.DESTINATIONS);
      if (destOk) anyUpdated = true;

      // 4. Sync blogs
      const blogOk = await fetchAndCache('/api/blogs', KEYS.BLOGS);
      if (blogOk) anyUpdated = true;

      // 5. Sync FAQs
      const faqOk = await fetchAndCache('/api/faqs', KEYS.FAQS);
      if (faqOk) anyUpdated = true;

      // 6. Sync site settings
      const settingsOk = await fetchAndCache('/api/settings', KEYS.SETTINGS);
      if (settingsOk) anyUpdated = true;

      // 7. Sync gallery
      const galleryOk = await fetchAndCache('/api/gallery', KEYS.GALLERY);
      if (galleryOk) anyUpdated = true;

      // 7b. Sync dedicated darshan items
      const darshanOk = await fetchAndCache('/api/darshan', KEYS.DARSHAN);
      if (darshanOk) anyUpdated = true;

      // 8. Sync testimonials
      const testimonialsOk = await fetchAndCache('/api/testimonials', KEYS.TESTIMONIALS);
      if (testimonialsOk) anyUpdated = true;

      // 9. Sync staff users
      const staffOk = await fetchAndCache('/api/admin/users', KEYS.STAFF);
      if (staffOk) anyUpdated = true;

      // 10. Sync devotee leads
      const leadsOk = await fetchAndCache('/api/leads', KEYS.LEADS);
      if (leadsOk) anyUpdated = true;

      // 11. Sync astrology consultations
      const astroOk = await fetchAndCache('/api/astrology-consultations', KEYS.ASTROLOGY_CONSULTATIONS);
      if (astroOk) anyUpdated = true;

      if (!cancelled && anyUpdated) {
        dispatchSyncEvent();
      }
    }

    syncAll();

    return () => {
      cancelled = true;
    };
  }, []);
}
