import { Router } from 'express';
import { obtenerEstado } from '../controllers/healthController.js';
import authRoutes from './authRoutes.js';
import mascotaRoutes from './mascotaRoutes.js';

const router = Router();

router.get('/health', obtenerEstado);
router.use('/auth', authRoutes);
router.use('/mascotas', mascotaRoutes);

export default router;
