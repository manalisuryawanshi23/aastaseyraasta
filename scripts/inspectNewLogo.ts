import sharp from 'sharp';
import fs from 'fs';

const newImagePath = 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/597d4128-364e-4d83-8b65-3e2be8185d09/.user_uploaded/media_1789288872798.png';

async function inspectPixelStats() {
  const image = sharp(newImagePath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  for (const thresh of [30, 50, 80, 100, 120, 150]) {
    let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
    let count = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        // Deviation from white
        const diff = (255 - r) + (255 - g) + (255 - b);
        if (diff > thresh && a > 10) {
          count++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    console.log(`Threshold ${thresh}: count=${count}, x=[${minX}, ${maxX}], y=[${minY}, ${maxY}], w=${maxX - minX + 1}, h=${maxY - minY + 1}`);
  }
}

inspectPixelStats().catch(console.error);
