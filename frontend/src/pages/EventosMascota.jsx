import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import {
  listarEventosFuturos,
  cancelarEventoFuturo,
  marcarEventoRealizado,
} from '../services/eventoFuturoService.js';
import { obtenerMensajeError } from '../services/api.js';
import { textoTipo, iconoRegistro } from '../utils/registros.js';
import { aTextoDia, formatearFechaHora } from '../utils/fechas.js';

const TEXTO_ESTADO = { REALIZADO: 'Realizado', CANCELADO: 'Cancelado' };

function EventosMascota() {
  const { mascota } = useOutletContext();
  const ruta = `/mascotas/${mascota._id}/eventos`;

  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [verAnteriores, setVerAnteriores] = useState(false);

  useEffect(() => {
    listarEventosFuturos(mascota._id)
      .then(setEventos)
      .catch((err) => setError(obtenerMensajeError(err)))
      .finally(() => setCargando(false));
  }, [mascota._id]);

  function reemplazar(evento) {
    setEventos((lista) => lista.map((e) => (e._id === evento._id ? evento : e)));
  }

  async function handleRealizado(evento) {
    if (!window.confirm(`¿Confirmás que "${evento.titulo}" se realizó? Va a quedar guardado en el historial.`)) return;

    setError('');
    setMensaje('');
    try {
      // Se manda el día local del turno para que en el historial quede en la fecha correcta
      const { eventoFuturo } = await marcarEventoRealizado(evento._id, { fecha: aTextoDia(new Date(evento.fecha)) });
      reemplazar(eventoFuturo);
      setMensaje(`"${evento.titulo}" se pasó al historial.`);
    } catch (err) {
      setError(obtenerMensajeError(err));
    }
  }

  async function handleCancelar(evento) {
    if (!window.confirm(`¿Cancelar "${evento.titulo}"?`)) return;

    setError('');
    setMensaje('');
    try {
      reemplazar(await cancelarEventoFuturo(evento._id));
    } catch (err) {
      setError(obtenerMensajeError(err));
    }
  }

  const ahora = new Date();
  const pendientes = eventos.filter((e) => e.estado === 'PENDIENTE');
  const anteriores = eventos.filter((e) => e.estado !== 'PENDIENTE').reverse();

  return (
    <div className="seccion-mascota">
      <div className="encabezado-pagina">
        <div>
          <h2>Turnos y controles</h2>
          <p className="texto-secundario">Los eventos que todavía no ocurrieron. Se pueden reprogramar hasta que se realicen.</p>
        </div>
        <Link to={`${ruta}/nuevo`} className="boton">
          + Nuevo turno
        </Link>
      </div>

      <Alerta>{error}</Alerta>
      <Alerta tipo="exito">{mensaje}</Alerta>
      {cargando && <p className="texto-secundario">Cargando turnos...</p>}

      {!cargando && pendientes.length === 0 && (
        <div className="tarjeta vacio">
          <p>No hay turnos pendientes para {mascota.nombre}.</p>
        </div>
      )}

      <ul className="lista-registros">
        {pendientes.map((evento) => {
          const yaPaso = new Date(evento.fecha) < ahora;
          return (
            <li key={evento._id} className={`registro registro--veterinario ${yaPaso ? 'registro--vencido' : ''}`}>
              <span className="registro__icono">{iconoRegistro(evento.tipoConsulta)}</span>
              <div className="registro__datos">
                <div className="registro__titulo">
                  <strong>{evento.titulo}</strong>
                  <span className="etiqueta etiqueta--veterinario">{textoTipo(evento.tipoConsulta)}</span>
                  {yaPaso && <span className="etiqueta etiqueta--vencido">Ya pasó: ¿se realizó?</span>}
                </div>
                <p>{formatearFechaHora(evento.fecha)} hs</p>
                {evento.descripcion && <p className="texto-secundario texto-con-saltos">{evento.descripcion}</p>}
              </div>
              <div className="acciones">
                <button type="button" className="boton boton--chico" onClick={() => handleRealizado(evento)}>
                  Realizado
                </button>
                {!yaPaso && (
                  <Link to={`${ruta}/${evento._id}/editar`} className="boton boton--chico boton--secundario">
                    Reprogramar
                  </Link>
                )}
                <button type="button" className="boton boton--chico boton--secundario" onClick={() => handleCancelar(evento)}>
                  Cancelar
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {anteriores.length > 0 && (
        <div>
          <button type="button" className="boton boton--chico boton--secundario" onClick={() => setVerAnteriores(!verAnteriores)}>
            {verAnteriores ? 'Ocultar' : 'Ver'} turnos anteriores ({anteriores.length})
          </button>

          {verAnteriores && (
            <ul className="lista-registros lista-registros--anteriores">
              {anteriores.map((evento) => (
                <li key={evento._id} className="registro registro--inactivo">
                  <span className="registro__icono">{iconoRegistro(evento.tipoConsulta)}</span>
                  <div className="registro__datos">
                    <div className="registro__titulo">
                      <strong>{evento.titulo}</strong>
                      <span className="etiqueta">{TEXTO_ESTADO[evento.estado]}</span>
                    </div>
                    <p>{formatearFechaHora(evento.fecha)} hs</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default EventosMascota;
