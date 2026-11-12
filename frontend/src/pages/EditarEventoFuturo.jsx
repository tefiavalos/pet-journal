import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import FormularioEventoFuturo from '../components/FormularioEventoFuturo.jsx';
import { listarEventosFuturos, actualizarEventoFuturo } from '../services/eventoFuturoService.js';
import { obtenerMensajeError } from '../services/api.js';
import { aTextoDia, aTextoHora } from '../utils/fechas.js';

function EditarEventoFuturo() {
  const { mascota } = useOutletContext();
  const { eventoId } = useParams();
  const navigate = useNavigate();
  const ruta = `/mascotas/${mascota._id}/eventos`;

  const [valores, setValores] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    listarEventosFuturos(mascota._id)
      .then((eventos) => {
        const evento = eventos.find((e) => e._id === eventoId);
        if (!evento) return setError('No se encontró el turno');
        if (evento.estado !== 'PENDIENTE') return setError('Solo se pueden reprogramar los turnos pendientes');

        const fecha = new Date(evento.fecha);
        setValores({
          fecha: aTextoDia(fecha),
          hora: aTextoHora(fecha),
          titulo: evento.titulo,
          tipoConsulta: evento.tipoConsulta,
          descripcion: evento.descripcion ?? '',
        });
      })
      .catch((err) => setError(obtenerMensajeError(err)));
  }, [mascota._id, eventoId]);

  async function handleGuardar(datos) {
    await actualizarEventoFuturo(eventoId, datos);
    navigate(ruta, { replace: true });
  }

  return (
    <div className="tarjeta tarjeta--media seccion-mascota">
      <h2>Reprogramar turno</h2>
      <Alerta>{error}</Alerta>
      {!valores && !error && <p className="texto-secundario">Cargando...</p>}
      {valores && (
        <FormularioEventoFuturo
          valoresIniciales={valores}
          onGuardar={handleGuardar}
          textoBoton="Guardar cambios"
          rutaCancelar={ruta}
        />
      )}
    </div>
  );
}

export default EditarEventoFuturo;
