import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Clock, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { PoojaService } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { FavoriteButton } from './FavoriteButton';

interface PoojaCardProps {
  pooja: PoojaService;
  onBook: (name: string) => void;
  index?: number;
}

export const PoojaCard: React.FC<PoojaCardProps> = ({ pooja, onBook, index = 0 }) => {
  const { language, t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.45,
        delay: Math.min((index % 6) * 0.07, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-2xl hover:shadow-amber-900/15 hover:border-amber-500/80 dark:hover:border-amber-500/80 hover:-translate-y-2.5 transition-all duration-500 ease-out overflow-hidden flex flex-col h-full relative"
    >
      
      {/* Image Thumbnail Header */}
      <div className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <img
          src={pooja.featuredImage || '/src/assets/images/pooja_rudrabhishek_1786196070818.jpg'}
          alt={pooja.name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
        
        {/* Light Sheen Sweep Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-red-950/85 backdrop-blur-md text-amber-200 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-amber-500/40 shadow-sm group-hover:-translate-y-0.5 group-hover:scale-105 transition-transform duration-300">
          {pooja.categoryName || 'Temple Pooja'}
        </div>

        {/* Favorite Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton id={pooja.id} type="pooja" />
        </div>

        {/* Location Badge */}
        {pooja.city && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium group-hover:translate-x-1 transition-transform duration-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="drop-shadow-sm">{pooja.templeName ? `${pooja.templeName}` : `${pooja.city}, MP`}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-300 leading-snug">
              {language === 'hi' && pooja.hindiName ? pooja.hindiName : pooja.name}
            </h3>
          </div>

          {(pooja.hindiName || pooja.name) && (
            <p className="text-xs font-serif text-amber-800 dark:text-amber-400 font-medium mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
              {language === 'hi' ? pooja.name : pooja.hindiName}
            </p>
          )}

          <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed line-clamp-2">
            {language === 'hi' && pooja.hindiDescription ? pooja.hindiDescription : pooja.shortDescription}
          </p>

          {/* Quick info specs */}
          <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            {pooja.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
                <span>{pooja.duration}</span>
              </span>
            )}
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium ml-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'वैदिक सामग्री शामिल' : 'Vedic Samagri Included'}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <a
            href={`/pooja/${pooja.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-100/70 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 hover:text-amber-950 dark:hover:text-amber-100 font-semibold text-xs text-center transition-all border border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-500/50"
          >
            {t('action.view_details', 'View Vidhi Details')}
          </a>
          <button
            onClick={() => onBook(pooja.name)}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-800 to-amber-800 text-white font-semibold text-xs hover:from-red-900 hover:to-amber-900 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-amber-900/30 flex items-center gap-1.5 shrink-0"
          >
            <span>{t('action.book_now', 'Book')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
