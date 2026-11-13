import api from './api.js';

// datos: { tipo: 'PESO' | 'NOTA', fecha, peso, texto }
export async function crearRegistroCotidiano(mascotaId, datos) {
  const { data } = await api.post(`/mascotas/${mascotaId}/registros`, datos);
  return data;
}
