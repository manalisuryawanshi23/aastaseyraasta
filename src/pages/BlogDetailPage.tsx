import React from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { BlogCard } from '../components/BlogCard';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { FadeIn } from '../components/FadeIn';
import { Clock, User, Calendar, Tag, ArrowLeft } from 'lucide-react';

interface BlogDetailPageProps {
  slug: string;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug }) => {
  const post = StoreService.getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif italic font-bold text-stone-900">Article Not Found</h1>
        <a href="/blog" className="inline-block px-6 py-2.5 rounded-xl bg-[#121212] text-white font-medium text-xs">
          Back to Blog Directory
        </a>
      </div>
    );
  }

  const allPosts = StoreService.getBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.publishedAt,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 relative">
      <ReadingProgressBar />

      <SEOHead
        title={post.seoTitle || `${post.title} | Aastha Sey Raasta Seva`}
        description={post.metaDescription || post.excerpt}
        focusKeyword={post.focusKeyword}
        canonicalUrl={post.canonicalUrl}
        jsonLd={schemaJsonLd}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Header */}
      <FadeIn direction="up">
        <div className="space-y-4 border-b border-[#121212]/10 dark:border-stone-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-[10px] font-bold uppercase tracking-widest border border-amber-300 dark:border-amber-700/60">
            <Tag className="w-3 h-3 text-amber-700 dark:text-amber-400" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif italic font-bold text-stone-900 dark:text-amber-100 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 font-mono">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
              <span>{post.publishedAt}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
              <span>{post.readingTime || '5 min read'}</span>
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Featured Image */}
      <FadeIn delay={100} direction="up">
        <div className="rounded-2xl overflow-hidden border border-[#121212]/10 dark:border-stone-800 shadow-sm h-80 bg-[#E8E4DF] dark:bg-stone-900">
          <img
            src={post.featuredImage || '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg'}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </FadeIn>

      {/* Content */}
      <FadeIn delay={150} direction="up">
        <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-10 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm leading-relaxed text-stone-800 dark:text-stone-200 text-sm sm:text-base whitespace-pre-line space-y-4 font-serif">
          {post.content}
        </div>
      </FadeIn>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pt-8 border-t border-[#121212]/10 dark:border-stone-800 space-y-6">
          <FadeIn direction="up">
            <h2 className="text-2xl font-serif italic font-bold text-stone-900 dark:text-amber-100">
              More Spiritual Articles
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

