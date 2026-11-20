# Diagramas

| Diagrama | Imagen | Código PlantUML |
|----------|--------|-----------------|
| Entidad-relación | [01-modelo-er.png](1.%20Diagrama%20Entidad-Relaci%C3%B3n/01-modelo-er.png) | [01-modelo-er.puml](1.%20Diagrama%20Entidad-Relaci%C3%B3n/01-modelo-er.puml) |
| Arquitectura por capas y módulos | [02-arquitectura-capas.png](2.%20Arquitectura%20por%20capas%20y%20m%C3%B3dulos/02-arquitectura-capas.png) | [02-arquitectura-capas.puml](2.%20Arquitectura%20por%20capas%20y%20m%C3%B3dulos/02-arquitectura-capas.puml) |
| Clases | [03-diagrama-clases.png](3.%20Diagrama%20de%20clases/03-diagrama-clases.png) | [03-diagrama-clases.puml](3.%20Diagrama%20de%20clases/03-diagrama-clases.puml) |

El código de cada diagrama se puede reproducir en https://plantuml.com/es/.

## Cambios respecto del sistema final

Estos diagramas corresponden al diseño de la segunda entrega. Durante el desarrollo agregamos dos colecciones que no figuran en el diagrama entidad-relación ni en el de clases:

- **Actividad recurrente** (`actividadesRecurrentes`): guarda las actividades que se repiten todos los días, como la comida o la medicación a una hora fija. Cada tarea diaria se genera a partir de una de ellas, por lo que la relación es de una actividad a muchas tareas.
- **Registro cotidiano** (`registrosCotidianos`): guarda los cambios de peso y las notas o acontecimientos relevantes de la mascota.

En el diagrama de arquitectura figura el componente "Almacenamiento de fotos", que no se implementó: la foto de la mascota se carga como un link a una imagen.

El modelo completo, con las 7 colecciones, está en [`database/README.md`](../../database/README.md) y en la sección 3 del [Informe final](../Pet%20Journal%20-%20Informe%20final.pdf).
