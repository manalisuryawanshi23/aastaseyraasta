import { PoojaService } from '../types';

export interface PoojaContextMeta {
  rulingDeities: string;
  recommendedTimings: string;
  sacredKshetra: string;
  estimatedDuration: string;
}

interface ContextMetaRule {
  rulingDeities: { en: string; hi: string };
  recommendedTimings: { en: string; hi: string };
  defaultKshetra?: { en: string; hi: string };
  defaultDuration?: { en: string; hi: string };
}

// Master Vedic astrological mapping for all Ujjain & pilgrimage poojas
const POOJA_CONTEXT_RULES: Record<string, ContextMetaRule> = {
  // ── Shiva & Rudra Rituals ──
  'rudrabhishek-pooja-ujjain': {
    rulingDeities: {
      en: 'Lord Shiva (Mahakaleshwar Rudra) & Panchamrit Deities',
      hi: 'देवाधिदेव महादेव (श्री महाकालेश्वर रुद्र) एवं पंचामृत देवता',
    },
    recommendedTimings: {
      en: 'Mondays (Somwar), Pradosh Vrat, Maha Shivratri, Masik Shivratri, Shravan Maas',
      hi: 'सोमवार, प्रदोष व्रत, महाशिवरात्रि, मासिक शिवरात्रि, श्रावण मास',
    },
    defaultDuration: { en: '45 to 90 Minutes', hi: '45 से 90 मिनट' },
  },
  'laghurudra-pooja-mahakal-ujjain': {
    rulingDeities: {
      en: 'Ekadasha Rudra (11 Forms of Lord Shiva) & Mata Parvati',
      hi: 'एकादश रुद्र (भगवान शिव के 11 स्वरूप) एवं माता पार्वती',
    },
    recommendedTimings: {
      en: 'Mondays, Pradosh Vrat, Shravan Somwar, Maha Shivratri',
      hi: 'सोमवार, प्रदोष व्रत, श्रावण सोमवार, महाशिवरात्रि',
    },
    defaultDuration: { en: '4 to 6 Hours', hi: '4 से 6 घंटे' },
  },
  'mahamrityunjaya-jaap-ujjain': {
    rulingDeities: {
      en: 'Lord Shiva (Tryambaka Mahakal) & Sage Markandeya',
      hi: 'भगवान त्र्यम्बक महाकाल एवं महर्षि मार्कंडेय',
    },
    recommendedTimings: {
      en: 'Mondays, Pradosh Vrat, Maha Shivratri, Brahma Muhurat daily',
      hi: 'सोमवार, प्रदोष व्रत, महाशिवरात्रि, प्रातः ब्रह्म मुहूर्त',
    },
    defaultDuration: { en: '3 to 5 Hours', hi: '3 से 5 घंटे' },
  },
  'mritsanjeevani-jaap-pooja-ujjain': {
    rulingDeities: {
      en: 'Bhagwan Mahamrityunjaya & Sage Shukracharya (Sanjeevani Vidya)',
      hi: 'भगवान महामृत्युंजय एवं महर्षि शुक्राचार्य (संजीवनी विद्या)',
    },
    recommendedTimings: {
      en: 'Mondays, Shani-Pradosh, Amrit Siddhi Yoga, Critical Illness Muhurat',
      hi: 'सोमवार, शनि-प्रदोष, अमृत सिद्धि योग, आपातकालीन रोग मुक्ति मुहूर्त',
    },
    defaultDuration: { en: '4 to 6 Hours', hi: '4 से 6 घंटे' },
  },

  // ── Mangal Dev (Mars) & Bhat Pooja ──
  'bhat-pooja-mangalnath-ujjain': {
    rulingDeities: {
      en: 'Mangal Dev (Planet Mars) & Shri Mangalnath Mahadev',
      hi: 'ग्रहराज मंगल देव एवं श्री मंगलनाथ महादेव',
    },
    recommendedTimings: {
      en: 'Tuesdays (Mangalwar), Bhauma Pradosh, Angarki Sankashti Chaturthi',
      hi: 'मंगलवार, भौम प्रदोष, अंगारकी संकष्टी चतुर्थी',
    },
    defaultDuration: { en: '1.5 to 2 Hours', hi: '1.5 से 2 घंटे' },
  },
  'bhat-pooja-angareshwar-ujjain': {
    rulingDeities: {
      en: 'Lord Angareshwar Mahadev & Mangal Dev (Mars)',
      hi: 'भगवान अंगारेश्वर महादेव एवं मंगल देव',
    },
    recommendedTimings: {
      en: 'Tuesdays (Mangalwar), Bhauma Pradosh, Angarki Chaturthi, Shukla Paksha',
      hi: 'मंगलवार, भौम प्रदोष, अंगारकी चतुर्थी, शुक्ल पक्ष',
    },
    defaultDuration: { en: '1.5 to 2 Hours', hi: '1.5 से 2 घंटे' },
  },
  'angarak-dosh-pooja-ujjain': {
    rulingDeities: {
      en: 'Mangal Dev (Mars) & Rahu Graha (Angarak Yoga Pacification)',
      hi: 'मंगल देव एवं राहु ग्रह (अंगारक योग शांति)',
    },
    recommendedTimings: {
      en: 'Tuesdays, Saturdays, Bhaumvati Amavasya, Monthly Amavasya',
      hi: 'मंगलवार, शनिवार, भौमवती अमावस्या, प्रत्येक अमावस्या',
    },
    defaultDuration: { en: '1.5 to 2.5 Hours', hi: '1.5 से 2.5 घंटे' },
  },
  'rin-mukti-pooja-ujjain': {
    rulingDeities: {
      en: 'Shri Rinmukteshwar Mahadev & Mangal Dev (Mars)',
      hi: 'श्री ऋणमुक्तेश्वर महादेव एवं मंगल देव',
    },
    recommendedTimings: {
      en: 'Tuesdays (Mangalwar), Pradosh Vrat, Shukla Paksha Panchami',
      hi: 'मंगलवार, प्रदोष व्रत, शुक्ल पक्ष पंचमी',
    },
    defaultDuration: { en: '1.5 to 2 Hours', hi: '1.5 से 2 घंटे' },
  },

  // ── Rahu-Ketu, Kaal Sarp & Sarpa Dosh ──
  'kaal-sarp-dosh-shanti-ujjain': {
    rulingDeities: {
      en: 'Rahu-Ketu Graha, Lord Shiva (Nagabhushana) & Naag Devta',
      hi: 'राहु-केतु ग्रह, नागभूषण भगवान शिव एवं नाग देवता',
    },
    recommendedTimings: {
      en: 'Nag Panchami, Somvati Amavasya, Shravan Maas, Eclipse Days, Wednesdays',
      hi: 'नाग पंचमी, सोमवती अमावस्या, श्रावण मास, ग्रहण काल, बुधवार',
    },
    defaultDuration: { en: '2.5 to 3 Hours', hi: '2.5 से 3 घंटे' },
  },
  'nagbali-pooja-ujjain': {
    rulingDeities: {
      en: 'Sarpa Devta, Lord Shiva & Lord Maha Vishnu',
      hi: 'सर्प देवता, भगवान शिव एवं भगवान महाविष्णु',
    },
    recommendedTimings: {
      en: 'Nag Panchami, Somvati Amavasya, Bhaumvati Amavasya, Pitru Paksha',
      hi: 'नाग पंचमी, सोमवती अमावस्या, भौमवती अमावस्या, पितृ पक्ष',
    },
    defaultDuration: { en: '3 to 4 Hours', hi: '3 से 4 घंटे' },
  },

  // ── Pitru Dosh & Ancestral Liberation ──
  'pitru-shanti-pooja-ujjain': {
    rulingDeities: {
      en: 'Lord Narayana, Yama Dharma & Pitru Devatas (Ancestors)',
      hi: 'भगवान नारायण, यम धर्मराज एवं पितृ देवता',
    },
    recommendedTimings: {
      en: 'Pitru Paksha, Sarvapitri Amavasya, Somvati Amavasya, Monthly Amavasya',
      hi: 'पितृ पक्ष, सर्वपितृ अमावस्या, सोमवती अमावस्या, प्रत्येक अमावस्या',
    },
    defaultDuration: { en: '2 to 2.5 Hours', hi: '2 से 2.5 घंटे' },
  },
  'pitru-dosh-shanti-narayan-bali-ujjain': {
    rulingDeities: {
      en: 'Lord Maha Vishnu, Lord Yama & Ancestral Pitru Souls',
      hi: 'भगवान महाविष्णु, यम धर्मराज एवं अतृप्त पितृ गण',
    },
    recommendedTimings: {
      en: 'Pitru Paksha, Sarvapitri Amavasya, Somvati Amavasya, Shraddha Tithi',
      hi: 'पितृ पक्ष, सर्वपितृ अमावस्या, सोमवती अमावस्या, श्राद्ध तिथि',
    },
    defaultDuration: { en: '3.5 to 4 Hours', hi: '3.5 से 4 घंटे' },
  },

  // ── Planetary & Astrological Doshas ──
  'guru-chandal-dosh-shanti-pooja-ujjain': {
    rulingDeities: {
      en: 'Devguru Brihaspati (Jupiter) & Rahu / Ketu Graha',
      hi: 'देवगुरु बृहस्पति एवं राहु/केतु ग्रह',
    },
    recommendedTimings: {
      en: 'Thursdays (Brihaspativar), Guru Pushya Yoga, Shukla Paksha & Purnima',
      hi: 'गुरुवार (बृहस्पतिवार), गुरु पुष्य योग, शुक्ल पक्ष एवं पूर्णिमा',
    },
    defaultDuration: { en: '2 to 3 Hours', hi: '2 से 3 घंटे' },
  },
  'navgraha-shanti-pooja-ujjain': {
    rulingDeities: {
      en: 'All 9 Celestial Planets (Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu, Ketu)',
      hi: 'समस्त नवग्रह मंडल (सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु, केतु)',
    },
    recommendedTimings: {
      en: 'Saturdays, Sundays, Amavasya, Grahan Kaal, Dasha Sandhi periods',
      hi: 'शनिवार, रविवार, अमावस्या, ग्रहण काल एवं महादशा परिवर्तन काल',
    },
    defaultDuration: { en: '1.5 to 2.5 Hours', hi: '1.5 से 2.5 घंटे' },
  },
  'navgraha-jaap-havan-ujjain': {
    rulingDeities: {
      en: 'Navgraha Mandala & Adhidevata-Pratyadhidevata',
      hi: 'नवग्रह मंडल एवं अधिदेवता-प्रत्यधिदेवता',
    },
    recommendedTimings: {
      en: 'Saturdays, Sundays, Solar Ingress (Sankranti), Shukla Paksha',
      hi: 'शनिवार, रविवार, सूर्य संक्रांति, शुक्ल पक्ष',
    },
    defaultDuration: { en: '3 to 4 Hours', hi: '3 से 4 घंटे' },
  },
  'vish-yog-shanti-pooja-ujjain': {
    rulingDeities: {
      en: 'Lord Shiva, Shani Dev (Saturn) & Chandra Dev (Moon)',
      hi: 'भगवान शिव, शनि देव एवं चंद्र देव',
    },
    recommendedTimings: {
      en: 'Saturdays, Mondays, Shani Amavasya, Somvati Amavasya',
      hi: 'शनिवार, सोमवार, शनि अमावस्या, सोमवती अमावस्या',
    },
    defaultDuration: { en: '2 to 3 Hours', hi: '2 से 3 घंटे' },
  },
  'mool-shanti-pooja-ujjain': {
    rulingDeities: {
      en: 'Gandmool Nakshatra Deities (Ashlesha, Magha, Jyeshtha, Moola, Ashwini, Revati) & Lord Ganesha',
      hi: 'गंडमूल नक्षत्र अधिपति एवं भगवान श्री गणेश',
    },
    recommendedTimings: {
      en: '27th day after birth when birth Nakshatra returns, Auspicious Shukla Tithi',
      hi: 'जन्म के 27वें दिन (जन्म नक्षत्र पुनरावृत्ति), शुभ शुक्ल तिथि',
    },
    defaultDuration: { en: '2.5 to 3.5 Hours', hi: '2.5 से 3.5 घंटे' },
  },
  'nakshatra-shanti-pooja-ujjain': {
    rulingDeities: {
      en: 'Birth Nakshatra Deity, Lord Ganesha & Navgraha Mandala',
      hi: 'जन्म नक्षत्र अधिष्ठाता, भगवान श्री गणेश एवं नवग्रह मंडल',
    },
    recommendedTimings: {
      en: 'Birth Nakshatra Day (monthly 27-day return cycle), Shukla Paksha',
      hi: 'जन्म नक्षत्र दिवस (मासिक 27 दिवसीय पुनरावृत्ति), शुक्ल पक्ष',
    },
    defaultDuration: { en: '2 to 3 Hours', hi: '2 से 3 घंटे' },
  },
  'grahan-dosh-pooja-ujjain': {
    rulingDeities: {
      en: 'Surya / Chandra Dev afflicted with Rahu / Ketu, & Lord Shiva',
      hi: 'सूर्य/चंद्र देव, राहु/केतु एवं देवाधिदेव महादेव',
    },
    recommendedTimings: {
      en: 'Solar & Lunar Eclipse days, Amavasya, Purnima, Sundays, Mondays',
      hi: 'सूर्य/चंद्र ग्रहण काल, अमावस्या, पूर्णिमा, रविवार, सोमवार',
    },
    defaultDuration: { en: '1.5 to 2.5 Hours', hi: '1.5 से 2.5 घंटे' },
  },

  // ── Tantrik & Shakti Havans ──
  'baglamukhi-havan-nalkheda': {
    rulingDeities: {
      en: 'Maa Baglamukhi (Pitambari Devi) & Ananda Bhairava',
      hi: 'मां बगलामुखी (पीताम्बरी देवी) एवं आनंद भैरव',
    },
    recommendedTimings: {
      en: 'Tuesdays, Fridays, Gupt Navratri, Ashtami, Chaturdashi, Amavasya',
      hi: 'मंगलवार, शुक्रवार, गुप्त नवरात्रि, अष्टमी, चतुर्दशी, अमावस्या',
    },
    defaultDuration: { en: '3 to 4 Hours', hi: '3 से 4 घंटे' },
  },
  'mirchi-havan-vikrant-bhairav-ujjain': {
    rulingDeities: {
      en: 'Lord Vikrant Bhairav & Lord Kaal Bhairav',
      hi: 'भगवान विक्रांत भैरव एवं भगवान काल भैरव',
    },
    recommendedTimings: {
      en: 'Sundays, Tuesdays, Bhairav Ashtami, Krishna Paksha Amavasya, Midnight Hours',
      hi: 'रविवार, मंगलवार, भैरवाष्टमी, कृष्ण पक्ष अमावस्या, निशीथ काल',
    },
    defaultDuration: { en: '1.5 to 2 Hours', hi: '1.5 से 2 घंटे' },
  },
  'shatchandi-path-havan-ujjain': {
    rulingDeities: {
      en: 'Maa Durga (Chandi Mahamaya) & Trishakti Peeth Deities',
      hi: 'मां दुर्गा (चंडी महामाया) एवं त्रिशक्ति',
    },
    recommendedTimings: {
      en: 'Chaitra & Sharadiya Navratri, Gupt Navratri, Ashtami, Purnima',
      hi: 'चैत्र एवं शारदीय नवरात्रि, गुप्त नवरात्रि, अष्टमी, पूर्णिमा',
    },
    defaultDuration: { en: 'Multi-Day (3 to 5 Days)', hi: 'बहु-दिवसीय (3 से 5 दिन)' },
  },
  'navchandi-path-havan-ujjain': {
    rulingDeities: {
      en: 'Maa Navadurga & Goddess Chandika',
      hi: 'मां नवदुर्गा एवं भगवती चंडिका',
    },
    recommendedTimings: {
      en: 'Navratri Tithis, Fridays, Ashtami, Navami, Purnima',
      hi: 'नवरात्रि तिथियां, शुक्रवार, अष्टमी, नवमी, पूर्णिमा',
    },
    defaultDuration: { en: '4 to 6 Hours', hi: '4 से 6 घंटे' },
  },

  // ── Prosperity, Harmony & Progeny ──
  'santan-gopal-jaap-path-ujjain': {
    rulingDeities: {
      en: 'Bhagwan Shri Krishna (Bal Gopal Avatar)',
      hi: 'भगवान श्री कृष्ण (बाल गोपाल स्वरूप)',
    },
    recommendedTimings: {
      en: 'Thursdays, Wednesdays, Janmashtami, Putrada Ekadashi, Shukla Paksha',
      hi: 'गुरुवार, बुधवार, श्रीकृष्ण जन्माष्टमी, पुत्रदा एकादशी, शुक्ल पक्ष',
    },
    defaultDuration: { en: '3 to 4 Hours', hi: '3 से 4 घंटे' },
  },
  '108-santan-gopal-sahastranama-ujjain': {
    rulingDeities: {
      en: 'Bhagwan Bal Gopal & Lord Krishna',
      hi: 'भगवान बाल गोपाल एवं श्री कृष्ण',
    },
    recommendedTimings: {
      en: 'Thursdays, Rohini Nakshatra, Putrada Ekadashi, Janmashtami',
      hi: 'गुरुवार, रोहिणी नक्षत्र, पुत्रदा एकादशी, जन्माष्टमी',
    },
    defaultDuration: { en: '3 Hours', hi: '3 घंटे' },
  },
  '108-hanuman-chalisa-havan-ujjain': {
    rulingDeities: {
      en: 'Lord Hanuman (Rudra Avatar & Maruti Nandan)',
      hi: 'पवनपुत्र हनुमान (रुद्रावतार श्री मारुति नंदन)',
    },
    recommendedTimings: {
      en: 'Tuesdays, Saturdays, Hanuman Jayanti, Budhva Mangal',
      hi: 'मंगलवार, शनिवार, हनुमान जयंती, बुढ़वा मंगल',
    },
    defaultDuration: { en: '3 Hours', hi: '3 घंटे' },
  },
  '108-shri-sukt-path-ujjain': {
    rulingDeities: {
      en: 'Maa Mahalakshmi & Maa Harsiddhi (Raja Vikramaditya Aradhya Devi)',
      hi: 'मां महालक्ष्मी एवं मां हरसिद्धि (राजा विक्रमादित्य आराध्य देवी)',
    },
    recommendedTimings: {
      en: 'Fridays, Purnima, Dhanteras, Diwali, Navratri',
      hi: 'शुक्रवार, पूर्णिमा, धनतेरस, दीपावली, नवरात्रि',
    },
    defaultDuration: { en: '3 Hours', hi: '3 घंटे' },
  },
  '1-25-lakh-mahalaxmi-beez-mantra-jaap-ujjain': {
    rulingDeities: {
      en: 'Bhagwati Mahalakshmi & Harsiddhi Shaktipeeth',
      hi: 'भगवती महालक्ष्मी एवं हरसिद्धि शक्तिपीठ',
    },
    recommendedTimings: {
      en: 'Fridays, Akshaya Tritiya, Diwali, Navratri, Purnima',
      hi: 'शुक्रवार, अक्षय तृतीया, दीपावली, नवरात्रि, पूर्णिमा',
    },
    defaultDuration: { en: 'Multi-Day Anushthan (3 to 5 Days)', hi: 'बहु-दिवसीय अनुष्ठान (3 से 5 दिन)' },
  },
  '108-vishnu-sahastranama-path-ujjain': {
    rulingDeities: {
      en: 'Lord Maha Vishnu & Lord Narayana',
      hi: 'भगवान महाविष्णु एवं श्री नारायण',
    },
    recommendedTimings: {
      en: 'Thursdays, Ekadashi, Purnima, Vaikuntha Ekadashi',
      hi: 'गुरुवार, एकादशी, पूर्णिमा, वैकुंठ एकादशी',
    },
    defaultDuration: { en: '3 Hours', hi: '3 घंटे' },
  },
  '108-ganesh-atharvashirsha-path-ujjain': {
    rulingDeities: {
      en: 'Lord Chintaman Ganesha (Vighnaharta)',
      hi: 'भगवान चिंतामण गणेश (विघ्नहर्ता)',
    },
    recommendedTimings: {
      en: 'Wednesdays, Sankashti Chaturthi, Vinayaka Chaturthi, Ganesh Utsav',
      hi: 'बुधवार, संकष्टी चतुर्थी, विनायक चतुर्थी, गणेशोत्सव',
    },
    defaultDuration: { en: '2.5 Hours', hi: '2.5 घंटे' },
  },

  // ── Symbolic Vivah Remedial Rites ──
  'kumbh-vivah-ujjain': {
    rulingDeities: {
      en: 'Lord Vishnu (Invoked in Sacred Kumbh / Water Urn)',
      hi: 'भगवान श्री हरि विष्णु (कलश / कुंभ अधिष्ठाता)',
    },
    recommendedTimings: {
      en: 'Tuesdays, Saturdays, Auspicious Shukla Tithi, Manglik Dosh Muhurat',
      hi: 'मंगलवार, शनिवार, शुभ शुक्ल तिथि, मांगलिक दोष शांति मुहूर्त',
    },
    defaultDuration: { en: '2.5 Hours', hi: '2.5 घंटे' },
  },
  'ark-vivah-ujjain': {
    rulingDeities: {
      en: 'Surya Narayana & Ark Devta (Sun God / Mandar Tree)',
      hi: 'भगवान सूर्य नारायण एवं मदार (अर्क) देव',
    },
    recommendedTimings: {
      en: 'Sundays, Tuesdays, Saturdays, Hast Nakshatra, Shukla Paksha',
      hi: 'रविवार, मंगलवार, शनिवार, हस्त नक्षत्र, शुक्ल पक्ष',
    },
    defaultDuration: { en: '2.5 Hours', hi: '2.5 घंटे' },
  },
};

/**
 * Resolves contextually accurate Ruling Deities, Recommended Timings, Sacred Kshetra,
 * and Duration for any pooja service in English or Hindi.
 */
export function getPoojaContextualDetails(pooja: PoojaService, language: string): PoojaContextMeta {
  const isHi = language === 'hi';
  const cleanSlug = pooja.slug ? pooja.slug.toLowerCase().trim() : '';
  const cleanId = pooja.id ? pooja.id.toLowerCase().trim() : '';

  // 1. Direct match from rule registry
  const matchedRule = POOJA_CONTEXT_RULES[cleanSlug] || POOJA_CONTEXT_RULES[cleanId];

  // 2. Keyword fallback for dynamically added poojas
  let fallbackRule: ContextMetaRule | null = null;
  if (!matchedRule) {
    const text = `${cleanSlug} ${cleanId} ${(pooja.name || '').toLowerCase()}`;
    if (text.includes('rudra') || text.includes('shiva') || text.includes('lingam') || text.includes('bilva')) {
      fallbackRule = POOJA_CONTEXT_RULES['rudrabhishek-pooja-ujjain'];
    } else if (text.includes('mangal') || text.includes('bhat') || text.includes('angareshwar') || text.includes('angarak')) {
      fallbackRule = POOJA_CONTEXT_RULES['bhat-pooja-mangalnath-ujjain'];
    } else if (text.includes('kaal sarp') || text.includes('kalsarp') || text.includes('sarpa') || text.includes('nagbali')) {
      fallbackRule = POOJA_CONTEXT_RULES['kaal-sarp-dosh-shanti-ujjain'];
    } else if (text.includes('pitru') || text.includes('narayan bali') || text.includes('shradh') || text.includes('tarpan')) {
      fallbackRule = POOJA_CONTEXT_RULES['pitru-shanti-pooja-ujjain'];
    } else if (text.includes('baglamukhi') || text.includes('nalkheda')) {
      fallbackRule = POOJA_CONTEXT_RULES['baglamukhi-havan-nalkheda'];
    } else if (text.includes('hanuman') || text.includes('maruti')) {
      fallbackRule = POOJA_CONTEXT_RULES['108-hanuman-chalisa-havan-ujjain'];
    } else if (text.includes('laxmi') || text.includes('lakshmi') || text.includes('shri sukt')) {
      fallbackRule = POOJA_CONTEXT_RULES['108-shri-sukt-path-ujjain'];
    } else if (text.includes('ganesh') || text.includes('vinayak')) {
      fallbackRule = POOJA_CONTEXT_RULES['108-ganesh-atharvashirsha-path-ujjain'];
    } else if (text.includes('navgraha') || text.includes('grah')) {
      fallbackRule = POOJA_CONTEXT_RULES['navgraha-shanti-pooja-ujjain'];
    } else if (text.includes('mrityunjaya') || text.includes('ayush')) {
      fallbackRule = POOJA_CONTEXT_RULES['mahamrityunjaya-jaap-ujjain'];
    } else if (text.includes('gopal') || text.includes('santan') || text.includes('krishna')) {
      fallbackRule = POOJA_CONTEXT_RULES['santan-gopal-jaap-path-ujjain'];
    } else if (text.includes('mool') || text.includes('nakshatra')) {
      fallbackRule = POOJA_CONTEXT_RULES['mool-shanti-pooja-ujjain'];
    } else if (text.includes('guru') || text.includes('brihaspati') || text.includes('chandal')) {
      fallbackRule = POOJA_CONTEXT_RULES['guru-chandal-dosh-shanti-pooja-ujjain'];
    } else {
      fallbackRule = {
        rulingDeities: {
          en: 'Sanatan Vedic Ishta Devata & Navgraha Mandalam',
          hi: 'सनातन वैदिक इष्ट देवता एवं नवग्रह मंडल',
        },
        recommendedTimings: {
          en: 'Auspicious Shukla Paksha, Tithi according to devotee birth chart & Vedic Muhurat',
          hi: 'शुभ शुक्ल पक्ष, जातक कुंडली अनुकूल शुभ नक्षत्र एवं वैदिक मुहूर्त',
        },
        defaultDuration: { en: '2 to 3 Hours', hi: '2 से 3 घंटे' },
      };
    }
  }

  const activeRule = matchedRule || fallbackRule;

  // Resolve Ruling Deities
  const rulingDeities = isHi
    ? (pooja as any).hindiRulingDeities || activeRule?.rulingDeities.hi || 'वैदिक इष्ट देवता'
    : (pooja as any).rulingDeities || activeRule?.rulingDeities.en || 'Vedic Ishta Devata';

  // Resolve Recommended Timings
  const recommendedTimings = isHi
    ? (pooja as any).hindiRecommendedTimings || activeRule?.recommendedTimings.hi || 'शुभ वैदिक मुहूर्त'
    : (pooja as any).recommendedTimings || activeRule?.recommendedTimings.en || 'Auspicious Vedic Muhurat';

  // Resolve Sacred Kshetra
  const sacredKshetra = isHi
    ? (pooja.hindiTempleName || pooja.templeName || 'उज्जैन के पावन देवालय एवं क्षिप्रा तट (अवंतिका पुरी)')
    : (pooja.templeName || 'Sacred Temples & Kshipra Bank, Ujjain (Avantika Puri)');

  // Resolve Duration
  const rawDuration = isHi ? (pooja.hindiDuration || pooja.duration) : pooja.duration;
  let estimatedDuration = rawDuration && rawDuration !== 'Available on enquiry'
    ? rawDuration
    : (isHi ? activeRule?.defaultDuration?.hi || '2 से 3 घंटे' : activeRule?.defaultDuration?.en || '2 to 3 Hours');

  return {
    rulingDeities,
    recommendedTimings,
    sacredKshetra,
    estimatedDuration,
  };
}
