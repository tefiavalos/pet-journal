import Usuario from '../models/Usuario.js';
import { ErrorApp } from '../utils/ErrorApp.js';
import { generarToken } from '../utils/jwt.js';

export async function registrar({ nombre, email, password, celular }) {
  const existe = await Usuario.exists({ email: email.toLowerCase().trim() });
  if (existe) {
    throw new ErrorApp(409, 'Ya existe una cuenta con ese email');
  }

  const usuario = await Usuario.create({ nombre, email, password, celular });
  const token = generarToken(usuario.id);

  return { token, usuario };
}

export async function login({ email, password }) {
  const usuario = await Usuario.findOne({ email: email.toLowerCase().trim() }).select('+password');

  const credencialesValidas = usuario && (await usuario.compararPassword(password));
  if (!credencialesValidas) {
    throw new ErrorApp(401, 'Email o contraseña incorrectos');
  }

  const token = generarToken(usuario.id);

  return { token, usuario };
}

export async function obtenerPorId(id) {
  const usuario = await Usuario.findById(id);
  if (!usuario) {
    throw new ErrorApp(401, 'El usuario ya no existe');
  }
  return usuario;
}
