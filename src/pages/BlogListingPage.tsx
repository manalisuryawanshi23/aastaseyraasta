import React, { useState, useEffect } from 'react';
import { StoreService } from '../services/store';
import { BlogCard } from '../components/BlogCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { generateBlogListingTitle } from '../utils/seoTitles';
import { BookOpen, Search, Sparkles } from 'lucide-react';
import { SkeletonGrid } from '../components/Skeletons';
import { ContentFade } from '../components/PageTransition';

export const BlogListingPage: React.FC = () => {
  const blogs = StoreService.getBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const filtered = blogs.filter(
    (b) =>
      !searchTerm.trim() ||
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEOHead
        title={generateBlogListingTitle()}
        description="Read detailed articles on Rudrabhishek vidhi, Bhat Pooja significance at Mangalnath, Baglamukhi Havan Mahatmyam, and Ujjain pilgrimage tips."
        keywords="Spiritual Blog Ujjain, Vedic Rituals Guide, Rudrabhishek Vidhi, Bhat Pooja Mahatmyam, Baglamukhi Havan Secrets"
        canonicalUrl="https://aasthaserasta.com/blog"
        ogImage="/src/assets/images/pooja_rudrabhishek_1786196070818.jpg"
        ogImageAlt="Spiritual Articles and Vedic Guides"
      />

      <Breadcrumbs items={[{ label: 'Blog Guides' }]} />

      <div className="bg-[#121212] text-[#F9F8F6] rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-[#121212]/20">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F1ED]/10 text-amber-300 text-xs font-semibold uppercase tracking-widest border border-amber-500/30">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Vedic Knowledge Index</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif italic text-[#F9F8F6]">
            Spiritual Guides & Articles
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            In-depth guides explaining scriptural significance, auspicious muhurats, and travel preparations for Ujjain pilgrims.
          </p>
        </div>
      </div>

      <div className="bg-[#F3F1ED] dark:bg-stone-800 p-4 rounded-xl border border-[#121212]/10 dark:border-stone-700 flex items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-500 dark:text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by keyword (e.g. Rudrabhishek, Mangalnath, Gotra)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-stone-900 border border-[#121212]/10 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-sm outline-none focus:ring-2 focus:ring-amber-800"
          />
        </div>
      </div>

      <ContentFade contentKey={searchTerm}>
        {isLoading ? (
          <SkeletonGrid type="blog" count={6} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100">No Articles Found</h3>
            <p className="text-stone-500 dark:text-stone-400 text-xs">Try adjusting your keyword search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </ContentFade>
    </div>
  );
};
