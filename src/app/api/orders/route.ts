import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// app/api/orders/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Enrich items with imageUrl from Product model (Best Effort)
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const items = Array.isArray(order.items) ? order.items : [];

        // Try to fetch real product images if imageUrl is missing
        const enrichedItems = await Promise.all(
          items.map(async (item: any) => {
            let imageUrl = item.imageUrl || item.image;

            // If no imageUrl in order item, try to fetch from Product table
            if (!imageUrl && item.productId) {
              const product = await prisma.product.findUnique({
                where: { id: item.productId },
                select: { imageUrl: true },
              });
              if (product?.imageUrl) {
                imageUrl = product.imageUrl;
              }
            }

            return {
              ...item,
              imageUrl: imageUrl || null,
            };
          })
        );

        return {
          ...order,
          items: enrichedItems,
          user: order.user,
        };
      })
    );

    return NextResponse.json(enrichedOrders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}