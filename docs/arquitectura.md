# Pet Journal — Arquitectura del proyecto

## Arquitectura elegida: capas

El sistema es una aplicación web cliente-servidor organizada en **4 capas**: Presentación, Aplicación, Dominio e Infraestructura. Cada capa solo se comunica con la capa inferior, y cada módulo tiene una responsabilidad clara y depende lo menos posible de los demás.

| Capa            | Responsabilidad                                                                 | Tecnología                      | Ubicación en el repo                              |
| --------------- | ------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------- |
| Presentación    | Interacción con el usuario, formularios y validaciones básicas                  | React, React Router             | `/frontend`                                       |
| Aplicación      | Recibir las peticiones HTTP y orquestar los casos de uso, sin lógica de negocio | Express (rutas y controladores) | `/backend/src/routes`, `/backend/src/controllers` |
| Dominio         | Reglas de negocio, independientes de la tecnología de persistencia              | Node.js (servicios de dominio)  | `/backend/src/services`                           |
| Infraestructura | Persistencia, autenticación técnica e integraciones externas                    | MongoDB (Mongoose), JWT, bcrypt | `/backend/src/models`, `/backend/src/config`      |

Flujo de una petición:

```
React (Presentación)
   │  HTTP / JSON (API REST)
   ▼
Express: ruta → middleware de autenticación → controlador (Aplicación)
   ▼
Servicio de dominio (Dominio)
   ▼
Modelo Mongoose → MongoDB (Infraestructura)
```

## Tecnologías definitivas

| Parte         | Tecnología                                      | Uso                                                |
| ------------- | ----------------------------------------------- | -------------------------------------------------- |
| Frontend      | React + Vite                                    | Interfaz basada en componentes                     |
| Frontend      | React Router                                    | Navegación y rutas protegidas                      |
| Frontend      | Axios                                           | Comunicación con la API                            |
| Backend       | Node.js (LTS) + Express                         | API REST                                           |
| Backend       | Mongoose                                        | Modelos, validación de esquemas y acceso a MongoDB |
| Backend       | JSON Web Token (JWT)                            | Autenticación sin estado                           |
| Backend       | bcrypt                                          | Hash de contraseñas                                |
| Base de datos | MongoDB (Atlas en la nube, local en desarrollo) | Persistencia                                       |
| Versionado    | Git + GitHub                                    | Repositorio único del proyecto                     |

## Justificación de las decisiones técnicas

- **Arquitectura en capas en lugar de microservicios:** el proyecto es un MVP desarrollado por un equipo chico. Los microservicios sumarían complejidad de despliegue y comunicación que no se justifica en este alcance. Las capas logran la separación de responsabilidades que pide el RNF05 (mantenibilidad) sin esa complejidad.
- **Separar Aplicación y Dominio:** los controladores de Express solo reciben la petición y devuelven la respuesta, mientras que las reglas (por ejemplo, que un evento futuro solo se modifica si no ocurrió) viven en los servicios. Así las reglas se pueden probar y cambiar sin tocar las rutas.
- **Stack MERN:** se usa JavaScript tanto en el frontend como en el backend. Esto simplifica la integración y permite que las dos integrantes trabajen en ambas partes.
- **MongoDB + Mongoose:** los registros de una mascota tienen estructuras variables, y la relación muchos a muchos entre usuarios y mascotas se resuelve embebiendo los responsables dentro de la mascota. Mongoose permite validar los enums y los campos obligatorios en el backend (RNF06).
- **JWT + bcrypt:** JWT permite proteger los endpoints sin mantener sesiones en el servidor, y bcrypt evita guardar contraseñas en texto plano (RNF01).
- **Control de acceso centralizado:** solo el módulo de Mascotas y Responsables decide si un usuario tiene permiso sobre una mascota (RF13, RNF02). Los demás módulos le consultan a ese módulo.

## Relación con los módulos

La división en módulos y sus dependencias está en [modulos.md](modulos.md). El esquema de datos está en [`/database`](../database/README.md).
