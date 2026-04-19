import React from "react";
import Link from "next/link";
import { Gem } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-amber-400 mb-4">
              <Gem className="h-6 w-6" /> Indo-Aura
            </Link>
            <p className="text-gray-400 text-sm">
              Premium quality dry fruits and authentic astrology lucky stones for a balanced life.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-white transition">Shop Now</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/orders" className="hover:text-white transition">Track Order</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-2">Subscribe for the latest offers on dry fruits and astrology insights.</p>
            <div className="flex">
              <input type="email" placeholder="Email address" className="bg-gray-800 text-white px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm" />
              <button className="bg-amber-700 px-4 py-2 rounded-r-md text-sm font-medium hover:bg-amber-600 transition">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Indo-Aura E-Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
