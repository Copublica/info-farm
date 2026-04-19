import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { CheckCircle, Truck, Package, XCircle, ChevronDown } from 'lucide-react';

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Manage Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Cutomer Info</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status & Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 align-top">
                <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="mb-2 max-w-xs line-clamp-2 text-xs text-gray-500 font-mono break-all">{order.userId}</div>
                  <div className="max-w-xs">{order.shippingAddress}</div>
                  <div className="mt-2 text-xs">
                    <span className="font-semibold">Items: </span>
                    {order.items.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">₹{order.totalAmount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 p-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <StatusBadge status={order.status} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      colorClass = "bg-green-100 text-green-800"; 
      Icon = CheckCircle;
      break;
    case 'cancelled': 
      colorClass = "bg-red-100 text-red-800"; 
      Icon = XCircle;
      break;
  }
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${colorClass}`}>
      <Icon className="w-3.5 h-3.5" /> {status}
    </span>
  );
}
