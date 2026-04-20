import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Star, ShoppingCart, ShieldCheck, Award, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductActions } from '@/components/product/ProductActions';
import { ReviewForm } from '@/components/product/ReviewForm';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      reviews: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2">
           <ProductGallery imageUrl={product.imageUrl} />
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-2">
            <span className="text-amber-700 bg-amber-50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-2 font-bold text-lg">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500">{product.reviewCount} reviews</span>
          </div>
          
          <div className="text-3xl font-bold text-gray-900 mb-6">${product.price.toLocaleString()}</div>
          
          <div className="prose prose-sm text-gray-600 mb-8 whitespace-pre-line">
            {product.description}
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Authenticity Certified & Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Award className="w-5 h-5 text-amber-600" />
              <span>100% Organic & Ethically Sourced</span>
            </div>
          </div>
          
          <ProductActions product={product as any} />
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-16 pt-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <MessageSquare className="w-6 h-6" /> Customer Reviews
        </h2>
        
        <ReviewForm productId={product.id} />
        
        <div className="space-y-8 mt-12">
          {product.reviews.length > 0 ? (
            product.reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">
                      {review.userName[0]}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{review.userName}</div>
                      <div className="text-xs text-gray-400">{format(new Date(review.createdAt), 'MMM d, yyyy')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 border border-dashed border-gray-200 rounded-2xl">
              No reviews yet. Be the first to share your experience!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
