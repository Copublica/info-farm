'use client';

import React, { useEffect, useState } from 'react';
import { Package, Clock, Truck, CheckCircle, XCircle, X } from 'lucide-react';
import { format } from 'date-fns';

interface OrderItem {
  id?: string;
  name: string;
  quantity: number;
  price?: number;
  // add any other fields you store in items
}

interface Order {
  id: string;
  userId: string;
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: string;
  whatsappNo?: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const handleSendPaymentLink = (order: Order) => {
    const message = `Hello! Regarding your order ${order.id.slice(-8).toUpperCase()} at Indo-Farms.%0A%0AOrder details:%0A${order.items
      .map((item) => `- ${item.name} (x${item.quantity})`)
      .join('%0A')}%0A%0ATotal Amount: $${order.totalAmount}%0A%0APlease complete your payment using this link: [ADD PAYMENT LINK HERE]%0A%0AThank you!`;

    const phone = order.whatsappNo ? order.whatsappNo.replace(/[^0-9]/g, '') : '';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      payment_link_sent: 'bg-blue-100 text-blue-800',
      confirmed_payment: 'bg-purple-100 text-purple-800',
      processing: 'bg-indigo-100 text-indigo-800',
      shipped: 'bg-orange-100 text-orange-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="p-8">Loading orders...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Order ID</th>
              <th className="px-6 py-4 text-left font-medium">Customer</th>
              <th className="px-6 py-4 text-left font-medium">WhatsApp</th>
              <th className="px-6 py-4 text-left font-medium">Total</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <td className="px-6 py-4 font-mono text-xs text-gray-500">
                  {order.id.toUpperCase().slice(0, 12)}...
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{order.user?.name || 'N/A'}</p>
                    <p className="text-xs text-gray-500">{order.user?.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-600">
                  {order.whatsappNo || 'N/A'}
                </td>
                <td className="px-6 py-4 font-bold text-lg">
                  ${order.totalAmount.toLocaleString()}
                </td>

                {/* Status Dropdown - FIXED */}
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
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

                {/* Actions Column */}
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendPaymentLink(order);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition"
                    >
                      Send Payment Link
                    </button>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {format(new Date(order.createdAt), 'MMM d, HH:mm')}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==================== DETAILS MODAL ==================== */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-8 py-5">
              <div>
                <h2 className="text-2xl font-bold">Order Details</h2>
                <p className="text-gray-500 font-mono text-sm mt-1">
                  {selectedOrder.id.toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-auto flex-1 p-8 space-y-8">
              {/* User Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5" /> Customer Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedOrder.user?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedOrder.user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <p className="font-medium">{selectedOrder.whatsappNo || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-mono text-xs">{selectedOrder.userId}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">Product</th>
                        <th className="px-6 py-3 text-center">Qty</th>
                        <th className="px-6 py-3 text-right">Price</th>
                        <th className="px-6 py-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{item.name}</td>
                          <td className="px-6 py-4 text-center">{item.quantity}</td>
                          <td className="px-6 py-4 text-right">
                            ${item.price?.toFixed(2) || '—'}
                          </td>
                          <td className="px-6 py-4 text-right font-medium">
                            ${((item.price || 0) * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Shipping & Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Shipping Address</h3>
                  <div className="bg-gray-50 p-6 rounded-xl whitespace-pre-wrap">
                    {selectedOrder.shippingAddress}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
                  <div className="space-y-3 bg-gray-50 p-6 rounded-xl">
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="font-semibold">Total Amount</span>
                      <span className="font-bold text-xl">
                        ${selectedOrder.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Created</span>
                      <span>{format(new Date(selectedOrder.createdAt), 'PPpp')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t p-6 flex gap-4">
              <button
                onClick={() => handleSendPaymentLink(selectedOrder)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Send Payment Link via WhatsApp
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}