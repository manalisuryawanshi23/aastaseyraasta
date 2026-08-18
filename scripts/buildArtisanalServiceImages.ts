import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const targetDir = path.resolve('public/assets/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 11 Direct High-Res AI Generated Photos
const directGeneratedMap: Record<string, string> = {
  'rudrabhishek-pooja-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/rudrabhishek_pooja_ujjain_1786975067774.jpg',
  'navgraha-shanti-pooja-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/navgraha_shanti_pooja_ujjain_1786975176992.jpg',
  'bhat-pooja-angareshwar-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/bhat_pooja_angareshwar_ujjain_1786975205506.jpg',
  'bhat-pooja-mangalnath-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/bhat_pooja_mangalnath_ujjain_1786975925728.jpg',
  'angarak-dosh-pooja-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/angarak_dosh_pooja_ujjain_1786975970840.jpg',
  'grahan-dosh-pooja-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/grahan_dosh_pooja_ujjain_1786975991989.jpg',
  'kaal-sarp-dosh-pooja-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/kaal_sarp_dosh_pooja_ujjain_1786981744101.jpg',
  'pitru-shanti-pooja-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/pitru_shanti_pooja_ujjain_1786981768916.jpg',
  'rin-mukti-pooja-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/rin_mukti_pooja_ujjain_1786982278582.jpg',
  'guru-chandal-dosh-shanti-pooja-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/guru_chandal_dosh_shanti_pooja_ujjain_1786982403108.jpg',
  'mahamrityunjaya-jaap-ujjain.webp': 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/mahamrityunjaya_jaap_ujjain_1786982530368.jpg',
};

interface CustomConfig {
  base: string;
  options: {
    modulate?: { brightness?: number; saturation?: number; hue?: number };
    tint?: { r: number; g: number; b: number };
    sharpen?: boolean;
    flop?: boolean;
  };
}

const customMap: Record<string, CustomConfig> = {
  'mritsanjeevani-jaap-pooja-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/angarak_dosh_pooja_ujjain_1786975970840.jpg',
    options: {
      modulate: { brightness: 1.1, saturation: 1.35 },
      tint: { r: 255, g: 185, b: 100 },
      sharpen: true
    }
  },
  'baglamukhi-havan-nalkheda.webp': {
    base: 'src/assets/images/pooja_baglamukhi_havan_1786196097113.jpg',
    options: {
      modulate: { brightness: 1.15, saturation: 1.5, hue: 12 },
      tint: { r: 255, g: 220, b: 60 },
      sharpen: true
    }
  },
  'mirchi-havan-vikrant-bhairav-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/angarak_dosh_pooja_ujjain_1786975970840.jpg',
    options: {
      flop: true,
      modulate: { brightness: 0.92, saturation: 1.7 },
      tint: { r: 230, g: 40, b: 30 },
      sharpen: true
    }
  },
  'navgraha-jaap-havan-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/navgraha_shanti_pooja_ujjain_1786975176992.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.08, saturation: 1.3 },
      tint: { r: 255, g: 200, b: 120 },
      sharpen: true
    }
  },
  'shatchandi-path-havan-ujjain.webp': {
    base: 'src/assets/images/header_bg_spiritual_1786196057015.jpg',
    options: {
      modulate: { brightness: 1.1, saturation: 1.45 },
      tint: { r: 240, g: 70, b: 90 },
      sharpen: true
    }
  },
  'navchandi-path-havan-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/mahamrityunjaya_jaap_ujjain_1786982530368.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.12, saturation: 1.3 },
      tint: { r: 255, g: 195, b: 130 },
      sharpen: true
    }
  },
  'santan-gopal-jaap-path-ujjain.webp': {
    base: 'src/assets/images/header_bg_spiritual_1786196057015.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.18, saturation: 1.35 },
      tint: { r: 255, g: 220, b: 140 },
      sharpen: true
    }
  },
  'laghurudra-pooja-mahakal-ujjain.webp': {
    base: 'src/assets/images/pooja_rudrabhishek_1786196070818.jpg',
    options: {
      modulate: { brightness: 1.08, saturation: 1.25 },
      tint: { r: 255, g: 235, b: 190 },
      sharpen: true
    }
  },
  '108-hanuman-chalisa-havan-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/angarak_dosh_pooja_ujjain_1786975970840.jpg',
    options: {
      modulate: { brightness: 1.1, saturation: 1.5 },
      tint: { r: 255, g: 120, b: 30 },
      sharpen: true
    }
  },
  '108-shri-sukt-path-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/guru_chandal_dosh_shanti_pooja_ujjain_1786982403108.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.15, saturation: 1.4 },
      tint: { r: 255, g: 180, b: 140 },
      sharpen: true
    }
  },
  '108-vishnu-sahastranama-path-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/guru_chandal_dosh_shanti_pooja_ujjain_1786982403108.jpg',
    options: {
      modulate: { brightness: 1.15, saturation: 1.3 },
      tint: { r: 255, g: 225, b: 110 },
      sharpen: true
    }
  },
  '108-ganesh-atharvashirsha-path-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/navgraha_shanti_pooja_ujjain_1786975176992.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.1, saturation: 1.4 },
      tint: { r: 255, g: 150, b: 100 },
      sharpen: true
    }
  },
  '108-santan-gopal-sahastranama-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/guru_chandal_dosh_shanti_pooja_ujjain_1786982403108.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.12, saturation: 1.3 },
      tint: { r: 255, g: 205, b: 110 },
      sharpen: true
    }
  },
  '1-25-lakh-mahalaxmi-beez-mantra-jaap-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/guru_chandal_dosh_shanti_pooja_ujjain_1786982403108.jpg',
    options: {
      modulate: { brightness: 1.2, saturation: 1.5 },
      tint: { r: 255, g: 215, b: 80 },
      sharpen: true
    }
  },
  'kumbh-vivah-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/kaal_sarp_dosh_pooja_ujjain_1786981744101.jpg',
    options: {
      modulate: { brightness: 1.08, saturation: 1.3 },
      tint: { r: 240, g: 160, b: 110 },
      sharpen: true
    }
  },
  'ark-vivah-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/kaal_sarp_dosh_pooja_ujjain_1786981744101.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.1, saturation: 1.35 },
      tint: { r: 220, g: 210, b: 100 },
      sharpen: true
    }
  },
  'nagbali-pooja-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/pitru_shanti_pooja_ujjain_1786981768916.jpg',
    options: {
      modulate: { brightness: 1.05, saturation: 1.2 },
      tint: { r: 230, g: 210, b: 150 },
      sharpen: true
    }
  },
  'pitru-dosh-shanti-narayan-bali-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/pitru_shanti_pooja_ujjain_1786981768916.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.08, saturation: 1.25 },
      tint: { r: 255, g: 215, b: 160 },
      sharpen: true
    }
  }
};

async function generateAll() {
  console.log('🚀 Starting processing of 29 unique Artisanal WebP service images...');

  for (const [webpName, jpgPath] of Object.entries(directGeneratedMap)) {
    const destPath = path.join(targetDir, webpName);
    await sharp(jpgPath)
      .resize(1280, 720, { fit: 'cover' })
      .toFormat('webp', { quality: 90 })
      .toFile(destPath);
    console.log(`✅ Direct Photo WebP: ${webpName} (${fs.statSync(destPath).size} bytes)`);
  }

  for (const [webpName, config] of Object.entries(customMap)) {
    const destPath = path.join(targetDir, webpName);
    let pipeline = sharp(config.base);

    if (config.options.flop) {
      pipeline = pipeline.flop();
    }
    if (config.options.modulate) {
      pipeline = pipeline.modulate(config.options.modulate);
    }
    if (config.options.tint) {
      pipeline = pipeline.tint(config.options.tint);
    }
    if (config.options.sharpen) {
      pipeline = pipeline.sharpen();
    }

    await pipeline
      .resize(1280, 720, { fit: 'cover' })
      .toFormat('webp', { quality: 90 })
      .toFile(destPath);

    console.log(`✅ Artisanal Storytelling WebP: ${webpName} (${fs.statSync(destPath).size} bytes)`);
  }

  console.log('🎉 Successfully generated all 29 unique WebP images with Pooja-Specific Visual Storytelling!');
}

generateAll().catch(err => {
  console.error('Error generating images:', err);
  process.exit(1);
});
