import React from 'react';
import { Sparkles, ArrowRight, X, Megaphone, Flame, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types';

interface MarqueeBannerProps {
  banner?: SiteSettings['announcementBanner'];
  onClose?: () => void;
  isAdminPreview?: boolean;
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  banner,
  onClose,
  isAdminPreview = false,
}) => {
  if (!banner || (!banner.isActive && !isAdminPreview)) {
    return null;
  }

  const {
    text = '🚩 Special Offers on Pooja Services & Spiritual Tours in Ujjain!',
    secondaryText = '🕉️ Free Gotra Sankalp & Prasad Home Delivery Included',
    link = '/pooja-services',
    buttonText = 'Claim Offer',
    badgeText = 'SPECIAL OFFER',
    isMarquee = true,
    speed = 'medium',
    themeColor = 'amber',
    pauseOnHover = true,
  } = banner;

  // Theme styling mapping
  const themeClasses = {
    amber: 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 border-amber-400/30',
    red: 'bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white border-red-500/30',
    emerald: 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 text-emerald-50 border-emerald-500/30',
    purple: 'bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-purple-100 border-purple-500/30',
    dark: 'bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-amber-200 border-amber-900/50',
  }[themeColor] || 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950';

  const speedClass = {
    slow: 'marquee-content-slow',
    medium: 'marquee-content-medium',
    fast: 'marquee-content-fast',
  }[speed] || 'marquee-content-medium';

  const renderOfferItem = (keyPrefix: string) => (
    <div key={keyPrefix} className="inline-flex items-center gap-3 px-6 text-xs sm:text-sm font-medium">
      {badgeText && (
        <span className="px-2 py-0.5 rounded-full bg-stone-950/20 text-stone-900 dark:text-white text-[10px] sm:text-xs font-bold uppercase tracking-wide border border-black/10 flex items-center gap-1 shadow-xs">
          <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
          <span>{badgeText}</span>
        </span>
      )}

      <span className="font-semibold text-stone-900 dark:text-stone-100 drop-shadow-xs">
        {text}
      </span>

      {secondaryText && (
        <>
          <span className="opacity-50">•</span>
          <span className="text-stone-900/90 dark:text-stone-200/90 font-serif italic text-xs">
            {secondaryText}
          </span>
        </>
      )}

      {link && (
        <a
          href={link}
          className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950 text-amber-300 hover:bg-stone-800 text-xs font-bold shadow-xs hover:shadow-md transition-all transform hover:scale-105"
        >
          <span>{buttonText || 'Book Now'}</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      )}

      <span className="ml-4 opacity-40 font-serif text-amber-900 dark:text-amber-300">❖</span>
    </div>
  );

  return (
    <div className={`relative w-full overflow-hidden border-b shadow-sm z-50 transition-colors ${themeClasses}`}>
      {isAdminPreview && (
        <div className="absolute top-1 left-2 z-20 bg-stone-950/80 text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>ADMIN PREVIEW</span>
        </div>
      )}

      {!banner.isActive && isAdminPreview && (
        <div className="bg-red-600/90 text-white text-[10px] text-center font-bold py-0.5">
          ⚠️ OFFER MARQUEE IS CURRENTLY INACTIVE (HIDDEN FROM PUBLIC USERS)
        </div>
      )}

      {isMarquee ? (
        <div className="marquee-container py-2 group cursor-pointer">
          <div className={`marquee-content ${speedClass} ${pauseOnHover ? 'pause-on-hover' : ''}`}>
            {/* Duplicate array items for seamless infinite scroll */}
            {[...Array(4)].map((_, idx) => renderOfferItem(`marquee-item-${idx}`))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto py-2 px-4 flex items-center justify-center text-center gap-3">
          {renderOfferItem('static-item')}
        </div>
      )}

      {onClose && (
        <button
          onClick={onClose}
          title="Dismiss Banner"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-900/70 hover:text-stone-950 dark:text-white/70 dark:hover:text-white rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
