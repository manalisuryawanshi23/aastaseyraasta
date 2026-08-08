import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { FavoritesService } from '../services/favorites';

interface FavoriteButtonProps {
  id: string;
  type: 'pooja' | 'tour';
  variant?: 'icon' | 'button' | 'badge';
  className?: string;
  showLabel?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  type,
  variant = 'icon',
  className = '',
  showLabel = false,
}) => {
  const [isFav, setIsFav] = useState(() => FavoritesService.isFavorite(id));
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    const checkFav = () => {
      setIsFav(FavoritesService.isFavorite(id));
    };

    window.addEventListener('favorites-updated', checkFav);
    return () => window.removeEventListener('favorites-updated', checkFav);
  }, [id]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newFav = FavoritesService.toggleFavorite(id, type);
    setIsFav(newFav);
    setIsAnimate(true);

    setTimeout(() => setIsAnimate(false), 300);
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        type="button"
        title={isFav ? 'Remove from Saved' : 'Save to Favorites'}
        className={`px-4 py-2.5 rounded-xl border font-medium text-xs flex items-center justify-center gap-2 transition-all ${
          isFav
            ? 'bg-red-50 dark:bg-red-950/80 border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 shadow-sm'
            : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
        } ${className}`}
      >
        <Heart
          className={`w-4 h-4 transition-transform duration-300 ${
            isFav
              ? 'fill-red-500 text-red-500'
              : 'text-stone-500 dark:text-stone-400'
          } ${isAnimate ? 'scale-125' : 'scale-100'}`}
        />
        <span>{isFav ? 'Saved' : 'Save Item'}</span>
      </button>
    );
  }

  if (variant === 'badge') {
    return (
      <button
        onClick={handleToggle}
        type="button"
        title={isFav ? 'Remove from Saved' : 'Save to Favorites'}
        className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
          isFav
            ? 'bg-red-500 text-white border-red-600 shadow-sm'
            : 'bg-stone-900/70 backdrop-blur-md text-white border-white/20 hover:bg-stone-900/90'
        } ${className}`}
      >
        <Heart
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isFav ? 'fill-white text-white' : 'text-white'
          } ${isAnimate ? 'scale-125' : 'scale-100'}`}
        />
        {showLabel && <span>{isFav ? 'Saved' : 'Save'}</span>}
      </button>
    );
  }

  // Default Icon-only mode (ideal for top-right of cards)
  return (
    <button
      onClick={handleToggle}
      type="button"
      title={isFav ? 'Remove from Saved' : 'Save to Favorites'}
      className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md flex items-center justify-center ${
        isFav
          ? 'bg-white/90 dark:bg-stone-900/90 text-red-500 hover:bg-white'
          : 'bg-stone-900/60 text-white hover:bg-stone-900/80 hover:text-red-400'
      } ${className}`}
    >
      <Heart
        className={`w-4 h-4 transition-transform duration-300 ${
          isFav ? 'fill-red-500 text-red-500' : ''
        } ${isAnimate ? 'scale-130' : 'scale-100'}`}
      />
    </button>
  );
};
