import api from './api.js';

export async function listarActividades(mascotaId) {
  const { data } = await api.get(`/mascotas/${mascotaId}/actividades`);
  return data;
}

export async function crearActividad(mascotaId, datos) {
  const { data } = await api.post(`/mascotas/${mascotaId}/actividades`, datos);
  return data;
}

export async function actualizarActividad(id, datos) {
  const { data } = await api.put(`/actividades/${id}`, datos);
  return data;
}

export async function eliminarActividad(id) {
  await api.delete(`/actividades/${id}`);
}
