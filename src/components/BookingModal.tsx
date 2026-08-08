import React, { useState } from 'react';
import { X, Calendar, Users, Send, MessageSquare, Phone, CheckCircle2, Flame, MapPin } from 'lucide-react';
import { StoreService } from '../services/store';

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
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>
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
