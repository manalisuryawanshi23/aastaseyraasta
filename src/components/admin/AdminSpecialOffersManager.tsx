import React, { useState, useEffect } from 'react';
import { StoreService } from '../../services/store';
import { SiteSettings } from '../../types';
import { SpecialOfferMarquee } from '../SpecialOfferMarquee';
import {
  Megaphone,
  Eye,
  Power,
  Save,
  CheckCircle2,
  Sliders,
  Sparkles,
  Link as LinkIcon,
  Palette,
  Clock,
  HelpCircle,
  Flame,
} from 'lucide-react';

export const AdminSpecialOffersManager: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(() =>
    StoreService.getSettings()
  );
  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleSync = () => {
      setSettings(StoreService.getSettings());
    };
    window.addEventListener('aastha:data-synced', handleSync);
    return () => window.removeEventListener('aastha:data-synced', handleSync);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      StoreService.updateSettings(settings);
      showToast('Special Offer Marquee settings updated and published successfully!');
    } catch (err) {
      alert('Failed to save settings: ' + String(err));
    }
    setIsSaving(false);
  };

  const banner = settings.announcementBanner || {
    text: '🚩 SPECIAL OFFER: 15% OFF on Mahakaleshwar Rudrabhishek Pooja & Spiritual Tours!',
    secondaryText: '🕉️ Free Gotra Sankalp & Prasad Delivery Included',
    link: '/pooja-services',
    buttonText: 'Claim Offer',
    badgeText: 'SPECIAL OFFER',
    isActive: true,
    isMarquee: true,
    speed: 'medium' as const,
    themeColor: 'amber' as const,
    pauseOnHover: true,
  };

  const updateBanner = (updates: Partial<typeof banner>) => {
    setSettings((prev) => ({
      ...prev,
      announcementBanner: {
        ...banner,
        ...updates,
      },
    }));
  };

  return (
    <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-fade-in text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2.5">
            <Megaphone className="w-6 h-6 text-amber-700 dark:text-amber-500" />
            <span>Top Navigation Offer Marquee (Special Offers)</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Configure the real-time top-scrolling promotional marquee displayed across every page header. Control offer copy, badge tags, redirection targets, speed, and visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSave()}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all shrink-0 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save & Publish Live'}</span>
        </button>
      </div>

      {/* ── LIVE INTERACTIVE PREVIEW ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Live Website Banner Preview</span>
          </span>
          <div>
            {banner.isActive ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>LIVE ON PUBLIC SITE</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-700">
                <span>OFFLINE (HIDDEN)</span>
              </span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-amber-400/60 dark:border-amber-700/60 overflow-hidden shadow-lg bg-stone-950">
          <SpecialOfferMarquee
            banner={banner}
            isAdminPreview={true}
          />
        </div>
        <p className="text-[11px] text-stone-500 dark:text-stone-400 italic px-1">
          * This preview shows the exact live visual rendering and animation speed that devotees see on the live website.
        </p>
      </div>

      {/* ── SETTINGS FORM ── */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Master Active Switch Card */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60">
          <div className="space-y-1">
            <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Power className={`w-5 h-5 ${banner.isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`} />
              <span>Marquee Display Status</span>
            </span>
            <p className="text-xs text-stone-600 dark:text-stone-350">
              When switched <strong>ON</strong>, the marquee scrolls continuously at the very top of all website pages. Switch <strong>OFF</strong> during standard operating periods without any promotions.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={banner.isActive ?? true}
              onChange={(e) => updateBanner({ isActive: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[4px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all dark:peer-focus:ring-amber-800 peer-checked:bg-amber-600"></div>
          </label>
        </div>

        {/* Offer Content Fields Grid */}
        <div className="bg-stone-50/70 dark:bg-stone-900/50 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-5">
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Marquee Promotional Content</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            
            {/* Primary Text */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="block font-bold text-stone-800 dark:text-stone-200">
                Primary Special Offer Headline *
              </label>
              <input
                type="text"
                required
                value={banner.text || ''}
                onChange={(e) => updateBanner({ text: e.target.value })}
                placeholder="🚩 SPECIAL OFFER: 15% OFF on Mahakaleshwar Rudrabhishek Pooja & Spiritual Tours!"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <p className="text-[11px] text-stone-500">The main prominent sentence shown on each scrolling loop.</p>
            </div>

            {/* Secondary Text */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="block font-bold text-stone-800 dark:text-stone-200">
                Secondary Subtext / Perks Tagline
              </label>
              <input
                type="text"
                value={banner.secondaryText || ''}
                onChange={(e) => updateBanner({ secondaryText: e.target.value })}
                placeholder="🕉️ Free Gotra Sankalp & Prasad Delivery Included • 🛺 VIP Transport"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <p className="text-[11px] text-stone-500">Additional benefits, festive greetings, or perks displayed alongside the headline.</p>
            </div>

            {/* Badge Text */}
            <div className="space-y-1.5">
              <label className="block font-bold text-stone-800 dark:text-stone-200">
                Offer Badge Tag
              </label>
              <input
                type="text"
                value={banner.badgeText || ''}
                onChange={(e) => updateBanner({ badgeText: e.target.value })}
                placeholder="SPECIAL OFFER / SHRAVAN OFFER"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-bold uppercase focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            {/* Button Text */}
            <div className="space-y-1.5">
              <label className="block font-bold text-stone-800 dark:text-stone-200">
                Call to Action Button Label
              </label>
              <input
                type="text"
                value={banner.buttonText || ''}
                onChange={(e) => updateBanner({ buttonText: e.target.value })}
                placeholder="Claim Offer / Book Now"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            {/* Target Link */}
            <div className="space-y-1.5">
              <label className="block font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>Target Offer Redirection URL</span>
              </label>
              <select
                value={banner.link || '/pooja-services'}
                onChange={(e) => updateBanner({ link: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="/pooja-services">Pooja Services Page (/pooja-services)</option>
                <option value="/spiritual-tours">Spiritual Tours Page (/spiritual-tours)</option>
                <option value="/destinations">Destinations Page (/destinations)</option>
                <option value="/contact">Contact & Devotee Enquiry (/contact)</option>
                <option value="/blog">Spiritual Blog (/blog)</option>
              </select>
            </div>

            {/* Scroll Speed */}
            <div className="space-y-1.5">
              <label className="block font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Marquee Scroll Speed</span>
              </label>
              <select
                value={banner.speed || 'medium'}
                onChange={(e) => updateBanner({ speed: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="slow">Slow (40s animation loop) - Easy to read long text</option>
                <option value="medium">Medium (25s animation loop) - Recommended standard</option>
                <option value="fast">Fast (15s animation loop) - High energy announcement</option>
              </select>
            </div>
          </div>
        </div>

        {/* Behavior & Theme Options */}
        <div className="bg-stone-50/70 dark:bg-stone-900/50 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4 text-xs">
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>Interaction & Animation Behavior</span>
          </h3>

          <div className="flex items-center gap-3 bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800">
            <input
              type="checkbox"
              id="pauseOnHoverToggle"
              checked={banner.pauseOnHover ?? true}
              onChange={(e) => updateBanner({ pauseOnHover: e.target.checked })}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="pauseOnHoverToggle" className="cursor-pointer">
              <span className="font-bold text-stone-800 dark:text-stone-200 block">Pause scrolling when user hovers or taps banner</span>
              <span className="text-[11px] text-stone-500 block">Enables devotees to easily read the offer text and click the action button without it moving away.</span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
          <p className="text-xs text-stone-500 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Changes will reflect immediately across all active user sessions upon saving.</span>
          </p>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save & Publish Offer Marquee'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
