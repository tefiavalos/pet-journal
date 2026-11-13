import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import { obtenerHistorial } from '../services/historialService.js';
import { obtenerMensajeError } from '../services/api.js';
import { formatearFecha } from '../utils/mascotas.js';
import { TIPOS_TAREA, TIPOS_REGISTRO, TIPOS_CONSULTA, textoTipo, iconoRegistro } from '../utils/registros.js';

const FILTROS_INICIALES = { categoria: '', tipo: '', desde: '', hasta: '' };

function tiposDeCategoria(categoria) {
  if (categoria === 'cotidiano') return [...TIPOS_TAREA, ...TIPOS_REGISTRO];
  if (categoria === 'veterinario') return TIPOS_CONSULTA;
  return [...TIPOS_TAREA, ...TIPOS_REGISTRO, ...TIPOS_CONSULTA];
}

// Agrupa los registros por día, manteniendo el orden que manda la API
function agruparPorDia(registros) {
  const grupos = [];
  for (const registro of registros) {
    const dia = formatearFecha(registro.fecha);
    const ultimo = grupos[grupos.length - 1];
    if (ultimo?.dia === dia) ultimo.registros.push(registro);
    else grupos.push({ dia, registros: [registro] });
  }
  return grupos;
}

function HistorialMascota() {
  const { mascota } = useOutletContext();

  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setCargando(true);
    setError('');
    obtenerHistorial(mascota._id, filtros)
      .then(setRegistros)
      .catch((err) => setError(obtenerMensajeError(err)))
      .finally(() => setCargando(false));
  }, [mascota._id, filtros]);

  function handleChange(e) {
    const { name, value } = e.target;
    // Al cambiar de categoría, el tipo elegido puede dejar de tener sentido
    setFiltros((anteriores) => ({ ...anteriores, [name]: value, ...(name === 'categoria' && { tipo: '' }) }));
  }

  const hayFiltros = Object.values(filtros).some(Boolean);

  return (
    <div className="seccion-mascota">
      <div className="encabezado-pagina">
        <h2>Historial</h2>
        <div className="acciones">
          <Link to={`/mascotas/${mascota._id}/historial/registro`} className="boton boton--secundario">
            + Registrar peso o nota
          </Link>
          <Link to={`/mascotas/${mascota._id}/historial/nuevo`} className="boton">
            + Registrar evento veterinario
          </Link>
        </div>
      </div>

      <div className="filtros tarjeta">
        <label className="campo">
          <span>Categoría</span>
          <select name="categoria" value={filtros.categoria} onChange={handleChange}>
            <option value="">Todo</option>
            <option value="cotidiano">Cotidiano</option>
            <option value="veterinario">Veterinario</option>
          </select>
        </label>

        <label className="campo">
          <span>Tipo</span>
          <select name="tipo" value={filtros.tipo} onChange={handleChange}>
            <option value="">Todos</option>
            {tiposDeCategoria(filtros.categoria).map(({ valor, texto }) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </label>

        <label className="campo">
          <span>Desde</span>
          <input type="date" name="desde" value={filtros.desde} onChange={handleChange} />
        </label>

        <label className="campo">
          <span>Hasta</span>
          <input type="date" name="hasta" value={filtros.hasta} onChange={handleChange} />
        </label>

        {hayFiltros && (
          <button type="button" className="boton boton--chico boton--secundario" onClick={() => setFiltros(FILTROS_INICIALES)}>
            Limpiar filtros
          </button>
        )}
      </div>

      <Alerta>{error}</Alerta>
      {cargando && <p className="texto-secundario">Cargando historial...</p>}

      {!cargando && !error && registros.length === 0 && (
        <div className="tarjeta vacio">
          <p>{hayFiltros ? 'No hay registros con esos filtros.' : 'Todavía no hay registros en el historial.'}</p>
        </div>
      )}

      {!cargando &&
        agruparPorDia(registros).map(({ dia, registros: delDia }) => (
          <div key={dia} className="historial__dia">
            <h3>{dia}</h3>
            <ul className="lista-registros">
              {delDia.map((registro) => (
                <li key={registro._id} className={`registro registro--${registro.categoria}`}>
                  <span className="registro__icono">{iconoRegistro(registro.tipo)}</span>
                  <div className="registro__datos">
                    <div className="registro__titulo">
                      <strong>{registro.titulo}</strong>
                      <span className={`etiqueta etiqueta--${registro.categoria}`}>
                        {registro.categoria === 'veterinario' ? textoTipo(registro.tipo) : 'Cotidiano'}
                      </span>
                    </div>
                    {registro.descripcion && <p className="texto-con-saltos">{registro.descripcion}</p>}
                    <p className="texto-secundario">
                      {registro.hora && `${registro.hora} hs`}
                      {registro.hora && registro.realizadaPor && ' · '}
                      {registro.realizadaPor &&
                        `${['PESO', 'NOTA'].includes(registro.tipo) ? 'Registrado' : 'Hecho'} por ${registro.realizadaPor}`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default HistorialMascota;
