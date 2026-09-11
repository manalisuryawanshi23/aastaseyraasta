import bcrypt from 'bcryptjs';
import { testConnection, query, execute, getLastDbError } from './mysql';
import {
  initialSiteSettings,
  initialPoojas,
  initialTours,
  initialDestinations,
  initialFAQs,
  initialGalleryItems,
  initialDarshanItems,
  initialTestimonials,
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
    is_maintenance_mode TINYINT(1) DEFAULT 0,
    maintenance_message TEXT,
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

  `CREATE TABLE IF NOT EXISTS darshan_items (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    hindi_title VARCHAR(255),
    subtitle VARCHAR(255),
    image VARCHAR(550) NOT NULL,
    alt_text VARCHAR(255),
    location VARCHAR(100) DEFAULT 'Ujjain',
    temple_timing VARCHAR(100),
    sort_order INT DEFAULT 0,
    is_published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hindi_name VARCHAR(255),
    location VARCHAR(255),
    hindi_location VARCHAR(255),
    rating INT DEFAULT 5,
    testimonial TEXT NOT NULL,
    hindi_testimonial TEXT,
    photo VARCHAR(550),
    service VARCHAR(255),
    hindi_service VARCHAR(255),
    tour VARCHAR(255),
    category VARCHAR(100) DEFAULT 'Pooja',
    date VARCHAR(100),
    verified TINYINT(1) DEFAULT 1,
    helpful_count INT DEFAULT 0,
    review_image VARCHAR(550),
    is_featured TINYINT(1) DEFAULT 1,
    is_published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS astrology_consultations (
    id VARCHAR(100) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    age VARCHAR(50) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    dob VARCHAR(100) NOT NULL,
    birth_time VARCHAR(100) NOT NULL,
    birth_place VARCHAR(255) NOT NULL,
    concern TEXT NOT NULL,
    preferred_callback_time VARCHAR(100) DEFAULT 'Anytime',
    status VARCHAR(50) DEFAULT 'New',
    notes TEXT,
    follow_up_json LONGTEXT,
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
      testimonials: 0,
      adminUsers: 0,
      darshan: 0,
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

    // Support explicitly disabling auto-seeding via environment variable for production safety
    if (process.env.DISABLE_AUTO_SEED === 'true' || process.env.AUTO_SEED === 'false' || process.env.SKIP_DB_SEED === 'true') {
      console.log('[AUTO-DB] Auto-seeding is explicitly disabled via environment variable (DISABLE_AUTO_SEED/AUTO_SEED/SKIP_DB_SEED). Schema verified; leaving all production database records untouched.');
      return result;
    }

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

        // 3. site_settings table checks (maintenance mode columns)
        const settingsColumns = await query<any>('SHOW COLUMNS FROM site_settings');
        const settingsColNames = settingsColumns.map((col: any) => col.Field);

        const settingsAlters: string[] = [];
        if (!settingsColNames.includes('is_maintenance_mode')) {
          settingsAlters.push('ADD COLUMN is_maintenance_mode TINYINT(1) DEFAULT 0');
        }
        if (!settingsColNames.includes('maintenance_message')) {
          settingsAlters.push('ADD COLUMN maintenance_message TEXT');
        }

        if (settingsAlters.length > 0) {
          console.log('[AUTO-DB] site_settings table is missing columns. Running ALTER migrations...', settingsAlters);
          await execute(`ALTER TABLE site_settings ${settingsAlters.join(', ')}`);
          console.log('[AUTO-DB] site_settings table schema successfully updated!');
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
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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

    // 3.1 Ensure Guru Chandal Dosh Pooja has rich SEO, AEO, and GEO fields in database
    try {
      const guruChandal = initialPoojas.find((x) => x.id === 'pooja-guru-chandal') as any;
      if (guruChandal) {
        const checkExisting = await query<any>(
          'SELECT id, quick_answer, seo_title FROM poojas WHERE id = ? OR slug = ?',
          ['pooja-guru-chandal', 'guru-chandal-dosh-shanti-pooja-ujjain']
        );
        if (checkExisting.length === 0) {
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              guruChandal.id,
              guruChandal.name,
              guruChandal.hindiName || '',
              guruChandal.slug,
              guruChandal.categoryId || '',
              guruChandal.categoryName || '',
              guruChandal.hindiCategoryName || '',
              guruChandal.pageType || guruChandal.categoryName || '',
              guruChandal.primaryKeyword || guruChandal.focusKeyword || '',
              JSON.stringify(guruChandal.secondaryKeywords || []),
              guruChandal.searchIntent || '',
              guruChandal.seoTitle || guruChandal.metaTitle || '',
              guruChandal.metaDescription || '',
              guruChandal.urlSlug || `/pooja/${guruChandal.slug}`,
              guruChandal.h1 || guruChandal.name,
              guruChandal.quickAnswer || '',
              guruChandal.shortDescription || '',
              guruChandal.hindiShortDescription || '',
              guruChandal.description || '',
              guruChandal.hindiDescription || '',
              guruChandal.templeName || '',
              guruChandal.hindiTempleName || '',
              guruChandal.location || '',
              guruChandal.hindiLocation || '',
              guruChandal.city || '',
              guruChandal.hindiCity || '',
              guruChandal.price || 0.0,
              guruChandal.originalPrice || null,
              guruChandal.advanceBookingAmount || null,
              guruChandal.duration || '',
              guruChandal.hindiDuration || '',
              guruChandal.timing || '',
              guruChandal.hindiTiming || '',
              guruChandal.samagriIncluded !== false ? 1 : 0,
              guruChandal.prasadHomeDelivery !== false ? 1 : 0,
              guruChandal.liveVideoAvailable !== false ? 1 : 0,
              guruChandal.vipEntryPass ? 1 : 0,
              guruChandal.panditCount || 1,
              guruChandal.featuredImage || guruChandal.image || '',
              JSON.stringify(guruChandal.gallery || guruChandal.galleryImages || []),
              JSON.stringify(guruChandal.whatWeOffer || []),
              JSON.stringify(guruChandal.benefits || []),
              JSON.stringify(guruChandal.hindiBenefits || []),
              JSON.stringify(guruChandal.whoCanConsider || guruChandal.whoIsItFor || []),
              JSON.stringify(guruChandal.procedureSteps || guruChandal.preparation || []),
              JSON.stringify(guruChandal.hindiProcedureSteps || guruChandal.hindiPreparation || []),
              JSON.stringify(guruChandal.faqs || guruChandal.aeoQuestions || []),
              JSON.stringify(guruChandal.internalLinks || []),
              JSON.stringify(guruChandal.imageSeo || {}),
              JSON.stringify(guruChandal.schemaTypes || []),
              guruChandal.qualityScore || 98,
              guruChandal.idealFor || '',
              guruChandal.hindiIdealFor || '',
              guruChandal.auspiciousDays || '',
              guruChandal.hindiAuspiciousDays || '',
              guruChandal.mantra || '',
              guruChandal.hindiMantra || '',
              guruChandal.isFeatured ? 1 : 0,
              guruChandal.isPublished !== false ? 1 : 0,
              guruChandal.seoTitle || guruChandal.metaTitle || '',
              99,
            ]
          );
          console.log('[AUTO-DB] Seeded missing Guru Chandal Dosh pooja with complete SEO/AEO/GEO data.');
        } else {
          await execute(
            'UPDATE poojas SET is_published = 1, slug = ?, url_slug = ? WHERE id = ? OR slug = ?',
            [
              'guru-chandal-dosh-shanti-pooja-ujjain',
              '/guru-chandal-dosh-shanti-pooja-ujjain',
              'pooja-guru-chandal',
              'guru-chandal-dosh-shanti-pooja-ujjain',
            ]
          );
          console.log('[AUTO-DB] Guru Chandal Dosh pooja exists in database. Ensured is_published = 1 and correct slug.');
        }
      }
    } catch (e) {
      console.warn('[AUTO-DB] Safe Guru Chandal sync warning:', e);
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
    } else {
      console.log(`[AUTO-DB] tours table already contains ${toursCount[0].count} records. Preserving all admin changes and deletions.`);
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

    // 8b. Safe Auto-Seeding: Dedicated Darshan Items
    const darshanCount = await query('SELECT COUNT(*) as count FROM darshan_items');
    if (darshanCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default darshan items...');
      for (const item of initialDarshanItems) {
        const d = item as any;
        await execute(
          `INSERT INTO darshan_items (
            id, title, hindi_title, subtitle, image, alt_text, location, temple_timing, sort_order, is_published
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            d.id,
            d.title,
            d.hindiTitle || '',
            d.subtitle || '',
            d.image,
            d.altText || d.title,
            d.location || 'Ujjain',
            d.templeTiming || '',
            d.sortOrder || 0,
            d.isPublished !== false ? 1 : 0,
          ]
        );
        result.seeded.darshan = (result.seeded.darshan || 0) + 1;
      }
    }

    // 9. Safe Auto-Seeding: Testimonials
    const testimonialsCount = await query('SELECT COUNT(*) as count FROM testimonials');
    if (testimonialsCount[0].count === 0) {
      console.log('[AUTO-DB] Seeding default testimonials...');
      for (const item of initialTestimonials) {
        const t = item as any;
        await execute(
          `INSERT INTO testimonials (
            id, name, hindi_name, location, hindi_location, rating, testimonial, hindi_testimonial,
            photo, service, hindi_service, tour, category, date, verified, helpful_count, review_image,
            is_featured, is_published
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            t.id,
            t.name,
            t.hindiName || '',
            t.location || '',
            t.hindiLocation || '',
            t.rating || 5,
            t.testimonial,
            t.hindiTestimonial || '',
            t.photo || '',
            t.service || '',
            t.hindiService || '',
            t.tour || '',
            t.category || 'Pooja',
            t.date || '',
            t.verified !== false ? 1 : 0,
            t.helpfulCount || 0,
            t.reviewImage || '',
            t.isFeatured !== false ? 1 : 0,
            t.isPublished !== false ? 1 : 0,
          ]
        );
        result.seeded.testimonials = (result.seeded.testimonials || 0) + 1;
      }
    }

    // 10. Migrations Tracking Table: Ensure schema/data migrations execute at most once
    await execute(`
      CREATE TABLE IF NOT EXISTS system_migrations (
        id VARCHAR(100) PRIMARY KEY,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    console.log('[AUTO-DB SUCCESS] Database schema verified and existing production records preserved safely!');
    return result;
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    console.error('[AUTO-DB ERROR] Auto initialization failed:', errorMsg);
    result.error = errorMsg;
    return result;
  }
}
