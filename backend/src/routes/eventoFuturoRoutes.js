import { Router } from 'express';
import {
  listar,
  crear,
  actualizar,
  cancelar,
  marcarRealizado,
  avisos,
} from '../controllers/eventoFuturoController.js';
import { requiereAutenticacion } from '../middlewares/auth.js';
import {
  validarEventoFuturo,
  validarRealizacion,
  validarFiltroEstadoEvento,
} from '../middlewares/validaciones.js';

// /api/mascotas/:mascotaId/eventos-futuros
export const eventosFuturosDeMascota = Router({ mergeParams: true });
eventosFuturosDeMascota.get('/', validarFiltroEstadoEvento, listar);
eventosFuturosDeMascota.post('/', validarEventoFuturo, crear);

// /api/eventos-futuros/:id
const router = Router();
router.use(requiereAutenticacion);
router.put('/:id', validarEventoFuturo, actualizar);
router.patch('/:id/cancelar', cancelar);
router.patch('/:id/realizar', validarRealizacion, marcarRealizado);

// /api/avisos
export const avisosRoutes = Router();
avisosRoutes.get('/', requiereAutenticacion, avisos);

export default router;
