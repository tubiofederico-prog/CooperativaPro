'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { mockData } from '@/data/mockData';

export default function AhorrosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('');

  const filteredAhorros = mockData.ahorros.filter(
    (ahorro) =>
      (ahorro.socioNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ahorro.socioId.includes(searchTerm)) &&
      (!filterTipo || ahorro.tipo === filterTipo)
  );

  const totalAhorros = filteredAhorros.reduce((sum, a) => sum + a.saldo, 0);
  const interesesTotales = filteredAhorros.reduce((sum, a) => sum + a.interesesAcumulados, 0);
  const ahorrosObligatorios = mockData.ahorros.filter((a) => a.tipo === 'obligatorio').length;
  const ahorrosVoluntarios = mockData.ahorros.filter((a) => a.tipo === 'voluntario').length;

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Ahorros' },
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Ahorros</h1>
          <Button variant="primary">📊 Generar Reporte</Button>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Ahorros"
            value={`$${(totalAhorros / 1000000).toFixed(2)}M`}
            color="success"
            icon="💰"
            trend={{ value: 5, positive: true }}
          />
          <StatCard
            label="Intereses Acumulados"
            value={`$${(interesesTotales / 1000).toFixed(0)}K`}
            color="primary"
            icon="📈"
          />
          <StatCard
            label="Ahorros Obligatorios"
            value={ahorrosObligatorios}
            color="primary"
            icon="📋"
          />
          <StatCard
            label="Ahorros Voluntarios"
            value={ahorrosVoluntarios}
            color="success"
            icon="⭐"
          />
        </div>

        {/* Filtros */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Buscar por socio o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="🔍"
            />
            <Select
              options={[
                { value: '', label: 'Todos los tipos' },
                { value: 'obligatorio', label: 'Obligatorio' },
                { value: 'voluntario', label: 'Voluntario' },
              ]}
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
            />
            <Button variant="secondary" className="h-11">
              📥 Importar
            </Button>
          </div>
        </Card>

        {/* Tabla de Ahorros */}
        <Card>
          <Table
            columns={[
              { key: 'socioId', label: 'ID Socio', width: '10%' },
              { key: 'socioNombre', label: 'Socio', width: '30%' },
              { key: 'tipo', label: 'Tipo', width: '12%' },
              {
                key: 'saldo',
                label: 'Saldo',
                align: 'right',
                render: (value) => `$${value.toLocaleString()}`,
              },
              {
                key: 'tasaInteres',
                label: 'Tasa %',
                align: 'right',
                render: (value) => `${value.toFixed(2)}%`,
              },
              {
                key: 'interesesAcumulados',
                label: 'Intereses',
                align: 'right',
                render: (value) => `$${value.toLocaleString()}`,
              },
              {
                key: 'fechaUltimoMovimiento',
                label: 'Último Movimiento',
              },
            ]}
            data={filteredAhorros}
          />
        </Card>

        {/* Información Adicional */}
        <Card className="bg-green-50 border-green-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Información de Ahorros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Ahorros Promedio por Socio</p>
              <p className="text-2xl font-bold text-green-600">
                ${(totalAhorros / mockData.ahorros.length).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tasa Promedio de Interés</p>
              <p className="text-2xl font-bold text-green-600">
                {(mockData.ahorros.reduce((sum, a) => sum + a.tasaInteres, 0) / mockData.ahorros.length).toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Intereses Acumulados</p>
              <p className="text-2xl font-bold text-green-600">${(interesesTotales / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
