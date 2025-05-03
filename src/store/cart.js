import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (i) => i.id === item.id && i.size === item.size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id && i.size === item.size
                  ? {
                      ...i,
                      quantity: i.quantity + 1,
                      total: (i.quantity + 1) * i.price,
                    }
                  : i
              ),
            };
          } else {
            return {
              cart: [
                ...state.cart,
                { ...item, quantity: 1, total: item.price },
              ],
            };
          }
        }),

      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),

      increaseQuantity: (id, size) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.size === size
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total: (item.quantity + 1) * item.price,
                }
              : item
          ),
        })),

      decreaseQuantity: (id, size) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id && item.size === size && item.quantity > 1
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    total: (item.quantity - 1) * item.price,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
