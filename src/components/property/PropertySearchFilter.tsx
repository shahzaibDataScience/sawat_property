import React from 'react';
import { Search, RotateCcw, LayoutGrid, List, SlidersHorizontal, MapPin, Home, DollarSign } from 'lucide-react';
import { FilterState, PropertyType } from '../../types/property';
import { useLanguage } from '../../context/LanguageContext';
import { swatAreas } from '../../data/areas';

interface PropertySearchFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalResults: number;
}

export const PropertySearchFilter: React.FC<PropertySearchFilterProps> = ({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalResults,
}) => {
  const { isUrdu, t } = useLanguage();

  const handlePurposeChange = (purpose: FilterState['purpose']) => {
    onFilterChange({ ...filters, purpose });
  };

  const handleReset = () => {
    onFilterChange({
      purpose: 'all',
      type: 'all',
      areaName: 'all',
      minPrice: 0,
      maxPrice: 0,
      beds: 'any',
      furnished: 'any',
      sortBy: 'featured',
      searchQuery: '',
    });
  };

  const propertyTypes: { value: PropertyType | 'all'; label: string; labelUrdu: string }[] = [
    { value: 'all', label: 'All Property Types', labelUrdu: 'تمام اقسام' },
    { value: 'house', label: 'House / Villa', labelUrdu: 'مکان / کوٹھی' },
    { value: 'plot', label: 'Residential Plot', labelUrdu: 'رہائشی پلاٹ' },
    { value: 'flat', label: 'Apartment / Flat', labelUrdu: 'فلیٹ / اپارٹمنٹ' },
    { value: 'land', label: 'Agricultural / Resort Land', labelUrdu: 'زرعی و تفریحی زمین' },
    { value: 'shop', label: 'Commercial Shop / Plaza', labelUrdu: 'کمرشل دکان' },
    { value: 'hotel', label: 'Hotel / Guest House', labelUrdu: 'ہوٹل و گیسٹ ہاؤس' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 card-shadow space-y-4">
      {/* Top row: Purpose tabs & View mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="inline-flex p-1 rounded-xl bg-stone-100 border border-stone-200">
          <button
            onClick={() => handlePurposeChange('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filters.purpose === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isUrdu ? 'تمام' : 'All Listings'}
          </button>
          <button
            onClick={() => handlePurposeChange('sale')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filters.purpose === 'sale'
                ? 'bg-[#2f5d3a] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isUrdu ? 'برائے فروخت' : 'For Sale'}
          </button>
          <button
            onClick={() => handlePurposeChange('rent')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filters.purpose === 'rent'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isUrdu ? 'برائے کرایہ' : 'For Rent'}
          </button>
        </div>

        {/* View mode toggle & total count */}
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-medium text-stone-600">
            {isUrdu ? `کل نتائج: ${totalResults}` : `Showing ${totalResults} properties`}
          </span>

          <div className="inline-flex p-1 rounded-lg bg-stone-100 border border-stone-200">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md text-stone-600 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#2f5d3a] shadow-xs' : 'hover:text-stone-900'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-md text-stone-600 transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-[#2f5d3a] shadow-xs' : 'hover:text-stone-900'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary search & filter controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Keyword Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isUrdu ? 'نام، پتہ یا خصوصیت تلاش کریں...' : 'Search title, keyword, address...'}
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:border-[#2f5d3a] focus:ring-1 focus:ring-[#2f5d3a] text-sm text-stone-800 placeholder-stone-400 outline-none"
          />
        </div>

        {/* Area / Location Dropdown */}
        <div className="relative">
          <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.areaName}
            onChange={(e) => onFilterChange({ ...filters, areaName: e.target.value })}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:border-[#2f5d3a] focus:ring-1 focus:ring-[#2f5d3a] text-sm text-stone-800 outline-none bg-white cursor-pointer"
          >
            <option value="all">{isUrdu ? 'تمام علاقے (سوات)' : 'All Areas in Swat'}</option>
            {swatAreas.map((area) => (
              <option key={area.id} value={area.name}>
                {isUrdu ? `${area.nameUrdu} (${area.name})` : area.name}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div className="relative">
          <Home className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value as FilterState['type'] })}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:border-[#2f5d3a] focus:ring-1 focus:ring-[#2f5d3a] text-sm text-stone-800 outline-none bg-white cursor-pointer"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {isUrdu ? t.labelUrdu : t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="relative">
          <SlidersHorizontal className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:border-[#2f5d3a] focus:ring-1 focus:ring-[#2f5d3a] text-sm text-stone-800 outline-none bg-white cursor-pointer"
          >
            <option value="featured">{isUrdu ? 'ترتیب: نمایاں پہلے' : 'Sort: Featured First'}</option>
            <option value="newest">{isUrdu ? 'ترتیب: تازہ ترین' : 'Sort: Newest Added'}</option>
            <option value="price-low">{isUrdu ? 'قیمت: کم سے زیادہ' : 'Price: Low to High'}</option>
            <option value="price-high">{isUrdu ? 'قیمت: زیادہ سے کم' : 'Price: High to Low'}</option>
          </select>
        </div>
      </div>

      {/* Secondary filter chips & quick options */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Bedrooms pill filter */}
          <span className="text-stone-500 font-medium">{isUrdu ? 'بیڈ رومز:' : 'Bedrooms:'}</span>
          {(['any', 1, 2, 3, 4, 5] as const).map((b) => (
            <button
              key={String(b)}
              onClick={() => onFilterChange({ ...filters, beds: b })}
              className={`px-2.5 py-1 rounded-md border text-xs font-semibold transition-all cursor-pointer ${
                filters.beds === b
                  ? 'bg-[#2f5d3a] text-white border-[#2f5d3a]'
                  : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
              }`}
            >
              {b === 'any' ? (isUrdu ? 'کوئی بھی' : 'Any') : `${b}+`}
            </button>
          ))}

          {/* Furnished filter */}
          <div className="h-4 w-px bg-stone-200 mx-1 hidden sm:block" />
          <span className="text-stone-500 font-medium">{isUrdu ? 'فرنشڈ:' : 'Furnished:'}</span>
          {(['any', 'yes', 'no'] as const).map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange({ ...filters, furnished: f })}
              className={`px-2.5 py-1 rounded-md border text-xs font-semibold transition-all cursor-pointer ${
                filters.furnished === f
                  ? 'bg-[#2f5d3a] text-white border-[#2f5d3a]'
                  : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
              }`}
            >
              {f === 'any' ? (isUrdu ? 'سب' : 'All') : f === 'yes' ? (isUrdu ? 'ہاں' : 'Yes') : (isUrdu ? 'نہیں' : 'No')}
            </button>
          ))}
        </div>

        {/* Reset Filter Button */}
        <button
          onClick={handleReset}
          className="text-stone-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors cursor-pointer py-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'فلٹرز ختم کریں' : 'Reset Filters'}</span>
        </button>
      </div>
    </div>
  );
};
