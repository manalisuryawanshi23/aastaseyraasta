import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagePath = 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/597d4128-364e-4d83-8b65-3e2be8185d09/.user_uploaded/media_1789289807807.jpg';
const publicDir = 'd:/ReactWorkspace/aastaseyraasta/public';
const imagesDir = 'd:/ReactWorkspace/aastaseyraasta/public/assets/images';
const distDir = 'd:/ReactWorkspace/aastaseyraasta/dist';

async function processRadiantLogo() {
  console.log('✨ Processing Ultra-HD Radiant Golden Logo...');

  const image = sharp(imagePath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    // Compute luminance/brightness
    const maxChannel = Math.max(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    // Thresholds for smooth alpha separation
    const cutOff = 12; // Below this is pure black background
    const solidThresh = 80; // Above this is solid foreground

    let alpha = 0;
    if (maxChannel > cutOff) {
      if (maxChannel >= solidThresh) {
        alpha = 255;
      } else {
        // Smoothstep curve for seamless anti-aliasing without black halo
        const t = (maxChannel - cutOff) / (solidThresh - cutOff);
        const smoothT = t * t * (3 - 2 * t);
        alpha = Math.min(255, Math.round(smoothT * 255));
      }
    }

    if (alpha > 0) {
      const aNorm = alpha / 255;
      // Recover unmultiplied color so glowing edges don't have dark fringe
      let unR = Math.round(r / Math.max(0.2, aNorm));
      let unG = Math.round(g / Math.max(0.2, aNorm));
      let unB = Math.round(b / Math.max(0.2, aNorm));

      // Golden color preservation:
      // Ensure vibrant warm gold tone (high red & green, low blue)
      unR = Math.min(255, Math.max(r, unR));
      unG = Math.min(255, Math.max(g, unG));
      unB = Math.min(255, unB);

      // Boost gold intensity for crystal-clear visibility on both light and dark UI
      rgba[dstIdx] = Math.min(255, Math.round(unR * 1.05));
      rgba[dstIdx + 1] = Math.min(255, Math.round(unG * 1.02));
      rgba[dstIdx + 2] = Math.max(0, Math.min(200, Math.round(unB * 0.9)));
      rgba[dstIdx + 3] = alpha;
    } else {
      rgba[dstIdx] = 0;
      rgba[dstIdx + 1] = 0;
      rgba[dstIdx + 2] = 0;
      rgba[dstIdx + 3] = 0;
    }
  }

  // Create base 1024x1024 transparent PNG
  const transparentBaseSharp = sharp(rgba, {
    raw: { width, height, channels: 4 }
  });

  const transparent1024Buffer = await transparentBaseSharp.png({ quality: 100 }).toBuffer();

  // Save full 1024x1024 transparent PNG
  fs.writeFileSync(path.join(publicDir, 'logo.png'), transparent1024Buffer);
  fs.writeFileSync(path.join(imagesDir, 'logo.png'), transparent1024Buffer);
  fs.writeFileSync(path.join(imagesDir, 'aastha_sey_raasta_logo.png'), transparent1024Buffer);
  console.log('✅ Generated 1024x1024 public/logo.png & public/assets/images/logo.png');

  // Generate 512x512 Transparent Logo
  const transparent512Buffer = await sharp(transparent1024Buffer)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Generate 512x512 Dark Sacred Icon for PWA & Browser Favicon
  // Sacred temple dark maroon/black tone #1E0B0E / #120406
  const squareDark512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 24, g: 8, b: 10, alpha: 1 } // #18080A
    }
  })
    .composite([
      {
        input: await sharp(transparent1024Buffer)
          .resize(470, 470, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'logo-dark.png'), squareDark512);

  // Generate all Favicon & PWA Sizes
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

  // Generate favicon.ico (48x48 standard)
  const icoBuf = await sharp(squareDark512)
    .resize(48, 48)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  console.log('✅ Generated public/favicon.ico');

  // Generate SVG Favicon embedding base64 high-res emblem
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

  // Synchronize all to dist/
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
      'manifest.json',
      'site.webmanifest',
    ];
    for (const f of filesToCopy) {
      if (fs.existsSync(path.join(publicDir, f))) {
        fs.copyFileSync(path.join(publicDir, f), path.join(distDir, f));
      }
    }
    const distImgDir = path.join(distDir, 'assets/images');
    if (!fs.existsSync(distImgDir)) {
      fs.mkdirSync(distImgDir, { recursive: true });
    }
    fs.copyFileSync(path.join(publicDir, 'logo.png'), path.join(distImgDir, 'logo.png'));
    fs.copyFileSync(path.join(publicDir, 'logo.png'), path.join(distImgDir, 'aastha_sey_raasta_logo.png'));
    console.log('✅ Synchronized all assets to dist/');
  }

  console.log('\n🎉 Successfully processed radiant transparent logo, Favicons, and PWA icons!');
}

processRadiantLogo().catch(console.error);
