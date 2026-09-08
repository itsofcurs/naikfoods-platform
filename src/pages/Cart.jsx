import { useCartStore } from '../store/cartStore';
import { useLanguageStore } from '../store/languageStore';
import { Link } from 'react-router-dom';
import { Trash2, Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { getProducts } from '../api';
import AddToCartButton from '../components/AddToCartButton';
import FreeShippingBar from '../components/FreeShippingBar';

export default function Cart() {
  const { t, lang } = useLanguageStore();
  const { items, removeFromCart, updateQuantity, cartTotal } = useCartStore();
  const [recommendations, setRecommendations] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);

  const subtotal = cartTotal();
  const freeDeliveryThreshold = 499;
  const shippingFee = subtotal >= freeDeliveryThreshold || appliedPromo === 'NAIKFREE' ? 0 : 50;
  const totalAmount = Math.max(0, subtotal - appliedDiscount + shippingFee);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const data = await getProducts();
        if (data.products) {
          setRecommendations(data.products.slice(4, 8));
        }
      } catch (err) {
        console.error('Failed to load recommendations', err);
      }
    }
    fetchRecommendations();
  }, []);

  const handleApplyPromo = (codeToApply) => {
    const code = (codeToApply || promoCode).trim().toUpperCase();
    if (!code) {
      toast.error('Please enter a coupon code.');
      return;
    }

    if (code === 'FESTIVE10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setAppliedPromo('FESTIVE10');
      toast.success('🎉 FESTIVE10 applied! 10% discount added.');
    } else if (code === 'SWAD50') {
      if (subtotal < 350) {
        toast.error('SWAD50 requires minimum order value of ₹350.');
        return;
      }
      setAppliedDiscount(50);
      setAppliedPromo('SWAD50');
      toast.success('🎉 SWAD50 applied! ₹50 discount added.');
    } else if (code === 'NAIKFREE') {
      setAppliedDiscount(0);
      setAppliedPromo('NAIKFREE');
      toast.success('🎉 NAIKFREE applied! Free shipping unlocked.');
    } else {
      toast.error('Invalid or expired coupon code.');
    }
    setPromoCode('');
  };

  const handleRemovePromo = () => {
    setAppliedDiscount(0);
    setAppliedPromo(null);
    toast.success('Coupon removed.');
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-6xl">
      <h1 className="text-3xl font-black text-gray-900 mb-6 font-serif">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center py-16">
          <div className="w-16 h-16 bg-green-50 text-[#70BF4F] rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('cartEmpty')}</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            {lang === 'mr' ? 'आमचे अस्सल मराठमोळे मसाले, लोणची आणि कुरकुरीत पदार्थ पाहून खरेदी सुरू करा.' : 'Discover our hand-pounded authentic Maharashtrian masalas, pickles, and traditional snacks.'}
          </p>
          <Link
            to="/in/store"
            className="inline-flex items-center gap-2 bg-[#70BF4F] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-[#5ca040] transition-all shadow-md"
          >
            {t('startShopping')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Free Shipping Meter */}
          <FreeShippingBar currentAmount={subtotal} threshold={freeDeliveryThreshold} />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Table */}
            <div className="flex-grow space-y-6">
              <div className="border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F8FAF6] text-gray-700 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="p-4 sm:p-5">{lang === 'mr' ? 'खाद्यपदार्थ' : 'Delicacy'}</th>
                      <th className="p-4 sm:p-5">{lang === 'mr' ? 'प्रमाण' : 'Quantity'}</th>
                      <th className="p-4 sm:p-5 text-right">{lang === 'mr' ? 'किंमत' : 'Price'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {items.map((item) => {
                      const itemPrice = (item.variant.prices?.[0]?.amount || 0) / 100;
                      return (
                        <tr key={item.variant.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 sm:p-5 flex items-center gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F8FAF6] border border-gray-100 p-2 flex-shrink-0 rounded-2xl overflow-hidden">
                              {item.product.thumbnail ? (
                                <img
                                  src={item.product.thumbnail}
                                  alt={item.product.title}
                                  className="w-full h-full object-contain mix-blend-multiply"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200" />
                              )}
                            </div>
                            <div>
                              <Link
                                to={`/in/product/${item.product.handle}`}
                                className="font-bold text-gray-900 hover:text-[#70BF4F] transition-colors line-clamp-1 text-sm sm:text-base"
                              >
                                {item.product.title}
                              </Link>
                              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                                {lang === 'mr' ? 'वजन' : 'Net Wt'}: {item.variant.title || (lang === 'mr' ? 'प्रमाणित पॅक' : 'Standard Pack')}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 sm:p-5">
                            <div className="flex items-center gap-2">
                              <select
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.variant.id, parseInt(e.target.value))
                                }
                                className="border border-gray-200 rounded-xl p-2 text-sm bg-white font-semibold focus:outline-none focus:border-[#70BF4F]"
                              >
                                {[...Array(10).keys()].map((i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.variant.id)}
                                className="text-gray-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="p-4 sm:p-5 text-right font-bold text-gray-900 text-sm sm:text-base">
                            ₹{itemPrice * item.quantity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Cross-selling Recommendations */}
              {recommendations.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-serif">
                    {t('frequentlyBoughtTogether')}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {recommendations.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col shadow-2xs hover:shadow-md transition-shadow"
                      >
                        <Link
                          to={`/in/product/${product.handle}`}
                          className="block relative aspect-square bg-[#F8FAF6] mb-3 p-2 rounded-xl"
                        >
                          {product.thumbnail ? (
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-full h-full object-contain mix-blend-multiply"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </Link>
                        <Link
                          to={`/in/product/${product.handle}`}
                          className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 hover:text-[#70BF4F] mb-1"
                        >
                          {product.title}
                        </Link>
                        <span className="text-xs sm:text-sm font-bold text-gray-800 mb-2">
                          ₹{product.variants?.[0]?.prices?.[0]?.amount / 100 || 120}
                        </span>
                        <div className="mt-auto">
                          <AddToCartButton product={product} className="w-full py-1.5 text-xs font-bold" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Cart Summary */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm space-y-6 sticky top-24">
                <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-3 font-serif">
                  {t('orderSummary')}
                </h2>

                {/* Promo Code Input & Discovery Chips */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    {t('applyCoupon')}
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. FESTIVE10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="border border-gray-200 rounded-xl px-3 py-2 text-sm uppercase flex-grow focus:outline-none focus:border-[#70BF4F]"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyPromo()}
                      className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#70BF4F] transition-colors cursor-pointer"
                    >
                      {t('applyPromo')}
                    </button>
                  </div>

                  {/* Predefined Discovery Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleApplyPromo('FESTIVE10')}
                      className="text-[11px] bg-green-50 text-[#70BF4F] font-bold border border-green-200 px-2 py-0.5 rounded-md hover:bg-green-100 transition-colors"
                    >
                      FESTIVE10 ({lang === 'mr' ? '१०% सूट' : '10% OFF'})
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPromo('SWAD50')}
                      className="text-[11px] bg-amber-50 text-amber-800 font-bold border border-amber-200 px-2 py-0.5 rounded-md hover:bg-amber-100 transition-colors"
                    >
                      SWAD50 ({lang === 'mr' ? '₹५० सूट' : '₹50 OFF'})
                    </button>
                  </div>

                  {appliedPromo && (
                    <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200">
                      <span className="font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {appliedPromo} {lang === 'mr' ? 'लागू झाले' : 'applied'}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="text-red-500 font-bold hover:underline"
                      >
                        {t('remove')}
                      </button>
                    </div>
                  )}
                </div>

                {/* Pricing Line Items */}
                <div className="space-y-3 text-sm text-gray-600 border-t border-b border-gray-100 py-4">
                  <div className="flex justify-between font-medium">
                    <span>{t('subtotal')}</span>
                    <span className="text-gray-900 font-bold">₹{subtotal}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>{lang === 'mr' ? 'सवलत' : 'Discount'} ({appliedPromo})</span>
                      <span>-₹{appliedDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-medium">
                    <span>{t('deliveryFee')}</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-[#70BF4F]">{t('free')}</strong>
                      ) : (
                        `₹${shippingFee}.00`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between font-black text-lg text-gray-900 pt-2 border-t border-dashed border-gray-200">
                    <span>{t('total')}</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                <Link
                  to="/in/checkout"
                  className="block text-center w-full bg-[#70BF4F] hover:bg-[#5ca040] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {t('proceedToCheckout')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
