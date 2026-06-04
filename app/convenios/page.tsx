'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { mockData } from '@/data/mockData';

export default function ConveniosPage() {
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedConvenio, setSelectedConvenio] = useState<any>(null);

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Convenios' },
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Casas Comerciales & Convenios</h1>
          <Button variant="primary" onClick={() => setShowNewModal(true)}>
            ➕ Nuevo Convenio
          </Button>
        </div>

        {/* Listado de Convenios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockData.convenios.map((convenio) => (
            <Card key={convenio.id} hover className="cursor-pointer" onClick={() => setSelectedConvenio(convenio)}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{convenio.nombre}</h3>
                  <p className="text-sm text-gray-600">{convenio.empresa}</p>
                </div>
                <Badge status={convenio.estado as any}>{convenio.estado}</Badge>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-200">
                <p className="font-semibold text-blue-900">
                  {convenio.descuento}% descuento - {convenio.beneficio}
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contacto:</span>
                  <span className="font-semibold">{convenio.contacto}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Teléfono:</span>
                  <span className="font-semibold">{convenio.telefono}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{convenio.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vencimiento:</span>
                  <span className="font-semibold">{convenio.fechaVencimiento}</span>
                </div>
              </div>

              <Button variant="secondary" size="sm" className="w-full" onClick={() => setSelectedConvenio(convenio)}>
                Ver Detalles
              </Button>
            </Card>
          ))}
        </div>

        {/* Modal Detalles */}
        {selectedConvenio && (
          <Modal
            isOpen={!!selectedConvenio}
            onClose={() => setSelectedConvenio(null)}
            title={selectedConvenio.nombre}
            size="lg"
            actions={
              <>
                <Button variant="secondary" onClick={() => setSelectedConvenio(null)}>
                  Cerrar
                </Button>
                <Button variant="primary">
                  📋 Solicitar Beneficio
                </Button>
              </>
            }
          >
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="font-bold text-blue-900">{selectedConvenio.descuento}% Descuento</p>
                <p className="text-blue-700">{selectedConvenio.beneficio}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Información de Contacto</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Empresa:</strong> {selectedConvenio.empresa}</p>
                  <p><strong>Contacto:</strong> {selectedConvenio.contacto}</p>
                  <p><strong>Teléfono:</strong> {selectedConvenio.telefono}</p>
                  <p><strong>Email:</strong> {selectedConvenio.email}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Requisitos</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {selectedConvenio.requisitos.map((req: string, idx: number) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Vencimiento:</strong> {selectedConvenio.fechaVencimiento}
                </p>
              </div>
            </div>
          </Modal>
        )}

        {/* Modal Nuevo Convenio */}
        <Modal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          title="Crear Nuevo Convenio"
          size="lg"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowNewModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setShowNewModal(false)}>
                Crear Convenio
              </Button>
            </>
          }
        >
          <p className="text-gray-900">Formulario para crear nuevo convenio con casa comercial.</p>
        </Modal>
      </div>
    </Layout>
  );
}
