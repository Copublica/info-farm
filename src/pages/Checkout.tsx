import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../lib/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // If directly navigated without items
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotal(),
        status: 'pending',
        shippingAddress: address,
        paymentId: 'MOCK_PAYMENT_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        createdAt: serverTimestamp()
      });
      
      clearCart();
      navigate('/orders');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'orders');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <form onSubmit={handlePayment}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" value={user?.displayName || ''} readOnly className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500" />
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
            <div className="p-4 border border-amber-500 bg-amber-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="radio" checked readOnly className="text-amber-600 focus:ring-amber-500 w-4 h-4" />
                <span className="font-medium text-amber-900">Credit/Debit Card (Mock)</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                 <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center text-[8px] text-white font-bold">MC</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Note: This is a simulated checkout. No real payment will be taken.</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between font-bold text-xl mb-6">
              <span>Total to Pay</span>
              <span>₹{getTotal().toLocaleString()}</span>
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
