import api from './api.js';

export async function obtenerEstadoApi() {
  const { data } = await api.get('/health');
  return data;
}
