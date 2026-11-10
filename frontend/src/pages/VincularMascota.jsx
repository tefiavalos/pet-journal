import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import { vincularMascota } from '../services/mascotaService.js';
import { obtenerMensajeError } from '../services/api.js';

function VincularMascota() {
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!codigo.trim()) {
      setError('Ingresá el código de invitación');
      return;
    }

    setEnviando(true);
    try {
      const mascota = await vincularMascota(codigo.trim().toUpperCase());
      navigate(`/mascotas/${mascota._id}`, { replace: true });
    } catch (err) {
      setError(obtenerMensajeError(err));
      setEnviando(false);
    }
  }

  return (
    <section className="tarjeta tarjeta--angosta">
      <h1>Vincular mascota</h1>
      <p className="texto-secundario">
        Pedile el código de invitación a otro responsable de la mascota. Lo encuentra en el perfil de la mascota.
      </p>

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <Alerta>{error}</Alerta>

        <label className="campo">
          <span>Código de invitación</span>
          <input
            type="text"
            name="codigo"
            value={codigo}
            placeholder="Ej: LUNA-7F3K"
            onChange={(e) => setCodigo(e.target.value)}
            className="input-codigo"
          />
        </label>

        <div className="acciones">
          <button type="submit" className="boton" disabled={enviando}>
            {enviando ? 'Vinculando...' : 'Vincular'}
          </button>
          <Link to="/mascotas" className="boton boton--secundario">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  );
}

export default VincularMascota;
