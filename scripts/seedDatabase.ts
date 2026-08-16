import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { getDbPool, testConnection, query, execute } from '../src/db/mysql';

import {
  initialSiteSettings,
  initialPoojas,
  initialTours,
  initialDestinations,
  initialBlogPosts,
  initialFAQs,
} from '../src/data/initialData';

dotenv.config();

async function seed() {
  console.log('🚀 Starting Aastha Sey Raasta MySQL Database Seeder...');

  const connected = await testConnection();
  if (!connected) {
    console.error('❌ Could not connect to MySQL database.');
    console.error('Please check DB_HOST, DB_USER, DB_PASSWORD, DB_NAME in your .env file.');
    process.exit(1);
  }

  console.log('✅ Connected to MySQL database successfully!');

  // 1. Run Schema DDL
  const schemaPath = path.join(process.cwd(), 'src', 'db', 'schema.sql');
  const sqlContent = fs.readFileSync(schemaPath, 'utf-8');

  const statements = sqlContent
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await execute(stmt);
  }
  console.log('✅ MySQL Tables verified and created.');

  // 2. Seed Site Settings
  const settingsRows = await query('SELECT id FROM site_settings WHERE id = ?', ['default']);
  if (settingsRows.length === 0) {
    await execute(
      `INSERT INTO site_settings (
        id, business_name, hindi_business_name, tagline, phone1, phone2, whatsapp_number,
        emergency_helpline, email, address, city, state, country, pincode, logo_text,
        social_facebook, social_instagram, social_youtube, google_business_profile,
        social_handles_json, default_seo_title, default_meta_description, default_og_image,
        google_analytics_id, business_hours, footer_description, announcement_banner_json,
        trust_stats_json, about_mission_text, brand_palette_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'default',
        initialSiteSettings.businessName,
        initialSiteSettings.hindiBusinessName || '',
        initialSiteSettings.tagline || '',
        initialSiteSettings.phone1 || '',
        initialSiteSettings.phone2 || '',
        initialSiteSettings.whatsappNumber || '',
        initialSiteSettings.emergencyHelpline || '',
        initialSiteSettings.email || '',
        initialSiteSettings.address || '',
        initialSiteSettings.city || '',
        initialSiteSettings.state || '',
        initialSiteSettings.country || '',
        initialSiteSettings.pincode || '',
        initialSiteSettings.logoText || '',
        initialSiteSettings.socialFacebook || '',
        initialSiteSettings.socialInstagram || '',
        initialSiteSettings.socialYoutube || '',
        initialSiteSettings.googleBusinessProfile || '',
        JSON.stringify(initialSiteSettings.socialHandles || []),
        initialSiteSettings.defaultSeoTitle || '',
        initialSiteSettings.defaultMetaDescription || '',
        initialSiteSettings.defaultOgImage || '',
        initialSiteSettings.googleAnalyticsId || '',
        initialSiteSettings.businessHours || '',
        initialSiteSettings.footerDescription || '',
        JSON.stringify(initialSiteSettings.announcementBanner || {}),
        JSON.stringify(initialSiteSettings.trustStats || {}),
        initialSiteSettings.aboutMissionText || '',
        JSON.stringify(initialSiteSettings.brandPalette || {}),
      ]
    );
    console.log('✅ Seeded site_settings.');
  }

  // 3. Seed Poojas
  const poojasRows = await query('SELECT COUNT(*) as count FROM poojas');
  if (poojasRows[0].count === 0) {
    for (const item of initialPoojas) {
      const p = item as any;
      await execute(
        `INSERT INTO poojas (
          id, name, hindi_name, slug, category_id, category_name, hindi_category_name,
          short_description, hindi_short_description, description, hindi_description,
          temple_name, hindi_temple_name, location, hindi_location, city, hindi_city,
          price, original_price, advance_booking_amount, duration, hindi_duration,
          timing, hindi_timing, samagri_included, prasad_home_delivery, live_video_available,
          vip_entry_pass, pandit_count, image, gallery_images_json, benefits_json,
          hindi_benefits_json, procedure_steps_json, hindi_procedure_steps_json,
          faqs_json, ideal_for, hindi_ideal_for, auspicious_days, hindi_auspicious_days,
          mantra, hindi_mantra, is_popular, is_published, meta_title, meta_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id,
          p.name,
          p.hindiName || '',
          p.slug,
          p.categoryId || '',
          p.categoryName || '',
          p.hindiCategoryName || '',
          p.shortDescription || '',
          p.hindiShortDescription || '',
          p.description || '',
          p.hindiDescription || '',
          p.templeName || '',
          p.hindiTempleName || '',
          p.location || '',
          p.hindiLocation || '',
          p.city || '',
          p.hindiCity || '',
          p.price || 0,
          p.originalPrice || null,
          p.advanceBookingAmount || null,
          p.duration || '',
          p.hindiDuration || '',
          p.timing || '',
          p.hindiTiming || '',
          p.samagriIncluded ? 1 : 0,
          p.prasadHomeDelivery ? 1 : 0,
          p.liveVideoAvailable ? 1 : 0,
          p.vipEntryPass ? 1 : 0,
          p.panditCount || 1,
          p.featuredImage || p.image || p.ogImage || '',
          JSON.stringify(p.gallery || p.galleryImages || []),
          JSON.stringify(p.benefits || []),
          JSON.stringify(p.hindiBenefits || []),
          JSON.stringify(p.procedureSteps || p.preparation || []),
          JSON.stringify(p.hindiProcedureSteps || p.hindiPreparation || []),
          JSON.stringify(p.faqs || p.aeoQuestions || []),
          p.idealFor || '',
          p.hindiIdealFor || '',
          p.auspiciousDays || '',
          p.hindiAuspiciousDays || '',
          p.mantra || '',
          p.hindiMantra || '',
          p.isFeatured ? 1 : 0,
          p.isPublished !== false ? 1 : 0,
          p.seoTitle || p.metaTitle || '',
          p.metaDescription || '',
        ]
      );
    }
    console.log(`✅ Seeded ${initialPoojas.length} poojas.`);
  }

  // 4. Seed Tours
  const toursRows = await query('SELECT COUNT(*) as count FROM tours');
  if (toursRows[0].count === 0) {
    for (const item of initialTours) {
      const t = item as any;
      await execute(
        `INSERT INTO tours (
          id, title, hindi_title, slug, duration, hindi_duration, price, original_price,
          badge, hindi_badge, image, gallery_images_json, pickup_location, hindi_pickup_location,
          drop_location, hindi_drop_location, vehicle_options_json, overview, hindi_overview,
          itinerary_json, key_highlights_json, hindi_key_highlights_json, inclusions_json,
          hindi_inclusions_json, exclusions_json, hindi_exclusions_json, faqs_json,
          is_popular, is_published, meta_title, meta_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          t.id,
          t.name || t.title || '',
          t.hindiName || t.hindiTitle || '',
          t.slug,
          t.duration || '',
          t.hindiDuration || '',
          t.price || 0,
          t.originalPrice || null,
          t.badge || '',
          t.hindiBadge || '',
          t.featuredImage || t.image || t.ogImage || '',
          JSON.stringify(t.gallery || t.galleryImages || []),
          t.startingPoint || t.pickupLocation || '',
          t.hindiStartingPoint || t.hindiPickupLocation || '',
          t.endingPoint || t.dropLocation || '',
          t.hindiEndingPoint || t.hindiDropLocation || '',
          JSON.stringify(t.vehicleOptions || []),
          t.shortDescription || t.overview || '',
          t.hindiShortDescription || t.hindiOverview || '',
          JSON.stringify(t.itinerary || []),
          JSON.stringify(t.placesCovered || t.keyHighlights || []),
          JSON.stringify(t.hindiPlacesCovered || t.hindiKeyHighlights || []),
          JSON.stringify(t.included || t.inclusions || []),
          JSON.stringify(t.hindiIncluded || t.hindiInclusions || []),
          JSON.stringify(t.excluded || t.exclusions || []),
          JSON.stringify(t.hindiExcluded || t.hindiExclusions || []),
          JSON.stringify(t.faqs || t.aeoQuestions || []),
          t.isFeatured ? 1 : 0,
          t.isPublished !== false ? 1 : 0,
          t.seoTitle || t.metaTitle || '',
          t.metaDescription || '',
        ]
      );
    }
    console.log(`✅ Seeded ${initialTours.length} tours.`);
  }

  // 5. Seed Destinations
  const destRows = await query('SELECT COUNT(*) as count FROM destinations');
  if (destRows[0].count === 0) {
    for (const item of initialDestinations) {
      const d = item as any;
      await execute(
        `INSERT INTO destinations (
          id, title, hindi_title, slug, city, hindi_city, state, image, gallery_images_json,
          distance_from_center, hindi_distance_from_center, timings, hindi_timings,
          best_time_to_visit, hindi_best_time_to_visit, description, hindi_description,
          spiritual_significance, hindi_spiritual_significance, key_attractions_json,
          hindi_key_attractions_json, how_to_reach_json, nearby_temples_json,
          map_coordinates_json, is_published, meta_title, meta_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          d.id,
          d.name || d.title || '',
          d.hindiName || d.hindiTitle || '',
          d.slug,
          d.city || '',
          d.hindiCity || '',
          d.state || '',
          d.heroImage || d.image || '',
          JSON.stringify(d.gallery || d.galleryImages || []),
          d.distanceFromCenter || '',
          d.hindiDistanceFromCenter || '',
          d.timings || '',
          d.hindiTimings || '',
          d.bestTimeToVisit || '',
          d.hindiBestTimeToVisit || '',
          d.description || '',
          d.hindiDescription || '',
          d.spiritualSignificance || '',
          d.hindiSpiritualSignificance || '',
          JSON.stringify(d.placesToVisit || d.keyAttractions || []),
          JSON.stringify(d.hindiPlacesToVisit || d.hindiKeyAttractions || []),
          JSON.stringify(d.howToReach || {}),
          JSON.stringify(d.temples || d.nearbyTemples || []),
          JSON.stringify(d.mapCoordinates || {}),
          d.isPublished !== false ? 1 : 0,
          d.seoTitle || d.metaTitle || '',
          d.metaDescription || '',
        ]
      );
    }
    console.log(`✅ Seeded ${initialDestinations.length} destinations.`);
  }

  // 6. Seed Blogs
  const blogRows = await query('SELECT COUNT(*) as count FROM blog_posts');
  if (blogRows[0].count === 0) {
    for (const item of initialBlogPosts) {
      const b = item as any;
      await execute(
        `INSERT INTO blog_posts (
          id, title, hindi_title, slug, author, date, category, hindi_category,
          image, excerpt, hindi_excerpt, content, hindi_content, read_time,
          hindi_read_time, tags_json, is_published, meta_title, meta_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          b.id,
          b.title,
          b.hindiTitle || '',
          b.slug,
          b.author || '',
          b.publishedAt || b.createdAt || b.date || '',
          b.category || '',
          b.hindiCategory || '',
          b.featuredImage || b.image || '',
          b.excerpt || '',
          b.hindiExcerpt || '',
          b.content || '',
          b.hindiContent || '',
          b.readingTime || b.readTime || '',
          b.hindiReadingTime || b.hindiReadTime || '',
          JSON.stringify(b.tags || []),
          b.isPublished !== false ? 1 : 0,
          b.seoTitle || b.metaTitle || '',
          b.metaDescription || '',
        ]
      );
    }
    console.log(`✅ Seeded ${initialBlogPosts.length} blog posts.`);
  }

  // 7. Seed FAQs
  const faqRows = await query('SELECT COUNT(*) as count FROM faqs');
  if (faqRows[0].count === 0) {
    for (const f of initialFAQs) {
      await execute(
        `INSERT INTO faqs (id, question, hindi_question, answer, hindi_answer, category, hindi_category, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          f.id,
          f.question,
          f.hindiQuestion || '',
          f.answer,
          f.hindiAnswer || '',
          f.category || '',
          (f as any).hindiCategory || '',
          f.isPublished !== false ? 1 : 0,
        ]
      );
    }
    console.log(`✅ Seeded ${initialFAQs.length} faqs.`);
  }

  // 8. Seed Admin Users
  const adminRows = await query('SELECT COUNT(*) as count FROM admin_users');
  if (adminRows[0].count === 0) {
    const passwordHash = await bcrypt.hash('AasthaAdmin#2026', 10);
    await execute(
      `INSERT INTO admin_users (id, username, password_hash, name, email, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['admin-1', 'admin', passwordHash, 'Aastha Super Admin', 'admin@aasthaserasta.com', 'SuperAdmin', 1]
    );
    console.log('✅ Seeded default admin user (username: admin, password: AasthaAdmin#2026).');
  }

  console.log('🎉 Seeding completed successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
