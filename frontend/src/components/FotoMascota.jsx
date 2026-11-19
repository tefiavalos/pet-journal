import { useState } from 'react';
import { iconoTipo } from '../utils/mascotas.js';
import Icono from './Icono.jsx';

// Foto de la mascota. Si no tiene, o si el link no carga una imagen,
// muestra el ícono según su tipo (en vez del texto alternativo del navegador)
function FotoMascota({ mascota }) {
  const [fotoFallida, setFotoFallida] = useState(null);
  const mostrarFoto = mascota.foto && mascota.foto !== fotoFallida;

  if (mostrarFoto) {
    return <img src={mascota.foto} alt={mascota.nombre} onError={() => setFotoFallida(mascota.foto)} />;
  }

  return <Icono nombre={iconoTipo(mascota.tipo)} titulo={mascota.nombre} />;
}

export default FotoMascota;
