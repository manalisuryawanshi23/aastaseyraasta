import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQ } from '../types';

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Find direct answers regarding VedicVidhi, booking procedures, gotra sankalp, and tour arrangements.',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full space-y-6">
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-200 dark:border-amber-800/50">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>Spiritual Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
            {title}
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-1">
            {subtitle}
          </p>
        </div>
      )}

      <div className="max-w-3xl mx-auto divide-y divide-stone-200 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1C1917] rounded-2xl shadow-sm overflow-hidden">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.id} className="transition-colors">
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-amber-50/50 dark:hover:bg-stone-800/50 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base pr-2">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 pt-1 text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-stone-100 dark:border-stone-800/80 bg-amber-50/30 dark:bg-stone-900/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
