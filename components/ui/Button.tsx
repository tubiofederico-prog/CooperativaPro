import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  loading,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center gap-2 justify-center';

  const variants = {
    primary: 'bg-accent text-white hover:bg-cyan-500 active:bg-cyan-600',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800',
    danger: 'bg-danger text-white hover:bg-red-500 active:bg-red-600',
    success: 'bg-success text-white hover:bg-green-500 active:bg-green-600',
    outline: 'bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-50 active:bg-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? <span className="animate-spin">⏳</span> : icon}
      {children}
    </button>
  );
};
