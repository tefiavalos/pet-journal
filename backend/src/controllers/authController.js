import * as usuarioService from '../services/usuarioService.js';

export async function registro(req, res) {
  const resultado = await usuarioService.registrar(req.body);
  res.status(201).json(resultado);
}

export async function login(req, res) {
  const resultado = await usuarioService.login(req.body);
  res.json(resultado);
}
