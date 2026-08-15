import React, { useState, useEffect } from 'react';
import { StoreService } from '../services/store';
import { DestinationCard } from '../components/DestinationCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { generateDestinationListingTitle } from '../utils/seoTitles';
import { MapPin } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { SkeletonGrid } from '../components/Skeletons';
import { useLanguage } from '../context/LanguageContext';

export const DestinationListingPage: React.FC = () => {
  const { language, t } = useLanguage();
  const destinations = StoreService.getDestinations();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEOHead
        title={generateDestinationListingTitle()}
        description="Explore spiritual destinations including Ujjain Mahakal, Omkareshwar Jyotirlinga, Maa Baglamukhi Nalkheda, Indore, and Uttarakhand."
        keywords="Sacred Shrines Ujjain, Omkareshwar Jyotirlinga, Baglamukhi Nalkheda, Pilgrimage Destinations Madhya Pradesh"
        canonicalUrl="https://aasthaserasta.com/destinations"
        ogImage="/src/assets/images/header_bg_spiritual_1786196057015.jpg"
        ogImageAlt="Sacred Pilgrimage Destinations and Shrines"
      />

      <Breadcrumbs items={[{ label: t('nav.destinations', 'Destinations') }]} />

      <FadeIn direction="up">
        <div className="bg-gradient-to-r from-sky-950 via-stone-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <img
            src="/src/assets/images/header_bg_spiritual_1786196057015.jpg"
            alt="Destinations Header Background"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider border border-sky-500/30">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{language === 'hi' ? 'पावन तीर्थ व पवित्र नगर' : 'Holy Shrines & Cities'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100">
              {language === 'hi' ? 'प्रमुख तीर्थ स्थल एवं पावन धाम' : 'Pilgrimage Destinations'}
            </h1>
            <p className="text-sky-100/80 text-xs sm:text-sm leading-relaxed">
              {language === 'hi'
                ? 'उज्जैन, ओंकारेश्वर, मां बगलामुखी नलखेड़ा और उत्तराखंड के पवित्र तीर्थों की विस्तृत दर्शन मार्गदर्शिका एवं व्यवस्था।'
                : 'Detailed spiritual guides, major temple shrines, pooja arrangements, and travel connectivity across Madhya Pradesh & Uttarakhand.'}
            </p>
          </div>
        </div>
      </FadeIn>

      {isLoading ? (
        <SkeletonGrid type="destination" count={6} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.id} destination={dest} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};
