'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { ShoppingBag, Package, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      fetch(`/api/orders?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        });
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return <div className="py-24 text-center">Loading your orders...</div>;
  }

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Package className="w-8 h-8" /> My Orders
      </h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-6">You haven&apos;t placed any orders yet.</p>
          <Link href="/shop" className="bg-amber-700 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-800 transition">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4 bg-gray-50/50">
                <div className="flex gap-8">
                  <div>
                    <div className="text-xs uppercase text-gray-400 font-bold mb-1">Order Placed</div>
                    <div className="text-sm font-medium">{format(new Date(order.createdAt), 'MMM d, yyyy')}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-gray-400 font-bold mb-1">Total</div>
                    <div className="text-sm font-bold">₹{order.totalAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-gray-400 font-bold mb-1">Order ID</div>
                    <div className="text-sm font-mono text-gray-500">{order.id.slice(-8).toUpperCase()}</div>
                  </div>
                </div>
                <div>
                   <StatusBadge status={order.status} />
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center font-bold text-amber-700 border border-gray-100">
                        {item.quantity}x
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-500">₹{item.price.toLocaleString()} per unit</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-xs uppercase text-gray-400 font-bold mb-2">Shipping To</div>
                  <div className="text-sm text-gray-600">{order.shippingAddress}</div>
                </div>
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
  let Icon = Clock;
  
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
    case 'cancelled': 
      colorClass = "bg-red-100 text-red-800"; 
      Icon = XCircle;
      break;
  }
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${colorClass}`}>
      <Icon className="w-4 h-4" /> {status}
    </span>
  );
}
