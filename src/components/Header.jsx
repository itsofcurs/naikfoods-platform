import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Heart, ShoppingBag, Menu, Search, X, Loader2, Sparkles, Gift } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useSwadCoinsStore } from '../store/swadCoinsStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useLanguageStore } from '../store/languageStore';
import { getProducts } from '../api';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import SwadCoinsModal from './SwadCoinsModal';

export default function Header() {
  const cartCount = useCartStore((state) => state.cartCount());
  const coins = useSwadCoinsStore((state) => state.coins);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { t } = useLanguageStore();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCoinsModal, setShowCoinsModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const searchRef = useRef(null);

  // Fetch entire catalog once for client-side search
  useEffect(() => {
    async function fetchCatalog() {
      try {
        const data = await getProducts('?limit=200');
        if (data.products) {
          setAllProducts(data.products);
        }
      } catch (error) {
        console.error('Failed to load catalog for search', error);
      }
    }
    fetchCatalog();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowMobileSearch(false);
  }, [location.pathname]);

  // Search filtering logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setIsSearching(true);

      const timer = setTimeout(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = allProducts.filter((p) =>
          p.title.toLowerCase().includes(lowerQuery)
        );

        setSearchResults(filtered);
        setShowDropdown(true);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
      setIsSearching(false);
    }
  }, [searchQuery, allProducts]);

  const navLinks = [
    { label: t('home'), href: '/' },
    { label: t('shop'), href: '/in/store' },
    { label: t('buildHamper'), href: '/in/box-builder', badge: t('hamperBadge') },
    { label: t('about'), href: '/in/about' },
    { label: t('blogs'), href: '/in/blog' },
    { label: t('contact'), href: '/in/contact' },
  ];

  return (
    <>
      {/* Top Heritage & Language Announcement Ribbon */}
      <div className="bg-gradient-to-r from-emerald-800 via-[#70BF4F] to-emerald-900 text-white py-1.5 px-3 sm:px-6 text-xs font-bold tracking-wide shadow-xs">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="text-sm">🚩</span>
            <span className="truncate">{t('freeShippingBanner')}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="hidden md:inline text-[11px] text-emerald-100 font-semibold">{t('heritageCallout')}</span>
            <div className="scale-90 origin-right">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 md:h-22 gap-2">
            
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-1.5 -ml-1 text-gray-700 hover:text-[#70BF4F] transition-colors cursor-pointer flex-shrink-0"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center py-1 mr-1">
              <img
                src="/logo.png"
                alt="Naik Foods"
                className="w-[115px] sm:w-[135px] md:w-[155px] lg:w-[170px] h-auto object-contain transition-all duration-300 drop-shadow-xs"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://www.naikfoods.co.in/logo/logo.png';
                }}
              />
            </Link>

            {/* Desktop Navigation Links (Center) */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-2">
              <nav className="flex items-center gap-x-3.5 xl:gap-x-5.5">
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.href ||
                    (link.href !== '/' && location.pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`text-[13px] xl:text-[14.5px] font-bold whitespace-nowrap transition-all duration-200 inline-flex items-center gap-1 relative ${
                        isActive ? 'text-[#70BF4F]' : 'text-[#1B1B1B] hover:text-[#70BF4F]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9.5px] font-black px-1.5 py-0.2 rounded-full shadow-xs whitespace-nowrap">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Search Bar & Actions (Right) */}
            <div className="flex items-center gap-x-1.5 sm:gap-x-2 xl:gap-x-2.5 flex-shrink-0">
              
              {/* Desktop Expandable / Inline Search Bar */}
              <div className="hidden md:block relative w-32 lg:w-44 xl:w-56" ref={searchRef}>
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.length > 1) setShowDropdown(true);
                  }}
                  className="w-full bg-[#F6F8F9] border border-gray-200/80 rounded-full py-1.5 pl-3 pr-8 text-xs sm:text-sm text-[#1B1B1B] placeholder-gray-400 focus:outline-none focus:border-[#70BF4F] focus:bg-white focus:ring-2 focus:ring-[#70BF4F]/20 transition-all"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#70BF4F] transition-colors"
                >
                  {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                </button>

                {/* Search Results Dropdown */}
                {showDropdown && (
                  <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto w-72 sm:w-80">
                    {isSearching ? (
                      <div className="p-4 text-center text-sm text-gray-500">Searching catalog...</div>
                    ) : searchResults.length > 0 ? (
                      <div className="flex flex-col divide-y divide-gray-50">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            to={`/in/product/${product.handle}`}
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 bg-[#F9FBF9] rounded-xl flex-shrink-0 flex items-center justify-center border border-gray-100 p-1">
                              {product.thumbnail ? (
                                <img
                                  src={product.thumbnail}
                                  alt={product.title}
                                  className="max-w-full max-h-full object-contain"
                                />
                              ) : null}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 truncate">{product.title}</p>
                              <p className="text-[11px] text-[#70BF4F] font-extrabold mt-0.5">
                                ₹{product.variants?.[0]?.prices?.[0]?.amount / 100 || 'N/A'}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-5 text-center">
                        <p className="text-gray-500 text-xs">No products found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Search Button Toggle */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                aria-label="Toggle Search"
                className="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F6F8F9] flex items-center justify-center text-[#1B1B1B] hover:bg-[#70BF4F] hover:text-white transition-all cursor-pointer flex-shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              {/* Glowing 3D Naik Swad Coins Pill */}
              <button
                onClick={() => setShowCoinsModal(true)}
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 via-yellow-400/25 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-900 dark:text-amber-300 border border-amber-400/60 dark:border-amber-400/50 px-2.5 py-1 rounded-full text-xs font-black transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:shadow-[0_0_16px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                title="View Naik Swad Coins Rewards Club"
              >
                <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-[10px] text-amber-950 font-black shadow-xs ring-1 ring-amber-200">
                  🪙
                </span>
                <span className="tracking-tight whitespace-nowrap">{coins} {t('coinsLabel')}</span>
              </button>

              {/* Starlit Sky / Sunlight Theme Toggle */}
              <ThemeToggle />

              {/* Account Icon */}
              <Link
                to="/in/account"
                aria-label="Account"
                className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F6F8F9] items-center justify-center text-[#1B1B1B] hover:bg-[#70BF4F] hover:text-white transition-all shadow-xs cursor-pointer flex-shrink-0"
                title="My Account"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Wishlist / Favorites Icon (ALWAYS VISIBLE WITH BADGE) */}
              <Link
                to="/in/wishlist"
                aria-label="Wishlist"
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F6F8F9] flex items-center justify-center text-[#1B1B1B] hover:bg-[#70BF4F] hover:text-white transition-all shadow-xs cursor-pointer flex-shrink-0"
                title="Favorites / Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-[#70BF4F] text-white text-[9px] font-black flex items-center justify-center rounded-full shadow-md border-2 border-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon (ALWAYS VISIBLE WITH BADGE) */}
              <Link
                to="/in/cart"
                aria-label="Shopping Cart"
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F6F8F9] flex items-center justify-center text-[#1B1B1B] hover:bg-[#70BF4F] hover:text-white transition-all shadow-xs cursor-pointer flex-shrink-0"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-[#EB001B] text-white text-[9px] font-black flex items-center justify-center rounded-full shadow-md border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

            </div>
          </div>

          {/* Mobile Search Bar Dropdown */}
          {showMobileSearch && (
            <div className="md:hidden pb-3 pt-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-[#F6F8F9] border border-gray-200 rounded-full py-2 pl-4 pr-10 text-xs text-[#1B1B1B] focus:outline-none focus:border-[#70BF4F] focus:bg-white"
                />
                <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Mobile Navigation Menu Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4 space-y-2">
              <div className="px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl flex items-center justify-between border border-amber-200/60 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🪙</span>
                  <span className="text-xs font-black text-amber-900">{coins} {t('coinsLabel')}</span>
                </div>
                <button
                  onClick={() => setShowCoinsModal(true)}
                  className="text-xs font-extrabold text-amber-700 underline"
                >
                  View Perks
                </button>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-[#1B1B1B] hover:bg-[#F2F7F5] hover:text-[#70BF4F] transition-colors"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              
              <div className="pt-3 border-t border-gray-100 flex items-center justify-around">
                <Link to="/in/account" className="flex items-center gap-1.5 text-xs font-bold text-gray-700 py-1.5">
                  <User className="w-4 h-4" /> Account
                </Link>
                <Link to="/in/wishlist" className="flex items-center gap-1.5 text-xs font-bold text-gray-700 py-1.5">
                  <Heart className="w-4 h-4" /> Wishlist
                </Link>
                <button
                  onClick={() => setShowCoinsModal(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-700 py-1.5"
                >
                  <span>🪙 Rewards</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </header>

      {/* Rewards Modal */}
      <SwadCoinsModal isOpen={showCoinsModal} onClose={() => setShowCoinsModal(false)} />
    </>
  );
}
