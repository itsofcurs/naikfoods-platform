import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS } from './Blog';
import { useLanguageStore } from '../store/languageStore';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const lang = useLanguageStore((state) => state.lang);
  const isMr = lang === 'mr';

  if (!post) {
    return <Navigate to="/in/blog" replace />;
  }

  const title = isMr ? post.titleMr || post.title : post.title;
  const excerpt = isMr ? post.excerptMr || post.excerpt : post.excerpt;
  const content = isMr ? post.contentMr || post.content : post.content;
  const category = isMr ? post.categoryMr || post.category : post.category;
  const author = isMr ? post.authorMr || post.author : post.author;
  const date = isMr ? post.dateMr || post.date : post.date;
  const readTime = isMr ? post.readTimeMr || post.readTime : post.readTime;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(isMr ? 'लिंक कॉपी झाली!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFCF7] dark:bg-[#070B14] py-8 sm:py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          to="/in/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#70BF4F] dark:hover:text-[#70BF4F] bg-white dark:bg-[#131E35] border border-gray-200/80 dark:border-gray-800 px-4 py-2 rounded-full shadow-xs mb-8 font-semibold transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4 text-[#70BF4F]" /> {isMr ? 'सर्व लेखांकडे परत जा' : 'Back to all stories'}
        </Link>

        <article className="bg-white dark:bg-[#0F172A] rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-200/70 dark:border-gray-800 shadow-sm">
          <div className="mb-8">
            <span className="inline-block bg-[#70BF4F]/10 dark:bg-[#70BF4F]/20 text-[#70BF4F] dark:text-[#86EFAC] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 border border-[#70BF4F]/20">
              {category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 font-serif leading-[1.2] tracking-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span className="flex items-center gap-1.5 font-bold text-gray-800 dark:text-gray-200">
                  <User className="w-4 h-4 text-[#70BF4F]" /> {author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" /> {date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" /> {readTime}
                </span>
              </div>

              <button
                onClick={handleShare}
                type="button"
                className="flex items-center gap-1.5 text-xs bg-gray-50 dark:bg-[#131E35] hover:bg-gray-100 dark:hover:bg-[#1E293B] px-4 py-2 rounded-full transition-colors font-bold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 cursor-pointer shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5 text-[#70BF4F]" /> {isMr ? 'शेअर करा' : 'Share'}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-10 shadow-md aspect-video bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
            <img src={post.image} alt={title} className="w-full h-full object-cover" />
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed">
            <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white leading-relaxed border-l-4 border-[#70BF4F] pl-5 py-3 italic bg-emerald-50/70 dark:bg-[#131E35] rounded-r-2xl border-y border-r border-emerald-100/50 dark:border-gray-800">
              {excerpt}
            </p>
            
            <div className="space-y-5 text-base sm:text-[17px] text-gray-700 dark:text-gray-300 leading-relaxed">
              {content.split('\n\n').map((para, i) => {
                if (para.trim().startsWith('###')) {
                  return (
                    <h3 key={i} className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3 font-serif">
                      {para.replace('###', '').trim()}
                    </h3>
                  );
                }
                return <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">{para.trim()}</p>;
              })}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 p-6 sm:p-8 bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-white dark:from-[#131E35] dark:to-[#0F172A] rounded-2xl border border-amber-200/70 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1.5 font-serif">
                {isMr ? 'अस्सल मराठमोळा स्वाद अनुभवा' : 'Taste authentic Maharashtra today'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {isMr 
                  ? 'ताजे तयार केलेले पारंपरिक स्नॅक्स, लोणची आणि मसाले आत्ताच मागवा.' 
                  : 'Explore traditional snacks, pickles, and spices made fresh with heirloom recipes.'}
              </p>
            </div>
            <Link
              to="/in/store"
              className="bg-[#70BF4F] hover:bg-[#58A03A] text-white px-7 py-3 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95"
            >
              {isMr ? 'आत्ताच खरेदी करा' : 'Shop Now'}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
