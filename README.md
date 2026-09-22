# Pet Journal — Propuesta y plan de trabajo

## 1. Definición del problema

Las personas que tienen mascotas suelen necesitar llevar un registro de información relacionada con ellas. Esta información suele encontrarse distribuida entre diferentes medios como aplicaciones de notas, conversaciones de mensajería, calendarios, documentos veterinarios o recordatorios personales.

Esta distribución puede dificultar el seguimiento de las actividades y de la información importante de cada mascota, especialmente cuando diferentes personas participan de su cuidado, ya que la información puede quedar registrada de manera diferente o depender de la comunicación entre los responsables.

Además, cada persona puede estar a cargo de una o varias mascotas.

Esta situación genera la necesidad de contar con una forma organizada de gestionar la información y facilitar su acceso entre los distintos responsables.

A partir de esta problemática se propone desarrollar una aplicación web que permita centralizar la información de los animales de compañía para hacerles un seguimiento cotidiano de manera práctica, colaborativa y eficiente.

Los principales actores identificados son:

- **Responsable/cuidador:** usuario que administra una o más mascotas.
- **Mascota:** entidad central sobre la que se registra y consulta la información.
- **Veterinario:** profesional cuya información puede aparecer asociada a consultas o registros veterinarios, pero que no será un usuario principal de la aplicación en el MVP.

El proyecto se enfocará principalmente en las necesidades de los responsables y cuidadores familiares de mascotas.

## Relevamiento

Para el relevamiento inicial se utilizará el análisis de situaciones de uso cotidianas y la identificación de necesidades y dificultades habituales de los responsables de mascotas.

Este relevamiento permitirá validar las funcionalidades propuestas y priorizar aquellas que formen parte del MVP.

## 2. Propuesta

Pet Journal será una aplicación web orientada a la gestión y seguimiento de la información relacionada con las mascotas. Su objetivo será centralizar en un único lugar la información relevante de cada mascota y facilitar el seguimiento de sus cuidados y eventos a lo largo del tiempo.

- Cada usuario podrá gestionar una o varias mascotas y consultar sus respectivos perfiles, donde se almacenará información como nombre, fecha de nacimiento, peso, características y condiciones médicas relevantes, entre otros datos.
- La aplicación contemplará además la gestión colaborativa de las mascotas. Una misma mascota podrá estar asociada a varios responsables, permitiendo que diferentes usuarios autorizados puedan consultar y gestionar su información.
- Pet Journal permitirá registrar tanto actividades cotidianas como eventos específicos asociados a cada mascota. Las actividades cotidianas estarán orientadas al seguimiento de tareas recurrentes, como alimentación, paseos o medicación, mientras que los eventos específicos permitirán registrar situaciones puntuales, como consultas veterinarias, vacunaciones, estudios o diagnósticos.
- La información registrada podrá ser consultada posteriormente mediante un historial de eventos, permitiendo realizar un seguimiento de la evolución y los cuidados de cada mascota.
- La aplicación permitirá visualizar avisos relacionados con próximos eventos, como controles o turnos veterinarios, facilitando el seguimiento de actividades que requieran atención futura.

La propuesta se plantea inicialmente como una aplicación web y se desarrollará de manera progresiva, comenzando por un Producto Mínimo Viable (MVP) que contemple las funcionalidades esenciales para validar el funcionamiento y la utilidad de la solución. A partir de esta primera versión podrán incorporarse nuevas funcionalidades y mejoras en futuras etapas.

## 3. Alcance del MVP

Para mantener un alcance realizable, el proyecto se centrará inicialmente en las funcionalidades esenciales para gestionar la información de las mascotas, sus responsables, sus actividades diarias, su historial y sus eventos futuros.

### Gestión de usuarios

Permite registrarse e iniciar sesión en la aplicación. Cada usuario podrá consultar las mascotas a las que tiene acceso y gestionar la información correspondiente de acuerdo con sus permisos.

Cada usuario tendrá:

- Nombre.
- Email.
- Contraseña.
- Celular.

Un usuario podrá tener acceso a una o varias mascotas.

### Gestión de mascotas

Permite crear, consultar, modificar y eliminar el perfil de una mascota. El perfil incluirá:

- Nombre.
- Tipo: perro, gato, etc.
- Raza.
- Fecha de nacimiento.
- Sexo.
- Peso.
- Foto.
- Condiciones médicas relevantes (incluye aquí medicamentos si correspondiera).
- Código de invitación (para que un responsable pueda unirse a la gestión de esa mascota).

Una mascota podrá tener uno o varios usuarios responsables.

### Asociación de responsables

Permite asociar una mascota existente a otro usuario mediante un código de vinculación que se genera a la hora de dar de alta una mascota. De esta forma, una mascota puede tener múltiples responsables y un usuario puede gestionar múltiples mascotas.

### Historial

Permite consultar cronológicamente los eventos registrados para una mascota, diferenciando información cotidiana de información veterinaria.

Entre los eventos cotidianos se encontrarán:

- Alimentación.
- Medicación (recurrente o crónica).
- Paseos.
- Cambios de peso.
- Notas o acontecimientos relevantes.

Además, se contará con eventos específicos los cuales quedarán registrados en un historial para registrar:

- Consultas veterinarias.
- Vacunas.
- Estudios.
- Diagnósticos u observaciones.
- Próximos controles.

### Tareas diarias

Permite gestionar las actividades recurrentes de alimentación, medicación y paseo mediante una lista diaria. Cada actividad tendrá una fecha, un horario, un tipo de evento y un estado.

Los tipos de evento serán:

- ALIMENTACION
- MEDICACION
- PASEO

Los estados posibles serán:

- PENDIENTE
- HECHO

Una mascota podrá tener uno o varios eventos de cada tipo durante un mismo día. Al marcar una actividad como HECHO, esta quedará registrada en el historial de la mascota.

### Eventos específicos

#### Gestión veterinaria

Permite registrar consultas veterinarias, vacunas, estudios, diagnósticos, observaciones y próximos controles.

Esto vinculado más a un hecho ya consumado o hablado (ej: “en la consulta de hoy se habló que tenemos que sacar un turno para dentro de un mes”).

Se podrá registrar:

- Fecha: (actual por default).
- Título.
- Consulta:
  - Control.
  - Consulta urgencia.
  - Consulta especialista.
  - Vacunas.

- Descripción.

### Eventos futuros

Permite registrar eventos futuros asociados a una mascota, como turnos veterinarios o controles. Estos eventos podrán ser modificados mientras todavía no hayan ocurrido, incluyendo su fecha y horario.

- Fecha.
- Título.
- Consulta:
  - Control.
  - Consulta urgencia.
  - Consulta especialista.
  - Vacunas.

- Descripción.

### Avisos

Al ingresar a la aplicación, se mostrarán los eventos futuros próximos.

Por ejemplo:

> "Hoy Luna tiene turno veterinario a las 15:30."

o:

> "Mañana Luna tiene turno veterinario a las 15:30."

Los mismos están asociados a los eventos futuros. Es decir, tomaremos la fecha del “evento futuro” y avisaremos al usuario desde días antes (a definir) “En X días tenés turno” y el mismo día, indicando “Hoy tenés turno”.

### Exclusiones del MVP

- **Calendario avanzado:** forma parte de la visión completa de Pet Journal, pero en el MVP los eventos futuros se visualizarán como próximos eventos. La incorporación de un calendario completo podrá realizarse en una etapa posterior.
- **Seteo custom de notificaciones de cada evento:** pudiendo agregar más de una, posponerlas o cancelarlas.
- **Notificaciones push, correo electrónico o SMS:** forman parte de la evolución prevista de la aplicación, pero no serán implementadas en el MVP inicial debido a la complejidad adicional que implica su configuración e integración.
- **Rol de veterinarios:** se contempla como una posible evolución de Pet Journal. En una versión futura, un veterinario podría acceder, previa autorización del responsable, a determinada información de la mascota. En el MVP, la información veterinaria será registrada por los propios responsables.

## 5. Relación entre usuarios y mascotas

Uno de los aspectos importantes del modelo es que la relación entre usuarios y mascotas será de muchos a muchos.

Un usuario puede estar asociado a varias mascotas y una mascota puede tener varios usuarios responsables.

Esto permitirá que diferentes personas puedan consultar y gestionar la información de una misma mascota.

La autorización de acceso será manejada desde el backend, verificando que el usuario autenticado tenga una relación válida con la mascota antes de permitir consultar o modificar su información.

## 6. Requerimientos Funcionales

**RF01 — Registro de usuario**

El sistema deberá permitir crear una cuenta mediante nombre, correo electrónico y contraseña.

**RF02 — Autenticación**

El sistema deberá permitir iniciar y cerrar sesión.

**RF03 — Gestión de mascotas**

El sistema deberá permitir crear, consultar, modificar y eliminar mascotas.

**RF04 — Asociación de responsables**

El sistema deberá permitir asociar usuarios a una mascota mediante un código de vinculación.

**RF05 — Consulta de mascotas**

El sistema deberá mostrar al usuario las mascotas a las que tiene acceso.

**RF06 — Gestión de historial**

El sistema deberá permitir registrar y consultar eventos asociados a una mascota.

**RF07 — Gestión veterinaria**

El sistema deberá permitir registrar consultas, vacunas, estudios y observaciones.

**RF08 — Gestión de tareas diarias**

El sistema deberá permitir gestionar actividades de alimentación, medicación y paseo.

**RF09 — Estados de tareas**

El sistema deberá permitir cambiar el estado de una tarea entre Pendiente y Hecho.

**RF10 — Eventos futuros**

El sistema deberá permitir registrar y modificar eventos futuros asociados a una mascota.

**RF10 — Historial de actividades**

Al completar una tarea diaria, el sistema deberá registrar la actividad realizada en el historial de la mascota.

**RF12 — Avisos**

El sistema deberá informar al usuario sobre eventos próximos al ingresar a la aplicación.

**RF13 — Control de acceso**

El sistema deberá verificar que el usuario tenga autorización para consultar o modificar la información de una mascota.

## 7. Requerimientos no funcionales

### RNF01 — Seguridad

Las contraseñas deberán almacenarse de forma segura y no deberán guardarse en texto plano.

### RNF02 — Autorización

Los usuarios únicamente podrán acceder a información de mascotas con las que estén asociados.

### RNF03 — Usabilidad

La interfaz deberá permitir consultar rápidamente las tareas del día y la información principal de cada mascota.

### RNF04 — Responsividad

La aplicación deberá adaptarse a dispositivos de escritorio, tablet y celular.

### RNF05 — Mantenibilidad

El código deberá organizarse en componentes y módulos independientes para facilitar su mantenimiento.

### RNF06 — Validación

Los datos ingresados deberán validarse tanto en frontend como en backend.

### RNF07 — Persistencia

La información registrada deberá conservarse y poder ser consultada posteriormente.

## 8. Stack tecnológico

### Frontend

- JavaScript
- React
- HTML5
- CSS3
- React Router para navegación
- Axios o Fetch para comunicación con el backend

React permitirá construir una interfaz dinámica y basada en componentes, especialmente útil para las diferentes vistas de mascotas, historiales, formularios y recordatorios.

### Backend

- JavaScript
- Node.js
- Express.js

Node.js permitirá ejecutar JavaScript en el servidor, mientras que Express facilitará la creación de la API REST y la implementación de rutas, middleware y validaciones.

El backend será responsable de:

- Autenticación.
- Autorización.
- Gestión de usuarios.
- Gestión de mascotas.
- Gestión de historiales.
- Gestión de recordatorios.
- Validación de datos.
- Comunicación con la base de datos.

### Base de datos

- MongoDB

MongoDB será utilizado como base de datos NoSQL.

La elección de MongoDB se relaciona principalmente con la naturaleza de la información que manejará la aplicación.

Los distintos registros asociados a una mascota no necesariamente tendrán la misma estructura. Por ejemplo, un evento de alimentación puede contener una cantidad y un tipo de alimento, mientras que una consulta veterinaria puede contener diagnóstico, observaciones y estudios.

El modelo documental permite representar esta información de manera flexible y natural.

Además, la aplicación tendrá documentos con información anidada y relaciones entre diferentes entidades, especialmente entre usuarios, mascotas, historiales y eventos.

## 9. ¿Por qué utilizar MERN?

Se eligió el stack MERN porque permite desarrollar tanto el frontend como el backend utilizando JavaScript, simplificando la integración entre ambas partes del proyecto.

El stack estará compuesto por:

- MongoDB → Base de datos.
- Express → Framework/backend para la API.
- React → Interfaz de usuario.
- Node.js → Entorno de ejecución del backend.

La elección resulta adecuada para el proyecto por varios motivos:

### JavaScript en frontend y backend

Utilizar JavaScript en ambos lados permite mantener un mismo lenguaje a lo largo de todo el desarrollo.

### React

La aplicación tendrá múltiples componentes interactivos, formularios, perfiles, historiales y actualizaciones dinámicas, por lo que React resulta adecuado para construir la interfaz.

### Node + Express

La aplicación necesita una API que gestione usuarios, mascotas, permisos, historiales y recordatorios. Express permite implementar estas funcionalidades de forma modular mediante rutas y middleware.

### MongoDB

La información relacionada con las mascotas presenta estructuras variables y documentos con datos anidados. MongoDB permite almacenar este tipo de información de forma flexible.

Además, la relación muchos-a-muchos entre usuarios y mascotas plantea un problema interesante para trabajar con una base de datos documental.

Por estas características, MERN no se selecciona únicamente por ser un stack conocido, sino porque sus tecnologías se adaptan a las necesidades del proyecto.

## 10. Plan de trabajo

El desarrollo se dividirá en etapas.

### Etapa 1 — Configuración inicial

- Crear repositorio.
- Configurar frontend con React.
- Configurar backend con Node.js y Express.
- Configurar conexión con MongoDB.
- Definir estructura inicial del proyecto.
- Configurar comunicación inicial entre frontend y backend.

### Etapa 2 — Usuarios y autenticación

#### Backend

- Registro de usuarios.
- Login.
- Autenticación.
- Manejo de sesión/token.
- Protección de endpoints.

#### Frontend

- Pantalla de registro.
- Pantalla de login.
- Manejo de sesión.
- Protección de rutas.
- Manejo básico de errores de autenticación.

### Etapa 3 — Gestión de mascotas

#### Backend

- Crear mascota.
- Editar mascota.
- Eliminar mascota.
- Consultar mascota.
- Consultar mascotas asociadas a un usuario.
- Asociar usuarios responsables mediante código de invitación.
- Validar permisos de acceso.

#### Frontend

- Listado de mascotas.
- Formulario de alta y edición.
- Perfil de mascota.
- Eliminación de mascotas.
- Vinculación mediante código de invitación.

### Etapa 4 — Historial y eventos

#### Backend

- Crear eventos asociados a una mascota.
- Consultar historial.
- Filtrar eventos.
- Registrar eventos cotidianos.
- Registrar información veterinaria, vacunas, estudios, consultas, etc.

#### Frontend

- Vista del historial.
- Formularios de creación de eventos.
- Visualización y filtrado de eventos.
- Visualización diferenciada de eventos cotidianos y veterinarios.

### Etapa 5 — Tareas diarias

#### Backend

- Crear actividades recurrentes.
- Asociarlas a una mascota.
- Generar las tareas correspondientes a cada día.
- Manejar estados PENDIENTE y HECHO.
- Marcar tareas como realizadas.
- Registrar las actividades realizadas en el historial.

#### Frontend

- Lista de tareas diarias.
- Visualización del estado de cada tarea.
- Acción para marcar una tarea como realizada.
- Formularios para configurar actividades recurrentes.

### Etapa 6 — Eventos futuros y avisos

#### Backend

- Crear, modificar y eliminar eventos futuros.
- Asociarlos a una mascota.
- Obtener eventos próximos.
- Determinar qué eventos deben mostrarse como próximos.

#### Frontend

- Listado de próximos eventos.
- Formulario para crear y modificar eventos futuros.
- Avisos dentro de la aplicación, por ejemplo: "Hoy Luna tiene turno veterinario a las 15:30".

### Etapa 7 — Integración, testing y mejoras

- Integración y revisión de los diferentes módulos.
- Dashboard general.
- Validación de formularios.
- Manejo de errores.
- Validación de permisos.
- Pruebas de endpoints.
- Pruebas de las funcionalidades principales.
- Revisión de navegación y experiencia de usuario.
- Mejoras de interfaz.

### Hitos

| Fecha      | Hito                            | Resultado esperado                                                                             |
| ---------- | ------------------------------- | ---------------------------------------------------------------------------------------------- |
| 01/09/2026 | Inicio del proyecto             | Configuración inicial, estructura del proyecto y planificación.                                |
| 11/09/2026 | Autenticación lista             | Los usuarios pueden registrarse e iniciar sesión.                                              |
| 20/09/2026 | CRUD de mascotas listo          | Se pueden crear, consultar, modificar y eliminar mascotas.                                     |
| 27/09/2026 | 2.ª Entrega                     | Esquema de BD y módulos definidos. Registro, login y CRUD de mascotas funcionando.             |
| 11/10/2026 | Historial listo                 | Se pueden registrar y consultar eventos asociados a las mascotas.                              |
| 25/10/2026 | Tareas y eventos futuros listos | Tareas diarias, estados, eventos futuros y avisos funcionando.                                 |
| 03/11/2026 | Integración completa            | Todas las funcionalidades principales están integradas en el frontend y conectadas con la API. |
| 07/11/2026 | Testing finalizado              | Sistema probado y bugs críticos corregidos.                                                    |
| 14/11/2026 | Entrega final                   | Repositorio, despliegue, documentación y video preparados.                                     |

## 11. Propuesta y viabilidad asistida por IA

Durante la elaboración de la propuesta utilizamos herramientas de inteligencia artificial como apoyo para revisar y refinar la idea, identificar posibles puntos débiles, analizar alternativas y organizar el plan de trabajo.

Las respuestas obtenidas fueron revisadas y adaptadas por el equipo según las características del proyecto, los recursos disponibles, nuestros conocimientos y los plazos establecidos.

### 11.1 Uso de la IA para el refinamiento de la idea y propuesta de valor

La IA permitió identificar la necesidad de delimitar el alcance de la aplicación, ya que la propuesta podía ampliarse con funcionalidades como calendarios, notificaciones externas o participación de veterinarios. Por este motivo, se decidió concentrar el MVP en las funcionalidades esenciales para poder cumplir con los plazos.

También se identificó como elemento central de la propuesta de valor la posibilidad de centralizar la información de las mascotas y permitir que varios responsables puedan acceder y gestionarla, facilitando el seguimiento compartido de su cuidado.

### 11.2 Análisis de competencia y diferenciación

Se analizaron competidores directos, como aplicaciones específicas para la gestión y cuidado de mascotas, e indirectos, como aplicaciones de notas, calendarios, planillas y recordatorios.

A partir de este análisis preliminar, identificamos como principales elementos de diferenciación de Pet Journal la centralización de distintos tipos de información en una misma aplicación y la posibilidad de compartir la gestión de las mascotas entre varios responsables.

### 11.3 Plan de trabajo asistido por IA

Utilizamos IA como apoyo para organizar las funcionalidades en etapas y realizar una primera estimación de tiempos, considerando las fechas de entrega y los recursos disponibles.

A partir de esta revisión se priorizaron las funcionalidades necesarias para alcanzar los primeros hitos, estableciendo como objetivo llegar a la segunda entrega con la base de datos definida, los módulos documentados y las funcionalidades de registro, autenticación y gestión básica de mascotas funcionando.

También se contempló el desarrollo en paralelo de algunas tareas, como el trabajo de frontend y backend, para aprovechar mejor el tiempo disponible.

El plan se considera una estimación inicial y podrá modificarse según los avances y dificultades que surjan.

### 11.4 Evaluación de viabilidad asistida por IA

Utilizamos IA para analizar la viabilidad del proyecto desde las dimensiones técnica, operativa y temporal, identificando posibles riesgos, funcionalidades complejas y la relación entre el alcance y los recursos disponibles.

#### Viabilidad técnica

El análisis permitió considerar viable el uso del stack MERN para implementar las funcionalidades principales del MVP.

Se identificaron como principales desafíos la autenticación y autorización, la relación entre usuarios y mascotas, las tareas recurrentes y la integración entre frontend, backend y base de datos.

Por este motivo, se decidió abordar estos aspectos progresivamente, comenzando por la configuración, autenticación y gestión de usuarios y mascotas.

#### Viabilidad operativa

La propuesta se considera viable porque responde a una situación cotidiana y busca centralizar información que actualmente puede encontrarse distribuida en diferentes medios.

Para reducir la complejidad inicial, se decidió mantener fuera del MVP funcionalidades como el rol de veterinarios y las notificaciones mediante SMS o correo electrónico, que podrán evaluarse como ampliaciones futuras.

#### Viabilidad temporal

El análisis permitió revisar si el alcance definido resulta compatible con las fechas de entrega y los recursos disponibles.

Consideramos que el proyecto es viable siempre que se mantenga el alcance del MVP y se prioricen las funcionalidades principales.

La planificación establece hitos progresivos y contempla llegar a la segunda entrega con las funcionalidades básicas de usuarios y mascotas funcionando.

Además, se reserva un margen previo a la entrega final para testing, correcciones, documentación, preparación del video y despliegue.

Esto permite reducir el riesgo de concentrar las tareas al final y contar con tiempo para resolver posibles inconvenientes.

## 12. Conclusión

A partir del análisis realizado, consideramos que Pet Journal es una propuesta viable para centralizar y organizar la información relacionada con el cuidado de las mascotas y facilitar su gestión entre sus responsables.

La definición de un MVP nos permitió establecer un alcance concreto y realista, priorizando las funcionalidades principales y dejando otras características, como el calendario avanzado, las notificaciones push y el rol de veterinarios, para futuras etapas de evolución del proyecto.

La utilización de IA durante la planificación nos ayudó a revisar la propuesta, identificar posibles dificultades y organizar las etapas de desarrollo.

A partir de este análisis y considerando los recursos, conocimientos y plazos disponibles, consideramos que el proyecto cuenta con una base adecuada para comenzar su desarrollo.
