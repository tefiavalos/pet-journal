import * as registroCotidianoService from '../services/registroCotidianoService.js';

export async function listar(req, res) {
  const registros = await registroCotidianoService.listarPorMascota(req.params.mascotaId, req.usuarioId);
  res.json(registros);
}

export async function crear(req, res) {
  const registro = await registroCotidianoService.crear(req.params.mascotaId, req.body, req.usuarioId);
  res.status(201).json(registro);
}
