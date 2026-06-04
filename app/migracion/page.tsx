'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export default function MigracionPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [migracionActiva, setMigracionActiva] = useState(null);

  const historialMigraciones = [
    {
      id: 'MG001',
      fecha: '2024-05-15',
      tipo: 'Socios',
      archivos: 3,
      registros: 1200,
      estado: 'completada',
      errores: 0,
    },
    {
      id: 'MG002',
      fecha: '2024-05-16',
      tipo: 'Créditos',
      archivos: 2,
      registros: 850,
      estado: 'completada',
      errores: 5,
    },
    {
      id: 'MG003',
      fecha: '2024-05-17',
      tipo: 'Ahorros',
      archivos: 2,
      registros: 1200,
      estado: 'completada',
      errores: 2,
    },
  ];

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Migración e Integración' },
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Migración de Datos e Integración</h1>
          <Button variant="primary" onClick={() => setShowUploadModal(true)}>
            📥 Cargar Datos
          </Button>
        </div>

        {/* Plan de Migración */}
        <Card className="bg-blue-50 border-blue-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Plan de Migración</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div>
                <p className="font-semibold text-gray-900">Fase 1: Importar Socios</p>
                <p className="text-sm text-gray-600">Validación de cédula, datos personales y laborales</p>
              </div>
              <Badge status="aprobado">✓ Completado</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div>
                <p className="font-semibold text-gray-900">Fase 2: Importar Créditos</p>
                <p className="text-sm text-gray-600">Migración de créditos activos y cancelados</p>
              </div>
              <Badge status="aprobado">✓ Completado</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div>
                <p className="font-semibold text-gray-900">Fase 3: Importar Ahorros</p>
                <p className="text-sm text-gray-600">Carga de saldos y movimientos de ahorros</p>
              </div>
              <Badge status="aprobado">✓ Completado</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div>
                <p className="font-semibold text-gray-900">Fase 4: Validación Contable</p>
                <p className="text-sm text-gray-600">Reconciliación de datos migrados</p>
              </div>
              <Badge status="aprobado">✓ Completado</Badge>
            </div>
          </div>
        </Card>

        {/* Historial de Migraciones */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Historial de Importaciones</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Registros</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Errores</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {historialMigraciones.map((migracion, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm text-gray-900">{migracion.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{migracion.fecha}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{migracion.tipo}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{migracion.registros}</td>
                    <td className="px-6 py-4">
                      <Badge status="aprobado">{migracion.estado}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {migracion.errores > 0 ? (
                        <span className="text-red-600">{migracion.errores} errores</span>
                      ) : (
                        <span className="text-green-600">Sin errores</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="secondary" size="sm">
                        Ver Detalle
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Integraciones */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Integraciones Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">📊 Sistema Contable Externo</h3>
              <p className="text-sm text-gray-600 mb-3">Integración en tiempo real con software contable</p>
              <div className="flex gap-2">
                <Badge status="activo">Conectado</Badge>
                <Button variant="secondary" size="sm">Configurar</Button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">🏦 API Bancaria</h3>
              <p className="text-sm text-gray-600 mb-3">Sincronización de movimientos bancarios</p>
              <div className="flex gap-2">
                <Badge status="inactivo">Desconectado</Badge>
                <Button variant="secondary" size="sm">Configurar</Button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">📧 CRM de Comunicaciones</h3>
              <p className="text-sm text-gray-600 mb-3">Envío automático de notificaciones</p>
              <div className="flex gap-2">
                <Badge status="activo">Conectado</Badge>
                <Button variant="secondary" size="sm">Configurar</Button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">🔐 Sistema de Seguridad</h3>
              <p className="text-sm text-gray-600 mb-3">Validación de identidad y verificación</p>
              <div className="flex gap-2">
                <Badge status="activo">Conectado</Badge>
                <Button variant="secondary" size="sm">Configurar</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Modal de Carga */}
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Cargar Datos"
          size="lg"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setShowUploadModal(false)}>
                Procesar Carga
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona el tipo de archivo:</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>CSV/Excel - Socios</option>
                <option>CSV/Excel - Créditos</option>
                <option>CSV/Excel - Ahorros</option>
                <option>CSV/Excel - Movimientos</option>
              </select>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600">📁 Arrastra tu archivo aquí o haz clic para seleccionar</p>
              <p className="text-sm text-gray-500 mt-2">Formatos soportados: .csv, .xlsx</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Nota:</strong> Se validarán los datos antes de importar. Se pueden descargar plantillas de ejemplo.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
