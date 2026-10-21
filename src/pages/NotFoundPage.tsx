import React from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const { isUrdu } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-24 h-24 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-4xl font-extrabold font-heading shadow-md">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-stone-900">
          {isUrdu ? 'صفحہ نہیں ملا' : 'Page Not Found'}
        </h1>
        <p className="text-stone-500 text-sm max-w-md mx-auto">
          {isUrdu
            ? 'معذرت، جو صفحہ آپ تلاش کر رہے ہیں وہ منتقل ہو چکا ہے یا موجود نہیں ہے۔'
            : 'The property or page you are looking for might have been sold, rented, or moved.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>{isUrdu ? 'مرکزی صفحہ پر جائیں' : 'Back to Home'}</span>
        </button>

        <button
          onClick={() => onNavigate('/buy')}
          className="px-6 py-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-sm flex items-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>{isUrdu ? 'جائیداد تلاش کریں' : 'Browse Properties'}</span>
        </button>
      </div>
    </div>
  );
};
