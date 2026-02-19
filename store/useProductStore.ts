import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  price: string;
  timeToCook: string;
  quantityInStock: number;
}

interface ProductStore {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  closeProduct: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  closeProduct: () => set({ selectedProduct: null }),
}));