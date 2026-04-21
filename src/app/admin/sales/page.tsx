'use client';

import React, { useEffect, useState } from 'react';
import { Package, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface ProductSale {
  productId: string;
  productName: string;
  totalQuantitySold: number;
  totalRevenue: number;
  orderCount: number;
}

export default function SalesReportPage() {
  const [report, setReport] = useState<ProductSale[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/sales-report')
      .then(res => res.json())
      .then(data => {
        setReport(data.report || []);
        setTotalOrders(data.totalOrders || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading sales report...</div>;
  }

  const totalRevenue = report.reduce((sum, item) => sum + item.totalRevenue, 0);
  const totalUnitsSold = report.reduce((sum, item) => sum + item.totalQuantitySold, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="w-8 h-8" /> Sales Report
          </h1>
          <p className="text-gray-500 mt-1">Products sold by quantity & revenue</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Orders Processed</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-4">
            <Package className="w-10 h-10 text-amber-600" />
            <div>
              <p className="text-sm text-gray-500">Total Units Sold</p>
              <p className="text-3xl font-bold">{totalUnitsSold}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-4">
            <DollarSign className="w-10 h-10 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-3xl font-bold">${totalRevenue.toLocaleString('en-US')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Unique Products Sold</p>
              <p className="text-3xl font-bold">{report.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold text-lg">Product Performance</h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-6 py-4 font-medium">Product Name</th>
              <th className="text-center px-6 py-4 font-medium">Units Sold</th>
              <th className="text-center px-6 py-4 font-medium">Orders</th>
              <th className="text-right px-6 py-4 font-medium">Revenue</th>
              <th className="text-right px-6 py-4 font-medium">Avg. per Order</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {report.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-5 font-medium">{item.productName}</td>
                <td className="px-6 py-5 text-center font-semibold text-lg">
                  {item.totalQuantitySold}
                </td>
                <td className="px-6 py-5 text-center text-gray-600">
                  {item.orderCount}
                </td>
                <td className="px-6 py-5 text-right font-bold">
                  ${item.totalRevenue.toLocaleString('en-US')}
                </td>
                <td className="px-6 py-5 text-right text-gray-500">
                  ${item.orderCount > 0 
                    ? Math.round(item.totalRevenue / item.orderCount).toLocaleString('en-US') 
                    : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {report.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No sales data available yet.
          </div>
        )}
      </div>
    </div>
  );
}