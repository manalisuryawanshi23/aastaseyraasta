import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import {
  Flame,
  Compass,
  MapPin,
  Home,
  Search,
  BookOpen,
  Phone,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

interface NotFoundPageProps {
  onOpenBooking?: (type?: 'Pooja' | 'Tour' | 'General', name?: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8 min-h-[70vh] flex flex-col items-center justify-center">
      <SEOHead
        title="404 — Page Not Found | Aastha Sey Raasta Seva"
        description="The requested page could not be found. Explore our authentic Vedic Pooja services and spiritual pilgrimage tour packages in Ujjain."
        noindex={true}
      />

      {/* Decorative Om Icon */}
      <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 flex items-center justify-center font-serif text-4xl shadow-inner animate-pulse">
        ॐ
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900">
          HTTP 404 — Not Found
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-amber-100">
          {language === 'hi' ? 'पृष्ठ उपलब्ध नहीं है' : 'Page Not Found'}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          {language === 'hi'
            ? 'क्षमा करें, जिस पृष्ठ को आप खोज रहे हैं वह स्थानांतरित कर दिया गया है या इसका पता बदल गया है।'
            : 'The link you clicked may be outdated or mistyped. Explore our authentic Vedic Pooja services and spiritual yatras below.'}
        </p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl pt-4">
        <a
          href="/pooja-services"
          className="p-5 rounded-2xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-sm transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center mb-3">
            <Flame className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
            {language === 'hi' ? 'वैदिक पूजा सेवाएं' : 'Vedic Poojas'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Rudrabhishek, Bhat Pooja, Kaal Sarp Shanti
          </p>
        </a>

        <a
          href="/spiritual-tours"
          className="p-5 rounded-2xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 shadow-sm transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-3">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
            {language === 'hi' ? 'तीर्थ यात्रा पैकेज' : 'Spiritual Tours'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Ujjain, Omkareshwar, Char Dham Circuits
          </p>
        </a>

        <a
          href="/destinations"
          className="p-5 rounded-2xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 hover:border-rose-500/50 shadow-sm transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 flex items-center justify-center mb-3">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
            {language === 'hi' ? 'पवित्र तीर्थ धाम' : 'Temple Guides'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Mahakaleshwar, Omkareshwar, Nalkheda
          </p>
        </a>
      </div>

      {/* Return to Home CTA */}
      <div className="pt-2">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>{language === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Return to Home Page'}</span>
        </a>
      </div>
    </div>
  );
};
