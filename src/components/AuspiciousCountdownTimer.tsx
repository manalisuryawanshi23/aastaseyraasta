import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Flame,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Bell,
  Hourglass,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AuspiciousDate {
  id: string;
  tithiName: string;
  hindiTithiName?: string;
  dateString: string;
  hindiDateString?: string;
  targetDate: Date;
  muhuratTime: string;
  hindiMuhuratTime?: string;
  significance: string;
  hindiSignificance?: string;
  isHighlyRecommended?: boolean;
}

interface AuspiciousCountdownTimerProps {
  poojaName: string;
  categoryName?: string;
  poojaSlug?: string;
  onOpenBooking?: (type?: 'Pooja' | 'Tour', name?: string, notes?: string) => void;
}

export const AuspiciousCountdownTimer: React.FC<AuspiciousCountdownTimerProps> = ({
  poojaName,
  categoryName = '',
  poojaSlug = '',
  onOpenBooking,
}) => {
  const { language, t } = useLanguage();

  // Generate realistic upcoming auspicious dates based on current date
  const upcomingDates: AuspiciousDate[] = useMemo(() => {
    const now = new Date();

    // Helper to get next specific day of week (0=Sun, 2=Tue, etc) offset by weeks
    const getNextDayOfWeek = (dayOfWeek: number, addWeeks = 0): Date => {
      const result = new Date(now);
      let diff = dayOfWeek - now.getDay();
      if (diff <= 0) diff += 7;
      result.setDate(now.getDate() + diff + addWeeks * 7);
      result.setHours(6, 15, 0, 0); // 6:15 AM
      return result;
    };

    // Helper to get date N days from now
    const getDaysFromNow = (days: number, hour = 7): Date => {
      const d = new Date(now);
      d.setDate(now.getDate() + days);
      d.setHours(hour, 30, 0, 0);
      return d;
    };

    const isBhat = poojaName.toLowerCase().includes('bhat') || poojaName.toLowerCase().includes('mangal');
    const isRudrabhishek = poojaName.toLowerCase().includes('rudra') || poojaName.toLowerCase().includes('mahakal');
    const isKaalsarp = poojaName.toLowerCase().includes('kalsarp') || poojaName.toLowerCase().includes('kaal');
    const isBaglamukhi = poojaName.toLowerCase().includes('bagla') || poojaName.toLowerCase().includes('havan');

    if (isBhat) {
      // Bhat Pooja / Mangalnath
      const tue1 = getNextDayOfWeek(2, 0);
      const tue2 = getNextDayOfWeek(2, 1);
      const tue3 = getNextDayOfWeek(2, 2);

      return [
        {
          id: 'date-bhat-1',
          tithiName: 'Bhauma Mangalwar Special Muhurat',
          hindiTithiName: 'भौम मंगलवार विशेष सिद्ध मुहूर्त',
          dateString: tue1.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
          targetDate: tue1,
          muhuratTime: '06:15 AM - 11:30 AM (Abhijit Muhurat)',
          hindiMuhuratTime: 'प्रातः 06:15 से 11:30 (अभिजित मुहूर्त)',
          significance: 'Most potent weekly day for Angaraka Mangal Bhat Pooja at Mangalnath Temple.',
          hindiSignificance: 'मंगलनाथ व अंगारेश्वर मंदिर में भात पूजा एवं मांगलिक दोष निवारण हेतु सर्वाधिक फलदायी वार।',
          isHighlyRecommended: true,
        },
        {
          id: 'date-bhat-2',
          tithiName: 'Upcoming Pradosh & Bhauma Tithi',
          hindiTithiName: 'आगामी प्रदोष व भौम तिथि',
          dateString: tue2.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
          targetDate: tue2,
          muhuratTime: '07:00 AM - 12:15 PM',
          hindiMuhuratTime: 'प्रातः 07:00 से दोपहर 12:15',
          significance: 'Auspicious planetary alignment for rapid relief from Manglik Dosh.',
          hindiSignificance: 'ग्रह शांति एवं मांगलिक बाधा शांति हेतु विशेष शुभ गृह योग।',
        },
        {
          id: 'date-bhat-3',
          tithiName: 'Shukla Paksha Angaraka Chaturthi',
          hindiTithiName: 'शुक्ल पक्ष अंगारक चतुर्थी',
          dateString: tue3.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
          targetDate: tue3,
          muhuratTime: '06:30 AM - 01:00 PM',
          hindiMuhuratTime: 'प्रातः 06:30 से दोपहर 01:00',
          significance: 'Special tithi for peaceful marriage alliances & reducing Mangal Dosh.',
          hindiSignificance: 'शीघ्र विवाह एवं दांपत्य सुख में मंगल दोष शांति हेतु विशेष पावन तिथि।',
        },
      ];
    }

    if (isRudrabhishek) {
      const mon1 = getNextDayOfWeek(1, 0);
      const pradosh = getDaysFromNow(5, 17); // 5 days from now evening
      const shivratri = getDaysFromNow(12, 6);

      return [
        {
          id: 'date-rudra-1',
          tithiName: 'Somwar Shiv Puja Abhijit Muhurat',
          hindiTithiName: 'सोमवार शिव पूजा अभिजित मुहूर्त',
          dateString: mon1.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
          targetDate: mon1,
          muhuratTime: '06:00 AM - 11:45 AM',
          hindiMuhuratTime: 'प्रातः 06:00 से 11:45 (अभिजित मुहूर्त)',
          significance: 'Lord Shiva’s favorite day for Mahakal Rudrabhishek with Panchamrit.',
          hindiSignificance: 'भगवान महाकाल के पंचामृत रुद्राभिषेक एवं महारुद्र पाठ हेतु अत्यंत प्रिय वार।',
          isHighlyRecommended: true,
        },
        {
          id: 'date-rudra-2',
          tithiName: 'Pradosh Vrat Tithi (Godhuli Muhurat)',
          hindiTithiName: 'प्रदोष व्रत तिथि (गोधूलि मुहूर्त)',
          dateString: pradosh.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
          targetDate: pradosh,
          muhuratTime: '05:30 PM - 08:15 PM (Evening Pradosh)',
          hindiMuhuratTime: 'सायं 05:30 से 08:15 (सायंकालीन प्रदोष)',
          significance: 'Divine hours when Mahadev performs Tandava dance and fulfills all desires.',
          hindiSignificance: 'वह पावन काल जब देवाधिदेव महादेव प्रसन्न होकर समस्त मनोकामनाएं पूर्ण करते हैं।',
        },
        {
          id: 'date-rudra-3',
          tithiName: 'Upcoming Masik Shivratri',
          hindiTithiName: 'आगामी मासिक शिवरात्रि',
          dateString: shivratri.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
          targetDate: shivratri,
          muhuratTime: 'Night 09:00 PM - 03:00 AM (4 Prahar)',
          hindiMuhuratTime: 'रात्रि 09:00 से 03:00 (चार प्रहर)',
          significance: 'Special night worship for spiritual progress & health blessings.',
          hindiSignificance: 'आरोग्य, दीर्घायु एवं शिव कृपा प्राप्ति हेतु विशेष चार प्रहर पूजन तिथि।',
        },
      ];
    }

    if (isKaalsarp) {
      const amavasya = getDaysFromNow(4, 7);
      const nagpanchami = getDaysFromNow(18, 6);

      return [
        {
          id: 'date-kaal-1',
          tithiName: 'Upcoming Amavasya Tithi (Dark Moon)',
          hindiTithiName: 'आगामी दर्श अमावस्या तिथि',
          dateString: amavasya.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
          targetDate: amavasya,
          muhuratTime: '07:30 AM - 01:30 PM',
          hindiMuhuratTime: 'प्रातः 07:30 से दोपहर 01:30',
          significance: 'Highest scriptural efficacy for Rahu-Ketu Shanti & Kalsarp Dosh Nivaran.',
          hindiSignificance: 'राहु-केतु शांति एवं कालसर्प दोष शांति अनुष्ठान हेतु शास्त्रोक्त सर्वश्रेष्ठ तिथि।',
          isHighlyRecommended: true,
        },
        {
          id: 'date-kaal-2',
          tithiName: 'Nag Panchami / Special Rahu Muhurat',
          hindiTithiName: 'नाग पंचमी / विशेष राहु शांति मुहूर्त',
          dateString: nagpanchami.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
          targetDate: nagpanchami,
          muhuratTime: '06:00 AM - 12:00 PM',
          hindiMuhuratTime: 'प्रातः 06:00 से दोपहर 12:00',
          significance: 'Universal day of Nag Devta worship for career & family stability.',
          hindiSignificance: 'नाग देवता पूजन एवं करियर व पारिवारिक स्थिरता हेतु विशेष शुभ काल।',
        },
      ];
    }

    // Default dates for other general rituals
    const d1 = getDaysFromNow(2, 7);
    const d2 = getDaysFromNow(7, 8);
    const d3 = getDaysFromNow(14, 6);

    return [
      {
        id: 'date-gen-1',
        tithiName: 'Upcoming Shubh Siddhi Muhurat',
        hindiTithiName: 'आगामी शुभ सर्वार्थ सिद्धि मुहूर्त',
        dateString: d1.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
        targetDate: d1,
        muhuratTime: '07:15 AM - 12:00 PM',
        hindiMuhuratTime: 'प्रातः 07:15 से दोपहर 12:00',
        significance: 'Blessed planetary yoga for initiating Vedic pooja and samagri sankalp.',
        hindiSignificance: 'वैदिक पूजा संकल्प एवं सात्विक हवन अनुष्ठान हेतु पावन योग।',
        isHighlyRecommended: true,
      },
      {
        id: 'date-gen-2',
        tithiName: 'Purnima / Sukla Paksha Tithi',
        hindiTithiName: 'पूर्णिमा / शुक्ल पक्ष पावन तिथि',
        dateString: d2.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
        targetDate: d2,
        muhuratTime: '08:00 AM - 01:00 PM',
        hindiMuhuratTime: 'प्रातः 08:00 से दोपहर 01:00',
        significance: 'Full moon energy bringing health, prosperity and family harmony.',
        hindiSignificance: 'सुख, समृद्धि, शांति एवं पारिवारिक ऐश्वर्य में वृद्धि करने वाली तिथि।',
      },
      {
        id: 'date-gen-3',
        tithiName: 'Amrit Siddhi Yoga',
        hindiTithiName: 'अमृत सिद्धि योग',
        dateString: d3.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
        targetDate: d3,
        muhuratTime: '06:30 AM - 11:30 AM',
        hindiMuhuratTime: 'प्रातः 06:30 से 11:30',
        significance: 'Special Vedic day assuring success for new beginnings and spiritual vows.',
        hindiSignificance: 'नूतन कार्य, आध्यात्मिक संकल्प एवं अनुष्ठान सिद्धि हेतु अचूक योग।',
      },
    ];
  }, [poojaName]);

  const [selectedDateId, setSelectedDateId] = useState<string>(
    upcomingDates[0]?.id || ''
  );

  const selectedDateObj = useMemo(() => {
    return upcomingDates.find((d) => d.id === selectedDateId) || upcomingDates[0];
  }, [upcomingDates, selectedDateId]);

  // Live countdown timer calculation
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = selectedDateObj.targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [selectedDateObj]);

  const handleBookSelectedMuhurat = () => {
    if (onOpenBooking) {
      const activeTithi = language === 'hi' && selectedDateObj.hindiTithiName ? selectedDateObj.hindiTithiName : selectedDateObj.tithiName;
      const activeTime = language === 'hi' && selectedDateObj.hindiMuhuratTime ? selectedDateObj.hindiMuhuratTime : selectedDateObj.muhuratTime;
      const bookingNotes = `Preferred Muhurat: ${activeTithi} (${selectedDateObj.dateString} - ${activeTime})`;
      onOpenBooking('Pooja', poojaName, bookingNotes);
    }
  };

  const currentTithiName = language === 'hi' && selectedDateObj.hindiTithiName ? selectedDateObj.hindiTithiName : selectedDateObj.tithiName;
  const currentMuhuratTime = language === 'hi' && selectedDateObj.hindiMuhuratTime ? selectedDateObj.hindiMuhuratTime : selectedDateObj.muhuratTime;
  const currentSignificance = language === 'hi' && selectedDateObj.hindiSignificance ? selectedDateObj.hindiSignificance : selectedDateObj.significance;

  return (
    <div className="bg-gradient-to-br from-red-950 via-amber-950 to-stone-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-amber-800/60 shadow-xl relative overflow-hidden space-y-5 sm:space-y-6">
      
      {/* Background Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-amber-900/40 pb-4 sm:pb-5 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider border border-amber-500/30">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>{language === 'hi' ? 'आगामी शुभ मुहूर्त' : 'Upcoming Auspicious Muhurats (शुभ मुहूर्त)'}</span>
          </div>

          <h3 className="text-lg sm:text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <span>{language === 'hi' ? 'पावन तिथियां एवं लाइव मुहूर्त काउंटडाउन' : 'Auspicious Dates & Live Countdown'}</span>
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm">
            {language === 'hi' ? (
              <>
                <span className="text-amber-300 font-semibold">{poojaName}</span> को शुभ मुहूर्त में संपन्न करने से अनुष्ठान का पूर्ण वैदिक फल प्राप्त होता है।
              </>
            ) : (
              <>
                Performing <span className="text-amber-300 font-semibold">{poojaName}</span> on alignment dates increases Vedic fruitfulness (Shubh Phal).
              </>
            )}
          </p>
        </div>

        {/* Tithi Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
          {upcomingDates.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedDateId(item.id)}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold transition-all shrink-0 border flex items-center gap-1.5 ${
                selectedDateId === item.id
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md'
                  : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border-stone-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? `मुहूर्त ${idx + 1}` : `Date ${idx + 1}`} ({item.dateString.split(',')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Countdown Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center relative z-10">
        
        {/* Left Side: Selected Tithi Info */}
        <div className="lg:col-span-7 space-y-3">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-serif">
              {currentTithiName}
            </span>

            {selectedDateObj.isHighlyRecommended && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'hi' ? 'सर्वोत्तम सिद्धि दिवस' : 'Highest Efficacy Day'}</span>
              </span>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-lg sm:text-xl font-bold font-serif text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{selectedDateObj.dateString}</span>
            </div>

            <div className="text-xs text-amber-200 flex items-center gap-1.5 font-medium pt-0.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{language === 'hi' ? 'मुहूर्त समय:' : 'Time Window:'} {currentMuhuratTime}</span>
            </div>
          </div>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed bg-stone-900/60 p-3.5 rounded-xl border border-stone-800">
            {currentSignificance}
          </p>

        </div>

        {/* Right Side: Live Digital Ticking Clock */}
        <div className="lg:col-span-5 bg-stone-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-2xl space-y-4 text-center">
          
          <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Hourglass className="w-4 h-4 animate-spin text-amber-400" style={{ animationDuration: '3s' }} />
            <span>{language === 'hi' ? 'संकल्प का शेष समय' : 'Time Remaining to Sankalp'}</span>
          </div>

          {/* Time Digits Grid */}
          <div className="grid grid-cols-4 gap-2">
            
            {/* Days */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 p-2.5 rounded-xl border border-amber-900/50 space-y-0.5">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-stone-400 uppercase font-semibold">
                {language === 'hi' ? 'दिन' : 'Days'}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 p-2.5 rounded-xl border border-amber-900/50 space-y-0.5">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-stone-400 uppercase font-semibold">
                {language === 'hi' ? 'घंटे' : 'Hours'}
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 p-2.5 rounded-xl border border-amber-900/50 space-y-0.5">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-stone-400 uppercase font-semibold">
                {language === 'hi' ? 'मिनट' : 'Mins'}
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 p-2.5 rounded-xl border border-amber-900/50 space-y-0.5">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-400 animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-stone-400 uppercase font-semibold">
                {language === 'hi' ? 'सेकंड' : 'Secs'}
              </div>
            </div>

          </div>

          {/* Reserve Pandit Ji CTA */}
          <button
            onClick={handleBookSelectedMuhurat}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 group"
          >
            <Flame className="w-4 h-4 fill-stone-950 text-stone-950" />
            <span>{language === 'hi' ? 'इस शुभ मुहूर्त हेतु पूजा बुक करें' : 'Book Ritual for This Auspicious Date'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

      </div>

      {/* Footer Banner */}
      <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-[11px] text-stone-400 relative z-10">
        <div className="flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {language === 'hi'
              ? 'पंडित जी की नियुक्ति एवं सात्विक सामग्री की तैयारी मुहूर्त से 24 घंटे पूर्व सुनिश्चित की जाती है।'
              : 'Pandit Ji assignment & samagri procurement happens 24 hrs before the Muhurat.'}
          </span>
        </div>
        <span className="text-amber-300 font-semibold hidden sm:inline">
          {language === 'hi' ? 'उज्जैन वैदिक पंचांग' : 'Ujjain Vedic Calendar'}
        </span>
      </div>

    </div>
  );
};
