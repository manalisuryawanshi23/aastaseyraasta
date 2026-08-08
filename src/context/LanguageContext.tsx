import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar & Common
    'nav.home': 'Home',
    'nav.pooja': 'Pooja Services',
    'nav.tours': 'Spiritual Tours',
    'nav.destinations': 'Destinations',
    'nav.about': 'About Us',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.book': 'Book / Enquire',
    'nav.search': 'Search',
    'nav.tagline_location': 'Mahakal Marg, Ujjain',
    'nav.admin': 'Admin CMS',

    // Language selector labels
    'lang.english': 'English',
    'lang.hindi': 'हिंदी (Hindi)',

    // Actions
    'action.book_now': 'Book Now',
    'action.enquire': 'Enquire',
    'action.view_details': 'View Vidhi Details',
    'action.view_itinerary': 'View Itinerary',
    'action.explore': 'Explore Guide',
    'action.whatsapp': 'WhatsApp Chat',
    'action.call_us': 'Call Us',
    'action.search': 'Search Services',

    // Hero Section
    'hero.badge': 'Official Vedic Seva Center in Ujjain',
    'hero.title': 'Authentic Vedic Poojas & Pilgrimage Tours in Sacred Ujjain',
    'hero.subtitle': 'Perform Sacred Rudrabhishek, Bhat Pooja, Baglamukhi Havan & Kshipra Aarti with Dedicated Vedic Brahmins.',

    // Section Titles
    'featured.poojas': 'Featured Vedic Poojas',
    'featured.tours': 'Popular Spiritual Tours',
    'featured.destinations': 'Sacred Pilgrimage Destinations',

    // Booking Modal
    'modal.title': 'Book Authentic Pooja & Yatra',
    'modal.subtitle': 'Fill details below for personalized gotra sankalp & ritual arrangements',
    'form.name': 'Your Full Name',
    'form.phone': 'WhatsApp / Mobile Number',
    'form.date': 'Preferred Date',
    'form.gotra': 'Gotra (Optional)',
    'form.members': 'Number of Devotees',
    'form.notes': 'Special Notes / Requirements',
    'form.submit': 'Confirm & Request Booking',
  },
  hi: {
    // Navbar & Common
    'nav.home': 'मुख्य पृष्ठ',
    'nav.pooja': 'पूजा सेवाएं',
    'nav.tours': 'आध्यात्मिक यात्राएं',
    'nav.destinations': 'तीर्थ स्थल',
    'nav.about': 'हमारे बारे में',
    'nav.blog': 'ब्लॉग',
    'nav.contact': 'संपर्क करें',
    'nav.book': 'पूजा / यात्रा बुक करें',
    'nav.search': 'खोजें',
    'nav.tagline_location': 'महाकाल मार्ग, उज्जैन',
    'nav.admin': 'प्रबंधक क्षेत्र',

    // Language selector labels
    'lang.english': 'English',
    'lang.hindi': 'हिंदी (Hindi)',

    // Actions
    'action.book_now': 'अभी बुक करें',
    'action.enquire': 'पूछताछ करें',
    'action.view_details': 'विधि विवरण देखें',
    'action.view_itinerary': 'यात्रा विवरण देखें',
    'action.explore': 'दर्शनीय स्थल देखें',
    'action.whatsapp': 'व्हाट्सएप चैट',
    'action.call_us': 'कॉल करें',
    'action.search': 'सेवाएं खोजें',

    // Hero Section
    'hero.badge': 'उज्जैन में अधिकृत वैदिक सेवा केंद्र',
    'hero.title': 'पवित्र उज्जैन में प्रामाणिक वैदिक पूजा एवं तीर्थ यात्राएं',
    'hero.subtitle': 'अनुभवी वैदिक ब्राह्मणों द्वारा कालसर्प, भात पूजा, रुद्राभिषेक एवं मंगल दोष निवारण का विशेष अनुष्ठान।',

    // Section Titles
    'featured.poojas': 'प्रमुख वैदिक पूजा सेवाएं',
    'featured.tours': 'लोकप्रिय आध्यात्मिक यात्राएं',
    'featured.destinations': 'पवित्र तीर्थ स्थल',

    // Booking Modal
    'modal.title': 'प्रामाणिक पूजा एवं यात्रा बुक करें',
    'modal.subtitle': 'व्यक्तिगत गोत्र संकल्प एवं अनुष्ठान व्यवस्था हेतु विवरण भरें',
    'form.name': 'आपका पूरा नाम',
    'form.phone': 'व्हाट्सएप / मोबाइल नंबर',
    'form.date': 'वांछित तिथि',
    'form.gotra': 'गोत्र (वैकल्पिक)',
    'form.members': 'श्रद्धालुओं की संख्या',
    'form.notes': 'विशेष विवरण / आवश्यकताएं',
    'form.submit': 'बुकिंग अनुरोध भेजें',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aastha_lang');
      if (saved === 'hi' || saved === 'en') return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aastha_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    return translations[language]?.[key] || defaultText || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
