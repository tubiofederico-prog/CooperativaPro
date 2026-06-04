'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { mockData } from '@/data/mockData';

export default function AdministrativoPage() {
  const movimientosRecientes = mockData.movimientos.slice(0, 20);
  const totalMovimientos = mockData.movimientos.length;
  const montoMovido = mockData.movimientos.reduce((sum, m) => sum + m.monto, 0);

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Administrativo' },
      ]}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Panel Administrativo y Financiero</h1>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Total Movimientos"
            value={totalMovimientos}
            color="primary"
            icon="📊"
          />
          <StatCard
            label="Monto Movido"
            value={`$${(montoMovido / 1000000).toFixed(2)}M`}
            color="success"
            icon="💰"
          />
          <StatCard
            label="Transacciones Hoy"
            value={Math.floor(totalMovimientos / 30)}
            color="primary"
            icon="📈"
          />
        </div>

        {/* Acciones Rápidas */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="secondary" className="w-full justify-center">
              💰 Registrar Depósito
            </Button>
            <Button variant="secondary" className="w-full justify-center">
              💸 Registrar Retiro
            </Button>
            <Button variant="secondary" className="w-full justify-center">
              💳 Procesar Pago
            </Button>
            <Button variant="secondary" className="w-full justify-center">
              🔄 Conciliación
            </Button>
          </div>
        </Card>

        {/* Movimientos Recientes */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Movimientos Financieros Recientes</h2>
          <Table
            columns={[
              { key: 'id', label: 'ID', width: '12%' },
              { key: 'tipo', label: 'Tipo', width: '15%' },
              { key: 'descripcion', label: 'Descripción', width: '35%' },
              {
                key: 'monto',
                label: 'Monto',
                align: 'right',
                render: (value) => `$${value.toLocaleString()}`,
              },
              { key: 'fecha', label: 'Fecha', width: '20%' },
            ]}
            data={movimientosRecientes}
          />
        </Card>

        {/* Resumen Contable */}
        <Card className="bg-purple-50 border-purple-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen Contable</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">Total Ahorros</p>
              <p className="text-2xl font-bold text-purple-600">
                ${(mockData.ahorros.reduce((sum, a) => sum + a.saldo, 0) / 1000000).toFixed(2)}M
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Deudas Activas</p>
              <p className="text-2xl font-bold text-purple-600">
                ${(mockData.creditos.filter(c => c.estado === 'desembolsado' || c.estado === 'en_mora').reduce((sum, c) => sum + c.saldoPendiente, 0) / 1000000).toFixed(2)}M
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Patrimonio</p>
              <p className="text-2xl font-bold text-purple-600">$2.5M</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Utilidad del Período</p>
              <p className="text-2xl font-bold text-green-600">$450K</p>
            </div>
          </div>
        </Card>

        {/* Documentos Administrativos */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Documentos y Respaldos</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>📄 Estado Financiero Mensual</span>
              <Button variant="secondary" size="sm">Descargar</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>📋 Cierre de Caja</span>
              <Button variant="secondary" size="sm">Descargar</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>📑 Respaldos de Movimientos</span>
              <Button variant="secondary" size="sm">Descargar</Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
