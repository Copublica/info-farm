'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
  };

  const hasStock = product.stock > 0;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <Link href={`/product/${product.id}`} className="block h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
          )}
          
          <button 
            onClick={handleFavorite}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-sm"
          >
            <Heart className={cn("w-5 h-5", isFavorite(product.id) && "fill-red-500 text-red-500")} />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating || '0.0'}</span>
            <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
          </div>
          
          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          
          <div className="mt-1 flex items-center justify-between mb-4">
            <span className="text-sm text-amber-700 font-medium">{product.category}</span>
          </div>
          
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
            <button 
              onClick={handleAddToCart}
              disabled={!hasStock}
              className={cn(
                "p-2 rounded-full transition-colors",
                hasStock ? "bg-amber-100 text-amber-700 hover:bg-amber-600 hover:text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
