import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceImagePath = 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/sacred_om_favicon_1788443225649.jpg';

async function updateAllFaviconFiles() {
  const publicDir = path.resolve('public');
  const distDir = path.resolve('dist');

  if (!fs.existsSync(sourceImagePath)) {
    throw new Error(`Source image not found at ${sourceImagePath}`);
  }

  console.log('✨ Generating 100% authentic Sacred ॐ favicons across all formats...');

  // 1. Generate 512x512 PNG Buffer
  const png512Buffer = await sharp(sourceImagePath)
    .resize(512, 512, { fit: 'cover' })
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-512x512.png'), png512Buffer);
  console.log('✅ Generated public/favicon-512x512.png');

  // 2. Generate other PNG sizes
  const pngSizes = [
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'apple-touch-icon.png', size: 180 },
  ];

  for (const { name, size } of pngSizes) {
    await sharp(sourceImagePath)
      .resize(size, size, { fit: 'cover' })
      .png({ quality: 100 })
      .toFile(path.join(publicDir, name));
    console.log(`✅ Generated public/${name}`);
  }

  // 3. Generate favicon.ico (standard 48x48 PNG format)
  await sharp(sourceImagePath)
    .resize(48, 48, { fit: 'cover' })
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✅ Generated public/favicon.ico');

  // 4. Generate favicon.svg embedding the high-res authentic image
  const base64Data = png512Buffer.toString('base64');
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="512" height="512" href="data:image/png;base64,${base64Data}" />
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
  console.log('✅ Generated public/favicon.svg (with authentic high-res ॐ)');

  // 5. Generate site.webmanifest
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
        src: '/favicon-192x192.png?v=20260903',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512x512.png?v=20260903',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.svg?v=20260903',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('✅ Generated public/site.webmanifest');

  // 6. Copy all to dist directory if dist exists
  if (fs.existsSync(distDir)) {
    const filesToCopy = [
      'favicon.ico',
      'favicon.svg',
      'favicon-512x512.png',
      'favicon-192x192.png',
      'favicon-96x96.png',
      'favicon-48x48.png',
      'favicon-32x32.png',
      'favicon-16x16.png',
      'apple-touch-icon.png',
      'site.webmanifest',
    ];
    for (const file of filesToCopy) {
      if (fs.existsSync(path.join(publicDir, file))) {
        fs.copyFileSync(path.join(publicDir, file), path.join(distDir, file));
      }
    }
    console.log('✅ Synchronized all favicon files to dist/');
  }

  console.log('\n🎉 ALL Favicon files are now 100% authentic Sacred ॐ!');
}

updateAllFaviconFiles().catch((err) => {
  console.error(err);
  process.exit(1);
});
