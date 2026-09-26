# Base de datos — MongoDB

Scripts que crean la estructura de la base de Pet Journal. MongoDB no usa `CREATE TABLE`: el equivalente al DDL es crear cada colección con un **validador `$jsonSchema`** (campos obligatorios, tipos y valores permitidos) y definir sus **índices**. El script de datos de prueba cumple el rol del DML.

## Scripts

Se ejecutan en orden con `mongosh`:

| Script | Contenido |
|--------|-----------|
| `scripts/01_crear_colecciones.js` | Crea las 5 colecciones con sus validadores |
| `scripts/02_indices.js` | Crea los índices principales |
| `scripts/03_datos_prueba.js` | Inserta datos de ejemplo |

```bash
mongosh "mongodb://localhost:27017/petjournal" scripts/01_crear_colecciones.js scripts/02_indices.js scripts/03_datos_prueba.js
```

## Colecciones

| Colección | Clave primaria | Referencias |
|-----------|----------------|-------------|
| `usuarios` | `_id` (ObjectId) | — |
| `mascotas` | `_id` (ObjectId) | `responsables[].usuarioId` → `usuarios._id` (embebido, relación M:N) |
| `tareasDiarias` | `_id` (ObjectId) | `mascotaId` → `mascotas._id` |
| `eventosVeterinarios` | `_id` (ObjectId) | `mascotaId` → `mascotas._id` |
| `eventosFuturos` | `_id` (ObjectId) | `mascotaId` → `mascotas._id` |

## Valores controlados (enums)

| Campo | Valores |
|-------|---------|
| `mascotas.tipo` | `perro`, `gato`, `otro` |
| `mascotas.sexo` | `macho`, `hembra` |
| `tareasDiarias.tipo` | `ALIMENTACION`, `MEDICACION`, `PASEO` |
| `tareasDiarias.estado` | `PENDIENTE`, `HECHO` |
| `tipoConsulta` (eventos veterinarios y futuros) | `CONTROL`, `URGENCIA`, `ESPECIALISTA`, `VACUNA` |
| `eventosFuturos.estado` | `PENDIENTE`, `REALIZADO`, `CANCELADO` |

## Índices principales

| Colección | Índice | Motivo |
|-----------|--------|--------|
| `usuarios` | `email` (único) | Login e impedir cuentas duplicadas |
| `mascotas` | `responsables.usuarioId` | "Mis mascotas" y validación de permisos (RF05, RF13) |
| `mascotas` | `codigoInvitacion` (único) | Vinculación de nuevos responsables (RF04) |
| `tareasDiarias` | `{ mascotaId, fecha }` | Lista de tareas del día de una mascota (RF08) |
| `eventosVeterinarios` | `{ mascotaId, fecha: -1 }` | Historial ordenado cronológicamente (RF06) |
| `eventosFuturos` | `{ mascotaId, fecha }` | Eventos futuros de una mascota (RF10) |
| `eventosFuturos` | `{ estado, fecha }` | Cálculo de avisos próximos (RF12) |
