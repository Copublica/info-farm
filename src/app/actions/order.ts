'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function placeOrder(data: {
  userId: string;
  items: any[];
  totalAmount: number;
  shippingAddress: string;
  whatsappNo: string;
}) {
  try {
    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        items: data.items as any,
        totalAmount: data.totalAmount,
        shippingAddress: data.shippingAddress,
        whatsappNo: data.whatsappNo,
        status: 'pending',
        paymentId: 'MOCK_PAYMENT_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      }
    });
    
    revalidatePath('/orders');
    return order;
  } catch (err) {
    console.error("Prisma Order Error:", err);
    throw err;
  }
}
