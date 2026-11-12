import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from './Alerta.jsx';
import { obtenerMensajeError } from '../services/api.js';
import { TIPOS_CONSULTA } from '../utils/registros.js';
import { hoyLocal } from '../utils/fechas.js';

export const EVENTO_VACIO = { fecha: '', hora: '', titulo: '', tipoConsulta: 'CONTROL', descripcion: '' };

function FormularioEventoFuturo({ valoresIniciales = EVENTO_VACIO, onGuardar, textoBoton, rutaCancelar }) {
  const [form, setForm] = useState(valoresIniciales);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.titulo.trim()) return setError('El título es obligatorio');
    if (!form.fecha || !form.hora) return setError('Elegí el día y la hora del turno');

    // La fecha y la hora se cargan en hora local y se mandan en formato ISO
    const fecha = new Date(`${form.fecha}T${form.hora}`);
    if (fecha <= new Date()) return setError('El turno tiene que ser en una fecha futura');

    setEnviando(true);
    try {
      await onGuardar({
        fecha: fecha.toISOString(),
        titulo: form.titulo.trim(),
        tipoConsulta: form.tipoConsulta,
        descripcion: form.descripcion,
      });
    } catch (err) {
      setError(obtenerMensajeError(err));
      setEnviando(false);
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <Alerta>{error}</Alerta>

      <div className="formulario__fila">
        <label className="campo">
          <span>Día</span>
          <input type="date" name="fecha" value={form.fecha} min={hoyLocal()} onChange={handleChange} />
        </label>

        <label className="campo">
          <span>Hora</span>
          <input type="time" name="hora" value={form.hora} onChange={handleChange} />
        </label>
      </div>

      <div className="formulario__fila">
        <label className="campo">
          <span>Título</span>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            placeholder="Ej: Turno veterinario"
            onChange={handleChange}
          />
        </label>

        <label className="campo">
          <span>Tipo</span>
          <select name="tipoConsulta" value={form.tipoConsulta} onChange={handleChange}>
            {TIPOS_CONSULTA.map(({ valor, texto }) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="campo">
        <span>
          Descripción <small>(opcional)</small>
        </span>
        <textarea
          name="descripcion"
          rows="3"
          value={form.descripcion}
          placeholder="Ej: refuerzo de vacuna antirrábica, llevar los estudios..."
          onChange={handleChange}
        />
      </label>

      <div className="acciones">
        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? 'Guardando...' : textoBoton}
        </button>
        <Link to={rutaCancelar} className="boton boton--secundario">
          Cancelar
        </Link>
      </div>
    </form>
  );
}

export default FormularioEventoFuturo;
