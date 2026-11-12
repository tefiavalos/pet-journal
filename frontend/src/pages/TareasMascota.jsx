import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import ItemTarea from '../components/ItemTarea.jsx';
import { listarTareasDeMascota, cambiarEstadoTarea } from '../services/tareaService.js';
import { obtenerMensajeError } from '../services/api.js';
import { hoyLocal, sumarDias, formatearDiaLargo } from '../utils/fechas.js';

function TareasMascota() {
  const { mascota } = useOutletContext();
  const hoy = hoyLocal();

  const [fecha, setFecha] = useState(hoy);
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [actualizandoId, setActualizandoId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setCargando(true);
    setError('');
    listarTareasDeMascota(mascota._id, fecha)
      .then(setTareas)
      .catch((err) => setError(obtenerMensajeError(err)))
      .finally(() => setCargando(false));
  }, [mascota._id, fecha]);

  async function handleCambiarEstado(tarea, estado) {
    setActualizandoId(tarea._id);
    setError('');
    try {
      const actualizada = await cambiarEstadoTarea(tarea._id, estado);
      setTareas((lista) => lista.map((t) => (t._id === actualizada._id ? actualizada : t)));
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setActualizandoId(null);
    }
  }

  const hechas = tareas.filter((t) => t.estado === 'HECHO').length;

  return (
    <div className="seccion-mascota">
      <div className="encabezado-pagina">
        <div>
          <h2>Tareas del día</h2>
          {tareas.length > 0 && (
            <p className="texto-secundario">
              {hechas} de {tareas.length} hechas
            </p>
          )}
        </div>
        <Link to={`/mascotas/${mascota._id}/actividades`} className="boton boton--secundario">
          Configurar actividades
        </Link>
      </div>

      <div className="selector-dia">
        <button type="button" className="boton boton--chico boton--secundario" onClick={() => setFecha(sumarDias(fecha, -1))}>
          ←
        </button>
        <strong>{fecha === hoy ? `Hoy, ${formatearDiaLargo(fecha)}` : formatearDiaLargo(fecha)}</strong>
        <button type="button" className="boton boton--chico boton--secundario" onClick={() => setFecha(sumarDias(fecha, 1))}>
          →
        </button>
        {fecha !== hoy && (
          <button type="button" className="boton boton--chico" onClick={() => setFecha(hoy)}>
            Volver a hoy
          </button>
        )}
      </div>

      <Alerta>{error}</Alerta>
      {cargando && <p className="texto-secundario">Cargando tareas...</p>}

      {!cargando && !error && tareas.length === 0 && (
        <div className="tarjeta vacio">
          <p>No hay tareas para este día.</p>
          <p>
            <Link to={`/mascotas/${mascota._id}/actividades`}>Cargá las actividades</Link> de {mascota.nombre} para que
            aparezcan acá todos los días.
          </p>
        </div>
      )}

      {!cargando && (
        <ul className="lista-registros">
          {tareas.map((tarea) => (
            <ItemTarea
              key={tarea._id}
              tarea={tarea}
              onCambiarEstado={handleCambiarEstado}
              deshabilitada={actualizandoId === tarea._id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TareasMascota;
