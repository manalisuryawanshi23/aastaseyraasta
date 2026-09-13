import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const sourceImagePath = 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/597d4128-364e-4d83-8b65-3e2be8185d09/.user_uploaded/media_1789288192245.jpg';
const publicDir = 'd:/ReactWorkspace/aastaseyraasta/public';
const distDir = 'd:/ReactWorkspace/aastaseyraasta/dist';
const imagesDir = 'd:/ReactWorkspace/aastaseyraasta/public/assets/images';

async function generateBrandAssets() {
  console.log('✨ Processing Aastha Sey Raasta Sacred Logo & Favicon Assets...');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const image = sharp(sourceImagePath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // 1. Precise bounding box
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = Math.max(r, g, b);
      if (brightness > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const artWidth = maxX - minX + 1;
  const artHeight = maxY - minY + 1;
  const pad = 8;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = Math.min(width - cropLeft, artWidth + pad * 2);
  const cropHeight = Math.min(height - cropTop, artHeight + pad * 2);

  console.log(`Artwork dimensions: ${artWidth}x${artHeight}, cropped: ${cropWidth}x${cropHeight}`);

  // Extract raw cropped RGB
  const croppedRaw = await sharp(sourceImagePath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cW = croppedRaw.info.width;
  const cH = croppedRaw.info.height;
  const cData = croppedRaw.data;

  // Build high-definition transparent RGBA buffer
  const rgbaBuffer = Buffer.alloc(cW * cH * 4);
  for (let i = 0; i < cW * cH; i++) {
    const srcIdx = i * 3;
    const dstIdx = i * 4;
    let r = cData[srcIdx];
    let g = cData[srcIdx + 1];
    let b = cData[srcIdx + 2];

    const maxChannel = Math.max(r, g, b);

    let alpha = 0;
    if (maxChannel > 25) {
      alpha = Math.min(255, Math.round(((maxChannel - 25) / (75 - 25)) * 255));
      // Enhance golden saturation slightly for ultra-crisp display
      r = Math.min(255, Math.round(r * 1.08));
      g = Math.min(255, Math.round(g * 1.05));
      b = Math.min(255, Math.round(b * 0.95)); // warm gold tone
    }

    rgbaBuffer[dstIdx] = r;
    rgbaBuffer[dstIdx + 1] = g;
    rgbaBuffer[dstIdx + 2] = b;
    rgbaBuffer[dstIdx + 3] = alpha;
  }

  const transparentLogoSharp = sharp(rgbaBuffer, {
    raw: { width: cW, height: cH, channels: 4 }
  });

  const transparentPngBuffer = await transparentLogoSharp.png({ quality: 100 }).toBuffer();

  // 1. Save transparent logo to public/logo.png and assets/images/logo.png
  fs.writeFileSync(path.join(publicDir, 'logo.png'), transparentPngBuffer);
  fs.writeFileSync(path.join(imagesDir, 'logo.png'), transparentPngBuffer);
  fs.writeFileSync(path.join(imagesDir, 'aastha_sey_raasta_logo.png'), transparentPngBuffer);
  console.log('✅ Generated public/logo.png & public/assets/images/logo.png');

  // 2. Generate a perfectly centered 512x512 square transparent emblem with optical padding
  const transparentSquare512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: await sharp(transparentPngBuffer)
          .resize(440, 440, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  // 3. Generate a 512x512 dark sacred background icon for PWA & Apple Touch (Deep Maroon / Black sacred tone)
  // Matching site theme #3A1518 / #1A0D0E
  const darkSquare512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 26, g: 13, b: 14, alpha: 1 } // #1A0D0E
    }
  })
    .composite([
      {
        input: await sharp(transparentPngBuffer)
          .resize(420, 420, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'logo-dark.png'), darkSquare512);

  // 4. Generate all Favicon & PWA Sizes
  const sizes = [
    { name: 'favicon-512x512.png', size: 512, input: darkSquare512 },
    { name: 'favicon-192x192.png', size: 192, input: darkSquare512 },
    { name: 'favicon-96x96.png', size: 96, input: darkSquare512 },
    { name: 'favicon-48x48.png', size: 48, input: darkSquare512 },
    { name: 'favicon-32x32.png', size: 32, input: darkSquare512 },
    { name: 'favicon-16x16.png', size: 16, input: darkSquare512 },
    { name: 'apple-touch-icon.png', size: 180, input: darkSquare512 },
    { name: 'pwa-512x512.png', size: 512, input: darkSquare512 },
    { name: 'pwa-192x192.png', size: 192, input: darkSquare512 },
  ];

  for (const s of sizes) {
    const buf = await sharp(s.input)
      .resize(s.size, s.size)
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(publicDir, s.name), buf);
    console.log(`✅ Generated public/${s.name} (${s.size}x${s.size})`);
  }

  // 5. Generate favicon.ico (48x48 standard)
  const icoBuf = await sharp(darkSquare512)
    .resize(48, 48)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  console.log('✅ Generated public/favicon.ico');

  // 6. Generate vector-wrapped SVG Favicon embedding base64 high-res emblem
  const base64Png = darkSquare512.toString('base64');
  const svgFaviconContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3A1518" />
      <stop offset="100%" stop-color="#140607" />
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#bgGrad)" />
  <image href="data:image/png;base64,${base64Png}" x="0" y="0" width="512" height="512" />
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFaviconContent, 'utf8');
  console.log('✅ Generated public/favicon.svg');

  // 7. Sync to dist/ if dist exists
  if (fs.existsSync(distDir)) {
    const filesToCopy = [
      'logo.png',
      'logo-dark.png',
      'favicon.ico',
      'favicon.svg',
      'favicon-512x512.png',
      'favicon-192x192.png',
      'favicon-96x96.png',
      'favicon-48x48.png',
      'favicon-32x32.png',
      'favicon-16x16.png',
      'apple-touch-icon.png',
      'pwa-512x512.png',
      'pwa-192x192.png',
    ];
    for (const f of filesToCopy) {
      fs.copyFileSync(path.join(publicDir, f), path.join(distDir, f));
    }
    const distImgDir = path.join(distDir, 'assets/images');
    if (!fs.existsSync(distImgDir)) {
      fs.mkdirSync(distImgDir, { recursive: true });
    }
    fs.copyFileSync(path.join(publicDir, 'logo.png'), path.join(distImgDir, 'logo.png'));
    fs.copyFileSync(path.join(publicDir, 'logo.png'), path.join(distImgDir, 'aastha_sey_raasta_logo.png'));
    console.log('✅ Synchronized all assets to dist/');
  }

  console.log('\n🎉 Successfully created PNG logo, Favicons, and PWA icons!');
}

generateBrandAssets().catch(console.error);
