import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import { crearRegistroCotidiano } from '../services/registroCotidianoService.js';
import { obtenerMascota } from '../services/mascotaService.js';
import { obtenerMensajeError } from '../services/api.js';
import { hoyLocal } from '../utils/fechas.js';

function NuevoRegistroCotidiano() {
  const { mascota, setMascota } = useOutletContext();
  const navigate = useNavigate();
  const hoy = hoyLocal();

  const [form, setForm] = useState({ tipo: 'PESO', fecha: hoy, peso: mascota.peso ?? '', texto: '' });
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const rutaHistorial = `/mascotas/${mascota._id}/historial`;
  const esPeso = form.tipo === 'PESO';

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (esPeso && !(Number(form.peso) > 0)) return setError('Ingresá un peso mayor a 0');
    if (!esPeso && !form.texto.trim()) return setError('Escribí la nota');
    if (form.fecha > hoy) return setError('La fecha no puede ser futura');

    setEnviando(true);
    try {
      await crearRegistroCotidiano(mascota._id, {
        tipo: form.tipo,
        fecha: form.fecha,
        texto: form.texto,
        ...(esPeso && { peso: form.peso }),
      });

      // Un peso nuevo cambia el perfil: se vuelve a cargar la mascota
      if (esPeso) setMascota(await obtenerMascota(mascota._id));

      navigate(rutaHistorial, { replace: true });
    } catch (err) {
      setError(obtenerMensajeError(err));
      setEnviando(false);
    }
  }

  return (
    <div className="tarjeta tarjeta--media seccion-mascota">
      <h2>Registrar peso o nota</h2>
      <p className="texto-secundario">
        Queda guardado en el historial como información cotidiana. Al registrar un peso se actualiza también el perfil.
      </p>

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <Alerta>{error}</Alerta>

        <div className="formulario__fila">
          <label className="campo">
            <span>Qué querés registrar</span>
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="PESO">Peso</option>
              <option value="NOTA">Nota</option>
            </select>
          </label>

          <label className="campo">
            <span>Fecha</span>
            <input type="date" name="fecha" value={form.fecha} max={hoy} onChange={handleChange} />
          </label>
        </div>

        {esPeso && (
          <label className="campo">
            <span>Peso en kg</span>
            <input type="number" name="peso" value={form.peso} min="0" step="0.1" onChange={handleChange} />
          </label>
        )}

        <label className="campo">
          <span>
            {esPeso ? (
              <>
                Comentario <small>(opcional)</small>
              </>
            ) : (
              'Nota'
            )}
          </span>
          <textarea
            name="texto"
            rows="3"
            value={form.texto}
            placeholder={esPeso ? 'Ej: pesado en la veterinaria' : 'Ej: empezó a comer el alimento nuevo'}
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

export default NuevoRegistroCotidiano;
