import React from 'react';
import {
  Flame,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Lock,
  Globe,
  BookOpen,
  Info,
  Compass,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { StoreService } from '../services/store';
import { useLanguage } from '../context/LanguageContext';
import { LocalBusinessSchema } from './LocalBusinessSchema';

export const Footer: React.FC = () => {
  const settings = StoreService.getSettings();
  const { language, setLanguage, t, translateText } = useLanguage();

  const poojaLinks = [
    {
      label: language === 'hi' ? 'रुद्राभिषेक पूजा' : 'Rudrabhishek Pooja',
      href: '/pooja/rudrabhishek-pooja-ujjain',
    },
    {
      label: language === 'hi' ? 'अंगारेश्वर भात पूजा' : 'Bhat Pooja (Angareshwar)',
      href: '/pooja/bhat-pooja-angareshwar-ujjain',
    },
    {
      label: language === 'hi' ? 'मंगलनाथ भात पूजा' : 'Bhat Pooja (Mangalnath)',
      href: '/pooja/bhat-pooja-mangalnath-ujjain',
    },
    {
      label: language === 'hi' ? 'महामृत्युंजय अनुष्ठान' : 'Mahamrityunjaya Jaap',
      href: '/pooja/mahamrityunjaya-jaap-ujjain',
    },
    {
      label: language === 'hi' ? 'मां बगलामुखी हवन' : 'Baglamukhi Havan (Nalkheda)',
      href: '/pooja/baglamukhi-havan-nalkheda',
    },
    {
      label: language === 'hi' ? 'पितृ दोष व नारायण बलि' : 'Pitru Dosh & Narayan Bali',
      href: '/pooja/pitru-dosh-shanti-narayan-bali-ujjain',
    },
    {
      label: language === 'hi' ? 'कालसर्प दोष शांति' : 'Kaal Sarp Dosh Shanti',
      href: '/pooja/kaal-sarp-dosh-shanti-ujjain',
    },
  ];

  const yatraLinks = [
    {
      label: language === 'hi' ? 'उज्जैन दर्शन यात्रा (1 दिन)' : 'Ujjain Spiritual Tour (1 Day)',
      href: '/spiritual-tours/ujjain-spiritual-tour',
    },
    {
      label: language === 'hi' ? 'उज्जैन + ओंकारेश्वर यात्रा (2 दिन)' : 'Ujjain + Omkareshwar Tour (2D)',
      href: '/spiritual-tours/ujjain-omkareshwar-tour',
    },
    {
      label: language === 'hi' ? 'उज्जैन + ओंकारेश्वर + इंदौर (3 दिन)' : 'Ujjain + Omkareshwar + Indore (3D)',
      href: '/spiritual-tours/ujjain-omkareshwar-indore-tour',
    },
    {
      label: language === 'hi' ? 'उज्जैन + बगलामुखी नलखेड़ा' : 'Ujjain + Baglamukhi Nalkheda',
      href: '/spiritual-tours/ujjain-baglamukhi-nalkheda-tour',
    },
    {
      label: language === 'hi' ? 'उत्तराखंड चार धाम यात्रा' : 'Char Dham Yatra Circuit',
      href: '/spiritual-tours/char-dham-yatra-uttarakhand',
    },
  ];

  const aboutAndCompanyLinks = [
    {
      label: language === 'hi' ? 'हमारी गुरुकुल परंपरा' : 'About Our Gurukul Lineage',
      href: '/about-us',
      icon: Info,
    },
    {
      label: language === 'hi' ? 'हमें क्यों चुनें' : 'Why Choose Our Pandits',
      href: '/why-choose-us',
      icon: ShieldCheck,
    },
    {
      label: language === 'hi' ? 'पूजा संबंधी नियम व प्रश्न' : 'Vedic Pooja FAQ & Rules',
      href: '/faq',
      icon: HelpCircle,
    },
    {
      label: language === 'hi' ? 'प्रमुख तीर्थ व मंदिर स्थल' : 'Ujjain Darshan Destinations',
      href: '/destinations',
      icon: MapPin,
    },
    {
      label: language === 'hi' ? 'संपर्क एवं कार्यालय' : 'Direct Helpline & Location',
      href: '/contact',
      icon: Phone,
    },
  ];

  const blogAndGuideLinks = [
    {
      label: language === 'hi' ? 'समस्त आध्यात्मिक लेख' : 'All Articles & Spiritual Guides',
      href: '/blog',
    },
    {
      label: language === 'hi' ? 'महाकाल भस्म आरती दर्शन गाइड' : 'Mahakaleshwar Bhasma Aarti Timings',
      href: '/blog/mahakal-bhasma-aarti-booking-guide',
    },
    {
      label: language === 'hi' ? 'मंगलनाथ भात पूजा विधि व लाभ' : 'Mangalnath Bhat Pooja Vidhi',
      href: '/blog/mangalnath-bhat-pooja-ujjain-guide',
    },
    {
      label: language === 'hi' ? 'कालसर्प दोष निवारण महत्व' : 'Kaal Sarp Dosh Nivaran Significance',
      href: '/blog/kaal-sarp-dosh-ujjain-complete-guide',
    },
    {
      label: language === 'hi' ? 'ओंकारेश्वर यात्रा यात्रा मार्गदर्शिका' : 'Omkareshwar Yatra Travel Guide',
      href: '/blog/omkareshwar-jyotirlinga-yatra-guide',
    },
  ];

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 sm:pt-16 pb-24 lg:pb-12 border-t border-amber-950/60 relative overflow-hidden">
      {/* Local Business JSON-LD Schema for GEO & Local SEO */}
      <LocalBusinessSchema />
      
      {/* Background Subtle Mandala Pattern Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          
          {/* Col 1: Brand & Direct Pandit Contact Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-800 via-amber-700 to-amber-900 text-amber-200 flex items-center justify-center shadow-lg shadow-amber-950/50 border border-amber-500/30">
                <Flame className="w-6 h-6 fill-amber-300 text-amber-300" />
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-amber-100 tracking-tight">
                  {settings.businessName}
                </div>
                <div className="text-xs font-serif text-amber-400">
                  {settings.hindiBusinessName} • &quot;{settings.tagline}&quot;
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {settings.footerDescription}
            </p>

            {/* Direct Contact Info Card */}
            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-amber-900/40 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-stone-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}, {settings.state} - {settings.pincode}</span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono">{[settings.phone1, settings.phone2].filter(Boolean).join(' / ') || 'Helpline Available'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>

            {/* Quick Action Contact Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'hi' ? 'पंडित जी से व्हाट्सएप पर बात करें' : 'WhatsApp Pandit Ji'}</span>
              </a>
              <a
                href="/contact"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-medium border border-stone-700 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'hi' ? 'संपर्क एवं पूछताछ' : 'Contact & Enquiries'}</span>
              </a>
            </div>

            {/* Active Social Handles */}
            {settings.socialHandles && settings.socialHandles.filter((h) => h.isActive).length > 0 && (
              <div className="pt-2 space-y-1.5">
                <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider font-serif">
                  {language === 'hi' ? 'सोशल मीडिया पर जुड़ें:' : 'Connect With Us:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {settings.socialHandles
                    .filter((h) => h.isActive)
                    .map((h) => (
                      <a
                        key={h.id}
                        href={h.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 text-[11px] font-medium border border-stone-800 transition-colors flex items-center gap-1.5"
                      >
                        <span>{h.platform}</span>
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Col 2: Sacred Vedic Poojas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3.5 font-serif flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'hi' ? 'वैदिक पूजा अनुष्ठान' : 'Vedic Poojas'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {poojaLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-amber-200 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a href="/pooja-services" className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2">
                  {language === 'hi' ? 'सभी 15+ पूजा सेवाएं देखें →' : 'View All 15+ Poojas →'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Spiritual Tours & Circuits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3.5 font-serif flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'hi' ? 'आध्यात्मिक यात्रा पैकेज' : 'Spiritual Tours'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {yatraLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-amber-200 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a href="/spiritual-tours" className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2">
                  {language === 'hi' ? 'सभी यात्रा पैकेज देखें →' : 'View All Tour Packages →'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: About, Blog & Contact Links */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3.5 font-serif flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'hi' ? 'परिचय एवं दर्शन मार्गदर्शिका' : 'About & Guidance'}</span>
              </h4>
              <ul className="space-y-2 text-xs">
                {aboutAndCompanyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-amber-200 transition-colors inline-flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-serif flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'hi' ? 'आध्यात्मिक ब्लॉग' : 'Spiritual Blog'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs">
                {blogAndGuideLinks.slice(0, 3).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-amber-200 transition-colors block text-[11px] text-stone-400 hover:text-stone-200 truncate"
                    >
                      • {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-0.5">
                  <a href="/blog" className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2">
                    {language === 'hi' ? 'समस्त आध्यात्मिक लेख पढ़ें →' : 'Read Spiritual Articles →'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Middle Banner: Trust Signals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-amber-950/30 border border-amber-900/40 text-center text-xs">
          <div className="space-y-1">
            <div className="font-bold text-amber-300">
              {language === 'hi' ? 'वेदपाठी प्रामाणिक ब्राह्मण' : 'Vedic Qualified Pandits'}
            </div>
            <div className="text-stone-400">
              {language === 'hi' ? 'पारंपरिक गुरुकुल वंशीय आचार्य' : 'Traditional Gurukul Lineage'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-amber-300">
              {language === 'hi' ? 'शुद्ध सात्विक सामग्री विधि' : 'Complete Samagri Vidhi'}
            </div>
            <div className="text-stone-400">
              {language === 'hi' ? 'शास्त्रोक्त पूजन द्रव्य' : 'Pure Satvik Offerings'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-amber-300">
              {language === 'hi' ? 'व्यक्तिगत गोत्र संकल्प' : 'Gotra Sankalp'}
            </div>
            <div className="text-stone-400">
              {language === 'hi' ? 'नाम व गोत्रोच्चार सहित' : 'Personalized Devotional Vow'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-amber-300">
              {language === 'hi' ? 'पारदर्शी व प्रामाणिक सेवा' : 'Transparent Service'}
            </div>
            <div className="text-stone-400">
              {language === 'hi' ? 'सटीक दक्षिणा व मार्गदर्शन' : 'No Hidden Promises'}
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span>
              © {new Date().getFullYear()} {language === 'hi' ? settings.hindiBusinessName : settings.businessName}. {language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'} &quot;{settings.tagline}&quot;
            </span>
            <div className="inline-flex items-center gap-1 bg-stone-900 border border-stone-800 p-1 rounded-lg text-[11px]">
              <Globe className="w-3.5 h-3.5 text-amber-500 ml-1" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded ${language === 'en' ? 'bg-amber-800 text-amber-100 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded font-serif ${language === 'hi' ? 'bg-amber-800 text-amber-100 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
              >
                हिंदी
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <a href="/about-us" className="hover:text-stone-300 transition-colors">
              {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
            </a>
            <a href="/blog" className="hover:text-stone-300 transition-colors">
              {language === 'hi' ? 'ब्लॉग' : 'Blog'}
            </a>
            <a href="/contact" className="hover:text-stone-300 transition-colors">
              {language === 'hi' ? 'संपर्क' : 'Contact'}
            </a>
            <a href="/site-map" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
              {language === 'hi' ? '🗺️ साइट मैप' : '🗺️ Site Map'}
            </a>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-stone-300 transition-colors">
              XML Sitemap
            </a>
            <a href="/privacy-policy" className="hover:text-stone-300 transition-colors">
              {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </a>
            <a href="/terms-and-conditions" className="hover:text-stone-300 transition-colors">
              {language === 'hi' ? 'नियम एवं शर्तें' : 'Terms & Conditions'}
            </a>
            <a href="/disclaimer" className="hover:text-stone-300 transition-colors">
              {language === 'hi' ? 'अस्वीकरण' : 'Disclaimer'}
            </a>
            <a href="/refund-cancellation-policy" className="hover:text-stone-300 transition-colors">
              {language === 'hi' ? 'रद्दीकरण नीति' : 'Cancellation Policy'}
            </a>
            <a href="/admin" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>{language === 'hi' ? 'एडमिन' : 'Admin'}</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
