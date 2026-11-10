import { NavLink } from 'react-router-dom';

function MenuMascota({ mascotaId }) {
  const secciones = [
    { ruta: '', texto: 'Perfil' },
    { ruta: 'historial', texto: 'Historial' },
  ];

  return (
    <nav className="menu-mascota">
      {secciones.map(({ ruta, texto }) => (
        <NavLink key={texto} to={`/mascotas/${mascotaId}${ruta && `/${ruta}`}`} end>
          {texto}
        </NavLink>
      ))}
    </nav>
  );
}

export default MenuMascota;
