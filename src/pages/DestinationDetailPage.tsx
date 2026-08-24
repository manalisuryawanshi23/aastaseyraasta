import React from 'react';
import { StoreService } from '../services/store';
import { SEOHead } from '../components/SEOHead';
import { generateDestinationTitle } from '../utils/seoTitles';
import { PoojaCard } from '../components/PoojaCard';
import { TourCard } from '../components/TourCard';
import { DestinationMapVisualizer } from '../components/DestinationMapVisualizer';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { FAQAccordion } from '../components/FAQAccordion';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin, Landmark, Car, Sparkles, Compass, MessageSquare,
  ChevronRight, Train, Plane
} from 'lucide-react';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';
import { DESTINATION_FAQS } from '../data/destinationFAQs';

interface DestinationDetailPageProps {
  slug: string;
  onOpenBooking: (type?: 'Pooja' | 'Tour' | 'Destination' | 'General', name?: string) => void;
}

// Lightweight inline markdown renderer for description
const renderMarkdown = (text: string, isDark = false): React.ReactNode[] => {
  if (!text) return [];
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={key} className="list-none space-y-1.5 mb-4 ml-0 text-left">
          {listBuffer.map((item, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm leading-relaxed ${isDark ? 'text-[#F5EBE6]' : 'text-stone-700'}`}>
              <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${isDark ? 'bg-amber-400' : 'bg-amber-500'}`} />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item, isDark) }} />
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const formatInline = (s: string, dark: boolean) =>
    s.replace(/\*\*(.+?)\*\*/g, `<strong class="font-semibold ${dark ? 'text-amber-200' : 'text-stone-900'}">$1</strong>`)
     .replace(/\*(.+?)\*/g, '<em>$1</em>');

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trimEnd();
    if (/^---+\$/.test(line)) {
      flushList(`fl-${idx}`);
      elements.push(<hr key={idx} className={`border-t my-4 ${isDark ? 'border-white/10' : 'border-amber-200/70'}`} />);
      return;
    }
    if (/^### (.+)/.test(line)) {
      flushList(`fl-${idx}`);
      const content = line.replace(/^### /, '');
      elements.push(<h4 key={idx} className={`text-base font-serif font-bold mt-4 mb-1 text-left ${isDark ? 'text-amber-200' : 'text-amber-900'}`} dangerouslySetInnerHTML={{ __html: formatInline(content, isDark) }} />);
      return;
    }
    if (/^## (.+)/.test(line)) {
      flushList(`fl-${idx}`);
      const content = line.replace(/^## /, '');
      elements.push(<h3 key={idx} className={`text-xl font-serif font-bold pt-6 pb-2 border-b mb-3 text-left ${isDark ? 'text-amber-100 border-white/10' : 'text-stone-900 border-stone-200'}`} dangerouslySetInnerHTML={{ __html: formatInline(content, isDark) }} />);
      return;
    }
    if (/^# (.+)/.test(line)) {
      flushList(`fl-${idx}`);
      const content = line.replace(/^# /, '');
      elements.push(<h2 key={idx} className={`text-2xl font-serif font-bold pt-6 pb-2 border-b mb-4 text-left ${isDark ? 'text-amber-100 border-white/10' : 'text-amber-955 border-amber-200'}`} dangerouslySetInnerHTML={{ __html: formatInline(content, isDark) }} />);
      return;
    }
    if (/^[*-] (.+)/.test(line)) {
      const content = line.replace(/^[*-] /, '');
      listBuffer.push(content);
      return;
    }
    if (line.trim() === '') {
      flushList(`fl-${idx}`);
      return;
    }
    flushList(`fl-${idx}`);
    elements.push(<p key={idx} className={`leading-relaxed text-sm sm:text-base mb-4 text-left ${isDark ? 'text-[#F5EBE6]' : 'text-stone-700'}`} dangerouslySetInnerHTML={{ __html: formatInline(line, isDark) }} />);
  });
  flushList('fl-end');
  return elements;
};

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ slug, onOpenBooking }) => {
  const { language, t, localize } = useLanguage();

  const [syncTick, setSyncTick] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setSyncTick((n) => n + 1);
    window.addEventListener('aastha:data-synced', handler);
    return () => window.removeEventListener('aastha:data-synced', handler);
  }, []);

  const settings = StoreService.getSettings();
  const whatsappNum = settings?.whatsappNumber || '919999999999';
  const dest = StoreService.getDestinationBySlug(slug);

  if (!dest) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          {language === 'hi' ? 'तीर्थ स्थल नहीं मिला' : 'Destination Not Found'}
        </h1>
        <a href="/destinations" className="inline-block px-6 py-2.5 rounded-xl bg-sky-800 text-white font-medium text-xs">
          {t('action.back_to_destinations', 'Back to Destinations')}
        </a>
      </div>
    );
  }

  const destName = localize(dest, 'name', 'hindiName');
  const destShortDesc = localize(dest, 'shortDescription', 'hindiShortDescription');
  const destDesc: string = localize(dest, 'description', 'hindiDescription') || '';
  const destPlacesToVisit: string[] = localize(dest, 'placesToVisit', 'hindiPlacesToVisit') || dest.placesToVisit || [];
  const destTravelInfo = localize(dest, 'travelInformation', 'hindiTravelInformation') || dest.travelInformation || '';

  const relatedPoojas = StoreService.getPoojas().filter(
    (p) => p.city?.toLowerCase() === dest.name.toLowerCase()
  );
  const relatedTours = StoreService.getTours().filter((t) =>
    t.destinations?.some((d: string) => d.toLowerCase().includes(dest.name.toLowerCase()))
  );

  // FAQs: destination-specific first, then generic fallback
  const destFaqs = DESTINATION_FAQS[slug] || DESTINATION_FAQS[slug.replace('baglamukhi-', '')] || [];
  const genericFaqs = StoreService.getFAQs()
    .filter((f) => f.category === 'General' || f.category === 'Tour')
    .slice(0, 4)
    .map((f) => ({ question: f.question, answer: f.answer }));
  const finalFaqs = destFaqs.length > 0 ? destFaqs : genericFaqs;

  // Highlights custom descriptions mapping for premium look & feel
  const highlightsMap: Record<string, { en: string; hi: string }> = {
    // Ujjain
    'Mahakaleshwar Jyotirlinga': {
      en: 'One of the 12 sacred Jyotirlingas, featuring the unique south-facing Dakshinamurti idol and daily Bhasma Aarti.',
      hi: '12 ज्योतिर्लिंगों में से एक, दक्षिणमुखी ज्योतिर्लिंग और दैनिक दिव्य भस्म आरती दर्शन।'
    },
    'Harsiddhi Mata Shaktipeeth': {
      en: "A sacred Shaktipeeth where Goddess Sati's elbow fell, famous for its grand 50-foot light towers.",
      hi: '51 शक्तिपीठों में से एक जहाँ सती की कोहनी गिरी थी, संध्या आरती में जगमगाते दीपस्तंभों के लिए प्रसिद्ध।'
    },
    'Kalbhairav Temple': {
      en: 'The guardian deity of Ujjain, traditionally offered liquor as a sacred prasad.',
      hi: 'उज्जैन के क्षेत्रपाल कोतवाल भैरव बाबा, जहाँ मदिरा प्रसाद का अद्भुत भोग लगाया जाता है।'
    },
    'Mangalnath Temple': {
      en: 'The ancient birthplace of Mars (Mangal Dev), highly revered for Mangal Dosh Bhat Pooja.',
      hi: 'ग्रहराज मंगल की जन्मभूमि, कुंडली के मंगल दोष निवारण हेतु प्रसिद्ध भात पूजा स्थल।'
    },
    'Sandipani Ashram': {
      en: 'The gurukul where Lord Krishna, Balarama, and Sudama received their education.',
      hi: 'महर्षि सांदीपनि का आश्रम जहाँ भगवान श्रीकृष्ण, बलराम और सुदामा ने शिक्षा ग्रहण की थी।'
    },
    'Ramghat Kshipra': {
      en: 'The historic ghat on Shipra River, hosting the Simhastha Kumbh Mela and daily evening Kshipra Aarti.',
      hi: 'शिप्रा नदी का ऐतिहासिक घाट, जहाँ सिंहस्थ महाकुंभ स्नान और भव्य संध्या महाआरती होती है।'
    },
    // Omkareshwar
    'Omkareshwar Jyotirlinga Temple': {
      en: 'The revered Jyotirlinga shrine located on the OM-shaped Mandhata island.',
      hi: 'नर्मदा नदी के मध्य ॐ आकार के मान्धाता द्वीप पर स्थित ज्योतिर्लिंग मंदिर।'
    },
    'Mamleshwar Temple': {
      en: 'The twin Jyotirlinga temple situated on the southern bank of the Narmada River.',
      hi: 'नर्मदा के दक्षिणी तट पर स्थित जुड़वां ज्योतिर्लिंग का पूज्य ममलेश्वर मंदिर।'
    },
    'Narmada River Sangam & Boat Ghats': {
      en: 'The holy confluence of Narmada and Kaveri, offering scenic and purifying boat trips.',
      hi: 'नर्मदा और कावेरी का पवित्र संगम स्थल, नौका विहार और स्नान हेतु उत्तम।'
    },
    'Siddhanath Temple': {
      en: 'A beautiful 10th-century temple on the island, showcasing grand elephant carvings.',
      hi: 'मान्धाता द्वीप पर स्थित १०वीं शताब्दी का ऐतिहासिक मंदिर, हाथियों की सुंदर नक्काशी के लिए प्रसिद्ध।'
    },
    'Parikrama Marg': {
      en: 'The sacred 7 km parikrama path around the OM-shaped Mandhata hill.',
      hi: 'ॐ आकार के पर्वत की ७ किलोमीटर लंबी परिक्रमा, आध्यात्मिक ऊर्जा से भरपूर।'
    },
    // Nalkheda
    'Maa Baglamukhi Temple': {
      en: 'The powerful Mahabharata-era Shaktipeeth dedicated to the 8th Mahavidya, Maa Baglamukhi.',
      hi: 'महाभारत कालीन सिद्ध पीठ जहाँ पांडवों ने विजय हेतु पीताम्बरा देवी की पूजा की थी।'
    },
    'Lakhundar River Ghat': {
      en: 'The serene riverbank where devotees perform purification before entering the shrine.',
      hi: 'लखुंदर नदी का पावन तट, जहाँ भक्त दर्शन से पूर्व स्नान व ध्यान करते हैं।'
    },
    'Havan Shala': {
      en: "The temple's sacred fire altars where the famous yellow mustard havan is performed.",
      hi: 'मंदिर की भव्य यज्ञशाला जहाँ शत्रु बाधा शांति व विजय हेतु पीला हवन किया जाता है।'
    },
    // Indore
    'Khajrana Ganesh Temple': {
      en: 'The historic wish-fulfilling Ganesh temple built by Queen Ahilya Bai Holkar.',
      hi: 'देवी अहिल्याबाई होल्कर द्वारा स्थापित अति प्राचीन व मन्नत पूरी करने वाला गणेश मंदिर।'
    },
    'Pitra Parvat (Pitreshwar Hanuman)': {
      en: 'Home to the monumental 72-foot metallic statue of Lord Hanuman sitting in meditation.',
      hi: '७२ फीट ऊंची अष्टधातु की विशाल पित्रेश्वर हनुमान प्रतिमा और पितृ वृक्षारोपण धाम।'
    },
    'Lal Bagh Palace': {
      en: 'The magnificent European-style palace of the Holkar rulers, showcasing royal heritage.',
      hi: 'होल्कर राजवंश का भव्य यूरोपीय शैली का महल, जो शाही विरासत और वास्तुकला को दर्शाता है।'
    },
    'Annapurna Temple': {
      en: 'A beautiful shrine dedicated to the Goddess of Nourishment, featuring striking stone elephant arches.',
      hi: 'पोषण की देवी माँ अन्नपूर्णा का भव्य मंदिर, जिसके प्रवेश द्वार पर चार विशाल हाथी बने हैं।'
    },
    'Rajwada Palace': {
      en: 'The iconic 7-story palace showcasing a blend of Maratha and French architecture styles.',
      hi: 'इंदौर के केंद्र में स्थित ७ मंजिला ऐतिहासिक राजप्रासाद, मराठा-फ्रेंच शैली का संगम।'
    }
  };

  // Highlights from placesToVisit
  const highlights = destPlacesToVisit.slice(0, 6).map((place: string) => {
    const custom = highlightsMap[place];
    return {
      title: place,
      desc: custom
        ? (language === 'hi' ? custom.hi : custom.en)
        : (language === 'hi'
            ? `${destName} में ${place} एक प्रमुख दर्शनीय स्थल है जहाँ आप आशीर्वाद और आत्मिक शांति प्राप्त कर सकते हैं।`
            : `${place} is a revered sacred site in ${dest.name} offering devotees spiritual blessings and divine darshan.`)
    };
  });

  // Quick info meta
  const bestSeason = (dest as any).bestTimeToVisit || (language === 'hi' ? 'अक्टूबर – मार्च' : 'October – March');
  const distanceFromIndore = (dest as any).distanceFromIndore || '';

  // Schemas
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Destinations', url: '/destinations' },
    { name: dest.name, url: `/destinations/${dest.slug}` },
  ]);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: finalFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(58, 21, 24, 0.91), rgba(58, 21, 24, 0.93)), url("${dest.heroImage || '/src/assets/images/header_bg_spiritual_1786196057015.jpg'}")`,
  };
  const whatsappMsg = encodeURIComponent(
    language === 'hi'
      ? `जय महाकाल 🙏 मुझे ${destName} तीर्थ यात्रा की व्यवस्था के बारे में जानकारी चाहिए।`
      : `Jai Shree Mahakal 🙏 I need information about visiting ${dest.name}.`
  );

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-stone-900 antialiased">

      <SEOHead
        title={generateDestinationTitle(dest)}
        description={dest.metaDescription || dest.shortDescription}
        keywords={dest.focusKeyword ? `${dest.focusKeyword}, ${dest.name} Temple, Ujjain Pilgrimage` : `${dest.name}, Ujjain Sacred Shrines, Spiritual Travel`}
        canonicalUrl={dest.canonicalUrl || `https://aasthaserasta.com/destinations/${dest.slug}`}
        ogImage={dest.heroImage}
        ogImageAlt={`${dest.name} Sacred Temple & Shrine`}
        jsonLd={[breadcrumbSchema, faqSchema]}
      />

      {/* ── 1. BREADCRUMB BAR ── */}
      <div className="bg-[#F6F0E6] border-b border-[#E6DBC8] py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-xs font-medium text-stone-500" aria-label="Breadcrumb">
            <a href="/" className="hover:text-amber-800 transition-colors">{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</a>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <a href="/destinations" className="hover:text-amber-800 transition-colors">{t('nav.destinations', 'Destinations')}</a>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-stone-800 font-semibold truncate">{destName}</span>
          </nav>
        </div>
      </div>

      {/* ── 2. FULL-WIDTH DARK HERO ── */}
      <header className="relative text-white py-16 sm:py-24 overflow-hidden bg-cover bg-center" style={heroStyle}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

          {/* Left Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold tracking-wider uppercase border border-amber-500/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'पावन तीर्थ स्थल' : 'Sacred Pilgrimage Destination'}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight">
              {destName}
              {dest.hindiName && language !== 'hi' && (
                <span className="block text-2xl font-normal font-serif text-amber-300 mt-1">{dest.hindiName}</span>
              )}
            </h1>

            <p className="text-[#F5EBE6] text-sm sm:text-base leading-relaxed max-w-2xl">{destShortDesc}</p>

            <div className="pt-2">
              <div className="bg-stone-900/40 p-4 rounded-xl border border-white/10 text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                <span className="font-bold text-amber-300 block mb-1">
                  {language === 'hi' ? 'तीर्थ यात्रा व्यवस्था' : 'PILGRIMAGE ARRANGEMENTS'}
                </span>
                {language === 'hi'
                  ? 'संपूर्ण दर्शन व्यवस्था, वैदिक पूजा और निजी वाहन सेवा के लिए आस्था से रास्ता से संपर्क करें।'
                  : 'Contact Aastha Sey Raasta for complete darshan arrangements, Vedic poojas, and private AC transport.'}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenBooking('Destination', dest.name)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs sm:text-sm transition-all shadow-lg"
              >
                {language === 'hi' ? 'यात्रा हेतु पूछताछ करें' : 'ENQUIRE FOR VISIT'}
              </button>
              <button
                onClick={() => onOpenBooking('Pooja', dest.name)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-[#FFFDF8] hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm transition-all"
              >
                {language === 'hi' ? 'पूजा बुक करें' : 'BOOK A POOJA'}
              </button>
              <a
                href={`https://wa.me/${whatsappNum}?text=${whatsappMsg}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WHATSAPP US'}</span>
              </a>
            </div>
          </div>

          {/* Right — Hero Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/20 aspect-[4/3] bg-stone-950">
              <img
                src={dest.heroImage || '/src/assets/images/header_bg_spiritual_1786196057015.jpg'}
                alt={destName}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </header>

      {/* ── 3. QUICK INFO STRIP ── */}
      <section className="bg-[#FFFDF8] py-8 border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm text-left">
              <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">{language === 'hi' ? 'राज्य' : 'State'}</span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-1">{(dest as any).state || 'Madhya Pradesh'}</span>
            </div>
            {distanceFromIndore && (
              <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm text-left">
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">{language === 'hi' ? 'इंदौर से दूरी' : 'From Indore'}</span>
                <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-1">{distanceFromIndore}</span>
              </div>
            )}
            <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm text-left">
              <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">{language === 'hi' ? 'प्रमुख मंदिर' : 'Main Temple'}</span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-1 truncate">{destPlacesToVisit[0] || dest.name}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm text-left">
              <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">{language === 'hi' ? 'यात्रा का उत्तम समय' : 'Best Season'}</span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-1">{bestSeason}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PILGRIMAGE HIGHLIGHTS GRID ── */}
      {highlights.length > 0 && (
        <section className="bg-[#FFFDF8] py-16 border-b border-stone-200/40">
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold text-amber-800 tracking-wider">{language === 'hi' ? 'प्रमुख दर्शन स्थल' : 'PILGRIMAGE HIGHLIGHTS'}</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
                {language === 'hi' ? `${destName} के प्रमुख मंदिर एवं तीर्थ` : `Sacred Sites in ${dest.name}`}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((hl, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-3 text-left hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg text-left">{hl.title}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed text-left">{hl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. ABOUT THE DESTINATION (DARK SECTION) ── */}
      {destDesc && (
        <section
          className="relative text-[#F5EBE6] py-20 border-b border-white/10 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(58, 21, 24, 0.96), rgba(58, 21, 24, 0.97)), url("${dest.heroImage || '/src/assets/images/header_bg_spiritual_1786196057015.jpg'}")` }}
        >
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 border-b border-white/10 pb-2 mb-6">
              {language === 'hi' ? `${destName} का आध्यात्मिक महत्व` : `Spiritual Significance of ${dest.name}`}
            </h2>
            <div className="prose prose-invert max-w-none text-left">
              {renderMarkdown(destDesc, true)}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. TEMPLES & SACRED PLACES (LIGHT IVORY) ── */}
      {destPlacesToVisit.length > 0 && (
        <section className="bg-[#F6F0E6] py-16 border-b border-[#E6DBC8]">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-center border-b border-stone-300 pb-3 flex items-center justify-center gap-2">
              <Landmark className="w-6 h-6 text-amber-700 shrink-0" />
              {language === 'hi' ? `${destName} के मंदिर व पावन स्थल` : `Major Temples & Sacred Places in ${dest.name}`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destPlacesToVisit.map((place: string, i: number) => (
                <div key={i} className="bg-white px-4 py-3 rounded-xl border border-amber-200/60 flex items-center gap-2.5 text-sm font-medium text-stone-800 shadow-xs hover:shadow-sm transition-shadow">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{place}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. TRAVEL & CONNECTIVITY ── */}
      {destTravelInfo && (
        <section className="bg-[#FFFDF8] py-16 border-b border-stone-200/40">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h2 className="font-serif font-bold text-stone-900 text-2xl flex items-center gap-2 text-left">
              <span>📍</span>
              {language === 'hi' ? 'यात्रा एवं आवागमन जानकारी' : 'How to Reach & Travel Connectivity'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#F6F0E6] p-4 rounded-xl border border-[#E6DBC8] flex flex-col items-center gap-2 text-center">
                <Plane className="w-6 h-6 text-amber-700" />
                <span className="font-bold text-xs text-stone-700">{language === 'hi' ? 'हवाई मार्ग' : 'By Air'}</span>
                <span className="text-xs text-stone-600">{language === 'hi' ? 'इंदौर हवाई अड्डा (IXI) — निकटतम' : 'Indore Airport (IXI) — Nearest Hub'}</span>
              </div>
              <div className="bg-[#F6F0E6] p-4 rounded-xl border border-[#E6DBC8] flex flex-col items-center gap-2 text-center">
                <Train className="w-6 h-6 text-amber-700" />
                <span className="font-bold text-xs text-stone-700">{language === 'hi' ? 'रेल मार्ग' : 'By Train'}</span>
                <span className="text-xs text-stone-600">{language === 'hi' ? 'उज्जैन / इंदौर / रतलाम रेलवे स्टेशन' : 'Ujjain / Indore / Ratlam Station'}</span>
              </div>
              <div className="bg-[#F6F0E6] p-4 rounded-xl border border-[#E6DBC8] flex flex-col items-center gap-2 text-center">
                <Car className="w-6 h-6 text-amber-700" />
                <span className="font-bold text-xs text-stone-700">{language === 'hi' ? 'सड़क मार्ग' : 'By Road'}</span>
                <span className="text-xs text-stone-600">{language === 'hi' ? 'निजी एसी वाहन उपलब्ध' : 'Private AC Cabs Available'}</span>
              </div>
            </div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed bg-[#F6F0E6] p-5 rounded-2xl border border-[#E6DBC8] shadow-sm text-left">{destTravelInfo}</p>
          </div>
        </section>
      )}

      {/* ── 8. WHY AASTHA SEY RAASTA — DARK CTA STRIP ── */}
      <section className="bg-[#3A1518] text-white py-16 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs uppercase font-bold text-amber-300 tracking-wider block">
                {language === 'hi' ? 'आस्था से रास्ता सेवा' : 'PILGRIMAGE ASSISTANCE'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                {language === 'hi' ? `${destName} यात्रा की संपूर्ण व्यवस्था` : `Plan Your ${dest.name} Pilgrimage With Us`}
              </h3>
              <p className="text-sm text-[#F5EBE6] leading-relaxed">
                {language === 'hi'
                  ? 'आस्था से रास्ता सेवा आपकी तीर्थ यात्रा की संपूर्ण व्यवस्था करती है — वैदिक पूजा, दर्शन कतार प्रबंधन, निजी वाहन और आरामदायक होटल।'
                  : 'Aastha Sey Raasta Seva handles every detail — Vedic pooja bookings, darshan queue assistance, private AC vehicles, and curated hotels near the shrine.'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { icon: '🔱', en: 'Expert Vedic Priests', hi: 'वैदिक पुजारी' },
                  { icon: '🚗', en: 'Private AC Cabs', hi: 'निजी वाहन' },
                  { icon: '🏨', en: 'Curated Hotels', hi: 'चयनित होटल' },
                  { icon: '📱', en: '24/7 Support', hi: '24/7 सहायता' },
                ].map((feat, i) => (
                  <div key={i} className="bg-white/8 border border-white/10 rounded-xl p-3 text-center space-y-1">
                    <div className="text-xl">{feat.icon}</div>
                    <div className="text-[11px] font-semibold text-amber-100">{language === 'hi' ? feat.hi : feat.en}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { n: '01', en: 'Choose Your Journey', hi: 'यात्रा चुनें' },
                  { n: '02', en: 'Send an Enquiry', hi: 'पूछताछ करें' },
                  { n: '03', en: 'Plan Your Visit', hi: 'यात्रा प्लान करें' },
                ].map((step) => (
                  <div key={step.n} className="text-left">
                    <div className="text-stone-400 font-serif font-bold text-base">{step.n}</div>
                    <div className="text-[10px] sm:text-xs text-[#F5EBE6] font-semibold mt-0.5">{language === 'hi' ? step.hi : step.en}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <button
                onClick={() => onOpenBooking('Destination', dest.name)}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-sm shadow-md transition-all"
              >
                {language === 'hi' ? 'यात्रा हेतु पूछताछ करें' : 'ENQUIRE FOR VISIT'}
              </button>
              <button
                onClick={() => onOpenBooking('Pooja', dest.name)}
                className="w-full py-3 px-6 rounded-xl bg-[#FFFDF8] hover:bg-stone-100 text-stone-900 font-bold text-xs transition-colors"
              >
                {language === 'hi' ? 'पूजा बुकिंग करें' : 'BOOK A POOJA'}
              </button>
              <a
                href={`https://wa.me/${whatsappNum}?text=${whatsappMsg}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WHATSAPP US'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. RELATED POOJAS ── */}
      {relatedPoojas.length > 0 && (
        <section className="bg-[#FFFDF8] py-16 border-b border-stone-200/40">
          <div className="max-w-7xl mx-auto px-4 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-700 shrink-0" />
              {language === 'hi' ? `${destName} में वैदिक पूजा सेवाएं` : `Pooja Services in ${dest.name}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPoojas.slice(0, 6).map((p) => (
                <PoojaCard key={p.id} pooja={p} onBook={(name) => onOpenBooking('Pooja', name)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 10. RELATED TOUR PACKAGES ── */}
      {relatedTours.length > 0 && (
        <section className="bg-[#F6F0E6] py-16 border-b border-[#E6DBC8]">
          <div className="max-w-7xl mx-auto px-4 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-center flex items-center justify-center gap-2">
              <Compass className="w-6 h-6 text-emerald-700 shrink-0" />
              {language === 'hi' ? `${destName} सम्मिलित तीर्थ यात्रा पैकेज` : `Tour Packages Including ${dest.name}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.slice(0, 3).map((t) => (
                <TourCard key={t.id} tour={t} onBook={(name) => onOpenBooking('Tour', name)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 11. FAQ ACCORDION (AEO) ── */}
      {finalFaqs.length > 0 && (
        <section className="bg-[#F6F0E6] py-16 border-b border-[#E6DBC8]">
          <div className="max-w-4xl mx-auto px-4">
            <FAQAccordion
              faqs={finalFaqs}
              showCategoryTabs={false}
              title={language === 'hi' ? `${destName} यात्रा — अक्सर पूछे जाने वाले प्रश्न` : `${dest.name} Pilgrimage — Frequently Asked Questions`}
            />
          </div>
        </section>
      )}

      {/* ── 12. INTERACTIVE SACRED MAP ── */}
      <section className="bg-[#FFFDF8] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <DestinationMapVisualizer
            destinationSlug={dest.slug}
            destinationName={dest.name}
            onOpenBooking={onOpenBooking}
          />
        </div>
      </section>

      {/* ── 13. SOCIAL SHARE + FINAL DARK CTA FOOTER ── */}
      <footer
        className="relative text-white py-20 text-center space-y-6 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(58, 21, 24, 0.92), rgba(58, 21, 24, 0.95)), url("${dest.heroImage || '/src/assets/images/header_bg_spiritual_1786196057015.jpg'}")` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(217,119,6,0.1),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <SocialShareButtons
            title={language === 'hi' ? `${destName} का आध्यात्मिक दर्शन गाइड` : `Spiritual Guide to ${dest.name}`}
            description={destShortDesc}
          />
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 pt-4">
            {language === 'hi' ? `${destName} दर्शन की योजना बनाएं` : `Plan Your ${dest.name} Darshan`}
          </h2>
          <p className="text-stone-300 text-sm max-w-xl mx-auto">
            {language === 'hi'
              ? 'आस्था से रास्ता सेवा के साथ आपकी तीर्थ यात्रा की संपूर्ण और सहज व्यवस्था।'
              : 'Let Aastha Sey Raasta Seva arrange a seamless and blessed pilgrimage experience for you.'}
          </p>
          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => onOpenBooking('Destination', dest.name)}
              className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-sm shadow-md transition-colors"
            >
              {language === 'hi' ? 'यात्रा पूछताछ करें' : 'ENQUIRE FOR VISIT'}
            </button>
            <button
              onClick={() => onOpenBooking('Pooja', dest.name)}
              className="px-8 py-3 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/40 font-bold text-sm transition-colors"
            >
              {language === 'hi' ? 'पूजा बुकिंग' : 'BOOK A POOJA'}
            </button>
            <a
              href={`https://wa.me/${whatsappNum}?text=${whatsappMsg}`}
              target="_blank" rel="noopener noreferrer"
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
