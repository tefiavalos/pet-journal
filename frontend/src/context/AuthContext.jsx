import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService.js';
import { obtenerToken, guardarToken, configurarSesionExpirada } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  // Si hay un token guardado, primero se valida contra la API
  const [cargando, setCargando] = useState(() => Boolean(obtenerToken()));

  useEffect(() => {
    if (!obtenerToken()) return;

    authService
      .obtenerPerfil()
      .then(setUsuario)
      .catch(() => guardarToken(null))
      .finally(() => setCargando(false));
  }, []);

  // Si el token vence mientras se usa la app, se cierra la sesión
  useEffect(() => {
    configurarSesionExpirada(() => {
      guardarToken(null);
      setUsuario(null);
    });
    return () => configurarSesionExpirada(null);
  }, []);

  async function iniciarSesion(email, password) {
    const { token, usuario } = await authService.login(email, password);
    guardarToken(token);
    setUsuario(usuario);
  }

  async function registrarse(datos) {
    const { token, usuario } = await authService.registrar(datos);
    guardarToken(token);
    setUsuario(usuario);
  }

  function cerrarSesion() {
    guardarToken(null);
    setUsuario(null);
  }

  const valor = {
    usuario,
    cargando,
    estaAutenticado: Boolean(usuario),
    iniciarSesion,
    registrarse,
    cerrarSesion,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth tiene que usarse dentro de AuthProvider');
  }
  return contexto;
}
