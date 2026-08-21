import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initialPoojas,
  initialTours,
  initialDestinations,
  initialBlogPosts,
} from '../src/data/initialData';

const getDirname = () => {
  if (typeof __dirname !== 'undefined') {
    return __dirname;
  }
  const filename = fileURLToPath(import.meta.url);
  return path.dirname(filename);
};
const _dirname = getDirname();

const BASE_URL = process.env.APP_URL || 'https://aasthaserasta.com';
const TODAY = new Date().toISOString().split('T')[0];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export function generateSitemapXml(): string {
  const urls: SitemapUrl[] = [
    // Core Primary Routes
    { loc: `${BASE_URL}/`, lastmod: TODAY, changefreq: 'daily', priority: '1.0' },
    { loc: `${BASE_URL}/pooja-services`, lastmod: TODAY, changefreq: 'daily', priority: '0.9' },
    { loc: `${BASE_URL}/spiritual-tours`, lastmod: TODAY, changefreq: 'daily', priority: '0.9' },
    { loc: `${BASE_URL}/destinations`, lastmod: TODAY, changefreq: 'weekly', priority: '0.8' },
    { loc: `${BASE_URL}/blog`, lastmod: TODAY, changefreq: 'daily', priority: '0.8' },
    { loc: `${BASE_URL}/site-map`, lastmod: TODAY, changefreq: 'weekly', priority: '0.8' },

    // Static Informational Routes
    { loc: `${BASE_URL}/about-us`, lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
    { loc: `${BASE_URL}/why-choose-us`, lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
    { loc: `${BASE_URL}/how-it-works`, lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
    { loc: `${BASE_URL}/testimonials`, lastmod: TODAY, changefreq: 'weekly', priority: '0.7' },
    { loc: `${BASE_URL}/gallery`, lastmod: TODAY, changefreq: 'weekly', priority: '0.7' },
    { loc: `${BASE_URL}/faq`, lastmod: TODAY, changefreq: 'weekly', priority: '0.7' },
    { loc: `${BASE_URL}/contact`, lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
    { loc: `${BASE_URL}/privacy-policy`, lastmod: TODAY, changefreq: 'yearly', priority: '0.4' },
    { loc: `${BASE_URL}/terms-and-conditions`, lastmod: TODAY, changefreq: 'yearly', priority: '0.4' },
    { loc: `${BASE_URL}/disclaimer`, lastmod: TODAY, changefreq: 'yearly', priority: '0.4' },
    { loc: `${BASE_URL}/refund-cancellation-policy`, lastmod: TODAY, changefreq: 'yearly', priority: '0.4' },
  ];

  // Dynamically add all published Pooja Services
  initialPoojas.forEach((p) => {
    if (p.isPublished) {
      urls.push({
        loc: `${BASE_URL}/pooja/${p.slug}`,
        lastmod: p.updatedAt ? p.updatedAt.split('T')[0] : TODAY,
        changefreq: 'weekly',
        priority: '0.9',
      });
    }
  });

  // Dynamically add all published Spiritual Tours
  initialTours.forEach((t) => {
    if (t.isPublished) {
      urls.push({
        loc: `${BASE_URL}/spiritual-tours/${t.slug}`,
        lastmod: t.updatedAt ? t.updatedAt.split('T')[0] : TODAY,
        changefreq: 'weekly',
        priority: '0.9',
      });
    }
  });

  // Dynamically add all published Destinations
  initialDestinations.forEach((d) => {
    if (d.isPublished) {
      urls.push({
        loc: `${BASE_URL}/destinations/${d.slug}`,
        lastmod: d.updatedAt ? d.updatedAt.split('T')[0] : TODAY,
        changefreq: 'monthly',
        priority: '0.8',
      });
    }
  });

  // Dynamically add all published Blog Posts
  initialBlogPosts.forEach((b) => {
    if (b.isPublished) {
      urls.push({
        loc: `${BASE_URL}/blog/${b.slug}`,
        lastmod: b.updatedAt ? b.updatedAt.split('T')[0] : TODAY,
        changefreq: 'weekly',
        priority: '0.8',
      });
    }
  });

  // Build Google Search Console compliant XML document
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset\n`;
  xml += `  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

  urls.forEach((u) => {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(u.loc)}</loc>\n`;
    xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  console.log(`[Sitemap Generator] Processed ${urls.length} URLs for sitemap.xml`);
  return xml;
}

export function writeSitemapFile(): void {
  const xmlContent = generateSitemapXml();

  // Save to public directory
  const publicDir = path.resolve(_dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xmlContent, 'utf-8');
  console.log(`[Sitemap Generator] Successfully written sitemap to: ${publicSitemapPath}`);

  // Also save to dist directory if dist folder exists (for production build artifact)
  const distDir = path.resolve(_dirname, '../dist');
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xmlContent, 'utf-8');
    console.log(`[Sitemap Generator] Successfully written sitemap to: ${distSitemapPath}`);
  }
}

// Execute generator script if invoked directly
if (process.argv[1] && process.argv[1].endsWith('generateSitemap.ts')) {
  writeSitemapFile();
}
