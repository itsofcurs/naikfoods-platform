import React from 'react';
import { Coins, Sparkles, X, Gift, ArrowUpRight, ArrowDownRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSwadCoinsStore } from '../store/swadCoinsStore';
import { useLanguageStore } from '../store/languageStore';

export default function SwadCoinsModal({ isOpen, onClose }) {
  const { coins, history, getTier } = useSwadCoinsStore();
  const { t, lang } = useLanguageStore();
  const tier = getTier();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-amber-200 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Royal Marigold / Gold Gradient */}
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-200 font-bold text-xs uppercase tracking-wider mb-1">
            <Coins className="w-4 h-4" /> {lang === 'mr' ? 'नाईक स्वाद रिवॉर्ड्स क्लब' : 'Naik Swad Rewards Club'}
          </div>
          
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-sm text-amber-100 font-medium">
                {lang === 'mr' ? 'तुमची स्वाद नाणी शिल्लक' : 'Your Swad Coins Balance'}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-black tracking-tight">{coins}</span>
                <span className="text-amber-200 font-bold text-sm">
                  {lang === 'mr' ? `नाणी (₹${coins})` : `Coins (₹${coins})`}
                </span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 text-right">
              <span className="text-xs font-bold block">{lang === 'mr' ? tier.marathiName : tier.name}</span>
              <span className="text-[10px] text-amber-200 block">{lang === 'mr' ? tier.name : tier.marathiName}</span>
            </div>
          </div>

          <p className="text-xs text-amber-100/90 mt-3 flex items-center gap-1.5 bg-black/15 px-3 py-1.5 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            {lang === 'mr' ? '१ स्वाद नाणे = चेकआउटवर ₹१ थेट रोख सूट!' : '1 Swad Coin = ₹1 Direct Cash Discount at Checkout!'}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Tier Perk Banner */}
          <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                {lang === 'mr' ? 'सध्याच्या स्तराचे फायदे' : 'Current Tier Perks'}
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-full">{tier.marathiName}</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{tier.perk}</p>
            
            {tier.nextTier && (
              <div className="mt-3 pt-3 border-t border-amber-200/60">
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                  <span>{lang === 'mr' ? `पुढील स्तर: ${tier.nextTier}` : `Next: ${tier.nextTier}`}</span>
                  <span className="text-amber-700">
                    {lang === 'mr' ? `${tier.coinsNeeded} नाणी आवश्यक` : `${tier.coinsNeeded} coins to unlock`}
                  </span>
                </div>
                <div className="w-full bg-amber-200/50 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-amber-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(10, ((600 - tier.coinsNeeded) / 600) * 100))}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* How to Earn */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3">
              {lang === 'mr' ? 'अधिक स्वाद नाणी कशी मिळवावी' : 'How to Earn More Swad Coins'}
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl border border-gray-100 bg-gray-50/70 flex flex-col justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#70BF4F]/10 text-[#70BF4F] flex items-center justify-center mb-2">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{lang === 'mr' ? 'खरेदी करा' : 'Shop Any Product'}</p>
                  <p className="text-[11px] text-gray-500">{lang === 'mr' ? 'प्रत्येक ऑर्डरवर ५% परतावा' : 'Earn 5% back on every order'}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 bg-gray-50/70 flex flex-col justify-between">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{lang === 'mr' ? 'अभिप्राय नोंदवा' : 'Write a Review'}</p>
                  <p className="text-[11px] text-gray-500">{lang === 'mr' ? 'फोटो अभिप्रायावर +२५ नाणी' : 'Get +25 Coins per photo review'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coin History */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3">
              {lang === 'mr' ? 'व्यवहार इतिहास' : 'Activity History'}
            </h4>
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.type === 'credit' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-xs">{item.title}</p>
                      <p className="text-[10px] text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <span className={`font-black text-xs ${
                    item.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.type === 'credit' ? `+${item.coins}` : `-${item.coins}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <button
            onClick={onClose}
            className="w-full bg-[#70BF4F] hover:bg-[#5da341] text-white font-bold py-2.5 rounded-xl transition-all shadow-md cursor-pointer text-sm"
          >
            {lang === 'mr' ? 'समजले, खरेदी सुरू करूया! 🌶️' : "Got it, Let's Shop & Earn! 🌶️"}
          </button>
        </div>
      </div>
    </div>
  );
}
