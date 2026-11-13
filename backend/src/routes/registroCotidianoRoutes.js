import { Router } from 'express';
import { listar, crear } from '../controllers/registroCotidianoController.js';
import { validarRegistroCotidiano } from '../middlewares/validaciones.js';

// Se monta dentro de /api/mascotas/:mascotaId
const router = Router({ mergeParams: true });

router.get('/', listar);
router.post('/', validarRegistroCotidiano, crear);

export default router;
