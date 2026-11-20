# Pet Journal

Aplicación web para centralizar la información de las mascotas y compartir su cuidado entre varios responsables. Cada mascota tiene su perfil, sus tareas del día (alimentación, medicación y paseos), un historial cotidiano y veterinario y sus próximos turnos. Al ingresar, la aplicación avisa de los turnos que se acercan.

Trabajo Final Integrador de la Tecnicatura Universitaria en Programación a Distancia (UTN).

## Integrantes

- Andrea Ayala
- Estefanía Avalos

Grupo N.º 158 · Tutor: Sergio Andrés Antonini

## Tecnologías utilizadas

| Parte | Tecnologías |
|-------|-------------|
| Frontend | JavaScript, React, React Router, Axios, Vite |
| Backend | JavaScript, Node.js, Express, Mongoose, JWT, bcryptjs |
| Base de datos | MongoDB (MongoDB Atlas en producción) |
| Despliegue | Vercel (frontend), Render (API) y MongoDB Atlas (base) |

## Documentación

- [Informe final (PDF)](docs/Pet%20Journal%20-%20Informe%20final.pdf)
- [Propuesta, diseño y módulos (1.ª y 2.ª entrega)](docs/propuesta-y-diseno.md)
- [Arquitectura y tecnologías](docs/arquitectura.md)
- [Módulos](docs/modulos.md)
- [Pruebas funcionales](docs/pruebas-funcionales.md)
- [Diagramas: entidad-relación, arquitectura y clases](docs/diagramas)
- [Base de datos: scripts, colecciones e índices](database/README.md)
- [Backend](backend/README.md) y [Frontend](frontend/README.md): ejecución, variables de entorno y despliegue

# Ejecución del proyecto

## Requisitos

- Node.js 20 o superior.
- MongoDB local o una base en MongoDB Atlas.

## Pasos

1. Crear la base con los scripts de [`database/`](database/README.md).
2. Levantar el backend: ver [`backend/README.md`](backend/README.md).
3. Levantar el frontend: ver [`frontend/README.md`](frontend/README.md).
4. Entrar a `http://localhost:5173`.

## Pruebas

- Backend: `npm test` dentro de `backend` corre las pruebas unitarias, y `backend/tests/pet-journal.postman_collection.json` tiene las pruebas de los endpoints.
- Funcionalidades: [`docs/pruebas-funcionales.md`](docs/pruebas-funcionales.md).

Resultados: las 27 pruebas unitarias pasan y las 37 pruebas funcionales y no funcionales dieron el resultado esperado sobre la aplicación publicada.

## Despliegue

La aplicación está publicada en:

- **Aplicación:** https://pet-journal-xi.vercel.app
- **API:** https://pet-journal-api.onrender.com/api (el estado de la API y de la base se puede ver en `/api/health`)

El backend usa el plan gratuito de Render: si no recibe pedidos durante un rato se suspende, y la primera carga puede tardar hasta un minuto.

| Parte | Servicio | Detalle |
|-------|----------|---------|
| Base de datos | MongoDB Atlas | [`backend/README.md`](backend/README.md#despliegue) |
| Backend | Render | [`backend/README.md`](backend/README.md#despliegue) |
| Frontend | Vercel | [`frontend/README.md`](frontend/README.md#despliegue) |

## Video de presentación e Informe final

Tanto el video de presentación como el informe final detallado se encuentran disponibles en la siguiente carpeta de Google Drive: https://drive.google.com/drive/folders/1w65_rWxVmowzGy3SsqE-wrhUqZwHHTbG?usp=sharing

El video también está disponible en YouTube: https://youtu.be/I_4uX37ypb8

El informe en PDF también está disponible en [`docs/Pet Journal - Informe final.pdf`](docs/Pet%20Journal%20-%20Informe%20final.pdf)

