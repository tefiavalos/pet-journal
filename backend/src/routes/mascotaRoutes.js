import { Router } from 'express';
import { listar, obtener, crear, actualizar, eliminar } from '../controllers/mascotaController.js';
import { requiereAutenticacion } from '../middlewares/auth.js';
import { validarMascota } from '../middlewares/validaciones.js';

const router = Router();

// Todas las rutas de mascotas requieren un usuario autenticado
router.use(requiereAutenticacion);

router.get('/', listar);
router.post('/', validarMascota, crear);
router.get('/:id', obtener);
router.put('/:id', validarMascota, actualizar);
router.delete('/:id', eliminar);

export default router;
