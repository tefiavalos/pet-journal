import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { obtenerEstadoApi } from '../services/healthService.js';

function Inicio() {
  const { estaAutenticado, cargando } = useAuth();

  // Mientras se lee la portada, despierta al servidor (Render gratuito se suspende sin uso),
  // así el registro o el login responden más rápido. No muestra nada en pantalla.
  useEffect(() => {
    obtenerEstadoApi({ silencioso: true }).catch(() => {});
  }, []);

  if (!cargando && estaAutenticado) {
    return <Navigate to="/hoy" replace />;
  }

  return (
    <section className="portada">
      <h1>Pet Journal</h1>
      <p>Toda la información de tus mascotas en un solo lugar, compartida con quienes las cuidan.</p>

      <div className="portada__acciones">
        <Link to="/registro" className="boton">
          Crear cuenta
        </Link>
        <Link to="/login">Ya tengo cuenta</Link>
      </div>
    </section>
  );
}

export default Inicio;
