import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api';
import AddToCartButton from '../components/AddToCartButton';
import SpiceMeter from '../components/SpiceMeter';
import ProductBadgePill, { getProductSpiceLevel } from '../components/ProductBadges';
import { useWishlistStore } from '../store/wishlistStore';
import { useLanguageStore } from '../store/languageStore';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Clock,
  Award,
  Leaf,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('statutory');
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { t, lang, translateCategory, translateProductName, translateWeight } = useLanguageStore();

  // Wishlist actions
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProduct(handle);
        if (data.products && data.products.length > 0) {
          const item = data.products[0];
          setProduct(item);
          setSelectedImage(item.thumbnail || (item.images && item.images[0]?.url));
        } else {
          setError(lang === 'mr' ? 'उत्पादन सापडले नाही' : 'Product not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [handle, lang]);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      toast.error(lang === 'mr' ? 'कृपया योग्य ६-अंकी भारतीय पिनकोड टाका.' : 'Please enter a valid 6-digit Indian Pincode.');
      return;
    }
    setPincodeChecked(true);
    toast.success(
      lang === 'mr' 
        ? `पिनकोड ${pincode} वर एक्सप्रेस डिलिव्हरी उपलब्ध आहे!` 
        : `Pincode ${pincode} is serviceable for Express Delivery!`
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#70BF4F] border-t-transparent mb-4" />
        <p className="text-gray-600 font-medium">
          {lang === 'mr' ? 'अस्सल मराठमोळे पदार्थ लोड होत आहेत...' : 'Loading authentic culinary delicacy...'}
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {error || (lang === 'mr' ? 'उत्पादन सापडले नाही' : 'Delicacy Not Found')}
        </h2>
        <Link
          to="/in/store"
          className="inline-block bg-[#70BF4F] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#5ca040] transition-colors"
        >
          {lang === 'mr' ? 'दुकान पृष्ठावर परत जा' : 'Return to Store'}
        </Link>
      </div>
    );
  }

  const price = ((product.variants?.[0]?.prices?.[0]?.amount || 0) / 100) || 120;
  const rawWeight = product.weight ? `${product.weight}g` : '250g';
  const weight = translateWeight(rawWeight);
  const rawCategoryTitle = product.collection?.title || 'Maharashtrian Specialty';
  const categoryTitle = translateCategory(rawCategoryTitle);
  const localizedTitle = translateProductName(product.title);

  // Determine spice level based on title/tags
  const spiceLevel = getProductSpiceLevel(product);

  return (
    <div className="w-full bg-[#FDFCF7] min-h-screen pb-16 font-sans text-[#161915]">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 py-3.5">
        <div className="container mx-auto px-4 lg:px-8 flex items-center flex-wrap gap-2 text-xs sm:text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-[#70BF4F] transition-colors">{t('home')}</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <Link to="/in/store" className="hover:text-[#70BF4F] transition-colors">{t('shop')}</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-gray-400">{categoryTitle}</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[#161915] font-bold truncate max-w-xs">{localizedTitle}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#EAEDE9] shadow-sm">
          
          {/* Left: Product Images */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full bg-[#F8FAF6] rounded-2xl p-8 flex items-center justify-center border border-gray-100/80 overflow-hidden group">
              <img
                src={selectedImage || product.thumbnail}
                alt={localizedTitle}
                className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                <DietaryBadge type="veg" />
                {spiceLevel === 3 && <DietaryBadge type="handPounded" />}
              </div>

              {/* Interactive Wishlist Heart Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const isFav = isInWishlist(product.id);
                  toggleWishlist(product);
                  if (!isFav) {
                    toast.success(lang === 'mr' ? 'आवडत्या यादीत जोडले! ❤️' : 'Added to Favorites! ❤️', { duration: 2000 });
                  } else {
                    toast(lang === 'mr' ? 'आवडत्या यादीतून काढले' : 'Removed from Favorites', { icon: '💔', duration: 1500 });
                  }
                }}
                className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer ${
                  isInWishlist(product.id)
                    ? 'bg-red-50 text-red-500 border-2 border-red-300'
                    : 'bg-white/90 hover:bg-white text-gray-400 hover:text-red-500'
                }`}
                title={isInWishlist(product.id) ? (lang === 'mr' ? 'आवडत्या यादीतून काढा' : 'Remove from Favorites') : (lang === 'mr' ? 'आवडत्या यादीत जोडा' : 'Add to Favorites')}
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isInWishlist(product.id) ? 'fill-red-500 text-red-500 scale-110' : ''
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail selector */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img.url)}
                    className={`w-20 h-20 rounded-xl p-2 bg-[#F8FAF6] border-2 transition-all flex-shrink-0 cursor-pointer ${
                      selectedImage === img.url ? 'border-[#70BF4F] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Heritage Tag */}
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase bg-green-50 px-2.5 py-1 rounded-md">
                  {categoryTitle}
                </span>
                <SpiceMeter level={spiceLevel} />
                <ProductBadgePill product={product} isMr={lang === 'mr'} max={3} />
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2 font-serif tracking-tight">
                {localizedTitle}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                {lang === 'mr' 
                  ? 'पुण्यात शुद्ध घटकांपासून तयार केलेली पारंपारिक आणि चवदार अस्सल मराठमोळी मेजवानी.'
                  : (product.subtitle || 'Authentic traditional heirloom recipe prepared with pure ingredients in Pune.')}
              </p>

              {/* Price & Weight */}
              <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-gray-100">
                <span className="text-3xl sm:text-4xl font-black text-gray-900">
                  ₹{price > 0 ? price : 150}
                </span>
                <span className="text-sm font-semibold text-gray-400">
                  {t('netWt')} <strong className="text-gray-700">{weight}</strong>
                </span>
                <span className="text-xs font-bold text-[#70BF4F] bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                  {t('inclusiveGst')}
                </span>
              </div>

              {/* Pincode Delivery Check */}
              <div className="bg-[#F8FAF6] p-4 rounded-2xl border border-gray-100 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 text-[#70BF4F]" />
                  {t('checkDelivery')}
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder={t('pincodePlaceholder')}
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      setPincodeChecked(false);
                    }}
                    className="flex-grow bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#70BF4F]"
                  />
                  <button
                    type="submit"
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#70BF4F] transition-colors cursor-pointer"
                  >
                    {t('checkBtn')}
                  </button>
                </form>

                {pincodeChecked && (
                  <div className="mt-2.5 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      {lang === 'mr' 
                        ? <><strong>{pincode}</strong> वर २४–४८ तासांत जलद होम डिलिव्हरी उपलब्ध आहे.</>
                        : <>Express Delivery in 24–48 hours to <strong>{pincode}</strong>.</>}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-8">
                <div className="sm:col-span-9">
                  <AddToCartButton
                    product={product}
                    className="w-full py-4 text-base font-black rounded-2xl shadow-lg hover:shadow-xl"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="button"
                    onClick={() => {
                      const isFav = isInWishlist(product.id);
                      toggleWishlist(product);
                      if (!isFav) {
                        toast.success(lang === 'mr' ? 'आवडत्या यादीत जोडले! ❤️' : 'Saved to Favorites! ❤️');
                      } else {
                        toast(lang === 'mr' ? 'आवडत्या यादीतून काढले' : 'Removed from Favorites', { icon: '💔' });
                      }
                    }}
                    className={`w-full h-full min-h-[52px] rounded-2xl flex items-center justify-center gap-2 text-sm font-bold border-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm ${
                      isInWishlist(product.id)
                        ? 'bg-red-50 text-red-500 border-red-300'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-red-500'
                    }`}
                    title={isInWishlist(product.id) ? (lang === 'mr' ? 'आवडत्या यादीत आहे' : 'In Favorites') : (lang === 'mr' ? 'आवडत्या यादीत जोडा' : 'Save to Favorites')}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="sm:hidden">{isInWishlist(product.id) ? (lang === 'mr' ? 'आवडते' : 'In Wishlist') : (lang === 'mr' ? 'आवडत्या यादीत जोडा' : 'Wishlist')}</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100 text-center text-xs text-gray-600 font-medium">
                <div className="flex flex-col items-center gap-1">
                  <Award className="w-5 h-5 text-[#70BF4F]" />
                  <span>{t('legacyTag')}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-5 h-5 text-[#70BF4F]" />
                  <span>{t('pureHygiene')}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-5 h-5 text-[#70BF4F]" />
                  <span>{t('mahaDelivery')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Statutory, FSSAI, Ingredients & Recipe Section */}
        <div className="mt-12 bg-white rounded-3xl border border-[#EAEDE9] p-6 sm:p-8 shadow-sm">
          <div className="flex border-b border-gray-100 gap-4 sm:gap-8 pb-4 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('statutory')}
              className={`pb-2 font-bold text-sm sm:text-base transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'statutory'
                  ? 'text-[#70BF4F] border-b-2 border-[#70BF4F]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {t('fssaiTab')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ingredients')}
              className={`pb-2 font-bold text-sm sm:text-base transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'ingredients'
                  ? 'text-[#70BF4F] border-b-2 border-[#70BF4F]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {t('ingredientsTab')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('culinary')}
              className={`pb-2 font-bold text-sm sm:text-base transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'culinary'
                  ? 'text-[#70BF4F] border-b-2 border-[#70BF4F]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {t('recipeTab')}
            </button>
          </div>

          <div className="py-6 text-sm text-gray-700 leading-relaxed">
            {activeTab === 'statutory' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#70BF4F]" />
                    {lang === 'mr' ? 'FSSAI अन्न सुरक्षा व नियामक हमी' : 'FSSAI Regulatory Compliance'}
                  </h3>
                  <p><strong>{lang === 'mr' ? 'FSSAI परवाना क्र:' : 'FSSAI License No:'}</strong> <span className="font-mono text-gray-900 font-bold">11524999000123</span></p>
                  <p><strong>{lang === 'mr' ? 'टिकाऊ मुदत:' : 'Shelf Life:'}</strong> {lang === 'mr' ? 'उत्पादनाच्या तारखेपासून ६ महिने.' : '6 Months from date of manufacture.'}</p>
                  <p><strong>{lang === 'mr' ? 'साठवणूक सूचना:' : 'Storage Instructions:'}</strong> {lang === 'mr' ? 'थंड आणि कोरड्या जागी, थेट सूर्यप्रकाशापासून दूर ठेवा. हवाबंद डब्यात ठेवा.' : 'Store in a cool, dry place away from direct sunlight. Keep container airtight.'}</p>
                </div>

                <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#70BF4F]" />
                    {lang === 'mr' ? 'उत्पादक व पॅकर माहिती' : 'Manufacturer & Packer Information'}
                  </h3>
                  <p><strong>{lang === 'mr' ? 'विपणन:' : 'Marketed By:'}</strong> {lang === 'mr' ? 'नाईक फूड्स प्रायव्हेट लिमिटेड' : 'Naik Foods Private Limited'}</p>
                  <p><strong>{lang === 'mr' ? 'नोंदणीकृत पत्ता:' : 'Registered Address:'}</strong> {lang === 'mr' ? 'सेवा मित्र मंडळ चौक, फडगेट पोलीस चौकी जवळ, शुक्रवार पेठ, पुणे ४११००२, महाराष्ट्र.' : 'Seva Mitra Mandal Chowk, Near Fadgate Police Chowki, Shukrawar Peth, Pune 411002, Maharashtra, India.'}</p>
                  <p><strong>{lang === 'mr' ? 'ग्राहक सेवा संपर्क:' : 'Customer Care:'}</strong> support@naikfoods.com | +91 9730046247</p>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4 max-w-3xl">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{lang === 'mr' ? 'अस्सल घटक:' : 'Authentic Ingredients:'}</h4>
                  <p className="text-gray-600">
                    {lang === 'mr'
                      ? 'शेतातील निवडक धान्य, शुद्ध घाण्याचे खाद्यतेल, मोहरी, हळद, मीठ, हिंग आणि पारंपारिक मराठमोळा मसाला मिश्रण.'
                      : 'Hand-selected farm produce, pure cold-pressed edible oil, mustard seeds, turmeric, iodised salt, hing (asafoetida), and proprietary Maharashtrian heritage spice blend.'}
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-1">{lang === 'mr' ? 'ॲलर्जी सूचना:' : 'Allergen Advice:'}</h4>
                  <p className="text-xs">
                    {lang === 'mr'
                      ? 'यात मोहरीचे दाणे आहेत. शेंगदाणे, सुकामेवा, गहू आणि दुग्धजन्य पदार्थ प्रक्रिया करणाऱ्या युनिटमध्ये तयार केले आहे.'
                      : 'Contains Mustard seeds. Prepared in a facility that also processes peanuts, tree nuts, wheat, and dairy.'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'culinary' && (
              <div className="space-y-4 max-w-3xl">
                <p>
                  {lang === 'mr'
                    ? 'पिढ्यानपिढ्या चालत आलेल्या विदर्भ आणि कोकणातील पारंपारिक पद्धतीनुसार तयार केलेले. गरमागरम ज्वारीची भाकरी, तुपासह गरम भात किंवा संध्याकाळच्या चहाचा परिपूर्ण सोबती.'
                    : 'Crafted following traditional Vidarbha and Konkan culinary methodologies passed down across generations. Best enjoyed alongside hot bhakri, steamed rice with ghee, or as a flavorful companion to evening tea.'}
                </p>
                <div className="flex gap-2 flex-wrap pt-2">
                  <DietaryBadge type="handPounded" />
                  <DietaryBadge type="noPreservatives" />
                  <DietaryBadge type="veg" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
