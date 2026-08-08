import React from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { FAQAccordion } from '../components/FAQAccordion';
import { PoojaCard } from '../components/PoojaCard';
import { FavoriteButton } from '../components/FavoriteButton';
import { ShareWhatsAppButton } from '../components/ShareWhatsAppButton';
import {
  Flame,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  MessageSquare,
  Users,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface PoojaDetailPageProps {
  slug: string;
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const PoojaDetailPage: React.FC<PoojaDetailPageProps> = ({ slug, onOpenBooking }) => {
  const settings = StoreService.getSettings();
  const pooja = StoreService.getPoojaBySlug(slug);

  if (!pooja) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Pooja Service Not Found</h1>
        <p className="text-stone-600 text-sm">The requested ritual page does not exist or may have been updated.</p>
        <a href="/pooja-services" className="inline-block px-6 py-2.5 rounded-xl bg-amber-800 text-white font-medium text-xs">
          Back to Pooja Directory
        </a>
      </div>
    );
  }

  const allPoojas = StoreService.getPoojas();
  const relatedPoojas = allPoojas.filter((p) => p.id !== pooja.id && p.categoryId === pooja.categoryId).slice(0, 3);
  const faqs = StoreService.getFAQs().filter((f) => f.category === 'Pooja');

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pooja.seoTitle || pooja.name,
    description: pooja.metaDescription || pooja.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: settings.businessName,
      telephone: settings.phone1,
      address: {
        '@type': 'PostalAddress',
        addressLocality: pooja.city,
        addressRegion: pooja.state,
        addressCountry: pooja.country,
      },
    },
    areaServed: pooja.city,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <SEOHead
        title={pooja.seoTitle || `${pooja.name} in ${pooja.city} | ${settings.businessName}`}
        description={pooja.metaDescription || pooja.shortDescription}
        focusKeyword={pooja.focusKeyword}
        canonicalUrl={pooja.canonicalUrl}
        jsonLd={schemaJsonLd}
      />

      <Breadcrumbs
        items={[
          { label: 'Pooja Services', href: '/pooja-services' },
          { label: pooja.name },
        ]}
      />

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Left Info */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-700" />
                <span>{pooja.categoryName || 'Temple Pooja'}</span>
              </div>
              <FavoriteButton id={pooja.id} type="pooja" variant="button" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              {pooja.name}
            </h1>

            {pooja.hindiName && (
              <p className="text-base font-serif text-amber-800 font-medium">
                {pooja.hindiName}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600 pt-1">
              {pooja.templeName && (
                <div className="flex items-center gap-1 text-stone-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>{pooja.templeName}, {pooja.city}</span>
                </div>
              )}
              {pooja.duration && (
                <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>Duration: {pooja.duration}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Complete Samagri Included</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md h-80 bg-stone-100">
            <img
              src={pooja.featuredImage || 'https://images.unsplash.com/photo-1609800078028-c124e4d6cdd1?auto=format&fit=crop&w=1200&q=80'}
              alt={pooja.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detailed Description */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-100 pb-2">
              Spiritual Significance & Overview
            </h2>
            <div className="text-stone-700 text-sm leading-relaxed whitespace-pre-line space-y-3">
              {pooja.description || pooja.shortDescription}
            </div>
          </div>

          {/* What We Offer */}
          {pooja.whatWeOffer && pooja.whatWeOffer.length > 0 && (
            <div className="bg-amber-50/60 p-6 sm:p-8 rounded-2xl border border-amber-200/80 space-y-4">
              <h2 className="text-xl font-serif font-bold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-700" />
                <span>What We Provide in This Service</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-800">
                {pooja.whatWeOffer.map((offer, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{offer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Traditional Benefits */}
          {pooja.benefits && pooja.benefits.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Traditional Astrological & Scriptural Benefits
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {pooja.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Flame className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preparation & Vidhi */}
          {pooja.preparation && pooja.preparation.length > 0 && (
            <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Preparation for Devotees</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-stone-600">
                {pooja.preparation.map((prep, idx) => (
                  <li key={idx}>{prep}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Right Sticky Booking Card */}
        <div className="lg:sticky lg:top-24 space-y-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-xl space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-amber-800">
                Vedic Booking Assistance
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                Reserve Your Vidhi
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Gotra sankalp reservation with authentic Ujjain Pandits.
              </p>
            </div>

            <div className="space-y-3 text-xs text-stone-700 bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
              <div className="flex items-center justify-between">
                <span>Temple Location:</span>
                <span className="font-semibold text-stone-900">{pooja.templeName || pooja.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pandit Dakshina & Samagri:</span>
                <span className="font-semibold text-emerald-800">Included</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Customization:</span>
                <span className="font-semibold text-stone-900">Available</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('Pooja', pooja.name)}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-800 via-amber-800 to-amber-900 text-white font-medium text-sm hover:from-red-900 hover:to-amber-950 shadow-md shadow-amber-900/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book / Enquire for {pooja.name}</span>
            </button>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Jai Shree Mahakal 🙏 I want to enquire about ${pooja.name} in Ujjain.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-xl bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct Enquiry</span>
            </a>

            <div className="pt-2 text-center text-xs text-stone-500 space-y-1">
              <div>Need immediate assistance?</div>
              <a href={`tel:${settings.phone1}`} className="font-mono font-bold text-amber-800 hover:underline">
                Call {settings.phone1}
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="pt-8 border-t border-stone-200">
          <FAQAccordion faqs={faqs} title={`Frequently Asked Questions about Pooja Services`} />
        </section>
      )}

      {/* Related Poojas */}
      {relatedPoojas.length > 0 && (
        <section className="pt-8 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Related Vedic Rituals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPoojas.map((p) => (
              <PoojaCard key={p.id} pooja={p} onBook={(name) => onOpenBooking('Pooja', name)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
