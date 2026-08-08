import React from 'react';
import { MapPin, Calendar, Clock, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
  onBook: (name: string) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onBook }) => {
  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
        <img
          src={tour.featuredImage || '/assets/images/yatra_omkareshwar_temple_1786193903123.jpg'}
          alt={tour.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-200 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-emerald-500/30">
          {tour.category || 'Spiritual Yatra'}
        </div>

        {/* Duration badge */}
        {tour.duration && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{tour.duration}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug mb-1">
            {tour.name}
          </h3>

          <p className="text-stone-600 text-xs leading-relaxed line-clamp-2 mb-3">
            {tour.shortDescription}
          </p>

          {/* Destinations covered */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tour.destinations.map((d, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{d}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <a
            href={`/spiritual-tours/${tour.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-medium text-xs text-center transition-colors border border-stone-200"
          >
            View Itinerary
          </a>
          <button
            onClick={() => onBook(tour.name)}
            className="py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-medium text-xs hover:bg-emerald-800 transition-all shadow-sm flex items-center gap-1 shrink-0"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
