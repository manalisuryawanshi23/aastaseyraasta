import React, { useState } from 'react';
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
} from 'lucide-react';
import { StoreService } from '../services/store';
import { useLanguage } from '../context/LanguageContext';
import { HeroBackgroundSlider } from '../components/HeroBackgroundSlider';
import { PoojaCard } from '../components/PoojaCard';
import { TourCard } from '../components/TourCard';
import { DestinationCard } from '../components/DestinationCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { SEOHead } from '../components/SEOHead';
import { FadeIn } from '../components/FadeIn';

interface HomePageProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking, onOpenSearch }) => {
  const settings = StoreService.getSettings();
  const categories = StoreService.getCategories();
  const poojas = StoreService.getPoojas().filter((p) => p.isFeatured);
  const tours = StoreService.getTours().filter((t) => t.isFeatured);
  const destinations = StoreService.getDestinations().filter((d) => d.isFeatured);
  const faqs = StoreService.getFAQs();
  const testimonials = StoreService.getTestimonials().filter((t) => t.isFeatured);

  const { language, t } = useLanguage();

  const [selectedCatId, setSelectedCatId] = useState<string>('all');

  const filteredPoojas =
    selectedCatId === 'all'
      ? poojas
      : poojas.filter((p) => p.categoryId === selectedCatId);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.businessName,
    alternateName: settings.hindiBusinessName,
    description: settings.defaultMetaDescription,
    telephone: settings.phone1,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: settings.city,
      addressRegion: settings.state,
      postalCode: settings.pincode,
      addressCountry: settings.country,
    },
    url: typeof window !== 'undefined' ? window.location.origin : 'https://aasthaserasta.com',
  };

  return (
    <div className="space-y-16 pb-12">
      <SEOHead jsonLd={organizationSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white pt-8 pb-16">
        
        {/* Animated Dynamic Background Slider */}
        <HeroBackgroundSlider />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 pt-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-medium tracking-wide uppercase backdrop-blur-md shadow-lg">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{t('hero.badge', 'Official Spiritual Services in Ujjain & Pilgrimage Hubs')}</span>
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
                Begin Your Sacred Journey with <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  {settings.businessName}
                </span>
              </>
            )}
          </h1>

          {/* Tagline */}
          <p className="text-amber-200/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-serif italic font-light">
            {t('hero.subtitle', `"${settings.tagline}" • Authentic Vedic Poojas, Rudrabhishek, Bhat Pooja & Guided Pilgrimages thoughtfully arranged in Ujjain.`)}
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
          <div className="pt-4 max-w-xl mx-auto">
            <button
              onClick={onOpenSearch}
              className="w-full py-3 px-4 rounded-xl bg-stone-900/80 border border-amber-500/30 text-stone-300 text-xs sm:text-sm flex items-center justify-between gap-3 hover:border-amber-400 transition-all shadow-lg"
            >
              <span className="flex items-center gap-2 text-stone-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Search Rudrabhishek, Bhat Pooja, Char Dham Yatra...</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-900/60 text-amber-200 text-xs font-semibold">
                Search
              </span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-amber-200/80 text-xs font-medium max-w-3xl mx-auto border-t border-amber-900/40">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Vedic Qualified Pandits</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Complete Samagri Vidhi</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Gotra & Name Sankalp</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>100% Transparent Services</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Pooja Services Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-200 dark:border-amber-800/50">
                <Flame className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Devotional Offerings</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
                Authentic Pooja Services in Ujjain
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Conducted strictly according to Vedic scriptures by experienced Brahmins with pure satvik samagri and gotra sankalp.
              </p>
            </div>

            <a
              href="/pooja-services"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-amber-400 hover:text-amber-950 dark:hover:text-amber-200 group"
            >
              <span>View All 15+ Poojas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FadeIn>

        {/* Category Filter Pills */}
        <FadeIn delay={100} direction="up">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCatId('all')}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCatId === 'all'
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              All Featured
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCatId === cat.id
                    ? 'bg-amber-800 text-white shadow-md'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Pooja Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoojas.map((pooja, index) => (
            <FadeIn key={pooja.id} delay={index * 120} direction="up">
              <PoojaCard
                pooja={pooja}
                onBook={(name) => onOpenBooking('Pooja', name)}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Featured Yatras & Spiritual Tours Section */}
      <section className="bg-gradient-to-b from-stone-100 to-amber-50/50 dark:from-stone-900/90 dark:to-[#1C1917] py-16 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200 dark:border-emerald-800/50">
                  <Compass className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Sacred Pilgrimages</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
                  Spiritual Tours & Yatra Packages
                </h2>
                <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl">
                  Thoughtfully organized private circuit tours across Ujjain, Omkareshwar, Baglamukhi Nalkheda, and major Himalayan Dham Yatras.
                </p>
              </div>

              <a
                href="/spiritual-tours"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-200 group"
              >
                <span>Explore All Yatras</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, index) => (
              <FadeIn key={tour.id} delay={index * 120} direction="up">
                <TourCard
                  tour={tour}
                  onBook={(name) => onOpenBooking('Tour', name)}
                />
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Sacred Destinations */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-900 dark:text-sky-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-sky-200 dark:border-sky-800/50">
              <MapPin className="w-3.5 h-3.5 text-sky-700 dark:text-sky-400" />
              <span>Sacred Holy Cities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
              Explore Sacred Pilgrimage Shrines
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-1">
              Discover temples, darshan guidelines, and local spiritual significance.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <FadeIn key={dest.id} delay={index * 100} direction="up">
              <DestinationCard destination={dest} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-stone-900 text-stone-100 py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider font-serif">
                Simple & Transparent Process
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                How Your Booking Works
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm">
                From gotra sankalp to divine prasad distribution, we manage every step with devotion.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <FadeIn delay={0} direction="up">
              <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3 relative h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-900/60 text-amber-300 font-serif font-bold text-lg flex items-center justify-center">
                  1
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">
                  Explore & Select Service
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Browse our detailed catalog of Poojas, Dosh Remedies, and Yatra circuits.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100} direction="up">
              <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3 relative h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-900/60 text-amber-300 font-serif font-bold text-lg flex items-center justify-center">
                  2
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">
                  Provide Gotra & Date
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Submit your preferred date, devotee names, and gotra details via website form or WhatsApp.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200} direction="up">
              <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3 relative h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-900/60 text-amber-300 font-serif font-bold text-lg flex items-center justify-center">
                  3
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">
                  Receive Confirmation
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Our Acharya coordinator confirms temple timing, priest allocation, and venue directions.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300} direction="up">
              <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3 relative h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-900/60 text-amber-300 font-serif font-bold text-lg flex items-center justify-center">
                  4
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">
                  Experience Divine Ritual
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Participate in the ceremony with peace of mind. Complete samagri and prasad distribution provided.
                </p>
              </div>
            </FadeIn>

          </div>

        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-8">
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-200 dark:border-amber-800/50">
                <Users className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Devotee Experiences</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
                Words of Faith & Gratitude
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, index) => (
              <FadeIn key={test.id} delay={index * 120} direction="up">
                <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 text-xs leading-relaxed italic">
                      &quot;{test.testimonial}&quot;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-stone-900 dark:text-stone-100">{test.name}</div>
                      <div className="text-stone-500 dark:text-stone-400">{test.location}</div>
                    </div>
                    {(test.service || test.tour) && (
                      <span className="text-[10px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-stone-800 px-2 py-0.5 rounded border border-amber-200 dark:border-stone-700">
                        {test.service || test.tour}
                      </span>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4">
        <FadeIn direction="up">
          <FAQAccordion faqs={faqs} />
        </FadeIn>
      </section>

      {/* Bottom Final CTA */}
      <section className="max-w-5xl mx-auto px-4">
        <FadeIn direction="up">
          <div className="bg-gradient-to-r from-red-950 via-amber-950 to-red-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
                Ready to Arrange Your Pooja or Pilgrimage?
              </h2>
              <p className="text-amber-200/80 text-xs sm:text-sm">
                Reach out to our Ujjain team for authentic guidance, gotra sankalp reservations, and customized spiritual tour itineraries.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => onOpenBooking('General')}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg"
                >
                  Book / Enquire Now
                </button>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
};
