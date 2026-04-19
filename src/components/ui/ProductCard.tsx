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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100/50 shadow-sm hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500"
    >
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
            <Gem className="w-12 h-12 opacity-20" />
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button 
          onClick={handleToggleFav}
          className={cn(
            "absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 z-10",
            favorited 
              ? "bg-amber-600 text-white" 
              : "bg-white/80 text-gray-900 hover:bg-white pb-2"
          )}
        >
          <Heart className={cn("w-4.5 h-4.5", favorited && "fill-current")} />
        </button>
      </Link>

      <div className="p-6">
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-amber-700/60">
            {product.category}
          </span>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-xl font-serif text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Price</span>
            <span className="text-xl font-display font-semibold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-all duration-300 shadow-lg active:scale-95"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
