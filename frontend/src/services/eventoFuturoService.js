import api from './api.js';

export async function listarEventosFuturos(mascotaId) {
  const { data } = await api.get(`/mascotas/${mascotaId}/eventos-futuros`);
  return data;
}

export async function crearEventoFuturo(mascotaId, datos) {
  const { data } = await api.post(`/mascotas/${mascotaId}/eventos-futuros`, datos);
  return data;
}

export async function actualizarEventoFuturo(id, datos) {
  const { data } = await api.put(`/eventos-futuros/${id}`, datos);
  return data;
}

export async function cancelarEventoFuturo(id) {
  const { data } = await api.patch(`/eventos-futuros/${id}/cancelar`);
  return data;
}

// fecha: día en que se realizó (AAAA-MM-DD), para guardarlo en el historial
export async function marcarEventoRealizado(id, datos) {
  const { data } = await api.patch(`/eventos-futuros/${id}/realizar`, datos);
  return data;
}

// Turnos pendientes de los próximos días de todas las mascotas del usuario
export async function obtenerAvisos() {
  const { data } = await api.get('/avisos');
  return data;
}
