import React, { useState } from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const settings = StoreService.getSettings();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    StoreService.createLead({
      name,
      phone,
      email,
      whatsapp: phone,
      serviceType: 'General',
      serviceName: 'Contact Page Inquiry',
      message,
      source: 'Contact Us Form',
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <SEOHead
        title={`Contact Us | ${settings.businessName} Ujjain`}
        description={`Reach out to ${settings.businessName} at Mahakal Marg Ujjain for pooja reservations, gotra sankalp, and yatra guidance.`}
      />

      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="bg-[#121212] text-[#F9F8F6] rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-[#121212]/20">
        <div className="relative z-10 max-w-2xl space-y-3">
          <h1 className="text-3xl sm:text-5xl font-serif italic font-bold text-amber-100">
            Contact Our Ujjain Seva Kendra
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Have questions about pooja vidhi, muhurat timings, or custom tour itineraries? Our Acharya coordinators are available to assist you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100 border-b border-[#121212]/10 dark:border-stone-800 pb-2">
              Direct Contact Details
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100">{settings.businessName}</div>
                  <div>{settings.address}, {settings.city}, {settings.state} - {settings.pincode}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0" />
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100">Phone Lines:</div>
                  <div className="font-mono text-stone-800 dark:text-stone-200">{settings.phone1} / {settings.phone2}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0" />
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100">Email:</div>
                  <div>{settings.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100">WhatsApp Support:</div>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-800 dark:text-emerald-400 font-medium hover:underline"
                  >
                    +91 {settings.whatsappNumber} (Instant Response)
                  </a>
                </div>
              </div>
            </div>

            {/* Social Channels List */}
            {settings.socialHandles && settings.socialHandles.filter((h) => h.isActive).length > 0 && (
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
                <div className="text-xs font-bold font-serif text-stone-900 dark:text-amber-100">Official Social Channels:</div>
                <div className="grid grid-cols-2 gap-2">
                  {settings.socialHandles
                    .filter((h) => h.isActive)
                    .map((h) => (
                      <a
                        key={h.id}
                        href={h.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-amber-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-800 dark:text-stone-200 transition-colors flex items-center justify-between"
                      >
                        <span>{h.platform}</span>
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">{h.handle}</span>
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-amber-100">Message Received</h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
                Thank you for contacting us. Our coordinator will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100 border-b border-[#121212]/10 dark:border-stone-800 pb-2">
                Send Direct Inquiry
              </h3>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Your Query / Requirements</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify pooja type, preferred dates, or yatra requirements..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-800 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-[#121212] dark:bg-amber-700 text-white font-medium text-sm hover:bg-stone-800 dark:hover:bg-amber-800 shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
