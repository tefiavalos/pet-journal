import axios from 'axios';

const CLAVE_TOKEN = 'petjournal_token';

export function obtenerToken() {
  return localStorage.getItem(CLAVE_TOKEN);
}

export function guardarToken(token) {
  if (token) {
    localStorage.setItem(CLAVE_TOKEN, token);
  } else {
    localStorage.removeItem(CLAVE_TOKEN);
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cantidad de peticiones esperando respuesta. IndicadorConexion la escucha
// para mostrar el loader cuando el servidor tarda (por ejemplo, si Render estaba dormido)
let pendientes = 0;
const oyentes = new Set();

function actualizarPendientes(config, cambio) {
  if (config?.silencioso) return;
  pendientes += cambio;
  oyentes.forEach((oyente) => oyente(pendientes));
}

export function escucharPendientes(oyente) {
  oyentes.add(oyente);
  return () => oyentes.delete(oyente);
}

// Si hay sesión iniciada, cada petición viaja con el token
api.interceptors.request.use((config) => {
  actualizarPendientes(config, 1);
  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el backend responde 401 a una petición con token, la sesión expiró
let alExpirarSesion = null;

export function configurarSesionExpirada(callback) {
  alExpirarSesion = callback;
}

api.interceptors.response.use(
  (respuesta) => {
    actualizarPendientes(respuesta.config, -1);
    return respuesta;
  },
  (error) => {
    actualizarPendientes(error.config, -1);
    const teniaToken = Boolean(error.config?.headers?.Authorization);
    if (error.response?.status === 401 && teniaToken && alExpirarSesion) {
      alExpirarSesion();
    }
    return Promise.reject(error);
  },
);

// Devuelve el mensaje que manda el backend o uno genérico si no hubo respuesta
export function obtenerMensajeError(error) {
  if (error.response?.data?.mensaje) {
    return error.response.data.mensaje;
  }
  if (!error.response) {
    return 'No se pudo conectar con el servidor';
  }
  return 'Ocurrió un error inesperado';
}

export default api;
