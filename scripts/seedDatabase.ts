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
  await execute('DROP TABLE IF EXISTS admin_users');
  await execute('DROP TABLE IF EXISTS poojas');
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
  await execute('DELETE FROM poojas');
  for (const item of initialPoojas) {
    const p = item as any;
    await execute(
      `INSERT INTO poojas (
        id, name, hindi_name, slug, category_id, category_name, hindi_category_name,
        page_type, primary_keyword, secondary_keywords_json, search_intent, seo_title, meta_description, url_slug, h1, quick_answer,
        short_description, hindi_short_description, description, hindi_description,
        temple_name, hindi_temple_name, location, hindi_location, city, hindi_city,
        price, original_price, advance_booking_amount, duration, hindi_duration,
        timing, hindi_timing, samagri_included, prasad_home_delivery, live_video_available,
        vip_entry_pass, pandit_count, image, gallery_images_json, what_we_offer_json, benefits_json,
        hindi_benefits_json, who_can_consider_json, procedure_steps_json, hindi_procedure_steps_json,
        faqs_json, internal_links_json, image_seo_json, schema_types_json, quality_score, ideal_for, hindi_ideal_for, auspicious_days, hindi_auspicious_days,
        mantra, hindi_mantra, is_popular, is_published, meta_title
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id,
        p.name,
        p.hindiName || '',
        p.slug,
        p.categoryId || '',
        p.categoryName || '',
        p.hindiCategoryName || '',
        p.pageType || p.categoryName || '',
        p.primaryKeyword || p.focusKeyword || '',
        JSON.stringify(p.secondaryKeywords || []),
        p.searchIntent || '',
        p.seoTitle || p.metaTitle || '',
        p.metaDescription || '',
        p.urlSlug || `/pooja/${p.slug}`,
        p.h1 || p.name,
        p.quickAnswer || '',
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
        JSON.stringify(p.whatWeOffer || []),
        JSON.stringify(p.benefits || []),
        JSON.stringify(p.hindiBenefits || []),
        JSON.stringify(p.whoCanConsider || p.whoIsItFor || []),
        JSON.stringify(p.procedureSteps || p.preparation || []),
        JSON.stringify(p.hindiProcedureSteps || p.hindiPreparation || []),
        JSON.stringify(p.faqs || p.aeoQuestions || []),
        JSON.stringify(p.internalLinks || []),
        JSON.stringify(p.imageSeo || {}),
        JSON.stringify(p.schemaTypes || []),
        p.qualityScore || 95,
        p.idealFor || '',
        p.hindiIdealFor || '',
        p.auspiciousDays || '',
        p.hindiAuspiciousDays || '',
        p.mantra || '',
        p.hindiMantra || '',
        p.isFeatured ? 1 : 0,
        p.isPublished !== false ? 1 : 0,
        p.seoTitle || p.metaTitle || '',
      ]
    );
  }
  console.log(`✅ Seeded ${initialPoojas.length} poojas.`);

  // 4. Seed Tours
  await execute('DELETE FROM tours');
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
        t.description || t.shortDescription || t.overview || '',
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

  // 5. Seed Destinations
  await execute('DELETE FROM destinations');
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

  // 6. Seed Blogs
  await execute('DELETE FROM blog_posts');
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

  // 7. Seed FAQs
  await execute('DELETE FROM faqs');
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

  // 8. Seed Admin Users
  await execute('DELETE FROM admin_users');
  const fullPermissions = JSON.stringify({
    canViewOverview: true,
    canManageLeads: true,
    canManageBlogs: true,
    canManageServices: true,
    canManageSettings: true,
    canManageSocials: true,
    canManageStaff: true,
  });

  const managerPermissions = JSON.stringify({
    canViewOverview: true,
    canManageLeads: true,
    canManageBlogs: true,
    canManageServices: true,
    canManageSettings: false,
    canManageSocials: false,
    canManageStaff: false,
  });

  const editorPermissions = JSON.stringify({
    canViewOverview: true,
    canManageLeads: false,
    canManageBlogs: true,
    canManageServices: true,
    canManageSettings: false,
    canManageSocials: false,
    canManageStaff: false,
  });

  const pass1 = await bcrypt.hash('AasthaAdmin#2026', 10);
  const pass2 = await bcrypt.hash('manager123', 10);
  const pass3 = await bcrypt.hash('editor123', 10);

  await execute(
    `INSERT INTO admin_users (id, username, password_hash, passcode, name, email, phone, role, is_active, permissions_json, last_login)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ['staff-admin-1', 'admin', pass1, 'mahakal', 'Aastha Super Admin', 'admin@aasthaseva.com', '+91 98260 00000', 'Admin', 1, fullPermissions, 'Just now']
  );

  await execute(
    `INSERT INTO admin_users (id, username, password_hash, passcode, name, email, phone, role, is_active, permissions_json, last_login)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ['staff-manager-1', 'manager', pass2, 'manager123', 'Rajesh Sharma (Operations Manager)', 'manager@aasthaseva.com', '+91 98260 11111', 'Manager', 1, managerPermissions, 'Never']
  );

  await execute(
    `INSERT INTO admin_users (id, username, password_hash, passcode, name, email, phone, role, is_active, permissions_json, last_login)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ['staff-editor-1', 'editor', pass3, 'editor123', 'Priya Verma (Content Editor)', 'editor@aasthaseva.com', '+91 98260 22222', 'Editor', 1, editorPermissions, 'Never']
  );

  console.log('✅ Seeded 3 admin & staff users (Admin: mahakal, Manager: manager123, Editor: editor123).');

  console.log('🎉 Seeding completed successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
