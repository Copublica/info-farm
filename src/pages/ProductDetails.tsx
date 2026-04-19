import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { Product } from '../components/ui/ProductCard';
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  const addItem = useCartStore(state => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  useEffect(() => {
    if (!id) return;
    
    async function fetchProduct() {
      try {
        const docRef = doc(db, 'products', id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        }

        const q = query(collection(db, 'reviews'), where('productId', '==', id));
        const reviewSnap = await getDocs(q);
        setReviews(reviewSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review)));

      } catch (err) {
        console.error("Error fetching product details", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
      });
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id) {
       alert("Please login to submit a review");
       return;
    }
    setSubmittingReview(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        productId: id,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        rating: reviewRating,
        comment: reviewText,
        createdAt: serverTimestamp()
      });
      setReviewText('');
      setReviewRating(5);
      // refetch manually or optimistic update
      setReviews([...reviews, {
        id: Math.random().toString(),
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        rating: reviewRating,
        comment: reviewText,
        createdAt: new Date(),
      }]);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'reviews');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <div className="py-24 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="py-24 text-center">Product not found.</div>;
  }

  return (
    <div className="py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm p-4 sm:p-8 flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-2">
            <span className="text-amber-700 bg-amber-50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-5 h-5", i < (product.rating || 0) ? "fill-yellow-400" : "fill-gray-200 text-gray-200")} />
              ))}
            </div>
            <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>
          </div>
          
          <div className="text-4xl font-bold text-gray-900 mb-6">
            ₹{product.price.toLocaleString()}
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {product.description || "No description available for this product."}
          </p>
          
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-700 mb-2">Availability</p>
            {product.stock > 0 ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex-1 bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFavorite(product.id)}
              className="p-4 rounded-full border border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center bg-white"
            >
              <Heart className={cn("w-6 h-6", isFavorite(product.id) && "fill-red-500 text-red-500")} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-4">Customer Reviews</h2>
        
        {user ? (
          <form onSubmit={handleSubmitReview} className="mb-12 bg-gray-50 p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">Write a review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select 
                value={reviewRating} 
                onChange={e => setReviewRating(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-md bg-white w-32"
              >
                {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
              <textarea 
                required
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500  focus:outline-none"
                rows={4}
                placeholder="Share your experience with this product..."
              />
            </div>
            <button 
              disabled={submittingReview}
              type="submit" 
              className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              {submittingReview ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <div className="mb-12 p-6 bg-amber-50 rounded-2xl text-amber-800">
             Please login to leave a review for this product.
          </div>
        )}

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="border-b border-gray-100 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{review.userName}</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-yellow-400" : "fill-gray-200 text-gray-200")} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
