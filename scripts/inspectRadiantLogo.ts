import sharp from 'sharp';
import fs from 'fs';

const imagePath = 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/597d4128-364e-4d83-8b65-3e2be8185d09/.user_uploaded/media_1789289807807.jpg';

async function inspect() {
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  console.log('Metadata:', metadata);

  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  console.log('Size:', info.width, 'x', info.height, 'Channels:', info.channels);

  // Check bounding box
  for (const thresh of [10, 15, 20, 25, 30]) {
    let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
    let count = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const maxVal = Math.max(r, g, b);
        if (maxVal > thresh) {
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

inspect().catch(console.error);
