import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Search,
  Menu,
  X,
  Sparkles,
  Flame,
  ChevronDown,
  Lock,
  Compass,
  MapPin,
  BookOpen,
} from 'lucide-react';
import { StoreService } from '../services/store';

interface NavbarProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour', name?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const settings = StoreService.getSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Pooja Services', href: '/pooja-services' },
    { label: 'Spiritual Tours', href: '/spiritual-tours' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 to-red-950 text-amber-100/90 text-xs py-2 px-4 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Location & Tagline */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Mahakal Marg, Ujjain</span>
            </span>
            <span className="hidden md:inline text-amber-400/40">•</span>
            <span className="hidden md:inline text-amber-200/80 font-serif italic">
              &quot;{settings.tagline}&quot;
            </span>
          </div>

          {/* Quick Contact & WhatsApp */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${settings.phone1}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="font-mono">{settings.phone1}</span>
            </a>
            <a
              href={`tel:${settings.phone2}`}
              className="hidden lg:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="font-mono">{settings.phone2}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp</span>
            </a>
            <a
              href="/admin"
              className="flex items-center gap-1 text-amber-300/80 hover:text-amber-200 transition-colors pl-2 border-l border-amber-800/60"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>Admin CMS</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`w-full bg-white/95 backdrop-blur-md transition-all border-b border-stone-200/80 ${
          isScrolled ? 'shadow-md py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-800 via-amber-700 to-amber-900 text-amber-200 flex items-center justify-center shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg sm:text-xl text-stone-900 tracking-tight leading-tight group-hover:text-amber-800 transition-colors">
                {settings.businessName}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-amber-800 tracking-widest font-serif">
                  {settings.hindiBusinessName}
                </span>
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                  Ujjain
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-800 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-700 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors flex items-center gap-2 text-xs font-medium"
              title="Search site"
            >
              <Search className="w-4 h-4 text-amber-800" />
              <span className="hidden xl:inline">Search</span>
            </button>

            {/* Book / Enquire Button */}
            <button
              onClick={() => onOpenBooking()}
              className="py-2.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-red-800 via-amber-800 to-amber-900 text-white font-medium text-xs sm:text-sm hover:from-red-900 hover:to-amber-950 shadow-md shadow-amber-900/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book / Enquire</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 text-stone-100 border-b border-amber-900/50 p-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-medium text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-amber-900/40 text-stone-200 hover:text-amber-200 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-stone-800 flex flex-col gap-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={`tel:${settings.phone1}`}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-800 text-amber-200 font-medium text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call {settings.phone1}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
