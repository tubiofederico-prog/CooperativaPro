import React from 'react';

interface BadgeProps {
  status: 'activo' | 'inactivo' | 'pendiente' | 'aprobado' | 'rechazado' | 'en_mora' | 'suspendido' | 'bloqueado' | 'desembolsado' | 'cancelado' | 'en_revisión' | 'pausado' | 'vencido';
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, children, size = 'md' }) => {
  const statusStyles = {
    activo: 'bg-green-100 text-green-800 border-green-200',
    inactivo: 'bg-gray-100 text-gray-800 border-gray-200',
    pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    aprobado: 'bg-blue-100 text-blue-800 border-blue-200',
    rechazado: 'bg-red-100 text-red-800 border-red-200',
    en_mora: 'bg-red-100 text-red-800 border-red-200',
    suspendido: 'bg-orange-100 text-orange-800 border-orange-200',
    bloqueado: 'bg-red-100 text-red-800 border-red-200',
    desembolsado: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    cancelado: 'bg-gray-100 text-gray-800 border-gray-200',
    en_revisión: 'bg-purple-100 text-purple-800 border-purple-200',
    pausado: 'bg-gray-100 text-gray-800 border-gray-200',
    vencido: 'bg-red-100 text-red-800 border-red-200',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs font-semibold',
    md: 'px-3 py-1 text-sm font-semibold',
  };

  return (
    <span className={`inline-block border rounded-full ${statusStyles[status]} ${sizes[size]}`}>
      {children}
    </span>
  );
};
