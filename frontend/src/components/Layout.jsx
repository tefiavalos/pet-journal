import { Link, NavLink, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="layout">
      <header className="encabezado">
        <div className="contenedor encabezado__contenido">
          <Link to="/" className="encabezado__marca">
            🐾 Pet Journal
          </Link>

          <nav className="navegacion">
            <NavLink to="/login">Iniciar sesión</NavLink>
            <NavLink to="/registro" className="boton boton--chico">
              Crear cuenta
            </NavLink>
          </nav>
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
