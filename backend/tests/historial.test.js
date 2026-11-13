import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  entradaDeTarea,
  entradaDeEventoVeterinario,
  entradaDeRegistroCotidiano,
  ordenarHistorial,
} from '../src/utils/historial.js';

const tarea = {
  _id: 't1',
  tipo: 'PASEO',
  fecha: new Date('2026-11-02T00:00:00Z'),
  hora: '18:00',
  descripcion: 'Por la plaza',
  realizadaPor: { nombre: 'Andrea' },
};

const evento = {
  _id: 'ev1',
  tipoConsulta: 'VACUNA',
  fecha: new Date('2026-11-01T00:00:00Z'),
  titulo: 'Antirrábica',
  descripcion: 'Refuerzo anual',
};

test('una tarea hecha se muestra como información cotidiana', () => {
  assert.deepEqual(entradaDeTarea(tarea), {
    _id: 't1',
    categoria: 'cotidiano',
    tipo: 'PASEO',
    fecha: tarea.fecha,
    hora: '18:00',
    titulo: 'Paseo',
    descripcion: 'Por la plaza',
    realizadaPor: 'Andrea',
  });
});

test('un evento veterinario se muestra como información veterinaria', () => {
  const entrada = entradaDeEventoVeterinario(evento);
  assert.equal(entrada.categoria, 'veterinario');
  assert.equal(entrada.tipo, 'VACUNA');
  assert.equal(entrada.titulo, 'Antirrábica');
});

test('el historial queda ordenado del más reciente al más antiguo', () => {
  const manana = { ...tarea, _id: 't2', hora: '08:00' };
  const historial = ordenarHistorial([
    entradaDeEventoVeterinario(evento),
    entradaDeTarea(manana),
    entradaDeTarea(tarea),
  ]);

  assert.deepEqual(
    historial.map((e) => e._id),
    ['t1', 't2', 'ev1'],
  );
});

test('un cambio de peso se muestra como información cotidiana con el peso en el título', () => {
  const entrada = entradaDeRegistroCotidiano({
    _id: 'r1',
    tipo: 'PESO',
    fecha: new Date('2026-11-03T00:00:00Z'),
    peso: 25.3,
    registradoPor: { nombre: 'Estefanía' },
  });
  assert.equal(entrada.categoria, 'cotidiano');
  assert.equal(entrada.titulo, 'Peso: 25.3 kg');
  assert.equal(entrada.realizadaPor, 'Estefanía');
});

test('una nota se muestra con su texto como descripción', () => {
  const entrada = entradaDeRegistroCotidiano({
    _id: 'r2',
    tipo: 'NOTA',
    fecha: new Date('2026-11-03T00:00:00Z'),
    texto: 'Empezó a comer el alimento nuevo',
  });
  assert.equal(entrada.titulo, 'Nota');
  assert.equal(entrada.descripcion, 'Empezó a comer el alimento nuevo');
});
