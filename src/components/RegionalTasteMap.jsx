import React, { useState } from 'react';
import { MapPin, Sparkles, Flame, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import SpiceMeter from './SpiceMeter';

const REGIONS = [
  {
    id: 'west-mh',
    name: 'Western Ghats & Kolhapur',
    marathi: 'पश्चिम महाराष्ट्र व कोल्हापूर',
    tagline: 'Bold, Garlicky & Deeply Roasted Spice Blends',
    description: 'The heartland of authentic Maharashtrian cuisine — famous for slow-roasted Goda Masala, fiery Kolhapuri Kanda Lasun, and Pune\'s world-famous Bakarwadi.',
    spiceLevel: 4,
    color: 'from-amber-600 to-red-600',
    badgeBg: 'bg-red-100 text-red-800 border-red-200',
    pairWith: 'Jowar Bhakri, Tambda-Pandhra Rassa, Katachi Amti',
    products: [
      {
        id: 'kolhapuri-kl',
        title: 'Kolhapuri Kanda Lasun Masala',
        marathi: 'कोल्हापुरी कांदा लसूण मसाला',
        price: 180,
        handle: 'kolhapuri-kanda-lasun-masala',
        weight: '250g',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 'goda-masala',
        title: 'Royal Maharashtrian Goda Masala',
        marathi: 'शाही गोडा मसाला (दगडफूल युक्त)',
        price: 210,
        handle: 'goda-masala',
        weight: '250g',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 'pune-bakarwadi',
        title: 'Authentic Puneri Bakarwadi',
        marathi: 'पुणेरी खमंग बाकरवडी',
        price: 160,
        handle: 'bakarwadi',
        weight: '400g',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    id: 'konkan',
    name: 'Konkan Coastal Belt',
    marathi: 'कोकण किनारपट्टी',
    tagline: 'Coconut, Tangy Kokum & Aromatic Malvani Heat',
    description: 'From Ratnagiri to Sindhudurg, coastal cooking celebrates freshly pounded Malvani spice mixtures, dried kokum souring agents, and sweet Alphonso mango pulps.',
    spiceLevel: 3,
    color: 'from-teal-600 to-emerald-700',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
    pairWith: 'Steamed Rice, Rice Bhakri, Solkadhi, Fried Fish',
    products: [
      {
        id: 'malvani-masala',
        title: 'Sindhudurg Malvani Masala',
        marathi: 'सिंधुदुर्ग मालवणी मसाला',
        price: 220,
        handle: 'malvani-masala',
        weight: '250g',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 'alphonso-amba-poli',
        title: 'Ratnagiri Alphonso Amba Poli',
        marathi: 'रत्नागिरी हापूस आंबा पोळी',
        price: 240,
        handle: 'amba-poli',
        weight: '200g',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 'raw-mango-pickle',
        title: 'Konkani Kairi Lonche (Raw Mango Pickle)',
        marathi: 'कोकणी कैरीचे लोणचे',
        price: 190,
        handle: 'mango-pickle',
        weight: '300g',
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810ef?w=500&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    id: 'vidarbha',
    name: 'Vidarbha & Nagpur',
    marathi: 'विदर्भ व नागपूर (सावजी स्वाद)',
    tagline: 'Uncompromising Zunka-Bhakri Heat & Fiery Tarri',
    description: 'Home to the legendary Saoji spicy heritage of Nagpur and Amravati — deeply infused with stone-ground whole spices, coriander seeds, and dry coconut.',
    spiceLevel: 5,
    color: 'from-red-700 to-rose-900',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    pairWith: 'Tarri Poha, Saoji Rassa, Hot Jowar Bhakri',
    products: [
      {
        id: 'saoji-masala',
        title: 'Nagpuri Saoji Garam Masala',
        marathi: 'नागपुरी सावजी गरम मसाला',
        price: 230,
        handle: 'saoji-masala',
        weight: '200g',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 'poha-chivda',
        title: 'Vidarbha Spiced Poha Chivda',
        marathi: 'विदर्भी खमंग पोहे चिवडा',
        price: 140,
        handle: 'poha-chivda',
        weight: '350g',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 'thecha-chutney',
        title: 'Kolhapuri-Nagpuri Mirchi Thecha',
        marathi: 'झणझणीत हिरवी मिरची ठेचा',
        price: 150,
        handle: 'mirchi-thecha',
        weight: '200g',
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810ef?w=500&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    id: 'khandesh',
    name: 'Khandesh & Tapi Valley',
    marathi: 'खान्देश (जळगाव - धुळे)',
    tagline: 'Smoky Khandeshi Kala Masala & Shev Bhaji Heritage',
    description: 'Khandesh is renowned for its intense dark roast Kala Masala with charred onions, black cardamom, and its universally loved spicy Shev Bhaji.',
    spiceLevel: 4,
    color: 'from-amber-800 to-yellow-900',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
    pairWith: 'Shev Bhaji, Khandeshi Dal Gandhori, Kalna Bhakri',
    products: [
      {
        id: 'kala-masala',
        title: 'Charred Khandeshi Kala Masala',
        marathi: 'खान्देशी काळा मसाला',
        price: 215,
        handle: 'khandeshi-kala-masala',
        weight: '250g',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 'shev-bhaji-masala',
        title: 'Special Dhule Shev Bhaji Masala',
        marathi: 'धुळे स्पेशल शेव भाजी मसाला',
        price: 195,
        handle: 'shev-bhaji-masala',
        weight: '200g',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
      },
    ]
  },
  {
    id: 'marathwada',
    name: 'Marathwada & Solapur',
    marathi: 'मराठवाडा व सोलापूर',
    tagline: 'Roasted Peanut Chutneys & Rustic Dry Blends',
    description: 'Famous for the celebrated Solapuri Shenga Chutney (Roasted peanut chutney with garlic and red chili) and rustic grain accompaniments.',
    spiceLevel: 3,
    color: 'from-orange-600 to-amber-700',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-200',
    pairWith: 'Hot Bajra Bhakri with Homemade White Butter (Loni)',
    products: [
      {
        id: 'shenga-chutney',
        title: 'Solapuri Shengdana Chutney (Peanut)',
        marathi: 'सोलापुरी शेंगदाणा चटणी',
        price: 140,
        handle: 'shengdana-chutney',
        weight: '200g',
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810ef?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 'jowar-bhakri-accompaniment',
        title: 'Dry Garlic Chutney (लसूण चटणी)',
        marathi: 'झणझणीत कोरडी लसूण चटणी',
        price: 130,
        handle: 'lasun-chutney',
        weight: '150g',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60',
      },
    ]
  }
];

export default function RegionalTasteMap() {
  const [selectedRegionId, setSelectedRegionId] = useState('west-mh');
  const [addedIds, setAddedIds] = useState({});
  const addToCart = useCartStore((state) => state.addToCart);

  const activeRegion = REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];

  const handleQuickAdd = (product) => {
    const mockProduct = {
      id: product.id,
      title: product.title,
      thumbnail: product.image,
      handle: product.handle,
    };
    const mockVariant = {
      id: `var_${product.id}`,
      title: product.weight,
      prices: [{ amount: product.price * 100 }],
    };

    addToCart(mockProduct, mockVariant, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-amber-50/40 to-white">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            स्वाद महाराष्ट्राचा • Culinary Geography of Maharashtra
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Taste of Maharashtra <span className="text-[#70BF4F]">Regional Explorer</span>
          </h2>
          <p className="mt-3 text-base text-gray-600">
            From the fiery Saoji curries of Vidarbha to the coconut-infused Malvani masalas of Konkan, explore the authentic regional culinary traditions preserved in Naik Foods recipes.
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {REGIONS.map((region) => {
            const isActive = region.id === selectedRegionId;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegionId(region.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-xs cursor-pointer ${
                  isActive
                    ? 'bg-[#1B261A] text-white shadow-lg scale-105 ring-2 ring-[#70BF4F]'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <MapPin className={`w-4 h-4 ${isActive ? 'text-[#70BF4F]' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="leading-tight">{region.name}</div>
                  <div className={`text-[10px] ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>{region.marathi}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Region Feature Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Info Panel */}
            <div className={`lg:col-span-5 bg-gradient-to-br ${activeRegion.color} p-8 text-white flex flex-col justify-between relative overflow-hidden`}>
              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <MapPin className="w-64 h-64 text-white" />
              </div>

              <div>
                <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
                  {activeRegion.marathi}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-2">{activeRegion.name}</h3>
                <p className="text-amber-200 font-semibold text-sm mb-4">{activeRegion.tagline}</p>
                <p className="text-white/90 text-sm leading-relaxed mb-6">{activeRegion.description}</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/20">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">Traditional Pairing</span>
                  <p className="text-sm font-bold text-amber-100 flex items-center gap-1.5">
                    🍲 {activeRegion.pairWith}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1.5">Regional Spice Profile</span>
                  <div className="bg-black/20 p-2.5 rounded-xl backdrop-blur-xs">
                    <SpiceMeter level={activeRegion.spiceLevel} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Products Showcase */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#FAFBF9]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg font-black text-gray-900">Featured Regional Specialties</h4>
                  <p className="text-xs text-gray-500">Pounded according to authentic traditional ratios</p>
                </div>
                <Link
                  to="/in/store"
                  className="text-xs font-bold text-[#70BF4F] hover:text-[#5ca83e] flex items-center gap-1 group"
                >
                  View All Products <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {activeRegion.products.map((item) => {
                  const isAdded = !!addedIds[item.id];
                  return (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3 relative">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                          <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {item.weight}
                          </span>
                        </div>
                        <h5 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">{item.title}</h5>
                        <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{item.marathi}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-base font-black text-gray-900">₹{item.price}</span>
                        <button
                          onClick={() => handleQuickAdd(item)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-green-600 text-white'
                              : 'bg-[#70BF4F] hover:bg-[#5ea73f] text-white shadow-xs'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Added
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
