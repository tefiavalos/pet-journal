import api from './api.js';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function registrar(datos) {
  const { data } = await api.post('/auth/registro', datos);
  return data;
}

export async function obtenerPerfil() {
  const { data } = await api.get('/auth/perfil');
  return data.usuario;
}
