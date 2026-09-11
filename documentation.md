Comprehensive Codebase Documentation & Architecture Guide: Aastha Sey Raasta Seva
1. Project Overview & Business Domain
Aastha Sey Raasta Seva (D:\ReactWorkspace\aastaseyraasta) is a full-stack devotional pilgrimage and spiritual services platform focused primarily on Ujjain (Mahakaleshwar), Omkareshwar, Trimbakeshwar, and Himalayan / Char Dham yatras.

Core Features
Pooja & Vedic Ritual Booking: Mool Shanti, Rudrabhishek, Kalsarp Dosh, Mangal Dosh Shanti, Pitru Dosh/Narayan Bali, Mahamrityunjaya Jaap, etc., with details on samagri, pandit count, auspicious muhurats, and live video options.
Spiritual Tour Packages: Customized itineraries, inclusions/exclusions, pickup/drop logistics, accommodation options, and pricing tiers.
Astrology & Kundali Consultation CRM: Dedicated consultation capture modal with birth chart data and administrative follow-up tracking.
Live / Daily Temple Darshan & Photo Gallery: Category-filtered high-resolution gallery and temple darshan slider.
Devotional Ambient Audio Player: Web Audio API integration with background chants and temple atmosphere audio.
Full Hindi & English Localization: Context-driven language switching across all pages, dynamic labels, and database fields.
Custom Admin CMS & Lead Management: 15+ sub-modules for managing content, poojas, tours, blogs, leads, staff access control (RBAC), theme palettes, and maintenance mode.
Dual-Storage Resilience: MySQL database backend with automatic fallback to client/server in-memory and localStorage caching.
2. Technology Stack & Architecture
mermaid
graph TD
    subgraph Client ["Frontend (React 19 + TypeScript + Vite)"]
        App["App.tsx (Custom SPA Router)"]
        Contexts["ThemeContext & LanguageContext"]
        Hooks["useApiSync & usePwaInstall"]
        PublicViews["Public Pages (Home, Poojas, Tours, Blogs, etc.)"]
        AdminViews["Admin Dashboard (15+ Management Modules)"]
        Store["StoreService (localStorage Cache + Default Fallback)"]
    end
    subgraph Backend ["Node.js + Express Server (server.ts)"]
        ExpressApp["Express Application (Port 3001)"]
        StaticServe["Static File & External Storage Server"]
        UploadHandler["Multer Image Upload + Auto-migration"]
        ApiRoutes["REST API (/api/poojas, /api/tours, /api/leads, etc.)"]
        SitemapGen["Dynamic XML Sitemap & Robots.txt"]
    end
    subgraph Database ["Data & Storage Layer"]
        MySQL[("MySQL 8.x / MariaDB Database")]
        UploadDir["Persistent Uploads Directory (/persistent_uploads/images)"]
        StaticData["src/data/initialData.ts (Fallback Seeding Data)"]
    end
    App --> Contexts
    App --> PublicViews
    App --> AdminViews
    PublicViews --> Store
    AdminViews --> Store
    Hooks --> ExpressApp
    Store --> ApiRoutes
    ExpressApp --> ApiRoutes
    ApiRoutes --> MySQL
    ApiRoutes -. Fallback .-> StaticData
    UploadHandler --> UploadDir
    StaticServe --> UploadDir
Stack Summary
Layer	Technologies Used
Frontend Framework	React 19 (react, react-dom), TypeScript 5.8, Vite 6.2
Styling & UI	Tailwind CSS v4 (@tailwindcss/vite), Lucide Icons (lucide-react), Framer Motion (motion)
Charts & Visuals	Recharts 3.10
Backend & Runtime	Node.js, Express 4.21, tsx (development), esbuild (production bundling)
Database	MySQL 8.x (mysql2/promise with connection pooling)
File Handling & Media	Multer 2.2, Sharp 0.35, HTML5 Web Audio API
Authentication	Passcode / bcryptjs (3.0), Role-based Permission Mapping
SEO & Performance	Schema.org Structured Data (JSON-LD), Dynamic XML Sitemap, PWA Web Manifest
3. Directory & File Structure Map
D:\ReactWorkspace\aastaseyraasta\
├── .env / .env.production / .env.example # Environment variable configurations
├── DEPLOYMENT.md                        # Production ops & Hostinger deployment instructions
├── package.json                         # Scripts & dependency definitions
├── server.ts                            # Monolithic Express API + Vite SSR/Static Server (~2600 lines)
├── tsconfig.json                        # TypeScript strict compiler config
├── vite.config.ts                       # Vite bundler configuration with Tailwind v4
├── public/                              # Static public assets, PWA manifest, audio files, favicons
│   ├── manifest.json
│   ├── sitemap.xml
│   └── assets/ (images, audio, etc.)
├── scripts/                             # Automation & CLI maintenance scripts
│   ├── autoSeed.ts / seedDatabase.ts    # Database schema bootstrap & initial data seeder
│   ├── generateSitemap.ts               # Pre-build XML sitemap generator
│   ├── optimizeImages.ts                # Image compression using Sharp
│   └── updateAllFavicons.ts             # Dynamic favicon generator
└── src/
    ├── App.tsx                          # Root application, route dispatcher & global modals
    ├── main.tsx                         # React 19 DOM root mount
    ├── index.css                        # Tailwind v4 directives & root CSS variables
    ├── components/                      # Reusable UI widgets and layout components
    │   ├── Navbar.tsx                   # Sticky responsive header with language & theme selector
    │   ├── Footer.tsx                   # SEO rich footer with links and contact info
    │   ├── BookingModal.tsx             # Universal multi-step enquiry / lead capture modal
    │   ├── AstrologyConsultationModal.tsx # Dedicated birth-chart & horoscope enquiry form
    │   ├── AmbientAudioPlayer.tsx       # Devotional background music & mantra player
    │   ├── DarshanCarousel.tsx          # Temple live darshan carousel
    │   ├── SEOHead.tsx                  # Meta tags, canonical links & OpenGraph manager
    │   ├── DestinationMapVisualizer.tsx # Interactive visual temple travel route map
    │   └── admin/                       # 15+ Admin Dashboard Sub-modules
    │       ├── AdminDashboardOverview.tsx # Metrics, recent leads & system health
    │       ├── AdminServicesManager.tsx   # Pooja & Tour CRUD operations
    │       ├── AdminBlogManager.tsx       # Blog management
    │       ├── WordPressBlogEditor.tsx    # Rich post content editor with preview
    │       ├── AdminStaffManager.tsx      # Staff user RBAC management
    │       ├── AdminGalleryManager.tsx    # Gallery & Darshan image management
    │       ├── AdminBrandColorPicker.tsx  # Dynamic site branding color palette customizer
    │       ├── AdminDbStatusBanner.tsx    # Real-time MySQL connection indicator
    │       └── ...
    ├── context/
    │   ├── LanguageContext.tsx          # Hindi / English bilingual context & translation helper
    │   └── ThemeContext.tsx             # Light / Dark mode state management
    ├── data/
    │   ├── initialData.ts               # Default seed dataset (poojas, tours, blogs, FAQs, settings)
    │   ├── destinationMapData.ts        # Map coordinates & geographical distance metadata
    │   └── destinationFAQs.ts           # City/temple specific FAQ repositories
    ├── db/
    │   ├── mysql.ts                     # MySQL connection pool, ping checks & query wrappers
    │   ├── schema.sql                   # Hostinger-compatible DDL schema (10 tables)
    │   └── autoSeed.ts                  # Safe startup schema migration and seeder
    ├── hooks/
    │   ├── useApiSync.ts                # Automatic MySQL-to-localStorage sync on app mount
    │   └── usePwaInstall.ts             # PWA install prompt handler
    ├── pages/                           # 17 Page Components (Home, Detail views, Listings, Admin)
    ├── services/
    │   ├── apiService.ts                # Typed async fetch wrappers (apiGet, apiPost, apiPut, apiDelete)
    │   ├── store.ts                     # Central client-side data store (CRUD + localStorage layer)
    │   ├── contentService.ts            # Content helper & fallback query handlers
    │   └── favorites.ts                 # Devotee saved items / bookmarks manager
    ├── types/
    │   └── index.ts                     # Central TypeScript interface definitions
    └── utils/
        ├── brandTheme.ts                # CSS variable injector for runtime theme customization
        ├── seoSchemas.ts                # Schema.org JSON-LD generators (TouristTrip, Product, FAQPage)
        ├── seoTitles.ts                 # Dynamic title and meta description builder
        └── translationDictionary.ts     # Bilingual dictionary mappings
4. Key Subsystems & Data Flow
4.1 Hybrid Data Storage & Sync Pattern
The application uses a Resilient Dual-Tier Data Architecture:

Source of Truth: MySQL database tables (poojas, tours, destinations, blog_posts, faqs, leads, admin_users, gallery_items, testimonials, astrology_consultations, site_settings).
Client-Side Cache: LocalStorage keys (aastha_poojas, aastha_tours, etc.) accessed via 

StoreService
.
Synchronization: On application boot, 

useApiSync
 triggers parallel GET requests to the Express backend. Received records update localStorage and trigger an 'aastha:data-synced' event.
Offline / Disconnect Fallback: If MySQL is unreachable, the Express server falls back to in-memory datasets loaded from 

initialData.ts
, and the frontend seamlessly reads from localStorage.
4.2 Routing Engine
Instead of react-router-dom, the application implements a lightweight URL path matching system in 

App.tsx
:

Custom click interceptor listens for internal anchor <a> clicks, calls window.history.pushState, and updates the currentPath state.
popstate event listener handles browser back/forward navigation.
Dynamic route pattern matching parses slugs (e.g. /pooja-services/:slug, /spiritual-tours/:slug, /destinations/:slug, /blog/:slug).
4.3 Image Uploads & Persistent Storage
In cloud / VPS / Hostinger environments, git deployment wipes the public/ directory. To prevent losing uploaded images:



server.ts
 detects process.env.UPLOAD_PATH or an external directory ~/persistent_uploads/images outside the Git directory.
Static middleware serves /assets/images/* directly from this persistent directory.
The server automatically migrates bundled legacy images on initial launch.
5. Critical Issues, Bugs & Technical Risks Found
During deep static analysis of the codebase, the following bugs and architectural risks were identified:

🔴 High Priority / Security Risks
Unprotected Admin API Endpoints in 

server.ts
While the UI checks for admin login, the Express API routes (e.g., POST /api/poojas, DELETE /api/poojas/:id, POST /api/admin/users, DELETE /api/leads/:id) have no authentication middleware (no JWT verification, session token, or API key check). Anyone with the endpoint URL can perform destructive operations directly against the database.
Hardcoded Fallback Credentials & Plaintext Passcodes
In 

server.ts
, fallback passcodes ('mahakal', 'AasthaAdmin#2026', 'admin123') are hardcoded in the source code.
In 

schema.sql
, admin_users stores both password_hash and a plaintext passcode column.
Hardcoded Machine Paths in 

server.ts
Paths like /home/u235459051/.env are hardcoded in the array envPaths. If deployed under a different user or hosting provider, these hardcoded paths are useless or may cause permission warning noise.
🟡 Medium Priority / Architectural Quirks
Monolithic Server Architecture


server.ts
 is 2,624 lines containing routes, database queries, HTML templates, seeder logic, sitemap generation, and in-memory arrays. This makes concurrent developer work prone to merge conflicts.
State Synchronization Disconnect in React Components
When 

useApiSync
 completes fetching from MySQL and dispatches window.dispatchEvent(new CustomEvent('aastha:data-synced')), components that read directly from StoreService during their initial useState initialization do not automatically re-render unless they register an event listener for aastha:data-synced.
URL Query Parameter and Hash Loss in Router
The custom link click handler in 

App.tsx
 only updates currentPath with url.pathname, dropping search parameters (e.g., ?category=dosha) and hashes (e.g., #itinerary).
6. Optimization & Refactoring Roadmap
6.1 Backend Modularization Plan
Split 

server.ts
 into clean, standard MVC Express modules:

server/
├── index.ts                 # Express initialization & listener
├── config/                  # DB connection pool, environment loaders
├── middleware/              # Auth guard (JWT/Session), rate limiters, error handler
├── routes/                  # Modular route definitions:
│   ├── authRoutes.ts
│   ├── poojaRoutes.ts
│   ├── tourRoutes.ts
│   ├── leadRoutes.ts
│   ├── blogRoutes.ts
│   └── settingsRoutes.ts
└── controllers/             # Business logic and SQL execution
6.2 Security & Authentication Hardening
Implement JWT or signed HTTP-only cookies on login at /api/admin/login.
Attach an authMiddleware to all POST, PUT, DELETE endpoints and /api/admin/* routes.
Remove plaintext passcode storage from the database and use only bcrypt password hashes.
6.3 Frontend State Modernization
Replace manual localStorage syncing with TanStack Query (React Query) or standard React Context reducers for real-time caching, background refetching, and optimistic updates.
Adopt standard routing (react-router-dom or @tanstack/react-router) to properly support query parameters, breadcrumbs, nested routes, and browser navigation history.
6.4 Image & Asset Delivery Optimization
Implement an automated WebP conversion pipeline during upload using the existing sharp dependency in package.json.
Add responsive srcset attributes to <img /> tags for mobile bandwidth savings.
7. Step-by-Step Developer Setup & Run Guide
7.1 Prerequisites
Node.js: v18.x or v20.x+
MySQL: 8.0+ or MariaDB 10.4+
Package Manager: npm or bun
7.2 Environment Setup
Clone the repository and navigate to the project directory:
bash
cd D:\ReactWorkspace\aastaseyraasta
Copy the environment template:
bash
cp .env.example .env
Configure your local database in .env:
ini
PORT=3001
NODE_ENV=development
# MySQL Database Credentials
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=aastha_sey_raasta
# Persistent storage directory (Optional for local dev)
UPLOAD_PATH=./public/assets/images
7.3 Database Initialization & Seeding
Create the database and run the initial migration:

bash
# In MySQL Workbench or CLI:
CREATE DATABASE IF NOT EXISTS aastha_sey_raasta CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
# Run the seeding script:
npm.cmd run db:seed
7.4 Running the Application
bash
# Start backend server with Vite middleware in unified development mode
npm.cmd run dev
# Run TypeScript type check
npm.cmd run lint
# Build production bundle and server binary
npm.cmd run build
# Start production server
npm.cmd run start
The application will be accessible at http://localhost:3001. Admin credentials default to passcode admin123 at /admin.

8. Summary of Common Developer Workflows
Task	Files to Edit
Add a new Pooja Service	Admin panel at /admin (Services tab) OR 

src/data/initialData.ts
 (for static seed fallback)
Add a new Tour Package	Admin panel at /admin (Services tab) OR 

src/data/initialData.ts
Modify Site Branding / Colors	Admin Panel -> Brand & Theming OR 

src/utils/brandTheme.ts
Add Hindi/English Translations	

src/utils/translationDictionary.ts
 and 

src/context/LanguageContext.tsx
Add a new Public Page / Route	Create page in src/pages/, register path matcher in 

src/App.tsx
, and add entry to 

scripts/generateSitemap.ts
Modify Database Schema	

src/db/schema.sql
 and update seeder in 

src/db/autoSeed.ts