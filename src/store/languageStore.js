import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLanguageStore = create(
  persist(
    (set, get) => ({
      lang: 'en', // 'en' | 'mr'
      toggleLanguage: () => {
        set({ lang: get().lang === 'en' ? 'mr' : 'en' });
      },
      setLanguage: (lang) => set({ lang }),
      t: (key) => {
        const translations = {
          // Navigation
          home: { en: 'Home', mr: 'मुख्यपृष्ठ' },
          shop: { en: 'Shop', mr: 'खरेदी करा' },
          buildHamper: { en: 'Build Hamper', mr: 'भेट बॉक्स बनवा' },
          hamperBadge: { en: '15% Off 🎁', mr: '१५% सूट 🎁' },
          about: { en: 'About', mr: 'आमच्याबद्दल' },
          blogs: { en: 'Blogs', mr: 'पाककृती व लेख' },
          contact: { en: 'Contact', mr: 'संपर्क' },
          searchPlaceholder: { en: 'Search products...', mr: 'पदार्थ किंवा मसाला शोधा...' },
          coinsLabel: { en: 'Coins', mr: 'नाणी' },
          
          // Header / Top Announcement
          freeShippingBanner: { 
            en: '🚚 Free Delivery on orders above ₹499 across Maharashtra!', 
            mr: '🚚 संपूर्ण महाराष्ट्रात ₹४९९ वरील ऑर्डरवर मोफत होम डिलिव्हरी!' 
          },
          heritageCallout: {
            en: 'Pure Maharashtrian Taste Since 1935',
            mr: '१९३५ पासूनचा अस्सल मराठमोळा स्वाद'
          }
        };
        const currentLang = get().lang || 'en';
        return translations[key]?.[currentLang] || translations[key]?.en || key;
      }
    }),
    {
      name: 'naikfoods-language-storage',
    }
  )
);
