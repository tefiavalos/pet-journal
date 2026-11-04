import mongoose from 'mongoose';

export function obtenerEstado(req, res) {
  const dbConectada = mongoose.connection.readyState === 1;

  res.json({
    estado: 'ok',
    baseDeDatos: dbConectada ? 'conectada' : 'desconectada',
  });
}
