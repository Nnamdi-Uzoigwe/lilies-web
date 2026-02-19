// // store/useCartStore.ts
// import { create } from "zustand";

// interface CartItem {
//   id: string;
//   name: string;
//   image: string;
//   price: string;
//   quantity: number;
// }

// interface CartStore {
//   items: CartItem[];
//   addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
//   totalItems: () => number;
// }

// export const useCartStore = create<CartStore>((set, get) => ({
//   items: [],

//  addToCart: (item) => {
//   const existing = get().items.find((i) => i.id === item.id);
//   if (existing) {
//     set({
//       items: get().items.map((i) =>
//         i.id === item.id
//           ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
//           : i
//       ),
//     });
//   } else {
//     set({ items: [...get().items, { ...item, quantity: item.quantity ?? 1 }] });
//   }
// },

//   removeFromCart: (id) =>
//     set({ items: get().items.filter((i) => i.id !== id) }),

//   updateQuantity: (id, quantity) =>
//     set({
//       items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
//     }),

//   clearCart: () => set({ items: [] }),

//   totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
// }));



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
  hydrated: boolean;
  hydrateCart: () => Promise<void>;
  syncCart: (items: CartItem[]) => Promise<void>;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  hydrated: false,

  // call this on app load to pull cart from DB
  hydrateCart: async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    set({ items: data.items, hydrated: true });
  },

  // call this after any change to save to DB
  syncCart: async (items) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
  },

  addToCart: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    let newItems;
    if (existing) {
      newItems = get().items.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
          : i
      );
    } else {
      newItems = [...get().items, { ...item, quantity: item.quantity ?? 1 }];
    }
    set({ items: newItems });
    get().syncCart(newItems);
  },

  removeFromCart: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    set({ items: newItems });
    get().syncCart(newItems);
  },

  updateQuantity: (id, quantity) => {
    const newItems = get().items.map((i) => (i.id === id ? { ...i, quantity } : i));
    set({ items: newItems });
    get().syncCart(newItems);
  },

  clearCart: () => {
    set({ items: [] });
    get().syncCart([]);
  },

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));