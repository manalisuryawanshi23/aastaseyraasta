import React, { useState, useEffect } from 'react';
import { BrandColorPalette, SiteSettings } from '../../types';
import { StoreService } from '../../services/store';
import {
  DEFAULT_BRAND_PALETTE,
  BRAND_PRESETS,
  applyBrandColorPalette,
} from '../../utils/brandTheme';
import {
  Palette,
  RotateCcw,
  Save,
  CheckCircle2,
  Sparkles,
  Eye,
  Sliders,
  Check,
  Flame,
  ArrowRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';

export const AdminBrandColorPicker: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(StoreService.getSettings());
  const [palette, setPalette] = useState<BrandColorPalette>(
    settings.brandPalette || DEFAULT_BRAND_PALETTE
  );
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'Presets' | 'CustomPicker'>('Presets');

  // Sync state with DOM CSS custom properties when palette changes in local state
  useEffect(() => {
    applyBrandColorPalette(palette);
  }, [palette]);

  const handleColorChange = (key: keyof BrandColorPalette, val: string) => {
    const updated = {
      ...palette,
      [key]: val,
      presetName: 'Custom Palette',
    };
    setPalette(updated);
  };

  const handleSelectPreset = (presetPalette: BrandColorPalette) => {
    setPalette(presetPalette);
  };

  const handleResetDefault = () => {
    setPalette(DEFAULT_BRAND_PALETTE);
    applyBrandColorPalette(DEFAULT_BRAND_PALETTE);
  };

  const handleSave = () => {
    const updatedSettings: SiteSettings = {
      ...settings,
      brandPalette: palette,
    };
    StoreService.updateSettings(updatedSettings);
    setSettings(updatedSettings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const colorFields: {
    key: keyof BrandColorPalette;
    label: string;
    description: string;
    swatches: string[];
  }[] = [
    {
      key: 'primary',
      label: 'Primary Brand Color',
      description: 'Used for primary action buttons, active navigation indicators, and main links.',
      swatches: ['#b45309', '#d97706', '#c2410c', '#ca8a04', '#854d0e', '#047857', '#2563eb', '#7c3aed'],
    },
    {
      key: 'primaryHover',
      label: 'Primary Hover State',
      description: 'Applied when hovering over primary buttons and key interactive elements.',
      swatches: ['#92400e', '#b45309', '#9a3412', '#a16207', '#713f12', '#065f46', '#1d4ed8', '#6d28d9'],
    },
    {
      key: 'secondary',
      label: 'Secondary Accent Color',
      description: 'Used for secondary buttons, section headers, and card accents.',
      swatches: ['#78350f', '#92400e', '#7c2d12', '#713f12', '#54310d', '#064e3b', '#1e40af', '#5b21b6'],
    },
    {
      key: 'accent',
      label: 'Highlight & CTA Accent',
      description: 'Highlight badges, VIP tags, discount callouts, and special offer banners.',
      swatches: ['#d97706', '#f59e0b', '#ea580c', '#eab308', '#a16207', '#059669', '#3b82f6', '#8b5cf6'],
    },
    {
      key: 'headerBg',
      label: 'Top Header & Banner Accent',
      description: 'Background color for top announcement strip and sub-navbar accents.',
      swatches: ['#451a03', '#78350f', '#431407', '#422006', '#361e08', '#022c22', '#1e1b4b', '#18181b'],
    },
    {
      key: 'heroGradientStart',
      label: 'Hero Gradient Start',
      description: 'Start color for background gradients in hero banners and modals.',
      swatches: ['#451a03', '#78350f', '#431407', '#422006', '#361e08', '#022c22', '#0f172a', '#18181b'],
    },
    {
      key: 'heroGradientEnd',
      label: 'Hero Gradient Finish',
      description: 'Ending tint for hero background gradient overlays.',
      swatches: ['#1c1917', '#0c0a09', '#18181b', '#09090b', '#1e1b4b', '#022c22', '#111827', '#000000'],
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-8 max-w-5xl">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Palette className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">
              Brand Color Palette & Theme Engine
            </h2>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Customize the global visual identity, accent buttons, headers, gradients, and badges live across the application without editing CSS code.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefault}
            title="Reset to Original Sacred Saffron Palette"
            className="py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Reset Default</span>
          </button>

          <button
            onClick={handleSave}
            className="py-2.5 px-6 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs shadow-md transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Color Palette</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-3 border border-emerald-200 dark:border-emerald-800 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold">Global Brand Color Palette Saved Successfully!</div>
            <div className="text-[11px] font-normal opacity-90">
              All buttons, badges, navigation headers, and banner accents across the entire website have been updated.
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE PALETTE SUMMARY BAR */}
      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            <span
              className="w-7 h-7 rounded-full border-2 border-white dark:border-stone-800 shadow-sm transition-transform hover:scale-110"
              style={{ backgroundColor: palette.primary }}
              title={`Primary: ${palette.primary}`}
            />
            <span
              className="w-7 h-7 rounded-full border-2 border-white dark:border-stone-800 shadow-sm transition-transform hover:scale-110"
              style={{ backgroundColor: palette.secondary }}
              title={`Secondary: ${palette.secondary}`}
            />
            <span
              className="w-7 h-7 rounded-full border-2 border-white dark:border-stone-800 shadow-sm transition-transform hover:scale-110"
              style={{ backgroundColor: palette.accent }}
              title={`Accent: ${palette.accent}`}
            />
            <span
              className="w-7 h-7 rounded-full border-2 border-white dark:border-stone-800 shadow-sm transition-transform hover:scale-110"
              style={{ backgroundColor: palette.headerBg }}
              title={`Header: ${palette.headerBg}`}
            />
          </div>

          <div>
            <div className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Active Brand Theme:</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                {palette.presetName || 'Custom Palette'}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 font-mono mt-0.5">
              Primary: {palette.primary} | Secondary: {palette.secondary} | Accent: {palette.accent}
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 bg-stone-200 dark:bg-stone-800 rounded-xl">
          <button
            onClick={() => setActiveTab('Presets')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'Presets'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Spiritual Theme Presets</span>
          </button>

          <button
            onClick={() => setActiveTab('CustomPicker')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'CustomPicker'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            <span>Custom Color Pickers</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: PRESETS GRID */}
      {activeTab === 'Presets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Curated Spiritual Brand Presets</span>
            </h3>
            <span className="text-xs text-stone-500">Select a preset to apply live instantly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRAND_PRESETS.map((preset) => {
              const isSelected = palette.presetName === preset.name;
              return (
                <div
                  key={preset.name}
                  onClick={() => handleSelectPreset(preset.palette)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 dark:border-amber-600 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        {preset.name}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                      {preset.description}
                    </p>
                  </div>

                  {/* Swatches & Gradient Bar */}
                  <div className="space-y-2">
                    <div className="h-2.5 rounded-full w-full overflow-hidden flex">
                      <span className="h-full w-1/4" style={{ backgroundColor: preset.palette.primary }} />
                      <span className="h-full w-1/4" style={{ backgroundColor: preset.palette.secondary }} />
                      <span className="h-full w-1/4" style={{ backgroundColor: preset.palette.accent }} />
                      <span className="h-full w-1/4" style={{ backgroundColor: preset.palette.headerBg }} />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500">
                        <span>{preset.palette.primary}</span>
                        <span>•</span>
                        <span>{preset.palette.accent}</span>
                      </div>
                      <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 group-hover:underline flex items-center gap-1">
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: CUSTOM COLOR PICKERS */}
      {activeTab === 'CustomPicker' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>Fine-Tune Individual Brand Color Tokens</span>
            </h3>
            <span className="text-xs text-stone-500 font-mono">Real-time Live CSS Binding</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colorFields.map((field) => {
              const currentColor = palette[field.key] as string;
              return (
                <div
                  key={field.key}
                  className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-900 dark:text-stone-100">
                        {field.label}
                      </label>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-tight">
                        {field.description}
                      </p>
                    </div>

                    {/* Color Swatch Trigger */}
                    <div className="relative shrink-0">
                      <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => handleColorChange(field.key, e.target.value)}
                        className="w-10 h-10 rounded-xl border-2 border-stone-300 dark:border-stone-700 cursor-pointer p-0 bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Hex Text Input Field */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-stone-400">HEX</span>
                    <input
                      type="text"
                      value={currentColor}
                      onChange={(e) => handleColorChange(field.key, e.target.value)}
                      placeholder="#000000"
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Quick Swatch Pills */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-stone-500 font-medium">Quick Suggestions:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {field.swatches.map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => handleColorChange(field.key, hex)}
                          title={`Apply ${hex}`}
                          className={`w-6 h-6 rounded-lg border transition-transform hover:scale-110 ${
                            currentColor.toLowerCase() === hex.toLowerCase()
                              ? 'ring-2 ring-amber-500 border-white'
                              : 'border-stone-300 dark:border-stone-700'
                          }`}
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LIVE INTERACTIVE WEBSITE UI PREVIEW CONTAINER */}
      <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Live Interactive Website Component Preview</span>
          </h3>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Preview Active
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-6">
          {/* Sample Header Announcement Strip */}
          <div
            className="p-2.5 rounded-xl text-white text-xs text-center font-medium shadow-sm flex items-center justify-between px-4 transition-colors"
            style={{ backgroundColor: palette.headerBg }}
          >
            <div className="flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>🚩 VIP Sawan & Mahashivratri Sankalp Booking Open in Ujjain</span>
            </div>
            <button
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: palette.primary }}
            >
              Book Pooja Now
            </button>
          </div>

          {/* Sample Hero Card Banner with Gradients & Buttons */}
          <div
            className="p-6 sm:p-8 rounded-2xl text-white shadow-xl relative overflow-hidden transition-all space-y-4"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${palette.heroGradientStart}, ${palette.heroGradientEnd})`,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: palette.accent }}
              >
                Sacred Vedic Rituals
              </span>
              <span className="text-xs text-amber-200/80 font-mono">Mahakaleshwar Sanctum</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-serif font-bold italic text-amber-100 leading-tight">
              Aastha Sey Raasta Seva — Authentic Pujas & Yatra
            </h4>

            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              Experience divine peace with qualified Vedic Pandits in Ujjain Mahakal sanctum. Complete arrangements for Rudrabhishek, Kalsarp Dosh Shanti & Bhat Pooja.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Button */}
              <button
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center gap-2"
                style={{ backgroundColor: palette.primary }}
              >
                <span>Book Sankalp Pooja</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Secondary Accent Button */}
              <button
                className="px-5 py-2.5 rounded-xl font-bold text-xs border transition-colors"
                style={{
                  borderColor: palette.accent,
                  color: palette.accent,
                  backgroundColor: 'rgba(0,0,0,0.2)',
                }}
              >
                View Pooja Services
              </button>

              {/* Sample Badge */}
              <span
                className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: `1px solid ${palette.primary}`,
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>100% Certified Pandits</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button Footer */}
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
        <button
          onClick={handleSave}
          className="py-3 px-8 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Brand Palette Globally</span>
        </button>
      </div>
    </div>
  );
};
