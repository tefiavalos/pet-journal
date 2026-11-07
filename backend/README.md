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

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor |
| `MONGODB_URI` | Cadena de conexión a MongoDB |
| `CORS_ORIGIN` | URL del frontend que puede consumir la API |
| `JWT_SECRET` | Clave para firmar los tokens (obligatoria) |
| `JWT_EXPIRES_IN` | Duración del token (por ejemplo `7d`) |

## Endpoints

| Método | Ruta | Descripción | Requiere token |
|--------|------|-------------|----------------|
| GET | `/api/health` | Estado de la API y de la base | No |
| POST | `/api/auth/registro` | Crea una cuenta y devuelve el token | No |
| POST | `/api/auth/login` | Inicia sesión y devuelve el token | No |

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
