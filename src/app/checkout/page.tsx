'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/lib/AuthContext';
import { placeOrder } from '@/app/actions/order';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/cart');
    }
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [user, authLoading, items, router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      await placeOrder({
        userId: user.id,
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotal(),
        shippingAddress: address,
        whatsappNo: whatsapp
      });

      clearCart();
      router.push('/orders');
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (authLoading || !user || items.length === 0) {
    return <div className="py-24 text-center">Redirecting...</div>;
  }

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <form onSubmit={handlePayment}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" value={user?.name || ''} readOnly className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 font-sans" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input
                required
                type="tel"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="e.g. +91 9876543210"
              />
              <p className="text-[10px] text-gray-400 mt-1">We will send the payment link to this number.</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
              <textarea
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="123 Wellness Blvd, Inner Peace District..."
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="p-6 border border-green-500 bg-green-50 rounded-2xl flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="mt-1 text-green-600 focus:ring-green-500 w-5 h-5"
                />
                <div>
                  <p className="font-semibold text-green-900">WhatsApp Order Confirmation</p>
                  <p className="text-sm text-green-700 mt-1">
                    We will send your purchase details and order updates directly on WhatsApp
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 text-sm border border-green-100">
                <div className="flex items-center gap-3 text-green-800">
                  <span className="text-xl">💬</span>
                  <div>
                    <p className="font-medium">You will receive:</p>
                    <ul className="text-xs text-green-700 mt-2 space-y-1">
                      <li>• Order confirmation with invoice</li>
                      <li>• Payment instructions (UPI / Bank Transfer)</li>
                      <li>• Shipping updates</li>
                      <li>• Delivery tracking link</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              No payment is taken here. We will contact you on WhatsApp to complete your purchase securely.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between font-bold text-xl mb-6">
              <span>Total to Pay</span>
              <span>${getTotal().toLocaleString()}</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-amber-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-800 transition disabled:opacity-70 flex justify-center"
            >
              {isProcessing ? 'Processing Payment...' : 'Place Order & Pay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
