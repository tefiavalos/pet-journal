export const CATEGORIAS_HISTORIAL = ['cotidiano', 'veterinario'];

const TITULOS_TAREA = {
  ALIMENTACION: 'Alimentación',
  MEDICACION: 'Medicación',
  PASEO: 'Paseo',
};

// Cada registro del historial tiene la misma forma, venga de donde venga
// (tareas hechas, pesos y notas, o eventos veterinarios):
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

export function entradaDeTarea(tarea) {
  return {
    _id: tarea._id,
    categoria: 'cotidiano',
    tipo: tarea.tipo,
    fecha: tarea.fecha,
    hora: tarea.hora,
    titulo: TITULOS_TAREA[tarea.tipo],
    descripcion: tarea.descripcion,
    realizadaPor: tarea.realizadaPor?.nombre,
  };
}

export function entradaDeRegistroCotidiano(registro) {
  return {
    _id: registro._id,
    categoria: 'cotidiano',
    tipo: registro.tipo,
    fecha: registro.fecha,
    titulo: registro.tipo === 'PESO' ? `Peso: ${registro.peso} kg` : 'Nota',
    descripcion: registro.texto,
    realizadaPor: registro.registradoPor?.nombre,
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
