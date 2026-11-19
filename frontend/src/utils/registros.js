// Textos e íconos (nombre del ícono de components/Icono.jsx) de los tipos de tareas, de pesos y notas, y de consultas veterinarias

export const TIPOS_TAREA = [
  { valor: 'ALIMENTACION', texto: 'Alimentación', icono: 'alimentacion' },
  { valor: 'MEDICACION', texto: 'Medicación', icono: 'medicacion' },
  { valor: 'PASEO', texto: 'Paseo', icono: 'paseo' },
];

export const TIPOS_REGISTRO = [
  { valor: 'PESO', texto: 'Peso', icono: 'peso' },
  { valor: 'NOTA', texto: 'Nota', icono: 'nota' },
];

export const TIPOS_CONSULTA = [
  { valor: 'CONTROL', texto: 'Control', icono: 'control' },
  { valor: 'URGENCIA', texto: 'Urgencia', icono: 'urgencia' },
  { valor: 'ESPECIALISTA', texto: 'Especialista', icono: 'especialista' },
  { valor: 'VACUNA', texto: 'Vacuna', icono: 'vacuna' },
];

const TODOS = [...TIPOS_TAREA, ...TIPOS_REGISTRO, ...TIPOS_CONSULTA];

export function textoTipo(valor) {
  return TODOS.find((tipo) => tipo.valor === valor)?.texto ?? valor;
}

export function iconoRegistro(valor) {
  return TODOS.find((tipo) => tipo.valor === valor)?.icono ?? 'nota';
}
