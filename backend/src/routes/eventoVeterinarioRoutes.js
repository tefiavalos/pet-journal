import { Router } from 'express';
import { listar, crear } from '../controllers/eventoVeterinarioController.js';
import { validarEventoVeterinario } from '../middlewares/validaciones.js';

// Se monta dentro de /api/mascotas/:mascotaId, por eso usa mergeParams
const router = Router({ mergeParams: true });

router.get('/', listar);
router.post('/', validarEventoVeterinario, crear);

export default router;
