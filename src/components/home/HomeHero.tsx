'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function HomeHero() {
  return (
    <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden rounded-[40px] mt-4 max-w-7xl mx-auto shadow-xl">
      <img 
        src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=2070&auto=format&fit=crop" 
        alt="Nourish Your Body" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 to-amber-900/20"></div>
      
      <div className="relative h-full flex flex-col items-start justify-center p-8 sm:p-20 max-w-2xl">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-7xl font-bold text-white leading-[1.1] mb-8"
        >
          Nourish Your Body, <br /> Align Your Stars
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed font-medium"
        >
          Direct access to premium organic dry fruits and certified authentic astrology gemstones from Info-farm.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 bg-white text-amber-950 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all text-lg shadow-lg"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
