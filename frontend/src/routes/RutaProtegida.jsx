import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Solo deja entrar a usuarios con sesión iniciada; al resto los manda al login
function RutaProtegida() {
  const { estaAutenticado, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return <p className="texto-secundario">Cargando...</p>;
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace state={{ desde: location }} />;
  }

  return <Outlet />;
}

export default RutaProtegida;
