# Graph Report - D:\ReactWorkspace\aastaseyraasta  (2026-08-13)

## Corpus Check
- 80 files · ~379,416 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 394 nodes · 1043 edges · 30 communities (18 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- User Interface & Display Components
- Core App & Admin Layout
- Destination & Animation Components
- Admin Service Management
- Admin Analytics Dashboard
- Sitemap Generation Script
- Pooja & Favorites Features
- TypeScript & Environment Config
- Runtime Dependencies
- Build & Style Tooling
- Admin Blog Management
- NPM Build Scripts
- Interactive Map Visualization
- Booking Modal & Utilities
- Package Metadata
- Vite Build Tool
- Google GenAI SDK Integration
- Tailwind Vite Plugin
- Header Spiritual Background Image
- Hero Mahakaleshwar Image
- Baglamukhi Pooja Image
- Bhat Mangalnath Pooja Image
- Mahamrityunjaya Pooja Image
- Pitru Ramghat Pooja Image
- Rudrabhishek Pooja Image
- Char Dham Tour Image
- Ujjain Omkareshwar Tour Image
- Omkareshwar Yatra Image

## God Nodes (most connected - your core abstractions)
1. `StoreService` - 74 edges
2. `setItem()` - 27 edges
3. `SEOHead()` - 18 edges
4. `compilerOptions` - 15 edges
5. `PoojaService` - 14 edges
6. `Breadcrumbs()` - 13 edges
7. `useLanguage()` - 13 edges
8. `getItem()` - 13 edges
9. `Tour` - 13 edges
10. `SiteSettings` - 13 edges

## Surprising Connections (you probably didn't know these)
- `startServer()` --calls--> `generateSitemapXml()`  [EXTRACTED]
  server.ts → scripts/generateSitemap.ts
- `DestinationCardProps` --references--> `Destination`  [EXTRACTED]
  src/components/DestinationCard.tsx → src/types/index.ts
- `TourCardProps` --references--> `Tour`  [EXTRACTED]
  src/components/TourCard.tsx → src/types/index.ts
- `BlogCardProps` --references--> `BlogPost`  [EXTRACTED]
  src/components/BlogCard.tsx → src/types/index.ts
- `FAQAccordionProps` --references--> `FAQ`  [EXTRACTED]
  src/components/FAQAccordion.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (30 total, 12 thin omitted)

### Community 0 - "User Interface & Display Components"
Cohesion: 0.09
Nodes (42): formatTitleWithBrand(), cleanRawName(), buildFAQSchema(), TourDetailPage(), HTMLSitemapPage(), Breadcrumbs(), SocialShareButtons(), generatePoojaTitle() (+34 more)

### Community 1 - "Core App & Admin Layout"
Cohesion: 0.07
Nodes (38): Navbar(), App(), AdminInformativeDetails(), ThemeProvider(), ContactPage(), useTheme(), LanguageContext, HomePage() (+30 more)

### Community 2 - "Destination & Animation Components"
Cohesion: 0.07
Nodes (30): poojaHeaderSlides, TourListingPageProps, generateTourListingTitle(), FAQAccordion(), Testimonial, PoojaListingPage(), TourListingPage(), PoojaListingPageProps (+22 more)

### Community 3 - "Admin Service Management"
Cohesion: 0.11
Nodes (15): SearchModal(), setItem(), ServiceAudit, getItem(), AdminServicesManager(), Testimonials(), Window, auditPoojaService() (+7 more)

### Community 4 - "Admin Analytics Dashboard"
Cohesion: 0.11
Nodes (21): categoryDistributionData, AdminStaffManager(), AdminStaffManagerProps, initialSampleLeads, AdminPermission, AdminDashboardOverview(), StaffUser, LeadStatus (+13 more)

### Community 5 - "Sitemap Generation Script"
Cohesion: 0.19
Nodes (19): initialPoojas, KEYS, startServer(), initialGalleryItems, initialFAQs, initialSiteSettings, initialBlogPosts, initialTestimonials (+11 more)

### Community 6 - "Pooja & Favorites Features"
Cohesion: 0.18
Nodes (11): FavoriteButtonProps, PoojaService, FavoriteButton(), PoojaCard(), FavoriteItem, SavedItemsPage(), PoojaCardProps, SavedItemsPageProps (+3 more)

### Community 7 - "TypeScript & Environment Config"
Cohesion: 0.11
Nodes (18): paths, noEmit, allowJs, experimentalDecorators, compilerOptions, isolatedModules, target, module (+10 more)

### Community 8 - "Runtime Dependencies"
Cohesion: 0.12
Nodes (17): recharts, express, react, recharts, @vitejs/plugin-react, dotenv, dependencies, @vitejs/plugin-react (+9 more)

### Community 9 - "Build & Style Tooling"
Cohesion: 0.13
Nodes (15): @types/node, typescript, tailwindcss, typescript, autoprefixer, tsx, @types/node, esbuild (+7 more)

### Community 10 - "Admin Blog Management"
Cohesion: 0.29
Nodes (6): BlogPost, AdminBlogManager(), BlogCardProps, WordPressBlogEditorProps, WordPressBlogEditor(), BlogListingPage()

### Community 11 - "NPM Build Scripts"
Cohesion: 0.29
Nodes (7): start, build, sitemap, clean, scripts, lint, dev

### Community 12 - "Interactive Map Visualization"
Cohesion: 0.38
Nodes (5): DestinationMapVisualizer(), MapPOI, destinationMapConfigs, DestinationMapVisualizerProps, DestinationMapConfig

### Community 13 - "Booking Modal & Utilities"
Cohesion: 0.53
Nodes (5): InteractiveDatePicker(), formatDateDisplay(), getNextDayOfWeek(), getTodayISO(), BookingModalProps

### Community 14 - "Package Metadata"
Cohesion: 0.40
Nodes (4): name, version, private, type

### Community 15 - "Vite Build Tool"
Cohesion: 0.67
Nodes (3): vite, vite, vite

## Knowledge Gaps
- **114 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+109 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StoreService` connect `Admin Service Management` to `User Interface & Display Components`, `Core App & Admin Layout`, `Destination & Animation Components`, `Admin Analytics Dashboard`, `Sitemap Generation Script`, `Pooja & Favorites Features`, `Admin Blog Management`, `Booking Modal & Utilities`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Google GenAI SDK Integration`, `Tailwind Vite Plugin`, `Package Metadata`, `Vite Build Tool`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `SEOHead()` connect `User Interface & Display Components` to `Destination & Animation Components`, `Admin Analytics Dashboard`, `Pooja & Favorites Features`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _114 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User Interface & Display Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08766803039158387 - nodes in this community are weakly interconnected._
- **Should `Core App & Admin Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.07080200501253132 - nodes in this community are weakly interconnected._
- **Should `Destination & Animation Components` be split into smaller, more focused modules?**
  _Cohesion score 0.06938020351526364 - nodes in this community are weakly interconnected._