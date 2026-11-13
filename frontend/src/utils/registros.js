// Textos e íconos de los tipos de tareas, de pesos y notas, y de consultas veterinarias

export const TIPOS_TAREA = [
  { valor: 'ALIMENTACION', texto: 'Alimentación', icono: '🍽️' },
  { valor: 'MEDICACION', texto: 'Medicación', icono: '💊' },
  { valor: 'PASEO', texto: 'Paseo', icono: '🦮' },
];

export const TIPOS_REGISTRO = [
  { valor: 'PESO', texto: 'Peso', icono: '⚖️' },
  { valor: 'NOTA', texto: 'Nota', icono: '📝' },
];

export const TIPOS_CONSULTA = [
  { valor: 'CONTROL', texto: 'Control', icono: '🩺' },
  { valor: 'URGENCIA', texto: 'Urgencia', icono: '🚑' },
  { valor: 'ESPECIALISTA', texto: 'Especialista', icono: '👩‍⚕️' },
  { valor: 'VACUNA', texto: 'Vacuna', icono: '💉' },
];

const TODOS = [...TIPOS_TAREA, ...TIPOS_REGISTRO, ...TIPOS_CONSULTA];

export function textoTipo(valor) {
  return TODOS.find((tipo) => tipo.valor === valor)?.texto ?? valor;
}

export function iconoRegistro(valor) {
  return TODOS.find((tipo) => tipo.valor === valor)?.icono ?? '📝';
}
