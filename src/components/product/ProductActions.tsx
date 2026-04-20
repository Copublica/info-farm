'use client';

import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export function ProductActions({ product }: { product: any }) {
  const addItem = useCartStore(state => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const favorited = mounted && isFavorite(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  const handleFavorite = () => {
    toggleFavorite(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        className="flex-1 bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingCart className="w-5 h-5" /> Add to Cart
      </motion.button>
      
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={handleFavorite}
        className={cn(
          "px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition border-2",
          favorited 
            ? "border-red-500 text-red-500 bg-red-50" 
            : "border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500"
        )}
      >
        <Heart className={cn("w-5 h-5", favorited && "fill-red-500")} /> 
        {favorited ? 'Favorited' : 'Add to Favorites'}
      </motion.button>
    </div>
  );
}
