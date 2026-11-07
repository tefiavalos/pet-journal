import { ErrorApp } from '../utils/ErrorApp.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN = 8;

function textoValido(valor) {
  return typeof valor === 'string' && valor.trim() !== '';
}

function responderSiHayErrores(errores) {
  if (errores.length > 0) {
    throw new ErrorApp(400, errores.join('. '));
  }
}

export function validarRegistro(req, res, next) {
  const { nombre, email, password, celular } = req.body ?? {};
  const errores = [];

  if (!textoValido(nombre)) errores.push('El nombre es obligatorio');
  if (!textoValido(email) || !EMAIL_REGEX.test(email.trim())) errores.push('El email no es válido');
  if (typeof password !== 'string' || password.length < PASSWORD_MIN) {
    errores.push(`La contraseña debe tener al menos ${PASSWORD_MIN} caracteres`);
  }
  if (celular !== undefined && typeof celular !== 'string') errores.push('El celular no es válido');

  responderSiHayErrores(errores);
  next();
}

export function validarLogin(req, res, next) {
  const { email, password } = req.body ?? {};
  const errores = [];

  if (!textoValido(email)) errores.push('El email es obligatorio');
  if (!textoValido(password)) errores.push('La contraseña es obligatoria');

  responderSiHayErrores(errores);
  next();
}
