import * as eventoFuturoService from '../services/eventoFuturoService.js';

export async function listar(req, res) {
  const eventos = await eventoFuturoService.listarPorMascota(req.params.mascotaId, req.usuarioId, req.estado);
  res.json(eventos);
}

export async function crear(req, res) {
  const evento = await eventoFuturoService.crear(req.params.mascotaId, req.body, req.usuarioId);
  res.status(201).json(evento);
}

export async function actualizar(req, res) {
  const evento = await eventoFuturoService.actualizar(req.params.id, req.body, req.usuarioId);
  res.json(evento);
}

export async function cancelar(req, res) {
  const evento = await eventoFuturoService.cancelar(req.params.id, req.usuarioId);
  res.json(evento);
}

export async function marcarRealizado(req, res) {
  const resultado = await eventoFuturoService.marcarRealizado(req.params.id, req.body, req.usuarioId);
  res.json(resultado);
}

export async function avisos(req, res) {
  const avisos = await eventoFuturoService.obtenerAvisos(req.usuarioId);
  res.json(avisos);
}
