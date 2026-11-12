import { Router } from 'express';
import { obtenerEstado } from '../controllers/healthController.js';
import authRoutes from './authRoutes.js';
import mascotaRoutes from './mascotaRoutes.js';
import actividadRoutes from './actividadRoutes.js';
import tareaRoutes from './tareaRoutes.js';
import eventoFuturoRoutes, { avisosRoutes } from './eventoFuturoRoutes.js';

const router = Router();

router.get('/health', obtenerEstado);
router.use('/auth', authRoutes);
router.use('/mascotas', mascotaRoutes);
router.use('/actividades', actividadRoutes);
router.use('/tareas', tareaRoutes);
router.use('/eventos-futuros', eventoFuturoRoutes);
router.use('/avisos', avisosRoutes);

export default router;
