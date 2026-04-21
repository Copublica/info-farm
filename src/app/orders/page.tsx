// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/lib/AuthContext';
// import { Package, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';
// import Link from 'next/link';
// import { format } from 'date-fns';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import img from '@/app/banner.png';

// export default function OrdersPage() {
//   const { user, loading: authLoading } = useAuth();
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push('/');
//       return;
//     }

//     if (user) {
//       fetch(`/api/orders?userId=${user.id}`)
//         .then(res => res.json())
//         .then(data => setOrders(data))
//         .catch(err => console.error(err))
//         .finally(() => setLoading(false));
//     }
//   }, [user, authLoading, router]);
//   console.log(orders);
  
//   if (authLoading || loading) return <div className="py-24 text-center">Loading your orders...</div>;

//   return (
//     <div className="py-8 max-w-5xl mx-auto px-4">
//       <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
//         <Package className="w-8 h-8" /> My Orders
//       </h1>

//       {orders.length === 0 ? (
//         <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
//           <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//           <p className="text-gray-500 mb-6">You haven&apos;t placed any orders yet.</p>
//           <Link href="/shop" className="bg-amber-700 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-800 transition">
//             Start Shopping
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               {/* Header */}
//               <div className="p-6 border-b bg-gray-50/70 flex flex-wrap justify-between items-center gap-6">
//                 <div className="flex flex-wrap gap-8">
//                   <div>
//                     <div className="text-xs uppercase tracking-widest text-gray-500">Order Placed</div>
//                     <div className="font-medium">{format(new Date(order.createdAt), 'MMM d, yyyy')}</div>
//                   </div>
//                   <div>
//                     <div className="text-xs uppercase tracking-widest text-gray-500">Total</div>
//                     <div className="font-bold text-lg">₹{order.totalAmount?.toLocaleString('en-IN')}</div>
//                   </div>
//                   <div>
//                     <div className="text-xs uppercase tracking-widest text-gray-500">Order ID</div>
//                     <div className="font-mono text-sm text-gray-600">{order.id.slice(-8).toUpperCase()}</div>
//                   </div>
//                 </div>
//                 <StatusBadge status={order.status} />
//               </div>

//               {/* Items */}
//               <div className="p-6 space-y-6">
//                 {order.items?.map((item: any, idx: number) => (
//                   <div key={idx} className="flex gap-5">
//                     <Link href={`/product/${item.productId || item.id}`} className="block flex-shrink-0">
//                       <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 hover:scale-105 transition">
//                         <Image
//                           src={item.imageUrl || '/placeholder-product.jpg'}
//                           alt={item.name}
//                           width={96}
//                           height={96}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </Link>

//                     <div className="flex-1">
//                       <Link href={`/product/${item.productId || item.id}`} className="font-semibold text-lg leading-tight hover:text-amber-700">
//                         {item.name}
//                       </Link>
//                       <div className="mt-1 text-gray-600">
//                         ₹{item.price?.toLocaleString('en-IN')} × {item.quantity}
//                       </div>
//                       <div className="font-medium mt-1">
//                         Subtotal: ₹{((item.price || 0) * item.quantity).toLocaleString('en-IN')}
//                       </div>
//                     </div>

//                     <div className="text-right self-center font-medium text-gray-700">
//                       {item.quantity}x
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Shipping */}
//               <div className="p-6 border-t bg-gray-50">
//                 <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Shipping To</div>
//                 <div className="text-gray-700 whitespace-pre-wrap">{order.shippingAddress}</div>
//                 {order.whatsappNo && <div className="text-sm mt-2">WhatsApp: {order.whatsappNo}</div>}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const statusConfig: any = {
//     pending: { color: "yellow", icon: Clock },
//     payment_link_sent: { color: "orange", icon: Clock },
//     confirmed_payment: { color: "green", icon: CheckCircle },
//     processing: { color: "blue", icon: Package },
//     shipped: { color: "purple", icon: Truck },
//     delivered: { color: "emerald", icon: CheckCircle },
//     cancelled: { color: "red", icon: XCircle },
//   };

//   const config = statusConfig[status?.toLowerCase()] || { color: "gray", icon: Clock };
//   const Icon = config.icon;

//   return (
//     <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-${config.color}-100 text-${config.color}-700`}>
//       <Icon className="w-4 h-4" />
//       {status.replace('_', ' ')}
//     </span>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Package, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ORDER_STEPS = [
  { key: 'pending', label: 'Pending' },
  { key: 'payment_link_sent', label: 'Payment Sent' },
  { key: 'confirmed_payment', label: 'Paid' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

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
        .then(data => setOrders(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return <div className="py-24 text-center">Loading your orders...</div>;
  }

  return (
    <div className="py-8 max-w-5xl mx-auto px-4">
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
          {orders.map((order) => {
            const currentStepIndex = ORDER_STEPS.findIndex(step => step.key === order.status);
            const isCancelled = order.status === 'cancelled';

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                
                {/* Compact Header */}
                <div className="p-5 border-b bg-gray-50 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <span className="text-gray-500 text-xs block">ORDER PLACED</span>
                      {format(new Date(order.createdAt), 'MMM d, yyyy')}
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs block">TOTAL</span>
                      <span className="font-bold">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs block">ORDER ID</span>
                      <span className="font-mono text-gray-600">{order.id.slice(-8).toUpperCase()}</span>
                    </div>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Compact Status Progress Bar */}
                {!isCancelled && (
                  <div className="px-5 py-4 border-b bg-white">
                    <div className="flex items-center justify-between relative">
                      {ORDER_STEPS.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                          <React.Fragment key={step.key}>
                            <div className="flex flex-col items-center z-10">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                                ${isCompleted ? 'bg-green-600 text-white' : 
                                  isCurrent ? 'bg-amber-600 text-white ring-2 ring-amber-200' : 
                                  'bg-gray-200 text-gray-400'}`}>
                                {isCompleted ? '✓' : index + 1}
                              </div>
                              <span className={`text-[10px] mt-1.5 font-medium text-center leading-tight
                                ${isCurrent ? 'text-amber-700' : isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                                {step.label}
                              </span>
                            </div>

                            {index < ORDER_STEPS.length - 1 && (
                              <div className="flex-1 h-0.5 bg-gray-200 mx-2 mt-3">
                                <div 
                                  className="h-full bg-green-600 transition-all"
                                  style={{ width: isCompleted ? '100%' : isCurrent ? '40%' : '0%' }}
                                />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cancelled Banner */}
                {isCancelled && (
                  <div className="px-5 py-3 bg-red-50 border-b flex items-center gap-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">Order Cancelled</span>
                  </div>
                )}

                {/* Order Items - Compact */}
                <div className="p-5 space-y-5">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <Link href={`/product/${item.productId || item.id}`} className="block flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 hover:scale-105 transition">
                          <Image
                            src={item.imageUrl || "https://placehold.co/400x400/eee/666?text=Product"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/400x400/eee/666?text=Product";
                            }}
                          />
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.productId || item.id}`} className="font-medium leading-tight hover:text-amber-700 line-clamp-2">
                          {item.name}
                        </Link>
                        <div className="text-sm text-gray-600 mt-1">
                          ₹{item.price?.toLocaleString('en-IN')} × {item.quantity}
                        </div>
                        <div className="font-medium text-sm">
                          Subtotal: ₹{((item.price || 0) * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="self-center text-right font-medium text-gray-700">
                        {item.quantity}x
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Info */}
                <div className="p-5 border-t bg-gray-50 text-sm">
                  <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">SHIPPING TO</div>
                  <div className="text-gray-700 whitespace-pre-wrap">{order.shippingAddress}</div>
                  {order.whatsappNo && (
                    <div className="mt-2 text-gray-600">WhatsApp: {order.whatsappNo}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    pending: { color: "yellow", icon: Clock },
    payment_link_sent: { color: "orange", icon: Clock },
    confirmed_payment: { color: "green", icon: CheckCircle },
    processing: { color: "blue", icon: Package },
    shipped: { color: "purple", icon: Truck },
    delivered: { color: "emerald", icon: CheckCircle },
    cancelled: { color: "red", icon: XCircle },
  };

  const config = statusConfig[status?.toLowerCase()] || { color: "gray", icon: Clock };
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-${config.color}-100 text-${config.color}-700`}>
      <Icon className="w-4 h-4" />
      {status.replace('_', ' ')}
    </span>
  );
}