import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import { obtenerMascota, eliminarMascota } from '../services/mascotaService.js';
import { obtenerMensajeError } from '../services/api.js';
import { calcularEdad, formatearFecha, iconoTipo } from '../utils/mascotas.js';

const TEXTO_TIPO = { perro: 'Perro', gato: 'Gato', otro: 'Otro' };
const TEXTO_SEXO = { hembra: 'Hembra', macho: 'Macho' };

function PerfilMascota() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mascota, setMascota] = useState(null);
  const [error, setError] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    obtenerMascota(id)
      .then(setMascota)
      .catch((err) => setError(obtenerMensajeError(err)));
  }, [id]);

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
    const confirmar = window.confirm(
      `¿Seguro que querés eliminar a ${mascota.nombre}? Se borra para todos sus responsables.`,
    );
    if (!confirmar) return;

    setEliminando(true);
    try {
      await eliminarMascota(id);
      navigate('/mascotas', { replace: true });
    } catch (err) {
      setError(obtenerMensajeError(err));
      setEliminando(false);
    }
  }

  if (!mascota) {
    return (
      <section>
        <Alerta>{error}</Alerta>
        {!error && <p className="texto-secundario">Cargando...</p>}
        <Link to="/mascotas">Volver a mis mascotas</Link>
      </section>
    );
  }

  const datos = [
    { etiqueta: 'Tipo', valor: TEXTO_TIPO[mascota.tipo] },
    { etiqueta: 'Raza', valor: mascota.raza },
    { etiqueta: 'Sexo', valor: TEXTO_SEXO[mascota.sexo] },
    {
      etiqueta: 'Nacimiento',
      valor: mascota.fechaNacimiento &&
        `${formatearFecha(mascota.fechaNacimiento)} (${calcularEdad(mascota.fechaNacimiento)})`,
    },
    { etiqueta: 'Peso', valor: mascota.peso != null && `${mascota.peso} kg` },
  ];

  return (
    <section className="perfil">
      <Link to="/mascotas">← Mis mascotas</Link>

      <Alerta>{error}</Alerta>

      <div className="perfil__cabecera">
        <div className="perfil__foto">
          {mascota.foto ? <img src={mascota.foto} alt={mascota.nombre} /> : <span>{iconoTipo(mascota.tipo)}</span>}
        </div>

        <div>
          <h1>{mascota.nombre}</h1>
          <div className="acciones">
            <Link to={`/mascotas/${id}/editar`} className="boton boton--chico">
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
        </div>
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
          <p className="texto-con-saltos">{mascota.condicionesMedicas || 'Sin condiciones médicas cargadas.'}</p>
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
    </section>
  );
}

export default PerfilMascota;
