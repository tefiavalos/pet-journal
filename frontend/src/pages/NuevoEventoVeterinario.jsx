import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import { crearEventoVeterinario } from '../services/eventoVeterinarioService.js';
import { obtenerMensajeError } from '../services/api.js';
import { TIPOS_CONSULTA } from '../utils/registros.js';
import { hoyLocal } from '../utils/fechas.js';

function NuevoEventoVeterinario() {
  const { mascota } = useOutletContext();
  const navigate = useNavigate();
  const hoy = hoyLocal();

  const [form, setForm] = useState({ fecha: hoy, titulo: '', tipoConsulta: 'CONTROL', descripcion: '' });
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const rutaHistorial = `/mascotas/${mascota._id}/historial`;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.titulo.trim()) {
      setError('El título es obligatorio');
      return;
    }
    if (form.fecha > hoy) {
      setError('La fecha no puede ser futura. Para turnos que todavía no pasaron usá los eventos futuros.');
      return;
    }

    setEnviando(true);
    try {
      await crearEventoVeterinario(mascota._id, form);
      navigate(rutaHistorial, { replace: true });
    } catch (err) {
      setError(obtenerMensajeError(err));
      setEnviando(false);
    }
  }

  return (
    <div className="tarjeta tarjeta--media seccion-mascota">
      <h2>Registrar evento veterinario</h2>
      <p className="texto-secundario">
        Consultas, vacunas, estudios o diagnósticos que ya ocurrieron. Queda guardado en el historial.
      </p>

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <Alerta>{error}</Alerta>

        <div className="formulario__fila">
          <label className="campo">
            <span>Fecha</span>
            <input type="date" name="fecha" value={form.fecha} max={hoy} onChange={handleChange} />
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
          <span>Título</span>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            placeholder="Ej: Control anual"
            onChange={handleChange}
          />
        </label>

        <label className="campo">
          <span>
            Descripción <small>(opcional)</small>
          </span>
          <textarea
            name="descripcion"
            rows="4"
            value={form.descripcion}
            placeholder="Diagnóstico, indicaciones, estudios, próximos pasos..."
            onChange={handleChange}
          />
        </label>

        <div className="acciones">
          <button type="submit" className="boton" disabled={enviando}>
            {enviando ? 'Guardando...' : 'Guardar'}
          </button>
          <Link to={rutaHistorial} className="boton boton--secundario">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default NuevoEventoVeterinario;
