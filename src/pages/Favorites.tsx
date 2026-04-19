import React, { useEffect, useState } from 'react';
import { useFavoriteStore } from '../store/favoriteStore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProductCard, Product } from '../components/ui/ProductCard';
import { Heart } from 'lucide-react';

export function Favorites() {
  const { favorites } = useFavoriteStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const fetched = [];
        for (const id of favorites) {
          const docRef = doc(db, 'products', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            fetched.push({ id: docSnap.id, ...docSnap.data() } as Product);
          }
        }
        setProducts(fetched);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFavorites();
  }, [favorites]);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl text-center border border-dashed border-gray-300">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">You haven't added any products to your favorites.</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(favorites.length)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 aspect-[3/4] rounded-2xl"></div>
          ))}
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
