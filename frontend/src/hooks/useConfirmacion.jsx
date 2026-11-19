import { useRef, useState } from 'react';
import DialogoConfirmacion from '../components/DialogoConfirmacion.jsx';

// Permite pedir una confirmación con nuestro diálogo y esperar la respuesta,
// igual que con window.confirm:
//
//   const [confirmar, dialogo] = useConfirmacion();
//   if (!(await confirmar({ titulo: '¿Eliminar?' }))) return;
//
// y en el JSX de la página se agrega {dialogo}.
export function useConfirmacion() {
  const [opciones, setOpciones] = useState(null);
  const resolverRef = useRef(null);

  function confirmar(nuevasOpciones) {
    setOpciones(nuevasOpciones);
    // La promesa se resuelve cuando el usuario elige una opción
    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  }

  function responder(valor) {
    resolverRef.current?.(valor);
    resolverRef.current = null;
    setOpciones(null);
  }

  const dialogo = (
    <DialogoConfirmacion
      {...opciones}
      abierto={opciones !== null}
      onConfirmar={() => responder(true)}
      onCancelar={() => responder(false)}
    />
  );

  return [confirmar, dialogo];
}
