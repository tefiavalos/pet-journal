import api from './api.js';

export async function listarMascotas() {
  const { data } = await api.get('/mascotas');
  return data;
}

export async function obtenerMascota(id) {
  const { data } = await api.get(`/mascotas/${id}`);
  return data;
}

export async function crearMascota(datos) {
  const { data } = await api.post('/mascotas', datos);
  return data;
}

export async function actualizarMascota(id, datos) {
  const { data } = await api.put(`/mascotas/${id}`, datos);
  return data;
}

export async function vincularMascota(codigoInvitacion) {
  const { data } = await api.post('/mascotas/vincular', { codigoInvitacion });
  return data;
}

export async function eliminarMascota(id) {
  await api.delete(`/mascotas/${id}`);
}
