import api from './api.js';

export async function listarTareasDeMascota(mascotaId, fecha) {
  const { data } = await api.get(`/mascotas/${mascotaId}/tareas`, { params: { fecha } });
  return data;
}

export async function cambiarEstadoTarea(id, estado) {
  const { data } = await api.patch(`/tareas/${id}/estado`, { estado });
  return data;
}
