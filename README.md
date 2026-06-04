# CooperativaPro

**Plataforma B2B Premium de Gestión Integral para Asociación de Trabajadores / Cooperativa de Ahorro y Crédito**

## Descripción

CooperativaPro es un prototipo visual completo y navegable desarrollado con Next.js 16, React, TailwindCSS y Recharts. Es una plataforma SaaS enterprise diseñada para gestionar integralmente las operaciones de una cooperativa o asociación de trabajadores.

## Características Principales

### 13 Módulos Principales

1. **Dashboard General** - Indicadores clave, métricas, alertas y actividad reciente
2. **Módulo de Socios** - Gestión completa de socios, perfiles, ahorros y deudas
3. **Módulo de Créditos** - Solicitudes, aprobaciones, simulaciones y seguimiento
4. **Módulo de Ahorros** - Gestión de cuentas de ahorro, intereses y movimientos
5. **Módulo de Cruces** - Operaciones de cruce entre ahorros y créditos
6. **Módulo de Convenios** - Gestión de casas comerciales y beneficios
7. **Módulo de Reglas de Negocio** - Configuración de tasas, límites y parámetros
8. **Módulo Administrativo** - Movimientos financieros y control administrativo
9. **Módulo Contable** - Asientos, movimientos contables y reportes
10. **Módulo de Reportes** - Reportes e indicadores financieros
11. **Módulo de Migración** - Importación de datos e integraciones
12. **Módulo de Usuarios** - Gestión de usuarios, roles y auditoría
13. **Portal del Socio** - Acceso de socios a sus datos (preparado para expandir)

### Características Visuales

- ✅ 100% visual, sin backend real
- ✅ Datos completamente mockeados (1,200 socios, 850+ créditos, etc.)
- ✅ Interfaz ultra premium B2B enterprise
- ✅ Diseño financiero, moderno y profesional
- ✅ Paleta sobria: azul profundo, gris grafito, cian/verde para positivos, rojo/ámbar para alertas
- ✅ Todos los botones, menús y CTAs son navegables
- ✅ Modales, tablas interactivas, gráficos dinámicos
- ✅ Estados visuales: aprobado, pendiente, rechazado, en mora, activo, bloqueado, etc.
- ✅ Breadcrumbs, navegación clara, buscador global
- ✅ Cards con métricas, badges de estado, tablas limpias

## Estructura del Proyecto

```
CooperativaPro/
├── app/
│   ├── layout.tsx                 # Layout global
│   ├── page.tsx                   # Login/Home
│   ├── globals.css                # Estilos globales
│   ├── dashboard/                 # Dashboard principal
│   ├── socios/                    # Módulo de Socios
│   │   ├── page.tsx              # Listado
│   │   └── [id]/page.tsx         # Detalle
│   ├── creditos/                  # Módulo de Créditos
│   │   ├── page.tsx              # Listado
│   │   └── [id]/page.tsx         # Detalle
│   ├── ahorros/                   # Módulo de Ahorros
│   ├── convenios/                 # Módulo de Convenios
│   ├── cruces/                    # Módulo de Cruces
│   ├── reglas/                    # Módulo de Reglas
│   ├── administrativo/            # Módulo Administrativo
│   ├── contable/                  # Módulo Contable
│   ├── reportes/                  # Módulo de Reportes
│   ├── usuarios/                  # Módulo de Usuarios
│   └── migracion/                 # Módulo de Migración
├── components/
│   ├── ui/                        # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   └── Input.tsx
│   └── layout/                    # Componentes de layout
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       └── Layout.tsx
├── data/
│   └── mockData.ts                # Datos mockeados (1,200 socios, etc.)
├── types/
│   └── index.ts                   # Tipos TypeScript
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── .gitignore
```

## Instalación

### Requisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar o descargar el proyecto**

```bash
cd CooperativaPro
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Ejecutar en desarrollo**

```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**

Accede a `http://localhost:3000`

## Datos de Prueba

**Login (cualquier email/contraseña funciona para este prototipo visual)**

```
Email: admin@cooperativa.com
Contraseña: cualquiera

O usa:
- tesoreria@cooperativa.com
- contabilidad@cooperativa.com
```

## Datos Mockeados Incluidos

- **1,200 socios** activos, suspendidos, bloqueados
- **850+ créditos** (ordinarios, emergentes, décimos, utilidades) en distintos estados
- **Ahorros** con saldos e intereses acumulados
- **500+ movimientos financieros** registrados
- **4 convenios comerciales** activos
- **3 reglas de crédito** configurables
- **Datos realistas** de empresas, puestos, salarios, etc.

## Flujos Principales Implementados

### Dashboard
- Indicadores KPI
- Gráficos de solicitudes y créditos
- Tabla de actividad reciente
- Alertas administrativas

### Socios
- Listado con filtros y búsqueda
- Perfil detallado con información laboral y salarial
- Consulta de ahorros y créditos
- Historial de movimientos
- Solicitud visual de crédito

### Créditos
- Listado con tabs por estado
- Detalle completo del crédito
- Cronograma de cuotas
- Aprobación/rechazo visual
- Registro de pagos

### Cruces de Ahorro-Crédito
- Solicitudes de cruce
- Validación automática
- Aprobación/rechazo con reglas

### Reportes
- Dashboard de reportes por tipo
- Gráficos dinámicos
- Exportación visual PDF/Excel
- Indicadores de mora, créditos, ahorros

### Usuarios
- Gestión de usuarios y roles
- Configuración de permisos
- Auditoría de actividades

## Interacciones Visuales

Todos los elementos son navegables:

- ✅ "Nuevo Socio" → Abre modal de registro
- ✅ "Ver Detalle" → Navega a página de detalle
- ✅ "Solicitar Crédito" → Abre formulario/wizard
- ✅ "Aprobar/Rechazar" → Modales de confirmación
- ✅ "Exportar" → Toast de simulación
- ✅ "Generar Reporte" → Abre vista de reporte
- ✅ Breadcrumbs → Navegación funcional
- ✅ Sidebar → Navegación entre módulos
- ✅ Tablas → Clickeables para ver detalles

## Stack Tecnológico

- **Framework:** Next.js 16
- **UI:** React 18
- **Estilos:** TailwindCSS 3.3
- **Gráficos:** Recharts 2.10
- **Lenguaje:** TypeScript 5.3
- **Iconos:** Emoji + Lucide React

## Uso Comercial

Este prototipo es ideal para:
- ✅ Presentaciones comerciales a cooperativas
- ✅ Propuestas de desarrollo de software a medida
- ✅ Demos funcionales para inversionistas
- ✅ Base para desarrollo de producto real
- ✅ Documentación visual de requerimientos

## Notas de Desarrollo

- El login es visual, cualquier credencial funciona
- No hay validación de datos (es un prototipo visual)
- Los datos se regeneran en cada recarga (state en memoria)
- Los gráficos usan Recharts con datos mockeados
- Todo está optimizado para pantallas desktop (responsive adaptativo)

## Próximos Pasos (si se desarrolla en producción)

1. Conectar a backend real (Node.js/Python/Go)
2. Integración con base de datos (PostgreSQL/MongoDB)
3. Autenticación real (JWT)
4. Validación de formularios
5. Manejo de errores robusto
6. Testing unitario y E2E
7. Deployment en servidor
8. Encriptación de datos sensibles
9. Auditoría real en BD
10. Portal del Socio completo

## Licencia

Prototipo visual - Uso comercial permitido con atribución a CooperativaPro.

## Contacto

Para preguntas sobre desarrollo o customización, contacta al equipo de desarrollo.

---

**CooperativaPro** - Gestión Integral de Cooperativas de Ahorro y Crédito 🏦
