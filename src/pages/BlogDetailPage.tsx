import React from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { BlogCard } from '../components/BlogCard';
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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
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
      <div className="space-y-4 border-b border-[#121212]/10 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-widest border border-amber-300">
          <Tag className="w-3 h-3 text-amber-700" />
          <span>{post.category}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif italic font-bold text-stone-900 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-mono">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-amber-800" />
            <span>{post.author}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>{post.publishedAt}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{post.readingTime || '5 min read'}</span>
          </span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-2xl overflow-hidden border border-[#121212]/10 shadow-sm h-80 bg-[#E8E4DF]">
        <img
          src={post.featuredImage || '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg'}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#121212]/10 shadow-sm leading-relaxed text-stone-800 text-sm sm:text-base whitespace-pre-line space-y-4 font-serif">
        {post.content}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pt-8 border-t border-[#121212]/10 space-y-6">
          <h2 className="text-2xl font-serif italic font-bold text-stone-900">
            More Spiritual Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
