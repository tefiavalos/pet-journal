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
| `src/utils` | Funciones auxiliares (formato de fechas, cálculo de edad) |

## Pantallas

| Ruta | Pantalla | Requiere sesión |
|------|----------|-----------------|
| `/` | Portada | No |
| `/login` | Inicio de sesión | No |
| `/registro` | Registro | No |
| `/mascotas` | Listado de mis mascotas | Sí |
| `/mascotas/nueva` | Alta de mascota | Sí |
| `/mascotas/vincular` | Vinculación con código de invitación | Sí |
| `/mascotas/:id` | Perfil de la mascota | Sí |
| `/mascotas/:id/editar` | Edición de la mascota | Sí |

## Despliegue

El frontend se puede publicar en [Vercel](https://vercel.com):

1. Importar el repositorio en Vercel y elegir `frontend` como **Root Directory**. Vercel detecta que es un proyecto de Vite (build `npm run build`, salida `dist`).
2. Cargar la variable de entorno `VITE_API_URL` con la URL del backend publicado, terminada en `/api` (por ejemplo `https://pet-journal-api.onrender.com/api`).
3. Hacer el deploy y agregar la URL que da Vercel en la variable `CORS_ORIGIN` del backend.

El archivo `vercel.json` hace que todas las rutas (por ejemplo `/mascotas/123`) carguen la aplicación, así no da error 404 al recargar la página en una ruta interna.

## Pruebas

Las pruebas funcionales de la aplicación están en [`docs/pruebas-funcionales.md`](../docs/pruebas-funcionales.md).
