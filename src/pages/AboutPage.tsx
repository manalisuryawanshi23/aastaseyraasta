import React from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Flame, Users, Award, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const settings = StoreService.getSettings();
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <SEOHead
        title="Vedic Brahmins & Pandit Seva Lineage in Ujjain"
        description="Learn about our lineage of Vedic Brahmins in Ujjain, authentic gotra sankalp pooja management, and dedicated pilgrimage arrangements."
        keywords="Vedic Pandits Ujjain, Gurukul Acharyas Mahakaleshwar, Aastha Sey Raasta Seva Foundation, Sanatan Dharma Seva"
        canonicalUrl="https://aasthaserasta.com/about-us"
        ogImage="/assets/images/header_bg_spiritual_1786196057015.jpg"
        ogImageAlt={`About ${settings.businessName} - Vedic Acharyas in Ujjain`}
      />

      <Breadcrumbs items={[{ label: t('nav.about', 'About Us') }]} />

      {/* Hero */}
      <div className="bg-[#121212] text-[#F9F8F6] rounded-2xl p-8 sm:p-14 relative overflow-hidden border border-[#121212]/20">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F1ED]/10 text-amber-300 text-xs font-semibold uppercase tracking-widest border border-amber-500/30">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{language === 'hi' ? 'पारंपरिक गुरुकुल परंपरा' : 'Traditional Gurukul Lineage'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif italic font-bold text-amber-100">
            {language === 'hi' ? `परिचय: ${settings.businessName}` : `About ${settings.businessName}`}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? `"${settings.hindiTagline || 'आस्था से बनता है रास्ता'}" — पवित्र अवंतिका नगरी (उज्जैन) की पावन भूमि पर स्थित, हम संपूर्ण भारत व विश्व भर के श्रद्धालुओं हेतु प्रामाणिक वैदिक पूजा, पारदर्शी तीर्थ यात्रा प्रबंधन एवं गोत्र संकल्प अनुष्ठान सेवा हेतु समर्पित हैं।`
              : `"${settings.tagline}" — Rooted in the sacred land of Avantika Puri (Ujjain), we are dedicated to preserving authentic Vedic rituals, transparent pilgrimage services, and gotra sankalp devotional offerings for devotees worldwide.`}
          </p>
        </div>
      </div>

      {/* Core Values / Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3F1ED] dark:bg-stone-800 text-amber-800 dark:text-amber-400 flex items-center justify-center font-serif font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
            {language === 'hi' ? 'शास्त्रोक्त प्रामाणिकता' : 'Vedic Authenticity'}
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
            {language === 'hi'
              ? 'गुरुकुल प्रशिक्षित विद्वान आचार्यों द्वारा पूर्ण वैदिक मंत्रोच्चार, शुद्ध सात्विक पूजन सामग्री एवं विधिपूर्वक अनुष्ठान संपन्न कराया जाता है।'
              : 'Conducted strictly according to Vedic scriptures by qualified Gurukul-trained Brahmins with authentic mantras and satvik samagri.'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3F1ED] dark:bg-stone-800 text-amber-800 dark:text-amber-400 flex items-center justify-center font-serif font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
            {language === 'hi' ? 'पारदर्शी एवं निष्ठावान' : 'Transparent & Ethical'}
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
            {language === 'hi'
              ? 'दक्षिणा, पूजन सामग्री, मंदिर समय एवं व्यवस्थाओं में पूर्ण स्पष्टता। कोई भ्रामक दावा या अतिरिक्त छुपा शुल्क नहीं।'
              : 'Clear guidelines on dakshina, samagri, temple timings, and venue arrangements with zero hidden promises or false claims.'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3F1ED] dark:bg-stone-800 text-amber-800 dark:text-amber-400 flex items-center justify-center font-serif font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
            {language === 'hi' ? 'भक्त सेवा समर्पण' : 'Devotee Care'}
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
            {language === 'hi'
              ? 'व्यक्तिगत गोत्र संकल्प, मंदिर दर्शन मार्गदर्शन, वातानुकूलित वाहन सुविधा एवं आरामदायक आवास व्यवस्था में पूर्ण सहयोग।'
              : 'Personalized gotra sankalp, temple queuing guidance, private AC transport, and comfortable lodging assistance.'}
          </p>
        </div>
      </div>

      {/* Detailed Narrative */}
      <div className="bg-[#F3F1ED] dark:bg-stone-900 p-8 sm:p-12 rounded-2xl border border-[#121212]/10 dark:border-stone-800 space-y-4">
        <h2 className="text-2xl font-serif italic font-bold text-stone-900 dark:text-amber-100">
          {language === 'hi' ? 'महाकाल नगरी उज्जैन में समर्पित भक्त सेवा' : 'Serving Devotees at Mahakal Nagari Ujjain'}
        </h2>
        <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
          {language === 'hi'
            ? 'उज्जैन अवंतिका क्षेत्र में स्थित ज्योतिर्लिंग श्री महाकालेश्वर, मंगलनाथ, काल भैरव, ओंकारेश्वर एवं माँ बगलामुखी के पावन धामों में शास्त्रोक्त पूजा, अनुष्ठान एवं तीर्थ दर्शन की सुलभ व्यवस्था।'
            : settings.footerDescription}
        </p>
        <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-stone-800 dark:text-stone-200">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>{language === 'hi' ? 'रामघाट व तीर्थों पर रुद्राभिषेक' : 'Rudrabhishek at Ramghat & Shrines'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>{language === 'hi' ? 'अंगारेश्वर व मंगलनाथ पर भात पूजा' : 'Bhat Pooja at Angareshwar & Mangalnath'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>{language === 'hi' ? 'नलखेड़ा में माँ बगलामुखी हवन' : 'Baglamukhi Havan at Nalkheda'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
