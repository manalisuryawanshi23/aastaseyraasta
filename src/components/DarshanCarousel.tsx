import React, { useRef, useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Flower2, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  BookOpen, 
  Compass, 
  Waves, 
  Bell 
} from 'lucide-react';
import { StoreService } from '../services/store';

const DEFAULT_DARSHAN_FALLBACK = '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg';

const defaultDarshanItems = [
  { 
    name: 'Mahakaleshwar Jyotirlinga Darshan', 
    image: '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg',
    Icon: Flame 
  },
  { 
    name: 'Omkareshwar Jyotirlinga Darshan', 
    image: '/assets/images/yatra_omkareshwar_temple_1786193903123.jpg',
    Icon: Compass 
  },
  { 
    name: 'Harsiddhi Shaktipeeth Darshan', 
    image: '/assets/images/navchandi-path-havan-ujjain.webp',
    Icon: Sparkles 
  },
  { 
    name: 'Kaal Bhairav Mandir Darshan', 
    image: '/assets/images/mirchi-havan-vikrant-bhairav-ujjain.webp',
    Icon: ShieldCheck 
  },
  { 
    name: 'Garhkalika Shaktipeeth Darshan', 
    image: '/assets/images/shatchandi-path-havan-ujjain.webp',
    Icon: Sparkles 
  },
  { 
    name: 'Mangalnath Mandir Darshan', 
    image: '/assets/images/bhat-pooja-mangalnath-ujjain.webp',
    Icon: Sun 
  },
  { 
    name: 'Angareshwar Mahadev Darshan', 
    image: '/assets/images/bhat-pooja-angareshwar-ujjain.webp',
    Icon: Flame 
  },
  { 
    name: 'Chintaman Ganesh Mandir Darshan', 
    image: '/assets/images/108-ganesh-atharvashirsha-path-ujjain.webp',
    Icon: Bell 
  },
  { 
    name: 'Vikrant Bhairav Darshan', 
    image: '/assets/images/mirchi-havan-vikrant-bhairav-ujjain.webp',
    Icon: Flame 
  },
  { 
    name: 'Siddhavat Mandir Darshan', 
    image: '/assets/images/pooja_pitru_ramghat_1786196153062.jpg',
    Icon: Flower2 
  },
  { 
    name: 'Sandipani Ashram Darshan', 
    image: '/assets/images/108-vishnu-sahastranama-path-ujjain.webp',
    Icon: BookOpen 
  },
  { 
    name: 'Kshipra Ramghat Evening Aarti', 
    image: '/assets/images/header_bg_spiritual_1786196057015.jpg',
    Icon: Waves 
  },
];

export const DarshanCarousel: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState(() =>
    StoreService.getGallery().filter((g) => g.category === 'Darshan' && g.isPublished)
  );

  useEffect(() => {
    const handleSync = () => {
      setGalleryItems(StoreService.getGallery().filter((g) => g.category === 'Darshan' && g.isPublished));
    };
    window.addEventListener('aastha:data-synced', handleSync);
    return () => window.removeEventListener('aastha:data-synced', handleSync);
  }, []);

  // Merge custom darshan items from gallery with default items
  const customItems = galleryItems.map((g) => {
    const cleanImg = g.image.replace(/^\/(?:src|public)\/assets\//, '/assets/');
    return {
      name: g.title,
      image: cleanImg || DEFAULT_DARSHAN_FALLBACK,
      Icon: Flame,
    };
  });

  const displayItems = customItems.length >= 4 
    ? customItems 
    : [...customItems, ...defaultDarshanItems.filter(d => !customItems.some(c => c.name.toLowerCase() === d.name.toLowerCase()))];

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scrollStep = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isHovered && !isInteracting && scrollRef.current) {
        const el = scrollRef.current;
        // Smooth pixel movement (approx 45px/s)
        const scrollAmount = (45 * deltaTime) / 1000;
        
        scrollPosRef.current += scrollAmount;

        // Reset scroll when reaching the halfway point of duplicated content
        if (scrollPosRef.current >= el.scrollWidth / 2) {
          scrollPosRef.current -= el.scrollWidth / 2;
        }

        el.scrollLeft = scrollPosRef.current;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isInteracting]);

  // Sync scroll position state when user manually scrolls or drags
  const handleScroll = () => {
    if (scrollRef.current && !isInteracting) {
      scrollPosRef.current = scrollRef.current.scrollLeft;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const scrollAmount = el.clientWidth * 0.8;
      
      setIsInteracting(true);
      
      const targetScroll = el.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      el.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      // Update position tracker after smooth animation finishes
      setTimeout(() => {
        if (el.scrollLeft >= el.scrollWidth / 2) {
          const resetPos = el.scrollLeft - el.scrollWidth / 2;
          el.scrollTo({ left: resetPos, behavior: 'instant' });
          scrollPosRef.current = resetPos;
        } else if (el.scrollLeft <= 0) {
          const resetPos = el.scrollLeft + el.scrollWidth / 2;
          el.scrollTo({ left: resetPos, behavior: 'instant' });
          scrollPosRef.current = resetPos;
        } else {
          scrollPosRef.current = el.scrollLeft;
        }
        setIsInteracting(false);
      }, 1000);
    }
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-12 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        // Keep paused briefly after touch
        setTimeout(() => setIsHovered(false), 1000);
      }}
    >
      {/* Navigation Controls */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-300 dark:hover:border-amber-700 transition-all opacity-0 sm:group-hover:opacity-100 disabled:opacity-0 focus:outline-none"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-300 dark:hover:border-amber-700 transition-all opacity-0 sm:group-hover:opacity-100 disabled:opacity-0 focus:outline-none"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Fading Edges */}
      <div className="absolute inset-y-0 left-4 sm:left-12 w-8 sm:w-16 bg-gradient-to-r from-stone-50 dark:from-[#0c0a09] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-4 sm:right-12 w-8 sm:w-16 bg-gradient-to-l from-stone-50 dark:from-[#0c0a09] to-transparent z-10 pointer-events-none"></div>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide py-4 px-2 gap-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Triple the items to allow seamless infinite scrolling */}
        {[...displayItems, ...displayItems, ...displayItems].map((item, index) => {
          return (
            <div
              key={index}
              className="shrink-0 w-[220px]"
            >
              <div className="h-36 rounded-xl overflow-hidden border border-orange-200/60 dark:border-orange-900/40 shadow-sm hover:shadow-md hover:border-rose-400/50 dark:hover:border-rose-700/50 transition-all cursor-pointer relative group bg-stone-900">
                <a
                  href="/tour/ujjain-spiritual-tour"
                  className="w-full h-full block relative"
                >
                  <img 
                    src={item.image || DEFAULT_DARSHAN_FALLBACK} 
                    alt={item.name} 
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== window.location.origin + DEFAULT_DARSHAN_FALLBACK) {
                        target.src = DEFAULT_DARSHAN_FALLBACK;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white drop-shadow-md text-left line-clamp-2 leading-snug">
                    {item.name}
                  </span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
