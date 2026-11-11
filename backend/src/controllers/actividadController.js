import * as actividadService from '../services/actividadService.js';

export async function listar(req, res) {
  const actividades = await actividadService.listarPorMascota(req.params.mascotaId, req.usuarioId);
  res.json(actividades);
}

export async function crear(req, res) {
  const actividad = await actividadService.crear(req.params.mascotaId, req.body, req.usuarioId);
  res.status(201).json(actividad);
}

export async function actualizar(req, res) {
  const actividad = await actividadService.actualizar(req.params.id, req.body, req.usuarioId);
  res.json(actividad);
}

export async function eliminar(req, res) {
  await actividadService.eliminar(req.params.id, req.usuarioId);
  res.status(204).end();
}
