'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { id: 'socios', label: 'Socios', href: '/socios', icon: '👥' },
  { id: 'creditos', label: 'Créditos', href: '/creditos', icon: '💳' },
  { id: 'ahorros', label: 'Ahorros', href: '/ahorros', icon: '💰' },
  { id: 'convenios', label: 'Convenios', href: '/convenios', icon: '🤝' },
  { id: 'cruces', label: 'Cruces de Ahorro-Crédito', href: '/cruces', icon: '🔄' },
  { id: 'reglas', label: 'Reglas de Negocio', href: '/reglas', icon: '⚙️' },
  { id: 'administrativo', label: 'Administrativo', href: '/administrativo', icon: '📋' },
  { id: 'contable', label: 'Contable', href: '/contable', icon: '📑' },
  { id: 'reportes', label: 'Reportes', href: '/reportes', icon: '📈' },
  { id: 'migracion', label: 'Migración', href: '/migracion', icon: '🔀' },
  { id: 'usuarios', label: 'Usuarios & Seguridad', href: '/usuarios', icon: '🔒' },
];

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed: initialCollapsed }) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed || false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-primary text-white transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } border-r border-gray-700 z-40`}
    >
      <div className="flex items-center justify-between h-20 px-4 border-b border-gray-700">
        <div className={`font-bold text-xl ${collapsed ? 'hidden' : ''}`}>CooperativaPro</div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-5rem)]">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-accent text-white'
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
