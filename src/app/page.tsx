import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ui/ProductCard';
import { ArrowRight, Globe, ShieldCheck, Truck } from 'lucide-react';
import { HomeHero } from '@/components/home/HomeHero';

export default async function HomePage() {
  let featuredProducts: any[] = [];
  try {
    featuredProducts = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' }
    });
  } catch (err) {
    console.error("Error fetching featured products from Prisma:", err);
  }

  return (
    <div className="-mt-8">
      {/* Hero Section */}
      <HomeHero />

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
          <Link href="/shop" className="text-amber-700 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product as any} />
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
