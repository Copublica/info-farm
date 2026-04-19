'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { LayoutDashboard, Package, ShoppingBag, Settings, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && (!user || role !== 'admin')) {
      router.push('/');
    }
  }, [user, role, loading, router]);

  if (loading || !user || role !== 'admin') {
    return <div className="py-24 text-center">Checking admin permissions...</div>;
  }

  const navItems = [
    { label: 'Products', icon: Package, href: '/admin' },
    { label: 'Orders', icon: ShoppingBag, href: '/admin/orders' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
            <LayoutDashboard className="w-6 h-6 text-amber-700" />
            <h2 className="font-bold text-gray-900">Admin Panel</h2>
          </div>
          <nav className="p-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between p-3 rounded-xl transition group ${
                    isActive 
                      ? 'bg-amber-50 text-amber-800' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 font-medium">
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-amber-700' : 'text-gray-400'}`} />
                    {item.label}
                  </div>
                  <ChevronRight className={`w-4 h-4 transition ${isActive ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
