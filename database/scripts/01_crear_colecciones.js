// Pet Journal — Creación de colecciones con validación de esquema (equivalente a DDL)
// Ejecutar con: mongosh "mongodb://localhost:27017/petjournal" 01_crear_colecciones.js

const TIPOS_CONSULTA = ["CONTROL", "URGENCIA", "ESPECIALISTA", "VACUNA"];

db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "email", "password"],
      properties: {
        nombre: { bsonType: "string" },
        email: { bsonType: "string" },
        password: { bsonType: "string", description: "Hash bcrypt, nunca texto plano" },
        celular: { bsonType: "string" }
      }
    }
  }
});

db.createCollection("mascotas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "tipo", "codigoInvitacion", "responsables"],
      properties: {
        nombre: { bsonType: "string" },
        tipo: { enum: ["perro", "gato", "otro"] },
        raza: { bsonType: "string", description: "Texto libre" },
        fechaNacimiento: { bsonType: "date" },
        sexo: { enum: ["macho", "hembra"] },
        peso: { bsonType: ["double", "int"], minimum: 0 },
        foto: { bsonType: "string", description: "URL de la imagen" },
        condicionesMedicas: { bsonType: "string" },
        codigoInvitacion: { bsonType: "string" },
        responsables: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["usuarioId", "fechaAsociacion"],
            properties: {
              usuarioId: { bsonType: "objectId" },
              fechaAsociacion: { bsonType: "date" }
            }
          }
        }
      }
    }
  }
});

db.createCollection("tareasDiarias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["mascotaId", "tipo", "fecha", "hora", "estado"],
      properties: {
        mascotaId: { bsonType: "objectId" },
        tipo: { enum: ["ALIMENTACION", "MEDICACION", "PASEO"] },
        fecha: { bsonType: "date" },
        hora: { bsonType: "string", pattern: "^([01][0-9]|2[0-3]):[0-5][0-9]$" },
        estado: { enum: ["PENDIENTE", "HECHO"] },
        actividadId: { bsonType: "objectId", description: "Actividad recurrente que generó la tarea" },
        descripcion: { bsonType: "string" },
        realizadaPor: { bsonType: "objectId", description: "Usuario que la marcó como HECHO" },
        realizadaEn: { bsonType: "date" }
      }
    }
  }
});

// Actividades que se repiten todos los días (por ejemplo, comida a las 08:00).
// A partir de ellas se generan las tareas diarias.
db.createCollection("actividadesRecurrentes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["mascotaId", "tipo", "hora", "desde", "activa"],
      properties: {
        mascotaId: { bsonType: "objectId" },
        tipo: { enum: ["ALIMENTACION", "MEDICACION", "PASEO"] },
        hora: { bsonType: "string", pattern: "^([01][0-9]|2[0-3]):[0-5][0-9]$" },
        descripcion: { bsonType: "string" },
        desde: { bsonType: "date", description: "Primer día en que se generan tareas" },
        activa: { bsonType: "bool" }
      }
    }
  }
});

db.createCollection("eventosVeterinarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["mascotaId", "fecha", "titulo", "tipoConsulta"],
      properties: {
        mascotaId: { bsonType: "objectId" },
        fecha: { bsonType: "date" },
        titulo: { bsonType: "string" },
        tipoConsulta: { enum: TIPOS_CONSULTA },
        descripcion: { bsonType: "string" }
      }
    }
  }
});

db.createCollection("eventosFuturos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["mascotaId", "fecha", "titulo", "tipoConsulta", "estado"],
      properties: {
        mascotaId: { bsonType: "objectId" },
        fecha: { bsonType: "date", description: "Fecha y hora del turno" },
        titulo: { bsonType: "string" },
        tipoConsulta: { enum: TIPOS_CONSULTA },
        descripcion: { bsonType: "string" },
        estado: { enum: ["PENDIENTE", "REALIZADO", "CANCELADO"] }
      }
    }
  }
});

// Información cotidiana que no sale de una tarea: cambios de peso y notas
db.createCollection("registrosCotidianos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["mascotaId", "tipo", "fecha"],
      properties: {
        mascotaId: { bsonType: "objectId" },
        tipo: { enum: ["PESO", "NOTA"] },
        fecha: { bsonType: "date" },
        peso: { bsonType: ["double", "int"], minimum: 0, description: "Solo en los registros de PESO, en kg" },
        texto: { bsonType: "string" },
        registradoPor: { bsonType: "objectId" }
      }
    }
  }
});
