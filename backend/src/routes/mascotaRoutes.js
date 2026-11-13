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
import historialRoutes from './historialRoutes.js';
import registroCotidianoRoutes from './registroCotidianoRoutes.js';
import { actividadesDeMascota } from './actividadRoutes.js';
import { tareasDeMascota } from './tareaRoutes.js';
import { eventosFuturosDeMascota } from './eventoFuturoRoutes.js';

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
router.use('/:mascotaId/historial', historialRoutes);
router.use('/:mascotaId/registros', registroCotidianoRoutes);
router.use('/:mascotaId/actividades', actividadesDeMascota);
router.use('/:mascotaId/tareas', tareasDeMascota);
router.use('/:mascotaId/eventos-futuros', eventosFuturosDeMascota);

export default router;
