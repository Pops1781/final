import { create } from 'zustand';
import { allProducts as staticProducts, Product } from '../constants/allProducts';

interface ProductStore {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductStore>((_set, get) => ({
  products: staticProducts,
  getProductById: (id: string) => {
    const { products } = get();
    return products.find(p => String(p.id) === id || String(p.id) === String(Number(id)));
  },
})); 