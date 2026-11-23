import React, { useState } from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { generateBlogTitle } from '../utils/seoTitles';
import { BlogCard } from '../components/BlogCard';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { FadeIn } from '../components/FadeIn';
import { useLanguage } from '../context/LanguageContext';
import {
  Clock,
  User,
  Calendar,
  Tag,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Compass,
  Users,
  ShieldCheck,
} from 'lucide-react';

import {
  buildBlogSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '../utils/seoSchemas';
import { renderFormattedText } from '../utils/formatText';

interface BlogDetailPageProps {
  slug: string;
}

// Lightweight, robust markdown renderer for blog content
const renderBlogMarkdown = (text: string, isDark: boolean, hasStructuredFaq = false): React.ReactNode[] => {
  if (!text) return [];
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let orderedListBuffer: string[] = [];
  let tableBuffer: string[] = [];
  let inFaqSection = false;

  const formatInline = (s: string, dark: boolean) => {
    return s
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        `<a href="$2" class="underline decoration-amber-600 dark:decoration-amber-400 decoration-1 underline-offset-2 font-semibold text-amber-800 hover:text-amber-950 dark:text-amber-300 dark:hover:text-amber-100 transition-colors">$1</a>`
      )
      .replace(
        /\*\*(.+?)\*\*/g,
        `<strong class="font-semibold ${dark ? 'text-amber-200' : 'text-stone-900'}">$1</strong>`
      )
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(
        /`(.+?)`/g,
        `<code class="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-mono text-xs">$1</code>`
      );
  };

  const flushList = (key: string) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={key} className="space-y-2 my-4 ml-1">
          {listBuffer.map((item, i) => (
            <li key={i} className={`flex items-start gap-2.5 text-sm sm:text-base leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
              <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${isDark ? 'bg-amber-400' : 'bg-amber-600'}`} />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item, isDark) }} />
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const flushOrderedList = (key: string) => {
    if (orderedListBuffer.length > 0) {
      elements.push(
        <ol key={key} className="space-y-2 my-4 ml-1">
          {orderedListBuffer.map((item, i) => (
            <li key={i} className={`flex items-start gap-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
              <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold font-mono flex items-center justify-center border border-amber-300 dark:border-amber-700/60">
                {i + 1}
              </span>
              <span className="flex-1 pt-0.5" dangerouslySetInnerHTML={{ __html: formatInline(item, isDark) }} />
            </li>
          ))}
        </ol>
      );
      orderedListBuffer = [];
    }
  };

  const flushTable = (key: string) => {
    if (tableBuffer.length > 0) {
      const rows = tableBuffer
        .filter((r) => !/^\|?\s*[-:]+[-| :]*\s*\|?$/.test(r.trim()))
        .map((r) =>
          r
            .split('|')
            .map((c) => c.trim())
            .filter((c, idx, arr) => (idx !== 0 && idx !== arr.length - 1) || c !== '')
        );

      if (rows.length > 0) {
        const header = rows[0];
        const body = rows.slice(1);
        elements.push(
          <div key={key} className="overflow-x-auto my-6 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-amber-50/70 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
                  {header.map((col, idx) => (
                    <th key={idx} className="p-3 font-semibold text-stone-900 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: formatInline(col, isDark) }} />
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150 dark:divide-stone-800">
                {body.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white dark:bg-stone-950/40' : 'bg-stone-50/50 dark:bg-stone-900/40'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-stone-700 dark:text-stone-300" dangerouslySetInnerHTML={{ __html: formatInline(cell, isDark) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableBuffer = [];
    }
  };

  const flushAll = (key: string) => {
    flushList(`${key}-ul`);
    flushOrderedList(`${key}-ol`);
    flushTable(`${key}-tbl`);
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trimEnd();

    // Skip markdown FAQ section if structured accordion FAQs exist below
    if (hasStructuredFaq) {
      if (/^##\s*(Frequently Asked Questions|FAQ|अक्सर पूछे जाने वाले प्रश्न)/i.test(line)) {
        flushAll(`fl-${idx}`);
        inFaqSection = true;
        return;
      }
      if (inFaqSection) {
        if (/^##\s+[^#]/.test(line) && !/Frequently Asked Questions|FAQ|अक्सर पूछे जाने वाले प्रश्न/i.test(line)) {
          inFaqSection = false;
        } else {
          return;
        }
      }
    }

    // Table rows
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushList(`fl-${idx}`);
      flushOrderedList(`fl-${idx}`);
      tableBuffer.push(line.trim());
      return;
    } else if (tableBuffer.length > 0) {
      flushTable(`tbl-${idx}`);
    }

    // Horizontal divider
    if (/^---+\$/.test(line) || line.trim() === '---') {
      flushAll(`fl-${idx}`);
      elements.push(
        <hr key={idx} className={`border-t my-6 ${isDark ? 'border-stone-800' : 'border-amber-200/70'}`} />
      );
      return;
    }

    // Blockquote
    if (/^>\s*(.+)/.test(line)) {
      flushAll(`fl-${idx}`);
      const quoteText = line.replace(/^>\s*/, '');
      elements.push(
        <blockquote
          key={idx}
          className="border-l-4 border-amber-600 bg-amber-50/70 dark:bg-amber-950/30 p-4 sm:p-5 rounded-r-2xl my-5 text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed italic shadow-xs"
        >
          <div dangerouslySetInnerHTML={{ __html: formatInline(quoteText, isDark) }} />
        </blockquote>
      );
      return;
    }

    // Heading 4
    if (/^#### (.+)/.test(line)) {
      flushAll(`fl-${idx}`);
      const content = line.replace(/^#### /, '');
      elements.push(
        <h4
          key={idx}
          className="text-base sm:text-lg font-serif font-bold mt-5 mb-2 text-stone-900 dark:text-amber-200"
          dangerouslySetInnerHTML={{ __html: formatInline(content, isDark) }}
        />
      );
      return;
    }

    // Heading 3
    if (/^### (.+)/.test(line)) {
      flushAll(`fl-${idx}`);
      const content = line.replace(/^### /, '');
      elements.push(
        <h3
          key={idx}
          className="text-lg sm:text-xl font-serif font-bold mt-7 mb-2 text-stone-900 dark:text-amber-100"
          dangerouslySetInnerHTML={{ __html: formatInline(content, isDark) }}
        />
      );
      return;
    }

    // Heading 2
    if (/^## (.+)/.test(line)) {
      flushAll(`fl-${idx}`);
      const content = line.replace(/^## /, '');
      elements.push(
        <h2
          key={idx}
          className="text-xl sm:text-2xl font-serif italic font-bold pt-6 pb-2 border-b border-amber-900/10 dark:border-stone-800 mt-8 mb-4 text-stone-900 dark:text-amber-100 flex items-center gap-2"
          dangerouslySetInnerHTML={{ __html: formatInline(content, isDark) }}
        />
      );
      return;
    }

    // Heading 1
    if (/^# (.+)/.test(line)) {
      flushAll(`fl-${idx}`);
      const content = line.replace(/^# /, '');
      elements.push(
        <h2
          key={idx}
          className="text-2xl sm:text-3xl font-serif italic font-bold pt-4 pb-2 border-b border-amber-900/10 dark:border-stone-800 mt-6 mb-4 text-stone-900 dark:text-amber-100"
          dangerouslySetInnerHTML={{ __html: formatInline(content, isDark) }}
        />
      );
      return;
    }

    // Numbered list
    if (/^\d+\.\s+(.+)/.test(line)) {
      flushList(`fl-${idx}`);
      flushTable(`fl-${idx}`);
      const content = line.replace(/^\d+\.\s+/, '');
      orderedListBuffer.push(content);
      return;
    }

    // Bulleted list
    if (/^[*-]\s+(.+)/.test(line)) {
      flushOrderedList(`fl-${idx}`);
      flushTable(`fl-${idx}`);
      const content = line.replace(/^[*-]\s+/, '');
      listBuffer.push(content);
      return;
    }

    // Empty line
    if (line.trim() === '') {
      flushAll(`fl-${idx}`);
      return;
    }

    // Regular paragraph
    flushAll(`fl-${idx}`);
    elements.push(
      <p
        key={idx}
        className={`leading-relaxed text-sm sm:text-base mb-4 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}
        dangerouslySetInnerHTML={{ __html: formatInline(line, isDark) }}
      />
    );
  });

  flushAll('fl-end');
  return elements;
};

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug }) => {
  const { language, t, localize } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [syncTick, setSyncTick] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setSyncTick((n) => n + 1);
    window.addEventListener('aastha:data-synced', handler);
    return () => window.removeEventListener('aastha:data-synced', handler);
  }, []);

  const post = StoreService.getBlogPostBySlug(slug);
  const settings = StoreService.getSettings();
  const whatsappNum = settings?.whatsappNumber || '919111099799';
  const phoneNum = settings?.phone1 || '+91 9111099799';

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif italic font-bold text-stone-900 dark:text-stone-100">
          {language === 'hi' ? 'लेख उपलब्ध नहीं है' : 'Article Not Found'}
        </h1>
        <a href="/blog" className="inline-block px-6 py-2.5 rounded-xl bg-[#121212] dark:bg-stone-800 text-white font-medium text-xs">
          {t('action.back_to_blog', 'Back to Blog Directory')}
        </a>
      </div>
    );
  }

  const postTitle = localize(post, 'title', 'hindiTitle');
  const postExcerpt = localize(post, 'excerpt', 'hindiExcerpt');
  const postCategory = localize(post, 'category', 'hindiCategory') || (language === 'hi' ? 'वैदिक ज्ञान' : 'Spiritual Guide');
  const postAuthor = localize(post, 'author', 'hindiAuthor') || post.author;
  const postReadingTime = localize(post, 'readingTime', 'hindiReadingTime') || (language === 'hi' ? '5 मिनट पठन' : '5 min read');
  const postContent = localize(post, 'content', 'hindiContent') || post.content;

  const allPosts = StoreService.getBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const articleSchema = buildBlogSchema(post);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const faqSchema =
    post.aeoQuestions && post.aeoQuestions.length > 0
      ? buildFAQSchema(post.aeoQuestions)
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 relative">
      <ReadingProgressBar />

      <SEOHead
        title={generateBlogTitle(post)}
        description={post.metaDescription || post.excerpt}
        keywords={
          post.focusKeyword
            ? `${post.focusKeyword}, ${post.secondaryKeywords?.join(', ') || ''}, ${post.title}, Ujjain Spiritual Blog`
            : `${post.title}, Ujjain Poojas, Vedic Rituals Guide`
        }
        canonicalUrl={post.canonicalUrl || `https://aasthasaysrasta.com/blog/${post.slug}`}
        ogImage={post.featuredImage}
        ogImageAlt={post.title}
        ogType="article"
        jsonLd={[articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]}
      />

      <Breadcrumbs
        items={[
          { label: t('nav.blog', 'Blog'), href: '/blog' },
          { label: postTitle },
        ]}
      />

      {/* Header */}
      <FadeIn direction="up">
        <div className="space-y-4 border-b border-[#121212]/10 dark:border-stone-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-[10px] font-bold uppercase tracking-widest border border-amber-300 dark:border-amber-700/60">
              <Tag className="w-3 h-3 text-amber-700 dark:text-amber-400" />
              <span>{postCategory}</span>
            </div>
            {post.geoCity && (
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-medium border border-stone-200 dark:border-stone-700">
                <MapPin className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
                <span>{post.geoCity}</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif italic font-bold text-stone-900 dark:text-amber-100 leading-tight">
            {postTitle}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
              <span>{postAuthor}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
              <span>{post.publishedAt ? post.publishedAt.split('T')[0] : 'Recent'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
              <span>{postReadingTime}</span>
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Featured Image */}
      <FadeIn delay={100} direction="up">
        <div className="rounded-2xl overflow-hidden border border-[#121212]/10 dark:border-stone-800 shadow-sm h-80 sm:h-96 bg-[#E8E4DF] dark:bg-stone-900">
          <img
            src={post.featuredImage || '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg'}
            alt={postTitle}
            loading="eager"
            decoding="async"
            {...({ fetchPriority: 'high' } as any)}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg';
            }}
            className="w-full h-full object-cover"
          />
        </div>
      </FadeIn>

      {/* AEO Quick Answer Box */}
      {post.quickAnswer && (
        <FadeIn delay={120} direction="up">
          <div className="p-6 rounded-2xl bg-linear-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/40 dark:to-stone-900 border-2 border-amber-300/80 dark:border-amber-700/50 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{language === 'hi' ? 'त्वरित उत्तर (AEO सारांश)' : 'Quick Answer (AEO Summary)'}</span>
            </div>
            <p className="text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed font-serif">
              {post.quickAnswer}
            </p>
          </div>
        </FadeIn>
      )}

      {/* Key Takeaways Box */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <FadeIn delay={140} direction="up">
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-amber-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'hi' ? 'मुख्य बिंदु (Key Takeaways)' : 'Key Takeaways'}</span>
            </h3>
            <ul className="grid grid-cols-1 gap-2.5">
              {post.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      )}

      {/* Main Content */}
      <FadeIn delay={150} direction="up">
        <article className="bg-white dark:bg-[#1C1917] p-6 sm:p-10 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-xs font-serif">
          {renderBlogMarkdown(postContent, false, !!(post.aeoQuestions && post.aeoQuestions.length > 0))}
        </article>
      </FadeIn>

      {/* Interactive FAQ Accordion */}
      {post.aeoQuestions && post.aeoQuestions.length > 0 && (
        <FadeIn delay={180} direction="up">
          <section className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-150 dark:border-stone-800">
              <HelpCircle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-serif italic font-bold text-stone-900 dark:text-amber-100">
                {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
              </h2>
            </div>
            <div className="space-y-3 pt-2">
              {post.aeoQuestions.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 bg-stone-50/50 hover:bg-stone-50 dark:bg-stone-900/40 dark:hover:bg-stone-900 transition-colors"
                    >
                      <span className="font-semibold text-sm sm:text-base text-stone-900 dark:text-amber-100">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-2 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed bg-white dark:bg-stone-950/40 font-serif border-t border-stone-100 dark:border-stone-800">
                        {renderFormattedText(faq.answer)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Verified Vedic Pooja & Yatra CTA Card */}
      <FadeIn delay={190} direction="up">
        <div className="rounded-2xl p-6 sm:p-8 bg-linear-to-r from-stone-900 via-stone-850 to-amber-950 text-white shadow-lg space-y-4">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-widest border border-amber-400/30 inline-block">
              Aastha Sey Raasta Seva
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-amber-100">
              {language === 'hi' ? 'अपनी पूजा एवं तीर्थ यात्रा योजना हेतु विशेषज्ञ मार्गदर्शन प्राप्त करें' : 'Get Expert Guidance for Your Pooja & Yatra Planning'}
            </h3>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-serif">
              {language === 'hi'
                ? 'महाकालेश्वर मंदिर, रामघाट, मंगलनाथ एवं सिद्धवट में अनुभवी पंडितों द्वारा संपूर्ण वैदिक पद्धति से पूजा संकल्प, भस्म आरती सहयोग एवं वातानुकूलित वाहन यात्रा पैकेज उपलब्ध हैं।'
                : 'Experience authentic Gotra Sankalp, certified Vedic Priests at Mahakaleshwar, Ramghat, Mangalnath & Siddhvat, complete with VIP darshan assistance and sanitized private transport.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Namaste, I read your article "${post.title}" and would like to consult with an Acharya regarding pooja and tour booking.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'Chat on WhatsApp'}</span>
            </a>
            <a
              href={`tel:${phoneNum.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{language === 'hi' ? 'कॉल एवं पूछताछ' : 'Call & Enquiry'}</span>
            </a>
            <a
              href="/pooja-services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>{language === 'hi' ? 'सभी पूजा सेवाएं' : 'View All Poojas'}</span>
            </a>
          </div>
        </div>
      </FadeIn>

      {/* Verified Editorial Team Card */}
      <FadeIn delay={195} direction="up">
        <div className="bg-amber-50/70 dark:bg-stone-900/60 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 dark:bg-amber-500/25 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-600/30 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-serif font-bold text-stone-900 dark:text-amber-100 text-base">
                {language === 'hi' ? 'टीम आस्था से रास्ता सेवा' : 'Team Aastha Sey Raasta Seva'}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wide border border-emerald-300 dark:border-emerald-700/50">
                <ShieldCheck className="w-3 h-3" />
                {language === 'hi' ? 'सत्यापित वैदिक शोध दल' : 'Verified Editorial Team'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-350 leading-relaxed font-serif">
              {language === 'hi'
                ? 'यह लेख उज्जैन के अनुभवी वैदिक आचार्यों, तीर्थ पुरोहितों एवं धार्मिक शोधकर्ताओं द्वारा शास्त्रों (स्कंद पुराण, शिव पुराण, गरुड़ पुराण) के प्रमाणों के आधार पर संकलित एवं प्रमाणित किया गया है।'
                : 'Researched, authored, and fact-checked in consultation with certified hereditary Vedic Acharyas and pilgrimage scholars in Ujjain, referencing authentic Shastras (Skanda Purana, Shiva Purana, and Garuda Purana).'}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Social Media Sharing */}
      <FadeIn delay={200} direction="up">
        <SocialShareButtons
          title={postTitle}
          description={postExcerpt}
          category={postCategory}
        />
      </FadeIn>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pt-8 border-t border-[#121212]/10 dark:border-stone-800 space-y-6">
          <FadeIn direction="up">
            <h2 className="text-2xl font-serif italic font-bold text-stone-900 dark:text-amber-100">
              {language === 'hi' ? 'अन्य ज्ञानवर्धक लेख' : 'More Spiritual Articles'}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((p, index) => (
              <FadeIn key={p.id} delay={index * 100} direction="up">
                <BlogCard post={p} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
