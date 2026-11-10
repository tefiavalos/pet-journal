import { ErrorApp } from '../utils/ErrorApp.js';
import { TIPOS_MASCOTA, SEXOS_MASCOTA } from '../models/Mascota.js';
import { TIPOS_CONSULTA } from '../models/EventoVeterinario.js';
import { parsearDia, hoy } from '../utils/fechas.js';
import { CATEGORIAS_HISTORIAL } from '../utils/historial.js';

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

export function validarCodigoInvitacion(req, res, next) {
  const { codigoInvitacion } = req.body ?? {};

  if (!textoValido(codigoInvitacion)) {
    throw new ErrorApp(400, 'El código de invitación es obligatorio');
  }

  next();
}

// Los campos opcionales que llegan vacíos se convierten en null
function vacio(valor) {
  return valor === undefined || valor === null || (typeof valor === 'string' && valor.trim() === '');
}

function textoOpcional(valor) {
  return vacio(valor) ? null : String(valor).trim();
}

export function validarMascota(req, res, next) {
  const datos = req.body ?? {};
  const errores = [];

  const mascota = {
    nombre: textoOpcional(datos.nombre),
    tipo: textoOpcional(datos.tipo),
    raza: textoOpcional(datos.raza),
    sexo: textoOpcional(datos.sexo),
    foto: textoOpcional(datos.foto),
    condicionesMedicas: textoOpcional(datos.condicionesMedicas),
    peso: null,
    fechaNacimiento: null,
  };

  if (!mascota.nombre) errores.push('El nombre es obligatorio');
  if (!TIPOS_MASCOTA.includes(mascota.tipo)) errores.push('El tipo de mascota no es válido');
  if (mascota.sexo && !SEXOS_MASCOTA.includes(mascota.sexo)) errores.push('El sexo no es válido');

  if (mascota.foto && !/^https?:\/\//.test(mascota.foto)) {
    errores.push('La foto tiene que ser una URL que empiece con http:// o https://');
  }

  if (!vacio(datos.peso)) {
    const peso = Number(datos.peso);
    if (!Number.isFinite(peso) || peso < 0) {
      errores.push('El peso tiene que ser un número mayor o igual a 0');
    } else {
      mascota.peso = peso;
    }
  }

  if (!vacio(datos.fechaNacimiento)) {
    const fecha = new Date(datos.fechaNacimiento);
    if (Number.isNaN(fecha.getTime())) {
      errores.push('La fecha de nacimiento no es válida');
    } else if (fecha > new Date()) {
      errores.push('La fecha de nacimiento no puede ser futura');
    } else {
      mascota.fechaNacimiento = fecha;
    }
  }

  responderSiHayErrores(errores);
  req.body = mascota;
  next();
}

export function validarEventoVeterinario(req, res, next) {
  const datos = req.body ?? {};
  const errores = [];

  const evento = {
    titulo: textoOpcional(datos.titulo),
    tipoConsulta: textoOpcional(datos.tipoConsulta),
    descripcion: textoOpcional(datos.descripcion),
    fecha: parsearDia(hoy()),
  };

  if (!evento.titulo) errores.push('El título es obligatorio');
  if (!TIPOS_CONSULTA.includes(evento.tipoConsulta)) errores.push('El tipo de consulta no es válido');

  // La fecha es opcional: si no viene, se toma la de hoy
  if (!vacio(datos.fecha)) {
    const fecha = parsearDia(datos.fecha);
    if (!fecha) {
      errores.push('La fecha no es válida');
    } else if (fecha > parsearDia(hoy())) {
      errores.push('La fecha no puede ser futura: para eso están los eventos futuros');
    } else {
      evento.fecha = fecha;
    }
  }

  responderSiHayErrores(errores);
  req.body = evento;
  next();
}

// Filtros opcionales del historial: ?categoria=&tipo=&desde=AAAA-MM-DD&hasta=AAAA-MM-DD
export function validarFiltrosHistorial(req, res, next) {
  const { categoria, tipo, desde, hasta } = req.query;
  const errores = [];
  const filtros = {};

  if (!vacio(categoria)) {
    if (!CATEGORIAS_HISTORIAL.includes(categoria)) errores.push('La categoría no es válida');
    else filtros.categoria = categoria;
  }

  if (!vacio(tipo)) {
    if (!TIPOS_CONSULTA.includes(tipo)) errores.push('El tipo no es válido');
    else filtros.tipo = tipo;
  }

  for (const [nombre, valor] of [['desde', desde], ['hasta', hasta]]) {
    if (vacio(valor)) continue;
    const fecha = parsearDia(valor);
    if (!fecha) errores.push(`La fecha "${nombre}" no es válida`);
    else filtros[nombre] = fecha;
  }

  if (filtros.desde && filtros.hasta && filtros.desde > filtros.hasta) {
    errores.push('La fecha "desde" no puede ser posterior a "hasta"');
  }

  responderSiHayErrores(errores);
  // req.query no se puede reemplazar en Express 5, por eso los filtros van en req.filtros
  req.filtros = filtros;
  next();
}
