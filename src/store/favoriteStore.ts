import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteStore {
  favorites: string[]; // array of productIds
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (productId) => set((state) => {
        if (state.favorites.includes(productId)) {
          return { favorites: state.favorites.filter((id) => id !== productId) };
        }
        return { favorites: [...state.favorites, productId] };
      }),
      isFavorite: (productId) => get().favorites.includes(productId),
    }),
    {
      name: 'favorite-storage',
    }
  )
);
