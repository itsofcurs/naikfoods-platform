import React, { useState } from 'react';
import { Gift, Sparkles, Check, Plus, Trash2, Heart, ArrowRight, ShieldCheck, ShoppingBag, Package } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useLanguageStore } from '../store/languageStore';
import { useNavigate } from 'react-router-dom';

const BOX_TYPES = [
  {
    id: 'royal-diwali',
    title: 'Royal Diwali Shidori Box',
    marathi: 'शाही दिवाळी शिदोरी पेटी',
    tagline: 'Festive red & gold embossed box with handcrafted brass-style latch',
    taglineMr: 'सणासुदीची लाल-सोनेरी नक्षीदार पेटी व पितळी लॉक',
    boxValue: 199,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'pahunchar-box',
    title: 'Pahunchar Snack & Spice Trunk',
    marathi: 'पाहुणचार पारंपारिक ट्रंक',
    tagline: 'Handcrafted reusable wooden box ideal for gifting relatives & friends',
    taglineMr: 'नातेवाईक व मित्रांना भेट देण्यासाठी लाकडी भेट पेटी',
    boxValue: 249,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'aaji-kraft',
    title: "Aaji's Traditional Kraft Hamper",
    marathi: 'आजींची पर्यावरणपूरक पेटी',
    tagline: 'Eco-friendly recycled kraft paper box with royal satin marigold ribbon',
    taglineMr: 'झेंडूच्या सॅटिन रिबीनसह पर्यावरणपूरक क्राफ्ट बॉक्स',
    boxValue: 149,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500&auto=format&fit=crop&q=60',
  },
];

const AVAILABLE_ITEMS = {
  masalas: [
    { id: 'm1', name: 'Royal Goda Masala (250g)', marathi: 'शाही गोडा मसाला (२५० ग्रॅम)', price: 210, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&auto=format&fit=crop&q=60' },
    { id: 'm2', name: 'Kolhapuri Kanda Lasun Masala (250g)', marathi: 'कोल्हापुरी कांदा लसूण (२५० ग्रॅम)', price: 180, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&auto=format&fit=crop&q=60' },
    { id: 'm3', name: 'Sindhudurg Malvani Masala (250g)', marathi: 'मालवणी मसाला (२५० ग्रॅम)', price: 220, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&auto=format&fit=crop&q=60' },
    { id: 'm4', name: 'Nagpuri Saoji Garam Masala (200g)', marathi: 'सावजी गरम मसाला (२०० ग्रॅम)', price: 230, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&auto=format&fit=crop&q=60' },
    { id: 'm5', name: 'Khandeshi Charred Kala Masala (250g)', marathi: 'खान्देशी काळा मसाला (२५० ग्रॅम)', price: 215, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&auto=format&fit=crop&q=60' },
  ],
  pickles: [
    { id: 'p1', name: 'Konkani Kairi Lonche (300g)', marathi: 'कैरीचे लोणचे (३०० ग्रॅम)', price: 190, image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810ef?w=200&auto=format&fit=crop&q=60' },
    { id: 'p2', name: 'Solapuri Shengdana Chutney (200g)', marathi: 'सोलापुरी शेंगदाणा चटणी (२०० ग्रॅम)', price: 140, image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810ef?w=200&auto=format&fit=crop&q=60' },
    { id: 'p3', name: 'Kolhapuri Mirchi Thecha (200g)', marathi: 'झणझणीत मिरची ठेचा (२०० ग्रॅम)', price: 150, image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810ef?w=200&auto=format&fit=crop&q=60' },
    { id: 'p4', name: 'Dry Garlic Lasun Chutney (150g)', marathi: 'कोरडी लसूण चटणी (१५० ग्रॅम)', price: 130, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&auto=format&fit=crop&q=60' },
  ],
  snacks: [
    { id: 's1', name: 'Authentic Puneri Bakarwadi (400g)', marathi: 'पुणेरी बाकरवडी (४०० ग्रॅम)', price: 160, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&auto=format&fit=crop&q=60' },
    { id: 's2', name: 'Ratnagiri Alphonso Amba Poli (200g)', marathi: 'हापूस आंबा पोळी (२०० ग्रॅम)', price: 240, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&auto=format&fit=crop&q=60' },
    { id: 's3', name: 'Vidarbha Spiced Poha Chivda (350g)', marathi: 'खमंग पोहे चिवडा (३५० ग्रॅम)', price: 140, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&auto=format&fit=crop&q=60' },
    { id: 's4', name: 'Traditional Besan Ladoo with Desi Ghee (300g)', marathi: 'शुद्ध तुपातले बेसन लाडू (३०० ग्रॅम)', price: 220, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&auto=format&fit=crop&q=60' },
  ]
};

export default function FestiveHamperBuilder() {
  const { t, lang } = useLanguageStore();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedBox, setSelectedBox] = useState(BOX_TYPES[0]);
  const [selectedMasalas, setSelectedMasalas] = useState([AVAILABLE_ITEMS.masalas[0], AVAILABLE_ITEMS.masalas[1]]);
  const [selectedPickles, setSelectedPickles] = useState([AVAILABLE_ITEMS.pickles[0], AVAILABLE_ITEMS.pickles[1]]);
  const [selectedSnacks, setSelectedSnacks] = useState([AVAILABLE_ITEMS.snacks[0], AVAILABLE_ITEMS.snacks[1]]);

  const [greeting, setGreeting] = useState({
    occasion: 'दिवाळी सण (Diwali Festival)',
    to: lang === 'mr' ? 'प्रिय कुटुंब व मित्र परिवार' : 'Dear Family & Friends',
    message: 'घरच्या अस्सल महाराष्ट्रीयन स्वादाची आणि प्रेमाची ही खास भेट! Wishing you joy, good health and prosperity.',
    from: lang === 'mr' ? 'सस्नेह नमस्कार' : 'With Love',
  });

  const toggleItem = (category, item) => {
    if (category === 'masalas') {
      if (selectedMasalas.some((m) => m.id === item.id)) {
        setSelectedMasalas(selectedMasalas.filter((m) => m.id !== item.id));
      } else if (selectedMasalas.length < 2) {
        setSelectedMasalas([...selectedMasalas, item]);
      }
    } else if (category === 'pickles') {
      if (selectedPickles.some((p) => p.id === item.id)) {
        setSelectedPickles(selectedPickles.filter((p) => p.id !== item.id));
      } else if (selectedPickles.length < 2) {
        setSelectedPickles([...selectedPickles, item]);
      }
    } else if (category === 'snacks') {
      if (selectedSnacks.some((s) => s.id === item.id)) {
        setSelectedSnacks(selectedSnacks.filter((s) => s.id !== item.id));
      } else if (selectedSnacks.length < 2) {
        setSelectedSnacks([...selectedSnacks, item]);
      }
    }
  };

  const rawTotal = [...selectedMasalas, ...selectedPickles, ...selectedSnacks].reduce((sum, i) => sum + i.price, 0);
  const discountAmount = Math.round(rawTotal * 0.15); // 15% Combo Discount
  const finalPrice = rawTotal - discountAmount;
  const isComplete = selectedMasalas.length === 2 && selectedPickles.length === 2 && selectedSnacks.length === 2;

  const handleAddHamperToCart = () => {
    if (!isComplete) return;

    const hamperProduct = {
      id: `custom_hamper_${Date.now()}`,
      title: lang === 'mr' ? `खास भेट हॅम्पर: ${selectedBox.marathi}` : `Custom Gift Hamper: ${selectedBox.title}`,
      thumbnail: selectedBox.image,
      handle: 'custom-festive-hamper',
      description: `Includes: ${[...selectedMasalas, ...selectedPickles, ...selectedSnacks].map(i => lang === 'mr' ? i.marathi : i.name).join(', ')}. Greeting: "${greeting.message}" from ${greeting.from}`
    };

    const hamperVariant = {
      id: `var_hamper_${Date.now()}`,
      title: `${selectedBox.marathi} (6 Items + Free Gift Note)`,
      prices: [{ amount: finalPrice * 100 }],
    };

    addToCart(hamperProduct, hamperVariant, 1);
    navigate('/in/cart');
  };

  return (
    <div className="bg-[#FAFBF9] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-md">
            <Gift className="w-3.5 h-3.5" /> 
            {lang === 'mr' ? 'सण-उत्सव भेट • खास गिफ्ट बॉक्स बनवा' : 'सण-उत्सव भेट • Festive Custom Box Builder'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {lang === 'mr' ? (
              <>स्वतःचा <span className="text-[#70BF4F]">महाराष्ट्रीयन भेट बॉक्स</span> तयार करा</>
            ) : (
              <>Build Your Own <span className="text-[#70BF4F]">Maharashtrian Hamper</span></>
            )}
          </h1>
          <p className="mt-3 text-base text-gray-600">
            {lang === 'mr' 
              ? '२ मसाले + २ लोणची/ठेचा + २ चिवडे व गोड पदार्थ निवडा आणि मोफत शुभेच्छा पत्रासह मिळवा १५% तात्काळ सवलत!'
              : 'Pick 2 Masalas + 2 Pickles/Chutneys + 2 Snacks & Sweets in a handcrafted festive gift box with a personalized greeting card. Enjoy an automatic 15% Bundle Discount!'}
          </p>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3 Selection Steps */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Choose Box Style */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#70BF4F] text-white font-black text-sm flex items-center justify-center">1</span>
                <div>
                  <h2 className="text-lg font-black text-gray-900">
                    {lang === 'mr' ? 'टप्पा १: गिफ्ट बॉक्सचा प्रकार निवडा' : 'Step 1: Choose Your Gift Packaging'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {lang === 'mr' ? 'सणासुदीसाठी खास नक्षीदार पेकिंग मोफत' : 'Premium festive finish with complimentary packaging'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BOX_TYPES.map((box) => {
                  const isSelected = selectedBox.id === box.id;
                  return (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className={`rounded-2xl p-4 border-2 cursor-pointer transition-all duration-300 relative ${
                        isSelected
                          ? 'border-[#70BF4F] bg-green-50/40 shadow-md ring-2 ring-[#70BF4F]/20'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3">
                        <img src={box.image} alt={box.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-black text-sm text-gray-900">
                          {lang === 'mr' ? box.marathi : box.title}
                        </h3>
                        {isSelected && <Check className="w-4 h-4 text-[#70BF4F]" />}
                      </div>
                      <p className="text-[11px] text-[#70BF4F] font-bold">
                        {lang === 'mr' ? box.title : box.marathi}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 leading-snug">
                        {lang === 'mr' ? box.taglineMr : box.tagline}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Pick 6 Authentic Delicacies */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-8">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#70BF4F] text-white font-black text-sm flex items-center justify-center">2</span>
                <div>
                  <h2 className="text-lg font-black text-gray-900">
                    {lang === 'mr' ? 'टप्पा २: तुमचे आवडते ६ मराठमोळे पदार्थ निवडा' : 'Step 2: Curate Your 6 Maharashtrian Items'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {lang === 'mr' ? '२ मसाले + २ लोणची/ठेचा + २ कुरकुरीत स्नॅक्स निवडा' : 'Choose 2 Masalas + 2 Pickles/Chutneys + 2 Crispy Snacks'}
                  </p>
                </div>
              </div>

              {/* Category 1: Masalas */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                    {lang === 'mr' 
                      ? `विभाग अ: जात्यावरचे मसाले (${selectedMasalas.length}/२ निवडले)` 
                      : `Category A: Stone-Ground Masalas (Select ${selectedMasalas.length}/2)`}
                  </h3>
                  {selectedMasalas.length === 2 && (
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> {lang === 'mr' ? 'जागा भरली' : 'Slot Filled'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AVAILABLE_ITEMS.masalas.map((item) => {
                    const isSelected = selectedMasalas.some((m) => m.id === item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleItem('masalas', item)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#70BF4F] bg-[#F2F7F5] shadow-xs'
                            : selectedMasalas.length >= 2
                            ? 'opacity-50 border-gray-200 bg-gray-50/50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {lang === 'mr' ? item.marathi : item.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {lang === 'mr' ? item.name : item.marathi}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100/80">
                          <span className="text-xs font-black text-gray-800">₹{item.price}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            isSelected ? 'bg-[#70BF4F] text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {isSelected ? (lang === 'mr' ? 'निवडले ✓' : 'Selected ✓') : (lang === 'mr' ? '+ जोडा' : '+ Add')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: Pickles & Chutneys */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                    {lang === 'mr' 
                      ? `विभाग ब: लोणची व खमंग चटण्या (${selectedPickles.length}/२ निवडले)` 
                      : `Category B: Lonche & Chutneys (Select ${selectedPickles.length}/2)`}
                  </h3>
                  {selectedPickles.length === 2 && (
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> {lang === 'mr' ? 'जागा भरली' : 'Slot Filled'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AVAILABLE_ITEMS.pickles.map((item) => {
                    const isSelected = selectedPickles.some((p) => p.id === item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleItem('pickles', item)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#70BF4F] bg-[#F2F7F5] shadow-xs'
                            : selectedPickles.length >= 2
                            ? 'opacity-50 border-gray-200 bg-gray-50/50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {lang === 'mr' ? item.marathi : item.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {lang === 'mr' ? item.name : item.marathi}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100/80">
                          <span className="text-xs font-black text-gray-800">₹{item.price}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            isSelected ? 'bg-[#70BF4F] text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {isSelected ? (lang === 'mr' ? 'निवडले ✓' : 'Selected ✓') : (lang === 'mr' ? '+ जोडा' : '+ Add')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 3: Snacks & Sweets */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                    {lang === 'mr' 
                      ? `विभाग क: खमंग चिवडे व गोड पदार्थ (${selectedSnacks.length}/२ निवडले)` 
                      : `Category C: Snacks & Traditional Sweets (Select ${selectedSnacks.length}/2)`}
                  </h3>
                  {selectedSnacks.length === 2 && (
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> {lang === 'mr' ? 'जागा भरली' : 'Slot Filled'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AVAILABLE_ITEMS.snacks.map((item) => {
                    const isSelected = selectedSnacks.some((s) => s.id === item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleItem('snacks', item)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#70BF4F] bg-[#F2F7F5] shadow-xs'
                            : selectedSnacks.length >= 2
                            ? 'opacity-50 border-gray-200 bg-gray-50/50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {lang === 'mr' ? item.marathi : item.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {lang === 'mr' ? item.name : item.marathi}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100/80">
                          <span className="text-xs font-black text-gray-800">₹{item.price}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            isSelected ? 'bg-[#70BF4F] text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {isSelected ? (lang === 'mr' ? 'निवडले ✓' : 'Selected ✓') : (lang === 'mr' ? '+ जोडा' : '+ Add')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Step 3: Personalized Gift Card Note */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#70BF4F] text-white font-black text-sm flex items-center justify-center">3</span>
                <div>
                  <h2 className="text-lg font-black text-gray-900">
                    {lang === 'mr' ? 'टप्पा ३: मोफत शुभेच्छा पत्र व सदिच्छा संदेश जोडा' : 'Step 3: Add Personalized Handwritten Greeting Card'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {lang === 'mr' ? 'भेट बॉक्समध्ये नक्षीदार शुभेच्छा पत्र मोफत समाविष्ट केले जाईल' : 'Free embossed greeting card enclosed inside the box'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    {lang === 'mr' ? 'सण / प्रसंग' : 'Occasion / सण'}
                  </label>
                  <select
                    value={greeting.occasion}
                    onChange={(e) => setGreeting({ ...greeting, occasion: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800"
                  >
                    <option value="दिवाळी सण (Diwali Festival)">दिवाळी सण (Diwali Festival)</option>
                    <option value="गुढीपाडवा (Gudi Padwa)">गुढीपाडवा (Gudi Padwa)</option>
                    <option value="गणेशोत्सव (Ganeshotsav)">गणेशोत्सव (Ganeshotsav)</option>
                    <option value="गृहप्रवेश (Housewarming)">गृहप्रवेश (Housewarming)</option>
                    <option value="लग्नाची भेट (Wedding Gift)">लग्नाची भेट (Wedding Gift)</option>
                    <option value="Just Because / घरची चव">घरची चव / सस्नेह भेट</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    {lang === 'mr' ? 'कोणासाठी (प्रति / To)' : 'Recipient Name (To)'}
                  </label>
                  <input
                    type="text"
                    value={greeting.to}
                    onChange={(e) => setGreeting({ ...greeting, to: e.target.value })}
                    placeholder={lang === 'mr' ? 'उदा. आई-बाबा किंवा प्रिय मित्र' : 'e.g. Aai & Baba / Sharma Family'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  {lang === 'mr' ? 'सदिच्छा संदेश (मनातले शब्द)' : 'Personalized Message (मनातले शब्द)'}
                </label>
                <textarea
                  rows={2}
                  value={greeting.message}
                  onChange={(e) => setGreeting({ ...greeting, message: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-800"
                />
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  {lang === 'mr' ? 'कोणाकडून (आपला / From)' : 'Sender Signature (From)'}
                </label>
                <input
                  type="text"
                  value={greeting.from}
                  onChange={(e) => setGreeting({ ...greeting, from: e.target.value })}
                  placeholder={lang === 'mr' ? 'उदा. रोहन व जाधव परिवार' : 'e.g. With lots of love from Rohan & Family'}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Live Hamper Summary & Add to Cart Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-amber-500 via-[#70BF4F] to-orange-500" />

              <h2 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#70BF4F]" /> 
                {lang === 'mr' ? 'तुमचा सण भेट बॉक्स' : 'Your Custom Hamper'}
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                {lang === 'mr' ? selectedBox.marathi : selectedBox.title}
              </p>

              {/* 6 Visual Box Slots */}
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 mb-6">
                <div className="text-xs font-bold text-gray-700 mb-2.5 flex items-center justify-between">
                  <span>
                    {lang === 'mr' 
                      ? `बॉक्समधील जागा (${[...selectedMasalas, ...selectedPickles, ...selectedSnacks].length}/६)` 
                      : `Box Slots (${[...selectedMasalas, ...selectedPickles, ...selectedSnacks].length}/6)`}
                  </span>
                  {isComplete ? (
                    <span className="text-green-600 text-[11px] font-black">
                      {lang === 'mr' ? 'पेक करण्यासाठी सज्ज! 🎁' : 'Ready to Pack! 🎁'}
                    </span>
                  ) : (
                    <span className="text-amber-600 text-[11px] font-black">
                      {lang === 'mr' ? 'सर्व ६ जागा भरा' : 'Fill all 6 slots'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[...selectedMasalas, ...selectedPickles, ...selectedSnacks].map((item, idx) => (
                    <div key={idx} className="bg-white p-1.5 rounded-xl border border-gray-200 text-center relative group">
                      <img src={item.image} alt={item.name} className="w-full aspect-square rounded-lg object-cover mb-1" />
                      <p className="text-[10px] font-bold text-gray-800 truncate">
                        {lang === 'mr' ? item.marathi.split(' ')[0] : item.name.split(' ')[0]}
                      </p>
                      <span className="text-[9px] font-black text-green-700">₹{item.price}</span>
                    </div>
                  ))}

                  {Array.from({ length: Math.max(0, 6 - [...selectedMasalas, ...selectedPickles, ...selectedSnacks].length) }).map((_, i) => (
                    <div key={`empty_${i}`} className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-3 text-gray-400">
                      <Plus className="w-4 h-4 mb-1 text-gray-300" />
                      <span className="text-[9px] font-bold">{lang === 'mr' ? `जागा ${i + 1}` : `Slot ${i + 1}`}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-sm mb-6 pt-2 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>{lang === 'mr' ? '६ अस्सल पदार्थांचे एकूण' : '6 Authentic Items Total'}</span>
                  <span className="font-bold text-gray-900">₹{rawTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{lang === 'mr' ? 'भेट पेटी व रिबीन' : 'Premium Gift Box & Ribbon'}</span>
                  <span className="font-bold text-green-600">
                    <span className="line-through text-gray-400 mr-1.5">₹{selectedBox.boxValue}</span> 
                    {lang === 'mr' ? 'मोफत' : 'FREE'}
                  </span>
                </div>
                <div className="flex justify-between text-green-700 font-bold bg-green-50 p-2 rounded-xl">
                  <span>{lang === 'mr' ? 'हॅम्पर्स १५% विशेष सवलत' : 'Custom Hamper 15% Discount'}</span>
                  <span>-₹{discountAmount}</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-gray-200">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      {lang === 'mr' ? 'एकूण सवलत मूल्य' : 'Total Festive Bundle'}
                    </span>
                    <span className="text-2xl font-black text-gray-900">₹{finalPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-amber-600 block">
                      🪙 {lang === 'mr' ? `मिळतील ${Math.floor(finalPrice * 0.05)} स्वाद नाणी` : `Earns ${Math.floor(finalPrice * 0.05)} Swad Coins`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddHamperToCart}
                disabled={!isComplete}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  isComplete
                    ? 'bg-[#70BF4F] hover:bg-[#5da341] text-white shadow-[#70BF4F]/30 scale-[1.02]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {isComplete 
                  ? (lang === 'mr' ? 'संपूर्ण हॅम्पर कार्टमध्ये जोडा' : 'Add Complete Hamper to Cart') 
                  : (lang === 'mr' ? `अजून ${6 - [...selectedMasalas, ...selectedPickles, ...selectedSnacks].length} पदार्थ निवडा` : `Select ${6 - [...selectedMasalas, ...selectedPickles, ...selectedSnacks].length} More Items`)}
              </button>

              <div className="mt-4 text-center">
                <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#70BF4F]" />
                  {lang === 'mr' ? 'FSSAI प्रमाणित व ताजे तयार करून पाठवले जाते' : 'FSSAI Verified & Freshly Packed Before Dispatch'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
