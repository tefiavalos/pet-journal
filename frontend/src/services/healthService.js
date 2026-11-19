import api from './api.js';

// Consulta el estado de la API. Con { silencioso: true } no muestra el indicador de conexión
export async function obtenerEstadoApi(opciones = {}) {
  const { data } = await api.get('/health', opciones);
  return data;
}
