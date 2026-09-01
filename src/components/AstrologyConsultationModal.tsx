import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { StoreService } from '../services/store';
import { PreferredCallbackTime } from '../types';
import {
  X,
  Sparkles,
  Sun,
  Sunset,
  Clock,
  PhoneCall,
  MessageCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  User,
  Calendar,
  MapPin,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

interface AstrologyConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AstrologyConsultationModal: React.FC<AstrologyConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();
  const settings = StoreService.getSettings();

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [mobile, setMobile] = useState('');
  const [concern, setConcern] = useState('');
  const [preferredTime, setPreferredTime] = useState<PreferredCallbackTime>('Morning');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return false;
    }
    if (!age.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया अपनी उम्र दर्ज करें।' : 'Please enter your age.');
      return false;
    }
    if (!dob.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया अपनी जन्म तिथि चुनें।' : 'Please select your date of birth.');
      return false;
    }
    if (!birthTime.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया जन्म का समय दर्ज करें।' : 'Please enter your birth time.');
      return false;
    }
    if (!birthPlace.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया अपना जन्म स्थान दर्ज करें।' : 'Please enter your birth place.');
      return false;
    }
    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      setErrorMsg(language === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!concern.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया अपना प्रश्न या समस्या संक्षेप में बताएं।' : 'Please describe your concern or specific problem.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      StoreService.saveAstrologyConsultation({
        fullName: fullName.trim(),
        age: age.trim(),
        mobile: mobile.trim(),
        dob: dob.trim(),
        birthTime: birthTime.trim(),
        birthPlace: birthPlace.trim(),
        concern: concern.trim(),
        preferredCallbackTime: preferredTime,
        status: 'New',
      });

      setIsSuccess(true);
    } catch (err) {
      setErrorMsg(language === 'hi' ? 'अनुरोध सबमिट करने में विफल। कृपया पुनः प्रयास करें।' : 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save to DB in background as well so no lead is lost
    StoreService.saveAstrologyConsultation({
      fullName: fullName.trim(),
      age: age.trim(),
      mobile: mobile.trim(),
      dob: dob.trim(),
      birthTime: birthTime.trim(),
      birthPlace: birthPlace.trim(),
      concern: concern.trim(),
      preferredCallbackTime: preferredTime,
      status: 'New',
    });

    const timeLabel =
      preferredTime === 'Morning'
        ? 'Morning (9 AM – 12 PM)'
        : preferredTime === 'Afternoon'
        ? 'Afternoon (12 PM – 4 PM)'
        : preferredTime === 'Evening'
        ? 'Evening (4 PM – 8 PM)'
        : 'Anytime Available';

    const message = `Jai Shree Mahakal 🙏\n\nI would like to request a Free Astrology Consultation.\n\nName: ${fullName.trim()}\nAge: ${age.trim()}\nDate of Birth: ${dob.trim()}\nBirth Time: ${birthTime.trim()}\nBirth Place: ${birthPlace.trim()}\nMobile: ${mobile.trim()}\n\nMy Concern:\n${concern.trim()}\n\nPreferred Callback Time:\n${timeLabel}\n\nThank you.`;

    const rawPhone = settings.whatsappNumber || settings.phone1 || '+919826000000';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFullName('');
    setAge('');
    setDob('');
    setBirthTime('');
    setBirthPlace('');
    setMobile('');
    setConcern('');
    setPreferredTime('Morning');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#FFFDF8] dark:bg-[#1A1816] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-amber-200/80 dark:border-amber-900/40 overflow-hidden my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon / Banner Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700" />

        {/* Modal Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* ── SUCCESS CONFIRMATION SCREEN ── */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'परामर्श अनुरोध प्राप्त हुआ' : 'Consultation Request Received'}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {language === 'hi' ? 'अनुरोध सफलतापूर्वक दर्ज किया गया' : 'Thank You for Sharing Your Details'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-350 max-w-md mx-auto leading-relaxed">
                {language === 'hi'
                  ? 'हमारे अनुभवी ज्योतिषी आपकी जन्म कुंडली और समस्या का अध्ययन करेंगे और आपके पसंदीदा समय पर आपसे संपर्क करेंगे।'
                  : 'Our team will review your birth details and astrological query, and our pandits will connect with you at your preferred time.'}
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-amber-50/70 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 text-xs text-left max-w-md mx-auto space-y-2 text-stone-700 dark:text-stone-300">
              <div className="flex justify-between border-b border-amber-200/60 dark:border-amber-900/40 pb-1.5 font-medium">
                <span className="text-stone-500 dark:text-stone-400">Devotee Name:</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">{fullName}</span>
              </div>
              <div className="flex justify-between border-b border-amber-200/60 dark:border-amber-900/40 pb-1.5 font-medium">
                <span className="text-stone-500 dark:text-stone-400">Contact Number:</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">+91 {mobile}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-stone-500 dark:text-stone-400">Callback Preference:</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  {preferredTime} ({preferredTime === 'Morning' ? '9 AM – 12 PM' : preferredTime === 'Afternoon' ? '12 PM – 4 PM' : preferredTime === 'Evening' ? '4 PM – 8 PM' : 'Anytime'})
                </span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:from-amber-800 hover:to-stone-900 transition-all cursor-pointer"
            >
              <span>{language === 'hi' ? 'वेबसाइट पर जारी रखें →' : 'Continue Exploring →'}</span>
            </button>
          </div>
        ) : (
          /* ── CONSULTATION FORM ── */
          <div className="p-5 sm:p-7 md:p-8 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start gap-3.5 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-300/80 dark:border-amber-800 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight">
                  {language === 'hi' ? 'मुफ्त ज्योतिष परामर्श बुक करें' : 'Book Your Free Astrology Consultation'}
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === 'hi'
                    ? 'कृपया अपने जन्म का विवरण साझा करें ताकि हमारी टीम आपकी समस्या को समझकर सुविधाजनक समय पर आपसे संपर्क कर सके।'
                    : 'Please share your details so our team can understand your query and connect with you at a convenient time.'}
                </p>
              </div>
            </div>

            {/* Error Message Toast */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2 animate-shake">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Full Name, Age, Date of Birth, Birth Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 text-xs">
                
                {/* Full Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block font-bold text-stone-800 dark:text-stone-200">
                    {language === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={language === 'hi' ? 'उदा. राजेश शर्मा' : 'Enter your full name'}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-1">
                  <label className="block font-bold text-stone-800 dark:text-stone-200">
                    {language === 'hi' ? 'उम्र *' : 'Age *'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 32"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label className="block font-bold text-stone-800 dark:text-stone-200">
                    {language === 'hi' ? 'जन्म तिथि *' : 'Date of Birth *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Birth Time & Birth Place */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                
                {/* Birth Time */}
                <div className="space-y-1">
                  <label className="block font-bold text-stone-800 dark:text-stone-200">
                    {language === 'hi' ? 'जन्म समय *' : 'Birth Time *'}
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      placeholder={language === 'hi' ? 'उदा. 06:45 AM / सुबह' : 'e.g. 06:45 AM / Night'}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400">
                    {language === 'hi' ? 'सटीक जन्म समय से सटीक कुंडली विश्लेषण में सहायता मिलती है।' : 'Please provide the most accurate birth time available.'}
                  </p>
                </div>

                {/* Birth Place */}
                <div className="space-y-1">
                  <label className="block font-bold text-stone-800 dark:text-stone-200">
                    {language === 'hi' ? 'जन्म स्थान *' : 'Birth Place *'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      placeholder={language === 'hi' ? 'शहर, राज्य, देश (उदा. उज्जैन, म.प्र.)' : 'City, State, Country'}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile / WhatsApp Number */}
              <div className="space-y-1 text-xs">
                <label className="block font-bold text-stone-800 dark:text-stone-200">
                  {language === 'hi' ? 'मोबाइल / व्हाट्सएप नंबर *' : 'Mobile / WhatsApp Number *'}
                </label>
                <div className="flex rounded-xl overflow-hidden border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 focus-within:ring-2 focus-within:ring-amber-500">
                  <div className="flex items-center gap-1 px-3 bg-stone-100 dark:bg-stone-800 border-r border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={14}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder={language === 'hi' ? '10 अंकों का मोबाइल नंबर दर्ज करें' : 'Enter 10-digit mobile number'}
                    className="w-full px-3 py-2 bg-transparent text-stone-900 dark:text-stone-100 text-xs outline-none font-semibold"
                  />
                </div>
              </div>

              {/* Concern / Specific Problem */}
              <div className="space-y-1 text-xs">
                <label className="block font-bold text-stone-800 dark:text-stone-200">
                  {language === 'hi' ? 'आप किस विषय में मार्गदर्शन चाहते हैं? *' : 'What would you like guidance about? *'}
                </label>
                <textarea
                  required
                  rows={2}
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'कृपया बताएं कि आप किस बारे में मार्गदर्शन चाहते हैं, जैसे करियर, विवाह, संबंध, शिक्षा, व्यापार, परिवार, वित्तीय चिंताएं, कालसर्प/मंगल दोष या कोई अन्य समस्या।'
                      : 'Please tell us what you would like guidance about, such as career, marriage, relationship, education, business, family, financial concerns, or any other matter.'
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed"
                />
              </div>

              {/* Preferred Callback Time */}
              <div className="space-y-1.5 text-xs">
                <label className="block font-bold text-stone-800 dark:text-stone-200">
                  {language === 'hi' ? 'कॉल प्राप्त करने का पसंदीदा समय *' : 'Preferred Time to Receive a Call *'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  
                  {/* Morning */}
                  <button
                    type="button"
                    onClick={() => setPreferredTime('Morning')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      preferredTime === 'Morning'
                        ? 'border-amber-700 bg-amber-100/70 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 shadow-sm ring-1 ring-amber-700'
                        : 'border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-400 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                      <Sun className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{language === 'hi' ? 'सुबह' : 'Morning'}</span>
                    </div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">
                      9 AM – 12 PM
                    </span>
                  </button>

                  {/* Afternoon */}
                  <button
                    type="button"
                    onClick={() => setPreferredTime('Afternoon')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      preferredTime === 'Afternoon'
                        ? 'border-amber-700 bg-amber-100/70 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 shadow-sm ring-1 ring-amber-700'
                        : 'border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-400 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                      <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{language === 'hi' ? 'दोपहर' : 'Afternoon'}</span>
                    </div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">
                      12 PM – 4 PM
                    </span>
                  </button>

                  {/* Evening */}
                  <button
                    type="button"
                    onClick={() => setPreferredTime('Evening')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      preferredTime === 'Evening'
                        ? 'border-amber-700 bg-amber-100/70 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 shadow-sm ring-1 ring-amber-700'
                        : 'border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-400 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                      <Sunset className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{language === 'hi' ? 'शाम' : 'Evening'}</span>
                    </div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">
                      4 PM – 8 PM
                    </span>
                  </button>

                  {/* Anytime */}
                  <button
                    type="button"
                    onClick={() => setPreferredTime('Anytime')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      preferredTime === 'Anytime'
                        ? 'border-amber-700 bg-amber-100/70 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 shadow-sm ring-1 ring-amber-700'
                        : 'border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-400 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{language === 'hi' ? 'किसी भी समय' : 'Anytime'}</span>
                    </div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">
                      {language === 'hi' ? 'जब उपलब्ध हों' : 'Call whenever available'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Form Action Buttons (Side-by-Side on Desktop, Stacked on Mobile) */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                {/* Secondary WhatsApp Button */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <div className="text-left">
                    <span className="block leading-none">{language === 'hi' ? 'व्हाट्सएप पर जारी रखें' : 'Continue on WhatsApp'}</span>
                    <span className="text-[9px] font-normal opacity-90 block mt-0.5">{language === 'hi' ? 'सीधे ज्योतिषी से चैट करें' : 'Chat with our astrology team'}</span>
                  </div>
                </button>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 hover:from-amber-900 hover:to-black text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  <div className="text-left">
                    <span className="block leading-none">{isSubmitting ? (language === 'hi' ? 'जमा कर रहे हैं...' : 'Submitting...') : (language === 'hi' ? 'परामर्श अनुरोध सबमिट करें →' : 'Submit Consultation Request')}</span>
                    <span className="text-[9px] font-normal text-amber-200/90 block mt-0.5">{language === 'hi' ? 'हम आपके पसंदीदा समय पर संपर्क करेंगे' : 'We will call you at your preferred time'}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  {language === 'hi'
                    ? 'आपकी व्यक्तिगत एवं जन्म जानकारी केवल ज्योतिष परामर्श के लिए गोपनीय रखी जाएगी।'
                    : 'Your personal and birth details will only be used to process your astrology consultation request.'}
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
