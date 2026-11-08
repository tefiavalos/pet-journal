import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import EstadoApi from '../components/EstadoApi.jsx';

function Inicio() {
  const { estaAutenticado, cargando } = useAuth();

  if (!cargando && estaAutenticado) {
    return <Navigate to="/mascotas" replace />;
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

      <EstadoApi />
    </section>
  );
}

export default Inicio;
