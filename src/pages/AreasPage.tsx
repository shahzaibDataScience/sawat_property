import React from 'react';
import { swatAreas } from '../data/areas';
import { PropertyListing } from '../types/property';
import { PropertyCard } from '../components/property/PropertyCard';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Mountain, ArrowRight, ArrowLeft, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/propertyUtils';

interface AreasPageProps {
  selectedAreaSlug?: string;
  listings: PropertyListing[];
  onSelectArea: (slug: string) => void;
  onSelectProperty: (slug: string, triggerElement?: HTMLElement) => void;
  onNavigate: (path: string) => void;
}

export const AreasPage: React.FC<AreasPageProps> = ({
  selectedAreaSlug,
  listings,
  onSelectArea,
  onSelectProperty,
  onNavigate,
}) => {
  const { isUrdu } = useLanguage();

  const currentArea = selectedAreaSlug
    ? swatAreas.find((a) => a.slug === selectedAreaSlug)
    : null;

  if (currentArea) {
    // Area Detail View
    const areaListings = listings.filter(
      (p) => p.areaName.toLowerCase() === currentArea.name.toLowerCase()
    );

    const whatsAppMessage = `Hello Swat Property, I am looking to invest in properties in ${currentArea.name}. Please share available options.`;
    const whatsAppLink = generateWhatsAppLink('+923001234567', whatsAppMessage);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Back navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/areas')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#2f5d3a] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isUrdu ? 'تمام علاقے' : 'Back to All Swat Areas'}</span>
          </button>
        </div>

        {/* Hero Banner for this Area */}
        <div className="relative rounded-3xl overflow-hidden min-h-[360px] flex items-end p-6 sm:p-10 shadow-xl">
          <img
            src={currentArea.image}
            alt={currentArea.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          <div className="relative z-10 text-white space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1">
                <Mountain className="w-4 h-4" />
                {currentArea.elevation}
              </span>
              <span>•</span>
              <span>{currentArea.distanceFromMingora}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              {isUrdu ? `${currentArea.nameUrdu} (${currentArea.name})` : `Real Estate in ${currentArea.name}, Swat`}
            </h1>

            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              {currentArea.description}
            </p>
          </div>
        </div>

        {/* Area Metrics & Price Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 card-shadow space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isUrdu ? 'اوسط قیمت برائے فروخت' : 'Average Sale Price Trend'}
            </span>
            <p className="text-xl font-bold text-[#2f5d3a] font-heading">
              {currentArea.priceRangeSale}
            </p>
            <p className="text-xs text-stone-500">Based on recent registered transactions in {currentArea.name}</p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 card-shadow space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isUrdu ? 'اوسط ماہانہ کرایہ' : 'Average Rental Rates'}
            </span>
            <p className="text-xl font-bold text-amber-600 font-heading">
              {currentArea.priceRangeRent}
            </p>
            <p className="text-xs text-stone-500">Residential & tourist holiday leases</p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 card-shadow space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isUrdu ? 'مقبول ترین شعبے' : 'Primary Demand Segments'}
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentArea.popularFor.map((pop, i) => (
                <span key={i} className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {pop}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Active Listings in this Area */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h2 className="text-2xl font-bold font-heading text-stone-900">
                {isUrdu ? `${currentArea.name} میں دستیاب جائیدادیں` : `Available Properties in ${currentArea.name}`}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {areaListings.length} active verified listings found
              </p>
            </div>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire About {currentArea.name}</span>
            </a>
          </div>

          {areaListings.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-stone-200 space-y-3">
              <p className="text-stone-600 font-medium">
                No active listings currently displayed in {currentArea.name}.
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                We have off-market private seller listings available upon request.
              </p>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2f5d3a] text-white text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Swat Advisor for {currentArea.name}</span>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaListings.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={onSelectProperty}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Hub View: All 10 Areas
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          {isUrdu ? 'سوات کے علاقے' : 'Neighborhood Guides'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-stone-900 tracking-tight">
          {isUrdu ? 'سوات کے اہم رہائشی و سیاحتی علاقے' : 'Areas We Serve in Swat Valley'}
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
          Explore local market pricing, tourism demand, and land registry information across the 10 prime valleys and urban centers of Swat district.
        </p>
      </div>

      {/* Grid of Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {swatAreas.map((area) => (
          <div
            key={area.id}
            onClick={() => onSelectArea(area.slug)}
            className="group bg-white rounded-2xl border border-stone-200 overflow-hidden card-shadow card-shadow-hover cursor-pointer transition-all flex flex-col"
          >
            <div className="h-52 relative overflow-hidden">
              <img
                src={area.image}
                alt={area.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                {area.elevation}
              </div>
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="text-xl font-bold font-heading">
                  {isUrdu ? `${area.nameUrdu} (${area.name})` : area.name}
                </h3>
                <p className="text-xs text-stone-300">{area.tagline}</p>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                {area.description}
              </p>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Sale Range</span>
                  <span className="font-bold text-[#2f5d3a]">{area.priceRangeSale.split('-')[0]}</span>
                </div>

                <span className="text-amber-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{isUrdu ? 'تفصیلات دیکھیں' : 'Explore Area'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
