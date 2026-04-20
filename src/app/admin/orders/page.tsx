'use client';

import React, { useEffect, useState } from 'react';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await fetch('/api/admin/orders');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  };

  const handleSendPaymentLink = (order: any) => {
    const message = `Hello! Regarding your order ${order.id.slice(-8).toUpperCase()} at Indo-Farm.%0A%0AOrder details:%0A${order.items.map((item: any) => `- ${item.name} (x${item.quantity})`).join('%0A')}%0A%0ATotal Amount: $${order.totalAmount}%0A%0APlease complete your payment using this link: [ADD PAYMENT LINK HERE]%0A%0AThank you!`;
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Manage Orders</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Customer UID</th>
              <th className="px-6 py-3 font-medium">Total</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-xs text-gray-500">
                  {order.id.toUpperCase()}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {order.userId}
                </td>
                <td className="px-6 py-4 font-bold">
                  ${order.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="p-1 border border-gray-300 rounded text-xs focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="payment_link_sent">Payment Link Sent</option>
                    <option value="confirmed_payment">Confirmed Payment</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                  <button 
                    onClick={() => handleSendPaymentLink(order)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-[10px] font-bold uppercase transition"
                  >
                    Send Payment Link
                  </button>
                  <span className="text-xs text-gray-400">
                    {format(new Date(order.createdAt), 'MMM d, HH:mm')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
