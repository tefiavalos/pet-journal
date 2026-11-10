import api from './api.js';

// filtros: { categoria, tipo, desde, hasta } (los vacíos no se mandan)
export async function obtenerHistorial(mascotaId, filtros = {}) {
  const params = Object.fromEntries(Object.entries(filtros).filter(([, valor]) => valor));
  const { data } = await api.get(`/mascotas/${mascotaId}/historial`, { params });
  return data;
}
