import mongoose from 'mongoose';
import TareaDiaria from '../models/TareaDiaria.js';
import ActividadRecurrente from '../models/ActividadRecurrente.js';
import { verificarAcceso, listarPorUsuario } from './mascotaService.js';
import { ErrorApp } from '../utils/ErrorApp.js';

// Crea las tareas del día a partir de las actividades activas.
// Si una tarea ya existe no se toca, así no se pierde su estado.
export async function generarTareasDelDia(mascotaIds, fecha) {
  const actividades = await ActividadRecurrente.find({
    mascotaId: { $in: mascotaIds },
    activa: true,
    desde: { $lte: fecha },
  });
  if (actividades.length === 0) return;

  const operaciones = actividades.map((actividad) => {
    const nueva = {
      mascotaId: actividad.mascotaId,
      tipo: actividad.tipo,
      hora: actividad.hora,
      estado: 'PENDIENTE',
    };
    if (actividad.descripcion) nueva.descripcion = actividad.descripcion;

    return {
      updateOne: {
        filter: { actividadId: actividad._id, fecha },
        update: { $setOnInsert: nueva },
        upsert: true,
      },
    };
  });

  try {
    await TareaDiaria.bulkWrite(operaciones, { ordered: false });
  } catch (error) {
    // Si dos pedidos generan la misma tarea al mismo tiempo, el índice único
    // frena el duplicado: la tarea ya existe y no hace falta hacer nada.
    if (error.code !== 11000) throw error;
  }
}

export async function listarDeMascota(mascotaId, usuarioId, fecha) {
  await verificarAcceso(mascotaId, usuarioId);
  await generarTareasDelDia([mascotaId], fecha);

  return TareaDiaria.find({ mascotaId, fecha }).sort({ hora: 1 }).populate('realizadaPor', 'nombre');
}

// Tareas del día de todas las mascotas del usuario
export async function listarDelDia(usuarioId, fecha) {
  const mascotas = await listarPorUsuario(usuarioId);
  const mascotaIds = mascotas.map((mascota) => mascota._id);
  if (mascotaIds.length === 0) return [];

  await generarTareasDelDia(mascotaIds, fecha);

  return TareaDiaria.find({ mascotaId: { $in: mascotaIds }, fecha })
    .sort({ hora: 1 })
    .populate('mascotaId', 'nombre tipo foto')
    .populate('realizadaPor', 'nombre');
}

// RF09 y RF11: al marcarse como HECHO, la tarea pasa a formar parte del historial
export async function cambiarEstado(tareaId, estado, usuarioId) {
  const tarea = mongoose.isValidObjectId(tareaId) ? await TareaDiaria.findById(tareaId) : null;
  if (!tarea) {
    throw new ErrorApp(404, 'Tarea no encontrada');
  }

  await verificarAcceso(tarea.mascotaId, usuarioId);

  tarea.estado = estado;
  if (estado === 'HECHO') {
    tarea.realizadaPor = usuarioId;
    tarea.realizadaEn = new Date();
  } else {
    tarea.realizadaPor = undefined;
    tarea.realizadaEn = undefined;
  }

  await tarea.save();
  await tarea.populate('realizadaPor', 'nombre');
  return tarea;
}
