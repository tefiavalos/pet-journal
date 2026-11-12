import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import {
  listarActividades,
  crearActividad,
  actualizarActividad,
  eliminarActividad,
} from '../services/actividadService.js';
import { obtenerMensajeError } from '../services/api.js';
import { TIPOS_TAREA, textoTipo, iconoRegistro } from '../utils/registros.js';
import { hoyLocal } from '../utils/fechas.js';

const FORM_VACIO = { tipo: 'ALIMENTACION', hora: '', descripcion: '' };

function ordenarPorHora(actividades) {
  return [...actividades].sort((a, b) => a.hora.localeCompare(b.hora));
}

function ActividadesMascota() {
  const { mascota } = useOutletContext();

  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    listarActividades(mascota._id)
      .then(setActividades)
      .catch((err) => setError(obtenerMensajeError(err)))
      .finally(() => setCargando(false));
  }, [mascota._id]);

  function reemplazar(actividad) {
    setActividades((lista) => ordenarPorHora(lista.map((a) => (a._id === actividad._id ? actividad : a))));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEditar(actividad) {
    setEditandoId(actividad._id);
    setForm({ tipo: actividad.tipo, hora: actividad.hora, descripcion: actividad.descripcion ?? '' });
    setError('');
  }

  function handleCancelarEdicion() {
    setEditandoId(null);
    setForm(FORM_VACIO);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.hora) {
      setError('Elegí la hora de la actividad');
      return;
    }

    setEnviando(true);
    try {
      if (editandoId) {
        const actual = actividades.find((a) => a._id === editandoId);
        reemplazar(await actualizarActividad(editandoId, { ...form, activa: actual.activa }));
      } else {
        const nueva = await crearActividad(mascota._id, { ...form, desde: hoyLocal() });
        setActividades((lista) => ordenarPorHora([...lista, nueva]));
      }
      handleCancelarEdicion();
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setEnviando(false);
    }
  }

  async function handleActivar(actividad) {
    setError('');
    try {
      reemplazar(
        await actualizarActividad(actividad._id, {
          tipo: actividad.tipo,
          hora: actividad.hora,
          descripcion: actividad.descripcion,
          activa: !actividad.activa,
        }),
      );
    } catch (err) {
      setError(obtenerMensajeError(err));
    }
  }

  async function handleEliminar(actividad) {
    const confirmar = window.confirm(
      `¿Eliminar la actividad de ${textoTipo(actividad.tipo).toLowerCase()} de las ${actividad.hora}? ` +
        'Las tareas que ya se hicieron siguen en el historial.',
    );
    if (!confirmar) return;

    setError('');
    try {
      await eliminarActividad(actividad._id);
      setActividades((lista) => lista.filter((a) => a._id !== actividad._id));
      if (editandoId === actividad._id) handleCancelarEdicion();
    } catch (err) {
      setError(obtenerMensajeError(err));
    }
  }

  return (
    <div className="seccion-mascota">
      <div>
        <h2>Actividades</h2>
        <p className="texto-secundario">
          Comidas, medicación y paseos que se repiten todos los días. A partir de acá se arma la lista de tareas del día.
        </p>
      </div>

      <Alerta>{error}</Alerta>

      <form className="tarjeta formulario formulario--en-linea" onSubmit={handleSubmit} noValidate>
        <label className="campo">
          <span>Tipo</span>
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            {TIPOS_TAREA.map(({ valor, texto }) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </label>

        <label className="campo">
          <span>Hora</span>
          <input type="time" name="hora" value={form.hora} onChange={handleChange} />
        </label>

        <label className="campo campo--ancho">
          <span>
            Detalle <small>(opcional)</small>
          </span>
          <input
            type="text"
            name="descripcion"
            value={form.descripcion}
            placeholder="Ej: una taza de alimento, 1/2 pastilla..."
            onChange={handleChange}
          />
        </label>

        <div className="acciones">
          <button type="submit" className="boton" disabled={enviando}>
            {editandoId ? 'Guardar cambios' : '+ Agregar'}
          </button>
          {editandoId && (
            <button type="button" className="boton boton--secundario" onClick={handleCancelarEdicion}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {cargando && <p className="texto-secundario">Cargando actividades...</p>}

      {!cargando && actividades.length === 0 && (
        <div className="tarjeta vacio">
          <p>Todavía no hay actividades cargadas para {mascota.nombre}.</p>
        </div>
      )}

      <ul className="lista-registros">
        {actividades.map((actividad) => (
          <li key={actividad._id} className={`registro ${actividad.activa ? '' : 'registro--inactivo'}`}>
            <span className="registro__icono">{iconoRegistro(actividad.tipo)}</span>
            <div className="registro__datos">
              <div className="registro__titulo">
                <strong>
                  {actividad.hora} · {textoTipo(actividad.tipo)}
                </strong>
                {!actividad.activa && <span className="etiqueta">Pausada</span>}
              </div>
              {actividad.descripcion && <p>{actividad.descripcion}</p>}
            </div>
            <div className="acciones">
              <button type="button" className="boton boton--chico boton--secundario" onClick={() => handleActivar(actividad)}>
                {actividad.activa ? 'Pausar' : 'Reanudar'}
              </button>
              <button type="button" className="boton boton--chico boton--secundario" onClick={() => handleEditar(actividad)}>
                Editar
              </button>
              <button type="button" className="boton boton--chico boton--peligro" onClick={() => handleEliminar(actividad)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActividadesMascota;
