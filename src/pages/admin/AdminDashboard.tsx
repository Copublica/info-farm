import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { Package, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminDashboard() {
  const { role, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!loading && role !== 'admin') {
      navigate('/');
    }
  }, [role, loading, navigate]);

  if (loading || role !== 'admin') {
    return <div className="py-24 text-center">Loading admin panel...</div>;
  }

  const navItems = [
    { name: 'Products', path: '/admin', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 py-8 w-full max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
          <div className="flex items-center gap-2 font-bold text-lg mb-6 text-gray-900 border-b border-gray-100 pb-4">
            <LayoutDashboard className="w-5 h-5 text-amber-700" />
            Admin Panel
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm",
                  location.pathname === item.path
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
