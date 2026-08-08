import React from 'react';
import { Sparkles, MapPin, Clock, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { PoojaService } from '../types';

interface PoojaCardProps {
  pooja: PoojaService;
  onBook: (name: string) => void;
}

export const PoojaCard: React.FC<PoojaCardProps> = ({ pooja, onBook }) => {
  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      {/* Image Thumbnail Header */}
      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
        <img
          src={pooja.featuredImage || 'https://images.unsplash.com/photo-1609800078028-c124e4d6cdd1?auto=format&fit=crop&w=800&q=80'}
          alt={pooja.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-red-950/80 backdrop-blur-md text-amber-200 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30">
          {pooja.categoryName || 'Temple Pooja'}
        </div>

        {/* Location Badge */}
        {pooja.city && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{pooja.templeName ? `${pooja.templeName}` : `${pooja.city}, MP`}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
              {pooja.name}
            </h3>
          </div>

          {pooja.hindiName && (
            <p className="text-xs font-serif text-amber-800 font-medium mb-2">
              {pooja.hindiName}
            </p>
          )}

          <p className="text-stone-600 text-xs leading-relaxed line-clamp-2">
            {pooja.shortDescription}
          </p>

          {/* Quick info specs */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            {pooja.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{pooja.duration}</span>
              </span>
            )}
            <span className="flex items-center gap-1 text-emerald-700 font-medium ml-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Vedic Samagri Included</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <a
            href={`/pooja/${pooja.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-amber-50 text-stone-800 hover:text-amber-900 font-medium text-xs text-center transition-colors border border-stone-200"
          >
            View Vidhi Details
          </a>
          <button
            onClick={() => onBook(pooja.name)}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-800 to-amber-800 text-white font-medium text-xs hover:from-red-900 hover:to-amber-900 transition-all shadow-sm flex items-center gap-1 shrink-0"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
