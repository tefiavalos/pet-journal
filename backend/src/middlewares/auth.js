import { verificarToken } from '../utils/jwt.js';
import { ErrorApp } from '../utils/ErrorApp.js';

// Protege los endpoints: solo deja pasar peticiones con un token válido
export function requiereAutenticacion(req, res, next) {
  const [tipo, token] = (req.headers.authorization || '').split(' ');

  if (tipo !== 'Bearer' || !token) {
    throw new ErrorApp(401, 'Tenés que iniciar sesión');
  }

  let payload;
  try {
    payload = verificarToken(token);
  } catch {
    throw new ErrorApp(401, 'La sesión expiró o no es válida');
  }

  req.usuarioId = payload.id;
  next();
}
