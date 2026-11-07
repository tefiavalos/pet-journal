import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generarToken(usuarioId) {
  return jwt.sign({ id: usuarioId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export function verificarToken(token) {
  return jwt.verify(token, env.jwtSecret);
}
