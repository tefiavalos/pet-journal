# Backend — Node.js + Express

API REST de Pet Journal.

## Cómo ejecutarlo

Requiere Node.js 20 o superior.

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

El servidor queda escuchando en `http://localhost:3000` (o en el puerto definido en `PORT`).

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor |
| `CORS_ORIGIN` | URL del frontend que puede consumir la API |

## Estructura

| Carpeta | Capa | Contenido |
|---------|------|-----------|
| `src/routes` | Aplicación | Definición de endpoints por módulo (usuarios, mascotas, tareas, eventos) |
| `src/controllers` | Aplicación | Reciben la petición, llaman al servicio y devuelven la respuesta |
| `src/middlewares` | Aplicación | Autenticación JWT, validación de datos y manejo de errores |
| `src/services` | Dominio | Reglas de negocio de cada módulo (los componentes "Gestión de …" del diagrama de arquitectura) |
| `src/models` | Infraestructura | Modelos Mongoose de cada colección |
| `src/config` | Infraestructura | Conexión a MongoDB y variables de entorno |
