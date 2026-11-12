import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Login y registro: si ya hay sesión iniciada no tiene sentido mostrarlos
function RutaPublica() {
  const { estaAutenticado, cargando } = useAuth();

  if (cargando) {
    return <p className="texto-secundario">Cargando...</p>;
  }

  if (estaAutenticado) {
    return <Navigate to="/hoy" replace />;
  }

  return <Outlet />;
}

export default RutaPublica;
