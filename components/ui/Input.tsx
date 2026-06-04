import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
    <div className="relative">
      {icon && <div className="absolute left-3 top-3 text-gray-400">{icon}</div>}
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all ${
          icon ? 'pl-10' : ''
        } ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string | number; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
    <select
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      {...props}
    >
      <option value="">Seleccionar...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
    <textarea
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
