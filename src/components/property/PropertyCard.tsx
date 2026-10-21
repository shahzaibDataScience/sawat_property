import React, { useState } from 'react';
import { 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Heart, 
  Share2, 
  CheckCircle,
  Car
} from 'lucide-react';
import { PropertyListing } from '../../types/property';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavoritesContext';
import { generateWhatsAppLink } from '../../utils/propertyUtils';

interface PropertyCardProps {
  property: PropertyListing;
  onSelect: (slug: string, triggerElement?: HTMLElement) => void;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  viewMode = 'grid',
}) => {
  const { isUrdu } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [copied, setCopied] = useState(false);

  const favorited = isFavorite(property.id);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If opening in new tab (Ctrl/Cmd + click or middle click), allow default link navigation
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      return;
    }
    // Prevent standard page navigation & jump to top
    e.preventDefault();
    onSelect(property.slug, e.currentTarget);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/property/${property.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const whatsAppMessage = `Hello Swat Property, I am interested in: "${property.title}" (Ref: #${property.id.toUpperCase()}) listed for ${property.priceFormatted} in ${property.areaName}. Please share more details and arrange a visit.`;
  const whatsAppLink = generateWhatsAppLink(property.whatsapp, whatsAppMessage);

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-stone-200 overflow-hidden card-shadow card-shadow-hover flex transition-all text-left ${
        viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {/* Crawlable primary link for SEO and card click navigation */}
      <a
        href={`/property/${property.slug}`}
        onClick={handleCardClick}
        className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2f5d3a] rounded-2xl"
        aria-label={`View details for ${property.title}`}
      />
      {/* Property Image Container */}
      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'sm:w-2/5 h-64 sm:h-auto' : 'h-60 w-full'}`}>
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-xs pointer-events-auto ${
                property.purpose === 'sale' ? 'bg-[#2f5d3a]' : 'bg-emerald-700'
              }`}
            >
              {property.purpose === 'sale' 
                ? (isUrdu ? 'برائے فروخت' : 'For Sale') 
                : (isUrdu ? 'برائے کرایہ' : 'For Rent')}
            </span>

            {property.isFeatured && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-500 text-stone-900 shadow-xs pointer-events-auto">
                {isUrdu ? 'نمایاں' : 'Featured'}
              </span>
            )}
          </div>

          {/* Action buttons (Favorite & Share) */}
          <div className="flex items-center gap-1.5 pointer-events-auto z-20">
            <button
              type="button"
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-900 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Share Link"
              aria-label="Share property link"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={handleFavoriteToggle}
              className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                favorited ? 'text-red-500' : 'text-stone-700 hover:text-red-500'
              }`}
              title={favorited ? 'Remove from favorites' : 'Save to favorites'}
              aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Property Type Pill */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium capitalize">
            {property.type}
          </span>
        </div>
      </div>

      {/* Property Details Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Price & Verified Stamp */}
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-[#2f5d3a] tracking-tight">
                {property.priceFormatted}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              {isUrdu ? 'تصدیق شدہ' : 'Verified'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg line-clamp-1 mt-1 group-hover:text-[#2f5d3a] transition-colors">
            {isUrdu ? property.titleUrdu : property.title}
          </h3>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-stone-500 text-xs sm:text-sm mt-1 truncate">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{property.location}, {property.areaName}</span>
          </p>

          {/* Key Metrics (Beds, Baths, Area) */}
          <div className="grid grid-cols-3 gap-2 py-3 mt-3 border-y border-stone-100 text-stone-700 text-xs">
            {property.beds !== undefined && property.beds > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold">{property.beds}</span>
                <span className="text-stone-500">{isUrdu ? 'بیڈ' : 'Beds'}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold">{property.parking ?? 1}</span>
                <span className="text-stone-500">{isUrdu ? 'پارکنگ' : 'Park'}</span>
              </div>
            )}

            {property.baths !== undefined && property.baths > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold">{property.baths}</span>
                <span className="text-stone-500">{isUrdu ? 'باتھ' : 'Baths'}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold text-[11px]">{property.furnished ? 'Furnished' : 'Commercial'}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold">{property.areaValue}</span>
              <span className="text-stone-500">{property.areaUnit}</span>
            </div>
          </div>
        </div>

        {/* Card CTA Buttons: Call & WhatsApp */}
        <div className="relative z-20 flex items-center gap-2 pt-1" onClick={(e) => { e.stopPropagation(); }}>
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            title="Chat on WhatsApp about this property"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-300 text-emerald-300" />
            <span>{isUrdu ? 'واٹس ایپ' : 'WhatsApp'}</span>
          </a>

          <a
            href={`tel:${property.contactPhone}`}
            onClick={(e) => e.stopPropagation()}
            className="py-2.5 px-3 rounded-xl border border-stone-300 hover:border-emerald-700 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
            title="Call Swat Property Agent"
          >
            <Phone className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">{isUrdu ? 'کال' : 'Call'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
