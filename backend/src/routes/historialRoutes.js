import { Router } from 'express';
import { obtener } from '../controllers/historialController.js';
import { validarFiltrosHistorial } from '../middlewares/validaciones.js';

const router = Router({ mergeParams: true });

router.get('/', validarFiltrosHistorial, obtener);

export default router;
