import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { StoreService } from '../../services/store';
import { AdminBrandColorPicker } from './AdminBrandColorPicker';
import { SpecialOfferMarquee } from '../SpecialOfferMarquee';
import { initialSiteSettings } from '../../data/initialData';
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
  Trash2,
  RotateCcw,
  Sparkles,
  Eye,
  Power,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const AdminInformativeDetails: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(StoreService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    StoreService.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset contact numbers and address to default temple settings?')) {
      const reset = {
        ...settings,
        phone1: initialSiteSettings.phone1,
        phone2: initialSiteSettings.phone2,
        whatsappNumber: initialSiteSettings.whatsappNumber,
        emergencyHelpline: initialSiteSettings.emergencyHelpline,
        email: initialSiteSettings.email,
        address: initialSiteSettings.address,
        city: initialSiteSettings.city,
        state: initialSiteSettings.state,
        pincode: initialSiteSettings.pincode,
        businessHours: initialSiteSettings.businessHours,
      };
      setSettings(reset);
      StoreService.updateSettings(reset);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-8 max-w-4xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4 gap-3">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-600" />
            <span>Contact, Address & Site Settings</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Update or delete phone numbers, WhatsApp helplines, street address, operating hours, and live banners.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetToDefault}
            className="py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium text-xs transition-colors flex items-center gap-1.5 border border-stone-300 dark:border-stone-700"
            title="Reset to default contact values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSave}
            className="py-2.5 px-6 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Contact details and site configuration successfully updated and saved to MySQL database!</span>
        </div>
      )}

      {/* LIVE DEVOTEE CONTACT PREVIEW CARD */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-stone-900/40 to-amber-950/20 border border-amber-500/30 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300 border-b border-amber-500/20 pb-2">
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>LIVE DEVOTEE CONTACT PREVIEW (As displayed in Footer & Contact Page)</span>
          </span>
          <span className="text-[10px] font-normal text-stone-500 dark:text-stone-400">Live Real-time Render</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
            <div className="font-semibold text-stone-500 text-[10px] uppercase">Primary Call / Helpline</div>
            <div className="font-bold text-stone-900 dark:text-amber-100 mt-0.5 font-mono">
              {settings.phone1 || <span className="text-red-400 italic">Not set (Cleared)</span>}
            </div>
            {settings.phone2 && (
              <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                Alt: {settings.phone2}
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
            <div className="font-semibold text-stone-500 text-[10px] uppercase">WhatsApp Booking & Email</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{settings.whatsappNumber ? `+${settings.whatsappNumber}` : <span className="text-red-400 italic font-sans font-normal">No WhatsApp</span>}</span>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
              {settings.email || <span className="text-red-400 italic">No email</span>}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
            <div className="font-semibold text-stone-500 text-[10px] uppercase">Office Address & Hours</div>
            <div className="font-medium text-stone-800 dark:text-stone-200 mt-0.5 line-clamp-2">
              {settings.address ? `${settings.address}, ${settings.city}, ${settings.state} - ${settings.pincode}` : <span className="text-red-400 italic">Address cleared</span>}
            </div>
            <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium mt-0.5">
              {settings.businessHours}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: GLOBAL BRAND COLOR PALETTE PICKER */}
      <div className="space-y-4">
        <AdminBrandColorPicker />
      </div>

      {/* SECTION 2: Direct Contact Numbers & Helplines */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-700" />
            <span>1. Direct Phone Numbers & Helplines (Update or Delete)</span>
          </h3>
          <span className="text-[11px] text-stone-400">Click trash icon on any field to delete</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          {/* Phone 1 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Primary Phone 1 (Displayed on Header & Call Buttons)</label>
              {settings.phone1 && (
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, phone1: '' })}
                  className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-0.5"
                  title="Clear Primary Phone"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                value={settings.phone1}
                onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                placeholder="+91 91110 99799"
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
              />
            </div>
          </div>

          {/* Phone 2 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Secondary Phone 2 (Alternative / Landline)</label>
              {settings.phone2 && (
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, phone2: '' })}
                  className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-0.5"
                  title="Clear Secondary Phone"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <input
              type="text"
              value={settings.phone2}
              onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
              placeholder="+91 98260 12345 (or leave blank to remove)"
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>

          {/* WhatsApp Support Number */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">WhatsApp Support Number (Format: 919111099799)</label>
              {settings.whatsappNumber && (
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, whatsappNumber: '' })}
                  className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-0.5"
                  title="Clear WhatsApp Number"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
              placeholder="919111099799"
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>

          {/* Emergency Spiritual Hotline */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">24x7 Emergency Spiritual Hotline</label>
              {settings.emergencyHelpline && (
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, emergencyHelpline: '' })}
                  className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-0.5"
                  title="Clear Emergency Helpline"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <input
              type="text"
              value={settings.emergencyHelpline || ''}
              onChange={(e) => setSettings({ ...settings, emergencyHelpline: e.target.value })}
              placeholder="+91 91110 99799"
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
            />
          </div>

          {/* Official Email */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Official Contact Email Address</label>
              {settings.email && (
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, email: '' })}
                  className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-0.5"
                  title="Clear Email"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              placeholder="contact@aasthasaysrasta.com"
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>

        </div>
      </div>

      {/* SECTION 3: Physical Address & Operating Hours */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>2. Physical Temple Office Address & Operating Hours</span>
          </h3>
          {settings.address && (
            <button
              type="button"
              onClick={() => setSettings({ ...settings, address: '', city: '', state: '', pincode: '' })}
              className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-0.5"
              title="Clear Complete Address"
            >
              <Trash2 className="w-3 h-3" /> Clear All Address Fields
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          {/* Street Address */}
          <div className="sm:col-span-2">
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Street / Landmark Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              placeholder="Near Mahakaleshwar Temple Gate No. 4, Jaisinghpura"
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>

          {/* City */}
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">City</label>
            <input
              type="text"
              value={settings.city}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              placeholder="Ujjain"
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>

          {/* State & Pincode */}
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">State & Postal PIN Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settings.state}
                onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                placeholder="Madhya Pradesh"
                className="w-2/3 p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
              />
              <input
                type="text"
                value={settings.pincode}
                onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                placeholder="456001"
                className="w-1/3 p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
              />
            </div>
          </div>

          {/* Operating Hours */}
          <div className="sm:col-span-2">
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Operating Hours / Darshan Timing Notice</label>
            <input
              type="text"
              value={settings.businessHours}
              onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
              placeholder="Monday - Sunday: 05:00 AM - 10:30 PM (24/7 Helpline Available)"
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>

        </div>
      </div>

      {/* SECTION 4: Business Identity & Tagline */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <Building2 className="w-4 h-4 text-amber-700" />
          <span>3. Business Identity & Tagline</span>
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

      {/* Dedicated Offer Marquee Notice Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/60 dark:from-stone-900 dark:to-amber-950/30 border border-amber-300 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
              Top Navigation Offer Marquee (Special Offers)
            </h4>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">
              The Top Offer Marquee now has its own dedicated menu tab in the admin sidebar with live preview and staff role access permissions.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: Trust Statistics & Footer Bio */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <Award className="w-4 h-4 text-amber-700" />
          <span>4. Trust Statistics & Footer Bio</span>
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
          className="py-3 px-8 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Contact & Site Settings</span>
        </button>
      </div>

    </div>
  );
};
