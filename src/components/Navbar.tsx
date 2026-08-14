import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageSquare,
  Search,
  Menu,
  X,
  Sparkles,
  Flame,
  ChevronRight,
  ChevronDown,
  Lock,
  Globe,
  Sun,
  Moon,
  Heart,
  Home,
  Compass,
  MapPin,
  BookOpen,
  Info,
  ShieldCheck,
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [favCount, setFavCount] = useState(() => FavoritesService.getFavorites().length);
  const [currentPath, setCurrentPath] = useState('');
  
  const hamburgerButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const settings = StoreService.getSettings();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

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

  // Lock body scroll and manage focus on drawer open/close
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          hamburgerButtonRef.current?.focus();
        }
        setActiveDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Featured Pooja items for Desktop Dropdown
  const featuredPoojas = [
    { name: 'Rudrabhishek Pooja', href: '/pooja/rudrabhishek-pooja-ujjain', desc: 'Sacred Mahakal Lingam Abhishek', tag: 'Most Popular' },
    { name: 'Bhat Pooja (Mangalnath & Angareshwar)', href: '/pooja/bhat-pooja-mangalnath-ujjain', desc: 'Authentic Mangal Dosh Nivaran', tag: 'Vedic Shanti' },
    { name: 'Kaal Sarp Dosh Shanti', href: '/pooja/kaal-sarp-dosh-shanti-ujjain', desc: 'Rahu-Ketu Kundali Alignment', tag: 'Special Ritual' },
    { name: 'Mahamrityunjaya Jaap & Anushthan', href: '/pooja/mahamrityunjaya-jaap-ujjain', desc: 'Health, longevity & protection', tag: 'Gurukul Vidhi' },
    { name: 'Maa Baglamukhi Havan (Nalkheda)', href: '/pooja/baglamukhi-havan-nalkheda', desc: 'Shatru Badha & Vijaya Siddhi', tag: 'Tantra Peeth' },
    { name: 'Pitru Dosh & Narayan Bali', href: '/pooja/pitru-dosh-shanti-narayan-bali-ujjain', desc: 'Ancestral blessings & peace', tag: 'Siddhivat Tirtha' },
  ];

  // Featured Tours for Desktop Dropdown
  const featuredTours = [
    { name: 'Ujjain Spiritual Darshan (1 Day)', href: '/spiritual-tours/ujjain-spiritual-tour', desc: 'Mahakal, Bhasma Aarti, Kaal Bhairav, Harsiddhi', tag: '1 Day' },
    { name: 'Ujjain + Omkareshwar Jyotirlinga (2 Days)', href: '/spiritual-tours/ujjain-omkareshwar-tour', desc: 'Both sacred Jyotirlingas with VIP Darshan', tag: '2 Days / 1 Night' },
    { name: 'Ujjain + Omkareshwar + Indore Heritage (3 Days)', href: '/spiritual-tours/ujjain-omkareshwar-indore-tour', desc: 'Complete Malwa pilgrimage & culinary circuit', tag: '3 Days / 2 Nights' },
    { name: 'Ujjain + Maa Baglamukhi Nalkheda Circuit', href: '/spiritual-tours/ujjain-baglamukhi-nalkheda-tour', desc: 'Mahakaleshwar & Tantra Siddhi Peeth Yatra', tag: '2 Days' },
  ];

  // Featured Sacred Destinations
  const featuredDestinations = [
    { name: 'Ujjain Mahakal Dham', href: '/destinations/ujjain', desc: 'City of Mahakal, Mokshapuri & Kumbh Tirth' },
    { name: 'Omkareshwar Jyotirlinga', href: '/destinations/omkareshwar', desc: 'Island of Om on sacred Narmada River' },
    { name: 'Baglamukhi Nalkheda Peeth', href: '/destinations/nalkheda', desc: 'Ancient Siddha Peeth on Lakhundar River' },
    { name: 'Indore & Heritage Gateways', href: '/destinations/indore', desc: 'Khajrana Ganesh, Annapurna & transit hub' },
  ];

  // Complete navigation list for mobile drawer
  const mobileNavLinks = [
    { label: t('nav.home', 'Home'), href: '/', icon: Home, hindiLabel: 'मुख्य पृष्ठ' },
    { label: t('nav.pooja', 'Pooja Services'), href: '/pooja-services', icon: Flame, hindiLabel: 'वैदिक पूजा व अनुष्ठान' },
    { label: t('nav.tours', 'Spiritual Tours'), href: '/spiritual-tours', icon: Compass, hindiLabel: 'तीर्थ यात्रा पैकेज' },
    { label: t('nav.destinations', 'Destinations'), href: '/destinations', icon: MapPin, hindiLabel: 'पवित्र धाम व मंदिर' },
    { label: t('nav.about', 'About Us'), href: '/about-us', icon: Info, hindiLabel: 'हमारे बारे में व आचार्य' },
    { label: t('nav.blog', 'Blog'), href: '/blog', icon: BookOpen, hindiLabel: 'धार्मिक लेख व गाइड' },
    { label: t('nav.contact', 'Contact'), href: '/contact', icon: Phone, hindiLabel: 'संपर्क व सहायता' },
  ];

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleCloseDrawer = () => {
    setMobileMenuOpen(false);
    hamburgerButtonRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 shadow-xs">
      {/* Top Scrolling Marquee Offer Banner */}
      <SpecialOfferMarquee />

      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 to-red-950 text-amber-100/90 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Location & Tagline */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="flex items-center gap-1 text-amber-300 font-medium shrink-0">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span className="truncate">{t('nav.tagline_location', 'Mahakal Marg, Ujjain')}</span>
            </span>
            <span className="hidden md:inline text-amber-400/40">•</span>
            <span className="hidden md:inline text-amber-200/80 font-serif italic truncate">
              &quot;{settings.tagline}&quot;
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 bg-amber-900/40 text-amber-300/90 px-2 py-0.5 rounded text-[10px] border border-amber-800/40 font-medium">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>Certified Vedic Pandits</span>
            </span>
          </div>

          {/* Quick Contact & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs shrink-0">
            <a
              href={`tel:${settings.phone1}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
              aria-label={`Call ${settings.phone1}`}
            >
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="font-mono">{settings.phone1}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Top Bar Quick Language Switcher Pill */}
            <div className="flex items-center bg-amber-950/80 p-0.5 rounded-lg border border-amber-500/30 text-[10px] sm:text-[11px]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 sm:px-2 py-0.5 rounded-md transition-all font-sans font-semibold ${
                  language === 'en'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-amber-200/80 hover:text-white'
                }`}
                title="English"
                aria-label="Switch language to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1.5 sm:px-2 py-0.5 rounded-md transition-all font-serif font-semibold ${
                  language === 'hi'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-amber-200/80 hover:text-white'
                }`}
                title="हिंदी में पढ़ें"
                aria-label="हिंदी भाषा में बदलें"
              >
                हिंदी
              </button>
            </div>

            <a
              href="/admin"
              className="hidden md:flex items-center gap-1 text-amber-300/80 hover:text-amber-200 transition-colors pl-2 border-l border-amber-800/60"
              aria-label="Admin Portal"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>{t('nav.admin', 'Admin')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Professional Desktop & Mobile Header */}
      <div
        className={`w-full bg-white/95 dark:bg-[#1C1917]/95 backdrop-blur-md transition-all border-b border-stone-200/80 dark:border-stone-800/80 ${
          isScrolled ? 'shadow-md py-2 sm:py-2.5' : 'py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-6">
          
          {/* Brand Logo Lockup */}
          <a href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0" aria-label="Aastha Sey Raasta Home">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-800 via-amber-700 to-amber-900 text-amber-200 flex items-center justify-center shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform shrink-0 border border-amber-500/30">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-300 text-amber-300" />
            </div>
            <div className="min-w-0">
              <div className="font-serif font-bold text-base sm:text-lg lg:text-xl text-stone-900 dark:text-amber-100 tracking-tight leading-tight group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors truncate">
                {language === 'hi' ? settings.hindiBusinessName : settings.businessName}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-[11px] font-medium text-amber-800 dark:text-amber-400 tracking-widest font-serif truncate">
                  {language === 'hi' ? settings.businessName : settings.hindiBusinessName}
                </span>
                <span className="hidden xs:inline text-[9px] sm:text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 tracking-wider">
                  Ujjain
                </span>
              </div>
            </div>
          </a>

          {/* Professional Desktop Navigation Menu (Streamlined Core Pillars with Rich Dropdowns) */}
          <nav 
            className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium text-stone-700 dark:text-stone-300"
            aria-label="Desktop Primary Navigation"
          >
            {/* 1. Home Link */}
            <a
              href="/"
              className={`px-3 py-2 rounded-xl transition-all font-medium ${
                currentPath === '/'
                  ? 'bg-amber-100/70 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-semibold'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-amber-800 dark:hover:text-amber-300'
              }`}
            >
              {t('nav.home', 'Home')}
            </a>

            {/* 2. Pooja Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('pooja')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="/pooja-services"
                className={`px-3 py-2 rounded-xl transition-all font-medium inline-flex items-center gap-1.5 ${
                  currentPath.includes('/pooja')
                    ? 'bg-amber-100/70 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-semibold'
                    : 'hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-amber-800 dark:hover:text-amber-300'
                }`}
              >
                <span>{t('nav.pooja', 'Pooja Services')}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${activeDropdown === 'pooja' ? 'rotate-180 text-amber-700 dark:text-amber-400' : ''}`} />
              </a>

              {/* Mega Dropdown Panel */}
              {activeDropdown === 'pooja' && (
                <div className="absolute top-full left-0 w-80 lg:w-96 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-white dark:bg-[#1C1917] rounded-2xl shadow-2xl border border-amber-200/60 dark:border-stone-800 p-3 space-y-1.5">
                    <div className="px-3 py-1.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-serif text-amber-800 dark:text-amber-400">
                      <span className="font-bold uppercase tracking-wider text-[11px]">Vedic Poojas in Ujjain</span>
                      <span className="text-[10px] font-sans bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full text-amber-900 dark:text-amber-300 font-semibold">100% Satvik Vidhi</span>
                    </div>

                    <div className="py-1 space-y-1">
                      {featuredPoojas.map((pooja) => (
                        <a
                          key={pooja.name}
                          href={pooja.href}
                          className="p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-stone-800/80 transition-colors flex items-start justify-between group"
                        >
                          <div className="space-y-0.5 min-w-0 pr-2">
                            <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors truncate">
                              {pooja.name}
                            </div>
                            <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                              {pooja.desc}
                            </div>
                          </div>
                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                            {pooja.tag}
                          </span>
                        </a>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between px-2">
                      <a
                        href="/pooja-services"
                        className="text-xs font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center gap-1 transition-colors"
                      >
                        <span>View All 15+ Vedic Poojas</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => onOpenBooking('Pooja')}
                        className="text-[11px] font-medium text-red-800 dark:text-red-400 hover:underline"
                      >
                        Request Pandit Consultation
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Spiritual Tours Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('tours')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="/spiritual-tours"
                className={`px-3 py-2 rounded-xl transition-all font-medium inline-flex items-center gap-1.5 ${
                  currentPath.includes('/spiritual-tours')
                    ? 'bg-amber-100/70 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-semibold'
                    : 'hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-amber-800 dark:hover:text-amber-300'
                }`}
              >
                <span>{t('nav.tours', 'Spiritual Tours')}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${activeDropdown === 'tours' ? 'rotate-180 text-amber-700 dark:text-amber-400' : ''}`} />
              </a>

              {/* Mega Dropdown Panel */}
              {activeDropdown === 'tours' && (
                <div className="absolute top-full left-0 w-80 lg:w-96 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-white dark:bg-[#1C1917] rounded-2xl shadow-2xl border border-amber-200/60 dark:border-stone-800 p-3 space-y-1.5">
                    <div className="px-3 py-1.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-serif text-amber-800 dark:text-amber-400">
                      <span className="font-bold uppercase tracking-wider text-[11px]">Pilgrimage Circuits</span>
                      <span className="text-[10px] font-sans bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full text-amber-900 dark:text-amber-300 font-semibold">VIP Darshan & Stay</span>
                    </div>

                    <div className="py-1 space-y-1">
                      {featuredTours.map((tour) => (
                        <a
                          key={tour.name}
                          href={tour.href}
                          className="p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-stone-800/80 transition-colors flex items-start justify-between group"
                        >
                          <div className="space-y-0.5 min-w-0 pr-2">
                            <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors truncate">
                              {tour.name}
                            </div>
                            <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                              {tour.desc}
                            </div>
                          </div>
                          <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300/40">
                            {tour.tag}
                          </span>
                        </a>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between px-2">
                      <a
                        href="/spiritual-tours"
                        className="text-xs font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center gap-1 transition-colors"
                      >
                        <span>View All Yatra Packages</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="/spiritual-tours/char-dham-yatra-uttarakhand"
                        className="text-[11px] font-medium text-amber-700 dark:text-amber-400 hover:underline"
                      >
                        Char Dham Yatra →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Sacred Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('destinations')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="/destinations"
                className={`px-3 py-2 rounded-xl transition-all font-medium inline-flex items-center gap-1.5 ${
                  currentPath.includes('/destinations')
                    ? 'bg-amber-100/70 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-semibold'
                    : 'hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-amber-800 dark:hover:text-amber-300'
                }`}
              >
                <span>{t('nav.destinations', 'Destinations')}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${activeDropdown === 'destinations' ? 'rotate-180 text-amber-700 dark:text-amber-400' : ''}`} />
              </a>

              {/* Mega Dropdown Panel */}
              {activeDropdown === 'destinations' && (
                <div className="absolute top-full left-0 w-72 lg:w-80 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-white dark:bg-[#1C1917] rounded-2xl shadow-2xl border border-amber-200/60 dark:border-stone-800 p-3 space-y-1.5">
                    <div className="px-3 py-1.5 border-b border-stone-100 dark:border-stone-800 text-[11px] font-serif font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      Holy Dhams & Temples
                    </div>

                    <div className="py-1 space-y-1">
                      {featuredDestinations.map((dest) => (
                        <a
                          key={dest.name}
                          href={dest.href}
                          className="p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-stone-800/80 transition-colors block group"
                        >
                          <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                            {dest.name}
                          </div>
                          <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                            {dest.desc}
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 px-2">
                      <a
                        href="/destinations"
                        className="text-xs font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center gap-1 transition-colors"
                      >
                        <span>Explore All Sacred Temple Guides</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-200 border border-amber-300/60 dark:border-amber-500/30 hover:bg-amber-100 dark:hover:bg-stone-700 transition-all shadow-xs hover:shadow-sm"
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
              className="p-2 sm:p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors flex items-center gap-2 text-xs font-medium border border-transparent hover:border-amber-300/40"
              title={t('nav.search', 'Search site')}
              aria-label="Search poojas, yatras, and blogs"
            >
              <Search className="w-4 h-4 text-amber-800 dark:text-amber-400" />
              <span className="hidden xl:inline">{t('nav.search', 'Search')}</span>
            </button>

            {/* Saved Items Link */}
            <a
              href="/saved-items"
              className="relative p-2 sm:p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors flex items-center gap-1.5 text-xs font-medium border border-transparent hover:border-amber-300/40"
              title="View Saved Rituals & Tours"
              aria-label={`View ${favCount} saved items`}
            >
              <Heart className={`w-4 h-4 ${favCount > 0 ? 'text-red-500 fill-red-500' : 'text-amber-800 dark:text-amber-400'}`} />
              <span className="hidden xl:inline">Saved</span>
              {favCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5">
                  {favCount}
                </span>
              )}
            </a>

            {/* Book / Enquire Button (Desktop & Tablet) */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:flex py-2 sm:py-2.5 px-3.5 sm:px-4 lg:px-5 rounded-xl bg-gradient-to-r from-red-800 via-amber-800 to-amber-900 text-white font-medium text-xs sm:text-sm hover:from-red-900 hover:to-amber-950 shadow-md shadow-amber-900/20 hover:shadow-lg transition-all items-center gap-1.5 sm:gap-2 border border-amber-600/30 active:scale-[0.98]"
              aria-label="Open Booking and Consultation Form"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              <span>{t('nav.book', 'Book / Enquire')}</span>
            </button>

            {/* Mobile-Optimized Hamburger Menu Button (Strictly for viewports under 768px: md:hidden) */}
            <button
              ref={hamburgerButtonRef}
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-amber-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 hover:bg-amber-100 dark:hover:bg-stone-700 border border-amber-300/50 dark:border-stone-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xs"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-haspopup="dialog"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-800 dark:text-amber-300" /> : <Menu className="w-5 h-5 text-amber-800 dark:text-amber-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Navigation Drawer (Strictly for viewports under 768px: md:hidden) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay with Click-to-Dismiss */}
          <div
            className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 animate-in fade-in"
            onClick={handleCloseDrawer}
            aria-hidden="true"
          />

          {/* Slide-out Navigation Drawer Container */}
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="fixed top-0 right-0 bottom-0 w-[86vw] max-w-sm bg-[#181615] text-stone-100 z-50 md:hidden shadow-2xl flex flex-col justify-between border-l border-amber-800/40 overflow-hidden animate-in slide-in-from-right duration-300"
          >
            
            {/* Drawer Header */}
            <div className="p-4 bg-gradient-to-r from-red-950/90 via-amber-950/80 to-[#181615] border-b border-amber-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-800 to-amber-700 text-amber-200 flex items-center justify-center shadow-md shadow-amber-950/50">
                  <Flame className="w-5 h-5 fill-amber-300 text-amber-300" />
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-amber-100 leading-tight">
                    {language === 'hi' ? settings.hindiBusinessName : settings.businessName}
                  </div>
                  <div className="text-[10px] text-amber-400/80 font-medium">
                    {t('nav.tagline_location', 'Mahakal Marg, Ujjain')}
                  </div>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                onClick={handleCloseDrawer}
                className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar Inside Drawer */}
            <div className="p-3 bg-stone-900/90 border-b border-stone-800 grid grid-cols-2 gap-2 text-xs">
              
              {/* Language Switcher Button */}
              <div className="flex items-center justify-between p-1.5 px-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="flex items-center gap-1 text-[11px] text-amber-300 font-medium">
                  <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{language === 'hi' ? 'भाषा' : 'Lang'}</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition-all min-h-[30px] ${
                      language === 'en'
                        ? 'bg-amber-500 text-stone-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    aria-label="Select English language"
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`px-2 py-1 rounded text-[10px] font-serif font-bold transition-all min-h-[30px] ${
                      language === 'hi'
                        ? 'bg-amber-500 text-stone-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    aria-label="Select Hindi language"
                  >
                    हिं
                  </button>
                </div>
              </div>

              {/* Search Shortcut */}
              <button
                onClick={() => {
                  handleCloseDrawer();
                  onOpenSearch();
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-200 transition-colors font-medium min-h-[40px]"
                aria-label="Search poojas, yatras and blogs"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>Search</span>
              </button>
            </div>

            {/* Scrollable Navigation Links Body */}
            <div className="p-4 space-y-4 flex-1 overflow-y-auto overscroll-contain">
              
              {/* Primary Nav List */}
              <nav className="flex flex-col space-y-1.5 font-medium" aria-label="Mobile Drawer Navigation Links">
                {mobileNavLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentPath === link.href;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={handleCloseDrawer}
                      className={`py-3 px-3.5 rounded-xl transition-all flex items-center justify-between min-h-[48px] active:scale-[0.99] ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-950/90 to-red-950/70 text-amber-200 border border-amber-700/50 shadow-inner'
                          : 'hover:bg-stone-850 text-stone-200 hover:text-amber-200 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-stone-800/80 text-amber-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-sm font-semibold truncate leading-tight">
                            {link.label}
                          </div>
                          <div className="text-[10px] text-stone-400 font-serif truncate mt-0.5">
                            {language === 'hi' ? link.label : link.hindiLabel}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-amber-400 translate-x-0.5' : 'text-stone-500'
                      }`} />
                    </a>
                  );
                })}

                {/* Saved Items Link */}
                <a
                  href="/saved-items"
                  onClick={handleCloseDrawer}
                  className="py-3 px-3.5 rounded-xl hover:bg-stone-850 text-stone-200 hover:text-amber-200 transition-all flex items-center justify-between min-h-[48px] border border-transparent active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-800/80 text-red-400 flex items-center justify-center shrink-0">
                      <Heart className={`w-4 h-4 ${favCount > 0 ? 'text-red-400 fill-red-400' : 'text-amber-400'}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Saved Rituals & Tours</div>
                      <div className="text-[10px] text-stone-400 font-serif">पसंदीदा सेवाएं</div>
                    </div>
                  </div>
                  {favCount > 0 ? (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {favCount}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-stone-500" />
                  )}
                </a>

                {/* Admin Portal Shortcut */}
                <a
                  href="/admin"
                  onClick={handleCloseDrawer}
                  className="py-2.5 px-3.5 rounded-xl hover:bg-stone-800/60 text-amber-400/90 hover:text-amber-300 transition-colors flex items-center gap-2.5 text-xs font-medium min-h-[44px]"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Admin & Priest Portal (व्यवस्थापक)</span>
                </a>
              </nav>

              {/* Prominent Booking CTA inside drawer */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    handleCloseDrawer();
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-800 via-amber-800 to-amber-900 hover:from-red-900 hover:to-amber-950 text-white font-semibold text-sm shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] transition-all border border-amber-600/40"
                  aria-label="Book Pooja or Spiritual Tour"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>{t('nav.book', 'Book Pooja / Yatra Now')}</span>
                </button>
              </div>

              {/* Trust & Guarantee Stamp */}
              <div className="p-3 rounded-xl bg-stone-900/60 border border-amber-900/30 text-[11px] text-stone-300 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="leading-snug">
                  100% Vedic Certified Rituals conducted by authentic Ujjain Tirth Pandits.
                </span>
              </div>
            </div>

            {/* Drawer Footer Contact Section */}
            <div className="p-4 border-t border-stone-800 bg-stone-950/80 space-y-2 shrink-0">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors min-h-[48px] shadow-sm shadow-emerald-950/40"
                aria-label="Chat directly on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <span>WhatsApp Direct Consultation</span>
              </a>
              <a
                href={`tel:${settings.phone1}`}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-750 active:bg-stone-700 text-amber-200 font-medium text-xs flex items-center justify-center gap-2 transition-colors min-h-[44px] border border-stone-700"
                aria-label={`Call Pandit Ji at ${settings.phone1}`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Call Helpline: {settings.phone1}</span>
              </a>
            </div>

          </div>
        </>
      )}
    </header>
  );
};
