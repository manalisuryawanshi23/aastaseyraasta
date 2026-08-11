import React from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Flame, Users, Award, MapPin, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const settings = StoreService.getSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <SEOHead
        title="Vedic Brahmins & Pandit Seva Lineage in Ujjain"
        description="Learn about our lineage of Vedic Brahmins in Ujjain, authentic gotra sankalp pooja management, and dedicated pilgrimage arrangements."
        keywords="Vedic Pandits Ujjain, Gurukul Acharyas Mahakaleshwar, Aastha Sey Raasta Seva Foundation, Sanatan Dharma Seva"
        canonicalUrl="https://aasthaserasta.com/about-us"
        ogImage="/src/assets/images/header_bg_spiritual_1786196057015.jpg"
        ogImageAlt={`About ${settings.businessName} - Vedic Acharyas in Ujjain`}
      />

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero */}
      <div className="bg-[#121212] text-[#F9F8F6] rounded-2xl p-8 sm:p-14 relative overflow-hidden border border-[#121212]/20">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F1ED]/10 text-amber-300 text-xs font-semibold uppercase tracking-widest border border-amber-500/30">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Traditional Gurukul Lineage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif italic font-bold text-amber-100">
            About {settings.businessName}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            &quot;{settings.tagline}&quot; — Rooted in the sacred land of Avantika Puri (Ujjain), we are dedicated to preserving authentic Vedic rituals, transparent pilgrimage services, and gotra sankalp devotional offerings for devotees worldwide.
          </p>
        </div>
      </div>

      {/* Core Values / Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3F1ED] dark:bg-stone-800 text-amber-800 dark:text-amber-400 flex items-center justify-center font-serif font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">Vedic Authenticity</h3>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
            Conducted strictly according to Vedic scriptures by qualified Gurukul-trained Brahmins with authentic mantras and satvik samagri.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3F1ED] dark:bg-stone-800 text-amber-800 dark:text-amber-400 flex items-center justify-center font-serif font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">Transparent & Ethical</h3>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
            Clear guidelines on dakshina, samagri, temple timings, and venue arrangements with zero hidden promises or false claims.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3F1ED] dark:bg-stone-800 text-amber-800 dark:text-amber-400 flex items-center justify-center font-serif font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">Devotee Care</h3>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
            Personalized gotra sankalp, temple queuing guidance, private AC transport, and comfortable lodging assistance.
          </p>
        </div>
      </div>

      {/* Detailed Narrative */}
      <div className="bg-[#F3F1ED] dark:bg-stone-900 p-8 sm:p-12 rounded-2xl border border-[#121212]/10 dark:border-stone-800 space-y-4">
        <h2 className="text-2xl font-serif italic font-bold text-stone-900 dark:text-amber-100">
          Serving Devotees at Mahakal Nagari Ujjain
        </h2>
        <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
          {settings.footerDescription}
        </p>
        <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-stone-800 dark:text-stone-200">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Rudrabhishek at Ramghat & Shrines</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Bhat Pooja at Angareshwar & Mangalnath</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Baglamukhi Havan at Nalkheda</span>
          </span>
        </div>
      </div>
    </div>
  );
};
