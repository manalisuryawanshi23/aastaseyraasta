import React from 'react';
import { StoreService } from '../services/store';
import { ContentService } from '../services/contentService';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { generatePoojaTitle } from '../utils/seoTitles';
import { FAQAccordion } from '../components/FAQAccordion';
import { PoojaCard } from '../components/PoojaCard';
import { FavoriteButton } from '../components/FavoriteButton';
import { ShareWhatsAppButton } from '../components/ShareWhatsAppButton';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { AuspiciousCountdownTimer } from '../components/AuspiciousCountdownTimer';
import { useLanguage } from '../context/LanguageContext';
import {
  Flame,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  MessageSquare,
  Users,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

import {
  buildPoojaServiceSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '../utils/seoSchemas';

interface PoojaDetailPageProps {
  slug: string;
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const PoojaDetailPage: React.FC<PoojaDetailPageProps> = ({ slug, onOpenBooking }) => {
  const { language, t, localize } = useLanguage();

  // Re-read from localStorage when API sync fires
  const [syncTick, setSyncTick] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setSyncTick((n) => n + 1);
    window.addEventListener('aastha:data-synced', handler);
    return () => window.removeEventListener('aastha:data-synced', handler);
  }, []);

  const settings = StoreService.getSettings();
  const pooja = StoreService.getPoojaBySlug(slug);

  if (!pooja) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          {language === 'hi' ? 'पूजा सेवा नहीं मिली' : 'Pooja Service Not Found'}
        </h1>
        <p className="text-stone-600 text-sm">
          {language === 'hi' ? 'अनुरोधित पूजा पृष्ठ मौजूद नहीं है।' : 'The requested ritual page does not exist or may have been updated.'}
        </p>
        <a href="/pooja-services" className="inline-block px-6 py-2.5 rounded-xl bg-amber-800 text-white font-medium text-xs">
          {t('action.view_all_poojas', 'Back to Pooja Directory')}
        </a>
      </div>
    );
  }

  const allPoojas = StoreService.getPoojas();
  const relatedPoojas = allPoojas.filter((p) => p.id !== pooja.id && p.categoryId === pooja.categoryId).slice(0, 3);

  const enrichedPooja = ContentService.enrichPooja(pooja, language);
  const poojaName = localize(enrichedPooja, 'name', 'hindiName');
  const poojaDesc = localize(enrichedPooja, 'description', 'hindiDescription') || localize(enrichedPooja, 'shortDescription', 'hindiShortDescription');
  const poojaCategory = localize(enrichedPooja, 'categoryName', 'hindiCategoryName') || (language === 'hi' ? 'मंदिर पूजा सेवाएं' : 'Temple Pooja Services');
  const templeName = localize(enrichedPooja, 'templeName', 'hindiTempleName');
  const city = localize(enrichedPooja, 'city', 'hindiCity');
  const duration = localize(enrichedPooja, 'duration', 'hindiDuration');
  const offers = language === 'hi' && enrichedPooja.hindiWhatWeOffer && enrichedPooja.hindiWhatWeOffer.length > 0
    ? enrichedPooja.hindiWhatWeOffer
    : enrichedPooja.whatWeOffer;
  const benefits = language === 'hi' && enrichedPooja.hindiBenefits && enrichedPooja.hindiBenefits.length > 0
    ? enrichedPooja.hindiBenefits
    : enrichedPooja.benefits;
  const preparation = language === 'hi' && enrichedPooja.hindiPreparation && enrichedPooja.hindiPreparation.length > 0
    ? enrichedPooja.hindiPreparation
    : enrichedPooja.preparation;
  const ritualDetails = localize(enrichedPooja, 'ritualDetails', 'hindiRitualDetails');

  // Use each pooja's own AEO questions (from faqs or aeoQuestions field); fall back to global FAQs
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

  // Build Rich JSON-LD Schemas for AEO / SEO / Google Search
  const poojaSchema = buildPoojaServiceSchema(pooja);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pooja Services', url: '/pooja-services' },
    { name: pooja.name, url: `/pooja/${pooja.slug}` },
  ]);
  const faqSchema = buildFAQSchema(poojaFaqs.slice(0, 5).map((f) => ({ question: f.question, answer: f.answer })));

  const renderStructuredDescription = (text?: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let paragraphBuffer: string[] = [];

    const flushParagraph = (key: number) => {
      if (paragraphBuffer.length > 0) {
        const paragraphText = paragraphBuffer.join(' ').trim();
        if (paragraphText) {
          elements.push(
            <p key={`p-${key}`} className="text-stone-700 leading-relaxed text-sm sm:text-base mb-4">
              {paragraphText}
            </p>
          );
        }
        paragraphBuffer = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushParagraph(index);
        return;
      }

      if (trimmed.startsWith('## ')) {
        flushParagraph(index);
        const heading = trimmed.replace(/^##\s+/, '');
        elements.push(
          <h2 key={`h2-${index}`} className="text-xl sm:text-2xl font-serif font-bold text-stone-900 pt-6 pb-2 border-b border-amber-100 mb-3">
            {heading}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushParagraph(index);
        const heading = trimmed.replace(/^###\s+/, '');
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg font-serif font-bold text-amber-900 pt-4 mb-2">
            {heading}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        flushParagraph(index);
        const item = trimmed.replace(/^- \s*/, '');
        elements.push(
          <div key={`li-${index}`} className="flex items-start gap-2.5 text-stone-700 text-sm sm:text-base my-1.5 ml-2">
            <span className="text-amber-700 font-bold shrink-0 mt-0.5">•</span>
            <span>{item}</span>
          </div>
        );
      } else {
        paragraphBuffer.push(trimmed);
      }
    });

    flushParagraph(99999);
    return elements;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <SEOHead
        title={generatePoojaTitle(pooja)}
        description={pooja.metaDescription || pooja.shortDescription}
        keywords={pooja.focusKeyword ? `${pooja.focusKeyword}, ${pooja.name}, ${pooja.templeName}, ${pooja.city} Pooja` : `${pooja.name}, ${pooja.templeName}, Ujjain Pooja Booking`}
        canonicalUrl={pooja.canonicalUrl || `https://aasthaserasta.com/pooja/${pooja.slug}`}
        ogImage={pooja.featuredImage}
        ogImageAlt={`${pooja.name} - ${pooja.templeName}, ${pooja.city}`}
        jsonLd={[poojaSchema, breadcrumbSchema, faqSchema]}
      />

      <Breadcrumbs
        items={[
          { label: t('nav.pooja', 'Pooja Services'), href: '/pooja-services' },
          { label: poojaName },
        ]}
      />

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Left Info */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-700" />
                <span>{poojaCategory}</span>
              </div>
              <FavoriteButton id={pooja.id} type="pooja" variant="button" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              {pooja.h1 || poojaName}
            </h1>

            {(pooja.hindiName || pooja.name) && (
              <p className="text-base font-serif text-amber-800 font-medium">
                {language === 'hi' ? pooja.name : pooja.hindiName}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600 pt-1">
              {(templeName || pooja.templeName) && (
                <div className="flex items-center gap-1 text-stone-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>{templeName || pooja.templeName}{city ? `, ${city}` : (pooja.city ? `, ${pooja.city}` : '')}</span>
                </div>
              )}
              {duration && (
                <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>{language === 'hi' ? 'अवधि' : 'Duration'}: {duration}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'hi' ? 'संपूर्ण सात्विक सामग्री शामिल' : 'Complete Samagri Included'}</span>
              </div>
            </div>
          </div>

          {/* Quick Answer Box for AEO */}
          {pooja.quickAnswer && (
            <div className="bg-amber-900 text-amber-50 p-6 sm:p-7 rounded-2xl border border-amber-800 shadow-md space-y-2">
              <div className="text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>{language === 'hi' ? 'त्वरित उत्तर' : 'Quick Answer'}</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-amber-100 font-medium">
                {pooja.quickAnswer}
              </p>
            </div>
          )}

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-video w-full bg-stone-100">
            <img
              src={pooja.featuredImage || '/src/assets/images/pooja_rudrabhishek_1786196070818.jpg'}
              alt={poojaName}
              loading="eager"
              decoding="async"
              {...({ fetchPriority: 'high' } as any)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detailed Description */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-100 pb-2">
              {language === 'hi' ? 'आध्यात्मिक महत्व एवं विधि परिचय' : 'Overview & Ritual Significance'}
            </h2>
            <div>
              {renderStructuredDescription(poojaDesc)}
            </div>
          </div>

          {/* Social Media Sharing */}
          <SocialShareButtons
            title={poojaName}
            description={pooja.shortDescription}
            category={pooja.categoryName}
          />

          {/* Upcoming Auspicious Muhurat Countdown Timer */}
          <AuspiciousCountdownTimer
            poojaName={pooja.name}
            categoryName={pooja.categoryName}
            poojaSlug={pooja.slug}
            onOpenBooking={onOpenBooking}
          />

          {/* What We Offer */}
          {offers && offers.length > 0 && (
            <div className="bg-amber-50/60 p-6 sm:p-8 rounded-2xl border border-amber-200/80 space-y-4">
              <h2 className="text-xl font-serif font-bold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-700" />
                <span>{language === 'hi' ? 'इस पूजा सेवा में क्या शामिल है' : 'What We Provide in This Service'}</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-800">
                {offers.map((offer, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{offer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Traditional Benefits */}
          {benefits && benefits.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-serif font-bold text-stone-900">
                {language === 'hi' ? 'पारंपरिक ज्योतिषीय एवं शास्त्रोक्त लाभ' : 'Traditional Astrological & Scriptural Benefits'}
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Flame className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Who Can Consider */}
          {pooja.whoCanConsider && pooja.whoCanConsider.length > 0 && (
            <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-700" />
                <span>{language === 'hi' ? 'यह पूजा सेवा किसके लिए उपयुक्त है' : 'Who Can Consider This Ritual'}</span>
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {pooja.whoCanConsider.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ritual Steps & Process */}
          {ritualDetails && (
            <div className="bg-stone-50/80 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-700" />
                <span>{language === 'hi' ? 'वैदिक पूजा विधि एवं मुख्य चरण' : 'Vedic Ritual Steps & Vidhi'}</span>
              </h2>
              <div className="text-stone-700 text-sm leading-relaxed whitespace-pre-line space-y-3">
                {ritualDetails}
              </div>
            </div>
          )}

          {/* Preparation & Vidhi */}
          {preparation && preparation.length > 0 && (
            <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>{language === 'hi' ? 'भक्तों के लिए पूर्व तैयारी एवं नियम' : 'Preparation for Devotees'}</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-stone-600">
                {preparation.map((prep, idx) => (
                  <li key={idx}>{prep}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Right Sticky Booking Card */}
        <div className="lg:sticky lg:top-24 space-y-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-xl space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-amber-800">
                {language === 'hi' ? 'वैदिक पूजा बुकिंग सहायता' : 'Vedic Booking Assistance'}
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                {language === 'hi' ? 'अपनी पूजा आरक्षित करें' : 'Reserve Your Vidhi'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {language === 'hi' ? 'उज्जैन के अधिकृत पंडितों द्वारा नाम व गोत्र संकल्प।' : 'Gotra sankalp reservation with authentic Ujjain Pandits.'}
              </p>
            </div>

            <div className="space-y-3 text-xs text-stone-700 bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
              <div className="flex items-center justify-between">
                <span>{language === 'hi' ? 'मंदिर स्थान:' : 'Temple Location:'}</span>
                <span className="font-semibold text-stone-900">{pooja.templeName || pooja.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{language === 'hi' ? 'पंडित दक्षिणा व सामग्री:' : 'Pandit Dakshina & Samagri:'}</span>
                <span className="font-semibold text-emerald-800">{language === 'hi' ? 'शामिल' : 'Included'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{language === 'hi' ? 'कस्टमाइजेशन:' : 'Customization:'}</span>
                <span className="font-semibold text-stone-900">{language === 'hi' ? 'उपलब्ध' : 'Available'}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('Pooja', pooja.name)}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-800 via-amber-800 to-amber-900 text-white font-medium text-sm hover:from-red-900 hover:to-amber-950 shadow-md shadow-amber-900/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t('action.book_now', 'Book')} - {poojaName}</span>
            </button>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Jai Shree Mahakal 🙏 I want to enquire about ${pooja.name} in Ujjain.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-xl bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{t('action.whatsapp', 'WhatsApp Direct Enquiry')}</span>
            </a>

            <div className="pt-2 text-center text-xs text-stone-500 space-y-1">
              <div>{language === 'hi' ? 'तत्काल सहायता चाहिए?' : 'Need immediate assistance?'}</div>
              <a href={`tel:${settings.phone1}`} className="font-mono font-bold text-amber-800 hover:underline">
                {t('action.call_us', 'Call')} {settings.phone1}
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* FAQs */}
      {poojaFaqs.length > 0 && (
        <section className="pt-8 border-t border-stone-200">
          <FAQAccordion
            faqs={poojaFaqs}
            title={language === 'hi' ? `${poojaName} — अक्सर पूछे जाने वाले प्रश्न` : `Frequently Asked Questions — ${poojaName}`}
          />
        </section>
      )}

      {/* Related Poojas */}
      {relatedPoojas.length > 0 && (
        <section className="pt-8 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            {language === 'hi' ? 'संबंधित वैदिक अनुष्ठान' : 'Related Vedic Rituals'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPoojas.map((p) => (
              <PoojaCard key={p.id} pooja={p} onBook={(name) => onOpenBooking('Pooja', name)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
