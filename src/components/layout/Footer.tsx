'use client';

import React from "react";
import Link from "next/link";
import { Gem, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a111a] text-white pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Gem className="h-8 w-8 text-amber-500Group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-500 transition-colors">
                Indo-Farm
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              Premium quality dry fruits and authentic astrology lucky stones for a balanced life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Shop Now</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Customer Service</h3>
            <ul className="space-y-4">
              <li><Link href="/orders" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Track Order</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe for the latest offers on dry fruits and astrology insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-0 rounded-lg overflow-hidden border border-gray-700">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-gray-900 border-none px-4 py-3 text-sm focus:ring-0 placeholder:text-gray-500"
              />
              <button 
                type="submit" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-sm font-bold transition-all transition-colors uppercase"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>© 2026 Indo-Farm. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <Link href="/shipping" className="hover:text-amber-500 transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
