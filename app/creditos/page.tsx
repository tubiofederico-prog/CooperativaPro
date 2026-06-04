'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { mockData } from '@/data/mockData';

const tabs = ['Todos', 'Pendientes', 'Aprobados', 'Desembolsados', 'En Mora', 'Rechazados', 'Cancelados'];

export default function CreditosPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('');
  const [showNuevaSolicitudModal, setShowNuevaSolicitudModal] = useState(false);

  const getFilteredCreditos = () => {
    let filtered = mockData.creditos;

    if (activeTab !== 'Todos') {
      const estadoMap: any = {
        'Pendientes': 'pendiente',
        'Aprobados': 'aprobado',
        'Desembolsados': 'desembolsado',
        'En Mora': 'en_mora',
        'Rechazados': 'rechazado',
        'Cancelados': 'cancelado',
      };
      filtered = filtered.filter((c) => c.estado === estadoMap[activeTab]);
    }

    filtered = filtered.filter(
      (c) =>
        (c.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.socioNombre.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterTipo || c.tipo === filterTipo)
    );

    return filtered;
  };

  const filteredCreditos = getFilteredCreditos();
  const totalCreditos = filteredCreditos.length;
  const montoTotal = filteredCreditos.reduce((sum, c) => sum + c.monto, 0);
  const creditosMora = mockData.creditos.filter((c) => c.estado === 'en_mora').length;

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Créditos' },
      ]}
    >
      <div className="space-y-6">
        {/* Encabezado */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Créditos</h1>
          <Button variant="primary" onClick={() => setShowNuevaSolicitudModal(true)}>
            ➕ Nueva Solicitud
          </Button>
        </div>

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Total Créditos"
            value={totalCreditos}
            color="primary"
            icon="💳"
          />
          <StatCard
            label="Monto Total"
            value={`$${(montoTotal / 1000000).toFixed(1)}M`}
            color="success"
            icon="💰"
          />
          <StatCard
            label="En Mora"
            value={creditosMora}
            color="danger"
            icon="⚠️"
          />
        </div>

        {/* Tabs */}
        <Card>
          <div className="flex gap-2 pb-4 border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </Card>

        {/* Filtros */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Buscar por número o socio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="🔍"
            />
            <Select
              options={[
                { value: '', label: 'Todos los tipos' },
                { value: 'ordinario', label: 'Ordinario' },
                { value: 'emergente', label: 'Emergente' },
                { value: 'decimo', label: 'Décimos' },
                { value: 'utilidad', label: 'Utilidades' },
              ]}
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
            />
            <Button variant="secondary" className="h-11">
              📊 Exportar
            </Button>
          </div>
        </Card>

        {/* Tabla de Créditos */}
        <Card>
          <Table
            columns={[
              { key: 'numero', label: 'Número', width: '12%' },
              { key: 'socioNombre', label: 'Socio', width: '20%' },
              { key: 'tipo', label: 'Tipo', width: '12%' },
              {
                key: 'monto',
                label: 'Monto',
                align: 'right',
                render: (value) => `$${(value / 1000).toFixed(1)}K`,
              },
              { key: 'plazo', label: 'Plazo (meses)', align: 'center' },
              { key: 'tasa', label: 'Tasa %', align: 'right' },
              {
                key: 'estado',
                label: 'Estado',
                render: (value) => <Badge status={value as any}>{value}</Badge>,
              },
              {
                key: 'id',
                label: 'Acción',
                render: (value) => (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push(`/creditos/${value}`)}
                  >
                    Ver
                  </Button>
                ),
              },
            ]}
            data={filteredCreditos}
            hoverable
          />
        </Card>

        {/* Modal Nueva Solicitud */}
        <Modal
          isOpen={showNuevaSolicitudModal}
          onClose={() => setShowNuevaSolicitudModal(false)}
          title="Nueva Solicitud de Crédito"
          size="lg"
          actions={
            <>
              <Button
                variant="secondary"
                onClick={() => setShowNuevaSolicitudModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowNuevaSolicitudModal(false)}
              >
                Procesar
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-gray-900">
              Para crear una nueva solicitud, selecciona un socio y especifica los detalles del crédito.
            </p>
            <p className="text-sm text-gray-600">
              Se abrirá el formulario de solicitud multi-paso donde podrás:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Seleccionar socio</li>
              <li>Elegir tipo de crédito (ordinario, emergente, décimos, utilidades)</li>
              <li>Especificar monto y plazo</li>
              <li>Revisar simulación de cuotas</li>
              <li>Validar capacidad crediticia</li>
            </ul>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
