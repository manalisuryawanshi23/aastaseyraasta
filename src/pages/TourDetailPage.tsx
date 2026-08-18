import React from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { generateTourTitle } from '../utils/seoTitles';
import { TourCard } from '../components/TourCard';
import { FavoriteButton } from '../components/FavoriteButton';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Sparkles,
  Phone,
  MessageSquare,
  Car,
  Hotel,
  Utensils,
  ChevronDown,
} from 'lucide-react';

import {
  buildTourSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '../utils/seoSchemas';
import { FAQAccordion } from '../components/FAQAccordion';

interface TourDetailPageProps {
  slug: string;
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({ slug, onOpenBooking }) => {
  const { language, t, localize, translateText } = useLanguage();

  // Re-read from localStorage when API sync fires
  const [syncTick, setSyncTick] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setSyncTick((n) => n + 1);
    window.addEventListener('aastha:data-synced', handler);
    return () => window.removeEventListener('aastha:data-synced', handler);
  }, []);

  const settings = StoreService.getSettings();
  const tour = StoreService.getTourBySlug(slug);

  if (!tour) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          {language === 'hi' ? 'यात्रा पैकेज नहीं मिला' : 'Tour Package Not Found'}
        </h1>
        <p className="text-stone-600 text-sm">
          {language === 'hi'
            ? 'अनुरोधित तीर्थ यात्रा पैकेज उपलब्ध नहीं है या अद्यतित कर दिया गया है।'
            : 'The requested yatra package does not exist or may have been updated.'}
        </p>
        <a href="/spiritual-tours" className="inline-block px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-medium text-xs">
          {t('action.back_to_tours', 'Back to Tour Directory')}
        </a>
      </div>
    );
  }

  const tourName = localize(tour, 'name', 'hindiName');
  const tourShortDesc = localize(tour, 'shortDescription', 'hindiShortDescription');
  const tourCategory = localize(tour, 'category', 'hindiCategory') || (language === 'hi' ? 'तीर्थ यात्रा परिपथ' : 'Pilgrimage Circuit');
  const tourDuration = localize(tour, 'duration', 'hindiDuration');
  const tourStart = localize(tour, 'startingPoint', 'hindiStartingPoint');
  const tourEnd = localize(tour, 'endingPoint', 'hindiEndingPoint');
  const tourPlacesCovered = localize(tour, 'placesCovered', 'hindiPlacesCovered') || [];
  const tourItinerary = localize(tour, 'itinerary', 'hindiItinerary') || tour.itinerary;
  const tourIncluded = localize(tour, 'included', 'hindiIncluded') || tour.included || [];
  const tourExcluded = localize(tour, 'excluded', 'hindiExcluded') || tour.excluded || [];

  const allTours = StoreService.getTours();
  const relatedTours = allTours.filter((t) => t.id !== tour.id).slice(0, 3);
  const tourFaqs: { question: string; answer: string }[] =
    (tour as any).faqs?.length > 0
      ? (tour as any).faqs
      : (tour as any).aeoQuestions?.length > 0
      ? (tour as any).aeoQuestions
      : StoreService.getFAQs()
          .filter((f) => f.category === 'Tour' || f.category === 'General')
          .slice(0, 5)
          .map((f) => ({ question: f.question, answer: f.answer }));

  // Build JSON-LD Schemas for search engines & AI assistants
  const tourSchema = buildTourSchema(tour);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Spiritual Tours', url: '/spiritual-tours' },
    { name: tour.name, url: `/spiritual-tours/${tour.slug}` },
  ]);
  const faqSchema = buildFAQSchema(tourFaqs.slice(0, 5).map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <SEOHead
        title={generateTourTitle(tour)}
        description={tour.metaDescription || tour.shortDescription}
        keywords={tour.focusKeyword ? `${tour.focusKeyword}, ${tour.name}, ${tour.startingPoint} Tour` : `${tour.name}, Spiritual Yatra, Ujjain Pilgrimage Package`}
        canonicalUrl={tour.canonicalUrl || `https://aasthaserasta.com/spiritual-tours/${tour.slug}`}
        ogImage={tour.featuredImage}
        ogImageAlt={`${tour.name} - ${tour.startingPoint}`}
        jsonLd={[tourSchema, breadcrumbSchema, faqSchema]}
      />

      <Breadcrumbs
        items={[
          { label: t('nav.tours', 'Spiritual Tours'), href: '/spiritual-tours' },
          { label: tourName },
        ]}
      />

      {/* Header Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>{tourCategory}</span>
              </div>
              <FavoriteButton id={tour.id} type="tour" variant="button" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              {tourName}
            </h1>

            <p className="text-stone-600 text-sm leading-relaxed">
              {tourShortDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-700 pt-1">
              {tourDuration && (
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'hi' ? 'अवधि' : 'Duration'}: {tourDuration}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg">
                <MapPin className="w-4 h-4 text-stone-500" />
                <span>{language === 'hi' ? 'प्रारंभ / समापन' : 'Start/End'}: {tourStart} {language === 'hi' ? 'से' : 'to'} {tourEnd}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-video w-full bg-stone-100">
            <img
              src={tour.featuredImage || '/assets/images/yatra_omkareshwar_temple_1786193903123.jpg'}
              alt={tourName}
              loading="eager"
              decoding="async"
              {...({ fetchPriority: 'high' } as any)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Places Covered Tags */}
          {tourPlacesCovered && tourPlacesCovered.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-stone-900 text-base">
                {t('tour.places_covered_title', 'Major Destinations & Shrines Covered')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tourPlacesCovered.map((place: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-emerald-700" />
                    <span>{place}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Sharing */}
          <SocialShareButtons
            title={tourName}
            description={tourShortDesc}
            category={tourCategory}
          />

          {/* Day-Wise Itinerary */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <span>{t('tour.itinerary_title', 'Detailed Day-Wise Yatra Itinerary')}</span>
            </h2>

            <div className="space-y-6">
              {tourItinerary.map((day: any) => (
                <div key={day.dayNumber} className="border-l-2 border-emerald-600 pl-4 space-y-2 relative">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold">
                    {day.dayNumber}
                  </div>
                  <div className="font-serif font-bold text-stone-900 text-base">
                    {language === 'hi' ? `दिन ${day.dayNumber}: ` : `Day ${day.dayNumber}: `}
                    {day.hindiTitle && language === 'hi' ? day.hindiTitle : day.title}
                  </div>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {day.hindiDescription && language === 'hi' ? day.hindiDescription : day.description}
                  </p>
                  {(day.accommodation || day.hindiAccommodation) && (
                    <div className="text-xs text-stone-500 font-medium pt-1 flex items-center gap-1">
                      <Hotel className="w-3.5 h-3.5 text-stone-400" />
                      <span>{language === 'hi' ? 'आवास / रात्रि विश्राम' : 'Stay'}: {day.hindiAccommodation && language === 'hi' ? day.hindiAccommodation : translateText(day.accommodation)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tourIncluded && tourIncluded.length > 0 && (
              <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200/80 space-y-3">
                <h3 className="font-serif font-bold text-emerald-950 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{t('tour.inclusions', "What's Included in Package")}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                  {tourIncluded.map((inc: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tourExcluded && tourExcluded.length > 0 && (
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
                <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-stone-500" />
                  <span>{t('tour.exclusions', "What's Excluded")}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  {tourExcluded.map((exc: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Right Sticky Booking Card */}
        <div className="lg:sticky lg:top-24 space-y-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-emerald-300 shadow-xl space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-emerald-800">
                {t('tour.sidebar_title', 'Tour Reservation & Customization')}
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                {t('action.book_tour', 'Book / Customize Yatra')}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {t('tour.sidebar_sub', 'Personalized vehicle, hotel bookings & Pandit darshan assistance.')}
              </p>
            </div>

            <div className="space-y-3 text-xs text-stone-700 bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/60">
              <div className="flex items-center justify-between">
                <span>{language === 'hi' ? 'वाहन प्रकार:' : 'Vehicle Type:'}</span>
                <span className="font-semibold text-stone-900">{language === 'hi' ? 'एसी कैब / एसयूवी / टेम्पो' : 'AC Cab / SUV / Tempo'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{language === 'hi' ? 'दर्शन सहायता:' : 'Darshan Assistance:'}</span>
                <span className="font-semibold text-emerald-800">{language === 'hi' ? 'शामिल' : 'Included'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{language === 'hi' ? 'यात्रा तिथि:' : 'Custom Dates:'}</span>
                <span className="font-semibold text-stone-900">{language === 'hi' ? 'सुविधानुसार लचीली' : 'Flexible'}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('Tour', tour.name)}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 text-white font-medium text-sm hover:bg-emerald-800 shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{language === 'hi' ? 'कस्टम यात्रा कोटेशन प्राप्त करें' : 'Request Custom Itinerary & Quote'}</span>
            </button>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                language === 'hi'
                  ? `जय श्री महाकाल 🙏 मुझे ${tourName} यात्रा पैकेज के बारे में जानकारी चाहिए।`
                  : `Jai Shree Mahakal 🙏 I want to enquire about ${tour.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-xl bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{language === 'hi' ? 'व्हाट्सएप यात्रा विशेषज्ञ से बात करें' : 'WhatsApp Yatra Expert'}</span>
            </a>

            <div className="pt-2 text-center text-xs text-stone-500 space-y-1">
              <div>{language === 'hi' ? 'कोई विशेष आवश्यकता है?' : 'Have specific requirements?'}</div>
              <a href={`tel:${settings.phone1}`} className="font-mono font-bold text-emerald-800 hover:underline">
                {language === 'hi' ? 'कॉल करें' : 'Call'} {settings.phone1}
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* FAQs */}
      {tourFaqs.length > 0 && (
        <section className="pt-8 border-t border-stone-200">
          <FAQAccordion
            faqs={tourFaqs}
            showCategoryTabs={false}
            title={language === 'hi' ? `${tourName} — अक्सर पूछे जाने वाले प्रश्न` : `Frequently Asked Questions — ${tourName}`}
          />
        </section>
      )}

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="pt-8 border-t border-stone-200 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            {t('tour.related_title', 'Explore Other Sacred Yatras')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((t) => (
              <TourCard key={t.id} tour={t} onBook={(name) => onOpenBooking('Tour', name)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

