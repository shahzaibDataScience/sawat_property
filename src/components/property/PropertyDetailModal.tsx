import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Car, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Heart, 
  Share2, 
  Calendar, 
  CheckCircle2, 
  Check, 
  ChevronLeft,
  ChevronRight,
  Calculator,
  Compass,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PropertyListing } from '../../types/property';
import { ImageLightbox } from './ImageLightbox';
import { MortgageCalculator } from './MortgageCalculator';
import { PropertyCard } from './PropertyCard';
import { PropertyDetailSkeleton } from './PropertyDetailSkeleton';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavoritesContext';
import { generateWhatsAppLink, formatPricePKR } from '../../utils/propertyUtils';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scrollLock';

interface PropertyDetailModalProps {
  property: PropertyListing;
  allListings: PropertyListing[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty: (slug: string) => void;
  triggerElementRef?: HTMLElement | null;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  allListings,
  isOpen,
  onClose,
  onSelectProperty,
  triggerElementRef,
}) => {
  const { isUrdu } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activePhotoCategory, setActivePhotoCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  // Lead inquiry form
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Drag to close bottom sheet on mobile
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchCurrentY, setTouchCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Trigger subtle skeleton screen whenever property ID changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Preload primary image and simulate snappy processing transition
      const img = new Image();
      img.src = property.images[0];
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 260);

      return () => clearTimeout(timer);
    }
  }, [isOpen, property.id]);

  const favorited = isFavorite(property.id);

  // Manage body scroll lock
  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
      // Reset inner scroll
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      // Focus close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }

    return () => {
      if (isOpen) {
        unlockBodyScroll();
        // Return focus to clicked card
        if (triggerElementRef && typeof triggerElementRef.focus === 'function') {
          triggerElementRef.focus();
        }
      }
    };
  }, [isOpen, triggerElementRef]);

  // Handle escape key & focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else if (showBookingModal) {
          setShowBookingModal(false);
        } else {
          onClose();
        }
        return;
      }

      // Simple focus trap inside modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxOpen, showBookingModal, onClose]);

  // Mobile drag touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only allow drag-to-close from the top drag handle area
    setTouchStartY(e.touches[0].clientY);
    setTouchCurrentY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    if (currentY > touchStartY) {
      setTouchCurrentY(currentY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const dragDistance = touchCurrentY - touchStartY;
    if (dragDistance > 120) {
      onClose();
    }
    setTouchStartY(0);
    setTouchCurrentY(0);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/property/${property.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setShowBookingModal(false);
      setFormSubmitted(false);
    }, 2200);
  };

  const whatsAppMessage = `Hello Swat Property, I am viewing: "${property.title}" (Ref: #${property.id.toUpperCase()}) listed for ${property.priceFormatted} in ${property.areaName}. Please schedule a site visit and share verified legal records.`;
  const whatsAppLink = generateWhatsAppLink(property.whatsapp, whatsAppMessage);

  // Categorized Photos (Exterior, Living Room, Bedroom, Kitchen, Bathroom, Views)
  const categorizedImages = useMemo(() => {
    const categories: Record<string, string[]> = {
      'Exterior': [property.images[0]],
      'Living Room': property.images.length > 1 ? [property.images[1]] : [property.images[0]],
      'Bedroom': property.images.length > 2 ? [property.images[2]] : [property.images[0]],
      'Kitchen': property.images.length > 3 ? [property.images[3]] : [property.images[0]],
      'Bathroom': property.images.length > 4 ? [property.images[4]] : [property.images[0]],
      'Mountain View': property.images.length > 0 ? [property.images[property.images.length - 1]] : [],
    };
    return categories;
  }, [property.images]);

  const displayedPhotos = useMemo(() => {
    if (activePhotoCategory === 'All') return property.images;
    return categorizedImages[activePhotoCategory] || property.images;
  }, [activePhotoCategory, property.images, categorizedImages]);

  // Similar properties
  const similarProperties = allListings
    .filter((p) => p.id !== property.id && (p.areaName === property.areaName || p.type === property.type))
    .slice(0, 3);

  // Map embed URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&hl=en&z=14&output=embed`;

  if (!isOpen) return null;

  const dragOffset = isDragging ? Math.max(0, touchCurrentY - touchStartY) : 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
      ref={modalRef}
    >
      {/* Dark Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Lightbox Component */}
      <ImageLightbox
        images={property.images}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={setActiveImageIndex}
      />

      {/* Main Modal / Bottom Sheet Box */}
      <div 
        className="relative w-full max-w-5xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col h-[92vh] sm:h-[88vh] z-10 overflow-hidden transition-transform duration-200"
        style={{
          transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
        }}
      >
        {/* Mobile Drag Handle */}
        <div 
          className="sm:hidden w-full pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing bg-stone-50 border-b border-stone-100 touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 rounded-full bg-stone-300" />
        </div>

        {/* Sticky Header with Title, Price, Action Icons, and Close X */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-stone-200 flex items-center justify-between gap-3 shadow-2xs">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-white ${
                property.purpose === 'sale' ? 'bg-[#2f5d3a]' : 'bg-emerald-700'
              }`}>
                {property.purpose === 'sale' ? (isUrdu ? 'برائے فروخت' : 'For Sale') : (isUrdu ? 'برائے کرایہ' : 'For Rent')}
              </span>
              <span className="text-xs font-semibold text-stone-500">
                {property.areaName}, Swat • Ref #{property.id.toUpperCase()}
              </span>
            </div>

            <h2 
              id="modal-property-title" 
              className="text-base sm:text-xl font-bold font-heading text-stone-900 truncate mt-0.5"
            >
              {isUrdu ? property.titleUrdu : property.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Price</span>
              <span className="text-lg sm:text-xl font-extrabold text-[#2f5d3a]">
                {property.priceFormatted}
              </span>
            </div>

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer ${
                favorited
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'border-stone-200 hover:bg-stone-50 text-stone-700'
              }`}
              title={favorited ? 'Remove from favorites' : 'Save to favorites'}
              aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-red-600 text-red-600' : ''}`} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 sm:p-2.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 transition-all cursor-pointer"
              title="Share property link"
              aria-label="Share property link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close Modal X */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all cursor-pointer"
              title="Close (Esc)"
              aria-label="Close property details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body (scrolls inside modal only!) */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-5 space-y-8"
        >
          {isLoading ? (
            <PropertyDetailSkeleton />
          ) : (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Price display on mobile */}
              <div className="sm:hidden flex items-baseline justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <span className="text-xs text-stone-500 font-medium">Demand Price</span>
                  <p className="text-2xl font-extrabold text-[#2f5d3a]">{property.priceFormatted}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200">
                  100% Verified
                </span>
              </div>

          {/* Categorized Photo Gallery Section */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Photo Gallery ({property.images.length} Verified Photos)
              </span>

              {/* Photo Category Filter Tabs */}
              <div className="flex flex-wrap gap-1 text-xs">
                {['All', 'Exterior', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Mountain View'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActivePhotoCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      activePhotoCategory === cat
                        ? 'bg-[#2f5d3a] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 rounded-2xl overflow-hidden">
              {displayedPhotos.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const realIndex = property.images.indexOf(img);
                    setActiveImageIndex(realIndex >= 0 ? realIndex : 0);
                    setLightboxOpen(true);
                  }}
                  className={`relative group cursor-pointer overflow-hidden rounded-xl bg-stone-100 ${
                    idx === 0 ? 'col-span-2 row-span-2 h-64 sm:h-80' : 'h-32 sm:h-38'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${property.title} - photo ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view full screen
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Facts & Specs Grid */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
            <h3 className="font-bold text-sm text-stone-900 font-heading border-b border-stone-200 pb-2">
              {isUrdu ? 'بنیادی خصوصیات اور پیمائش' : 'Key Property Specifications'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Area Size</span>
                <p className="font-bold text-stone-800 flex items-center gap-1.5 mt-0.5">
                  <Maximize className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{property.areaValue} {property.areaUnit}</span>
                </p>
              </div>

              {property.beds !== undefined && (
                <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Bedrooms</span>
                  <p className="font-bold text-stone-800 flex items-center gap-1.5 mt-0.5">
                    <Bed className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{property.beds} Master Beds</span>
                  </p>
                </div>
              )}

              {property.baths !== undefined && (
                <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Bathrooms</span>
                  <p className="font-bold text-stone-800 flex items-center gap-1.5 mt-0.5">
                    <Bath className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{property.baths} Attached</span>
                  </p>
                </div>
              )}

              <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Parking</span>
                <p className="font-bold text-stone-800 flex items-center gap-1.5 mt-0.5">
                  <Car className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{property.parking ?? 1} Vehicles</span>
                </p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Furnished</span>
                <p className="font-bold text-stone-800 capitalize mt-0.5">
                  {property.furnished === true ? 'Yes (Furnished)' : property.furnished === 'Semi-Furnished' ? 'Semi-Furnished' : 'Unfurnished'}
                </p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Property Type</span>
                <p className="font-bold text-stone-800 capitalize mt-0.5">{property.type}</p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Purpose</span>
                <p className="font-bold text-stone-800 capitalize mt-0.5">For {property.purpose}</p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Land Registry</span>
                <p className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Fard</span>
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-stone-900 font-heading">
              {isUrdu ? 'پراپرٹی کی مکمل تفصیل' : 'Property Overview & Features'}
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {property.description}
            </p>
            {property.descriptionUrdu && (
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-stone-800 font-urdu leading-loose text-sm sm:text-base text-right">
                {property.descriptionUrdu}
              </div>
            )}
          </div>

          {/* Amenities checklist */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-stone-900 font-heading">
              {isUrdu ? 'موجود سہولیات' : 'Amenities & Facilities Included'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-100 text-xs text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 font-heading flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{property.address}</span>
              </h3>
              <span className="text-xs text-stone-500">{property.areaName}, Swat</span>
            </div>
            <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-stone-200">
              <iframe
                title={`Map of ${property.title}`}
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Mortgage Calculator (if for sale) */}
          {property.purpose === 'sale' && (
            <div className="pt-2">
              <MortgageCalculator initialPrice={property.price} />
            </div>
          )}

          {/* Similar Properties (swaps content smoothly without closing modal!) */}
          {similarProperties.length > 0 && (
            <div className="pt-6 border-t border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-stone-900 font-heading">
                  {isUrdu ? 'اسی علاقے کی دیگر دستیاب جائیدادیں' : `Similar Properties in ${property.areaName}`}
                </h3>
                <span className="text-xs text-stone-500">Click to switch</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similarProperties.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => {
                      setIsLoading(true);
                      onSelectProperty(sim.slug);
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="p-3 bg-stone-50 hover:bg-emerald-50/50 rounded-xl border border-stone-200 hover:border-emerald-300 transition-all cursor-pointer flex gap-3 group"
                  >
                    <img
                      src={sim.images[0]}
                      alt={sim.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                        {sim.purpose === 'sale' ? 'For Sale' : 'For Rent'}
                      </span>
                      <h4 className="font-bold text-xs text-stone-800 truncate group-hover:text-[#2f5d3a]">
                        {sim.title}
                      </h4>
                      <p className="text-xs font-semibold text-[#2f5d3a] mt-0.5">
                        {sim.priceFormatted}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
            </div>
          )}
        </div>

        {/* Sticky Bottom Bar with Call, WhatsApp, and "Book a Visit" */}
        <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="hidden sm:block">
            <span className="text-[11px] text-stone-500 font-medium block">
              Reference: #{property.id.toUpperCase()}
            </span>
            <span className="text-lg font-extrabold text-[#2f5d3a]">
              {property.priceFormatted}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`tel:${property.contactPhone}`}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>Call Agent</span>
            </a>

            <button
              onClick={() => setShowBookingModal(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Visit</span>
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Nested Book a Visit Popup */}
        {showBookingModal && (
          <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h4 className="font-bold text-stone-900 font-heading">
                  Schedule an On-Site Visit
                </h4>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formSubmitted ? (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-sm text-stone-900">Visit Request Booked!</p>
                  <p className="text-xs text-stone-500">Our Mingora agent will confirm your visit time via phone.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Khan"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Preferred Visit Date</label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 outline-none text-xs bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white font-bold text-xs transition-all shadow-xs cursor-pointer mt-2"
                  >
                    Confirm Visit Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
