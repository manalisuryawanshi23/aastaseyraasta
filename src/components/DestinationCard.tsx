import React from 'react';
import { MapPin, ArrowRight, Landmark } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <a
      href={`/destinations/${destination.slug}`}
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
        <img
          src={destination.heroImage || '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg'}
          alt={destination.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-serif font-bold text-xl leading-tight group-hover:text-amber-300 transition-colors">
            {destination.name}
          </h3>
          {destination.hindiName && (
            <p className="text-xs text-amber-200 font-serif font-medium mt-0.5">
              {destination.hindiName}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
          {destination.shortDescription}
        </p>

        <div className="pt-2 flex items-center justify-between text-xs font-medium text-sky-800">
          <span className="flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5" />
            <span>{destination.placesToVisit.length} Major Shrines</span>
          </span>
          <span className="flex items-center gap-1 text-stone-700 group-hover:text-sky-800 transition-colors">
            <span>Explore Guide</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </a>
  );
};
