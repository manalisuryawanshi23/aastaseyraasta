import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ContentService } from '../services/contentService';
import { StoreService } from '../services/store';

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  showCategoryTabs?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  title,
  subtitle,
  showCategoryTabs = true,
}) => {
  const { language, t, localize } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const settings = StoreService.getSettings();

  const enrichedFaqs = useMemo(() => {
    return ContentService.enrichFAQs(faqs, language);
  }, [faqs, language]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(enrichedFaqs.map((f) => f.category))).filter(Boolean);
    return unique;
  }, [enrichedFaqs]);

  const filteredFaqs = useMemo(() => {
    if (!showCategoryTabs || selectedCategory === 'all') {
      return enrichedFaqs;
    }
    return enrichedFaqs.filter((f) => f.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [enrichedFaqs, selectedCategory, showCategoryTabs]);

  const displayTitle = title || t('faq.title', 'Frequently Asked Questions');
  const displaySubtitle = subtitle || t('faq.subtitle', 'Find direct answers regarding Vedic Vidhi, booking procedures, gotra sankalp, and tour arrangements.');

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'pooja':
        return t('faq.pooja', 'Pooja & Rituals');
      case 'tour':
        return t('faq.tour', 'Tours & Yatra');
      case 'general':
        return t('faq.general', 'General & Booking');
      default:
        return cat;
    }
  };

  const whatsappMessage = encodeURIComponent(
    language === 'hi'
      ? `जय श्री महाकाल! मुझे आस्था से रास्ता सेवा के संबंध में जानकारी व मार्गदर्शन चाहिए।`
      : `Jai Shree Mahakal! I would like more information and guidance regarding Aastha Sey Raasta Seva.`
  );

  return (
    <div id="faq-section" className="w-full space-y-6">
      {(displayTitle || displaySubtitle) && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold tracking-wide border border-amber-200 dark:border-amber-800/50">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>{t('faq.badge', 'Spiritual Guidance & FAQs')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
            {displayTitle}
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
            {displaySubtitle}
          </p>
        </div>
      )}

      {/* Category Filter Pills (if multiple categories and tabs enabled) */}
      {showCategoryTabs && categories.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto pt-1">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setOpenIndex(0);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-stone-700'
            }`}
          >
            {t('faq.all', 'All Questions')} ({enrichedFaqs.length})
          </button>
          {categories.map((cat) => {
            const count = enrichedFaqs.filter((f) => f.category.toLowerCase() === cat.toLowerCase()).length;
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-stone-700'
                }`}
              >
                {getCategoryLabel(cat)} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* FAQ Accordion List */}
      <div className="max-w-3xl mx-auto divide-y divide-stone-200 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1C1917] rounded-2xl shadow-sm overflow-hidden">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-sm text-stone-500">
            {t('faq.no_results', 'No questions found in this category.')}
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const questionText = localize(faq, 'question', 'hindiQuestion');
            const answerText = localize(faq, 'answer', 'hindiAnswer');

            return (
              <div key={faq.id} className="transition-colors">
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-amber-50/50 dark:hover:bg-stone-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-expanded={isOpen}
                  aria-controls={`faq-body-${faq.id}`}
                >
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base pr-2 leading-snug">
                    {questionText}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-body-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="px-4 sm:px-5 pb-5 pt-2 text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-stone-100 dark:border-stone-800/80 bg-amber-50/30 dark:bg-stone-900/60"
                  >
                    {answerText}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* WhatsApp Assistance Banner */}
      <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950/30 dark:to-amber-950/20 border border-emerald-200/80 dark:border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
            {t('faq.ask_more', 'Have a specific query about your Gotra, Muhurat, or Travel?')}
          </div>
          <div className="text-stone-600 dark:text-stone-400 text-xs">
            {t('faq.ask_more_sub', 'Our Vedic Acharyas and pilgrimage coordinators are available 24/7 on WhatsApp.')}
          </div>
        </div>
        <a
          href={`https://wa.me/${(settings.whatsappNumber || '919111099799').replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm shadow-sm transition-all shrink-0 hover:scale-[1.02]"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t('faq.whatsapp_btn', 'Ask on WhatsApp')}</span>
        </a>
      </div>
    </div>
  );
};
