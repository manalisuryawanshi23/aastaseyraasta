import React from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { TourCard } from '../components/TourCard';
import { FavoriteButton } from '../components/FavoriteButton';
import { SocialShareButtons } from '../components/SocialShareButtons';
import {
  Compass,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Sparkles,
  Phone,
  MessageSquare,
  Car,
  Hotel,
  Utensils,
  ChevronDown,
} from 'lucide-react';

interface TourDetailPageProps {
  slug: string;
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({ slug, onOpenBooking }) => {
  const settings = StoreService.getSettings();
  const tour = StoreService.getTourBySlug(slug);

  if (!tour) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Tour Package Not Found</h1>
        <p className="text-stone-600 text-sm">The requested yatra package does not exist or may have been updated.</p>
        <a href="/spiritual-tours" className="inline-block px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-medium text-xs">
          Back to Tour Directory
        </a>
      </div>
    );
  }

  const allTours = StoreService.getTours();
  const relatedTours = allTours.filter((t) => t.id !== tour.id).slice(0, 3);

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.seoTitle || tour.name,
    description: tour.metaDescription || tour.shortDescription,
    touristType: ['Pilgrim', 'Spiritual Traveler', 'Family'],
    itinerary: tour.itinerary.map((day) => ({
      '@type': 'City',
      name: day.title,
      description: day.description,
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <SEOHead
        title={tour.seoTitle || `${tour.name} | ${settings.businessName}`}
        description={tour.metaDescription || tour.shortDescription}
        focusKeyword={tour.focusKeyword}
        canonicalUrl={tour.canonicalUrl}
        jsonLd={schemaJsonLd}
      />

      <Breadcrumbs
        items={[
          { label: 'Spiritual Tours', href: '/spiritual-tours' },
          { label: tour.name },
        ]}
      />

      {/* Header Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>{tour.category || 'Pilgrimage Circuit'}</span>
              </div>
              <FavoriteButton id={tour.id} type="tour" variant="button" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              {tour.name}
            </h1>

            <p className="text-stone-600 text-sm leading-relaxed">
              {tour.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-700 pt-1">
              {tour.duration && (
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>Duration: {tour.duration}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg">
                <MapPin className="w-4 h-4 text-stone-500" />
                <span>Start/End: {tour.startingPoint} to {tour.endingPoint}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md h-80 bg-stone-100">
            <img
              src={tour.featuredImage || '/assets/images/yatra_omkareshwar_temple_1786193903123.jpg'}
              alt={tour.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Places Covered Tags */}
          {tour.placesCovered && tour.placesCovered.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Major Destinations & Shrines Covered
              </h3>
              <div className="flex flex-wrap gap-2">
                {tour.placesCovered.map((place, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-emerald-700" />
                    <span>{place}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Sharing */}
          <SocialShareButtons
            title={tour.name}
            description={tour.shortDescription}
            category={tour.category}
          />

          {/* Day-Wise Itinerary */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <span>Day-Wise Pilgrimage Itinerary</span>
            </h2>

            <div className="space-y-6">
              {tour.itinerary.map((day) => (
                <div key={day.dayNumber} className="border-l-2 border-emerald-600 pl-4 space-y-2 relative">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold">
                    {day.dayNumber}
                  </div>
                  <div className="font-serif font-bold text-stone-900 text-base">
                    Day {day.dayNumber}: {day.title}
                  </div>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {day.description}
                  </p>
                  {day.accommodation && (
                    <div className="text-xs text-stone-500 font-medium pt-1 flex items-center gap-1">
                      <Hotel className="w-3.5 h-3.5 text-stone-400" />
                      <span>Stay: {day.accommodation}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tour.included && tour.included.length > 0 && (
              <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200/80 space-y-3">
                <h3 className="font-serif font-bold text-emerald-950 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>What is Included</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                  {tour.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.excluded && tour.excluded.length > 0 && (
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
                <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-stone-500" />
                  <span>What is Excluded</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  {tour.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Right Sticky Booking Card */}
        <div className="lg:sticky lg:top-24 space-y-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-emerald-300 shadow-xl space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-emerald-800">
                Tour Reservation & Customization
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                Book / Customize Yatra
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Private AC vehicle, hotel stay, and Darshan assistance.
              </p>
            </div>

            <div className="space-y-3 text-xs text-stone-700 bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/60">
              <div className="flex items-center justify-between">
                <span>Vehicle Type:</span>
                <span className="font-semibold text-stone-900">AC Cab / SUV / Tempo</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Darshan Assistance:</span>
                <span className="font-semibold text-emerald-800">Included</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Custom Dates:</span>
                <span className="font-semibold text-stone-900">Flexible</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('Tour', tour.name)}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 text-white font-medium text-sm hover:bg-emerald-800 shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Request Custom Itinerary & Quote</span>
            </button>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Jai Shree Mahakal 🙏 I want to enquire about ${tour.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-xl bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Yatra Expert</span>
            </a>

            <div className="pt-2 text-center text-xs text-stone-500 space-y-1">
              <div>Have specific requirements?</div>
              <a href={`tel:${settings.phone1}`} className="font-mono font-bold text-emerald-800 hover:underline">
                Call {settings.phone1}
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="pt-8 border-t border-stone-200 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Other Popular Pilgrimage Packages
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
