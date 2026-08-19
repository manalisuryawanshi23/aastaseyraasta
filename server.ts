import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import multer from 'multer';

const uploadDir = path.resolve('public/assets/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    if (req.body.existingImageUrl) {
      const oldFilename = path.basename(req.body.existingImageUrl);
      return cb(null, oldFilename);
    }
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });
dotenv.config();

// In-memory / file server backing data fallback
import {
  initialSiteSettings,
  initialPoojas,
  initialTours,
  initialDestinations,
  initialBlogPosts,
  initialFAQs,
} from './src/data/initialData';
import { generateSitemapXml } from './scripts/generateSitemap';
import { testConnection, query, execute, isDbConnected } from './src/db/mysql';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.json());

  // Static Asset Serving — supports both /assets/images (uploaded) and /src/assets/images (bundled source)
  app.use('/assets/images', express.static(path.join(process.cwd(), 'public/assets/images')));
  app.use('/src/assets/images', express.static(path.join(process.cwd(), 'src/assets/images')));

  // Test MySQL Connection on Startup
  const dbAvailable = await testConnection();
  if (dbAvailable) {
    console.log('[MYSQL] Connected to Hostinger MySQL Database.');
  } else {
    console.log('[MYSQL INFO] MySQL DB not configured/available. Running with initialData fallback.');
  }

  // Store in-memory leads array for non-DB fallback
  const serverLeads: any[] = [];

  // API Routes

  // 1. Health Check
  app.get('/api/health', async (req, res) => {
    const dbStatus = isDbConnected();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Aastha Sey Raasta Seva API',
      database: dbStatus ? 'MySQL Connected' : 'Fallback In-Memory',
    });
  });

  // Image Upload Endpoint
  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    const fileUrl = `/assets/images/${req.file.filename}`;
    res.json({ success: true, url: fileUrl });
  });

  // 2. Site Settings
  app.get('/api/settings', async (req, res) => {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM site_settings WHERE id = ?', ['default']);
        if (rows.length > 0) {
          const row = rows[0];
          const settings = {
            businessName: row.business_name,
            hindiBusinessName: row.hindi_business_name,
            tagline: row.tagline,
            phone1: row.phone1,
            phone2: row.phone2,
            whatsappNumber: row.whatsapp_number,
            emergencyHelpline: row.emergency_helpline,
            email: row.email,
            address: row.address,
            city: row.city,
            state: row.state,
            country: row.country,
            pincode: row.pincode,
            logoText: row.logo_text,
            socialFacebook: row.social_facebook,
            socialInstagram: row.social_instagram,
            socialYoutube: row.social_youtube,
            googleBusinessProfile: row.google_business_profile,
            socialHandles: row.social_handles_json ? JSON.parse(row.social_handles_json) : [],
            defaultSeoTitle: row.default_seo_title,
            defaultMetaDescription: row.default_meta_description,
            defaultOgImage: row.default_og_image,
            googleAnalyticsId: row.google_analytics_id,
            businessHours: row.business_hours,
            footerDescription: row.footer_description,
            announcementBanner: row.announcement_banner_json ? JSON.parse(row.announcement_banner_json) : {},
            trustStats: row.trust_stats_json ? JSON.parse(row.trust_stats_json) : {},
            aboutMissionText: row.about_mission_text,
            brandPalette: row.brand_palette_json ? JSON.parse(row.brand_palette_json) : {},
          };
          return res.json({ success: true, data: settings });
        }
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch settings:', err);
      }
    }
    res.json({ success: true, data: initialSiteSettings });
  });

  // Helper to format MySQL pooja rows into API JSON objects
  function formatPoojaRow(p: any) {
    return {
      id: p.id,
      name: p.name,
      hindiName: p.hindi_name,
      slug: p.slug,
      categoryId: p.category_id,
      categoryName: p.category_name,
      hindiCategoryName: p.hindi_category_name,
      pageType: p.page_type || p.category_name,
      primaryKeyword: p.primary_keyword,
      secondaryKeywords: p.secondary_keywords_json ? JSON.parse(p.secondary_keywords_json) : [],
      searchIntent: p.search_intent,
      seoTitle: p.seo_title || p.meta_title,
      metaDescription: p.meta_description,
      urlSlug: p.url_slug,
      h1: p.h1 || p.name,
      quickAnswer: p.quick_answer,
      shortDescription: p.short_description,
      hindiShortDescription: p.hindi_short_description,
      description: p.description,
      hindiDescription: p.hindi_description,
      templeName: p.temple_name,
      hindiTempleName: p.hindi_temple_name,
      location: p.location,
      hindiLocation: p.hindi_location,
      city: p.city,
      hindiCity: p.hindi_city,
      price: Number(p.price),
      originalPrice: p.original_price ? Number(p.original_price) : null,
      advanceBookingAmount: p.advance_booking_amount ? Number(p.advance_booking_amount) : null,
      duration: p.duration,
      hindiDuration: p.hindi_duration,
      timing: p.timing,
      hindiTiming: p.hindi_timing,
      samagriIncluded: Boolean(p.samagri_included),
      prasadHomeDelivery: Boolean(p.prasad_home_delivery),
      liveVideoAvailable: Boolean(p.live_video_available),
      vipEntryPass: Boolean(p.vip_entry_pass),
      panditCount: p.pandit_count,
      image: p.image,
      galleryImages: p.gallery_images_json ? JSON.parse(p.gallery_images_json) : [],
      whatWeOffer: p.what_we_offer_json ? JSON.parse(p.what_we_offer_json) : [],
      benefits: p.benefits_json ? JSON.parse(p.benefits_json) : [],
      hindiBenefits: p.hindi_benefits_json ? JSON.parse(p.hindi_benefits_json) : [],
      whoCanConsider: p.who_can_consider_json ? JSON.parse(p.who_can_consider_json) : [],
      procedureSteps: p.procedure_steps_json ? JSON.parse(p.procedure_steps_json) : [],
      hindiProcedureSteps: p.hindi_procedure_steps_json ? JSON.parse(p.hindi_procedure_steps_json) : [],
      faqs: p.faqs_json ? JSON.parse(p.faqs_json) : [],
      internalLinks: p.internal_links_json ? JSON.parse(p.internal_links_json) : [],
      imageSeo: p.image_seo_json ? JSON.parse(p.image_seo_json) : {},
      schemaTypes: p.schema_types_json ? JSON.parse(p.schema_types_json) : [],
      qualityScore: p.quality_score || 95,
      idealFor: p.ideal_for,
      hindiIdealFor: p.hindi_ideal_for,
      auspiciousDays: p.auspicious_days,
      hindiAuspiciousDays: p.hindi_auspicious_days,
      mantra: p.mantra,
      hindiMantra: p.hindi_mantra,
      isPopular: Boolean(p.is_popular),
      isPublished: Boolean(p.is_published),
      metaTitle: p.seo_title || p.meta_title,
    };
  }

  // 3. Poojas
  app.get('/api/poojas', async (req, res) => {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM poojas WHERE is_published = 1 ORDER BY created_at DESC');
        const formatted = rows.map(formatPoojaRow);
        return res.json({ success: true, data: formatted });
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch poojas:', err);
      }
    }
    res.json({ success: true, data: initialPoojas.filter((p) => p.isPublished) });
  });

  app.get('/api/poojas/:slug', async (req, res) => {
    const slug = req.params.slug;
    if (isDbConnected()) {
      try {
        let rows = await query('SELECT * FROM poojas WHERE slug = ? OR url_slug = ? OR url_slug = ?', [slug, slug, `/pooja/${slug}`]);
        if (rows.length === 0 && (slug === 'pitru-dosh-shanti-narayan-bali-ujjain' || slug === 'narayan-bali-pooja-ujjain')) {
          rows = await query('SELECT * FROM poojas WHERE slug IN (?, ?) OR url_slug IN (?, ?)', [
            'pitru-dosh-shanti-narayan-bali-ujjain',
            'narayan-bali-pooja-ujjain',
            '/pitru-dosh-shanti-narayan-bali-ujjain',
            '/narayan-bali-pooja-ujjain'
          ]);
        }
        if (rows.length > 0) {
          return res.json({ success: true, data: formatPoojaRow(rows[0]) });
        }
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch pooja detail:', err);
      }
    }
    const item = initialPoojas.find(
      (p) => p.slug === slug || p.id === slug || p.urlSlug === `/pooja/${slug}` || p.urlSlug === `/${slug}` ||
      ((slug === 'pitru-dosh-shanti-narayan-bali-ujjain' || slug === 'narayan-bali-pooja-ujjain') && (p.id === 'pooja-narayan-bali' || p.slug.includes('narayan-bali')))
    );
    if (!item) return res.status(404).json({ success: false, message: 'Pooja not found' });
    res.json({ success: true, data: item });
  });

  // 4. Tours
  app.get('/api/tours', async (req, res) => {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM tours WHERE is_published = 1 ORDER BY created_at DESC');
        const formatted = rows.map((t) => ({
          id: t.id,
          title: t.title,
          hindiTitle: t.hindi_title,
          slug: t.slug,
          duration: t.duration,
          hindiDuration: t.hindi_duration,
          price: Number(t.price),
          originalPrice: t.original_price ? Number(t.original_price) : null,
          badge: t.badge,
          hindiBadge: t.hindi_badge,
          image: t.image,
          galleryImages: t.gallery_images_json ? JSON.parse(t.gallery_images_json) : [],
          pickupLocation: t.pickup_location,
          hindiPickupLocation: t.hindi_pickup_location,
          dropLocation: t.drop_location,
          hindiDropLocation: t.hindi_drop_location,
          vehicleOptions: t.vehicle_options_json ? JSON.parse(t.vehicle_options_json) : [],
          overview: t.overview,
          hindiOverview: t.hindi_overview,
          itinerary: t.itinerary_json ? JSON.parse(t.itinerary_json) : [],
          keyHighlights: t.key_highlights_json ? JSON.parse(t.key_highlights_json) : [],
          hindiKeyHighlights: t.hindi_key_highlights_json ? JSON.parse(t.hindi_key_highlights_json) : [],
          inclusions: t.inclusions_json ? JSON.parse(t.inclusions_json) : [],
          hindiInclusions: t.hindi_inclusions_json ? JSON.parse(t.hindi_inclusions_json) : [],
          exclusions: t.exclusions_json ? JSON.parse(t.exclusions_json) : [],
          hindiExclusions: t.hindi_exclusions_json ? JSON.parse(t.hindi_exclusions_json) : [],
          faqs: t.faqs_json ? JSON.parse(t.faqs_json) : [],
          isPopular: Boolean(t.is_popular),
          isPublished: Boolean(t.is_published),
          metaTitle: t.meta_title,
          metaDescription: t.meta_description,
          quickAnswer: t.quick_answer || '',
          whyChoose: t.why_choose_json ? JSON.parse(t.why_choose_json) : [],
          whatWeOffer: t.what_we_offer_json ? JSON.parse(t.what_we_offer_json) : [],
          howToReach: t.how_to_reach || '',
          travelTips: t.travel_tips_json ? JSON.parse(t.travel_tips_json) : [],
          category: t.category || '',
          focusKeyword: t.focus_keyword || '',
          secondaryKeywords: t.secondary_keywords_json ? JSON.parse(t.secondary_keywords_json) : [],
          canonicalUrl: t.canonical_url || '',
          ogTitle: t.og_title || '',
          ogDescription: t.og_description || '',
          ogImage: t.og_image || '',
        }));
        return res.json({ success: true, data: formatted });
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch tours:', err);
      }
    }
    res.json({ success: true, data: initialTours.filter((t) => t.isPublished) });
  });

  app.get('/api/tours/:slug', async (req, res) => {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM tours WHERE slug = ?', [req.params.slug]);
        if (rows.length > 0) {
          const t = rows[0];
          const formatted = {
            id: t.id,
            title: t.title,
            hindiTitle: t.hindi_title,
            slug: t.slug,
            duration: t.duration,
            hindiDuration: t.hindi_duration,
            price: Number(t.price),
            originalPrice: t.original_price ? Number(t.original_price) : null,
            badge: t.badge,
            hindiBadge: t.hindi_badge,
            image: t.image,
            galleryImages: t.gallery_images_json ? JSON.parse(t.gallery_images_json) : [],
            pickupLocation: t.pickup_location,
            hindiPickupLocation: t.hindi_pickup_location,
            dropLocation: t.drop_location,
            hindiDropLocation: t.hindi_drop_location,
            vehicleOptions: t.vehicle_options_json ? JSON.parse(t.vehicle_options_json) : [],
            overview: t.overview,
            hindiOverview: t.hindi_overview,
            itinerary: t.itinerary_json ? JSON.parse(t.itinerary_json) : [],
            keyHighlights: t.key_highlights_json ? JSON.parse(t.key_highlights_json) : [],
            hindiKeyHighlights: t.hindi_key_highlights_json ? JSON.parse(t.hindi_key_highlights_json) : [],
            inclusions: t.inclusions_json ? JSON.parse(t.inclusions_json) : [],
            hindiInclusions: t.hindi_inclusions_json ? JSON.parse(t.hindi_inclusions_json) : [],
            exclusions: t.exclusions_json ? JSON.parse(t.exclusions_json) : [],
            hindiExclusions: t.hindi_exclusions_json ? JSON.parse(t.hindi_exclusions_json) : [],
            faqs: t.faqs_json ? JSON.parse(t.faqs_json) : [],
            isPopular: Boolean(t.is_popular),
            isPublished: Boolean(t.is_published),
            metaTitle: t.meta_title,
            metaDescription: t.meta_description,
            quickAnswer: t.quick_answer || '',
            whyChoose: t.why_choose_json ? JSON.parse(t.why_choose_json) : [],
            whatWeOffer: t.what_we_offer_json ? JSON.parse(t.what_we_offer_json) : [],
            howToReach: t.how_to_reach || '',
            travelTips: t.travel_tips_json ? JSON.parse(t.travel_tips_json) : [],
            category: t.category || '',
            focusKeyword: t.focus_keyword || '',
            secondaryKeywords: t.secondary_keywords_json ? JSON.parse(t.secondary_keywords_json) : [],
            canonicalUrl: t.canonical_url || '',
            ogTitle: t.og_title || '',
            ogDescription: t.og_description || '',
            ogImage: t.og_image || '',
          };
          return res.json({ success: true, data: formatted });
        }
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch tour detail:', err);
      }
    }
    const item = initialTours.find((t) => t.slug === req.params.slug);
    if (!item) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, data: item });
  });

  // 5. Destinations
  app.get('/api/destinations', async (req, res) => {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM destinations WHERE is_published = 1 ORDER BY created_at DESC');
        const formatted = rows.map((d) => ({
          id: d.id,
          title: d.title,
          hindiTitle: d.hindi_title,
          slug: d.slug,
          city: d.city,
          hindiCity: d.hindi_city,
          state: d.state,
          image: d.image,
          galleryImages: d.gallery_images_json ? JSON.parse(d.gallery_images_json) : [],
          distanceFromCenter: d.distance_from_center,
          hindiDistanceFromCenter: d.hindi_distance_from_center,
          timings: d.timings,
          hindiTimings: d.hindi_timings,
          bestTimeToVisit: d.best_time_to_visit,
          hindiBestTimeToVisit: d.hindi_best_time_to_visit,
          description: d.description,
          hindiDescription: d.hindi_description,
          spiritualSignificance: d.spiritual_significance,
          hindiSpiritualSignificance: d.hindi_spiritual_significance,
          keyAttractions: d.key_attractions_json ? JSON.parse(d.key_attractions_json) : [],
          hindiKeyAttractions: d.hindi_key_attractions_json ? JSON.parse(d.hindi_key_attractions_json) : [],
          howToReach: d.how_to_reach_json ? JSON.parse(d.how_to_reach_json) : {},
          nearbyTemples: d.nearby_temples_json ? JSON.parse(d.nearby_temples_json) : [],
          mapCoordinates: d.map_coordinates_json ? JSON.parse(d.map_coordinates_json) : {},
          isPublished: Boolean(d.is_published),
          metaTitle: d.meta_title,
          metaDescription: d.meta_description,
        }));
        return res.json({ success: true, data: formatted });
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch destinations:', err);
      }
    }
    res.json({ success: true, data: initialDestinations.filter((d) => d.isPublished) });
  });

  // 6. Blogs
  app.get('/api/blogs', async (req, res) => {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC');
        const formatted = rows.map((b) => ({
          id: b.id,
          title: b.title,
          hindiTitle: b.hindi_title,
          slug: b.slug,
          author: b.author,
          date: b.date,
          category: b.category,
          hindiCategory: b.hindi_category,
          image: b.image,
          excerpt: b.excerpt,
          hindiExcerpt: b.hindi_excerpt,
          content: b.content,
          hindiContent: b.hindi_content,
          readTime: b.read_time,
          hindiReadTime: b.hindi_read_time,
          tags: b.tags_json ? JSON.parse(b.tags_json) : [],
          isPublished: Boolean(b.is_published),
          metaTitle: b.meta_title,
          metaDescription: b.meta_description,
        }));
        return res.json({ success: true, data: formatted });
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch blogs:', err);
      }
    }
    res.json({ success: true, data: initialBlogPosts.filter((b) => b.isPublished) });
  });

  // 7. FAQs
  app.get('/api/faqs', async (req, res) => {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM faqs WHERE is_published = 1');
        const formatted = rows.map((f) => ({
          id: f.id,
          question: f.question,
          hindiQuestion: f.hindi_question,
          answer: f.answer,
          hindiAnswer: f.hindi_answer,
          category: f.category,
          hindiCategory: f.hindi_category,
          isPublished: Boolean(f.is_published),
        }));
        return res.json({ success: true, data: formatted });
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch faqs:', err);
      }
    }
    res.json({ success: true, data: initialFAQs.filter((f) => f.isPublished) });
  });

  // 8. Leads (GET & POST)
  app.get('/api/leads', async (req, res) => {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM leads ORDER BY created_at DESC');
        return res.json({ success: true, data: rows });
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch leads:', err);
      }
    }
    res.json({ success: true, data: serverLeads });
  });

  app.post('/api/leads', async (req, res) => {
    const leadId = `lead-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const leadData = {
      id: leadId,
      name: req.body.name || 'Anonymous',
      phone: req.body.phone || '',
      email: req.body.email || '',
      serviceType: req.body.serviceType || 'Pooja',
      serviceName: req.body.serviceName || '',
      preferredDate: req.body.preferredDate || '',
      guestCount: req.body.guestCount || '',
      message: req.body.message || '',
      status: 'New',
      createdAt,
    };

    if (isDbConnected()) {
      try {
        await execute(
          `INSERT INTO leads (id, name, phone, email, service_type, service_name, preferred_date, guest_count, message, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            leadData.id,
            leadData.name,
            leadData.phone,
            leadData.email,
            leadData.serviceType,
            leadData.serviceName,
            leadData.preferredDate,
            leadData.guestCount,
            leadData.message,
            leadData.status,
          ]
        );
        console.log('[LEAD STORED IN MYSQL]', leadData.name, leadData.phone, leadData.serviceType);
        return res.status(201).json({ success: true, message: 'Enquiry received & stored in database', data: leadData });
      } catch (err) {
        console.error('[DB ERROR] Failed to save lead:', err);
      }
    }

    serverLeads.unshift(leadData);
    console.log('[LEAD RECEIVED IN-MEMORY]', leadData.name, leadData.phone, leadData.serviceType);
    res.status(201).json({ success: true, message: 'Enquiry received successfully', data: leadData });
  });

  // 9. Admin & Staff User Management (MySQL Backend)
  app.get('/api/admin/users', async (req, res) => {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM admin_users ORDER BY created_at DESC');
        const staffList = rows.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email || '',
          phone: u.phone || '',
          role: u.role || 'Editor',
          passcode: u.passcode || 'pass123',
          status: u.is_active ? 'Active' : 'Inactive',
          lastLogin: u.last_login || 'Never',
          permissions: JSON.parse(u.permissions_json || '{}'),
        }));
        return res.json({ success: true, data: staffList });
      } catch (err) {
        console.error('[DB ERROR] Failed to fetch admin users:', err);
      }
    }
    res.json({ success: false, message: 'Database not connected', data: [] });
  });

  app.post('/api/admin/users', async (req, res) => {
    const { name, email, phone, role, passcode, status, permissions } = req.body;
    const userId = `staff-${Date.now()}`;
    const username = email ? email.split('@')[0] : `user_${Math.floor(1000 + Math.random() * 9000)}`;
    const passwordHash = await bcrypt.hash(passcode || 'pass123', 10);
    const isActive = status === 'Active' ? 1 : 0;

    if (isDbConnected()) {
      try {
        await execute(
          `INSERT INTO admin_users (id, username, password_hash, passcode, name, email, phone, role, is_active, permissions_json, last_login)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           name = VALUES(name), email = VALUES(email), phone = VALUES(phone), role = VALUES(role),
           passcode = VALUES(passcode), is_active = VALUES(is_active), permissions_json = VALUES(permissions_json)`,
          [
            userId,
            username,
            passwordHash,
            passcode || 'pass123',
            name,
            email,
            phone || '',
            role || 'Editor',
            isActive,
            JSON.stringify(permissions || {}),
            'Never'
          ]
        );
        return res.json({
          success: true,
          message: 'Admin staff user saved successfully',
          data: { id: userId, name, email, phone, role, passcode, status, permissions }
        });
      } catch (err) {
        console.error('[DB ERROR] Failed to save staff user:', err);
        return res.status(500).json({ success: false, message: 'Failed to save staff user to database' });
      }
    }
    res.json({ success: false, message: 'Database not connected' });
  });

  app.put('/api/admin/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, role, passcode, status, permissions, lastLogin } = req.body;
    const passwordHash = passcode ? await bcrypt.hash(passcode, 10) : undefined;
    const isActive = status === 'Active' ? 1 : 0;

    if (isDbConnected()) {
      try {
        let sql = `UPDATE admin_users SET name = ?, email = ?, phone = ?, role = ?, is_active = ?, permissions_json = ?`;
        let params: any[] = [name, email, phone || '', role, isActive, JSON.stringify(permissions || {})];

        if (passcode) {
          sql += `, passcode = ?, password_hash = ?`;
          params.push(passcode, passwordHash);
        }
        if (lastLogin) {
          sql += `, last_login = ?`;
          params.push(lastLogin);
        }
        sql += ` WHERE id = ?`;
        params.push(id);

        await execute(sql, params);
        return res.json({ success: true, message: 'Staff user updated successfully' });
      } catch (err) {
        console.error('[DB ERROR] Failed to update staff user:', err);
        return res.status(500).json({ success: false, message: 'Failed to update staff user in database' });
      }
    }
    res.json({ success: false, message: 'Database not connected' });
  });

  app.delete('/api/admin/users/:id', async (req, res) => {
    const { id } = req.params;
    if (isDbConnected()) {
      try {
        await execute('DELETE FROM admin_users WHERE id = ?', [id]);
        return res.json({ success: true, message: 'Staff user deleted successfully' });
      } catch (err) {
        console.error('[DB ERROR] Failed to delete staff user:', err);
        return res.status(500).json({ success: false, message: 'Failed to delete staff user' });
      }
    }
    res.json({ success: false, message: 'Database not connected' });
  });

  // 10. Admin Authentication Endpoint (Passcode & Username/Password)
  app.post('/api/admin/login', async (req, res) => {
    const { username, password, passcode } = req.body;
    const authInput = (passcode || password || '').toString().trim();

    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM admin_users WHERE is_active = 1');
        const found = rows.find((u: any) =>
          u.username.toLowerCase() === authInput.toLowerCase() ||
          (u.email && u.email.toLowerCase() === authInput.toLowerCase()) ||
          (u.passcode && u.passcode.toLowerCase() === authInput.toLowerCase())
        );

        if (found) {
          const nowFormatted = new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' });
          await execute('UPDATE admin_users SET last_login = ? WHERE id = ?', [nowFormatted, found.id]);

          return res.json({
            success: true,
            message: 'Authentication successful via MySQL',
            user: {
              id: found.id,
              name: found.name,
              email: found.email,
              phone: found.phone,
              role: found.role,
              passcode: found.passcode,
              status: found.is_active ? 'Active' : 'Inactive',
              lastLogin: nowFormatted,
              permissions: JSON.parse(found.permissions_json || '{}'),
            },
          });
        }
      } catch (err) {
        console.error('[DB ERROR] Failed admin login query:', err);
      }
    }

    // Default fallback verification
    if (authInput.toLowerCase() === 'mahakal' || authInput === 'AasthaAdmin#2026' || authInput.toLowerCase() === 'admin123') {
      return res.json({
        success: true,
        message: 'Authentication successful (fallback)',
        user: {
          id: 'admin-1',
          name: 'Aastha Super Admin',
          email: 'admin@aasthaserasta.com',
          role: 'Admin',
          passcode: 'mahakal',
          status: 'Active',
          lastLogin: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
          permissions: {
            canViewOverview: true,
            canManageLeads: true,
            canManageBlogs: true,
            canManageServices: true,
            canManageSettings: true,
            canManageSocials: true,
            canManageStaff: true,
          },
        },
      });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials or passcode' });
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

  app.listen(PORT, () => {
    console.log(`[AASTHA SEY RAASTA SEVA] Server listening on http://localhost:${PORT}`);
  });
}

startServer();
