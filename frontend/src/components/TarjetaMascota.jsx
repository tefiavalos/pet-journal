import { calcularEdad, iconoTipo } from '../utils/mascotas.js';

function TarjetaMascota({ mascota }) {
  const detalles = [mascota.raza, calcularEdad(mascota.fechaNacimiento)].filter(Boolean);

  return (
    <article className="tarjeta-mascota">
      <div className="tarjeta-mascota__foto">
        {mascota.foto ? <img src={mascota.foto} alt={mascota.nombre} /> : <span>{iconoTipo(mascota.tipo)}</span>}
      </div>

      <div className="tarjeta-mascota__datos">
        <h2>{mascota.nombre}</h2>
        {detalles.length > 0 && <p>{detalles.join(' · ')}</p>}
      </div>
    </article>
  );
}

export default TarjetaMascota;
