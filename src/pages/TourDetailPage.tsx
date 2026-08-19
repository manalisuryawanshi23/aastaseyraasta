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
  MessageSquare,
  HelpCircle,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  ChevronDown
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

  // ── NOT FOUND ─────────────────────────────────────────────────────────────
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

  // Common Localized Data
  const tourName = localize(tour, 'name', 'hindiName');
  const tourShortDesc = localize(tour, 'shortDescription', 'hindiShortDescription');
  const tourCategory = localize(tour, 'category', 'hindiCategory') || (language === 'hi' ? 'तीर्थ यात्रा परिपथ' : 'Pilgrimage Circuit');
  const tourDuration = localize(tour, 'duration', 'hindiDuration');
  const tourStart = localize(tour, 'startingPoint', 'hindiStartingPoint');
  const tourEnd = localize(tour, 'endingPoint', 'hindiEndingPoint');
  const tourPlacesCovered = localize(tour, 'placesCovered', 'hindiPlacesCovered') || [];
  const tourItinerary = localize(tour, 'itinerary', 'hindiItinerary') || tour.itinerary || [];
  const tourIncluded = localize(tour, 'included', 'hindiIncluded') || tour.included || [];
  const tourExcluded = localize(tour, 'excluded', 'hindiExcluded') || tour.excluded || [];
  const tourDescription = localize(tour, 'description', 'hindiDescription') || tour.description || '';

  const tourWhyChoose = tour.whyChoose || [];
  const tourWhatWeOffer = tour.whatWeOffer || [];
  const tourHowToReach = tour.howToReach || '';
  const tourTravelTips = tour.travelTips || [];

  const allTours = StoreService.getTours();

  // Related tours logic (filter to get 3 items)
  let relatedTours = allTours.filter((x) => x.id !== tour.id && x.category === tour.category).slice(0, 3);
  if (relatedTours.length < 3) {
    const ids = new Set(relatedTours.map((x) => x.id));
    const extra = allTours.filter((x) => x.id !== tour.id && !ids.has(x.id)).slice(0, 3 - relatedTours.length);
    relatedTours = [...relatedTours, ...extra];
  }

  // FAQs
  const tourFaqs: { question: string; answer: string }[] =
    (tour as any).faqs?.length > 0
      ? (tour as any).faqs
      : (tour as any).aeoQuestions?.length > 0
      ? (tour as any).aeoQuestions
      : StoreService.getFAQs()
          .filter((f) => f.category === 'Tour' || f.category === 'General')
          .slice(0, 5)
          .map((f) => ({ question: f.question, answer: f.answer }));

  // Schemas
  const tourSchema = buildTourSchema(tour);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Spiritual Tours', url: '/spiritual-tours' },
    { name: tour.name, url: `/spiritual-tours/${tour.slug}` },
  ]);
  const faqSchema = buildFAQSchema(tourFaqs.slice(0, 5).map((f) => ({ question: f.question, answer: f.answer })));

  // Description Renderer
  const renderDescription = (text?: string, isDark: boolean = false) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className={`text-xl sm:text-2xl font-serif font-bold pt-6 pb-2 border-b mb-3 ${isDark ? 'text-amber-100 border-white/10' : 'text-stone-900 border-stone-200'}`}>
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className={`text-lg font-serif font-bold pt-4 mb-2 ${isDark ? 'text-amber-200' : 'text-stone-800'}`}>
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
      }
      if (trimmed.startsWith('- ')) {
        return (
          <div key={idx} className={`flex items-start gap-2 text-sm my-1.5 ml-2 ${isDark ? 'text-[#F5EBE6]' : 'text-stone-700'}`}>
            <span className={`font-bold shrink-0 mt-0.5 ${isDark ? 'text-amber-300' : 'text-emerald-700'}`}>•</span>
            <span>{trimmed.replace(/^-\s*/, '')}</span>
          </div>
        );
      }
      return (
        <p key={idx} className={`leading-relaxed text-sm sm:text-base mb-4 ${isDark ? 'text-[#F5EBE6]' : 'text-stone-700'}`}>
          {trimmed}
        </p>
      );
    });
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ── MASTER LANDING PAGE TEMPLATE FOR ALL TOURS ────────────────────────────
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const isTrek = tour.category === 'Trekking' || tour.slug.includes('trek');

  const finalFaqs = slug === 'ujjain-omkareshwar-tour'
    ? [
        {
          question: "What is the Ujjain – Omkareshwar Tour?",
          answer: "The Ujjain – Omkareshwar Tour is a 2-day pilgrimage package covering the twin Jyotirlingas of Madhya Pradesh: Mahakaleshwar in Ujjain and Omkareshwar on Mandhata Island. The tour includes temple Darshans, local sightseeing, Mamleshwar Darshan, and a scenic boat ride on the Narmada River."
        },
        {
          question: "Which Ujjain Darshan are included?",
          answer: "The tour includes visits to Mahakaleshwar, Harsiddhi Shaktipeeth, Kalbhairav, Garhkalika, Mangalnath, Angareshwar, Sthirman Ganesh, Vikrant Bhairav, Siddhvat, Sandipani Ashram, and Kshipra Ramghat."
        },
        {
          question: "Does the tour include Omkareshwar Darshan?",
          answer: "Yes, the tour includes a visit to the Omkareshwar Jyotirlinga temple situated on Mandhata Island, including a scenic boat transit across the Narmada River."
        },
        {
          question: "Does the journey include Mamleshwar Darshan?",
          answer: "Yes, the tour includes Mamleshwar Darshan. Mamleshwar is the twin temple of Omkareshwar, and visiting both is considered essential to complete the Jyotirlinga pilgrimage."
        },
        {
          question: "What does Aastha Sey Raasta Seva offer?",
          answer: "Aastha Sey Raasta Seva assists with private AC vehicle arrangements, hotel stays, river transit ticketing, and connecting devotees with local Pandits for special pooja rituals."
        },
        {
          question: "How can I enquire about the tour?",
          answer: "You can enquire by clicking the 'Enquire Now' button on this page, or by clicking the WhatsApp button to chat directly with our yatra coordination experts."
        },
        {
          question: "How can I know the current tour price?",
          answer: "Please contact us directly for current prices. Pricing is on-request and varies based on your travel dates, choice of vehicle, group size, and specific accommodation preferences."
        },
        {
          question: "Who can consider this pilgrimage journey?",
          answer: "This journey is ideal for families, senior citizens, and individual devotees who wish to perform a structured, comfortable pilgrimage to the twin Jyotirlingas of Madhya Pradesh."
        }
      ]
    : tourFaqs;

  const finalFaqSchema = buildFAQSchema(finalFaqs);

  const highlights = slug === 'ujjain-omkareshwar-tour'
    ? [
        {
          title: "Mahakaleshwar Jyotirlinga",
          desc: "Visit the sacred Mahakaleshwar Temple in Ujjain to participate in prayers and receive blessings from one of the twelve Jyotirlingas."
        },
        {
          title: "Harsiddhi Shaktipeeth",
          desc: "Offer prayers at the revered Harsiddhi Temple, celebrated as a sacred seat of power (Shaktipeeth) in Ujjain."
        },
        {
          title: "Kalbhairav Temple",
          desc: "Experience the ancient rituals and unique atmosphere of the historic Kalbhairav shrine in Ujjain."
        },
        {
          title: "Omkareshwar Jyotirlinga",
          desc: "Travel to Mandhata Island to worship Lord Shiva at the Omkareshwar Jyotirlinga, situated by the running Narmada River."
        },
        {
          title: "Mamleshwar Temple",
          desc: "Complete your twin-Jyotirlinga pilgrimage by paying respects at the Mamleshwar temple on the south bank of the river."
        },
        {
          title: "Narmada River Ghats",
          desc: "Walk along the scenic holy river ghats at Omkareshwar, taking in the spiritual atmosphere and local boat sights."
        }
      ]
    : (tourPlacesCovered.length > 0 ? tourPlacesCovered.slice(0, 6) : tourWhyChoose.slice(0, 6)).map((item) => ({
        title: item,
        desc: isTrek
          ? `Experience the natural beauty and scenic trail checkpoints at ${item}.`
          : `Seek blessings and explore the spiritual heritage at the revered ${item} shrine.`
      }));

  const renderTimeline = () => {
    if (slug === 'ujjain-omkareshwar-tour') {
      return (
        <div className="relative border-l border-stone-400/60 ml-4 space-y-6 pt-4">
          <div className="relative pl-8 space-y-1 text-left">
            <div className="absolute -left-[5.5px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-700 border-2 border-white shadow-sm" />
            <h4 className="font-bold text-stone-900 text-sm tracking-wide uppercase">UJJAIN</h4>
            <div className="text-stone-700 text-xs sm:text-sm pl-1 space-y-1">
              <div>• Mahakaleshwar Darshan</div>
              <div>• Harsiddhi Shaktipeeth Darshan</div>
              <div>• Kalbhairav Darshan</div>
              <div>• Garhkalika Shaktipeeth Darshan</div>
              <div>• Mangalnath Darshan</div>
              <div>• Angareshwar Darshan</div>
              <div>• Sthirman Ganesh Darshan</div>
              <div>• Vikrant Bhairav Darshan</div>
              <div>• Siddhvat Darshan</div>
              <div>• Sandipani Ashram Darshan</div>
              <div>• Kshipra Ramghat Visit</div>
            </div>
          </div>
          <div className="relative pl-8 space-y-1 text-left">
            <div className="absolute -left-[5.5px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-700 border-2 border-white shadow-sm" />
            <h4 className="font-bold text-stone-900 text-sm tracking-wide uppercase">OMKARESHWAR</h4>
            <div className="text-stone-700 text-xs sm:text-sm pl-1 space-y-1">
              <div>• Omkareshwar Darshan</div>
              <div>• Mamleshwar Darshan</div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="relative border-l border-stone-400/60 ml-4 space-y-6 pt-4">
        {tourPlacesCovered.map((place, idx) => (
          <div key={idx} className="relative pl-8 space-y-1 text-left">
            <div className="absolute -left-[5.5px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-700 border-2 border-white shadow-sm" />
            <h4 className="font-bold text-stone-900 text-sm tracking-wide uppercase">{place}</h4>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-stone-900 antialiased">
      
      {/* SEO Head — Regression Protected */}
      <SEOHead
        title={tour.seoTitle || generateTourTitle(tour)}
        description={tour.metaDescription || tour.shortDescription}
        keywords={tour.focusKeyword ? `${tour.focusKeyword}, ${tour.name}, ${tour.startingPoint} Tour` : `${tour.name}, Spiritual Yatra, Ujjain Pilgrimage Package`}
        canonicalUrl={tour.canonicalUrl || `https://aasthaserasta.com/spiritual-tours/${tour.slug}`}
        ogImage={tour.featuredImage}
        ogImageAlt={`${tour.name} - ${tour.startingPoint}`}
        jsonLd={[tourSchema, breadcrumbSchema, finalFaqSchema]}
      />

      {/* 1. BREADCRUMB */}
      <div className="bg-[#F6F0E6] border-b border-[#E6DBC8] py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-xs font-medium text-stone-500" aria-label="Breadcrumb">
            <a href="/" className="hover:text-emerald-800 transition-colors">
              {language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}
            </a>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <a href="/spiritual-tours" className="hover:text-emerald-800 transition-colors">
              {t('nav.tours', 'Spiritual Tours')}
            </a>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-stone-800 font-semibold truncate">
              {tourName}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. FULL-WIDTH HERO (DARK + IMAGE OVERLAY) */}
      <header 
        className="relative text-white py-16 sm:py-24 overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(58, 21, 24, 0.93), rgba(58, 21, 24, 0.95)), url("${tour.featuredImage || '/src/assets/images/tour_ujjain_omkareshwar_1786196108956.jpg'}")` 
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold tracking-wider uppercase border border-emerald-500/20">
              <Compass className="w-3.5 h-3.5" />
              <span>{tourCategory}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight">
              {tourName}
            </h1>

            <p className="text-[#F5EBE6] text-sm sm:text-base leading-relaxed max-w-2xl">
              {tourShortDesc}
            </p>

            <div className="pt-2">
              <div className="bg-stone-900/40 p-4 rounded-xl border border-white/10 text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                <span className="font-bold text-amber-300 block mb-1">
                  {language === 'hi' ? 'उपलब्धता और मूल्य जांचें' : 'CHECK AVAILABILITY & PRICE'}
                </span>
                {language === 'hi'
                  ? 'वर्तमान मूल्य और उपलब्ध व्यवस्थाओं के लिए आस्था से रास्ता सेवा से संपर्क करें।'
                  : 'Contact Aastha Sey Raasta Seva for the current price and available arrangements.'}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onOpenBooking('Tour', tour.name)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-lg"
              >
                {language === 'hi' ? 'पूछताछ करें' : 'ENQUIRE NOW'}
              </button>
              <button
                onClick={() => onOpenBooking('Tour', tour.name)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-[#FFFDF8] hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm transition-all animate-pulse"
              >
                {language === 'hi' ? 'दर के लिए संपर्क करें' : 'ENQUIRE FOR PRICE'}
              </button>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  language === 'hi'
                    ? `जय श्री महाकाल 🙏 मुझे ${tourName} यात्रा पैकेज के बारे में जानकारी चाहिए।`
                    : `Jai Shree Mahakal 🙏 I want to enquire about the ${tour.name} package.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-stone-955 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WHATSAPP US'}</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/20 aspect-[4/3] bg-stone-950">
              <img
                src={tour.featuredImage || '/src/assets/images/tour_ujjain_omkareshwar_1786196108956.jpg'}
                alt={tourName}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-955/40 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </header>

      {/* 3. QUICK TOUR INFORMATION (LIGHT IVORY) */}
      <section className="bg-[#FFFDF8] py-8 border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm text-left">
              <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'यात्रा प्रकार' : 'Tour Type'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-955 block mt-1">
                {tourCategory}
              </span>
            </div>

            {tourStart ? (
              <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm text-left">
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                  {language === 'hi' ? 'यात्रा मार्ग' : 'Route'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-955 block mt-1">
                  {tourStart} {tourEnd ? `→ ${tourEnd}` : ''}
                </span>
              </div>
            ) : (
              tourPlacesCovered.length > 0 && (
                <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm text-left">
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                    {language === 'hi' ? 'यात्रा मार्ग' : 'Route'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-955 block mt-1">
                    {tourPlacesCovered[0]} → {tourPlacesCovered[tourPlacesCovered.length - 1]}
                  </span>
                </div>
              )
            )}

            {tourPlacesCovered.length > 0 && (
              <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm text-left">
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                  {language === 'hi' ? 'मुख्य गंतव्य' : 'Main Destination'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-955 block mt-1 truncate">
                  {tourPlacesCovered.slice(0, 3).join(', ')}
                </span>
              </div>
            )}

            {tourDuration && (
              <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm text-left">
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                  {language === 'hi' ? 'अवधि' : 'Duration'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-955 block mt-1">
                  {tourDuration}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. AEO QUICK ANSWER (LIGHT IVORY - VISUALLY CONNECTED) */}
      {tour.quickAnswer && (
        <section className="bg-[#FFFDF8] py-12 border-b border-stone-200/40 pt-0">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="inline-block text-emerald-800 text-xs font-bold uppercase tracking-wider">
              {language === 'hi' ? 'त्वरित जानकारी' : 'QUICK ANSWER'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 flex items-center justify-center gap-2 flex-wrap">
              <HelpCircle className="w-6 h-6 text-emerald-700 shrink-0" />
              <span>
                {language === 'hi' ? `${tourName} क्या है?` : `What is the ${tourName}?`}
              </span>
            </h2>
            <div className="p-6 sm:p-8 bg-[#F6F0E6] rounded-3xl border border-[#E6DBC8] text-left shadow-sm">
              <p className="text-stone-850 text-sm sm:text-base leading-relaxed mb-4">
                {tour.quickAnswer}
              </p>
              <div className="border-t border-stone-300/60 pt-4 space-y-2 text-xs sm:text-sm text-stone-700">
                {tourStart && <div><strong>Route:</strong> {tourStart} {tourEnd ? `→ ${tourEnd}` : ''}</div>}
                {tourPlacesCovered.length > 0 && <div><strong>Destinations Covered:</strong> {tourPlacesCovered.join(', ')}</div>}
                {tourDuration && <div><strong>Duration:</strong> {tourDuration}</div>}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. TOUR HIGHLIGHTS (LIGHT IVORY) */}
      {highlights.length > 0 && (
        <section className="bg-[#FFFDF8] py-16 border-b border-stone-200/40">
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                {language === 'hi' ? 'यात्रा के मुख्य आकर्षण' : 'TOUR HIGHLIGHTS'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-905">
                {language === 'hi' ? 'प्रमुख दर्शन एवं तीर्थ स्थल' : 'Key Pilgrimage Highlights'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((hl, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg">{hl.title}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{hl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. ABOUT THE JOURNEY (DARK + SUBTLE IMAGE OVERLAY) */}
      {tourDescription && (
        <section 
          className="relative text-[#F5EBE6] py-20 border-b border-white/10 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(rgba(58, 21, 24, 0.96), rgba(58, 21, 24, 0.97)), url("${tour.featuredImage || '/src/assets/images/header_bg_spiritual_1786196057015.jpg'}")` 
          }}
        >
          <div className="max-w-4xl mx-auto px-4 text-left relative z-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 border-b border-white/10 pb-2 mb-6">
              {language === 'hi' ? `${tourName} विवरण` : `About the ${tourName}`}
            </h2>
            <div className="prose prose-invert max-w-none">
              {renderDescription(tourDescription, true)}
            </div>
          </div>
        </section>
      )}

      {/* 7. ROUTE & JOURNEY OVERVIEW (LIGHT) */}
      <section className="bg-[#F6F0E6] py-16 border-b border-[#E6DBC8]">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 border-b border-stone-300 pb-2 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-800 shrink-0" />
            {language === 'hi' ? 'यात्रा मार्ग एवं कार्यक्रम' : 'Route & Journey Overview'}
          </h2>

          {/* Timeline */}
          {renderTimeline()}

          {/* Detailed days if present */}
          {tourItinerary.length > 0 && (
            <div className="pt-8 border-t border-stone-300/40 space-y-6">
              <h3 className="font-serif font-bold text-stone-905 text-lg text-left">
                {language === 'hi' ? 'दिन-वार विवरण' : 'Day-Wise Itinerary Details'}
              </h3>
              <div className="space-y-4">
                {tourItinerary.map((day: any) => (
                  <div key={day.dayNumber} className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm text-left">
                    <h4 className="font-serif font-bold text-stone-900 text-base">
                      {language === 'hi' ? `दिन ${day.dayNumber}: ` : `Day ${day.dayNumber}: `}
                      {day.hindiTitle && language === 'hi' ? day.hindiTitle : day.title}
                    </h4>
                    <p className="text-stone-605 text-xs sm:text-sm leading-relaxed mt-2">
                      {day.hindiDescription && language === 'hi' ? day.hindiDescription : day.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 8. DARSHAN / DESTINATIONS / TREK DETAILS (LIGHT IVORY) */}
      {tourPlacesCovered.length > 0 && (
        <section className="bg-[#FFFDF8] py-16 border-b border-stone-200/40">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-center border-b border-stone-200 pb-3">
              {isTrek
                ? (language === 'hi' ? 'ट्रेक विवरण और स्थल' : 'Trek Details & Highlights')
                : (language === 'hi' ? 'शामिल दर्शन और गंतव्य' : 'Darshan & Destinations Included')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2 text-left">
                  <MapPin className="text-emerald-700" />
                  <span>{isTrek ? 'Key Trail Shrines' : 'Main Shrines'}</span>
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {tourPlacesCovered.map((place: string, idx: number) => (
                    <div key={idx} className="bg-white px-4 py-2.5 rounded-lg border border-stone-200/60 text-xs sm:text-sm text-stone-700 font-medium text-left">
                      • {place}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2 text-left">
                  <Compass className="text-emerald-700" />
                  <span>{language === 'hi' ? 'यात्रा सुविधाएँ' : 'Yatra Features'}</span>
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  <div className="bg-white px-4 py-2.5 rounded-lg border border-stone-200/60 text-xs sm:text-sm text-stone-700 font-medium text-left">
                    • {language === 'hi' ? 'निजी वाहन व्यवस्था सहायता' : 'Private transportation booking assistance'}
                  </div>
                  <div className="bg-white px-4 py-2.5 rounded-lg border border-stone-200/60 text-xs sm:text-sm text-stone-700 font-medium text-left">
                    • {language === 'hi' ? 'स्थानीय अनुभवी पंडित संपर्क' : 'Verified local pandit coordination'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. WHY CHOOSE THIS JOURNEY? (DARK + LIGHT CARDS) */}
      {tourWhyChoose.length > 0 && (
        <section className="bg-[#3A1518] text-white py-16 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 text-center">
              {language === 'hi' ? 'यह यात्रा क्यों चुनें?' : `Why Choose the ${tourName}?`}
            </h2>
            <div className="grid grid-cols-1 gap-4 pt-2">
              {tourWhyChoose.map((reason: string, idx: number) => (
                <div key={idx} className="bg-[#FFFDF8] p-5 rounded-2xl border border-white/10 shadow-sm flex items-start gap-3 text-stone-900 text-left">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="text-stone-850 text-sm sm:text-base leading-relaxed">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. WHAT WE OFFER (LIGHT) */}
      {tourWhatWeOffer.length > 0 && (
        <section className="bg-[#F6F0E6] py-16 border-b border-stone-200/40">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h3 className="font-serif font-bold text-stone-900 text-2xl text-center">
              {language === 'hi' ? 'हमारी व्यवस्थाएं' : 'What We Offer'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tourWhatWeOffer.map((offer: string, idx: number) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200/60 flex items-center gap-3 text-left">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-stone-700 text-xs sm:text-sm font-medium">{offer}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. CHECK AVAILABILITY & PRICE (LIGHT IVORY) */}
      <section className="bg-[#FFFDF8] py-16 border-b border-stone-200/40">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            {language === 'hi' ? 'उपलब्धता और मूल्य की जांच करें' : 'Check Availability & Price'}
          </h2>
          <p className="text-stone-750 text-sm sm:text-base">
            Contact Aastha Sey Raasta Seva for the current price and available arrangements.
          </p>
          <div className="pt-2 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => onOpenBooking('Tour', tour.name)}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
            >
              {language === 'hi' ? 'मूल्य की पूछताछ करें' : 'ENQUIRE FOR PRICE'}
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Jai Shree Mahakal 🙏 I want to enquire about the ${tour.name} package.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-stone-955 font-bold text-sm flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WHATSAPP US'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 12. HOW TO REACH (LIGHT - CONDITIONAL) */}
      {tourHowToReach && (
        <section className="bg-[#F6F0E6] py-16 border-b border-[#E6DBC8]">
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            <h2 className="font-serif font-bold text-stone-900 text-2xl flex items-center gap-2 text-left">
              <span>📍</span>
              {language === 'hi' ? 'कैसे पहुँचें' : 'How to Reach'}
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed bg-white p-5 rounded-2xl border border-[#E6DBC8] shadow-sm text-left">
              {tourHowToReach}
            </p>
          </div>
        </section>
      )}

      {/* 13. TRAVEL TIPS (LIGHT IVORY - CONDITIONAL) */}
      {tourTravelTips.length > 0 && (
        <section className="bg-[#FFFDF8] py-16 border-b border-stone-200/40">
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            <h2 className="font-serif font-bold text-stone-900 text-2xl flex items-center gap-2 text-left">
              <span>💡</span>
              {isTrek
                ? (language === 'hi' ? 'ट्रेकिंग दिशानिर्देश' : 'Trekking Guidelines & Tips')
                : (language === 'hi' ? 'यात्रियों के लिए सुझाव' : 'Travel Tips for Visitors')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tourTravelTips.map((tip: string, idx: number) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200/60 flex items-start gap-2.5 text-left">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-stone-700 leading-normal">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 14. BOOKING ASSISTANCE (DARK) */}
      <section className="bg-[#3A1518] text-white py-16 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-3 text-left">
              <span className="text-xs uppercase font-bold text-amber-300 tracking-wider block">
                BOOKING ASSISTANCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                Plan Your {tourName}
              </h3>
              <p className="text-sm text-[#F5EBE6] leading-relaxed">
                Contact Aastha Sey Raasta Seva to enquire about arranging this journey.
              </p>

              {/* 3-Step visual */}
              <div className="grid grid-cols-3 gap-2 pt-4">
                <div className="text-left">
                  <div className="text-stone-400 font-serif font-bold text-base">01</div>
                  <div className="text-[10px] sm:text-xs text-[#F5EBE6] font-semibold mt-0.5">Choose Your Journey</div>
                </div>
                <div className="text-left">
                  <div className="text-stone-400 font-serif font-bold text-base">02</div>
                  <div className="text-[10px] sm:text-xs text-[#F5EBE6] font-semibold mt-0.5">Send an Enquiry</div>
                </div>
                <div className="text-left">
                  <div className="text-stone-400 font-serif font-bold text-base">03</div>
                  <div className="text-[10px] sm:text-xs text-[#F5EBE6] font-semibold mt-0.5">Plan Your Journey</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <button
                onClick={() => onOpenBooking('Tour', tour.name)}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
              >
                {language === 'hi' ? 'अभी पूछताछ करें' : 'ENQUIRE NOW'}
              </button>
              <button
                onClick={() => onOpenBooking('Tour', tour.name)}
                className="w-full py-3 px-6 rounded-xl bg-[#FFFDF8] hover:bg-stone-100 text-stone-900 font-bold text-xs transition-colors"
              >
                {language === 'hi' ? 'मूल्य की पूछताछ करें' : 'ENQUIRE FOR PRICE'}
              </button>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  `Jai Shree Mahakal 🙏 I want to enquire about the ${tour.name} package.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-stone-955 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WHATSAPP US'}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 15. FAQ SECTION (LIGHT) */}
      {finalFaqs.length > 0 && (
        <section className="bg-[#F6F0E6] py-16 border-b border-[#E6DBC8]">
          <div className="max-w-4xl mx-auto px-4">
            <FAQAccordion
              faqs={finalFaqs}
              showCategoryTabs={false}
              title={language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
            />
          </div>
        </section>
      )}

      {/* 16. RELATED JOURNEYS (LIGHT IVORY) */}
      <section className="bg-[#FFFDF8] py-16 border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-center">
            Related Journeys
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((t) => (
              <TourCard key={t.id} tour={t} onBook={(name) => onOpenBooking('Tour', name)} />
            ))}
          </div>
        </div>
      </section>

      {/* 17. FINAL CTA (DARK + IMAGE OVERLAY) */}
      <footer 
        className="relative text-white py-20 text-center space-y-6 overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(58, 21, 24, 0.92), rgba(58, 21, 24, 0.95)), url("${tour.featuredImage || '/src/assets/images/tour_ujjain_omkareshwar_1786196108956.jpg'}")` 
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(217,119,6,0.1),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
            Plan Your {tourName}
          </h2>
          <p className="text-stone-300 text-sm max-w-xl mx-auto">
            Contact Aastha Sey Raasta Seva to enquire about arranging this pilgrimage journey.
          </p>
          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => onOpenBooking('Tour', tour.name)}
              className="px-8 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm shadow-md transition-colors"
            >
              {language === 'hi' ? 'पूछताछ करें' : 'ENQUIRE NOW'}
            </button>
            <button
              onClick={() => onOpenBooking('Tour', tour.name)}
              className="px-8 py-3 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/40 font-bold text-sm transition-colors"
            >
              {language === 'hi' ? 'दर के लिए पूछताछ' : 'ENQUIRE FOR PRICE'}
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Jai Shree Mahakal 🙏 I want to enquire about the ${tour.name} package.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WHATSAPP US'}</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
