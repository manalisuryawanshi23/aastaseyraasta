import bcrypt from 'bcryptjs';
import { testConnection, query, execute, getLastDbError } from './mysql';
import {
  initialSiteSettings,
  initialPoojas,
  initialTours,
  initialDestinations,
  initialFAQs,
  initialGalleryItems,
} from '../data/initialData';

const TABLE_SCHEMAS = [
  `CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    business_name VARCHAR(255) NOT NULL,
    hindi_business_name VARCHAR(255),
    tagline VARCHAR(255),
    phone1 VARCHAR(50),
    phone2 VARCHAR(50),
    whatsapp_number VARCHAR(50),
    emergency_helpline VARCHAR(50),
    email VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(20),
    logo_text VARCHAR(255),
    social_facebook VARCHAR(255),
    social_instagram VARCHAR(255),
    social_youtube VARCHAR(255),
    google_business_profile VARCHAR(255),
    social_handles_json LONGTEXT,
    default_seo_title VARCHAR(255),
    default_meta_description TEXT,
    default_og_image VARCHAR(255),
    google_analytics_id VARCHAR(50),
    business_hours VARCHAR(255),
    footer_description TEXT,
    announcement_banner_json LONGTEXT,
    trust_stats_json LONGTEXT,
    about_mission_text TEXT,
    brand_palette_json LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS poojas (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hindi_name VARCHAR(255),
    slug VARCHAR(150) NOT NULL UNIQUE,
    category_id VARCHAR(50),
    category_name VARCHAR(100),
    hindi_category_name VARCHAR(100),
    page_type VARCHAR(100),
    primary_keyword VARCHAR(255),
    secondary_keywords_json LONGTEXT,
    search_intent VARCHAR(255),
    seo_title VARCHAR(255),
    meta_description TEXT,
    url_slug VARCHAR(150),
    h1 VARCHAR(255),
    quick_answer TEXT,
    short_description TEXT,
    hindi_short_description TEXT,
    description LONGTEXT,
    hindi_description LONGTEXT,
    temple_name VARCHAR(255),
    hindi_temple_name VARCHAR(255),
    location VARCHAR(255),
    hindi_location VARCHAR(255),
    city VARCHAR(100),
    hindi_city VARCHAR(100),
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    original_price DECIMAL(10,2),
    advance_booking_amount DECIMAL(10,2),
    duration VARCHAR(50),
    hindi_duration VARCHAR(50),
    timing VARCHAR(100),
    hindi_timing VARCHAR(100),
    samagri_included TINYINT(1) DEFAULT 1,
    prasad_home_delivery TINYINT(1) DEFAULT 1,
    live_video_available TINYINT(1) DEFAULT 1,
    vip_entry_pass TINYINT(1) DEFAULT 0,
    pandit_count INT DEFAULT 1,
    image VARCHAR(550),
    gallery_images_json LONGTEXT,
    what_we_offer_json LONGTEXT,
    benefits_json LONGTEXT,
    hindi_benefits_json LONGTEXT,
    who_can_consider_json LONGTEXT,
    procedure_steps_json LONGTEXT,
    hindi_procedure_steps_json LONGTEXT,
    faqs_json LONGTEXT,
    internal_links_json LONGTEXT,
    image_seo_json LONGTEXT,
    schema_types_json LONGTEXT,
    quality_score INT DEFAULT 95,
    ideal_for VARCHAR(255),
    hindi_ideal_for VARCHAR(255),
    auspicious_days VARCHAR(255),
    hindi_auspicious_days VARCHAR(255),
    mantra VARCHAR(255),
    hindi_mantra VARCHAR(255),
    is_popular TINYINT(1) DEFAULT 0,
    is_published TINYINT(1) DEFAULT 1,
    meta_title VARCHAR(255),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS tours (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    hindi_title VARCHAR(255),
    slug VARCHAR(150) NOT NULL UNIQUE,
    duration VARCHAR(50),
    hindi_duration VARCHAR(50),
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    original_price DECIMAL(10,2),
    badge VARCHAR(100),
    hindi_badge VARCHAR(100),
    image VARCHAR(550),
    gallery_images_json LONGTEXT,
    pickup_location VARCHAR(255),
    hindi_pickup_location VARCHAR(255),
    drop_location VARCHAR(255),
    hindi_drop_location VARCHAR(255),
    vehicle_options_json LONGTEXT,
    overview TEXT,
    hindi_overview TEXT,
    itinerary_json LONGTEXT,
    key_highlights_json LONGTEXT,
    hindi_key_highlights_json LONGTEXT,
    inclusions_json LONGTEXT,
    hindi_inclusions_json LONGTEXT,
    exclusions_json LONGTEXT,
    hindi_exclusions_json LONGTEXT,
    faqs_json LONGTEXT,
    is_popular TINYINT(1) DEFAULT 0,
    is_published TINYINT(1) DEFAULT 1,
    meta_title VARCHAR(255),
    meta_description TEXT,
    quick_answer TEXT,
    why_choose_json LONGTEXT,
    what_we_offer_json LONGTEXT,
    how_to_reach TEXT,
    travel_tips_json LONGTEXT,
    category VARCHAR(100),
    focus_keyword VARCHAR(255),
    secondary_keywords_json LONGTEXT,
    canonical_url VARCHAR(255),
    og_title VARCHAR(255),
    og_description TEXT,
    og_image VARCHAR(550),
    destinations_json LONGTEXT,
    places_covered_json LONGTEXT,
    temples_covered_json LONGTEXT,
    hindi_destinations_json LONGTEXT,
    hindi_places_covered_json LONGTEXT,
    hindi_temples_covered_json LONGTEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS destinations (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    hindi_title VARCHAR(255),
    slug VARCHAR(150) NOT NULL UNIQUE,
    city VARCHAR(100),
    hindi_city VARCHAR(100),
    state VARCHAR(100),
    image VARCHAR(550),
    gallery_images_json LONGTEXT,
    distance_from_center VARCHAR(100),
    hindi_distance_from_center VARCHAR(100),
    timings VARCHAR(100),
    hindi_timings VARCHAR(100),
    best_time_to_visit VARCHAR(100),
    hindi_best_time_to_visit VARCHAR(100),
    description LONGTEXT,
    hindi_description LONGTEXT,
    spiritual_significance TEXT,
    hindi_spiritual_significance TEXT,
    key_attractions_json LONGTEXT,
    hindi_key_attractions_json LONGTEXT,
    how_to_reach_json LONGTEXT,
    nearby_temples_json LONGTEXT,
    map_coordinates_json LONGTEXT,
    is_published TINYINT(1) DEFAULT 1,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    hindi_title VARCHAR(255),
    slug VARCHAR(150) NOT NULL UNIQUE,
    author VARCHAR(100),
    date VARCHAR(50),
    category VARCHAR(100),
    hindi_category VARCHAR(100),
    image VARCHAR(550),
    excerpt TEXT,
    hindi_excerpt TEXT,
    content LONGTEXT,
    hindi_content LONGTEXT,
    read_time VARCHAR(50),
    hindi_read_time VARCHAR(50),
    tags_json LONGTEXT,
    is_published TINYINT(1) DEFAULT 1,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS faqs (
    id VARCHAR(100) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    hindi_question VARCHAR(255),
    answer TEXT NOT NULL,
    hindi_answer TEXT,
    category VARCHAR(100),
    hindi_category VARCHAR(100),
    is_published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    service_type VARCHAR(50) NOT NULL DEFAULT 'Pooja',
    service_name VARCHAR(255),
    preferred_date VARCHAR(50),
    guest_count VARCHAR(20),
    message TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'New',
    notes TEXT,
    source VARCHAR(50) DEFAULT 'Website Form',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(100) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    passcode VARCHAR(100),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'Admin',
    is_active TINYINT(1) DEFAULT 1,
    permissions_json LONGTEXT,
    last_login VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS gallery_items (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(550) NOT NULL,
    alt_text VARCHAR(255),
    category VARCHAR(100) NOT NULL DEFAULT 'Pooja',
    location VARCHAR(100),
    sort_order INT DEFAULT 0,
    is_published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

export async function autoInitializeDatabase() {
  const result = {
    connected: false,
    schemaCreated: false,
    seeded: {
      settings: false,
      poojas: 0,
      tours: 0,
      destinations: 0,
      faqs: 0,
      gallery: 0,
      adminUsers: 0,
    },
    error: null as string | null,
  };

  try {
    console.log('[AUTO-DB] Checking database connection...');
    const connected = await testConnection();
    if (!connected) {
      const err = getLastDbError();
      console.log('[AUTO-DB INFO] MySQL Database not connected. Details:', err);
      result.error = err || 'Could not connect to MySQL';
      return result;
    }

    result.connected = true;
    console.log('[AUTO-DB] Connected to MySQL. Initializing tables if they do not exist...');

    // 1. Run Embedded Schema Creation
    for (const stmt of TABLE_SCHEMAS) {
      await execute(stmt);
    }
    result.schemaCreated = true;
    console.log('[AUTO-DB] Database schema verified/created.');

    // 1b. Schema Migration Guard: Ensure tours and poojas tables contain the necessary columns (json arrays and sort_order)
    if (result.connected) {
      try {
        // 1. Tours table checks
        const toursColumns = await query<any>('SHOW COLUMNS FROM tours');
        const toursColNames = toursColumns.map((col: any) => col.Field);
        
        const toursAlters: string[] = [];
        if (!toursColNames.includes('destinations_json')) {
          toursAlters.push('ADD COLUMN destinations_json LONGTEXT');
        }
        if (!toursColNames.includes('places_covered_json')) {
          toursAlters.push('ADD COLUMN places_covered_json LONGTEXT');
        }
        if (!toursColNames.includes('temples_covered_json')) {
          toursAlters.push('ADD COLUMN temples_covered_json LONGTEXT');
        }
        if (!toursColNames.includes('hindi_destinations_json')) {
          toursAlters.push('ADD COLUMN hindi_destinations_json LONGTEXT');
        }
        if (!toursColNames.includes('hindi_places_covered_json')) {
          toursAlters.push('ADD COLUMN hindi_places_covered_json LONGTEXT');
        }
        if (!toursColNames.includes('hindi_temples_covered_json')) {
          toursAlters.push('ADD COLUMN hindi_temples_covered_json LONGTEXT');
        }
        if (!toursColNames.includes('sort_order')) {
          toursAlters.push('ADD COLUMN sort_order INT DEFAULT 0');
        }
        
        if (toursAlters.length > 0) {
          console.log('[AUTO-DB] tours table is missing columns. Running ALTER migrations...', toursAlters);
          await execute(`ALTER TABLE tours ${toursAlters.join(', ')}`);
          console.log('[AUTO-DB] tours table schema successfully updated!');
          
          // Delete existing tours so the seeding block below re-seeds them with fresh, complete columns
          await execute('DELETE FROM tours');
          console.log('[AUTO-DB] Cleared old tours to trigger re-seeding with updated columns.');
        }

        // 2. Poojas table checks
        const poojasColumns = await query<any>('SHOW COLUMNS FROM poojas');
        const poojasColNames = poojasColumns.map((col: any) => col.Field);
        
        const poojasAlters: string[] = [];
        if (!poojasColNames.includes('sort_order')) {
          poojasAlters.push('ADD COLUMN sort_order INT DEFAULT 0');
        }
        
        if (poojasAlters.length > 0) {
          console.log('[AUTO-DB] poojas table is missing columns. Running ALTER migrations...', poojasAlters);
          await execute(`ALTER TABLE poojas ${poojasAlters.join(', ')}`);
          console.log('[AUTO-DB] poojas table schema successfully updated!');
        }
      } catch (e) {
        console.error('[AUTO-DB WARNING] Failed to run schema check or migrations for tours/poojas:', e);
      }
    }

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
      result.seeded.settings = true;
    }

    // 3. Safe Auto-Seeding: Poojas
    const poojasCount = await query('SELECT COUNT(*) as count FROM poojas');
    if (poojasCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default poojas...');
      for (let idx = 0; idx < initialPoojas.length; idx++) {
        const p = initialPoojas[idx] as any;
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
            mantra, hindi_mantra, is_popular, is_published, meta_title, sort_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
            p.price || 0.00,
            p.originalPrice || null,
            p.advanceBookingAmount || null,
            p.duration || '',
            p.hindiDuration || '',
            p.timing || '',
            p.hindiTiming || '',
            p.samagriIncluded !== false ? 1 : 0,
            p.prasadHomeDelivery !== false ? 1 : 0,
            p.liveVideoAvailable !== false ? 1 : 0,
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
            idx + 1,
          ]
        );
        result.seeded.poojas++;
      }
    }

    // 4. Safe Auto-Seeding: Tours
    const toursCount = await query('SELECT COUNT(*) as count FROM tours');
    if (toursCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default tours...');
      for (let idx = 0; idx < initialTours.length; idx++) {
        const t = initialTours[idx] as any;
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
            og_title, og_description, og_image,
            destinations_json, places_covered_json, temples_covered_json,
            hindi_destinations_json, hindi_places_covered_json, hindi_temples_covered_json, sort_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
            JSON.stringify(t.destinations || []),
            JSON.stringify(t.placesCovered || []),
            JSON.stringify(t.templesCovered || []),
            JSON.stringify(t.hindiDestinations || []),
            JSON.stringify(t.hindiPlacesCovered || []),
            JSON.stringify(t.hindiTemplesCovered || []),
            idx + 1,
          ]
        );
        result.seeded.tours++;
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
        result.seeded.destinations++;
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
        result.seeded.faqs++;
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
      result.seeded.adminUsers++;

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
      result.seeded.adminUsers++;
    }

    // 8. Safe Auto-Seeding: Gallery Items
    const galleryCount = await query('SELECT COUNT(*) as count FROM gallery_items');
    if (galleryCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default gallery items...');
      for (const item of initialGalleryItems) {
        const g = item as any;
        await execute(
          `INSERT INTO gallery_items (
            id, title, description, image, alt_text, category, location, sort_order, is_published
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            g.id,
            g.title,
            g.description || '',
            g.image,
            g.altText || g.title || '',
            g.category || 'Pooja',
            g.location || '',
            g.sortOrder || 0,
            g.isPublished !== false ? 1 : 0,
          ]
        );
        result.seeded.gallery = (result.seeded.gallery || 0) + 1;
      }
    }

    // Sapt Sagar Name Migration Update Statement
    console.log('[AUTO-DB] Migrating Sapt Sagar water body names in database...');
    await execute(
      `UPDATE tours 
       SET overview = REPLACE(overview, 'Kaushalya Sagar, Som Sagar', 'Purushottam Sagar, Ratnakar Sagar'),
           quick_answer = REPLACE(quick_answer, 'Kaushalya Sagar, Som Sagar', 'Purushottam Sagar, Ratnakar Sagar'),
           places_covered_json = REPLACE(REPLACE(places_covered_json, '"Kaushalya Sagar"', '"Purushottam Sagar"'), '"Som Sagar"', '"Ratnakar Sagar"'),
           itinerary_json = REPLACE(REPLACE(itinerary_json, 'Kaushalya, Som', 'Purushottam, Ratnakar'), 'Kaushalya, Som', 'Purushottam, Ratnakar'),
           faqs_json = REPLACE(faqs_json, 'Kaushalya Sagar, Som Sagar', 'Purushottam Sagar, Ratnakar Sagar')
       WHERE id = 'tour-sapt-sagar'`
    );

    // 84 Mahadev 3/4 Days and Mahakaleshwar Pilgrimage Update Statement
    console.log('[AUTO-DB] Migrating 84 Mahadev Yatra itinerary and destinations in database...');
    const updatedItinerary = [
      {
        dayNumber: 1,
        title: "Sacred Sankalp & Initial Shrines (Temples 1-21)",
        description: "Perform initial gotra sankalp and begin the parikrama from Agastyeshwar, followed by the first 21 Shiva shrines."
      },
      {
        dayNumber: 2,
        title: "Historical Quarter Shrines (Temples 22-42)",
        description: "Continue the parikrama visiting temples 22 to 42 situated within the historic core of Ujjain."
      },
      {
        dayNumber: 3,
        title: "Rural & Outer Border Shrines (Temples 43-63)",
        description: "Travel to the peaceful outer boundary locations to visit Shiva temples 43 to 63."
      },
      {
        dayNumber: 4,
        title: "Parikrama Conclusion & Rudrabhishek (Temples 64-84)",
        description: "Visit the final temples 64 to 84, followed by a concluding Abhishek Pooja at Mahakaleshwar temple."
      }
    ];
    const updatedDestinations = ["Mahakaleshwar", "Ujjain 84 Shrines"];
    const updatedPlacesCovered = ["84 Mahadev Temples", "Ramghat", "Harsiddhi", "Mahakaleshwar Jyotirlinga"];
    const updatedWhyChoose = [
      "Covers the full traditional 84 Mahadev parikrama circuit in Ujjain.",
      "Complete puja samagri and Pandit coordination included.",
      "Private transport to navigate through diverse temple locations.",
      "Conclude with sacred Mahakaleshwar Jyotirlinga Darshan."
    ];
    const updatedTravelTips = [
      "The full parikrama is usually done comfortably over 3 to 4 days.",
      "Maintain a list of the 84 temples to track your visits.",
      "Offer Bilva leaves and water to the Shivlings at each temple."
    ];
    const updatedFaqs = [
      {
        question: "How long does the 84 Mahadev Yatra take?",
        answer: "It takes 3 to 4 days to comfortably visit all 84 temples located across Ujjain."
      },
      {
        question: "Do we perform Pooja at all 84 temples?",
        answer: "Devotees typically offer water and Bilva leaves at all temples, and perform special Abhishek/Pooja at selected major shrines."
      },
      {
        question: "Is this tour customizable?",
        answer: "Yes, we can design the pace according to your arrival and stay duration."
      }
    ];

    await execute(
      `UPDATE tours 
       SET duration = '3 Days / 4 Days',
           overview = REPLACE(overview, 'Over two to three days', 'Over three to four days'),
           destinations_json = ?,
           places_covered_json = ?,
           itinerary_json = ?,
           why_choose_json = ?,
           travel_tips_json = ?,
           faqs_json = ?
       WHERE id = 'tour-84-mahadev'`,
      [
        JSON.stringify(updatedDestinations),
        JSON.stringify(updatedPlacesCovered),
        JSON.stringify(updatedItinerary),
        JSON.stringify(updatedWhyChoose),
        JSON.stringify(updatedTravelTips),
        JSON.stringify(updatedFaqs)
      ]
    );

    // 9 Narayana Names Migration Update Statement
    console.log('[AUTO-DB] Migrating 9 Narayana names in database...');
    await execute(
      `UPDATE tours 
       SET overview = REPLACE(overview, 'Anant Narayan, Satya Narayan, Purushottam Narayan, Adinarayan, Sheshnarayan, Padmanabha, Dharanidhara, Laxminarayan, and Badrinarayan', 'Leela Purushottam Narayan, Anant Narayan, Satya Narayan, Chaturbhuj Narayan, Adi Narayan, Shesh Narayan, Padma Narayan, Lakshmi Narayan, and Badri Narayan'),
           quick_answer = REPLACE(quick_answer, 'Anant Narayan, Satya Narayan, Purushottam Narayan, Adinarayan, Sheshnarayan, Padmanabhanarayan, Dharanidharanarayan, Laxminarayan, and Badri Narayan', 'Leela Purushottam Narayan, Anant Narayan, Satya Narayan, Chaturbhuj Narayan, Adi Narayan, Shesh Narayan, Padma Narayan, Lakshmi Narayan, and Badri Narayan')
       WHERE id = 'tour-9-narayana'`
    );

    // 6 Vinayak Names Migration Update Statement
    console.log('[AUTO-DB] Migrating 6 Vinayak names in database...');
    await execute(
      `UPDATE tours 
       SET overview = REPLACE(overview, 'Pramod, Sumukh, Gajanand, Bhalchandra, Jatashankar, and Vignaharan Vinayak', 'Chintaman Ganesh Vinayak, Sthirman Ganesh Vinayak, Aamod-Pramod Vinayak, Modakpriya Vinayak, Durmukh Ganesh Vinayak, and Avighna Vinayak'),
           quick_answer = REPLACE(quick_answer, 'Pramod Vinayak, Sumukh Vinayak, Gajanand Vinayak, Bhalchandra Vinayak, Jatashankar Vinayak, and Vignaharan Vinayak', 'Chintaman Ganesh Vinayak, Sthirman Ganesh Vinayak, Aamod-Pramod Vinayak, Modakpriya Vinayak, Durmukh Ganesh Vinayak, and Avighna Vinayak')
       WHERE id = 'tour-6-vinayak'`
    );

    // Ujjain-Baglamukhi Nalkheda Tour WhyChoose Update Statement
    console.log('[AUTO-DB] Migrating Ujjain-Baglamukhi Nalkheda tour whyChoose in database...');
    await execute(
      `UPDATE tours 
       SET why_choose_json = REPLACE(why_choose_json, 'Direct pandit contacts at Nalkheda for yellow Havan rituals.', 'Complete arrangement at nalkheda for yellow havan rituals.')
       WHERE id = 'tour-ujjain-baglamukhi'`
    );

    // Ujjain-Baglamukhi Nalkheda Tour TravelTips Update Statement
    console.log('[AUTO-DB] Migrating Ujjain-Baglamukhi Nalkheda tour travelTips in database...');
    const updatedNalkhedaTips = [
      "It is customary to offer yellow flowers, coconut, and yellow sweets to Maa Baglamukhi.",
      "Havan rituals at Nalkheda can take 1-2 hours depending on the type."
    ];
    await execute(
      `UPDATE tours 
       SET travel_tips_json = ?
       WHERE id = 'tour-ujjain-baglamukhi'`,
      [JSON.stringify(updatedNalkhedaTips)]
    );

    // Ujjain-Omkareshwar-Baglamukhi Nalkheda Tour TravelTips Update Statement
    console.log('[AUTO-DB] Migrating Ujjain-Omkareshwar-Baglamukhi Nalkheda tour travelTips in database...');
    await execute(
      `UPDATE tours 
       SET travel_tips_json = REPLACE(travel_tips_json, 'Consult local pandits beforehand if you wish to perform special Havans at Nalkheda.', 'Consult Aastha Sey Raasta beforehand if you wish to perform special Havans at Nalkheda.')
       WHERE id = 'tour-ujjain-omkareshwar-baglamukhi'`
    );

    // Ujjain-Omkareshwar-Indore Tour Migration
    console.log('[AUTO-DB] Migrating Ujjain-Omkareshwar-Indore tour in database...');
    const updatedUOIPlaces = [
      "Ujjain Darshan",
      "Omkareshwar & Mamleshwar",
      "Indore Khajrana Ganesh",
      "Pitra Parvat",
      "Lal Bagh Palace"
    ];
    const updatedUOIItinerary = [
      {
        "dayNumber": 1,
        "title": "Indore Arrival & Ujjain Transfer",
        "description": "Pickup from Indore, transfer to Ujjain. Perform local temple darshan (Mahakaleshwar, Harsiddhi, Kal Bhairav)."
      },
      {
        "dayNumber": 2,
        "title": "Ujjain to Omkareshwar",
        "description": "Early travel to Omkareshwar on Narmada. Boat ride to island temple, Darshan of Omkareshwar & Mamleshwar."
      },
      {
        "dayNumber": 3,
        "title": "Indore Local Sightseeing & Departure",
        "description": "Drive back to Indore. Visit the grand Lal Bagh Palace, seek wish-fulfilling blessings at Khajrana Ganesha Temple, and visit the sacred Pitra Parvat to see the monumental 72-foot Pitreshwar Hanuman statue before departure."
      }
    ];
    const updatedUOIWhy = [
      "Combines twin Jyotirlinga Darshan with Indore's cultural, heritage, and religious tour.",
      "Covers Khajrana Ganesh, Lal Bagh Palace, and the iconic 72-ft Pitra Parvat Hanuman statue.",
      "Pick and drop options from both Ujjain and Indore."
    ];
    const updatedUOIFaqs = [
      {
        "question": "Where is the pickup point?",
        "answer": "We pick you up from Indore airport, Indore station, or Ujjain station based on your preference."
      },
      {
        "question": "What is included in the hotel stays?",
        "answer": "We arrange comfortable AC rooms with attached bath and breakfast included."
      },
      {
        "question": "Can we customize the Indore sightseeing list?",
        "answer": "Yes, we can customize the list to include Rajwada Palace, Chappan Dukan, Sarafa Bazaar, or other destinations based on your travel preferences."
      }
    ];
    const updatedUOITips = [
      "Indore is known as the cleanest city in India; please keep trash in bins.",
      "Dress conservatively for Jyotirlinga entries."
    ];
    await execute(
      `UPDATE tours 
       SET overview = 'The Ujjain – Omkareshwar – Indore Tour is an optimized 3-day spiritual and heritage package meticulously designed for family yatras and senior citizens. This comprehensive circuit seamlessly connects the twin Jyotirlingas of Madhya Pradesh with Indore’s prominent cultural landmarks.\\n\\nYour pilgrimage starts in holy Ujjain with an extensive Ujjain Darshan covering Mahakaleshwar Jyotirlinga, Harsiddhi Shaktipeeth, and Kal Bhairav temple. On Day 2, you will journey to the serene Narmada River island for the sacred darshan of Omkareshwar and Mamleshwar Jyotirlingas. On the final day, the tour enters Indore to cover the wish-fulfilling Khajrana Ganesh Temple, the monumental 72-foot metallic Pitreshwar Hanuman statue at Pitra Parvat, and the magnificent European-inspired Lal Bagh Palace of the Holkar dynasty. This itinerary offers a perfect blend of profound Vedic rituals and royal Central Indian history.',
           quick_answer = 'The Ujjain – Omkareshwar – Indore Tour is a 3-day spiritual and heritage circuit. It covers the Mahakaleshwar Jyotirlinga in Ujjain, the Omkareshwar & Mamleshwar Jyotirlingas on the Narmada River, and Indore\\\'s main attractions: the historic Lal Bagh Palace, wish-fulfilling Khajrana Ganesh Temple, and the monumental Pitreshwar Hanuman at Pitra Parvat.',
           places_covered_json = ?,
           itinerary_json = ?,
           why_choose_json = ?,
           faqs_json = ?,
           travel_tips_json = ?
       WHERE id = 'tour-ujjain-omkareshwar-indore'`,
      [
        JSON.stringify(updatedUOIPlaces),
        JSON.stringify(updatedUOIItinerary),
        JSON.stringify(updatedUOIWhy),
        JSON.stringify(updatedUOIFaqs),
        JSON.stringify(updatedUOITips)
      ]
    );

    // Sync sequential sort_order for all default tours
    console.log('[AUTO-DB] Aligning tour sort_orders in database...');
    for (let idx = 0; idx < initialTours.length; idx++) {
      const t = initialTours[idx];
      await execute('UPDATE tours SET sort_order = ? WHERE id = ?', [idx + 1, t.id]);
    }

    // Sync all destinations details, attractions, and images in database
    console.log('[AUTO-DB] Syncing all destinations key data, description, attractions, and images in database...');
    for (const item of initialDestinations) {
      const d = item as any;
      await execute(
        `UPDATE destinations 
         SET title = ?, 
             hindi_title = ?, 
             description = ?, 
             hindi_description = ?, 
             image = ?, 
             key_attractions_json = ?, 
             hindi_key_attractions_json = ?, 
             nearby_temples_json = ? 
         WHERE id = ?`,
        [
          d.name || d.title || '',
          d.hindiName || d.hindiTitle || '',
          d.description || '',
          d.hindiDescription || '',
          d.image || d.heroImage || '',
          JSON.stringify(d.keyAttractions || d.placesToVisit || []),
          JSON.stringify(d.hindiKeyAttractions || []),
          JSON.stringify(d.nearbyTemples || d.temples || []),
          d.id
        ]
      );
    }

    console.log('[AUTO-DB SUCCESS] Database tables and default records verified and seeded successfully!');
    return result;
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    console.error('[AUTO-DB ERROR] Auto initialization failed:', errorMsg);
    result.error = errorMsg;
    return result;
  }
}
