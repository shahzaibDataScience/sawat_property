import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Heart,
  ChevronRight,
  ArrowUp
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { swatAreas } from '../../data/areas';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { isUrdu, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (path: string) => {
    onNavigate(path);
    scrollToTop();
  };

  return (
    <footer className="bg-[#183420] text-stone-200 pt-16 pb-12 border-t border-[#244a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2a5535]">
          {/* Brand bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#2f5d3a] flex items-center justify-center text-white shadow-md border border-emerald-400/30">
                <svg className="w-7 h-7" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 16 L16 46 L28 46 L28 84 L72 84 L72 46 L84 46 Z" fill="#ffffff" />
                  <path d="M50 32 L40 50 L46 50 L38 68 L62 68 L54 50 L60 50 Z" fill="#2f5d3a" />
                  <circle cx="70" cy="30" r="5" fill="#d97706" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-1">
                  SWAT <span className="text-amber-400">PROPERTY</span>
                </span>
                <p className="text-xs text-emerald-300 font-medium">
                  {isUrdu ? 'سوات کا سب سے بڑا اور تصدیق شدہ رئیل اسٹیٹ نیٹ ورک' : 'Verified Real Estate & Land Advisory in Swat Valley'}
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed pr-4">
              {t('footer.about')}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {isUrdu ? '100% قانونی فرد و انتقال گارنٹی' : '100% Verified Patwari Records'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                ★ 4.9/5 Client Rating
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base font-heading">
              {isUrdu ? 'اہم لنکس' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button onClick={() => handleLink('/buy')} className="hover:text-amber-400 transition-colors flex items-center gap-1 text-left cursor-pointer">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  {isUrdu ? 'جائیداد برائے فروخت' : 'Properties for Sale (Buy)'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/rent')} className="hover:text-amber-400 transition-colors flex items-center gap-1 text-left cursor-pointer">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  {isUrdu ? 'جائیداد برائے کرایہ' : 'Properties for Rent'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/sell')} className="hover:text-amber-400 transition-colors flex items-center gap-1 text-left cursor-pointer text-amber-300 font-semibold">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  {isUrdu ? 'اپنی جائیداد لسٹ کریں' : 'Sell / List Your Property'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/about')} className="hover:text-amber-400 transition-colors flex items-center gap-1 text-left cursor-pointer">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  {isUrdu ? 'ہمارے بارے میں' : 'About Swat Property'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/blog')} className="hover:text-amber-400 transition-colors flex items-center gap-1 text-left cursor-pointer">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  {isUrdu ? 'سوات گائیڈ و بلاگ' : 'Swat Guides & Blog'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/faq')} className="hover:text-amber-400 transition-colors flex items-center gap-1 text-left cursor-pointer">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  {isUrdu ? 'اکثر پوچھے گئے سوالات' : 'Frequently Asked Questions'}
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Areas in Swat */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base font-heading">
              {isUrdu ? 'سوات کے اہم علاقے' : 'Areas We Serve'}
            </h4>
            <ul className="space-y-1.5 text-sm text-stone-300">
              {swatAreas.slice(0, 6).map((area) => (
                <li key={area.id}>
                  <button 
                    onClick={() => handleLink(`/areas/${area.slug}`)} 
                    className="hover:text-amber-400 transition-colors flex items-center gap-1 text-left cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{isUrdu ? area.nameUrdu : area.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => handleLink('/areas')} 
                  className="text-amber-400 hover:text-amber-300 text-xs font-semibold pt-1 flex items-center gap-1 cursor-pointer"
                >
                  {isUrdu ? 'تمام 10 علاقے دیکھیں ←' : 'View all 10 areas →'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Working Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base font-heading">
              {isUrdu ? 'دفتر کا پتہ و رابطہ' : 'Swat Head Office'}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Main Bypass Road, Fizagat, Mingora, Swat, KP, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+923001234567" className="hover:text-white transition-colors">
                  +92 300 1234567 / +92 946 720000
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/923001234567?text=Assalam-o-Alaikum,%20I%20am%20interested%20in%20this%20property%20on%20Swat%20Property%20Portal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: +92 300 1234567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@swatproperty.pk" className="hover:text-white transition-colors">
                  info@swatproperty.pk
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-[#2a5535]">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} Swat Property. All Rights Reserved. Reg. with Excise & Taxation Dept KPK.
          </p>

          <div className="flex items-center gap-6">
            <button onClick={() => handleLink('/terms')} className="hover:text-white transition-colors cursor-pointer">
              {isUrdu ? 'شرائط و ضوابط' : 'Terms & Conditions'}
            </button>
            <button onClick={() => handleLink('/privacy')} className="hover:text-white transition-colors cursor-pointer">
              {isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
            </button>
            <button onClick={() => handleLink('/contact')} className="hover:text-white transition-colors cursor-pointer">
              {isUrdu ? 'سائٹ میپ' : 'Sitemap'}
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#2f5d3a] hover:bg-[#254b2e] text-white transition-all ml-2"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
