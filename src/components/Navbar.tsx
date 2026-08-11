import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Search,
  Menu,
  X,
  Sparkles,
  Flame,
  ChevronDown,
  Lock,
  Globe,
  Languages,
  Sun,
  Moon,
  Heart,
} from 'lucide-react';
import { StoreService } from '../services/store';
import { FavoritesService } from '../services/favorites';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SpecialOfferMarquee } from './SpecialOfferMarquee';

interface NavbarProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favCount, setFavCount] = useState(() => FavoritesService.getFavorites().length);
  const settings = StoreService.getSettings();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCount = () => {
      setFavCount(FavoritesService.getFavorites().length);
    };
    window.addEventListener('favorites-updated', updateCount);
    return () => window.removeEventListener('favorites-updated', updateCount);
  }, []);

  const navLinks = [
    { label: t('nav.home', 'Home'), href: '/' },
    { label: t('nav.pooja', 'Pooja Services'), href: '/pooja-services' },
    { label: t('nav.tours', 'Spiritual Tours'), href: '/spiritual-tours' },
    { label: t('nav.destinations', 'Destinations'), href: '/destinations' },
    { label: t('nav.about', 'About Us'), href: '/about-us' },
    { label: t('nav.blog', 'Blog'), href: '/blog' },
    { label: t('nav.contact', 'Contact'), href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Scrolling Marquee Offer Banner */}
      <SpecialOfferMarquee />

      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 to-red-950 text-amber-100/90 text-xs py-2 px-4 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Location & Tagline */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{t('nav.tagline_location', 'Mahakal Marg, Ujjain')}</span>
            </span>
            <span className="hidden md:inline text-amber-400/40">•</span>
            <span className="hidden md:inline text-amber-200/80 font-serif italic">
              &quot;{settings.tagline}&quot;
            </span>
          </div>

          {/* Quick Contact & Language Switcher */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${settings.phone1}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="font-mono">{settings.phone1}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Top Bar Quick Language Switcher Pill */}
            <div className="flex items-center bg-amber-950/80 p-0.5 rounded-lg border border-amber-500/30 text-[11px]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-md transition-all font-sans font-semibold ${
                  language === 'en'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-amber-200/80 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded-md transition-all font-serif font-semibold ${
                  language === 'hi'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-amber-200/80 hover:text-white'
                }`}
                title="हिंदी में पढ़ें"
              >
                हिंदी
              </button>
            </div>

            <a
              href="/admin"
              className="hidden md:flex items-center gap-1 text-amber-300/80 hover:text-amber-200 transition-colors pl-2 border-l border-amber-800/60"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>{t('nav.admin', 'Admin')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`w-full bg-white/95 dark:bg-[#1C1917]/95 backdrop-blur-md transition-all border-b border-stone-200/80 dark:border-stone-800/80 ${
          isScrolled ? 'shadow-md py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-800 via-amber-700 to-amber-900 text-amber-200 flex items-center justify-center shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-amber-100 tracking-tight leading-tight group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                {language === 'hi' ? settings.hindiBusinessName : settings.businessName}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-amber-800 dark:text-amber-400 tracking-widest font-serif">
                  {language === 'hi' ? settings.businessName : settings.hindiBusinessName}
                </span>
                <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 tracking-wider">
                  Ujjain
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700 dark:text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-800 dark:hover:text-amber-300 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-700 dark:after:bg-amber-400 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-200 border border-amber-300/60 dark:border-amber-500/30 hover:bg-amber-100 dark:hover:bg-stone-700 transition-all shadow-xs hover:shadow-sm"
              title={theme === 'light' ? 'Switch to Late-Night Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-amber-800" />
              ) : (
                <Sun className="w-4 h-4 text-amber-300" />
              )}
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors flex items-center gap-2 text-xs font-medium"
              title={t('nav.search', 'Search site')}
            >
              <Search className="w-4 h-4 text-amber-800 dark:text-amber-400" />
              <span className="hidden xl:inline">{t('nav.search', 'Search')}</span>
            </button>

            {/* Saved Items Link */}
            <a
              href="/saved-items"
              className="relative p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="View Saved Rituals & Tours"
            >
              <Heart className={`w-4 h-4 ${favCount > 0 ? 'text-red-500 fill-red-500' : 'text-amber-800 dark:text-amber-400'}`} />
              <span className="hidden xl:inline">Saved</span>
              {favCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5">
                  {favCount}
                </span>
              )}
            </a>

            {/* Book / Enquire Button */}
            <button
              onClick={() => onOpenBooking()}
              className="py-2.5 px-3.5 sm:px-5 rounded-xl bg-gradient-to-r from-red-800 via-amber-800 to-amber-900 text-white font-medium text-xs sm:text-sm hover:from-red-900 hover:to-amber-950 shadow-md shadow-amber-900/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t('nav.book', 'Book / Enquire')}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 text-stone-100 border-b border-amber-900/50 p-6 space-y-4 animate-in slide-in-from-top duration-200">
          
          {/* Mobile Language Switcher Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-800/90 border border-amber-500/30 text-xs">
            <span className="flex items-center gap-2 text-amber-200 font-medium">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'भाषा (Language):' : 'Select Language:'}</span>
            </span>
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-md text-xs font-serif font-semibold transition-all ${
                  language === 'hi'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-3 font-medium text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-amber-900/40 text-stone-200 hover:text-amber-200 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/saved-items"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-amber-900/40 text-stone-200 hover:text-amber-200 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Heart className={`w-4 h-4 ${favCount > 0 ? 'text-red-400 fill-red-400' : 'text-amber-400'}`} />
                <span>My Saved Items</span>
              </span>
              {favCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {favCount}
                </span>
              )}
            </a>
          </nav>

          <div className="pt-4 border-t border-stone-800 flex flex-col gap-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href={`tel:${settings.phone1}`}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-800 text-amber-200 font-medium text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call {settings.phone1}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

