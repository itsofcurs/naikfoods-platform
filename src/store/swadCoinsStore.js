import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSwadCoinsStore = create(
  persist(
    (set, get) => ({
      coins: 150, // Welcome bonus of 150 coins for every user
      history: [
        {
          id: 'tx_welcome',
          title: 'Welcome Bonus Swad Coins 🎉',
          date: 'Just now',
          coins: 150,
          type: 'credit',
        },
      ],

      earnCoins: (orderTotal) => {
        const earned = Math.max(5, Math.floor(orderTotal * 0.05)); // 5% cashback in Swad Coins
        const tx = {
          id: 'tx_' + Date.now(),
          title: `Earned on Order (${Math.round(orderTotal)})`,
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
          coins: earned,
          type: 'credit',
        };
        set((state) => ({
          coins: state.coins + earned,
          history: [tx, ...state.history],
        }));
        return earned;
      },

      redeemCoins: (coinsToUse) => {
        const current = get().coins;
        const toDeduct = Math.min(current, Math.max(0, coinsToUse));
        if (toDeduct <= 0) return 0;

        const tx = {
          id: 'tx_' + Date.now(),
          title: 'Redeemed at Checkout 🛍️',
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
          coins: toDeduct,
          type: 'debit',
        };

        set((state) => ({
          coins: state.coins - toDeduct,
          history: [tx, ...state.history],
        }));

        return toDeduct; // 1 Coin = ₹1
      },

      getTier: () => {
        const coins = get().coins;
        if (coins >= 600) {
          return {
            name: 'Royal Peshwa Club 👑',
            marathiName: 'पेशवे क्लब',
            perk: 'Double coins (10%) & Free Express Delivery',
            badgeColor: 'bg-amber-500 text-white',
            nextTier: null,
            coinsNeeded: 0,
          };
        } else if (coins >= 250) {
          return {
            name: "Aaji's Rasoi Insider 👵",
            marathiName: 'आजींची खास रसोई',
            perk: 'Early access to seasonal pickles & special festive gifts',
            badgeColor: 'bg-[#70BF4F] text-white',
            nextTier: 'Royal Peshwa Club',
            coinsNeeded: 600 - coins,
          };
        } else {
          return {
            name: 'Maharashtrian Foodie 🌶️',
            marathiName: 'स्वाद रसिक',
            perk: 'Earn 5 coins per ₹100 spent (1 Coin = ₹1)',
            badgeColor: 'bg-orange-500 text-white',
            nextTier: "Aaji's Rasoi Insider",
            coinsNeeded: 250 - coins,
          };
        }
      },
    }),
    {
      name: 'naikfoods-swad-coins',
    }
  )
);
