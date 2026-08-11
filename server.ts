import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// In-memory / file server backing data
import {
  initialSiteSettings,
  initialPoojas,
  initialTours,
  initialDestinations,
  initialBlogPosts,
  initialFAQs,
} from './src/data/initialData';
import { generateSitemapXml } from './scripts/generateSitemap';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Store in-memory leads array
  const serverLeads: any[] = [];

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Aastha Sey Raasta Seva' });
  });

  app.get('/api/settings', (req, res) => {
    res.json({ success: true, data: initialSiteSettings });
  });

  app.get('/api/poojas', (req, res) => {
    res.json({ success: true, data: initialPoojas.filter((p) => p.isPublished) });
  });

  app.get('/api/poojas/:slug', (req, res) => {
    const item = initialPoojas.find((p) => p.slug === req.params.slug);
    if (!item) return res.status(404).json({ success: false, message: 'Pooja not found' });
    res.json({ success: true, data: item });
  });

  app.get('/api/tours', (req, res) => {
    res.json({ success: true, data: initialTours.filter((t) => t.isPublished) });
  });

  app.get('/api/tours/:slug', (req, res) => {
    const item = initialTours.find((t) => t.slug === req.params.slug);
    if (!item) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, data: item });
  });

  app.get('/api/destinations', (req, res) => {
    res.json({ success: true, data: initialDestinations.filter((d) => d.isPublished) });
  });

  app.get('/api/blogs', (req, res) => {
    res.json({ success: true, data: initialBlogPosts.filter((b) => b.isPublished) });
  });

  app.get('/api/faqs', (req, res) => {
    res.json({ success: true, data: initialFAQs.filter((f) => f.isPublished) });
  });

  app.get('/api/leads', (req, res) => {
    res.json({ success: true, data: serverLeads });
  });

  app.post('/api/leads', (req, res) => {
    const lead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...req.body,
    };
    serverLeads.unshift(lead);
    console.log('[LEAD RECEIVED]', lead.name, lead.phone, lead.serviceType);
    res.status(201).json({ success: true, message: 'Enquiry received successfully', data: lead });
  });

  // Dynamic XML Sitemap for SEO
  app.get('/sitemap.xml', (req, res) => {
    const xml = generateSitemapXml();
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  // Dynamic Robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://aasthaserasta.com';
    const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.header('Content-Type', 'text/plain');
    res.send(content);
  });

  // Vite Middleware or Static Production Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AASTHA SEY RAASTA SEVA] Server listening on http://localhost:${PORT}`);
  });
}

startServer();
