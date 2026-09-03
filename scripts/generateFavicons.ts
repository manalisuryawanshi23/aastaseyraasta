import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// SVG definition for Aastha Sey Raasta Seva sacred favicon
// Deep spiritual maroon background (#3A1518) with sacred radiant golden Om (ॐ) and temple pinnacle
const svgFavicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Rich background gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#5A1C20"/>
      <stop offset="70%" stop-color="#3A1518"/>
      <stop offset="100%" stop-color="#240B0D"/>
    </radialGradient>

    <!-- Golden glow for sacred glyph -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE57F"/>
      <stop offset="35%" stop-color="#FFC107"/>
      <stop offset="75%" stop-color="#FF9800"/>
      <stop offset="100%" stop-color="#E65100"/>
    </linearGradient>

    <!-- Subtle border highlight -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD54F" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#FFA000" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FF6F00" stop-opacity="0.8"/>
    </linearGradient>

    <!-- Drop shadow for depth -->
    <filter id="sacredGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
      <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#FFB300" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Rounded Squircle Base for Google Search & App Icons -->
  <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#bgGrad)"/>
  <rect x="16" y="16" width="480" height="480" rx="112" stroke="url(#borderGrad)" stroke-width="12"/>

  <!-- Inner Sacred Sun Halo / Chakra Ring -->
  <circle cx="256" cy="256" r="200" stroke="#FFC107" stroke-width="2" stroke-dasharray="6 10" stroke-opacity="0.35"/>
  <circle cx="256" cy="256" r="185" stroke="#FFE082" stroke-width="1.5" stroke-opacity="0.2"/>

  <!-- Sacred ॐ (Om) Devanagari Glyph -->
  <g filter="url(#sacredGlow)" fill="url(#goldGrad)">
    <path d="M 235 155 C 215 155 198 165 188 180 C 180 165 163 155 142 155 C 105 155 75 185 75 222 C 75 255 98 282 128 288 C 95 300 70 332 70 370 C 70 415 108 450 155 450 C 198 450 234 420 242 380 L 210 372 C 204 398 182 418 155 418 C 125 418 102 396 102 370 C 102 340 125 315 160 315 L 185 315 L 185 285 L 155 285 C 130 285 107 262 107 222 C 107 197 122 185 142 185 C 160 185 175 198 178 218 L 210 218 C 213 198 225 185 238 185 C 255 185 268 198 268 222 C 268 250 248 275 220 295 L 205 305 C 235 320 280 345 310 395 L 338 378 C 308 328 265 300 240 285 C 275 260 300 225 300 185 C 300 155 270 155 235 155 Z"/>
    <!-- Crescent (Chandra) -->
    <path d="M 330 160 C 375 160 410 195 410 240 C 390 205 360 190 330 190 C 300 190 270 205 250 240 C 250 195 285 160 330 160 Z"/>
    <!-- Bindu (Dot) -->
    <circle cx="330" cy="115" r="24"/>
  </g>
</svg>`;

async function generateFaviconAssets() {
  const publicDir = path.resolve('public');
  const distDir = path.resolve('dist');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write SVG Favicon
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon, 'utf8');
  console.log('✅ Generated public/favicon.svg');

  const svgBuffer = Buffer.from(svgFavicon);

  // 2. Generate PNG sizes
  const sizes = [
    { name: 'favicon-48x48.png', size: 48 },    // Google Search Standard
    { name: 'favicon-96x96.png', size: 96 },    // Google Search High-DPI
    { name: 'favicon-192x192.png', size: 192 }, // Android / Chrome PWA
    { name: 'favicon-512x512.png', size: 512 }, // High-Res / PWA Splash
    { name: 'apple-touch-icon.png', size: 180 }, // iOS Safari
  ];

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png({ quality: 100 })
      .toFile(path.join(publicDir, name));
    console.log(`✅ Generated public/${name} (${size}x${size})`);
  }

  // 3. Generate standard 48x48 favicon.ico for root crawls
  const ico48Buffer = await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico48Buffer);
  console.log('✅ Generated public/favicon.ico (48x48 PNG-compatible ICO)');

  // 4. Generate site.webmanifest for PWA & Search
  const manifest = {
    name: 'Aastha Sey Raasta Seva',
    short_name: 'Aastha Seva',
    description: 'Official Ujjain Pooja Booking & Spiritual Pilgrimage Yatras',
    start_url: '/',
    display: 'standalone',
    background_color: '#3A1518',
    theme_color: '#3A1518',
    icons: [
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('✅ Generated public/site.webmanifest');

  // 5. Copy to dist if dist exists
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(path.join(publicDir, 'favicon.svg'), path.join(distDir, 'favicon.svg'));
    fs.copyFileSync(path.join(publicDir, 'favicon.ico'), path.join(distDir, 'favicon.ico'));
    fs.copyFileSync(path.join(publicDir, 'favicon-48x48.png'), path.join(distDir, 'favicon-48x48.png'));
    fs.copyFileSync(path.join(publicDir, 'favicon-96x96.png'), path.join(distDir, 'favicon-96x96.png'));
    fs.copyFileSync(path.join(publicDir, 'favicon-192x192.png'), path.join(distDir, 'favicon-192x192.png'));
    fs.copyFileSync(path.join(publicDir, 'favicon-512x512.png'), path.join(distDir, 'favicon-512x512.png'));
    fs.copyFileSync(path.join(publicDir, 'apple-touch-icon.png'), path.join(distDir, 'apple-touch-icon.png'));
    fs.copyFileSync(path.join(publicDir, 'site.webmanifest'), path.join(distDir, 'site.webmanifest'));
    console.log('✅ Synchronized all favicon assets to dist/');
  }

  console.log('\n🎉 Favicon assets generation complete for Google Search!');
}

generateFaviconAssets().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
