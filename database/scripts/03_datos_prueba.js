// Pet Journal — Datos de prueba (equivalente a DML)
// Ejecutar con: mongosh "mongodb://localhost:27017/petjournal" 03_datos_prueba.js
// Las contraseñas son hashes de ejemplo; en la aplicación se generan con bcrypt.

const u1 = ObjectId();
const u2 = ObjectId();
const m1 = ObjectId();

db.usuarios.insertMany([
  { _id: u1, nombre: "Usuario Uno", email: "usuario1@example.com", password: "$2b$10$hashDeEjemplo1", celular: "+54 9 11 1111-1111" },
  { _id: u2, nombre: "Usuario Dos", email: "usuario2@example.com", password: "$2b$10$hashDeEjemplo2", celular: "+54 9 11 2222-2222" }
]);

db.mascotas.insertOne({
  _id: m1,
  nombre: "Luna",
  tipo: "perro",
  raza: "Labrador",
  fechaNacimiento: ISODate("2022-03-10"),
  sexo: "hembra",
  peso: 24.5,
  foto: "https://example.com/luna.jpg",
  condicionesMedicas: "Alergia alimentaria",
  codigoInvitacion: "LUNA-7F3K",
  responsables: [
    { usuarioId: u1, fechaAsociacion: ISODate("2026-08-15") },
    { usuarioId: u2, fechaAsociacion: ISODate("2026-08-20") }
  ]
});

db.tareasDiarias.insertMany([
  { mascotaId: m1, tipo: "ALIMENTACION", fecha: ISODate("2026-09-27"), hora: "08:00", estado: "HECHO" },
  { mascotaId: m1, tipo: "PASEO", fecha: ISODate("2026-09-27"), hora: "18:00", estado: "PENDIENTE" }
]);

db.eventosVeterinarios.insertOne({
  mascotaId: m1,
  fecha: ISODate("2026-09-20"),
  titulo: "Control anual",
  tipoConsulta: "CONTROL",
  descripcion: "Se indicó turno de refuerzo de vacuna."
});

db.eventosFuturos.insertOne({
  mascotaId: m1,
  fecha: ISODate("2026-10-15T15:30:00Z"),
  titulo: "Turno veterinario",
  tipoConsulta: "VACUNA",
  descripcion: "Refuerzo de vacuna antirrábica",
  estado: "PENDIENTE"
});
