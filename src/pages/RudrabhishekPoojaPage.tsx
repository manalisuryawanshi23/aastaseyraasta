import React from 'react';
import { StoreService } from '../services/store';
import { ContentService } from '../services/contentService';
import { SEOHead } from '../components/SEOHead';
import { PoojaCard } from '../components/PoojaCard';
import { useLanguage } from '../context/LanguageContext';
import { FadeIn } from '../components/FadeIn';
import {
  Flame,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Sparkles,
  Clock,
  MapPin,
  ChevronRight,
  Users,
  AlertCircle,
} from 'lucide-react';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildPoojaServiceSchema,
  buildLocalBusinessSchema,
} from '../utils/seoSchemas';

interface RudrabhishekPoojaPageProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour' | 'Destination' | 'General', name?: string) => void;
}

export const RudrabhishekPoojaPage: React.FC<RudrabhishekPoojaPageProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();
  const settings = StoreService.getSettings();

  // Re-read from localStorage when API sync fires
  const [, setSyncTick] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setSyncTick((n) => n + 1);
    window.addEventListener('aastha:data-synced', handler);
    return () => window.removeEventListener('aastha:data-synced', handler);
  }, []);

  // Get Rudrabhishek pooja from store (stays in sync with DB)
  const pooja = StoreService.getPoojaBySlug('rudrabhishek-pooja-ujjain');
  const poojaData = pooja ? ContentService.enrichPooja(pooja, language) : null;

  const h1 = poojaData?.h1 || 'Rudrabhishek Pooja in Ujjain — Sacred Vedic Shiva Ritual';
  const hindiName = poojaData?.hindiName || 'रुद्राभिषेक पूजा — शिव मंदिर, उज्जैन';
  const shortDesc = poojaData
    ? (language === 'hi' ? (poojaData as any).hindiShortDescription || poojaData.shortDescription : poojaData.shortDescription)
    : 'Performing Rudrabhishek Pooja in Ujjain is one of the most revered spiritual practices for devotees of Lord Shiva. Book authentic Rudrabhishek across sacred Shiva temples with Vedic pandits, holy Panchamrit, and Sri Rudram chanting.';
  const fullDesc = poojaData
    ? (language === 'hi' ? (poojaData as any).hindiDescription || poojaData.description : poojaData.description)
    : '';
  const categoryName = poojaData
    ? (language === 'hi' ? (poojaData as any).hindiCategoryName || poojaData.categoryName : poojaData.categoryName) || 'Temple Pooja Services'
    : 'Temple Pooja Services';
  const templeName = poojaData
    ? (language === 'hi' ? (poojaData as any).hindiTempleName || poojaData.templeName : poojaData.templeName)
    : 'All Shiva temples in Ujjain (Mahakaleshwar, Omkareshwar, Mangalnath, Angareshwar)';
  const duration = poojaData
    ? (language === 'hi' ? (poojaData as any).hindiDuration || poojaData.duration : poojaData.duration)
    : '45 to 60 Minutes';
  const quickAnswer = poojaData?.quickAnswer || 'Rudrabhishek pooja in ujjain is a sacred Hindu ritual dedicated to Lord Shiva in which learned Vedic pandits recite the holy Rudram Sukt from the Yajurveda while performing a continuous ceremonial bath (Abhishek) of the Shivling using consecrated liquids. Devotees traditionally organize this ceremony to seek divine blessings, inner peace, physical health, spiritual purification, and the removal of life\'s persistent obstacles.';
  const featuredImage = poojaData?.featuredImage || '/assets/images/rudrabhishek-pooja-ujjain.webp';

  const offers = language === 'hi' && (poojaData as any)?.hindiWhatWeOffer?.length
    ? (poojaData as any).hindiWhatWeOffer
    : poojaData?.whatWeOffer || [
        'Complete arrangements for the ceremony organized with complete devotion, authenticity, and convenience.',
        'Rituals conducted strictly by experienced, hereditary, and Vedic-qualified Pandits of Ujjain.',
        'Provision of pure, satvik ritual materials including fresh Panchamrit, Belpatra, flowers, Bhasma, and holy water.',
        'Personal guidance for devotees regarding temple reporting times, dress codes, and ritual participation.',
      ];

  const benefits = language === 'hi' && poojaData?.hindiBenefits?.length
    ? poojaData.hindiBenefits
    : poojaData?.benefits || [
        'Seeking Divine Blessings: Considered one of the most powerful Vedic rituals to seek Lord Shiva\'s direct grace and benevolence.',
        'Spiritual Purification: Traditionally believed to purify the mind, body, and soul, helping to dissolve past accumulated karmic burdens.',
        'Mental Peace and Calmness: Brings deep inner tranquility, emotional balance, and a sense of spiritual awakening during stressful life phases.',
        'Deepening Devotion: Strengthens an individual\'s personal connection with the divine and fosters heartfelt devotion (Bhakti).',
        'Pacifying Shani Influences: In traditional astrology, the ritual is frequently associated with pacifying the malefic effects of planet Saturn (Shani), including Sade Sati or Shani Dosh.',
        'Addressing Astrological Combinations: Traditionally associated with seeking peace from complex planetary positions, including Kaal Sarp Dosh and Pitru Dosh combinations.',
        'Support for Moon Afflictions: May help reduce the negative emotional influences associated with a weak or afflicted Moon in one\'s birth chart.',
        'Overcoming Life Hurdles: Traditionally performed with the intention of removing obstacles affecting career progression, marital harmony, and health matters.',
      ];

  const whoCanConsider = language === 'hi' && (poojaData as any)?.hindiWhoIsItFor?.length
    ? (poojaData as any).hindiWhoIsItFor
    : poojaData?.whoCanConsider || [
        'Devotees seeking Lord Shiva\'s divine grace, peace, and spiritual purification.',
        'Individuals going through Saturn (Shani) Sade Sati, Dhaiya, or malefic planetary periods.',
        'People experiencing emotional distress, weak Moon influence, or restless thoughts.',
        'Families wishing to pray for general well-being, health protection, and hurdle removal in Ujjain.',
      ];

  const preparation = language === 'hi' && poojaData?.hindiPreparation?.length
    ? poojaData.hindiPreparation
    : poojaData?.preparation || ['Clean attire, Name, Gotra & Nakshatra details', 'Arrive 15 minutes before scheduled time'];

  const ritualDetails = language === 'hi'
    ? (poojaData as any)?.hindiRitualDetails || poojaData?.ritualDetails
    : poojaData?.ritualDetails || 'Sri Rudram chanting, Panchamrit Abhishek, Bilva Patra Archana, Gotra Sankalp, Mangal Aarti.';

  const rawFaqs = (poojaData as any)?.faqs;
  const poojaFaqs: { question: string; answer: string }[] =
    Array.isArray(rawFaqs) && rawFaqs.length > 0
      ? rawFaqs
      : [
          { question: 'What is the main purpose of Rudrabhishek Pooja?', answer: 'It is a sacred Vedic ritual dedicated to Lord Shiva, performed by bathing the Shivling with Panchamrit while chanting Sri Rudram for spiritual purification, peace, and divine grace.' },
          { question: 'What ingredients are used in Rudrabhishek?', answer: 'The ritual uses traditional sacred fluids including holy Ganga water, pure cow milk, fresh curd, honey, desi ghee, sugarcane juice, and bilva leaves.' },
          { question: 'Is personal Gotra Sankalp included?', answer: 'Yes, every Rudrabhishek ritual performed through Aastha Sey Raasta Seva begins with a personalized Name and Gotra Sankalp for the devotee and their family.' },
          { question: 'Where is the ritual conducted in Ujjain?', answer: 'The ritual is arranged at sacred Shiva sanctums and temples in Ujjain, Madhya Pradesh.' },
          { question: 'What benefits are traditionally associated with this pooja?', answer: 'Traditional benefits include seeking divine Shiva grace, spiritual purification, mental peace, pacifying Shani and Moon afflictions, and removing obstacles.' },
        ];

  const internalLinks: { anchor: string; link: string }[] = (poojaData as any)?.internalLinks || [
    { anchor: 'Navgraha Shanti Pooja', link: '/pooja/navgraha-shanti-pooja-ujjain' },
    { anchor: 'Bhat Pooja at Mangalnath', link: '/pooja/bhat-pooja-mangalnath-ujjain' },
    { anchor: 'Bhat Pooja at Angareshwar', link: '/pooja/bhat-pooja-angareshwar-ujjain' },
    { anchor: 'Kaal Sarp Dosh Pooja', link: '/pooja/kaal-sarp-dosh-shanti-ujjain' },
    { anchor: 'Mahamrityunjaya Jaap', link: '/pooja/mahamrityunjaya-jaap-ujjain' },
  ];

  const allPoojas = StoreService.getPoojas().filter((p) => p.isPublished);
  const relatedPoojas = allPoojas.filter((p) => p.slug !== 'rudrabhishek-pooja-ujjain' && p.categoryId === 'cat-temple').slice(0, 3);
  const displayRelated = relatedPoojas.length > 0 ? relatedPoojas : allPoojas.filter((p) => p.slug !== 'rudrabhishek-pooja-ujjain').slice(0, 3);

  // JSON-LD schemas — ALL EXISTING SEO/AEO signals preserved
  const schemaPooja = pooja ? buildPoojaServiceSchema(pooja) : buildPoojaServiceSchema({
    id: 'pooja-rudrabhishek',
    name: 'Rudrabhishek Pooja in Ujjain',
    shortDescription: 'Book authentic Rudrabhishek pooja in ujjain at sacred Shiva temples.',
    templeName: 'All Shiva temples in Ujjain',
    city: 'Ujjain',
    country: 'India',
    faqs: poojaFaqs,
  } as any);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pooja Services', url: '/pooja-services' },
    { name: 'Rudrabhishek Pooja in Ujjain', url: '/rudrabhishek-pooja-ujjain' },
  ]);
  const faqSchema = buildFAQSchema(poojaFaqs.slice(0, 5));
  const localBusinessSchema = buildLocalBusinessSchema(settings);
  const jsonLd = [schemaPooja, breadcrumbSchema, faqSchema, localBusinessSchema];

  // Render markdown-like structured description
  const renderDescription = (text?: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let buf: string[] = [];

    const flush = (key: number) => {
      if (buf.length > 0) {
        const t = buf.join(' ').trim();
        if (t) {
          elements.push(
            <p key={`p-${key}`} className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base mb-4">
              {t}
            </p>
          );
        }
        buf = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) { flush(i); return; }
      if (trimmed.startsWith('## ')) {
        flush(i);
        elements.push(
          <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-amber-100 pt-6 pb-2 border-b border-amber-100 dark:border-stone-800 mb-3">
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flush(i);
        elements.push(
          <h3 key={`h3-${i}`} className="text-lg font-serif font-bold text-amber-900 dark:text-amber-300 pt-4 mb-2">
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        flush(i);
        elements.push(
          <div key={`li-${i}`} className="flex items-start gap-2.5 text-stone-700 dark:text-stone-300 text-sm my-1.5 ml-2">
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

  const benefitIcons = [Sparkles, ShieldCheck, Clock, CheckCircle2, Flame, Calendar, Users, MapPin];

  return (
    <div className="min-h-screen bg-[#FFFDF8] dark:bg-[#151312] text-stone-900 dark:text-stone-100">
      {/* SEO Head — ALL EXISTING SEO/AEO SIGNALS PRESERVED */}
      <SEOHead
        title="Rudrabhishek Pooja in Ujjain | Aastha Sey Raasta Seva"
        description="Book authentic Rudrabhishek pooja in ujjain at sacred Shiva temples. Performed by experienced Vedic pandits with complete arrangements and devotion."
        keywords="rudrabhishek pooja in ujjain, rudrabhishek in ujjain, ujjain rudrabhishek pooja, rudrabhishek pooja booking ujjain, rudrabhishek at shiva temples ujjain, rudrabhishek seva ujjain"
        canonicalUrl={`${typeof window !== 'undefined' ? window.location.origin : 'https://aasthaserasta.com'}/rudrabhishek-pooja-ujjain`}
        ogImage={featuredImage}
        ogImageAlt="Rudrabhishek Pooja in Ujjain Shivling Panchamrit Abhishek"
        jsonLd={jsonLd}
      />

      {/* 1. Breadcrumb */}
      <div className="bg-[#F6F0E6] dark:bg-[#1C1917] border-b border-[#E6DBC8] dark:border-stone-800 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-xs font-medium text-stone-500 dark:text-stone-400" aria-label="Breadcrumb">
            <a href="/" className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
              {language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}
            </a>
            <ChevronRight className="w-3 h-3" />
            <a href="/pooja-services" className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
              {language === 'hi' ? 'पूजा सेवाएं' : 'Pooja Services'}
            </a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-stone-800 dark:text-stone-200 font-semibold">
              {language === 'hi' ? 'रुद्राभिषेक पूजा उज्जैन' : 'Rudrabhishek Pooja in Ujjain'}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section */}
      <header className="relative bg-[#3A1518] dark:bg-[#1A0A0B] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,26,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <FadeIn direction="left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold tracking-wider uppercase border border-amber-500/20">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'hi' ? 'मंदिर पूजा सेवा' : categoryName}</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight mt-3">
                {language === 'hi' ? 'रुद्राभिषेक पूजा — उज्जैन' : h1}
              </h1>

              <p className="text-amber-300/90 text-sm sm:text-base font-medium font-serif">
                {language === 'hi' ? 'शिव मंदिर उज्जैन में वैदिक रुद्राभिषेक सेवा' : hindiName}
              </p>

              <p className="text-[#F4EDE4] text-xs sm:text-sm leading-relaxed max-w-2xl pt-2">
                {shortDesc}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {templeName && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-200/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {language === 'hi' ? 'उज्जैन के सभी शिव मंदिर' : templeName}
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

              <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenBooking('Pooja', 'Rudrabhishek Pooja')}
                  className="w-full sm:w-auto py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg hover:-translate-y-0.5"
                >
                  {language === 'hi' ? 'अभी पूछताछ करें →' : 'ENQUIRE NOW →'}
                </button>
                <a
                  href={`https://wa.me/${settings?.whatsappNumber || '9111099799'}?text=${encodeURIComponent('Jai Shree Mahakal 🙏 I want to enquire about Rudrabhishek Pooja in Ujjain.')}`}
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

          {/* Right Column — Featured Image */}
          <div className="lg:col-span-5 relative">
            <FadeIn direction="right" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/20 aspect-[4/3] bg-stone-900">
                <img
                  src={featuredImage}
                  alt="Rudrabhishek Pooja in Ujjain Shivling Panchamrit Abhishek"
                  className="w-full h-full object-cover brightness-90"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 to-transparent pointer-events-none" />
              </div>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* 3. Quick Service Summary Cards */}
      <section className="bg-stone-50 dark:bg-[#1E1B19] py-8 border-b border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: language === 'hi' ? 'पूजा का प्रकार' : 'Pooja Type', value: language === 'hi' ? 'रुद्राभिषेक वैदिक पूजन' : 'Rudrabhishek Vedic Poojan' },
              { label: language === 'hi' ? 'स्थान' : 'Location', value: language === 'hi' ? 'उज्जैन, मध्यप्रदेश' : 'Ujjain, Madhya Pradesh' },
              { label: language === 'hi' ? 'अवधि' : 'Duration', value: duration || '45 to 60 Minutes' },
              { label: language === 'hi' ? 'आयोजक' : 'Arranged By', value: 'Aastha Sey Raasta Seva' },
            ].map((card, i) => (
              <div key={i} className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800 text-left">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider block">{card.label}</span>
                <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-amber-100 block mt-1">{card.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Quick Answer — AEO SECTION */}
      <section className="bg-white dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="inline-block text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            {language === 'hi' ? 'त्वरित जानकारी' : 'QUICK ANSWER'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 mt-1">
            {language === 'hi' ? 'रुद्राभिषेक पूजा क्या है?' : 'What is Rudrabhishek Pooja in Ujjain?'}
          </h2>
          <div className="p-6 sm:p-8 bg-[#F6F0E6] dark:bg-[#1C1917] rounded-3xl border border-[#E6DBC8] dark:border-stone-800 text-left shadow-sm">
            <p className="text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed">
              <strong>Rudrabhishek pooja in ujjain</strong> is a sacred Hindu ritual dedicated to Lord Shiva in which learned Vedic pandits recite the holy Rudram Sukt from the Yajurveda while performing a continuous ceremonial bath (Abhishek) of the Shivling using consecrated liquids. Devotees traditionally organize this ceremony to seek divine blessings, inner peace, physical health, spiritual purification, and the removal of life's persistent obstacles.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Main Description */}
      <section className="bg-[#FFFDF8] dark:bg-[#1A1816] py-16 border-b border-stone-200/60 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-4 text-left space-y-6">
          <FadeIn direction="up">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              {language === 'hi' ? 'आध्यात्मिक महत्व एवं विधि परिचय' : 'Overview & Ritual Significance'}
            </h2>
            <div className="space-y-1 pt-2">
              {renderDescription(fullDesc || shortDesc)}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. Ritual Details & Preparation */}
      {(ritualDetails || (preparation && preparation.length > 0)) && (
        <section className="bg-[#F6F0E6] dark:bg-[#151312] py-16 border-b border-[#E6DBC8] dark:border-stone-800">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            {ritualDetails && (
              <FadeIn direction="up">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 border-b border-amber-200/50 dark:border-stone-800 pb-2 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-700 dark:text-amber-500 shrink-0" />
                    {language === 'hi' ? 'वैदिक पूजा विधि एवं मुख्य चरण' : 'Vedic Ritual Steps & Vidhi'}
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">{ritualDetails}</p>
                </div>
              </FadeIn>
            )}
            {preparation && preparation.length > 0 && (
              <FadeIn direction="up" delay={100}>
                <div className="space-y-3 bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-500" />
                    {language === 'hi' ? 'भक्तों के लिए पूर्व तैयारी एवं नियम' : 'Preparation for Devotees'}
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

      {/* 7. Benefits Grid */}
      {benefits && benefits.length > 0 && (
        <section className="bg-[#FFFDF8] dark:bg-[#1A1816] py-20 border-b border-stone-200/60 dark:border-stone-800">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            <FadeIn direction="up">
              <div className="text-center space-y-2">
                <span className="text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                  {language === 'hi' ? 'परंपरागत लाभ' : 'TRADITIONAL BENEFITS'}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100 mt-2">
                  {language === 'hi' ? 'रुद्राभिषेक के पारंपरिक एवं ज्योतिषीय लाभ' : 'Traditional Astrological & Scriptural Benefits'}
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm max-w-xl mx-auto">
                  {language === 'hi'
                    ? 'श्रद्धालु इस पूजा को पूर्ण विश्वास से पारंपरिक लाभों की प्रार्थना के साथ कराते हैं:'
                    : 'Devotees perform this ritual with absolute faith, seeking traditional benefits associated with Lord Shiva\'s Rudrabhishek:'}
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {benefits.map((benefit, idx) => {
                const IconComp = benefitIcons[idx % benefitIcons.length];
                const colonIdx = benefit.indexOf(':');
                const title = colonIdx > -1 ? benefit.slice(0, colonIdx).trim() : `Benefit ${idx + 1}`;
                const body = colonIdx > -1 ? benefit.slice(colonIdx + 1).trim() : benefit;
                return (
                  <div key={idx} className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-left space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-amber-100 leading-snug">{title}</h3>
                    <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">{body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. What We Offer — Dark Maroon Panel */}
      {offers && offers.length > 0 && (
        <section className="relative bg-[#3A1518] dark:bg-[#1A0A0B] text-white py-20 overflow-hidden border-t border-b border-[#4A1B1B]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,26,0.1),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10 text-left">
            <div className="space-y-6">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'हमारी व्यवस्था' : 'WHAT WE OFFER'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
                {language === 'hi' ? 'रुद्राभिषेक पूजा व्यवस्था' : 'Rudrabhishek Pooja Arrangements'}
              </h2>
              <p className="text-[#F4EDE4] text-xs sm:text-sm leading-relaxed">
                {language === 'hi'
                  ? 'उज्जैन के प्रामाणिक शिव मंदिरों में रुद्राभिषेक पूजा की संपूर्ण व्यवस्था आस्था से रास्ता सेवा द्वारा श्रद्धा, प्रामाणिकता और सुविधा के साथ की जाती है।'
                  : 'Aastha Sey Raasta Seva facilitates complete arrangements for authentic Rudrabhishek worship at Shiva temples in Ujjain, ensuring that every ritual is conducted with deep devotion, ritual authenticity, and utmost convenience for pilgrims.'}
              </p>
              {internalLinks.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-amber-400/80 text-[10px] font-bold uppercase tracking-wider block">Related Services</span>
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
                <div key={idx} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
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

      {/* 9. Who Can Consider */}
      {whoCanConsider && whoCanConsider.length > 0 && (
        <section className="bg-white dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-800">
          <div className="max-w-4xl mx-auto px-4 text-left space-y-6">
            <FadeIn direction="up">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 border-b border-amber-100 dark:border-stone-800 pb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-700 dark:text-amber-500 shrink-0" />
                {language === 'hi' ? 'यह पूजा सेवा किसके लिए उपयुक्त है' : 'Who Can Consider This Ritual'}
              </h2>
              <ul className="space-y-3 pt-2">
                {whoCanConsider.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-stone-700 dark:text-stone-300 text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>
      )}

      {/* 10. Full-Width Vedic Booking Assistance — NO SIDEBAR */}
      <section className="bg-[#FFFDF8] dark:bg-[#1E1B19] py-16 border-b border-stone-200/60 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-[#1C1917] border-2 border-amber-400 dark:border-amber-500 rounded-3xl p-6 sm:p-8 shadow-xl text-center md:text-left md:grid md:grid-cols-12 md:gap-8 md:items-center">
            {/* Left Column: Title & Details */}
            <div className="md:col-span-7 space-y-4">
              <span className="text-amber-800 dark:text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'वैदिक पूजा बुकिंग सहायता' : 'VEDIC BOOKING ASSISTANCE'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 leading-tight">
                {language === 'hi' ? 'अपनी पूजा आरक्षित करें' : 'Reserve Your Vidhi'}
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
                {language === 'hi' ? 'उज्जैन के अधिकृत पंडितों द्वारा नाम व गोत्र संकल्प।' : 'Gotra sankalp reservation with authentic Ujjain Pandits.'}
              </p>
              <div className="bg-amber-500/5 rounded-2xl border border-amber-500/20 p-5 mt-4 text-xs sm:text-sm space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-stone-500 dark:text-stone-400">{language === 'hi' ? 'मंदिर स्थान:' : 'Temple Location:'}</span>
                  <span className="font-bold text-stone-800 dark:text-amber-100 text-right">{language === 'hi' ? 'उज्जैन (मध्यप्रदेश)' : 'Ujjain (Madhya Pradesh)'}</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-stone-500 dark:text-stone-400">{language === 'hi' ? 'पंडित दक्षिणा व सामग्री:' : 'Pandit Dakshina & Samagri:'}</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{language === 'hi' ? 'शामिल' : 'Included'}</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-stone-500 dark:text-stone-400">{language === 'hi' ? 'कस्टमाइजेशन:' : 'Customization:'}</span>
                  <span className="font-bold text-stone-800 dark:text-amber-100">{language === 'hi' ? 'उपलब्ध' : 'Available'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: CTAs */}
            <div className="md:col-span-5 mt-6 md:mt-0 flex flex-col justify-center">
              <button
                onClick={() => onOpenBooking('Pooja', 'Rudrabhishek Pooja')}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-800 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 fill-current" />
                <span>{language === 'hi' ? 'रुद्राभिषेक पूजा बुक करें' : 'Book a Pooja - Rudrabhishek in Ujjain'}</span>
              </button>
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '9111099799'}?text=${encodeURIComponent('Jai Shree Mahakal 🙏 I want to enquire about Rudrabhishek Pooja in Ujjain.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer mt-3"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WhatsApp Chat'}</span>
              </a>
              <div className="text-center mt-6 space-y-1">
                <span className="text-stone-500 dark:text-stone-400 text-xs block">
                  {language === 'hi' ? 'तत्काल सहायता चाहिए?' : 'Need immediate assistance?'}
                </span>
                <a
                  href={`tel:${settings?.phone1 || '+919111099799'}`}
                  className="text-amber-800 dark:text-amber-400 font-bold hover:underline text-xs sm:text-sm block"
                >
                  {language === 'hi' ? 'हमें कॉल करें' : 'Call Us'} {settings?.phone1 || '+91 9111099799'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      {poojaFaqs.length > 0 && (
        <section className="bg-[#FFFDF8] dark:bg-[#1A1816] py-20 border-b border-stone-200/60 dark:border-stone-800">
          <div className="max-w-4xl mx-auto px-4 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'सामान्य प्रश्न' : 'FAQS & GUIDANCE'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
                {language === 'hi' ? 'रुद्राभिषेक पूजा — सामान्य प्रश्न' : 'Rudrabhishek Pooja — Frequently Asked Questions'}
              </h2>
            </div>
            <div className="space-y-4 pt-6">
              {poojaFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden text-left">
                  <details className="group cursor-pointer">
                    <summary className="flex items-center justify-between p-5 text-sm sm:text-base font-bold text-stone-900 dark:text-amber-100 select-none outline-none list-none">
                      <span>{faq.question}</span>
                      <span className="text-stone-400 group-open:rotate-180 transition-transform duration-200 ml-3 shrink-0">▼</span>
                    </summary>
                    <div className="px-5 pb-5 pt-1 text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-stone-100 dark:border-stone-800">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. Related Pooja Services */}
      {displayRelated.length > 0 && (
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
              {displayRelated.map((p, idx) => (
                <PoojaCard key={p.id} pooja={p} onBook={(name) => onOpenBooking('Pooja', name)} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. Final CTA */}
      <section className="relative bg-[#3A1518] dark:bg-[#1A0A0B] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none" style={{ backgroundImage: `url('${featuredImage}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A1518]/80 to-[#3A1518]/90 dark:from-[#1A0A0B]/80 dark:to-[#1A0A0B]/90 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <FadeIn direction="up">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
              {language === 'hi' ? 'अपना रुद्राभिषेक बुक करें' : 'Plan Your Rudrabhishek Pooja in Ujjain'}
            </h2>
            <p className="text-[#F4EDE4] text-xs sm:text-sm max-w-2xl mx-auto">
              {language === 'hi'
                ? 'आस्था से रास्ता सेवा के साथ उज्जैन के पवित्र शिव मंदिरों में प्रामाणिक रुद्राभिषेक पूजा की व्यवस्था करें।'
                : 'Enquire with Aastha Sey Raasta Seva to book authentic Rudrabhishek Pooja at sacred Shiva temples in Ujjain with experienced Vedic pandits.'}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button
                onClick={() => onOpenBooking('Pooja', 'Rudrabhishek Pooja')}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-lg"
              >
                {language === 'hi' ? 'अभी पूछताछ करें' : 'ENQUIRE NOW'}
              </button>
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '9111099799'}?text=${encodeURIComponent('Jai Shree Mahakal 🙏 I want to enquire about Rudrabhishek Pooja in Ujjain.')}`}
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
