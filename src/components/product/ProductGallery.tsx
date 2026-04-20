'use client';

import React from 'react';

export function ProductGallery({ imageUrl }: { imageUrl?: string | null }) {
  return (
    <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 p-8 sticky top-24 shadow-sm">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="Product" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
      )}
    </div>
  );
}
