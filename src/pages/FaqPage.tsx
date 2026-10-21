import React, { useState } from 'react';
import { faqsList } from '../data/faqs';
import { useLanguage } from '../context/LanguageContext';
import { HelpCircle, Search, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/propertyUtils';

export const FaqPage: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Buying', 'Selling', 'Renting', 'Overseas', 'Legal'];

  const filteredFaqs = faqsList.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQ = item.question.toLowerCase().includes(q) || item.questionUrdu.includes(q);
      const matchA = item.answer.toLowerCase().includes(q) || item.answerUrdu.includes(q);
      if (!matchQ && !matchA) return false;
    }
    return true;
  });

  const whatsAppLink = generateWhatsAppLink(
    '+923001234567',
    'Hello Swat Property, I have a specific question about property laws or listings in Swat.'
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          {isUrdu ? 'اکثر پوچھے جانے والے سوالات' : 'Help & Information'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-stone-900 tracking-tight">
          {isUrdu ? 'عمومی سوالات و جوابات' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm">
          Everything you need to understand regarding property purchases, tenancy laws, and overseas registry in Swat.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={isUrdu ? 'اپنا سوال یا موضوع تلاش کریں...' : 'Search questions, legal terms, Fard, Intiqal...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-stone-300 text-sm focus:border-[#2f5d3a] outline-none shadow-xs"
        />
      </div>

      {/* Categories Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#2f5d3a] text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-600 text-sm">No answers found for your query.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden card-shadow transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-[#2f5d3a] transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">
                    {isUrdu ? faq.questionUrdu : faq.question}
                  </span>
                  <span className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-emerald-100 text-[#2f5d3a]' : ''}`}>
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    {isUrdu && (
                      <p className="mt-2 text-stone-800 font-urdu leading-loose text-right">
                        {faq.answerUrdu}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still need help banner */}
      <div className="bg-stone-100 rounded-3xl p-6 sm:p-8 text-center space-y-3 border border-stone-200">
        <h4 className="font-bold text-base text-stone-800">
          {isUrdu ? 'کیا آپ کے پاس کوئی اور سوال ہے؟' : 'Still have a specific question?'}
        </h4>
        <p className="text-xs text-stone-500">
          Our senior real estate advisors are ready to answer any technical or legal queries on WhatsApp.
        </p>
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
