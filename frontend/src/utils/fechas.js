// Fecha local de hoy en formato AAAA-MM-DD (el que usan los inputs de tipo date)
export function hoyLocal() {
  return aTextoDia(new Date());
}

export function aTextoDia(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

// Suma días a una fecha AAAA-MM-DD y devuelve el mismo formato
export function sumarDias(textoDia, dias) {
  const [anio, mes, dia] = textoDia.split('-').map(Number);
  return aTextoDia(new Date(anio, mes - 1, dia + dias));
}

// "martes 3 de noviembre"
export function formatearDiaLargo(textoDia) {
  const [anio, mes, dia] = textoDia.split('-').map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

// Hora local de una fecha ISO, por ejemplo "15:30"
export function formatearHora(fechaIso) {
  return new Date(fechaIso).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}
