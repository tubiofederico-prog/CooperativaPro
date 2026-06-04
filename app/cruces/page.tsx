'use client';

import { useState } from 'react';


import { Layout } from '@/components/layout/Layout';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { mockData } from '@/data/mockData';

const crucesMock = [
  {
    id: 'CZ001',
    socioId: 'S000001',
    socioNombre: 'Juan García 1',
    ahorroDisponible: 25000,
    deudaTotal: 15000,
    montoSolicitado: 10000,
    estado: 'pendiente' as any,
    fechaSolicitud: '2024-06-01',
  },
  {
    id: 'CZ002',
    socioId: 'S000002',
    socioNombre: 'María López 2',
    ahorroDisponible: 45000,
    deudaTotal: 20000,
    montoSolicitado: 25000,
    estado: 'aprobado' as any,
    fechaSolicitud: '2024-05-28',
  },
  {
    id: 'CZ003',
    socioId: 'S000003',
    socioNombre: 'Carlos Rodríguez 3',
    ahorroDisponible: 12000,
    deudaTotal: 18000,
    montoSolicitado: 8000,
    estado: 'rechazado' as any,
    fechaSolicitud: '2024-05-25',
  },
];

export default function CrucesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedCruce, setSelectedCruce] = useState<any>(null);

  const filteredCruces = crucesMock.filter(
    (cruce) =>
      (cruce.socioNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cruce.socioId.includes(searchTerm)) &&
      (!filterEstado || cruce.estado === filterEstado)
  );

  const aprobados = crucesMock.filter((c) => c.estado === 'aprobado').length;
  const pendientes = crucesMock.filter((c) => c.estado === 'pendiente').length;
  const rechazados = crucesMock.filter((c) => c.estado === 'rechazado').length;

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Cruces de Ahorro y Crédito' },
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Cruces de Ahorro y Crédito</h1>
          <Button variant="primary" onClick={() => setShowNewModal(true)}>
            ➕ Nueva Solicitud
          </Button>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Pendientes"
            value={pendientes}
            color="warning"
            icon="⏳"
          />
          <StatCard
            label="Aprobados"
            value={aprobados}
            color="success"
            icon="✅"
          />
          <StatCard
            label="Rechazados"
            value={rechazados}
            color="danger"
            icon="❌"
          />
        </div>

        {/* Filtros */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Buscar por socio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="🔍"
            />
            <Select
              options={[
                { value: '', label: 'Todos los estados' },
                { value: 'pendiente', label: 'Pendiente' },
                { value: 'aprobado', label: 'Aprobado' },
                { value: 'rechazado', label: 'Rechazado' },
              ]}
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
            />
            <Button variant="secondary" className="h-11">
              📄 Generar Reporte
            </Button>
          </div>
        </Card>

        {/* Tabla */}
        <Card>
          <Table
            columns={[
              { key: 'id', label: 'Solicitud', width: '12%' },
              { key: 'socioNombre', label: 'Socio', width: '25%' },
              {
                key: 'ahorroDisponible',
                label: 'Ahorros',
                align: 'right',
                render: (value) => `$${(value / 1000).toFixed(1)}K`,
              },
              {
                key: 'deudaTotal',
                label: 'Deuda',
                align: 'right',
                render: (value) => `$${(value / 1000).toFixed(1)}K`,
              },
              {
                key: 'montoSolicitado',
                label: 'Monto Cruce',
                align: 'right',
                render: (value) => `$${(value / 1000).toFixed(1)}K`,
              },
              {
                key: 'estado',
                label: 'Estado',
                render: (value) => <Badge status={value}>{value}</Badge>,
              },
              {
                key: 'id',
                label: 'Acción',
                render: (value) => (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedCruce(crucesMock.find((c) => c.id === value))}
                  >
                    Ver
                  </Button>
                ),
              },
            ]}
            data={filteredCruces}
          />
        </Card>

        {/* Información */}
        <Card className="bg-blue-50 border-blue-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">¿Qué es un Cruce?</h2>
          <p className="text-gray-700 mb-3">
            Un cruce es la operación por la cual se permite al socio utilizar sus ahorros para pagar total o parcialmente una deuda crediticia, siempre que cumpla con los requisitos establecidos.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Valida automáticamente si el socio cumple condiciones</li>
            <li>Verifica saldo de ahorros disponible vs deuda activa</li>
            <li>Aplica reglas de negocio para aprobación</li>
            <li>Genera documentación del cruce automáticamente</li>
          </ul>
        </Card>

        {/* Modal Nueva Solicitud */}
        <Modal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          title="Nueva Solicitud de Cruce"
          size="lg"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowNewModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setShowNewModal(false)}>
                Procesar Solicitud
              </Button>
            </>
          }
        >
          <p className="text-gray-900">Selecciona un socio para realizar un cruce de ahorro y crédito.</p>
        </Modal>

        {/* Modal Ver Detalle */}
        {selectedCruce && (
          <Modal
            isOpen={!!selectedCruce}
            onClose={() => setSelectedCruce(null)}
            title={`Cruce ${selectedCruce.id}`}
            size="lg"
            actions={
              selectedCruce.estado === 'pendiente'
                ? [
                    <Button key="cancel" variant="secondary" onClick={() => setSelectedCruce(null)}>
                      Cancelar
                    </Button>,
                    <Button key="reject" variant="danger" onClick={() => setSelectedCruce(null)}>
                      Rechazar
                    </Button>,
                    <Button key="approve" variant="success" onClick={() => setSelectedCruce(null)}>
                      Aprobar
                    </Button>,
                  ]
                : [
                    <Button key="close" variant="secondary" onClick={() => setSelectedCruce(null)}>
                      Cerrar
                    </Button>,
                  ]
            }
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Socio</p>
                <p className="font-semibold text-gray-900">{selectedCruce.socioNombre}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Ahorros Disponibles</p>
                  <p className="font-bold text-green-600">${selectedCruce.ahorroDisponible.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deuda Total</p>
                  <p className="font-bold text-red-600">${selectedCruce.deudaTotal.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Recomendación:</strong> El socio puede realizar un cruce por hasta ${Math.min(selectedCruce.ahorroDisponible, selectedCruce.deudaTotal).toLocaleString()}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}
