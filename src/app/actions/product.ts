'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addProduct(data: {
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  rating?: number;
  reviewCount?: number;
}) {
  try {
    const product = await prisma.product.create({
      data: {
        ...data,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
      }
    });
    revalidatePath('/shop');
    revalidatePath('/');
    return product;
  } catch (err) {
    console.error("Prisma Add Product Error:", err);
    throw err;
  }
}

export async function seedProducts() {
  const products = [
    // Lucky Stones (Gemstones)
    {
      name: 'Natural Blue Sapphire (Neelam)',
      description: 'A premium quality Ceylon Blue Sapphire known for its deep blue hue and exceptional clarity. Highly valued in Vedic astrology for Saturn (Shani) alignment.',
      price: 15500,
      category: 'Luck Stone',
      imageUrl: 'https://images.unsplash.com/photo-1617117832624-9b63a2366b59?auto=format&fit=crop&q=80&w=800',
      stock: 5,
      rating: 4.8,
      reviewCount: 12
    },
    {
      name: 'Natural Yellow Sapphire (Pukhraj)',
      description: 'Transparent and bright yellow sapphire. Recommended for those seeking wisdom, wealth, and spiritual growth, associated with Jupiter (Guru).',
      price: 12800,
      category: 'Luck Stone',
      imageUrl: 'https://images.unsplash.com/photo-1596558450268-9c27524965c4?auto=format&fit=crop&q=80&w=800',
      stock: 8,
      rating: 4.9,
      reviewCount: 24
    },
    {
      name: 'Colombian Emerald (Panna)',
      description: 'Exquisite vivid green emerald with fine inclusions. Used for Mercury (Budh) to enhance communication, intellect, and business success.',
      price: 9500,
      category: 'Luck Stone',
      imageUrl: 'https://images.unsplash.com/photo-1626497748470-09708c1a9f11?auto=format&fit=crop&q=80&w=800',
      stock: 6,
      rating: 4.7,
      reviewCount: 15
    },
    {
      name: 'Red Coral (Moonga)',
      description: 'Natural Italian Red Coral in a smooth triangular shape. Used for Mars (Mangal) to boost energy, courage, and vitality.',
      price: 4500,
      category: 'Luck Stone',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      stock: 20,
      rating: 4.6,
      reviewCount: 18
    },
    {
      name: 'Ruby (Manik)',
      description: 'Natural African Ruby with a rich pigeon-blood red color. Symbolizes the Sun (Surya) and promotes leadership, vigor, and authority.',
      price: 11000,
      category: 'Luck Stone',
      imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=800',
      stock: 7,
      rating: 4.8,
      reviewCount: 9
    },
    {
      name: 'Hessonite (Gomed)',
      description: 'Honey-colored Gomed stone, carefully cut for maximum brilliance. Used to neutralize the ill-effects of Rahu and bring mental peace.',
      price: 3200,
      category: 'Luck Stone',
      imageUrl: 'https://images.unsplash.com/photo-1551300721-653da9a24449?auto=format&fit=crop&q=80&w=800',
      stock: 15,
      rating: 4.5,
      reviewCount: 11
    },

    // Dry Fruits
    {
      name: 'Premium Californian Almonds',
      description: 'Large, crunchy Californian almonds, rich in Vitamin E and antioxidants. Perfect for a healthy daily snack.',
      price: 850,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=800',
      stock: 100,
      rating: 4.9,
      reviewCount: 56
    },
    {
      name: 'Kashmiri Jumbo Walnuts',
      description: 'Shelled walnut halves from the valleys of Kashmir. High in Omega-3 fatty acids, excellent for brain health.',
      price: 1200,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1589113331627-6f6eb8eeedf3?auto=format&fit=crop&q=80&w=800',
      stock: 50,
      rating: 4.8,
      reviewCount: 42
    },
    {
      name: 'Iranian Pistachios (Roasted & Salted)',
      description: 'Lightly salted and perfectly roasted Iranian pistachios. A delightful snack packed with protein and fiber.',
      price: 980,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1551021430-bf8b0fcc6837?auto=format&fit=crop&q=80&w=800',
      stock: 80,
      rating: 4.7,
      reviewCount: 38
    },
    {
      name: 'Organic Cashew Nuts (W240)',
      description: 'Premium whole white cashews, W240 grade. Creamy texture and sweet flavor, sourced from the finest estates.',
      price: 750,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1558293842-c0fd3db86157?auto=format&fit=crop&q=80&w=800',
      stock: 120,
      rating: 4.8,
      reviewCount: 29
    },
    {
      name: 'Medjool Dates',
      description: 'Large, soft, and naturally sweet Medjool dates. Known as the "King of Dates," they are full of natural energy.',
      price: 1400,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&q=80&w=800',
      stock: 40,
      rating: 4.9,
      reviewCount: 65
    },
    {
      name: 'Dried Afghan Figs (Anjeer)',
      description: 'Premium quality sun-dried figs from Afghanistan. High in iron and fiber, great for digestion and energy.',
      price: 1100,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1628151536767-f6556f8f5539?auto=format&fit=crop&q=80&w=800',
      stock: 60,
      rating: 4.6,
      reviewCount: 22
    },
    {
      name: 'Turkish Dried Apricots',
      description: 'Soft and fleshy dried apricots from Malatya, Turkey. Excellent source of Vitamin A and potassium.',
      price: 650,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1596708053420-5695029e06f8?auto=format&fit=crop&q=80&w=800',
      stock: 90,
      rating: 4.5,
      reviewCount: 19
    },
    {
      name: 'Green Raisins (Kishmish)',
      description: 'Long and sweet green raisins, naturally dried. Perfect for adding to desserts or eating as a quick snack.',
      price: 450,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1599307767316-776533aa529d?auto=format&fit=crop&q=80&w=800',
      stock: 150,
      rating: 4.7,
      reviewCount: 31
    },
    {
      name: 'Dried Cranberry (Whole)',
      description: 'Tangy and sweet whole dried cranberries. Great for topping salads, cereals, or yogurt.',
      price: 900,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1584447128309-b66b7a4d1b63?auto=format&fit=crop&q=80&w=800',
      stock: 70,
      rating: 4.8,
      reviewCount: 27
    },
    {
      name: 'Brazil Nuts',
      description: 'Large, earthy Brazil nuts, exceptionally high in Selenium. Supports metabolic health and thyroid function.',
      price: 1800,
      category: 'Dry Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1543325603-997195d5225c?auto=format&fit=crop&q=80&w=800',
      stock: 35,
      rating: 4.6,
      reviewCount: 14
    }
  ];

  try {
    const existingCount = await prisma.product.count();
    if (existingCount > 0) return { message: 'Products already exist. Skipping seed.' };

    for (const product of products) {
      await prisma.product.create({ data: product });
    }
    revalidatePath('/shop');
    revalidatePath('/');
    return { success: true, count: products.length };
  } catch (err) {
    console.error("Seed Action Error:", err);
    throw err;
  }
}
