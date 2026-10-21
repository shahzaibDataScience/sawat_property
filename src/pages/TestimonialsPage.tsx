import React from 'react';
import { testimonialsList } from '../data/testimonials';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Star } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { isUrdu } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          {isUrdu ? 'صارفین کا اعتماد' : 'Trusted by Thousands'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-stone-900 tracking-tight">
          {isUrdu ? 'گاہکوں کے تاثرات اور تجربات' : 'Client Testimonials & Success Stories'}
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm">
          Hear directly from overseas investors, local families, and tourism operators who bought, sold, or rented property in Swat through our agency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonialsList.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 card-shadow space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Transaction
                </span>
              </div>

              <p className="text-stone-700 text-sm sm:text-base italic leading-relaxed">
                "{test.comment}"
              </p>

              {test.commentUrdu && (
                <p className="text-stone-800 font-urdu leading-loose text-sm sm:text-base text-right p-3 bg-stone-50 rounded-xl">
                  "{test.commentUrdu}"
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
                  }}
                  className="w-12 h-12 rounded-full object-cover shadow-xs border border-stone-200"
                />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm font-heading">{test.name}</h4>
                  <p className="text-xs text-stone-500">{test.role} • {test.location}</p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-[10px] uppercase font-bold text-stone-400">Property</span>
                <p className="text-xs font-semibold text-[#2f5d3a]">{test.propertyPurchased}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
