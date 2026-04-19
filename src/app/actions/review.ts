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
    const review = await prisma.review.create({
      data: {
        productId: data.productId,
        userId: data.userId,
        userName: data.userName,
        rating: data.rating,
        comment: data.comment,
      }
    });

    // Update product rating
    const productReviews = await prisma.review.findMany({
      where: { productId: data.productId }
    });

    const avgRating = productReviews.reduce((acc, rev) => acc + rev.rating, 0) / productReviews.length;

    await prisma.product.update({
      where: { id: data.productId },
      data: {
        rating: avgRating,
        reviewCount: productReviews.length
      }
    });
    
    revalidatePath(`/product/${data.productId}`);
    return review;
  } catch (err) {
    console.error("Prisma Review Error:", err);
    throw err;
  }
}
