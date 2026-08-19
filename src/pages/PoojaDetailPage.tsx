import React from 'react';
import { StoreService } from '../services/store';
import { ContentService } from '../services/contentService';
import { SEOHead } from '../components/SEOHead';
import { FAQAccordion } from '../components/FAQAccordion';
import { PoojaCard } from '../components/PoojaCard';
import { FavoriteButton } from '../components/FavoriteButton';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { AuspiciousCountdownTimer } from '../components/AuspiciousCountdownTimer';
import { FadeIn } from '../components/FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { generatePoojaTitle } from '../utils/seoTitles';
import {
  Flame,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Users,
  AlertCircle,
  ChevronRight,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import {
  buildPoojaServiceSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildLocalBusinessSchema,
} from '../utils/seoSchemas';

interface PoojaDetailPageProps {
  slug: string;
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const PoojaDetailPage: React.FC<PoojaDetailPageProps> = ({ slug, onOpenBooking }) => {
  const { language, t, localize } = useLanguage();
  const settings = StoreService.getSettings();

  // Re-read from localStorage when API sync fires
  const [, setSyncTick] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setSyncTick((n) => n + 1);
    window.addEventListener('aastha:data-synced', handler);
    return () => window.removeEventListener('aastha:data-synced', handler);
  }, []);

  const pooja = StoreService.getPoojaBySlug(slug);

  // ── NOT FOUND ─────────────────────────────────────────────────────────────
  if (!pooja) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
          {language === 'hi' ? 'पूजा सेवा नहीं मिली' : 'Pooja Service Not Found'}
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          {language === 'hi'
            ? 'अनुरोधित पूजा पृष्ठ मौजूद नहीं है।'
            : 'The requested ritual page does not exist or may have been updated.'}
        </p>
        <a
          href="/pooja-services"
          className="inline-block px-6 py-2.5 rounded-xl bg-amber-800 text-white font-medium text-xs"
        >
          {t('action.view_all_poojas', 'Back to Pooja Directory')}
        </a>
      </div>
    );
  }

  // ── DATA ──────────────────────────────────────────────────────────────────
  const allPoojas = StoreService.getPoojas();
  const relatedPoojas = allPoojas
    .filter((p) => p.id !== pooja.id && p.categoryId === pooja.categoryId)
    .slice(0, 3);

  const enrichedPooja = ContentService.enrichPooja(pooja, language);
  const poojaName = localize(enrichedPooja, 'name', 'hindiName');
  const poojaDesc =
    localize(enrichedPooja, 'description', 'hindiDescription') ||
    localize(enrichedPooja, 'shortDescription', 'hindiShortDescription');
  const poojaCategory =
    localize(enrichedPooja, 'categoryName', 'hindiCategoryName') ||
    (language === 'hi' ? 'मंदिर पूजा सेवाएं' : 'Temple Pooja Services');
  const templeName = localize(enrichedPooja, 'templeName', 'hindiTempleName');
  const city = localize(enrichedPooja, 'city', 'hindiCity');
  const duration = localize(enrichedPooja, 'duration', 'hindiDuration');
  const ritualDetails = localize(enrichedPooja, 'ritualDetails', 'hindiRitualDetails');

  const offers =
    language === 'hi' && enrichedPooja.hindiWhatWeOffer?.length
      ? enrichedPooja.hindiWhatWeOffer
      : enrichedPooja.whatWeOffer;

  const benefits =
    language === 'hi' && enrichedPooja.hindiBenefits?.length
      ? enrichedPooja.hindiBenefits
      : enrichedPooja.benefits;

  const preparation =
    language === 'hi' && enrichedPooja.hindiPreparation?.length
      ? enrichedPooja.hindiPreparation
      : enrichedPooja.preparation;

  const whoCanConsider = enrichedPooja.whoCanConsider;

  const internalLinks: { anchor: string; link: string }[] =
    (enrichedPooja as any).internalLinks || [];

  // FAQs — use page-specific first, fall back to global
  const rawFaqs = (enrichedPooja as any).faqs;
  const rawAeo = (enrichedPooja as any).aeoQuestions;
  const poojaFaqs: { question: string; answer: string }[] =
    Array.isArray(rawFaqs) && rawFaqs.length > 0
      ? rawFaqs
      : Array.isArray(rawAeo) && rawAeo.length > 0
      ? rawAeo
      : StoreService.getFAQs()
          .filter((f) => f.category === 'Pooja' || f.category === 'General')
          .slice(0, 5)
          .map((f) => ({ question: f.question, answer: f.answer }));

  // ── SEO / JSON-LD ─────────────────────────────────────────────────────────
  const poojaSchema = buildPoojaServiceSchema(pooja);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pooja Services', url: '/pooja-services' },
    { name: pooja.name, url: `/pooja/${pooja.slug}` },
  ]);
  const faqSchema = buildFAQSchema(
    poojaFaqs.slice(0, 5).map((f) => ({ question: f.question, answer: f.answer }))
  );
  const localBusinessSchema = buildLocalBusinessSchema(settings);
  const jsonLd = [poojaSchema, breadcrumbSchema, faqSchema, localBusinessSchema];

  // ── DESCRIPTION RENDERER ──────────────────────────────────────────────────
  const renderStructuredDescription = (text?: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let buf: string[] = [];

    const flush = (key: number) => {
      if (buf.length > 0) {
        const joined = buf.join(' ').trim();
        if (joined) {
          elements.push(
            <p
              key={`p-${key}`}
              className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base mb-4"
            >
              {joined}
            </p>
          );
        }
        buf = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flush(i);
        return;
      }
      if (trimmed.startsWith('## ')) {
        flush(i);
        elements.push(
          <h2
            key={`h2-${i}`}
            className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-amber-100 pt-6 pb-2 border-b border-amber-100 dark:border-stone-800 mb-3"
          >
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flush(i);
        elements.push(
          <h3
            key={`h3-${i}`}
            className="text-lg font-serif font-bold text-amber-900 dark:text-amber-300 pt-4 mb-2"
          >
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        flush(i);
        elements.push(
          <div
            key={`li-${i}`}
            className="flex items-start gap-2.5 text-stone-700 dark:text-stone-300 text-sm my-1.5 ml-2"
          >
            <span className="text-amber-700 font-bold shrink-0 mt-0.5">•</span>
            <span>{trimmed.replace(/^-\s*/, '')}</span>
          </div>
        );
      } else {
        buf.push(trimmed);
      }
    });
    flush(99999);
    return elements;
  };

  // Icon rotation for benefit cards
  const benefitIcons = [Sparkles, ShieldCheck, Clock, CheckCircle2, Flame, Calendar, Users, MapPin];

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FFFDF8] dark:bg-[#151312] text-stone-900 dark:text-stone-100">

      {/* SEO Head — all existing signals preserved exactly */}
      <SEOHead
        title={generatePoojaTitle(pooja)}
        description={pooja.metaDescription || pooja.shortDescription}
        keywords={
          pooja.focusKeyword
            ? `${pooja.focusKeyword}, ${pooja.name}, ${pooja.templeName}, ${pooja.city} Pooja`
            : `${pooja.name}, ${pooja.templeName}, Ujjain Pooja Booking`
        }
        canonicalUrl={
          pooja.canonicalUrl ||
          `${typeof window !== 'undefined' ? window.location.origin : 'https://aasthaserasta.com'}/pooja/${pooja.slug}`
        }
        ogImage={pooja.featuredImage}
        ogImageAlt={`${pooja.name} - ${pooja.templeName}, ${pooja.city}`}
        jsonLd={jsonLd}
      />

      {/* ── 1. BREADCRUMB ─────────────────────────────────────────────────── */}
      <div className="bg-[#F6F0E6] dark:bg-[#1C1917] border-b border-[#E6DBC8] dark:border-stone-800 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav
            className="flex items-center space-x-2 text-xs font-medium text-stone-500 dark:text-stone-400"
            aria-label="Breadcrumb"
          >
            <a href="/" className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
              {language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}
            </a>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <a
              href="/pooja-services"
              className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors"
            >
              {language === 'hi' ? 'पूजा सेवाएं' : 'Pooja Services'}
            </a>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-stone-800 dark:text-stone-200 font-semibold truncate max-w-[180px] sm:max-w-none">
              {poojaName}
            </span>
          </nav>
        </div>
      </div>

      {/* ── 2. FULL-WIDTH HERO ────────────────────────────────────────────── */}
      <header className="relative bg-[#3A1518] dark:bg-[#1A0A0B] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,26,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <FadeIn direction="left">
              {/* Category + Favourite */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold tracking-wider uppercase border border-amber-500/20">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{poojaCategory}</span>
                </span>
                <FavoriteButton id={pooja.id} type="pooja" variant="button" />
              </div>

              {/* H1 — preserved exactly from DB */}
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight mt-2">
                {pooja.h1 || poojaName}
              </h1>

              {/* Hindi / English subtitle */}
              {(pooja.hindiName || pooja.name) && (
                <p className="text-amber-300/90 text-sm sm:text-base font-serif font-medium">
                  {language === 'hi' ? pooja.name : pooja.hindiName}
                </p>
              )}

              {/* Short description */}
              {pooja.shortDescription && (
                <p className="text-[#F4EDE4] text-xs sm:text-sm leading-relaxed max-w-2xl pt-1">
                  {pooja.shortDescription}
                </p>
              )}

              {/* Quick meta pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {(templeName || pooja.templeName) && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-200/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="line-clamp-1">
                      {templeName || pooja.templeName}
                      {city || pooja.city ? `, ${city || pooja.city}` : ''}
                    </span>
                  </span>
                )}
                {duration && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-200/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {language === 'hi' ? 'अवधि' : 'Duration'}: {duration}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  {language === 'hi' ? 'संपूर्ण सात्विक सामग्री शामिल' : 'Complete Samagri Included'}
                </span>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenBooking('Pooja', pooja.name)}
                  className="w-full sm:w-auto py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-955 font-bold text-xs sm:text-sm transition-all shadow-lg hover:-translate-y-0.5"
                >
                  {language === 'hi' ? 'अभी पूछताछ करें →' : 'ENQUIRE NOW →'}
                </button>
                <a
                  href={`https://wa.me/${settings?.whatsappNumber || '9111099799'}?text=${encodeURIComponent(
                    `Jai Shree Mahakal 🙏 I want to enquire about ${pooja.name} in Ujjain.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'WHATSAPP US'}</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: Featured image — EACH POOJA'S OWN IMAGE */}
          <div className="lg:col-span-5 relative">
            <FadeIn direction="right" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/20 aspect-[4/3] bg-stone-900">
                <img
                  src={pooja.featuredImage || '/src/assets/images/pooja_rudrabhishek_1786196070818.jpg'}
                  alt={`${poojaName} - ${templeName || pooja.templeName}, ${city || pooja.city}`}
                  loading="eager"
                  decoding="async"
                  {...({ fetchPriority: 'high' } as any)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent pointer-events-none" />
              </div>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* ── 3. QUICK SERVICE SUMMARY CARDS ───────────────────────────────── */}
      <section className="bg-stone-50 dark:bg-[#1E1B19] py-8 border-b border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider block">
                {language === 'hi' ? ' पूजा का प्रकार' : 'Pooja Type'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-amber-100 block mt-1">
                {poojaCategory}
              </span>
            </div>

            {(templeName || pooja.templeName) && (
              <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider block">
                  {language === 'hi' ? 'स्थान' : 'Location'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-amber-100 block mt-1 line-clamp-2">
                  {city || pooja.city || templeName || pooja.templeName}
                </span>
              </div>
            )}

            {duration && (
              <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider block">
                  {language === 'hi' ? 'अवधि' : 'Duration'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-amber-100 block mt-1">
                  {duration}
                </span>
              </div>
            )}

            <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'आयोजक' : 'Arranged By'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-amber-100 block mt-1">
                Aastha Sey Raasta Seva
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. QUICK ANSWER — AEO ────────────────────────────────────────── */}
      {pooja.quickAnswer && (
        <section className="bg-white dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="inline-block text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              {language === 'hi' ? 'त्वरित जानकारी' : 'QUICK ANSWER'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 mt-1 flex items-center justify-center gap-2 flex-wrap">
              <HelpCircle className="w-6 h-6 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>
                {language === 'hi' ? `${poojaName} क्या है?` : `What is ${pooja.name}?`}
              </span>
            </h2>
            <div className="p-6 sm:p-8 bg-[#F6F0E6] dark:bg-[#1C1917] rounded-3xl border border-[#E6DBC8] dark:border-stone-800 text-left shadow-sm">
              <p className="text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed">
                {pooja.quickAnswer}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. MAIN DESCRIPTION ───────────────────────────────────────────── */}
      {poojaDesc && (
        <section className="bg-[#FFFDF8] dark:bg-[#1A1816] py-16 border-b border-stone-200/60 dark:border-stone-800">
          <div className="max-w-4xl mx-auto px-4 text-left">
            <FadeIn direction="up">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 border-b border-amber-100 dark:border-stone-800 pb-2 mb-4">
                {language === 'hi' ? 'आध्यात्मिक महत्व एवं विधि परिचय' : 'Overview & Ritual Significance'}
              </h2>
              {renderStructuredDescription(poojaDesc)}
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── 6. RITUAL DETAILS & PREPARATION ──────────────────────────────── */}
      {(ritualDetails || (preparation && preparation.length > 0)) && (
        <section className="bg-[#F6F0E6] dark:bg-[#151312] py-16 border-b border-[#E6DBC8] dark:border-stone-800">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            {ritualDetails && (
              <FadeIn direction="up">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 border-b border-amber-200/50 dark:border-stone-800 pb-2 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-700 dark:text-amber-500 shrink-0" />
                  {language === 'hi' ? 'वैदिक पूजा विधि एवं मुख्य चरण' : 'Vedic Ritual Steps & Vidhi'}
                </h2>
                <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed whitespace-pre-line mt-4">
                  {ritualDetails}
                </p>
              </FadeIn>
            )}
            {preparation && preparation.length > 0 && (
              <FadeIn direction="up" delay={100}>
                <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-500 shrink-0" />
                    {language === 'hi'
                      ? 'भक्तों के लिए पूर्व तैयारी एवं नियम'
                      : 'Preparation for Devotees'}
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                    {preparation.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}
          </div>
        </section>
      )}

      {/* ── 7. TRADITIONAL BENEFITS ───────────────────────────────────────── */}
      {benefits && benefits.length > 0 && (
        <section className="bg-[#FFFDF8] dark:bg-[#1A1816] py-20 border-b border-stone-200/60 dark:border-stone-800">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            <FadeIn direction="up">
              <div className="text-center space-y-2">
                <span className="text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                  {language === 'hi' ? 'परंपरागत लाभ' : 'TRADITIONAL BENEFITS'}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100 mt-2">
                  {language === 'hi'
                    ? 'पारंपरिक ज्योतिषीय एवं शास्त्रोक्त लाभ'
                    : 'Traditional Astrological & Scriptural Benefits'}
                </h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => {
                const IconComp = benefitIcons[idx % benefitIcons.length];
                const colonIdx = benefit.indexOf(':');
                const hasColon = colonIdx > -1 && colonIdx < 60;
                const title = hasColon
                  ? benefit.slice(0, colonIdx).replace(/^\[.*?\]\s*/, '').trim()
                  : '';
                const body = hasColon ? benefit.slice(colonIdx + 1).trim() : benefit;
                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-850 text-left space-y-3 shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    {title && (
                      <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-amber-100 leading-snug">
                        {title}
                      </h3>
                    )}
                    <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                      {body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. WHAT WE OFFER — dark maroon panel ─────────────────────────── */}
      {offers && offers.length > 0 && (
        <section className="relative bg-[#3A1518] dark:bg-[#1A0A0B] text-white py-20 overflow-hidden border-t border-b border-[#4A1B1B]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,26,0.10),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10 text-left">
            <div className="space-y-6">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'हमारी व्यवस्था' : 'WHAT WE OFFER'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
                {language === 'hi' ? `${poojaName} व्यवस्था` : `${pooja.name} Arrangements`}
              </h2>
              <p className="text-[#F4EDE4] text-xs sm:text-sm leading-relaxed">
                {language === 'hi'
                  ? 'आस्था से रास्ता सेवा द्वारा संपूर्ण व्यवस्था श्रद्धा, प्रामाणिकता और सुविधा के साथ।'
                  : `Aastha Sey Raasta Seva provides complete arrangements for ${pooja.name} with devotion, authenticity and convenience.`}
              </p>
              {internalLinks.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-amber-400/70 text-[10px] font-bold uppercase tracking-wider block">
                    {language === 'hi' ? 'संबंधित सेवाएं' : 'Related Services'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {internalLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.link}
                        className="text-[11px] text-amber-200/70 hover:text-amber-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full transition-colors"
                      >
                        {link.anchor}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {offers.map((offer, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-stone-200 text-xs sm:text-sm leading-relaxed mt-0.5">{offer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. WHO CAN CONSIDER ───────────────────────────────────────────── */}
      {whoCanConsider && whoCanConsider.length > 0 && (
        <section className="bg-white dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-800">
          <div className="max-w-4xl mx-auto px-4 text-left space-y-6">
            <FadeIn direction="up">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 border-b border-amber-100 dark:border-stone-800 pb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-700 dark:text-amber-500 shrink-0" />
                {language === 'hi'
                  ? 'यह पूजा सेवा किसके लिए उपयुक्त है'
                  : 'Who Can Consider This Ritual'}
              </h2>
              <ul className="space-y-3 pt-2">
                {whoCanConsider.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-stone-700 dark:text-stone-300 text-sm sm:text-base"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── 10. FULL-WIDTH VEDIC BOOKING ASSISTANCE — NO SIDEBAR ─────────── */}
      <section className="bg-[#FFFDF8] dark:bg-[#1E1B19] py-16 border-b border-stone-200/60 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-[#1C1917] border-2 border-amber-400 dark:border-amber-500 rounded-3xl p-6 sm:p-8 shadow-xl text-center md:text-left md:grid md:grid-cols-12 md:gap-8 md:items-center">

            {/* Left Column */}
            <div className="md:col-span-7 space-y-4">
              <span className="text-amber-800 dark:text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'वैदिक पूजा बुकिंग सहायता' : 'VEDIC BOOKING ASSISTANCE'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 leading-tight">
                {language === 'hi' ? 'अपनी पूजा आरक्षित करें' : 'Reserve Your Vidhi'}
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
                {language === 'hi'
                  ? 'उज्जैन के अधिकृत पंडितों द्वारा नाम व गोत्र संकल्प।'
                  : 'Gotra sankalp reservation with authentic Ujjain Pandits.'}
              </p>
              <div className="bg-amber-500/5 rounded-2xl border border-amber-500/20 p-5 mt-2 text-xs sm:text-sm space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-stone-500 dark:text-stone-400">
                    {language === 'hi' ? 'मंदिर स्थान:' : 'Temple Location:'}
                  </span>
                  <span className="font-bold text-stone-800 dark:text-amber-100 text-right">
                    {templeName || pooja.templeName}
                    {city || pooja.city ? `, ${city || pooja.city}` : ''}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-stone-500 dark:text-stone-400">
                    {language === 'hi' ? 'पंडित दक्षिणा व सामग्री:' : 'Pandit Dakshina & Samagri:'}
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {language === 'hi' ? 'शामिल' : 'Included'}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-stone-500 dark:text-stone-400">
                    {language === 'hi' ? 'कस्टमाइजेशन:' : 'Customization:'}
                  </span>
                  <span className="font-bold text-stone-800 dark:text-amber-100">
                    {language === 'hi' ? 'उपलब्ध' : 'Available'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-5 mt-6 md:mt-0 flex flex-col justify-center">
              <button
                onClick={() => onOpenBooking('Pooja', pooja.name)}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-800 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 fill-current" />
                <span>{t('action.book_now', 'Book')} — {poojaName}</span>
              </button>
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '9111099799'}?text=${encodeURIComponent(
                  `Jai Shree Mahakal 🙏 I want to enquire about ${pooja.name} in Ujjain.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer mt-3"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t('action.whatsapp', 'WhatsApp Direct Enquiry')}</span>
              </a>
              <div className="text-center mt-6 space-y-1">
                <span className="text-stone-500 dark:text-stone-400 text-xs block">
                  {language === 'hi' ? 'तत्काल सहायता चाहिए?' : 'Need immediate assistance?'}
                </span>
                <a
                  href={`tel:${settings?.phone1 || '+919111099799'}`}
                  className="font-mono font-bold text-amber-800 dark:text-amber-400 hover:underline text-xs sm:text-sm block"
                >
                  {t('action.call_us', 'Call')} {settings?.phone1 || '+91 9111099799'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. AUSPICIOUS COUNTDOWN TIMER ───────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AuspiciousCountdownTimer
          poojaName={pooja.name}
          categoryName={pooja.categoryName}
          poojaSlug={pooja.slug}
          onOpenBooking={onOpenBooking}
        />
      </div>

      {/* ── 12. SOCIAL SHARE ─────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <SocialShareButtons
          title={poojaName}
          description={pooja.shortDescription}
          category={pooja.categoryName}
        />
      </div>

      {/* ── 13. FAQ ───────────────────────────────────────────────────────── */}
      {poojaFaqs.length > 0 && (
        <section className="bg-[#FFFDF8] dark:bg-[#1A1816] py-20 border-b border-stone-200/60 dark:border-stone-800">
          <div className="max-w-4xl mx-auto px-4 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'सामान्य प्रश्न' : 'FAQS & GUIDANCE'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
                {language === 'hi'
                  ? `${poojaName} — अक्सर पूछे जाने वाले प्रश्न`
                  : `Frequently Asked Questions — ${pooja.name}`}
              </h2>
            </div>
            <FAQAccordion faqs={poojaFaqs} />
          </div>
        </section>
      )}

      {/* ── 14. RELATED POOJA SERVICES ────────────────────────────────────── */}
      {relatedPoojas.length > 0 && (
        <section className="bg-[#F6F0E6] dark:bg-[#151312] py-20 border-b border-[#E6DBC8] dark:border-stone-800">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'अन्य पूजा सेवाएं' : 'EXPLORE SERVICES'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
                {language === 'hi' ? 'संबंधित वैदिक अनुष्ठान' : 'Related Vedic Rituals'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {relatedPoojas.map((p, idx) => (
                <PoojaCard
                  key={p.id}
                  pooja={p}
                  onBook={(name) => onOpenBooking('Pooja', name)}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 15. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#3A1518] dark:bg-[#1A0A0B] py-20 overflow-hidden">
        {pooja.featuredImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{ backgroundImage: `url('${pooja.featuredImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A1518]/80 to-[#3A1518]/90 dark:from-[#1A0A0B]/80 dark:to-[#1A0A0B]/90 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <FadeIn direction="up">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
              {language === 'hi'
                ? `${poojaName} की व्यवस्था करें`
                : `Plan Your ${pooja.name}`}
            </h2>
            <p className="text-[#F4EDE4] text-xs sm:text-sm max-w-2xl mx-auto">
              {language === 'hi'
                ? 'आस्था से रास्ता सेवा के साथ अनुभवी वैदिक पंडितों द्वारा पूजा की संपूर्ण व्यवस्था करें।'
                : `Enquire with Aastha Sey Raasta Seva to arrange ${pooja.name} with experienced and Vedic-qualified pandits.`}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button
                onClick={() => onOpenBooking('Pooja', pooja.name)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-955 font-bold text-sm transition-all shadow-lg"
              >
                {language === 'hi' ? 'अभी पूछताछ करें' : 'ENQUIRE NOW'}
              </button>
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '9111099799'}?text=${encodeURIComponent(
                  `Jai Shree Mahakal 🙏 I want to enquire about ${pooja.name} in Ujjain.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WHATSAPP US'}</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};
