import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => (
  <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-card ${hover ? 'hover:shadow-elevated hover:border-gray-300 transition-all' : ''} ${className}`}>
    {children}
  </div>
);

interface StatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, color = 'primary' }) => {
  const colors = {
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200',
  };

  const iconColors = {
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
  };

  return (
    <Card className={`${colors[color]} border`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% vs mes anterior
            </p>
          )}
        </div>
        {icon && <div className={`text-3xl ${iconColors[color]}`}>{icon}</div>}
      </div>
    </Card>
  );
};
