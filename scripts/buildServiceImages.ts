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
    extract?: { left: number; top: number; width: number; height: number };
    modulate?: { brightness?: number; saturation?: number; hue?: number };
    tint?: { r: number; g: number; b: number };
    flip?: boolean;
    flop?: boolean;
  };
}

const customMap: Record<string, CustomConfig> = {
  'mritsanjeevani-jaap-pooja-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/angarak_dosh_pooja_ujjain_1786975970840.jpg',
    options: {
      extract: { left: 200, top: 150, width: 900, height: 506 },
      modulate: { brightness: 1.1, saturation: 1.35 },
      tint: { r: 255, g: 195, b: 120 }
    }
  },
  'baglamukhi-havan-nalkheda.webp': {
    base: 'src/assets/images/pooja_baglamukhi_havan_1786196097113.jpg',
    options: {
      modulate: { brightness: 1.15, saturation: 1.5, hue: 10 },
      tint: { r: 255, g: 220, b: 80 }
    }
  },
  'mirchi-havan-vikrant-bhairav-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/angarak_dosh_pooja_ujjain_1786975970840.jpg',
    options: {
      flop: true,
      modulate: { brightness: 0.95, saturation: 1.6 },
      tint: { r: 220, g: 50, b: 40 }
    }
  },
  'navgraha-jaap-havan-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/navgraha_shanti_pooja_ujjain_1786975176992.jpg',
    options: {
      extract: { left: 100, top: 200, width: 1000, height: 520 },
      modulate: { brightness: 1.05, saturation: 1.25 }
    }
  },
  'shatchandi-path-havan-ujjain.webp': {
    base: 'src/assets/images/header_bg_spiritual_1786196057015.jpg',
    options: {
      modulate: { brightness: 1.1, saturation: 1.4 },
      tint: { r: 230, g: 60, b: 80 }
    }
  },
  'navchandi-path-havan-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/mahamrityunjaya_jaap_ujjain_1786982530368.jpg',
    options: {
      extract: { left: 50, top: 50, width: 1100, height: 600 },
      modulate: { brightness: 1.15, saturation: 1.3 },
      tint: { r: 255, g: 200, b: 140 }
    }
  },
  'santan-gopal-jaap-path-ujjain.webp': {
    base: 'src/assets/images/header_bg_spiritual_1786196057015.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.2, saturation: 1.3 },
      tint: { r: 255, g: 220, b: 150 }
    }
  },
  'laghurudra-pooja-mahakal-ujjain.webp': {
    base: 'src/assets/images/pooja_rudrabhishek_1786196070818.jpg',
    options: {
      modulate: { brightness: 1.08, saturation: 1.2 },
      tint: { r: 255, g: 230, b: 180 }
    }
  },
  '108-hanuman-chalisa-havan-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/angarak_dosh_pooja_ujjain_1786975970840.jpg',
    options: {
      extract: { left: 150, top: 100, width: 950, height: 534 },
      modulate: { brightness: 1.12, saturation: 1.45 },
      tint: { r: 255, g: 140, b: 50 }
    }
  },
  '108-shri-sukt-path-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/guru_chandal_dosh_shanti_pooja_ujjain_1786982403108.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.15, saturation: 1.35 },
      tint: { r: 255, g: 215, b: 100 }
    }
  },
  '108-vishnu-sahastranama-path-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/guru_chandal_dosh_shanti_pooja_ujjain_1786982403108.jpg',
    options: {
      extract: { left: 100, top: 50, width: 1000, height: 560 },
      modulate: { brightness: 1.18, saturation: 1.25 },
      tint: { r: 255, g: 230, b: 120 }
    }
  },
  '108-ganesh-atharvashirsha-path-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/navgraha_shanti_pooja_ujjain_1786975176992.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.1, saturation: 1.35 },
      tint: { r: 240, g: 120, b: 100 }
    }
  },
  '108-santan-gopal-sahastranama-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/guru_chandal_dosh_shanti_pooja_ujjain_1786982403108.jpg',
    options: {
      extract: { left: 200, top: 100, width: 850, height: 478 },
      modulate: { brightness: 1.1, saturation: 1.3 },
      tint: { r: 255, g: 200, b: 120 }
    }
  },
  '1-25-lakh-mahalaxmi-beez-mantra-jaap-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/guru_chandal_dosh_shanti_pooja_ujjain_1786982403108.jpg',
    options: {
      modulate: { brightness: 1.25, saturation: 1.4 },
      tint: { r: 255, g: 210, b: 90 }
    }
  },
  'kumbh-vivah-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/kaal_sarp_dosh_pooja_ujjain_1786981744101.jpg',
    options: {
      extract: { left: 150, top: 150, width: 900, height: 506 },
      modulate: { brightness: 1.1, saturation: 1.25 },
      tint: { r: 255, g: 180, b: 140 }
    }
  },
  'ark-vivah-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/kaal_sarp_dosh_pooja_ujjain_1786981744101.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.12, saturation: 1.3 },
      tint: { r: 255, g: 200, b: 130 }
    }
  },
  'nagbali-pooja-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/pitru_shanti_pooja_ujjain_1786981768916.jpg',
    options: {
      extract: { left: 100, top: 100, width: 1000, height: 560 },
      modulate: { brightness: 1.05, saturation: 1.2 },
      tint: { r: 240, g: 210, b: 160 }
    }
  },
  'pitru-dosh-shanti-narayan-bali-ujjain.webp': {
    base: 'C:/Users/MPPKVVCL/.gemini/antigravity-ide/brain/9982a6e1-fdda-4dab-83f5-df242a9772c2/pitru_shanti_pooja_ujjain_1786981768916.jpg',
    options: {
      flop: true,
      modulate: { brightness: 1.1, saturation: 1.25 },
      tint: { r: 255, g: 220, b: 170 }
    }
  }
};

async function generateAll() {
  console.log('🚀 Starting processing of 29 unique WebP service images...');

  for (const [webpName, jpgPath] of Object.entries(directGeneratedMap)) {
    const destPath = path.join(targetDir, webpName);
    await sharp(jpgPath)
      .resize(1280, 720, { fit: 'cover' })
      .toFormat('webp', { quality: 88 })
      .toFile(destPath);
    console.log(`✅ Generated Direct WebP: ${webpName} (${fs.statSync(destPath).size} bytes)`);
  }

  for (const [webpName, config] of Object.entries(customMap)) {
    const destPath = path.join(targetDir, webpName);
    let pipeline = sharp(config.base);

    if (config.options.extract) {
      pipeline = pipeline.extract(config.options.extract);
    }
    if (config.options.flop) {
      pipeline = pipeline.flop();
    }
    if (config.options.flip) {
      pipeline = pipeline.flip();
    }
    if (config.options.modulate) {
      pipeline = pipeline.modulate(config.options.modulate);
    }
    if (config.options.tint) {
      pipeline = pipeline.tint(config.options.tint);
    }

    await pipeline
      .resize(1280, 720, { fit: 'cover' })
      .toFormat('webp', { quality: 88 })
      .toFile(destPath);

    console.log(`✅ Generated Custom WebP: ${webpName} (${fs.statSync(destPath).size} bytes)`);
  }

  console.log('🎉 Successfully created all 29 unique WebP images in public/assets/images/');
}

generateAll().catch(err => {
  console.error('Error generating images:', err);
  process.exit(1);
});
