import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#1E293B',
        accent: '#06B6D4',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '1rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        elevated: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
        premium: '0 8px 16px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
export default config
