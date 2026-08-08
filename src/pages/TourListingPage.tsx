import React, { useState } from 'react';
import { StoreService } from '../services/store';
import { TourCard } from '../components/TourCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { HeroBackgroundSlider } from '../components/HeroBackgroundSlider';
import { Compass, Search, MapPin } from 'lucide-react';

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

  const filtered = allTours.filter((t) => {
    return (
      !searchTerm.trim() ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.destinations.some((d) => d.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEOHead
        title="Spiritual Tours & Yatra Packages | Aastha Sey Raasta Seva"
        description="Book customized spiritual pilgrimage tours in Ujjain, Omkareshwar, Baglamukhi Nalkheda, Indore, and Char Dham Uttarakhand with private AC transport and hotel stays."
      />

      <Breadcrumbs items={[{ label: 'Spiritual Tours' }]} />

      {/* Header Banner with Animated Background Slider */}
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

      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tours (e.g. Ujjain Omkareshwar, Char Dham, Nalkheda)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tour) => (
          <TourCard key={tour.id} tour={tour} onBook={(name) => onOpenBooking('Tour', name)} />
        ))}
      </div>
    </div>
  );
};
