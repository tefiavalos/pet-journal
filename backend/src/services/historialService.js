import EventoVeterinario, { TIPOS_CONSULTA } from '../models/EventoVeterinario.js';
import TareaDiaria, { TIPOS_TAREA } from '../models/TareaDiaria.js';
import { verificarAcceso } from './mascotaService.js';
import { sumarDias } from '../utils/fechas.js';
import { entradaDeEventoVeterinario, entradaDeTarea, ordenarHistorial } from '../utils/historial.js';

function rangoDeFechas({ desde, hasta }) {
  if (!desde && !hasta) return undefined;

  const rango = {};
  if (desde) rango.$gte = desde;
  if (hasta) rango.$lt = sumarDias(hasta, 1);
  return rango;
}

// Servicio de Historial (RF06): no tiene colección propia, arma el historial
// completo de la mascota a partir de los registros de los otros módulos.
export async function obtenerHistorial(mascotaId, usuarioId, filtros) {
  await verificarAcceso(mascotaId, usuarioId);

  const { categoria, tipo } = filtros;
  const fecha = rangoDeFechas(filtros);
  const entradas = [];

  // Información cotidiana: las tareas diarias marcadas como HECHO
  const incluirCotidiano = categoria !== 'veterinario' && (!tipo || TIPOS_TAREA.includes(tipo));
  if (incluirCotidiano) {
    const tareas = await TareaDiaria.find({
      mascotaId,
      estado: 'HECHO',
      ...(tipo && { tipo }),
      ...(fecha && { fecha }),
    }).populate('realizadaPor', 'nombre');
    entradas.push(...tareas.map(entradaDeTarea));
  }

  // Información veterinaria
  const incluirVeterinario = categoria !== 'cotidiano' && (!tipo || TIPOS_CONSULTA.includes(tipo));
  if (incluirVeterinario) {
    const eventos = await EventoVeterinario.find({
      mascotaId,
      ...(tipo && { tipoConsulta: tipo }),
      ...(fecha && { fecha }),
    });
    entradas.push(...eventos.map(entradaDeEventoVeterinario));
  }

  return ordenarHistorial(entradas);
}
