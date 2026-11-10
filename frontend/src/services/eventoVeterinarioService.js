import api from './api.js';

export async function crearEventoVeterinario(mascotaId, datos) {
  const { data } = await api.post(`/mascotas/${mascotaId}/eventos-veterinarios`, datos);
  return data;
}
