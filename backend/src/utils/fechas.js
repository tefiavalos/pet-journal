const FORMATO_DIA = /^\d{4}-\d{2}-\d{2}$/;
const UN_DIA_MS = 24 * 60 * 60 * 1000;

// Convierte "AAAA-MM-DD" en una fecha a las 00:00 UTC. Devuelve null si no es válida.
export function parsearDia(texto) {
  if (typeof texto !== 'string' || !FORMATO_DIA.test(texto)) return null;

  const fecha = new Date(`${texto}T00:00:00.000Z`);
  if (Number.isNaN(fecha.getTime()) || fecha.toISOString().slice(0, 10) !== texto) return null;

  return fecha;
}

// Día de hoy según la hora del servidor, en formato "AAAA-MM-DD"
export function hoy() {
  const ahora = new Date();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  return `${ahora.getFullYear()}-${mes}-${dia}`;
}

export function sumarDias(fecha, dias) {
  return new Date(fecha.getTime() + dias * UN_DIA_MS);
}
