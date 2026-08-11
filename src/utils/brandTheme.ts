import { BrandColorPalette } from '../types';

export const DEFAULT_BRAND_PALETTE: BrandColorPalette = {
  primary: '#b45309',        // amber-700
  primaryHover: '#92400e',   // amber-800
  secondary: '#78350f',      // amber-900
  accent: '#d97706',         // amber-600
  headerBg: '#451a03',       // amber-950
  heroGradientStart: '#451a03',
  heroGradientEnd: '#1c1917',
  presetName: 'Sacred Saffron (Default)',
};

export const BRAND_PRESETS: { name: string; palette: BrandColorPalette; description: string }[] = [
  {
    name: 'Sacred Saffron (Default)',
    description: 'Traditional Saffron & Amber tones inspired by Mahakal Sindoor & Gold',
    palette: {
      primary: '#b45309',
      primaryHover: '#92400e',
      secondary: '#78350f',
      accent: '#d97706',
      headerBg: '#451a03',
      heroGradientStart: '#451a03',
      heroGradientEnd: '#1c1917',
      presetName: 'Sacred Saffron (Default)',
    },
  },
  {
    name: 'Vedic Gold',
    description: 'Rich Temple Gold & Marigold Yellow palette for royal spiritual elegance',
    palette: {
      primary: '#d97706',
      primaryHover: '#b45309',
      secondary: '#92400e',
      accent: '#f59e0b',
      headerBg: '#78350f',
      heroGradientStart: '#78350f',
      heroGradientEnd: '#1c1917',
      presetName: 'Vedic Gold',
    },
  },
  {
    name: 'Holy Vermilion (Sindoor Red)',
    description: 'Vibrant Vermilion & Deep Maroon for auspicious rituals & havan sanctums',
    palette: {
      primary: '#c2410c',
      primaryHover: '#9a3412',
      secondary: '#7c2d12',
      accent: '#ea580c',
      headerBg: '#431407',
      heroGradientStart: '#431407',
      heroGradientEnd: '#18181b',
      presetName: 'Holy Vermilion (Sindoor Red)',
    },
  },
  {
    name: 'Royal Marigold',
    description: 'Warm, luminous yellow-orange tones reminiscent of fresh puja marigold garlands',
    palette: {
      primary: '#ca8a04',
      primaryHover: '#a16207',
      secondary: '#713f12',
      accent: '#eab308',
      headerBg: '#422006',
      heroGradientStart: '#422006',
      heroGradientEnd: '#1c1917',
      presetName: 'Royal Marigold',
    },
  },
  {
    name: 'Deep Mahakal Bronze',
    description: 'Mystic dark bronze & earthy ochre suited for Mahakaleshwar Jyotirlinga theme',
    palette: {
      primary: '#854d0e',
      primaryHover: '#713f12',
      secondary: '#54310d',
      accent: '#a16207',
      headerBg: '#361e08',
      heroGradientStart: '#361e08',
      heroGradientEnd: '#0c0a09',
      presetName: 'Deep Mahakal Bronze',
    },
  },
  {
    name: 'Emerald Sanctum',
    description: 'Serene sacred forest & tulsi green palette for peaceful pilgrimage vibes',
    palette: {
      primary: '#047857',
      primaryHover: '#065f46',
      secondary: '#064e3b',
      accent: '#059669',
      headerBg: '#022c22',
      heroGradientStart: '#022c22',
      heroGradientEnd: '#09090b',
      presetName: 'Emerald Sanctum',
    },
  },
];

export function applyBrandColorPalette(palette?: BrandColorPalette) {
  if (typeof document === 'undefined') return;
  const p = palette || DEFAULT_BRAND_PALETTE;

  const root = document.documentElement;
  root.style.setProperty('--brand-primary', p.primary || DEFAULT_BRAND_PALETTE.primary);
  root.style.setProperty('--brand-primary-hover', p.primaryHover || DEFAULT_BRAND_PALETTE.primaryHover);
  root.style.setProperty('--brand-secondary', p.secondary || DEFAULT_BRAND_PALETTE.secondary);
  root.style.setProperty('--brand-accent', p.accent || DEFAULT_BRAND_PALETTE.accent);
  root.style.setProperty('--brand-header-bg', p.headerBg || DEFAULT_BRAND_PALETTE.headerBg);
  root.style.setProperty('--brand-gradient-start', p.heroGradientStart || DEFAULT_BRAND_PALETTE.heroGradientStart);
  root.style.setProperty('--brand-gradient-end', p.heroGradientEnd || DEFAULT_BRAND_PALETTE.heroGradientEnd);

  // Dispatch custom window event for real-time reactive UI updates
  window.dispatchEvent(new CustomEvent('aastha_brand_color_updated', { detail: p }));
}
