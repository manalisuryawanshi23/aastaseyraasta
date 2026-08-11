import React, { useState } from 'react';
import { StoreService } from '../services/store';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';
import { FadeIn } from '../components/FadeIn';
import {
  Map,
  Flame,
  Compass,
  MapPin,
  BookOpen,
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const HTMLSitemapPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const poojas = StoreService.getPoojas().filter((p) => p.isPublished);
  const tours = StoreService.getTours().filter((t) => t.isPublished);
  const destinations = StoreService.getDestinations().filter((d) => d.isPublished);
  const blogs = StoreService.getBlogPosts().filter((b) => b.isPublished);

  const staticPages = [
    { name: 'Home Page', url: '/', priority: '1.0', desc: 'Main portal for Ujjain temple rituals & pilgrimage packages' },
    { name: 'Pooja Services Directory', url: '/pooja-services', priority: '0.9', desc: 'Complete catalogue of 32 Vedic Poojas in Ujjain, Omkareshwar & Nalkheda' },
    { name: 'Spiritual Tours Directory', url: '/spiritual-tours', priority: '0.9', desc: 'Catalogue of 23 Yatras, Char Dham circuits & Himalayan treks' },
    { name: 'Sacred Destinations Directory', url: '/destinations', priority: '0.8', desc: 'Guides for Ujjain Mahakal, Omkareshwar, Baglamukhi & Pashupatinath' },
    { name: 'Spiritual Wisdom & Blog', url: '/blog', priority: '0.8', desc: 'Articles on Mahakaleshwar Bhasma Aarti, Kaal Sarp Dosh & Vedic Astrology' },
    { name: 'About Aastha Sey Raasta Seva', url: '/about-us', priority: '0.7', desc: 'Our mission, heritage, certified Vedic Pandits and trust guarantee' },
    { name: 'Contact & Pandit Enquiries', url: '/contact', priority: '0.7', desc: 'Get in touch with our Ujjain Seva Kendra team' },
    { name: 'Saved Spiritual Favorites', url: '/saved-items', priority: '0.5', desc: 'User bookmarked rituals and yatra packages' },
  ];

  const filterItems = <T extends { name?: string; title?: string; city?: string; category?: string }>(items: T[]) => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter((item) => {
      const name = (item.name || item.title || '').toLowerCase();
      const city = (item.city || '').toLowerCase();
      const cat = (item.category || '').toLowerCase();
      return name.includes(term) || city.includes(term) || cat.includes(term);
    });
  };

  const filteredPoojas = filterItems(poojas);
  const filteredTours = filterItems(tours);
  const filteredDestinations = filterItems(destinations);
  const filteredBlogs = filterItems(blogs);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'HTML Sitemap', url: '/site-map' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <SEOHead
        title="Complete Service & Yatra Directory Index"
        description="Comprehensive Site Map of all Ujjain Pooja services, Spiritual Yatra packages, Temple destination guides, and Vedic blog articles."
        keywords="Ujjain Sitemap, Aastha Sey Raasta Site Map, All Ujjain Poojas, All Spiritual Tours"
        canonicalUrl="https://aasthaserasta.com/site-map"
        ogImage="/src/assets/images/header_bg_spiritual_1786196057015.jpg"
        ogImageAlt="Aastha Sey Raasta Seva Site Map & Index"
        jsonLd={[breadcrumbSchema]}
      />

      <Breadcrumbs items={[{ label: 'Site Map' }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
            <Map className="w-4 h-4 text-amber-400" />
            <span>Search Engine & User Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100">
            Comprehensive Website Map
          </h1>
          <p className="text-amber-200/80 text-sm leading-relaxed">
            Quickly navigate every indexed page, temple ritual, pilgrimage tour package, destination guide, and blog post across the Aastha Sey Raasta Seva platform.
          </p>

          {/* Quick Filter Search */}
          <div className="pt-4 max-w-xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search any ritual, tour, temple or article in sitemap..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white placeholder-stone-400 border border-amber-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Static Core Pages */}
      <FadeIn direction="up">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 border-b border-stone-200 dark:border-stone-800 pb-2">
            <FileText className="w-5 h-5" />
            <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Core Platform Pages ({staticPages.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {staticPages.map((sp) => (
              <a
                key={sp.url}
                href={sp.url}
                className="p-4 rounded-2xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all space-y-2 group block"
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-400">
                  <span className="group-hover:underline flex items-center gap-1">
                    {sp.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-[10px] font-mono">
                    P: {sp.priority}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                  {sp.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Poojas & Rituals Section */}
      <FadeIn direction="up">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
              <Flame className="w-5 h-5" />
              <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Vedic Poojas & Rituals ({filteredPoojas.length})
              </h2>
            </div>
            <a href="/pooja-services" className="text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline">
              View All Services →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPoojas.map((p) => (
              <a
                key={p.id}
                href={`/pooja/${p.slug}`}
                className="p-3.5 rounded-xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all flex items-center justify-between group"
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <h3 className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-amber-800 dark:group-hover:text-amber-300 truncate">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    📍 {p.templeName}, {p.city}
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-medium whitespace-nowrap">
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
              </a>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Spiritual Tours Section */}
      <FadeIn direction="up">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
              <Compass className="w-5 h-5" />
              <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Spiritual Tours & Yatras ({filteredTours.length})
              </h2>
            </div>
            <a href="/spiritual-tours" className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline">
              View All Tours →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTours.map((t) => (
              <a
                key={t.id}
                href={`/spiritual-tours/${t.slug}`}
                className="p-3.5 rounded-xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <h3 className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 truncate">
                    {t.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    ⏱️ {t.duration || 'Flexible'} • Start: {t.startingPoint}
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-medium whitespace-nowrap">
                  ₹{(t.price || 0).toLocaleString('en-IN')}
                </span>
              </a>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Destinations & Blog Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Destinations */}
        <FadeIn direction="up">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
              <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
                <MapPin className="w-5 h-5 text-amber-700" />
                <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                  Temple Destinations ({filteredDestinations.length})
                </h2>
              </div>
              <a href="/destinations" className="text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline">
                View All
              </a>
            </div>

            <div className="space-y-2">
              {filteredDestinations.map((d) => (
                <a
                  key={d.id}
                  href={`/destinations/${d.slug}`}
                  className="p-3 rounded-xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all flex items-center justify-between group"
                >
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-amber-800 dark:group-hover:text-amber-300">
                    📍 {d.name}
                  </span>
                  <span className="text-[10px] text-stone-500 truncate max-w-[200px]">
                    {d.shortDescription}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Blog Posts */}
        <FadeIn direction="up">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
              <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                  Blog & Vedic Guides ({filteredBlogs.length})
                </h2>
              </div>
              <a href="/blog" className="text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline">
                View All
              </a>
            </div>

            <div className="space-y-2">
              {filteredBlogs.map((b) => (
                <a
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="p-3 rounded-xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all flex items-center justify-between group"
                >
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-amber-800 dark:group-hover:text-amber-300 line-clamp-1 pr-2">
                    ✍️ {b.title}
                  </span>
                  <span className="text-[10px] text-stone-400 whitespace-nowrap">
                    {b.publishedAt}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};
