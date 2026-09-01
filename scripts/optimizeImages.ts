import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface OptimizationResult {
  file: string;
  originalSizeKB: number;
  newSizeKB: number;
  savedPercent: number;
}

const DIRS = [
  path.resolve('public/assets/images'),
  path.resolve('src/assets/images'),
];

async function optimizeImage(filePath: string): Promise<OptimizationResult | null> {
  const stat = fs.statSync(filePath);
  const originalSize = stat.size;

  // Only optimize images over 100KB or if image dimensions exceed standard web resolution
  if (originalSize < 80 * 1024) {
    return null;
  }

  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return null;
  }

  try {
    const inputBuffer = fs.readFileSync(filePath);
    const image = sharp(inputBuffer);
    const metadata = await image.metadata();

    const isHeroOrBanner = path.basename(filePath).toLowerCase().includes('header') ||
      path.basename(filePath).toLowerCase().includes('hero') ||
      path.basename(filePath).toLowerCase().includes('bg');

    const maxWidth = isHeroOrBanner ? 1600 : 1200;
    const maxHeight = isHeroOrBanner ? 1200 : 900;

    let pipeline = sharp(inputBuffer).rotate(); // auto-rotate based on EXIF

    if ((metadata.width && metadata.width > maxWidth) || (metadata.height && metadata.height > maxHeight)) {
      pipeline = pipeline.resize({
        width: maxWidth,
        height: maxHeight,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    let outputBuffer: Buffer;

    if (ext === '.webp') {
      outputBuffer = await pipeline
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      outputBuffer = await pipeline
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
    } else if (ext === '.png') {
      outputBuffer = await pipeline
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();
    } else {
      return null;
    }

    // Only overwrite if the new file is smaller
    if (outputBuffer.length < originalSize) {
      fs.writeFileSync(filePath, outputBuffer);
      const newSize = outputBuffer.length;
      return {
        file: path.relative(process.cwd(), filePath),
        originalSizeKB: Math.round(originalSize / 1024),
        newSizeKB: Math.round(newSize / 1024),
        savedPercent: Math.round(((originalSize - newSize) / originalSize) * 100),
      };
    }
  } catch (err) {
    console.error(`Failed to optimize ${filePath}:`, err);
  }

  return null;
}

async function main() {
  console.log('🚀 Starting image optimization with sharp...');
  const results: OptimizationResult[] = [];
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        const res = await optimizeImage(fullPath);
        if (res) {
          results.push(res);
          totalOriginal += res.originalSizeKB;
          totalOptimized += res.newSizeKB;
          console.log(`✓ [${res.savedPercent}% saved] ${res.file} (${res.originalSizeKB}KB -> ${res.newSizeKB}KB)`);
        }
      }
    }
  }

  const totalSavedMB = ((totalOriginal - totalOptimized) / 1024).toFixed(2);
  const totalSavedPercent = totalOriginal > 0 ? Math.round(((totalOriginal - totalOptimized) / totalOriginal) * 100) : 0;

  console.log('\n=============================================');
  console.log(`🎉 Optimization Complete!`);
  console.log(`Total Images Optimized: ${results.length}`);
  console.log(`Original Total: ${(totalOriginal / 1024).toFixed(2)} MB`);
  console.log(`Optimized Total: ${(totalOptimized / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${totalSavedMB} MB (${totalSavedPercent}% reduction)`);
  console.log('=============================================');
}

main().catch(console.error);
