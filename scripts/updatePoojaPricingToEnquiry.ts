import fs from 'fs';
import path from 'path';
import { initialBlogPosts } from '../src/data/initialData';

const filePath = path.join(process.cwd(), 'src', 'data', 'initialData.ts');
let fileText = fs.readFileSync(filePath, 'utf-8');

console.log('Updating all blog posts to replace clear pricing amounts with high-converting enquiry links...');

// 1. Rudrabhishek
const rudra = initialBlogPosts.find((b) => b.slug === 'rudrabhishek-pooja-ujjain-guide');
if (rudra) {
  rudra.seoTitle = 'Rudrabhishek Pooja in Ujjain: Vidhi, Timings, Dakshina & Significance';
  rudra.metaDescription = 'Complete guide to Rudrabhishek Pooja in Ujjain at Mahakaleshwar & Ramghat. Learn authentic Vedic vidhi, 6 sacred liquids, dakshina guidance, and best timings.';
  rudra.quickAnswer = 'Rudrabhishek Pooja in Ujjain is a sacred Vedic ritual from the Krishna Yajurveda dedicated to Lord Shiva in His form as Rudra. Performed near Mahakaleshwar Jyotirlinga or along River Kshipra, the pooja involves Gotra Sankalp, continuous recitation of the Namakam and Chamakam hymns, and bathing the Shiva Lingam with six consecrated liquids (Panchamrit). The ceremony lasts 2 to 3 hours. Pooja dakshina and samagri offerings are customized depending on your Gotra sankalp and the number of officiating Acharyas; devotees can [inquire directly on WhatsApp or Contact](/contact) for personalized guidance.';
  
  if (rudra.aeoQuestions && rudra.aeoQuestions.length > 0) {
    rudra.aeoQuestions[0].answer = "Pooja dakshina and samagri contributions are not fixed arbitrarily; they vary based on the devotee's personal Gotra sankalp, the number of dedicated Vedic Acharyas, choice of Samuhik or private (Ekant) ritual, and specific havan requirements. Devotees are encouraged to [inquire directly on WhatsApp](https://wa.me/919111099799) or through the [Contact page](/contact) to receive a transparent, tailored dakshina estimate.";
  }

  // Replace cost table in content
  const costRegex = /## Cost Breakdown of Rudrabhishek in Ujjain[\s\S]*?(?=\n\n## Best Muhurats)/;
  const newRudraTable = `## Dakshina Guidance & Rudrabhishek Booking Enquiry

In Vedic traditions, pooja dakshina and samagri offerings in Ujjain are not fixed arbitrarily; they are determined based on your family's personal Gotra sankalp, the number of dedicated Vedic Acharyas, and whether you choose a shared (Samuhik) ritual or an exclusive private (Ekant) anushthan.

| Pooja Format | Officiating Acharyas | Duration | Dakshina & Samagri Scope | Recommended For |
| :--- | :--- | :--- | :--- | :--- |
| **Simple Panchamrit Abhishek** | 1 Shastri | 1 Hour | Basic gotra sankalp & milk abhishek ([Inquire on WhatsApp](https://wa.me/919111099799)) | Individual seekers, general blessings |
| **Detailed Vedic Rudrabhishek** | 2–3 Pandits | 2.5 Hours | Full Namakam-Chamakam, Panchamrit ([Contact for Quote](/contact)) | Family wellness, planetary relief |
| **Ekadash Rudra with Havan** | 3–5 Pandits | 4 Hours | 11 recitations, Dashansh havan ([Inquire on WhatsApp](https://wa.me/919111099799)) | Major life hurdles, ancestral peace |
| **Laghurudra Anushthan** | 11 Pandits | Full Day | 121 recitations, extensive yajna ([Contact for Quote](/contact)) | Terminal recovery, spiritual liberation |

For a transparent, customized estimate based on your family gotra and desired auspicious muhurat, please [inquire directly via WhatsApp (9111099799)](https://wa.me/919111099799) or fill out our [Contact & Enquiry Form](/contact).`;

  rudra.content = rudra.content.replace(costRegex, newRudraTable);
}

// 2. Mangalnath Bhat Pooja
const mangal = initialBlogPosts.find((b) => b.slug === 'mangalnath-bhat-pooja-mangal-dosh-remedy-guide');
if (mangal) {
  mangal.seoTitle = 'Bhat Pooja Mangalnath Ujjain: Ultimate Mangal Dosh Remedy Guide';
  mangal.metaDescription = 'Discover why Bhat Pooja at Mangalnath and Angareshwar Ujjain cures Mangal Dosh. Vedic rice offering vidhi, astrological significance, dakshina guidance, and best timings.';
  mangal.quickAnswer = 'Bhat Pooja at Mangalnath and Angareshwar temples in Ujjain is the foremost Vedic remedy for severe Manglik Dosh (Angarak Yoga). According to the Matsya Purana and Skanda Purana, Ujjain is the planetary birthplace of Mars (Mangal Dev). Covering the Shiva Lingam with cooling cooked white rice (Bhat) mixed with curd absorbs excess planetary heat, neutralizing marital delays, anger issues, and financial volatility. The pooja takes 2 to 3 hours. Dakshina and samagri offerings vary based on Gotra sankalp and number of priests; devotees can [inquire directly on WhatsApp or Contact](/contact) for personalized consultation.';

  if (mangal.aeoQuestions && mangal.aeoQuestions.length >= 5) {
    mangal.aeoQuestions[4].answer = 'Dakshina and samagri expenses for Bhat Pooja are determined by whether you choose a collective (Samuhik) pooja at Mangalnath or an intensive private (Ekant) anushthan at Angareshwar Mahadev with dedicated Acharyas and havan. Devotees can [inquire directly on WhatsApp](https://wa.me/919111099799) or via our [Contact page](/contact) for personalized guidance and transparent pricing.';
  }

  // Replace cost table in content
  const costRegex = /## Cost Breakdown of Bhat Pooja in Ujjain[\s\S]*?(?=\n\n## Auspicious Timings)/;
  const newMangalTable = `## Dakshina Guidance & Bhat Pooja Booking Enquiry

Pooja dakshina and samagri offerings for Bhat Pooja in Ujjain are customized based on the severity of the Mangal Dosh in your horoscope, the gotra sankalp of prospective bride or groom, and whether the ritual is conducted at Mangalnath or Angareshwar Mahadev.

| Pooja Format | Location | Duration | Dakshina & Samagri Scope | Recommended For |
| :--- | :--- | :--- | :--- | :--- |
| **Samuhik (Group) Bhat Pooja** | Mangalnath Mandir | 1.5 Hours | Shared altar, standard rice offering ([Inquire on WhatsApp](https://wa.me/919111099799)) | Mild dosha, general planetary peace |
| **Individual (Ekant) Bhat Pooja** | Mangalnath / Angareshwar | 2.5 Hours | Dedicated Acharyas, personal sankalp ([Contact for Quote](/contact)) | High Manglik Dosh, delayed marriage |
| **Maha Mangal Shanti + Havan** | Dedicated Ashram Altar | 4 Hours | Full Angarak Shanti & Khadir havan ([Inquire on WhatsApp](https://wa.me/919111099799)) | Complex astrological dosha, divorce threats |

To receive an exact, transparent estimate tailored to your horoscope and travel schedule, please [chat with our Acharyas on WhatsApp](https://wa.me/919111099799) or submit an inquiry through our [Contact page](/contact).`;

  mangal.content = mangal.content.replace(costRegex, newMangalTable);
}

// 3. Kaal Sarp Dosh Pooja
const kaalsarp = initialBlogPosts.find((b) => b.slug === 'kaal-sarp-dosh-shanti-pooja-ujjain-guide');
if (kaalsarp) {
  kaalsarp.title = 'Complete Guide to Kaal Sarp Dosh Shanti Pooja in Ujjain: Vidhi, Dakshina & Best Muhurat';
  kaalsarp.seoTitle = 'Kaal Sarp Dosh Shanti Pooja Ujjain: Vidhi, Dakshina & Best Muhurat Guide';
  kaalsarp.metaDescription = 'Complete guide to Kaal Sarp Dosh Shanti Pooja in Ujjain. Discover 12 types of Kaal Sarp Yog, Vedic vidhi at Ramghat, dakshina guidance, and best muhurat dates.';
  kaalsarp.quickAnswer = "Kaal Sarp Dosh Shanti Pooja in Ujjain is performed at Ramghat on the sacred Kshipra River or near Mahakaleshwar Temple. The Vedic ritual takes 3 to 4 hours, involving Sankalp, Navgraha Pujan, Rudrabhishek, Rahu-Ketu Jaap, and silver Naag-Nagin visarjan. Dakshina and samagri contributions are determined by the devotee's personal Gotra sankalp, choice of group or private ekant anushthan, and number of officiating Brahmins. Devotees can [inquire directly via WhatsApp or Contact](/contact) for personalized guidance and transparent quotes.";

  if (kaalsarp.aeoQuestions && kaalsarp.aeoQuestions.length > 0) {
    kaalsarp.aeoQuestions[0].answer = 'Kaal Sarp Dosh Pooja dakshina is not fixed arbitrarily. It depends on whether you opt for a collective (Samuhik) pooja at Ramghat or an exclusive, private (Ekant) Vedic anushthan with dedicated Acharyas, pure silver Naag-Nagin pair, and comprehensive havan. Devotees are encouraged to [inquire directly on WhatsApp](https://wa.me/919111099799) or submit an inquiry via our [Contact page](/contact) for transparent details.';
  }

  // Replace cost table in content
  const costRegex = /## Cost Breakdown of Kaal Sarp Pooja in Ujjain[\s\S]*?(?=\n\n## Auspicious Muhurats)/;
  const newKaalsarpTable = `## Dakshina Guidance & Kaal Sarp Pooja Enquiry

Understanding how pooja dakshina is structured ensures clarity and peace of mind when planning your pilgrimage to Ujjain:

| Pooja Format | Acharyas | Inclusions | Dakshina Scope | Ideal For |
| :--- | :--- | :--- | :--- | :--- |
| **Samuhik (Group) Pooja** | Shared pandit group | Standard silver nag-nagin, group havan | Nominal collective dakshina ([Inquire on WhatsApp](https://wa.me/919111099799)) | Budget travelers, single devotees |
| **Personalized (Ekant) Pooja** | 2 Dedicated Acharyas | Private Ramghat altar, customized jaap | Tailored to Gotra sankalp ([Contact for Quote](/contact)) | Families, newlyweds, severe dosha |
| **Maha Kaal Sarp Anushthan** | 5 to 7 Acharyas | 21,000+ Rahu-Ketu Jaap, full Rudrabhishek | Complete multi-priest anushthan ([Inquire on WhatsApp](https://wa.me/919111099799)) | Chronic financial/health blockages |

To receive a detailed breakdown tailored to your gotra, family members, and chosen muhurat, please [connect with our temple team on WhatsApp (9111099799)](https://wa.me/919111099799) or fill out our [Pooja Enquiry Form](/contact).`;

  kaalsarp.content = kaalsarp.content.replace(costRegex, newKaalsarpTable);
}

// 4. Narayan Bali Siddhvat
const narayan = initialBlogPosts.find((b) => b.slug === 'narayan-bali-pitru-dosh-siddhvat-ujjain-guide');
if (narayan) {
  narayan.title = 'Narayan Bali & Pitru Dosh Pooja at Siddhvat Ujjain: Vidhi, Significance & Dakshina';
  narayan.seoTitle = 'Narayan Bali & Pitru Dosh Pooja Siddhvat Ujjain: Vidhi & Dakshina Guide';
  narayan.metaDescription = 'Detailed guide to Narayan Bali & Pitru Dosh Pooja at Siddhvat Ujjain. Learn Garuda Purana vidhi, signs of Pitru Dosh, pind daan steps, and dakshina guidance.';
  narayan.quickAnswer = 'Narayan Bali Pooja at Siddhvat Ujjain is a specialized Vedic rite from the Garuda Purana aimed at liberating ancestors who suffered unnatural deaths or whose souls remain trapped in the Preta Yoni. Conducted on the banks of the sacred Kshipra River under the immortal Siddhvat Banyan Tree, the ritual lasts 3 to 4 hours and involves Lord Vishnu invocation, wheat-flour body rites, 16 Pind Daan, and Dashansh Havan. Dakshina and samagri offerings are determined by Gotra sankalp and the ritual format (1-day vs. 3-day Narayan Nagbali); devotees can [inquire directly on WhatsApp or Contact](/contact) for complete guidance.';

  if (narayan.aeoQuestions && narayan.aeoQuestions.length >= 4) {
    narayan.aeoQuestions[3].answer = 'Dakshina for Narayan Bali and Pitru Dosh Shanti at Siddhvat varies based on whether a 1-day ceremony or a comprehensive 3-day Narayan Nagbali with multiple Vedic scholars is required. Devotees can [inquire directly via WhatsApp](https://wa.me/919111099799) or through our [Contact page](/contact) for a detailed, transparent estimate.';
  }

  // Replace cost table in content
  const costRegex = /## Cost Structure of Narayan Bali in Ujjain[\s\S]*?(?=\n\n## Auspicious Dates)/;
  const newNarayanTable = `## Dakshina Guidance & Narayan Bali Booking Enquiry

Ancestral rites at Siddhvat require precise Vedic samagri and dedicated Brahmins. The dakshina is structured according to the depth of the ceremony:

| Ritual Format | Duration | Pandit Count | Dakshina & Samagri Scope | Recommended For |
| :--- | :--- | :--- | :--- | :--- |
| **1-Day Narayan Bali & Tarpan** | 3.5 Hours | 2 Pandits | Standard ancestral pacification ([Inquire on WhatsApp](https://wa.me/919111099799)) | General Pitru Dosh, unresolved obstacles |
| **Tripindi Shradh + Narayan Bali** | 4.5 Hours | 3 Pandits | Three-lineage ancestral rites ([Contact for Quote](/contact)) | Multi-generational lineage affliction |
| **Complete 3-Day Narayan Nagbali** | 3 Days | 5 Pandits | Full Garuda Purana anushthan ([Inquire on WhatsApp](https://wa.me/919111099799)) | Confirmed unnatural deaths, severe childlessness |

For confidential astrological evaluation and a transparent dakshina estimate, please [message our Shastri Ji on WhatsApp (9111099799)](https://wa.me/919111099799) or use our [Contact Form](/contact).`;

  narayan.content = narayan.content.replace(costRegex, newNarayanTable);
}

// 5. Maa Baglamukhi Havan
const baglamukhi = initialBlogPosts.find((b) => b.slug === 'maa-baglamukhi-havan-nalkheda-vidhi-guide');
if (baglamukhi) {
  baglamukhi.title = 'Maa Baglamukhi Havan at Nalkheda: Vidhi, Samagri & Shatru Badha Nivaran Guide';
  baglamukhi.seoTitle = 'Maa Baglamukhi Havan Nalkheda: Vidhi, Samagri & Booking Guide';
  baglamukhi.metaDescription = 'Complete guide to Maa Baglamukhi Havan at Nalkheda Siddh Peeth. History, authentic yellow samagri, Stambhana Beej Mantra vidhi, and dakshina booking guidance.';
  baglamukhi.quickAnswer = 'Maa Baglamukhi Temple in Nalkheda (Agar Malwa, MP) is a 5,000-year-old Siddh Peeth established by Maharaja Yudhishthira on Lord Krishna’s guidance before the Mahabharata war. Situated on the banks of River Lakhundar, it is famous for the Pitambari Havan, where oblations of yellow mustard seeds (Peeli Sarson) and dry turmeric rhizomes are offered to paralyze adversarial litigation, eliminate black magic, and protect business leadership. The ceremony takes 2.5 to 4 hours. Dakshina and samagri offerings depend on the total mantra ahuti count (e.g. 2,100, 5,100, or 11,000); devotees can [inquire directly on WhatsApp or Contact](/contact) for details.';

  if (baglamukhi.aeoQuestions && baglamukhi.aeoQuestions.length >= 5) {
    baglamukhi.aeoQuestions[4].answer = 'Dakshina for Maa Baglamukhi Havan in Nalkheda depends upon the number of mantra ahutis chosen (ranging from 2,100 to 31,000+) and the number of officiating Tantrik Acharyas. Devotees can [inquire directly on WhatsApp](https://wa.me/919111099799) or via our [Contact page](/contact) for personalized guidance and transparent pricing.';
  }

  // Replace cost table in content
  const costRegex = /## Cost Breakdown of Baglamukhi Havan in Nalkheda[\s\S]*?(?=\n\n## Devotee Rules)/;
  const newBaglamukhiTable = `## Dakshina Guidance & Baglamukhi Havan Enquiry

Because Maa Baglamukhi Havan requires specialized yellow samagri (pure yellow mustard, turmeric rhizomes, lotus seeds, cow ghee) and dedicated Vedic Acharyas, dakshina depends directly on the number of mantra recitations:

| Havan Category | Ahuti Count | Officiating Acharyas | Dakshina & Samagri Scope | Recommended For |
| :--- | :--- | :--- | :--- | :--- |
| **Standard Raksha Havan** | 2,100 Ahutis | 2 Pandits | Standard yellow samagri ([Inquire on WhatsApp](https://wa.me/919111099799)) | General evil eye, workplace tension |
| **Shatru Badha Nivaran Havan** | 5,100 Ahutis | 3 Pandits | Intensive Stambhana vidhi ([Contact for Quote](/contact)) | Active court cases, property disputes |
| **Maha Tantrik Anushthan** | 11,000–31,000 Ahutis | 5 to 7 Pandits | High-potency multi-priest anushthan ([Inquire on WhatsApp](https://wa.me/919111099799)) | High-stakes litigation, political elections |

For customized guidance based on your legal or personal situation, please [consult with our Nalkheda Acharyas on WhatsApp (9111099799)](https://wa.me/919111099799) or fill out the [Pooja Enquiry Form](/contact).`;

  baglamukhi.content = baglamukhi.content.replace(costRegex, newBaglamukhiTable);
}

// 6. Varanasi Prayagraj Tour
const varanasi = initialBlogPosts.find((b) => b.slug === 'varanasi-prayagraj-ayodhya-tour-guide');
if (varanasi && varanasi.aeoQuestions && varanasi.aeoQuestions.length >= 3) {
  varanasi.aeoQuestions[2].answer = 'Government-regulated rowing and motor boats charge nominal rates for a round trip to the Sangam point where the clear blue Yamuna meets the muddy white Ganga. Specialized bathing platforms are anchored at the center. Devotees traveling with Aastha Sey Raasta Seva receive pre-arranged, verified private boats with life jackets; [inquire via Contact or WhatsApp](/contact) for complete package details.';
}

// Sync markdown Quick Answer blockquote in content with b.quickAnswer for all blogs
initialBlogPosts.forEach((b) => {
  if (b.quickAnswer) {
    b.content = b.content.replace(
      /> \*\*Quick Answer \(AEO Summary\):\*\* .*/,
      `> **Quick Answer (AEO Summary):** ${b.quickAnswer}`
    );
  }
});

// Format all 10 blog posts back into initialData.ts
const marker = 'export const initialBlogPosts: BlogPost[] = [';
const startIndex = fileText.indexOf(marker);
const nextMarker = 'export const initialFAQs: FAQ[] = [';
const nextIndex = fileText.indexOf(nextMarker);
const closingBracketIndex = fileText.lastIndexOf('];', nextIndex);

const formattedPosts = initialBlogPosts
  .map((p) => `  ${JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')},`)
  .join('\n');

const updatedFileText =
  fileText.slice(0, startIndex + marker.length) +
  '\n' +
  formattedPosts +
  '\n' +
  fileText.slice(closingBracketIndex);

fs.writeFileSync(filePath, updatedFileText, 'utf-8');
console.log('Successfully updated all 10 blog posts in initialData.ts to remove fixed amounts and add enquiry links!');
