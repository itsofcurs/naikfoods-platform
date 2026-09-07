import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleMoveToCart = (product) => {
    const defaultVariant = product.variants?.[0] || {
      id: `var_${product.id}`,
      title: 'Standard Pack',
      prices: [{ amount: 18000 }],
    };
    addToCart(product, defaultVariant, 1);
  };

  return (
    <div className="bg-[#FAFBF9] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              <Heart className="w-3.5 h-3.5 fill-current" /> आवडते पदार्थ • Your Favorites
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
              My Wishlist <span className="text-gray-400 text-2xl font-normal">({items.length})</span>
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center max-w-md mx-auto py-16 bg-white rounded-3xl border border-gray-200/80 shadow-xs p-8">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Explore authentic stone-ground masalas, crunchy chaklis, and traditional Maharashtrian sweets to save your favorites here.
            </p>
            <Link
              to="/in/store"
              className="bg-[#70BF4F] hover:bg-[#5ca040] text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all inline-flex items-center gap-2 shadow-md"
            >
              Explore Shop <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => {
              const price = product.variants?.[0]?.prices?.[0]?.amount
                ? product.variants[0].prices[0].amount / 100
                : 180;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-square bg-[#F9FBF9] p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.thumbnail || 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60'}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      title="Remove from wishlist"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-rose-50 text-rose-500 shadow-sm flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <Link
                        to={`/in/product/${product.handle}`}
                        className="font-bold text-gray-900 text-base line-clamp-2 hover:text-[#70BF4F] transition-colors mb-1"
                      >
                        {product.title}
                      </Link>
                      <p className="text-xs text-gray-500 font-medium">100% Authentic Recipe</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-lg font-black text-gray-900">₹{price}</span>
                      
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="bg-[#70BF4F] hover:bg-[#5da341] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
