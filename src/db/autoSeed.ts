import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { testConnection, query, execute } from './mysql';
import {
  initialSiteSettings,
  initialPoojas,
  initialTours,
  initialDestinations,
  initialFAQs,
} from '../data/initialData';

export async function autoInitializeDatabase() {
  try {
    console.log('[AUTO-DB] Checking database connection...');
    const connected = await testConnection();
    if (!connected) {
      console.log('[AUTO-DB INFO] MySQL Database not available/configured. Running with in-memory fallback.');
      return;
    }

    console.log('[AUTO-DB] Connected to MySQL. Initializing tables if they do not exist...');

    // 1. Run Schema Creation
    const schemaPath = path.join(process.cwd(), 'src', 'db', 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      console.warn('[AUTO-DB WARNING] schema.sql file not found at:', schemaPath);
      return;
    }

    const sqlContent = fs.readFileSync(schemaPath, 'utf-8');
    const statements = sqlContent
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await execute(stmt);
    }
    console.log('[AUTO-DB] Database schema verified/created.');

    // 2. Safe Auto-Seeding: Site Settings
    const settingsCount = await query('SELECT COUNT(*) as count FROM site_settings');
    if (settingsCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default site settings...');
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
    }

    // 3. Safe Auto-Seeding: Poojas
    const poojasCount = await query('SELECT COUNT(*) as count FROM poojas');
    if (poojasCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default poojas...');
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
    }

    // 4. Safe Auto-Seeding: Tours
    const toursCount = await query('SELECT COUNT(*) as count FROM tours');
    if (toursCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default tours...');
      for (const item of initialTours) {
        const t = item as any;
        await execute(
          `INSERT INTO tours (
            id, title, hindi_title, slug, duration, hindi_duration, price, original_price,
            badge, hindi_badge, image, gallery_images_json, pickup_location, hindi_pickup_location,
            drop_location, hindi_drop_location, vehicle_options_json, overview, hindi_overview,
            itinerary_json, key_highlights_json, hindi_key_highlights_json, inclusions_json,
            hindi_inclusions_json, exclusions_json, hindi_exclusions_json, faqs_json,
            is_popular, is_published, meta_title, meta_description,
            quick_answer, why_choose_json, what_we_offer_json, how_to_reach, travel_tips_json,
            category, focus_keyword, secondary_keywords_json, canonical_url,
            og_title, og_description, og_image
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
            t.featuredImage || t.image || '',
            JSON.stringify(t.gallery || t.galleryImages || []),
            t.pickupLocation || t.startingPoint || '',
            t.hindiPickupLocation || t.hindiStartingPoint || '',
            t.dropLocation || t.endingPoint || '',
            t.hindiDropLocation || t.hindiEndingPoint || '',
            JSON.stringify(t.vehicleOptions || []),
            t.description || t.overview || '',
            t.hindiDescription || t.hindiOverview || '',
            JSON.stringify(t.itinerary || []),
            JSON.stringify(t.keyHighlights || []),
            JSON.stringify(t.hindiKeyHighlights || []),
            JSON.stringify(t.included || t.inclusions || []),
            JSON.stringify(t.hindiIncluded || t.hindiInclusions || []),
            JSON.stringify(t.excluded || t.exclusions || []),
            JSON.stringify(t.hindiExcluded || t.hindiExclusions || []),
            JSON.stringify(t.faqs || []),
            t.isFeatured ? 1 : 0,
            t.isPublished !== false ? 1 : 0,
            t.seoTitle || t.metaTitle || '',
            t.metaDescription || '',
            t.quickAnswer || '',
            JSON.stringify(t.whyChoose || []),
            JSON.stringify(t.whatWeOffer || []),
            t.howToReach || '',
            JSON.stringify(t.travelTips || []),
            t.category || '',
            t.focusKeyword || '',
            JSON.stringify(t.secondaryKeywords || []),
            t.canonicalUrl || '',
            t.ogTitle || '',
            t.ogDescription || '',
            t.ogImage || '',
          ]
        );
      }
    }

    // 5. Safe Auto-Seeding: Destinations
    const destCount = await query('SELECT COUNT(*) as count FROM destinations');
    if (destCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default destinations...');
      for (const item of initialDestinations) {
        const d = item as any;
        await execute(
          `INSERT INTO destinations (
            id, title, hindi_title, slug, city, hindi_city, state, image, gallery_images_json,
            distance_from_center, hindi_distance_from_center, timings, hindi_timings,
            best_time_to_visit, hindi_best_time_to_visit, description, hindi_description,
            spiritual_significance, hindi_spiritual_significance, key_attractions_json,
            hindi_key_attractions_json, how_to_reach_json, nearby_temples_json, map_coordinates_json,
            is_published, meta_title, meta_description
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            d.id,
            d.name || d.title || '',
            d.hindiName || d.hindiTitle || '',
            d.slug,
            d.city || '',
            d.hindiCity || '',
            d.state || '',
            d.image || d.heroImage || '',
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
            JSON.stringify(d.keyAttractions || []),
            JSON.stringify(d.hindiKeyAttractions || []),
            JSON.stringify(d.howToReach || {}),
            JSON.stringify(d.nearbyTemples || []),
            JSON.stringify(d.mapCoordinates || {}),
            d.isPublished !== false ? 1 : 0,
            d.seoTitle || d.metaTitle || '',
            d.metaDescription || '',
          ]
        );
      }
    }

    // 6. Safe Auto-Seeding: FAQs
    const faqsCount = await query('SELECT COUNT(*) as count FROM faqs');
    if (faqsCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default FAQs...');
      for (const item of initialFAQs) {
        const f = item as any;
        await execute(
          `INSERT INTO faqs (
            id, question, hindi_question, answer, hindi_answer, category, hindi_category, is_published
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            f.id,
            f.question,
            f.hindiQuestion || '',
            f.answer,
            f.hindiAnswer || '',
            f.category || 'General',
            f.hindiCategory || 'सामान्य',
            f.isPublished !== false ? 1 : 0,
          ]
        );
      }
    }

    // 7. Safe Auto-Seeding: Default Admin Users
    const adminsCount = await query('SELECT COUNT(*) as count FROM admin_users');
    if (adminsCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default admin users...');
      const adminHash = await bcrypt.hash('admin123', 10);
      const managerHash = await bcrypt.hash('manager123', 10);

      // Seed Pt. Sharma (Admin)
      await execute(
        `INSERT INTO admin_users (
          id, username, password_hash, passcode, name, email, phone, role, is_active, permissions_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'staff-1',
          'mahakal',
          adminHash,
          'admin123',
          'Pt. Sharma',
          'admin@aasthaseyraasta.com',
          '+91 98765 43210',
          'Admin',
          1,
          JSON.stringify(['manage_leads', 'manage_site', 'manage_content', 'manage_gallery', 'manage_settings']),
        ]
      );

      // Seed Ramesh S. (Manager)
      await execute(
        `INSERT INTO admin_users (
          id, username, password_hash, passcode, name, email, phone, role, is_active, permissions_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'staff-2',
          'ramesh',
          managerHash,
          'manager123',
          'Ramesh S.',
          'ramesh@aasthaseyraasta.com',
          '+91 98765 43211',
          'Manager',
          1,
          JSON.stringify(['manage_leads', 'manage_content', 'manage_gallery']),
        ]
      );
    }

    console.log('[AUTO-DB SUCCESS] Database tables and default records verified and seeded successfully!');
  } catch (error) {
    console.error('[AUTO-DB ERROR] Auto initialization failed:', error);
  }
}
