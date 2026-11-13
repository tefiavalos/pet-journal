import RegistroCotidiano from '../models/RegistroCotidiano.js';
import { verificarAcceso } from './mascotaService.js';

export async function listarPorMascota(mascotaId, usuarioId) {
  await verificarAcceso(mascotaId, usuarioId);
  return RegistroCotidiano.find({ mascotaId }).sort({ fecha: -1, createdAt: -1 }).populate('registradoPor', 'nombre');
}

export async function crear(mascotaId, { tipo, fecha, peso, texto }, usuarioId) {
  const mascota = await verificarAcceso(mascotaId, usuarioId);

  const registro = await RegistroCotidiano.create({
    mascotaId,
    tipo,
    fecha,
    peso: tipo === 'PESO' ? peso : undefined,
    texto: texto || undefined,
    registradoPor: usuarioId,
  });

  // El perfil de la mascota muestra siempre el último peso registrado.
  // Si se carga un peso de una fecha anterior, el perfil no cambia.
  if (tipo === 'PESO') {
    const ultimo = await RegistroCotidiano.findOne({ mascotaId, tipo: 'PESO' }).sort({ fecha: -1, createdAt: -1 });
    if (ultimo && mascota.peso !== ultimo.peso) {
      mascota.peso = ultimo.peso;
      await mascota.save();
    }
  }

  await registro.populate('registradoPor', 'nombre');
  return registro;
}
