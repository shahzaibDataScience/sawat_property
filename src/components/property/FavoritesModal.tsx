import React from 'react';
import { X, Trash2, ArrowRight, Heart, Phone, MessageCircle } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { initialListings } from '../../data/listings';
import { useLanguage } from '../../context/LanguageContext';
import { generateWhatsAppLink } from '../../utils/propertyUtils';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty: (slug: string, triggerElement?: HTMLElement) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  onSelectProperty,
}) => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const { isUrdu } = useLanguage();

  if (!isOpen) return null;

  const savedListings = initialListings.filter((item) => favorites.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="font-bold text-lg text-stone-800 font-heading">
              {isUrdu ? 'پسندیدہ جائیدادیں' : 'Saved Properties'}
            </h3>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#2f5d3a] text-white">
              {savedListings.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Close saved properties modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedListings.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-stone-700">
                {isUrdu ? 'کوئی پراپرٹی محفوظ نہیں کی گئی' : 'No Saved Properties Yet'}
              </h4>
              <p className="text-xs text-stone-500 max-w-xs">
                {isUrdu
                  ? 'پراپرٹی کارڈ پر دل کے نشان پر کلک کریں تاکہ بعد میں آسانی سے دیکھ سکیں۔'
                  : 'Click the heart icon on any property card to save it here for quick comparison.'}
              </p>
            </div>
          ) : (
            savedListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 p-3 hover:border-emerald-300 transition-all shadow-xs flex gap-3 group relative"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-24 h-24 object-cover rounded-lg shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectProperty(item.slug);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.purpose === 'sale' ? 'For Sale' : 'For Rent'}
                      </span>
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="text-stone-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                        title="Remove from favorites"
                        aria-label="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4
                      onClick={() => {
                        onSelectProperty(item.slug);
                        onClose();
                      }}
                      className="font-bold text-xs sm:text-sm text-stone-800 truncate mt-1 cursor-pointer hover:text-[#2f5d3a]"
                    >
                      {isUrdu ? item.titleUrdu : item.title}
                    </h4>

                    <p className="text-xs font-semibold text-[#2f5d3a] mt-0.5">
                      {item.priceFormatted}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px]">
                    <span className="text-stone-500">
                      {item.areaValue} {item.areaUnit} • {item.areaName}
                    </span>

                    <button
                      onClick={() => {
                        onSelectProperty(item.slug);
                        onClose();
                      }}
                      className="text-amber-600 font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      <span>{isUrdu ? 'دیکھیں' : 'View'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {savedListings.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2">
            <a
              href={generateWhatsAppLink(
                '+923001234567',
                `Hello Swat Property, I have saved ${savedListings.length} properties on your website and would like to arrange viewings:\n${savedListings.map(s => `- ${s.title} (${s.priceFormatted})`).join('\n')}`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isUrdu ? 'تمام کی واٹس ایپ پر انکوائری کریں' : 'Inquire All via WhatsApp'}</span>
            </a>

            <button
              onClick={clearFavorites}
              className="w-full py-2 text-stone-500 hover:text-red-600 text-xs font-medium cursor-pointer"
            >
              {isUrdu ? 'تمام فہرست خالی کریں' : 'Clear All Favorites'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
