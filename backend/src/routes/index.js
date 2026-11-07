import { Router } from 'express';
import { obtenerEstado } from '../controllers/healthController.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.get('/health', obtenerEstado);
router.use('/auth', authRoutes);

export default router;
