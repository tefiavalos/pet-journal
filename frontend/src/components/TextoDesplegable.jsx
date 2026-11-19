import { useLayoutEffect, useRef, useState } from 'react';

// Muestra un texto de varias líneas recortado a unas pocas, con "Ver más" para leerlo completo.
// Así un texto muy largo (o con muchos saltos de línea) no estira la tarjeta.
function TextoDesplegable({ children, className = '' }) {
  const parrafoRef = useRef(null);
  const [abierto, setAbierto] = useState(false);
  const [recortado, setRecortado] = useState(false);

  useLayoutEffect(() => {
    const parrafo = parrafoRef.current;
    if (parrafo && !abierto) {
      setRecortado(parrafo.scrollHeight > parrafo.clientHeight + 1);
    }
  }, [children, abierto]);

  const clases = ['texto-con-saltos', abierto ? '' : 'texto-recortado', className].filter(Boolean).join(' ');

  return (
    <>
      <p ref={parrafoRef} className={clases}>
        {children}
      </p>
      {(recortado || abierto) && (
        <button type="button" className="boton-texto" onClick={() => setAbierto(!abierto)} aria-expanded={abierto}>
          {abierto ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </>
  );
}

export default TextoDesplegable;
