import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { StoreService } from '../../services/store';
import { AdminBrandColorPicker } from './AdminBrandColorPicker';
import { SpecialOfferMarquee } from '../SpecialOfferMarquee';
import {
  Save,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Megaphone,
  Award,
  BookOpen,
  Palette,
  Sparkles,
  Sliders,
  Eye,
  Power,
} from 'lucide-react';

export const AdminInformativeDetails: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(StoreService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    StoreService.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-8 max-w-4xl">
      
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">
            Website Informative Details & Configuration
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Modify business credentials, helpline numbers, address, site banners, and trust statistics.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="py-2.5 px-6 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs shadow-md transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>All site informative details updated and persisted!</span>
        </div>
      )}

      {/* SECTION 1: GLOBAL BRAND COLOR PALETTE PICKER */}
      <div className="space-y-4">
        <AdminBrandColorPicker />
      </div>

      {/* SECTION 2: Business Identity */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <Building2 className="w-4 h-4 text-amber-700" />
          <span>1. Business Identity & Tagline</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Business Name (English)</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Hindi Name</label>
            <input
              type="text"
              value={settings.hindiBusinessName}
              onChange={(e) => setSettings({ ...settings, hindiBusinessName: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-serif"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Logo Header Text</label>
            <input
              type="text"
              value={settings.logoText}
              onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Direct Contact Numbers & Helplines */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <Phone className="w-4 h-4 text-amber-700" />
          <span>2. Direct Phone Numbers & Spiritual Helplines</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Primary Phone 1</label>
            <input
              type="text"
              value={settings.phone1}
              onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Secondary Phone 2</label>
            <input
              type="text"
              value={settings.phone2}
              onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">WhatsApp Support Number (Without + or spaces)</label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              placeholder="919111099799"
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Emergency Spiritual Hotline</label>
            <input
              type="text"
              value={settings.emergencyHelpline || ''}
              onChange={(e) => setSettings({ ...settings, emergencyHelpline: e.target.value })}
              placeholder="+91 9111099799"
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Official Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Office Address & Timing Notice */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <MapPin className="w-4 h-4 text-amber-700" />
          <span>3. Physical Address & Operating Hours</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Street Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">City</label>
            <input
              type="text"
              value={settings.city}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">State & Pincode</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settings.state}
                onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                className="w-2/3 p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
              />
              <input
                type="text"
                value={settings.pincode}
                onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                className="w-1/3 p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Operating Hours / Temple Timing Notice</label>
            <input
              type="text"
              value={settings.businessHours}
              onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Top Scrolling Marquee Offer Manager */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-amber-700" />
            <span>4. Top Navigation Offer Marquee (Special Pooja & Tour Offers)</span>
          </h3>
          <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
            Live Marquee Control
          </span>
        </div>

        {/* Live Admin Interactive Marquee Preview */}
        <div className="rounded-xl border border-amber-300 dark:border-amber-800/60 overflow-hidden bg-stone-900 shadow-sm space-y-1">
          <div className="bg-stone-950 px-3 py-1.5 flex items-center justify-between text-[11px] text-stone-300 border-b border-stone-800">
            <span className="flex items-center gap-1.5 font-mono font-bold text-amber-400">
              <Eye className="w-3.5 h-3.5" />
              <span>LIVE WEBSITE MARQUEE PREVIEW</span>
            </span>
            <span className="text-[10px] text-stone-400">
              {settings.announcementBanner?.isActive ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Status: ACTIVE ON WEBSITE
                </span>
              ) : (
                <span className="text-red-400 font-semibold">Status: DISABLED BY ADMIN</span>
              )}
            </span>
          </div>
          
          <SpecialOfferMarquee
            banner={settings.announcementBanner}
            isAdminPreview={true}
          />
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 space-y-5 text-xs">
          
          {/* Main Toggle Switch */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2">
                <Power className={`w-4 h-4 ${settings.announcementBanner?.isActive ? 'text-emerald-600' : 'text-stone-400'}`} />
                <span>Enable Top Scrolling Offer Marquee</span>
              </span>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                Toggle ON to showcase special discount offers across all site pages. Toggle OFF anytime to stop displaying.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.announcementBanner?.isActive ?? true}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      text: settings.announcementBanner?.text || '🚩 SPECIAL OFFER: 15% OFF on Mahakaleshwar Rudrabhishek Pooja & Spiritual Tours!',
                      secondaryText: settings.announcementBanner?.secondaryText || '🕉️ Free Gotra Sankalp & Prasad Delivery Included',
                      link: settings.announcementBanner?.link || '/pooja-services',
                      buttonText: settings.announcementBanner?.buttonText || 'Claim Offer',
                      badgeText: settings.announcementBanner?.badgeText || 'SPECIAL OFFER',
                      isActive: e.target.checked,
                      isMarquee: settings.announcementBanner?.isMarquee ?? true,
                      speed: settings.announcementBanner?.speed || 'medium',
                      themeColor: settings.announcementBanner?.themeColor || 'amber',
                      pauseOnHover: settings.announcementBanner?.pauseOnHover ?? true,
                    },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-focus:ring-amber-800 peer-checked:bg-amber-600"></div>
            </label>
          </div>

          {/* Marquee Configuration Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Primary Offer Heading */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1">
                Primary Special Offer Text
              </label>
              <input
                type="text"
                value={settings.announcementBanner?.text || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      ...settings.announcementBanner,
                      text: e.target.value,
                      isActive: settings.announcementBanner?.isActive ?? true,
                    },
                  })
                }
                placeholder="🚩 SPECIAL OFFER: 15% OFF on Mahakaleshwar Rudrabhishek & Char Dham Tours!"
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
              />
            </div>

            {/* Secondary Subtext */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1">
                Secondary Subtext / Perks
              </label>
              <input
                type="text"
                value={settings.announcementBanner?.secondaryText || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      ...settings.announcementBanner,
                      secondaryText: e.target.value,
                      isActive: settings.announcementBanner?.isActive ?? true,
                    },
                  })
                }
                placeholder="🕉️ Free Gotra Sankalp & Prasad Delivery Included • 🛺 VIP Transport"
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
              />
            </div>

            {/* Highlight Badge Text */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1">
                Badge Label
              </label>
              <input
                type="text"
                value={settings.announcementBanner?.badgeText || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      ...settings.announcementBanner,
                      badgeText: e.target.value,
                      isActive: settings.announcementBanner?.isActive ?? true,
                    },
                  })
                }
                placeholder="SPECIAL OFFER / SAWAN DISCOUNT"
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 uppercase"
              />
            </div>

            {/* Button Label */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={settings.announcementBanner?.buttonText || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      ...settings.announcementBanner,
                      buttonText: e.target.value,
                      isActive: settings.announcementBanner?.isActive ?? true,
                    },
                  })
                }
                placeholder="Claim Offer / Book Pooja"
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
              />
            </div>

            {/* Destination Link */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1">
                Target Offer Page Link
              </label>
              <select
                value={settings.announcementBanner?.link || '/pooja-services'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      ...settings.announcementBanner,
                      link: e.target.value,
                      isActive: settings.announcementBanner?.isActive ?? true,
                    },
                  })
                }
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
              >
                <option value="/pooja-services">Pooja Services Page (/pooja-services)</option>
                <option value="/spiritual-tours">Spiritual Tours Page (/spiritual-tours)</option>
                <option value="/destinations">Destinations Page (/destinations)</option>
                <option value="/contact">Contact & Enquiry (/contact)</option>
              </select>
            </div>

            {/* Scrolling Speed */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1">
                Marquee Scroll Speed
              </label>
              <select
                value={settings.announcementBanner?.speed || 'medium'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      ...settings.announcementBanner,
                      speed: e.target.value as 'slow' | 'medium' | 'fast',
                      isActive: settings.announcementBanner?.isActive ?? true,
                    },
                  })
                }
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
              >
                <option value="slow">Slow (40s loop) - Ideal for detailed text</option>
                <option value="medium">Medium (25s loop) - Standard smooth scroll</option>
                <option value="fast">Fast (15s loop) - High energy announcement</option>
              </select>
            </div>

            {/* Banner Theme Color */}
            <div>
              <label className="block font-semibold text-stone-800 dark:text-stone-200 mb-1">
                Color Theme
              </label>
              <select
                value={settings.announcementBanner?.themeColor || 'amber'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      ...settings.announcementBanner,
                      themeColor: e.target.value as any,
                      isActive: settings.announcementBanner?.isActive ?? true,
                    },
                  })
                }
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
              >
                <option value="amber">Golden Saffron (Festive & Sacred)</option>
                <option value="red">Deep Crimson (Ujjain Temple Red)</option>
                <option value="emerald">Emerald Sacred Green</option>
                <option value="purple">Royal Vedic Purple</option>
                <option value="dark">Charcoal Black & Gold</option>
              </select>
            </div>

            {/* Display Mode & Pause on Hover */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                Continuous Scrolling (Marquee Mode)
              </span>
              <input
                type="checkbox"
                checked={settings.announcementBanner?.isMarquee ?? true}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      ...settings.announcementBanner,
                      isMarquee: e.target.checked,
                      isActive: settings.announcementBanner?.isActive ?? true,
                    },
                  })
                }
                className="w-4 h-4 accent-amber-700 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                Pause Scrolling on Hover
              </span>
              <input
                type="checkbox"
                checked={settings.announcementBanner?.pauseOnHover ?? true}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBanner: {
                      ...settings.announcementBanner,
                      pauseOnHover: e.target.checked,
                      isActive: settings.announcementBanner?.isActive ?? true,
                    },
                  })
                }
                className="w-4 h-4 accent-amber-700 rounded"
              />
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 5: Trust Statistics & Footer Description */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <Award className="w-4 h-4 text-amber-700" />
          <span>5. Trust Statistics & Footer Bio</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Devotees Served</label>
            <input
              type="text"
              value={settings.trustStats?.devoteesCount || '50,000+'}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  trustStats: {
                    devoteesCount: e.target.value,
                    panditCount: settings.trustStats?.panditCount || '100+',
                    templesCount: settings.trustStats?.templesCount || '25+',
                    satisfactionRate: settings.trustStats?.satisfactionRate || '99.8%',
                  },
                })
              }
              className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-bold font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Qualified Pandits</label>
            <input
              type="text"
              value={settings.trustStats?.panditCount || '100+'}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  trustStats: {
                    devoteesCount: settings.trustStats?.devoteesCount || '50,000+',
                    panditCount: e.target.value,
                    templesCount: settings.trustStats?.templesCount || '25+',
                    satisfactionRate: settings.trustStats?.satisfactionRate || '99.8%',
                  },
                })
              }
              className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-bold font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Verified Temples</label>
            <input
              type="text"
              value={settings.trustStats?.templesCount || '25+'}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  trustStats: {
                    devoteesCount: settings.trustStats?.devoteesCount || '50,000+',
                    panditCount: settings.trustStats?.panditCount || '100+',
                    templesCount: e.target.value,
                    satisfactionRate: settings.trustStats?.satisfactionRate || '99.8%',
                  },
                })
              }
              className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-bold font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Satisfaction Rate</label>
            <input
              type="text"
              value={settings.trustStats?.satisfactionRate || '99.8%'}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  trustStats: {
                    devoteesCount: settings.trustStats?.devoteesCount || '50,000+',
                    panditCount: settings.trustStats?.panditCount || '100+',
                    templesCount: settings.trustStats?.templesCount || '25+',
                    satisfactionRate: e.target.value,
                  },
                })
              }
              className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-bold font-mono"
            />
          </div>
        </div>

        <div className="text-xs space-y-3 pt-2">
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Footer Description</label>
            <textarea
              value={settings.footerDescription}
              onChange={(e) => setSettings({ ...settings, footerDescription: e.target.value })}
              rows={3}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
        <button
          onClick={handleSave}
          className="py-3 px-8 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs shadow-md transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Informative Details</span>
        </button>
      </div>

    </div>
  );
};
