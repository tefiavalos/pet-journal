import { sumarDias } from './fechas.js';

// Cuántos días antes del turno empieza a aparecer el aviso
export const DIAS_AVISO = 7;

// Los avisos incluyen los turnos pendientes hasta DIAS_AVISO días adelante.
// También los que ya pasaron y siguen pendientes, para que se marquen como realizados.
export function limiteDeAvisos(ahora, dias = DIAS_AVISO) {
  return sumarDias(ahora, dias + 1);
}
