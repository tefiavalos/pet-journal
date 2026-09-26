# Backend — Node.js + Express

API REST de Pet Journal. Por ahora solo contiene la estructura de carpetas; el código se incorpora después de la aprobación de la 2.ª entrega.

| Carpeta | Capa | Contenido |
|---------|------|-----------|
| `src/routes` | Aplicación | Definición de endpoints por módulo (usuarios, mascotas, tareas, eventos) |
| `src/controllers` | Aplicación | Reciben la petición, llaman al servicio y devuelven la respuesta |
| `src/middlewares` | Aplicación | Autenticación JWT, validación de datos y manejo de errores |
| `src/services` | Dominio | Reglas de negocio de cada módulo |
| `src/models` | Infraestructura | Modelos Mongoose de cada colección |
| `src/config` | Infraestructura | Conexión a MongoDB y variables de entorno |
