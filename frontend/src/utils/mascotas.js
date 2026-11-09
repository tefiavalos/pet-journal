const ICONOS_TIPO = {
  perro: '🐶',
  gato: '🐱',
  otro: '🐾',
};

export function iconoTipo(tipo) {
  return ICONOS_TIPO[tipo] ?? ICONOS_TIPO.otro;
}

// Las fechas se guardan a las 00:00 UTC, por eso se muestran en UTC
// para que no aparezcan corridas un día
export function formatearFecha(fechaIso) {
  if (!fechaIso) return '';
  return new Date(fechaIso).toLocaleDateString('es-AR', { timeZone: 'UTC' });
}

export function calcularEdad(fechaIso) {
  if (!fechaIso) return '';

  const nacimiento = new Date(fechaIso);
  const hoy = new Date();

  let meses =
    (hoy.getUTCFullYear() - nacimiento.getUTCFullYear()) * 12 +
    (hoy.getUTCMonth() - nacimiento.getUTCMonth());
  if (hoy.getUTCDate() < nacimiento.getUTCDate()) meses--;

  if (meses < 1) return 'Menos de un mes';
  if (meses < 12) return meses === 1 ? '1 mes' : `${meses} meses`;

  const anios = Math.floor(meses / 12);
  return anios === 1 ? '1 año' : `${anios} años`;
}
