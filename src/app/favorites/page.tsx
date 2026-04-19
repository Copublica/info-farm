'use client';

import React, { useEffect, useState } from 'react';
import { useFavoriteStore } from '@/store/favoriteStore';
import { ProductCard } from '@/components/ui/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length > 0) {
      // In a real app, you'd fetch these from an API
      // For now, I'll fetch all and filter or just show a message
      fetch(`/api/products?ids=${favorites.join(',')}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [favorites]);

  if (loading) return <div className="py-24 text-center">Loading favorites...</div>;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Heart className="w-8 h-8 text-red-500 fill-red-500" /> My Favorites
      </h1>
      
      {favorites.length === 0 ? (
        <div className="bg-white p-24 rounded-2xl border border-dashed border-gray-300 text-center">
          <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-8">Save products you&apos;re interested in by clicking the heart icon.</p>
          <Link href="/shop" className="bg-amber-700 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 transition">
            Browse Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
