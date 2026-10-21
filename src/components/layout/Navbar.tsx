import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  PlusCircle, 
  MapPin, 
  Info, 
  BookOpen, 
  Phone, 
  MessageCircle, 
  Heart, 
  Menu, 
  X, 
  Languages,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavoritesContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenFavorites }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, isUrdu, t } = useLanguage();
  const { count: favoritesCount } = useFavorites();

  const navLinks = [
    { label: t('nav.home'), path: '/', icon: Home },
    { label: t('nav.buy'), path: '/buy', badge: '12' },
    { label: t('nav.rent'), path: '/rent', badge: '12' },
    { label: t('nav.sell'), path: '/sell', icon: PlusCircle, isHighlight: true },
    { label: t('nav.areas'), path: '/areas', icon: MapPin },
    { label: t('nav.about'), path: '/about', icon: Info },
    { label: t('nav.blog'), path: '/blog', icon: BookOpen },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ur' : 'en');
  };

  return (
    <>
      {/* Top emergency announcement & contact bar */}
      <div className="bg-[#1f4228] text-white text-xs py-2 px-4 border-b border-[#2a5535]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {isUrdu ? 'سوات کا سب سے بڑا اور قانونی تصدیق شدہ رئیل اسٹیٹ نیٹ ورک' : 'KPK Revenue Department & 100% Verified Legal Land Records'}
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-white/80">
              {isUrdu ? 'مینگورہ، سیدو شریف، کالام، مالم جبہ' : 'Mingora • Saidu Sharif • Kalam • Malam Jabba'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="tel:+923001234567" 
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
              title="Call Swat Property Support"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+92 300 1234567</span>
            </a>
            <a 
              href="https://wa.me/923001234567?text=Hello%20Swat%20Property%20team,%20I%20am%20inquiring%20about%20properties%20in%20Swat." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isUrdu ? 'واٹس ایپ' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => handleLinkClick('/')}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2f5d3a] flex items-center justify-center text-white shadow-md group-hover:bg-[#254b2e] transition-all transform group-hover:scale-105">
                <svg className="w-7 h-7" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 16 L16 46 L28 46 L28 84 L72 84 L72 46 L84 46 Z" fill="#ffffff" fillOpacity="0.95" />
                  <path d="M50 32 L40 50 L46 50 L38 68 L62 68 L54 50 L60 50 Z" fill="#2f5d3a" />
                  <circle cx="70" cy="30" r="5" fill="#d97706" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-heading text-[#2f5d3a] tracking-tight flex items-center gap-1">
                  SWAT <span className="text-amber-600 font-extrabold">PROPERTY</span>
                </span>
                <span className="text-xs text-stone-500 font-medium tracking-wide">
                  {isUrdu ? 'سوات پراپرٹی ایڈوائزری و ڈیلرز' : 'Real Estate & Investment Consultants'}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path || 
                  (link.path !== '/' && currentPath.startsWith(link.path));
                
                if (link.isHighlight) {
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleLinkClick(link.path)}
                      className="ml-2 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold text-sm transition-all shadow-xs flex items-center gap-1.5 transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-stone-900" />
                      {link.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative cursor-pointer ${
                      isActive
                        ? 'text-[#2f5d3a] bg-[#2f5d3a]/10 font-semibold'
                        : 'text-stone-700 hover:text-[#2f5d3a] hover:bg-stone-100'
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-stone-200 text-stone-700">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action buttons (Favorites, Language Toggle, CTA) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Saved Favorites Trigger */}
              <button
                onClick={onOpenFavorites}
                className="relative p-2.5 rounded-lg text-stone-600 hover:text-[#2f5d3a] hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="View Saved Favorites"
                title="Saved Properties"
              >
                <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-lg border border-stone-300 hover:border-[#2f5d3a] text-xs font-semibold text-stone-700 hover:text-[#2f5d3a] flex items-center gap-1.5 transition-all cursor-pointer bg-white shadow-2xs"
                title={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
              >
                <Languages className="w-3.5 h-3.5 text-emerald-700" />
                <span>{lang === 'en' ? 'اردو (Urdu)' : 'English'}</span>
              </button>

              {/* Primary Call / WhatsApp CTA */}
              <a
                href="https://wa.me/923001234567?text=Hello%20Swat%20Property,%20I%20am%20interested%20in%20consulting%20about%20buying%20or%20renting%20property%20in%20Swat."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-200 text-emerald-200" />
                <span>{isUrdu ? 'واٹس ایپ رابطہ' : 'WhatsApp Us'}</span>
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-100">
              <button
                onClick={() => handleLinkClick('/sell')}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-500 text-stone-900 font-semibold text-sm flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                {t('nav.sell')}
              </button>
              <button
                onClick={toggleLanguage}
                className="w-full py-2.5 px-3 rounded-lg border border-stone-300 text-stone-700 font-semibold text-sm flex items-center justify-center gap-1.5"
              >
                <Languages className="w-4 h-4 text-[#2f5d3a]" />
                {lang === 'en' ? 'اردو ورژن' : 'English Version'}
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                      isActive
                        ? 'bg-[#2f5d3a] text-white font-semibold'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2">
              <a
                href="https://wa.me/923001234567?text=Hello%20Swat%20Property,%20I%20am%20interested%20in%20consulting%20about%20buying%20or%20renting%20property%20in%20Swat."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                {isUrdu ? 'واٹس ایپ پر رابطہ کریں' : 'Instant WhatsApp Inquiry'}
              </a>
              <a
                href="tel:+923001234567"
                className="w-full py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-800" />
                <span>+92 300 1234567</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
