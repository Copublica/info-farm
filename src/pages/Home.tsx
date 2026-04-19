import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProductCard, Product } from '../components/ui/ProductCard';
import { ArrowRight, Globe, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(4));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setFeaturedProducts(products);
      } catch (err) {
        console.error("Error fetching featured products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="-mt-8">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-amber-900 rounded-3xl overflow-hidden mt-4 mx-auto max-w-7xl">
        <img 
          src="https://picsum.photos/seed/stones/1920/1080?blur=2" 
          alt="Dry Fruits & Gemstones" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-900/80 to-transparent"></div>
        <div className="relative h-full flex flex-col items-start justify-center p-8 sm:p-16 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-6"
          >
            Nourish Your Body, Align Your Stars
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-amber-100 mb-8 max-w-xl"
          >
            Direct access to premium organic dry fruits and certified authentic astrology gemstones from Indo-Aura.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-amber-900 px-8 py-4 rounded-full font-bold hover:bg-amber-50 transition-colors">
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mb-4">
            <Truck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
          <p className="text-gray-500 text-sm">Direct to your door, safely and quickly.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold mb-2">Certified Quality</h3>
          <p className="text-gray-500 text-sm">100% authentic stones and premium organic nuts.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mb-4">
            <Globe className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold mb-2">Global Shipping</h3>
          <p className="text-gray-500 text-sm">Delivering true wellness globally.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Latest additions to our catalog.</p>
          </div>
          <Link to="/shop" className="text-amber-700 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 aspect-[3/4] rounded-2xl"></div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500">No products available. Admin needs to add products.</p>
          </div>
        )}
      </section>
    </div>
  );
}
