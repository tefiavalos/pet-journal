import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validarRegistro,
  validarMascota,
  validarActividad,
  validarEstadoTarea,
  validarEventoFuturo,
  validarFiltrosHistorial,
} from '../src/middlewares/validaciones.js';

// Ejecuta un middleware con un req armado a mano.
// Devuelve el req (si pasó la validación) o el error que lanzó.
function ejecutar(middleware, req) {
  let siguio = false;
  try {
    middleware(req, {}, () => {
      siguio = true;
    });
  } catch (error) {
    return { error };
  }
  assert.ok(siguio, 'el middleware tendría que llamar a next()');
  return { req };
}

test('registro: rechaza una contraseña de menos de 8 caracteres', () => {
  const { error } = ejecutar(validarRegistro, {
    body: { nombre: 'Ana', email: 'ana@mail.com', password: '123' },
  });
  assert.equal(error.status, 400);
  assert.match(error.message, /al menos 8 caracteres/);
});

test('registro: acepta datos válidos', () => {
  const { req } = ejecutar(validarRegistro, {
    body: { nombre: 'Ana', email: 'ana@mail.com', password: '12345678' },
  });
  assert.ok(req);
});

test('mascota: el nombre y el tipo son obligatorios', () => {
  const { error } = ejecutar(validarMascota, { body: { tipo: 'dinosaurio' } });
  assert.equal(error.status, 400);
  assert.match(error.message, /El nombre es obligatorio/);
  assert.match(error.message, /El tipo de mascota no es válido/);
});

test('mascota: los campos opcionales vacíos quedan en null y el peso se convierte a número', () => {
  const { req } = ejecutar(validarMascota, {
    body: { nombre: ' Luna ', tipo: 'perro', raza: '', peso: '24.5' },
  });
  assert.equal(req.body.nombre, 'Luna');
  assert.equal(req.body.raza, null);
  assert.equal(req.body.peso, 24.5);
});

test('mascota: no acepta una fecha de nacimiento futura', () => {
  const { error } = ejecutar(validarMascota, {
    body: { nombre: 'Luna', tipo: 'perro', fechaNacimiento: '2999-01-01' },
  });
  assert.match(error.message, /no puede ser futura/);
});

test('actividad: la hora tiene que tener el formato HH:MM', () => {
  const { error } = ejecutar(validarActividad, { body: { tipo: 'PASEO', hora: '25:00' } });
  assert.match(error.message, /HH:MM/);
});

test('actividad: acepta tipo y hora válidos', () => {
  const { req } = ejecutar(validarActividad, { body: { tipo: 'PASEO', hora: '18:30' } });
  assert.equal(req.body.hora, '18:30');
});

test('tarea: el estado solo puede ser PENDIENTE o HECHO', () => {
  assert.ok(ejecutar(validarEstadoTarea, { body: { estado: 'HECHO' } }).req);
  assert.equal(ejecutar(validarEstadoTarea, { body: { estado: 'LISTO' } }).error.status, 400);
});

test('evento futuro: la fecha tiene que ser futura', () => {
  const { error } = ejecutar(validarEventoFuturo, {
    body: { titulo: 'Control', tipoConsulta: 'CONTROL', fecha: '2020-01-01T10:00:00Z' },
  });
  assert.match(error.message, /tiene que ser futura/);
});

test('historial: "desde" no puede ser posterior a "hasta"', () => {
  const { error } = ejecutar(validarFiltrosHistorial, {
    query: { desde: '2026-11-10', hasta: '2026-11-01' },
  });
  assert.match(error.message, /no puede ser posterior/);
});

test('historial: acepta filtros válidos', () => {
  const { req } = ejecutar(validarFiltrosHistorial, {
    query: { categoria: 'cotidiano', tipo: 'PASEO' },
  });
  assert.deepEqual(req.filtros, { categoria: 'cotidiano', tipo: 'PASEO' });
});
