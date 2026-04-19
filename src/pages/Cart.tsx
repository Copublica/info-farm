import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export function Cart() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to checkout.");
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCartIcon className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/shop" className="bg-amber-700 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.productId} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/product/${item.productId}`} className="font-semibold text-lg hover:text-amber-700 transition">
                      {item.name}
                    </Link>
                    <div className="text-gray-500 mt-1">₹{item.price.toLocaleString()}</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-lg font-bold w-24 text-right">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.productId)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{getTotal().toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-amber-700 text-white py-4 rounded-xl items-center justify-center font-bold text-lg hover:bg-amber-800 transition flex gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
