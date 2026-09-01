import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { StoreService } from '../services/store';
import { GalleryItem } from '../types';
import { SEOHead } from '../components/SEOHead';
import { 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Sparkles, 
  Compass,
  MapPin
} from 'lucide-react';

interface GalleryPageProps {
  onOpenBooking?: (type: 'Pooja' | 'Tour' | 'Destination' | 'General', name?: string) => void;
}

const DEFAULT_FALLBACK_IMG = '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg';

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() =>
    StoreService.getGallery().filter((item) => item.isPublished)
  );

  useEffect(() => {
    const handleSync = () => {
      setGalleryItems(StoreService.getGallery().filter((item) => item.isPublished));
    };
    window.addEventListener('aastha:data-synced', handleSync);
    return () => window.removeEventListener('aastha:data-synced', handleSync);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('All Photos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All Photos',
    'Darshan',
    'Pooja',
    'Ujjain Yatra',
    'Omkareshwar',
    'Himalayan Yatra',
    'Trekking',
  ] as const;

  const filteredItems = activeCategory === 'All Photos'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const getCategoryLabel = (cat: string) => {
    if (language === 'hi') {
      switch (cat) {
        case 'All Photos': return 'सभी तस्वीरें';
        case 'Darshan': return 'दर्शन व मंदिर';
        case 'Pooja': return 'वैदिक पूजा';
        case 'Ujjain Yatra': return 'उज्जैन यात्रा';
        case 'Omkareshwar': return 'ओंकारेश्वर';
        case 'Himalayan Yatra': return 'हिमालयन यात्रा';
        case 'Trekking': return 'ट्रेकिंग';
        default: return cat;
      }
    }
    return cat;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#121110] text-stone-900 dark:text-stone-100 transition-colors">
      <SEOHead
        title="Spiritual Photo Gallery - Sacred Darshan, Vedic Pooja & Pilgrimage Photos | Aastha Sey Raasta Seva"
        description="Explore the sacred photo gallery of Mahakaleshwar Jyotirlinga, Omkareshwar, Vedic Poojas, Ramghat Aarti, and Himalayan Yatras."
        canonicalUrl="https://aasthaserasta.com/gallery"
        ogImage="/assets/images/header_bg_spiritual_1786196057015.jpg"
      />

      {/* Hero Header */}
      <section 
        className="relative py-20 sm:py-28 bg-cover bg-center text-white border-b border-white/10"
        style={{ backgroundImage: `url('/assets/images/header_bg_spiritual_1786196057015.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A1518]/90 via-[#3A1518]/85 to-[#3A1518]/95 dark:from-[#1A0A0B]/95 dark:via-[#1A0A0B]/90 dark:to-[#1A0A0B]/98" />
        
        <div className="relative max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'आध्यात्मिक फोटो गैलरी' : 'Sacred Photo Gallery'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 tracking-tight">
            {language === 'hi' ? 'पवित्र दर्शन और अनुष्ठान की झलकियां' : 'Glances of Sacred Darshan & Divine Poojas'}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {language === 'hi'
              ? 'उज्जैन महाकालेश्वर, ओंकारेश्वर, वैदिक अनुष्ठान और पावन तीर्थ यात्राओं के दुर्लभ क्षणों का संग्रह।'
              : 'A curated visual journey capturing the divine aura of Mahakaleshwar, Omkareshwar Jyotirlinga, Vedic rituals, and holy pilgrimages.'}
          </p>
        </div>
      </section>

      {/* Filter Tabs Bar */}
      <section className="sticky top-16 z-30 bg-[#FAF8F5]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-stone-200/70 dark:border-stone-800 py-4 px-4 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-none gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-rose-700 text-white shadow-md shadow-rose-900/20 scale-105'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-800 hover:text-rose-600'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            );
          })}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => {
              const cleanImg = (item.image || DEFAULT_FALLBACK_IMG).replace(/^\/(?:src|public)\/assets\//, '/assets/');
              return (
                <div
                  key={item.id || index}
                  onClick={() => setLightboxIndex(index)}
                  className="group bg-white dark:bg-[#1C1917] rounded-3xl overflow-hidden border border-[#E6DBC8] dark:border-stone-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src={cleanImg}
                      alt={item.altText || item.title}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('hero_mahakaleshwar')) {
                          target.src = DEFAULT_FALLBACK_IMG;
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Expand icon */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      <Eye className="w-4 h-4" />
                    </div>

                    {/* Category Pill */}
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      {item.category}
                    </div>

                    {/* Title & location inside image overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <h3 className="font-serif font-bold text-base text-white line-clamp-1">
                        {item.title}
                      </h3>
                      {item.location && (
                        <div className="flex items-center gap-1 text-stone-300 text-xs mt-1">
                          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {item.description && (
                    <div className="p-4 text-left flex-1 flex flex-col justify-between">
                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 max-w-lg mx-auto p-8">
            <Sparkles className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              {language === 'hi'
                ? 'इस श्रेणी में अभी कोई तस्वीर उपलब्ध नहीं है।'
                : 'No photographs available in this category yet.'}
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-3 bg-stone-900/70 hover:bg-stone-900 rounded-full transition-all z-[10000]"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-stone-900/70 hover:bg-stone-900 rounded-full transition-all z-[10000]"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {lightboxIndex < filteredItems.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-stone-900/70 hover:bg-stone-900 rounded-full transition-all z-[10000]"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div 
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={(filteredItems[lightboxIndex].image || DEFAULT_FALLBACK_IMG).replace(/^\/(?:src|public)\/assets\//, '/assets/')}
              alt={filteredItems[lightboxIndex].altText || filteredItems[lightboxIndex].title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('hero_mahakaleshwar')) {
                  target.src = DEFAULT_FALLBACK_IMG;
                }
              }}
              className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-center text-white px-4 max-w-2xl space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug">
                {filteredItems[lightboxIndex].title}
              </h3>
              {filteredItems[lightboxIndex].description && (
                <p className="text-xs text-stone-300 leading-relaxed max-w-xl mx-auto">
                  {filteredItems[lightboxIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking CTA Bar */}
      <section className="bg-[#3A1518] dark:bg-[#1A0A0B] text-white py-16 px-4 border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
            {language === 'hi' ? 'क्या आप उज्जैन दर्शन या पूजा की योजना बना रहे हैं?' : 'Planning Your Ujjain Darshan or Vedic Pooja?'}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? 'आस्था से रास्ता सेवा के साथ आसान बुकिंग, व्यक्तिगत सहायता और प्रामाणिक वैदिक पंडित मार्गदर्शन प्राप्त करें।'
              : 'Experience seamless temple darshan assistance, authentic Vedic rituals, and customized spiritual tour arrangements.'}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenBooking && onOpenBooking('Pooja')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-sm shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
            >
              {language === 'hi' ? 'पूजा व दर्शन बुक करें' : 'Book Pooja & Darshan'}
            </button>
            <a
              href="/spiritual-tours"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all inline-flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'यात्रा पैकेज देखें' : 'Explore Spiritual Tours'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
