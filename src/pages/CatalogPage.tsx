import React, { useState, useMemo } from 'react';
import { PropertyListing, FilterState, PropertyPurpose } from '../types/property';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertySearchFilter } from '../components/property/PropertySearchFilter';
import { filterProperties, sortProperties } from '../utils/propertyUtils';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, PlusCircle } from 'lucide-react';

interface CatalogPageProps {
  initialPurpose: PropertyPurpose | 'all';
  listings: PropertyListing[];
  onSelectProperty: (slug: string, triggerElement?: HTMLElement) => void;
  onNavigate: (path: string) => void;
  initialArea?: string;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialPurpose,
  listings,
  onSelectProperty,
  onNavigate,
  initialArea,
}) => {
  const { isUrdu } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState<FilterState>({
    purpose: initialPurpose,
    type: 'all',
    areaName: initialArea || 'all',
    minPrice: 0,
    maxPrice: 0,
    beds: 'any',
    furnished: 'any',
    sortBy: 'featured',
    searchQuery: '',
  });

  const [visibleCount, setVisibleCount] = useState(9);

  // Filter and sort listings
  const filteredAndSortedListings = useMemo(() => {
    const filtered = filterProperties(listings, filters);
    return sortProperties(filtered, filters.sortBy);
  }, [listings, filters]);

  const displayedListings = filteredAndSortedListings.slice(0, visibleCount);

  const pageTitle =
    filters.purpose === 'sale'
      ? isUrdu
        ? 'سوات میں مکانات و جائیداد برائے فروخت'
        : 'Properties for Sale in Swat – Houses, Plots & Land'
      : filters.purpose === 'rent'
      ? isUrdu
        ? 'سوات میں مکانات و فلیٹس برائے کرایہ'
        : 'Properties for Rent in Swat – Houses, Flats & Shops'
      : isUrdu
      ? 'سوات میں تمام دستیاب پراپرٹیز'
      : 'All Real Estate Properties in Swat';

  const pageSubtitle =
    filters.purpose === 'sale'
      ? 'Browse 100% legally verified houses, residential plots, commercial shops, and mountain tourism land for sale across Swat Valley.'
      : 'Explore furnished and unfurnished family homes, apartments, guest houses, and commercial halls for rent in Mingora and scenic valleys.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#21432a] to-[#2f5d3a] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>KPK Revenue Certified Titles</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            {pageTitle}
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <PropertySearchFilter
        filters={filters}
        onFilterChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={filteredAndSortedListings.length}
      />

      {/* Listings Grid / List */}
      {displayedListings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 card-shadow">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>
          <h3 className="text-xl font-bold text-stone-800 font-heading">
            {isUrdu ? 'کوئی پراپرٹی نہیں ملی' : 'No Properties Match Your Filter Criteria'}
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
            {isUrdu
              ? 'براہ کرم فلٹرز تبدیل کریں یا سوات پراپرٹی ایڈوائزر سے واٹس ایپ پر رابطہ کریں۔'
              : 'Try clearing some filters, widening the price range, or searching for other areas like Mingora or Kalam.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() =>
                setFilters({
                  purpose: initialPurpose,
                  type: 'all',
                  areaName: 'all',
                  minPrice: 0,
                  maxPrice: 0,
                  beds: 'any',
                  furnished: 'any',
                  sortBy: 'featured',
                  searchQuery: '',
                })
              }
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs sm:text-sm cursor-pointer"
            >
              {isUrdu ? 'تمام فلٹرز ری سیٹ کریں' : 'Reset All Filters'}
            </button>
            <button
              onClick={() => onNavigate('/sell')}
              className="px-5 py-2.5 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white font-semibold text-xs sm:text-sm cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isUrdu ? 'اپنی پراپرٹی لسٹ کریں' : 'List a Property'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {displayedListings.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Pagination / Load More */}
      {visibleCount < filteredAndSortedListings.length && (
        <div className="text-center pt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-8 py-3.5 rounded-xl bg-white border border-stone-300 hover:border-[#2f5d3a] hover:bg-stone-50 text-stone-800 font-bold text-sm shadow-xs transition-all cursor-pointer"
          >
            {isUrdu
              ? `مزید لوڈ کریں (${filteredAndSortedListings.length - visibleCount} باقی)`
              : `Load More Properties (${filteredAndSortedListings.length - visibleCount} remaining)`}
          </button>
        </div>
      )}
    </div>
  );
};
