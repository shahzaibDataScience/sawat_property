import React from 'react';
import { blogPosts } from '../data/blogs';
import { BlogPost } from '../types/property';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Tag } from 'lucide-react';

interface BlogPageProps {
  selectedBlogSlug?: string;
  onSelectBlog: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  selectedBlogSlug,
  onSelectBlog,
  onNavigate,
}) => {
  const { isUrdu } = useLanguage();

  const currentBlog = selectedBlogSlug
    ? blogPosts.find((b) => b.slug === selectedBlogSlug)
    : null;

  if (currentBlog) {
    // Single Blog Post View
    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <button
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#2f5d3a] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? 'تمام بلاگ مضامین' : 'Back to All Guides & Articles'}</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              {currentBlog.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {currentBlog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentBlog.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-stone-900 tracking-tight leading-tight">
            {isUrdu ? currentBlog.titleUrdu : currentBlog.title}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1">
            {currentBlog.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-stone-600">
            <div className="w-9 h-9 rounded-full bg-[#2f5d3a] text-white flex items-center justify-center font-bold">
              SP
            </div>
            <div>
              <p className="font-bold text-stone-800">{currentBlog.author}</p>
              <p className="text-[11px] text-stone-400">Swat Property Legal & Advisory Research Wing</p>
            </div>
          </div>
        </div>

        {/* Feature Image */}
        <div className="h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-stone-200">
          <img
            src={currentBlog.image}
            alt={currentBlog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 card-shadow space-y-5 text-stone-800 text-sm sm:text-base leading-relaxed">
          {currentBlog.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Tags */}
          <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-stone-400" />
            {currentBlog.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-md font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Next / Previous other articles */}
        <div className="pt-6 border-t border-stone-200 space-y-4">
          <h3 className="font-bold text-stone-900 text-lg font-heading">
            {isUrdu ? 'مزید مضامین پڑھیں' : 'More Guides & Market Insights'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogPosts
              .filter((b) => b.id !== currentBlog.id)
              .map((post) => (
                <div
                  key={post.id}
                  onClick={() => onSelectBlog(post.slug)}
                  className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-[#2f5d3a] card-shadow cursor-pointer transition-all space-y-2"
                >
                  <span className="text-[11px] text-emerald-800 font-semibold">{post.category}</span>
                  <h4 className="font-bold text-sm text-stone-900 line-clamp-2 hover:text-[#2f5d3a]">
                    {post.title}
                  </h4>
                  <p className="text-xs text-stone-500">{post.readTime}</p>
                </div>
              ))}
          </div>
        </div>
      </article>
    );
  }

  // Blog Hub View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          {isUrdu ? 'معلوماتی مضامین' : 'Knowledge & Insights'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-stone-900 tracking-tight">
          {isUrdu ? 'سوات رئیل اسٹیٹ گائیڈ و بلاگ' : 'Swat Real Estate Guides & Legal Insights'}
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm">
          Expert articles on Pakistani land measurements, Revenue Department procedures, and hotel hospitality ROI in Swat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => onSelectBlog(post.slug)}
            className="group bg-white rounded-2xl border border-stone-200 overflow-hidden card-shadow card-shadow-hover cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-52 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#2f5d3a] text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-bold text-base sm:text-lg font-heading text-stone-900 group-hover:text-[#2f5d3a] transition-colors line-clamp-2">
                  {isUrdu ? post.titleUrdu : post.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#2f5d3a]">
              <span>Read Full Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
