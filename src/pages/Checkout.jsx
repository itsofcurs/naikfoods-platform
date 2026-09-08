import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useSwadCoinsStore } from '../store/swadCoinsStore';
import { useLanguageStore } from '../store/languageStore';
import { 
  MapPin, ShieldCheck, CheckCircle2, CreditCard, Smartphone, 
  Banknote, Coins, ArrowRight, AlertCircle, Loader2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutAuthModal from '../components/CheckoutAuthModal';
import DeliveryLocationPicker from '../components/checkout/DeliveryLocationPicker';

const DEFAULT_CENTER = { lat: 18.5204, lng: 73.8567 }; // Pune default

export default function Checkout() {
  const { t, lang } = useLanguageStore();
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const rawCartTotal = useCartStore((state) => state.cartTotal());
  const { customer, isAuthenticated, addOrder, addAddress } = useAuthStore();
  const { coins, redeemCoins, earnCoins } = useSwadCoinsStore();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

  // Address State
  const [position, setPosition] = useState(DEFAULT_CENTER);
  const [address, setAddress] = useState('Pune, Maharashtra, India');

  const [addressDetails, setAddressDetails] = useState({
    fullName: customer ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim() : 'Rohan Jadhav',
    phone: customer?.phone || '9876543210',
    flat: 'Flat 402, Sujata Apartments',
    landmark: 'Near Deccan Gymkhana',
    pincode: '411004',
    tag: 'Home', // 'Home' | 'Work' | 'Other'
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [upiApp, setUpiApp] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'qr'
  const [useCoins, setUseCoins] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // COD Calculation Rules
  const codFee = paymentMethod === 'cod' ? 40 : 0;
  const isCodAllowed = rawCartTotal >= 299 && rawCartTotal <= 1500;

  // Swad Coins Deduction
  const coinsDeduction = useCoins ? Math.min(coins, Math.floor(rawCartTotal)) : 0;
  const deliveryFee = rawCartTotal >= 499 ? 0 : 50;
  const finalOrderTotal = Math.max(0, rawCartTotal - coinsDeduction + deliveryFee + codFee);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!addressDetails.flat) {
      alert('Please enter your house/flat number');
      return;
    }
    if (!position?.lat || !position?.lng) {
      alert('Please select a valid delivery location pin on the map.');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Deduct coins if redeemed
      if (useCoins && coinsDeduction > 0) {
        redeemCoins(coinsDeduction);
      }

      // Earn new coins
      const earned = earnCoins(finalOrderTotal);

      const orderData = {
        orderId: `NF-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...items],
        total: finalOrderTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        address: `${addressDetails.flat}, ${addressDetails.landmark ? addressDetails.landmark + ', ' : ''}${address}`,
        pincode: addressDetails.pincode,
        recipient: addressDetails.fullName,
        phone: addressDetails.phone,
        coinsEarned: earned,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Confirmed & In Kitchen',
      };

      // Persist to user's profile and account history
      if (addOrder) {
        addOrder(orderData);
      }
      if (addAddress) {
        addAddress({
          tag: addressDetails.tag || 'Home',
          address: `${addressDetails.flat}, ${addressDetails.landmark ? addressDetails.landmark + ', ' : ''}${address}`,
          pincode: addressDetails.pincode,
          recipient: addressDetails.fullName,
          phone: addressDetails.phone,
        });
      }

      setPlacedOrder(orderData);
      clearCart();
      setIsProcessing(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (step === 3 && placedOrder) {
    return (
      <div className="min-h-screen bg-[#FAFBF9] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-500 via-[#70BF4F] to-orange-500" />
          
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-block bg-green-50 text-green-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            ऑर्डर यशस्वीरित्या पूर्ण झाली!
          </div>
          <h1 className="text-3xl font-black text-gray-900">Thank You for Your Order!</h1>
          <p className="text-gray-500 text-sm mt-1">Order Confirmation #{placedOrder.orderId}</p>

          {/* Coins Earned Alert */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-center gap-3">
            <Coins className="w-6 h-6 text-amber-600 animate-bounce" />
            <div className="text-left">
              <p className="text-xs font-bold text-amber-900">You've Earned +{placedOrder.coinsEarned} Naik Swad Coins! 🎉</p>
              <p className="text-[11px] text-amber-700">Added to your loyalty wallet for your next authentic meal.</p>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="mt-6 bg-gray-50 rounded-2xl p-5 text-left text-sm space-y-3 border border-gray-100">
            <div className="flex justify-between font-bold text-gray-900 pb-2 border-b border-gray-200">
              <span>Estimated Delivery:</span>
              <span className="text-[#70BF4F]">24 - 48 Hours Express 🚚</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold block">Deliver To:</span>
              <p className="font-semibold text-gray-800">{placedOrder.recipient} ({placedOrder.phone})</p>
              <p className="text-xs text-gray-600 leading-snug">{placedOrder.address}</p>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 font-black text-base text-gray-900">
              <span>Amount Paid ({placedOrder.paymentMethod}):</span>
              <span>₹{placedOrder.total}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/in/store"
              className="bg-[#70BF4F] hover:bg-[#5da341] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all"
            >
              Continue Shopping 🌶️
            </Link>
            <Link
              to="/in/account"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all"
            >
              View in My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#FAFBF9] min-h-screen py-8 lg:py-12">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          


          {/* Checkout Steps Indicator */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0" />
              
              <div className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${
                step === 1 ? 'bg-[#70BF4F] text-white shadow-md' : 'bg-green-100 text-green-800'
              }`}>
                <span>{lang === 'mr' ? '१. डिलिव्हरी पत्ता' : '1. Delivery Address'}</span>
              </div>

              <div className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${
                step === 2 ? 'bg-[#70BF4F] text-white shadow-md' : 'bg-gray-100 text-gray-500'
              }`}>
                <span>{lang === 'mr' ? '२. पेमेंट व COD' : '2. Payment & COD'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-8 space-y-6">
              
              {step === 1 ? (
                /* STEP 1: DELIVERY ADDRESS */
                <div className="space-y-6">
                  <DeliveryLocationPicker
                    position={position}
                    setPosition={setPosition}
                    address={address}
                    setAddress={setAddress}
                    onAddressDetailsChange={setAddressDetails}
                  />

                  {/* Manual Detailed Address Fields */}
                  <form onSubmit={handleProceedToPayment} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
                    <h3 className="text-lg font-black text-gray-900">
                      {lang === 'mr' ? 'पूर्ण पत्ता माहिती' : 'Complete Address Information'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                          {lang === 'mr' ? 'पूर्ण नाव' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={addressDetails.fullName}
                          onChange={(e) => setAddressDetails({ ...addressDetails, fullName: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#70BF4F] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                          {lang === 'mr' ? 'मोबाईल क्रमांक (कूरियर OTP साठी)' : 'Mobile Number (For Courier OTP)'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={addressDetails.phone}
                          onChange={(e) => setAddressDetails({ ...addressDetails, phone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#70BF4F] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                          {lang === 'mr' ? 'घर / फ्लॅट क्र. आणि इमारतीचे नाव' : 'House / Flat No. & Building Name'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={lang === 'mr' ? 'उदा. फ्लॅट ४०२, सुजाता अपार्टमेंट्स' : 'e.g. Flat 402, Sujata Apartments'}
                          value={addressDetails.flat}
                          onChange={(e) => setAddressDetails({ ...addressDetails, flat: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#70BF4F] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                          {lang === 'mr' ? 'जवळची खूण / लँडमार्क (ऐच्छिक)' : 'Landmark (Optional)'}
                        </label>
                        <input
                          type="text"
                          placeholder={lang === 'mr' ? 'उदा. डेक्कन जिमखाना जवळ' : 'e.g. Near Deccan Gymkhana'}
                          value={addressDetails.landmark}
                          onChange={(e) => setAddressDetails({ ...addressDetails, landmark: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#70BF4F] focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Address Tag Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 mb-2">
                        {lang === 'mr' ? 'पत्ता प्रकार' : 'Save Address As'}
                      </label>
                      <div className="flex gap-3">
                        {[
                          { key: 'Home', label: lang === 'mr' ? 'घर' : 'Home' },
                          { key: 'Work', label: lang === 'mr' ? 'कार्यालय' : 'Work' },
                          { key: 'Other', label: lang === 'mr' ? 'इतर' : 'Other' }
                        ].map(({ key, label }) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setAddressDetails({ ...addressDetails, tag: key })}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              addressDetails.tag === key
                                ? 'bg-[#1B261A] text-white border-[#1B261A] shadow-xs'
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#70BF4F] hover:bg-[#5ea73f] text-white py-4 rounded-2xl font-bold text-base shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer mt-4"
                    >
                      {lang === 'mr' ? 'पत्ता निश्चित करा आणि पेमेंटकडे जा →' : 'Confirm Address & Proceed to Payment →'}
                    </button>
                  </form>
                </div>
              ) : (
                /* STEP 2: PAYMENT & CONDITIONAL COD */
                <div className="space-y-6">
                  
                  {/* Address Summary Banner */}
                  <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#70BF4F] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-bold">
                          {lang === 'mr' ? `डिलिव्हरी पत्ता (${addressDetails.tag === 'Home' ? 'घर' : addressDetails.tag === 'Work' ? 'कार्यालय' : 'इतर'}):` : `Delivering to (${addressDetails.tag}):`}
                        </p>
                        <p className="text-sm font-bold text-gray-900">{addressDetails.fullName} • {addressDetails.flat}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-[#70BF4F] hover:underline cursor-pointer"
                    >
                      {lang === 'mr' ? 'पत्ता बदला' : 'Change Address'}
                    </button>
                  </div>

                  {/* Swad Coins Redemption Card */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/70 p-5 rounded-3xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Coins className="w-6 h-6 text-amber-600 animate-spin-slow" />
                        <div>
                          <p className="text-sm font-black text-amber-900">
                            {lang === 'mr' ? `नाईक स्वाद नाणी शिल्लक: ${coins} नाणी` : `Naik Swad Coins Balance: ${coins} Coins`}
                          </p>
                          <p className="text-xs text-amber-700">
                            {lang === 'mr' ? '१ नाणे = ₹१ तात्काळ रोख सवलत' : '1 Coin = ₹1 Direct Cash Discount'}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setUseCoins(!useCoins)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          useCoins
                            ? 'bg-amber-600 text-white shadow-md'
                            : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-100'
                        }`}
                      >
                        {useCoins ? (lang === 'mr' ? `लागू झाले (-₹${coinsDeduction}) ✓` : `Applied (-₹${coinsDeduction}) ✓`) : (lang === 'mr' ? `वापरा ₹${coins}` : `Redeem ₹${coins}`)}
                      </button>
                    </div>
                  </div>

                  {/* Payment Matrix */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
                    <h3 className="text-lg font-black text-gray-900 mb-2">
                      {lang === 'mr' ? 'पेमेंट पद्धत निवडा' : 'Select Payment Method'}
                    </h3>

                    {/* Option 1: Instant UPI */}
                    <div 
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-[#70BF4F] bg-green-50/40 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-[#70BF4F]" />
                          <span className="font-bold text-sm text-gray-900">
                            {lang === 'mr' ? 'तात्काळ UPI (GPay / PhonePe / Paytm / QR)' : 'UPI Instant (GPay / PhonePe / Paytm / QR)'}
                          </span>
                        </div>
                        <span className="bg-[#70BF4F] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          {lang === 'mr' ? 'जलद आणि मोफत' : 'FASTEST & FREE'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 pl-8">
                        {lang === 'mr' ? 'शून्य अतिरिक्त शुल्कासह त्वरित खात्री' : 'Instant approval with zero transaction surcharge'}
                      </p>
                    </div>

                    {/* Option 2: Cards & Net Banking */}
                    <div 
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#70BF4F] bg-green-50/40 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-700" />
                          <span className="font-bold text-sm text-gray-900">
                            {lang === 'mr' ? 'क्रेडिट / डेबिट कार्ड व नेट बँकिंग' : 'Credit / Debit Cards & Net Banking'}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 pl-8">Visa, MasterCard, RuPay, ICICI, HDFC, SBI & all banks</p>
                    </div>

                    {/* Option 3: Conditional Cash on Delivery (COD) */}
                    <div 
                      onClick={() => {
                        if (isCodAllowed) setPaymentMethod('cod');
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        !isCodAllowed
                          ? 'opacity-60 border-gray-200 bg-gray-50 cursor-not-allowed'
                          : paymentMethod === 'cod'
                          ? 'border-[#70BF4F] bg-green-50/40 shadow-sm cursor-pointer'
                          : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <Banknote className="w-5 h-5 text-amber-700" />
                          <span className="font-bold text-sm text-gray-900">
                            {lang === 'mr' ? 'कॅश ऑन डिलिव्हरी (COD)' : 'Cash on Delivery (COD)'}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                          +₹40 {lang === 'mr' ? 'हाताळणी' : 'Handling'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 pl-8">
                        {lang === 'mr' 
                          ? 'रोख रक्कम वितरण सेवा उपलब्ध • पार्सल हाती मिळाल्यावर कुरियर प्रतिनिधीकडे रोख पैसे द्या.'
                          : 'Pay cash to courier agent upon doorstep delivery.'}
                      </p>

                      {!isCodAllowed && (
                        <div className="mt-2 pl-8 flex items-center gap-1.5 text-xs text-red-600 font-bold">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          {rawCartTotal < 299
                            ? (lang === 'mr' ? `COD साठी किमान ₹२९९ ची ऑर्डर आवश्यक आहे (अजून ₹${Math.round(299 - rawCartTotal)} जोडा)` : `COD requires minimum order of ₹299 (Add ₹${Math.round(299 - rawCartTotal)} more)`)
                            : (lang === 'mr' ? '₹१,५०० वरील ऑर्डरसाठी ऑनलाइन प्रीपेड पेमेंट आवश्यक आहे.' : 'Orders above ₹1,500 require prepaid payment for secure courier handling.')}
                        </div>
                      )}
                    </div>

                    {/* Final Pay Button */}
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full bg-[#70BF4F] hover:bg-[#5ea73f] text-white py-4 rounded-2xl font-bold text-base shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> {lang === 'mr' ? 'सुरक्षित ऑर्डर प्रक्रिया सुरू आहे...' : 'Processing Secure Order...'}
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" /> {lang === 'mr' ? `₹${finalOrderTotal} भरा आणि ऑर्डर पूर्ण करा` : `Pay ₹${finalOrderTotal} & Place Order`}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Order Summary Receipt */}
            <div className="lg:col-span-4 sticky top-28 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden">
                <h3 className="text-lg font-black text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
                  <span>{t('orderSummary')}</span>
                  <span className="text-xs font-bold text-[#70BF4F] bg-green-50 px-2 py-0.5 rounded-full">
                    {items.length} {lang === 'mr' ? 'पदार्थ' : 'Items'}
                  </span>
                </h3>

                <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.variant.id} className="flex gap-3 text-xs">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center p-1 border border-gray-100">
                        {item.product.thumbnail && (
                          <img src={item.product.thumbnail} alt={item.product.title} className="max-h-full max-w-full object-contain" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{item.product.title}</p>
                        <p className="text-gray-500">{lang === 'mr' ? 'प्रमाण' : 'Qty'}: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-gray-900">
                        ₹{((item.variant.prices?.[0]?.amount || 0) * item.quantity) / 100}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Itemization */}
                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('subtotal')}</span>
                    <span className="font-bold text-gray-900">₹{rawCartTotal}</span>
                  </div>

                  {useCoins && coinsDeduction > 0 && (
                    <div className="flex justify-between text-amber-700 font-bold bg-amber-50 p-1.5 rounded-lg">
                      <span>{lang === 'mr' ? 'स्वाद नाणी सवलत' : 'Swad Coins Discount'}</span>
                      <span>-₹{coinsDeduction}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>{t('deliveryFee')}</span>
                    <span className="font-bold text-green-600">{deliveryFee === 0 ? t('free') : `₹${deliveryFee}`}</span>
                  </div>

                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-gray-600">
                      <span>{lang === 'mr' ? 'COD हाताळणी शुल्क' : 'COD Courier Handling'}</span>
                      <span className="font-bold text-gray-900">+₹40</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-3 border-t border-gray-200 text-base font-black text-gray-900">
                    <span>{t('total')}</span>
                    <span className="text-xl text-[#70BF4F]">₹{finalOrderTotal}</span>
                  </div>

                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-amber-700 font-extrabold flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" /> 
                      {lang === 'mr' ? `या ऑर्डरवर +${Math.floor(finalOrderTotal * 0.05)} स्वाद नाणी मिळतील!` : `Will earn ${Math.floor(finalOrderTotal * 0.05)} Swad Coins!`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Guest Login Interceptor Modal */}
      <CheckoutAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onContinueAsGuest={() => setShowAuthModal(false)}
      />
    </>
  );
}
