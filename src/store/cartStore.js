import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, variant, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.variant.id === variant.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.variant.id === variant.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, variant, quantity }] };
        });
      },
      removeFromCart: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variant.id !== variantId),
        }));
      },
      updateQuantity: (variantId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((i) =>
            i.variant.id === variantId ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      
      // Selectors
      cartTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.variant.prices?.[0]?.amount || 0;
          return total + (price / 100) * item.quantity;
        }, 0);
      },
      cartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'naikfoods-cart',
    }
  )
);
