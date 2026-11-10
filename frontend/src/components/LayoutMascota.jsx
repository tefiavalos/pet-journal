import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import Alerta from './Alerta.jsx';
import MenuMascota from './MenuMascota.jsx';
import { obtenerMascota } from '../services/mascotaService.js';
import { obtenerMensajeError } from '../services/api.js';
import { iconoTipo } from '../utils/mascotas.js';

// Encabezado y menú comunes a todas las secciones de una mascota.
// La mascota se carga una sola vez y se pasa a cada sección con el contexto del Outlet.
function LayoutMascota() {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setMascota(null);
    setError('');
    obtenerMascota(id)
      .then(setMascota)
      .catch((err) => setError(obtenerMensajeError(err)));
  }, [id]);

  if (!mascota) {
    return (
      <section>
        <Link to="/mascotas">← Mis mascotas</Link>
        <Alerta>{error}</Alerta>
        {!error && <p className="texto-secundario">Cargando...</p>}
      </section>
    );
  }

  return (
    <section className="perfil">
      <Link to="/mascotas">← Mis mascotas</Link>

      <div className="perfil__cabecera">
        <div className="perfil__foto">
          {mascota.foto ? <img src={mascota.foto} alt={mascota.nombre} /> : <span>{iconoTipo(mascota.tipo)}</span>}
        </div>
        <h1>{mascota.nombre}</h1>
      </div>

      <MenuMascota mascotaId={id} />

      <Outlet context={{ mascota, setMascota }} />
    </section>
  );
}

export default LayoutMascota;
