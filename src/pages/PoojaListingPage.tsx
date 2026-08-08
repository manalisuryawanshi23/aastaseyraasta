import React, { useState } from 'react';
import { StoreService } from '../services/store';
import { PoojaCard } from '../components/PoojaCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { HeroBackgroundSlider } from '../components/HeroBackgroundSlider';
import { Flame, Search, Filter, Sparkles } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';

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
  const categories = StoreService.getCategories();
  const allPoojas = StoreService.getPoojas();

  const [selectedCat, setSelectedCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = allPoojas.filter((p) => {
    const matchCat = selectedCat === 'all' || p.categoryId === selectedCat;
    const matchSearch =
      !searchTerm.trim() ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.hindiName && p.hindiName.includes(searchTerm)) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEOHead
        title="Authentic Vedic Pooja Services in Ujjain | Aastha Sey Raasta Seva"
        description="Book authentic Vedic Poojas in Ujjain including Rudrabhishek, Bhat Pooja at Angareshwar & Mangalnath, Mahamrityunjaya Jaap, Baglamukhi Havan, and Pitru Dosh Shanti."
      />

      <Breadcrumbs items={[{ label: 'Pooja Services' }]} />

      {/* Hero Title Header with Animated Slider */}
      <FadeIn direction="up">
        <div className="relative rounded-3xl min-h-[300px] sm:min-h-[340px] flex items-center p-8 sm:p-12 overflow-hidden text-white shadow-2xl border border-amber-500/20">
          <HeroBackgroundSlider slides={poojaHeaderSlides} intervalMs={5000} />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/40 backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Sacred Vedic Vidhi</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 drop-shadow-md">
              Pooja Services in Ujjain
            </h1>
            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed font-serif italic">
              Every ritual is performed at consecrated shrines by qualified Brahmins with complete satvik samagri, gotra sankalp, and authentic Vedic chanting.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Controls: Search & Category Filter */}
      <FadeIn delay={100} direction="up">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search pooja by name or temple (e.g. Rudrabhishek, Mangalnath)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCat === 'all'
                  ? 'bg-amber-800 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Poojas ({allPoojas.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCat === cat.id
                    ? 'bg-amber-800 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-3">
          <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-stone-800">No Poojas Found</h3>
          <p className="text-stone-500 text-xs">Try adjusting your category filter or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pooja, index) => (
            <FadeIn key={pooja.id} delay={index * 100} direction="up">
              <PoojaCard
                pooja={pooja}
                onBook={(name) => onOpenBooking('Pooja', name)}
              />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
};
