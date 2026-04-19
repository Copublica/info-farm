import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentId?: string;
  createdAt: any;
}

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    async function fetchOrders() {
      try {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrders();
  }, [user]);

  if (!user) {
    return <div className="py-24 text-center">Please login to view your orders.</div>;
  }

  if (loading) {
    return <div className="py-24 text-center">Loading orders...</div>;
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link to="/shop" className="bg-amber-700 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-800 transition">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-500 font-medium mb-1">
                    Order ID: <span className="font-mono text-gray-900">{order.id}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Placed on: {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Just now'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">₹{order.totalAmount.toLocaleString()}</div>
                  <StatusBadge status={order.status} />
                </div>
              </div>
              
              <div className="p-6">
                <ul className="divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="py-3 flex justify-between">
                      <div className="font-medium text-gray-900">
                        {item.name} <span className="text-gray-500 font-normal">x{item.quantity}</span>
                      </div>
                      <div className="text-gray-600">₹{(item.price * item.quantity).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let colorClass = "bg-gray-100 text-gray-800";
  let Icon = Package;
  
  switch(status.toLowerCase()) {
    case 'pending': colorClass = "bg-yellow-100 text-yellow-800"; break;
    case 'processing': colorClass = "bg-blue-100 text-blue-800"; break;
    case 'shipped': 
      colorClass = "bg-purple-100 text-purple-800"; 
      Icon = Truck;
      break;
    case 'delivered': 
      colorClass = "bg-amber-100 text-amber-800"; 
      Icon = CheckCircle;
      break;
    case 'cancelled': colorClass = "bg-red-100 text-red-800"; break;
  }
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize mt-1 ${colorClass}`}>
      <Icon className="w-3.5 h-3.5" /> {status}
    </span>
  );
}
