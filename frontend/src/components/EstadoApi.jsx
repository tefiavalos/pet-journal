import { useEffect, useState } from 'react';
import { obtenerEstadoApi } from '../services/healthService.js';

function EstadoApi() {
  const [estado, setEstado] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    obtenerEstadoApi()
      .then(setEstado)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="estado-api estado-api--error">No se pudo conectar con la API.</p>;
  }

  if (!estado) {
    return <p className="estado-api">Verificando conexión con la API...</p>;
  }

  return (
    <p className="estado-api estado-api--ok">
      API conectada · Base de datos {estado.baseDeDatos}
    </p>
  );
}

export default EstadoApi;
