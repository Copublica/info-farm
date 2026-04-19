'use client';

import React from "react";
import Link from "next/link";
import { Gem, ArrowUpRight, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand and Mission */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-white">
                <Gem className="w-5 h-5" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-gray-900 group-hover:text-amber-700 transition-colors">
                INDO<span className="text-amber-700">AURA</span>
              </span>
            </Link>
            <p className="text-gray-500 font-serif italic text-lg leading-relaxed mb-8">
              &quot;Curating the finest organic harvests and celestial artifacts for the discerning seeker.&quot;
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-amber-700 hover:text-amber-700 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-amber-700 hover:text-amber-700 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-amber-700 hover:text-amber-700 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Maison Links */}
          <div>
            <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-gray-900 mb-8">The Maison</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-amber-700 transition-colors flex items-center gap-2 group">
                  Our Story <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-gray-500 hover:text-amber-700 transition-colors flex items-center gap-2 group">
                  Collections <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-amber-700 transition-colors flex items-center gap-2 group">
                  Concierge <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-amber-700 transition-colors flex items-center gap-2 group">
                  T&C <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutique Details */}
          <div>
            <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-gray-900 mb-8">Boutique</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-amber-700 shrink-0" />
                <span className="text-sm text-gray-500 leading-relaxed">
                  108 Astral Gardens,<br />
                  Wellness Ridge, Himalayan Valleys
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-amber-700 shrink-0" />
                <span className="text-sm text-gray-500">+91 108 555 0123</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-amber-700 shrink-0" />
                <span className="text-sm text-gray-500 italic">concierge@indoaura.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-gray-900 mb-8">Monthly Digest</h3>
            <p className="text-sm text-gray-500 mb-6 font-light">Join our circle for seasonal harvests and celestial insights.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-gray-50 border-none rounded-full px-6 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 focus:outline-none placeholder:text-gray-400 font-light"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 bottom-2 bg-gray-900 text-white px-6 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-amber-700 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            © 2026 Indo-Aura Maison. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] text-gray-400 uppercase tracking-widest font-medium hover:text-amber-700 transition-colors">Privacy Policy</Link>
            <Link href="/shipping" className="text-[10px] text-gray-400 uppercase tracking-widest font-medium hover:text-amber-700 transition-colors">Shipping & Returns</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Provenance: </span>
            <div className="w-4 h-4 rounded-full bg-amber-500 shadow-sm shadow-amber-900/20" />
            <span className="text-[10px] text-amber-700 uppercase tracking-widest font-bold">Himalayas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
