'use client';

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { loginWithGoogle, logout } from "@/lib/firebase";
import { ShoppingCart, Heart, LogOut, Package, Gem, Menu, X } from "lucide-react";
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
    <header className="bg-white border-b border-gray-100 h-20 flex items-center sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Gem className="h-8 w-8 text-amber-700" />
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Indo-Aura
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-10 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-amber-700 transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-amber-700 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-amber-700 transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/favorites" className="p-2 text-gray-600 hover:text-amber-700 transition-colors">
            <Heart className="h-6 w-6" />
          </Link>
          <Link href="/cart" className="p-2 text-gray-600 hover:text-amber-700 transition-colors relative">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/orders" className="text-sm font-medium text-gray-700 hover:text-amber-700">
                {user.displayName?.split(' ')[0]}
              </Link>
              <button onClick={() => logout()} className="text-gray-400 hover:text-red-600 transition-colors" title="Logout">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin} 
              className="bg-amber-700 text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-amber-800 transition-all shadow-sm active:scale-95"
            >
              Login
            </button>
          )}

          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 space-y-4 z-50">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Home</Link>
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Shop</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 rounded-lg">About</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Contact</Link>
          {role === 'admin' && (
            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 font-medium text-amber-700 hover:bg-gray-50 rounded-lg">Admin Panel</Link>
          )}
        </div>
      )}
    </header>
  );
}
