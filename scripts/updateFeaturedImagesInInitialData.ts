import fs from 'fs';
import path from 'path';

const initialDataPath = path.resolve('src/data/initialData.ts');
let content = fs.readFileSync(initialDataPath, 'utf-8');

const imageMapping: Record<string, string> = {
  'pooja-rudrabhishek': '/assets/images/rudrabhishek-pooja-ujjain.webp',
  'pooja-navgraha-shani-temple': '/assets/images/navgraha-shanti-pooja-ujjain.webp',
  'pooja-bhat-angareshwar': '/assets/images/bhat-pooja-angareshwar-ujjain.webp',
  'pooja-bhat-mangalnath': '/assets/images/bhat-pooja-mangalnath-ujjain.webp',
  'pooja-angarak-dosh': '/assets/images/angarak-dosh-pooja-ujjain.webp',
  'pooja-grahan-dosh': '/assets/images/grahan-dosh-pooja-ujjain.webp',
  'pooja-kaal-sarp': '/assets/images/kaal-sarp-dosh-pooja-ujjain.webp',
  'pooja-pitru-shanti': '/assets/images/pitru-shanti-pooja-ujjain.webp',
  'pooja-rin-mukti': '/assets/images/rin-mukti-pooja-ujjain.webp',
  'pooja-guru-chandal': '/assets/images/guru-chandal-dosh-shanti-pooja-ujjain.webp',
  'pooja-mahamrityunjaya': '/assets/images/mahamrityunjaya-jaap-ujjain.webp',
  'pooja-mritsanjeevani': '/assets/images/mritsanjeevani-jaap-pooja-ujjain.webp',
  'pooja-baglamukhi-havan': '/assets/images/baglamukhi-havan-nalkheda.webp',
  'pooja-mirchi-havan': '/assets/images/mirchi-havan-vikrant-bhairav-ujjain.webp',
  'pooja-navgraha-shanti': '/assets/images/navgraha-jaap-havan-ujjain.webp',
  'pooja-shatchandi-havan': '/assets/images/shatchandi-path-havan-ujjain.webp',
  'pooja-navchandi-havan': '/assets/images/navchandi-path-havan-ujjain.webp',
  'pooja-santan-gopal-jaap': '/assets/images/santan-gopal-jaap-path-ujjain.webp',
  'pooja-laghurudra': '/assets/images/laghurudra-pooja-mahakal-ujjain.webp',
  'pooja-108-hanuman-chalisa': '/assets/images/108-hanuman-chalisa-havan-ujjain.webp',
  'pooja-108-shri-sukt': '/assets/images/108-shri-sukt-path-ujjain.webp',
  'pooja-108-vishnu-sahastranama': '/assets/images/108-vishnu-sahastranama-path-ujjain.webp',
  'pooja-108-ganesh-atharvashirsha': '/assets/images/108-ganesh-atharvashirsha-path-ujjain.webp',
  'pooja-108-santan-gopal-sahastranama': '/assets/images/108-santan-gopal-sahastranama-ujjain.webp',
  'pooja-1-25-lakh-mahalaxmi-beez': '/assets/images/1-25-lakh-mahalaxmi-beez-mantra-jaap-ujjain.webp',
  'pooja-kumbh-vivah': '/assets/images/kumbh-vivah-ujjain.webp',
  'pooja-ark-vivah': '/assets/images/ark-vivah-ujjain.webp',
  'pooja-nagbali': '/assets/images/nagbali-pooja-ujjain.webp',
  'pooja-narayan-bali': '/assets/images/pitru-dosh-shanti-narayan-bali-ujjain.webp',
};

let count = 0;
for (const [id, webpPath] of Object.entries(imageMapping)) {
  // Regex to match pooja object by id and update its featuredImage
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?featuredImage:\\s*')[^']+(')`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${webpPath}$2`);
    count++;
  } else {
    console.warn(`⚠️ Warning: ID ${id} not matched for image replacement.`);
  }
}

fs.writeFileSync(initialDataPath, content, 'utf-8');
console.log(`✅ Updated featuredImage paths for ${count} poojas in src/data/initialData.ts`);
