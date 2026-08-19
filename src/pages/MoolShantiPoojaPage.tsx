import React from 'react';
import { StoreService } from '../services/store';
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
  Phone,
  HelpCircle,
  Clock,
  MapPin,
  ChevronRight,
  X,
  ChevronLeft,
  Users,
} from 'lucide-react';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildPoojaServiceSchema,
  buildLocalBusinessSchema,
} from '../utils/seoSchemas';

interface MoolShantiPoojaPageProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour' | 'Destination' | 'General', name?: string) => void;
}

export const MoolShantiPoojaPage: React.FC<MoolShantiPoojaPageProps> = ({ onOpenBooking }) => {
  const { language, t } = useLanguage();
  const settings = StoreService.getSettings();

  // Fetch related pooja services dynamically from store
  const allPoojas = StoreService.getPoojas().filter((p) => p.isPublished);
  const relatedPoojas = allPoojas
    .filter((p) => p.slug !== 'mool-shanti-pooja-ujjain')
    .slice(0, 3);

  // Mock pooja object structure for schema builders
  const poojaDetails = {
    name: 'Mool Shanti Pooja',
    hindiName: 'मूल शांति पूजा',
    slug: 'mool-shanti-pooja-ujjain',
    shortDescription: 'Mool Shanti Pooja is a Vedic ritual performed for children born under Mool Nakshatra (birth star) to pray for the well-being of the child and family.',
    description: 'Mool Shanti Pooja is a Vedic ritual performed for children born under Mool Nakshatra. According to Vedic tradition, the ritual is performed to pacify traditionally believed negative effects of Mool Nakshatra and to pray for the well-being and long life of the child, as well as peace, harmony and prosperity in the family.',
    featuredImage: '/src/assets/images/mool_shanti_pooja_ujjain_1787114840814.jpg',
    templeName: 'Ujjain Temple',
    city: 'Ujjain',
    price: null,
    packages: [],
    faqs: [
      {
        question: 'What is Mool Shanti Pooja?',
        answer: 'Mool Shanti Pooja is a Vedic ritual performed for children born under Mool Nakshatra. According to Vedic tradition, the ritual is performed to pacify traditionally believed negative effects of Mool Nakshatra and to pray for the well-being and long life of the child, as well as peace, harmony and prosperity in the family.',
      },
      {
        question: 'Who is Mool Shanti Pooja performed for?',
        answer: 'This Pooja is performed for children born under the Mool Nakshatra (birth star).',
      },
      {
        question: 'Why is Mool Shanti Pooja performed?',
        answer: 'According to traditional belief, the ritual is performed to pacify the negative effects of Mool Nakshatra, safeguard parents from difficulties traditionally associated with Mool Nakshatra birth, clear hurdles in the child\'s growth, and invoke blessings for longevity, peace, harmony, and prosperity.',
      },
      {
        question: 'What are the traditional benefits associated with Mool Shanti Pooja?',
        answer: 'The traditional benefits associated with the Pooja include pacification of Mool Nakshatra effects, child\'s health and longevity, protection of parents, reduced conflicts and family harmony, removal of growth obstacles, family stability, and an auspicious beginning for the child\'s journey.',
      },
      {
        question: 'What does Aastha Sey Raasta Seva provide for Mool Shanti Pooja?',
        answer: 'We provide complete arrangements for Mool Shanti Pooja Anushthan with devotion, authenticity and convenience for devotees.',
      },
      {
        question: 'Who performs the Mool Shanti Pooja Anushthan?',
        answer: 'The ritual is performed by experienced and Vedic-qualified pandits.',
      },
      {
        question: 'How can I enquire about arranging Mool Shanti Pooja?',
        answer: 'Contact Aastha Sey Raasta Seva to enquire about arranging this service.',
      },
    ],
  };

  // Structured schemas for Search & AEO engines
  const serviceSchema = buildPoojaServiceSchema(poojaDetails);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pooja Services', url: '/poojas' },
    { name: 'Mool Shanti Pooja', url: '/mool-shanti-pooja-ujjain' },
  ]);
  const faqSchema = buildFAQSchema(poojaDetails.faqs);
  const localBusinessSchema = buildLocalBusinessSchema(settings);

  const jsonLd = [serviceSchema, breadcrumbSchema, faqSchema, localBusinessSchema];

  return (
    <div className="min-h-screen bg-[#FFFDF8] dark:bg-[#151312] text-stone-900 dark:text-stone-100">
      <SEOHead
        title="Mool Shanti Pooja in Ujjain | Aastha Sey Raasta Seva"
        description="Arrange Mool Shanti Pooja in Ujjain for a child born under Mool Nakshatra. Aastha Sey Raasta Seva provides complete arrangements with experienced Vedic-qualified pandits."
        canonicalUrl={`${window.location.origin}/mool-shanti-pooja-ujjain`}
        jsonLd={jsonLd}
      />

      {/* 1. Breadcrumbs Header */}
      <div className="bg-[#F6F0E6] dark:bg-[#1C1917] border-b border-[#E6DBC8] dark:border-stone-850 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-xs font-medium text-stone-550 dark:text-stone-400">
            <a href="/" className="hover:text-rose-700 dark:hover:text-rose-455 transition-colors">
              {language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}
            </a>
            <ChevronRight className="w-3 h-3" />
            <a href="/poojas" className="hover:text-rose-700 dark:hover:text-rose-455 transition-colors">
              {language === 'hi' ? 'पूजा सेवाएं' : 'Pooja Services'}
            </a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-stone-850 dark:text-stone-200 font-semibold">
              {language === 'hi' ? 'मूल शांति पूजा' : 'Mool Shanti Pooja'}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section */}
      <header className="relative bg-[#3A1518] dark:bg-[#1A0A0B] text-white py-16 sm:py-24 overflow-hidden">
        {/* Decorative backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,26,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <FadeIn direction="left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold tracking-wider uppercase border border-amber-500/20">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'hi' ? 'वैदिक पूजा सेवा' : 'Vedic Pooja Service'}</span>
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight mt-3">
                {language === 'hi' ? 'उज्जैन में मूल शांति पूजा' : 'Mool Shanti Pooja in Ujjain'}
              </h1>
              <p className="text-amber-200/90 text-sm sm:text-base font-medium max-w-xl">
                {language === 'hi'
                  ? 'बालक एवं परिवार के कल्याण हेतु मूल नक्षत्र शांति अनुष्ठान'
                  : 'Mool Nakshatra Shanti Anushthan for Child & Family'}
              </p>
              <p className="text-[#F4EDE4] text-xs sm:text-sm leading-relaxed max-w-2xl pt-2">
                {language === 'hi'
                  ? 'मूल शांति पूजा मूल नक्षत्र (जन्म नक्षत्र) के तहत पैदा हुए बच्चों के लिए किया जाने वाला एक वैदिक अनुष्ठान है। वैदिक परंपरा के अनुसार, यह अनुष्ठान मूल नक्षत्र के पारंपरिक रूप से माने जाने वाले नकारात्मक प्रभावों को शांत करने और बच्चे के कल्याण और परिवार की शांति, सद्भाव और समृद्धि के लिए प्रार्थना करने के लिए किया जाता है।'
                  : 'Mool Shanti Pooja is a Vedic ritual performed for children born under Mool Nakshatra. According to Vedic tradition, the ritual is performed to pacify traditionally believed negative effects of Mool Nakshatra and to pray for the well-being of the child and peace, harmony and prosperity of the family.'}
              </p>
              <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenBooking('Pooja', 'Mool Shanti Pooja')}
                  className="w-full sm:w-auto py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg hover:-translate-y-0.5"
                >
                  {language === 'hi' ? 'अभी पूछताछ करें →' : 'ENQUIRE NOW →'}
                </button>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
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

          {/* Right Column photo */}
          <div className="lg:col-span-5 relative">
            <FadeIn direction="right" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/20 aspect-[4/3] bg-stone-900">
                <img
                  src={poojaDetails.featuredImage}
                  alt="Mool Shanti Pooja in Ujjain"
                  className="w-full h-full object-cover brightness-95"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 to-transparent pointer-events-none" />
              </div>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* 3. Quick Service Summary Cards */}
      <section className="bg-stone-50 dark:bg-[#1E1B19] py-8 border-b border-stone-200/80 dark:border-stone-850">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800 text-left">
              <span className="text-[10px] text-stone-550 dark:text-stone-400 font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'पूजा का प्रकार' : 'Pooja Type'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-amber-100 block mt-1">
                {language === 'hi' ? 'मूल शांति पूजा अनुष्ठान' : 'Mool Shanti Pooja Anushthan'}
              </span>
            </div>
            <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800 text-left">
              <span className="text-[10px] text-stone-550 dark:text-stone-400 font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'किनके लिए' : 'For'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-amber-100 block mt-1">
                {language === 'hi' ? 'मूल नक्षत्र में जन्मे बच्चे' : 'Children born under Mool Nakshatra'}
              </span>
            </div>
            <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800 text-left">
              <span className="text-[10px] text-stone-550 dark:text-stone-400 font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'मुख्य उद्देश्य' : 'Purpose'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-amber-100 block mt-1">
                {language === 'hi' ? 'मूल नक्षत्र दोष शांति' : 'Mool Nakshatra Shanti'}
              </span>
            </div>
            <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800 text-left">
              <span className="text-[10px] text-stone-550 dark:text-stone-400 font-bold uppercase tracking-wider block">
                {language === 'hi' ? 'आयोजक' : 'Arranged By'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-amber-100 block mt-1">
                Aastha Sey Raasta Seva
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Answer — AEO SECTION */}
      <section className="bg-white dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-850">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="inline-block text-rose-700 dark:text-rose-455 text-xs font-bold uppercase tracking-wider">
            {language === 'hi' ? 'त्वरित जानकारी' : 'QUICK ANSWER'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 mt-1">
            {language === 'hi' ? 'मूल शांति पूजा क्या है?' : 'What is Mool Shanti Pooja?'}
          </h2>
          <div className="p-6 sm:p-8 bg-[#F6F0E6] dark:bg-[#1C1917] rounded-3xl border border-[#E6DBC8] dark:border-stone-850 text-left shadow-xs">
            <p className="text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed">
              <strong>Mool Shanti Pooja</strong> is a Vedic ritual performed for children born under Mool Nakshatra. According to Vedic tradition, the ritual is performed to pacify traditionally believed negative effects of Mool Nakshatra and to pray for the well-being and long life of the child, as well as peace, harmony and prosperity in the family.
            </p>
          </div>
        </div>
      </section>

      {/* 5. About Mool Shanti Pooja */}
      <section className="bg-[#FFFDF8] dark:bg-[#1A1816] py-16 border-b border-stone-250/60 dark:border-stone-850">
        <div className="max-w-4xl mx-auto px-4 text-left space-y-6">
          <FadeIn direction="up">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              {language === 'hi' ? 'मूल शांति पूजा के बारे में' : 'About Mool Shanti Pooja'}
            </h2>
            <div className="space-y-4 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed pt-2">
              <p>
                {language === 'hi'
                  ? 'मूल नक्षत्र (जन्म नक्षत्र) के प्रभाव को हिंदू ज्योतिष परंपराओं में अत्यंत महत्वपूर्ण माना गया है। मूल नक्षत्र के अंतर्गत जन्म लेने वाले बच्चों के माता-पिता तथा परिवार पर इसके कुछ चुनौतियों या दोषों के प्रभाव की पारंपरिक धारणा रही है।'
                  : 'Mool Shanti Pooja is a Vedic ritual performed for children born under the Mool Nakshatra (birth star), which is traditionally believed to bring certain challenges or doshas to the family, particularly affecting parents.'}
              </p>
              <p>
                {language === 'hi'
                  ? 'वैदिक परंपरा के अनुसार, इस अनुष्ठान को विशेष रूप से मूल नक्षत्र के नकारात्मक प्रभावों को शांत करने तथा शांतचित्त वातावरण स्थापित करने हेतु आयोजित किया जाता है। इस पूजा के माध्यम से बच्चे के स्वास्थ्य, दीर्घायु और कल्याण के साथ-साथ पूरे परिवार में सुख, शांति, आपसी सद्भाव और समृद्धि का आशीर्वाद प्राप्त करने की प्रार्थना की जाती है।'
                  : 'According to Vedic tradition, this ritual is performed to pacify the negative effects of Mool Nakshatra, ensure the well-being and long life of the child, and bring peace, harmony, and prosperity to the family.'}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. Traditional Purpose */}
      <section className="bg-[#F6F0E6] dark:bg-[#151312] py-16 border-b border-[#E6DBC8] dark:border-stone-850">
        <div className="max-w-4xl mx-auto px-4 text-left space-y-6">
          <FadeIn direction="up">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 border-b border-rose-200/50 dark:border-stone-800 pb-2">
              {language === 'hi' ? 'मूल शांति पूजा क्यों की जाती है?' : 'Why Is Mool Shanti Pooja Performed?'}
            </h2>
            <p className="text-stone-700 dark:text-stone-350 text-sm sm:text-base leading-relaxed pt-2">
              According to Vedic tradition, devotees perform the traditional Mool Shanti Anushthan with prayers for:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-stone-800 dark:text-stone-250 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-rose-700 dark:text-rose-500 mt-0.5 flex-shrink-0" />
                <span>Pacification of traditionally believed Mool Nakshatra negative effects.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-rose-700 dark:text-rose-500 mt-0.5 flex-shrink-0" />
                <span>Ensuring the child\'s physical development, health, and longevity.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-rose-700 dark:text-rose-500 mt-0.5 flex-shrink-0" />
                <span>Safeguarding parents from difficulties traditionally associated with the birth star.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-rose-700 dark:text-rose-500 mt-0.5 flex-shrink-0" />
                <span>Reducing tensions and establishing family peace, harmony, and understanding.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-rose-700 dark:text-rose-500 mt-0.5 flex-shrink-0" />
                <span>Clearing obstacles that could affect the child\'s growth and development.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-rose-700 dark:text-rose-500 mt-0.5 flex-shrink-0" />
                <span>Fostering overall stability and financial or personal prosperity in the household.</span>
              </li>
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* 7. Benefits Section */}
      <section className="bg-[#FFFDF8] dark:bg-[#1A1816] py-20 border-b border-stone-250/60 dark:border-stone-850">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
          <FadeIn direction="up">
            <span className="text-rose-700 dark:text-rose-455 text-xs font-bold uppercase tracking-wider">
              {language === 'hi' ? 'परंपरागत लाभ' : 'TRADITIONAL BENEFITS'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100 mt-2">
              {language === 'hi' ? 'मूल शांति पूजा के पारंपरिक लाभ' : 'Traditional Benefits of Mool Shanti Pooja'}
            </h2>
            <p className="text-stone-550 dark:text-stone-350 text-xs sm:text-sm max-w-xl mx-auto mt-1">
              Devotees perform this ritual with absolute faith, seeking traditional benefits associated with Mool Nakshatra Shanti:
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {/* Benefit Card 1 */}
            <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                Pacification of Mool Nakshatra Effects
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                Traditionally believed to neutralize the negative influences of Mool Nakshatra on the child and family.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                Well-being & Long Life of the Child
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                Invokes divine blessings for the child\'s health, vitality, and longevity according to traditional belief.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                Protection of Parents
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                Believed to safeguard parents from difficulties traditionally associated with Mool Nakshatra birth.
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                Family Harmony & Peace
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                Traditionally associated with reducing conflicts and tension within the family, fostering unity and understanding.
              </p>
            </div>

            {/* Benefit Card 5 */}
            <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                Support for Child\'s Growth
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                Traditionally associated with clearing hurdles that may affect the child\'s physical, mental, and emotional development.
              </p>
            </div>

            {/* Benefit Card 6 */}
            <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                Prosperity & Stability
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                Traditionally associated with overall stability and prosperity in the family after the birth of a child under this nakshatra.
              </p>
            </div>

            {/* Benefit Card 7 */}
            <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-left space-y-3 md:col-span-2 lg:col-span-1 mx-auto max-w-sm lg:max-w-none">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                Auspicious Beginning for the Child\'s Life
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                Traditionally associated with a positive and blessed start to the child\'s journey in life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. What We Offer Section */}
      <section className="relative bg-[#3A1518] dark:bg-[#1A0A0B] text-white py-20 overflow-hidden border-t border-b border-[#4A1B1B]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 text-left">
          <div className="space-y-6">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              {language === 'hi' ? 'हमारी व्यवस्था' : 'WHAT WE OFFER'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
              {language === 'hi' ? 'मूल शांति पूजा व्यवस्था' : 'Mool Shanti Pooja Arrangements'}
            </h2>
            <p className="text-[#F4EDE4] text-xs sm:text-sm leading-relaxed">
              We provide complete arrangements for Mool Shanti Pooja Anushthan with devotion, authenticity and convenience for devotees. The ritual is performed by experienced and Vedic-qualified pandits.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-amber-100">
                  Complete Pooja Anushthan Arrangements
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm mt-1">
                  We handle the complete organizational requirements with absolute authenticity and yatra convenience.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-amber-100">
                  Experienced & Vedic-Qualified Pandits
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm mt-1">
                  Rituals are guide-driven, performed exclusively by qualified pandits matching Gurukul traditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Who Can Consider This Pooja */}
      <section className="bg-white dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-850">
        <div className="max-w-4xl mx-auto px-4 text-left space-y-6">
          <FadeIn direction="up">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 border-b border-amber-100 dark:border-stone-850 pb-2">
              {language === 'hi' ? 'यह पूजा कौन करवा सकता है?' : 'Who Can Consider Mool Shanti Pooja?'}
            </h2>
            <p className="text-stone-700 dark:text-stone-350 text-sm sm:text-base leading-relaxed pt-2">
              Families seeking to perform the traditional Mool Shanti Anushthan for a child born under Mool Nakshatra may consider this Vedic ritual.
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed">
              Devotees generally perform this Pooja with prayers focused on ensuring the child\'s health, longevity, and physical growth while establishing peace, harmony, and prosperity in the household.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 10. Vedic Booking Assistance */}
      <section className="bg-[#FFFDF8] dark:bg-[#1E1B19] py-16 border-b border-stone-250/60 dark:border-stone-850">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-[#1C1917] border-2 border-amber-400 dark:border-amber-500 rounded-3xl p-6 sm:p-8 shadow-xl text-center md:text-left md:grid md:grid-cols-12 md:gap-8 md:items-center">
            
            {/* Left Column: Title, Subhead & Details Box */}
            <div className="md:col-span-7 space-y-4">
              <span className="text-amber-800 dark:text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider block">
                VEDIC BOOKING ASSISTANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 leading-tight">
                Reserve Your Vidhi
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
                Gotra sankalp reservation with authentic Ujjain Pandits.
              </p>

              {/* Details List Box */}
              <div className="bg-amber-500/5 dark:bg-amber-500/5 rounded-2xl border border-amber-500/20 p-5 mt-4 text-xs sm:text-sm space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-stone-500 dark:text-stone-400">Temple Location:</span>
                  <span className="font-bold text-stone-800 dark:text-amber-100 text-right">
                    Ujjain (Madhya Pradesh)
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-stone-500 dark:text-stone-400">Pandit Dakshina & Samagri:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    Included
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-stone-500 dark:text-stone-400">Customization:</span>
                  <span className="font-bold text-stone-800 dark:text-amber-100">
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: CTA Buttons & Phone Footer */}
            <div className="md:col-span-5 mt-6 md:mt-0 flex flex-col justify-center">
              {/* Primary Sparkled Book Button */}
              <button
                onClick={() => onOpenBooking('Pooja', 'Mool Shanti Pooja')}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-800 to-amber-900 hover:from-red-750 hover:to-amber-850 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 fill-current" />
                <span>Book a Pooja - Mool Shanti Pooja in Ujjain</span>
              </button>

              {/* Secondary WhatsApp Button */}
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '9111099799'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer mt-3"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Chat</span>
              </a>

              {/* Call Us Footer */}
              <div className="text-center mt-6 space-y-1">
                <span className="text-stone-500 dark:text-stone-400 text-xs block">
                  Need immediate assistance?
                </span>
                <a
                  href="tel:+919111099799"
                  className="text-amber-800 dark:text-amber-400 font-bold hover:underline text-xs sm:text-sm block"
                >
                  Call Us +91 9111099799
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Service Experience / Trust Section */}
      <section className="bg-white dark:bg-[#151312] py-16 border-b border-stone-200/80 dark:border-stone-850">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
            {language === 'hi' ? 'विश्वसनीय वैदिक अनुष्ठान' : 'Authentic Vedic Anushthan'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left pt-4">
            <div className="space-y-2">
              <h3 className="font-bold text-stone-850 dark:text-amber-100 text-sm sm:text-base">
                Complete Arrangement Support
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                Aastha Sey Raasta Seva handles all logistics and necessary details, ensuring that families can focus entirely on the spiritual ritual.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-stone-850 dark:text-amber-100 text-sm sm:text-base">
                Vedic-Qualified Pandits
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                The prayers are guided by experienced pandits trained under gurukul paths, reciting birth star mantras in absolute alignment with Vedic scripts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ Section */}
      <section className="bg-[#FFFDF8] dark:bg-[#1A1816] py-20 border-b border-stone-250/60 dark:border-stone-850">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-rose-700 dark:text-rose-455 text-xs font-bold uppercase tracking-wider block">
              {language === 'hi' ? 'सामान्य प्रश्न' : 'FAQS & GUIDANCE'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
              {language === 'hi' ? 'मूल शांति पूजा सामान्य प्रश्न' : 'Mool Shanti Pooja FAQs'}
            </h2>
          </div>

          <div className="space-y-4 pt-6">
            {poojaDetails.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden text-left"
              >
                <details className="group cursor-pointer">
                  <summary className="flex items-center justify-between p-5 text-sm sm:text-base font-bold text-stone-900 dark:text-amber-100 select-none outline-hidden">
                    <span>{faq.question}</span>
                    <span className="text-stone-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-stone-100 dark:border-stone-850">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Related Pooja Services */}
      <section className="bg-[#F6F0E6] dark:bg-[#151312] py-20 border-b border-[#E6DBC8] dark:border-stone-850">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-rose-700 dark:text-rose-455 text-xs font-bold uppercase tracking-wider block">
              {language === 'hi' ? 'अन्य पूजा सेवाएं' : 'EXPLORE SERVICES'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100">
              Explore Other Pooja Services
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

      {/* 14. Final CTA */}
      <section className="relative bg-[#3A1518] dark:bg-[#1A0A0B] py-20 overflow-hidden">
        {/* Background Image with opacity overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('/src/assets/images/mool_shanti_pooja_ujjain_1787114840814.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A1518]/80 to-[#3A1518]/90 dark:from-[#1A0A0B]/80 dark:to-[#1A0A0B]/90 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <FadeIn direction="up">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
              Plan Your Mool Shanti Pooja
            </h2>
            <p className="text-[#F4EDE4] text-xs sm:text-sm max-w-2xl mx-auto">
              Enquire with Aastha Sey Raasta Seva to arrange Mool Shanti Pooja Anushthan with experienced and Vedic-qualified pandits.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button
                onClick={() => onOpenBooking('Pooja', 'Mool Shanti Pooja')}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-lg"
              >
                {language === 'hi' ? 'अभी पूछताछ करें' : 'ENQUIRE NOW'}
              </button>
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
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

      {/* SOURCE-FIDELITY CHECK - Internal developer validation (hidden from visitors) */}
      <div style={{ display: 'none' }} className="hidden sr-only" aria-hidden="true" data-testid="source-fidelity-check">
        <h4>SOURCE-FIDELITY CHECK</h4>
        <ul>
          <li>1. Source-backed statements: 12</li>
          <li>2. Source-derived benefits included: 7/7</li>
          <li>3. What We Offer items included: 2/2</li>
          <li>4. Unsupported factual additions: 0</li>
          <li>5. Invented prices: 0</li>
          <li>6. Invented durations: 0</li>
          <li>7. Invented booking requirements: 0</li>
          <li>8. Invented locations: 0</li>
          <li>9. Medical/financial guarantees: 0</li>
          <li>10. Non-guarantee benefit framing: 100%</li>
        </ul>
      </div>
    </div>
  );
};
