import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Calendar,
  Users,
  Send,
  MessageSquare,
  Phone,
  CheckCircle2,
  Flame,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Info
} from 'lucide-react';
import { StoreService } from '../services/store';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceType?: 'Pooja' | 'Tour' | 'Destination' | 'General';
  defaultServiceName?: string;
}

// Helper Date Utilities
const getTodayISO = (): string => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const getNextDayOfWeek = (targetDayOfWeek: number): string => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  let currentDay = d.getDay();
  let distance = (targetDayOfWeek + 7 - currentDay) % 7;
  if (distance === 0) distance = 7; // Get next week's if today
  d.setDate(d.getDate() + distance);

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const formatDateDisplay = (dateStr: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  if (isNaN(d.getTime())) return dateStr;

  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  const monthName = d.toLocaleDateString('en-US', { month: 'short' });
  const dayNum = d.getDate();
  const yearNum = d.getFullYear();

  let tag = '';
  if (d.getDay() === 2) tag = ' • 🚩 Mangal Pooja';
  else if (d.getDay() === 1) tag = ' • 🔱 Somwar Special';

  return `${dayName}, ${dayNum} ${monthName} ${yearNum}${tag}`;
};

// Interactive Date Picker Component
const InteractiveDatePicker: React.FC<{
  value: string;
  onChange: (val: string) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initialViewDate = () => {
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
      }
    }
    const d = new Date();
    d.setDate(1);
    return d;
  };

  const [viewDate, setViewDate] = useState<Date>(initialViewDate);

  const todayStr = getTodayISO();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleSelectDate = (dNum: number) => {
    const selected = new Date(year, month, dNum);
    const y = selected.getFullYear();
    const m = String(selected.getMonth() + 1).padStart(2, '0');
    const day = String(selected.getDate()).padStart(2, '0');
    const iso = `${y}-${m}-${day}`;
    onChange(iso);
    setIsOpen(false);
  };

  const tomorrowStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  })();

  const nextTuesdayStr = getNextDayOfWeek(2);
  const nextMondayStr = getNextDayOfWeek(1);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-medium flex items-center justify-between shadow-sm hover:border-amber-500 transition-all text-left"
      >
        <span className={value ? 'text-stone-900 dark:text-stone-100 font-semibold' : 'text-stone-400'}>
          {value ? formatDateDisplay(value) : 'Select preferred booking date'}
        </span>
        <Calendar className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 ml-2" />
      </button>

      {/* Dropdown Calendar Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-80 mt-2 z-50 bg-white dark:bg-[#1C1917] rounded-2xl border border-amber-300/60 dark:border-stone-700 shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Quick Shortcuts Bar */}
          <div className="mb-3 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Auspicious Booking Shortcuts</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  onChange(todayStr);
                  setIsOpen(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  value === todayStr
                    ? 'bg-amber-800 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-stone-700'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange(tomorrowStr);
                  setIsOpen(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  value === tomorrowStr
                    ? 'bg-amber-800 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-stone-700'
                }`}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange(nextTuesdayStr);
                  setIsOpen(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                  value === nextTuesdayStr
                    ? 'bg-red-700 text-white'
                    : 'bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900 hover:bg-red-100'
                }`}
              >
                <span>🚩 Next Tuesday</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange(nextMondayStr);
                  setIsOpen(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                  value === nextMondayStr
                    ? 'bg-amber-800 text-white'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900 hover:bg-amber-100'
                }`}
              >
                <span>🔱 Next Monday</span>
              </button>
            </div>
          </div>

          <hr className="border-stone-200 dark:border-stone-800 my-2" />

          {/* Month Header Controls */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-stone-400 mb-1">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-7 sm:h-8" />
            ))}

            {/* Day slots */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const cellDate = new Date(year, month, dayNum);
              cellDate.setHours(0, 0, 0, 0);

              const cellDateISO = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const isPast = cellDate < today;
              const isSelected = value === cellDateISO;
              const isToday = cellDateISO === todayStr;

              const isTuesday = cellDate.getDay() === 2; // Mangalnath Pooja
              const isMonday = cellDate.getDay() === 1;  // Mahakal Abhishekam

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDate(dayNum)}
                  className={`relative h-7 sm:h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                    isPast
                      ? 'text-stone-300 dark:text-stone-700 cursor-not-allowed opacity-40'
                      : isSelected
                      ? 'bg-amber-800 text-white shadow-md font-bold scale-105'
                      : isToday
                      ? 'bg-amber-100 dark:bg-stone-800 text-amber-900 dark:text-amber-300 border border-amber-400'
                      : 'hover:bg-amber-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                  }`}
                >
                  <span>{dayNum}</span>

                  {/* Special Tithi Indicator Dots */}
                  {!isPast && (isTuesday || isMonday) && !isSelected && (
                    <span
                      className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                        isTuesday ? 'bg-red-500' : 'bg-amber-500'
                      }`}
                      title={isTuesday ? 'Tuesday (Mangalnath Pooja Special)' : 'Monday (Mahakal Special)'}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Legend */}
          <div className="mt-3 pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[10px] text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                <span>Tue (Bhat Pooja)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span>Mon (Abhishekam)</span>
              </span>
            </div>
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 underline font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceType?: 'Pooja' | 'Tour' | 'Destination' | 'General';
  defaultServiceName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultServiceType = 'Pooja',
  defaultServiceName = '',
}) => {
  const settings = StoreService.getSettings();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState<'Pooja' | 'Tour' | 'Destination' | 'General'>(defaultServiceType);
  const [serviceName, setServiceName] = useState(defaultServiceName);
  const [preferredDate, setPreferredDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [gotra, setGotra] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    const fullMessage = `${message ? message + '\n' : ''}${gotra ? 'Gotra: ' + gotra : ''}`;

    StoreService.createLead({
      name,
      phone,
      email,
      whatsapp: phone,
      serviceType,
      serviceName: serviceName || 'General Enquiry',
      preferredDate,
      numberOfPeople,
      message: fullMessage,
      source: 'Website Booking Modal',
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = `Jai Shree Mahakal 🙏\n*Aastha Sey Raasta Seva Booking Enquiry*\n\n*Name:* ${name || 'Devotee'}\n*Phone:* ${phone}\n*Service:* ${serviceType} - ${serviceName || 'General'}\n*Preferred Date:* ${preferredDate || 'To be decided'}\n*No. of Devotees:* ${numberOfPeople}${gotra ? '\n*Gotra:* ' + gotra : ''}${message ? '\n*Note:* ' + message : ''}\n\nPlease share booking procedure and vidhi details.`;
    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#1C1917] rounded-2xl shadow-2xl border border-amber-200/50 dark:border-stone-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-stone-200 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-amber-300 text-xs font-medium tracking-wide uppercase mb-1">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Spiritual Enquiry & Booking</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-amber-100">
            {submitted ? 'Enquiry Submitted' : 'Book Pooja or Yatra'}
          </h3>
          <p className="text-amber-200/80 text-xs mt-1">
            Faith Leads the Way • {settings.businessName}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Pranam, {name}!
                </h4>
                <p className="text-stone-600 dark:text-stone-300 text-sm mt-1 max-w-md mx-auto">
                  Your enquiry for <span className="font-semibold text-amber-800 dark:text-amber-400">{serviceName || serviceType}</span> has been received successfully. Our Acharya team will contact you shortly on <span className="font-mono text-stone-800 dark:text-stone-200">{phone}</span>.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Connect on WhatsApp Now</span>
                </a>
                <a
                  href={`tel:${settings.phone1}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium text-sm hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Call {settings.phone1}</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 underline"
                >
                  Close window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type toggle */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-300">
                <button
                  type="button"
                  onClick={() => setServiceType('Pooja')}
                  className={`py-2 rounded-lg transition-all ${
                    serviceType === 'Pooja' ? 'bg-amber-700 text-white shadow-sm' : 'hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  Pooja Service
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('Tour')}
                  className={`py-2 rounded-lg transition-all ${
                    serviceType === 'Tour' ? 'bg-amber-700 text-white shadow-sm' : 'hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  Spiritual Tour
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('General')}
                  className={`py-2 rounded-lg transition-all ${
                    serviceType === 'General' ? 'bg-amber-700 text-white shadow-sm' : 'hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  General Query
                </button>
              </div>

              {/* Specific Service Input */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Selected Service / Package
                </label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g. Rudrabhishek / Bhat Pooja / Ujjain Tour"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Devotee Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Preferred Date */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Preferred Date
                  </label>
                  <InteractiveDatePicker
                    value={preferredDate}
                    onChange={setPreferredDate}
                  />
                </div>

                {/* Number of People */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    No. of Devotees
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>

                {/* Gotra */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Gotra (Optional)
                  </label>
                  <input
                    type="text"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    placeholder="e.g. Kashyap"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Special Message */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Special Intentions / Notes
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention preferred temple, lodging requirement or health prayer..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-red-800 to-amber-800 text-white font-medium text-sm hover:from-red-900 hover:to-amber-900 shadow-md shadow-amber-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Booking Request</span>
                </button>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp Instantly</span>
                </a>
              </div>

              <p className="text-[11px] text-stone-500 text-center">
                🔒 Your privacy is sacred. We never share devotee contact details.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
