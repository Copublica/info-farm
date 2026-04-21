'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/lib/AuthContext';
import { signIn } from 'next-auth/react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      signIn('google');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-12 h-12 text-amber-700" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any products to your cart yet.</p>
        <Link href="/shop" className="bg-amber-700 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ShoppingBag className="w-8 h-8" /> Shopping Cart
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div 
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 border border-gray-100 shadow-sm"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <Link href={`/product/${item.productId}`} className="font-semibold text-lg hover:text-amber-700 transition">
                    {item.name}
                  </Link>
                  <div className="text-gray-500 mt-1">${item.price.toLocaleString()}</div>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                    className="p-1 hover:bg-white rounded transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="p-1 hover:bg-white rounded transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="w-24 text-right font-bold">
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
                
                <button 
                  onClick={() => removeItem(item.productId)}
                  className="p-2 text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-amber-700 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-gray-900">${getTotal().toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-amber-700 text-white py-4 rounded-xl items-center justify-center font-bold text-lg hover:bg-amber-800 transition flex gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-4">
              Secure payments powered by Indo-Farms Checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
