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
  FAQS: 'aastha_faqs',
  SETTINGS: 'aastha_settings',
  GALLERY: 'aastha_gallery',
  TESTIMONIALS: 'aastha_testimonials',
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
  window.dispatchEvent(new CustomEvent('aastha:data-synced'));
}

export function useApiSync() {
  useEffect(() => {
    let cancelled = false;

    async function syncAll() {
      let anyUpdated = false;

      // Sync poojas
      const poojaOk = await fetchAndCache('/api/poojas', KEYS.POOJAS);
      if (poojaOk) anyUpdated = true;

      // Sync tours
      const tourOk = await fetchAndCache('/api/tours', KEYS.TOURS);
      if (tourOk) anyUpdated = true;

      // Sync destinations
      const destOk = await fetchAndCache('/api/destinations', KEYS.DESTINATIONS);
      if (destOk) anyUpdated = true;

      // Sync FAQs
      const faqOk = await fetchAndCache('/api/faqs', KEYS.FAQS);
      if (faqOk) anyUpdated = true;

      // Sync site settings
      const settingsOk = await fetchAndCache('/api/settings', KEYS.SETTINGS);
      if (settingsOk) anyUpdated = true;

      // Sync gallery
      const galleryOk = await fetchAndCache('/api/gallery', KEYS.GALLERY);
      if (galleryOk) anyUpdated = true;

      // Sync testimonials
      const testimonialsOk = await fetchAndCache('/api/testimonials', KEYS.TESTIMONIALS);
      if (testimonialsOk) anyUpdated = true;

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
