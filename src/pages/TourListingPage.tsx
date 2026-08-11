import React, { useState, useEffect } from 'react';
import { StoreService } from '../services/store';
import { TourCard } from '../components/TourCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { generateTourListingTitle } from '../utils/seoTitles';
import { HeroBackgroundSlider } from '../components/HeroBackgroundSlider';
import { Compass, Search, MapPin, Sparkles } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { SkeletonGrid } from '../components/Skeletons';
import { ContentFade } from '../components/PageTransition';

interface TourListingPageProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

const tourHeaderSlides = [
  {
    url: '/src/assets/images/tour_ujjain_omkareshwar_1786196108956.jpg',
    title: 'Omkareshwar Narmada Island Sanctuary',
    location: 'Mandhata Island, Narmada River',
  },
  {
    url: '/src/assets/images/tour_char_dham_1786196121631.jpg',
    title: 'Char Dham Kedarnath Shrine',
    location: 'Himalayan Garhwal Peaks',
  },
  {
    url: '/src/assets/images/header_bg_spiritual_1786196057015.jpg',
    title: 'Shri Mahakaleshwar Corridor',
    location: 'Ujjain Nagari',
  },
  {
    url: '/src/assets/images/pooja_pitru_ramghat_1786196153062.jpg',
    title: 'Shipra Ramghat Twilight Aarti',
    location: 'Holy Riverbank, Ujjain',
  },
  {
    url: '/src/assets/images/pooja_baglamukhi_havan_1786196097113.jpg',
    title: 'Maa Baglamukhi Peeth Yatra',
    location: 'Nalkheda, Madhya Pradesh',
  },
  {
    url: '/src/assets/images/pooja_rudrabhishek_1786196070818.jpg',
    title: 'Sacred Jyotirlinga Abhishekam',
    location: 'Temple Sanctum',
  },
];

export const TourListingPage: React.FC<TourListingPageProps> = ({ onOpenBooking }) => {
  const allTours = StoreService.getTours();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', label: 'All Circuits' },
    { id: 'Ujjain & Central India', label: 'Ujjain & Central India' },
    { id: 'Himalayan Yatra', label: 'Himalayan Yatra' },
    { id: 'Named Yatra', label: 'Named Yatras' },
    { id: 'Trekking & High Altitude', label: 'Trekking & High Altitude' },
  ];

  const filtered = allTours.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      !searchTerm.trim() ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.destinations.some((d) => d.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEOHead
        title={generateTourListingTitle(selectedCategory, searchTerm)}
        description="Book customized spiritual pilgrimage tours in Ujjain, Omkareshwar, Baglamukhi Nalkheda, Indore, and Char Dham Uttarakhand with private AC transport and hotel stays."
        keywords="Spiritual Tours Ujjain, Omkareshwar Yatra, Char Dham Yatra Package, 84 Mahadev Yatra, Ujjain Pilgrimage Tour"
        canonicalUrl="https://aasthaserasta.com/spiritual-tours"
        ogImage="/src/assets/images/tour_ujjain_omkareshwar_1786196108956.jpg"
        ogImageAlt="Spiritual Tours & Yatra Packages in Ujjain & Central India"
      />

      <Breadcrumbs items={[{ label: 'Spiritual Tours' }]} />

      {/* Header Banner with Animated Background Slider */}
      <FadeIn direction="up">
        <div className="relative rounded-3xl min-h-[300px] sm:min-h-[340px] flex items-center p-8 sm:p-12 overflow-hidden text-white shadow-2xl border border-emerald-500/20">
          <HeroBackgroundSlider slides={tourHeaderSlides} intervalMs={5000} />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-500/40 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sacred Circuits</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 drop-shadow-md">
              Spiritual Tours & Yatras
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed font-serif italic">
              Tailored pilgrimage itineraries connecting Ujjain, Omkareshwar Jyotirlinga, Baglamukhi Nalkheda, and major Himalayan Dham Yatras.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Controls */}
      <FadeIn delay={100} direction="up">
        <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tours & treks (e.g. Ujjain, Char Dham, Kedarkantha, 84 Mahadev)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Grid */}
      <ContentFade contentKey={searchTerm}>
        {isLoading ? (
          <SkeletonGrid type="tour" count={6} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
            <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100">No Tour Circuits Found</h3>
            <p className="text-stone-500 dark:text-stone-400 text-xs">Try adjusting your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tour, index) => (
              <TourCard
                key={tour.id}
                tour={tour}
                index={index}
                onBook={(name) => onOpenBooking('Tour', name)}
              />
            ))}
          </div>
        )}
      </ContentFade>
    </div>
  );
};
