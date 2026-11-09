import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { listarMascotas } from '../services/mascotaService.js';
import { obtenerMensajeError } from '../services/api.js';
import TarjetaMascota from '../components/TarjetaMascota.jsx';
import Alerta from '../components/Alerta.jsx';

function MisMascotas() {
  const { usuario } = useAuth();

  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listarMascotas()
      .then(setMascotas)
      .catch((err) => setError(obtenerMensajeError(err)))
      .finally(() => setCargando(false));
  }, []);

  return (
    <section>
      <div className="encabezado-pagina">
        <div>
          <h1>Mis mascotas</h1>
          <p className="texto-secundario">Hola, {usuario.nombre}.</p>
        </div>
      </div>

      <Alerta>{error}</Alerta>

      {cargando && <p className="texto-secundario">Cargando mascotas...</p>}

      {!cargando && !error && mascotas.length === 0 && (
        <div className="tarjeta vacio">
          <p>Todavía no tenés mascotas cargadas.</p>
        </div>
      )}

      <div className="grilla-mascotas">
        {mascotas.map((mascota) => (
          <TarjetaMascota key={mascota._id} mascota={mascota} />
        ))}
      </div>
    </section>
  );
}

export default MisMascotas;
