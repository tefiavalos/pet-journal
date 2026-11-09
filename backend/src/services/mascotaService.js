import mongoose from 'mongoose';
import Mascota from '../models/Mascota.js';
import { ErrorApp } from '../utils/ErrorApp.js';
import { generarCodigoInvitacion } from '../utils/codigoInvitacion.js';

const CAMPOS_EDITABLES = [
  'nombre',
  'tipo',
  'raza',
  'fechaNacimiento',
  'sexo',
  'peso',
  'foto',
  'condicionesMedicas',
];

const INTENTOS_CODIGO = 5;

function esResponsable(mascota, usuarioId) {
  return mascota.responsables.some((r) => r.usuarioId.equals(usuarioId));
}

// Control de acceso (RF13, RNF02): es el único lugar que decide si un usuario
// puede ver o modificar una mascota. Los demás módulos usan esta función.
export async function verificarAcceso(mascotaId, usuarioId) {
  if (!mongoose.isValidObjectId(mascotaId)) {
    throw new ErrorApp(404, 'Mascota no encontrada');
  }

  const mascota = await Mascota.findById(mascotaId);
  if (!mascota) {
    throw new ErrorApp(404, 'Mascota no encontrada');
  }

  if (!esResponsable(mascota, usuarioId)) {
    throw new ErrorApp(403, 'No tenés permiso para acceder a esta mascota');
  }

  return mascota;
}

export function listarPorUsuario(usuarioId) {
  return Mascota.find({ 'responsables.usuarioId': usuarioId }).sort({ nombre: 1 });
}

export async function obtenerDetalle(mascotaId, usuarioId) {
  const mascota = await verificarAcceso(mascotaId, usuarioId);
  await mascota.populate('responsables.usuarioId', 'nombre email');
  return mascota;
}

export async function crear(datos, usuarioId) {
  const campos = {};
  for (const campo of CAMPOS_EDITABLES) {
    if (datos[campo] !== undefined && datos[campo] !== null) {
      campos[campo] = datos[campo];
    }
  }

  // El código es único: si justo se repite, se genera otro
  for (let intento = 1; ; intento++) {
    try {
      return await Mascota.create({
        ...campos,
        codigoInvitacion: generarCodigoInvitacion(campos.nombre ?? ''),
        responsables: [{ usuarioId }],
      });
    } catch (error) {
      const codigoRepetido = error.code === 11000 && error.keyPattern?.codigoInvitacion;
      if (!codigoRepetido || intento >= INTENTOS_CODIGO) {
        throw error;
      }
    }
  }
}

export async function actualizar(mascotaId, datos, usuarioId) {
  const mascota = await verificarAcceso(mascotaId, usuarioId);

  for (const campo of CAMPOS_EDITABLES) {
    if (datos[campo] !== undefined) {
      // null significa que el campo se vació en el formulario
      mascota.set(campo, datos[campo] ?? undefined);
    }
  }

  await mascota.save();
  return mascota;
}

// Asociación de responsables (RF04): un usuario se suma a una mascota con su código
export async function vincularPorCodigo(codigoInvitacion, usuarioId) {
  const mascota = await Mascota.findOne({ codigoInvitacion: codigoInvitacion.trim().toUpperCase() });
  if (!mascota) {
    throw new ErrorApp(404, 'No hay ninguna mascota con ese código');
  }

  if (esResponsable(mascota, usuarioId)) {
    throw new ErrorApp(409, 'Ya sos responsable de esta mascota');
  }

  mascota.responsables.push({ usuarioId });
  await mascota.save();
  return mascota;
}

export async function eliminar(mascotaId, usuarioId) {
  const mascota = await verificarAcceso(mascotaId, usuarioId);
  await mascota.deleteOne();
}
