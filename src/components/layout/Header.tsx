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

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-amber-800">
              <Gem className="h-8 w-8" />
              <span className="hidden sm:inline">Indo-Aura</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-amber-700 transition">Home</Link>
            <Link href="/shop" className="hover:text-amber-700 transition">Shop</Link>
            <Link href="/about" className="hover:text-amber-700 transition">About</Link>
            <Link href="/contact" className="hover:text-amber-700 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/favorites" className="p-2 text-gray-600 hover:text-red-500 transition relative">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="p-2 text-gray-600 hover:text-amber-700 transition relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-amber-700 transition">
                  <UserIcon className="h-5 w-5" />
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 hidden group-hover:block transition">
                  <div className="px-4 py-2 border-b border-gray-100 text-sm">
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-gray-500 text-xs truncate">{user.email}</p>
                  </div>
                  {role === 'admin' && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>
                  )}
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <Package className="w-4 h-4" /> My Orders
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={handleLogin} className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-amber-700 hover:bg-amber-800 transition">
                Login
              </button>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-gray-50">Home</Link>
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-gray-50">Shop</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-gray-50">About</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-gray-50">Contact</Link>
            {!user && (
              <button onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-amber-700 hover:bg-amber-50">
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
