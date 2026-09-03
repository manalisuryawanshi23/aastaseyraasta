import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceImagePath = 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/sacred_om_favicon_1788443225649.jpg';

async function buildFavicons() {
  const publicDir = path.resolve('public');
  const distDir = path.resolve('dist');

  if (!fs.existsSync(sourceImagePath)) {
    throw new Error(`Source image not found at ${sourceImagePath}`);
  }

  console.log('🖼️ Processing authentic Sacred Om favicon from high-res source...');

  // 1. Save master high-res image
  const masterImage = sharp(sourceImagePath);

  // 2. Generate PNG sizes
  const sizes = [
    { name: 'favicon-48x48.png', size: 48 },    // Google Search Standard (48x48)
    { name: 'favicon-96x96.png', size: 96 },    // Google Search High-DPI (96x96)
    { name: 'favicon-192x192.png', size: 192 }, // Android / Chrome PWA (192x192)
    { name: 'favicon-512x512.png', size: 512 }, // High-Res / PWA Splash (512x512)
    { name: 'apple-touch-icon.png', size: 180 }, // iOS Safari (180x180)
  ];

  for (const { name, size } of sizes) {
    await masterImage
      .clone()
      .resize(size, size, { fit: 'cover' })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(path.join(publicDir, name));
    console.log(`✅ Generated public/${name} (${size}x${size})`);
  }

  // 3. Generate standard favicon.ico (48x48 PNG-based ICO)
  await masterImage
    .clone()
    .resize(48, 48, { fit: 'cover' })
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✅ Generated public/favicon.ico');

  // 4. Copy to dist directory
  if (fs.existsSync(distDir)) {
    for (const { name } of sizes) {
      fs.copyFileSync(path.join(publicDir, name), path.join(distDir, name));
    }
    fs.copyFileSync(path.join(publicDir, 'favicon.ico'), path.join(distDir, 'favicon.ico'));
    console.log('✅ Synchronized all favicon assets to dist/');
  }

  console.log('\n🎉 Production Favicon Suite Successfully Built!');
}

buildFavicons().catch((err) => {
  console.error('Error building favicons:', err);
  process.exit(1);
});
