import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, MapPin } from 'lucide-react';

export interface BackgroundSlide {
  url: string;
  title: string;
  location?: string;
}

export const DEFAULT_HEADER_SLIDES: BackgroundSlide[] = [
  {
    url: '/src/assets/images/header_bg_spiritual_1786196057015.jpg',
    title: 'Shri Mahakaleshwar Corridor & Sanctum',
    location: 'Ujjain, Madhya Pradesh',
  },
  {
    url: '/src/assets/images/pooja_rudrabhishek_1786196070818.jpg',
    title: 'Panchamrit Rudrabhishek Ritual',
    location: 'Consecrated Shivlinga Vidhi',
  },
  {
    url: '/src/assets/images/pooja_bhat_mangalnath_1786196085583.jpg',
    title: 'Bhat Pooja & Mangal Dosh Remedy',
    location: 'Mangalnath & Angareshwar Shrines',
  },
  {
    url: '/src/assets/images/pooja_baglamukhi_havan_1786196097113.jpg',
    title: 'Maa Baglamukhi Anushthan Yajna',
    location: 'Nalkheda Siddh Peeth',
  },
  {
    url: '/src/assets/images/tour_ujjain_omkareshwar_1786196108956.jpg',
    title: 'Omkareshwar Narmada Island Sanctuary',
    location: 'Mandhata Island, Omkareshwar',
  },
  {
    url: '/src/assets/images/pooja_pitru_ramghat_1786196153062.jpg',
    title: 'Evening Kshipra Aarti & Deepdan',
    location: 'Ramghat Riverbank, Ujjain',
  },
];

interface HeroBackgroundSliderProps {
  slides?: BackgroundSlide[];
  intervalMs?: number;
  overlayGradient?: string;
  showCaptionBadge?: boolean;
}

export const HeroBackgroundSlider: React.FC<HeroBackgroundSliderProps> = ({
  slides = DEFAULT_HEADER_SLIDES,
  intervalMs = 5500,
  overlayGradient = 'bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/40',
  showCaptionBadge = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length, intervalMs]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none">
      {/* Background Images Layer */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.url + index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              referrerPolicy="no-referrer"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              {...(index === 0 ? { fetchPriority: 'high' } : {})}
              className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Dynamic Dark Gradients for contrast & text legibility */}
      <div className={`absolute inset-0 z-20 ${overlayGradient}`} />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-red-950/80 via-stone-950/50 to-amber-950/80" />

      {/* Controls & Slide Location Tag — hidden on mobile to prevent clashing with content */}
      {showCaptionBadge && (
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-30 hidden lg:flex flex-row items-center justify-between gap-3 text-xs text-amber-100/90 font-mono">
          
          {/* Active Location Info */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/30 backdrop-blur-md shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-bounce" />
            <span className="font-semibold text-amber-200">{currentSlide.title}</span>
            {currentSlide.location && (
              <span className="text-stone-400 hidden sm:inline">• {currentSlide.location}</span>
            )}
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            {/* Auto progress bar indicator */}
            <div className="flex items-center gap-1.5 bg-stone-900/80 border border-amber-500/30 px-3 py-1.5 rounded-full backdrop-blur-md">
              <span className="text-amber-400 font-bold">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-stone-500">/</span>
              <span className="text-stone-400">{String(slides.length).padStart(2, '0')}</span>
            </div>

            {/* Dots */}
            <div className="hidden md:flex items-center gap-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 bg-amber-400 shadow-sm shadow-amber-400'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Pause/Next Buttons */}
            <div className="flex items-center gap-1 bg-stone-900/80 border border-amber-500/30 p-1 rounded-full backdrop-blur-md">
              <button
                onClick={goToPrev}
                className="p-1 rounded-full hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 transition-colors"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 rounded-full hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 transition-colors"
                title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={goToNext}
                className="p-1 rounded-full hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 transition-colors"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
