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
    <article className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
      <Link
        to="/in/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#70BF4F] mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> {isMr ? 'सर्व लेखांकडे परत जा' : 'Back to all stories'}
      </Link>

      <div className="mb-6">
        <span className="inline-block bg-[#70BF4F]/10 text-[#70BF4F] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          {category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-serif leading-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-gray-800">
              <User className="w-4 h-4 text-[#70BF4F]" /> {author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {readTime}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors font-medium text-gray-700 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> {isMr ? 'शेअर करा' : 'Share'}
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-2xl overflow-hidden mb-8 shadow-sm aspect-video bg-gray-100">
        <img src={post.image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Body Content */}
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
        <p className="text-lg font-medium text-gray-900 leading-relaxed border-l-4 border-[#70BF4F] pl-4 py-1 italic bg-green-50/40 rounded-r">
          {excerpt}
        </p>
        
        <div className="space-y-4 text-base">
          {content.split('\n\n').map((para, i) => {
            if (para.trim().startsWith('###')) {
              return (
                <h3 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-2 font-serif">
                  {para.replace('###', '').trim()}
                </h3>
              );
            }
            return <p key={i}>{para.trim()}</p>;
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 p-8 bg-orange-50/70 rounded-2xl border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {isMr ? 'अस्सल मराठमोळा स्वाद अनुभवा' : 'Taste authentic Maharashtra today'}
          </h3>
          <p className="text-sm text-gray-600">
            {isMr 
              ? 'ताजे तयार केलेले पारंपरिक स्नॅक्स, लोणची आणि मसाले आत्ताच मागवा.' 
              : 'Explore traditional snacks, pickles, and spices made fresh.'}
          </p>
        </div>
        <Link
          to="/in/store"
          className="bg-[#70BF4F] hover:bg-[#5ca040] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap"
        >
          {isMr ? 'आत्ताच खरेदी करा' : 'Shop Now'}
        </Link>
      </div>
    </article>
  );
}
