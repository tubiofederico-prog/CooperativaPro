'use client';

import { useState } from 'react';


import { Layout } from '@/components/layout/Layout';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { mockData } from '@/data/mockData';

const mockParams = { id: 'S000001' };

export default function DetalleSocioPage() {
  const socio = mockData.socios.find((s) => s.id === mockParams.id) || mockData.socios[0];
  const creditosSocio = mockData.creditos.filter((c) => c.socioId === socio.id);
  const ahorroSocio = mockData.ahorros.find((a) => a.socioId === socio.id);
  const movimientosSocio = mockData.movimientos
    .filter((m) => m.socioId === socio.id)
    .slice(0, 10);

  const [showSolicitudModal, setShowSolicitudModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const deudaTotal = creditosSocio.reduce((sum, c) => sum + c.saldoPendiente, 0);
  const creditosActivos = creditosSocio.filter((c) => c.estado === 'desembolsado' || c.estado === 'en_mora').length;

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Socios', href: '/socios' },
        { label: socio.nombre },
      ]}
    >
      <div className="space-y-6">
        {/* Encabezado */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-3xl font-bold text-white">
              {socio.nombre[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{socio.nombre}</h1>
              <p className="text-gray-600 mt-1">
                Cédula: {socio.cedula} | Código: {socio.codigo}
              </p>
              <div className="mt-3">
                <Badge status={socio.estado as any}>{socio.estado.toUpperCase()}</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowEditModal(true)}>
              ✏️ Editar
            </Button>
            <Button variant="primary" onClick={() => setShowSolicitudModal(true)}>
              💳 Solicitar Crédito
            </Button>
          </div>
        </div>

        {/* Información de Contacto */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Información de Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{socio.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Teléfono</p>
              <p className="font-semibold text-gray-900">{socio.telefono}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dirección</p>
              <p className="font-semibold text-gray-900">{socio.direccion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Empresa</p>
              <p className="font-semibold text-gray-900">{socio.empresa}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Puesto</p>
              <p className="font-semibold text-gray-900">{socio.puesto}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fecha Ingreso</p>
              <p className="font-semibold text-gray-900">{socio.fechaIngreso}</p>
            </div>
          </div>
        </Card>

        {/* Métricas Financieras */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Ahorros Total"
            value={`$${(socio.ahorroTotal / 1000).toFixed(1)}K`}
            color="success"
            icon="💰"
          />
          <StatCard
            label="Deuda Total"
            value={`$${(deudaTotal / 1000).toFixed(1)}K`}
            color="danger"
            icon="📉"
          />
          <StatCard
            label="Capacidad Crédito"
            value={`$${(socio.capacidadCredito / 1000).toFixed(1)}K`}
            color="primary"
            icon="📊"
          />
          <StatCard
            label="Salario Promedio"
            value={`$${(socio.salarioPromedio / 1000).toFixed(1)}K`}
            color="primary"
            icon="💵"
          />
        </div>

        {/* Información Laboral */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Información Laboral y Salarial</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">Empresa</p>
              <p className="font-semibold text-gray-900">{socio.empresa}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Puesto</p>
              <p className="font-semibold text-gray-900">{socio.puesto}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Salario Promedio (últimos 3 meses)</p>
              <p className="font-semibold text-gray-900">${socio.salarioPromedio.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Créditos Activos</p>
              <p className="font-semibold text-gray-900">{creditosActivos}</p>
            </div>
          </div>
        </Card>

        {/* Créditos del Socio */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Créditos Registrados</h2>
          {creditosSocio.length > 0 ? (
            <Table
              columns={[
                { key: 'numero', label: 'Número', width: '15%' },
                { key: 'tipo', label: 'Tipo', width: '15%' },
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
                  label: 'Ver Detalle',
                  render: (value) => (
                    <Button variant="secondary" size="sm">
                      Ver
                    </Button>
                  ),
                },
              ]}
              data={creditosSocio}
            />
          ) : (
            <p className="text-gray-600">Sin créditos registrados</p>
          )}
        </Card>

        {/* Ahorros */}
        {ahorroSocio && (
          <Card className="bg-green-50 border-green-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Cuenta de Ahorros</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600">Tipo de Ahorro</p>
                <p className="font-semibold text-gray-900">{ahorroSocio.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Saldo Actual</p>
                <p className="font-bold text-2xl text-green-600">${ahorroSocio.saldo.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasa Interés</p>
                <p className="font-semibold text-gray-900">{ahorroSocio.tasaInteres.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Intereses Acumulados</p>
                <p className="font-semibold text-gray-900">${ahorroSocio.interesesAcumulados.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Movimientos Recientes */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Últimos Movimientos</h2>
          {movimientosSocio.length > 0 ? (
            <Table
              columns={[
                { key: 'tipo', label: 'Tipo' },
                { key: 'descripcion', label: 'Descripción' },
                {
                  key: 'monto',
                  label: 'Monto',
                  align: 'right',
                  render: (value) => `$${value.toLocaleString()}`,
                },
                { key: 'fecha', label: 'Fecha' },
              ]}
              data={movimientosSocio}
            />
          ) : (
            <p className="text-gray-600">Sin movimientos registrados</p>
          )}
        </Card>

        {/* Modales */}
        <Modal
          isOpen={showSolicitudModal}
          onClose={() => setShowSolicitudModal(false)}
          title="Solicitar Crédito"
          size="lg"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowSolicitudModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setShowSolicitudModal(false)}>
                Procesar Solicitud
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-gray-900">
            <p>Redirigirá al módulo de créditos para procesar la solicitud de {socio.nombre}</p>
            <p className="text-sm text-gray-600">Capacidad crediticia disponible: ${socio.capacidadCredito.toLocaleString()}</p>
          </div>
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Editar Perfil"
          size="lg"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setShowEditModal(false)}>
                Guardar Cambios
              </Button>
            </>
          }
        >
          <p className="text-gray-900">Formulario de edición de perfil del socio</p>
        </Modal>
      </div>
    </Layout>
  );
}
