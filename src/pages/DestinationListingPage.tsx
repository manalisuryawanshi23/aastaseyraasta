import React, { useState, useEffect } from 'react';
import { StoreService } from '../services/store';
import { DestinationCard } from '../components/DestinationCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { generateDestinationListingTitle } from '../utils/seoTitles';
import { HeroBackgroundSlider } from '../components/HeroBackgroundSlider';
import { MapPin, Search, Sparkles, Mountain, Building2, Globe, PhoneCall } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { SkeletonGrid } from '../components/Skeletons';
import { ContentFade } from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

interface DestinationListingPageProps {
  onOpenBooking?: (type?: 'Pooja' | 'Tour' | 'Destination' | 'General', name?: string) => void;
}

const destinationHeaderSlides = [
  { url: '/assets/images/header_bg_spiritual_1786196057015.jpg', title: 'Shri Mahakaleshwar Corridor', location: 'Ujjain, Madhya Pradesh' },
  { url: '/assets/images/tour_ujjain_omkareshwar_1786196108956.jpg', title: 'Omkareshwar OM-Shaped Island', location: 'Narmada River, Madhya Pradesh' },
  { url: '/assets/images/pooja_baglamukhi_havan_1786196097113.jpg', title: 'Maa Baglamukhi Siddh Peeth', location: 'Nalkheda, Madhya Pradesh' },
  { url: '/assets/images/pooja_pitru_ramghat_1786196153062.jpg', title: 'Ramghat Kshipra Aarti', location: 'Ujjain Sacred Riverbank' },
  { url: '/assets/images/tour_char_dham_1786196121631.jpg', title: 'Himalayan Char Dham Shrines', location: 'Uttarakhand Garhwal' },
];

const regionFilters = [
  { id: 'all', labelEn: 'All Destinations', labelHi: 'सभी तीर्थ स्थल', icon: Globe },
  { id: 'central-india', labelEn: 'Central India', labelHi: 'मध्य भारत', icon: Building2 },
  { id: 'himalayan', labelEn: 'Himalayan Pilgrimages', labelHi: 'हिमालयन तीर्थ', icon: Mountain },
];

const trustStats = [
  { numEn: '4', numHi: '4', labelEn: 'Sacred Pilgrim Cities', labelHi: 'पवित्र तीर्थ नगर', icon: '🕌' },
  { numEn: '12+', numHi: '12+', labelEn: 'Jyotirlinga & Shaktipeeth Sites', labelHi: 'ज्योतिर्लिंग व शक्तिपीठ', icon: '🔱' },
  { numEn: '100+', numHi: '100+', labelEn: 'Ancient Sacred Temples', labelHi: 'प्राचीन मंदिर', icon: '⛩️' },
  { numEn: '24/7', numHi: '24/7', labelEn: 'Pilgrimage Support', labelHi: 'तीर्थ सहायता सेवा', icon: '🙏' },
];

const features = [
  { icon: '🔱', titleEn: 'Expert Vedic Priests', titleHi: 'योग्य वैदिक पुजारी', descEn: 'Gotra-based sankalp and authentic rituals by hereditary temple priests.', descHi: 'गोत्र-आधारित संकल्प व वंशानुगत मंदिर पुजारियों द्वारा विधिवत अनुष्ठान।' },
  { icon: '🚗', titleEn: 'Private AC Transfers', titleHi: 'निजी एसी वाहन सेवा', descEn: 'Comfortable door-to-door pickups from Indore Airport or Ujjain Station.', descHi: 'इंदौर हवाई अड्डे या उज्जैन स्टेशन से आरामदायक निजी वाहन सेवा।' },
  { icon: '🏨', titleEn: 'Curated Hotels', titleHi: 'चयनित होटल व धर्मशाला', descEn: 'Hygiene-verified AC stays near Mahakaleshwar and major shrines.', descHi: 'महाकालेश्वर व प्रमुख तीर्थों के पास स्वच्छता-परीक्षित होटल।' },
  { icon: '📱', titleEn: '24/7 WhatsApp Support', titleHi: '24/7 व्हाट्सएप सहायता', descEn: 'Our pilgrimage experts are always available on WhatsApp for guidance.', descHi: 'हमारे यात्रा विशेषज्ञ हर समय व्हाट्सएप पर मार्गदर्शन हेतु उपलब्ध हैं।' },
];

export const DestinationListingPage: React.FC<DestinationListingPageProps> = ({ onOpenBooking }) => {
  const { language, t } = useLanguage();

  const [syncTick, setSyncTick] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setSyncTick((n) => n + 1);
    window.addEventListener('aastha:data-synced', handler);
    return () => window.removeEventListener('aastha:data-synced', handler);
  }, []);

  const allDestinations = StoreService.getDestinations();
  const settings = StoreService.getSettings();
  const whatsappNumber = settings?.whatsappNumber?.replace(/\D/g, '') || '919999999999';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const himalayanKeywords = ['kedarnath', 'badrinath', 'gangotri', 'yamunotri', 'kedarkantha', 'uttarakhand', 'char-dham'];

  const filtered = allDestinations.filter((d) => {
    const slug = d.slug.toLowerCase();
    const name = d.name.toLowerCase();
    const isHimalayan = himalayanKeywords.some((h) => slug.includes(h) || name.includes(h));

    const matchesRegion =
      selectedRegion === 'all' ||
      (selectedRegion === 'himalayan' && isHimalayan) ||
      (selectedRegion === 'central-india' && !isHimalayan);

    const matchesSearch =
      !searchTerm.trim() ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.hindiName && d.hindiName.includes(searchTerm)) ||
      d.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.slug.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRegion && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEOHead
        title={generateDestinationListingTitle()}
        description="Explore sacred pilgrimage destinations in Madhya Pradesh and Uttarakhand. Complete travel guides for Ujjain Mahakaleshwar, Omkareshwar Jyotirlinga, Maa Baglamukhi Nalkheda, and Indore with Aastha Sey Raasta."
        keywords="Sacred Shrines Ujjain, Omkareshwar Jyotirlinga, Baglamukhi Nalkheda, Pilgrimage Destinations Madhya Pradesh, Char Dham Yatra, Mahakaleshwar Temple Guide"
        canonicalUrl="https://aasthaserasta.com/destinations"
        ogImage="/assets/images/header_bg_spiritual_1786196057015.jpg"
        ogImageAlt="Sacred Pilgrimage Destinations — Ujjain, Omkareshwar, Nalkheda"
      />

      <Breadcrumbs items={[{ label: t('nav.destinations', 'Destinations') }]} />

      {/* Hero Header with Animated Background Slider */}
      <FadeIn direction="up">
        <div className="relative rounded-3xl min-h-[300px] sm:min-h-[380px] flex items-center p-8 sm:p-12 overflow-hidden text-white shadow-2xl border border-sky-500/20">
          <HeroBackgroundSlider slides={destinationHeaderSlides} intervalMs={5500} />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider border border-sky-500/40 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{language === 'hi' ? 'पावन तीर्थ व धार्मिक नगर' : 'Holy Shrines & Pilgrim Cities'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 drop-shadow-md">
              {language === 'hi' ? 'प्रमुख तीर्थ स्थल एवं पावन धाम' : 'Pilgrimage Destinations'}
            </h1>
            <p className="text-sky-100/90 text-xs sm:text-sm leading-relaxed font-serif italic">
              {language === 'hi'
                ? 'उज्जैन महाकाल, ओंकारेश्वर ज्योतिर्लिंग, माँ बगलामुखी नलखेड़ा और उत्तराखंड के पवित्र तीर्थों की विस्तृत दर्शन मार्गदर्शिका एवं संपूर्ण यात्रा व्यवस्था।'
                : 'Detailed spiritual guides, sacred temple itineraries, pooja arrangements, and seamless travel connectivity across Madhya Pradesh and Uttarakhand.'}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/spiritual-tours" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-stone-900 font-bold text-xs hover:bg-amber-400 transition-all shadow-lg">
                <Sparkles className="w-4 h-4" />
                {language === 'hi' ? 'यात्रा पैकेज देखें' : 'Explore Tour Packages'}
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(language === 'hi' ? '\u0928\u092e\u0938\u094d\u0924\u0947! \u092e\u0948\u0902 \u0924\u0940\u0930\u094d\u0925 \u092f\u093e\u0924\u094d\u0930\u093e \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u091a\u093e\u0939\u0924\u093e \u0939\u0942\u0901\u0964' : 'Namaste! I need information about pilgrimage destinations.')}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 text-white font-semibold text-xs border border-white/30 hover:bg-white/25 transition-all backdrop-blur-sm"
              >
                <PhoneCall className="w-4 h-4" />
                {language === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Ask on WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Trust Stats Bar */}
      <FadeIn delay={80} direction="up">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {trustStats.map((stat, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-2xl p-4 text-center space-y-1 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="text-2xl">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-amber-800">{language === 'hi' ? stat.numHi : stat.numEn}</div>
              <div className="text-[11px] text-stone-500 font-medium leading-tight">{language === 'hi' ? stat.labelHi : stat.labelEn}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Search & Region Filter Controls */}
      <FadeIn delay={120} direction="up">
        <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'hi' ? 'तीर्थ स्थल खोजें (जैसे उज्जैन, ओंकारेश्वर, नलखेड़ा, इंदौर)...' : 'Search destinations (e.g. Ujjain, Omkareshwar, Nalkheda, Indore)...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-sm outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {regionFilters.map((region) => {
              const active = selectedRegion === region.id;
              const Icon = region.icon;
              return (
                <button key={region.id} onClick={() => setSelectedRegion(region.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${active ? 'bg-sky-700 text-white shadow-sm' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {language === 'hi' ? region.labelHi : region.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Results Count */}
      {!isLoading && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {language === 'hi' ? `${filtered.length} \u0924\u0940\u0930\u094d\u0925 \u0938\u094d\u0925\u0932 \u0909\u092a\u0932\u092c\u094d\u0927` : `${filtered.length} destination${filtered.length !== 1 ? 's' : ''} found`}
          </p>
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-xs text-sky-700 hover:underline">
              {language === 'hi' ? 'खोज साफ करें' : 'Clear search'}
            </button>
          )}
        </div>
      )}

      {/* Destinations Cards Grid */}
      <ContentFade contentKey={`${selectedRegion}-${searchTerm}`}>
        {isLoading ? (
          <SkeletonGrid type="destination" count={6} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
            <MapPin className="w-10 h-10 text-sky-600 dark:text-sky-400 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100">
              {language === 'hi' ? 'कोई तीर्थ स्थल नहीं मिला' : 'No Destinations Found'}
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-xs max-w-xs mx-auto">
              {language === 'hi' ? 'कृपया दूसरा खोज शब्द दर्ज करें या फ़िल्टर बदलें।' : 'Try adjusting your search term or selecting a different region filter.'}
            </p>
            <button onClick={() => { setSearchTerm(''); setSelectedRegion('all'); }}
              className="px-6 py-2 rounded-xl bg-sky-700 text-white text-xs font-semibold hover:bg-sky-600 transition-colors">
              {language === 'hi' ? 'सभी तीर्थ दिखाएं' : 'Show All Destinations'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest, index) => (
              <DestinationCard key={dest.id} destination={dest} index={index} />
            ))}
          </div>
        )}
      </ContentFade>

      {/* Why Plan With Aastha Sey Raasta Feature Strip */}
      <FadeIn delay={60} direction="up">
        <div className="bg-gradient-to-br from-amber-950 via-red-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'आस्था से रास्ता के साथ यात्रा करें' : 'Travel With Aastha Sey Raasta'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {language === 'hi' ? 'पावन तीर्थों की यात्रा को सरल, सुगम और स्मरणीय बनाएं' : 'Plan Your Sacred Journey With Confidence'}
            </h2>
            <p className="text-amber-200/70 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              {language === 'hi'
                ? 'हम आपके तीर्थ यात्रा की संपूर्ण व्यवस्था करते हैं — वैदिक पूजा, दर्शन कतार, निजी वाहन, और स्वच्छ होटल।'
                : 'We handle every detail of your pilgrimage — Vedic pooja bookings, darshan queue assistance, private AC vehicles, and comfortable stays.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feat, i) => (
              <div key={i} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-5 space-y-2 hover:bg-white/12 transition-colors">
                <div className="text-3xl">{feat.icon}</div>
                <h3 className="font-bold text-sm text-amber-100">{language === 'hi' ? feat.titleHi : feat.titleEn}</h3>
                <p className="text-amber-200/60 text-xs leading-relaxed">{language === 'hi' ? feat.descHi : feat.descEn}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking?.('General', 'Pilgrimage Planning')}
              className="px-8 py-3 rounded-2xl bg-amber-500 text-stone-900 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/30"
            >
              {language === 'hi' ? 'यात्रा परामर्श बुक करें' : 'Book a Pilgrimage Consultation'}
            </button>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(language === 'hi' ? '\u0928\u092e\u0938\u094d\u0924\u0947! \u092e\u0948\u0902 \u0924\u0940\u0930\u094d\u0925 \u092f\u093e\u0924\u094d\u0930\u093e \u0915\u0940 \u0935\u094d\u092f\u0935\u0938\u094d\u0925\u093e \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u091a\u093e\u0939\u0924\u093e \u0939\u0942\u0901\u0964' : 'Namaste! I need help planning a pilgrimage itinerary.')}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl border border-amber-500/50 text-amber-300 font-semibold text-sm hover:bg-amber-500/10 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              {language === 'hi' ? 'व्हाट्सएप पर जुड़ें' : 'Connect on WhatsApp'}
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};