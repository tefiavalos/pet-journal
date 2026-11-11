import { Router } from 'express';
import { listar, crear, actualizar, eliminar } from '../controllers/actividadController.js';
import { requiereAutenticacion } from '../middlewares/auth.js';
import { validarActividad } from '../middlewares/validaciones.js';

// /api/mascotas/:mascotaId/actividades
export const actividadesDeMascota = Router({ mergeParams: true });
actividadesDeMascota.get('/', listar);
actividadesDeMascota.post('/', validarActividad, crear);

// /api/actividades/:id
const router = Router();
router.use(requiereAutenticacion);
router.put('/:id', validarActividad, actualizar);
router.delete('/:id', eliminar);

export default router;
