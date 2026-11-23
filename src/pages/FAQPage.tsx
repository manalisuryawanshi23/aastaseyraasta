import React, { useState, useMemo } from 'react';
import { StoreService } from '../services/store';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FadeIn } from '../components/FadeIn';
import { buildFAQSchema, buildBreadcrumbSchema } from '../utils/seoSchemas';
import { renderFormattedText } from '../utils/formatText';
import { useLanguage } from '../context/LanguageContext';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Flame,
  Compass,
  CreditCard,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

interface FAQPageProps {
  onOpenBooking?: (type?: 'Pooja' | 'Tour' | 'General', name?: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenBooking }) => {
  const { language, t } = useLanguage();
  const settings = StoreService.getSettings();
  const faqs = StoreService.getFAQs();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0, 1]));

  const categories = [
    { id: 'All', label: language === 'hi' ? 'सभी प्रश्न' : 'All FAQs', icon: Sparkles },
    { id: 'Pooja', label: language === 'hi' ? 'पूजा व अनुष्ठान' : 'Pooja & Rituals', icon: Flame },
    { id: 'Tour', label: language === 'hi' ? 'तीर्थ यात्रा पैकेज' : 'Spiritual Tours', icon: Compass },
    { id: 'General', label: language === 'hi' ? 'सामान्य व दक्षिणा' : 'General & Payment', icon: CreditCard },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
      const matchesSearch =
        !searchTerm.trim() ||
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, activeCategory, searchTerm]);

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const faqSchema = buildFAQSchema(
    filteredFaqs.slice(0, 15).map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 min-h-[75vh]">
      <SEOHead
        title="Vedic Pooja & Pilgrimage FAQ | Questions & Answers | Aastha Sey Raasta"
        description="Find verified answers to frequently asked questions about Mahakaleshwar Rudrabhishek, Mangalnath Bhat Pooja, Kaal Sarp Dosh Shanti, Pandit Gotra Sankalp, and Ujjain spiritual tours."
        keywords="Ujjain Pooja FAQ, Mahakaleshwar Rudrabhishek Rules, Bhat Pooja Questions, Kaal Sarp Dosh Pooja FAQs, Ujjain Tour Questions"
        canonicalUrl="https://aasthasaysrasta.com/faq"
        ogImage="/assets/images/header_bg_spiritual_1786196057015.jpg"
        ogImageAlt="Frequently Asked Questions - Aastha Sey Raasta Seva"
        jsonLd={[faqSchema, breadcrumbSchema]}
      />

      <Breadcrumbs items={[{ label: language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FAQ & Knowledge Base' }]} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-900/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest border border-amber-500/30">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'पूजा व यात्रा संशय निवारण' : 'Devotee Help Center'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight">
            {language === 'hi'
              ? 'अक्सर पूछे जाने वाले प्रश्न एवं मार्गदर्शन'
              : 'Frequently Asked Questions & Guidelines'}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? 'उज्जैन महाकालेश्वर, मंगलनाथ, कालसर्प दोष, मां बगलामुखी हवन एवं तीर्थ यात्राओं से संबंधित शास्त्रोक्त नियम, सामग्री, समय एवं संकल्प प्रक्रिया की संपूर्ण जानकारी।'
              : 'Detailed answers to all your queries regarding Vedic pooja procedures, gotra sankalp, auspicious mahurats, temple guidelines, samagri offerings, and private yatra logistics in Ujjain and Madhya Pradesh.'}
          </p>
        </div>
      </div>

      {/* Search & Category Pills */}
      <FadeIn direction="up">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'प्रश्न या कीवर्ड खोजें (उदा. रुद्राभिषेक, दक्षिणा, भात पूजा, समय)...'
                  : 'Search FAQ by keyword (e.g. Rudrabhishek, Samagri, Sankalp, Timing)...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((c) => {
              const Icon = c.icon;
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-800 text-white shadow-md'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1C1917] rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
            <HelpCircle className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-200">
              {language === 'hi' ? 'कोई प्रश्न नहीं मिला' : 'No matching questions found'}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'hi' ? 'कृपया अन्य कीवर्ड से खोजें या सीधे संपर्क करें।' : 'Try adjusting your search terms or contact our helpline directly.'}
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndices.has(idx);
            return (
              <div
                key={faq.id || idx}
                className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-amber-50/50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <span className="font-serif font-bold text-stone-900 dark:text-amber-100 text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-amber-800 text-white dark:bg-amber-800' : 'text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-stone-100 dark:border-stone-800/60 pt-3">
                    <p>{renderFormattedText(faq.answer)}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still have questions CTA */}
      <div className="bg-amber-50 dark:bg-[#1A1614] rounded-3xl p-8 border border-amber-200 dark:border-amber-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-200">
            {language === 'hi' ? 'क्या आपका कोई अन्य प्रश्न है?' : 'Still Have Questions?'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            {language === 'hi'
              ? 'हमारे वेदपाठी आचार्य एवं यात्रा समन्वयक आपकी सहायता के लिए सदैव उपलब्ध हैं।'
              : 'Our Vedic Pandits and Yatra coordinators are available 24/7 to guide you through ritual requirements and gotra sankalp.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Namaste, I have a question regarding Vedic Pooja / Spiritual Tour.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{language === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Ask on WhatsApp'}</span>
          </a>
          <a
            href={`tel:${settings.phone1}`}
            className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-bold flex items-center gap-2 border border-amber-800/40 transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>{language === 'hi' ? 'हेल्पलाइन कॉल करें' : 'Call Helpline'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
