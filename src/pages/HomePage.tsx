import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  MessageSquare,
  ArrowRight,
  Compass,
  MapPin,
  HelpCircle,
  Star,
  Users,
  Handshake,
  Church,
  HeartHandshake,
  Flower2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Tour } from '../types';

const tourTabs = [
  { id: 'ujjain-yatra', label: 'Ujjain Yatra', hindiLabel: 'उज्जैन यात्रा' },
  { id: 'spiritual-tours', label: 'Spiritual Tours', hindiLabel: 'आध्यात्मिक यात्राएं' },
  { id: 'himalayan', label: 'Himalayan Pilgrimage', hindiLabel: 'हिमालयन तीर्थ' },
  { id: 'trekking', label: 'Trekking', hindiLabel: 'ट्रेकिंग' },
];

const TourDiscoveryCard: React.FC<{ tour: Tour; index: number; onBook: (name: string) => void }> = ({ tour, index, onBook }) => {
  const { language, t, localize } = useLanguage();
  const tourName = localize(tour, 'name', 'hindiName');
  const tourShortDesc = localize(tour, 'shortDescription', 'hindiShortDescription');
  const tourDuration = localize(tour, 'duration', 'hindiDuration');

  // Custom route display:
  // e.g. "Ujjain → Omkareshwar" or "Ujjain → Omkareshwar → Indore"
  const getRouteText = () => {
    if (tour.id.includes('indore')) return 'Ujjain → Omkareshwar → Indore';
    if (tour.id.includes('baglamukhi')) return 'Ujjain → Omkareshwar → Nalkheda';
    if (tour.id.includes('omkareshwar')) return 'Ujjain → Omkareshwar';
    if (tour.id.includes('char-dham')) return 'Haridwar → Yamunotri → Gangotri → Kedarnath → Badrinath → Haridwar';
    // Fallback to destinations joined by arrow
    return tour.destinations.join(' → ');
  };

  // Get key destinations to show (concise list, e.g. 2-4 items)
  const getKeyDestinations = () => {
    if (tour.id.includes('indore')) {
      return ['Ujjain Darshan', 'Omkareshwar Darshan', 'Mamleshwar Darshan', 'Khajrana Ganesh Darshan'];
    }
    if (tour.id.includes('baglamukhi')) {
      return ['Ujjain Darshan', 'Omkareshwar Darshan', 'Mamleshwar Darshan', 'Baglamukhi Mandir Darshan', 'Baijnath Mahadev Darshan'];
    }
    if (tour.id.includes('omkareshwar')) {
      return ['Mahakaleshwar Darshan', 'Harsiddhi Shaktipeeth', 'Kalbhairav Darshan', 'Omkareshwar Darshan'];
    }
    // Fallback to placesCovered sliced to 4
    return tour.placesCovered ? tour.placesCovered.slice(0, 4) : tour.destinations;
  };

  return (
    <div className="group bg-white dark:bg-[#1C1917] rounded-3xl border border-stone-200/85 dark:border-stone-850 shadow-sm hover:shadow-xl hover:border-rose-400 dark:hover:border-rose-700/80 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <img
          src={tour.featuredImage || '/src/assets/images/tour_ujjain_omkareshwar_1786196108956.jpg'}
          alt={tourName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {tourDuration && (
          <div className="absolute bottom-3 left-3 bg-stone-950/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md border border-stone-850">
            {tourDuration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="text-[10px] uppercase font-bold tracking-wider text-rose-600 dark:text-rose-450 leading-none">
            {getRouteText()}
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors leading-snug">
            {tourName}
          </h3>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {tourShortDesc}
          </p>

          {/* Key places covered */}
          <div className="pt-1 flex flex-wrap gap-1.5">
            {getKeyDestinations().map((place, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-medium text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-900/60 px-2 py-0.5 rounded-md border border-stone-200/50 dark:border-stone-800">
                <MapPin className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                <span>{place}</span>
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
          <a
            href={`/tour/${tour.slug}`}
            className="text-xs font-bold text-rose-800 dark:text-rose-400 hover:text-rose-950 dark:hover:text-rose-300 flex items-center gap-1 transition-all"
          >
            <span>Explore Tour</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

import { StoreService } from '../services/store';
import { useLanguage } from '../context/LanguageContext';
import { HeroBackgroundSlider } from '../components/HeroBackgroundSlider';
import { PoojaCard } from '../components/PoojaCard';
import { TourCard } from '../components/TourCard';
import { DestinationCard } from '../components/DestinationCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { Testimonials } from '../components/Testimonials';
import { SEOHead } from '../components/SEOHead';
import { FadeIn } from '../components/FadeIn';
import { buildFAQSchema } from '../utils/seoSchemas';
import { DarshanCarousel } from '../components/DarshanCarousel';

interface HomePageProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking, onOpenSearch }) => {
  const settings = StoreService.getSettings();
  const categories = StoreService.getCategories();
  const poojas = StoreService.getPoojas().filter((p) => p.isFeatured);
  const allTours = StoreService.getTours();
  
  const [activeTourTab, setActiveTourTab] = useState<'spiritual-tours' | 'ujjain-yatra' | 'himalayan' | 'trekking'>('spiritual-tours');

  const getFilteredToursForTab = () => {
    switch (activeTourTab) {
      case 'ujjain-yatra':
        return allTours.filter(t => t.category === 'Ujjain Yatra' || t.category === 'Named Yatra').slice(0, 3);
      case 'spiritual-tours':
        // Display Ujjain - Omkareshwar, Ujjain - Omkareshwar - Indore, Ujjain - Omkareshwar - Baglamukhi
        // First 3 from Ujjain & Central India category
        return allTours.filter(t => t.category === 'Ujjain & Central India').slice(0, 3);
      case 'himalayan':
        return allTours.filter(t => t.category === 'Himalayan Yatra').slice(0, 3);
      case 'trekking':
        return allTours.filter(t => t.category === 'Trekking & High Altitude').slice(0, 3);
      default:
        return [];
    }
  };

  const featuredYatraKeywords = [
    '84-mahadev',
    '9-narayana',
    'sapt-sagar',
    '6-vinayak'
  ];
  const filteredTours = featuredYatraKeywords
    .map(kw => allTours.find(t => t.slug.includes(kw) || t.id.includes(kw)))
    .filter(Boolean) as typeof allTours;
  const destinations = StoreService.getDestinations().filter((d) => d.isFeatured);
  const faqs = StoreService.getFAQs();
  const testimonials = StoreService.getTestimonials().filter((t) => t.isFeatured);
  const galleryItems = StoreService.getGallery().filter((item) => item.isPublished);

  const { language, t } = useLanguage();

  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [galleryFilter, setGalleryFilter] = useState<'All Photos' | 'Pooja' | 'Darshan' | 'Ujjain Yatra' | 'Omkareshwar' | 'Himalayan Yatra' | 'Trekking'>('All Photos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Mix images naturally across all categories when 'All Photos' is active
  const mixedAllPhotos = React.useMemo(() => {
    const categoriesList = ['Pooja', 'Darshan', 'Ujjain Yatra', 'Omkareshwar', 'Himalayan Yatra', 'Trekking'] as const;
    const groups: Record<string, typeof galleryItems> = {};
    categoriesList.forEach((cat) => {
      groups[cat] = galleryItems.filter((item) => item.category === cat);
    });

    const mixed: typeof galleryItems = [];
    let maxLen = 0;
    categoriesList.forEach((cat) => {
      if (groups[cat].length > maxLen) {
        maxLen = groups[cat].length;
      }
    });

    for (let i = 0; i < maxLen; i++) {
      categoriesList.forEach((cat) => {
        if (groups[cat][i]) {
          mixed.push(groups[cat][i]);
        }
      });
    }
    return mixed;
  }, [galleryItems]);

  const filteredGalleryItems = galleryFilter === 'All Photos'
    ? mixedAllPhotos
    : galleryItems.filter((item) => item.category === galleryFilter);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Calculate active dot index depending on clientWidth (mobile vs desktop card sizes)
      const cardWidth = clientWidth < 640 ? clientWidth * 0.84 : 344;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(filteredGalleryItems.length - 1, Math.max(0, index)));

      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      }
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      const amount = clientWidth < 640 ? -280 : -344;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      const amount = clientWidth < 640 ? 280 : 344;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Reset scroll metrics and trigger switch animation whenever the filter changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setScrollProgress(0);
      setActiveIndex(0);
    }
    setAnimateKey((prev) => prev + 1);
  }, [galleryFilter]);

  // Keyboard navigation listener inside full-screen Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft' && lightboxIndex > 0) {
        setLightboxIndex(lightboxIndex - 1);
      } else if (e.key === 'ArrowRight' && lightboxIndex < filteredGalleryItems.length - 1) {
        setLightboxIndex(lightboxIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, filteredGalleryItems]);

  // Fetch all poojas directly to ensure we find the specifically requested ones
  // even if their isFeatured flag was toggled off in the CMS.
  const allPoojas = StoreService.getPoojas();

  // Use a resilient keyword matcher to prevent localStorage/DB sync ID mismatches
  const featuredKeywords = [
    'rudrabhishek',
    'bhat-pooja-mangalnath',
    'kaal-sarp',
    'navgraha-shanti',
    'grahan-dosh',
    'pitru-shanti'
  ];

  const filteredPoojas = featuredKeywords
    .map(kw => allPoojas.find(p => p.slug.includes(kw) || p.id.includes(kw)))
    .filter(Boolean) as typeof allPoojas;

  const faqSchema = buildFAQSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <div className="space-y-16 pb-12">
      <SEOHead
        title="Official Vedic Pooja Booking & Spiritual Tours in Ujjain"
        canonicalUrl="https://aasthaserasta.com/"
        ogImage="/src/assets/images/header_bg_spiritual_1786196057015.jpg"
        ogImageAlt="Aastha Sey Raasta Seva - Official Pooja Services & Spiritual Tours Ujjain"
        jsonLd={[faqSchema]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white pt-8 pb-16">
        
        {/* Animated Dynamic Background Slider */}
        <HeroBackgroundSlider />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 pt-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-medium tracking-wide uppercase backdrop-blur-md shadow-lg max-w-xs sm:max-w-none text-center">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 shrink-0" />
            <span className="leading-snug">{t('hero.badge', 'YOUR TRUSTED PARTNER FOR POOJA, DARSHAN & SPIRITUAL JOURNEYS')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-amber-50 tracking-tight leading-[1.15]">
            {language === 'hi' ? (
              <>
                {t('hero.title', 'पवित्र उज्जैन में प्रामाणिक वैदिक पूजा एवं तीर्थ यात्राएं')} <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  {settings.hindiBusinessName || settings.businessName}
                </span>
              </>
            ) : (
              <>
                Begin Your Journey of Faith with <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  Aastha Sey Raasta Seva
                </span>
              </>
            )}
          </h1>

          {/* Tagline */}
          <p className="text-amber-200/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-serif italic font-light">
            {t('hero.subtitle', 'From Vedic Poojas to Darshan and Spiritual Yatras, we help you plan every step of your journey.')}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={() => onOpenBooking('Pooja')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-medium text-sm hover:from-amber-700 hover:to-amber-900 shadow-xl shadow-amber-900/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{t('action.book_now', 'Book a Pooja')}</span>
            </button>

            <a
              href="/spiritual-tours"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-amber-200 font-medium text-sm border border-amber-500/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{t('action.view_itinerary', 'Explore Yatras')}</span>
            </a>
          </div>

          {/* Search Bar Prompt */}
          <div className="pt-4 max-w-xl mx-auto w-full px-2 sm:px-0">
            <button
              onClick={onOpenSearch}
              className="w-full py-3 px-4 rounded-xl bg-stone-900/80 border border-amber-500/30 text-stone-300 text-xs sm:text-sm flex items-center justify-between gap-2 hover:border-amber-400 transition-all shadow-lg"
            >
              <span className="flex items-center gap-2 text-stone-400 min-w-0">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{language === 'hi' ? 'रुद्राभिषेक, भात पूजा, चार धाम यात्रा खोजें...' : 'Search Rudrabhishek, Bhat Pooja, Char Dham...'}</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-900/60 text-amber-200 text-xs font-semibold shrink-0">
                {t('nav.search', 'Search')}
              </span>
            </button>
          </div>

          {/* Trust badges — 2 cols on mobile, 3 on md, 5 on lg */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-amber-200/80 text-[11px] sm:text-xs font-medium max-w-5xl mx-auto border-t border-amber-900/40">
            <div className="flex items-center justify-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">{language === 'hi' ? 'आसान पूछताछ' : 'Easy Enquiry'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Handshake className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">{language === 'hi' ? 'व्यक्तिगत समर्थन' : 'Personal Support'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Church className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">{language === 'hi' ? 'दर्शन सहायता' : 'Darshan Assistance'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">{language === 'hi' ? 'आध्यात्मिक यात्रा' : 'Spiritual Yatra'}</span>
            </div>
            {/* 5th item: centered row on 2-col mobile using col-span-2, single on larger */}
            <div className="flex items-center justify-center gap-1.5 col-span-2 md:col-span-1">
              <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">{language === 'hi' ? 'संपूर्ण व्यवस्था' : 'Complete Arrangements'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Pooja Services Section */}
      <section className="bg-[#FFFDF8] dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-850">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          
          {/* Section Header (Centered) */}
          <FadeIn direction="up">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold uppercase tracking-wider border border-amber-200 dark:border-amber-800/50">
                <Flame className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>{language === 'hi' ? 'वैदिक अनुष्ठान सेवा' : 'Devotional Offerings'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
                {t('home.featured_poojas', 'Pooja, Jaap & Havan Services in Ujjain')}
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-1 max-w-[800px]">
                {t('home.featured_poojas_desc', 'Explore a range of Pooja, Dosh Shanti, Jaap and Havan services arranged with experienced Pandits and thoughtful support from Aastha Sey Raasta Seva.')}
              </p>
            </div>
          </FadeIn>

          {/* Pooja Cards Grid (Exactly 6 featured Poojas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoojas.map((pooja, index) => (
              <PoojaCard
                key={pooja.id}
                pooja={pooja}
                index={index}
                onBook={(name) => onOpenBooking('Pooja', name)}
              />
            ))}
          </div>

          {/* View All Poojas Button */}
          <FadeIn delay={200} direction="up">
            <div className="flex justify-center pt-2">
              <a
                href="/pooja-services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-stone-900 dark:bg-amber-700 hover:bg-stone-800 dark:hover:bg-amber-800 text-white font-medium text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-stone-900/20 dark:shadow-amber-900/40"
              >
                <span>{t('action.view_all_poojas_btn', 'VIEW ALL POOJAS')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Darshan Assistance Section */}
      <section className="relative bg-[#3A1518] dark:bg-[#1A0A0B] py-16 max-w-full overflow-hidden space-y-10 border-b border-[#4A1B1B] dark:border-stone-850">
        {/* Background Image with transparency overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: `url('/src/assets/images/header_bg_spiritual_1786196057015.jpg')` }}
        />
        {/* Deep maroon gradient overlay (65-75%) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A1518]/70 via-[#3A1518]/75 to-[#3A1518]/70 dark:from-[#1A0A0B]/70 dark:via-[#1A0A0B]/75 dark:to-[#1A0A0B]/70 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 space-y-10">
          
          {/* Section Header (Centered) */}
          <FadeIn direction="up">
            <div className="flex flex-col items-center text-center space-y-3 px-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF8]/15 text-[#FFFDF8] text-xs font-semibold uppercase tracking-wider border border-[#FFFDF8]/20">
                <Flower2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('home.darshan_badge', 'DARSHAN ASSISTANCE')}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {t('home.darshan_title', 'Ujjain Darshan')}
              </h2>
              <p className="text-[#F4EDE4] text-xs sm:text-sm mt-1 max-w-[800px]">
                {t('home.darshan_desc', 'Plan your temple visits with convenient Darshan assistance and personal support from Aastha Sey Raasta Seva.')}
              </p>
            </div>
          </FadeIn>

          {/* Auto-Sliding Darshan Cards */}
          <DarshanCarousel />

          {/* Explore Button */}
          <FadeIn delay={200} direction="up">
            <div className="flex justify-center pt-2 px-4">
              <a
                href="/tour/ujjain-spiritual-tour"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-950/20"
              >
                <span>{t('action.explore_darshan_btn', 'EXPLORE UJJAIN DARSHAN')}</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Spiritual Tours Section */}
      <section className="bg-[#F6F0E6] dark:bg-[#1A1816] py-16 border-y border-[#E6DBC8] dark:border-stone-850">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          
          {/* Section Header */}
          <FadeIn direction="up">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 text-xs font-semibold uppercase tracking-wider border border-rose-200 dark:border-rose-800/50">
                <Compass className="w-3.5 h-3.5 text-rose-700 dark:text-rose-450" />
                <span>{language === 'hi' ? 'तीर्थ यात्रा परिपथ' : 'SPIRITUAL TOURS'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
                {t('home.tours_title', 'Plan Your Spiritual Journey')}
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-1 max-w-[800px] leading-relaxed">
                Explore thoughtfully planned pilgrimage routes covering Ujjain, nearby spiritual destinations, and longer pilgrimage journeys.
              </p>
            </div>
          </FadeIn>

          {/* Category Tabs — horizontally scrollable on mobile, centred on desktop */}
          <FadeIn delay={100} direction="up">
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex justify-start sm:justify-center">
              <div className="flex items-center gap-1 bg-white dark:bg-[#1C1917] p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs overflow-x-auto scrollbar-none touch-pan-x">
                {tourTabs.map((tab) => {
                  const active = activeTourTab === tab.id;
                  const labelText = language === 'hi' ? tab.hindiLabel : tab.label;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTourTab(tab.id as any)}
                      className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                        active
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-900/20'
                          : 'text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-stone-50 dark:hover:bg-stone-900/60'
                      }`}
                    >
                      {labelText}
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Tour Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredToursForTab().map((tour, index) => (
              <FadeIn key={tour.id} delay={index * 50} direction="up">
                <TourDiscoveryCard
                  tour={tour}
                  index={index}
                  onBook={(name) => onOpenBooking('Tour', name)}
                />
              </FadeIn>
            ))}
          </div>

          {/* View All Button */}
          <FadeIn delay={200} direction="up">
            <div className="flex justify-center pt-4">
              <a
                href="/spiritual-tours"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-stone-900 dark:bg-amber-700 hover:bg-stone-800 dark:hover:bg-amber-800 text-white font-medium text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-stone-900/20 dark:shadow-amber-900/40"
              >
                <span>{t('action.explore_all_tours_btn', 'EXPLORE ALL TOURS')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Why Choose Aastha Sey Raasta Seva Section */}
      <section className="relative bg-[#3A1518] dark:bg-[#1A0A0B] py-16 border-b border-[#4A1B1B] dark:border-stone-850 overflow-hidden">
        {/* Background Image with transparency overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
          style={{ backgroundImage: `url('/src/assets/images/yatra_omkareshwar_temple_1786193903123.jpg')` }}
        />
        {/* 70-80% deep maroon overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A1518]/75 via-[#3A1518]/80 to-[#3A1518]/75 dark:from-[#1A0A0B]/75 dark:via-[#1A0A0B]/80 dark:to-[#1A0A0B]/75 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 space-y-12">
          
          {/* Section Header */}
          <FadeIn direction="up">
            <div className="flex flex-col items-center text-center space-y-3">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'आस्था से रास्ता क्यों' : 'WHY AASTHA SEY RAASTA SEVA'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {language === 'hi' ? 'आस्था से रास्ता सेवा के साथ अपनी यात्रा की योजना बनाएं' : 'Plan Your Journey with Aastha Sey Raasta Seva'}
              </h2>
              <p className="text-[#F4EDE4] text-xs sm:text-sm mt-1 max-w-[800px] leading-relaxed">
                {language === 'hi'
                  ? 'पूजा और दर्शन से लेकर यात्रा और आध्यात्मिक दौरों तक, हम सरल पूछताछ, व्यक्तिगत सहायता और विचारशील व्यवस्था के साथ आपकी यात्रा की योजना बनाने में मदद करते हैं।'
                  : 'From Pooja and Darshan to Yatra and spiritual tours, we help you plan your journey with simple enquiry, personal support and thoughtful arrangements.'}
              </p>
            </div>
          </FadeIn>

          {/* Benefit Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Card 1: Easy Enquiry */}
            <FadeIn delay={0} direction="up">
              <div className="bg-white/95 dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4 relative h-full shadow-xs hover:shadow-md transition-all text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-700 dark:text-rose-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                  {language === 'hi' ? 'सरल पूछताछ' : 'Easy Enquiry'}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  {language === 'hi' ? 'अपनी सेवा या यात्रा के बारे में पूछताछ करने का सरल तरीका।' : 'Simple way to enquire about your service or journey.'}
                </p>
              </div>
            </FadeIn>

            {/* Card 2: Personal Support */}
            <FadeIn delay={50} direction="up">
              <div className="bg-white/95 dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4 relative h-full shadow-xs hover:shadow-md transition-all text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-700 dark:text-rose-455">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                  {language === 'hi' ? 'व्यक्तिगत सहायता' : 'Personal Support'}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  {language === 'hi' ? 'अपनी आध्यात्मिक यात्रा की योजना बनाने के लिए मार्गदर्शन।' : 'Guidance for planning your spiritual journey.'}
                </p>
              </div>
            </FadeIn>

            {/* Card 3: Darshan Assistance */}
            <FadeIn delay={100} direction="up">
              <div className="bg-white/95 dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4 relative h-full shadow-xs hover:shadow-md transition-all text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-700 dark:text-rose-455">
                  <Flower2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                  {language === 'hi' ? 'दर्शन सहायता' : 'Darshan Assistance'}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  {language === 'hi' ? 'मंदिर दर्शन के लिए सुविधाजनक व्यवस्था।' : 'Convenient arrangements for temple Darshan.'}
                </p>
              </div>
            </FadeIn>

            {/* Card 4: Spiritual Yatra & Tours */}
            <FadeIn delay={150} direction="up">
              <div className="bg-white/95 dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4 relative h-full shadow-xs hover:shadow-md transition-all text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-700 dark:text-rose-455">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                  {language === 'hi' ? 'आध्यात्मिक यात्रा एवं टूर' : 'Spiritual Yatra & Tours'}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  {language === 'hi' ? 'नियोजित तीर्थयात्रा और आध्यात्मिक पर्यटन का अनुभव करें।' : 'Explore planned pilgrimage journeys and spiritual tours.'}
                </p>
              </div>
            </FadeIn>

            {/* Card 5: Complete Arrangements */}
            <FadeIn delay={200} direction="up">
              <div className="bg-white/95 dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4 relative h-full shadow-xs hover:shadow-md transition-all text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-700 dark:text-rose-455">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                  {language === 'hi' ? 'पूर्ण व्यवस्था' : 'Complete Arrangements'}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">
                  {language === 'hi' ? 'आपकी आध्यात्मिक यात्रा का ध्यानपूर्वक प्रबंध।' : 'Your spiritual journey arranged with care.'}
                </p>
              </div>
            </FadeIn>

          </div>

          {/* Light Rounded CTA Container */}
          <FadeIn delay={250} direction="up">
            <div className="bg-[#F6F0E6] dark:bg-[#1C1917] text-stone-900 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl border border-[#E6DBC8] dark:border-stone-800 max-w-5xl mx-auto mt-12">
              <div className="space-y-3 max-w-2xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
                  {language === 'hi' ? 'क्या आप अपनी यात्रा की योजना बनाने के लिए तैयार हैं?' : 'Ready to Plan Your Journey?'}
                </h3>
                <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
                  {language === 'hi'
                    ? 'अपनी सेवा चुनें और अपनी यात्रा की योजना बनाना शुरू करने के लिए आस्था से रास्ता सेवा के साथ पूछताछ करें।'
                    : 'Choose your service and enquire with Aastha Sey Raasta Seva to start planning your journey.'}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => onOpenBooking('Pooja')}
                    className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-stone-900 dark:bg-amber-700 hover:bg-stone-800 dark:hover:bg-amber-800 text-white font-bold text-xs transition-all shadow-md"
                  >
                    {language === 'hi' ? 'अभी पूछताछ करें →' : 'ENQUIRE NOW →'}
                  </button>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>{language === 'hi' ? 'व्हाट्सएप पर जुड़ें' : 'WHATSAPP US'}</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Devotee Experiences (Testimonials) Section */}
      {testimonials && testimonials.length > 0 ? (
        <section className="bg-[#FFFDF8] dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-850">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
            <FadeIn direction="up">
              <span className="text-rose-700 dark:text-rose-455 text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'श्रद्धालु अनुभव' : 'DEVOTEE EXPERIENCES'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100 mt-2">
                {language === 'hi' ? 'हमारे श्रद्धालुओं द्वारा साझा किए गए अनुभव' : 'Experiences Shared by Our Devotees'}
              </h2>
            </FadeIn>
            <div className="text-left pt-6">
              <Testimonials
                testimonials={testimonials}
                onOpenBooking={onOpenBooking}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-[#FFFDF8] dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-850">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="text-rose-700 dark:text-rose-455 text-xs font-bold uppercase tracking-wider">
              {language === 'hi' ? 'श्रद्धालु अनुभव' : 'DEVOTEE EXPERIENCES'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
              {language === 'hi' ? 'आपका अनुभव महत्वपूर्ण है' : 'Your Experience Matters'}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              {language === 'hi'
                ? 'हम हर श्रद्धालु के अनुभव को महत्व देते हैं और पूजा, दर्शन, यात्रा और आध्यात्मिक यात्राओं के लिए अपनी सहायता में सुधार करना जारी रखते हैं।'
                : "We value every devotee's experience and continue to improve our support for Pooja, Darshan, Yatra and spiritual journeys."}
            </p>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <section className="bg-[#F6F0E6] dark:bg-[#1A1816] py-20 border-b border-[#E6DBC8] dark:border-stone-850 overflow-hidden">
        {/* Self-contained CSS Animations supporting hardware-accelerated transitions & prefers-reduced-motion */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes lightboxFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes lightboxZoomIn {
            from { transform: scale(0.96); }
            to { transform: scale(1); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-lightbox-fade {
            animation: lightboxFadeIn 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-lightbox-zoom {
            animation: lightboxZoomIn 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-fade-in-up, .animate-lightbox-fade, .animate-lightbox-zoom {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
            .group:hover .group-hover\\:scale-104 {
              transform: none !important;
            }
            .hover\\:-translate-y-1:hover {
              transform: none !important;
            }
          }
        `}} />

        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Section Header */}
          <FadeIn direction="up">
            <div className="flex flex-col items-center text-center space-y-3 px-4">
              <span className="text-rose-700 dark:text-rose-455 text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'हमारी गैलरी' : 'OUR GALLERY'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100 mt-1">
                {language === 'hi' ? 'क्षणों में एक यात्रा' : 'A Journey in Moments'}
              </h2>
              <p className="text-stone-600 dark:text-stone-350 text-xs sm:text-sm mt-1 max-w-[800px] leading-relaxed">
                {language === 'hi'
                  ? 'पूजा, दर्शन, यात्रा, टूर और ट्रेकिंग यात्राओं के क्षणों का अन्वेषण करें।'
                  : 'Explore moments from Pooja, Darshan, Yatra, Tours and Trekking journeys.'}
              </p>
            </div>
          </FadeIn>

          {/* Category Navigation Tabs */}
          <FadeIn delay={50} direction="up">
            <div className="flex justify-start md:justify-center overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none whitespace-nowrap md:mx-0 md:px-0 gap-8 border-b border-stone-200/60 dark:border-stone-800 max-w-4xl mx-auto">
              {(['All Photos', 'Pooja', 'Darshan', 'Ujjain Yatra', 'Omkareshwar', 'Himalayan Yatra', 'Trekking'] as const).map((cat) => {
                const isActive = galleryFilter === cat;
                const displayLabel = language === 'hi'
                  ? (cat === 'All Photos' ? 'सभी तस्वीरें' : cat === 'Pooja' ? 'पूजा' : cat === 'Darshan' ? 'दर्शन' : cat === 'Ujjain Yatra' ? 'उज्जैन यात्रा' : cat === 'Omkareshwar' ? 'ओंकारेश्वर' : cat === 'Himalayan Yatra' ? 'हिमालयन यात्रा' : 'ट्रेकिंग')
                  : cat.toUpperCase();
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setGalleryFilter(cat);
                      setLightboxIndex(null);
                    }}
                    className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 outline-hidden ${
                      isActive
                        ? 'border-rose-700 text-rose-700 dark:border-rose-500 dark:text-rose-455 font-extrabold'
                        : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-450'
                    }`}
                  >
                    {displayLabel}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Horizontal Image Carousel Wrapper */}
          <div className="relative px-4 md:px-12">
            
            {/* Carousel Navigation Arrow Controls (Desktop Only) */}
            {filteredGalleryItems.length > 0 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-amber-250 border border-stone-250 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-900 hover:scale-105 active:scale-95 transition-all shadow-md z-30"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollNext}
                  className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-amber-250 border border-stone-250 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-900 hover:scale-105 active:scale-95 transition-all shadow-md z-30"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Horizontal Carousel Snap List container */}
            {filteredGalleryItems.length > 0 ? (
              <div
                key={animateKey}
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory overflow-y-hidden animate-fade-in-up"
              >
                {filteredGalleryItems.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(index)}
                    className="bg-[#FFFDF8] dark:bg-[#1C1917] rounded-3xl overflow-hidden border border-[#E6DBC8] dark:border-stone-800 flex-shrink-0 flex flex-col snap-start hover:-translate-y-1 transition-all duration-300 group cursor-pointer w-[82vw] xs:w-[290px] sm:w-[320px] md:w-[340px] relative"
                  >
                    {/* Photograph Container */}
                    <div className="relative overflow-hidden aspect-[4/3] w-full">
                      <img
                        src={item.image}
                        alt={item.altText}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      />
                      {/* Subtle hover overlay (Desktop only) */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:hidden" />
                      
                      {/* Floating Expand view icon in upper-right on desktop hover */}
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-stone-900 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-250 shadow-md max-md:hidden z-20">
                        <Eye className="w-4 h-4 text-stone-850" />
                      </div>

                      {/* Desktop Hover bottom text banner */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/75 to-transparent text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 max-md:hidden z-10 text-left">
                        <h3 className="font-serif font-bold text-base text-amber-100 line-clamp-1">
                          {item.title}
                        </h3>
                        {item.location && (
                          <span className="text-xs text-stone-300 font-medium block mt-0.5">
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mobile Label block (Always visible underneath the image, clean photograph container) */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-1 md:hidden">
                      <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100 line-clamp-1 leading-snug">
                        {item.title}
                      </h3>
                      {item.location && (
                        <span className="text-xs text-stone-550 dark:text-stone-400 font-medium">
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white/40 dark:bg-stone-900/10 border border-dashed border-stone-300/40 rounded-2xl max-w-xl mx-auto p-6">
                <p className="text-stone-550 dark:text-stone-400 text-xs sm:text-sm">
                  {language === 'hi'
                    ? 'इस श्रेणी में अभी तक कोई फोटो उपलब्ध नहीं हैं।'
                    : 'No photographs available in this category yet.'}
                </p>
              </div>
            )}
          </div>

          {/* Dynamic dot-indicator ● ● ● ● ○ ○ */}
          {filteredGalleryItems.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              {filteredGalleryItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (scrollRef.current) {
                      const clientWidth = scrollRef.current.clientWidth;
                      const cardWidth = clientWidth < 640 ? clientWidth * 0.84 : 344;
                      scrollRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-rose-700 dark:bg-rose-500 scale-110'
                      : 'bg-stone-350 dark:bg-stone-700 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* View All Button */}
          <FadeIn delay={150} direction="up">
            <div className="flex justify-center pt-2">
              <a
                href="/gallery"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-stone-900 dark:bg-amber-700 hover:bg-stone-800 dark:hover:bg-amber-800 text-white font-medium text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-stone-900/20 dark:shadow-amber-900/40"
              >
                <span>{language === 'hi' ? 'पूरी गैलरी देखें →' : 'VIEW ALL GALLERY →'}</span>
              </a>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Lightbox Modal with Opening Zoom + Fade Transitions */}
      {lightboxIndex !== null && filteredGalleryItems[lightboxIndex] && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 select-none animate-lightbox-fade">
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2.5 bg-stone-900/60 hover:bg-stone-900/90 rounded-full transition-all hover:scale-105 active:scale-95 z-[10000]"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 sm:p-3 bg-stone-900/60 hover:bg-stone-900/90 rounded-full transition-all hover:scale-105 active:scale-95 z-50"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Next Button */}
          {lightboxIndex < filteredGalleryItems.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 sm:p-3 bg-stone-900/60 hover:bg-stone-900/90 rounded-full transition-all hover:scale-105 active:scale-95 z-50"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Main Content Area */}
          <div 
            className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center justify-center space-y-4 animate-lightbox-zoom"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredGalleryItems[lightboxIndex].image}
              alt={filteredGalleryItems[lightboxIndex].altText}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
            {/* Title / Description */}
            <div className="text-center text-white px-4 max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block text-center">
                {filteredGalleryItems[lightboxIndex].category}
              </span>
              <h3 className="text-sm sm:text-base font-serif font-bold mt-1 text-white leading-snug text-center">
                {filteredGalleryItems[lightboxIndex].title}
              </h3>
              {filteredGalleryItems[lightboxIndex].location && (
                <span className="text-xs text-stone-300 mt-1 block text-center">
                  {filteredGalleryItems[lightboxIndex].location}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Final CTA */}
      <section className="relative bg-[#3A1518] dark:bg-[#1A0A0B] py-20 overflow-hidden border-t border-[#4A1B1B] dark:border-stone-850">
        {/* Background Image with transparency overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
          style={{ backgroundImage: `url('/src/assets/images/tour_char_dham_1786196121631.jpg')` }}
        />
        {/* 70-80% deep maroon overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A1518]/75 via-[#3A1518]/80 to-[#3A1518]/75 dark:from-[#1A0A0B]/75 dark:via-[#1A0A0B]/80 dark:to-[#1A0A0B]/75 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <FadeIn direction="up">
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
                {t('home.cta_title', 'Ready to Arrange Your Pooja or Pilgrimage?')}
              </h2>
              <p className="text-[#F4EDE4] text-xs sm:text-sm">
                {t('home.cta_desc', 'Reach out to our Ujjain team for authentic guidance, gotra sankalp reservations, and customized spiritual tour itineraries.')}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  onClick={() => onOpenBooking('Pooja')}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg"
                >
                  {t('action.book_now', 'Book / Enquire Now')}
                </button>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>{t('action.whatsapp', 'Connect on WhatsApp')}</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};
