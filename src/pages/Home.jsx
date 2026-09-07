import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';
import AddToCartButton from '../components/AddToCartButton';
import RegionalTasteMap from '../components/RegionalTasteMap';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Star,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Heart,
  ArrowRight,
  ArrowUpRight,
  Send,
  Calendar,
  User,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

// 1. HERO SLIDES DATA (Module 24266)
const HERO_SLIDES = [
  {
    id: 1,
    badge: '🌿 NAIK FOODS ORIGINAL',
    title: 'The Heart of Authentic Maharashtra',
    subtitle: 'From hand-pounded masalas to farm-fresh staples, bring the traditional flavors of Vidarbha to your kitchen.',
    buttonText: 'Shop the Collection',
    buttonLink: '/store',
    image: '/banners/home/banner-01.png',
    backgroundColor: '#70BF4F',
    textColor: '#FFFFFF',
    layout: 'image-right',
  },
  {
    id: 2,
    badge: '🌿 NAIK FOODS ORIGINAL',
    title: 'Visit Our Authentic Food Store',
    subtitle: 'Experience the tradition in person. Visit our flagship store in Pune for the freshest batches and local specialties.',
    buttonText: 'Locate Our Shop',
    buttonLink: '/contact',
    image: '/banners/home/banner-02.png',
    backgroundColor: '#E05243',
    textColor: '#FFFFFF',
    layout: 'image-right',
  },
  {
    id: 3,
    badge: '🌿 NAIK FOODS ORIGINAL',
    title: "Aaji's Recipe: Traditional Pickles",
    subtitle: 'Sun-dried, oil-preserved, and made with 100% natural ingredients. No preservatives, just pure nostalgia.',
    buttonText: 'Explore Pickles',
    buttonLink: '/store?category=pickles-and-condiments',
    image: '/banners/home/banner-03.png',
    backgroundColor: '#D99B26',
    textColor: '#FFFFFF',
    layout: 'image-right',
  },
];

// 2. FEATURED CATEGORIES
const FEATURED_CATEGORIES = [
  {
    id: 1,
    title: 'Snacks and Namkeen',
    count: '105 Items',
    image: '/categories/snacks.jpg',
    slug: 'snacks-and-namkeen',
  },
  {
    id: 2,
    title: 'Pickles & Condiments',
    count: '14 Items',
    image: '/categories/pickles.jpg',
    slug: 'pickles-and-condiments',
  },
  {
    id: 3,
    title: 'Sweets & Bakery',
    count: '25 Items',
    image: '/categories/sweets.jpg',
    slug: 'sweets-and-bakery',
  },
  {
    id: 4,
    title: 'Dairy & Beverages',
    count: '15 Items',
    image: '/categories/dairy.jpg',
    slug: 'dairy-and-beverages',
  },
  {
    id: 5,
    title: 'Mukhvas & Digestives',
    count: '6 Items',
    image: '/categories/mukhvas.jpg',
    slug: 'mukhvas-and-digestives',
  },
  {
    id: 6,
    title: 'Spices & Masalas',
    count: '31 Items',
    image: '/categories/spices.jpg',
    slug: 'spices-and-masalas',
  },
  {
    id: 7,
    title: 'Dry / Instant Grocery',
    count: '27 Items',
    image: '/categories/drygrocery.jpg',
    slug: 'dry-instant-grocery',
  },
];

// 3. REELS DATA
const INSTA_REELS = [
  {
    id: 1,
    videoEmbed: "https://player.vimeo.com/video/1213240346",
    instagramUrl: "https://www.instagram.com/reel/DNsq4jgWHh4/",
    title: "Authentic Ambadi Leaves Pickle",
  },
  {
    id: 2,
    videoEmbed: "https://player.vimeo.com/video/1213240348",
    instagramUrl: "https://www.instagram.com/reel/DPBOH3CjAst/",
    title: "Fresh Chakali Preparation",
  },
  {
    id: 3,
    videoEmbed: "https://player.vimeo.com/video/1213240347",
    instagramUrl: "https://www.instagram.com/reel/DPWMDasDDM0/",
    title: "Traditional Pickles Collection",
  },
  {
    id: 4,
    videoEmbed: "https://player.vimeo.com/video/1213240349",
    instagramUrl: "https://www.instagram.com/reel/DXPLYmnDFVR/",
    title: "Pure Snacks Range",
  },
];

// 4. TESTIMONIALS / REVIEWS (Module 42040)
const TESTIMONIALS = [
  {
    id: 1,
    name: "Riya Sharma",
    username: "@riya_sharma",
    avatarUrl: "/avatars/women.jpg",
    platform: "insta",
    review: "Naik Food has become my go-to choice for fresh and delicious meals. The taste feels truly homemade and the packaging is always perfect!",
  },
  {
    id: 2,
    name: "Aman Verma",
    username: "@aman_verma",
    avatarUrl: "/avatars/men3.jpg",
    platform: "google",
    review: "Naik Food never disappoints. Great quality, consistent taste, and fast delivery every time. My family absolutely loves it!",
  },
  {
    id: 3,
    name: "Neha Gupta",
    username: "@neha_gupta",
    avatarUrl: "/avatars/women 2.jpg",
    platform: "insta",
    review: "From snacks to full meals, Naik Food delivers amazing flavor and freshness. One of the best food brands I've tried!",
  },
  {
    id: 4,
    name: "Rahul Mehta",
    username: "@rahul_mehta",
    avatarUrl: "/avatars/men1.jpg",
    platform: "google",
    review: "Naik Food makes ordering food simple and reliable. Everything tastes authentic, fresh, and perfectly cooked. Highly recommended!",
  },
  {
    id: 5,
    name: "Pooja Rawat",
    username: "@pooja_rawat",
    avatarUrl: "/avatars/women3.jpg",
    platform: "insta",
    review: "Naik Food offers premium taste at an affordable price. The quality is excellent and every order feels freshly prepared.",
  },
  {
    id: 6,
    name: "Karan Patel",
    username: "@karan_patel",
    avatarUrl: "/avatars/men2.jpg",
    platform: "google",
    review: "Naik Food is a complete game-changer for me. Amazing taste, hygienic packaging, and super smooth delivery experience!",
  },
];

// 5. REGULAR ARTICLES / BLOGS
const LATEST_BLOGS = [
  {
    id: 1,
    slug: 'secrets-of-crispy-methi-chakali',
    title: 'The Secret Behind Crisp & Fragrant Methi Chakali',
    chipcontent: 'Snacks & Namkeen',
    author: 'Mrs. Priya Naik',
    date: '2026-09-02',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1779968324/medusa/1779968322289-IMG_3854.JPG.jpeg.jpg',
  },
  {
    id: 2,
    slug: 'traditional-ambadi-bhaji-lonche-heritage',
    title: 'Ambadi Lonche: A Forgotten Gem of Marathwada & Vidarbha',
    chipcontent: 'Pickles & Condiments',
    author: 'Late Sarita Naik Legacy',
    date: '2026-08-24',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1780121990/medusa/1780121988900-pomelli_photoshoot_image_1_1_0529%20%287%29.png.jpg',
  },
  {
    id: 3,
    slug: 'why-jowar-is-the-superfood-you-need',
    title: 'Why Jowar (Sorghum) Is the Ultimate Modern Superfood',
    chipcontent: 'Health & Wellness',
    author: 'Naik Foods Culinary Team',
    date: '2026-08-15',
    image: 'https://res.cloudinary.com/dskzfipt3/image/upload/v1781146398/medusa/1781146396686-pomelli_photoshoot_image_1_1_0526%20%282%29%20%282%29.png.jpg',
  },
];

function ReelEmbed({ videoEmbed }) {
  const containerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {isIntersecting && (
        <iframe
          src={`${videoEmbed}?autoplay=1&muted=1&loop=1&background=1&autopause=0&title=0&byline=0&portrait=0&badge=0&controls=0`}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Instagram reel video player"
          allowFullScreen
          className="w-full h-full object-cover border-0"
        />
      )}
    </div>
  );
}

function ReelCard({ reel }) {
  return (
    <a
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl overflow-hidden bg-black cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 w-full aspect-[9/16] hover:scale-[1.02]"
    >
      <ReelEmbed videoEmbed={reel.videoEmbed} />

      {/* Hover Overlay with Instagram Icon */}
      <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <svg className="w-14 h-14 fill-white drop-shadow-lg" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </div>
    </a>
  );
}

const REGIONS = ['All Products', 'Nashik', 'Vidarbha', 'Konkan', 'Pune'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All Products');
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  const categoryScrollRef = useRef(null);
  const bestSellersScrollRef = useRef(null);

  // 1. Hero Banner Autoplay Timer (every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // 2. Testimonials Autoplay Timer (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        const data = await getProducts('?limit=50');
        setProducts(data.products || []);
      } catch (err) {
        console.error('Home data load error', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const handleCategoryScroll = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleBestSellersScroll = (direction) => {
    if (bestSellersScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      bestSellersScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Welcome to the family! Check your inbox soon.');
    setNewsletterEmail('');
  };

  // Filter products by region
  const regionProducts = products.filter((p) => {
    if (selectedRegion === 'All Products') return true;
    const title = p.title.toLowerCase();
    const handle = p.handle?.toLowerCase() || '';
    if (selectedRegion === 'Nashik') {
      return title.includes('makka') || title.includes('kondaji') || title.includes('chivda') || handle.includes('chivda');
    }
    if (selectedRegion === 'Vidarbha') {
      return title.includes('jwari') || title.includes('bhel') || title.includes('lonche');
    }
    if (selectedRegion === 'Konkan') {
      return title.includes('banana') || title.includes('mango') || title.includes('wafers');
    }
    return title.includes('chakali') || title.includes('bhakarwadi') || title.includes('thepla');
  });

  const activeSlide = HERO_SLIDES[currentHeroSlide];

  return (
    <div className="w-full bg-[#FAFAF8] text-[#161915] font-sans selection:bg-[#70BF4F]/20 selection:text-[#161915]">
      
      {/* 1. HERO SLIDER CAROUSEL (Module 24266 - Animated Changing Cards with Timer) */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center transition-colors duration-700">
          
          {/* Active Hero Slide Content */}
          <div
            className="w-full h-full p-6 sm:p-10 lg:p-14 relative flex items-center transition-all duration-700"
            style={{ backgroundColor: activeSlide.backgroundColor }}
          >
            {/* Background Texture Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 bg-cover bg-center z-0"
              style={{ backgroundImage: 'url("/banners/banner.png")' }}
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
              
              {/* Left Column: Text & CTA Button */}
              <div className="md:col-span-7 text-center md:text-left space-y-4">
                <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white font-extrabold uppercase tracking-[0.2em] text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                  {activeSlide.badge}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight font-manrope">
                  {activeSlide.title}
                </h1>

                <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                  {activeSlide.subtitle}
                </p>

                <div className="pt-3">
                  <Link
                    to={activeSlide.buttonLink}
                    className="hero-cta-btn inline-flex items-center gap-2 bg-white text-[#161915] hover:bg-[#F2F7F5] px-7 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
                  >
                    <span>{activeSlide.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Floating Product Banner Image */}
              <div className="md:col-span-5 flex justify-center items-center">
                <div className="relative w-64 sm:w-80 lg:w-96 aspect-square flex items-center justify-center">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/Images/spices01.png';
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Left / Right Carousel Navigation Arrows */}
          <button
            onClick={prevHeroSlide}
            aria-label="Previous banner slide"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextHeroSlide}
            aria-label="Next banner slide"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Pagination Bullets / Pills */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentHeroSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentHeroSlide === idx
                  ? 'w-8 bg-[#70BF4F]'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. TRUST BADGES BAR */}
      <section className="bg-white py-6 border-y border-gray-100 shadow-sm mb-8">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-3 p-2">
              <Truck className="w-6 h-6 text-[#70BF4F] flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-sm font-bold text-gray-900">Free Delivery</h4>
                <p className="text-xs text-gray-500">On orders above ₹499</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-2">
              <ShieldCheck className="w-6 h-6 text-[#70BF4F] flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-sm font-bold text-gray-900">100% Authentic</h4>
                <p className="text-xs text-gray-500">Traditional recipes</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-2">
              <CheckCircle2 className="w-6 h-6 text-[#70BF4F] flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-sm font-bold text-gray-900">No Preservatives</h4>
                <p className="text-xs text-gray-500">Pure &amp; natural</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-2">
              <HeartHandshake className="w-6 h-6 text-[#70BF4F] flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-sm font-bold text-gray-900">FSSAI Licensed</h4>
                <p className="text-xs text-gray-500">Certified hygiene</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SLIDER (Module 67044) */}
      <section className="py-10 sm:py-14 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#161915] mb-1 font-manrope">
              Featured Categories
            </h2>
            <p className="text-gray-500 text-sm">
              Authentic regional specialties curated for you.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCategoryScroll('left')}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-[#F2F7F5] flex items-center justify-center text-[#70BF4F] transition-colors shadow-sm cursor-pointer"
              title="Previous categories"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleCategoryScroll('right')}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-[#F2F7F5] flex items-center justify-center text-[#70BF4F] transition-colors shadow-sm cursor-pointer"
              title="Next categories"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={categoryScrollRef}
          className="flex overflow-x-auto gap-5 pb-4 hide-scrollbar scroll-smooth"
        >
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/store?category=${cat.slug}`}
              className="flex-shrink-0 w-60 sm:w-68 bg-white rounded-2xl overflow-hidden border border-[#F0F2EF] shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group block text-center"
            >
              <div className="aspect-[4/3] bg-orange-50/50 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-extrabold text-[#161915] text-sm sm:text-base group-hover:text-[#70BF4F] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">{cat.count}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#F2F7F5] text-[#70BF4F] flex items-center justify-center group-hover:bg-[#70BF4F] group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. PROMO BANNERS GRID (Module 74581 - 3 Split Promo Cards) */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Large Left Offer Banner (6 cols) */}
          <Link
            to="/store"
            className="md:col-span-6 relative flex flex-col sm:flex-row items-center bg-[#F2F7F5] rounded-[28px] p-6 sm:p-8 border border-[#E9F0E8] overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Background Texture */}
            <div
              className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-60 z-0"
              style={{ backgroundImage: "url('/backgrounds/bg04.png')" }}
            />

            {/* Circular Offer Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-16 h-16 rounded-full bg-[#136091] text-white flex flex-col items-center justify-center z-10 shadow-[0_8px_16px_rgba(19,96,145,0.2)]">
              <span className="text-[10px] font-black uppercase tracking-wider">OFFER</span>
              <span className="text-lg font-black leading-none">10%</span>
            </div>

            {/* Left Product Image */}
            <div className="w-full sm:w-1/2 aspect-square flex items-center justify-center z-10 relative">
              <img
                src="/Images/spices01.png"
                alt="Naik Foods Products"
                className="max-h-56 w-auto object-contain group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/banners/home/banner-01.png';
                }}
              />
            </div>

            {/* Right Text Details */}
            <div className="w-full sm:w-1/2 z-10 text-center sm:text-left space-y-2 mt-4 sm:mt-0">
              <span className="inline-block bg-[#70BF4F] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                Pure &amp; Natural
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#161915] leading-tight">
                Traditional Snacks &amp; Pickles
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm font-semibold">
                From Our Kitchen to Yours
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 bg-[#70BF4F] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow hover:bg-[#5ea63f] transition-colors">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Right 2 Stacked Cards (6 cols) */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 2: Homemade Pickles */}
            <Link
              to="/store?category=pickles-and-condiments"
              className="relative flex flex-col justify-between bg-[#FFF9E6] rounded-[28px] p-6 border border-amber-100/60 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[220px]"
            >
              <div
                className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-50 z-0"
                style={{ backgroundImage: "url('/backgrounds/bg03.png')" }}
              />
              <div className="relative z-10 space-y-1">
                <h4 className="text-lg font-black text-[#161915]">Homemade Pickles</h4>
                <p className="text-xs text-gray-500 font-bold">Authentic Maharashtrian Taste</p>
                <div className="pt-1">
                  <span className="text-[#D9A400] text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
                    EXPLORE <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
              <div className="relative z-10 w-full h-28 flex items-center justify-center mt-2">
                <img
                  src="/products/pickles/pickle01.png"
                  alt="Pickles"
                  className="max-h-28 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/banners/home/banner-03.png';
                  }}
                />
              </div>
            </Link>

            {/* Card 3: Fast & Flavorful */}
            <Link
              to="/store?category=dry-instant-grocery"
              className="relative flex flex-col justify-between bg-[#FFEFED] rounded-[28px] p-6 border border-red-100/60 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[220px]"
            >
              <div
                className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-40 z-0"
                style={{ backgroundImage: "url('/backgrounds/bg03.png')" }}
              />
              <div className="relative z-10 space-y-1">
                <h4 className="text-lg font-black text-[#161915]">Fast &amp; Flavorful</h4>
                <p className="text-xs text-gray-500 font-bold">Delicious Meals, Anytime</p>
                <div className="pt-1">
                  <span className="text-[#E05243] text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
                    BROWSE <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
              <div className="relative z-10 w-full h-28 flex items-center justify-center mt-2">
                <img
                  src="/Images/instant-food.png"
                  alt="Instant Food"
                  className="max-h-28 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/categories/drygrocery.jpg';
                  }}
                />
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* 5. BEST SELLERS / REGION PRODUCTS SLIDER */}
      <section className="py-10 sm:py-16 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#161915] mb-1 font-manrope">
              Best Sellers Collection
            </h2>
            <p className="text-gray-500 text-sm">
              Explore Maharashtra's most loved authentic delicacies.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBestSellersScroll('left')}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-[#F2F7F5] flex items-center justify-center text-[#70BF4F] transition-colors shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleBestSellersScroll('right')}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-[#F2F7F5] flex items-center justify-center text-[#70BF4F] transition-colors shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Region Filter Pills */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 hide-scrollbar">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedRegion === region
                  ? 'bg-[#70BF4F] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Product Cards Grid / Horizontal Scroll */}
        <div
          ref={bestSellersScrollRef}
          className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar scroll-smooth"
        >
          {(regionProducts.length > 0 ? regionProducts : products).map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-2xl border border-[#F0F2EF] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <Link
                to={`/in/product/${product.handle}`}
                className="block relative aspect-square bg-[#F9FBF9] p-4 overflow-hidden"
              >
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    No Image
                  </div>
                )}
              </Link>

              <div className="p-4 flex flex-col flex-grow">
                <Link
                  to={`/in/product/${product.handle}`}
                  className="text-gray-900 font-extrabold text-sm hover:text-[#70BF4F] line-clamp-1 mb-1 transition-colors"
                >
                  {product.title}
                </Link>
                <p className="text-xs text-gray-400 mb-3 line-clamp-1">
                  Authentic Maharashtrian Speciality
                </p>

                <div className="flex items-center justify-between mt-auto mb-3">
                  <span className="font-black text-gray-900 text-base">
                    ₹{product.variants?.[0]?.prices?.[0]?.amount / 100 || '70'}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">In Stock</span>
                </div>

                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SALE PROMO BANNER (Module 11696) */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="relative rounded-[32px] overflow-hidden bg-[#70BF4F] p-8 sm:p-12 shadow-[0_20px_40px_rgba(112,191,79,0.15)] text-white">
          <div
            className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-20 z-0"
            style={{ backgroundImage: "url('/banners/Hero-Banner.png')" }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white font-extrabold uppercase tracking-widest text-xs px-3.5 py-1 rounded-full">
                Authentic Maharashtra Flavors
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight font-manrope">
                Traditional Snacks &amp; Pickles Sale
              </h2>
              <p className="text-white/90 text-sm sm:text-base max-w-lg font-medium">
                Crunchy namkeen, tangy pickles, and traditional sweets. Authentic taste made in our own kitchen.
              </p>
              <div className="pt-2">
                <Link
                  to="/store"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF8C00] to-[#FF6B35] text-white px-7 py-3 rounded-2xl font-black text-sm shadow-[0_8px_20px_rgba(255,107,53,0.4)] hover:scale-105 transition-all"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <img
                src="/Images/sale01.png"
                alt="Traditional Snacks & Pickles Sale"
                className="max-h-56 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/banners/home/banner-02.png';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM REELS VIDEO PLAYER (Module 23929) */}
      <section className="py-12 sm:py-16 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[#70BF4F] font-extrabold text-xs uppercase tracking-[0.2em] block mb-1">
            EXPERIENCE NAIK FOODS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#161915] font-manrope">
            Behind the Scenes
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Watch our traditional recipes in the making.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTA_REELS.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      </section>

      {/* TASTE OF MAHARASHTRA REGIONAL CULINARY MAP */}
      <RegionalTasteMap />

      {/* 8. CUSTOMER TESTIMONIALS AUTOPLAY CAROUSEL (Module 42040 - Cards Changing with Timer) */}
      <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[#70BF4F] font-extrabold text-xs uppercase tracking-[0.2em] block mb-1">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#161915] font-manrope">
                What Our Customers Say
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Real feedback from genuine Maharashtrian food lovers.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-[#F2F7F5] flex items-center justify-center text-[#70BF4F] transition-colors shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next review"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-[#F2F7F5] flex items-center justify-center text-[#70BF4F] transition-colors shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Cards Grid (Auto transitions) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const item = TESTIMONIALS[(testimonialIndex + offset) % TESTIMONIALS.length];
              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#E9F0E8] rounded-[24px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(112,191,79,0.1)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* User Header */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="relative">
                        <img
                          src={item.avatarUrl}
                          alt={item.name}
                          className="w-13 h-13 rounded-full object-cover border-2 border-[#70BF4F] p-0.5 bg-white"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/avatars/women.jpg';
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center p-0.5">
                          <img
                            src={item.platform === 'insta' ? '/logo/insta.png' : '/logo/google.png'}
                            alt="Social Platform"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-extrabold text-[#161915] leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400 font-semibold">{item.username}</p>
                      </div>
                    </div>

                    {/* 5 Stars */}
                    <div className="flex items-center gap-1 text-[#FFB400] mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      "{item.review}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Testimonial Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  testimonialIndex === idx ? 'w-6 bg-[#70BF4F]' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 9. REGULAR ARTICLES / LATEST BLOGS CAROUSEL (Module 22198) */}
      <section className="py-12 sm:py-16 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#161915] font-manrope">
              Regular Articles
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Stories and recipes from our authentic Maharashtrian kitchen.
            </p>
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-[#70BF4F] font-bold text-sm hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {LATEST_BLOGS.map((blog) => (
            <Link
              key={blog.id}
              to={`/in/blog/${blog.slug}`}
              className="bg-white rounded-[24px] border border-[#F0F2EF] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(112,191,79,0.12)] hover:border-[#70BF4F] transition-all duration-300 flex flex-col group"
            >
              <div className="h-52 w-full overflow-hidden bg-gray-50 relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <span className="self-start bg-[#F2F7F5] text-[#4A7c2c] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3">
                  {blog.chipcontent}
                </span>

                <h3 className="text-lg font-bold text-[#161915] line-clamp-2 mb-4 group-hover:text-[#70BF4F] transition-colors">
                  {blog.title}
                </h3>

                <div className="pt-3 border-t border-gray-100 mt-auto flex items-center justify-between text-xs text-gray-400 font-semibold">
                  <span className="flex items-center gap-1 text-[#70BF4F]">
                    <User className="w-3.5 h-3.5" />
                    {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(blog.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#70BF4F] hover:bg-[#5aad2f] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-[0_10px_20px_rgba(112,191,79,0.2)] hover:scale-105 transition-all"
          >
            <span>Explore the Journal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 10. COMMUNITY NEWSLETTER BANNER (Module 69030) */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-[32px] overflow-hidden bg-[#70BF4F] px-6 sm:px-12 py-10 sm:py-14 shadow-[0_20px_40px_rgba(112,191,79,0.2)] text-white">
          <div
            className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-15 z-0"
            style={{ backgroundImage: "url('/backgrounds/bg01.png')" }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-manrope">
                Join the Naik Foods <br className="hidden sm:inline" />
                Community
              </h2>
              <p className="text-white/90 text-base sm:text-lg max-w-lg font-medium">
                Get authentic recipes and exclusive offers delivered to your inbox.
              </p>

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
                  className="bg-[#161915] text-white hover:bg-black font-extrabold px-7 py-3.5 rounded-2xl text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

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
        </div>
      </section>

    </div>
  );
}
