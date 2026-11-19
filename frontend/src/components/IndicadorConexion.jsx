import { useEffect, useState } from 'react';
import { escucharPendientes } from '../services/api.js';
import Icono from './Icono.jsx';

// Si una respuesta del servidor tarda, muestra un loader.
// Con el plan gratuito de Render, el servidor se suspende sin uso y despertarlo puede tardar hasta un minuto.
const ESPERA_PARA_MOSTRAR = 1500;
const ESPERA_SERVIDOR_DORMIDO = 6000;

function IndicadorConexion() {
  // 'oculto' | 'conectando' | 'despertando'
  const [fase, setFase] = useState('oculto');

  useEffect(() => {
    let temporizadores = [];

    function limpiar() {
      temporizadores.forEach(clearTimeout);
      temporizadores = [];
    }

    const dejarDeEscuchar = escucharPendientes((cantidad) => {
      if (cantidad > 0 && temporizadores.length === 0) {
        temporizadores = [
          setTimeout(() => setFase('conectando'), ESPERA_PARA_MOSTRAR),
          setTimeout(() => setFase('despertando'), ESPERA_SERVIDOR_DORMIDO),
        ];
      }
      if (cantidad === 0) {
        limpiar();
        setFase('oculto');
      }
    });

    return () => {
      dejarDeEscuchar();
      limpiar();
    };
  }, []);

  if (fase === 'oculto') return null;

  return (
    <div className="conexion" role="status" aria-live="polite">
      <Icono nombre="cargando" className="icono--girando" />
      <div>
        <strong>Conectando con el servidor…</strong>
        {fase === 'despertando' && (
          <p>Si estuvo un rato sin uso, puede tardar hasta un minuto en despertarse.</p>
        )}
      </div>
    </div>
  );
}

export default IndicadorConexion;
