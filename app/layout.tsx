import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CooperativaPro - Gestión Integral de Cooperativa',
  description: 'Plataforma B2B premium para gestión de asociaciones de trabajadores y cooperativas de ahorro y crédito',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
