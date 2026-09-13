import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const sourceImagePath = 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/597d4128-364e-4d83-8b65-3e2be8185d09/.user_uploaded/media_1789288192245.jpg';

async function processImage() {
  const image = sharp(sourceImagePath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  console.log(`Image size: ${width}x${height}, channels: ${channels}`);

  // Find bounding box of non-black pixels (threshold > 25)
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = (r + g + b) / 3;
      if (brightness > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Artwork bounding box: x=[${minX}, ${maxX}], y=[${minY}, ${maxY}], w=${maxX - minX + 1}, h=${maxY - minY + 1}`);

  // Add a small margin
  const pad = 10;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = Math.min(width - cropLeft, (maxX - minX + 1) + pad * 2);
  const cropHeight = Math.min(height - cropTop, (maxY - minY + 1) + pad * 2);

  console.log(`Cropping area: left=${cropLeft}, top=${cropTop}, width=${cropWidth}, height=${cropHeight}`);

  // Extract cropped region
  const croppedRaw = await sharp(sourceImagePath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cW = croppedRaw.info.width;
  const cH = croppedRaw.info.height;
  const cData = croppedRaw.data;

  // Create transparent PNG data (RGBA)
  // Convert black background to transparent, keeping the gold foreground crisp
  const rgbaBuffer = Buffer.alloc(cW * cH * 4);
  for (let i = 0; i < cW * cH; i++) {
    const srcIdx = i * 3;
    const dstIdx = i * 4;
    const r = cData[srcIdx];
    const g = cData[srcIdx + 1];
    const b = cData[srcIdx + 2];

    const brightness = Math.max(r, g, b);

    // Alpha calculation: smooth transition from dark to gold
    let alpha = 0;
    if (brightness > 35) {
      // Scale alpha from 0 at threshold 35 up to 255 at 90+
      alpha = Math.min(255, Math.round(((brightness - 35) / (90 - 35)) * 255));
    }

    rgbaBuffer[dstIdx] = r;
    rgbaBuffer[dstIdx + 1] = g;
    rgbaBuffer[dstIdx + 2] = b;
    rgbaBuffer[dstIdx + 3] = alpha;
  }

  const transparentLogo = sharp(rgbaBuffer, {
    raw: {
      width: cW,
      height: cH,
      channels: 4
    }
  });

  // Save full transparent PNG logo
  await transparentLogo
    .clone()
    .png()
    .toFile('d:/ReactWorkspace/aastaseyraasta/public/logo.png');

  console.log('Saved public/logo.png');
}

processImage().catch(console.error);
