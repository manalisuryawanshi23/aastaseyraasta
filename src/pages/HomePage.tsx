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
import { Testimonials } from '../components/Testimonials';
import { SEOHead } from '../components/SEOHead';
import { FadeIn } from '../components/FadeIn';
import { buildFAQSchema } from '../utils/seoSchemas';

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
                <span>{language === 'hi' ? 'रुद्राभिषेक, भात पूजा, चार धाम यात्रा खोजें...' : 'Search Rudrabhishek, Bhat Pooja, Char Dham Yatra...'}</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-900/60 text-amber-200 text-xs font-semibold">
                {t('nav.search', 'Search')}
              </span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-amber-200/80 text-xs font-medium max-w-3xl mx-auto border-t border-amber-900/40">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'वेदपाठी विद्वान ब्राह्मण' : 'Vedic Qualified Pandits'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'संपूर्ण सात्विक सामग्री' : 'Complete Samagri Vidhi'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'नाम व गोत्र संकल्प' : 'Gotra & Name Sankalp'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? '100% पारदर्शी सेवा' : '100% Transparent Services'}</span>
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
                <span>{language === 'hi' ? 'वैदिक अनुष्ठान सेवा' : 'Devotional Offerings'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
                {t('home.featured_poojas', 'Authentic Pooja Services in Ujjain')}
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl">
                {t('home.featured_poojas_desc', 'Conducted strictly according to Vedic scriptures by experienced Brahmins with pure satvik samagri and gotra sankalp.')}
              </p>
            </div>

            <a
              href="/pooja-services"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-amber-400 hover:text-amber-950 dark:hover:text-amber-200 group"
            >
              <span>{t('action.view_all_poojas', 'View All 15+ Poojas')}</span>
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
              {t('action.all_featured', 'All Featured')}
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
                {language === 'hi' && cat.hindiName ? cat.hindiName : cat.name}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Pooja Cards Grid */}
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
      </section>

      {/* Featured Yatras & Spiritual Tours Section */}
      <section className="bg-gradient-to-b from-stone-100 to-amber-50/50 dark:from-stone-900/90 dark:to-[#1C1917] py-16 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200 dark:border-emerald-800/50">
                  <Compass className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>{language === 'hi' ? 'तीर्थ यात्रा पैकेज' : 'Sacred Pilgrimages'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
                  {t('home.featured_tours', 'Spiritual Tours & Yatra Packages')}
                </h2>
                <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl">
                  {t('home.featured_tours_desc', 'Thoughtfully organized private circuit tours across Ujjain, Omkareshwar, Baglamukhi Nalkheda, and major Himalayan Dham Yatras.')}
                </p>
              </div>

              <a
                href="/spiritual-tours"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-200 group"
              >
                <span>{t('action.view_all_tours', 'Explore All Yatras')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, index) => (
              <TourCard
                key={tour.id}
                tour={tour}
                index={index}
                onBook={(name) => onOpenBooking('Tour', name)}
              />
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
              <span>{language === 'hi' ? 'पवित्र तीर्थ क्षेत्र' : 'Sacred Holy Cities'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
              {t('home.featured_destinations', 'Explore Sacred Pilgrimage Shrines')}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-1">
              {t('home.featured_destinations_desc', 'Discover temples, darshan guidelines, and local spiritual significance.')}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.id} destination={dest} index={index} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-stone-900 text-stone-100 py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider font-serif">
                {t('home.how_it_works_badge', 'Simple & Transparent Process')}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {t('home.how_it_works_title', 'How Your Booking Works')}
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm">
                {t('home.how_it_works_desc', 'From gotra sankalp to divine prasad distribution, we manage every step with devotion.')}
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
                  {t('step.1_title', 'Explore & Select Service')}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {t('step.1_desc', 'Browse our detailed catalog of Poojas, Dosh Remedies, and Yatra circuits.')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100} direction="up">
              <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3 relative h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-900/60 text-amber-300 font-serif font-bold text-lg flex items-center justify-center">
                  2
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">
                  {t('step.2_title', 'Provide Gotra & Date')}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {t('step.2_desc', 'Submit your preferred date, devotee names, and gotra details via website form or WhatsApp.')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200} direction="up">
              <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3 relative h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-900/60 text-amber-300 font-serif font-bold text-lg flex items-center justify-center">
                  3
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">
                  {t('step.3_title', 'Receive Confirmation')}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {t('step.3_desc', 'Our Acharya coordinator confirms temple timing, priest allocation, and venue directions.')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300} direction="up">
              <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3 relative h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-900/60 text-amber-300 font-serif font-bold text-lg flex items-center justify-center">
                  4
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">
                  {t('step.4_title', 'Experience Divine Ritual')}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {t('step.4_desc', 'Participate in the ceremony with peace of mind. Complete samagri and prasad distribution provided.')}
                </p>
              </div>
            </FadeIn>

          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4">
        <Testimonials
          testimonials={testimonials}
          onOpenBooking={onOpenBooking}
        />
      </section>

      {/* AEO / GEO Direct Answer Knowledge Base Section */}
      <section className="max-w-7xl mx-auto px-4">
        <FadeIn direction="up">
          <div className="bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300/40 dark:border-amber-800/40 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 text-center max-w-3xl mx-auto">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                {t('home.aeo_badge', 'Search Engine & AI Direct Answer Knowledge Base')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
                {t('home.aeo_title', 'Ujjain Temple Rituals & Pilgrimage Authority Guide')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                {t('home.aeo_desc', 'Direct answers to frequently searched questions about Ujjain Poojas, Mahakaleshwar Bhasma Aarti, Mangalnath Bhat Pooja, Kaal Sarp Dosh, and Himalayan Char Dham Yatras.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm leading-relaxed">
              <div className="bg-white dark:bg-[#1C1917] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
                <h3 className="font-serif font-bold text-base text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <span>🛕 {t('aeo.q1', 'What is the significance of Ujjain for Vedic Poojas?')}</span>
                </h3>
                <p className="text-stone-600 dark:text-stone-300">
                  {t('aeo.a1', 'Ujjain (Avantika Puri) is located on the Tropic of Cancer and is recognized as the earth’s central meridian in ancient Vedic astrology (Surya Siddhanta). It houses Mahakaleshwar (one of 12 Jyotirlingas), Mangalnath (birthplace of Mars/Mangal), Angareshwar, and Siddhvat, making it the most potent site in India for Rudrabhishek, Bhat Pooja, and Dosh Shanti rituals.')}
                </p>
              </div>

              <div className="bg-white dark:bg-[#1C1917] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
                <h3 className="font-serif font-bold text-base text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <span>🔥 {t('aeo.q2', 'Where is Kaal Sarp Dosh & Bhat Pooja performed?')}</span>
                </h3>
                <p className="text-stone-600 dark:text-stone-300">
                  {t('aeo.a2', 'Manglik Dosh & Bhat Pooja is performed exclusively at Mangalnath Temple or Angareshwar Temple in Ujjain. Kaal Sarp Dosh and Rahu-Ketu Shanti are performed at Ramghat on the banks of Shipra River or at Mahakaleshwar Kshetra by certified Vedic Karmakandi Pandits with individual Gotra Sankalp.')}
                </p>
              </div>

              <div className="bg-white dark:bg-[#1C1917] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
                <h3 className="font-serif font-bold text-base text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <span>🛡️ {t('aeo.q3', 'How to book authentic online/offline Poojas in Ujjain?')}</span>
                </h3>
                <p className="text-stone-600 dark:text-stone-300">
                  {t('aeo.a3', 'Through Aastha Sey Raasta Seva, devotees can book in-person rituals or Live HD Video Stream Poojas. Our team arranges all authentic samagri, temple permissions, pandit booking, and delivers sanctified Mahakal Prasadam with Bhasma directly to your doorstep.')}
                </p>
              </div>

              <div className="bg-white dark:bg-[#1C1917] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
                <h3 className="font-serif font-bold text-base text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <span>🏔️ {t('aeo.q4', 'What pilgrimage packages are offered by Aastha Sey Raasta?')}</span>
                </h3>
                <p className="text-stone-600 dark:text-stone-300">
                  {t('aeo.a4', 'We organize custom circuits including Ujjain 11-Shrine Spiritual Tour, Omkareshwar Jyotirlinga, Baglamukhi Temple Nalkheda, Pashupatinath Mandsaur, 84 Mahadev Yatra, Char Dham Yatra (Kedarnath, Badrinath, Gangotri, Yamunotri), and Himalayan treks like Kedarkantha and Kuari Pass.')}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

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
                {t('home.cta_title', 'Ready to Arrange Your Pooja or Pilgrimage?')}
              </h2>
              <p className="text-amber-200/80 text-xs sm:text-sm">
                {t('home.cta_desc', 'Reach out to our Ujjain team for authentic guidance, gotra sankalp reservations, and customized spiritual tour itineraries.')}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
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
          </div>
        </FadeIn>
      </section>

    </div>
  );
};
