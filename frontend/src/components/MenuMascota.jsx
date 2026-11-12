import { NavLink } from 'react-router-dom';

function MenuMascota({ mascotaId }) {
  const secciones = [
    { ruta: '', texto: 'Perfil' },
    { ruta: 'tareas', texto: 'Tareas del día' },
    { ruta: 'actividades', texto: 'Actividades' },
    { ruta: 'historial', texto: 'Historial' },
  ];

  return (
    <nav className="menu-mascota">
      {secciones.map(({ ruta, texto }) => (
        <NavLink key={texto} to={`/mascotas/${mascotaId}${ruta && `/${ruta}`}`} end={ruta === ''}>
          {texto}
        </NavLink>
      ))}
    </nav>
  );
}

export default MenuMascota;
