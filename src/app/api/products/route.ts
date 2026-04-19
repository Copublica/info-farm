import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');

  try {
    if (idsParam) {
      const ids = idsParam.split(',');
      const products = await prisma.product.findMany({
        where: {
          id: { in: ids }
        }
      });
      return NextResponse.json(products);
    } else {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json(products);
    }
  } catch (err) {
    console.error("Prisma GET Products Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        ...body,
        rating: 0,
        reviewCount: 0
      }
    });
    return NextResponse.json(product);
  } catch (err) {
    console.error("Prisma POST Products Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
