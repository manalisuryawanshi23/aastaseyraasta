import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Calendar,
  ShieldCheck,
  Award,
  Lock,
  Headphones,
  ArrowRight,
  Sun,
  Flame,
} from 'lucide-react';

interface FreeAstrologyBannerProps {
  onOpenAstrologyModal: () => void;
}

export const FreeAstrologyBanner: React.FC<FreeAstrologyBannerProps> = ({
  onOpenAstrologyModal,
}) => {
  const { language } = useLanguage();

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 px-4 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D160E] via-[#1E110A] to-[#120B07] text-white border border-amber-500/40 shadow-2xl p-5 sm:p-7 md:p-8 transition-all hover:border-amber-400/60 group">
        
        {/* Subtle Decorative Golden Glow in Corner */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Celestial Zodiac / Kundli Wheel (Watermark on Right at Low Opacity) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-4 md:translate-x-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 pointer-events-none opacity-20 dark:opacity-25 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-105">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-amber-300 fill-none stroke-current stroke-[0.75]"
          >
            {/* Outer Zodiac Circles */}
            <circle cx="100" cy="100" r="95" strokeDasharray="3,3" />
            <circle cx="100" cy="100" r="85" />
            <circle cx="100" cy="100" r="65" />
            <circle cx="100" cy="100" r="45" strokeDasharray="2,2" />
            <circle cx="100" cy="100" r="22" />

            {/* 12 Astrological Houses / Ray Segments */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="100"
                y1="100"
                x2={100 + 95 * Math.cos((deg * Math.PI) / 180)}
                y2={100 + 95 * Math.sin((deg * Math.PI) / 180)}
                strokeOpacity="0.6"
              />
            ))}

            {/* Kundli Diamond Layout Inscription */}
            <polygon
              points="100,35 165,100 100,165 35,100"
              strokeWidth="0.8"
              strokeOpacity="0.7"
            />
            <polygon
              points="100,45 155,100 100,155 45,100"
              strokeWidth="0.5"
              strokeDasharray="1,2"
            />

            {/* Sun / Surya Mandala Center */}
            <circle cx="100" cy="100" r="12" fill="currentColor" fillOpacity="0.15" />
            <circle cx="100" cy="100" r="6" fill="currentColor" fillOpacity="0.4" />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Column: Heading, Badges, Tagline & Features */}
          <div className="space-y-4 max-w-2xl">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{language === 'hi' ? 'मुफ्त ज्योतिषीय मार्गदर्शन' : 'FREE ASTROLOGICAL SERVICES'}</span>
            </div>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-amber-50 tracking-tight leading-snug">
              {language === 'hi' ? (
                <>
                  प्राप्त करें <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent font-extrabold">निःशुल्क ज्योतिष परामर्श</span>
                </>
              ) : (
                <>
                  Get <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent font-extrabold">Free Astrology</span> Consultation
                </>
              )}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-light">
              {language === 'hi'
                ? 'अपनी जन्म कुंडली विवरण एवं प्रश्न हमारे साथ साझा करें। हमारी अनुभवी ज्योतिष टीम आपके पसंदीदा समय पर आपसे संपर्क करेगी।'
                : 'Share your birth details and concerns with us. Our astrology consultation team will review your request and connect with you at your preferred time.'}
            </p>

            {/* Feature Pills */}
            <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-amber-200/90 font-medium">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/20 backdrop-blur-xs">
                <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{language === 'hi' ? '100% निःशुल्क मार्गदर्शन' : '100% Free Guidance'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/20 backdrop-blur-xs">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{language === 'hi' ? 'अनुभवी ज्योतिषी' : 'Expert Astrologers'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/20 backdrop-blur-xs">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{language === 'hi' ? 'गोपनीय एवं सुरक्षित' : 'Confidential & Secure'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/20 backdrop-blur-xs">
                <Headphones className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{language === 'hi' ? 'व्यक्तिगत समाधान' : 'Personalized Solutions'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Conversion CTA Button & Guarantee Note */}
          <div className="flex flex-col items-start lg:items-end justify-center gap-2.5 shrink-0 pt-2 lg:pt-0">
            <button
              onClick={onOpenAstrologyModal}
              className="w-full sm:w-auto py-3.5 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-amber-200 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-950/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-900" />
              <span>{language === 'hi' ? 'मुफ्त परामर्श प्राप्त करें →' : 'Get Free Consultation'}</span>
              <ArrowRight className="w-4 h-4 text-stone-900 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-[11px] text-amber-300/80 flex items-center gap-1.5 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{language === 'hi' ? 'कोई छुपा शुल्क नहीं, केवल प्रामाणिक मार्गदर्शन' : 'No hidden charges, only genuine guidance'}</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
