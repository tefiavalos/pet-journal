import { Link } from 'react-router-dom';
import { calcularEdad } from '../utils/mascotas.js';
import FotoMascota from './FotoMascota.jsx';

function TarjetaMascota({ mascota }) {
  const detalles = [mascota.raza, calcularEdad(mascota.fechaNacimiento)].filter(Boolean);

  return (
    <Link to={`/mascotas/${mascota._id}`} className="tarjeta-mascota">
      <div className="tarjeta-mascota__foto">
        <FotoMascota mascota={mascota} />
      </div>

      <div className="tarjeta-mascota__datos">
        <h2>{mascota.nombre}</h2>
        {detalles.length > 0 && <p>{detalles.join(' · ')}</p>}
      </div>
    </Link>
  );
}

export default TarjetaMascota;
