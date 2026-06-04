export interface Socio {
  id: string;
  codigo: string;
  nombre: string;
  cedula: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaIngreso: string;
  estado: 'activo' | 'suspendido' | 'bloqueado' | 'inactivo';
  ahorroTotal: number;
  deudaTotal: number;
  capacidadCredito: number;
  salarioPromedio: number;
  empresa: string;
  puesto: string;
}

export interface Credito {
  id: string;
  numero: string;
  socioId: string;
  socioNombre: string;
  tipo: 'ordinario' | 'emergente' | 'decimo' | 'utilidad';
  monto: number;
  tasa: number;
  plazo: number;
  cuota: number;
  estado: 'pendiente' | 'aprobado' | 'rechazado' | 'desembolsado' | 'cancelado' | 'en_mora';
  fechaSolicitud: string;
  fechaAprobacion?: string;
  fechaDesembolso?: string;
  motivoRechazo?: string;
  saldoPendiente: number;
  cuotasPagadas: number;
  cuotasVencidas: number;
}

export interface Ahorro {
  id: string;
  socioId: string;
  socioNombre: string;
  tipo: 'obligatorio' | 'voluntario';
  saldo: number;
  tasaInteres: number;
  interesesAcumulados: number;
  fechaUltimoMovimiento: string;
}

export interface MovimientoFinanciero {
  id: string;
  socioId: string;
  tipo: 'deposito' | 'retiro' | 'pago_cuota' | 'interes' | 'descuento';
  monto: number;
  fecha: string;
  descripcion: string;
  referencia: string;
}

export interface Convenio {
  id: string;
  nombre: string;
  empresa: string;
  estado: 'activo' | 'pausado' | 'vencido';
  beneficio: string;
  descuento: number;
  contacto: string;
  telefono: string;
  email: string;
  fechaVencimiento: string;
  requisitos: string[];
}

export interface ReglaCredito {
  id: string;
  nombre: string;
  tipo: 'ordinario' | 'emergente' | 'decimo' | 'utilidad';
  tasaInteres: number;
  plazoMinimo: number;
  plazoMaximo: number;
  montoMinimo: number;
  montoMaximo: number;
  porcentajeSalario: number;
  requireAhorros: boolean;
  montoMinimoAhorros: number;
  estado: 'activo' | 'inactivo';
  fechaCreacion: string;
  ultimaModificacion: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'administrador' | 'tesoreria' | 'contabilidad' | 'atencion_socio' | 'auditor' | 'socio';
  estado: 'activo' | 'inactivo';
  departamento: string;
  ultimaActividad: string;
  permisos: string[];
}

export interface Cruce {
  id: string;
  socioId: string;
  socioNombre: string;
  ahorroDisponible: number;
  deudaTotal: number;
  montoSolicitado: number;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  motivo?: string;
  fechaSolicitud: string;
  fechaAprobacion?: string;
}

export interface ReporteCredito {
  periodo: string;
  totalSolicitados: number;
  totalAprobados: number;
  totalRechazados: number;
  montoSolicitado: number;
  montoAprobado: number;
  montoDesembolsado: number;
  tasaAprobacion: number;
}

export interface Notificacion {
  id: string;
  tipo: 'alerta' | 'info' | 'exito' | 'advertencia';
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
}
