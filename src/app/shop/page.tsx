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
    <div className="py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Collection</h1>
          <p className="text-gray-500 text-lg">Premium organic dry fruits and certified gemstones.</p>
        </div>

        <form className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              name="q"
              defaultValue={query}
              placeholder="Search products..." 
              className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none w-full sm:w-64 bg-white"
            />
          </div>
          
          <select 
            name="category"
            defaultValue={category}
            className="px-6 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-medium text-gray-700"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button type="submit" className="bg-amber-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-800 transition active:scale-95 shadow-sm">
            Filter
          </button>
        </form>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-xl">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
