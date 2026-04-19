'use client';

import React from 'react';

export function ProductGallery({ imageUrl }: { imageUrl?: string | null }) {
  return (
    <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 sticky top-24">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="Product" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
      )}
    </div>
  );
}
