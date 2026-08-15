import React from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { generateDestinationTitle } from '../utils/seoTitles';
import { PoojaCard } from '../components/PoojaCard';
import { TourCard } from '../components/TourCard';
import { DestinationMapVisualizer } from '../components/DestinationMapVisualizer';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Landmark, Car, Sparkles, Compass } from 'lucide-react';

interface DestinationDetailPageProps {
  slug: string;
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ slug, onOpenBooking }) => {
  const { language, t, localize } = useLanguage();
  const settings = StoreService.getSettings();
  const dest = StoreService.getDestinationBySlug(slug);

  if (!dest) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          {language === 'hi' ? 'तीर्थ स्थल नहीं मिला' : 'Destination Not Found'}
        </h1>
        <a href="/destinations" className="inline-block px-6 py-2.5 rounded-xl bg-sky-800 text-white font-medium text-xs">
          {t('action.back_to_destinations', 'Back to Destinations')}
        </a>
      </div>
    );
  }

  const destName = localize(dest, 'name', 'hindiName');
  const destShortDesc = localize(dest, 'shortDescription', 'hindiShortDescription');
  const destDesc = localize(dest, 'description', 'hindiDescription');
  const destPlacesToVisit = localize(dest, 'placesToVisit', 'hindiPlacesToVisit') || dest.placesToVisit || [];
  const destTravelInfo = localize(dest, 'travelInformation', 'hindiTravelInformation') || dest.travelInformation;

  const relatedPoojas = StoreService.getPoojas().filter(
    (p) => p.city.toLowerCase() === dest.name.toLowerCase() || (dest.name === 'Ujjain' && p.city === 'Ujjain')
  );

  const relatedTours = StoreService.getTours().filter((t) =>
    t.destinations.some((d) => d.toLowerCase().includes(dest.name.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <SEOHead
        title={generateDestinationTitle(dest)}
        description={dest.metaDescription || dest.shortDescription}
        keywords={dest.focusKeyword ? `${dest.focusKeyword}, ${dest.name} Temple, Ujjain Pilgrimage` : `${dest.name}, Ujjain Sacred Shrines, Spiritual Travel`}
        canonicalUrl={dest.canonicalUrl || `https://aasthaserasta.com/destinations/${dest.slug}`}
        ogImage={dest.heroImage}
        ogImageAlt={`${dest.name} Sacred Temple & Shrine`}
      />

      <Breadcrumbs
        items={[
          { label: t('nav.destinations', 'Destinations'), href: '/destinations' },
          { label: destName },
        ]}
      />

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden min-h-[50vh] flex items-end p-8 sm:p-12 bg-stone-900 text-white">
        <img
          src={dest.heroImage || '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg'}
          alt={destName}
          loading="eager"
          decoding="async"
          {...({ fetchPriority: 'high' } as any)}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/30">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'hi' ? 'पवित्र तीर्थ गाइड' : 'Sacred Destination Guide'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100">
            {destName} {dest.hindiName && language !== 'hi' && <span className="text-2xl font-normal font-serif text-amber-300">({dest.hindiName})</span>}
          </h1>

          <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {destShortDesc}
          </p>
        </div>
      </div>

      {/* About & Shrines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-100 pb-2">
              {language === 'hi' ? 'आध्यात्मिक महत्व एवं परिचय' : 'Spiritual Significance & Overview'}
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
              {destDesc}
            </p>
          </div>

          <SocialShareButtons
            title={language === 'hi' ? `${destName} का आध्यात्मिक दर्शन गाइड` : `Spiritual Guide to ${dest.name}`}
            description={destShortDesc}
          />

          {/* Temples List */}
          {destPlacesToVisit && destPlacesToVisit.length > 0 && (
            <div className="bg-amber-50/60 p-6 sm:p-8 rounded-2xl border border-amber-200/80 space-y-4">
              <h3 className="text-lg font-serif font-bold text-amber-950 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-700" />
                <span>{language === 'hi' ? `${destName} के प्रमुख मंदिर एवं पवित्र स्थल` : `Major Temples & Sacred Places in ${dest.name}`}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-stone-800">
                {destPlacesToVisit.map((place: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-amber-200 shadow-2xs">
                    <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{place}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Info */}
          {destTravelInfo && (
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Car className="w-4 h-4 text-stone-700" />
                <span>{language === 'hi' ? 'यात्रा एवं आवागमन जानकारी' : 'Travel & Connectivity'}</span>
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {destTravelInfo}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Call to action */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-950 via-amber-950 to-red-950 text-white p-6 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-xl text-amber-100">
              {language === 'hi' ? `${destName} यात्रा की योजना बना रहे हैं?` : `Visiting ${dest.name}?`}
            </h3>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              {language === 'hi'
                ? 'हमारे अनुभवी आचार्यों द्वारा संपूर्ण मंदिर दर्शन, कतार प्रबंधन सहायता, गोत्र संकल्पित पूजा और निजी वाहन सेवा की व्यवस्था कराएं।'
                : 'Allow our Acharya team to organize complete temple Darshan queuing assistance, gotra sankalp poojas, and private AC cab transfers.'}
            </p>
            <button
              onClick={() => onOpenBooking('Destination', dest.name)}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-md"
            >
              {language === 'hi' ? `${destName} यात्रा हेतु पूछताछ करें` : `Enquire for ${dest.name} Visit`}
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Sacred Map Visualizer */}
      <section className="pt-2">
        <DestinationMapVisualizer
          destinationSlug={dest.slug}
          destinationName={dest.name}
          onOpenBooking={onOpenBooking}
        />
      </section>

      {/* Related Poojas in this destination */}
      {relatedPoojas.length > 0 && (
        <section className="pt-6 border-t border-stone-200 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-700" />
            <span>{language === 'hi' ? `${destName} में वैदिक पूजा सेवाएं` : `Pooja Services in ${dest.name}`}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPoojas.map((p) => (
              <PoojaCard key={p.id} pooja={p} onBook={(name) => onOpenBooking('Pooja', name)} />
            ))}
          </div>
        </section>
      )}

      {/* Related Tours covering this destination */}
      {relatedTours.length > 0 && (
        <section className="pt-6 border-t border-stone-200 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700" />
            <span>{language === 'hi' ? `${destName} सम्मिलित तीर्थ यात्रा पैकेज` : `Tour Packages Including ${dest.name}`}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((t) => (
              <TourCard key={t.id} tour={t} onBook={(name) => onOpenBooking('Tour', name)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

