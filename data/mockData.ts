import { Socio, Credito, Ahorro, MovimientoFinanciero, Convenio, ReglaCredito, Usuario, Cruce, Notificacion } from '@/types';

const nombres = [
  'Juan García', 'María López', 'Carlos Rodríguez', 'Ana Martínez', 'Luis Fernández',
  'Patricia González', 'Miguel Sánchez', 'Isabel Ramírez', 'Francisco Jiménez', 'Elena Ruiz',
  'Rafael Morales', 'Rosa Díaz', 'Jorge Peña', 'Sofía Vargas', 'Antonio Núñez',
];

const empresas = [
  'Telecom', 'Banco Nacional', 'Industrias del Pacífico', 'Construcciones Mayol', 'Farmacia del Doctor',
  'Seguros Unión', 'Distribuidora Maya', 'Hotel Continental', 'Café Exportador', 'Comercial Regional',
];

const puestos = [
  'Gerente', 'Asistente Administrativo', 'Técnico', 'Operario', 'Vendedor',
  'Contador', 'Supervisor', 'Coordinador', 'Especialista', 'Director',
];

export function generarSocios(cantidad: number): Socio[] {
  const socios: Socio[] = [];

  for (let i = 1; i <= cantidad; i++) {
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const empresa = empresas[Math.floor(Math.random() * empresas.length)];

    socios.push({
      id: `S${String(i).padStart(6, '0')}`,
      codigo: `COD${String(i).padStart(5, '0')}`,
      nombre: `${nombre} ${i}`,
      cedula: `${String(i).padStart(10, '0')}`,
      email: `socio${i}@cooperativa.com`,
      telefono: `+1 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      direccion: `Calle ${i}, Ciudad ${i % 10}`,
      fechaIngreso: new Date(2018 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      estado: ['activo', 'activo', 'activo', 'suspendido', 'bloqueado'][Math.floor(Math.random() * 5)] as any,
      ahorroTotal: Math.floor(Math.random() * 50000) + 5000,
      deudaTotal: Math.floor(Math.random() * 100000),
      capacidadCredito: Math.floor(Math.random() * 150000) + 20000,
      salarioPromedio: Math.floor(Math.random() * 30000) + 8000,
      empresa,
      puesto: puestos[Math.floor(Math.random() * puestos.length)],
    });
  }

  return socios;
}

export function generarCreditos(socios: Socio[]): Credito[] {
  const creditos: Credito[] = [];
  let contador = 1;

  for (const socio of socios.slice(0, Math.floor(socios.length * 0.6))) {
    const cantidad = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < cantidad; i++) {
      const tipo = ['ordinario', 'ordinario', 'ordinario', 'emergente', 'decimo', 'utilidad'][Math.floor(Math.random() * 6)] as any;
      const tasa = { ordinario: 8, emergente: 12, decimo: 5, utilidad: 5 }[tipo];
      const monto = Math.floor(Math.random() * 50000) + 5000;
      const plazo = Math.floor(Math.random() * 36) + 6;
      const cuota = Math.round((monto * (1 + tasa / 100 / 12)) / plazo);

      creditos.push({
        id: `CR${String(contador).padStart(6, '0')}`,
        numero: `CRED-${String(contador).padStart(6, '0')}`,
        socioId: socio.id,
        socioNombre: socio.nombre,
        tipo,
        monto,
        tasa,
        plazo,
        cuota,
        estado: ['pendiente', 'aprobado', 'aprobado', 'aprobado', 'rechazado', 'desembolsado', 'desembolsado', 'en_mora', 'cancelado'][Math.floor(Math.random() * 9)] as any,
        fechaSolicitud: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        fechaAprobacion: Math.random() > 0.3 ? new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0] : undefined,
        fechaDesembolso: Math.random() > 0.4 ? new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0] : undefined,
        motivoRechazo: Math.random() > 0.9 ? 'Capacidad crediticia insuficiente' : undefined,
        saldoPendiente: Math.floor(Math.random() * monto),
        cuotasPagadas: Math.floor(Math.random() * plazo),
        cuotasVencidas: Math.floor(Math.random() * 3),
      });

      contador++;
    }
  }

  return creditos;
}

export function generarAhorros(socios: Socio[]): Ahorro[] {
  return socios.map((socio, i) => ({
    id: `AH${String(i + 1).padStart(6, '0')}`,
    socioId: socio.id,
    socioNombre: socio.nombre,
    tipo: Math.random() > 0.3 ? 'obligatorio' : 'voluntario',
    saldo: socio.ahorroTotal,
    tasaInteres: 3 + Math.random() * 4,
    interesesAcumulados: Math.floor(socio.ahorroTotal * 0.05),
    fechaUltimoMovimiento: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  }));
}

export function generarMovimientos(): MovimientoFinanciero[] {
  const movimientos: MovimientoFinanciero[] = [];

  for (let i = 1; i <= 500; i++) {
    const tipo = ['deposito', 'retiro', 'pago_cuota', 'interes', 'descuento'][Math.floor(Math.random() * 5)] as any;

    movimientos.push({
      id: `MV${String(i).padStart(6, '0')}`,
      socioId: `S${String(Math.floor(Math.random() * 1200) + 1).padStart(6, '0')}`,
      tipo,
      monto: Math.floor(Math.random() * 10000) + 100,
      fecha: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      descripcion: `Movimiento de ${tipo}`,
      referencia: `REF${String(i).padStart(6, '0')}`,
    });
  }

  return movimientos;
}

export const convenios: Convenio[] = [
  {
    id: 'CV001',
    nombre: 'Farmacias del Doctor',
    empresa: 'Farmacias del Doctor S.A.',
    estado: 'activo',
    beneficio: 'Descuento 15% en medicamentos',
    descuento: 15,
    contacto: 'Juan García',
    telefono: '+1-234-567-8900',
    email: 'contacto@farmaciasdoctor.com',
    fechaVencimiento: '2025-12-31',
    requisitos: ['Activo en la cooperativa', 'Mínimo 6 meses de afiliación'],
  },
  {
    id: 'CV002',
    nombre: 'Hotel Continental',
    empresa: 'Cadena Hotelera',
    estado: 'activo',
    beneficio: 'Descuento 20% en hospedaje',
    descuento: 20,
    contacto: 'María López',
    telefono: '+1-234-567-8901',
    email: 'reservas@hotelcontinental.com',
    fechaVencimiento: '2025-06-30',
    requisitos: ['Activo en la cooperativa'],
  },
  {
    id: 'CV003',
    nombre: 'Tienda El Éxito',
    empresa: 'Comercial Retail',
    estado: 'activo',
    beneficio: 'Descuento 10% en todas las compras',
    descuento: 10,
    contacto: 'Carlos Rodríguez',
    telefono: '+1-234-567-8902',
    email: 'convenios@tiendaexito.com',
    fechaVencimiento: '2025-09-15',
    requisitos: ['Activo en la cooperativa', 'Saldo mínimo de ahorros'],
  },
  {
    id: 'CV004',
    nombre: 'Clínica Privada Plus',
    empresa: 'Servicios Médicos',
    estado: 'activo',
    beneficio: 'Consulta a mitad de precio',
    descuento: 50,
    contacto: 'Dra. Patricia Sánchez',
    telefono: '+1-234-567-8903',
    email: 'afiliaciones@clinicaplus.com',
    fechaVencimiento: '2025-11-30',
    requisitos: ['Activo en la cooperativa', 'Cuota de afiliación'],
  },
];

export const reglasCredito: ReglaCredito[] = [
  {
    id: 'RG001',
    nombre: 'Crédito Ordinario Estándar',
    tipo: 'ordinario',
    tasaInteres: 8,
    plazoMinimo: 6,
    plazoMaximo: 60,
    montoMinimo: 1000,
    montoMaximo: 100000,
    porcentajeSalario: 50,
    requireAhorros: true,
    montoMinimoAhorros: 2000,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    ultimaModificacion: '2024-06-01',
  },
  {
    id: 'RG002',
    nombre: 'Crédito Emergente',
    tipo: 'emergente',
    tasaInteres: 12,
    plazoMinimo: 3,
    plazoMaximo: 24,
    montoMinimo: 500,
    montoMaximo: 50000,
    porcentajeSalario: 30,
    requireAhorros: false,
    montoMinimoAhorros: 0,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    ultimaModificacion: '2024-06-01',
  },
  {
    id: 'RG003',
    nombre: 'Crédito por Décimos',
    tipo: 'decimo',
    tasaInteres: 5,
    plazoMinimo: 6,
    plazoMaximo: 12,
    montoMinimo: 500,
    montoMaximo: 80000,
    porcentajeSalario: 100,
    requireAhorros: false,
    montoMinimoAhorros: 0,
    estado: 'activo',
    fechaCreacion: '2024-01-01',
    ultimaModificacion: '2024-06-01',
  },
];

export const usuarios: Usuario[] = [
  {
    id: 'U001',
    nombre: 'Admin Sistema',
    email: 'admin@cooperativa.com',
    rol: 'administrador',
    estado: 'activo',
    departamento: 'Dirección',
    ultimaActividad: new Date().toISOString().split('T')[0],
    permisos: ['*'],
  },
  {
    id: 'U002',
    nombre: 'Luis Tesorería',
    email: 'tesoreria@cooperativa.com',
    rol: 'tesoreria',
    estado: 'activo',
    departamento: 'Tesorería',
    ultimaActividad: new Date().toISOString().split('T')[0],
    permisos: ['ver_creditos', 'procesar_pagos', 'ver_ahorros'],
  },
  {
    id: 'U003',
    nombre: 'Rosa Contabilidad',
    email: 'contabilidad@cooperativa.com',
    rol: 'contabilidad',
    estado: 'activo',
    departamento: 'Contabilidad',
    ultimaActividad: new Date().toISOString().split('T')[0],
    permisos: ['ver_asientos', 'generar_reportes', 'ver_movimientos'],
  },
  {
    id: 'U004',
    nombre: 'Ana Atención Socio',
    email: 'atencion@cooperativa.com',
    rol: 'atencion_socio',
    estado: 'activo',
    departamento: 'Atención al Socio',
    ultimaActividad: new Date().toISOString().split('T')[0],
    permisos: ['ver_socios', 'crear_solicitudes', 'consultar_ahorros'],
  },
];

export const notificaciones: Notificacion[] = [
  {
    id: 'N001',
    tipo: 'alerta',
    titulo: 'Crédito en mora',
    mensaje: '5 créditos están en mora por más de 30 días',
    fecha: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    leida: false,
  },
  {
    id: 'N002',
    tipo: 'info',
    titulo: 'Solicitud pendiente',
    mensaje: 'Hay 12 solicitudes de crédito pendientes de revisión',
    fecha: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    leida: false,
  },
  {
    id: 'N003',
    tipo: 'exito',
    titulo: 'Crédito aprobado',
    mensaje: 'Se aprobó el crédito CRED-000145 por $15,000',
    fecha: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    leida: false,
  },
  {
    id: 'N004',
    tipo: 'advertencia',
    titulo: 'Capacidad crediticia baja',
    mensaje: '145 socios tienen capacidad crediticia inferior a $10,000',
    fecha: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    leida: true,
  },
];

const socios = generarSocios(1200);
const creditos = generarCreditos(socios);
const ahorros = generarAhorros(socios);
const movimientos = generarMovimientos();

export const mockData = {
  socios,
  creditos,
  ahorros,
  movimientos,
  convenios,
  reglasCredito,
  usuarios,
  notificaciones,
};
