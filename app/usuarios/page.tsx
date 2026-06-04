'use client';


import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';
import { mockData } from '@/data/mockData';

export default function UsuariosPage() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [activeTab, setActiveTab] = useState('usuarios');

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Usuarios y Seguridad' },
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Usuarios y Seguridad</h1>
          <Button variant="primary" onClick={() => setShowNewUserModal(true)}>
            ➕ Nuevo Usuario
          </Button>
        </div>

        {/* Tabs */}
        <Card>
          <div className="flex gap-2 pb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('usuarios')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'usuarios'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Usuarios
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'roles'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Roles y Permisos
            </button>
            <button
              onClick={() => setActiveTab('auditoria')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'auditoria'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Auditoría
            </button>
          </div>
        </Card>

        {activeTab === 'usuarios' && (
          <>
            {/* Tabla de Usuarios */}
            <Card>
              <Table
                columns={[
                  { key: 'nombre', label: 'Nombre', width: '25%' },
                  { key: 'email', label: 'Email', width: '25%' },
                  { key: 'departamento', label: 'Departamento', width: '20%' },
                  {
                    key: 'rol',
                    label: 'Rol',
                    render: (value) => {
                      const roles: any = {
                        administrador: 'primary',
                        tesoreria: 'success',
                        contabilidad: 'primary',
                        atencion_socio: 'primary',
                        auditor: 'warning',
                        socio: 'primary',
                      };
                      return <Badge status={roles[value] || 'primary'}>{value}</Badge>;
                    },
                  },
                  {
                    key: 'estado',
                    label: 'Estado',
                    render: (value) => <Badge status={value as any}>{value}</Badge>,
                  },
                  {
                    key: 'id',
                    label: 'Acción',
                    render: () => <Button variant="secondary" size="sm">Editar</Button>,
                  },
                ]}
                data={mockData.usuarios}
              />
            </Card>
          </>
        )}

        {activeTab === 'roles' && (
          <>
            {/* Roles y Permisos */}
            <div className="grid grid-cols-1 gap-6">
              {[
                { rol: 'Administrador', permisos: ['Acceso total', 'Gestión de usuarios', 'Configuración del sistema'] },
                { rol: 'Tesorería', permisos: ['Ver créditos', 'Procesar pagos', 'Ver ahorros', 'Registrar movimientos'] },
                { rol: 'Contabilidad', permisos: ['Ver asientos', 'Generar reportes', 'Ver movimientos contables'] },
                { rol: 'Atención al Socio', permisos: ['Ver socios', 'Crear solicitudes', 'Consultar ahorros'] },
              ].map((item, idx) => (
                <Card key={idx}>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.rol}</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.permisos.map((permiso, pidx) => (
                      <span key={pidx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        ✓ {permiso}
                      </span>
                    ))}
                  </div>
                  <Button variant="secondary" size="sm" className="mt-4">
                    Editar Permisos
                  </Button>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 'auditoria' && (
          <>
            {/* Bitácora de Auditoría */}
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Historial de Actividades</h2>
              <Table
                columns={[
                  { key: 'usuario', label: 'Usuario', width: '20%' },
                  { key: 'accion', label: 'Acción', width: '35%' },
                  { key: 'fecha', label: 'Fecha', width: '20%' },
                  { key: 'ip', label: 'IP', width: '15%' },
                  {
                    key: 'resultado',
                    label: 'Resultado',
                    render: (value) => <Badge status={value as any}>{value}</Badge>,
                  },
                ]}
                data={[
                  {
                    usuario: 'Admin Sistema',
                    accion: 'Aprobó crédito CRED-000145',
                    fecha: '2024-06-04 14:30',
                    ip: '192.168.1.100',
                    resultado: 'aprobado',
                  },
                  {
                    usuario: 'Luis Tesorería',
                    accion: 'Registró pago de $2,500',
                    fecha: '2024-06-04 13:15',
                    ip: '192.168.1.101',
                    resultado: 'aprobado',
                  },
                  {
                    usuario: 'Rosa Contabilidad',
                    accion: 'Generó reporte de mora',
                    fecha: '2024-06-04 12:00',
                    ip: '192.168.1.102',
                    resultado: 'aprobado',
                  },
                  {
                    usuario: 'Ana Atención',
                    accion: 'Intentó cambiar regla de crédito',
                    fecha: '2024-06-04 10:45',
                    ip: '192.168.1.103',
                    resultado: 'rechazado',
                  },
                ]}
              />
            </Card>
          </>
        )}

        {/* Configuración de Seguridad */}
        <Card className="bg-purple-50 border-purple-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Configuración de Seguridad</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-200">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-gray-900">Requerir autenticación de dos factores</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-200">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-gray-900">Registrar todas las actividades en auditoría</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-200">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-gray-900">Encriptación de datos sensibles</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-200">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-gray-900">Restringir acceso por IP</span>
            </label>
          </div>
          <Button variant="primary" className="mt-6">
            💾 Guardar Configuración
          </Button>
        </Card>

        {/* Modal Nuevo Usuario */}
        <Modal
          isOpen={showNewUserModal}
          onClose={() => setShowNewUserModal(false)}
          title="Crear Nuevo Usuario"
          size="lg"
          actions={
            <>
              <Button variant="secondary" onClick={() => setShowNewUserModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setShowNewUserModal(false)}>
                Crear Usuario
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input label="Nombre Completo" placeholder="Ej: Juan Pérez" />
            <Input label="Email" type="email" placeholder="juan@cooperativa.com" />
            <Input label="Contraseña" type="password" placeholder="••••••••" />
            <Select
              label="Rol"
              options={[
                { value: 'administrador', label: 'Administrador' },
                { value: 'tesoreria', label: 'Tesorería' },
                { value: 'contabilidad', label: 'Contabilidad' },
                { value: 'atencion_socio', label: 'Atención al Socio' },
                { value: 'auditor', label: 'Auditor' },
              ]}
            />
            <Select
              label="Departamento"
              options={[
                { value: 'direccion', label: 'Dirección' },
                { value: 'tesoreria', label: 'Tesorería' },
                { value: 'contabilidad', label: 'Contabilidad' },
                { value: 'atencion', label: 'Atención al Socio' },
              ]}
            />
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
