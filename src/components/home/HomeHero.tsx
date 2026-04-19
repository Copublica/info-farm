'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function HomeHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0d0d0d]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Dry Fruits" 
          className="w-full h-full object-cover opacity-50 scale-105 animate-pulse-slow object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 text-amber-500 font-display text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-8 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Est. 2026 — Pure Organic Wellness
            </div>
            
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif font-light text-white leading-[0.88] tracking-tighter mb-10">
              True <span className="italic font-normal">Essence</span> <br /> 
              of <span className="text-amber-500">Nature</span>
            </h1>
            
            <p className="text-gray-300 text-lg sm:text-2xl max-w-xl mb-14 font-light leading-relaxed">
              Experience a curated selection of premium organic dry fruits and certified gemstones, ethically sourced for your holistic journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                href="/shop" 
                className="bg-amber-600 text-white px-12 py-6 rounded-full font-display font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-amber-500 transition-all shadow-2xl shadow-amber-900/40 flex items-center justify-center gap-3 group active:scale-95"
              >
                Discover Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <Link 
                href="/about" 
                className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-12 py-6 rounded-full font-display font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-white/10 transition-all flex items-center justify-center active:scale-95"
              >
                Our Philosophy
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-12 bottom-12 hidden lg:flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-white font-serif italic text-2xl">Certified</span>
          <span className="text-amber-500/60 font-display text-[10px] uppercase tracking-widest">Natural Origin</span>
        </div>
        <div className="w-12 h-[1px] bg-amber-500/50" />
      </div>

      {/* Side rail text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-20">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
        <span className="writing-mode-vertical text-amber-500/20 font-display text-[9px] uppercase tracking-[0.6em] rotate-180 select-none">
          Handpicked • Ethical • Authentic
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
      </div>
    </section>
  );
}
