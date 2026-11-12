import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Alerta from '../components/Alerta.jsx';
import Avisos from '../components/Avisos.jsx';
import ItemTarea from '../components/ItemTarea.jsx';
import { listarTareasDelDia, cambiarEstadoTarea } from '../services/tareaService.js';
import { obtenerMensajeError } from '../services/api.js';
import { hoyLocal, formatearDiaLargo } from '../utils/fechas.js';
import { iconoTipo } from '../utils/mascotas.js';

// Agrupa las tareas por mascota, manteniendo el orden por hora
function agruparPorMascota(tareas) {
  const grupos = new Map();
  for (const tarea of tareas) {
    const mascota = tarea.mascotaId;
    if (!grupos.has(mascota._id)) grupos.set(mascota._id, { mascota, tareas: [] });
    grupos.get(mascota._id).tareas.push(tarea);
  }
  return [...grupos.values()].sort((a, b) => a.mascota.nombre.localeCompare(b.mascota.nombre));
}

// Dashboard: lo que hay que hacer hoy con todas las mascotas
function Hoy() {
  const { usuario } = useAuth();
  const hoy = hoyLocal();

  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [actualizandoId, setActualizandoId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    listarTareasDelDia(hoy)
      .then(setTareas)
      .catch((err) => setError(obtenerMensajeError(err)))
      .finally(() => setCargando(false));
  }, [hoy]);

  async function handleCambiarEstado(tarea, estado) {
    setActualizandoId(tarea._id);
    setError('');
    try {
      const actualizada = await cambiarEstadoTarea(tarea._id, estado);
      // La respuesta trae solo el id de la mascota: se conservan los datos que ya había
      setTareas((lista) =>
        lista.map((t) => (t._id === actualizada._id ? { ...actualizada, mascotaId: t.mascotaId } : t)),
      );
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setActualizandoId(null);
    }
  }

  const pendientes = tareas.filter((t) => t.estado === 'PENDIENTE').length;

  return (
    <section>
      <div className="encabezado-pagina">
        <div>
          <h1>Hola, {usuario.nombre}</h1>
          <p className="texto-secundario primera-mayuscula">{formatearDiaLargo(hoy)}</p>
        </div>
        <Link to="/mascotas" className="boton boton--secundario">
          Ver mis mascotas
        </Link>
      </div>

      <Avisos />

      <div className="encabezado-pagina">
        <h2>Tareas de hoy</h2>
        {tareas.length > 0 && (
          <p className="texto-secundario">
            {pendientes === 0 ? '¡Todo hecho por hoy! 🎉' : `Quedan ${pendientes} de ${tareas.length}`}
          </p>
        )}
      </div>

      <Alerta>{error}</Alerta>
      {cargando && <p className="texto-secundario">Cargando tareas...</p>}

      {!cargando && !error && tareas.length === 0 && (
        <div className="tarjeta vacio">
          <p>No hay tareas para hoy.</p>
          <p>
            Para que aparezcan, cargá las actividades de cada mascota desde su perfil (
            <Link to="/mascotas">Mis mascotas</Link> → Actividades).
          </p>
        </div>
      )}

      <div className="tablero">
        {agruparPorMascota(tareas).map(({ mascota, tareas: deLaMascota }) => (
          <article key={mascota._id} className="tarjeta tablero__mascota">
            <h3>
              <Link to={`/mascotas/${mascota._id}/tareas`}>
                {iconoTipo(mascota.tipo)} {mascota.nombre}
              </Link>
            </h3>
            <ul className="lista-registros">
              {deLaMascota.map((tarea) => (
                <ItemTarea
                  key={tarea._id}
                  tarea={tarea}
                  onCambiarEstado={handleCambiarEstado}
                  deshabilitada={actualizandoId === tarea._id}
                />
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Hoy;
