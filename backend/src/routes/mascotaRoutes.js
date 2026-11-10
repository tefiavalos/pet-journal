import { Router } from 'express';
import {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
  vincular,
} from '../controllers/mascotaController.js';
import { requiereAutenticacion } from '../middlewares/auth.js';
import { validarMascota, validarCodigoInvitacion } from '../middlewares/validaciones.js';
import eventoVeterinarioRoutes from './eventoVeterinarioRoutes.js';

const router = Router();

// Todas las rutas de mascotas requieren un usuario autenticado
router.use(requiereAutenticacion);

router.get('/', listar);
router.post('/', validarMascota, crear);
router.post('/vincular', validarCodigoInvitacion, vincular);
router.get('/:id', obtener);
router.put('/:id', validarMascota, actualizar);
router.delete('/:id', eliminar);

// Rutas de los registros de cada mascota
router.use('/:mascotaId/eventos-veterinarios', eventoVeterinarioRoutes);

export default router;
