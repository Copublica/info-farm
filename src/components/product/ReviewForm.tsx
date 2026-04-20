'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { addReview } from '@/app/actions/review';

export function ReviewForm({ productId }: { productId: string }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await addReview({
        productId,
        userId: user.id,
        userName: user.name || 'Anonymous',
        rating,
        comment
      });
      setComment('');
      setRating(5);
      // In a real app, you'd use router.refresh() to see the new review
      window.location.reload(); 
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="mb-12 p-6 bg-amber-50 rounded-2xl text-amber-800">
         Please login to leave a review for this product.
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-12">
      <h3 className="text-xl font-bold mb-6">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hover || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            required
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none focus:border-transparent transition"
            placeholder="Share your thoughts on this product..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-700 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-800 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Post Review'}
        </button>
      </form>
    </div>
  );
}
