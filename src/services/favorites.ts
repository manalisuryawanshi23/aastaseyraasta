import { StoreService } from './store';
import { PoojaService, Tour } from '../types';

export interface FavoriteItem {
  id: string;
  type: 'pooja' | 'tour';
  addedAt: number;
}

const FAVORITES_KEY = 'aastha_favorites';

export class FavoritesService {
  static getFavorites(): FavoriteItem[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading favorites from localStorage:', e);
    }
    return [];
  }

  static isFavorite(id: string): boolean {
    const list = this.getFavorites();
    return list.some((item) => item.id === id);
  }

  static toggleFavorite(id: string, type: 'pooja' | 'tour'): boolean {
    const list = this.getFavorites();
    const index = list.findIndex((item) => item.id === id);
    let isAdded = false;

    if (index >= 0) {
      list.splice(index, 1);
      isAdded = false;
    } else {
      list.push({ id, type, addedAt: Date.now() });
      isAdded = true;
    }

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
      window.dispatchEvent(new Event('favorites-updated'));
    } catch (e) {
      console.error('Error saving favorites to localStorage:', e);
    }

    return isAdded;
  }

  static clearAll(): void {
    try {
      localStorage.removeItem(FAVORITES_KEY);
      window.dispatchEvent(new Event('favorites-updated'));
    } catch (e) {
      console.error('Error clearing favorites:', e);
    }
  }

  static getFavoritePoojas(): PoojaService[] {
    const favs = this.getFavorites().filter((f) => f.type === 'pooja');
    const allPoojas = StoreService.getPoojas();
    return allPoojas.filter((p) => favs.some((f) => f.id === p.id));
  }

  static getFavoriteTours(): Tour[] {
    const favs = this.getFavorites().filter((f) => f.type === 'tour');
    const allTours = StoreService.getTours();
    return allTours.filter((t) => favs.some((f) => f.id === t.id));
  }
}
