import React, { useState, useEffect } from 'react';
import { FavoritesService } from '../services/favorites';
import { PoojaCard } from '../components/PoojaCard';
import { TourCard } from '../components/TourCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { PoojaService, Tour } from '../types';
import {
  Heart,
  Trash2,
  Sparkles,
  Flame,
  Compass,
  ArrowRight,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';

interface SavedItemsPageProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const SavedItemsPage: React.FC<SavedItemsPageProps> = ({ onOpenBooking }) => {
  const [poojas, setPoojas] = useState<PoojaService[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'poojas' | 'tours'>('all');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const loadFavorites = () => {
    setPoojas(FavoritesService.getFavoritePoojas());
    setTours(FavoritesService.getFavoriteTours());
  };

  useEffect(() => {
    loadFavorites();

    const handleUpdate = () => {
      loadFavorites();
    };

    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, []);

  const handleClearAll = () => {
    FavoritesService.clearAll();
    setShowConfirmClear(false);
  };

  const totalCount = poojas.length + tours.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 min-h-[70vh]">
      <SEOHead
        title="My Saved Items | Aastha Sey Raasta Seva"
        description="View your saved Pooja services and spiritual tour packages for Ujjain and pilgrimage circuits."
      />

      <Breadcrumbs items={[{ label: 'My Saved Items' }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-amber-900/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>Personal Wishlist ({totalCount})</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            My Saved Rituals & Tours
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Your shortlisted sacred pooja rituals and yatra packages. Easily compare options or initiate booking when you are ready.
          </p>
        </div>

        {totalCount > 0 && (
          <button
            onClick={() => setShowConfirmClear(true)}
            className="px-4 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-xs font-medium transition-colors flex items-center gap-2 shrink-0 relative z-10"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>Clear Saved List</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              All Items ({totalCount})
            </button>

            {poojas.length > 0 && (
              <button
                onClick={() => setActiveTab('poojas')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'poojas'
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Pooja Services ({poojas.length})</span>
              </button>
            )}

            {tours.length > 0 && (
              <button
                onClick={() => setActiveTab('tours')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'tours'
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Spiritual Tours ({tours.length})</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalCount === 0 ? (
        <div className="py-20 px-4 bg-white dark:bg-[#1C1917] rounded-3xl border border-stone-200 dark:border-stone-800 text-center max-w-xl mx-auto space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 flex items-center justify-center mx-auto text-amber-700 dark:text-amber-400">
            <Heart className="w-8 h-8 text-amber-700 dark:text-amber-400 fill-amber-700/20" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100">
              No Saved Items Yet
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Explore our Mahakaleshwar pooja offerings and spiritual tour circuits, and click the heart icon on any item to save it for quick access later.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="/pooja-services"
              className="px-5 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-medium hover:bg-amber-900 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Explore Pooja Services</span>
            </a>
            <a
              href="/spiritual-tours"
              className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-medium hover:bg-emerald-900 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>Explore Yatra Tours</span>
            </a>
          </div>
        </div>
      ) : (
        /* Saved Items Grid */
        <div className="space-y-10">
          
          {/* Poojas Section */}
          {(activeTab === 'all' || activeTab === 'poojas') && poojas.length > 0 && (
            <div className="space-y-4">
              {activeTab === 'all' && (
                <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
                  <Flame className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                    Saved Pooja Services ({poojas.length})
                  </h2>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {poojas.map((pooja) => (
                  <PoojaCard
                    key={pooja.id}
                    pooja={pooja}
                    onBook={(name) => onOpenBooking('Pooja', name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tours Section */}
          {(activeTab === 'all' || activeTab === 'tours') && tours.length > 0 && (
            <div className="space-y-4">
              {activeTab === 'all' && (
                <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2 pt-4">
                  <Compass className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                    Saved Spiritual Tours ({tours.length})
                  </h2>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    onBook={(name) => onOpenBooking('Tour', name)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Confirmation Modal for Clear All */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C1917] rounded-2xl max-w-md w-full p-6 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Clear All Saved Items?
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed">
              Are you sure you want to remove all saved rituals and tour packages from your wishlist? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
