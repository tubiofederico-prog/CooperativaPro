# CooperativaPro - Instrucciones para Desarrollo

## Visión General

CooperativaPro es un prototipo visual 100% navegable de una plataforma B2B premium para gestión integral de cooperativas de ahorro y crédito. Es un proyecto 100% visual con datos mockeados, diseñado para presentaciones comerciales y como base para desarrollo futuro.

## Stack Confirmado

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 18 + TypeScript
- **Estilos:** TailwindCSS (con colores personalizados: primary, secondary, accent, danger, warning, success)
- **Gráficos:** Recharts (no Chart.js)
- **Iconos:** Emoji + Lucide React (opcional para mejorar)

## Arquitectura

### Principios de Diseño

1. **100% Visual:** Todo es navegable, no hay backend real
2. **Datos Mockeados:** Generados en `data/mockData.ts`, con 1,200+ socios y datos realistas
3. **Componentes Reutilizables:** En `components/ui/` (Button, Card, Badge, Table, Modal, Input, Select, TextArea)
4. **Layout Premium:** Sidebar + Header + Content (en `components/layout/`)
5. **Rutas Dinámicas:** `[id]` para detalles (socio, crédito, etc.)
6. **Estados Visuales:** Badge para estados (aprobado, pendiente, rechazado, en_mora, etc.)

### Estructura de Carpetas

```
app/                    # Páginas Next.js (App Router)
├── page.tsx           # Login
├── layout.tsx         # Layout global
├── globals.css        # Estilos globales
├── dashboard/
├── socios/
├── creditos/
├── ahorros/
├── convenios/
├── cruces/
├── reglas/
├── administrativo/
├── contable/
├── reportes/
├── usuarios/
└── migracion/

components/           # Componentes reutilizables
├── ui/               # Componentes básicos de UI
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Table.tsx
│   ├── Modal.tsx
│   ├── Input.tsx
│   └── ...
└── layout/          # Componentes de layout
    ├── Sidebar.tsx
    ├── Header.tsx
    └── Layout.tsx

data/                 # Datos mockeados
└── mockData.ts      # Generador y base de datos ficticia

types/               # Tipos TypeScript
└── index.ts        # Interfaces principales
```

## Estilo Visual Confirmado

### Colores (Tailwind)
- **Primary:** `#0F172A` (azul profundo oscuro)
- **Secondary:** `#1E293B` (gris oscuro)
- **Accent:** `#06B6D4` (cian brillante)
- **Success:** `#10B981` (verde)
- **Warning:** `#F59E0B` (ámbar)
- **Danger:** `#EF4444` (rojo)

### Componentes Visuales
- **Cards:** Blancas con border gris suave, sombra elegante
- **Buttons:** Primary (accent), Secondary (gray-700), Danger, Success, Outline
- **Badges:** Color según estado (activo=verde, pendiente=amarillo, rechazado=rojo, etc.)
- **Tablas:** Striped alternado, hover effect, acciones con buttons
- **Modales:** Dark overlay, rounded, shadow premium
- **Sidebar:** Dark (primary bg), iconos emoji, texto blanco
- **Header:** Blanco, buscador global, notificaciones, perfil

## Guía para Agregar Nuevos Módulos

### 1. Crear Tipos (si aplica)
En `types/index.ts`, agregar interfaces:
```typescript
export interface NuevoModulo {
  id: string;
  nombre: string;
  // ... campos
}
```

### 2. Agregar Datos Mock
En `data/mockData.ts`, crear función generadora:
```typescript
export function generarNuevosModulos(): NuevoModulo[] {
  // ... lógica
}

// Exportar en mockData al final
export const mockData = {
  // ... existentes
  nuevosModulos: generarNuevosModulos(),
};
```

### 3. Crear Página en App Router
`app/nuevomodulo/page.tsx`:
```typescript
'use client';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockData } from '@/data/mockData';

export default function NuevoModuloPage() {
  return (
    <Layout breadcrumbs={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Nuevo Módulo' }
    ]}>
      {/* Contenido */}
    </Layout>
  );
}
```

### 4. Agregar a Sidebar
En `components/layout/Sidebar.tsx`, añadir al array `menuItems`:
```typescript
{ id: 'nuevomodulo', label: 'Nuevo Módulo', href: '/nuevomodulo', icon: '🎯' },
```

## Reglas de Codificación

### React/TypeScript
- ✅ Usar `'use client'` en páginas interactivas
- ✅ Declarar tipos explícitamente (interfaces)
- ✅ Props con tipos definidos
- ✅ Nombres de componentes con PascalCase
- ✅ Nombres de funciones con camelCase
- ✅ Variables const cuando sea posible

### Componentes UI
- ✅ Props mínimos pero suficientes
- ✅ Defaultear variantes (size, variant, color)
- ✅ Usar Tailwind para estilos (NO inline styles)
- ✅ Shadows y rounded de `tailwind.config.ts`
- ✅ Icono con emoji o Lucide React

### Estructura de Páginas
- ✅ Layout principal con breadcrumbs
- ✅ Título (h1) con ícono (emoji)
- ✅ Cards para agrupar contenido
- ✅ Filtros/búsqueda si hay listados
- ✅ Tablas con acciones
- ✅ Modales para confirmaciones/formularios
- ✅ Badges para estados

### Datos Mock
- ✅ Generar de forma realista (nombres reales, empresas, salarios)
- ✅ Mantener consistencia (créditos con socios válidos)
- ✅ Usar fechas realistas
- ✅ Números que tenga sentido (salarios, montos, etc.)

## Flujos Visuales Implementados

### Flujo: Ver Listado → Detalle → Acciones
1. Página con tabla/listado
2. Click en fila → navega a `[id]/page.tsx`
3. En detalle: mostrar info completa + botones de acción
4. Botones abren modales (aprobar, rechazar, pagar, etc.)
5. Modal confirma acción (visual, sin persistencia)

### Flujo: Crear/Editar
1. Botón "Nueva [Entidad]" → abre Modal
2. Modal tiene formulario con campos
3. Submit → cierra modal (sin validación real)
4. Toast o confirmación visual

### Flujo: Reportes
1. Grid de reportes con card cada uno
2. Click en reporte → abre detalle con gráficos
3. Controles para período, exportación, etc.
4. Gráficos con Recharts (datos mockeados)

## Convenciones de Estado

### Estados Visuales (Badge)
```typescript
type EstadoBadge = 
  | 'activo' | 'inactivo' 
  | 'pendiente' | 'aprobado' | 'rechazado' 
  | 'en_mora' | 'desembolsado' | 'cancelado' 
  | 'suspendido' | 'bloqueado' | 'en_revisión' 
  | 'pausado' | 'vencido';
```

### Colores de Badge
- Verde → activo, aprobado, desembolsado, cancelado
- Amarillo → pendiente, en_revisión, pausado
- Rojo → rechazado, en_mora, suspendido, bloqueado, vencido
- Gris → inactivo

## Testing Visual

Antes de considerar una página "lista":
- ✅ Todos los botones funcionan (navegan o abren modales)
- ✅ Tablas con datos mock se muestran
- ✅ Filtros/búsqueda filtran datos localmente
- ✅ Modales abren y cierran
- ✅ Breadcrumbs navegan correctamente
- ✅ Responsive (desktop primary, mobile secondary)
- ✅ Sin errores de TypeScript

## Desarrollo Futuro (Post-Prototipo)

Si esto se convierte en producto real:

1. **Backend:** Node.js/Express o Python/Django
2. **BD:** PostgreSQL + migrations
3. **Auth:** JWT, OAuth, 2FA
4. **Validación:** Zod o Yup
5. **API:** REST o GraphQL
6. **Tests:** Vitest + React Testing Library
7. **CI/CD:** GitHub Actions
8. **Deploy:** Vercel o propio servidor
9. **Analytics:** Tracking de eventos
10. **Auditoría:** Logging de todas las operaciones

## Contacto y Preguntas

Este es un prototipo visual. Todos los cambios se hacen en el frontend. 
Para agregar datos, módulos o cambios visuales, consulta esta guía.

---

**CooperativaPro** - Prototipo Visual B2B Premium
