# Backend — Node.js + Express

API REST de Pet Journal.

## Cómo ejecutarlo

Requiere Node.js 20 o superior y una base MongoDB (local o en Atlas). Antes de levantar la API conviene correr los scripts de [`/database`](../database/README.md), que crean las colecciones con sus validaciones e índices.

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

El servidor queda escuchando en `http://localhost:3000` (o en el puerto definido en `PORT`). Para verificar que la API y la base estén funcionando: `GET http://localhost:3000/api/health`.

## Pruebas

- `npm test` corre las pruebas unitarias de `tests/` (utilidades, historial y validaciones) con el runner de Node, sin necesidad de base de datos.
- `tests/pet-journal.postman_collection.json` tiene las pruebas de los endpoints. Se importa en Postman o en Thunder Client y se corre en orden con el backend levantado: cada pedido guarda en variables lo que necesitan los siguientes (token, id de la mascota, etc.).

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor |
| `MONGODB_URI` | Cadena de conexión a MongoDB |
| `CORS_ORIGIN` | URL del frontend que puede consumir la API. Pueden ser varias separadas por coma |
| `JWT_SECRET` | Clave para firmar los tokens (obligatoria) |
| `JWT_EXPIRES_IN` | Duración del token (por ejemplo `7d`) |

## Endpoints

| Método | Ruta | Descripción | Requiere token |
|--------|------|-------------|----------------|
| GET | `/api/health` | Estado de la API y de la base | No |
| POST | `/api/auth/registro` | Crea una cuenta y devuelve el token | No |
| POST | `/api/auth/login` | Inicia sesión y devuelve el token | No |
| GET | `/api/auth/perfil` | Datos del usuario autenticado | Sí |
| GET | `/api/mascotas` | Mascotas a las que tiene acceso el usuario | Sí |
| POST | `/api/mascotas` | Crea una mascota (el usuario queda como responsable) | Sí |
| GET | `/api/mascotas/:id` | Perfil de una mascota con sus responsables | Sí |
| PUT | `/api/mascotas/:id` | Modifica una mascota | Sí |
| DELETE | `/api/mascotas/:id` | Elimina una mascota con sus tareas, actividades, eventos, pesos y notas | Sí |
| POST | `/api/mascotas/vincular` | Suma al usuario como responsable usando el `codigoInvitacion` | Sí |
| GET | `/api/mascotas/:mascotaId/eventos-veterinarios` | Consultas, vacunas, estudios y diagnósticos de la mascota | Sí |
| POST | `/api/mascotas/:mascotaId/eventos-veterinarios` | Registra un evento veterinario (la fecha es opcional, por defecto hoy) | Sí |
| GET | `/api/mascotas/:mascotaId/actividades` | Actividades recurrentes de la mascota | Sí |
| POST | `/api/mascotas/:mascotaId/actividades` | Crea una actividad (`tipo`, `hora`, `descripcion`, `desde`) | Sí |
| PUT | `/api/actividades/:id` | Modifica o desactiva una actividad (`activa: false`) | Sí |
| DELETE | `/api/actividades/:id` | Elimina una actividad (las tareas ya hechas quedan en el historial) | Sí |
| GET | `/api/mascotas/:mascotaId/tareas?fecha=AAAA-MM-DD` | Tareas del día de la mascota (se generan a partir de las actividades) | Sí |
| GET | `/api/tareas?fecha=AAAA-MM-DD` | Tareas del día de todas las mascotas del usuario | Sí |
| PATCH | `/api/tareas/:id/estado` | Cambia el estado a `PENDIENTE` o `HECHO` | Sí |
| GET | `/api/mascotas/:mascotaId/eventos-futuros` | Turnos y controles de la mascota (filtro opcional `estado`) | Sí |
| POST | `/api/mascotas/:mascotaId/eventos-futuros` | Crea un evento futuro (`fecha` con hora, `titulo`, `tipoConsulta`, `descripcion`) | Sí |
| PUT | `/api/eventos-futuros/:id` | Reprograma o modifica un evento pendiente | Sí |
| PATCH | `/api/eventos-futuros/:id/cancelar` | Cancela un evento pendiente | Sí |
| PATCH | `/api/eventos-futuros/:id/realizar` | Lo marca como realizado y lo pasa al historial veterinario | Sí |
| GET | `/api/avisos` | Turnos pendientes de los próximos 7 días (y los que ya pasaron sin marcarse) | Sí |
| GET | `/api/mascotas/:mascotaId/registros` | Cambios de peso y notas de la mascota | Sí |
| POST | `/api/mascotas/:mascotaId/registros` | Registra un peso (`tipo: PESO`, `peso`) o una nota (`tipo: NOTA`, `texto`). Un peso nuevo actualiza el perfil | Sí |
| GET | `/api/mascotas/:mascotaId/historial` | Historial cronológico. Filtros opcionales: `categoria` (`cotidiano` o `veterinario`), `tipo`, `desde` y `hasta` (`AAAA-MM-DD`) | Sí |

Los endpoints protegidos esperan el header `Authorization: Bearer <token>`. Los errores se devuelven siempre con el formato `{ "mensaje": "..." }`.

## Estructura

| Carpeta | Capa | Contenido |
|---------|------|-----------|
| `src/routes` | Aplicación | Definición de endpoints por módulo (usuarios, mascotas, tareas, eventos) |
| `src/controllers` | Aplicación | Reciben la petición, llaman al servicio y devuelven la respuesta |
| `src/middlewares` | Aplicación | Autenticación JWT, validación de datos y manejo de errores |
| `src/services` | Dominio | Reglas de negocio de cada módulo (los componentes "Gestión de …" del diagrama de arquitectura) |
| `src/models` | Infraestructura | Modelos Mongoose de cada colección |
| `src/config` | Infraestructura | Conexión a MongoDB y variables de entorno |
| `src/utils` | — | Funciones auxiliares (tokens JWT, errores con código HTTP) |

## Despliegue

El backend se puede publicar en [Render](https://render.com) y la base en [MongoDB Atlas](https://www.mongodb.com/atlas).

1. En Atlas, crear un cluster gratuito, un usuario de base de datos y permitir el acceso desde cualquier IP (`0.0.0.0/0`). Copiar la cadena de conexión.
2. Correr los scripts de `/database` contra esa base (cambiando la URL del comando de `mongosh` por la de Atlas).
3. En Render, crear un **Web Service** conectado al repositorio con esta configuración:

   | Opción | Valor |
   |--------|-------|
   | Root Directory | `backend` |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Health Check Path | `/api/health` |

4. Cargar las variables de entorno: `MONGODB_URI` (la de Atlas), `JWT_SECRET` (una clave larga nueva, distinta a la de desarrollo), `JWT_EXPIRES_IN` y `CORS_ORIGIN` con la URL del frontend publicado. Render define `PORT` solo.
5. Cuando termine el deploy, `https://<nombre-del-servicio>.onrender.com/api/health` tiene que responder `{"estado":"ok","baseDeDatos":"conectada"}`.
