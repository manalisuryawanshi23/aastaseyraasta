import React, { useState, useEffect } from 'react';
import { StoreService } from '../services/store';
import { PoojaCard } from '../components/PoojaCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { generatePoojaListingTitle } from '../utils/seoTitles';
import { HeroBackgroundSlider } from '../components/HeroBackgroundSlider';
import { Flame, Search, Filter, Sparkles } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { SkeletonGrid } from '../components/Skeletons';
import { ContentFade } from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

interface PoojaListingPageProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

const poojaHeaderSlides = [
  {
    url: '/src/assets/images/pooja_rudrabhishek_1786196070818.jpg',
    title: 'Panchamrit Rudrabhishek Ritual',
    location: 'Sacred Shivlinga Abhishekam',
  },
  {
    url: '/src/assets/images/pooja_bhat_mangalnath_1786196085583.jpg',
    title: 'Bhat Pooja Shringar',
    location: 'Mangalnath & Angareshwar Shrines',
  },
  {
    url: '/src/assets/images/pooja_baglamukhi_havan_1786196097113.jpg',
    title: 'Maa Baglamukhi Anushthan Yajna',
    location: 'Nalkheda Siddh Peeth',
  },
  {
    url: '/src/assets/images/pooja_mahamrityunjaya_1786196166868.jpg',
    title: 'Vedic Mahamrityunjaya Jaap',
    location: 'Conducted by Gurukul Brahmins',
  },
  {
    url: '/src/assets/images/pooja_pitru_ramghat_1786196153062.jpg',
    title: 'Pitru Dosh Shanti & Kshipra Aarti',
    location: 'Ramghat Holy Riverbank',
  },
  {
    url: '/src/assets/images/header_bg_spiritual_1786196057015.jpg',
    title: 'Mahakaleshwar Temple Corridor',
    location: 'Ujjain Nagari',
  },
];

export const PoojaListingPage: React.FC<PoojaListingPageProps> = ({ onOpenBooking }) => {
  const { language, t, localize } = useLanguage();

  // Re-read from localStorage whenever the API sync fires
  const [syncTick, setSyncTick] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setSyncTick((n) => n + 1);
    window.addEventListener('aastha:data-synced', handler);
    return () => window.removeEventListener('aastha:data-synced', handler);
  }, []);

  const categories = StoreService.getCategories();
  const allPoojas = StoreService.getPoojas();

  const [selectedCat, setSelectedCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const filtered = allPoojas.filter((p) => {
    const matchCat = selectedCat === 'all' || p.categoryId === selectedCat;
    const matchSearch =
      !searchTerm.trim() ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.hindiName && p.hindiName.includes(searchTerm)) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.hindiShortDescription && p.hindiShortDescription.includes(searchTerm));
    return matchCat && matchSearch;
  });



  const activeCategory = categories.find((c) => c.id === selectedCat);
  const activeCategoryName = activeCategory ? localize(activeCategory, 'name', 'hindiName') : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEOHead
        title={generatePoojaListingTitle(activeCategoryName, searchTerm)}
        description="Book authentic Vedic Poojas in Ujjain including Rudrabhishek, Bhat Pooja at Angareshwar & Mangalnath, Mahamrityunjaya Jaap, Baglamukhi Havan, and Pitru Dosh Shanti."
        keywords="Ujjain Pooja Services, Mahakaleshwar Rudrabhishek, Bhat Pooja Mangalnath, Baglamukhi Havan Nalkheda, Pitru Dosh Shanti"
        canonicalUrl="https://aasthaserasta.com/pooja-services"
        ogImage="/src/assets/images/pooja_rudrabhishek_1786196070818.jpg"
        ogImageAlt="Vedic Pooja Services in Ujjain Mahakaleshwar"
      />

      <Breadcrumbs items={[{ label: t('nav.pooja', 'Pooja Services') }]} />

      {/* Hero Title Header with Animated Slider */}
      <FadeIn direction="up">
        <div className="relative rounded-3xl min-h-[300px] sm:min-h-[340px] flex items-center p-8 sm:p-12 overflow-hidden text-white shadow-2xl border border-amber-500/20">
          <HeroBackgroundSlider slides={poojaHeaderSlides} intervalMs={5000} />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/40 backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{language === 'hi' ? 'शास्त्रोक्त वैदिक विधि' : 'Sacred Vedic Vidhi'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 drop-shadow-md">
              {language === 'hi' ? 'उज्जैन में पावन पूजा सेवाएं' : 'Pooja Services in Ujjain'}
            </h1>
            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed font-serif italic">
              {language === 'hi'
                ? 'प्रत्येक अनुष्ठान प्रतिष्ठित तीर्थों में वेदपाठी ब्राह्मणों द्वारा शुद्ध सात्विक सामग्री, व्यक्तिगत गोत्र संकल्प एवं वैदिक मंत्रोच्चार के साथ संपन्न किया जाता है।'
                : 'Every ritual is performed at consecrated shrines by qualified Brahmins with complete satvik samagri, gotra sankalp, and authentic Vedic chanting.'}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Controls: Search & Category Filter */}
      <FadeIn delay={100} direction="up">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'पूजा का नाम या मंदिर खोजें (जैसे रुद्राभिषेक, मंगलनाथ, भात पूजा)...'
                  : 'Search pooja by name or temple (e.g. Rudrabhishek, Mangalnath)...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Categories Pills */}
          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto flex-nowrap pb-2 md:pb-0 scrollbar-none touch-pan-x">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                selectedCat === 'all'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {language === 'hi' ? `सभी पूजाएं (${allPoojas.length})` : `All Poojas (${allPoojas.length})`}
            </button>
            {categories.map((cat) => {
              const catName = localize(cat, 'name', 'hindiName');
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    selectedCat === cat.id
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Grid */}
      <ContentFade contentKey={`${selectedCat}-${searchTerm}`}>
        {isLoading ? (
          <SkeletonGrid type="pooja" count={6} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100">
              {language === 'hi' ? 'कोई पूजा नहीं मिली' : 'No Poojas Found'}
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-xs">
              {language === 'hi'
                ? 'कृपया श्रेणी फ़िल्टर या खोज शब्द बदलकर पुनः प्रयास करें।'
                : 'Try adjusting your category filter or search term.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pooja, index) => (
              <PoojaCard
                key={pooja.id}
                pooja={pooja}
                index={index}
                onBook={(name) => onOpenBooking('Pooja', name)}
              />
            ))}
          </div>
        )}
      </ContentFade>
    </div>
  );
};
