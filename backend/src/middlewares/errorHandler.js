export function rutaNoEncontrada(req, res) {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

// Express reconoce el middleware de errores porque recibe 4 parámetros
export function manejarErrores(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ mensaje: 'El cuerpo de la petición no es un JSON válido' });
  }

  const status = err.status || 500;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    mensaje: status === 500 ? 'Error interno del servidor' : err.message,
  });
}
