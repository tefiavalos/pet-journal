import { hoyLocal, aTextoDia, aTextoHora } from './fechas.js';

const UN_DIA_MS = 24 * 60 * 60 * 1000;

// Días de calendario entre hoy y la fecha del evento (0 = hoy, 1 = mañana)
function diasHasta(fecha) {
  const [anio, mes, dia] = aTextoDia(fecha).split('-').map(Number);
  const [anioHoy, mesHoy, diaHoy] = hoyLocal().split('-').map(Number);
  return Math.round((Date.UTC(anio, mes - 1, dia) - Date.UTC(anioHoy, mesHoy - 1, diaHoy)) / UN_DIA_MS);
}

// Arma el texto del aviso, por ejemplo "Hoy Luna tiene Turno veterinario a las 15:30."
export function textoAviso(evento, ahora = new Date()) {
  const fecha = new Date(evento.fecha);
  const nombre = evento.mascotaId?.nombre ?? 'Tu mascota';
  const hora = aTextoHora(fecha);

  if (fecha < ahora) {
    return {
      vencido: true,
      texto: `El turno "${evento.titulo}" de ${nombre} (${fecha.toLocaleDateString('es-AR')} ${hora}) ya pasó. ¿Se realizó?`,
    };
  }

  const dias = diasHasta(fecha);
  const cuando = dias === 0 ? 'Hoy' : dias === 1 ? 'Mañana' : `En ${dias} días`;

  return { vencido: false, texto: `${cuando} ${nombre} tiene "${evento.titulo}" a las ${hora}.` };
}
