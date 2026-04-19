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

      {/* Features - Horizontal Grid */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col gap-6 group">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 transition-colors group-hover:bg-amber-700 group-hover:text-white">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-widest text-gray-900 mb-2">Pristine Delivery</h3>
              <p className="text-gray-500 font-serif italic text-lg leading-relaxed">Direct from the Himalayan valleys to your doorstep, with unmatched care and speed.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 group">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 transition-colors group-hover:bg-amber-700 group-hover:text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-widest text-gray-900 mb-2">Authentic Provenance</h3>
              <p className="text-gray-500 font-serif italic text-lg leading-relaxed">Every gemstone and organic nut is rigorously certified for authenticity and purity.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 group">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 transition-colors group-hover:bg-amber-700 group-hover:text-white">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-widest text-gray-900 mb-2">Ethical Sourcing</h3>
              <p className="text-gray-500 font-serif italic text-lg leading-relaxed">Supporting local artisans and farmers through sustainable and fair-trade practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-amber-700 font-display text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Seasonal Selection</span>
            <h2 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight">Curated <span className="italic">Treasures</span></h2>
            <p className="text-gray-500 mt-6 text-lg font-light leading-relaxed">A handpicked selection of our finest offerings, carefully assembled for the discerning seeker of wellness and alignment.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-gray-900 font-display font-bold uppercase tracking-widest text-[10px] border-b-2 border-amber-500 pb-1 hover:text-amber-700 transition-colors whitespace-nowrap">
            Explore All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-serif italic text-xl">The vaults are currently empty. Check back momentarily.</p>
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
