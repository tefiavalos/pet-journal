import { textoTipo, iconoRegistro } from '../utils/registros.js';
import { formatearHora } from '../utils/fechas.js';

// Una tarea del día con el botón para marcarla como hecha o volverla a pendiente
function ItemTarea({ tarea, onCambiarEstado, deshabilitada, mostrarMascota = false }) {
  const hecha = tarea.estado === 'HECHO';

  return (
    <li className={`tarea ${hecha ? 'tarea--hecha' : ''}`}>
      <button
        type="button"
        className="tarea__check"
        onClick={() => onCambiarEstado(tarea, hecha ? 'PENDIENTE' : 'HECHO')}
        disabled={deshabilitada}
        aria-label={hecha ? 'Marcar como pendiente' : 'Marcar como hecha'}
      >
        {hecha ? '✓' : ''}
      </button>

      <span className="registro__icono">{iconoRegistro(tarea.tipo)}</span>

      <div className="registro__datos">
        <strong>
          {tarea.hora} · {textoTipo(tarea.tipo)}
          {mostrarMascota && tarea.mascotaId?.nombre && ` · ${tarea.mascotaId.nombre}`}
        </strong>
        {tarea.descripcion && <p>{tarea.descripcion}</p>}
        {hecha && (
          <p className="texto-secundario">
            Hecho{tarea.realizadaPor?.nombre && ` por ${tarea.realizadaPor.nombre}`}
            {tarea.realizadaEn && ` a las ${formatearHora(tarea.realizadaEn)}`}
          </p>
        )}
      </div>
    </li>
  );
}

export default ItemTarea;
