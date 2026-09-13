import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const newImagePath = 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/597d4128-364e-4d83-8b65-3e2be8185d09/.user_uploaded/media_1789288872798.png';
const publicDir = 'd:/ReactWorkspace/aastaseyraasta/public';
const imagesDir = 'd:/ReactWorkspace/aastaseyraasta/public/assets/images';
const distDir = 'd:/ReactWorkspace/aastaseyraasta/dist';

async function processNewLogo() {
  const pad = 12;
  const minX = 299, maxX = 727, minY = 71, maxY = 478;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = (maxX - minX + 1) + pad * 2;
  const cropHeight = (maxY - minY + 1) + pad * 2;

  console.log(`Cropping area: left=${cropLeft}, top=${cropTop}, width=${cropWidth}, height=${cropHeight}`);

  const cropped = await sharp(newImagePath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: cW, height: cH, channels } = cropped.info;
  const cData = cropped.data;

  // Create transparent RGBA
  // For a white background image (255, 255, 255):
  // Deviation from white: diff = (255-R) + (255-G) + (255-B) or based on saturation/darkness
  const rgba = Buffer.alloc(cW * cH * 4);

  for (let i = 0; i < cW * cH; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;

    const r = cData[srcIdx];
    const g = cData[srcIdx + 1];
    const b = cData[srcIdx + 2];

    // In RGB on white background:
    // White background: R=255, G=255, B=255 -> alpha = 0
    // Gold line/fill: R=245, G=170, B=30 -> distance from white is large
    // Subtle shadow/noise: B is close to 255, R and G close to 255
    const diff = (255 - r) + (255 - g) + (255 - b);

    let alpha = 0;
    if (diff > 18) {
      // Smooth alpha ramp
      alpha = Math.min(255, Math.round(((diff - 18) / (70 - 18)) * 255));
    }

    if (alpha > 0) {
      // Un-multiply white background so gold colors are pure and vibrant
      const aNorm = alpha / 255;
      // original = color * a + 255 * (1 - a)  =>  color = (original - 255*(1-a)) / a
      let unR = Math.round((r - 255 * (1 - aNorm)) / aNorm);
      let unG = Math.round((g - 255 * (1 - aNorm)) / aNorm);
      let unB = Math.round((b - 255 * (1 - aNorm)) / aNorm);

      unR = Math.max(0, Math.min(255, unR));
      unG = Math.max(0, Math.min(255, unG));
      unB = Math.max(0, Math.min(255, unB));

      // Boost gold vibrance slightly for crystal crispness
      rgba[dstIdx] = Math.min(255, Math.round(unR * 1.05));
      rgba[dstIdx + 1] = Math.min(255, Math.round(unG * 1.02));
      rgba[dstIdx + 2] = Math.min(255, Math.round(unB * 0.95));
      rgba[dstIdx + 3] = alpha;
    } else {
      rgba[dstIdx] = 0;
      rgba[dstIdx + 1] = 0;
      rgba[dstIdx + 2] = 0;
      rgba[dstIdx + 3] = 0;
    }
  }

  const transparentSharp = sharp(rgba, {
    raw: { width: cW, height: cH, channels: 4 }
  });

  const transparentLogoBuffer = await transparentSharp.png({ quality: 100 }).toBuffer();

  // 1. Save transparent logo
  fs.writeFileSync(path.join(publicDir, 'logo.png'), transparentLogoBuffer);
  fs.writeFileSync(path.join(imagesDir, 'logo.png'), transparentLogoBuffer);
  fs.writeFileSync(path.join(imagesDir, 'aastha_sey_raasta_logo.png'), transparentLogoBuffer);
  console.log('✅ Generated public/logo.png & public/assets/images/logo.png');

  // 2. Centered Square 512x512 Transparent Icon
  const squareTransparent512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: await sharp(transparentLogoBuffer)
          .resize(450, 450, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  // 3. Centered Square 512x512 Dark Icon for PWA & Browser Favicon
  // Sacred temple dark maroon/black tone #1F0B0E / #120406
  const squareDark512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 30, g: 11, b: 14, alpha: 1 } // #1E0B0E
    }
  })
    .composite([
      {
        input: await sharp(transparentLogoBuffer)
          .resize(430, 430, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'logo-dark.png'), squareDark512);

  // 4. Generate all Favicon & PWA Sizes
  const sizes = [
    { name: 'favicon-512x512.png', size: 512, input: squareDark512 },
    { name: 'favicon-192x192.png', size: 192, input: squareDark512 },
    { name: 'favicon-96x96.png', size: 96, input: squareDark512 },
    { name: 'favicon-48x48.png', size: 48, input: squareDark512 },
    { name: 'favicon-32x32.png', size: 32, input: squareDark512 },
    { name: 'favicon-16x16.png', size: 16, input: squareDark512 },
    { name: 'apple-touch-icon.png', size: 180, input: squareDark512 },
    { name: 'pwa-512x512.png', size: 512, input: squareDark512 },
    { name: 'pwa-192x192.png', size: 192, input: squareDark512 },
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
  const icoBuf = await sharp(squareDark512)
    .resize(48, 48)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  console.log('✅ Generated public/favicon.ico');

  // 6. Generate SVG Favicon embedding base64 high-res emblem
  const base64Png = squareDark512.toString('base64');
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

  // 7. Sync all to dist/
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

  console.log('\n🎉 Successfully updated all logo, favicon, and PWA assets from new image!');
}

processNewLogo().catch(console.error);
