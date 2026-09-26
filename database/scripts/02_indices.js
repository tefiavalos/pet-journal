// Pet Journal — Índices principales
// Ejecutar con: mongosh "mongodb://localhost:27017/petjournal" 02_indices.js

// Login e impedir cuentas duplicadas
db.usuarios.createIndex({ email: 1 }, { unique: true });

// "Mis mascotas" y validación de permisos (RF05, RF13)
db.mascotas.createIndex({ "responsables.usuarioId": 1 });

// Vinculación de nuevos responsables (RF04)
db.mascotas.createIndex({ codigoInvitacion: 1 }, { unique: true });

// Tareas del día de una mascota (RF08)
db.tareasDiarias.createIndex({ mascotaId: 1, fecha: 1 });

// Historial veterinario ordenado del más reciente al más antiguo (RF06)
db.eventosVeterinarios.createIndex({ mascotaId: 1, fecha: -1 });

// Eventos futuros de una mascota (RF10)
db.eventosFuturos.createIndex({ mascotaId: 1, fecha: 1 });

// Cálculo de avisos próximos (RF12)
db.eventosFuturos.createIndex({ estado: 1, fecha: 1 });
