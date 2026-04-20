'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Gem } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  imageUrl?: string | null;
  stock: number;
  rating?: number;
  reviewCount?: number;
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const favorited = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
    >
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-white p-4">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
            <Gem className="w-12 h-12" />
          </div>
        )}
        <button 
          onClick={handleToggleFav}
          className={cn(
            "absolute top-4 right-4 p-2.5 rounded-full shadow-md transition-all duration-300",
            favorited ? "bg-white text-red-500" : "bg-white/80 text-gray-400 hover:text-red-500"
          )}
        >
          <Heart className={cn("w-5 h-5", favorited && "fill-current")} />
        </button>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-1.5 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-gray-700">{product.rating?.toFixed(1) || '4.5'}</span>
          <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
        </div>
        
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-amber-700 transition-colors h-14">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm font-semibold text-amber-600 mb-4">{product.category}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-orange-50 text-orange-600 p-3 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-sm"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
