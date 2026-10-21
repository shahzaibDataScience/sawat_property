import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  DollarSign, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Award, 
  Building, 
  Trees, 
  Store, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  PhoneCall, 
  MessageCircle,
  HelpCircle,
  PlusCircle,
  Compass
} from 'lucide-react';
import { PropertyListing, PropertyType, PropertyPurpose } from '../types/property';
import { swatAreas } from '../data/areas';
import { faqsList } from '../data/faqs';
import { testimonialsList } from '../data/testimonials';
import { PropertyCard } from '../components/property/PropertyCard';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  listings: PropertyListing[];
  onSelectProperty: (slug: string, triggerElement?: HTMLElement) => void;
  onNavigate: (path: string) => void;
  onApplySearch: (criteria: { purpose: PropertyPurpose; area: string; type: PropertyType | 'all' }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  listings,
  onSelectProperty,
  onNavigate,
  onApplySearch,
}) => {
  const { isUrdu, t } = useLanguage();

  // Hero Search states
  const [heroPurpose, setHeroPurpose] = useState<PropertyPurpose>('sale');
  const [heroArea, setHeroArea] = useState<string>('all');
  const [heroType, setHeroType] = useState<PropertyType | 'all'>('all');

  // Featured slider index
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Latest listings tab
  const [latestTab, setLatestTab] = useState<PropertyPurpose>('sale');

  // FAQ accordion active item
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const featuredListings = listings.filter((p) => p.isFeatured);
  const latestSaleListings = listings.filter((p) => p.purpose === 'sale').slice(0, 6);
  const latestRentListings = listings.filter((p) => p.purpose === 'rent').slice(0, 6);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplySearch({
      purpose: heroPurpose,
      area: heroArea,
      type: heroType,
    });
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % Math.max(1, featuredListings.length - 2));
  };
  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + Math.max(1, featuredListings.length - 2)) % Math.max(1, featuredListings.length - 2));
  };

  const propertyTypesData: { type: PropertyType; title: string; titleUrdu: string; icon: any; count: number; desc: string }[] = [
    { type: 'house', title: 'Houses & Villas', titleUrdu: 'مکانات و کوٹھیاں', icon: Home, count: 8, desc: '5 Marla, 10 Marla, 1 Kanal designer villas' },
    { type: 'plot', title: 'Residential Plots', titleUrdu: 'رہائشی پلاٹس', icon: Compass, count: 5, desc: 'Ready-to-build residential plots in Mingora & Saidu' },
    { type: 'land', title: 'Land & Orchards', titleUrdu: 'زرعی و سیاحتی زمین', icon: Trees, count: 3, desc: 'Riverfront tourism & peach orchard land' },
    { type: 'shop', title: 'Commercial Shops', titleUrdu: 'کمرشل دکانیں و پلازے', icon: Store, count: 3, desc: 'High-footfall plazas in Mingora Trade Hub' },
    { type: 'flat', title: 'Flats & Apartments', titleUrdu: 'فلیٹس و اپارٹمنٹس', icon: Building, count: 3, desc: 'Riverside scenic apartments in Fizagat & Bahrain' },
    { type: 'hotel', title: 'Hotels & Chalets', titleUrdu: 'ہوٹل و گیسٹ ہاؤسز', icon: Award, count: 2, desc: 'High ROI hospitality investments in Kalam' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background photo of Swat Valley */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        {/* Dark Emerald Gradient Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center pt-10 pb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t('hero.tagline')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            {t('hero.title')}
          </h1>

          <p className="text-stone-200 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
            {t('hero.subtitle')}
          </p>

          {/* Search Box with Tabs */}
          <div className="max-w-4xl mx-auto mt-8 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl text-stone-800 border border-white/20">
            {/* Tabs */}
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200/80">
              <button
                type="button"
                onClick={() => setHeroPurpose('sale')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  heroPurpose === 'sale'
                    ? 'bg-[#2f5d3a] text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {t('hero.tab.buy')}
              </button>
              <button
                type="button"
                onClick={() => setHeroPurpose('rent')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  heroPurpose === 'rent'
                    ? 'bg-[#2f5d3a] text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {t('hero.tab.rent')}
              </button>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleHeroSubmit} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-3">
              {/* Location */}
              <div className="relative text-left">
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  {t('hero.location')}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={heroArea}
                    onChange={(e) => setHeroArea(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm font-medium text-stone-800 focus:border-[#2f5d3a] focus:bg-white outline-none cursor-pointer"
                  >
                    <option value="all">{isUrdu ? 'تمام علاقے (سوات)' : 'All Swat Valleys'}</option>
                    {swatAreas.map((a) => (
                      <option key={a.id} value={a.name}>
                        {isUrdu ? `${a.nameUrdu} (${a.name})` : a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Property Type */}
              <div className="text-left">
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  {t('hero.type')}
                </label>
                <div className="relative">
                  <Home className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={heroType}
                    onChange={(e) => setHeroType(e.target.value as PropertyType | 'all')}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm font-medium text-stone-800 focus:border-[#2f5d3a] focus:bg-white outline-none cursor-pointer"
                  >
                    <option value="all">{isUrdu ? 'تمام پراپرٹیز' : 'All Types'}</option>
                    <option value="house">{isUrdu ? 'مکان / کوٹھی' : 'House / Villa'}</option>
                    <option value="plot">{isUrdu ? 'پلاٹ' : 'Plot'}</option>
                    <option value="land">{isUrdu ? 'زرعی و پہاڑی زمین' : 'Land / Orchard'}</option>
                    <option value="flat">{isUrdu ? 'فلیٹ' : 'Apartment / Flat'}</option>
                    <option value="shop">{isUrdu ? 'کمرشل دکان' : 'Commercial Shop'}</option>
                    <option value="hotel">{isUrdu ? 'ہوٹل / گیسٹ ہاؤس' : 'Hotel / Resort'}</option>
                  </select>
                </div>
              </div>

              {/* Quick Area Filter or Budget */}
              <div className="text-left">
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  {isUrdu ? 'سوات ایکسپریس وے رابطہ' : 'Swat Focus Zone'}
                </label>
                <div className="flex items-center h-[42px] px-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  <span className="truncate">{heroArea === 'all' ? 'Mingora, Kalam, Saidu' : `${heroArea} Region`}</span>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full h-[42px] rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('hero.search')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* TRUST NUMBERS & CREDIBILITY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r last:border-r-0 border-stone-200">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#2f5d3a] font-heading">
              1,200+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-stone-700">
              {t('stats.listed')}
            </p>
            <p className="text-[11px] text-stone-400">100% On-Site Inspected</p>
          </div>

          <div className="space-y-1 border-r last:border-r-0 border-stone-200">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#2f5d3a] font-heading">
              3,500+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-stone-700">
              {t('stats.clients')}
            </p>
            <p className="text-[11px] text-stone-400">Local & Overseas Pakistanis</p>
          </div>

          <div className="space-y-1 border-r last:border-r-0 border-stone-200">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#2f5d3a] font-heading">
              15+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-stone-700">
              {t('stats.years')}
            </p>
            <p className="text-[11px] text-stone-400">Deep Valley Knowledge</p>
          </div>

          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-heading">
              100%
            </p>
            <p className="text-xs sm:text-sm font-semibold text-stone-700">
              {t('stats.legal')}
            </p>
            <p className="text-[11px] text-stone-400">Patwari & Revenue Verified</p>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES SLIDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              {isUrdu ? 'پریمیم انتخاب' : 'Exclusive Portfolio'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 mt-1">
              {t('section.featured')}
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              {t('section.featuredSub')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevFeatured}
              className="p-2.5 rounded-xl border border-stone-300 hover:border-[#2f5d3a] hover:bg-white text-stone-700 transition-all cursor-pointer"
              aria-label="Previous Featured Properties"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextFeatured}
              className="p-2.5 rounded-xl border border-stone-300 hover:border-[#2f5d3a] hover:bg-white text-stone-700 transition-all cursor-pointer"
              aria-label="Next Featured Properties"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('/buy')}
              className="ml-3 px-4 py-2.5 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              {isUrdu ? 'تمام دیکھیں' : 'View All'}
            </button>
          </div>
        </div>

        {/* Featured Grid / Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.slice(featuredIndex, featuredIndex + 3).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* BROWSE BY PROPERTY TYPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            {isUrdu ? 'اقسام کے لحاظ سے تلاش' : 'Explore Categories'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 mt-1">
            {t('section.types')}
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            {isUrdu 
              ? 'سوات میں ہر قسم کی رہائشی، تجارتی اور سیاحتی جائیدادیں' 
              : 'Browse houses, commercial shops, plots, farmland, and hotels throughout Swat'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {propertyTypesData.map((pt) => {
            const Icon = pt.icon;
            return (
              <button
                key={pt.type}
                onClick={() => {
                  onApplySearch({ purpose: 'sale', area: 'all', type: pt.type });
                }}
                className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-[#2f5d3a] card-shadow card-shadow-hover text-center space-y-3 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2f5d3a]/10 text-[#2f5d3a] group-hover:bg-[#2f5d3a] group-hover:text-white flex items-center justify-center mx-auto transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900 font-heading">
                    {isUrdu ? pt.titleUrdu : pt.title}
                  </h3>
                  <span className="text-[11px] text-stone-500 font-medium">
                    {pt.count} {isUrdu ? 'لسٹنگز' : 'Listings'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* LATEST LISTINGS: FOR SALE & FOR RENT TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
              {latestTab === 'sale' ? t('section.latestSale') : t('section.latestRent')}
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              {isUrdu 
                ? 'تازہ ترین لسٹنگز روزانہ اپ ڈیٹ کی جاتی ہیں' 
                : 'Direct from owners & verified landlords in Mingora, Saidu Sharif & Kalam'}
            </p>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-stone-200/70 border border-stone-300">
            <button
              onClick={() => setLatestTab('sale')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                latestTab === 'sale'
                  ? 'bg-[#2f5d3a] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {isUrdu ? 'برائے فروخت (12)' : 'For Sale (12)'}
            </button>
            <button
              onClick={() => setLatestTab('rent')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                latestTab === 'rent'
                  ? 'bg-[#2f5d3a] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {isUrdu ? 'برائے کرایہ (12)' : 'For Rent (12)'}
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(latestTab === 'sale' ? latestSaleListings : latestRentListings).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate(latestTab === 'sale' ? '/buy' : '/rent')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-300 hover:border-[#2f5d3a] hover:bg-stone-50 text-stone-900 font-semibold text-sm transition-all shadow-xs cursor-pointer"
          >
            <span>{latestTab === 'sale' ? 'Explore All 12 For Sale Properties' : 'Explore All 12 For Rent Properties'}</span>
            <ArrowRight className="w-4 h-4 text-[#2f5d3a]" />
          </button>
        </div>
      </section>

      {/* BROWSE BY AREA (MINGORA, KALAM, MALAM JABBA, SAIDU SHARIF) */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                {isUrdu ? 'علاقائی جائزہ' : 'Local Neighborhoods'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 mt-1">
                {t('section.areas')}
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                {isUrdu 
                  ? 'سوات کے مشہور سیاحتی اور رہائشی علاقوں میں پراپرٹی کی معلومات' 
                  : 'Discover real estate trends, average prices, and local attractions across Swat'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('/areas')}
              className="text-[#2f5d3a] hover:text-[#254b2e] font-semibold text-sm flex items-center gap-1 cursor-pointer"
            >
              <span>{isUrdu ? 'تمام 10 علاقے دیکھیں' : 'View all 10 areas'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {swatAreas.slice(0, 4).map((area) => (
              <div
                key={area.id}
                onClick={() => onNavigate(`/areas/${area.slug}`)}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer transform hover:-translate-y-1 transition-all"
              >
                <img
                  src={area.image}
                  alt={area.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                    <span>{area.elevation}</span>
                    <span>{area.distanceFromMingora}</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    {isUrdu ? `${area.nameUrdu} (${area.name})` : area.name}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2">
                    {area.tagline}
                  </p>
                  <p className="text-[11px] font-medium text-emerald-300 pt-1 border-t border-white/20">
                    {area.priceRangeSale}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US & LOCAL KNOWLEDGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            {isUrdu ? 'سوات پراپرٹی پر اعتماد' : 'Uncompromising Integrity'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 mt-1">
            {t('section.whyUs')}
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            {isUrdu 
              ? 'ہم سوات میں ہر سودے کے پیچھے مکمل قانونی اور شفاف ذمہ داری اٹھاتے ہیں' 
              : 'Why thousands of local families, overseas Pakistanis, and corporate investors choose Swat Property'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 card-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2f5d3a] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-stone-900">
              {isUrdu ? '100% قانونی کاغذات و فرد کی جانچ' : '100% Verified Patwari Records'}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Every single property listed goes through a multi-step audit: Jamabandi verification, Aks-e-Shajra survey matching, and encumbrance checks with local Revenue Tehsildars. Zero litigation risk.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 card-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-stone-900">
              {isUrdu ? 'اوورسیز پاکستانیوں کے لیے خصوصی سہولیات' : 'Overseas Pakistani Concierge'}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Based in the UK, UAE, or US? We manage live HD video walkthroughs, high-resolution drone land inspections, power of attorney execution, and secure banking transfers without hassle.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 card-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2f5d3a] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-stone-900">
              {isUrdu ? 'شفاف قیمت، بغیر کسی خفیہ چارجز کے' : 'Fair Market Valuation & Zero Hidden Fees'}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              We provide genuine direct-owner rate comparisons and eliminate artificial middleman inflation. Full documentation and legal guidance provided under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {isUrdu ? 'آسان عمل' : 'Simple Process'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 mt-1">
              {isUrdu ? 'سوات میں پراپرٹی خریدنے یا کرائے پر لینے کے 3 آسان مراحل' : 'How It Works in 3 Simple Steps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="text-center space-y-3 relative p-6 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="w-12 h-12 rounded-full bg-[#2f5d3a] text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                {isUrdu ? 'پراپرٹی تلاش کریں' : '1. Search & Filter'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Filter verified listings by location in Swat (Mingora, Kalam, Malam Jabba), budget, size, and property type.
              </p>
            </div>

            <div className="text-center space-y-3 relative p-6 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-900 font-bold text-lg flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                {isUrdu ? 'معائنہ و کاغذات کی تصدیق' : '2. Site Visit & Legal Audit'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Our local agents arrange on-ground physical visits, boundary demarcation, and provide certified Patwari Fard documents.
              </p>
            </div>

            <div className="text-center space-y-3 relative p-6 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="w-12 h-12 rounded-full bg-[#2f5d3a] text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                {isUrdu ? 'محفوظ رجسٹری و قبضہ' : '3. Biometric Transfer & Keys'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Execute sale agreements, biometric registry at Sub-Registrar or direct revenue Intiqal, and receive immediate possession.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              {isUrdu ? 'صارفین کی رائے' : 'Verified Reviews'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 mt-1">
              {t('section.testimonials')}
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Real experiences from clients in Swat, the UK, UAE, and across Pakistan
            </p>
          </div>

          <button
            onClick={() => onNavigate('/testimonials')}
            className="text-[#2f5d3a] hover:text-[#254b2e] font-semibold text-sm flex items-center gap-1 cursor-pointer"
          >
            <span>{isUrdu ? 'تمام ریویوز دیکھیں' : 'Read all reviews'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsList.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 card-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  "{isUrdu ? test.commentUrdu : test.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
                  }}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                    {test.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">{test.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            {isUrdu ? 'رہنمائی و جوابات' : 'Got Questions?'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
            {t('section.faq')}
          </h2>
          <p className="text-stone-500 text-sm">
            Everything you need to know about buying, selling, and leasing properties in Swat
          </p>
        </div>

        <div className="space-y-3 pt-4">
          {faqsList.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden card-shadow transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 hover:text-[#2f5d3a] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">
                    {isUrdu ? faq.questionUrdu : faq.question}
                  </span>
                  <span className={`w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-emerald-100 text-[#2f5d3a]' : ''}`}>
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3 animate-in fade-in duration-200">
                    {isUrdu ? faq.answerUrdu : faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION BANNER: "Want to sell or rent your property? List it with us" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#1b3823] via-[#2f5d3a] to-[#254b2e] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              {isUrdu ? 'مفت لسٹنگ اور کسٹمر سپورٹ' : 'Free Listing & Direct Inquiries'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              {t('cta.listWithUs')}
            </h2>
            <p className="text-emerald-100 text-xs sm:text-base leading-relaxed">
              Reach thousands of active domestic buyers and overseas Pakistanis looking for properties in Swat. We handle photography, legal verification, and customer screenings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('/sell')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('cta.listButton')}</span>
            </button>
            <a
              href="https://wa.me/923001234567?text=Hello%20Swat%20Property,%20I%20want%20to%20list%20my%20property%20for%20sale%20or%20rent."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
