import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FloatingContact: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Tooltip greeting */}
      {showTooltip && (
        <div className="hidden sm:flex bg-white text-stone-800 text-xs py-2 px-3 rounded-xl shadow-xl border border-stone-200 items-center gap-2 max-w-[240px] animate-bounce-subtle">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <p className="text-[11px] leading-tight font-medium">
            {isUrdu 
              ? 'سوات پراپرٹی ایڈوائزر آن لائن ہے۔ واٹس ایپ پر رابطہ کریں!' 
              : 'Swat property advisor online. Chat on WhatsApp now!'}
          </p>
          <button 
            onClick={() => setShowTooltip(false)} 
            className="text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2.5">
        {/* Click to Call button */}
        <a
          href="tel:+923001234567"
          className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-900 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          title="Direct Call to Swat Property (+92 300 1234567)"
          aria-label="Call Swat Property"
        >
          <Phone className="w-5 h-5 fill-stone-900" />
        </a>

        {/* WhatsApp Floating button */}
        <a
          href="https://wa.me/923001234567?text=Hello%20Swat%20Property,%20I%20am%20looking%20for%20property%20consultancy%20in%20Swat%20Valley."
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 group"
          title="Chat with Swat Property on WhatsApp"
          aria-label="WhatsApp Swat Property"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
            1
          </span>
          <MessageCircle className="w-7 h-7 fill-white" />
        </a>
      </div>
    </div>
  );
};
