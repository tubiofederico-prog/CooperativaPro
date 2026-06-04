'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏦</div>
          <h1 className="text-3xl font-bold text-gray-900">CooperativaPro</h1>
          <p className="text-gray-600 mt-2">Gestión Integral de Cooperativa</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="admin@cooperativa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="📧"
            required
          />

          <div>
            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="🔒"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-accent hover:underline mt-1"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4" />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Recuérdame
            </label>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Ingresar al Sistema
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            ¿Olvidó su contraseña?{' '}
            <a href="/recuperar" className="text-accent hover:underline font-semibold">
              Recuperar aquí
            </a>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Usuarios Demo:</strong><br/>
            Admin: admin@cooperativa.com<br/>
            Tesorería: tesoreria@cooperativa.com<br/>
            Contabilidad: contabilidad@cooperativa.com
          </p>
        </div>
      </Card>
    </div>
  );
}
