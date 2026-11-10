import * as eventoVeterinarioService from '../services/eventoVeterinarioService.js';

export async function listar(req, res) {
  const eventos = await eventoVeterinarioService.listarPorMascota(req.params.mascotaId, req.usuarioId);
  res.json(eventos);
}

export async function crear(req, res) {
  const evento = await eventoVeterinarioService.crear(req.params.mascotaId, req.body, req.usuarioId);
  res.status(201).json(evento);
}
