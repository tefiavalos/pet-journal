import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from './Alerta.jsx';
import { obtenerMensajeError } from '../services/api.js';

export const MASCOTA_VACIA = {
  nombre: '',
  tipo: 'perro',
  raza: '',
  fechaNacimiento: '',
  sexo: '',
  peso: '',
  foto: '',
  condicionesMedicas: '',
};

function validar(form) {
  if (!form.nombre.trim()) return 'El nombre es obligatorio';
  if (form.peso !== '' && Number(form.peso) < 0) return 'El peso no puede ser negativo';

  const hoy = new Date().toISOString().slice(0, 10);
  if (form.fechaNacimiento && form.fechaNacimiento > hoy) {
    return 'La fecha de nacimiento no puede ser futura';
  }

  if (form.foto.trim() && !/^https?:\/\//.test(form.foto.trim())) {
    return 'La foto tiene que ser un link que empiece con http:// o https://';
  }

  return '';
}

function FormularioMascota({ valoresIniciales = MASCOTA_VACIA, onGuardar, textoBoton, rutaCancelar }) {
  const [form, setForm] = useState(valoresIniciales);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const hoy = new Date().toISOString().slice(0, 10);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errorValidacion = validar(form);
    setError(errorValidacion);
    if (errorValidacion) return;

    setEnviando(true);
    try {
      await onGuardar(form);
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
          <span>Nombre</span>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
        </label>

        <label className="campo">
          <span>Tipo</span>
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="otro">Otro</option>
          </select>
        </label>
      </div>

      <div className="formulario__fila">
        <label className="campo">
          <span>
            Raza <small>(opcional)</small>
          </span>
          <input type="text" name="raza" value={form.raza} onChange={handleChange} />
        </label>

        <label className="campo">
          <span>
            Sexo <small>(opcional)</small>
          </span>
          <select name="sexo" value={form.sexo} onChange={handleChange}>
            <option value="">Sin especificar</option>
            <option value="hembra">Hembra</option>
            <option value="macho">Macho</option>
          </select>
        </label>
      </div>

      <div className="formulario__fila">
        <label className="campo">
          <span>
            Fecha de nacimiento <small>(opcional)</small>
          </span>
          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} max={hoy} onChange={handleChange} />
        </label>

        <label className="campo">
          <span>
            Peso en kg <small>(opcional)</small>
          </span>
          <input type="number" name="peso" value={form.peso} min="0" step="0.1" onChange={handleChange} />
        </label>
      </div>

      <label className="campo">
        <span>
          Link de la foto <small>(opcional)</small>
        </span>
        <input type="url" name="foto" value={form.foto} placeholder="https://..." onChange={handleChange} />
      </label>

      <label className="campo">
        <span>
          Condiciones médicas y medicación <small>(opcional)</small>
        </span>
        <textarea name="condicionesMedicas" rows="3" value={form.condicionesMedicas} onChange={handleChange} />
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

export default FormularioMascota;
