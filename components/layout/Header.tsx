'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';

export const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-64 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-30">
      <div className="flex-1 max-w-md">
        <Input
          type="text"
          placeholder="Buscar socio, crédito, movimiento..."
          icon="🔍"
          className="text-sm"
        />
      </div>

      <div className="flex items-center gap-6 ml-8">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <span className="text-xl">⚙️</span>
        </button>

        <div className="border-l border-gray-300 pl-6 flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">Admin Sistema</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold text-lg">
            A
          </button>
        </div>
      </div>
    </header>
  );
};
