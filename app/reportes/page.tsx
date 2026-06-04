'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
const reportes = [
  {
    id: 'R001',
    nombre: 'Reporte de Créditos',
    descripcion: 'Análisis completo de créditos por período, tipo y estado',
    icono: '📊',
    tipo: 'creditos',
  },
  {
    id: 'R002',
    nombre: 'Reporte de Mora',
    descripcion: 'Detalle de créditos en mora y estrategia de recuperación',
    icono: '⚠️',
    tipo: 'mora',
  },
  {
    id: 'R003',
    nombre: 'Reporte de Ahorros',
    descripcion: 'Análisis de depósitos, retiros e intereses acumulados',
    icono: '💰',
    tipo: 'ahorros',
  },
  {
    id: 'R004',
    nombre: 'Reporte Financiero',
    descripcion: 'Estado de resultados, flujo de caja y análisis financiero',
    icono: '📈',
    tipo: 'financiero',
  },
  {
    id: 'R005',
    nombre: 'Reporte de Socios',
    descripcion: 'Análisis demográfico y actividad de socios',
    icono: '👥',
    tipo: 'socios',
  },
  {
    id: 'R006',
    nombre: 'Reporte Contable',
    descripcion: 'Asientos, movimientos contables y balances',
    icono: '📋',
    tipo: 'contable',
  },
];

const datosMora = [
  { mes: 'Ene', mora30: 5, mora60: 2, mora90: 1 },
  { mes: 'Feb', mora30: 7, mora60: 3, mora90: 1 },
  { mes: 'Mar', mora30: 6, mora60: 4, mora90: 2 },
  { mes: 'Abr', mora30: 8, mora60: 5, mora90: 2 },
  { mes: 'May', mora30: 9, mora60: 6, mora90: 3 },
  { mes: 'Jun', mora30: 10, mora60: 7, mora90: 3 },
];

export default function ReportesPage() {
  const [selectedReport, setSelectedReport] = useState<any>(null);

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Reportes' },
      ]}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Reportes e Indicadores</h1>

        {!selectedReport ? (
          <>
            {/* Filtros Generales */}
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Buscar reporte..."
                  icon="🔍"
                />
                <Select
                  options={[
                    { value: '', label: 'Este período' },
                    { value: 'ultima_semana', label: 'Última semana' },
                    { value: 'ultimo_mes', label: 'Último mes' },
                    { value: 'ultimos_3_meses', label: 'Últimos 3 meses' },
                    { value: 'ultimos_6_meses', label: 'Últimos 6 meses' },
                    { value: 'ultimos_12_meses', label: 'Últimos 12 meses' },
                  ]}
                />
                <Select
                  options={[
                    { value: '', label: 'Todos los tipos' },
                    { value: 'creditos', label: 'Créditos' },
                    { value: 'mora', label: 'Mora' },
                    { value: 'ahorros', label: 'Ahorros' },
                  ]}
                />
                <Button variant="primary" className="h-11">
                  🔎 Buscar
                </Button>
              </div>
            </Card>

            {/* Grid de Reportes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportes.map((reporte) => (
                <Card key={reporte.id} hover className="cursor-pointer" onClick={() => setSelectedReport(reporte)}>
                  <div className="text-4xl mb-3">{reporte.icono}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{reporte.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reporte.descripcion}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedReport(reporte)}
                  >
                    Generar Reporte
                  </Button>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Detalle del Reporte */}
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setSelectedReport(null)} className="text-2xl">←</button>
              <h2 className="text-2xl font-bold text-gray-900">{selectedReport.nombre}</h2>
            </div>

            {/* Controles */}
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Input placeholder="Socio o referencia..." icon="🔍" />
                <Select
                  options={[
                    { value: 'junio2024', label: 'Junio 2024' },
                    { value: 'mayo2024', label: 'Mayo 2024' },
                    { value: 'abril2024', label: 'Abril 2024' },
                  ]}
                />
                <Button variant="secondary" className="h-11">📊 PDF</Button>
                <Button variant="secondary" className="h-11">📥 Excel</Button>
                <Button variant="primary" className="h-11">🖨️ Imprimir</Button>
              </div>
            </Card>

            {/* Contenido del Reporte */}
            {selectedReport.tipo === 'mora' && (
              <>
                <Card>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Evolución de Créditos en Mora</h3>
                  <div className="space-y-4">
                    {datosMora.map((item) => (
                      <div key={item.mes}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{item.mes}</span>
                          <span className="text-xs text-gray-500">{item.mora30 + item.mora60 + item.mora90} créditos</span>
                        </div>
                        <div className="flex gap-2 h-6">
                          <div className="flex-1 bg-yellow-400 rounded" style={{ maxWidth: `${(item.mora30 / 12) * 100}%` }} title={`30-60 días: ${item.mora30}`}></div>
                          <div className="flex-1 bg-red-500 rounded" style={{ maxWidth: `${(item.mora60 / 12) * 100}%` }} title={`60-90 días: ${item.mora60}`}></div>
                          <div className="flex-1 bg-red-900 rounded" style={{ maxWidth: `${(item.mora90 / 12) * 100}%` }} title={`90+ días: ${item.mora90}`}></div>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-4 text-sm pt-4 border-t">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded"></div><span>30-60 días</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded"></div><span>60-90 días</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-900 rounded"></div><span>90+ días</span></div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-red-50 border-red-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de Mora</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Créditos 30-60 días</p>
                      <p className="text-2xl font-bold text-red-600">10</p>
                      <p className="text-sm text-gray-600">Monto: $125,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Créditos 60-90 días</p>
                      <p className="text-2xl font-bold text-red-600">7</p>
                      <p className="text-sm text-gray-600">Monto: $95,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Créditos 90+ días</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                      <p className="text-sm text-gray-600">Monto: $45,000</p>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {selectedReport.tipo === 'creditos' && (
              <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución de Créditos por Tipo</h3>
                <div className="space-y-4">
                  {[
                    { tipo: 'Ordinario', cantidad: 450, monto: 2250000, color: 'bg-cyan-500' },
                    { tipo: 'Emergente', cantidad: 220, monto: 1650000, color: 'bg-green-500' },
                    { tipo: 'Décimos', cantidad: 180, monto: 720000, color: 'bg-yellow-500' },
                    { tipo: 'Utilidades', cantidad: 120, monto: 480000, color: 'bg-purple-500' },
                  ].map((item) => (
                    <div key={item.tipo}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{item.tipo}</span>
                        <span className="text-xs text-gray-500">{item.cantidad} créditos - ${(item.monto / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className={`${item.color} h-3 rounded-full`} style={{ width: `${(item.cantidad / 450) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Button variant="secondary" className="w-full" onClick={() => setSelectedReport(null)}>
              ← Volver a Reportes
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
}
