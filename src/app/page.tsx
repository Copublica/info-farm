import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ui/ProductCard';
import { ArrowRight, Globe, ShieldCheck, Truck } from 'lucide-react';
import { HomeHero } from '@/components/home/HomeHero';
import { seedProducts } from '@/app/actions/product';

export default async function HomePage() {
  let featuredProducts: any[] = [];
  try {
    featuredProducts = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' }
    });

    // Auto-seed if empty
    if (featuredProducts.length === 0) {
      await seedProducts();
      featuredProducts = await prisma.product.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' }
      });
    }
  } catch (err) {
    console.error("Error fetching featured products from Prisma:", err);
  }

  return (
    <div className="-mt-8">
      {/* Hero Section */}
      <HomeHero />

      {/* Features */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-50 group hover:shadow-xl transition-all">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
            <Truck className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Direct to your door, safely and quickly.</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-50 group hover:shadow-xl transition-all">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold mb-3">Certified Quality</h3>
          <p className="text-gray-500 text-sm leading-relaxed">100% authentic stones and premium organic nuts.</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-50 group hover:shadow-xl transition-all">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
            <Globe className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold mb-3">Global Shipping</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Delivering true wellness globally.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2 text-lg italic font-medium">Latest additions to our catalog.</p>
          </div>
          <Link href="/shop" className="text-orange-600 font-bold hover:underline flex items-center gap-2 group">
            View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-300">
            <p className="text-gray-500 text-xl font-medium">No products available. Admin needs to add products.</p>
          </div>
        )}
      </section>

      {/* Philosophy Placeholder */}
      <section className="py-24 bg-[#1a1a1a] rounded-[3rem] mx-4 mb-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-amber-500 font-display text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight italic">
            &quot;In every stone, a story. In every seed, a legacy of light and wellbeing.&quot;
          </h2>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mb-8" />
          <p className="text-gray-400 font-light text-lg mb-12">
            Indo-Aura was born from a pursuit of holistic vitality, bridging ancient Himalayan wisdom with modern lifestyle.
          </p>
          <Link href="/about" className="text-white font-display font-bold uppercase tracking-widest text-[10px] bg-white/5 border border-white/20 px-8 py-4 rounded-full hover:bg-white/10 transition-all">
            Read Our Story
          </Link>
        </div>
      </section>
    </div>
  );
}
