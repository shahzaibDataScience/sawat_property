import React, { useState, useEffect, useCallback, useRef } from 'react';
import { initialListings } from './data/listings';
import { PropertyListing, PropertyPurpose, PropertyType } from './types/property';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingContact } from './components/layout/FloatingContact';
import { FavoritesModal } from './components/property/FavoritesModal';
import { PropertyDetailModal } from './components/property/PropertyDetailModal';
import { unlockBodyScroll, getSavedScrollY } from './utils/scrollLock';

// Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { SellPage } from './pages/SellPage';
import { AreasPage } from './pages/AreasPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  // Store the base page route (e.g. '/', '/buy', '/rent', '/areas', etc.)
  const [currentBasePath, setCurrentBasePath] = useState<string>(() => {
    const path = window.location.pathname || '/';
    if (path.startsWith('/property/')) {
      return '/buy'; // base backdrop if direct link opened
    }
    return path;
  });

  // Track active property details modal
  const [activePropertySlug, setActivePropertySlug] = useState<string | null>(() => {
    const path = window.location.pathname || '/';
    if (path.startsWith('/property/')) {
      return path.replace('/property/', '');
    }
    return null;
  });

  const [listings, setListings] = useState<PropertyListing[]>(initialListings);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);

  // Reference to the element that triggered the modal to restore accessibility focus
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Stored scroll Y position before modal opened
  const savedScrollPositionRef = useRef<number>(0);

  // Configure manual scroll restoration to prevent browser jumping
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const path = window.location.pathname || '/';

      if (path.startsWith('/property/')) {
        const slug = path.replace('/property/', '');
        setActivePropertySlug(slug);
      } else {
        // Modal was open, user clicked browser back
        if (activePropertySlug) {
          setActivePropertySlug(null);
          unlockBodyScroll(savedScrollPositionRef.current);
        }
        setCurrentBasePath(path);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activePropertySlug]);

  // Standard page navigation (e.g., clicking navbar links)
  const navigate = useCallback((path: string) => {
    // If modal is open, close it
    if (activePropertySlug) {
      setActivePropertySlug(null);
      unlockBodyScroll(0);
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentBasePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePropertySlug]);

  // Open property details in-place in modal without losing scroll position
  const handleOpenPropertyModal = useCallback((slug: string, triggerEl?: HTMLElement) => {
    // Record current scroll position before opening
    const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    savedScrollPositionRef.current = currentY;

    if (triggerEl) {
      triggerElementRef.current = triggerEl;
    }

    // Update URL to /property/:slug for shareability without triggering a page reload
    const propertyUrl = `/property/${slug}`;
    window.history.pushState(
      { modal: true, slug, scrollY: currentY, basePath: currentBasePath },
      '',
      propertyUrl
    );

    setActivePropertySlug(slug);
  }, [currentBasePath]);

  // Close property details modal and restore exact scroll position
  const handleClosePropertyModal = useCallback(() => {
    setActivePropertySlug(null);

    // Revert URL back to the base path
    if (window.location.pathname.startsWith('/property/')) {
      window.history.pushState({}, '', currentBasePath);
    }

    // Unlock body scroll and restore exact saved scroll Y position
    unlockBodyScroll(savedScrollPositionRef.current);

    // Return focus to the clicked card element
    if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
      triggerElementRef.current.focus();
    }
  }, [currentBasePath]);

  // Swap property inside the open modal (e.g. from Similar Properties)
  const handleSwitchPropertyInModal = useCallback((slug: string) => {
    const propertyUrl = `/property/${slug}`;
    window.history.replaceState(
      { modal: true, slug, scrollY: savedScrollPositionRef.current, basePath: currentBasePath },
      '',
      propertyUrl
    );
    setActivePropertySlug(slug);
  }, [currentBasePath]);

  const handleAddListing = (newProperty: PropertyListing) => {
    setListings((prev) => [newProperty, ...prev]);
  };

  // Find active property for modal
  const activeProperty = activePropertySlug
    ? listings.find((p) => p.slug === activePropertySlug) || null
    : null;

  // Dynamic SEO title & meta description updater
  useEffect(() => {
    let title = 'Swat Property – Buy, Sell & Rent Properties in Swat';
    let description =
      'Find houses, plots, land, shops, and flats for sale and rent in Swat Valley, Pakistan. Verified listings in Mingora, Saidu Sharif, Kalam, Malam Jabba.';

    if (activeProperty) {
      title = `${activeProperty.title} | Swat Property`;
      description = `${activeProperty.priceFormatted} - ${activeProperty.areaValue} ${activeProperty.areaUnit} in ${activeProperty.areaName}, Swat. ${activeProperty.description.slice(0, 110)}...`;
    } else if (currentBasePath === '/buy') {
      title = 'Properties for Sale in Swat – Houses & Plots | Swat Property';
      description =
        'Browse 100% verified houses, commercial shops, plots, and land for sale in Mingora, Kalam, and Saidu Sharif Swat.';
    } else if (currentBasePath === '/rent') {
      title = 'Houses & Flats for Rent in Swat | Swat Property';
      description =
        'Find furnished and unfurnished rental homes, apartments, shops, and vacation cottages in Swat Valley, KPK.';
    } else if (currentBasePath === '/sell') {
      title = 'List Your Property for Free in Swat | Swat Property';
      description =
        'Sell or rent your house, plot, or commercial property with Swat Property. Direct connection with verified buyers.';
    } else if (currentBasePath === '/areas') {
      title = 'Areas We Serve in Swat – Mingora, Kalam & Malam Jabba';
      description =
        'Local real estate guides and price trends across 10 areas in Swat Valley: Mingora, Saidu Sharif, Kalam, Malam Jabba, Fizagat.';
    } else if (currentBasePath.startsWith('/areas/')) {
      const areaSlug = currentBasePath.replace('/areas/', '');
      const formattedArea = areaSlug.charAt(0).toUpperCase() + areaSlug.slice(1).replace('-', ' ');
      title = `Property in ${formattedArea}, Swat – Prices & Listings`;
      description = `Explore houses, plots, and hotel land in ${formattedArea}, Swat Valley with direct WhatsApp and Call.`;
    } else if (currentBasePath === '/about') {
      title = 'About Us – Swat Property Real Estate Agency';
      description =
        'Over 15 years of trusted real estate advisory in Swat Valley. 100% legal title auditing with KPK Revenue Department.';
    } else if (currentBasePath === '/blog') {
      title = 'Swat Real Estate Guides & Legal Insights | Swat Property';
      description =
        'Read guides on Fard, Intiqal, Marla calculation, and tourism hotel investment in Swat Valley, Pakistan.';
    } else if (currentBasePath === '/contact') {
      title = 'Contact Swat Property – Mingora Head Office & WhatsApp';
      description =
        'Visit our office on Main Bypass Road, Fizagat, Mingora, Swat, KP or call +92 300 1234567 for immediate property assistance in Swat.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [activeProperty, currentBasePath]);

  // Route Resolver for the background / base page
  const renderBasePage = () => {
    // 1. Buy Page: /buy
    if (currentBasePath === '/buy') {
      return (
        <CatalogPage
          key="buy-page"
          initialPurpose="sale"
          listings={listings}
          onSelectProperty={handleOpenPropertyModal}
          onNavigate={navigate}
        />
      );
    }

    // 2. Rent Page: /rent
    if (currentBasePath === '/rent') {
      return (
        <CatalogPage
          key="rent-page"
          initialPurpose="rent"
          listings={listings}
          onSelectProperty={handleOpenPropertyModal}
          onNavigate={navigate}
        />
      );
    }

    // 3. Sell / List Property: /sell
    if (currentBasePath === '/sell') {
      return (
        <SellPage
          onAddListing={handleAddListing}
          onSelectProperty={handleOpenPropertyModal}
        />
      );
    }

    // 4. Areas Hub or Single Area: /areas or /areas/:slug
    if (currentBasePath === '/areas' || currentBasePath.startsWith('/areas/')) {
      const areaSlug = currentBasePath.startsWith('/areas/')
        ? currentBasePath.replace('/areas/', '')
        : undefined;
      return (
        <AreasPage
          selectedAreaSlug={areaSlug}
          listings={listings}
          onSelectArea={(slug) => navigate(`/areas/${slug}`)}
          onSelectProperty={handleOpenPropertyModal}
          onNavigate={navigate}
        />
      );
    }

    // 5. About Page: /about
    if (currentBasePath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 6. Blog Page or Single Blog: /blog or /blog/:slug
    if (currentBasePath === '/blog' || currentBasePath.startsWith('/blog/')) {
      const blogSlug = currentBasePath.startsWith('/blog/')
        ? currentBasePath.replace('/blog/', '')
        : undefined;
      return (
        <BlogPage
          selectedBlogSlug={blogSlug}
          onSelectBlog={(slug) => navigate(`/blog/${slug}`)}
          onNavigate={navigate}
        />
      );
    }

    // 7. Testimonials: /testimonials
    if (currentBasePath === '/testimonials') {
      return <TestimonialsPage />;
    }

    // 8. FAQ: /faq
    if (currentBasePath === '/faq') {
      return <FaqPage />;
    }

    // 9. Contact: /contact
    if (currentBasePath === '/contact') {
      return <ContactPage />;
    }

    // 10. Terms: /terms
    if (currentBasePath === '/terms') {
      return <LegalPage type="terms" />;
    }

    // 11. Privacy Policy: /privacy
    if (currentBasePath === '/privacy') {
      return <LegalPage type="privacy" />;
    }

    // 12. Home Page: / or default
    if (currentBasePath === '/' || currentBasePath === '') {
      return (
        <HomePage
          listings={listings}
          onSelectProperty={handleOpenPropertyModal}
          onNavigate={navigate}
          onApplySearch={(criteria) => {
            if (criteria.purpose === 'sale') {
              navigate('/buy');
            } else {
              navigate('/rent');
            }
          }}
        />
      );
    }

    // Fallback 404
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <LanguageProvider>
      <FavoritesProvider>
        <div className="min-h-screen flex flex-col bg-[#fcfbf7] selection:bg-[#2f5d3a] selection:text-white">
          <Navbar
            currentPath={currentBasePath}
            onNavigate={navigate}
            onOpenFavorites={() => setFavoritesModalOpen(true)}
          />

          <main className="flex-1">
            {renderBasePage()}
          </main>

          <Footer onNavigate={navigate} />

          <FloatingContact />

          {/* Saved Favorites Drawer */}
          <FavoritesModal
            isOpen={favoritesModalOpen}
            onClose={() => setFavoritesModalOpen(false)}
            onSelectProperty={handleOpenPropertyModal}
          />

          {/* In-Place Property Details Modal (opens on top without losing scroll position!) */}
          {activeProperty && (
            <PropertyDetailModal
              property={activeProperty}
              allListings={listings}
              isOpen={Boolean(activeProperty)}
              onClose={handleClosePropertyModal}
              onSelectProperty={handleSwitchPropertyInModal}
              triggerElementRef={triggerElementRef.current}
            />
          )}
        </div>
      </FavoritesProvider>
    </LanguageProvider>
  );
}
