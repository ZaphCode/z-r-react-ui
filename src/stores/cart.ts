import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../models";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface Data {
  items: CartItem[];
  //prodsCounter: number;
}

interface Actions {
  addToCart(product: Product): void;
  removeFromTheCart(productID: string): void;
  removeSingleItem(productID: string): void;
  clearCart(): void;
}

export const useCartStore = create(
  persist<Data & Actions>(
    (set, get) => ({
      items: [],
      //prodsCounter: get().items.length,
      addToCart(product) {
        const existingCartItem = get().items.find(
          item => item.product.id === product.id
        );

        if (existingCartItem) {
          let newItems = get().items.map(item => {
            if (item.product.id === product.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });

          set({ ...get(), items: newItems });
        } else {
          set({ ...get(), items: [...get().items, { product, quantity: 1 }] });
        }
      },
      removeFromTheCart(productID) {
        let filteredItems = get().items.filter(
          item => item.product.id !== productID
        );
        set({ ...get(), items: filteredItems });
      },
      removeSingleItem(productID) {
        let editedItems = get()
          .items.map(item => {
            if (item.product.id === productID) {
              item.quantity--;
              if (item.quantity <= 0) return null;
              return item;
            }
            return item;
          })
          .filter(item => item);

        set({ ...get(), items: editedItems as CartItem[] });
      },
      clearCart() {
        set({ ...get(), items: [] });
      },
    }),
    {
      name: "cart-items",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
