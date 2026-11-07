import { Router } from 'express';
import { registro, login, perfil } from '../controllers/authController.js';
import { requiereAutenticacion } from '../middlewares/auth.js';
import { validarRegistro, validarLogin } from '../middlewares/validaciones.js';

const router = Router();

router.post('/registro', validarRegistro, registro);
router.post('/login', validarLogin, login);
router.get('/perfil', requiereAutenticacion, perfil);

export default router;
