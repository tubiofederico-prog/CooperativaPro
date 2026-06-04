'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { mockData } from '@/data/mockData';

const mockParams = { id: 'CR000001' };

export default function DetallesCreditoPage() {
  const credito = mockData.creditos.find((c) => c.id === mockParams.id) || mockData.creditos[0];
  const socio = mockData.socios.find((s) => s.id === credito.socioId);

  const [showAprobacionModal, setShowAprobacionModal] = useState(false);
  const [showRechazoModal, setShowRechazoModal] = useState(false);
  const [showPagoModal, setShowPagoModal] = useState(false);

  const cronograma = Array.from({ length: credito.plazo }, (_, i) => ({
    cuota: i + 1,
    monto: credito.cuota,
    interes: Math.round(credito.cuota * (credito.tasa / 100 / 12)),
    capital: credito.cuota - Math.round(credito.cuota * (credito.tasa / 100 / 12)),
    estado: i < credito.cuotasPagadas ? 'pagado' : i < credito.cuotasPagadas + credito.cuotasVencidas ? 'vencido' : 'pendiente',
    fecha: new Date(2024, i, 15).toISOString().split('T')[0],
  }));

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Créditos', href: '/creditos' },
        { label: `${credito.numero}` },
      ]}
    >
      <div className="space-y-6">
        {/* Encabezado */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{credito.numero}</h1>
            <p className="text-gray-600 mt-1">{socio?.nombre}</p>
            <div className="mt-3">
              <Badge status={credito.estado as any}>
                {credito.estado.toUpperCase()}
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            {credito.estado === 'pendiente' && (
              <>
                <Button variant="danger" onClick={() => setShowRechazoModal(true)}>
                  ❌ Rechazar
                </Button>
                <Button variant="success" onClick={() => setShowAprobacionModal(true)}>
                  ✅ Aprobar
                </Button>
              </>
            )}
            {credito.estado === 'desembolsado' && (
              <Button variant="primary" onClick={() => setShowPagoModal(true)}>
                💳 Registrar Pago
              </Button>
            )}
            <Button variant="secondary">📄 Imprimir</Button>
          </div>
        </div>

        {/* Información Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Datos del Crédito</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Tipo</p>
                <p className="font-semibold text-gray-900">{credito.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monto Solicitado</p>
                <p className="font-semibold text-gray-900">${credito.monto.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasa de Interés</p>
                <p className="font-semibold text-gray-900">{credito.tasa}% anual</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Plazo</p>
                <p className="font-semibold text-gray-900">{credito.plazo} meses</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cuota Mensual</p>
                <p className="font-bold text-xl text-accent">${credito.cuota.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Estado del Crédito</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Saldo Pendiente</p>
                <p className="font-semibold text-gray-900">${credito.saldoPendiente.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cuotas Pagadas</p>
                <p className="font-semibold text-gray-900">{credito.cuotasPagadas} de {credito.plazo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cuotas Vencidas</p>
                <p className="font-semibold text-danger">{credito.cuotasVencidas}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Porcentaje Completado</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: `${(credito.cuotasPagadas / credito.plazo) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1">{Math.round((credito.cuotasPagadas / credito.plazo) * 100)}%</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Fechas Importantes</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Fecha Solicitud</p>
                <p className="font-semibold text-gray-900">{credito.fechaSolicitud}</p>
              </div>
              {credito.fechaAprobacion && (
                <div>
                  <p className="text-sm text-gray-600">Fecha Aprobación</p>
                  <p className="font-semibold text-gray-900">{credito.fechaAprobacion}</p>
                </div>
              )}
              {credito.fechaDesembolso && (
                <div>
                  <p className="text-sm text-gray-600">Fecha Desembolso</p>
                  <p className="font-semibold text-gray-900">{credito.fechaDesembolso}</p>
                </div>
              )}
              {credito.motivoRechazo && (
                <div>
                  <p className="text-sm text-gray-600">Motivo Rechazo</p>
                  <p className="font-semibold text-red-600">{credito.motivoRechazo}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Información del Socio */}
        {socio && (
          <Card className="bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4">Información del Solicitante</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600">Nombre</p>
                <p className="font-semibold text-gray-900">{socio.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cédula</p>
                <p className="font-semibold text-gray-900">{socio.cedula}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ahorros Totales</p>
                <p className="font-semibold text-gray-900">${socio.ahorroTotal.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Capacidad Crediticia</p>
                <p className="font-semibold text-gray-900">${socio.capacidadCredito.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Cronograma de Pagos */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Cronograma de Cuotas</h2>
          <div className="overflow-x-auto">
            <Table
              columns={[
                { key: 'cuota', label: 'Cuota #', width: '10%' },
                { key: 'fecha', label: 'Fecha', width: '15%' },
                {
                  key: 'capital',
                  label: 'Capital',
                  align: 'right',
                  render: (value) => `$${value.toLocaleString()}`,
                },
                {
                  key: 'interes',
                  label: 'Interés',
                  align: 'right',
                  render: (value) => `$${value.toLocaleString()}`,
                },
                {
                  key: 'monto',
                  label: 'Cuota',
                  align: 'right',
                  render: (value) => `$${value.toLocaleString()}`,
                },
                {
                  key: 'estado',
                  label: 'Estado',
                  render: (value) => (
                    <Badge
                      status={value === 'pagado' ? 'aprobado' : value === 'vencido' ? 'en_mora' : 'pendiente'}
                      size="sm"
                    >
                      {value}
                    </Badge>
                  ),
                },
              ]}
              data={cronograma}
            />
          </div>
        </Card>

        {/* Documentos */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Documentos Respaldo</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>📄 Solicitud de Crédito.pdf</span>
              <Button variant="secondary" size="sm">Descargar</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>📋 Resolución de Aprobación.pdf</span>
              <Button variant="secondary" size="sm">Descargar</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>📊 Estado Financiero.pdf</span>
              <Button variant="secondary" size="sm">Descargar</Button>
            </div>
          </div>
        </Card>

        {/* Modales */}
        <Modal
          isOpen={showAprobacionModal}
          onClose={() => setShowAprobacionModal(false)}
          title="Confirmar Aprobación"
          size="md"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowAprobacionModal(false)}>
                Cancelar
              </Button>
              <Button variant="success" onClick={() => setShowAprobacionModal(false)}>
                ✅ Aprobar Crédito
              </Button>
            </>
          }
        >
          <p className="text-gray-900">¿Desea aprobar esta solicitud de crédito por ${credito.monto.toLocaleString()}?</p>
          <p className="text-sm text-gray-600 mt-2">El socio recibirá notificación de la aprobación.</p>
        </Modal>

        <Modal
          isOpen={showRechazoModal}
          onClose={() => setShowRechazoModal(false)}
          title="Rechazar Solicitud"
          size="md"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowRechazoModal(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => setShowRechazoModal(false)}>
                ❌ Rechazar
              </Button>
            </>
          }
        >
          <p className="text-gray-900">¿Desea rechazar esta solicitud?</p>
          <p className="text-sm text-gray-600 mt-2">Deberá especificar un motivo de rechazo.</p>
        </Modal>

        <Modal
          isOpen={showPagoModal}
          onClose={() => setShowPagoModal(false)}
          title="Registrar Pago"
          size="md"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowPagoModal(false)}>
                Cancelar
              </Button>
              <Button variant="success" onClick={() => setShowPagoModal(false)}>
                💳 Registrar Pago
              </Button>
            </>
          }
        >
          <p className="text-gray-900">Registre el pago recibido para este crédito.</p>
          <p className="text-sm text-gray-600 mt-2">Próxima cuota vence en 5 días.</p>
        </Modal>
      </div>
    </Layout>
  );
}
