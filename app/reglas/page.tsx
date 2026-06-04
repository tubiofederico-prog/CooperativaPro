'use client';

import { useState } from 'react';


import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';
import { mockData } from '@/data/mockData';

export default function ReglasPage() {
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedRegla, setSelectedRegla] = useState<any>(null);

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Reglas de Negocio' },
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Configuración de Reglas de Negocio</h1>
          <Button variant="primary" onClick={() => setShowNewModal(true)}>
            ➕ Nueva Regla
          </Button>
        </div>

        {/* Reglas de Crédito */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-6">Reglas de Crédito por Tipo</h2>
          <div className="grid grid-cols-1 gap-6">
            {mockData.reglasCredito.map((regla) => (
              <Card key={regla.id} className="border border-gray-300 bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{regla.nombre}</h3>
                    <p className="text-sm text-gray-600">Tipo: {regla.tipo}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge status={regla.estado as any}>{regla.estado}</Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedRegla(regla)}
                    >
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Tasa de Interés</p>
                    <p className="font-bold text-gray-900">{regla.tasaInteres}% anual</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Plazo (meses)</p>
                    <p className="font-bold text-gray-900">
                      {regla.plazoMinimo} - {regla.plazoMaximo}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Monto Máximo</p>
                    <p className="font-bold text-gray-900">${(regla.montoMaximo / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">% del Salario</p>
                    <p className="font-bold text-gray-900">{regla.porcentajeSalario}%</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="flex items-center gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={regla.requireAhorros} readOnly />
                      <span>Requiere Ahorros Mínimos: ${(regla.montoMinimoAhorros / 1000).toFixed(1)}K</span>
                    </label>
                    <p className="text-gray-600">Última modificación: {regla.ultimaModificacion}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Configuración General */}
        <Card className="bg-blue-50 border-blue-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Configuración General</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Tasa Máxima Permitida</p>
              <p className="text-2xl font-bold text-blue-900">15%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Plazo Máximo General</p>
              <p className="text-2xl font-bold text-blue-900">60 meses</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ratio Deuda/Ingresos Máximo</p>
              <p className="text-2xl font-bold text-blue-900">60%</p>
            </div>
          </div>
        </Card>

        {/* Historial de Cambios */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Historial de Cambios Recientes</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Actualización de tasas - Crédito Ordinario</p>
                <p className="text-sm text-gray-600">Por: Admin Sistema | 2024-06-01 14:30</p>
              </div>
              <Button variant="secondary" size="sm">Ver Cambio</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Modificación de límites - Crédito Emergente</p>
                <p className="text-sm text-gray-600">Por: Admin Sistema | 2024-05-28 10:15</p>
              </div>
              <Button variant="secondary" size="sm">Ver Cambio</Button>
            </div>
          </div>
        </Card>

        {/* Modal Nueva Regla */}
        <Modal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          title="Crear Nueva Regla"
          size="lg"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowNewModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setShowNewModal(false)}>
                Crear Regla
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input label="Nombre de la Regla" placeholder="Ej: Crédito Ordinario Premium" />
            <Select
              label="Tipo de Crédito"
              options={[
                { value: 'ordinario', label: 'Ordinario' },
                { value: 'emergente', label: 'Emergente' },
                { value: 'decimo', label: 'Décimos' },
                { value: 'utilidad', label: 'Utilidades' },
              ]}
            />
          </div>
        </Modal>

        {/* Modal Editar Regla */}
        {selectedRegla && (
          <Modal
            isOpen={!!selectedRegla}
            onClose={() => setSelectedRegla(null)}
            title={`Editar: ${selectedRegla.nombre}`}
            size="lg"
            actions={
              <>
                <Button variant="secondary" onClick={() => setSelectedRegla(null)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={() => setSelectedRegla(null)}>
                  Guardar Cambios
                </Button>
              </>
            }
          >
            <div className="space-y-4">
              <Input label="Tasa de Interés (%)" defaultValue={selectedRegla.tasaInteres} />
              <Input label="Plazo Mínimo (meses)" defaultValue={selectedRegla.plazoMinimo} />
              <Input label="Plazo Máximo (meses)" defaultValue={selectedRegla.plazoMaximo} />
              <Input label="Monto Máximo ($)" defaultValue={selectedRegla.montoMaximo} />
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}
