import mongoose from 'mongoose';
import EventoFuturo from '../models/EventoFuturo.js';
import { verificarAcceso } from './mascotaService.js';
import { registrar as registrarEventoVeterinario } from './eventoVeterinarioService.js';
import { ErrorApp } from '../utils/ErrorApp.js';

const CAMPOS_EDITABLES = ['fecha', 'titulo', 'tipoConsulta', 'descripcion'];

async function obtenerConAcceso(eventoId, usuarioId) {
  const evento = mongoose.isValidObjectId(eventoId) ? await EventoFuturo.findById(eventoId) : null;
  if (!evento) {
    throw new ErrorApp(404, 'Evento no encontrado');
  }

  await verificarAcceso(evento.mascotaId, usuarioId);
  return evento;
}

// Una vez realizado o cancelado, el evento ya no se puede modificar
function verificarPendiente(evento) {
  if (evento.estado !== 'PENDIENTE') {
    throw new ErrorApp(409, 'Solo se pueden modificar los eventos pendientes');
  }
}

export async function listarPorMascota(mascotaId, usuarioId, estado) {
  await verificarAcceso(mascotaId, usuarioId);
  return EventoFuturo.find({ mascotaId, ...(estado && { estado }) }).sort({ fecha: 1 });
}

export async function crear(mascotaId, datos, usuarioId) {
  await verificarAcceso(mascotaId, usuarioId);

  return EventoFuturo.create({
    mascotaId,
    fecha: datos.fecha,
    titulo: datos.titulo,
    tipoConsulta: datos.tipoConsulta,
    descripcion: datos.descripcion || undefined,
  });
}

// RF10: reprogramar o cambiar los datos de un turno que todavía no ocurrió
export async function actualizar(eventoId, datos, usuarioId) {
  const evento = await obtenerConAcceso(eventoId, usuarioId);
  verificarPendiente(evento);

  for (const campo of CAMPOS_EDITABLES) {
    if (datos[campo] !== undefined) {
      evento.set(campo, datos[campo] ?? undefined);
    }
  }

  await evento.save();
  return evento;
}

export async function cancelar(eventoId, usuarioId) {
  const evento = await obtenerConAcceso(eventoId, usuarioId);
  verificarPendiente(evento);

  evento.estado = 'CANCELADO';
  await evento.save();
  return evento;
}

// Al marcar el turno como realizado, sus datos se copian al historial veterinario
export async function marcarRealizado(eventoId, { fecha, descripcion }, usuarioId) {
  const evento = await obtenerConAcceso(eventoId, usuarioId);
  verificarPendiente(evento);

  const eventoVeterinario = await registrarEventoVeterinario(evento.mascotaId, {
    fecha: fecha ?? evento.fecha,
    titulo: evento.titulo,
    tipoConsulta: evento.tipoConsulta,
    descripcion: descripcion ?? evento.descripcion,
    eventoFuturoId: evento._id,
  });

  evento.estado = 'REALIZADO';
  evento.eventoVeterinarioId = eventoVeterinario._id;
  await evento.save();

  return { eventoFuturo: evento, eventoVeterinario };
}
