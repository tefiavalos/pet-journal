# Frontend — React

Interfaz web de Pet Journal (capa de Presentación), creada con React y Vite.

## Cómo ejecutarlo

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`. Para que funcione completa, el backend tiene que estar levantado.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base de la API |

## Estructura

| Carpeta | Contenido |
|---------|-----------|
| `public` | Archivos estáticos |
| `src/pages` | Vistas: login, registro, mascotas, perfil de mascota, historial, tareas del día, eventos futuros |
| `src/components` | Componentes reutilizables (formularios, tarjetas, avisos) |
| `src/services` | Llamadas a la API con Axios |
| `src/context` | Estado global de la sesión del usuario |
| `src/routes` | Configuración de React Router y rutas protegidas |
| `src/styles` | Estilos CSS |
