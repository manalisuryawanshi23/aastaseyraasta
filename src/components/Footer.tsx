import React from 'react';
import {
  Flame,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Lock,
} from 'lucide-react';
import { StoreService } from '../services/store';

export const Footer: React.FC = () => {
  const settings = StoreService.getSettings();

  const poojaLinks = [
    { label: 'Rudrabhishek Pooja', href: '/pooja/rudrabhishek-pooja-ujjain' },
    { label: 'Bhat Pooja (Angareshwar)', href: '/pooja/bhat-pooja-angareshwar-ujjain' },
    { label: 'Bhat Pooja (Mangalnath)', href: '/pooja/bhat-pooja-mangalnath-ujjain' },
    { label: 'Mahamrityunjaya Jaap', href: '/pooja/mahamrityunjaya-jaap-ujjain' },
    { label: 'Baglamukhi Havan (Nalkheda)', href: '/pooja/baglamukhi-havan-nalkheda' },
    { label: 'Pitru Dosh & Narayan Bali', href: '/pooja/pitru-dosh-shanti-narayan-bali-ujjain' },
    { label: 'Kaal Sarp Dosh Shanti', href: '/pooja/kaal-sarp-dosh-shanti-ujjain' },
  ];

  const yatraLinks = [
    { label: 'Ujjain Spiritual Tour', href: '/spiritual-tours/ujjain-spiritual-tour' },
    { label: 'Ujjain + Omkareshwar Tour', href: '/spiritual-tours/ujjain-omkareshwar-tour' },
    { label: 'Ujjain + Omkareshwar + Indore', href: '/spiritual-tours/ujjain-omkareshwar-indore-tour' },
    { label: 'Ujjain + Baglamukhi Nalkheda', href: '/spiritual-tours/ujjain-baglamukhi-nalkheda-tour' },
    { label: 'Char Dham Yatra', href: '/spiritual-tours/char-dham-yatra-uttarakhand' },
  ];

  const destLinks = [
    { label: 'Ujjain Pilgrimage', href: '/destinations/ujjain' },
    { label: 'Omkareshwar Jyotirlinga', href: '/destinations/omkareshwar' },
    { label: 'Baglamukhi Nalkheda', href: '/destinations/nalkheda' },
    { label: 'Indore Gateways', href: '/destinations/indore' },
  ];

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-amber-950/60 relative overflow-hidden">
      
      {/* Background Subtle Mandala Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-800 to-amber-800 text-amber-300 flex items-center justify-center shadow-lg shadow-amber-900/30">
                <Flame className="w-6 h-6 fill-amber-300" />
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-amber-100 tracking-tight">
                  {settings.businessName}
                </div>
                <div className="text-xs font-serif text-amber-400">
                  {settings.hindiBusinessName} • &quot;{settings.tagline}&quot;
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {settings.footerDescription}
            </p>

            {/* Direct Contact info */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-stone-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}, {settings.state} - {settings.pincode}</span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono">{settings.phone1} / {settings.phone2}</span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Top Poojas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 font-serif">
              Sacred Pooja Services
            </h4>
            <ul className="space-y-2 text-xs">
              {poojaLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-amber-200 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Spiritual Yatras */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 font-serif">
              Spiritual Tours & Yatras
            </h4>
            <ul className="space-y-2 text-xs">
              {yatraLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-amber-200 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Destinations & Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 font-serif">
              Destinations & Info
            </h4>
            <ul className="space-y-2 text-xs">
              {destLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-amber-200 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-stone-800">
                <a href="/about-us" className="hover:text-amber-200">About Our Acharyas</a>
              </li>
              <li>
                <a href="/why-choose-us" className="hover:text-amber-200">Why Choose Us</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-amber-200">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-amber-200">Contact Us</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Middle Banner: Trust Signals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-amber-950/30 border border-amber-900/40 text-center text-xs">
          <div className="space-y-1">
            <div className="font-bold text-amber-300">Vedic Qualified Pandits</div>
            <div className="text-stone-400">Traditional Gurukul Lineage</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-amber-300">Complete Samagri Vidhi</div>
            <div className="text-stone-400">Pure Satvik Offerings</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-amber-300">Gotra Sankalp</div>
            <div className="text-stone-400">Personalized Devotional Vow</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-amber-300">Transparent Service</div>
            <div className="text-stone-400">No Hidden Promises</div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {settings.businessName}. All rights reserved. &quot;{settings.tagline}&quot;
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <a href="/privacy-policy" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-stone-300 transition-colors">Terms & Conditions</a>
            <a href="/disclaimer" className="hover:text-stone-300 transition-colors">Disclaimer</a>
            <a href="/refund-cancellation-policy" className="hover:text-stone-300 transition-colors">Cancellation Policy</a>
            <a href="/admin" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
