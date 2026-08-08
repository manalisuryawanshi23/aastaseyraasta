import React from 'react';
import { MapPin, Calendar, Clock, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { Tour } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TourCardProps {
  tour: Tour;
  onBook: (name: string) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onBook }) => {
  const { t } = useLanguage();

  return (
    <div className="group bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-2xl hover:shadow-emerald-950/15 hover:border-emerald-500/80 dark:hover:border-emerald-500/80 hover:-translate-y-2.5 transition-all duration-500 ease-out overflow-hidden flex flex-col h-full relative">
      
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <img
          src={tour.featuredImage || '/src/assets/images/tour_ujjain_omkareshwar_1786196108956.jpg'}
          alt={tour.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

        {/* Light Sheen Sweep Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-emerald-950/85 backdrop-blur-md text-emerald-200 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-emerald-500/40 shadow-sm group-hover:-translate-y-0.5 group-hover:scale-105 transition-transform duration-300">
          {tour.category || 'Spiritual Yatra'}
        </div>

        {/* Duration badge */}
        {tour.duration && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold bg-stone-950/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-amber-500/20 group-hover:translate-x-1 transition-transform duration-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{tour.duration}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors duration-300 leading-snug mb-1">
            {tour.name}
          </h3>

          <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed line-clamp-2 mb-3">
            {tour.shortDescription}
          </p>

          {/* Destinations covered */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tour.destinations.map((d, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/80 dark:border-emerald-800/80 group-hover:border-emerald-300 transition-colors">
                <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>{d}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <a
            href={`/spiritual-tours/${tour.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-100/70 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 hover:text-emerald-950 dark:hover:text-emerald-100 font-semibold text-xs text-center transition-all border border-stone-200 dark:border-stone-700 hover:border-emerald-300 dark:hover:border-emerald-500/50"
          >
            {t('action.view_itinerary', 'View Itinerary')}
          </a>
          <button
            onClick={() => onBook(tour.name)}
            className="py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-emerald-900/30 flex items-center gap-1.5 shrink-0"
          >
            <span>{t('action.enquire', 'Enquire')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </div>
  );
};
