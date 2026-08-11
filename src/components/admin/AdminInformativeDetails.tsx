import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { StoreService } from '../../services/store';
import { AdminBrandColorPicker } from './AdminBrandColorPicker';
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

      {/* SECTION 4: Announcement Banner */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <Megaphone className="w-4 h-4 text-amber-700" />
          <span>4. Top Announcement Banner</span>
        </h3>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-amber-900 dark:text-amber-200">Show Top Banner on Website</span>
            <input
              type="checkbox"
              checked={settings.announcementBanner?.isActive ?? true}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBanner: {
                    text: settings.announcementBanner?.text || '',
                    link: settings.announcementBanner?.link || '/pooja-services',
                    buttonText: settings.announcementBanner?.buttonText || 'Book Pooja',
                    isActive: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 accent-amber-700 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Banner Announcement Text</label>
            <input
              type="text"
              value={settings.announcementBanner?.text || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBanner: {
                    text: e.target.value,
                    link: settings.announcementBanner?.link || '/pooja-services',
                    buttonText: settings.announcementBanner?.buttonText || 'Book Pooja',
                    isActive: settings.announcementBanner?.isActive ?? true,
                  },
                })
              }
              placeholder="🚩 Special Sawan VIP Pooja Booking Open in Ujjain! Pre-book now for Gotra Sankalp."
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
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
