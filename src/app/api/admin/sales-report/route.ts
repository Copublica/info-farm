import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: {
          notIn: ['cancelled', 'pending'] // Only count successful orders
        }
      },
      select: {
        items: true,
        createdAt: true,
        totalAmount: true,
      }
    });

    // Aggregate sales per product
    const productSales: Record<string, any> = {};

    orders.forEach(order => {
      const items = Array.isArray(order.items) ? order.items : [];

      items.forEach((item: any) => {
        const productId = item.productId || item.id;
        const productName = item.name;

        if (!productId || !productName) return;

        if (!productSales[productId]) {
          productSales[productId] = {
            productId,
            productName,
            totalQuantitySold: 0,
            totalRevenue: 0,
            orderCount: 0,
          };
        }

        const qty = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;

        productSales[productId].totalQuantitySold += qty;
        productSales[productId].totalRevenue += qty * price;
        productSales[productId].orderCount += 1;
      });
    });

    // Convert to array and sort by quantity sold (highest first)
    const salesReport = Object.values(productSales).sort(
      (a: any, b: any) => b.totalQuantitySold - a.totalQuantitySold
    );

    return NextResponse.json({
      totalOrders: orders.length,
      totalProductsSold: salesReport.length,
      report: salesReport,
    });
  } catch (err) {
    console.error('Sales Report Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}