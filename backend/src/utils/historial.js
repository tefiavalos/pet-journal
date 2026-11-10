export const CATEGORIAS_HISTORIAL = ['cotidiano', 'veterinario'];

// Cada registro del historial tiene la misma forma, venga de donde venga:
// { _id, categoria, tipo, fecha, hora?, titulo, descripcion?, realizadaPor? }
export function entradaDeEventoVeterinario(evento) {
  return {
    _id: evento._id,
    categoria: 'veterinario',
    tipo: evento.tipoConsulta,
    fecha: evento.fecha,
    titulo: evento.titulo,
    descripcion: evento.descripcion,
  };
}

function momento(entrada) {
  const base = new Date(entrada.fecha).getTime();
  if (!entrada.hora) return base;

  const [horas, minutos] = entrada.hora.split(':').map(Number);
  return base + (horas * 60 + minutos) * 60 * 1000;
}

// Del más reciente al más antiguo
export function ordenarHistorial(entradas) {
  return [...entradas].sort((a, b) => momento(b) - momento(a));
}
