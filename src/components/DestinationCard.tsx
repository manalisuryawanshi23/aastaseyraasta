import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Landmark } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, index = 0 }) => {
  return (
    <motion.a
      href={`/destinations/${destination.slug}`}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.45,
        delay: Math.min((index % 6) * 0.07, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-2xl hover:shadow-sky-950/15 hover:border-sky-500/80 dark:hover:border-sky-500/80 hover:-translate-y-2.5 transition-all duration-500 ease-out overflow-hidden flex flex-col h-full relative"
    >
      <div className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <img
          src={destination.heroImage || '/src/assets/images/header_bg_spiritual_1786196057015.jpg'}
          alt={destination.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

        {/* Light Sheen Sweep Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-serif font-bold text-xl leading-tight group-hover:text-amber-300 transition-colors duration-300">
            {destination.name}
          </h3>
          {destination.hindiName && (
            <p className="text-xs text-amber-200/90 font-serif font-medium mt-0.5">
              {destination.hindiName}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed line-clamp-3">
          {destination.shortDescription}
        </p>

        <div className="pt-2 flex items-center justify-between text-xs font-semibold text-sky-800 dark:text-sky-400 border-t border-stone-100 dark:border-stone-800">
          <span className="flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{destination.placesToVisit.length} Major Shrines</span>
          </span>
          <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 group-hover:text-sky-900 dark:group-hover:text-sky-300 transition-colors">
            <span>Explore Guide</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300 text-sky-700 dark:text-sky-400" />
          </span>
        </div>
      </div>
    </motion.a>
  );
};
