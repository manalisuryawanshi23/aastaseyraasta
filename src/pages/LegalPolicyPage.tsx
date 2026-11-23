import React, { useState, useEffect } from 'react';
import { StoreService } from '../services/store';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  MapPin,
  Flame,
  Compass,
  Sparkles,
} from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'disclaimer' | 'refund' | 'how-it-works';

interface LegalPolicyPageProps {
  defaultTab?: PolicyTab;
}

export const LegalPolicyPage: React.FC<LegalPolicyPageProps> = ({ defaultTab = 'terms' }) => {
  const { language } = useLanguage();
  const settings = StoreService.getSettings();

  // Determine active tab from URL path or prop
  const getInitialTab = (): PolicyTab => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p.includes('privacy')) return 'privacy';
      if (p.includes('disclaimer')) return 'disclaimer';
      if (p.includes('refund') || p.includes('cancellation')) return 'refund';
      if (p.includes('how-it-works')) return 'how-it-works';
      if (p.includes('terms')) return 'terms';
    }
    return defaultTab as PolicyTab;
  };

  const [activeTab, setActiveTab] = useState<PolicyTab>(() => getInitialTab());

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [defaultTab]);

  const handleTabChange = (tab: PolicyTab) => {
    setActiveTab(tab);
    let targetPath = '/terms-and-conditions';
    if (tab === 'privacy') targetPath = '/privacy-policy';
    if (tab === 'disclaimer') targetPath = '/disclaimer';
    if (tab === 'refund') targetPath = '/refund-cancellation-policy';
    if (tab === 'how-it-works') targetPath = '/how-it-works';

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
      window.scrollTo(0, 0);
    }
  };

  // Dynamic Metadata based on active policy
  const getTabMetadata = () => {
    switch (activeTab) {
      case 'privacy':
        return {
          title: 'Privacy Policy & Devotee Data Protection | Aastha Sey Raasta',
          description: `Learn how ${settings.businessName} protects devotee personal data, gotra sankalp details, and booking confidentiality in compliance with IT regulations.`,
          canonical: 'https://aasthasaysrasta.com/privacy-policy',
          breadcrumb: 'Privacy Policy',
        };
      case 'disclaimer':
        return {
          title: 'Astrological & Spiritual Service Disclaimer | Aastha Sey Raasta',
          description: `Important disclaimer regarding Vedic poojas, planetary dosha remedies, and pilgrimage tour coordination by ${settings.businessName} in Ujjain.`,
          canonical: 'https://aasthasaysrasta.com/disclaimer',
          breadcrumb: 'Disclaimer',
        };
      case 'refund':
        return {
          title: 'Refund & Cancellation Policy | Pooja & Yatra Bookings | Aastha Sey Raasta',
          description: `Review our transparent cancellation and refund policy for temple pooja dakshina, gotra sankalp samagri, and spiritual yatra vehicle bookings.`,
          canonical: 'https://aasthasaysrasta.com/refund-cancellation-policy',
          breadcrumb: 'Refund Policy',
        };
      case 'how-it-works':
        return {
          title: 'How It Works | Booking Vedic Pooja & Yatras | Aastha Sey Raasta',
          description: `Step-by-step guide to booking authentic Vedic Poojas, personalized Gotra Sankalp, certified Brahmins, and pilgrimage tour arrangements in Ujjain.`,
          canonical: 'https://aasthasaysrasta.com/how-it-works',
          breadcrumb: 'How It Works',
        };
      case 'terms':
      default:
        return {
          title: 'Terms and Conditions | Service Agreement | Aastha Sey Raasta',
          description: `Terms of service, devotee code of conduct, and guidelines governing pooja coordination and yatra packages arranged by ${settings.businessName}.`,
          canonical: 'https://aasthasaysrasta.com/terms-and-conditions',
          breadcrumb: 'Terms & Conditions',
        };
    }
  };

  const meta = getTabMetadata();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 min-h-[75vh]">
      <SEOHead
        title={meta.title}
        description={meta.description}
        canonicalUrl={meta.canonical}
        ogImage="/assets/images/header_bg_spiritual_1786196057015.jpg"
      />

      <Breadcrumbs items={[{ label: meta.breadcrumb }]} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-900/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sanatan Dharma Seva Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight">
            {activeTab === 'privacy' && (language === 'hi' ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy')}
            {activeTab === 'terms' && (language === 'hi' ? 'नियम व शर्तें (Terms & Conditions)' : 'Terms & Conditions')}
            {activeTab === 'disclaimer' && (language === 'hi' ? 'आध्यात्मिक घोषणा (Disclaimer)' : 'Disclaimer')}
            {activeTab === 'refund' && (language === 'hi' ? 'रिफंड व रद्दीकरण नीति (Refund Policy)' : 'Refund & Cancellation Policy')}
            {activeTab === 'how-it-works' && (language === 'hi' ? 'सेवा प्रक्रिया (How It Works)' : 'How It Works')}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Last Updated: September 2026 • Official Guidelines of {settings.businessName} (Registered at {settings.city}, Madhya Pradesh).
          </p>
        </div>
      </div>

      {/* Policy Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => handleTabChange('how-it-works')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'how-it-works'
              ? 'bg-amber-800 text-white shadow-md'
              : 'bg-white dark:bg-[#1C1917] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>How It Works</span>
        </button>

        <button
          onClick={() => handleTabChange('terms')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'terms'
              ? 'bg-amber-800 text-white shadow-md'
              : 'bg-white dark:bg-[#1C1917] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Terms & Conditions</span>
        </button>

        <button
          onClick={() => handleTabChange('privacy')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-amber-800 text-white shadow-md'
              : 'bg-white dark:bg-[#1C1917] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => handleTabChange('refund')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'refund'
              ? 'bg-amber-800 text-white shadow-md'
              : 'bg-white dark:bg-[#1C1917] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refund & Cancellation</span>
        </button>

        <button
          onClick={() => handleTabChange('disclaimer')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'disclaimer'
              ? 'bg-amber-800 text-white shadow-md'
              : 'bg-white dark:bg-[#1C1917] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Disclaimer</span>
        </button>
      </div>

      {/* Main Content Body */}
      <div className="bg-white dark:bg-[#1C1917] rounded-3xl p-6 sm:p-12 border border-stone-200 dark:border-stone-800 shadow-sm leading-relaxed text-stone-700 dark:text-stone-300 text-sm sm:text-base space-y-8">
        
        {/* TAB 1: HOW IT WORKS */}
        {activeTab === 'how-it-works' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
                How Our Spiritual Services & Pooja Booking Work
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                We make authentic Vedic rituals and Ujjain pilgrimage journeys accessible, transparent, and completely aligned with Sanatan traditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                  Select Ritual or Yatra
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Browse our directory of authentic Vedic poojas (Rudrabhishek, Mangal Bhat Pooja, Kaal Sarp Dosh) or spiritual pilgrimage tour packages.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                  Gotra Sankalp & Muhurat
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Provide your family Gotra, Nakshatra, and names. Our Vedic Astrologers evaluate the Panchang to select the most auspicious Muhurat.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                  Sacred Ritual Conduct
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Conducted by qualified Gurukul Brahmins at holy shrines (Mahakal, Mangalnath, Ramghat, Nalkheda) in person or via live video sankalp.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                  Prasad & Ashirwad
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Consecrated Raksha Sutra, Bhasma, Dry Fruit Prasad, and divine Yantras are carefully packed and dispatched to your doorstep.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TERMS AND CONDITIONS */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
              Terms & Conditions of Service
            </h2>
            <div className="space-y-4 text-xs sm:text-sm">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">1. Introduction & Acceptance</h3>
              <p>
                By booking any spiritual pooja service, consultation, or tour package through {settings.businessName} (&quot;Foundation&quot;, &quot;we&quot;, &quot;us&quot;), the devotee/yazman (&quot;User&quot;, &quot;you&quot;) agrees to abide by these Terms and Conditions. Our services are spiritual coordination and facilitation grounded in Vedic traditions.
              </p>

              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">2. Gotra Sankalp & Devotional Nature</h3>
              <p>
                All Vedic rituals are performed with the Gotra, name, and traditional intent provided by the devotee. The rituals are performed by certified Vedic Brahmins following scriptural procedures. Devotees understand that pooja rituals are acts of religious faith and spiritual devotion.
              </p>

              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">3. Temple Regulations & Code of Conduct</h3>
              <p>
                Devotees participating in in-person poojas or yatras agree to respect temple customs, traditional dress codes (Dhoti/Kurta for men, Saree/Salwar for women at sanctum rituals), security rules, and photography restrictions enforced by local temple trusts (such as Shri Mahakaleshwar Temple Management Committee).
              </p>

              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">4. Tour Logistics & Transport</h3>
              <p>
                Pilgrimage tours include private vehicle transport, driver allowances, and accommodation as specified in the confirmed package. Devotees are expected to adhere to scheduled departure timings to complete Darshans during open temple hours.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
              Privacy & Devotee Data Protection Policy
            </h2>
            <div className="space-y-4 text-xs sm:text-sm">
              <p>
                {settings.businessName} is committed to protecting the sanctity and privacy of your personal and devotional information. This Privacy Policy outlines what information we collect and how we safeguard it.
              </p>

              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">1. Information We Collect</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contact details: Name, phone number, WhatsApp number, email address, and postal address (for Prasad delivery).</li>
                <li>Devotional details: Family Gotra, birth Nakshatra, date of birth, and names of family members participating in the Sankalp.</li>
                <li>Booking communications and specific ritual preferences.</li>
              </ul>

              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">2. How We Use Your Information</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>To enable the conducting Brahmins to pronounce the correct Gotra Sankalp during the ritual.</li>
                <li>To dispatch consecrated Prasad to your address with postal tracking.</li>
                <li>To coordinate pickup, vehicle transit, and hotel arrangements during spiritual tours.</li>
                <li>We NEVER sell, rent, or trade devotee personal or astrological data to third-party marketing companies.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: REFUND & CANCELLATION */}
        {activeTab === 'refund' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
              Refund & Cancellation Policy
            </h2>
            <div className="space-y-4 text-xs sm:text-sm">
              <p>
                We strive to maintain complete fairness and transparency. Because Vedic poojas require advance procurement of perishable sacred samagri (flowers, milk, curd, honey, fruits, havan herbs) and reservation of Brahmin schedules, the following policies apply:
              </p>

              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">1. Pooja Cancellations & Rescheduling</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Rescheduling:</strong> Devotees can reschedule their pooja date free of charge up to 24 hours prior to the scheduled Muhurat.</li>
                <li><strong>Cancellation prior to 48 hours:</strong> 80% refund of the advance booking amount.</li>
                <li><strong>Cancellation within 24–48 hours:</strong> 50% refund to offset samagri preparation expenses already committed.</li>
                <li><strong>Same-day cancellation:</strong> Non-refundable as Brahmins and consecrated samagri are already stationed at the temple venue.</li>
              </ul>

              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">2. Spiritual Tour Package Cancellations</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cancellations made 7 or more days prior to travel: 85% refund of tour package advance.</li>
                <li>Cancellations made 3 to 6 days prior to travel: 50% refund.</li>
                <li>Cancellations within 48 hours of departure: Non-refundable due to vehicle and hotel reservation commitments.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: DISCLAIMER */}
        {activeTab === 'disclaimer' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
              Astrological & Spiritual Service Disclaimer
            </h2>
            <div className="space-y-4 text-xs sm:text-sm">
              <p>
                <strong>Devotional Nature of Vedic Rituals:</strong>
                Vedic poojas, Rudrabhishek, dosha nivaran anushthans, and havan ceremonies conducted under the guidance of our Pandits are sacred spiritual traditions based on ancient Sanatan texts and astrological beliefs.
              </p>
              <p>
                <strong>No Guaranteed Outcomes:</strong>
                In accordance with Sanatan philosophy, pooja rituals are devotional offerings to seek divine grace, spiritual purification, and peace of mind. Results may vary depending on individual faith, karma, and destiny. {settings.businessName} does not claim or guarantee deterministic, medical, financial, or supernatural results.
              </p>
              <p>
                <strong>Consultation Advice:</strong>
                Astrological consultations and planetary recommendations provided by our scholars reflect traditional Vedic interpretive frameworks. They are devotional in nature and are not intended to substitute for professional legal, financial, or medical advice.
              </p>
            </div>
          </div>
        )}

        {/* Contact info footer */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-6 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <strong>Grievance Officer:</strong> Seva Coordinator, {settings.businessName}
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${settings.email}`} className="hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{settings.email}</span>
            </a>
            <a href={`tel:${settings.phone1}`} className="hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phone1}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
