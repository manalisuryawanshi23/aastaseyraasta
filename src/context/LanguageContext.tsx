import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translateTextToHindi } from '../utils/translationDictionary';
import { POOJA_CONTENT_CATALOG, TOUR_CONTENT_CATALOG, DESTINATION_CONTENT_CATALOG, FAQ_CONTENT_CATALOG } from '../services/contentService';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
  localize: <T extends Record<string, any>>(
    item: T | null | undefined,
    field: keyof T,
    hindiField?: keyof T
  ) => any;
  translateText: (text: string | null | undefined) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Navbar
    'topbar.helpline': '24/7 Spiritual Enquiries & Pandit Booking:',
    'topbar.address': 'Mahakal Marg, Near Mahakaleshwar Temple, Ujjain',
    'nav.home': 'Home',
    'nav.pooja': 'Pooja Services',
    'nav.tours': 'Spiritual Tours',
    'nav.destinations': 'Destinations',
    'nav.about': 'About Us',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.book': 'Book / Enquire',
    'nav.search': 'Search',
    'nav.tagline_location': 'Mahakal Marg, Ujjain',
    'nav.admin': 'Admin CMS',
    'nav.saved': 'Saved Items',
    'nav.switch_lang': 'हिन्दी',

    // Language selector labels
    'lang.english': 'English',
    'lang.hindi': 'हिंदी (Hindi)',

    // Common Actions
    'action.book_now': 'Book a Pooja',
    'action.book_tour': 'Book Yatra',
    'action.enquire': 'Enquire Now',
    'action.view_details': 'View Vidhi Details',
    'action.view_itinerary': 'Explore Yatras',
    'action.explore': 'Explore Guide',
    'action.whatsapp': 'WhatsApp Chat',
    'action.call_us': 'Call Us',
    'action.search': 'Search Services',
    'action.all_featured': 'All Featured',
    'action.view_all_poojas': 'View All 15+ Poojas',
    'action.view_all_tours': 'Explore All Yatras',
    'action.view_all_destinations': 'Explore All Holy Shrines',
    'action.view_all_blogs': 'Read All Spiritual Blogs',
    'action.read_more': 'Read Full Guide',
    'action.back_to_poojas': 'Back to Pooja Directory',
    'action.back_to_tours': 'Back to Tour Directory',
    'action.back_to_destinations': 'Back to Destinations',
    'action.back_to_blogs': 'Back to Blog Articles',
    'action.clear_filters': 'Clear Search / Filter',
    'action.share': 'Share',
    'action.save': 'Save',
    'action.saved': 'Saved',

    // Hero Section
    'hero.badge': 'YOUR TRUSTED PARTNER FOR POOJA, DARSHAN & SPIRITUAL JOURNEYS',
    'hero.title_prefix': 'Begin Your Journey of Faith with',
    'hero.subtitle': 'From Vedic Poojas to Darshan and Spiritual Yatras, we help you plan every step of your journey.',
    'hero.search_placeholder': 'Search Rudrabhishek, Bhat Pooja, Char Dham Yatra...',
    'hero.search_button': 'Search',

    // Trust Badges
    'trust.pandits': 'Vedic Qualified Pandits',
    'trust.samagri': 'Complete Samagri Vidhi',
    'trust.sankalp': 'Gotra & Name Sankalp',
    'trust.transparency': '100% Transparent Services',
    'trust.verified': 'Verified Devotee Reviews',
    'trust.experience': 'Decades of Sacred Seva',

    // Home Section Headers
    'section.pooja_badge': 'Devotional Offerings',
    'section.pooja_title': 'Authentic Pooja Services in Ujjain',
    'section.pooja_sub': 'Conducted strictly according to Vedic scriptures by experienced Brahmins with pure satvik samagri and gotra sankalp.',
    'section.tour_badge': 'Sacred Pilgrimages',
    'section.tour_title': 'Spiritual Tours & Yatra Packages',
    'section.tour_sub': 'Thoughtfully organized private circuit tours across Ujjain, Omkareshwar, Baglamukhi Nalkheda, and major Himalayan Dham Yatras.',
    'section.dest_badge': 'Sacred Holy Cities',
    'section.dest_title': 'Explore Sacred Pilgrimage Shrines',
    'section.dest_sub': 'Discover temples, darshan guidelines, and local spiritual significance.',
    'section.how_badge': 'Simple & Transparent Process',
    'section.how_title': 'How Your Booking Works',
    'section.how_sub': 'From gotra sankalp to divine prasad distribution, we manage every step with devotion.',
    'section.testimonials_badge': 'Devotee Experiences',
    'section.testimonials_title': 'Blessed Words from Pilgrims',
    'section.testimonials_sub': 'Real experiences of devotees who entrusted their sacred rituals and journeys to our seva.',
    'section.faq_badge': 'Answers & Information',
    'section.faq_title': 'Frequently Asked Questions',
    'section.faq_sub': 'Common queries regarding temple timings, gotra sankalp, samagri, and yatra itineraries.',

    // FAQ Section Component
    'faq.badge': 'Spiritual Guidance & FAQs',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find direct answers regarding Vedic Vidhi, booking procedures, gotra sankalp, and tour arrangements.',
    'faq.all': 'All Questions',
    'faq.pooja': 'Pooja & Rituals',
    'faq.tour': 'Tours & Yatra',
    'faq.general': 'General & Booking',
    'faq.no_results': 'No questions found in this category.',
    'faq.ask_more': 'Have a specific query about Pooja or Travel?',
    'faq.ask_more_sub': 'Connect with our Pooja & Yatra Support Team on WhatsApp',
    'faq.whatsapp_btn': 'Ask on WhatsApp',

    // How It Works Steps
    'how.step1_title': 'Explore & Select Service',
    'how.step1_desc': 'Browse our detailed catalog of Poojas, Dosh Remedies, and Yatra circuits.',
    'how.step2_title': 'Provide Gotra & Date',
    'how.step2_desc': 'Submit your preferred date, devotee names, and gotra details via website form or WhatsApp.',
    'how.step3_title': 'Receive Confirmation',
    'how.step3_desc': 'Our Acharya coordinator confirms temple timing, priest allocation, and venue directions.',
    'how.step4_title': 'Experience Divine Ritual',
    'how.step4_desc': 'Participate in the ceremony with peace of mind. Complete samagri and prasad distribution provided.',

    // AEO Knowledge Section
    'aeo.badge': 'Search Engine & AI Direct Answer Knowledge Base',
    'aeo.title': 'Ujjain Temple Rituals & Pilgrimage Authority Guide',
    'aeo.sub': 'Direct answers to frequently searched questions about Ujjain Poojas, Mahakaleshwar Bhasma Aarti, Mangalnath Bhat Pooja, Kaal Sarp Dosh, and Himalayan Char Dham Yatras.',
    'aeo.q1': 'What is the significance of Ujjain for Vedic Poojas?',
    'aeo.a1': 'Ujjain (Avantika Puri) is located on the Tropic of Cancer and is recognized as the earth’s central meridian in ancient Vedic astrology (Surya Siddhanta). It houses Mahakaleshwar (one of 12 Jyotirlingas), Mangalnath (birthplace of Mars/Mangal), Angareshwar, and Siddhvat, making it the most potent site in India for Rudrabhishek, Bhat Pooja, and Dosh Shanti rituals.',
    'aeo.q2': 'Where is Kaal Sarp Dosh & Bhat Pooja performed?',
    'aeo.a2': 'Manglik Dosh & Bhat Pooja is performed exclusively at Mangalnath Temple or Angareshwar Temple in Ujjain. Kaal Sarp Dosh and Rahu-Ketu Shanti are performed at Ramghat on the banks of Shipra River or at Mahakaleshwar Kshetra by certified Vedic Karmakandi Pandits with individual Gotra Sankalp.',
    'aeo.q3': 'How to book authentic online/offline Poojas in Ujjain?',
    'aeo.a3': 'Through Aastha Sey Raasta Seva, devotees can book in-person rituals or Live HD Video Stream Poojas. Our team arranges all authentic samagri, temple permissions, pandit booking, and delivers sanctified Mahakal Prasadam with Bhasma directly to your doorstep.',
    'aeo.q4': 'What pilgrimage packages are offered by Aastha Sey Raasta?',
    'aeo.a4': 'We organize custom circuits including Ujjain 11-Shrine Spiritual Tour, Omkareshwar Jyotirlinga, Baglamukhi Temple Nalkheda, Pashupatinath Mandsaur, 84 Mahadev Yatra, Char Dham Yatra (Kedarnath, Badrinath, Gangotri, Yamunotri), and Himalayan treks like Kedarkantha and Kuari Pass.',

    // CTA Section
    'cta.title': 'Ready to Arrange Your Pooja or Pilgrimage?',
    'cta.sub': 'Reach out to our Ujjain team for authentic guidance, gotra sankalp reservations, and customized spiritual tour itineraries.',
    'cta.btn_book': 'Book / Enquire Now',
    'cta.btn_whatsapp': 'Connect on WhatsApp',

    // Card Badges & Details
    'card.duration': 'Duration',
    'card.location': 'Location',
    'card.places_covered': 'Places Covered',
    'card.custom_price': 'Custom / On Request',
    'card.starting_from': 'Starting From',
    'card.samagri_included': 'Vedic Samagri Included',
    'card.gotra_sankalp': 'Gotra Sankalp',
    'card.verified_pandit': 'Verified Vedic Pandit',
    'card.view_details': 'View Vidhi Details',
    'card.book': 'Book',
    'card.enquire': 'Enquire',

    // Pooja Details Page
    'pooja.what_we_offer': 'What We Offer in this Ritual',
    'pooja.benefits': 'Spiritual Significance & Benefits',
    'pooja.preparation': 'Devotee Preparation & What to Bring',
    'pooja.vidhi_details': 'Step-by-Step Ritual Vidhi & Details',
    'pooja.temple_info': 'Sacred Venue / Temple Information',
    'pooja.related_title': 'Related Sacred Poojas',
    'pooja.sidebar_card_title': 'Book this Vedic Ritual',
    'pooja.sidebar_card_sub': 'Direct Pandit allotment & Gotra Sankalp reservation in Ujjain.',
    'pooja.call_direct': 'Call Acharya Directly',
    'pooja.prasad_delivery': 'Sanctified Prasad & Bhasma Home Delivery Available',

    // Tour Details Page
    'tour.overview': 'Yatra Overview & Highlights',
    'tour.itinerary_title': 'Detailed Day-Wise Yatra Itinerary',
    'tour.places_covered_title': 'Major Destinations & Shrines Covered',
    'tour.inclusions': "What's Included in Package",
    'tour.exclusions': "What's Excluded",
    'tour.travel_info': 'Travel & Vehicle Details',
    'tour.stay_info': 'Hotel Accommodation & Meals',
    'tour.sidebar_title': 'Request Yatra Quotation',
    'tour.sidebar_sub': 'Personalized vehicle, hotel bookings & Pandit darshan assistance.',
    'tour.related_title': 'Explore Other Sacred Yatras',

    // Destination Details Page
    'dest.overview': 'Sacred Significance & History',
    'dest.must_visit': 'Must-Visit Temples & Shrines',
    'dest.how_to_reach': 'How to Reach & Travel Guidance',
    'dest.related_poojas': 'Poojas Conducted at this Destination',
    'dest.related_tours': 'Yatra Packages Covering this Destination',

    // Booking Modal
    'modal.title': 'Book Authentic Pooja & Yatra',
    'modal.subtitle': 'Fill details below for personalized gotra sankalp & ritual arrangements',
    'form.service_type': 'Service Category',
    'form.service_name': 'Pooja / Yatra Name',
    'form.name': 'Your Full Name',
    'form.name_placeholder': 'Enter your full devotee name',
    'form.phone': 'WhatsApp / Mobile Number',
    'form.phone_placeholder': 'e.g. 9111099799',
    'form.email': 'Email Address (Optional)',
    'form.date': 'Preferred Date',
    'form.gotra': 'Devotee Gotra (Optional)',
    'form.gotra_placeholder': 'e.g. Kashyap, Bharadwaj, Vashishta',
    'form.members': 'Number of Devotees / Travelers',
    'form.mode': 'Ritual Participation Mode',
    'form.mode_in_person': 'In-Person at Ujjain Sanctum',
    'form.mode_online': 'Live Video Stream with Prasad Home Delivery',
    'form.notes': 'Special Notes / Sankalp Desires',
    'form.notes_placeholder': 'Any specific rituals, health intentions, or family members to include in sankalp...',
    'form.submit': 'Confirm & Request Booking',
    'form.submitting': 'Sending Request...',
    'form.success_title': 'Har Har Mahadev! Booking Request Received',
    'form.success_desc': 'Our Acharya coordinator will connect with you on WhatsApp within 15 minutes to confirm timings & gotra details.',

    // Search Modal
    'search.title': 'Search Sacred Poojas, Yatras & Shrines',
    'search.placeholder': 'Type ritual name, temple, dosh remedy, or pilgrimage destination...',
    'search.quick_filters': 'Popular Searches:',
    'search.no_results': 'No matching poojas or yatras found. Please try another search keyword or contact us on WhatsApp.',

    // Footer
    'footer.about_title': 'About Aastha Sey Raasta Seva',
    'footer.about_desc': 'Aastha Sey Raasta Seva is dedicated to providing authentic Vedic rituals, certified Pandit arrangements, and guided spiritual pilgrimage tours across Ujjain, Omkareshwar, Nalkheda, and major Himalayan Dham Yatras with complete devotion, transparency, and scripture compliance.',
    'footer.quick_links': 'Quick Navigation',
    'footer.pooja_services': 'Popular Vedic Poojas',
    'footer.yatra_circuits': 'Sacred Yatra Circuits',
    'footer.destinations': 'Holy Pilgrimage Hubs',
    'footer.contact_info': 'Official Contact & Seva Kendra',
    'footer.address_label': 'Mahakal Marg, Near Mahakaleshwar Mandir, Ujjain, Madhya Pradesh - 456001',
    'footer.copyright': 'All Rights Reserved. Blessed with devotion in Sacred Avantika Puri, Ujjain.',
    'footer.disclaimer': 'Authentic Vedic Seva Kendra • Certified Brahmins • Transparent Dakshina & Pricing.',
  },
  hi: {
    // Top Bar & Navbar
    'topbar.helpline': '24/7 आध्यात्मिक मार्गदर्शन एवं पंडित बुकिंग:',
    'topbar.address': 'महाकाल मार्ग, महाकालेश्वर मंदिर के समीप, उज्जैन',
    'nav.home': 'मुख्य पृष्ठ',
    'nav.pooja': 'पूजा सेवाएं',
    'nav.tours': 'आध्यात्मिक यात्राएं',
    'nav.destinations': 'तीर्थ स्थल',
    'nav.about': 'हमारे बारे में',
    'nav.blog': 'ब्लॉग',
    'nav.contact': 'संपर्क करें',
    'nav.book': 'पूजा / यात्रा बुक करें',
    'nav.search': 'खोजें',
    'nav.tagline_location': 'महाकाल मार्ग, उज्जैन',
    'nav.admin': 'प्रबंधक क्षेत्र',
    'nav.saved': 'सहेजे गए',
    'nav.switch_lang': 'English',

    // Language selector labels
    'lang.english': 'English',
    'lang.hindi': 'हिंदी (Hindi)',

    // Common Actions
    'action.book_now': 'पूजा बुक करें',
    'action.book_tour': 'यात्रा बुक करें',
    'action.enquire': 'पूछताछ करें',
    'action.view_details': 'विधि विवरण देखें',
    'action.view_itinerary': 'यात्राएं देखें',
    'action.explore': 'मार्गदर्शिका देखें',
    'action.whatsapp': 'व्हाट्सएप चैट',
    'action.call_us': 'कॉल करें',
    'action.search': 'सेवाएं खोजें',
    'action.all_featured': 'सभी प्रमुख सेवाएं',
    'action.view_all_poojas': 'सभी 15+ पूजाएं देखें',
    'action.view_all_tours': 'सभी यात्राएं देखें',
    'action.view_all_destinations': 'सभी तीर्थ स्थल देखें',
    'action.view_all_blogs': 'सभी आध्यात्मिक लेख पढ़ें',
    'action.read_more': 'पूरा लेख पढ़ें',
    'action.back_to_poojas': 'पूजा सूची पर वापस जाएं',
    'action.back_to_tours': 'यात्रा सूची पर वापस जाएं',
    'action.back_to_destinations': 'तीर्थ सूची पर वापस जाएं',
    'action.back_to_blogs': 'ब्लॉग सूची पर वापस जाएं',
    'action.clear_filters': 'खोज / फ़िल्टर हटाएं',
    'action.share': 'साझा करें',
    'action.save': 'सहेजें',
    'action.saved': 'सहेजा गया',

    // Hero Section
    'hero.badge': 'उज्जैन एवं प्रमुख तीर्थों में अधिकृत आध्यात्मिक सेवा',
    'hero.title_prefix': 'अपनी पावन आध्यात्मिक यात्रा आरंभ करें',
    'hero.subtitle': 'पवित्र उज्जैन में अनुभवी वैदिक ब्राह्मणों द्वारा प्रामाणिक रुद्राभिषेक, भात पूजा, महामृत्युंजय जाप एवं सुगम तीर्थ यात्राएं।',
    'hero.search_placeholder': 'रुद्राभिषेक, भात पूजा, चार धाम यात्रा खोजें...',
    'hero.search_button': 'खोजें',

    // Trust Badges
    'trust.pandits': 'वेदपाठी प्रामाणिक पंडित',
    'trust.samagri': 'संपूर्ण सात्विक पूजन सामग्री',
    'trust.sankalp': 'व्यक्तिगत नाम व गोत्र संकल्प',
    'trust.transparency': '100% पारदर्शी एवं प्रामाणिक सेवा',
    'trust.verified': 'हजारों संतुष्ट श्रद्धालु',
    'trust.experience': 'दशकों की समर्पित सेवा',

    // Home Section Headers
    'section.pooja_badge': 'वैदिक पूजा एवं अनुष्ठान',
    'section.pooja_title': 'उज्जैन में प्रामाणिक पूजा सेवाएं',
    'section.pooja_sub': 'शास्त्रोक्त विधि-विधान, शुद्ध सात्विक सामग्री और वैदिक ब्राह्मणों द्वारा व्यक्तिगत गोत्र संकल्प के साथ संपन्न।',
    'section.tour_badge': 'पवित्र तीर्थ यात्राएं',
    'section.tour_title': 'आध्यात्मिक यात्रा एवं दर्शन पैकेज',
    'section.tour_sub': 'उज्जैन, ओंकारेश्वर, मां बगलामुखी नलखेड़ा और हिमालयी चार धाम यात्रा के लिए सुव्यवस्थित निजी यात्राएं।',
    'section.dest_badge': 'पवित्र तीर्थ क्षेत्र',
    'section.dest_title': 'पवित्र तीर्थ स्थलों के दर्शन करें',
    'section.dest_sub': 'प्रमुख मंदिरों, दर्शन नियमों और आध्यात्मिक महत्व की विस्तृत जानकारी प्राप्त करें।',
    'section.how_badge': 'सरल एवं पारदर्शी प्रक्रिया',
    'section.how_title': 'पूजा एवं यात्रा बुकिंग प्रक्रिया',
    'section.how_sub': 'गोत्र संकल्प से लेकर महाकाल भस्म व प्रसाद वितरण तक, हम हर चरण श्रद्धापूर्वक प्रबंधित करते हैं।',
    'section.testimonials_badge': 'श्रद्धालुओं के अनुभव',
    'section.testimonials_title': 'भक्तों के पावन अनुभव एवं विचार',
    'section.testimonials_sub': 'जानिए उन श्रद्धालुओं के वास्तविक अनुभव जिन्होंने हमारी सेवा पर पूर्ण विश्वास व्यक्त किया।',
    'section.faq_badge': 'जिज्ञासा एवं समाधान',
    'section.faq_title': 'अक्सर पूछे जाने वाले प्रश्न',
    'section.faq_sub': 'मंदिर दर्शन समय, गोत्र संकल्प, पूजन सामग्री और यात्रा कार्यक्रम से जुड़े आवश्यक उत्तर।',

    // FAQ Section Component
    'faq.badge': 'आध्यात्मिक मार्गदर्शन एवं प्रश्नोत्तरी',
    'faq.title': 'अक्सर पूछे जाने वाले प्रश्न एवं उत्तर',
    'faq.subtitle': 'वैदिक विधि, पूजा एवं यात्रा बुकिंग प्रक्रिया, गोत्र संकल्प और मंदिर व्यवस्थाओं से जुड़े आवश्यक समाधान।',
    'faq.all': 'सभी प्रश्न',
    'faq.pooja': 'पूजा एवं अनुष्ठान',
    'faq.tour': 'यात्रा एवं दर्शन',
    'faq.general': 'सामान्य एवं बुकिंग',
    'faq.no_results': 'इस श्रेणी में कोई प्रश्न उपलब्ध नहीं है।',
    'faq.ask_more': 'क्या आपके पास पूजा या यात्रा के बारे में कोई विशिष्ट प्रश्न है?',
    'faq.ask_more_sub': 'व्हाट्सएप पर हमारी पूजा और यात्रा सहायता टीम से जुड़ें',
    'faq.whatsapp_btn': 'व्हाट्सएप पर पूछें',

    // How It Works Steps
    'how.step1_title': 'पूजा या यात्रा का चयन करें',
    'how.step1_desc': 'हमारी विस्तृत सूची में से अपनी इच्छित पूजा, दोष निवारण या तीर्थ यात्रा का चयन करें।',
    'how.step2_title': 'गोत्र एवं तिथि का विवरण दें',
    'how.step2_desc': 'वेबसाइट फॉर्म या व्हाट्सएप के माध्यम से अपनी पसंदीदा तिथि, यजमान का नाम व गोत्र भेजें।',
    'how.step3_title': 'पुष्टि एवं समय प्राप्त करें',
    'how.step3_desc': 'हमारे आचार्य समन्वयक मंदिर समय, पंडित आवंटन और स्थान का मार्गदर्शन साझा करेंगे।',
    'how.step4_title': 'दिव्य अनुष्ठान में भाग लें',
    'how.step4_desc': 'निश्चिंत होकर पूजन में सम्मिलित हों। संपूर्ण पूजन सामग्री एवं प्रसाद वितरण उपलब्ध कराया जाएगा।',

    // AEO Knowledge Section
    'aeo.badge': 'सर्च इंजन एवं एआई डायरेक्ट आंसर गाइड',
    'aeo.title': 'उज्जैन मंदिर अनुष्ठान एवं तीर्थ यात्रा प्रामाणिक निर्देशिका',
    'aeo.sub': 'उज्जैन महाकालेश्वर भस्म आरती, मंगलनाथ भात पूजा, कालसर्प दोष और हिमालयी चार धाम यात्रा से जुड़े महत्वपूर्ण प्रश्नों के प्रत्यक्ष उत्तर।',
    'aeo.q1': 'वैदिक पूजाओं के लिए उज्जैन का क्या महत्व है?',
    'aeo.a1': 'उज्जैन (अवंतिका नगरी) कर्क रेखा पर स्थित है और प्राचीन वैदिक ज्योतिष (सूर्य सिद्धांत) के अनुसार इसे पृथ्वी का केंद्र माना गया है। यहां 12 ज्योतिर्लिंगों में से एक श्री महाकालेश्वर, मंगल ग्रह के जन्मदाता श्री मंगलनाथ, अंगारेश्वर और सिद्धवट स्थित हैं, जो इसे रुद्राभिषेक, भात पूजा और दोष निवारण के लिए भारत का सबसे प्रभावी तीर्थ बनाते हैं।',
    'aeo.q2': 'कालसर्प दोष और भात पूजा कहां संपन्न होती है?',
    'aeo.a2': 'मांगलिक दोष निवारण एवं भात पूजा विशेष रूप से उज्जैन के श्री मंगलनाथ मंदिर या अंगारेश्वर महादेव मंदिर में होती है। कालसर्प दोष और राहु-केतु शांति पूजा शिप्रा नदी के पावन रामघाट या महाकाल क्षेत्र में वेदपाठी कर्मकांडी पंडितों द्वारा व्यक्तिगत गोत्र संकल्प के साथ की जाती है।',
    'aeo.q3': 'उज्जैन में प्रत्यक्ष या ऑनलाइन पूजा कैसे बुक करें?',
    'aeo.a3': 'आस्था से रास्ता सेवा के माध्यम से श्रद्धालु व्यक्तिगत उपस्थिति या लाइव एचडी वीडियो स्ट्रीमिंग द्वारा पूजा बुक कर सकते हैं। हमारी टीम संपूर्ण पूजन सामग्री, मंदिर अनुमति, पंडित व्यवस्था और महाकाल भस्म सहित पावन प्रसाद आपके घर तक पहुंचाती है।',
    'aeo.q4': 'आस्था से रास्ता द्वारा कौन-कौन से यात्रा पैकेज उपलब्ध हैं?',
    'aeo.a4': 'हम उज्जैन 11-मंदिर दर्शन, ओंकारेश्वर ज्योतिर्लिंग, मां बगलामुखी नलखेड़ा, पशुपतिनाथ मंदसौर, 84 महादेव यात्रा, चार धाम यात्रा (केदारनाथ, बद्रीनाथ, गंगोत्री, यमुनोत्री) और केदारकांठा जैसे हिमालयी ट्रेक का संपूर्ण आयोजन करते हैं।',

    // CTA Section
    'cta.title': 'क्या आप पूजा या तीर्थ यात्रा का आयोजन करना चाहते हैं?',
    'cta.sub': 'प्रामाणिक मार्गदर्शन, गोत्र संकल्प आरक्षण और अनुकूलित तीर्थ यात्रा कार्यक्रम के लिए हमारी उज्जैन टीम से संपर्क करें।',
    'cta.btn_book': 'अभी बुक / पूछताछ करें',
    'cta.btn_whatsapp': 'व्हाट्सएप पर जुड़ें',

    // Card Badges & Details
    'card.duration': 'अवधि',
    'card.location': 'स्थान',
    'card.places_covered': 'शामिल स्थल',
    'card.custom_price': 'अनुकूलित / अनुरोध पर',
    'card.starting_from': 'प्रारंभिक मूल्य',
    'card.samagri_included': 'वैदिक सामग्री शामिल',
    'card.gotra_sankalp': 'गोत्र संकल्प सहित',
    'card.verified_pandit': 'वेदपाठी ब्राह्मण',
    'card.view_details': 'विधि विवरण देखें',
    'card.book': 'बुक करें',
    'card.enquire': 'पूछताछ करें',

    // Pooja Details Page
    'pooja.what_we_offer': 'इस अनुष्ठान में क्या शामिल है',
    'pooja.benefits': 'आध्यात्मिक महत्व एवं फल',
    'pooja.preparation': 'यजमान तैयारी एवं पूजन सामग्री निर्देश',
    'pooja.vidhi_details': 'क्रमबद्ध शास्त्रोक्त विधि एवं नियम',
    'pooja.temple_info': 'पावन मंदिर एवं स्थल जानकारी',
    'pooja.related_title': 'संबंधित अन्य वैदिक पूजाएं',
    'pooja.sidebar_card_title': 'इस वैदिक पूजा को बुक करें',
    'pooja.sidebar_card_sub': 'उज्जैन में प्रत्यक्ष पंडित आवंटन एवं गोत्र संकल्प आरक्षण।',
    'pooja.call_direct': 'आचार्य जी से सीधे बात करें',
    'pooja.prasad_delivery': 'महाकाल भस्म एवं अभिमंत्रित प्रसाद घर डिलीवरी उपलब्ध',

    // Tour Details Page
    'tour.overview': 'यात्रा विवरण एवं मुख्य आकर्षण',
    'tour.itinerary_title': 'दिन-वार विस्तृत यात्रा कार्यक्रम',
    'tour.places_covered_title': 'प्रमुख तीर्थ स्थल एवं मंदिर',
    'tour.inclusions': 'पैकेज में क्या शामिल है',
    'tour.exclusions': 'पैकेज में क्या शामिल नहीं है',
    'tour.travel_info': 'वाहन एवं यात्रा व्यवस्था',
    'tour.stay_info': 'होटल आवास एवं सात्विक भोजन',
    'tour.sidebar_title': 'यात्रा पैकेज की जानकारी प्राप्त करें',
    'tour.sidebar_sub': 'निजी वाहन, होटल व्यवस्था एवं पंडित दर्शन सहायता।',
    'tour.related_title': 'अन्य पावन तीर्थ यात्राएं देखें',

    // Destination Details Page
    'dest.overview': 'पावन महत्व एवं ऐतिहासिक पृष्ठभूमि',
    'dest.must_visit': 'प्रमुख दर्शनीय मंदिर एवं तीर्थ',
    'dest.how_to_reach': 'कैसे पहुंचे एवं यात्रा निर्देश',
    'dest.related_poojas': 'इस तीर्थ पर संपन्न होने वाली पूजाएं',
    'dest.related_tours': 'इस तीर्थ को शामिल करने वाले यात्रा पैकेज',

    // Booking Modal
    'modal.title': 'प्रामाणिक पूजा एवं यात्रा बुक करें',
    'modal.subtitle': 'व्यक्तिगत गोत्र संकल्प एवं अनुष्ठान व्यवस्था हेतु विवरण भरें',
    'form.service_type': 'सेवा प्रकार',
    'form.service_name': 'पूजा / यात्रा का नाम',
    'form.name': 'आपका पूरा नाम',
    'form.name_placeholder': 'अपना नाम दर्ज करें',
    'form.phone': 'व्हाट्सएप / मोबाइल नंबर',
    'form.phone_placeholder': 'उदा. 9111099799',
    'form.email': 'ईमेल पता (वैकल्पिक)',
    'form.date': 'वांछित तिथि',
    'form.gotra': 'यजमान का गोत्र (वैकल्पिक)',
    'form.gotra_placeholder': 'उदा. कश्यप, भारद्वाज, वशिष्ठ',
    'form.members': 'श्रद्धालुओं / यात्रियों की संख्या',
    'form.mode': 'पूजा में सहभागिता का प्रकार',
    'form.mode_in_person': 'उज्जैन तीर्थ में प्रत्यक्ष उपस्थिति',
    'form.mode_online': 'लाइव वीडियो स्ट्रीमिंग एवं प्रसाद घर डिलीवरी',
    'form.notes': 'विशेष संकल्प / आवश्यकताएं',
    'form.notes_placeholder': 'कोई विशेष मनोरथ, स्वास्थ्य कामना या संकल्प में शामिल किए जाने वाले परिजनों के नाम...',
    'form.submit': 'बुकिंग अनुरोध भेजें',
    'form.submitting': 'अनुरोध भेजा जा रहा है...',
    'form.success_title': 'हर हर महादेव! आपका बुकिंग अनुरोध प्राप्त हो गया है',
    'form.success_desc': 'हमारे आचार्य समन्वयक समय एवं गोत्र विवरण की पुष्टि के लिए 15 मिनट के भीतर आपसे व्हाट्सएप पर संपर्क करेंगे।',

    // Search Modal
    'search.title': 'पूजा, यात्रा एवं तीर्थ स्थल खोजें',
    'search.placeholder': 'पूजा का नाम, मंदिर, दोष निवारण या तीर्थ स्थल लिखें...',
    'search.quick_filters': 'लोकप्रिय खोजें:',
    'search.no_results': 'कोई मेल नहीं मिला। कृपया अन्य शब्द खोजें या व्हाट्सएप पर संपर्क करें।',

    // Footer
    'footer.about_title': 'आस्था से रास्ता सेवा के बारे में',
    'footer.about_desc': 'आस्था से रास्ता सेवा पवित्र उज्जैन, ओंकारेश्वर, मां बगलामुखी नलखेड़ा और हिमालयी चार धाम यात्राओं के लिए शास्त्रोक्त वैदिक पूजन, प्रामाणिक पंडित व्यवस्था और सुगम आध्यात्मिक तीर्थ यात्राएं पूरी श्रद्धा और पारदर्शिता के साथ आयोजित करती है।',
    'footer.quick_links': 'त्वरित लिंक',
    'footer.pooja_services': 'प्रमुख वैदिक पूजाएं',
    'footer.yatra_circuits': 'पावन तीर्थ यात्राएं',
    'footer.destinations': 'पवित्र तीर्थ स्थल',
    'footer.contact_info': 'अधिकृत संपर्क एवं सेवा केंद्र',
    'footer.address_label': 'महाकाल मार्ग, श्री महाकालेश्वर मंदिर के समीप, उज्जैन, मध्य प्रदेश - 456001',
    'footer.copyright': 'सर्वाधिकार सुरक्षित। पावन अवंतिका नगरी, उज्जैन से समर्पित।',
    'footer.disclaimer': 'प्रामाणिक वैदिक सेवा केंद्र • वेदपाठी ब्राह्मण • पारदर्शी दक्षिणा व्यवस्था।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aastha_lang');
      if (saved === 'hi' || saved === 'en') return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aastha_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    return translations[language]?.[key] || defaultText || translations['en']?.[key] || key;
  };

  const translateText = (text: string | null | undefined): string => {
    if (!text) return '';
    if (language === 'hi') {
      return translateTextToHindi(text);
    }
    return text;
  };

  /**
   * Universal Localizer:
   * Returns the Hindi version of a field if language === 'hi' and it exists,
   * otherwise translates content dynamically or cleanly falls back to English.
   */
  const localize = <T extends Record<string, any>>(
    item: T | null | undefined,
    field: keyof T,
    hindiField?: keyof T
  ): any => {
    if (!item) return '';

    if (language === 'hi') {
      // 1. If explicit hindiField is provided and has value
      if (hindiField && item[hindiField] !== undefined && item[hindiField] !== null && item[hindiField] !== '') {
        return item[hindiField];
      }

      // 2. Auto-check capitalized hindiFieldName e.g. hindiName, hindiDescription, hindiShortDescription
      const fieldStr = String(field);
      const autoHindiKey = ('hindi' + fieldStr.charAt(0).toUpperCase() + fieldStr.slice(1)) as keyof T;
      if (item[autoHindiKey] !== undefined && item[autoHindiKey] !== null && item[autoHindiKey] !== '') {
        return item[autoHindiKey];
      }

      // 2.5. Check Content Catalog if item has an ID or Slug (e.g. Poojas, Tours, Destinations)
      const itemId = (item as any)?.id || (item as any)?.slug;
      if (itemId) {
        const poojaEntry = POOJA_CONTENT_CATALOG[itemId] || Object.values(POOJA_CONTENT_CATALOG).find(p => p.slug === itemId || p.id === itemId);
        if (poojaEntry && (poojaEntry as any)[fieldStr]?.hi) {
          return (poojaEntry as any)[fieldStr].hi;
        }
        const tourEntry = TOUR_CONTENT_CATALOG[itemId] || Object.values(TOUR_CONTENT_CATALOG).find(t => t.slug === itemId || t.id === itemId);
        if (tourEntry && (tourEntry as any)[fieldStr]?.hi) {
          return (tourEntry as any)[fieldStr].hi;
        }
        const destEntry = DESTINATION_CONTENT_CATALOG[itemId] || Object.values(DESTINATION_CONTENT_CATALOG).find(d => d.slug === itemId || d.id === itemId);
        if (destEntry && (destEntry as any)[fieldStr]?.hi) {
          return (destEntry as any)[fieldStr].hi;
        }
        const faqEntry = FAQ_CONTENT_CATALOG[itemId] || Object.values(FAQ_CONTENT_CATALOG).find(f => f.id === itemId);
        if (faqEntry && (faqEntry as any)[fieldStr]?.hi) {
          return (faqEntry as any)[fieldStr].hi;
        }
      }

      // 3. Handle arrays of strings or objects
      const originalValue = item[field];
      if (Array.isArray(originalValue)) {
        if (originalValue.length === 0) return [];
        if (typeof originalValue[0] === 'string') {
          return originalValue.map((str) => translateTextToHindi(str));
        }
        if (typeof originalValue[0] === 'object' && originalValue[0] !== null) {
          return originalValue.map((subItem) => {
            const localizedSubItem = { ...subItem };
            for (const k in subItem) {
              const capK = 'hindi' + k.charAt(0).toUpperCase() + k.slice(1);
              if (subItem[capK]) {
                localizedSubItem[k] = subItem[capK];
              } else if (typeof subItem[k] === 'string') {
                localizedSubItem[k] = translateTextToHindi(subItem[k]);
              } else if (Array.isArray(subItem[k]) && typeof subItem[k][0] === 'string') {
                localizedSubItem[k] = subItem[k].map((s: string) => translateTextToHindi(s));
              }
            }
            return localizedSubItem;
          });
        }
      }

      // 4. If string, pass through dictionary translator
      if (typeof originalValue === 'string') {
        return translateTextToHindi(originalValue);
      }
    }

    return item[field];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, localize, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
