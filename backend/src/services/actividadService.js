import mongoose from 'mongoose';
import ActividadRecurrente from '../models/ActividadRecurrente.js';
import TareaDiaria from '../models/TareaDiaria.js';
import { verificarAcceso } from './mascotaService.js';
import { ErrorApp } from '../utils/ErrorApp.js';
import { parsearDia, hoy } from '../utils/fechas.js';

async function obtenerConAcceso(actividadId, usuarioId) {
  const actividad = mongoose.isValidObjectId(actividadId)
    ? await ActividadRecurrente.findById(actividadId)
    : null;
  if (!actividad) {
    throw new ErrorApp(404, 'Actividad no encontrada');
  }

  await verificarAcceso(actividad.mascotaId, usuarioId);
  return actividad;
}

// Tareas que todavía no se hicieron, desde hoy en adelante
function pendientesDesdeHoy(actividadId) {
  return { actividadId, estado: 'PENDIENTE', fecha: { $gte: parsearDia(hoy()) } };
}

export async function listarPorMascota(mascotaId, usuarioId) {
  await verificarAcceso(mascotaId, usuarioId);
  return ActividadRecurrente.find({ mascotaId }).sort({ hora: 1 });
}

export async function crear(mascotaId, { tipo, hora, descripcion, desde }, usuarioId) {
  await verificarAcceso(mascotaId, usuarioId);

  return ActividadRecurrente.create({
    mascotaId,
    tipo,
    hora,
    descripcion: descripcion || undefined,
    desde: desde ?? parsearDia(hoy()),
  });
}

export async function actualizar(actividadId, datos, usuarioId) {
  const actividad = await obtenerConAcceso(actividadId, usuarioId);

  for (const campo of ['tipo', 'hora', 'descripcion', 'activa']) {
    if (datos[campo] !== undefined) {
      actividad.set(campo, datos[campo] ?? undefined);
    }
  }
  await actividad.save();

  // Las tareas ya hechas quedan como están en el historial.
  // Las pendientes desde hoy se ajustan al cambio o se borran si se desactivó.
  const filtro = pendientesDesdeHoy(actividad._id);
  if (!actividad.activa) {
    await TareaDiaria.deleteMany(filtro);
  } else {
    const cambios = { $set: { tipo: actividad.tipo, hora: actividad.hora } };
    if (actividad.descripcion) cambios.$set.descripcion = actividad.descripcion;
    else cambios.$unset = { descripcion: '' };
    await TareaDiaria.updateMany(filtro, cambios);
  }

  return actividad;
}

export async function eliminar(actividadId, usuarioId) {
  const actividad = await obtenerConAcceso(actividadId, usuarioId);
  await TareaDiaria.deleteMany(pendientesDesdeHoy(actividad._id));
  await actividad.deleteOne();
}
