import { useEffect, useState, useRef, useMemo } from 'react';
import { getProducts, getCollections } from '../api';
import { Link, useSearchParams } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Heart,
  Loader2,
  SlidersHorizontal,
  X,
} from 'lucide-react';

const CATEGORIES_DATA = [
  {
    id: 'all',
    title: 'All Categories',
    slug: 'all',
    isAll: true,
  },
  {
    id: 'snacks-and-namkeen',
    title: 'Snacks and Namkeen',
    slug: 'snacks-and-namkeen',
    image: '/categories/snacks.jpg',
  },
  {
    id: 'pickles-and-condiments',
    title: 'Pickles & Condiments',
    slug: 'pickles-and-condiments',
    image: '/categories/pickles.jpg',
  },
  {
    id: 'sweets-and-bakery',
    title: 'Sweets & Bakery',
    slug: 'sweets-and-bakery',
    image: '/categories/sweets.jpg',
  },
  {
    id: 'dairy-and-beverages',
    title: 'Dairy & Beverages',
    slug: 'dairy-and-beverages',
    image: '/categories/dairy.jpg',
  },
  {
    id: 'mukhvas-and-digestives',
    title: 'Mukhvas & Digestives',
    slug: 'mukhvas-and-digestives',
    image: '/categories/mukhvas.jpg',
  },
  {
    id: 'spices-and-masalas',
    title: 'Spices & Masalas',
    slug: 'spices-and-masalas',
    image: '/categories/spices.jpg',
  },
  {
    id: 'dry-instant-grocery',
    title: 'Dry / Instant Grocery',
    slug: 'dry-instant-grocery',
    image: '/categories/drygrocery.jpg',
  },
];

const REGION_OPTIONS = ['Pune', 'Vidarbha', 'Konkan', 'Nashik'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);

  // Accordion open/close states
  const [isRegionOpen, setIsRegionOpen] = useState(true);
  const [isVendorOpen, setIsVendorOpen] = useState(false);

  // Category horizontal scroll ref
  const categoryScrollRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const prodData = await getProducts('?limit=200');
        setProducts(prodData.products || []);
      } catch (err) {
        console.error('Failed to load shop data', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  const handleCategoryClick = (slug) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  const handleScrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Helper to extract region for a product
  const getProductRegion = (p) => {
    const metaRegion = p.metadata?.region;
    if (metaRegion) {
      return String(metaRegion).replace(/["\\]/g, '').trim();
    }
    const t = p.title?.toLowerCase() || '';
    const h = p.handle?.toLowerCase() || '';
    if (t.includes('makka') || t.includes('kondaji') || h.includes('chivda')) return 'Nashik';
    if (t.includes('jwari') || t.includes('ambadi') || t.includes('lonche')) return 'Vidarbha';
    if (t.includes('banana') || t.includes('mango') || t.includes('wafers')) return 'Konkan';
    return 'Pune';
  };

  // Helper to extract vendor for a product
  const getProductVendor = (p) => {
    if (p.tags && Array.isArray(p.tags)) {
      for (const t of p.tags) {
        const val = t.value || '';
        if (val.startsWith('Vendor-')) {
          return val.replace('Vendor-', '').replace(/-/g, ' ').trim();
        }
      }
    }
    return 'Naik Foods';
  };

  // Compute dynamic lists & counts
  const { regionCounts, allVendors, vendorCounts } = useMemo(() => {
    const rCounts = { Pune: 0, Vidarbha: 0, Konkan: 0, Nashik: 0 };
    const vCounts = {};
    const vSet = new Set();

    products.forEach((p) => {
      const r = getProductRegion(p);
      if (rCounts[r] !== undefined) {
        rCounts[r] += 1;
      } else {
        rCounts[r] = (rCounts[r] || 0) + 1;
      }

      const v = getProductVendor(p);
      if (v) {
        vSet.add(v);
        vCounts[v] = (vCounts[v] || 0) + 1;
      }
    });

    return {
      regionCounts: rCounts,
      allVendors: Array.from(vSet).sort(),
      vendorCounts: vCounts,
    };
  }, [products]);

  // Handle Region Checkbox
  const toggleRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  // Handle Vendor Checkbox
  const toggleVendor = (vendor) => {
    setSelectedVendors((prev) =>
      prev.includes(vendor) ? prev.filter((v) => v !== vendor) : [...prev, vendor]
    );
  };

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const titleMatch = p.title?.toLowerCase().includes(q);
        const descMatch = p.description?.toLowerCase().includes(q);
        const tagMatch = p.tags?.some((t) => t.value?.toLowerCase().includes(q));
        if (!titleMatch && !descMatch && !tagMatch) return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'all') {
        const catSlug = selectedCategory.toLowerCase();
        const colMatch = p.collection?.handle?.toLowerCase() === catSlug;
        const tagMatch = p.tags?.some((t) => t.value?.toLowerCase().includes(catSlug));
        const titleMatch = p.title?.toLowerCase().replace(/[^a-z0-9]/g, '').includes(catSlug.replace(/[^a-z0-9]/g, ''));
        if (!colMatch && !tagMatch && !titleMatch) {
          // fallback category keyword mapping
          if (catSlug.includes('snack') && (p.title?.toLowerCase().includes('chivda') || p.title?.toLowerCase().includes('chakali') || p.title?.toLowerCase().includes('bhel') || p.title?.toLowerCase().includes('khakhra') || p.title?.toLowerCase().includes('wafers') || p.title?.toLowerCase().includes('namkeen'))) {
            // matches snacks
          } else if (catSlug.includes('pickle') && (p.title?.toLowerCase().includes('pickle') || p.title?.toLowerCase().includes('lonche') || p.title?.toLowerCase().includes('chutney') || p.title?.toLowerCase().includes('thecha'))) {
            // matches pickles
          } else if (catSlug.includes('sweet') && (p.title?.toLowerCase().includes('laddoo') || p.title?.toLowerCase().includes('barfi') || p.title?.toLowerCase().includes('pedha') || p.title?.toLowerCase().includes('gulab') || p.title?.toLowerCase().includes('modak') || p.title?.toLowerCase().includes('bakery') || p.title?.toLowerCase().includes('cookies') || p.title?.toLowerCase().includes('toast'))) {
            // matches sweets
          } else if (catSlug.includes('dairy') && (p.title?.toLowerCase().includes('ghee') || p.title?.toLowerCase().includes('beverage') || p.title?.toLowerCase().includes('syrup') || p.title?.toLowerCase().includes('sherbet') || p.title?.toLowerCase().includes('tea') || p.title?.toLowerCase().includes('coffee'))) {
            // matches dairy
          } else if (catSlug.includes('mukhvas') && (p.title?.toLowerCase().includes('mukhwas') || p.title?.toLowerCase().includes('mukhvas') || p.title?.toLowerCase().includes('supari') || p.title?.toLowerCase().includes('digestive') || p.title?.toLowerCase().includes('paan'))) {
            // matches mukhvas
          } else if (catSlug.includes('spice') && (p.title?.toLowerCase().includes('masala') || p.title?.toLowerCase().includes('spice') || p.title?.toLowerCase().includes('powder') || p.title?.toLowerCase().includes('mirchi'))) {
            // matches spices
          } else if (catSlug.includes('grocery') && (p.title?.toLowerCase().includes('flour') || p.title?.toLowerCase().includes('atta') || p.title?.toLowerCase().includes('dal') || p.title?.toLowerCase().includes('noodle') || p.title?.toLowerCase().includes('pasta') || p.title?.toLowerCase().includes('poha'))) {
            // matches grocery
          } else {
            return false;
          }
        }
      }

      // 3. Region filter
      if (selectedRegions.length > 0) {
        const prodRegion = getProductRegion(p);
        if (!selectedRegions.includes(prodRegion)) return false;
      }

      // 4. Vendor filter
      if (selectedVendors.length > 0) {
        const prodVendor = getProductVendor(p);
        if (!selectedVendors.includes(prodVendor)) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedRegions, selectedVendors]);

  // Sort products logic
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const priceA = a.variants?.[0]?.prices?.[0]?.amount || 0;
      const priceB = b.variants?.[0]?.prices?.[0]?.amount || 0;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'title-asc') return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'title-desc') return (b.title || '').localeCompare(a.title || '');
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
  }, [filteredProducts, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedRegions([]);
    setSelectedVendors([]);
    setSortBy('newest');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedRegions.length > 0 ||
    selectedVendors.length > 0;

  return (
    <div className="w-full bg-[#FAFAF8] min-h-screen">
      {/* 1. Header Banner ("Our Store" with Green Watermark Background) */}
      <section
        className="w-full bg-[#70BF4F] text-white py-12 md:py-16 text-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/banners/Hero-Banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#70BF4F',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight drop-shadow-sm font-serif text-white">
            Our Store
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/90">
            <Link to="/" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 opacity-70" />
            <span className="font-semibold text-white">Store</span>
          </nav>
        </div>
      </section>

      {/* 2. Horizontal Category Carousel Slider */}
      <div className="container mx-auto px-4 lg:px-8 mt-6 md:mt-8">
        <div className="relative flex items-center">
          {/* Scroll Left Button */}
          <button
            onClick={() => handleScrollCategories('left')}
            className="absolute left-0 z-10 w-9 h-9 -ml-3 md:-ml-4 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
            title="Previous categories"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Categories List Container */}
          <div
            ref={categoryScrollRef}
            className="flex items-center gap-3 overflow-x-auto py-2 px-1 scroll-smooth hide-scrollbar w-full"
          >
            {CATEGORIES_DATA.map((cat) => {
              const isSelected = selectedCategory === cat.slug;

              if (cat.isAll) {
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick('all')}
                    className={`flex-shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                      isSelected
                        ? 'bg-[#70BF4F] text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg
                        className={`w-5 h-5 ${isSelected ? 'fill-white' : 'fill-gray-600'}`}
                        viewBox="0 0 24 24"
                      >
                        <path d="m12 2-5.5 9h11z" />
                        <circle cx="17.5" cy="17.5" r="4.5" />
                        <path d="M3 13.5h8v8H3z" />
                      </svg>
                    </div>
                    <span>{cat.title}</span>
                  </button>
                );
              }

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all shadow-sm ${
                    isSelected
                      ? 'bg-white border-2 border-[#70BF4F] text-gray-900 shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-xs md:text-sm whitespace-nowrap">
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => handleScrollCategories('right')}
            className="absolute right-0 z-10 w-9 h-9 -mr-3 md:-mr-4 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
            title="Next categories"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Main Content: Sidebar Filters & Product Results */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-4">
            
            {/* Search Box */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200/80 shadow-sm flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 ml-1 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort by Box */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm">
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                Sort by
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#70BF4F] focus:ring-1 focus:ring-[#70BF4F] appearance-none cursor-pointer"
                >
                  <option value="newest">Newest first</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="title-asc">Alphabetical: A-Z</option>
                  <option value="title-desc">Alphabetical: Z-A</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Region Filter Box */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm">
              <button
                onClick={() => setIsRegionOpen(!isRegionOpen)}
                className="w-full flex items-center justify-between text-left font-bold text-sm md:text-base text-gray-900 focus:outline-none"
              >
                <span>Region</span>
                {isRegionOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {isRegionOpen && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2.5">
                  {REGION_OPTIONS.map((region) => {
                    const isChecked = selectedRegions.includes(region);
                    const count = regionCounts[region] || 0;
                    return (
                      <label
                        key={region}
                        className="flex items-center justify-between text-sm text-gray-700 hover:text-gray-900 cursor-pointer select-none py-0.5"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRegion(region)}
                            className="w-4 h-4 rounded border-gray-300 text-[#70BF4F] focus:ring-[#70BF4F] cursor-pointer accent-[#70BF4F]"
                          />
                          <span className={isChecked ? 'font-semibold text-gray-900' : ''}>
                            {region}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{count}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Vendor / Vender Filter Box */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm">
              <button
                onClick={() => setIsVendorOpen(!isVendorOpen)}
                className="w-full flex items-center justify-between text-left font-bold text-sm md:text-base text-gray-900 focus:outline-none"
              >
                <span>Vender</span>
                {isVendorOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {isVendorOpen && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {allVendors.length === 0 ? (
                    <p className="text-xs text-gray-400">No vendors found</p>
                  ) : (
                    allVendors.map((vendor) => {
                      const isChecked = selectedVendors.includes(vendor);
                      const count = vendorCounts[vendor] || 0;
                      return (
                        <label
                          key={vendor}
                          className="flex items-center justify-between text-sm text-gray-700 hover:text-gray-900 cursor-pointer select-none py-0.5"
                        >
                          <div className="flex items-center gap-3 truncate pr-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleVendor(vendor)}
                              className="w-4 h-4 rounded border-gray-300 text-[#70BF4F] focus:ring-[#70BF4F] cursor-pointer accent-[#70BF4F]"
                            />
                            <span className={`truncate ${isChecked ? 'font-semibold text-gray-900' : ''}`}>
                              {vendor}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 font-medium flex-shrink-0">{count}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Clear All Filters
              </button>
            )}
          </aside>

          {/* Right Product Grid Area */}
          <main className="flex-1 w-full min-w-0">
            
            {/* Showing Count Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 font-medium">
                Showing <strong className="text-gray-900 font-bold">{sortedProducts.length}</strong> of{' '}
                <strong className="text-gray-900 font-bold">{products.length}</strong> Authentic Products
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <Loader2 className="w-9 h-9 text-[#70BF4F] animate-spin mx-auto mb-3" />
                <p className="text-gray-600 font-medium text-sm">Loading authentic Maharashtrian foods...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16 text-red-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
                Failed to load products. Please check network.
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <p className="text-gray-700 font-bold text-base mb-2">No matching products found.</p>
                <p className="text-gray-400 text-xs mb-4">Try clearing filters or changing your search terms.</p>
                <button
                  onClick={resetAllFilters}
                  className="bg-[#70BF4F] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#5ca040] transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Product Grid (Matches exact Naik Foods product card design) */
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {sortedProducts.map((product) => {
                  const regionName = getProductRegion(product);
                  const price = product.variants?.[0]?.prices?.[0]?.amount
                    ? Math.round(product.variants[0].prices[0].amount / 100)
                    : null;
                  const weight =
                    product.metadata?.weight
                      ? String(product.metadata.weight).replace(/["\\]/g, '')
                      : '500g';

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full relative"
                    >
                      {/* Wishlist Heart Icon */}
                      <button
                        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                        title="Add to Wishlist"
                      >
                        <Heart className="w-4 h-4" />
                      </button>

                      {/* Product Thumbnail */}
                      <Link
                        to={`/in/product/${product.handle}`}
                        className="block relative aspect-square bg-gray-50/70 p-4 overflow-hidden"
                      >
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                            No Image
                          </div>
                        )}
                      </Link>

                      {/* Product Details */}
                      <div className="p-4 flex flex-col flex-grow">
                        <Link
                          to={`/in/product/${product.handle}`}
                          className="text-gray-900 font-bold text-sm hover:text-[#70BF4F] line-clamp-1 mb-1 transition-colors"
                          title={product.title}
                        >
                          {product.title}
                        </Link>

                        <p className="text-xs text-gray-400 mb-3 line-clamp-1">
                          Authentic {regionName} Speciality
                        </p>

                        <div className="flex items-center justify-between mt-auto mb-3">
                          <span className="font-bold text-gray-900 text-base">
                            {price ? `₹${price}` : '₹--'}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">{weight}</span>
                        </div>

                        <AddToCartButton product={product} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
