import * as historialService from '../services/historialService.js';

export async function obtener(req, res) {
  const historial = await historialService.obtenerHistorial(req.params.mascotaId, req.usuarioId, req.filtros);
  res.json(historial);
}
