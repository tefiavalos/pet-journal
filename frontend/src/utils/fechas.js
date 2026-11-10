// Fecha local de hoy en formato AAAA-MM-DD (el que usan los inputs de tipo date)
export function hoyLocal() {
  return aTextoDia(new Date());
}

export function aTextoDia(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}
