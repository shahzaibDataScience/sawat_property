import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isUrdu: boolean;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', ur: 'ہوم' },
  'nav.buy': { en: 'Buy', ur: 'خریدیں' },
  'nav.rent': { en: 'Rent', ur: 'کرایہ' },
  'nav.sell': { en: 'List Property', ur: 'جائیداد لسٹ کریں' },
  'nav.areas': { en: 'Areas', ur: 'علاقے' },
  'nav.about': { en: 'About', ur: 'تعارف' },
  'nav.blog': { en: 'Blog', ur: 'بلاگ' },
  'nav.faq': { en: 'FAQ', ur: 'عمومی سوالات' },
  'nav.contact': { en: 'Contact', ur: 'رابطہ کریں' },
  'nav.callNow': { en: 'Call Now', ur: 'کال کریں' },
  'nav.whatsapp': { en: 'WhatsApp', ur: 'واٹس ایپ' },
  'nav.favorites': { en: 'Saved', ur: 'پسندیدہ' },

  // Hero
  'hero.tagline': { en: 'Swat Valley’s #1 Most Trusted Real Estate Agency', ur: 'سوات ویلی کا سب سے قابل اعتماد رئیل اسٹیٹ ادارہ' },
  'hero.title': { en: 'Find Your Dream Property in Swat', ur: 'سوات میں اپنے خوابوں کا گھر تلاش کریں' },
  'hero.subtitle': { en: 'Verified houses, commercial plots, mountain land, and luxury holiday rentals across Mingora, Kalam, Malam Jabba, and Saidu Sharif.', ur: 'مینگورہ، کالام، مالم جبہ اور سیدو شریف میں تصدیق شدہ مکانات، پلاٹس اور کمرشل جائیدادیں۔' },
  'hero.tab.buy': { en: 'Buy Property', ur: 'خریدیں' },
  'hero.tab.rent': { en: 'Rent Property', ur: 'کرایہ پر لیں' },
  'hero.search': { en: 'Search Properties', ur: 'پراپرٹی تلاش کریں' },
  'hero.location': { en: 'Select Location / Area', ur: 'علاقہ منتخب کریں' },
  'hero.type': { en: 'Property Type', ur: 'پراپرٹی کی قسم' },
  'hero.budget': { en: 'Max Budget (PKR)', ur: 'زیادہ سے زیادہ بجٹ' },
  'hero.beds': { en: 'Bedrooms', ur: 'بیڈ رومز' },

  // Stats
  'stats.listed': { en: 'Verified Properties', ur: 'تصدیق شدہ جائیدادیں' },
  'stats.clients': { en: 'Happy Clients', ur: 'مطمئن خریدار' },
  'stats.years': { en: 'Years in Swat', ur: 'سالوں کا اعتماد' },
  'stats.legal': { en: 'Legal Clear Titles', ur: 'قانونی تصدیق' },

  // Sections
  'section.featured': { en: 'Featured Properties', ur: 'نمایاں جائیدادیں' },
  'section.featuredSub': { en: 'Handpicked verified premium listings in prime Swat locations', ur: 'سوات کے بہترین مقامات پر منتخب پریمیم پراپرٹیز' },
  'section.latestSale': { en: 'Latest Properties for Sale', ur: 'فروخت کے لیے تازہ ترین مکانات و پلاٹ' },
  'section.latestRent': { en: 'Latest Properties for Rent', ur: 'کرایہ کے لیے تازہ ترین جائیدادیں' },
  'section.types': { en: 'Explore by Property Type', ur: 'پراپرٹی کی قسم کے لحاظ سے تلاش کریں' },
  'section.areas': { en: 'Popular Areas in Swat', ur: 'سوات کے مقبول ترین علاقے' },
  'section.whyUs': { en: 'Why Choose Swat Property?', ur: 'سوات پراپرٹی کا انتخاب کیوں کریں؟' },
  'section.howItWorks': { en: 'How It Works', ur: 'طریقہ کار' },
  'section.testimonials': { en: 'What Our Clients Say', ur: 'ہمارے صارفین کے تاثرات' },
  'section.faq': { en: 'Frequently Asked Questions', ur: 'اکثر پوچھے جانے والے سوالات' },

  // Common CTA & Badges
  'badge.forSale': { en: 'For Sale', ur: 'برائے فروخت' },
  'badge.forRent': { en: 'For Rent', ur: 'برائے کرایہ' },
  'badge.featured': { en: 'Featured', ur: 'نمایاں' },
  'badge.verified': { en: '100% Verified Title', ur: '100% تصدیق شدہ' },
  'cta.viewDetails': { en: 'View Details', ur: 'تفصیلات دیکھیں' },
  'cta.callAgent': { en: 'Call Agent', ur: 'کال کریں' },
  'cta.whatsappAgent': { en: 'WhatsApp', ur: 'واٹس ایپ' },
  'cta.listWithUs': { en: 'Want to sell or rent your property? List it with us for free', ur: 'کیا آپ اپنی جائیداد بیچنا یا کرایہ پر دینا چاہتے ہیں؟ مفت لسٹ کریں' },
  'cta.listButton': { en: 'List Your Property Now', ur: 'ابھی پراپرٹی لسٹ کریں' },
  'cta.calculator': { en: 'Installment Calculator', ur: 'اقساط کیلکولیٹر' },
  'filter.all': { en: 'All', ur: 'سب' },
  'filter.reset': { en: 'Reset Filters', ur: 'فلٹرز ری سیٹ کریں' },
  'footer.about': { en: 'Swat Property is the premier real estate advisory firm serving Swat Valley, Khyber Pakhtunkhwa. We assist local buyers, overseas Pakistanis, and hospitality investors with 100% verified legal land titles.', ur: 'سوات پراپرٹی سوات ویلی خیبر پختونخوا کا سب سے بڑا اور قابل اعتماد رئیل اسٹیٹ ادارہ ہے جو خریداروں اور اوورسیز پاکستانیوں کو محفوظ سرمایہ کاری فراہم کرتا ہے۔' },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  isUrdu: false,
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('swat_property_lang');
    return saved === 'ur' ? 'ur' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('swat_property_lang', lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isUrdu: lang === 'ur', t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
