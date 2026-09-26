# Pet Journal — Listado de módulos

Módulos funcionales que se desarrollarán, con su descripción, los requerimientos que cubren y su prioridad.

**Criterio de prioridad**

- **Alta:** imprescindible para que el MVP funcione; se desarrolla primero.
- **Media:** forma parte del MVP, pero depende de que los módulos de prioridad alta estén listos.

## Módulos de dominio

| # | Módulo | Descripción | Requerimientos | Prioridad |
|---|--------|-------------|----------------|-----------|
| 1 | Gestión de Usuarios | Registro de cuenta, inicio y cierre de sesión, y hash de la contraseña. | RF01, RF02, RNF01 | Alta |
| 2 | Gestión de Mascotas y Responsables | CRUD de mascotas, generación y validación del código de invitación, asociación de nuevos responsables y control de acceso: es el único módulo que valida si un usuario tiene permiso sobre una mascota. | RF03, RF04, RF05, RF13, RNF02 | Alta |
| 3 | Gestión de Tareas Diarias | Generación de las instancias diarias de alimentación, medicación y paseo, y cambio de estado entre PENDIENTE y HECHO. Al marcarse como HECHO, la tarea pasa a formar parte del historial. | RF08, RF09, RF11 | Media |
| 4 | Gestión de Eventos Veterinarios | Registro y consulta de consultas, vacunas, estudios y diagnósticos ya realizados. | RF06, RF07 | Media |
| 5 | Gestión de Eventos Futuros y Avisos | Alta, edición, reprogramación y cancelación de turnos y controles. Cálculo de los próximos eventos que se muestran como avisos al ingresar. Cuando un evento futuro se marca como realizado, crea el registro correspondiente en Eventos Veterinarios. | RF10, RF12 | Media |

## Servicios que combinan módulos

| Servicio | Descripción | Requerimientos | Prioridad |
|----------|-------------|----------------|-----------|
| Servicio de Historial | No tiene un módulo de dominio propio: combina las tareas diarias marcadas como HECHO y los eventos veterinarios para armar el historial cronológico completo de una mascota. | RF06 | Media |

## Dependencias entre módulos

- Todos los módulos dependen de **Gestión de Usuarios**, porque requieren un usuario autenticado.
- Tareas Diarias, Eventos Veterinarios y Eventos Futuros consultan a **Gestión de Mascotas y Responsables** para verificar permisos.
- **Gestión de Eventos Futuros** depende de **Gestión de Eventos Veterinarios**, porque al marcar un turno como realizado se crea el registro histórico.
- El **Servicio de Historial** lee de Gestión de Tareas Diarias y de Gestión de Eventos Veterinarios.

## Orden de desarrollo

1. Gestión de Usuarios
2. Gestión de Mascotas y Responsables
3. Gestión de Eventos Veterinarios y Servicio de Historial
4. Gestión de Tareas Diarias
5. Gestión de Eventos Futuros y Avisos
