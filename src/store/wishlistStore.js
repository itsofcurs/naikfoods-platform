import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [
        {
          id: 'prod_goda_masala',
          title: 'Royal Maharashtrian Goda Masala (250g)',
          handle: 'goda-masala',
          thumbnail: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
          variants: [{ id: 'var_gm1', prices: [{ amount: 21000 }] }],
        },
        {
          id: 'prod_bakarwadi',
          title: 'Authentic Puneri Bakarwadi (400g)',
          handle: 'bakarwadi',
          thumbnail: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60',
          variants: [{ id: 'var_bw1', prices: [{ amount: 16000 }] }],
        }
      ],
      
      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.items.some((i) => i.id === product.id);
          if (exists) {
            return { items: state.items.filter((i) => i.id !== product.id) };
          } else {
            return { items: [...state.items, product] };
          }
        });
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.id === productId);
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }));
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'naikfoods-wishlist',
    }
  )
);
