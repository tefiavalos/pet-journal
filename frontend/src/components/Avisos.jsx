import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerAvisos } from '../services/eventoFuturoService.js';
import { textoAviso } from '../utils/avisos.js';

// RF12: al ingresar se muestran los turnos de los próximos días
function Avisos() {
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    // Si falla no se muestra nada: los avisos no tienen que frenar el resto de la pantalla
    obtenerAvisos()
      .then(setAvisos)
      .catch(() => setAvisos([]));
  }, []);

  if (avisos.length === 0) return null;

  return (
    <section className="avisos" aria-label="Próximos turnos">
      {avisos.map((evento) => {
        const { texto, vencido } = textoAviso(evento);
        return (
          <Link
            key={evento._id}
            to={`/mascotas/${evento.mascotaId?._id}/eventos`}
            className={`aviso ${vencido ? 'aviso--vencido' : ''}`}
          >
            <span className="aviso__icono">{vencido ? '⚠️' : '🔔'}</span>
            <span>{texto}</span>
          </Link>
        );
      })}
    </section>
  );
}

export default Avisos;
