import { Router } from 'express';
import { listarDeMascota, listarDelDia, cambiarEstado } from '../controllers/tareaController.js';
import { requiereAutenticacion } from '../middlewares/auth.js';
import { validarFechaConsulta, validarEstadoTarea } from '../middlewares/validaciones.js';

// /api/mascotas/:mascotaId/tareas?fecha=AAAA-MM-DD
export const tareasDeMascota = Router({ mergeParams: true });
tareasDeMascota.get('/', validarFechaConsulta, listarDeMascota);

// /api/tareas
const router = Router();
router.use(requiereAutenticacion);
router.get('/', validarFechaConsulta, listarDelDia);
router.patch('/:id/estado', validarEstadoTarea, cambiarEstado);

export default router;
