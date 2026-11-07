// Error con código HTTP, para que el middleware de errores responda con el status correcto
export class ErrorApp extends Error {
  constructor(status, mensaje) {
    super(mensaje);
    this.status = status;
  }
}
