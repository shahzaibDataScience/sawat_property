import React from 'react';
import { ShieldCheck, Award, MapPin, Users, HeartHandshake, FileCheck, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { isUrdu } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#1b3823] via-[#2f5d3a] to-[#254b2e] text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
            {isUrdu ? '15 سالوں کا بھروسہ' : 'Established in 2011 • Swat Valley'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            {isUrdu ? 'سوات پراپرٹی کے بارے میں' : 'About Swat Property'}
          </h1>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
            We are the premier real estate advisory firm dedicated to safeguarding property investments across the historic valley of Swat, Khyber Pakhtunkhwa.
          </p>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 card-shadow space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2f5d3a] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-stone-900">
            {isUrdu ? 'قانونی تحفظ کی ضمانت' : '100% Legal Title Integrity'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            In mountain regions, clarity of ownership is everything. We never list any plot or house without a fresh verified Jamabandi, Aks-e-Shajra survey, and non-encumbrance revenue record.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 card-shadow space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-stone-900">
            {isUrdu ? 'اوورسیز پاکستانیوں کا پہلا انتخاب' : 'Overseas Pakistani Care'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            We serve hundreds of families residing in the UK, UAE, USA, and Saudi Arabia. From live video site tours to biometric deed transfers via legal Power of Attorney, we make investing from afar effortless.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 card-shadow space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2f5d3a] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-stone-900">
            {isUrdu ? 'مقامی و سیاحتی مارکیٹ کی مہارت' : 'Swat Tourism & Hospitality Experts'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            From commercial hotel plots in Kalam to ski chalets in Malam Jabba and residential plots in Mingora, our valuation models are grounded in decades of transactional data.
          </p>
        </div>
      </div>

      {/* Leadership & Advisory Team */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
            {isUrdu ? 'ہماری سینئر قیادت' : 'Meet Our Leadership'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Experienced legal advocates, land survey engineers, and local real estate advisors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 text-center card-shadow space-y-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              alt="Haji Sher Zaman"
              className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div>
              <h4 className="font-bold text-stone-900 font-heading">Haji Sher Zaman Khan</h4>
              <p className="text-xs text-[#2f5d3a] font-semibold">Founder & Managing Director</p>
              <p className="text-xs text-stone-500 mt-2">
                Over 25 years of real estate leadership in Malakand division and Swat Valley development.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 text-center card-shadow space-y-3">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
              alt="Advocate Sher Muhammad"
              className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-amber-500 shadow-sm"
            />
            <div>
              <h4 className="font-bold text-stone-900 font-heading">Adv. Sher Muhammad Khan</h4>
              <p className="text-xs text-amber-700 font-semibold">Chief Legal & Revenue Counsel</p>
              <p className="text-xs text-stone-500 mt-2">
                Specialist in KPK Land Revenue Act, Patwari record auditing, and high-court title litigation.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 text-center card-shadow space-y-3">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
              alt="Engr. Junaid Babar"
              className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div>
              <h4 className="font-bold text-stone-900 font-heading">Engr. Junaid Babar</h4>
              <p className="text-xs text-[#2f5d3a] font-semibold">Director of Surveys & Demarcation</p>
              <p className="text-xs text-stone-500 mt-2">
                Supervises digital GIS mapping, drone land topography, and Marla/Kanal standard conversions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-stone-100 rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-stone-200">
        <h3 className="text-2xl font-bold font-heading text-stone-900">
          {isUrdu ? 'سوات میں ہمارے دفتر تشریف لائیں' : 'Visit Our Head Office in Mingora, Swat'}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
          We welcome you for traditional Pashtun green tea (Kahwa) and personalized property consultations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/contact')}
            className="px-6 py-3 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md"
          >
            {isUrdu ? 'دفتر کا پتہ و رابطہ' : 'View Office Map & Contact Info'}
          </button>
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
