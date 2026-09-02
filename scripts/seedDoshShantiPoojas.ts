import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const moolShantiPooja = {
  id: 'pooja-mool-shanti-pooja-ujjain',
  name: 'Mool Shanti Pooja in Ujjain',
  hindiName: 'मूल शांति पूजा (मूल नक्षत्र शांति अनुष्ठान)',
  slug: 'mool-shanti-pooja-ujjain',
  urlSlug: '/pooja/mool-shanti-pooja-ujjain',
  categoryId: 'cat-dosh',
  categoryName: 'Dosh Shanti & Special Poojas',
  hindiCategoryName: 'दोष शांति एवं विशेष पूजा',
  pageType: 'Pooja / Dosh Shanti',
  primaryKeyword: 'mool shanti pooja',
  focusKeyword: 'mool shanti pooja in ujjain',
  secondaryKeywords: [
    'mool shanti pooja in ujjain',
    'mool nakshatra shanti pooja',
    'mool shanti pooja for child',
    'mool nakshatra pooja',
    'mool shanti pooja booking'
  ],
  searchIntent: 'Transactional & Informational (Parents seeking authentic Vedic Mool Nakshatra Shanti ritual in Ujjain for child and family well-being)',
  seoTitle: 'Mool Shanti Pooja in Ujjain | Aastha Sey Raasta Seva',
  metaDescription: 'Arrange authentic Mool Shanti Pooja in Ujjain for children born under Mool Nakshatra. Complete Vedic ritual arrangements with experienced Pandits for family peace & child\'s well-being.',
  h1: 'Mool Shanti Pooja in Ujjain — Vedic Nakshatra Shanti for Child & Family',
  quickAnswer: 'Mool Shanti Pooja is a Vedic ritual performed for children born under Mool Nakshatra. According to Vedic tradition, the ritual is performed to pacify traditionally believed negative effects of Mool Nakshatra and to pray for the well-being and long life of the child, as well as peace, harmony and prosperity in the family.',
  shortDescription: 'Mool Shanti Pooja is a sacred Vedic ritual performed for children born under Mool Nakshatra (birth star) to pray for the well-being and long life of the child and peace, harmony, and prosperity in the family.',
  description: `Mool Shanti Pooja is a sacred Vedic ritual performed for children born under the Mool Nakshatra (birth star). In Hindu astrological traditions, the birth Nakshatra plays a fundamental role in shaping an individual's life path, temperament, and family dynamics. According to traditional belief, birth under certain quarters (Padas) of Mool Nakshatra is associated with specific astrological challenges or doshas that may affect the child and create concern for the parents and extended family.

To address these traditional beliefs, Vedic scriptures prescribe the Mool Shanti Anushthan. The ritual is performed with sincere prayers to pacify the traditionally believed negative influences of Mool Nakshatra, seek divine protection for the child, and foster harmony, health, and prosperity across the entire family. At Aastha Sey Raasta Seva, we provide complete, authentic arrangements for Mool Shanti Pooja in Ujjain, conducted by experienced and Vedic-qualified pandits with complete ritual devotion.

## About Mool Shanti Pooja
Mool Shanti Pooja is an ancient Vedic ceremony designed to bring spiritual tranquility and positive planetary alignment. According to Vedic tradition, the ritual is performed to pacify the negative effects of Mool Nakshatra, ensure the well-being and long life of the child, and bring peace, harmony, and prosperity to the family.

During the ceremony, qualified pandits establish sacred Kalash representations, invoke the presiding deities of the Nakshatra, and chant specific Vedic mantras from scriptural traditions. The ritual incorporates traditional Vedic prayers, Gotra Sankalp, havan (sacred fire offerings), and peace invocations (Shanti Path) to invoke divine benevolence and blessings for the newborn and their household.

## Why Mool Shanti Pooja Is Performed
In traditional Vedic astrology, devotees organize Mool Shanti Pooja for several core devotional intentions:
- **Pacification of Mool Nakshatra**: Traditionally believed to neutralize the negative influences associated with Mool Nakshatra birth.
- **Child's Health & Longevity**: Performed to invoke divine grace for the child's physical vitality, mental well-being, and long, auspicious life.
- **Protection of Parents**: Believed to safeguard parents from difficulties traditionally associated with the birth star.
- **Family Harmony & Unity**: Traditionally associated with reducing domestic tensions and establishing understanding within the household.
- **Clearing Growth Hurdles**: Performed to remove subtle obstacles that may affect the child's early development and learning milestones.
- **Prosperity & Household Stability**: Intended to foster an auspicious and stable atmosphere for the entire family.

## Who May Consider Mool Shanti Pooja
- Parents of children born under the Mool Nakshatra (or Gandmool Nakshatras as identified in their Janam Kundali).
- Families seeking traditional Nakshatra pacification and peace for the household following a child's birth.
- Devotees wishing to arrange an authentic Vedic Shanti ritual in the holy city of Ujjain with qualified Brahmins.

*Disclaimer: Astrological suitability depends on an individual's birth chart and traditional guidance. Consult a qualified astrologer for personalized advice.*`,
  templeName: 'Sacred Temples & Teerth Kshetra in Ujjain',
  location: 'Ujjain, Madhya Pradesh',
  city: 'Ujjain',
  state: 'Madhya Pradesh',
  country: 'India',
  whatWeOffer: [
    'We provide complete arrangements for Mool Shanti Pooja Anushthan with devotion, authenticity and convenience for devotees.',
    'The ritual is performed by experienced and Vedic-qualified pandits.',
    'Provision of pure, satvik ritual materials, sacred herbs, pure cow ghee, and havan samagri.',
    'Personalized Gotra Sankalp for parents and child with dedicated coordination support.'
  ],
  hindiWhatWeOffer: [
    'श्रद्धा, प्रामाणिकता और सुविधा के साथ संपूर्ण मूल शांति पूजा अनुष्ठान व्यवस्था',
    'अनुभवी एवं वैदिक-विद्वान ब्राह्मणों द्वारा विधिवत पूजा एवं हवन',
    'शुद्ध सात्विक पूजन सामग्री, औषधीय समिधा एवं हवन सामग्री',
    'व्यक्तिगत नाम एवं गोत्र संकल्प के साथ मार्गदर्शन'
  ],
  benefits: [
    'Pacification of Mool Nakshatra Effects: Traditionally believed to neutralize the negative influences of Mool Nakshatra on the child and family.',
    'Well-being & Long Life of the Child: Invokes divine blessings for the child\'s health, vitality, and longevity according to traditional belief.',
    'Protection of Parents: Believed to safeguard parents from difficulties traditionally associated with Mool Nakshatra birth.',
    'Family Harmony & Peace: Traditionally associated with reducing conflicts and tension within the family, fostering unity and understanding.',
    'Support for Child\'s Growth: Traditionally associated with clearing hurdles that may affect the child\'s physical, mental, and emotional development.',
    'Prosperity & Stability: Traditionally associated with overall stability and prosperity in the family after the birth of a child under this nakshatra.',
    'Auspicious Beginning for the Child\'s Life: Traditionally associated with a positive and blessed start to the child\'s journey in life.'
  ],
  hindiBenefits: [
    '[शांति] मूल नक्षत्र के पारंपरिक रूप से माने जाने वाले नकारात्मक प्रभावों का शमन',
    '[कल्याण] बच्चे के उत्तम स्वास्थ्य, दीर्घायु एवं सर्वांगीण कल्याण हेतु ईश्वरीय कृपा',
    '[सुरक्षा] माता-पिता की पारंपरिक रूप से मानी जाने वाली कठिनाइयों से रक्षा',
    '[सद्भाव] परिवार में आपसी समझ, शांति और गृह क्लेश निवारण',
    '[विकास] बच्चे के शारीरिक, मानसिक एवं बौद्धिक विकास में आने वाली बाधाओं का निवारण',
    '[समृद्धि] गृह-परिवार में सुख, स्थिरता और आर्थिक एवं पारिवारिक समृद्धि',
    '[शुभ आरंभ] बालक के जीवन के नव आरंभ हेतु शुभ एवं मंगलमय आशीर्वाद'
  ],
  whoCanConsider: [
    'Parents of children born under Mool Nakshatra (birth star).',
    'Families seeking Vedic remedies for Gandmool Nakshatra dosha.',
    'Devotees wishing to pray for child\'s longevity, health, and parent protection.',
    'Devotees seeking peace, domestic harmony, and removal of developmental hurdles.'
  ],
  preparation: [
    'Devotees are requested to wear clean, traditional attire for the ritual.',
    'Keep child\'s birth details (Date, Time, Place of Birth, Name & Gotra) available for Sankalp.',
    'Arrive at the designated Ujjain venue 15 minutes before the scheduled auspicious Muhurat.'
  ],
  hindiPreparation: [
    'यजमान एवं परिवार शुद्ध पारंपरिक वस्त्र धारण करें।',
    'संकल्प हेतु बालक का नाम, जन्म समय, जन्म स्थान, माता-पिता का नाम एवं गोत्र विवरण तैयार रखें।',
    'निर्धारित शुभ मुहूर्त से 15 मिनट पूर्व पूजा स्थल पर उपस्थित हों।'
  ],
  ritualDetails: 'Ganesh Pujan, Kalash Sthapana, Mool Nakshatra Presiding Deity Avahan, Vedic Mantra Japa, Havan Yajna with sacred herbs, Gotra Sankalp, and Shanti Paath.',
  hindiRitualDetails: 'गणेश पूजन, कलश स्थापना, मूल नक्षत्र अधिष्ठाता देवता आवाहन, वैदिक मंत्र जाप, औषधीय समिधा से हवन, गोत्र संकल्प एवं शांति पाठ।',
  duration: 'Available on enquiry',
  hindiDuration: 'पूछताछ पर उपलब्ध',
  price: null,
  priceType: 'Custom / On Request' as const,
  featuredImage: '/assets/images/mool_shanti_pooja_ujjain_1787114840814.jpg',
  gallery: [
    '/assets/images/mool_shanti_pooja_ujjain_1787114840814.jpg',
    '/assets/images/mool-shanti-pooja-ujjain.jpg'
  ],
  isFeatured: true,
  isPublished: true,
  faqs: [
    {
      question: 'What is Mool Shanti Pooja?',
      answer: 'Mool Shanti Pooja is a Vedic ritual performed for children born under Mool Nakshatra. According to Vedic tradition, the ritual is performed to pacify traditionally believed negative effects of Mool Nakshatra and to pray for the well-being and long life of the child, as well as peace, harmony and prosperity in the family.'
    },
    {
      question: 'Who is Mool Shanti Pooja traditionally performed for?',
      answer: 'This Pooja is performed for children born under the Mool Nakshatra (birth star).'
    },
    {
      question: 'Why is Mool Nakshatra associated with this pooja?',
      answer: 'According to traditional belief, the ritual is performed to pacify the negative effects of Mool Nakshatra, safeguard parents from difficulties traditionally associated with Mool Nakshatra birth, clear hurdles in the child\'s growth, and invoke blessings for longevity, peace, harmony, and prosperity.'
    },
    {
      question: 'What are the traditional benefits of Mool Shanti Pooja?',
      answer: 'The traditional benefits associated with the Pooja include pacification of Mool Nakshatra effects, child\'s health and longevity, protection of parents, reduced conflicts and family harmony, removal of growth obstacles, family stability, and an auspicious beginning for the child\'s journey.'
    },
    {
      question: 'Can parents arrange Mool Shanti Pooja for their child?',
      answer: 'Yes, parents can organize and participate in this sacred anushthan on behalf of their child with personalized Name and Gotra Sankalp.'
    },
    {
      question: 'How can I enquire about Mool Shanti Pooja in Ujjain?',
      answer: 'Contact Aastha Sey Raasta Seva via our online form, phone call, or WhatsApp to enquire about available arrangements and schedule your pooja.'
    },
    {
      question: 'How much does Mool Shanti Pooja cost?',
      answer: 'Pooja requirements and arrangements may vary depending on individual needs. Contact Aastha Sey Raasta Seva to understand the available arrangements and current pricing.'
    }
  ],
  internalLinks: [
    { anchor: 'Nakshatra Shanti Pooja', link: '/pooja/nakshatra-shanti-pooja-ujjain', reason: 'Vedic birth star Shanti service.' },
    { anchor: 'Vish Yog Shanti Pooja', link: '/pooja/vish-yog-shanti-pooja-ujjain', reason: 'Planetary Vish Yoga Shanti.' },
    { anchor: 'Navgraha Shanti Pooja', link: '/pooja/navgraha-shanti-pooja-ujjain', reason: 'Nine planetary peace ritual.' },
    { anchor: 'Rudrabhishek Pooja in Ujjain', link: '/pooja/rudrabhishek-pooja-ujjain', reason: 'Lord Shiva sacred abhishek.' }
  ],
  imageSeo: {
    featuredImageIdea: 'Vedic pandits in traditional attire performing sacred havan fire ritual for Mool Nakshatra Shanti in Ujjain.',
    alt: 'Mool Shanti Pooja in Ujjain Vedic Nakshatra Shanti for Child and Family',
    title: 'Mool Shanti Pooja in Ujjain — Aastha Sey Raasta Seva',
    filename: 'mool_shanti_pooja_ujjain_1787114840814.jpg'
  },
  schemaTypes: ['Service', 'FAQPage', 'BreadcrumbList', 'LocalBusiness'],
  qualityScore: 99,
  sortOrder: 11,
  createdAt: '2026-08-01T10:00:00Z',
  updatedAt: '2026-09-02T20:00:00Z'
};

const vishYogShantiPooja = {
  id: 'pooja-vish-yog-shanti-pooja-ujjain',
  name: 'Vish Yog Shanti Pooja in Ujjain',
  hindiName: 'विष योग शांति पूजा (विष योग दोष निवारण अनुष्ठान)',
  slug: 'vish-yog-shanti-pooja-ujjain',
  urlSlug: '/pooja/vish-yog-shanti-pooja-ujjain',
  categoryId: 'cat-dosh',
  categoryName: 'Dosh Shanti & Special Poojas',
  hindiCategoryName: 'दोष शांति एवं विशेष पूजा',
  pageType: 'Pooja / Dosh Shanti',
  primaryKeyword: 'vish yog shanti pooja',
  focusKeyword: 'vish yog shanti pooja in ujjain',
  secondaryKeywords: [
    'vish yog shanti pooja ujjain',
    'vish yoga pooja',
    'vish yog dosh shanti',
    'vish yog shanti pooja booking'
  ],
  searchIntent: 'Transactional & Informational (Devotees seeking authentic Vedic Vish Yog Shanti ritual in Ujjain for obstacle removal, mental peace, and family stability)',
  seoTitle: 'Vish Yog Shanti Pooja in Ujjain | Aastha Sey Raasta Seva',
  metaDescription: 'Perform authentic Vish Yog Shanti Pooja in Ujjain to neutralize Vish Yoga effects. Experienced Vedic Pandits, complete arrangements, obstacle removal & mental peace.',
  h1: 'Vish Yog Shanti Pooja — Vedic Remedy for Vish Yoga in Ujjain',
  quickAnswer: 'Vish Yog Shanti Pooja is a specialized Vedic ritual performed to pacify the inauspicious astrological combination known as Vish Yoga in a horoscope. Traditionally believed to cause persistent obstacles, misfortune, emotional distress, and relationship challenges, this sacred ceremony is conducted by Vedic pandits to neutralize malefic planetary influences and restore peace, health, and prosperity for the devotee and family.',
  shortDescription: 'Vish Yog Shanti Pooja is a Vedic ritual performed to neutralize the traditionally believed negative effects of Vish Yoga in a horoscope, restoring peace, health, and prosperity for the devotee and family.',
  description: `Vish Yog Shanti Pooja is a Vedic ritual performed to pacify Vish Yoga. In Vedic astrology, Vish Yoga is described in the catalogue as an inauspicious astrological combination formed by certain planetary positions in a horoscope—traditionally the conjunction or mutual aspect of Saturn (Shani) and the Moon (Chandra).

According to traditional belief, the presence of Vish Yoga in a birth chart may cause persistent obstacles, misfortune, emotional turbulence, and difficulties in personal and professional spheres. The Vish Yog Shanti Pooja is performed to neutralize the traditionally believed negative effects of Vish Yoga and is intended to restore peace, health, and prosperity for the devotee and their family.

At Aastha Sey Raasta Seva, we provide complete, transparent arrangements for Vish Yog Shanti Pooja in the sacred city of Ujjain. The ceremony is conducted with full devotion and scriptural authenticity by experienced and Vedic-qualified pandits.

## About Vish Yog Shanti Pooja
Vish Yog Shanti Pooja is rooted in ancient Vedic remedies designed to balance planetary energies. The planetary combination of Saturn and the Moon is traditionally associated with inner conflict, delays, and emotional heaviness.

During the ritual, learned pandits perform specific Shanti mantras, Gotra Sankalp, Kalash Sthapana, planetary pacification prayers, and a consecrated Havan. These sacred Vedic rituals are intended to invoke divine grace, remove obstacles, and establish mental calmness and family stability.

## Why Vish Yog Shanti Pooja Is Performed
Devotees traditionally seek Vish Yog Shanti Anushthan to address specific concerns identified in their horoscope:
- **Neutralizing Vish Yoga Influence**: Performed to mitigate the negative astrological influences attributed to Vish Yoga.
- **Overcoming Persistent Obstacles**: Aimed at dissolving recurring hurdles in career, education, and personal goals.
- **Relief from Emotional Stress**: Traditionally believed to bring mental peace, emotional stability, and clarity of thought.
- **Protection from Misfortune**: Intended to invoke divine protection against unexpected setbacks and adverse circumstances.
- **Fostering Family Harmony**: Performed to improve interpersonal relationships and minimize domestic friction.
- **Career & Financial Stability**: Traditionally associated with steady professional progress and business growth.

## Who May Consider Vish Yog Shanti Pooja
- Devotees whose horoscopes indicate the presence of Vish Yoga (Saturn-Moon conjunction or aspect).
- Individuals experiencing chronic mental tension, emotional restlessness, or unexplainable delays in life.
- Devotees seeking obstacle removal, career consistency, and harmonious family relations.
- Devotees traveling to Ujjain who wish to perform a traditional planetary Shanti ritual with Vedic pandits.

*Disclaimer: Astrological suitability depends on an individual's birth chart and traditional guidance. Consult a qualified astrologer for personalized advice.*`,
  templeName: 'Sacred Temples & Teerth Kshetra in Ujjain',
  location: 'Ujjain, Madhya Pradesh',
  city: 'Ujjain',
  state: 'Madhya Pradesh',
  country: 'India',
  whatWeOffer: [
    'We provide complete arrangements for Vish Yog Shanti Pooja Anushthan with devotion, authenticity and convenience for devotees.',
    'The ritual is performed by experienced and Vedic-qualified pandits.',
    'Provision of sacred planetary samagri, energized yantras, herbs, and pure cow ghee.',
    'Personalized Name & Gotra Sankalp with complete step-by-step guidance for devotees.'
  ],
  hindiWhatWeOffer: [
    'श्रद्धा, प्रामाणिकता और सुविधा के साथ संपूर्ण विष योग शांति पूजा व्यवस्था',
    'अनुभवी एवं वैदिक-विद्वान ब्राह्मणों द्वारा विधिवत अनुष्ठान एवं हवन',
    'ग्रह शांति हेतु सात्विक पूजन सामग्री एवं पवित्र समिधा',
    'व्यक्तिगत नाम एवं गोत्र संकल्प के साथ मार्गदर्शन'
  ],
  benefits: [
    'Neutralization of Vish Yoga Effects: Traditionally performed to pacify and neutralize the negative planetary influences of Vish Yoga in one\'s horoscope.',
    'Removal of Obstacles: Believed to clear persistent hurdles and unexpected hindrances in personal, professional, and spiritual pursuits.',
    'Protection from Misfortune: Performed to invoke divine protection against repeated setbacks, adverse circumstances, and unforeseen difficulties.',
    'Health & Well-Being: Traditionally believed to promote physical vitality, mental clarity, emotional calmness, and overall well-being.',
    'Peace & Stability: Aims to alleviate chronic mental tension, emotional turbulence, and restlessness, bringing inner peace.',
    'Prosperity & Growth: Associated with creating favorable conditions for personal progress, financial stability, and continuous spiritual growth.',
    'Family Harmony: Traditionally believed to reduce misunderstandings and domestic friction, fostering warmth and mutual support at home.',
    'Improved Relationships: Helps in harmonizing strained interpersonal relations and strengthening social and familial bonds.',
    'Career & Business Stability: Traditionally performed to overcome stagnation in profession, trade, or business endeavors and establish stability.'
  ],
  hindiBenefits: [
    '[दोष शमन] जन्मपत्रिका में विष योग के नकारात्मक ग्रह प्रभावों का शास्त्रोक्त शमन',
    '[बाधा निवारण] कार्यों में आ रही निरंतर रुकावटों एवं अप्रत्याशित बाधाओं का निवारण',
    '[सुरक्षा] दुर्भाग्य एवं अनपेक्षित संकटों से ईश्वरीय रक्षा का आशीर्वाद',
    '[स्वास्थ्य] शारीरिक ऊर्जा, मानसिक स्पष्टता एवं समग्र स्वास्थ्य संवर्धन',
    '[शांति] मानसिक तनाव, चिंता एवं भावनात्मक अशांति से मुक्ति और आंतरिक शांति',
    '[समृद्धि] प्रगति के अनुकूल अवसर, आर्थिक स्थिरता एवं निरंतर समृद्धि',
    '[सद्भाव] पारिवारिक क्लेश निवारण एवं घर में सुखद व शांतिपूर्ण वातावरण',
    '[संबंध सुधार] पारिवारिक व सामाजिक संबंधों में मधुरता एवं आपसी सामंजस्य',
    '[कार्यक्षेत्र स्थिरता] आजीविका, नौकरी एवं व्यापार में स्थिरता और उन्नति'
  ],
  whoCanConsider: [
    'Individuals with Vish Yoga (Shani-Chandra conjunction/aspect) in their horoscope.',
    'Devotees experiencing unexplained career stagnation, persistent hurdles, or financial strain.',
    'People troubled by emotional turbulence, severe mental stress, or sleep restlessness.',
    'Families seeking harmony, health protection, and peace of mind in Ujjain.'
  ],
  preparation: [
    'Devotees are advised to wear clean, traditional clothing.',
    'Keep your birth details (Date, Time, Place of Birth, Name, and Gotra) handy for Sankalp.',
    'Arrive at the designated Ujjain venue 15 minutes before the scheduled time.'
  ],
  hindiPreparation: [
    'शुद्ध पारंपरिक परिधान धारण करें।',
    'संकल्प हेतु यजमान का नाम, जन्म समय, जन्म स्थान एवं गोत्र विवरण तैयार रखें।',
    'निर्धारित समय से 15 मिनट पूर्व पूजा स्थल पर उपस्थित हों।'
  ],
  ritualDetails: 'Ganesh Pujan, Navgraha Sthapana, Shani-Chandra Shanti Japa, Specialized Vish Yog Havan Yajna, Gotra Sankalp, and Maha Aarti.',
  hindiRitualDetails: 'गणेश पूजन, नवग्रह स्थापना, शनि-चंद्र शांति जाप, विशेष विष योग शांति हवन, गोत्र संकल्प एवं महाआरती।',
  duration: 'Available on enquiry',
  hindiDuration: 'पूछताछ पर उपलब्ध',
  price: null,
  priceType: 'Custom / On Request' as const,
  featuredImage: '/assets/images/vish-yog-shanti-pooja-ujjain.jpg',
  gallery: [
    '/assets/images/vish-yog-shanti-pooja-ujjain.jpg',
    '/assets/images/vish_yog_shanti_pooja_ujjain.jpg'
  ],
  isFeatured: true,
  isPublished: true,
  faqs: [
    {
      question: 'What is Vish Yog Shanti Pooja?',
      answer: 'Vish Yog Shanti Pooja is a Vedic ritual performed to pacify Vish Yoga, an inauspicious astrological combination in a horoscope traditionally believed to cause obstacles, misfortune, and difficulties. It is intended to restore peace, health, and prosperity for the devotee and family.'
    },
    {
      question: 'What is Vish Yoga according to the catalogue?',
      answer: 'According to the catalogue, Vish Yoga is an inauspicious astrological combination formed by certain planetary positions in a horoscope, traditionally associated with obstacles, delays, and misfortune.'
    },
    {
      question: 'Who may consider Vish Yog Shanti Pooja?',
      answer: 'Devotees whose horoscopes indicate Vish Yoga or those experiencing persistent obstacles, emotional stress, and life delays may consider this ritual.'
    },
    {
      question: 'What are the traditional benefits?',
      answer: 'Source benefits include neutralization of Vish Yoga effects, removal of obstacles, protection from misfortune, health and well-being, peace and stability, prosperity and growth, family harmony, improved relationships, and career/business stability.'
    },
    {
      question: 'Can Vish Yog Shanti Pooja help with obstacles?',
      answer: 'According to traditional Vedic belief, the ritual is specifically performed to pray for the dissolution of persistent obstacles and the restoration of harmony and prosperity.'
    },
    {
      question: 'How can I book the pooja?',
      answer: 'Contact Aastha Sey Raasta Seva via website enquiry, direct phone call, or WhatsApp to receive guidance and finalize your booking arrangements.'
    },
    {
      question: 'What is the price of Vish Yog Shanti Pooja?',
      answer: 'Pooja requirements and arrangements vary depending on individual needs. Contact Aastha Sey Raasta Seva to understand available arrangements and current pricing.'
    }
  ],
  internalLinks: [
    { anchor: 'Nakshatra Shanti Pooja', link: '/pooja/nakshatra-shanti-pooja-ujjain', reason: 'Vedic birth star Shanti service.' },
    { anchor: 'Navgraha Shanti Pooja', link: '/pooja/navgraha-shanti-pooja-ujjain', reason: 'Nine planetary peace ritual.' },
    { anchor: 'Mool Shanti Pooja', link: '/pooja/mool-shanti-pooja-ujjain', reason: 'Mool Nakshatra Shanti ritual.' },
    { anchor: 'Kaal Sarp Dosh Pooja', link: '/pooja/kaal-sarp-dosh-shanti-ujjain', reason: 'Planetary node dosh remedy.' }
  ],
  imageSeo: {
    featuredImageIdea: 'Vedic Pandits in saffron robes performing sacred havan fire ritual for Vish Yog Shanti with horoscope chart in Ujjain.',
    alt: 'Vish Yog Shanti Pooja in Ujjain Vedic Anushthan with Pandits and Sacred Havan',
    title: 'Vish Yog Shanti Pooja Ujjain — Aastha Sey Raasta Seva',
    filename: 'vish-yog-shanti-pooja-ujjain.jpg'
  },
  schemaTypes: ['Service', 'FAQPage', 'BreadcrumbList', 'LocalBusiness'],
  qualityScore: 99,
  sortOrder: 12,
  createdAt: '2026-08-01T10:00:00Z',
  updatedAt: '2026-09-02T20:00:00Z'
};

const nakshatraShantiPooja = {
  id: 'pooja-nakshatra-shanti-pooja-ujjain',
  name: 'Nakshatra Shanti Pooja in Ujjain',
  hindiName: 'नक्षत्र शांति पूजा (जन्म नक्षत्र दोष शांति अनुष्ठान)',
  slug: 'nakshatra-shanti-pooja-ujjain',
  urlSlug: '/pooja/nakshatra-shanti-pooja-ujjain',
  categoryId: 'cat-dosh',
  categoryName: 'Dosh Shanti & Special Poojas',
  hindiCategoryName: 'दोष शांति एवं विशेष पूजा',
  pageType: 'Pooja / Dosh Shanti',
  primaryKeyword: 'nakshatra shanti pooja',
  focusKeyword: 'nakshatra shanti pooja in ujjain',
  secondaryKeywords: [
    'nakshatra shanti pooja ujjain',
    'nakshatra dosh shanti pooja',
    'birth nakshatra shanti pooja',
    'nakshatra pooja booking'
  ],
  searchIntent: 'Transactional & Informational (Devotees seeking authentic Vedic Nakshatra Shanti ritual in Ujjain for birth star pacification, health, and prosperity)',
  seoTitle: 'Nakshatra Shanti Pooja in Ujjain | Aastha Sey Raasta Seva',
  metaDescription: 'Book authentic Nakshatra Shanti Pooja in Ujjain to pacify unfavorable birth star influences. Experienced Vedic Pandits, complete arrangements, health & prosperity.',
  h1: 'Nakshatra Shanti Pooja — Vedic Birth Star Shanti in Ujjain',
  quickAnswer: 'Nakshatra Shanti Pooja is a sacred Vedic ritual performed to pacify the negative or unfavorable influences of one\'s birth star (Janma Nakshatra) or afflicted planetary constellations. According to Vedic astrology, unfavorable Nakshatra positions can create obstacles and doshas in life. This ritual is conducted by qualified pandits to neutralize malefic effects and invoke divine blessings for health, peace, family harmony, and overall well-being.',
  shortDescription: 'Nakshatra Shanti Pooja is a Vedic ritual performed to pacify unfavorable or malefic birth star influences, invoking divine blessings for health, peace, prosperity, and obstacle removal.',
  description: `Nakshatra Shanti Pooja is a sacred Vedic ritual performed to pacify negative or malefic effects of one's birth star (Nakshatra). In Vedic astrology, the 27 Nakshatras exert a profound influence on an individual's destiny, personality, and life journey. According to traditional belief, when an individual is born under an unfavorable Nakshatra or when a birth star is afflicted by malefic planetary transits, it may be associated with obstacles, doshas, or difficulties in life.

The Nakshatra Shanti Pooja is performed to neutralize unfavorable Nakshatra influences and to invoke divine blessings for health, peace, and overall well-being. By conducting specific Vedic invocations to the ruling deity of the Nakshatra, devotees pray for the removal of hindrances and the restoration of auspiciousness.

At Aastha Sey Raasta Seva, we provide complete, transparent arrangements for Nakshatra Shanti Pooja in the sacred pilgrimage city of Ujjain. The ritual is performed by experienced and Vedic-qualified pandits following authentic scriptural traditions.

## About Nakshatra Shanti Pooja
Nakshatra Shanti Pooja is a comprehensive Vedic anushthan dedicated to pacifying the cosmic energies of one's birth constellation. Each of the 27 Nakshatras is governed by a presiding deity and planetary lord.

During the ritual, learned Brahmins recite the specific Nakshatra Gayatri and Suktam, perform Gotra Sankalp, establish consecrated Kalash vessels, and offer sacred oblations into the holy Havan fire. These prayers are intended to harmonize the subtle astral influences affecting the individual and bestow long-term spiritual and material blessings.

## Why Nakshatra Shanti Pooja Is Performed
Devotees traditionally arrange Nakshatra Shanti Pooja for several core reasons:
- **Pacification of Malefic Nakshatra Influences**: Performed to neutralize the negative or unfavorable effects of one's birth star.
- **Removal of Obstacles**: Intended to clear recurrent blockages affecting personal, educational, and professional growth.
- **Health & General Well-Being**: Invokes divine grace for physical vitality, mental clarity, and longevity.
- **Family Harmony**: Traditionally believed to reduce friction and nurture peace and understanding among family members.
- **Career & Business Stability**: Performed to overcome setbacks in trade, enterprise, or employment.
- **Protection from Misfortune**: Traditionally associated with spiritual protection against adverse astrological periods.

## Who May Consider Nakshatra Shanti Pooja
- Individuals advised by an astrologer regarding unfavorable or afflicted birth Nakshatra positions.
- People experiencing persistent hurdles, delays, or lack of progress in key life endeavors.
- Devotees wishing to pray for family harmony, physical health, and household stability.
- Devotees visiting Ujjain who seek an authentic, Vedic-qualified Nakshatra Shanti Anushthan.

*Disclaimer: Astrological suitability depends on an individual's birth chart and traditional guidance. Consult a qualified astrologer for personalized advice.*`,
  templeName: 'Sacred Temples & Teerth Kshetra in Ujjain',
  location: 'Ujjain, Madhya Pradesh',
  city: 'Ujjain',
  state: 'Madhya Pradesh',
  country: 'India',
  whatWeOffer: [
    'We provide complete arrangements for Nakshatra Shanti Pooja Anushthan with devotion, authenticity and convenience for devotees.',
    'The ritual is performed by experienced and Vedic-qualified pandits.',
    'Provision of consecrated Nakshatra samagri, herbs, Navgraha wood, and sacred offerings.',
    'Individualized Name, Gotra & Janma Nakshatra Sankalp with dedicated coordination.'
  ],
  hindiWhatWeOffer: [
    'श्रद्धा, प्रामाणिकता और सुविधा के साथ संपूर्ण नक्षत्र शांति पूजा अनुष्ठान व्यवस्था',
    'अनुभवी एवं वैदिक-विद्वान ब्राह्मणों द्वारा विधिवत मंत्र जाप एवं हवन',
    'नक्षत्र मंडल शांति हेतु शुद्ध सात्विक पूजन सामग्री',
    'व्यक्तिगत नाम, गोत्र एवं जन्म नक्षत्र संकल्प'
  ],
  benefits: [
    'Neutralization of Malefic Nakshatra Effects: Traditionally performed to pacify unfavorable birth star influences and neutralize astrological doshas.',
    'Removal of Obstacles: Believed to dissolve recurrent blockages and delays in personal, educational, and professional endeavors.',
    'Health & Holistic Well-Being: Invokes divine blessings for physical strength, mental clarity, balanced energy, and long-term health.',
    'Prosperity & Auspicious Growth: Associated with attracting auspicious opportunities, material stability, and steady household progress.',
    'Family Harmony & Peace: Traditionally believed to resolve domestic friction, promote understanding among relatives, and nurture peaceful home life.',
    'Career & Business Stability: Performed to support professional growth, business consistency, and overcoming workplace challenges.',
    'Protection from Misfortune: Traditionally believed to provide spiritual shield against sudden adversities, negative planetary transits, and distress.'
  ],
  hindiBenefits: [
    '[नक्षत्र शांति] जन्म नक्षत्र के प्रतिकूल अथवा अशुभ प्रभावों का शास्त्रोक्त शमन',
    '[बाधा निवारण] शिक्षा, आजीविका एवं व्यक्तिगत कार्यों में आने वाली रुकावटों का निवारण',
    '[स्वास्थ्य लाभ] शारीरिक स्वास्थ्य, मानसिक शांति एवं दीर्घायु का ईश्वरीय आशीर्वाद',
    '[समृद्धि] जीवन में सकारात्मक अवसरों का आगमन, स्थिरता एवं आर्थिक समृद्धि',
    '[पारिवारिक सद्भाव] पारिवारिक मतभेद निवारण एवं घर में शांति व प्रेम की वृद्धि',
    '[व्यापारिक स्थिरता] व्यवसाय एवं नौकरी में निरंतरता व प्रगति',
    '[सुरक्षा] अप्रत्याशित संकटों एवं अशुभ गोचर प्रभावों से आध्यात्मिक सुरक्षा'
  ],
  whoCanConsider: [
    'Individuals with unfavorable, afflicted, or debited Janma Nakshatra in their horoscope.',
    'Devotees facing recurring obstacles or unexplained hurdles in education or career.',
    'Families praying for overall peace, good health, and domestic stability.',
    'Devotees seeking an authentic Vedic birth-star anushthan in the holy kshetra of Ujjain.'
  ],
  preparation: [
    'Wear clean, traditional clothing suitable for Vedic ritual participation.',
    'Keep your exact Janma Nakshatra, Gotra, and birth details ready for Sankalp.',
    'Reach the Ujjain venue 15 minutes before the scheduled auspicious time.'
  ],
  hindiPreparation: [
    'यजमान शुद्ध एवं सात्विक वस्त्र धारण करें।',
    'संकल्प हेतु जन्म नक्षत्र, चरण, गोत्र एवं नाम विवरण तैयार रखें।',
    'निर्धारित मुहूर्त से 15 मिनट पूर्व स्थल पर उपस्थित हों।'
  ],
  ritualDetails: 'Ganesh Pujan, 27 Nakshatra Mandala Sthapana, Nakshatra Sukta & Gayatri Japa, Havan Yajna with specific Samidha, Gotra Sankalp, and Ashirvachan.',
  hindiRitualDetails: 'गणेश पूजन, 27 नक्षत्र मंडल स्थापना, नक्षत्र सूक्त एवं गायत्री मंत्र जाप, विशिष्ट समिधा से हवन, गोत्र संकल्प एवं वैदिक आशीर्वाद।',
  duration: 'Available on enquiry',
  hindiDuration: 'पूछताछ पर उपलब्ध',
  price: null,
  priceType: 'Custom / On Request' as const,
  featuredImage: '/assets/images/nakshatra-shanti-pooja-ujjain.jpg',
  gallery: [
    '/assets/images/nakshatra-shanti-pooja-ujjain.jpg',
    '/assets/images/nakshatra_shanti_pooja_ujjain.jpg'
  ],
  isFeatured: true,
  isPublished: true,
  faqs: [
    {
      question: 'What is Nakshatra Shanti Pooja?',
      answer: 'Nakshatra Shanti Pooja is a Vedic ritual performed to pacify negative or malefic effects of one\'s birth star (Nakshatra). According to the catalogue, unfavorable Nakshatra influences may be associated with obstacles or doshas, and this ritual is intended to invoke divine blessings for health, peace, and overall well-being.'
    },
    {
      question: 'What is the role of the birth Nakshatra?',
      answer: 'In Vedic astrology, the birth Nakshatra plays a vital role in determining subtle astral influences. An unfavorable or afflicted Nakshatra may cause obstacles in life, which this ritual seeks to neutralize.'
    },
    {
      question: 'Who may consider Nakshatra Shanti Pooja?',
      answer: 'Individuals who have unfavorable Nakshatra influences in their horoscope or are experiencing persistent life obstacles may consider this ritual.'
    },
    {
      question: 'What are its traditional benefits?',
      answer: 'Source benefits include neutralization of malefic Nakshatra effects, removal of obstacles, health and well-being, prosperity and growth, family harmony, career/business stability, and protection from misfortune.'
    },
    {
      question: 'Can Nakshatra-related concerns be discussed before booking?',
      answer: 'Yes, devotees can consult and share their birth chart or Nakshatra details with our coordination team prior to scheduling the pooja.'
    },
    {
      question: 'How can I arrange the pooja?',
      answer: 'You can easily arrange your pooja by submitting an enquiry on our website, calling our helpline, or contacting us directly on WhatsApp.'
    },
    {
      question: 'What is the price of Nakshatra Shanti Pooja?',
      answer: 'Pooja requirements and arrangements vary depending on individual needs. Contact Aastha Sey Raasta Seva to understand the available arrangements and current pricing.'
    }
  ],
  internalLinks: [
    { anchor: 'Mool Shanti Pooja', link: '/pooja/mool-shanti-pooja-ujjain', reason: 'Mool Nakshatra Shanti service.' },
    { anchor: 'Vish Yog Shanti Pooja', link: '/pooja/vish-yog-shanti-pooja-ujjain', reason: 'Planetary Vish Yoga remedy.' },
    { anchor: 'Navgraha Shanti Pooja', link: '/pooja/navgraha-shanti-pooja-ujjain', reason: 'Nine planetary peace ritual.' },
    { anchor: 'Rudrabhishek Pooja in Ujjain', link: '/pooja/rudrabhishek-pooja-ujjain', reason: 'Sacred Shiva abhishek.' }
  ],
  imageSeo: {
    featuredImageIdea: 'Vedic Brahmins chanting mantras around 27 Nakshatra mandala yantra and sacred fire in Ujjain temple courtyard.',
    alt: 'Nakshatra Shanti Pooja in Ujjain Vedic Janma Nakshatra Anushthan',
    title: 'Nakshatra Shanti Pooja Ujjain — Aastha Sey Raasta Seva',
    filename: 'nakshatra-shanti-pooja-ujjain.jpg'
  },
  schemaTypes: ['Service', 'FAQPage', 'BreadcrumbList', 'LocalBusiness'],
  qualityScore: 99,
  sortOrder: 13,
  createdAt: '2026-08-01T10:00:00Z',
  updatedAt: '2026-09-02T20:00:00Z'
};

async function updatePoojasInCodeAndDatabase() {
  const filePath = path.resolve('src/data/initialData.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if poojas already in initialData.ts
  const poojasToAdd = [moolShantiPooja, vishYogShantiPooja, nakshatraShantiPooja];
  
  for (const p of poojasToAdd) {
    if (!content.includes(`id: '${p.id}'`) && !content.includes(`"id": "${p.id}"`)) {
      const serialized = '\n  ' + JSON.stringify(p, null, 2).split('\n').join('\n  ') + ',';
      const marker = 'export const initialPoojas: PoojaService[] = [';
      const idx = content.indexOf(marker);
      if (idx !== -1) {
        content = content.slice(0, idx + marker.length) + serialized + content.slice(idx + marker.length);
        console.log(`Added ${p.name} to initialData.ts`);
      }
    } else {
      console.log(`${p.id} already present in initialData.ts`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Updated src/data/initialData.ts successfully');

  // Insert into MySQL Database
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Deergh',
    database: process.env.DB_NAME || 'aastha_db',
  });

  for (const p of poojasToAdd) {
    await conn.query(
      `INSERT INTO poojas (
        id, name, hindi_name, slug, category_id, category_name, hindi_category_name, page_type,
        primary_keyword, secondary_keywords_json, search_intent, seo_title, meta_description,
        url_slug, h1, quick_answer, short_description, hindi_short_description, description,
        hindi_description, temple_name, hindi_temple_name, location, hindi_location, city,
        hindi_city, price, duration, hindi_duration, samagri_included, prasad_home_delivery,
        live_video_available, vip_entry_pass, pandit_count, image, gallery_images_json,
        what_we_offer_json, benefits_json, hindi_benefits_json, who_can_consider_json,
        procedure_steps_json, hindi_procedure_steps_json, faqs_json, internal_links_json,
        image_seo_json, schema_types_json, quality_score, is_popular, is_published, meta_title,
        sort_order
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?
      ) ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        hindi_name = VALUES(hindi_name),
        slug = VALUES(slug),
        category_id = VALUES(category_id),
        category_name = VALUES(category_name),
        short_description = VALUES(short_description),
        description = VALUES(description),
        what_we_offer_json = VALUES(what_we_offer_json),
        benefits_json = VALUES(benefits_json),
        faqs_json = VALUES(faqs_json),
        quick_answer = VALUES(quick_answer),
        h1 = VALUES(h1),
        seo_title = VALUES(seo_title),
        meta_description = VALUES(meta_description),
        image = VALUES(image),
        is_published = 1,
        is_popular = 1`,
      [
        p.id,
        p.name,
        p.hindiName,
        p.slug,
        p.categoryId,
        p.categoryName,
        p.hindiCategoryName,
        p.pageType,
        p.primaryKeyword,
        JSON.stringify(p.secondaryKeywords || []),
        p.searchIntent,
        p.seoTitle,
        p.metaDescription,
        p.urlSlug,
        p.h1,
        p.quickAnswer,
        p.shortDescription,
        p.hindiShortDescription || '',
        p.description,
        p.hindiDescription || '',
        p.templeName,
        p.hindiTempleName || '',
        p.location,
        p.hindiLocation || '',
        p.city,
        p.hindiCity || '',
        p.price || 0,
        p.duration || 'Available on enquiry',
        p.hindiDuration || 'पूछताछ पर उपलब्ध',
        1, // samagri_included
        1, // prasad_home_delivery
        1, // live_video_available
        0, // vip_entry_pass
        2, // pandit_count
        p.featuredImage,
        JSON.stringify(p.gallery || []),
        JSON.stringify(p.whatWeOffer || []),
        JSON.stringify(p.benefits || []),
        JSON.stringify(p.hindiBenefits || []),
        JSON.stringify(p.whoCanConsider || []),
        JSON.stringify(p.preparation || []),
        JSON.stringify(p.hindiPreparation || []),
        JSON.stringify(p.faqs || []),
        JSON.stringify(p.internalLinks || []),
        JSON.stringify(p.imageSeo || {}),
        JSON.stringify(p.schemaTypes || []),
        p.qualityScore || 99,
        p.isFeatured ? 1 : 0,
        p.isPublished ? 1 : 0,
        p.seoTitle,
        p.sortOrder || 10
      ]
    );
    console.log(`✅ Seeded ${p.name} into MySQL poojas table`);
  }

  const [count] = await conn.query<any>('SELECT COUNT(*) as count FROM poojas');
  console.log(`Total poojas in MySQL: ${count[0].count}`);

  await conn.end();
}

updatePoojasInCodeAndDatabase().catch((err) => {
  console.error(err);
  process.exit(1);
});
