export function rutaNoEncontrada(req, res) {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

// Express reconoce el middleware de errores porque recibe 4 parámetros
export function manejarErrores(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ mensaje: 'El cuerpo de la petición no es un JSON válido' });
  }

  // Errores de validación de los esquemas de Mongoose
  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ mensaje: mensajes.join('. ') });
  }

  // Id con formato inválido (por ejemplo, /api/mascotas/123)
  if (err.name === 'CastError') {
    return res.status(400).json({ mensaje: 'El identificador no es válido' });
  }

  // Índice único repetido (email o código de invitación)
  if (err.code === 11000) {
    return res.status(409).json({ mensaje: 'Ya existe un registro con esos datos' });
  }

  const status = err.status || 500;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    mensaje: status === 500 ? 'Error interno del servidor' : err.message,
  });
}
