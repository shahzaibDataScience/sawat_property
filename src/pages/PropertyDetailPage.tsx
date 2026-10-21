import React, { useState } from 'react';
import { 
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
  ArrowLeft, 
  CheckCircle2, 
  Copy, 
  FileText,
  Building,
  Check
} from 'lucide-react';
import { PropertyListing } from '../types/property';
import { ImageLightbox } from '../components/property/ImageLightbox';
import { MortgageCalculator } from '../components/property/MortgageCalculator';
import { PropertyCard } from '../components/property/PropertyCard';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { generateWhatsAppLink, formatPricePKR } from '../utils/propertyUtils';

interface PropertyDetailPageProps {
  property: PropertyListing;
  allListings: PropertyListing[];
  onSelectProperty: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  allListings,
  onSelectProperty,
  onNavigate,
}) => {
  const { isUrdu } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Inquiry form states
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState(
    `I am interested in "${property.title}" (Ref: #${property.id.toUpperCase()}) and would like to schedule a site visit.`
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const favorited = isFavorite(property.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setFormSubmitted(true);
  };

  const whatsAppMessage = `Assalam-o-Alaikum, I am interested in this property on Swat Property Portal: ${property.title} (${property.priceFormatted})`;
  const whatsAppLink = `https://wa.me/923001234567?text=${encodeURIComponent(whatsAppMessage)}`;

  // Similar properties in same area or type
  const similarProperties = allListings
    .filter((p) => p.id !== property.id && (p.areaName === property.areaName || p.type === property.type))
    .slice(0, 3);

  // Google Maps embed URL using coordinates
  const mapEmbedUrl = `https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&hl=en&z=14&output=embed`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Lightbox Modal */}
      <ImageLightbox
        images={property.images}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={setActiveImageIndex}
      />

      {/* Breadcrumbs & Navigation Back */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-stone-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:text-[#2f5d3a] cursor-pointer">
            {isUrdu ? 'ہوم' : 'Home'}
          </button>
          <span>/</span>
          <button 
            onClick={() => onNavigate(property.purpose === 'sale' ? '/buy' : '/rent')} 
            className="hover:text-[#2f5d3a] cursor-pointer"
          >
            {property.purpose === 'sale' ? (isUrdu ? 'برائے فروخت' : 'For Sale') : (isUrdu ? 'برائے کرایہ' : 'For Rent')}
          </button>
          <span>/</span>
          <button onClick={() => onNavigate(`/areas/${property.areaName.toLowerCase().replace(/\s+/g, '-')}`)} className="hover:text-[#2f5d3a] cursor-pointer">
            {property.areaName}
          </button>
          <span>/</span>
          <span className="text-stone-800 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {property.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? (isUrdu ? 'لنک کاپی ہو گیا!' : 'Copied!') : (isUrdu ? 'شیئر کریں' : 'Share')}</span>
          </button>

          <button
            onClick={() => toggleFavorite(property.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-semibold ${
              favorited
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'border-stone-300 hover:bg-stone-50 text-stone-700'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-red-600 text-red-600' : ''}`} />
            <span>{favorited ? (isUrdu ? 'محفوظ ہے' : 'Saved') : (isUrdu ? 'محفوظ کریں' : 'Save')}</span>
          </button>
        </div>
      </div>

      {/* Title & Price Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white ${
                property.purpose === 'sale' ? 'bg-[#2f5d3a]' : 'bg-emerald-700'
              }`}
            >
              {property.purpose === 'sale' ? (isUrdu ? 'برائے فروخت' : 'For Sale') : (isUrdu ? 'برائے کرایہ' : 'For Rent')}
            </span>

            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {isUrdu ? '100% فرد و انتقال تصدیق شدہ' : '100% Verified Patwari Record'}
            </span>

            <span className="text-xs text-stone-400">
              ID: #{property.id.toUpperCase()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900 tracking-tight">
            {isUrdu ? property.titleUrdu : property.title}
          </h1>

          <p className="flex items-center gap-1.5 text-stone-600 text-xs sm:text-sm">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{property.address}</span>
          </p>
        </div>

        <div className="lg:text-right">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            {property.purpose === 'sale' ? (isUrdu ? 'ڈیمانڈ قیمت' : 'Demand Price') : (isUrdu ? 'ماہانہ کرایہ' : 'Monthly Rent')}
          </span>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#2f5d3a] tracking-tight">
            {property.priceFormatted}
          </p>
          <p className="text-xs text-stone-500">
            {property.areaValue} {property.areaUnit} ({property.areaUnit === 'Marla' ? `${property.areaValue * 225} Sq. Ft.` : ''})
          </p>
        </div>
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden">
        {/* Main large image */}
        <div
          onClick={() => {
            setActiveImageIndex(0);
            setLightboxOpen(true);
          }}
          className="md:col-span-2 md:row-span-2 h-72 sm:h-96 md:h-[440px] relative group cursor-pointer overflow-hidden rounded-2xl"
        >
          <img
            src={property.images[0]}
            alt={property.title}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span>Click to View Full Screen Gallery ({property.images.length} Photos)</span>
          </div>
        </div>

        {/* Thumbnail sub-images */}
        {property.images.slice(1, 5).map((img, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveImageIndex(idx + 1);
              setLightboxOpen(true);
            }}
            className="h-36 sm:h-44 md:h-[214px] relative group cursor-pointer overflow-hidden rounded-2xl"
          >
            <img
              src={img}
              alt={`${property.title} preview ${idx + 2}`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-all" />
          </div>
        ))}
      </div>

      {/* Main Content Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Left Column: Key Facts, Description, Amenities, Map, Calculator */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Facts Table */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 card-shadow space-y-4">
            <h3 className="text-lg font-bold font-heading text-stone-900 border-b border-stone-100 pb-3">
              {isUrdu ? 'بنیادی تفصیلات' : 'Key Property Facts'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-500 block text-xs">{isUrdu ? 'رقبہ / سائز' : 'Area Size'}</span>
                <p className="font-bold text-stone-800 flex items-center gap-1.5">
                  <Maximize className="w-4 h-4 text-emerald-700" />
                  <span>{property.areaValue} {property.areaUnit}</span>
                </p>
              </div>

              {property.beds !== undefined && (
                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <span className="text-stone-500 block text-xs">{isUrdu ? 'بیڈ رومز' : 'Bedrooms'}</span>
                  <p className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-emerald-700" />
                    <span>{property.beds} Master Beds</span>
                  </p>
                </div>
              )}

              {property.baths !== undefined && (
                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <span className="text-stone-500 block text-xs">{isUrdu ? 'باتھ رومز' : 'Bathrooms'}</span>
                  <p className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-emerald-700" />
                    <span>{property.baths} Attached Baths</span>
                  </p>
                </div>
              )}

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-500 block text-xs">{isUrdu ? 'گاڑی پارکنگ' : 'Car Parking'}</span>
                <p className="font-bold text-stone-800 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-emerald-700" />
                  <span>{property.parking ?? 1} Vehicles</span>
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-500 block text-xs">{isUrdu ? 'فرنشڈ حیثیت' : 'Furnishing'}</span>
                <p className="font-bold text-stone-800 capitalize">
                  {property.furnished === true ? 'Fully Furnished' : property.furnished === 'Semi-Furnished' ? 'Semi-Furnished' : 'Unfurnished'}
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-500 block text-xs">{isUrdu ? 'پراپرٹی کی قسم' : 'Property Type'}</span>
                <p className="font-bold text-stone-800 capitalize">{property.type}</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-500 block text-xs">{isUrdu ? 'مقصد' : 'Purpose'}</span>
                <p className="font-bold text-stone-800 capitalize">For {property.purpose}</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-500 block text-xs">{isUrdu ? 'پوسٹ تاریخ' : 'Posted Date'}</span>
                <p className="font-bold text-stone-800">{property.postedDate}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 card-shadow space-y-4">
            <h3 className="text-lg font-bold font-heading text-stone-900 border-b border-stone-100 pb-3">
              {isUrdu ? 'تفصیلی وضاحت' : 'Property Overview & Description'}
            </h3>

            <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-3">
              <p>{property.description}</p>
              {property.descriptionUrdu && (
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-stone-800 font-urdu leading-loose text-base text-right mt-3">
                  {property.descriptionUrdu}
                </div>
              )}
            </div>
          </div>

          {/* Amenities & Features List */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 card-shadow space-y-4">
            <h3 className="text-lg font-bold font-heading text-stone-900 border-b border-stone-100 pb-3">
              {isUrdu ? 'سہولیات و خصوصیات' : 'Features & Amenities'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs sm:text-sm font-medium text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 card-shadow space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold font-heading text-stone-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>{isUrdu ? 'مقام اور نقشہ' : 'Location & Neighborhood Map'}</span>
              </h3>
              <span className="text-xs text-stone-500">
                {property.areaName}, Swat
              </span>
            </div>

            <div className="w-full h-72 sm:h-96 rounded-xl overflow-hidden border border-stone-200">
              <iframe
                title={`Map of ${property.title}`}
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-xs text-stone-500">
              Coordinates: {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)} • Near main transit roads in Swat.
            </p>
          </div>

          {/* Mortgage Calculator for Sale Properties */}
          {property.purpose === 'sale' && (
            <MortgageCalculator initialPrice={property.price} />
          )}
        </div>

        {/* Right Column: Sticky Contact Agent Card & Lead Capture */}
        <div className="space-y-6">
          <div className="sticky top-28 bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 card-shadow space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="w-14 h-14 rounded-full bg-[#2f5d3a] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                SP
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-base font-heading">
                  Swat Property Advisory
                </h4>
                <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Agency Agent
                </p>
                <p className="text-[11px] text-stone-500">Main Bypass Road, Fizagat, Mingora Swat</p>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="space-y-2.5">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>{isUrdu ? 'واٹس ایپ پر فوری رابطہ' : 'Direct WhatsApp Chat'}</span>
              </a>

              <a
                href={`tel:${property.contactPhone}`}
                className="w-full py-3 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call Agent: {property.contactPhone}</span>
              </a>
            </div>

            {/* Lead Inquiry Form */}
            <div className="pt-3 border-t border-stone-100">
              <h5 className="font-bold text-xs uppercase text-stone-600 tracking-wider mb-3">
                {isUrdu ? 'معلومات یا وزٹ کے لیے پیغام بھیجیں' : 'Send Direct Lead Inquiry'}
              </h5>

              {formSubmitted ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="font-bold text-sm text-emerald-900">
                    {isUrdu ? 'شکریہ! آپ کا پیغام موصول ہو گیا۔' : 'Inquiry Received!'}
                  </p>
                  <p className="text-xs text-emerald-700">
                    {isUrdu 
                      ? 'ہمارا سوات کا نمائندہ جلد آپ سے واٹس ایپ یا کال پر رابطہ کرے گا۔' 
                      : 'Our Swat valley specialist will contact you within 30 minutes.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      {isUrdu ? 'آپ کا نام *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Khan"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:border-[#2f5d3a] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      {isUrdu ? 'فون یا واٹس ایپ نمبر *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:border-[#2f5d3a] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      {isUrdu ? 'پیغام' : 'Message'}
                    </label>
                    <textarea
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:border-[#2f5d3a] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
                  >
                    {isUrdu ? 'انکوائری جمع کروائیں' : 'Submit Property Inquiry'}
                  </button>
                </form>
              )}
            </div>

            <div className="pt-2 text-[11px] text-stone-400 text-center">
              Safe & Protected • Direct owner connection • No spam
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-stone-900">
              {isUrdu ? 'اسی علاقے کی دیگر پراپرٹیز' : `Similar Properties in ${property.areaName}`}
            </h3>
            <button
              onClick={() => onNavigate(property.purpose === 'sale' ? '/buy' : '/rent')}
              className="text-[#2f5d3a] font-semibold text-sm hover:underline cursor-pointer"
            >
              {isUrdu ? 'مزید دیکھیں' : 'View More'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((sim) => (
              <PropertyCard
                key={sim.id}
                property={sim}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
