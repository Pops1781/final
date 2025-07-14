import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './cartStore';

interface FavoritesStore {
  favorites: CartItem[];
  addToFavorites: (item: CartItem) => void;
  removeFromFavorites: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (item) => {
        const exists = get().favorites.some(fav => fav.id === item.id);
        if (!exists) {
          set((state) => ({ favorites: [...state.favorites, item] }));
        }
      },
      removeFromFavorites: (id) =>
        set((state) => ({ favorites: state.favorites.filter(fav => fav.id !== id) })),
    }),
    { name: 'favorites-storage' }
  )
); 