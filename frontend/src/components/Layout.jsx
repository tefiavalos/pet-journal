import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Layout() {
  const { usuario, estaAutenticado, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // En pantallas chicas el menú se abre y cierra con un botón
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  function handleCerrarSesion() {
    cerrarSesion();
    navigate('/login');
  }

  return (
    <div className="layout">
      <header className="encabezado">
        <div className="contenedor encabezado__contenido">
          <Link to="/" className="encabezado__marca">
            🐾 Pet Journal
          </Link>

          <button
            type="button"
            className="encabezado__menu"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-expanded={menuAbierto}
            aria-label="Abrir menú"
          >
            {menuAbierto ? '✕' : '☰'}
          </button>

          {estaAutenticado ? (
            <nav className={`navegacion ${menuAbierto ? 'navegacion--abierta' : ''}`}>
              <NavLink to="/hoy">Hoy</NavLink>
              <NavLink to="/mascotas">Mis mascotas</NavLink>
              <span className="navegacion__usuario">{usuario.nombre}</span>
              <button type="button" className="boton boton--chico boton--secundario" onClick={handleCerrarSesion}>
                Cerrar sesión
              </button>
            </nav>
          ) : (
            <nav className={`navegacion ${menuAbierto ? 'navegacion--abierta' : ''}`}>
              <NavLink to="/login">Iniciar sesión</NavLink>
              <NavLink to="/registro" className="boton boton--chico">
                Crear cuenta
              </NavLink>
            </nav>
          )}
        </div>
      </header>

      <main className="contenedor layout__principal">
        <Outlet />
      </main>

      <footer className="pie">
        <div className="contenedor">Pet Journal · {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}

export default Layout;
