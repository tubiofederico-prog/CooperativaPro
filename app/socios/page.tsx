'use client';

import { useState } from 'react';


import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { mockData } from '@/data/mockData';

export default function SociosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [showNewSocioModal, setShowNewSocioModal] = useState(false);
  const [newSocio, setNewSocio] = useState({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    empresa: '',
  });

  const filteredSocios = mockData.socios.filter(
    (socio) =>
      (socio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        socio.cedula.includes(searchTerm)) &&
      (!filterEstado || socio.estado === filterEstado)
  );

  const handleNewSocio = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewSocioModal(false);
    setNewSocio({ nombre: '', cedula: '', email: '', telefono: '', empresa: '' });
  };

  const handleViewSocio = (socioId: string) => {
    router.push(`/socios/${socioId}`);
  };

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Socios' },
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Socios</h1>
          <Button variant="primary" onClick={() => setShowNewSocioModal(true)}>
            ➕ Nuevo Socio
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Buscar por nombre o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="🔍"
            />
            <Select
              options={[
                { value: '', label: 'Todos los estados' },
                { value: 'activo', label: 'Activo' },
                { value: 'inactivo', label: 'Inactivo' },
                { value: 'suspendido', label: 'Suspendido' },
                { value: 'bloqueado', label: 'Bloqueado' },
              ]}
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
            />
            <Button variant="secondary" className="h-11">
              📊 Exportar
            </Button>
          </div>
        </Card>

        {/* Tabla de Socios */}
        <Card>
          <Table
            columns={[
              { key: 'codigo', label: 'Código', width: '10%' },
              { key: 'nombre', label: 'Nombre', width: '25%' },
              { key: 'cedula', label: 'Cédula', width: '15%' },
              { key: 'email', label: 'Email', width: '20%' },
              {
                key: 'estado',
                label: 'Estado',
                render: (value) => <Badge status={value as any}>{value}</Badge>,
              },
              {
                key: 'ahorroTotal',
                label: 'Ahorros',
                align: 'right',
                render: (value) => `$${(value / 1000).toFixed(1)}K`,
              },
              {
                key: 'id',
                label: 'Acción',
                render: (value) => (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewSocio(value)}
                  >
                    Ver
                  </Button>
                ),
              },
            ]}
            data={filteredSocios}
            hoverable
          />
        </Card>

        {/* Modal Nuevo Socio */}
        <Modal
          isOpen={showNewSocioModal}
          onClose={() => setShowNewSocioModal(false)}
          title="Registrar Nuevo Socio"
          size="lg"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowNewSocioModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleNewSocio}>
                Registrar Socio
              </Button>
            </>
          }
        >
          <form className="space-y-4">
            <Input
              label="Nombre Completo"
              placeholder="Ej: Juan García López"
              value={newSocio.nombre}
              onChange={(e) => setNewSocio({ ...newSocio, nombre: e.target.value })}
              required
            />
            <Input
              label="Cédula"
              placeholder="Ej: 0123456789"
              value={newSocio.cedula}
              onChange={(e) => setNewSocio({ ...newSocio, cedula: e.target.value })}
              required
            />
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="Ej: juan@email.com"
              value={newSocio.email}
              onChange={(e) => setNewSocio({ ...newSocio, email: e.target.value })}
              required
            />
            <Input
              label="Teléfono"
              placeholder="+1-234-567-8900"
              value={newSocio.telefono}
              onChange={(e) => setNewSocio({ ...newSocio, telefono: e.target.value })}
              required
            />
            <Input
              label="Empresa"
              placeholder="Nombre de la empresa"
              value={newSocio.empresa}
              onChange={(e) => setNewSocio({ ...newSocio, empresa: e.target.value })}
              required
            />
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
