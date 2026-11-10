// Textos e íconos de los tipos de tareas y de consultas veterinarias

export const TIPOS_TAREA = [
  { valor: 'ALIMENTACION', texto: 'Alimentación', icono: '🍽️' },
  { valor: 'MEDICACION', texto: 'Medicación', icono: '💊' },
  { valor: 'PASEO', texto: 'Paseo', icono: '🦮' },
];

export const TIPOS_CONSULTA = [
  { valor: 'CONTROL', texto: 'Control', icono: '🩺' },
  { valor: 'URGENCIA', texto: 'Urgencia', icono: '🚑' },
  { valor: 'ESPECIALISTA', texto: 'Especialista', icono: '👩‍⚕️' },
  { valor: 'VACUNA', texto: 'Vacuna', icono: '💉' },
];

const TODOS = [...TIPOS_TAREA, ...TIPOS_CONSULTA];

export function textoTipo(valor) {
  return TODOS.find((tipo) => tipo.valor === valor)?.texto ?? valor;
}

export function iconoRegistro(valor) {
  return TODOS.find((tipo) => tipo.valor === valor)?.icono ?? '📝';
}
