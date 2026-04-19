import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { loginWithGoogle, logout } from "../../lib/firebase";
import { ShoppingCart, Heart, User as UserIcon, LogOut, Package, Gem, Menu, X } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export function Layout() {
  const { user, role } = useAuth();
  const cartItems = useCartStore((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9] text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-amber-800">
                <Gem className="h-8 w-8" />
                <span className="hidden sm:inline">Indo-Aura</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-medium">
              <Link to="/" className="hover:text-amber-700 transition">Home</Link>
              <Link to="/shop" className="hover:text-amber-700 transition">Shop</Link>
              <Link to="/about" className="hover:text-amber-700 transition">About</Link>
              <Link to="/contact" className="hover:text-amber-700 transition">Contact</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/favorites" className="p-2 text-gray-600 hover:text-red-500 transition relative">
                <Heart className="h-5 w-5" />
              </Link>
              <Link to="/cart" className="p-2 text-gray-600 hover:text-amber-700 transition relative">
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
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>
                    )}
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
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
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-gray-50">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-gray-50">Shop</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-gray-50">About</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-gray-50">Contact</Link>
              {!user && (
                <button onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-amber-700 hover:bg-amber-50">
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold text-amber-400 mb-4">
                <Gem className="h-6 w-6" /> Indo-Aura
              </Link>
              <p className="text-gray-400 text-sm">
                Premium quality dry fruits and authentic astrology lucky stones for a balanced life.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/shop" className="hover:text-white transition">Shop Now</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/orders" className="hover:text-white transition">Track Order</Link></li>
                <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
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
    </div>
  );
}
