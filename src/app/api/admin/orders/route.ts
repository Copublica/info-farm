// import { prisma } from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const orders = await prisma.order.findMany({
//       orderBy: { createdAt: 'desc' }
//     });
//     return NextResponse.json(orders);
//   } catch (err) {
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}