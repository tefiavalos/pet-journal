import EventoVeterinario from '../models/EventoVeterinario.js';
import { verificarAcceso } from './mascotaService.js';

export async function listarPorMascota(mascotaId, usuarioId) {
  await verificarAcceso(mascotaId, usuarioId);
  return EventoVeterinario.find({ mascotaId }).sort({ fecha: -1, createdAt: -1 });
}

export async function crear(mascotaId, datos, usuarioId) {
  await verificarAcceso(mascotaId, usuarioId);
  return registrar(mascotaId, datos);
}

// Lo usa también Gestión de Eventos Futuros cuando un turno se marca como realizado.
// No valida permisos: quien la llama ya los verificó.
export function registrar(mascotaId, { fecha, titulo, tipoConsulta, descripcion, eventoFuturoId }) {
  return EventoVeterinario.create({
    mascotaId,
    fecha,
    titulo,
    tipoConsulta,
    descripcion: descripcion || undefined,
    eventoFuturoId,
  });
}
