import React from 'react';
import { StoreService } from '../services/store';
import { DestinationCard } from '../components/DestinationCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { MapPin } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';

export const DestinationListingPage: React.FC = () => {
  const destinations = StoreService.getDestinations();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEOHead
        title="Sacred Destinations & Pilgrimage Hubs | Aastha Sey Raasta Seva"
        description="Explore spiritual destinations including Ujjain Mahakal, Omkareshwar Jyotirlinga, Maa Baglamukhi Nalkheda, Indore, and Uttarakhand."
      />

      <Breadcrumbs items={[{ label: 'Destinations' }]} />

      <FadeIn direction="up">
        <div className="bg-gradient-to-r from-sky-950 via-stone-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <img
            src="/src/assets/images/header_bg_spiritual_1786196057015.jpg"
            alt="Destinations Header Background"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider border border-sky-500/30">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Holy Shrines & Cities</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100">
              Pilgrimage Destinations
            </h1>
            <p className="text-sky-100/80 text-xs sm:text-sm leading-relaxed">
              Detailed spiritual guides, major temple shrines, pooja arrangements, and travel connectivity across Madhya Pradesh & Uttarakhand.
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest, index) => (
          <FadeIn key={dest.id} delay={index * 100} direction="up">
            <DestinationCard destination={dest} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
