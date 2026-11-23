import React from 'react';
import { StoreService } from '../services/store';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Testimonials } from '../components/Testimonials';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';
import { useLanguage } from '../context/LanguageContext';
import {
  Star,
  ShieldCheck,
  Heart,
  Users,
  Sparkles,
} from 'lucide-react';

interface TestimonialsPageProps {
  onOpenBooking?: (type?: 'Pooja' | 'Tour' | 'General', name?: string) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();
  const settings = StoreService.getSettings();
  const testimonials = StoreService.getTestimonials();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Testimonials', url: '/testimonials' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 min-h-[75vh]">
      <SEOHead
        title="Devotee Testimonials & Reviews | Verified Experiences | Aastha Sey Raasta"
        description="Read authentic, verified experiences and reviews from devotees across India who booked Mahakaleshwar Rudrabhishek, Bhat Pooja, Kaal Sarp Dosh Shanti, and Spiritual Yatras with Aastha Sey Raasta Seva."
        keywords="Ujjain Pooja Reviews, Mahakaleshwar Pandit Feedback, Bhat Pooja Experience, Devotee Testimonials Ujjain, Aastha Sey Raasta Reviews"
        canonicalUrl="https://aasthasaysrasta.com/testimonials"
        ogImage="/assets/images/header_bg_spiritual_1786196057015.jpg"
        ogImageAlt="Devotee Testimonials - Aastha Sey Raasta Seva"
        jsonLd={[breadcrumbSchema]}
      />

      <Breadcrumbs items={[{ label: language === 'hi' ? 'भक्तों के अनुभव एवं समीक्षाएं' : 'Devotee Testimonials' }]} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-900/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest border border-amber-500/30">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{language === 'hi' ? 'सत्यापित यजमान अनुभव' : 'Verified Devotee Experiences'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight">
            {language === 'hi'
              ? 'भक्तों की आस्था एवं प्रामाणिक अनुभव'
              : 'Devotee Faith & Authentic Experiences'}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? 'देश-विदेश से उज्जैन पधारे यजमानों एवं श्रद्धालुओं द्वारा साझा किए गए पूजा, संकल्प, पंडित जी के मार्गदर्शन एवं यात्रा व्यवस्थाओं के सच्चे अनुभव।'
              : 'Read real feedback from devotees across India and abroad who completed Vedic poojas, gotra sankalp rituals, and spiritual pilgrimages under our certified Gurukul Brahmins.'}
          </p>

          {/* Quick Rating Summary */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-xl border border-amber-500/30">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-amber-200">4.9 / 5.0 Rating</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Transparent & Authentic Sanatan Seva</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Core Section */}
      <Testimonials onOpenBooking={onOpenBooking} />
    </div>
  );
};
