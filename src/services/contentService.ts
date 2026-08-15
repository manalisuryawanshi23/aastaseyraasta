import { Language } from '../context/LanguageContext';
import { PoojaService, Tour, Destination, PoojaCategory, BlogPost, FAQ } from '../types';

export interface LocalizedPoojaContent {
  id: string;
  slug: string;
  name: { en: string; hi: string };
  categoryName: { en: string; hi: string };
  shortDescription: { en: string; hi: string };
  description: { en: string; hi: string };
  templeName: { en: string; hi: string };
  location: { en: string; hi: string };
  city: { en: string; hi: string };
  state: { en: string; hi: string };
  duration: { en: string; hi: string };
  whatWeOffer: { en: string[]; hi: string[] };
  benefits: { en: string[]; hi: string[] };
  preparation: { en: string[]; hi: string[] };
  ritualDetails: { en: string; hi: string };
}

export interface LocalizedTourContent {
  id: string;
  slug: string;
  name: { en: string; hi: string };
  category: { en: string; hi: string };
  shortDescription: { en: string; hi: string };
  description: { en: string; hi: string };
  startingPoint: { en: string; hi: string };
  endingPoint: { en: string; hi: string };
  duration: { en: string; hi: string };
  placesCovered: { en: string[]; hi: string[] };
  included: { en: string[]; hi: string[] };
  excluded: { en: string[]; hi: string[] };
}

export interface LocalizedDestinationContent {
  id: string;
  slug: string;
  name: { en: string; hi: string };
  shortDescription: { en: string; hi: string };
  description: { en: string; hi: string };
  placesToVisit: { en: string[]; hi: string[] };
  temples: { en: string[]; hi: string[] };
}

/**
 * Master Content Catalog for all 32 Poojas in clear English and Simple, Easy Hindi.
 * Designed for intuitive reading by devotees and families.
 */
export const POOJA_CONTENT_CATALOG: Record<string, LocalizedPoojaContent> = {
  // --- 1. Temple Pooja Services ---
  'pooja-rudrabhishek': {
    id: 'pooja-rudrabhishek',
    slug: 'rudrabhishek-pooja-ujjain',
    name: {
      en: 'Rudrabhishek — At all Shiva temples in Ujjain',
      hi: 'रुद्राभिषेक — उज्जैन के सभी शिव मंदिरों में',
    },
    categoryName: {
      en: 'Temple Pooja Services',
      hi: 'मंदिर पूजा सेवाएं',
    },
    shortDescription: {
      en: 'Sacred Lord Shiva ritual with milk, curd, honey, ghee, and Ganga water with Sri Rudram chanting in Ujjain.',
      hi: 'भगवान शिव का पावन अभिषेक, जिसमें गंगाजल, दूध, दही, शहद और घी से शिवलिंग की विशेष पूजा और मंत्र जाप किया जाता है।',
    },
    description: {
      en: 'Rudrabhishek is a sacred ritual dedicated to Lord Shiva. It is performed across all prominent Shiva temples in Ujjain (such as Mahakaleshwar, Omkareshwar, Mangalnath, and Angareshwar). In this ritual, the Shivling is bathed with holy Ganga water, cow milk, fresh curd, pure honey, desi ghee, sugarcane juice, and Panchamrit while learned priests chant the peaceful Sri Rudram mantras from the Yajurveda.',
      hi: 'रुद्राभिषेक भगवान शिव की सबसे प्रिय और मंगलकारी पूजा है। यह पूजा उज्जैन के प्रमुख शिव मंदिरों (जैसे महाकालेश्वर, ओंकारेश्वर, मंगलनाथ और अंगारेश्वर) में की जाती है। इसमें शिवलिंग पर पवित्र गंगाजल, गाय का शुद्ध दूध, दही, शहद, देसी घी, गन्ने का रस और पंचामृत चढ़ाकर विधि-विधान से अभिषेक किया जाता है। इससे मन शांत होता है और घर में सुख-समृद्धि आती है।',
    },
    templeName: {
      en: 'At all Shiva temples in Ujjain (Mahakaleshwar, Omkareshwar, Mangalnath, etc.)',
      hi: 'उज्जैन के सभी शिव मंदिर (महाकालेश्वर, ओंकारेश्वर, मंगलनाथ आदि)',
    },
    location: {
      en: 'Ujjain Sanctums',
      hi: 'उज्जैन पावन धाम',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '1.5 to 2 Hours',
      hi: '1.5 से 2 घंटे',
    },
    whatWeOffer: {
      en: ['Vedic Pandits', 'Panchamrit Samagri', 'Gotra Sankalp', 'Prasad'],
      hi: ['योग्य वेदपाठी पंडित जी', 'पंचामृत एवं शुद्ध पूजन सामग्री', 'नाम व गोत्र से विशेष संकल्प', 'महाकाल भस्म व प्रसाद'],
    },
    benefits: {
      en: ['Peace of mind, health, freedom from negativity'],
      hi: ['मानसिक शांति, अच्छा स्वास्थ्य और नकारात्मकता से मुक्ति'],
    },
    preparation: {
      en: ['Clean attire, Name, Gotra & Nakshatra'],
      hi: ['साफ-सुथरे वस्त्र, यजमान का नाम, गोत्र और जन्म नक्षत्र'],
    },
    ritualDetails: {
      en: 'Ganesh Pooja, Kalash Sthapana, Sri Rudram chanting, Panchamrit Abhishek on Shivling, Bilva Patra offering, and final Aarti.',
      hi: 'गणेश पूजन, कलश स्थापना, श्री रुद्रम् पाठ, पंचामृत अभिषेक, 108 बेलपत्र अर्पण और कपूर आरती।',
    },
  },

  'pooja-navgraha-shani-temple': {
    id: 'pooja-navgraha-shani-temple',
    slug: 'navgraha-shanti-pooja-shani-temple-ujjain',
    name: {
      en: 'Navgraha Shanti Pooja — At Navgraha Shani Temple',
      hi: 'नवग्रह शांति पूजा — नवग्रह शनि मंदिर (त्रिवेणी)',
    },
    categoryName: {
      en: 'Temple Pooja Services',
      hi: 'मंदिर पूजा सेवाएं',
    },
    shortDescription: {
      en: 'Sacred 9-planet pacification ritual at Triveni Navgraha Shani Temple on Kshipra Sangam in Ujjain.',
      hi: 'उज्जैन के त्रिवेणी संगम स्थित प्राचीन नवग्रह शनि मंदिर में सभी 9 ग्रहों को शांत व अनुकूल करने की विशेष पूजा।',
    },
    description: {
      en: 'Navgraha Shanti Pooja is performed at the ancient Navgraha Shani Temple on the holy Triveni Sangam in Ujjain. This ritual pacifies malefic planetary positions, eases the effects of Shani Sade Sati and Dhaiya, and brings balance, fortune, and harmony into personal and professional life.',
      hi: 'यह पूजा उज्जैन में शिप्रा नदी के त्रिवेणी संगम पर बने प्रसिद्ध नवग्रह शनि मंदिर में की जाती है। यदि कुंडली में शनि की साढ़े साती, ढैय्या या किसी भी ग्रह का अशुभ प्रभाव हो, तो यह पूजा करने से सभी परेशानियां दूर होती हैं और जीवन में संतुलन व सफलता मिलती है।',
    },
    templeName: {
      en: 'Navgraha Shani Temple (Triveni Sangam)',
      hi: 'नवग्रह शनि मंदिर (त्रिवेणी संगम)',
    },
    location: {
      en: 'Triveni Sangam, Ujjain',
      hi: 'त्रिवेणी संगम, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2 Hours',
      hi: '2 घंटे',
    },
    whatWeOffer: {
      en: ['Navgraha Peeth Sthapana', '9 Grains & Oils Samagri', 'Personal Sankalp', 'Navgraha Yantra Blessing'],
      hi: ['नवग्रह पीठ स्थापना', '9 प्रकार के अनाज और तेल सामग्री', 'नाम-गोत्र संकल्प', 'नवग्रह यंत्र आशीर्वाद'],
    },
    benefits: {
      en: ['Relief from Shani Sade Sati, career progress, mental peace'],
      hi: ['शनि साढ़े साती से राहत, काम-काज में तरक्की, मानसिक शांति'],
    },
    preparation: {
      en: ['Devotee birth details (Date, Time, Place of Birth), clean traditional clothes'],
      hi: ['जन्म का विवरण (तारीख, समय, स्थान), साफ पारंपरिक कपड़े'],
    },
    ritualDetails: {
      en: 'Navgraha Mandal drawing, individual planet invocation, oil offering to Lord Shani, havan with planetary herbs, and aarti.',
      hi: 'नवग्रह मंडल पूजन, नवग्रहों का आह्वान, शनि देव को तेल अर्पण, नवग्रह समिधा से हवन और आरती।',
    },
  },

  'pooja-bhat-angareshwar': {
    id: 'pooja-bhat-angareshwar',
    slug: 'bhat-pooja-angareshwar-ujjain',
    name: {
      en: 'Bhat Pooja — At Angareshwar Temple',
      hi: 'भात पूजा — अंगारेश्वर महादेव मंदिर',
    },
    categoryName: {
      en: 'Temple Pooja Services',
      hi: 'मंदिर पूजा सेवाएं',
    },
    shortDescription: {
      en: 'Vedic Bhat (cooked rice) pooja at Angareshwar Temple Ujjain for removing Mangal Dosh, anger, and marriage delays.',
      hi: 'उज्जैन के अंगारेश्वर मंदिर में पके हुए चावल (भात) से शिवलिंग का लेपन कर मंगल दोष व विवाह बाधा दूर करने की पूजा।',
    },
    description: {
      en: 'Angareshwar Mahadev Temple on the banks of holy Kshipra river is a renowned pilgrimage for Lord Angarak (Mars). Bhat Pooja is a specialized Vedic ritual where cooked rice and fresh curd are gently coated onto the Shivling along with cooling mantras, pacifying fiery Mars energies and bringing peace in married life.',
      hi: 'अंगारेश्वर महादेव मंदिर शिप्रा नदी के तट पर स्थित मंगल देव का अति प्राचीन मंदिर है। यहाँ शिवलिंग पर पके हुए चावल (भात) और ठंडे दही का लेप लगाया जाता है। इससे कुंडली का भारी मंगल दोष शांत होता है, गुस्सा कम होता है और शादी-विवाह में आ रही रुकावटें दूर होती हैं।',
    },
    templeName: {
      en: 'Angareshwar Mahadev Temple',
      hi: 'अंगारेश्वर महादेव मंदिर',
    },
    location: {
      en: 'Kshipra Bank, Ujjain',
      hi: 'शिप्रा तट, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2 Hours',
      hi: '2 घंटे',
    },
    whatWeOffer: {
      en: ['Pure Rice & Curd Samagri', 'Red Cloth & Flowers', 'Mangal Dosh Sankalp', 'Prasad'],
      hi: ['पवित्र चावल और दही सामग्री', 'लाल वस्त्र व लाल फूल', 'मंगल दोष निवारण संकल्प', 'महाप्रसाद'],
    },
    benefits: {
      en: ['Manglik dosh resolution, timely marriage, peaceful marital life, anger control'],
      hi: ['मांगलिक दोष से मुक्ति, शीघ्र विवाह, दांपत्य जीवन में सुख और शांति'],
    },
    preparation: {
      en: ['Fast on pooja day morning till ritual completes, wear clean clothes'],
      hi: ['पूजा संपन्न होने तक सुबह फलाहार/उपवास रखें, स्वच्छ कपड़े पहनें'],
    },
    ritualDetails: {
      en: 'Mangal invocation, Bhat Lepan on Shivling, red sandalwood offering, Mangal Gayatri jaap, and Mangal Aarti.',
      hi: 'मंगल देव का आह्वान, शिवलिंग पर भात लेपन, लाल चंदन व गुलाल अर्पण, मंगल गायत्री जाप और मंगल आरती।',
    },
  },

  'pooja-bhat-mangalnath': {
    id: 'pooja-bhat-mangalnath',
    slug: 'bhat-pooja-mangalnath-ujjain',
    name: {
      en: 'Bhat Pooja — At Mangalnath Temple',
      hi: 'भात पूजा — मंगलनाथ मंदिर',
    },
    categoryName: {
      en: 'Temple Pooja Services',
      hi: 'मंदिर पूजा सेवाएं',
    },
    shortDescription: {
      en: 'Authentic Manglik Dosh Bhat Pooja at Mangalnath Temple Ujjain, the cosmic birthplace of Mars.',
      hi: 'मंगल ग्रह की जन्मस्थली श्री मंगलनाथ मंदिर उज्जैन में मांगलिक दोष व विवाह रुकावटें दूर करने की प्रामाणिक भात पूजा।',
    },
    description: {
      en: 'Mangalnath Temple in Ujjain is recognized in the Matsya Purana as the cosmic birthplace of the planet Mars (Mangal). Performing Bhat Pooja here with cooked rice and curd cools the heat of Mars in the devotee horoscope, solving marriage delays, property disputes, and health imbalances.',
      hi: 'उज्जैन का श्री मंगलनाथ मंदिर पूरे ब्रह्मांड में मंगल ग्रह की जन्मस्थली माना जाता है। यहाँ विधि-विधान से भात पूजा करने पर कुंडली का कड़ा मांगलिक दोष शांत हो जाता है। जिन युवक-युवतियों के विवाह में बार-बार बाधाएं आ रही हों, उनके लिए यह पूजा बहुत फलदायी मानी जाती है।',
    },
    templeName: {
      en: 'Mangalnath Temple',
      hi: 'मंगलनाथ मंदिर',
    },
    location: {
      en: 'Mangalnath Marg, Ujjain',
      hi: 'मंगलनाथ मार्ग, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2 Hours',
      hi: '2 घंटे',
    },
    whatWeOffer: {
      en: ['Temple Bhat Samagri', 'Priest Dakshina & Sankalp', 'Red Silk Offering', 'Bhat Prasad'],
      hi: ['मंदिर प्रामाणिक भात सामग्री', 'पंडित संकल्प व दक्षिणा', 'लाल रेशमी वस्त्र अर्पण', 'भात महाप्रसाद'],
    },
    benefits: {
      en: ['Quick resolution of marriage hurdles, pacification of high Manglik dosh, harmony at home'],
      hi: ['विवाह की रुकावटें दूर होना, मंगल दोष का निवारण, परिवार में आपसी प्रेम व शांति'],
    },
    preparation: {
      en: ['Name, Gotra, Horoscope details, light sattvic breakfast or fast'],
      hi: ['नाम, गोत्र, कुंडली विवरण, सात्विक आचरण व स्वच्छ वस्त्र'],
    },
    ritualDetails: {
      en: 'Gauri Ganesh pooja, Mangal graha sthapana, Bhat Abhishek with curd and sugarcane, kumkum archana, and Mangalnath aarti.',
      hi: 'गौरी-गणेश पूजन, मंगल ग्रह स्थापना, पके चावल व दही से भात लेपन, कुमकुम अर्चन और मंगलनाथ महाआरती।',
    },
  },

  // --- 2. Dosh Shanti & Special Poojas ---
  'pooja-angarak-dosh': {
    id: 'pooja-angarak-dosh',
    slug: 'angarak-dosh-pooja-ujjain',
    name: {
      en: 'Angarak Dosh Pooja',
      hi: 'अंगारक दोष शांति पूजा',
    },
    categoryName: {
      en: 'Dosh Shanti & Special Poojas',
      hi: 'दोष शांति एवं विशेष पूजा',
    },
    shortDescription: {
      en: 'Vedic ritual for pacifying Mars and Rahu/Ketu conjunction causing sudden anger, accidents, and financial stress.',
      hi: 'कुंडली में मंगल और राहु/केतु की युति (अंगारक योग) से होने वाले गुस्से, तनाव और नुकसान को शांत करने की पूजा।',
    },
    description: {
      en: 'Angarak Dosh occurs when Mars forms a conjunction with Rahu or Ketu in one\'s birth chart. This causes impulsive anger, sudden conflicts, accident risks, and unstable wealth. Performed in Ujjain by qualified Vedic pandits, this ritual pacifies both Mars and shadow planets through targeted mantras and yajna.',
      hi: 'जब किसी की जन्मकुंडली में मंगल ग्रह के साथ राहु या केतु बैठ जाते हैं, तो उसे अंगारक दोष कहा जाता है। इसके कारण व्यक्ति को जल्दी गुस्सा आता है, वाद-विवाद होते हैं और धन हानि होती है। उज्जैन में यह शांति पूजा कराने से दोनों ग्रहों का अशुभ प्रभाव दूर होता है और जीवन में शांति आती है।',
    },
    templeName: {
      en: 'Mangalnath / Angareshwar Temple',
      hi: 'मंगलनाथ / अंगारेश्वर महादेव मंदिर',
    },
    location: {
      en: 'Ujjain Sanctums',
      hi: 'उज्जैन पावन धाम',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2 Hours',
      hi: '2 घंटे',
    },
    whatWeOffer: {
      en: ['Special Mars & Rahu Herbs', 'Gotra Sankalp', 'Havan Samagri', 'Protective Thread'],
      hi: ['मंगल व राहु की विशेष समिधाएं', 'व्यक्तिगत गोत्र संकल्प', 'हवन सामग्री', 'रक्षा सूत्र आशीर्वाद'],
    },
    benefits: {
      en: ['Calmness of mind, accident prevention, better financial stability'],
      hi: ['क्रोध पर नियंत्रण, दुर्घटनाओं से रक्षा, धन व व्यापार में स्थिरता'],
    },
    preparation: {
      en: ['Horoscope details, clean clothes, mental devotion'],
      hi: ['कुंडली विवरण, साफ कपड़े, मन में शुद्ध भावना'],
    },
    ritualDetails: {
      en: 'Mars-Rahu mandal sthapana, 108 Vedic japa, red flower archana, samidha havan, and aarti.',
      hi: 'मंगल-राहु मंडल स्थापना, वैदिक मंत्र जाप, लाल पुष्प अर्चन, विशेष समिधा से हवन और आरती।',
    },
  },

  'pooja-grahan-dosh': {
    id: 'pooja-grahan-dosh',
    slug: 'grahan-dosh-pooja-ujjain',
    name: {
      en: 'Grahan Dosh Pooja',
      hi: 'ग्रहण दोष शांति पूजा',
    },
    categoryName: {
      en: 'Dosh Shanti & Special Poojas',
      hi: 'दोष शांति एवं विशेष पूजा',
    },
    shortDescription: {
      en: 'Remedial ritual for Sun or Moon afflicted by Rahu/Ketu causing mental tension and lack of career growth.',
      hi: 'कुंडली में सूर्य या चंद्रमा पर राहु-केतु के प्रभाव से उत्पन्न तनाव व तरक्की में रुकावट दूर करने की सरल पूजा।',
    },
    description: {
      en: 'Grahan Dosh arises when the Sun or Moon is positioned close to Rahu or Ketu in the natal chart. It leads to self-doubt, family misunderstandings, and difficulty in receiving rightful recognition. This ritual involves Surya-Chandra mantra jaap, silver offerings, and Kshipra river tarpan.',
      hi: 'जब कुंडली में सूर्य या चंद्र ग्रह के साथ राहु या केतु आ जाते हैं, तो ग्रहण दोष बनता है। इससे व्यक्ति को मानसिक तनाव रहता है और मेहनत का पूरा फल नहीं मिल पाता। शिप्रा नदी के पावन तट पर सूर्य-चंद्र मंत्र जाप और तर्पण कराने से यह दोष समाप्त होता है।',
    },
    templeName: {
      en: 'Kshipra River Sanctum',
      hi: 'शिप्रा तट पावन धाम, उज्जैन',
    },
    location: {
      en: 'Ramghat, Ujjain',
      hi: 'रामघाट, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2 Hours',
      hi: '2 घंटे',
    },
    whatWeOffer: {
      en: ['Surya & Chandra Samagri', 'Silver Yantra blessing', 'Sankalp', 'Prasad'],
      hi: ['सूर्य-चंद्र पूजन सामग्री', 'चांदी का यंत्र आशीर्वाद', 'नाम-गोत्र संकल्प', 'प्रसाद'],
    },
    benefits: {
      en: ['Confidence boost, clear mind, career growth, father/mother harmony'],
      hi: ['आत्मविश्वास में वृद्धि, मानसिक शांति, नौकरी में पदोन्नति, माता-पिता से मधुर संबंध'],
    },
    preparation: {
      en: ['Bath before pooja, clean clothes, birth time & date'],
      hi: ['पूजा से पूर्व स्नान, स्वच्छ वस्त्र, जन्म समय व तारीख'],
    },
    ritualDetails: {
      en: 'Aditya Hridayam stotra path, Chandra beej jaap, ghee havan, and Kshipra deepdaan.',
      hi: 'आदित्य हृदय स्तोत्र पाठ, चंद्र बीज मंत्र जाप, घी से हवन और शिप्रा दीपदान।',
    },
  },

  'pooja-kaal-sarp': {
    id: 'pooja-kaal-sarp',
    slug: 'kaal-sarp-dosh-pooja-ujjain',
    name: {
      en: 'Kaal Sarp Dosh Pooja',
      hi: 'काल सर्प दोष निवारण पूजा',
    },
    categoryName: {
      en: 'Dosh Shanti & Special Poojas',
      hi: 'दोष शांति एवं विशेष पूजा',
    },
    shortDescription: {
      en: 'Vedic Naag-Nagin silver ritual and Rahu-Ketu shanti on Kshipra Ramghat Ujjain for removing career hurdles.',
      hi: 'उज्जैन में शिप्रा तट पर चांदी के नाग-नागिन जोड़े के साथ काल सर्प दोष व जीवन की रुकावटें दूर करने की प्रामाणिक पूजा।',
    },
    description: {
      en: 'Kaal Sarp Dosh is formed when all seven planets are hemmed between Rahu and Ketu in the horoscope. It creates repeated obstacles, disturbed sleep, and delays in success. In Ujjain—the sacred city of Mahakal—devotees perform this ritual with silver snake idols, Mahamrityunjaya chanting, and Rahu-Ketu havan.',
      hi: 'जब कुंडली में सभी ग्रह राहु और केतु के बीच आ जाते हैं, तो काल सर्प दोष बनता है। इसके कारण बनते काम बिगड़ते हैं और रात में डरावने सपने आते हैं। महाकाल की पावन नगरी उज्जैन में शिप्रा तट पर चांदी के नाग-नागिन जोड़े की पूजा और हवन करने से काल सर्प दोष पूरी तरह शांत हो जाता है।',
    },
    templeName: {
      en: 'Ramghat / Mahakal Sanctum',
      hi: 'रामघाट / महाकाल पावन क्षेत्र, उज्जैन',
    },
    location: {
      en: 'Kshipra Ramghat, Ujjain',
      hi: 'शिप्रा रामघाट, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 Hours',
      hi: '3 घंटे',
    },
    whatWeOffer: {
      en: ['Silver Naag-Nagin Pair', 'Rahu-Ketu Samagri', 'Full Vedic Havan', 'Sankalp & Prasad'],
      hi: ['चांदी का नाग-नागिन जोड़ा', 'राहु-केतु शांति सामग्री', 'संपूर्ण वैदिक हवन', 'संकल्प व महाकाल प्रसाद'],
    },
    benefits: {
      en: ['Removal of career blocks, sound sleep, sudden gains, peace in family'],
      hi: ['नौकरी-व्यापार की रुकावटें दूर, अच्छी नींद, धन लाभ और घर में सुख-शांति'],
    },
    preparation: {
      en: ['Do not wear black or leather, bring birth chart or name/gotra details'],
      hi: ['काले कपड़े व चमड़े की वस्तुएं न पहनें, नाम, गोत्र व जन्म तारीख साथ लाएं'],
    },
    ritualDetails: {
      en: 'Gauri Ganesh pooja, Naag devta invocation, Rahu-Ketu jaap, Rudrabhishek, Purnahuti havan, and Kshipra visarjan.',
      hi: 'गणेश पूजन, नाग देवता आह्वान, राहु-केतु मंत्र जाप, रुद्राभिषेक, पूर्णाहुति हवन और शिप्रा नदी में विसर्जन।',
    },
  },

  'pooja-pitru-shanti': {
    id: 'pooja-pitru-shanti',
    slug: 'pitru-shanti-pooja-ujjain',
    name: {
      en: 'Pitru Shanti Pooja',
      hi: 'पितृ शांति एवं पितृ दोष निवारण पूजा',
    },
    categoryName: {
      en: 'Dosh Shanti & Special Poojas',
      hi: 'दोष शांति एवं विशेष पूजा',
    },
    shortDescription: {
      en: 'Vedic Pind Daan and Til Tarpan on sacred Ramghat or Siddhvat Ujjain for ancestor blessings and lineage growth.',
      hi: 'उज्जैन के सिद्धवट या रामघाट पर पूर्वजों (पितरों) की आत्मा की शांति और परिवार की तरक्की हेतु पिंडदान व तर्पण पूजा।',
    },
    description: {
      en: 'Pitru Shanti Pooja is performed to seek the blessings of departed ancestors and relieve Pitru Dosh. Ujjain is recognized as one of the most sacred pilgrimage sites for ancestral rites, especially the holy Siddhvat (immortal banyan tree) and Ramghat. Devotees offer barley, black sesame, and water with Vedic chants.',
      hi: 'पूर्वजों (पितरों) की तृप्ति और उनका आशीर्वाद पाने के लिए पितृ शांति पूजा की जाती है। उज्जैन का सिद्धवट तीर्थ और रामघाट पितृ कार्यों के लिए पूरे भारत में प्रसिद्ध है। यहाँ तिल, जौ और गंगाजल से तर्पण व पिंडदान करने से पितरों को शांति मिलती है और परिवार में वंश वृद्धि व खुशहाली आती है।',
    },
    templeName: {
      en: 'Siddhvat / Kshipra Ramghat',
      hi: 'सिद्धवट / शिप्रा रामघाट, उज्जैन',
    },
    location: {
      en: 'Siddhvat Marg, Ujjain',
      hi: 'सिद्धवट मार्ग, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2.5 Hours',
      hi: '2.5 घंटे',
    },
    whatWeOffer: {
      en: ['Pind Daan Samagri (Barley, Til, Honey)', 'Kusha Grass & Janeu', 'Priest Guidance', 'Gau Daan / Brahmin Bhoj assistance'],
      hi: ['पिंडदान सामग्री (जौ, तिल, शहद)', 'कुश व जनेऊ', 'योग्य तीर्थ पुरोहित मार्गदर्शन', 'गौ सेवा व ब्राह्मण भोजन व्यवस्था'],
    },
    benefits: {
      en: ['Ancestor blessings, removal of child hurdles, family harmony, financial relief'],
      hi: ['पितरों का भरपूर आशीर्वाद, संतान सुख में आ रही बाधाएं दूर, परिवार में एकता व आर्थिक उन्नति'],
    },
    preparation: {
      en: ['Male family member performs main rites, bring ancestor names and gotra'],
      hi: ['परिवार के पुरुष सदस्य मुख्य संकल्प लें, पूर्वजों के नाम व गोत्र की जानकारी रखें'],
    },
    ritualDetails: {
      en: 'Sankalp, Vishnu pooja, Pind nirman, Til Tarpan on Kshipra waters, Brahmin bhojan sankalp, and Pitru aarti.',
      hi: 'संकल्प, भगवान विष्णु पूजन, पिंड निर्माण, शिप्रा जल में तिल तर्पण, ब्राह्मण भोजन संकल्प और पितृ आरती।',
    },
  },

  'pooja-rin-mukti': {
    id: 'pooja-rin-mukti',
    slug: 'rin-mukti-pooja-ujjain',
    name: {
      en: 'Rin Mukti Pooja',
      hi: 'ऋण मुक्ति पूजा — ऋणमुक्तेश्वर महादेव',
    },
    categoryName: {
      en: 'Dosh Shanti & Special Poojas',
      hi: 'दोष शांति एवं विशेष पूजा',
    },
    shortDescription: {
      en: 'Special debt-relief ritual at Rinmukteshwar Mahadev Temple Ujjain with yellow dal offerings and Mangal stotra.',
      hi: 'उज्जैन के ऋणमुक्तेश्वर महादेव मंदिर में कर्ज और आर्थिक तंगी से छुटकारा पाने के लिए चने की दाल से विशेष पूजा।',
    },
    description: {
      en: 'Rin Mukti Pooja is conducted at the historic Rinmukteshwar Mahadev Temple situated on the Kshipra riverbank in Ujjain. Offering yellow gram lentils (chana dal) while reciting the Rinmochan Mangal Stotra is a time-tested remedy to overcome debts, business losses, and blocked payments.',
      hi: 'यह पूजा उज्जैन में शिप्रा नदी किनारे बने ऋणमुक्तेश्वर महादेव मंदिर में की जाती है। यहाँ शिवलिंग पर पीली चने की दाल चढ़ाकर ऋणमोचन मंगल स्तोत्र का पाठ किया जाता है। यदि आप पर पुराना कर्ज है या पैसा कहीं फंसा हुआ है, तो यह पूजा कराने से रास्ते खुलते हैं।',
    },
    templeName: {
      en: 'Rinmukteshwar Mahadev Temple',
      hi: 'ऋणमुक्तेश्वर महादेव मंदिर',
    },
    location: {
      en: 'Kshipra River, Ujjain',
      hi: 'शिप्रा तट, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2 Hours',
      hi: '2 घंटे',
    },
    whatWeOffer: {
      en: ['Yellow Chana Dal & Flowers', 'Rinmochan Stotra Path', 'Vedic Abhishek', 'Prasad'],
      hi: ['पीली चने की दाल व पीले फूल', 'ऋणमोचन स्तोत्र पाठ', 'वैदिक अभिषेक सामग्री', 'प्रसाद'],
    },
    benefits: {
      en: ['Debt clearance, new earning opportunities, wealth recovery, mental relief'],
      hi: ['कर्ज से जल्द मुक्ति, आमदनी के नए साधन, रुका हुआ धन वापस मिलना, चिंता से राहत'],
    },
    preparation: {
      en: ['Yellow clothes preferred, keep faith in Lord Shiva, fast on Tuesday morning if possible'],
      hi: ['संभव हो तो पीले कपड़े पहनें, मंगलवार के दिन यह पूजा कराना विशेष फलदायी होता है'],
    },
    ritualDetails: {
      en: 'Ganesh pooja, Shivling Abhishek with water & milk, Chana dal lepan, Rinmochan stotra recitation, and Shiv aarti.',
      hi: 'गणेश पूजन, शिवलिंग का दुग्धाभिषेक, चने की दाल से अर्चन, ऋणमोचन स्तोत्र पाठ और आरती।',
    },
  },

  'pooja-mool-shanti': {
    id: 'pooja-mool-shanti',
    slug: 'mool-shanti-pooja-ujjain',
    name: {
      en: 'Mool Shanti Pooja',
      hi: 'मूल शांति (गंडमूल) पूजा',
    },
    categoryName: {
      en: 'Dosh Shanti & Special Poojas',
      hi: 'दोष शांति एवं विशेष पूजा',
    },
    shortDescription: {
      en: 'Vedic ritual for child born under Gandmool Nakshatras using 27 tree leaves, water, and Nakshatra havan.',
      hi: 'गंडमूल नक्षत्रों (मूल, ज्येष्ठा, अश्लेषा आदि) में जन्मे जातक के उत्तम स्वास्थ्य व लंबी उम्र के लिए 27 पेड़ों के पत्तों से शांति पूजा।',
    },
    description: {
      en: 'When a child is born in Gandmool Nakshatras (Ashwini, Ashlesha, Magha, Jyeshtha, Moola, Revati), Mool Shanti Pooja is performed. Using holy waters from 27 sacred places and leaves of 27 medicinal trees, priests conduct Vedic chanting and yajna to ensure long life, sound health, and family prosperity.',
      hi: 'जब किसी बच्चे का जन्म मूल, ज्येष्ठा, अश्लेषा, मघा, रेवती या अश्विनी नक्षत्र में होता है, तो गंडमूल दोष लगता है। 27 पवित्र तीर्थों के जल और 27 पेड़ों के पत्तों से वैदिक विधि से स्नान व हवन कराया जाता है, जिससे बच्चे का स्वास्थ्य अच्छा रहता है और माता-पिता पर कोई भारी प्रभाव नहीं पड़ता।',
    },
    templeName: {
      en: 'Ujjain Vedic Sanctum',
      hi: 'उज्जैन वैदिक पावन धाम',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 Hours',
      hi: '3 घंटे',
    },
    whatWeOffer: {
      en: ['27 Tree Leaves & Waters', 'Nakshatra Yantra', 'Gotra Sankalp', 'Havan Samagri'],
      hi: ['27 वृक्षों के पत्ते व 27 कुओं का जल', 'नक्षत्र यंत्र', 'गोत्र संकल्प', 'हवन सामग्री'],
    },
    benefits: {
      en: ['Protection of child health, family prosperity, peaceful life path'],
      hi: ['बच्चे का उत्तम स्वास्थ्य, माता-पिता की चिंता दूर, परिवार में बरकत'],
    },
    preparation: {
      en: ['Bring child birth chart, mother and father attend with child'],
      hi: ['बच्चे की जन्म कुंडली लाएं, माता-पिता बच्चे के साथ उपस्थित रहें'],
    },
    ritualDetails: {
      en: 'Kalash sthapana, 27 nakshatra water Abhishek, Nakshatra beej mantra jaap, cow shadow darshan, and purnahuti.',
      hi: 'कलश स्थापना, 27 नक्षत्र जल से अभिषेक, नक्षत्र बीज मंत्र पाठ, कांसे के कटोरे में घी का मुख दर्शन और हवन।',
    },
  },

  'pooja-vish-yog': {
    id: 'pooja-vish-yog',
    slug: 'vish-yog-shanti-pooja-ujjain',
    name: {
      en: 'Vish Yog Shanti Pooja',
      hi: 'विष योग शांति पूजा',
    },
    categoryName: {
      en: 'Dosh Shanti & Special Poojas',
      hi: 'दोष शांति एवं विशेष पूजा',
    },
    shortDescription: {
      en: 'Remedial ritual for Saturn and Moon conjunction causing anxiety, depression, and mood swings.',
      hi: 'कुंडली में शनि और चंद्र की युति (विष योग) से होने वाली घबराहट, उदासी व मानसिक तनाव को दूर करने की पूजा।',
    },
    description: {
      en: 'Vish Yog is formed when Saturn and the Moon sit together in a single house in the natal chart. It leads to persistent anxiety, sleeplessness, negative thoughts, and emotional turmoil. Performed in Ujjain with Shiva Abhishek and Moon-Saturn balance mantras, it brings mental calm and emotional stability.',
      hi: 'कुंडली में जब शनि और चंद्रमा एक साथ बैठ जाते हैं, तो विष योग बनता है। इससे मन में लगातार घबराहट, उदासी, नकारात्मक विचार और अनिद्रा की समस्या रहती है। उज्जैन में भगवान शिव का दुग्धाभिषेक और शांति पूजा कराने से मन स्थिर और शांत हो जाता है।',
    },
    templeName: {
      en: 'Ujjain Sanctum',
      hi: 'उज्जैन पावन धाम',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2 Hours',
      hi: '2 घंटे',
    },
    whatWeOffer: {
      en: ['White & Black Sesame Samagri', 'Shiva Rudrabhishek', 'Sankalp', 'Prasad'],
      hi: ['सफेद व काले तिल सामग्री', 'शिव रुद्राभिषेक', 'नाम-गोत्र संकल्प', 'महाप्रसाद'],
    },
    benefits: {
      en: ['Emotional calm, relief from depressive thoughts, better sleep and clarity'],
      hi: ['मानसिक सुकून, नकारात्मक विचारों से मुक्ति, अच्छी नींद और स्पष्ट निर्णय क्षमता'],
    },
    preparation: {
      en: ['Birth details, wear light colored clean clothes, arrive with calm mind'],
      hi: ['जन्म का विवरण, हल्के रंग के साफ कपड़े पहनें, शांत मन से शामिल हों'],
    },
    ritualDetails: {
      en: 'Ganesh pooja, Chandra-Shani mandal sthapana, Shiva Abhishek with raw milk, and Shanti havan.',
      hi: 'गणेश पूजन, चंद्र-शनि मंडल स्थापना, कच्चे दूध से शिवलिंग अभिषेक और शांति हवन।',
    },
  },

  'pooja-nakshatra-shanti': {
    id: 'pooja-nakshatra-shanti',
    slug: 'nakshatra-shanti-pooja-ujjain',
    name: {
      en: 'Nakshatra Shanti Pooja',
      hi: 'नक्षत्र शांति पूजा',
    },
    categoryName: {
      en: 'Dosh Shanti & Special Poojas',
      hi: 'दोष शांति एवं विशेष पूजा',
    },
    shortDescription: {
      en: 'Vedic star pacification ritual for birth star afflictions to unlock prosperity and luck.',
      hi: 'जन्म नक्षत्र के दोषों को शांत कर भाग्य और सुख-समृद्धि के रास्ते खोलने की वैदिक पूजा।',
    },
    description: {
      en: 'Nakshatra Shanti Pooja is performed to appease the presiding deity and ruling planet of your birth star (Janma Nakshatra). When the birth star is afflicted by malefic transits or positions, this ritual restores cosmic balance, brings luck, and removes persistent life obstacles.',
      hi: 'हर व्यक्ति का एक जन्म नक्षत्र होता है। यदि जन्म नक्षत्र पर किसी पाप ग्रह का प्रभाव हो, तो जीवन में लगातार रुकावटें आती हैं। नक्षत्र शांति पूजा में संबंधित नक्षत्र के देवता और ग्रह की विशेष पूजा व हवन किया जाता है, जिससे भाग्य का साथ मिलता है।',
    },
    templeName: {
      en: 'Ujjain Sanctum',
      hi: 'उज्जैन वैदिक पावन धाम',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2 Hours',
      hi: '2 घंटे',
    },
    whatWeOffer: {
      en: ['Nakshatra Specific Samagri', 'Gotra Sankalp', 'Havan & Aarti', 'Prasad'],
      hi: ['नक्षत्र अनुसार विशेष पूजन सामग्री', 'गोत्र संकल्प', 'हवन व आरती', 'प्रसाद'],
    },
    benefits: {
      en: ['Personal growth, removal of recurring hurdles, divine blessings'],
      hi: ['काम-काज में तरक्की, बार-बार आने वाली अड़चनों से मुक्ति, भाग्योदय'],
    },
    preparation: {
      en: ['Birth star name, date, time and place of birth'],
      hi: ['जन्म नक्षत्र, जन्म तारीख, समय और स्थान का विवरण'],
    },
    ritualDetails: {
      en: 'Nakshatra deity invocation, 108 beej mantra recitation, herbal wood havan, and prasad distribution.',
      hi: 'नक्षत्र देव का आह्वान, 108 बीज मंत्र पाठ, नक्षत्र समिधा से हवन और महाप्रसाद।',
    },
  },

  'pooja-guru-chandal': {
    id: 'pooja-guru-chandal',
    slug: 'guru-chandal-dosh-shanti-pooja-ujjain',
    name: {
      en: 'Guru Chandal Dosh Shanti Pooja — At Ancient Devguru Brihaspati Temple',
      hi: 'गुरु चांडाल दोष शांति पूजा — प्राचीन देवगुरु बृहस्पति मंदिर',
    },
    categoryName: {
      en: 'Dosh Shanti & Special Poojas',
      hi: 'दोष शांति एवं विशेष पूजा',
    },
    shortDescription: {
      en: 'Jupiter-Rahu afflictions pacification at Ancient Devguru Brihaspati Temple Ujjain for education and wealth.',
      hi: 'उज्जैन के प्राचीन देवगुरु बृहस्पति मंदिर में गुरु-राहु युति (चांडाल दोष) से मुक्ति और ज्ञान-धन वृद्धि हेतु पूजा।',
    },
    description: {
      en: 'Guru Chandal Dosh is created when benevolent Jupiter (Guru) is conjunct with shadow planet Rahu in the birth chart. It negatively affects higher education, moral clarity, financial growth, and spiritual progress. Performed at the famous Devguru Brihaspati Temple in Ujjain with yellow offerings and Brihaspati Vedic mantras.',
      hi: 'जब कुंडली में शुभ ग्रह बृहस्पति (गुरु) के साथ राहु बैठ जाता है, तो गुरु चांडाल दोष बनता है। इससे पढ़ाई में मन नहीं लगता, गलत संगति होती है और धन का नुकसान होता है। उज्जैन के प्राचीन बृहस्पति मंदिर में पीले फूल, चने की दाल और पीले वस्त्रों से पूजा कराने पर यह दोष पूरी तरह शांत होता है।',
    },
    templeName: {
      en: 'Ancient Devguru Brihaspati Temple',
      hi: 'प्राचीन देवगुरु बृहस्पति मंदिर',
    },
    location: {
      en: 'Brihaspati Temple Marg, Ujjain',
      hi: 'बृहस्पति मंदिर मार्ग, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2.5 Hours',
      hi: '2.5 घंटे',
    },
    whatWeOffer: {
      en: ['Yellow Clothes & Flowers', 'Brihaspati & Rahu Samagri', 'Gotra Sankalp', 'Yantra Blessing'],
      hi: ['पीले वस्त्र व पीले पुष्प', 'गुरु-राहु विशेष सामग्री', 'नाम-गोत्र संकल्प', 'बृहस्पति यंत्र आशीर्वाद'],
    },
    benefits: {
      en: ['Academic excellence, sound decision making, wealth accumulation, career guidance'],
      hi: ['शिक्षा व परीक्षा में सफलता, सही निर्णय लेने की क्षमता, धन में बरकत, मान-सम्मान'],
    },
    preparation: {
      en: ['Wear yellow traditional attire if possible, keep fast on Thursday morning'],
      hi: ['संभव हो तो पीले कपड़े पहनें, गुरुवार के दिन यह पूजा कराना अति उत्तम है'],
    },
    ritualDetails: {
      en: 'Brihaspati pooja, Rahu shanti path, yellow sweet offering, 108 Guru mantra jaap, and havan.',
      hi: 'बृहस्पति देव का पूजन, राहु शांति पाठ, बेसन के लड्डू व पीले फल अर्पण, गुरु बीज मंत्र जाप और हवन।',
    },
  },

  // --- 3. Jaap & Havan Services ---
  'pooja-mahamrityunjaya': {
    id: 'pooja-mahamrityunjaya',
    slug: 'mahamrityunjaya-jaap-ujjain',
    name: {
      en: 'Mahamrityunjaya Jaap — At Mahakal / Markandeshwar',
      hi: 'महामृत्युंजय जाप एवं अनुष्ठान — महाकाल / मार्कंडेश्वर मंदिर',
    },
    categoryName: {
      en: 'Jaap & Havan Services',
      hi: 'जाप एवं हवन सेवाएं',
    },
    shortDescription: {
      en: 'Potent Vedic mantra chanting in Ujjain for health, recovery from chronic illness, and longevity.',
      hi: 'महाकाल की पावन नगरी उज्जैन में गंभीर रोगों से मुक्ति, लंबी उम्र और अकाल मृत्यु के भय को दूर करने का महाअनुष्ठान।',
    },
    description: {
      en: 'Mahamrityunjaya Jaap is the supreme life-protecting Vedic mantra dedicated to Lord Shiva as the conqueror of death. Performed in the holy energy of Mahakaleshwar and Markandeshwar Temple in Ujjain, learned Gurukul pandits recite the mantra with pure ghee and herbal samidha havan for the speedy recovery and well-being of devotees.',
      hi: 'महामृत्युंजय मंत्र भगवान शिव का सबसे शक्तिशाली मंत्र है, जो अकाल मृत्यु और गंभीर बीमारियों से रक्षा करता है। उज्जैन में विद्वान ब्राह्मणों द्वारा यह जाप और हवन कराया जाता है। यदि परिवार में कोई व्यक्ति लंबे समय से बीमार हो या किसी भारी संकट से गुजर रहा हो, तो यह अनुष्ठान जीवन रक्षक माना जाता है।',
    },
    templeName: {
      en: 'Mahakaleshwar / Markandeshwar Temple',
      hi: 'महाकालेश्वर / मार्कंडेश्वर मंदिर',
    },
    location: {
      en: 'Mahakal Marg, Ujjain',
      hi: 'महाकाल मार्ग, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 to 5 Hours',
      hi: '3 से 5 घंटे',
    },
    whatWeOffer: {
      en: ['Vedic Gurukul Pandits', 'Pure Ghee & Herbal Havan Samagri', 'Personalized Sankalp', 'Mahakal Bhasma Prasad'],
      hi: ['योग्य वेदपाठी ब्राह्मण दल', 'शुद्ध देसी घी व औषधीय हवन सामग्री', 'यजमान के नाम से विशेष संकल्प', 'महाकाल भस्म व अभिमंत्रित रक्षा सूत्र'],
    },
    benefits: {
      en: ['Recovery from severe illness, protection against accidents, peace of mind, long healthy life'],
      hi: ['बीमारियों से शीघ्र आराम, दुर्घटनाओं से सुरक्षा, मन में शांति और दीर्घायु का आशीर्वाद'],
    },
    preparation: {
      en: ['Provide patient/devotee name, gotra, photo, clean clothes for attendees'],
      hi: ['मरीज/यजमान का नाम, गोत्र, फोटो व जन्म विवरण प्रदान करें'],
    },
    ritualDetails: {
      en: 'Shiva Sankalp, Rudra Kalash Sthapana, targeted count mantra jaap, Bilva Patra & Guduchi havan, and Mahamrityunjaya Aarti.',
      hi: 'शिव संकल्प, कलश स्थापना, निश्चित संख्या में महामृत्युंजय मंत्र जाप, गिलोय व बेलपत्र से हवन और महाआरती।',
    },
  },

  'pooja-mritsanjeevani': {
    id: 'pooja-mritsanjeevani',
    slug: 'mritsanjeevani-jaap-pooja-ujjain',
    name: {
      en: 'MritSanjeevani Jaap & Pooja — At Mahakal / Markandeshwar',
      hi: 'मृतसंजीवनी जाप एवं पूजा — महाकाल / मार्कंडेश्वर मंदिर',
    },
    categoryName: {
      en: 'Jaap & Havan Services',
      hi: 'जाप एवं हवन सेवाएं',
    },
    shortDescription: {
      en: 'Esoteric Vedic life-revitalizing ritual invoking Mritsanjeevani Vidhi for severe critical ailments.',
      hi: 'अत्यंत गंभीर स्वास्थ्य संकट और जीवन रक्षा के लिए प्राचीन मृतसंजीवनी विद्या का गुप्त व पावन अनुष्ठान।',
    },
    description: {
      en: 'MritSanjeevani Jaap is a profound and ancient Vedic ritual derived from the teachings of Sage Shukracharya and Rishi Markandeya. Conducted by senior Vedic Acharyas in the divine precincts of Mahakaleshwar, this powerful recitation revitalizes depleted life energy (Prana) and provides divine protection in critical health conditions.',
      hi: 'मृतसंजीवनी अनुष्ठान वेदों का अति प्राचीन और शक्तिशाली अनुष्ठान है। जब किसी व्यक्ति का स्वास्थ्य बहुत ज्यादा नाजुक हो और सामान्य उपचार से लाभ न मिल रहा हो, तब उज्जैन में वरिष्ठ आचार्यों द्वारा यह विशेष पाठ व महायज्ञ कराया जाता है ताकि प्राण शक्ति लौट सके और संकट टल जाए।',
    },
    templeName: {
      en: 'Mahakaleshwar / Markandeshwar Temple',
      hi: 'महाकालेश्वर / मार्कंडेश्वर मंदिर',
    },
    location: {
      en: 'Mahakal Marg, Ujjain',
      hi: 'महाकाल मार्ग, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '4 Hours',
      hi: '4 घंटे',
    },
    whatWeOffer: {
      en: ['Senior Vedic Acharyas', 'Special Sanjeevani Herbs & Ghee', 'Gotra Sankalp', 'Mahakal Prasad & Yantra'],
      hi: ['वरिष्ठ वैदिक आचार्य', 'विशेष संजीवनी जड़ी-बूटियां व गाय का घी', 'व्यक्तिगत गोत्र संकल्प', 'महाकाल अभिमंत्रित रक्षा कवच'],
    },
    benefits: {
      en: ['Vital energy restoration, critical ailment relief, long life blessing'],
      hi: ['प्राण ऊर्जा में वृद्धि, गंभीर संकट से मुक्ति, स्वास्थ्य लाभ और दीर्घायु'],
    },
    preparation: {
      en: ['Patient details, gotra, name, pure sattvic environment during pooja'],
      hi: ['मरीज का नाम, गोत्र, वर्तमान स्थिति और परिवार का संकल्प'],
    },
    ritualDetails: {
      en: 'Special Sanjeevani Kalash puja, Nyasa, continuous mantra chanting, herbal aahuti, and final blessing.',
      hi: 'संजीवनी कलश पूजन, अंगन्यास, निरंतर मंत्र जाप, विशेष औषधियों से आहुति और रक्षा कवच संकल्प।',
    },
  },

  'pooja-baglamukhi-havan': {
    id: 'pooja-baglamukhi-havan',
    slug: 'baglamukhi-havan-nalkheda',
    name: {
      en: 'Baglamukhi Havan — At Baglamukhi Temple, Nalkheda',
      hi: 'बगलामुखी हवन — मां बगलामुखी मंदिर, नलखेड़ा',
    },
    categoryName: {
      en: 'Jaap & Havan Services',
      hi: 'जाप एवं हवन सेवाएं',
    },
    shortDescription: {
      en: 'Powerful Pitambara Mahavidya yellow mustard Havan at Siddh Peeth Nalkheda for victory in legal cases and protection.',
      hi: 'नलखेड़ा स्थित विश्व प्रसिद्ध मां बगलामुखी शक्तिपीठ में पीली सरसों व हल्दी से विजय, कोर्ट-कचहरी और शत्रु बाधा निवारण हवन।',
    },
    description: {
      en: 'Maa Baglamukhi Temple in Nalkheda (near Ujjain) is a celebrated Siddh Peeth established during the Mahabharata era by Lord Krishna and the Pandavas. Performing the yellow mustard and turmeric Havan here pacifies negative opposition, ensures victory in court disputes, protects from evil eye, and turns adversity into success.',
      hi: 'नलखेड़ा स्थित मां बगलामुखी मंदिर भारत के तीन प्रमुख बगलामुखी सिद्धपीठों में से एक है। इसकी स्थापना महाभारत काल में भगवान श्रीकृष्ण और युधिष्ठिर द्वारा मानी जाती है। यहाँ पीली सरसों, हल्दी की गांठ और पीले वस्त्रों से हवन करने पर कोर्ट-कचहरी, विरोधी बाधा और व्यापार की अड़चनों में निश्चित विजय प्राप्त होती है।',
    },
    templeName: {
      en: 'Maa Baglamukhi Temple',
      hi: 'मां बगलामुखी शक्तिपीठ मंदिर',
    },
    location: {
      en: 'Nalkheda, Agar Malwa',
      hi: 'नलखेड़ा, आगर मालवा (उज्जैन के निकट)',
    },
    city: {
      en: 'Nalkheda',
      hi: 'नलखेड़ा',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 Hours',
      hi: '3 घंटे',
    },
    whatWeOffer: {
      en: ['Yellow Mustard & Turmeric Samagri', 'Pitambari Cloth & Flowers', 'Victory Sankalp', 'Maa Baglamukhi Prasad'],
      hi: ['पीली सरसों, हल्दी व पीले फल-फूल', 'पीताम्बरी वस्त्र', 'विजय व रक्षा संकल्प', 'मां बगलामुखी चुनरी व प्रसाद'],
    },
    benefits: {
      en: ['Victory in court cases, protection against enemies, business growth, sudden obstacle clearance'],
      hi: ['कोर्ट-कचहरी में विजय, विरोधियों पर जीत, व्यापार में तरक्की और हर प्रकार के भय से मुक्ति'],
    },
    preparation: {
      en: ['Wear clean yellow clothes, follow sattvic diet on pooja day'],
      hi: ['पीले कपड़े पहनें, पूजा के दिन शुद्ध सात्विक भोजन करें'],
    },
    ritualDetails: {
      en: 'Maa Baglamukhi yantra pooja, Pitambara beej mantra jaap, yellow mustard havan with ghee, and Trishati aarti.',
      hi: 'मां बगलामुखी यंत्र पूजन, पीताम्बरा बीज मंत्र जाप, पीली सरसों व गाय के घी से हवन और महाआरती।',
    },
  },

  'pooja-mirchi-havan': {
    id: 'pooja-mirchi-havan',
    slug: 'mirchi-havan-vikrant-bhairav-ujjain',
    name: {
      en: 'Mirchi Havan — At Vikrant Bhairav Temple',
      hi: 'मिर्ची हवन — विक्रांत भैरव मंदिर, उज्जैन',
    },
    categoryName: {
      en: 'Jaap & Havan Services',
      hi: 'जाप एवं हवन सेवाएं',
    },
    shortDescription: {
      en: 'Specialized red chili tantric Havan performed at Vikrant Bhairav Temple Ujjain for removing severe negativity and evil forces.',
      hi: 'उज्जैन के प्रसिद्ध विक्रांत भैरव मंदिर में सूखी लाल मिर्च से बुरी नजर, तंत्र बाधा और भारी संकट को नष्ट करने का हवन।',
    },
    description: {
      en: 'Mirchi Havan at the ancient Vikrant Bhairav Temple on the Kshipra riverbank is a specialized ritual for removing deeply entrenched negative energies, severe witchcraft afflictions, and recurring business sabotage. Performed by experienced Bhairav upassaks using dry red chilies and mustard oil with complete scriptural safety.',
      hi: 'उज्जैन में शिप्रा नदी किनारे विक्रांत भैरव मंदिर तंत्र साधना और संकट निवारण का बहुत बड़ा केंद्र है। यहाँ साबुत लाल मिर्च और सरसों के तेल से विशेष हवन किया जाता है। इससे पुरानी से पुरानी बुरी नजर, तंत्र दोष और भारी नकारात्मक ऊर्जा तुरंत जलकर भस्म हो जाती है।',
    },
    templeName: {
      en: 'Vikrant Bhairav Temple',
      hi: 'विक्रांत भैरव मंदिर',
    },
    location: {
      en: 'Kshipra Bank, Ujjain',
      hi: 'शिप्रा तट, भैरवगढ़, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2 Hours',
      hi: '2 घंटे',
    },
    whatWeOffer: {
      en: ['Dry Red Chilies & Mustard Oil', 'Bhairav Samagri', 'Protective Circle Sankalp', 'Bhairav Bhasma'],
      hi: ['साबुत लाल मिर्च, सरसों का तेल व हवन समिधा', 'भैरव पूजन सामग्री', 'सुरक्षा घेरा संकल्प', 'भैरव भस्म व रक्षा सूत्र'],
    },
    benefits: {
      en: ['Destruction of negative energies, business obstacle removal, peace of mind, fearlessness'],
      hi: ['नकारात्मक शक्तियों का नाश, व्यापार की रुकावटें दूर, मन से डर समाप्त, नई ऊर्जा का संचार'],
    },
    preparation: {
      en: ['Strict sattvic lifestyle on the day, mental focus on Lord Bhairav'],
      hi: ['पूजा के दिन पूर्ण सात्विक रहें, मन में भैरव बाबा का स्मरण रखें'],
    },
    ritualDetails: {
      en: 'Batuk & Vikrant Bhairav invocation, oil lamp offering, red chili aahuti havan, and protective raksha mantra.',
      hi: 'बटुक व विक्रांत भैरव का आह्वान, तेल का दीपक अर्पण, लाल मिर्च की आहुतियों से हवन और रक्षा मंत्र पाठ।',
    },
  },

  'pooja-navgraha-shanti': {
    id: 'pooja-navgraha-shanti',
    slug: 'navgraha-jaap-havan-ujjain',
    name: {
      en: 'Navgraha Jaap & Havan',
      hi: 'नवग्रह जाप एवं महाहवन',
    },
    categoryName: {
      en: 'Jaap & Havan Services',
      hi: 'जाप एवं हवन सेवाएं',
    },
    shortDescription: {
      en: 'Complete 9-planet mantra jaap and sacred wood Yajna in Ujjain for overall balance and fortune.',
      hi: 'सभी 9 ग्रहों (सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु, केतु) की शांति व कृपा पाने के लिए संपूर्ण वैदिक हवन।',
    },
    description: {
      en: 'Navgraha Jaap & Havan is a comprehensive astrological ceremony where individual mantras for all nine planetary deities (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu) are recited by learned priests with their respective sacred woods (Ark, Khadir, Palash, Apamarga, Peepal, Shami, Durva, Kusha). It ensures all-round peace and prosperity.',
      hi: 'यह पूजा सभी नौ ग्रहों को प्रसन्न और अनुकूल बनाने के लिए की जाती है। इसमें सूर्य से लेकर केतु तक सभी 9 ग्रहों के मंत्रों का जाप किया जाता है और प्रत्येक ग्रह के लिए विशेष लकड़ी (जैसे पलाश, पीपल, शमी, दूर्वा आदि) से हवन किया जाता है। इससे जीवन के हर क्षेत्र में उन्नति मिलती है।',
    },
    templeName: {
      en: 'Navgraha Temple / Kshipra Bank',
      hi: 'नवग्रह मंदिर / शिप्रा पावन तट, उज्जैन',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 Hours',
      hi: '3 घंटे',
    },
    whatWeOffer: {
      en: ['9 Planetary Samidhas', 'Navgraha Mandal', 'Individual Sankalp', 'Navgraha Prasad'],
      hi: ['9 ग्रहों की पवित्र समिधाएं', 'नवग्रह मंडल स्थापना', 'व्यक्तिगत गोत्र संकल्प', 'महाप्रसाद'],
    },
    benefits: {
      en: ['Overall life balance, health, financial prosperity, harmonious relationships'],
      hi: ['सभी ग्रहों का शुभ फल, उत्तम स्वास्थ्य, धन वृद्धि और परिवार में सुख-शांति'],
    },
    preparation: {
      en: ['Birth details of family members, wear traditional attire'],
      hi: ['परिवार के सदस्यों के नाम व जन्म विवरण, स्वच्छ पारंपरिक वस्त्र'],
    },
    ritualDetails: {
      en: 'Navgraha mandal sthapana, 9 planet beej jaap, specific herb havan, purnahuti, and Navgraha stotra aarti.',
      hi: 'नवग्रह मंडल स्थापना, 9 ग्रहों के बीज मंत्र जाप, ग्रह अनुसार हवन आहुतियां, पूर्णाहुति और आरती।',
    },
  },

  'pooja-shatchandi-havan': {
    id: 'pooja-shatchandi-havan',
    slug: 'shatchandi-path-havan-ujjain',
    name: {
      en: 'Shatchandi Path & Havan — At Harsiddhi / Garhkalika Shakti Peeth',
      hi: 'शतचंडी महायज्ञ एवं पाठ — हरसिद्धि / गढ़कालिका शक्तिपीठ',
    },
    categoryName: {
      en: 'Jaap & Havan Services',
      hi: 'जाप एवं हवन सेवाएं',
    },
    shortDescription: {
      en: '100 recitations of Durga Saptashati by Vedic Pandits with grand Yajna for ultimate divine protection and prosperity.',
      hi: 'उज्जैन के पावन शक्तिपीठ पर विद्वान ब्राह्मणों द्वारा श्री दुर्गा सप्तशती का 100 पाठ एवं भव्य शतचंडी महायज्ञ।',
    },
    description: {
      en: 'Shatchandi Mahayajna is one of the most powerful and auspicious Shakta rituals described in the Markandeya Purana. Performed at the renowned Maa Harsiddhi or Maa Garhkalika Shaktipeeth in Ujjain, a team of qualified Vedic pandits complete 100 recitations of Durga Saptashati, culminating in an elaborate havan that removes all obstacles and brings immense glory and prosperity.',
      hi: 'शतचंडी महायज्ञ मां भगवती दुर्गा का सबसे बड़ा और कल्याणकारी अनुष्ठान है। यह उज्जैन के सिद्ध शक्तिपीठ मां हरसिद्धि या मां गढ़कालिका मंदिर में संपन्न कराया जाता है। इसमें 11 से 21 ब्राह्मणों द्वारा दुर्गा सप्तशती के 100 पाठ किए जाते हैं और अंत में महायज्ञ होता है। इससे घर के सारे संकट मिटते हैं और सर्वत्र विजय मिलती है।',
    },
    templeName: {
      en: 'Harsiddhi / Garhkalika Shakti Peeth',
      hi: 'मां हरसिद्धि / मां गढ़कालिका शक्तिपीठ',
    },
    location: {
      en: 'Harsiddhi Temple Marg, Ujjain',
      hi: 'हरसिद्धि मंदिर मार्ग, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: 'Full Day / Multi-Day',
      hi: 'पूरा दिन / 3-5 दिन का अनुष्ठान',
    },
    whatWeOffer: {
      en: ['Team of 11+ Vedic Pandits', 'Grand Havan Samagri & Ghee', 'Kanya Poojan & Bhojan', 'Chunari & Prasad'],
      hi: ['11+ वेदपाठी ब्राह्मण दल', 'विशाल हवन सामग्री व शुद्ध गाय का घी', 'कन्या पूजन व ब्राह्मण भोजन', 'माता की चुनरी व महाप्रसाद'],
    },
    benefits: {
      en: ['Immense wealth and fame, divine protection, removal of planetary afflictions, total peace'],
      hi: ['सुख-समृद्धि, यश-कीर्ति, सभी संकटों व ग्रह दोषों का समूल नाश, परिवार में खुशहाली'],
    },
    preparation: {
      en: ['Devotee family can attend in person or via live sankalp, strict sattvic diet'],
      hi: ['यजमान परिवार पारंपरिक वस्त्रों में शामिल हों, सात्विक आचरण रखें'],
    },
    ritualDetails: {
      en: 'Gauri Ganesh pooja, Navarna mantra jaap, 100 Durga Saptashati recitations, Shatchandi havan, Kanya poojan, and grand Aarti.',
      hi: 'गणेश पूजन, नवार्ण मंत्र जाप, 100 चंडी पाठ, शतचंडी हवन, नौ कन्याओं का पूजन व भोजन और महाआरती।',
    },
  },

  'pooja-navchandi-havan': {
    id: 'pooja-navchandi-havan',
    slug: 'navchandi-path-havan-ujjain',
    name: {
      en: 'Navchandi Path & Havan — At Harsiddhi / Garhkalika Shakti Peeth',
      hi: 'नवचंडी पाठ एवं हवन — हरसिद्धि / गढ़कालिका शक्तिपीठ',
    },
    categoryName: {
      en: 'Jaap & Havan Services',
      hi: 'जाप एवं हवन सेवाएं',
    },
    shortDescription: {
      en: '9 Durga Saptashati recitations and sacred Yajna at Shaktipeeth for wealth and wish-fulfillment.',
      hi: 'मां हरसिद्धि शक्तिपीठ उज्जैन में 9 चंडी पाठ व विधिवत हवन से सभी मनोकामनाओं की पूर्ति की पूजा।',
    },
    description: {
      en: 'Navchandi Yajna is a sacred Durga ceremony involving 9 complete recitations of the Durga Saptashati by trained Vedic scholars. Performed at the holy Maa Harsiddhi Shaktipeeth in Ujjain, it invokes Goddess Chandi for success in business, health, and family prosperity.',
      hi: 'नवचंडी यज्ञ में मां दुर्गा सप्तशती के 9 संपूर्ण पाठ योग्य पंडितों द्वारा किए जाते हैं। उज्जैन में मां हरसिद्धि के पावन दरबार में यह हवन कराने से व्यापार में तरक्की होती है, घर में बरकत आती है और मनचाही मुराद पूरी होती है।',
    },
    templeName: {
      en: 'Harsiddhi / Garhkalika Shakti Peeth',
      hi: 'मां हरसिद्धि / गढ़कालिका शक्तिपीठ',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '4 Hours',
      hi: '4 घंटे',
    },
    whatWeOffer: {
      en: ['Vedic Scholars', 'Complete Havan Samagri', 'Kanya Poojan', 'Maa Harsiddhi Prasad'],
      hi: ['विद्वान ब्राह्मण', 'संपूर्ण हवन सामग्री', 'कन्या पूजन', 'मां हरसिद्धि महाप्रसाद'],
    },
    benefits: {
      en: ['Wish fulfillment, business growth, family harmony, positive energy at home'],
      hi: ['मनोकामना पूर्ति, व्यापार में उन्नति, घर में सुख-शांति व सकारात्मक ऊर्जा'],
    },
    preparation: {
      en: ['Name, Gotra details, wear red/yellow traditional clothes'],
      hi: ['यजमान का नाम, गोत्र, लाल या पीले कपड़े पहनकर उपस्थित हों'],
    },
    ritualDetails: {
      en: 'Gauri-Ganesh pooja, Navarna jaap, 9 Chandi recitations, Ahutis with kheer & ghee, and Aarti.',
      hi: 'गणेश पूजन, नवार्ण मंत्र जाप, 9 चंडी पाठ, खीर व घी से हवन की आहुतियां और आरती।',
    },
  },

  'pooja-santan-gopal-jaap': {
    id: 'pooja-santan-gopal-jaap',
    slug: 'santan-gopal-jaap-path-ujjain',
    name: {
      en: 'Santan Gopal Jaap & Path',
      hi: 'संतान गोपाल जाप एवं पाठ',
    },
    categoryName: {
      en: 'Jaap & Havan Services',
      hi: 'जाप एवं हवन सेवाएं',
    },
    shortDescription: {
      en: 'Sacred Lord Bal Krishna mantra chanting for couples seeking healthy progeny and child blessings.',
      hi: 'संतान सुख की प्राप्ति और गर्भ रक्षा हेतु भगवान बाल गोपाल के दिव्य मंत्रों का विशेष वैदिक जाप व पाठ।',
    },
    description: {
      en: 'Santan Gopal Jaap is a time-tested Vedic prayer invoking Lord Krishna in his charming Bal Gopal form. Couples facing medical or astrological delays in child conception perform this recitation in sacred Ujjain to seek the blessing of healthy, virtuous, and intelligent children.',
      hi: 'संतान सुख की चाह रखने वाले दंपत्तियों के लिए संतान गोपाल जाप बहुत कल्याणकारी है। उज्जैन में भगवान श्रीकृष्ण के बाल रूप का ध्यान कर विशेष मंत्रों का सवा लाख या 21,000 जाप कराया जाता है। इससे संतान प्राप्ति में आ रही बाधाएं दूर होती हैं और योग्य संतान का सुख मिलता है।',
    },
    templeName: {
      en: 'Gopal Mandir / Ujjain Sanctum',
      hi: 'गोपाल मंदिर / उज्जैन पावन धाम',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 Hours',
      hi: '3 घंटे',
    },
    whatWeOffer: {
      en: ['Butter & Mishri Offering', 'Santan Gopal Yantra Blessing', 'Sankalp for Couple', 'Prasad'],
      hi: ['माखन-मिश्री व तुलसी दल भोग', 'संतान गोपाल यंत्र आशीर्वाद', 'दंपत्ति का विशेष संकल्प', 'प्रसाद'],
    },
    benefits: {
      en: ['Child blessing, safe pregnancy, healthy progeny, happy family life'],
      hi: ['संतान सुख की प्राप्ति, सुरक्षित गर्भधारण, स्वस्थ और तेजस्वी संतान'],
    },
    preparation: {
      en: ['Both husband and wife should attend together with horoscope/birth details'],
      hi: ['पति-पत्नी दोनों साथ शामिल हों, नाम व गोत्र का विवरण साथ रखें'],
    },
    ritualDetails: {
      en: 'Bal Gopal abhishek with panchamrit, Tulsi archana, Santan Gopal beej mantra jaap, kheer havan, and aarti.',
      hi: 'पंचामृत से बाल गोपाल का अभिषेक, तुलसी पत्र अर्पण, संतान गोपाल मंत्र जाप, खीर से हवन और आरती।',
    },
  },

  'pooja-laghurudra': {
    id: 'pooja-laghurudra',
    slug: 'laghurudra-pooja-mahakal-ujjain',
    name: {
      en: 'Laghurudra — At Mahakal Temple',
      hi: 'लघुरुद्र महाअनुष्ठान — श्री महाकालेश्वर मंदिर, उज्जैन',
    },
    categoryName: {
      en: 'Jaap & Havan Services',
      hi: 'जाप एवं हवन सेवाएं',
    },
    shortDescription: {
      en: 'Grand 121 Rudra recitations by 11 Vedic Pandits with continuous Abhishek at Shri Mahakaleshwar.',
      hi: 'श्री महाकालेश्वर मंदिर उज्जैन में 11 विद्वान ब्राह्मणों द्वारा 121 बार श्री रुद्रम् पाठ एवं अखंड धारा अभिषेक।',
    },
    description: {
      en: 'Laghurudra is one of the grandest Shiva ceremonies in the Vedic tradition. 11 learned Vedic Brahmins chant the Sri Rudram 11 times each (totaling 121 recitations) with continuous jaladhara and panchamrit abhishek on the Shivling in Ujjain. It dissolves heavy karma and grants supreme health, wealth, and spiritual bliss.',
      hi: 'लघुरुद्र भगवान शिव का अत्यंत भव्य और प्रभावशाली अनुष्ठान है। इसमें 11 वेदपाठी ब्राह्मण मिलकर यजुर्वेद के श्री रुद्रम् पाठ को 11-11 बार (कुल 121 पाठ) बोलते हैं और शिवलिंग पर लगातार गंगाजल व पंचामृत की धारा चढ़ाई जाती है। यह अनुष्ठान करने से जीवन के बड़े से बड़े कष्ट और ग्रह दोष दूर हो जाते हैं।',
    },
    templeName: {
      en: 'Shri Mahakaleshwar Temple',
      hi: 'श्री महाकालेश्वर मंदिर',
    },
    location: {
      en: 'Mahakal Marg, Ujjain',
      hi: 'महाकाल मार्ग, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '4 to 5 Hours',
      hi: '4 से 5 घंटे',
    },
    whatWeOffer: {
      en: ['11 Vedic Brahmins', 'Pure Panchamrit & Ganga Jal', 'Bilva Patra 1008', 'Rudra Havan & Mahakal Bhasma'],
      hi: ['11 योग्य वेदपाठी ब्राह्मण', 'शुद्ध पंचामृत व पवित्र गंगाजल', '1008 बेलपत्र अर्पण', 'रुद्र हवन व महाकाल भस्म प्रसाद'],
    },
    benefits: {
      en: ['Ultimate health, total planetary peace, spiritual liberation, massive prosperity'],
      hi: ['उत्तम स्वास्थ्य, सभी ग्रह दोषों की शांति, व्यापार व जीवन में अपार सफलता, मोक्ष की प्राप्ति'],
    },
    preparation: {
      en: ['Devotee family arrives in clean traditional clothes, full morning devotion'],
      hi: ['धोती-कुर्ता या पारंपरिक वस्त्र पहनें, शुद्ध मन से अभिषेक में भाग लें'],
    },
    ritualDetails: {
      en: 'Mahasankalp, 11 Nyasa, 121 Sri Rudram recitations with continuous Abhishek, Rudra Trishati Havan, Purnahuti, and Bhasma Aarti.',
      hi: 'महासंकल्प, 11 न्यास, 121 श्री रुद्रम् पाठ व अखंड अभिषेक, रुद्र समिधा से हवन, पूर्णाहुति और भस्म आरती।',
    },
  },

  // --- 4. Special Jaap & Path ---
  'pooja-108-shri-sukt': {
    id: 'pooja-108-shri-sukt',
    slug: '108-shri-sukt-path-ujjain',
    name: {
      en: '108 Shri Sukt Path',
      hi: '108 श्री सूक्त पाठ एवं लक्ष्मी हवन',
    },
    categoryName: {
      en: 'Special Jaap & Path',
      hi: 'विशेष जाप एवं पाठ',
    },
    shortDescription: {
      en: '108 recitations of Rigveda Shri Suktam for Goddess Laxmi blessing, wealth, and business prosperity.',
      hi: 'ऋग्वेदीय श्री सूक्त के 108 पाठ व कमल गट्टे से हवन कर मां महालक्ष्मी की असीम कृपा और धन-समृद्धि पाने की पूजा।',
    },
    description: {
      en: '108 Shri Sukt Path is an ancient Rigvedic ritual dedicated to Goddess Mahalakshmi. Conducted at sacred Shakti shrines in Ujjain, pandits recite the Sri Suktam 108 times with offerings of lotus seeds (kamal gatta), pure cow ghee, and bilva fruits, inviting permanent wealth, prosperity, and joy into the home.',
      hi: 'श्री सूक्त वेदों का वह पावन मंत्र है जिससे मां लक्ष्मी अति प्रसन्न होती हैं। उज्जैन में शक्तिपीठ पर 108 बार श्री सूक्त का पाठ कर कमल गट्टा, शुद्ध घी और खीर से हवन किया जाता है। इससे घर में दरिद्रता दूर होती है, व्यापार बढ़ता है और स्थिर लक्ष्मी का वास होता है।',
    },
    templeName: {
      en: 'Maa Harsiddhi Shaktipeeth',
      hi: 'मां हरसिद्धि शक्तिपीठ, उज्जैन',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2.5 Hours',
      hi: '2.5 घंटे',
    },
    whatWeOffer: {
      en: ['Lotus Seeds & Pure Ghee', 'Shri Yantra Poojan', 'Gotra Sankalp', 'Laxmi Prasad'],
      hi: ['कमल गट्टे व शुद्ध गाय का घी', 'श्री यंत्र पूजन', 'नाम-गोत्र संकल्प', 'महालक्ष्मी प्रसाद'],
    },
    benefits: {
      en: ['Steady wealth, business expansion, elimination of financial crises, family harmony'],
      hi: ['धन में बरकत, व्यापार में मुनाफा, कर्ज व आर्थिक तंगी से मुक्ति, घर में खुशहाली'],
    },
    preparation: {
      en: ['Wear yellow or red clean clothes, bring personal Shri Yantra or coins for energizing if desired'],
      hi: ['लाल या पीले कपड़े पहनें, पूजा में अपने घर का श्रीयंत्र या चांदी का सिक्का रखवा सकते हैं'],
    },
    ritualDetails: {
      en: 'Shri Yantra abhishek, 108 Sri Sukt recitations, lotus seed havan, Laxmi aarti, and prasad distribution.',
      hi: 'श्री यंत्र अभिषेक, 108 श्री सूक्त पाठ, कमल गट्टे व मखाने से हवन, लक्ष्मी आरती और प्रसाद वितरण।',
    },
  },

  'pooja-108-hanuman-chalisa': {
    id: 'pooja-108-hanuman-chalisa',
    slug: '108-hanuman-chalisa-havan-ujjain',
    name: {
      en: '108 Hanuman Chalisa Havan',
      hi: '108 हनुमान चालीसा पाठ एवं मारुति हवन',
    },
    categoryName: {
      en: 'Special Jaap & Path',
      hi: 'विशेष जाप एवं पाठ',
    },
    shortDescription: {
      en: '108 recitations of Hanuman Chalisa with continuous Havan for supreme courage, protection, and obstacle destruction.',
      hi: '108 बार श्री हनुमान चालीसा पाठ के साथ अखंड हवन, जिससे हर प्रकार का डर, संकट और रोग दूर होते हैं।',
    },
    description: {
      en: '108 Hanuman Chalisa Havan is a powerful spiritual gathering where the sacred 40 verses of Goswami Tulsidas are chanted 108 times, offering fragrant samidha and ghee into the holy fire with each repetition. Devotees experience an immediate rise in mental strength, courage, and divine protection from evil.',
      hi: 'यह अनुष्ठान संकटमोचन हनुमान जी की विशेष कृपा पाने के लिए किया जाता है। इसमें 108 बार पूरी हनुमान चालीसा का पाठ कर प्रत्येक दोहे-चौपाई पर हवन में आहुति दी जाती है। इससे मन का सारा भय मिटता है, आत्मविश्वास बढ़ता है और हर संकट दूर होता है।',
    },
    templeName: {
      en: 'Veer Hanuman Temple',
      hi: 'वीर हनुमान मंदिर, उज्जैन',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 Hours',
      hi: '3 घंटे',
    },
    whatWeOffer: {
      en: ['Sindoor & Jasmine Oil', 'Boondi Prasad', '108 Havan Ahutis', 'Raksha Sutra Blessing'],
      hi: ['सिंदूर व चमेली का तेल', 'बूंदी का भोग', '108 हवन आहुतियां', 'हनुमान जी का रक्षा सूत्र'],
    },
    benefits: {
      en: ['Freedom from fear and anxiety, relief from Shani troubles, physical strength, obstacle clearance'],
      hi: ['डर और चिंता से मुक्ति, शनि साढ़े साती से राहत, शारीरिक बल और संकटों का निवारण'],
    },
    preparation: {
      en: ['Wear red or orange clothes, chant with devotion'],
      hi: ['लाल या नारंगी वस्त्र पहनें, शुद्ध मन से पाठ में भाग लें'],
    },
    ritualDetails: {
      en: 'Hanuman ji chola & sindoor offering, 108 Hanuman Chalisa chanting with continuous havan, Bajrang Baan, and Hanuman Aarti.',
      hi: 'हनुमान जी को चोला व सिंदूर अर्पण, 108 पाठ व हवन, बजरंग बाण पाठ और हनुमान आरती।',
    },
  },

  'pooja-108-vishnu-sahastranama': {
    id: 'pooja-108-vishnu-sahastranama',
    slug: '108-vishnu-sahastranama-path-ujjain',
    name: {
      en: '108 Vishnu Sahastranama Path',
      hi: '108 विष्णु सहस्रनाम पाठ',
    },
    categoryName: {
      en: 'Special Jaap & Path',
      hi: 'विशेष जाप एवं पाठ',
    },
    shortDescription: {
      en: 'Recitation of 1000 holy names of Lord Vishnu in sacred Sandipani Ashram Ujjain for wisdom, peace, and spiritual growth.',
      hi: 'सांदीपनि आश्रम उज्जैन (जहाँ श्रीकृष्ण ने शिक्षा पाई) में भगवान विष्णु के 1000 नामों का दिव्य पाठ व पूजन।',
    },
    description: {
      en: 'Vishnu Sahasranama contains the one thousand sacred names of Lord Vishnu recorded in the Mahabharata. Performed at Sandipani Ashram in Ujjain—where Lord Krishna received his 64 Vidyas—this ritual brings deep mental tranquility, family harmony, and the blessings of Lord Narayana.',
      hi: 'विष्णु सहस्रनाम में भगवान विष्णु के 1000 पावन नामों का वर्णन है। यह पाठ उज्जैन के ऐतिहासिक सांदीपनि आश्रम में किया जाता है, जहाँ भगवान श्रीकृष्ण और सुदामा ने शिक्षा ग्रहण की थी। यह पाठ करने से बुद्धि तीव्र होती है, घर में शांति रहती है और प्रभु नारायण की कृपा प्राप्त होती है।',
    },
    templeName: {
      en: 'Sandipani Ashram / Gopal Mandir',
      hi: 'सांदीपनि आश्रम / गोपाल मंदिर, उज्जैन',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 Hours',
      hi: '3 घंटे',
    },
    whatWeOffer: {
      en: ['Tulsi Leaves & Yellow Flowers', 'Panchamrit Abhishek', 'Gotra Sankalp', 'Vishnu Prasad'],
      hi: ['तुलसी दल व पीले पुष्प', 'पंचामृत अभिषेक', 'व्यक्तिगत गोत्र संकल्प', 'विष्णु महाप्रसाद'],
    },
    benefits: {
      en: ['Wisdom and mental clarity, harmonious marriage, reduction of sins, peaceful family life'],
      hi: ['ज्ञान और विद्या की प्राप्ति, दांपत्य जीवन में मधुरता, मानसिक तनाव से मुक्ति, घर में सुख'],
    },
    preparation: {
      en: ['Wear clean yellow or white clothes, pure thoughts'],
      hi: ['पीले या सफेद स्वच्छ वस्त्र पहनें, शुद्ध भाव रखें'],
    },
    ritualDetails: {
      en: 'Vishnu avahan, Tulsi archana with 1000 names, Purusha Sukta chanting, and Narayana Aarti.',
      hi: 'भगवान विष्णु का आह्वान, 1000 नामों से तुलसी अर्चन, पुरुष सूक्त पाठ और श्री नारायण आरती।',
    },
  },

  'pooja-108-ganesh-atharvashirsha': {
    id: 'pooja-108-ganesh-atharvashirsha',
    slug: '108-ganesh-atharvashirsha-path-ujjain',
    name: {
      en: '108 Ganesh Atharvashirsha Path',
      hi: '108 गणेश अथर्वशीर्ष पाठ — चिंतामण गणेश',
    },
    categoryName: {
      en: 'Special Jaap & Path',
      hi: 'विशेष जाप एवं पाठ',
    },
    shortDescription: {
      en: '108 recitations of Upanishadic Ganesh Atharvashirsha with fresh Durva grass for wisdom and obstacle clearance.',
      hi: 'चिंतामण गणेश मंदिर उज्जैन में 108 दूर्वा (दूब) और मोदक भोग के साथ सभी चिंताओं और विघ्नों को दूर करने की पूजा।',
    },
    description: {
      en: 'Ganesh Atharvashirsha is an ancient Upanishadic text celebrating Lord Ganesha as the supreme supreme deity of wisdom and obstacle removal. Performed at the ancient Chintaman Ganesh Temple in Ujjain with 108 fresh bunches of Durva grass and modak offerings, it removes all worries and opens pathways to success.',
      hi: 'चिंतामण गणेश मंदिर उज्जैन का अत्यंत चमत्कारी व प्राचीन मंदिर है। यहाँ भगवान गणेश को 108 बार अथर्वशीर्ष पाठ बोलते हुए हरी दूर्वा (दूब) और मोदक अर्पित किए जाते हैं। इससे व्यापार, नौकरी और जीवन की हर चिंता व बाधा तुरंत समाप्त हो जाती है।',
    },
    templeName: {
      en: 'Chintaman Ganesh Temple',
      hi: 'चिंतामण गणेश मंदिर',
    },
    location: {
      en: 'Chintaman Road, Ujjain',
      hi: 'चिंतामण रोड, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2.5 Hours',
      hi: '2.5 घंटे',
    },
    whatWeOffer: {
      en: ['108 Fresh Durva Bunches', 'Modak & Ladoo Bhog', 'Red Flowers & Sindoor', 'Ganesh Prasad'],
      hi: ['108 हरी दूर्वा की गड्डियां', 'मोदक व बेसन के लड्डू भोग', 'लाल फूल व सिंदूर', 'गणेश जी का प्रसाद'],
    },
    benefits: {
      en: ['Removal of all obstacles, intellectual brilliance, success in new ventures, mental peace'],
      hi: ['सभी रुकावटों का निवारण, बुद्धि व एकाग्रता में वृद्धि, नए व्यापार व काम में सफलता'],
    },
    preparation: {
      en: ['Wednesday morning is especially auspicious, clean clothes'],
      hi: ['बुधवार के दिन यह पूजा कराना अति उत्तम है, साफ कपड़े पहनें'],
    },
    ritualDetails: {
      en: 'Ganesh abhishek, Durva archana with 108 Atharvashirsha recitations, Modak offering, and Ganesh Aarti.',
      hi: 'गणेश जी का अभिषेक, 108 बार अथर्वशीर्ष बोलते हुए दूर्वा अर्पण, मोदक भोग और गणेश आरती।',
    },
  },

  'pooja-108-santan-gopal-sahastranama': {
    id: 'pooja-108-santan-gopal-sahastranama',
    slug: '108-santan-gopal-sahastranama-ujjain',
    name: {
      en: '108 Santan Gopal Sahastranama',
      hi: '108 संतान गोपाल सहस्रनाम पाठ',
    },
    categoryName: {
      en: 'Special Jaap & Path',
      hi: 'विशेष जाप एवं पाठ',
    },
    shortDescription: {
      en: '108 recitations of Santan Gopal Sahastranama stotra for progeny blessings and family happiness.',
      hi: 'संतान प्राप्ति और कुल की उन्नति के लिए संतान गोपाल सहस्रनाम के 108 दिव्य पाठ।',
    },
    description: {
      en: '108 Santan Gopal Sahasranama recitation is an intensive Vedic prayer performed for couples desiring child blessings. By invoking the one thousand names of Lord Bal Gopal in sacred Ujjain, planetary hurdles in the 5th house of the horoscope are removed.',
      hi: 'यह अनुष्ठान उन दंपत्तियों के लिए है जो संतान सुख पाने के लिए विशेष प्रार्थना करना चाहते हैं। भगवान बाल गोपाल के 1000 नामों का 108 बार पाठ करने से कुंडली के पंचम भाव (संतान भाव) के दोष शांत होते हैं और ईश्वर की कृपा से घर में किलकारियां गूंजती हैं।',
    },
    templeName: {
      en: 'Gopal Mandir',
      hi: 'गोपाल मंदिर, उज्जैन',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 Hours',
      hi: '3 घंटे',
    },
    whatWeOffer: {
      en: ['Butter & Yellow Flowers', 'Santan Gopal Stotra Path', 'Gotra Sankalp', 'Prasad'],
      hi: ['माखन-मिश्री व पीले फूल', 'संतान गोपाल स्तोत्र पाठ', 'गोत्र संकल्प', 'महाप्रसाद'],
    },
    benefits: {
      en: ['Blessed progeny, relief from child hurdles, peace of mind'],
      hi: ['संतान सुख, संतान से संबंधित चिंताओं से मुक्ति, परिवार में खुशहाली'],
    },
    preparation: {
      en: ['Couple attends together, horoscope details'],
      hi: ['पति-पत्नी दोनों साथ शामिल हों, नाम व गोत्र विवरण'],
    },
    ritualDetails: {
      en: 'Gopal pooja, Tulsi patra archana, 108 Sahasranama chanting, kheer bhog, and aarti.',
      hi: 'गोपाल जी का पूजन, तुलसी दल अर्पण, 108 सहस्रनाम पाठ, खीर का भोग और आरती।',
    },
  },

  'pooja-1-25-lakh-mahalaxmi-beez': {
    id: 'pooja-1-25-lakh-mahalaxmi-beez',
    slug: '1-25-lakh-mahalaxmi-beez-mantra-jaap-ujjain',
    name: {
      en: '1.25 Lakh Mahalaxmi Beez Mantra Jaap',
      hi: 'सवा लाख (1,25,000) महालक्ष्मी बीज मंत्र अनुष्ठान',
    },
    categoryName: {
      en: 'Special Jaap & Path',
      hi: 'विशेष जाप एवं पाठ',
    },
    shortDescription: {
      en: 'Grand 1,25,000 Mahalakshmi Beez Mantra Anushthan by qualified Pandits for wealth, business expansion, and abundance.',
      hi: 'उज्जैन शक्तिपीठ पर विद्वान ब्राह्मणों द्वारा सवा लाख महालक्ष्मी बीज मंत्र जाप एवं कमल पुष्प महायज्ञ।',
    },
    description: {
      en: 'The 1.25 Lakh Mahalakshmi Beez Mantra Anushthan is a grand multi-day ceremony conducted by a dedicated panel of Vedic priests at the holy Maa Harsiddhi Shaktipeeth in Ujjain. Chanting the sacred Beej Mantra 1,25,000 times followed by a Dashansh Havan with lotus flowers grants extraordinary financial growth and lifelong prosperity.',
      hi: 'सवा लाख महालक्ष्मी बीज मंत्र का अनुष्ठान धन और ऐश्वर्य की प्राप्ति का सर्वोच्च अनुष्ठान है। यह उज्जैन के हरसिद्धि शक्तिपीठ में कई दिनों तक विद्वान ब्राह्मणों के समूह द्वारा किया जाता है। सवा लाख मंत्र पूर्ण होने पर कमल के ताजे फूलों और गाय के घी से दशांश हवन होता है, जिससे बड़े से बड़ा व्यापारिक संकट दूर होता है और अपार धन संपदा प्राप्त होती है।',
    },
    templeName: {
      en: 'Maa Harsiddhi Shaktipeeth',
      hi: 'मां हरसिद्धि शक्तिपीठ, उज्जैन',
    },
    location: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: 'Multi-Day Anushthan (3-5 Days)',
      hi: 'बहु-दिवसीय अनुष्ठान (3-5 दिन)',
    },
    whatWeOffer: {
      en: ['Dedicated Team of Vedic Brahmins', '108 Fresh Lotus Flowers & Ghee', 'Siddha Shri Yantra Blessing', 'Mahalakshmi Prasad'],
      hi: ['विद्वान ब्राह्मणों का दल', '108 ताजे कमल के फूल व शुद्ध घी', 'अभिमंत्रित सिद्ध श्रीयंत्र', 'महालक्ष्मी महाप्रसाद'],
    },
    benefits: {
      en: ['Massive business growth, elimination of debts, lifelong wealth and stability, fame'],
      hi: ['व्यापार में भारी मुनाफा, पुराने कर्जों से मुक्ति, स्थायी धन-संपत्ति और मान-प्रतिष्ठा'],
    },
    preparation: {
      en: ['Main sponsor family provides gotra and names, can join in person or via video sankalp'],
      hi: ['यजमान परिवार का नाम, गोत्र व संकल्प, सात्विक आचरण रखें'],
    },
    ritualDetails: {
      en: 'Kalash sthapana, Akhand deepak, daily targeted beej mantra chanting, Dashansh Kamal havan, and Mahalakshmi Aarti.',
      hi: 'कलश स्थापना, अखंड दीपक, प्रतिदिन निश्चित संख्या में बीज मंत्र जाप, कमल पुष्पों से दशांश हवन और महाआरती।',
    },
  },

  // --- 5. Special Vedic Rituals ---
  'pooja-kumbh-vivah': {
    id: 'pooja-kumbh-vivah',
    slug: 'kumbh-vivah-ujjain',
    name: {
      en: 'Kumbh Vivah',
      hi: 'कुंभ विवाह संस्कार',
    },
    categoryName: {
      en: 'Special Vedic Rituals',
      hi: 'विशेष वैदिक अनुष्ठान',
    },
    shortDescription: {
      en: 'Symbolic pot marriage ritual for bride with strong Manglik / Vaidhavya Dosh before actual marriage.',
      hi: 'जिन कन्याओं की कुंडली में भारी मांगलिक दोष या वैधव्य योग हो, उनके विवाह पूर्व मिट्टी के घड़े (कुंभ) से वैदिक विवाह संस्कार।',
    },
    description: {
      en: 'Kumbh Vivah is an authentic Vedic sanskar performed on the sacred Kshipra riverbanks in Ujjain. When a bride\'s birth chart indicates intense Mangal Dosh or adverse marital yogas, she is symbolically married to a consecrated earthen pot (Kumbh) containing Lord Vishnu\'s energy. The pot is subsequently immersed in the river, absorbing all doshas and ensuring a long, blissful married life with her actual groom.',
      hi: 'कुंभ विवाह एक बहुत ही पवित्र और शास्त्र सम्मत वैदिक संस्कार है। यदि किसी कन्या की कुंडली में कड़ा मांगलिक दोष या विवाह के बाद संकट का योग हो, तो वास्तविक विवाह से पहले कन्या का विवाह भगवान विष्णु रूपी मिट्टी के कलश (कुंभ) से कराया जाता है। इसके बाद उस कुंभ को नदी में प्रवाहित कर दिया जाता है, जिससे सारे दोष समाप्त हो जाते हैं और कन्या का दांपत्य जीवन सुखी व सुरक्षित रहता है।',
    },
    templeName: {
      en: 'Kshipra River Sanctum',
      hi: 'शिप्रा नदी पावन तट, उज्जैन',
    },
    location: {
      en: 'Ramghat, Ujjain',
      hi: 'रामघाट, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2.5 Hours',
      hi: '2.5 घंटे',
    },
    whatWeOffer: {
      en: ['Consecrated Kumbh & Yellow Cloth', 'Vedic Marriage Mantras', 'Gotra Sankalp', 'Kshipra Visarjan Vidhi'],
      hi: ['विधि-विधान से तैयार कुंभ कलश व वस्त्र', 'संपूर्ण वैदिक विवाह मंत्रोच्चार', 'नाम-गोत्र संकल्प', 'शिप्रा विसर्जन विधि'],
    },
    benefits: {
      en: ['Neutralization of severe Manglik Dosh, long and happy married life, removal of obstacles in marriage match'],
      hi: ['मांगलिक दोष का पूर्ण निवारण, भावी पति की लंबी उम्र, सुखी व प्रेमपूर्ण दांपत्य जीवन'],
    },
    preparation: {
      en: ['Bride wears new traditional yellow/red attire, parents accompany with birth chart'],
      hi: ['कन्या नए लाल या पीले कपड़े पहनें, माता-पिता साथ उपस्थित रहें'],
    },
    ritualDetails: {
      en: 'Gauri-Ganesh pooja, Vishnu invocation in Kumbh, formal Vedic marriage vows, Kanyadaan sankalp, and Kumbh visarjan.',
      hi: 'गणेश पूजन, कलश में विष्णु आह्वान, वैदिक विवाह फेरे व संकल्प, कन्यादान विधि और कलश का शिप्रा में विसर्जन।',
    },
  },

  'pooja-ark-vivah': {
    id: 'pooja-ark-vivah',
    slug: 'ark-vivah-ujjain',
    name: {
      en: 'Ark Vivah',
      hi: 'अर्क विवाह संस्कार',
    },
    categoryName: {
      en: 'Special Vedic Rituals',
      hi: 'विशेष वैदिक अनुष्ठान',
    },
    shortDescription: {
      en: 'Symbolic marriage ritual with sacred Ark (Madar) plant for groom having strong Mangal Dosh or 2nd marriage yog.',
      hi: 'जिन पुरुषों (वर) की कुंडली में मांगलिक दोष या दूसरा विवाह योग हो, उनके विवाह पूर्व आक (मदार) के पौधे से वैदिक विवाह।',
    },
    description: {
      en: 'Ark Vivah is performed for male devotees whose horoscope indicates heavy Manglik Dosh, Sun-affliction, or a yoga suggesting marital discord. The groom is married to a sacred Ark (Madar) plant in Ujjain following complete Vedic wedding rites. This absorbs all planetary doshas, ensuring harmony and longevity in the formal marriage.',
      hi: 'अर्क विवाह उन पुरुषों (वर) के लिए किया जाता है जिनकी कुंडली में मांगलिक दोष या दांपत्य में अलगाव का योग हो। इसमें विवाह से पहले वर का विवाह आक (मदार) के पवित्र पौधे से वैदिक रीति से कराया जाता है। इससे कुंडली के सारे दोष आक के पौधे पर चले जाते हैं और वास्तविक विवाह सुखमय व सफल रहता है।',
    },
    templeName: {
      en: 'Kshipra River Sanctum',
      hi: 'शिप्रा नदी पावन तट, उज्जैन',
    },
    location: {
      en: 'Ramghat, Ujjain',
      hi: 'रामघाट, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '2.5 Hours',
      hi: '2.5 घंटे',
    },
    whatWeOffer: {
      en: ['Sacred Ark Plant Setup', 'Vedic Vivah Samagri', 'Gotra Sankalp', 'Priest Guidance'],
      hi: ['पवित्र अर्क (आक) पौधा व्यवस्था', 'वैदिक विवाह सामग्री', 'नाम-गोत्र संकल्प', 'योग्य पुरोहित विधि'],
    },
    benefits: {
      en: ['Removal of marital discord yogas, protection of future wife, peaceful marriage life'],
      hi: ['वैवाहिक दोषों से मुक्ति, भावी पत्नी के स्वास्थ्य व जीवन की रक्षा, सुखमय वैवाहिक जीवन'],
    },
    preparation: {
      en: ['Groom attends in traditional dhoti-kurta, birth details'],
      hi: ['वर धोती-कुर्ता या पारंपरिक वस्त्र पहनें, जन्म कुंडली साथ लाएं'],
    },
    ritualDetails: {
      en: 'Ganesh pooja, Ark plant pran-pratishtha, symbolic pheras with sacred threads, havan, and aarti.',
      hi: 'गणेश पूजन, अर्क पौधे की प्रतिष्ठा, रक्षा सूत्र से फेरे, हवन और पूर्णाहुति।',
    },
  },

  // --- 6. Pitru Rituals ---
  'pooja-nagbali': {
    id: 'pooja-nagbali',
    slug: 'nagbali-pooja-ujjain',
    name: {
      en: 'Nagbali',
      hi: 'नागबली विधान',
    },
    categoryName: {
      en: 'Pitru Rituals',
      hi: 'पितृ कार्य एवं तर्पण',
    },
    shortDescription: {
      en: 'Sacred ritual for cleansing the sin of unintentional snake killing (Sarpa Hatya) and removing lineage curses.',
      hi: 'जाने-अनजाने में हुए सर्प दोष या नाग हत्या के पाप से मुक्ति और कुल में संतान वृद्धि हेतु नागबली पूजा।',
    },
    description: {
      en: 'Nagbali Vidhan is performed on the holy Kshipra riverbanks (Siddhvat / Ramghat) in Ujjain to atone for sins related to serpent killing in past or present births. If a family faces continuous miscarriages, skin diseases, or career deadlocks due to Sarpa Dosh, this ceremony creates an idol of a serpent with wheat dough and performs scriptural rites for its soul liberation.',
      hi: 'यदि किसी व्यक्ति या उसके पूर्वजों से जाने-अनजाने में कोई सांप मारा गया हो, तो परिवार को सर्प दोष लग जाता है। इसके कारण कुल में संतान होने में बाधा आती है या त्वचा रोग होते हैं। उज्जैन में सिद्धवट पर आटे से नाग का स्वरूप बनाकर उसका विधिवत दाह-संस्कार व तर्पण किया जाता है, जिससे सर्प दोष मिटता है।',
    },
    templeName: {
      en: 'Kshipra Ramghat / Siddhvat',
      hi: 'शिप्रा रामघाट / सिद्धवट, उज्जैन',
    },
    location: {
      en: 'Ramghat, Ujjain',
      hi: 'रामघाट, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3 Hours',
      hi: '3 घंटे',
    },
    whatWeOffer: {
      en: ['Wheat Dough Snake Idol', 'Pind Daan Samagri', 'Ganga Jal & Til', 'Brahmin Dakshina Assistance'],
      hi: ['आटे का नाग स्वरूप', 'पिंडदान सामग्री', 'पवित्र गंगाजल व तिल', 'संपूर्ण विधि विधान'],
    },
    benefits: {
      en: ['Relief from Sarpa Dosh, blessings of healthy children, freedom from fear of snakes'],
      hi: ['सर्प दोष से मुक्ति, संतान सुख में आ रही रुकावटें दूर, कुल में शांति व सुरक्षा'],
    },
    preparation: {
      en: ['Male family member performs rites, wear white clothes, bring gotra details'],
      hi: ['परिवार के पुरुष सदस्य सफेद वस्त्र पहनें, खाली पेट या हल्का फलाहार लेकर आएं'],
    },
    ritualDetails: {
      en: 'Sankalp, Prana-pratishtha of snake idol, funeral rites for the serpent soul, Pind daan, and Kshipra tarpan.',
      hi: 'संकल्प, नाग स्वरूप की प्रतिष्ठा, नाग आत्मा की मुक्ति के लिए श्राद्ध विधि, पिंडदान और शिप्रा तर्पण।',
    },
  },

  'pooja-narayan-bali': {
    id: 'pooja-narayan-bali',
    slug: 'narayan-bali-pooja-ujjain',
    name: {
      en: 'Narayan Bali',
      hi: 'नारायण बली विधान',
    },
    categoryName: {
      en: 'Pitru Rituals',
      hi: 'पितृ कार्य एवं तर्पण',
    },
    shortDescription: {
      en: 'Vedic ritual for the peace and liberation of souls who died unnatural, sudden, or premature deaths in family lineage.',
      hi: 'परिवार में अकाल या अप्राकृतिक मृत्यु से अतृप्त पूर्वजों की आत्मा की शांति और मोक्ष हेतु नारायण बली पूजा।',
    },
    description: {
      en: 'Narayan Bali is a supreme ancestral ceremony performed at the immortal Siddhvat tree on the Kshipra riverbank in Ujjain. It is specifically aimed at liberating ancestors who passed away prematurely, accidentally, or with unfulfilled desires. By invoking Lord Vishnu (Narayana), the trapped soul attains peace and moksha, removing all hauntings, obstacles, and sorrow from the descendant family.',
      hi: 'यदि कुल में किसी पूर्वज की अकाल मृत्यु (दुर्घटना, बीमारी या असमय) हुई हो, तो उनकी आत्मा अतृप्त रह जाती है। उज्जैन के सिद्धवट तीर्थ पर भगवान नारायण (विष्णु) का आह्वान कर नारायण बली पूजा की जाती है। इससे अतृप्त आत्मा को शांति और मोक्ष मिलता है और परिवार पर से सभी प्रकार की बाधाएं और पितृ दोष हमेशा के लिए समाप्त हो जाते हैं।',
    },
    templeName: {
      en: 'Kshipra Ramghat / Siddhvat',
      hi: 'शिप्रा रामघाट / सिद्धवट, उज्जैन',
    },
    location: {
      en: 'Siddhvat, Ujjain',
      hi: 'सिद्धवट, उज्जैन',
    },
    city: {
      en: 'Ujjain',
      hi: 'उज्जैन',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
    },
    duration: {
      en: '3.5 Hours',
      hi: '3.5 घंटे',
    },
    whatWeOffer: {
      en: ['Narayana Peeth Sthapana', '16 Pind Daan Samagri', 'Gold / Silver Murti Sankalp', 'Brahmin Bhojan Arrangement'],
      hi: ['नारायण पीठ स्थापना', '16 पिंडों का निर्माण व सामग्री', 'गोल्ड/सिल्वर मूर्ति संकल्प', 'ब्राह्मण भोजन व्यवस्था'],
    },
    benefits: {
      en: ['Moksha for ancestor souls, freedom from ancestral curses, family progress, lasting peace'],
      hi: ['पूर्वजों को मोक्ष, पितृ दोष व श्राप से मुक्ति, परिवार में सुख, शांति और वंश वृद्धि'],
    },
    preparation: {
      en: ['Karta (main family member) performs rites, bring ancestor details and gotra'],
      hi: ['परिवार के मुख्य पुरुष सदस्य संकल्प लें, पूर्वजों का नाम व गोत्र साथ रखें'],
    },
    ritualDetails: {
      en: 'Vishnu invocation, 16 Pind daan, Tripindi tarpan, Narayana Bali havan, and Brahmin bhojan sankalp.',
      hi: 'भगवान विष्णु पूजन, 16 पिंडदान, त्रिपिंडी तर्पण, नारायण बली हवन और ब्राह्मण भोजन संकल्प।',
    },
  },
};

/**
 * Master Content Catalog for Spiritual Tours in simple English and easy Hindi.
 */
export const TOUR_CONTENT_CATALOG: Record<string, LocalizedTourContent> = {
  'tour-ujjain-local': {
    id: 'tour-ujjain-local',
    slug: 'ujjain-spiritual-tour',
    name: {
      en: 'Ujjain Spiritual Tour',
      hi: 'उज्जैन संपूर्ण तीर्थ दर्शन यात्रा',
    },
    category: {
      en: 'Ujjain & Central India',
      hi: 'उज्जैन एवं मध्य भारत',
    },
    shortDescription: {
      en: 'Guided tour covering Mahakaleshwar, Harsiddhi, Kalbhairav, Mangalnath, Angareshwar, Siddhvat, Sandipani Ashram, & Ramghat.',
      hi: 'महाकालेश्वर, हरसिद्धि शक्तिपीठ, काल भैरव, मंगलनाथ, अंगारेश्वर, सिद्धवट, सांदीपनि आश्रम और रामघाट का संपूर्ण दर्शन।',
    },
    description: {
      en: 'Complete guided pilgrimage in Ujjain covering all sacred temples with comfortable AC transfers, VIP darshan assistance, and experienced spiritual guides.',
      hi: 'उज्जैन के सभी प्रमुख और चमत्कारी मंदिरों की सुखद तीर्थ यात्रा। इसमें महाकालेश्वर ज्योतिर्लिंग, शक्तिपीठ, काल भैरव और शिप्रा आरती का सुगम दर्शन शामिल है।',
    },
    startingPoint: {
      en: 'Ujjain Station / Hotel',
      hi: 'उज्जैन रेलवे स्टेशन / होटल',
    },
    endingPoint: {
      en: 'Ujjain Station / Hotel',
      hi: 'उज्जैन रेलवे स्टेशन / होटल',
    },
    duration: {
      en: '1 Day / 2 Days',
      hi: '1 दिन / 2 दिन',
    },
    placesCovered: {
      en: ['Mahakaleshwar', 'Harsiddhi Shaktipeeth', 'Kalbhairav', 'Garhkalika', 'Mangalnath', 'Angareshwar', 'Siddhvat', 'Sandipani Ashram', 'Ramghat'],
      hi: ['श्री महाकालेश्वर', 'मां हरसिद्धि शक्तिपीठ', 'काल भैरव', 'गढ़कालिका', 'मंगलनाथ', 'अंगारेश्वर', 'सिद्धवट', 'सांदीपनि आश्रम', 'रामघाट आरती'],
    },
    included: {
      en: ['AC Cab Transfers', 'Spiritual Guide', 'Darshan Assistance', 'Bottled Water'],
      hi: ['एसी कैब सुविधा', 'अनुभवी गाइड', 'दर्शन में सहायता', 'पीने का पानी'],
    },
    excluded: {
      en: ['Personal Expenses', 'Special VIP Entry Tickets', 'Meals outside package'],
      hi: ['व्यक्तिगत खर्च', 'विशेष वीआईपी टिकट', 'होटल भोजन'],
    },
  },
  'tour-ujjain-omkareshwar': {
    id: 'tour-ujjain-omkareshwar',
    slug: 'ujjain-omkareshwar-tour',
    name: {
      en: 'Ujjain – Omkareshwar Tour',
      hi: 'उज्जैन – ओंकारेश्वर दो ज्योतिर्लिंग यात्रा',
    },
    category: {
      en: 'Ujjain & Central India',
      hi: 'उज्जैन एवं मध्य भारत',
    },
    shortDescription: {
      en: '2 Jyotirlinga pilgrimage covering Mahakaleshwar, Omkareshwar, Mamleshwar, and holy Narmada Parikrama ghats.',
      hi: 'महाकालेश्वर और ओंकारेश्वर ज्योतिर्लिंग, ममलेश्वर मंदिर और पवित्र नर्मदा नदी का पावन दर्शन व नौका विहार।',
    },
    description: {
      en: 'Experience the divine grace of two Jyotirlingas in Madhya Pradesh: Mahakaleshwar (Ujjain) and Omkareshwar-Mamleshwar on the Narmada River.',
      hi: 'मध्य प्रदेश के दो अत्यंत पावन ज्योतिर्लिंगों के दर्शन की यात्रा। उज्जैन में महाकाल और ओंकारेश्वर में नर्मदा तट पर ओंकारेश्वर व ममलेश्वर महादेव के दर्शन।',
    },
    startingPoint: {
      en: 'Ujjain / Indore',
      hi: 'उज्जैन / इंदौर',
    },
    endingPoint: {
      en: 'Ujjain / Indore',
      hi: 'उज्जैन / इंदौर',
    },
    duration: {
      en: '2 Days / 3 Days',
      hi: '2 दिन / 3 दिन',
    },
    placesCovered: {
      en: ['Mahakaleshwar Ujjain', 'Omkareshwar Jyotirlinga', 'Mamleshwar Temple', 'Narmada Ghats & Boat Ride'],
      hi: ['महाकालेश्वर उज्जैन', 'ओंकारेश्वर ज्योतिर्लिंग', 'ममलेश्वर मंदिर', 'नर्मदा घाट व नौका विहार'],
    },
    included: {
      en: ['AC Cab for whole tour', 'Hotel Stay with Breakfast', 'Driver Allowances & Tolls', 'Darshan Guidance'],
      hi: ['पूरी यात्रा के लिए एसी कैब', 'होटल आवास व नाश्ता', 'ड्राइवर खर्च व टोल टैक्स', 'मंदिर दर्शन मार्गदर्शन'],
    },
    excluded: {
      en: ['Boat Ride Fees', 'Personal Shopping', 'Extra Meals'],
      hi: ['बोटिंग का अलग खर्च', 'व्यक्तिगत खरीदारी', 'अतिरिक्त भोजन'],
    },
  },
};

/**
 * Master Content Catalog for Destinations
 */
export const DESTINATION_CONTENT_CATALOG: Record<string, LocalizedDestinationContent> = {
  'dest-ujjain': {
    id: 'dest-ujjain',
    slug: 'ujjain',
    name: {
      en: 'Ujjain',
      hi: 'उज्जैन (अवंतिका नगरी)',
    },
    shortDescription: {
      en: 'The eternal City of Mahakal, sacred Kshipra river, and ancient center of astronomical and Vedic learning.',
      hi: 'महाकाल की पावन नगरी, पवित्र शिप्रा नदी और भारतीय संस्कृति व काल-गणना का प्राचीन केंद्र।',
    },
    description: {
      en: 'Ujjain (ancient Avantika) is one of the seven holy Moksha-granting cities of India. It is famous for the Mahakaleshwar Jyotirlinga, the grand Kumbh Mela (Simhastha), Shaktipeeths, and ancient planetary shrines like Mangalnath and Kalbhairav.',
      hi: 'उज्जैन भारत की सात पवित्र मोक्षदायिनी पुरियों में से एक है। यहाँ भगवान शिव का स्वयंभू दक्षिणमुखी ज्योतिर्लिंग श्री महाकालेश्वर स्थित है। शिप्रा नदी का रामघाट, हरसिद्धि शक्तिपीठ, काल भैरव और मंगलनाथ मंदिर यहाँ के प्रमुख आकर्षण हैं।',
    },
    placesToVisit: {
      en: ['Mahakaleshwar Jyotirlinga', 'Harsiddhi Shaktipeeth', 'Kalbhairav Temple', 'Mangalnath Temple', 'Siddhvat', 'Sandipani Ashram', 'Ramghat'],
      hi: ['श्री महाकालेश्वर ज्योतिर्लिंग', 'मां हरसिद्धि शक्तिपीठ', 'काल भैरव मंदिर', 'मंगलनाथ मंदिर', 'सिद्धवट तीर्थ', 'सांदीपनि आश्रम', 'शिप्रा रामघाट'],
    },
    temples: {
      en: ['Mahakaleshwar', 'Harsiddhi', 'Kalbhairav', 'Garhkalika', 'Chintaman Ganesh', 'Angareshwar', 'Rinmukteshwar'],
      hi: ['महाकालेश्वर', 'हरसिद्धि', 'काल भैरव', 'गढ़कालिका', 'चिंतामण गणेश', 'अंगारेश्वर', 'ऋणमुक्तेश्वर'],
    },
  },
  'dest-omkareshwar': {
    id: 'dest-omkareshwar',
    slug: 'omkareshwar',
    name: {
      en: 'Omkareshwar',
      hi: 'ओंकारेश्वर पावन तीर्थ',
    },
    shortDescription: {
      en: 'Sacred island in the shape of the holy symbol Om on the Narmada River, housing two Shiva Jyotirlingas.',
      hi: 'नर्मदा नदी में ॐ आकार के पावन द्वीप पर स्थित ओंकारेश्वर एवं ममलेश्वर ज्योतिर्लिंग तीर्थ।',
    },
    description: {
      en: 'Omkareshwar is a revered island in the Narmada River shaped naturally like the sacred Hindu symbol \'OM\'. It is home to the 4th Jyotirlinga, attracting pilgrims from around the world for Parikrama and Narmada snan.',
      hi: 'ओंकारेश्वर नर्मदा नदी के तट पर स्थित एक अत्यंत पावन ज्योतिर्लिंग है। यह द्वीप प्राकृतिक रूप से ॐ की आकृति जैसा दिखता है। यहाँ नर्मदा स्नान, नौका विहार और ममलेश्वर महादेव के दर्शन से मन को अपार शांति मिलती है।',
    },
    placesToVisit: {
      en: ['Omkareshwar Jyotirlinga', 'Mamleshwar Temple', 'Narmada Ghats', 'Adi Shankaracharya Cave', 'Gauri Somnath Temple'],
      hi: ['ओंकारेश्वर ज्योतिर्लिंग', 'ममलेश्वर मंदिर', 'नर्मदा घाट', 'आदि शंकराचार्य गुफा', 'गौरी सोमनाथ मंदिर'],
    },
    temples: {
      en: ['Shri Omkareshwar', 'Mamleshwar', 'Gauri Somnath', 'Rinmukteshwar', 'Kedareshwar'],
      hi: ['श्री ओंकारेश्वर', 'ममलेश्वर', 'गौरी सोमनाथ', 'ऋणमुक्तेश्वर', 'केदारेश्वर'],
    },
  },
  'dest-baglamukhi': {
    id: 'dest-baglamukhi',
    slug: 'baglamukhi-nalkheda',
    name: {
      en: 'Baglamukhi Nalkheda',
      hi: 'मां बगलामुखी नलखेड़ा',
    },
    shortDescription: {
      en: 'Renowned Siddh Peeth of Pitambara Mahavidya on the banks of Lakhundar river near Ujjain.',
      hi: 'उज्जैन के समीप लखुंदर नदी के तट पर स्थित मां पीताम्बरा बगलामुखी का विश्व विख्यात सिद्धपीठ।',
    },
    description: {
      en: 'Maa Baglamukhi Temple at Nalkheda is one of the three most powerful Baglamukhi shrines in India. Known for wish-fulfillment, enemy pacification, and success in difficult life endeavors through the sacred yellow mustard Havan.',
      hi: 'नलखेड़ा का मां बगलामुखी मंदिर भारत के सबसे शक्तिशाली तांत्रिक व वैदिक सिद्धपीठों में गिना जाता है। यहाँ पीले वस्त्रों और पीली सरसों से हवन करने पर कोर्ट-कचहरी, विरोधी बाधा और व्यापार की अड़चनें निश्चित रूप से दूर होती हैं।',
    },
    placesToVisit: {
      en: ['Maa Baglamukhi Sanctum', 'Lakhundar River Bank', 'Ancient Havan Kund'],
      hi: ['मां बगलामुखी गर्भगृह', 'लखुंदर नदी तट', 'प्राचीन यज्ञ कुंड'],
    },
    temples: {
      en: ['Maa Baglamukhi Temple', 'Lord Hanuman Shrine', 'Lord Shiva Sanctum'],
      hi: ['मां बगलामुखी मंदिर', 'हनुमान जी मंदिर', 'शिव गर्भगृह'],
    },
  },
  'dest-indore': {
    id: 'dest-indore',
    slug: 'indore',
    name: {
      en: 'Indore',
      hi: 'इंदौर',
    },
    shortDescription: {
      en: 'Cultural, culinary, and spiritual gateway of Malwa, home to Khajrana Ganesh and Rajwada Palace.',
      hi: 'मालवा की सांस्कृतिक व आध्यात्मिक राजधानी, खजराना गणेश और राजवाड़ा का प्रसिद्ध नगर।',
    },
    description: {
      en: 'Indore is famous for its clean heritage, rich culture, and the wish-fulfilling Khajrana Ganesh Temple built by Maharani Ahilyabai Holkar. It serves as the primary travel hub for Ujjain and Omkareshwar.',
      hi: 'इंदौर अपने प्रसिद्ध खजराना गणेश मंदिर, राजवाड़ा पैलेस और स्वादिष्ट खान-पान के लिए जाना जाता है। उज्जैन और ओंकारेश्वर जाने वाले तीर्थयात्रियों के लिए यह मुख्य प्रवेश द्वार है।',
    },
    placesToVisit: {
      en: ['Khajrana Ganesh Temple', 'Rajwada Palace', 'Lal Bagh Palace', 'Sarafa & 56 Dukan', 'Pitreshwar Hanuman'],
      hi: ['खजराना गणेश मंदिर', 'राजवाड़ा पैलेस', 'लालबाग पैलेस', 'सराफा व 56 दुकान', 'पितृ पर्वत हनुमान'],
    },
    temples: {
      en: ['Khajrana Ganesh', 'Gommatgiri', 'Bada Ganpati', 'Kanch Mandir'],
      hi: ['खजराना गणेश', 'गोम्मटगिरि', 'बड़ा गणपति', 'कांच मंदिर'],
    },
  },
};

export interface LocalizedFAQContent {
  id: string;
  category: string;
  question: {
    en: string;
    hi: string;
  };
  answer: {
    en: string;
    hi: string;
  };
}

export const FAQ_CONTENT_CATALOG: Record<string, LocalizedFAQContent> = {
  'faq-1': {
    id: 'faq-1',
    category: 'General',
    question: {
      en: 'How do I book a Pooja or Yatra with Aastha Sey Raasta Seva?',
      hi: 'आस्था से रास्ता सेवा के साथ पूजा या यात्रा कैसे बुक करें?',
    },
    answer: {
      en: 'You can easily book online by clicking "Book / Enquire" on any service or tour page, filling out the quick booking form with your preferred date and gotra details, or directly contacting our team on WhatsApp at +91 9111099799 for instant assistance.',
      hi: 'आप किसी भी पूजा या यात्रा पेज पर "Book / Enquire" बटन पर क्लिक करके, अपनी पसंदीदा तिथि व गोत्र का विवरण भरकर सरलता से बुकिंग कर सकते हैं। इसके अतिरिक्त हमारे व्हाट्सएप नंबर (+91 9111099799) पर सीधे संदेश भेजकर भी त्वरित सहायता और आरक्षण प्राप्त कर सकते हैं।',
    },
  },
  'faq-2': {
    id: 'faq-2',
    category: 'Pooja',
    question: {
      en: 'Who conducts the Poojas and Vedic Rituals in Ujjain?',
      hi: 'उज्जैन में पूजा और वैदिक अनुष्ठान कौन संपन्न कराते हैं?',
    },
    answer: {
      en: 'All poojas, havans, and dosh shanti rituals are conducted strictly by qualified, hereditary Vedic Brahmins and Acharyas of Ujjain who are proficient in Shukla Yajurvedic traditions, Karmakand, and traditional mantras.',
      hi: 'सभी पूजा, हवन और दोष निवारण अनुष्ठान उज्जैन के पारंपरिक, वेदपाठी और कर्मकांड में निपुण वैदिक ब्राह्मणों व आचार्यों द्वारा शास्त्रोक्त विधि से ही संपन्न कराए जाते हैं।',
    },
  },
  'faq-remote': {
    id: 'faq-remote',
    category: 'General',
    question: {
      en: 'Can I perform a Pooja remotely if I cannot visit Ujjain in person?',
      hi: 'यदि हम उज्जैन व्यक्तिगत रूप से नहीं आ सकते, तो क्या ऑनलाइन संकल्प से पूजा करा सकते हैं?',
    },
    answer: {
      en: 'Yes, absolutely. For devotees who cannot travel to Ujjain, our Vedic priests perform the complete ritual in your name with personal Gotra Sankalp via Live HD Video call. Sanctified Mahakal Prasadam, sacred raksha sutra, and bhasma are safely delivered to your doorstep.',
      hi: 'हाँ, बिल्कुल। जो श्रद्धालु उज्जैन आने में असमर्थ हैं, उनके लिए हमारे वेदपाठी ब्राह्मण लाइव वीडियो कॉल के माध्यम से आपके नाम, गोत्र और संकल्प के साथ संपूर्ण पूजा संपन्न करते हैं। पूजा के उपरांत अभिमंत्रित महाकाल प्रसाद, रक्षा सूत्र एवं भस्म आपके पते पर सुरक्षित डाक द्वारा भेज दी जाती है।',
    },
  },
  'faq-samagri': {
    id: 'faq-samagri',
    category: 'Pooja',
    question: {
      en: 'Do devotees need to bring any Pooja materials (Samagri) with them?',
      hi: 'क्या यजमान को अपने साथ पूजन सामग्री लानी होती है?',
    },
    answer: {
      en: 'No, we provide 100% pure, satvik Vedic samagri including fresh Panchamrit (pure cow milk, curd, honey, desi ghee, gangajal), fresh bilvapatra, bhasma, dhatura, flowers, akshat, and havan dravya. Devotees only need to come with devotion.',
      hi: 'नहीं, आपको कोई भी सामग्री लाने की आवश्यकता नहीं होती। हम शुद्ध सात्विक वैदिक सामग्री (जैसे देशी गाय का दूध, दही, शहद, घृत, गंगाजल, ताजे बेलपत्र, भस्म, धतूरा, फल, फूल, हवन सामग्री आदि) स्वयं प्रबंधित करते हैं। यजमान को केवल श्रद्धाभाव से सम्मिलित होना होता है।',
    },
  },
  'faq-bhat-pooja': {
    id: 'faq-bhat-pooja',
    category: 'Pooja',
    question: {
      en: 'Why is Mangal Bhat Pooja performed exclusively at Mangalnath Ujjain?',
      hi: 'मंगलनाथ उज्जैन में ही मंगल भात पूजा क्यों की जाती है?',
    },
    answer: {
      en: 'According to the Matsya Purana and Skanda Purana, Mangalnath in Ujjain is the cosmic birthplace of Mars (Mangal Dev). Performing Bhat Pooja (cooked rice offering) with red gulal and panchamrit cools the fiery energy of Mars, effectively mitigating Manglik Dosh and marriage hurdles.',
      hi: 'मत्स्य पुराण एवं स्कंद पुराण के अनुसार उज्जैन स्थित श्री मंगलनाथ तीर्थ मंगल ग्रह की जन्मभूमि है। पके हुए अक्षत (भात) और पंचामृत से भगवान शिव के मंगल स्वरूप का अभिषेक करने से मंगल की उग्रता शांत होती है और विवाह, स्वास्थ्य व कार्य में आ रही बाधाएं दूर होती हैं।',
    },
  },
  'faq-kaal-sarp': {
    id: 'faq-kaal-sarp',
    category: 'Pooja',
    question: {
      en: 'How long does the Kaal Sarp Dosh Shanti Pooja take?',
      hi: 'कालसर्प दोष शांति पूजा में कितना समय लगता है?',
    },
    answer: {
      en: 'The complete Kaal Sarp Dosh & Rahu-Ketu Shanti ritual takes approximately 2.5 to 3.5 hours. It comprises Ganpati-Gauri pujan, Navgraha sthapana, silver Nag-Nagin pujan, Rudrabhishek, Rahu-Ketu jaap, and Purnahuti havan at the sacred Ramghat.',
      hi: 'कालसर्प दोष एवं राहु-केतु शांति पूजा में लगभग 2.5 से 3.5 घंटे का समय लगता है। इसमें गणपति-गौरी पूजन, नवग्रह मंडल स्थापना, चांदी के नाग-नागिन का पूजन, रुद्राभिषेक, वैदिक मंत्र जाप और पूर्णाहुति हवन संपन्न किया जाता है।',
    },
  },
  'faq-dresscode': {
    id: 'faq-dresscode',
    category: 'Pooja',
    question: {
      en: 'What is the recommended dress code for temple poojas in Ujjain?',
      hi: 'मंदिर पूजा एवं महाकाल दर्शन के लिए क्या वस्त्र नियम (ड्रेस कोड) है?',
    },
    answer: {
      en: 'Traditional Indian attire is required for inner sanctum entry and Vedic rituals. For men: Dhoti-Kurta or traditional Kurta-Pyjama (white/yellow). For women: Saree or Salwar-Kameez. Leather accessories (belts, wallets) are strictly restricted in the ritual area.',
      hi: 'पूजा और गर्भगृह दर्शन के लिए पारंपरिक सात्विक परिधान श्रेष्ठ है। पुरुषों के लिए धोती-कुर्ता या कुर्ता-पायजामा (श्वेत या पीतांबरी) और महिलाओं के लिए साड़ी या सलवार-सूट उपयुक्त है। चमड़े की वस्तुएं (बेल्ट, पर्स आदि) पूजन स्थल के बाहर रखना अनिवार्य है।',
    },
  },
  'faq-ujjain-tour': {
    id: 'faq-ujjain-tour',
    category: 'Tour',
    question: {
      en: 'What places are covered in the Ujjain Temple Darshan Tour?',
      hi: 'उज्जैन स्थानीय मंदिर दर्शन यात्रा में कौन-कौन से तीर्थ शामिल हैं?',
    },
    answer: {
      en: 'The itinerary covers all iconic pilgrimage shrines: Mahakaleshwar Jyotirlinga, Kal Bhairav, Mangalnath, Harsiddhi Shaktipeeth, Gadkalika, Ramghat, Sandipani Ashram, Siddhvat, Chintaman Ganesh, and Bhartrihari Caves with dedicated local coordination and private AC transport.',
      hi: 'इस यात्रा में उज्जैन के सभी प्रमुख तीर्थ शामिल हैं: श्री महाकालेश्वर ज्योतिर्लिंग, काल भैरव, मंगलनाथ, हरसिद्धि शक्तिपीठ, गढ़कालिका, रामघाट, सांदीपनि आश्रम, सिद्धवट, चिंतामण गणेश और भर्तृहरि गुफाएं। इसमें निजी एसी वाहन और स्थानीय मार्गदर्शन शामिल है।',
    },
  },
  'faq-bhasma-aarti': {
    id: 'faq-bhasma-aarti',
    category: 'Tour',
    question: {
      en: 'How can devotees attend the Bhasma Aarti at Mahakaleshwar Temple?',
      hi: 'महाकालेश्वर मंदिर में भस्म आरती में कैसे सम्मिलित हो सकते हैं?',
    },
    answer: {
      en: 'Bhasma Aarti is conducted daily between 4:00 AM and 6:00 AM. Advance online registration via the official Mahakaleshwar Trust portal or offline counter quota is required. Our local team provides comprehensive guidance on reporting times, entry gates, and dress code protocol.',
      hi: 'भस्म आरती प्रतिदिन प्रातः 4:00 से 6:00 बजे तक होती है। इसके लिए महाकालेश्वर मंदिर प्रबंध समिति के पोर्टल से अग्रिम ऑनलाइन पंजीकरण या ऑफलाइन काउंटर से अनुमति लेनी होती है। हमारी टीम आपको समय, प्रवेश द्वार और आवश्यक नियमों की पूरी जानकारी व मार्गदर्शन प्रदान करती है।',
    },
  },
  'faq-custom-itinerary': {
    id: 'faq-custom-itinerary',
    category: 'Tour',
    question: {
      en: 'Can tour packages be customized for senior citizens and large families?',
      hi: 'क्या तीर्थ यात्रा पैकेज को वरिष्ठ नागरिकों और परिवार की सुविधानुसार कस्टमाइज़ किया जा सकता है?',
    },
    answer: {
      en: 'Yes, all our pilgrimage tours (Ujjain, Omkareshwar, Nalkheda, Maheshwar, and Char Dham) can be tailored with flexible timing, wheelchair assistance, senior-friendly vehicles, and verified clean hotel stays.',
      hi: 'हाँ, हमारे सभी यात्रा पैकेज (उज्जैन, ओंकारेश्वर, नलखेड़ा, महेश्वर एवं चार धाम) को आपकी आवश्यकतानुसार बदला जा सकता है। हम वरिष्ठ नागरिकों के लिए आरामदायक एसी वाहन, सुलभ दर्शन व्यवस्था, व्हीलचेयर सहायता और स्वच्छ होटल की उत्तम व्यवस्था करते हैं।',
    },
  },
  'faq-payment': {
    id: 'faq-payment',
    category: 'General',
    question: {
      en: 'What payment modes are accepted for Pooja and Tour bookings?',
      hi: 'पूजा एवं यात्रा बुकिंग के लिए भुगतान के कौन से माध्यम उपलब्ध हैं?',
    },
    answer: {
      en: 'We accept all secure digital payment options including UPI (Google Pay, PhonePe, Paytm), Net Banking, Debit/Credit Cards, and direct Bank NEFT/RTGS transfers with instant digital receipts.',
      hi: 'हम सभी सुरक्षित डिजिटल भुगतान माध्यम स्वीकार करते हैं, जिनमें UPI (Google Pay, PhonePe, Paytm), नेट बैंकिंग, डेबिट/क्रेडिट कार्ड और बैंक ट्रांसफर शामिल हैं। बुकिंग के साथ आपको तुरंत पुष्टि रसीद प्रदान की जाती है।',
    },
  },
};

/**
 * Content Service Class
 * Provides centralized, localized content resolution for all UI components.
 */
export class ContentService {
  /**
   * Enrich and return an FAQ with complete localized question & answer.
   */
  static enrichFAQ(faq: FAQ, language: Language): FAQ {
    const catalog = FAQ_CONTENT_CATALOG[faq.id];
    if (!catalog) return faq;

    return {
      ...faq,
      question: language === 'hi' ? catalog.question.hi : catalog.question.en,
      hindiQuestion: catalog.question.hi,
      answer: language === 'hi' ? catalog.answer.hi : catalog.answer.en,
      hindiAnswer: catalog.answer.hi,
    };
  }

  /**
   * Enrich an array of FAQs
   */
  static enrichFAQs(faqs: FAQ[], language: Language): FAQ[] {
    return faqs.map((f) => this.enrichFAQ(f, language));
  }
  /**
   * Get localized pooja content by slug or ID.
   */
  static getPoojaContent(slugOrId: string, language: Language = 'en'): LocalizedPoojaContent | undefined {
    if (!slugOrId) return undefined;
    const direct = POOJA_CONTENT_CATALOG[slugOrId];
    if (direct) return direct;
    return Object.values(POOJA_CONTENT_CATALOG).find(
      (p) => p.slug === slugOrId || p.id === slugOrId
    );
  }

  /**
   * Get localized tour content by slug or ID.
   */
  static getTourContent(slugOrId: string): LocalizedTourContent | undefined {
    if (!slugOrId) return undefined;
    const direct = TOUR_CONTENT_CATALOG[slugOrId];
    if (direct) return direct;
    return Object.values(TOUR_CONTENT_CATALOG).find(
      (t) => t.slug === slugOrId || t.id === slugOrId
    );
  }

  /**
   * Get localized destination content by slug or ID.
   */
  static getDestinationContent(slugOrId: string): LocalizedDestinationContent | undefined {
    if (!slugOrId) return undefined;
    const direct = DESTINATION_CONTENT_CATALOG[slugOrId];
    if (direct) return direct;
    return Object.values(DESTINATION_CONTENT_CATALOG).find(
      (d) => d.slug === slugOrId || d.id === slugOrId
    );
  }

  /**
   * Enrich and return a PoojaService object with complete localized fields for current language.
   */
  static enrichPooja(pooja: PoojaService, language: Language): PoojaService {
    const catalog = this.getPoojaContent(pooja.slug || pooja.id, language);
    if (!catalog) return pooja;

    return {
      ...pooja,
      name: language === 'hi' ? catalog.name.hi : catalog.name.en,
      hindiName: catalog.name.hi,
      categoryName: language === 'hi' ? catalog.categoryName.hi : catalog.categoryName.en,
      hindiCategoryName: catalog.categoryName.hi,
      shortDescription: language === 'hi' ? catalog.shortDescription.hi : catalog.shortDescription.en,
      hindiShortDescription: catalog.shortDescription.hi,
      description: language === 'hi' ? catalog.description.hi : catalog.description.en,
      hindiDescription: catalog.description.hi,
      templeName: language === 'hi' ? catalog.templeName.hi : catalog.templeName.en,
      hindiTempleName: catalog.templeName.hi,
      location: language === 'hi' ? catalog.location.hi : catalog.location.en,
      hindiLocation: catalog.location.hi,
      city: language === 'hi' ? catalog.city.hi : catalog.city.en,
      hindiCity: catalog.city.hi,
      state: language === 'hi' ? catalog.state.hi : catalog.state.en,
      hindiState: catalog.state.hi,
      duration: language === 'hi' ? catalog.duration.hi : catalog.duration.en,
      hindiDuration: catalog.duration.hi,
      whatWeOffer: language === 'hi' ? catalog.whatWeOffer.hi : catalog.whatWeOffer.en,
      hindiWhatWeOffer: catalog.whatWeOffer.hi,
      benefits: language === 'hi' ? catalog.benefits.hi : catalog.benefits.en,
      hindiBenefits: catalog.benefits.hi,
      preparation: language === 'hi' ? catalog.preparation.hi : catalog.preparation.en,
      hindiPreparation: catalog.preparation.hi,
      ritualDetails: language === 'hi' ? catalog.ritualDetails.hi : catalog.ritualDetails.en,
      hindiRitualDetails: catalog.ritualDetails.hi,
    };
  }

  /**
   * Get clean, simple Hindi text for spiritual headings & sections
   */
  static getSpiritualHeading(type: 'significance' | 'vidhi' | 'samagri' | 'benefits' | 'preparation', language: Language): string {
    const headings = {
      significance: {
        en: 'Spiritual Significance & Overview',
        hi: 'आध्यात्मिक महत्व एवं विधि परिचय',
      },
      vidhi: {
        en: 'Vedic Ritual Steps & Vidhi',
        hi: 'वैदिक पूजा विधि एवं चरण',
      },
      samagri: {
        en: 'What We Offer & Samagri',
        hi: 'पूजा सामग्री एवं व्यवस्था',
      },
      benefits: {
        en: 'Key Blessings & Benefits',
        hi: 'पूजा के प्रमुख लाभ एवं फल',
      },
      preparation: {
        en: 'Preparation for Devotees',
        hi: 'यजमान हेतु आवश्यक नियम एवं तैयारी',
      },
    };

    return headings[type] ? headings[type][language] : '';
  }
}
