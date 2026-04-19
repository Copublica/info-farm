import React from 'react';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ui/ProductCard';
import { Search } from 'lucide-react';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const category = resolvedParams.category || '';

  const products = await prisma.product.findMany({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        category ? { category: category } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  const allProducts = await prisma.product.findMany({
    select: { category: true },
    distinct: ['category'],
  });
  const categories = allProducts.map(p => p.category);

  return (
    <div className="py-24 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span className="text-amber-700 font-display text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">The Collection</span>
          <h1 className="text-5xl md:text-6xl font-serif text-gray-900 tracking-tight">Curated <span className="italic">Essentials</span></h1>
          <p className="text-gray-500 mt-6 max-w-lg font-light leading-relaxed">Browse our carefully vetted collection of organic infusions and celestial gemstones.</p>
        </div>

        <form className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-amber-600 transition-colors" />
            <input 
              name="q"
              defaultValue={query}
              placeholder="Search..." 
              className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-full focus:ring-2 focus:ring-amber-500/20 focus:outline-none w-full sm:w-64 transition-all shadow-sm group-hover:border-amber-200"
            />
          </div>
          
          <select 
            name="category"
            defaultValue={category}
            className="px-8 py-4 bg-white border border-gray-100 rounded-full focus:ring-2 focus:ring-amber-500/20 focus:outline-none appearance-none cursor-pointer uppercase tracking-widest text-[10px] font-bold text-gray-700 shadow-sm"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button type="submit" className="bg-gray-900 text-white px-10 py-4 rounded-full font-display font-bold uppercase tracking-widest text-[10px] hover:bg-amber-700 transition-all shadow-lg active:scale-95">
            Refine
          </button>
        </form>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-100">
          <p className="text-gray-400 font-serif italic text-xl">Our artisans are currently preparing new treasures. Please return shortly.</p>
        </div>
      )}
    </div>
  );
}
