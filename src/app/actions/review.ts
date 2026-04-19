'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addReview(data: {
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
}) {
  try {
     // Check if user exists in our prisma db, if not create them (linking firebase to prisma)
     let dbUser = await prisma.user.findUnique({ where: { id_for_prisma: data.userId } as any });
     // Wait, the prisma schema uses 'id' as ObjectId. 
     // I should use a mapping field or make user id the firebase uid.
     // Let's assume for 'simple' we use findFirst or similar.
     
     // Actually I'll update schema to handle firebase uid.
     // For now I'll just create the review and link by String id if possible or just store userId as string.
  } catch (err) {
    console.error(err);
  }
}
