import { useEffect, useRef } from 'react';

// Ventana de confirmación propia, en lugar de window.confirm.
// Usa el elemento <dialog> del navegador: bloquea el resto de la página,
// mantiene el foco adentro y se cierra con Escape.
function DialogoConfirmacion({
  abierto,
  titulo,
  mensaje,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  peligro = false,
  onConfirmar,
  onCancelar,
}) {
  const dialogoRef = useRef(null);

  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (!dialogo) return;
    if (abierto && !dialogo.open) dialogo.showModal();
    if (!abierto && dialogo.open) dialogo.close();
  }, [abierto]);

  function handleEscape(evento) {
    // Escape cierra el diálogo: lo tratamos como "Cancelar"
    evento.preventDefault();
    onCancelar();
  }

  function handleClickFondo(evento) {
    // Un clic afuera de la ventana (sobre el fondo oscuro) también cancela
    if (evento.target === dialogoRef.current) onCancelar();
  }

  return (
    <dialog
      ref={dialogoRef}
      className="dialogo"
      aria-labelledby="dialogo-titulo"
      onCancel={handleEscape}
      onClick={handleClickFondo}
    >
      <div className="dialogo__contenido">
        <h2 id="dialogo-titulo" className="dialogo__titulo">
          {titulo}
        </h2>
        {mensaje && <p className="dialogo__mensaje">{mensaje}</p>}
        <div className="dialogo__acciones">
          <button type="button" className="boton boton--secundario" onClick={onCancelar}>
            {textoCancelar}
          </button>
          <button type="button" className={peligro ? 'boton boton--peligro' : 'boton'} onClick={onConfirmar}>
            {textoConfirmar}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DialogoConfirmacion;
