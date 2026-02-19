// store/useCartStore.ts
import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

 addToCart: (item) => {
  const existing = get().items.find((i) => i.id === item.id);
  if (existing) {
    set({
      items: get().items.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
          : i
      ),
    });
  } else {
    set({ items: [...get().items, { ...item, quantity: item.quantity ?? 1 }] });
  }
},

  removeFromCart: (id) =>
    set({ items: get().items.filter((i) => i.id !== id) }),

  updateQuantity: (id, quantity) =>
    set({
      items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }),

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));