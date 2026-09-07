import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS } from './Blog';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/in/blog" replace />;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <article className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
      <Link
        to="/in/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#70BF4F] mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all stories
      </Link>

      <div className="mb-6">
        <span className="inline-block bg-[#70BF4F]/10 text-[#70BF4F] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-serif leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-gray-800">
              <User className="w-4 h-4 text-[#70BF4F]" /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors font-medium text-gray-700"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-2xl overflow-hidden mb-8 shadow-sm aspect-video bg-gray-100">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Body Content */}
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
        <p className="text-lg font-medium text-gray-900 leading-relaxed border-l-4 border-[#70BF4F] pl-4 py-1 italic bg-green-50/40 rounded-r">
          {post.excerpt}
        </p>
        
        <div className="space-y-4 text-base">
          {post.content.split('\n\n').map((para, i) => {
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
          <h3 className="text-lg font-bold text-gray-900 mb-1">Taste authentic Maharashtra today</h3>
          <p className="text-sm text-gray-600">Explore traditional snacks, pickles, and spices made fresh.</p>
        </div>
        <Link
          to="/in/store"
          className="bg-[#70BF4F] hover:bg-[#5ca040] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap"
        >
          Shop Now
        </Link>
      </div>
    </article>
  );
}
