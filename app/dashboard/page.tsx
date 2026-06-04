'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { mockData } from '@/data/mockData';

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  const sociosActivos = mockData.socios.filter(s => s.estado === 'activo').length;
  const creditosPendientes = mockData.creditos.filter(c => c.estado === 'pendiente').length;
  const creditosEnMora = mockData.creditos.filter(c => c.estado === 'en_mora').length;
  const creditosAprobados = mockData.creditos.filter(c => c.estado === 'aprobado' || c.estado === 'desembolsado').length;

  const totalAhorros = mockData.ahorros.reduce((sum, a) => sum + a.saldo, 0);
  const totalCreditos = mockData.creditos.reduce((sum, c) => sum + c.monto, 0);
  const montoRecuperado = mockData.creditos.filter(c => c.estado === 'cancelado').reduce((sum, c) => sum + c.monto, 0);

  const actividadReciente = [
    { id: 1, tipo: 'Crédito Aprobado', socio: 'Juan García 1', monto: '$15,000', fecha: 'Hoy 14:30', estado: 'aprobado' },
    { id: 2, tipo: 'Pago Recibido', socio: 'María López 2', monto: '$2,500', fecha: 'Hoy 12:15', estado: 'activo' },
    { id: 3, tipo: 'Socio Registrado', socio: 'Carlos Rodríguez 3', monto: 'N/A', fecha: 'Ayer 09:45', estado: 'activo' },
    { id: 4, tipo: 'Crédito Rechazado', socio: 'Ana Martínez 4', monto: '$8,000', fecha: 'Ayer 16:20', estado: 'rechazado' },
    { id: 5, tipo: 'En Mora Detectada', socio: 'Luis Fernández 5', monto: '$3,200', fecha: '2 días atrás', estado: 'en_mora' },
  ];

  return (
    <Layout breadcrumbs={[{ label: 'Dashboard' }]}>
      <div className="space-y-8">
        {/* KPIs Principales */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard General</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Socios Activos"
              value={sociosActivos}
              color="primary"
              icon="👥"
              trend={{ value: 12, positive: true }}
            />
            <StatCard
              label="Total Ahorros"
              value={`$${(totalAhorros / 1000000).toFixed(1)}M`}
              color="success"
              icon="💰"
              trend={{ value: 8, positive: true }}
            />
            <StatCard
              label="Créditos Emitidos"
              value={mockData.creditos.length}
              color="primary"
              icon="💳"
              trend={{ value: 15, positive: true }}
            />
            <StatCard
              label="En Mora"
              value={creditosEnMora}
              color="danger"
              icon="⚠️"
              trend={{ value: 3, positive: false }}
            />
          </div>
        </div>

        {/* Gráficos Simples */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Solicitudes de Crédito (últimos 6 meses)</h2>
            <div className="space-y-4">
              {[
                { mes: 'Ene', creditos: 45, aprob: 32, rech: 8 },
                { mes: 'Feb', creditos: 52, aprob: 40, rech: 6 },
                { mes: 'Mar', creditos: 48, aprob: 38, rech: 7 },
                { mes: 'Abr', creditos: 61, aprob: 48, rech: 10 },
                { mes: 'May', creditos: 55, aprob: 44, rech: 8 },
                { mes: 'Jun', creditos: 67, aprob: 54, rech: 9 },
              ].map((item) => (
                <div key={item.mes}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.mes}</span>
                    <span className="text-xs text-gray-500">{item.creditos} total</span>
                  </div>
                  <div className="flex gap-1 h-8">
                    <div className="flex-1 bg-accent rounded" style={{ maxWidth: `${(item.creditos / 70) * 100}%` }} title={`Total: ${item.creditos}`}></div>
                    <div className="flex-1 bg-green-500 rounded" style={{ maxWidth: `${(item.aprob / 70) * 100}%` }} title={`Aprobadas: ${item.aprob}`}></div>
                    <div className="flex-1 bg-red-500 rounded" style={{ maxWidth: `${(item.rech / 70) * 100}%` }} title={`Rechazadas: ${item.rech}`}></div>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 text-sm pt-4 border-t">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent rounded"></div><span>Total</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div><span>Aprobadas</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded"></div><span>Rechazadas</span></div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Créditos por Tipo</h2>
            <div className="space-y-3">
              {[
                { name: 'Ordinario', value: 450, color: 'bg-cyan-500' },
                { name: 'Emergente', value: 220, color: 'bg-green-500' },
                { name: 'Décimos', value: 180, color: 'bg-yellow-500' },
                { name: 'Utilidades', value: 120, color: 'bg-purple-500' },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.value / 450) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Métricas Adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Solicitudes Pendientes</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{creditosPendientes}</p>
              </div>
              <div className="text-4xl">📬</div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Créditos Aprobados</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{creditosAprobados}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Monto Recuperado</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">${(montoRecuperado / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-4xl">💵</div>
            </div>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="secondary" className="w-full justify-center">
              ➕ Nuevo Socio
            </Button>
            <Button variant="secondary" className="w-full justify-center">
              📝 Nueva Solicitud
            </Button>
            <Button variant="secondary" className="w-full justify-center">
              📊 Generar Reporte
            </Button>
            <Button variant="secondary" className="w-full justify-center">
              🔍 Ver Mora
            </Button>
          </div>
        </Card>

        {/* Actividad Reciente */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h2>
          <Table
            columns={[
              { key: 'tipo', label: 'Tipo de Actividad', width: '30%' },
              { key: 'socio', label: 'Socio', width: '35%' },
              { key: 'monto', label: 'Monto', width: '15%', align: 'right' },
              { key: 'fecha', label: 'Fecha', width: '20%' },
              {
                key: 'estado',
                label: 'Estado',
                render: (value) => <Badge status={value as any}>{value}</Badge>,
              },
            ]}
            data={actividadReciente}
          />
        </Card>

        {/* Alertas Administrativas */}
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-4">
            <div className="text-2xl">🚨</div>
            <div>
              <h3 className="font-bold text-gray-900">Alertas Administrativas</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>• 5 créditos están vencidos por más de 30 días</li>
                <li>• 3 socios tienen capacidad crediticia limitada</li>
                <li>• Se requiere validar documentos de 12 socios nuevos</li>
                <li>• Hay 4 solicitudes de cruce pendientes de aprobación</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
