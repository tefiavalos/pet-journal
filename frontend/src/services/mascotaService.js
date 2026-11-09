import api from './api.js';

export async function listarMascotas() {
  const { data } = await api.get('/mascotas');
  return data;
}
