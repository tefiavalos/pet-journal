import * as mascotaService from '../services/mascotaService.js';

export async function listar(req, res) {
  const mascotas = await mascotaService.listarPorUsuario(req.usuarioId);
  res.json(mascotas);
}

export async function obtener(req, res) {
  const mascota = await mascotaService.obtenerDetalle(req.params.id, req.usuarioId);
  res.json(mascota);
}

export async function crear(req, res) {
  const mascota = await mascotaService.crear(req.body, req.usuarioId);
  res.status(201).json(mascota);
}

export async function actualizar(req, res) {
  const mascota = await mascotaService.actualizar(req.params.id, req.body, req.usuarioId);
  res.json(mascota);
}

export async function vincular(req, res) {
  const mascota = await mascotaService.vincularPorCodigo(req.body.codigoInvitacion, req.usuarioId);
  res.json(mascota);
}

export async function eliminar(req, res) {
  await mascotaService.eliminar(req.params.id, req.usuarioId);
  res.status(204).end();
}
