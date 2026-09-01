import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { AmbientAudioPlayer } from './components/AmbientAudioPlayer';
import { BookingModal } from './components/BookingModal';
import { SearchModal } from './components/SearchModal';
import { SupportChatWidget } from './components/SupportChatWidget';
import { PageTransition } from './components/PageTransition';

import { HomePage } from './pages/HomePage';
import { PoojaListingPage } from './pages/PoojaListingPage';
import { PoojaDetailPage } from './pages/PoojaDetailPage';
import { TourListingPage } from './pages/TourListingPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { DestinationListingPage } from './pages/DestinationListingPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { SavedItemsPage } from './pages/SavedItemsPage';
import { HTMLSitemapPage } from './pages/HTMLSitemapPage';
import { GalleryPage } from './pages/GalleryPage';
import { StoreService } from './services/store';
import { applyBrandColorPalette } from './utils/brandTheme';
import { useApiSync } from './hooks/useApiSync';

export default function App() {
  // Sync MySQL API data into localStorage on every page load
  useApiSync();

  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDefaultType, setBookingDefaultType] = useState<'Pooja' | 'Tour' | 'Destination' | 'General'>('Pooja');
  const [bookingDefaultName, setBookingDefaultName] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    // Apply persisted brand color palette on mount
    const settings = StoreService.getSettings();
    if (settings && settings.brandPalette) {
      applyBrandColorPalette(settings.brandPalette);
    }
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);

    // Intercept client-side link clicks for smooth routing
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (
        target &&
        target.href &&
        target.href.startsWith(window.location.origin) &&
        !target.getAttribute('target')
      ) {
        const url = new URL(target.href);
        if (url.pathname !== currentPath) {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname);
          setCurrentPath(url.pathname);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [currentPath]);

  const handleOpenBooking = (type?: 'Pooja' | 'Tour' | 'Destination' | 'General', name?: string) => {
    if (type) setBookingDefaultType(type);
    if (name) setBookingDefaultName(name);
    else setBookingDefaultName('');
    setBookingModalOpen(true);
  };

  // Simple URL Route matching
  const renderCurrentView = () => {
    const path = currentPath;

    if (path === '/' || path === '') {
      return (
        <HomePage
          onOpenBooking={handleOpenBooking}
          onOpenSearch={() => setSearchModalOpen(true)}
        />
      );
    }

    if (path === '/mool-shanti-pooja-ujjain') {
      return <PoojaDetailPage slug="mool-shanti-pooja-ujjain" onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/rudrabhishek-pooja-ujjain') {
      return <PoojaDetailPage slug="rudrabhishek-pooja-ujjain" onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/pooja-services' || path === '/poojas' || path === '/pooja') {
      return <PoojaListingPage onOpenBooking={handleOpenBooking} />;
    }

    if (path.startsWith('/pooja/')) {
      const slug = path.replace('/pooja/', '');
      return <PoojaDetailPage slug={slug} onOpenBooking={handleOpenBooking} />;
    }

    if (path.startsWith('/poojas/')) {
      const slug = path.replace('/poojas/', '');
      return <PoojaDetailPage slug={slug} onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/spiritual-tours' || path === '/tours' || path === '/tour') {
      return <TourListingPage onOpenBooking={handleOpenBooking} />;
    }

    if (path.startsWith('/spiritual-tours/')) {
      const slug = path.replace('/spiritual-tours/', '');
      return <TourDetailPage slug={slug} onOpenBooking={handleOpenBooking} />;
    }

    if (path.startsWith('/tours/')) {
      const slug = path.replace('/tours/', '');
      return <TourDetailPage slug={slug} onOpenBooking={handleOpenBooking} />;
    }

    if (path.startsWith('/tour/')) {
      const slug = path.replace('/tour/', '');
      return <TourDetailPage slug={slug} onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/destinations') {
      return <DestinationListingPage onOpenBooking={handleOpenBooking} />;
    }

    if (path.startsWith('/destinations/')) {
      const slug = path.replace('/destinations/', '');
      return <DestinationDetailPage slug={slug} onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/blog') {
      return <BlogListingPage />;
    }

    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return <BlogDetailPage slug={slug} />;
    }

    if (path === '/about-us' || path === '/why-choose-us') {
      return <AboutPage onOpenBooking={() => handleOpenBooking('General')} />;
    }

    if (path === '/contact') {
      return <ContactPage />;
    }

    if (path === '/saved-items') {
      return <SavedItemsPage onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/gallery' || path === '/photos' || path === '/photo-gallery') {
      return <GalleryPage onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/site-map' || path === '/sitemap') {
      return <HTMLSitemapPage />;
    }

    if (path.startsWith('/admin') || path.startsWith('/dashboard')) {
      return <AdminPage defaultPath={path} />;
    }

    // Default fallback to Home
    return (
      <HomePage
        onOpenBooking={handleOpenBooking}
        onOpenSearch={() => setSearchModalOpen(true)}
      />
    );
  };

  const isAdminRoute = currentPath.startsWith('/admin') || currentPath.startsWith('/dashboard');

  return (
    <ThemeProvider>
      <LanguageProvider>
        {isAdminRoute ? (
          // DEDICATED ADMIN WORKSPACE (No Public Header, Footer, Audio Player, or Chat Widget)
          <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-amber-200 dark:selection:bg-amber-900/60 selection:text-stone-900 dark:selection:text-amber-100">
            {renderCurrentView()}
          </div>
        ) : (
          // PUBLIC WEBSITE LAYOUT (Navbar + Main Content + Footer + Interactive Modals)
          <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#121110] text-[#121212] dark:text-[#F4F1EA] flex flex-col font-sans selection:bg-amber-200 dark:selection:bg-amber-900/60 selection:text-stone-900 dark:selection:text-amber-100 transition-colors duration-300">
            {/* Sticky Top Header Navigation */}
            <Navbar
              onOpenBooking={() => handleOpenBooking('General')}
              onOpenSearch={() => setSearchModalOpen(true)}
            />

            {/* Main Page Body */}
            <main className="flex-1 pb-16 lg:pb-0 overflow-x-hidden">
              <PageTransition routeKey={currentPath}>
                {renderCurrentView()}
              </PageTransition>
            </main>

            {/* Footer */}
            <Footer />

            {/* Sticky Mobile Navigation CTA bar */}
            <MobileStickyCTA onOpenBooking={() => handleOpenBooking('General')} />

            {/* Audio Atmosphere Player */}
            <AmbientAudioPlayer />

            {/* Modals */}
            <BookingModal
              isOpen={bookingModalOpen}
              onClose={() => setBookingModalOpen(false)}
              defaultServiceType={bookingDefaultType}
              defaultServiceName={bookingDefaultName}
            />

            <SearchModal
              isOpen={searchModalOpen}
              onClose={() => setSearchModalOpen(false)}
            />

            {/* Floating Support Chat Widget */}
            <SupportChatWidget onOpenBooking={handleOpenBooking} />
          </div>
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
}
