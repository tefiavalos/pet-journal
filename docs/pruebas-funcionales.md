# Pet Journal — Pruebas funcionales

Pruebas manuales de las funcionalidades principales, hechas desde el navegador con el backend y el frontend levantados. Para las pruebas de colaboración hacen falta **dos cuentas** (A y B), conviene usar una ventana de incógnito para la segunda.

La columna **Resultado** se completa al probar: ✅ si funcionó como se esperaba, ❌ si no (y se anota qué pasó).

## Usuarios y sesión

| # | Requerimiento | Pasos | Resultado esperado | Resultado |
|---|---------------|-------|--------------------|-----------|
| 1 | RF01 | En `/registro` crear la cuenta A con contraseña de 8 caracteres o más | Entra a la app y muestra la pantalla **Hoy** con el nombre | |
| 2 | RF01, RNF06 | Registrarse con una contraseña de 5 caracteres | Muestra el error y no crea la cuenta | |
| 3 | RF01 | Registrarse con un email que ya existe | Muestra **Ya existe una cuenta con ese email** | |
| 4 | RF02 | Cerrar sesión e iniciar sesión con una contraseña incorrecta | Muestra **Email o contraseña incorrectos** | |
| 5 | RF02 | Iniciar sesión con los datos correctos y recargar la página | La sesión se mantiene | |
| 6 | RF13 | Sin sesión, entrar a `/mascotas` escribiendo la dirección | Redirige al login | |

## Mascotas y responsables

| # | Requerimiento | Pasos | Resultado esperado | Resultado |
|---|---------------|-------|--------------------|-----------|
| 7 | RF03 | Con la cuenta A, **+ Agregar mascota** con nombre, tipo, raza, fecha de nacimiento y peso | Aparece en **Mis mascotas** con la edad calculada | |
| 8 | RF03, RNF06 | Intentar guardar una mascota sin nombre | Muestra **El nombre es obligatorio** | |
| 9 | RF03 | En el perfil, **Editar** y cambiar el peso | El perfil muestra el peso nuevo | |
| 10 | RF04 | Copiar el código de invitación. Con la cuenta B, **Vincular con código** y pegarlo | B ve la mascota y el perfil muestra los dos responsables | |
| 11 | RF04 | Con la cuenta B, volver a usar el mismo código | Muestra **Ya sos responsable de esta mascota** | |
| 12 | RF05 | Con una cuenta C sin mascotas, entrar a **Mis mascotas** | No ve las mascotas de A ni de B | |
| 13 | RF13, RNF02 | Con la cuenta C, entrar a `/mascotas/<id de la mascota de A>` | Muestra **No tenés permiso para acceder a esta mascota** | |

## Tareas diarias

| # | Requerimiento | Pasos | Resultado esperado | Resultado |
|---|---------------|-------|--------------------|-----------|
| 14 | RF08 | En **Actividades**, agregar comida a las 08:00, medicación a las 12:00 y paseo a las 18:00 | Aparecen ordenadas por hora | |
| 15 | RF08 | Ir a **Tareas del día** | Aparecen las tres tareas de hoy como pendientes | |
| 16 | RF09, RF11 | Marcar el paseo como hecho | Queda tachado con **Hecho por (nombre) a las (hora)** | |
| 17 | RF11 | Ir a **Historial** | Aparece el paseo como registro cotidiano | |
| 18 | RF09 | Volver a **Tareas del día** y desmarcar el paseo | Vuelve a pendiente y sale del historial | |
| 19 | RF08 | Con la cuenta B, abrir **Hoy** | Ve las mismas tareas de la mascota compartida, con el estado que dejó A | |
| 20 | RF08 | En **Actividades**, pausar la medicación | La tarea pendiente de hoy desaparece de la lista | |

## Historial y eventos veterinarios

| # | Requerimiento | Pasos | Resultado esperado | Resultado |
|---|---------------|-------|--------------------|-----------|
| 21 | RF07 | En **Historial**, **+ Registrar evento veterinario** de tipo Vacuna con fecha de la semana pasada | Aparece en el historial en esa fecha, como veterinario | |
| 22 | RF07, RNF06 | Intentar registrar un evento veterinario con fecha futura | No se puede: el calendario no deja elegirla y el formulario muestra el error | |
| 23 | RF06 | Filtrar el historial por categoría **Veterinario** | Solo se ven los eventos veterinarios | |
| 24 | RF06 | Filtrar por un rango de fechas que no incluya ningún registro | Muestra **No hay registros con esos filtros** | |
| 24b | RF06 | En **Historial**, **+ Registrar peso o nota**: registrar un peso de 25,3 kg | Aparece en el historial como **Peso: 25.3 kg** (cotidiano) y el **Perfil** muestra 25.3 kg | |
| 24c | RF06 | Registrar una nota y filtrar el historial por tipo **Nota** | Solo se ve la nota, con **Registrado por (nombre)** | |

## Eventos futuros y avisos

| # | Requerimiento | Pasos | Resultado esperado | Resultado |
|---|---------------|-------|--------------------|-----------|
| 25 | RF10 | En **Turnos**, crear un turno para hoy dentro de unas horas y otro para dentro de 3 días | Aparecen en la lista ordenados por fecha | |
| 26 | RF12 | Ir a **Hoy** | Muestra **Hoy (mascota) tiene "(título)" a las (hora).** y **En 3 días...** | |
| 27 | RF10 | **Reprogramar** el turno de dentro de 3 días para mañana | El aviso pasa a decir **Mañana...** | |
| 28 | RF10 | Marcar un turno como **Realizado** | Desaparece de los pendientes y aparece en el **Historial** como veterinario | |
| 29 | RF10 | **Cancelar** el otro turno | Pasa a **Turnos anteriores** como cancelado y ya no aparece en los avisos | |
| 30 | RF10 | Intentar crear un turno con fecha pasada | Muestra **El turno tiene que ser en una fecha futura** | |

## Eliminación

| # | Requerimiento | Pasos | Resultado esperado | Resultado |
|---|---------------|-------|--------------------|-----------|
| 31 | RF03 | En el perfil de la mascota, **Eliminar** y confirmar | Desaparece de **Mis mascotas** para A y para B, junto con sus tareas, turnos e historial | |

## Requerimientos no funcionales

| # | Requerimiento | Pasos | Resultado esperado | Resultado |
|---|---------------|-------|--------------------|-----------|
| 32 | RNF01 | Revisar la colección `usuarios` en MongoDB (Compass o `mongosh`) | El campo `password` es un hash que empieza con `$2`, nunca la contraseña | |
| 33 | RNF03 | Desde **Hoy**, marcar una tarea | Se puede hacer en un solo clic, sin entrar a la mascota | |
| 34 | RNF04 | Abrir la app desde el celular (o con las herramientas de desarrollo del navegador en modo celular) | El menú se abre con **☰** y todas las pantallas se ven sin cortes ni scroll horizontal | |
| 35 | RNF07 | Cerrar el navegador, volver a entrar e iniciar sesión | Las mascotas, tareas, turnos e historial siguen estando | |
