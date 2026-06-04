'use client';


import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Input, Select } from '@/components/ui/Input';

const asientosMock = [
  {
    id: 'AS001',
    numero: '001',
    fecha: '2024-06-01',
    cuenta: '1110',
    descripcion: 'Depósito de ahorros - Juan García',
    debe: 25000,
    haber: 0,
    estado: 'aprobado' as any,
  },
  {
    id: 'AS002',
    numero: '002',
    fecha: '2024-06-01',
    cuenta: '2110',
    descripcion: 'Desembolso de crédito ordinario',
    debe: 0,
    haber: 15000,
    estado: 'aprobado' as any,
  },
  {
    id: 'AS003',
    numero: '003',
    fecha: '2024-06-02',
    cuenta: '4110',
    descripcion: 'Ingresos por intereses',
    debe: 5200,
    haber: 0,
    estado: 'aprobado' as any,
  },
];

export default function ContablePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMes, setFilterMes] = useState('');

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Contable' },
      ]}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Panel Contable</h1>

        {/* Información de Período */}
        <Card className="bg-green-50 border-green-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Período Contable Actual</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">Período</p>
              <p className="font-bold text-gray-900">Junio 2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Débitos</p>
              <p className="font-bold text-green-600">$450,500</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Créditos</p>
              <p className="font-bold text-green-600">$450,500</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <p className="font-bold text-green-600">Balanceado ✓</p>
            </div>
          </div>
        </Card>

        {/* Filtros */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Buscar por descripción o cuenta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="🔍"
            />
            <Select
              options={[
                { value: '', label: 'Todos los períodos' },
                { value: '202406', label: 'Junio 2024' },
                { value: '202405', label: 'Mayo 2024' },
                { value: '202404', label: 'Abril 2024' },
              ]}
              value={filterMes}
              onChange={(e) => setFilterMes(e.target.value)}
            />
            <Button variant="secondary" className="h-11">
              📊 Exportar
            </Button>
          </div>
        </Card>

        {/* Asientos Contables */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Asientos Contables</h2>
          <Table
            columns={[
              { key: 'numero', label: 'Número', width: '8%' },
              { key: 'fecha', label: 'Fecha', width: '12%' },
              { key: 'cuenta', label: 'Cuenta', width: '10%' },
              { key: 'descripcion', label: 'Descripción', width: '40%' },
              {
                key: 'debe',
                label: 'Debe',
                align: 'right',
                render: (value) => value > 0 ? `$${value.toLocaleString()}` : '-',
              },
              {
                key: 'haber',
                label: 'Haber',
                align: 'right',
                render: (value) => value > 0 ? `$${value.toLocaleString()}` : '-',
              },
              {
                key: 'estado',
                label: 'Estado',
                render: (value) => <Badge status={value}>{value}</Badge>,
              },
            ]}
            data={asientosMock}
          />
        </Card>

        {/* Plan de Cuentas */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen por Cuenta</h2>
          <Table
            columns={[
              { key: 'codigo', label: 'Código', width: '12%' },
              { key: 'nombre', label: 'Nombre', width: '40%' },
              {
                key: 'saldo',
                label: 'Saldo',
                align: 'right',
                render: (value) => `$${value.toLocaleString()}`,
              },
            ]}
            data={[
              { codigo: '1110', nombre: 'Caja', saldo: 125000 },
              { codigo: '1120', nombre: 'Bancos', saldo: 450000 },
              { codigo: '1200', nombre: 'Cuentas por Cobrar', saldo: 180000 },
              { codigo: '2110', nombre: 'Depósitos de Socios', saldo: 1200000 },
              { codigo: '2120', nombre: 'Créditos Otorgados', saldo: 850000 },
              { codigo: '3110', nombre: 'Patrimonio', saldo: 500000 },
              { codigo: '4110', nombre: 'Ingresos por Intereses', saldo: 85000 },
              { codigo: '5110', nombre: 'Gastos Operacionales', saldo: 35000 },
            ]}
          />
        </Card>

        {/* Cierre Mensual */}
        <Card className="bg-yellow-50 border-yellow-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Cierre Mensual</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Próximo cierre: 30 de junio de 2024</p>
              <Button variant="secondary" className="w-full">
                📋 Preparar Cierre
              </Button>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Últimos cierres</p>
              <div className="space-y-2">
                <button className="w-full p-2 bg-white rounded-lg border border-gray-300 text-left hover:bg-gray-50">
                  Mayo 2024 - Cerrado ✓
                </button>
                <button className="w-full p-2 bg-white rounded-lg border border-gray-300 text-left hover:bg-gray-50">
                  Abril 2024 - Cerrado ✓
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
