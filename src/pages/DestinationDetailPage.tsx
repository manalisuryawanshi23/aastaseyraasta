import React from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { PoojaCard } from '../components/PoojaCard';
import { TourCard } from '../components/TourCard';
import { DestinationMapVisualizer } from '../components/DestinationMapVisualizer';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { MapPin, Landmark, Car, Sparkles, Compass } from 'lucide-react';

interface DestinationDetailPageProps {
  slug: string;
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ slug, onOpenBooking }) => {
  const settings = StoreService.getSettings();
  const dest = StoreService.getDestinationBySlug(slug);

  if (!dest) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Destination Not Found</h1>
        <a href="/destinations" className="inline-block px-6 py-2.5 rounded-xl bg-sky-800 text-white font-medium text-xs">
          Back to Destinations
        </a>
      </div>
    );
  }

  const relatedPoojas = StoreService.getPoojas().filter(
    (p) => p.city.toLowerCase() === dest.name.toLowerCase() || (dest.name === 'Ujjain' && p.city === 'Ujjain')
  );

  const relatedTours = StoreService.getTours().filter((t) =>
    t.destinations.some((d) => d.toLowerCase().includes(dest.name.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <SEOHead
        title={dest.seoTitle || `${dest.name} Spiritual Travel Guide | ${settings.businessName}`}
        description={dest.metaDescription || dest.shortDescription}
        focusKeyword={dest.focusKeyword}
        canonicalUrl={dest.canonicalUrl}
      />

      <Breadcrumbs
        items={[
          { label: 'Destinations', href: '/destinations' },
          { label: dest.name },
        ]}
      />

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden min-h-[50vh] flex items-end p-8 sm:p-12 bg-stone-900 text-white">
        <img
          src={dest.heroImage || '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg'}
          alt={dest.name}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/30">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Sacred Destination Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100">
            {dest.name} {dest.hindiName && <span className="text-2xl font-normal font-serif text-amber-300">({dest.hindiName})</span>}
          </h1>

          <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {dest.shortDescription}
          </p>
        </div>
      </div>

      {/* About & Shrines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-100 pb-2">
              Spiritual Significance & Overview
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
              {dest.description}
            </p>
          </div>

          <SocialShareButtons
            title={`Spiritual Guide to ${dest.name}`}
            description={dest.shortDescription}
          />

          {/* Temples List */}
          {dest.placesToVisit && dest.placesToVisit.length > 0 && (
            <div className="bg-amber-50/60 p-6 sm:p-8 rounded-2xl border border-amber-200/80 space-y-4">
              <h3 className="text-lg font-serif font-bold text-amber-950 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-700" />
                <span>Major Temples & Sacred Places in {dest.name}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-stone-800">
                {dest.placesToVisit.map((place, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-amber-200 shadow-2xs">
                    <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{place}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Info */}
          {dest.travelInformation && (
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Car className="w-4 h-4 text-stone-700" />
                <span>Travel & Connectivity</span>
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {dest.travelInformation}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Call to action */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-950 via-amber-950 to-red-950 text-white p-6 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-xl text-amber-100">
              Visiting {dest.name}?
            </h3>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              Allow our Acharya team to organize complete temple Darshan queuing assistance, gotra sankalp poojas, and private AC cab transfers.
            </p>
            <button
              onClick={() => onOpenBooking('Destination', dest.name)}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-md"
            >
              Enquire for {dest.name} Visit
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Sacred Map Visualizer */}
      <section className="pt-2">
        <DestinationMapVisualizer
          destinationSlug={dest.slug}
          destinationName={dest.name}
          onOpenBooking={onOpenBooking}
        />
      </section>

      {/* Related Poojas in this destination */}
      {relatedPoojas.length > 0 && (
        <section className="pt-6 border-t border-stone-200 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-700" />
            <span>Pooja Services in {dest.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPoojas.map((p) => (
              <PoojaCard key={p.id} pooja={p} onBook={(name) => onOpenBooking('Pooja', name)} />
            ))}
          </div>
        </section>
      )}

      {/* Related Tours covering this destination */}
      {relatedTours.length > 0 && (
        <section className="pt-6 border-t border-stone-200 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700" />
            <span>Tour Packages Including {dest.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((t) => (
              <TourCard key={t.id} tour={t} onBook={(name) => onOpenBooking('Tour', name)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
