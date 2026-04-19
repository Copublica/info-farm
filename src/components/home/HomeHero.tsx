'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function HomeHero() {
  return (
    <section className="relative w-full h-[600px] bg-amber-900 rounded-3xl overflow-hidden mt-4 mx-auto max-w-7xl">
      <img 
        src="https://picsum.photos/seed/stones/1920/1080?blur=2" 
        alt="Dry Fruits & Gemstones" 
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-900/80 to-transparent"></div>
      <div className="relative h-full flex flex-col items-start justify-center p-8 sm:p-16 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-6"
        >
          Nourish Your Body, Align Your Stars
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-amber-100 mb-8 max-w-xl"
        >
          Direct access to premium organic dry fruits and certified authentic astrology gemstones from Indo-Aura.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/shop" className="inline-flex items-center gap-2 bg-white text-amber-900 px-8 py-4 rounded-full font-bold hover:bg-amber-50 transition-colors">
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
