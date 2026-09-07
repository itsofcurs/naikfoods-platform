import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'secrets-of-crispy-methi-chakali',
    title: 'The Secret Behind Crisp & Fragrant Methi Chakali',
    excerpt: 'Learn the traditional ratios of roasted Bhajani flour and fresh fenugreek leaves that make Maharashtrian Chakali irresistibly crisp without absorbing excess oil.',
    category: 'Snacks & Namkeen',
    readTime: '4 min read',
    date: 'Sep 02, 2026',
    author: 'Mrs. Priya Naik',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1779968324/medusa/1779968322289-IMG_3854.JPG.jpeg.jpg',
    content: `
      Chakali is not just a festive snack; in Maharashtra, it is an emotion. The distinct spiral shape, the crispy bite, and the burst of spices like cumin, carom seeds, and dry fenugreek (methi) leaves create an unmatched tea-time companion.

      ### The Importance of Bhajanic Flour
      The base of true Maharashtrian Chakali is 'Bhajani' — a specially proportioned mixture of rice, chana dal, urad dal, and coriander seeds roasted slowly on low heat before being stone ground.

      ### Adding the Twist of Methi
      At Naik Foods, we add carefully selected dehydrated methi leaves that add an earthy bitterness balancing the deep savory spices.
    `
  },
  {
    id: 2,
    slug: 'traditional-ambadi-bhaji-lonche-heritage',
    title: 'Ambadi Lonche: A Forgotten Gem of Marathwada & Vidarbha',
    excerpt: 'Ambadi (Roselle / Sorrel leaves) pickle has been a staple in rural Maharashtra for centuries. Discover its natural gut-healthy tanginess and medicinal benefits.',
    category: 'Pickles & Condiments',
    readTime: '5 min read',
    date: 'Aug 24, 2026',
    author: 'Late Sarita Naik Legacy',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1780121990/medusa/1780121988900-pomelli_photoshoot_image_1_1_0529%20%287%29.png.jpg',
    content: `
      Ambadi (Gongura or Roselle) is packed with Vitamin C, Iron, and natural antioxidants. In traditional Maharashtrian households, preparing Ambadi pickle is an art.

      ### How It Is Made
      Tender sorrel leaves are hand-plucked, cleaned, and sautéed with mustard oil, roasted fenugreek powder, crushed garlic, and Kolhapuri red chili flakes. The result is a tongue-tingling pickle that elevates simple Dal-Rice or Bhakri into a royal feast.
    `
  },
  {
    id: 3,
    slug: 'why-jowar-is-the-superfood-you-need',
    title: 'Why Jowar (Sorghum) Is the Ultimate Modern Superfood',
    excerpt: 'Gluten-free, fiber-rich, and diabetic-friendly: why shifting to traditional millet snacks like Jwari Bhel & Jowar Chivda transforms your daily digestion and energy.',
    category: 'Health & Wellness',
    readTime: '3 min read',
    date: 'Aug 15, 2026',
    author: 'Naik Foods Culinary Team',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1781146398/medusa/1781146396686-pomelli_photoshoot_image_1_1_0526%20%282%29%20%282%29.png.jpg',
    content: `
      Millets have been the backbone of rural Indian nutrition for over 3,000 years. Sorghum (Jowar) stands out due to its high dietary fiber, complex carbohydrates, and zero gluten content.

      Snacking on puffed Jowar (Jwari Bhel) gives you long-lasting energy without glucose spikes, making it an ideal choice for healthy living.
    `
  },
  {
    id: 4,
    slug: 'solapuri-shengdana-chutney-fiery-staple',
    title: 'Authentic Solapuri Shengdana Chutney: The Fiery Staple',
    excerpt: 'Hand-pounded roasted peanuts, raw garlic pods, and spicy Byadgi chillies—uncover why this iconic dry chutney is found in every Maharashtrian kitchen.',
    category: 'Spices & Chutneys',
    readTime: '4 min read',
    date: 'Aug 02, 2026',
    author: 'Chef Anjali Naik',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1781146398/medusa/1781146396686-pomelli_photoshoot_image_1_1_0526%20%282%29%20%282%29.png.jpg',
    content: `
      Solapur is world-renowned for its coarse, nutty peanut chutney. The secret lies in pounding the warm roasted groundnuts just enough to release their natural oils without turning into a paste.
    `
  },
  {
    id: 5,
    slug: 'royal-legacy-puneri-bakarwadi',
    title: 'The Royal Crunch: Story & Secrets of Puneri Bakarwadi',
    excerpt: 'Explore how a sweet, spicy, and tangy coconut-sesame masala spiral wrapped in gram flour became the crowning jewel of Maharashtra tea-time snacking.',
    category: 'Snacks & Namkeen',
    readTime: '5 min read',
    date: 'Jul 20, 2026',
    author: 'Mrs. Priya Naik',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1779968324/medusa/1779968322289-IMG_3854.JPG.jpeg.jpg',
    content: `
      Bakarwadi is a complex symphony of poppy seeds, desiccated coconut, roasted sesame, and traditional spices rolled inside a crisp golden disc.
    `
  },
  {
    id: 6,
    slug: 'traditional-mango-murabba-heritage',
    title: 'Grandma’s Sun-Cooked Aam Murabba & Chhunda',
    excerpt: 'From Raw Rajapuri mangoes to saffron syrup: how slow sun-cooking preserves pure sweetness and immunity-boosting spices without artificial chemicals.',
    category: 'Pickles & Condiments',
    readTime: '4 min read',
    date: 'Jul 05, 2026',
    author: 'Late Sarita Naik Legacy',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1780121990/medusa/1780121988900-pomelli_photoshoot_image_1_1_0529%20%287%29.png.jpg',
    content: `
      In Maharashtra, summer afternoons were always marked by glass jars of freshly grated mangoes left on terraces to sun-ripen into glorious sweet Murabba.
    `
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(['All']);
    BLOG_POSTS.forEach(b => set.add(b.category));
    return Array.from(set);
  }, []);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter(b => b.category === selectedCategory);
  }, [selectedCategory]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsSubscribing(true);
    // Simulate / Connect subscription
    setTimeout(() => {
      setIsSubscribing(false);
      toast.success('Welcome to the family! Check your inbox soon.');
      setNewsletterEmail('');
    }, 600);
  };

  return (
    <div className="w-full bg-[#FAFAF8] min-h-screen font-sans text-[#161915] selection:bg-[#70BF4F]/20 selection:text-[#161915]">
      
      {/* TOP HERO BANNER (Exact Match with Original Website) */}
      <section className="relative w-full bg-[#70BF4F] py-14 md:py-20 overflow-hidden text-center text-white">
        {/* Vegetable Pattern Watermark Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20"
          style={{ backgroundImage: 'url("/banners/Hero-Banner.png")' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2.5 font-manrope">
            Our Blogs
          </h1>
          <p className="text-white/95 text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto mb-4">
            Insights, traditional tips, and Maharashtrian culinary updates.
          </p>
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white font-bold">Our Blogs</span>
          </nav>
        </div>
      </section>

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Category Filter Chips */}
        <div className="mb-10 sm:mb-12 flex justify-center flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-[#70BF4F] text-white shadow-[#70BF4F]/30 shadow-md scale-105'
                    : 'bg-white text-[#161915] border border-[#EAEDE9] hover:bg-[#F2F7F5] hover:border-[#70BF4F]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Blog Posts 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 sm:mb-24">
          {filteredBlogs.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-[20px] border border-[#F0F2EF] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <Link to={`/in/blog/${post.slug}`} className="block relative h-60 w-full overflow-hidden bg-[#fafaf8]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://res.cloudinary.com/dskzfipt3/image/upload/v1779968324/medusa/1779968322289-IMG_3854.JPG.jpeg.jpg';
                  }}
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#70BF4F] text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-gray-100">
                  <Tag className="w-3.5 h-3.5 text-[#70BF4F]" />
                  {post.category}
                </span>
              </Link>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                {/* Meta Date & Read Time */}
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#70BF4F]" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#70BF4F]" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-[#161915] mb-3 line-clamp-2 group-hover:text-[#70BF4F] transition-colors leading-snug">
                  <Link to={`/in/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#F2F7F5] flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">By {post.author}</span>
                  <Link
                    to={`/in/blog/${post.slug}`}
                    className="text-[#70BF4F] font-black text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all group-hover:text-[#5ea342]"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* COMMUNITY NEWSLETTER BANNER (Exact Match with Original Website) */}
        <section className="relative w-full rounded-[32px] overflow-hidden bg-[#70BF4F] px-6 sm:px-12 py-10 sm:py-14 shadow-[0_20px_40px_rgba(112,191,79,0.2)] text-white">
          {/* Background Decorative Pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-15"
            style={{ backgroundImage: 'url("/backgrounds/bg01.png")' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-manrope">
                Join the Naik Foods <br className="hidden sm:inline" />
                Community
              </h2>
              <p className="text-white/90 text-base sm:text-lg max-w-lg font-medium">
                Get authentic recipes and exclusive offers delivered to your inbox.
              </p>

              {/* Subscribe Form */}
              <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white text-[#161915] placeholder-gray-400 px-5 py-3.5 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-[#161915] text-white hover:bg-black font-extrabold px-7 py-3.5 rounded-2xl text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Illustration Graphic */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-80 h-auto max-h-64 flex items-center justify-center">
                <img
                  src="/Images/NewsLetter01.png"
                  alt="Naik Foods Newsletter"
                  className="max-h-56 w-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/logo.png';
                  }}
                />
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
