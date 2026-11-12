import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generarCodigoInvitacion } from '../src/utils/codigoInvitacion.js';
import { parsearDia, sumarDias } from '../src/utils/fechas.js';
import { limiteDeAvisos, DIAS_AVISO } from '../src/utils/avisos.js';

test('el código de invitación tiene el formato NOMBRE-XXXX', () => {
  assert.match(generarCodigoInvitacion('Luna'), /^LUNA-[A-Z2-9]{4}$/);
});

test('el código de invitación ignora tildes y símbolos del nombre', () => {
  assert.match(generarCodigoInvitacion('Ñandú'), /^NAND-[A-Z2-9]{4}$/);
  assert.match(generarCodigoInvitacion('123'), /^PET-[A-Z2-9]{4}$/);
});

test('el código de invitación no usa caracteres que se confunden', () => {
  for (let i = 0; i < 200; i++) {
    const sufijo = generarCodigoInvitacion('Toby').split('-')[1];
    assert.doesNotMatch(sufijo, /[01OIL]/);
  }
});

test('parsearDia convierte AAAA-MM-DD en una fecha a las 00:00 UTC', () => {
  assert.equal(parsearDia('2026-11-03').toISOString(), '2026-11-03T00:00:00.000Z');
});

test('parsearDia rechaza fechas con formato inválido o que no existen', () => {
  assert.equal(parsearDia('03/11/2026'), null);
  assert.equal(parsearDia('2026-02-30'), null);
  assert.equal(parsearDia(undefined), null);
});

test('sumarDias suma días completos', () => {
  assert.equal(sumarDias(parsearDia('2026-12-31'), 1).toISOString(), '2027-01-01T00:00:00.000Z');
});

test('los avisos llegan hasta DIAS_AVISO días adelante', () => {
  const ahora = new Date('2026-11-03T12:00:00Z');
  const limite = limiteDeAvisos(ahora);
  const dias = (limite - ahora) / (24 * 60 * 60 * 1000);
  assert.equal(dias, DIAS_AVISO + 1);
});
