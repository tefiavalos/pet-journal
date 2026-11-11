import * as tareaService from '../services/tareaService.js';

export async function listarDeMascota(req, res) {
  const tareas = await tareaService.listarDeMascota(req.params.mascotaId, req.usuarioId, req.fecha);
  res.json(tareas);
}

export async function listarDelDia(req, res) {
  const tareas = await tareaService.listarDelDia(req.usuarioId, req.fecha);
  res.json(tareas);
}

export async function cambiarEstado(req, res) {
  const tarea = await tareaService.cambiarEstado(req.params.id, req.body.estado, req.usuarioId);
  res.json(tarea);
}
