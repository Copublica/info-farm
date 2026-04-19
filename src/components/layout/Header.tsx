'use client';

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { loginWithGoogle, logout } from "@/lib/firebase";
import { ShoppingCart, Heart, User as UserIcon, LogOut, Package, Gem, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function Header() {
  const { user, role } = useAuth();
  const cartItems = useCartStore((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-all">
          <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <Gem className="w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-semibold tracking-tight text-gray-900">
            INDO<span className="text-amber-700">AURA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/shop" className="text-gray-600 hover:text-amber-700 transition-colors uppercase tracking-widest text-[10px] sm:text-xs">Collection</Link>
          <Link href="/about" className="text-gray-600 hover:text-amber-700 transition-colors uppercase tracking-widest text-[10px] sm:text-xs">Our Story</Link>
          <Link href="/contact" className="text-gray-600 hover:text-amber-700 transition-colors uppercase tracking-widest text-[10px] sm:text-xs">Concierge</Link>
          {role === 'admin' && (
            <Link href="/admin" className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 transition-colors uppercase tracking-widest text-[10px] sm:text-xs font-bold">
              <Package className="w-3.5 h-3.5" /> Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/favorites" className="p-2.5 rounded-full hover:bg-gray-50 transition-colors text-gray-600 relative">
            <Heart className="w-5.5 h-5.5" />
          </Link>
          
          <Link href="/cart" className="p-2.5 rounded-full hover:bg-gray-50 transition-colors text-gray-600 relative group">
            <ShoppingCart className="w-5.5 h-5.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/orders" className="hidden sm:flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors text-gray-700 border border-gray-100">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <UserIcon className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="text-sm font-medium truncate max-w-[100px]">{user.displayName?.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={() => logout()}
                className="p-2.5 rounded-full hover:bg-red-50 hover:text-red-600 transition-all text-gray-400"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
            >
              Sign In
            </button>
          )}

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 space-y-2 z-50 shadow-xl animate-in slide-in-from-top duration-300">
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 rounded-lg text-sm uppercase tracking-widest">Browse Collection</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 rounded-lg text-sm uppercase tracking-widest">Our Story</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 rounded-lg text-sm uppercase tracking-widest">Contact Us</Link>
          {user && (
            <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 rounded-lg text-sm uppercase tracking-widest">My Orders</Link>
          )}
        </div>
      )}
    </header>
  );
}
