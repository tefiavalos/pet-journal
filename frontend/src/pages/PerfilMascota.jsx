import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import { useConfirmacion } from '../hooks/useConfirmacion.jsx';
import { eliminarMascota } from '../services/mascotaService.js';
import { obtenerMensajeError } from '../services/api.js';
import { calcularEdad, formatearFecha } from '../utils/mascotas.js';
import TextoDesplegable from '../components/TextoDesplegable.jsx';

const TEXTO_TIPO = { perro: 'Perro', gato: 'Gato', otro: 'Otro' };
const TEXTO_SEXO = { hembra: 'Hembra', macho: 'Macho' };

function PerfilMascota() {
  const { mascota } = useOutletContext();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [confirmar, dialogo] = useConfirmacion();

  async function handleCopiarCodigo() {
    try {
      await navigator.clipboard.writeText(mascota.codigoInvitacion);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setError('No se pudo copiar el código');
    }
  }

  async function handleEliminar() {
    const confirmado = await confirmar({
      titulo: `¿Eliminar a ${mascota.nombre}?`,
      mensaje: 'Se borra para todos sus responsables, junto con su historial. No se puede deshacer.',
      textoConfirmar: 'Eliminar',
      peligro: true,
    });
    if (!confirmado) return;

    setEliminando(true);
    try {
      await eliminarMascota(mascota._id);
      navigate('/mascotas', { replace: true });
    } catch (err) {
      setError(obtenerMensajeError(err));
      setEliminando(false);
    }
  }

  const datos = [
    { etiqueta: 'Tipo', valor: TEXTO_TIPO[mascota.tipo] },
    { etiqueta: 'Raza', valor: mascota.raza },
    { etiqueta: 'Sexo', valor: TEXTO_SEXO[mascota.sexo] },
    {
      etiqueta: 'Nacimiento',
      valor:
        mascota.fechaNacimiento &&
        `${formatearFecha(mascota.fechaNacimiento)} (${calcularEdad(mascota.fechaNacimiento)})`,
    },
    { etiqueta: 'Peso', valor: mascota.peso != null && `${mascota.peso} kg` },
  ];

  return (
    <>
      <Alerta>{error}</Alerta>

      <div className="acciones">
        <Link to={`/mascotas/${mascota._id}/editar`} className="boton boton--chico">
          Editar
        </Link>
        <button
          type="button"
          className="boton boton--chico boton--peligro"
          onClick={handleEliminar}
          disabled={eliminando}
        >
          {eliminando ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>

      <div className="perfil__grilla">
        <article className="tarjeta">
          <h2>Datos</h2>
          <dl className="lista-datos">
            {datos.map(({ etiqueta, valor }) => (
              <div key={etiqueta}>
                <dt>{etiqueta}</dt>
                <dd>{valor || '—'}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="tarjeta">
          <h2>Condiciones médicas</h2>
          {mascota.condicionesMedicas ? (
            <TextoDesplegable>{mascota.condicionesMedicas}</TextoDesplegable>
          ) : (
            <p>Sin condiciones médicas cargadas.</p>
          )}
        </article>

        <article className="tarjeta">
          <h2>Responsables</h2>
          <ul className="lista-responsables">
            {mascota.responsables.map(({ usuarioId, fechaAsociacion }) => (
              <li key={usuarioId?._id ?? fechaAsociacion}>
                <strong>{usuarioId?.nombre ?? 'Usuario eliminado'}</strong>
                <span className="texto-secundario">desde {formatearFecha(fechaAsociacion)}</span>
              </li>
            ))}
          </ul>

          <div className="codigo-invitacion">
            <p className="texto-secundario">Compartí este código para sumar a otro responsable:</p>
            <div className="codigo-invitacion__valor">
              <code>{mascota.codigoInvitacion}</code>
              <button type="button" className="boton boton--chico boton--secundario" onClick={handleCopiarCodigo}>
                {copiado ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </article>
      </div>

      {dialogo}
    </>
  );
}

export default PerfilMascota;
