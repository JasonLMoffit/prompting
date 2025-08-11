import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      total: 0,
      itemCount: 0,
      guestId: null,

      // Actions
      addItem: (product, quantity = 1) => {
        console.log("addItem called with:", product, quantity);
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            // Update existing item quantity
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return {
              items: updatedItems,
              itemCount: state.itemCount + quantity,
              total: state.total + product.price * quantity,
            };
          } else {
            // Add new item
            const newItem = {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity,
              category: product.category,
            };
            return {
              items: [...state.items, newItem],
              itemCount: state.itemCount + quantity,
              total: state.total + product.price * quantity,
            };
          }
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const itemToRemove = state.items.find(
            (item) => item.id === productId
          );
          if (!itemToRemove) return state;

          return {
            items: state.items.filter((item) => item.id !== productId),
            itemCount: state.itemCount - itemToRemove.quantity,
            total: state.total - itemToRemove.price * itemToRemove.quantity,
          };
        });
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          const item = state.items.find((item) => item.id === productId);
          if (!item) return state;

          const quantityDiff = quantity - item.quantity;

          return {
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
            itemCount: state.itemCount + quantityDiff,
            total: state.total + item.price * quantityDiff,
          };
        });
      },

      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),

      // Guest user functions
      initializeGuestCart: () => {
        const guestId = `guest_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        set({ guestId });
        return guestId;
      },

      getGuestId: () => get().guestId,

      // Getters
      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.id === productId);
        return item ? item.quantity : 0;
      },

      isInCart: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

// Debug logging
console.log("Cart store created");
console.log("Cart store functions:", Object.keys(useCartStore.getState()));
