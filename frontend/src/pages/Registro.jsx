import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { obtenerMensajeError } from '../services/api.js';
import Alerta from '../components/Alerta.jsx';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN = 8;

const FORM_INICIAL = {
  nombre: '',
  email: '',
  celular: '',
  password: '',
  confirmarPassword: '',
};

function validar(form) {
  if (!form.nombre.trim()) return 'El nombre es obligatorio';
  if (!EMAIL_REGEX.test(form.email.trim())) return 'El email no es válido';
  if (form.password.length < PASSWORD_MIN) {
    return `La contraseña debe tener al menos ${PASSWORD_MIN} caracteres`;
  }
  if (form.password !== form.confirmarPassword) return 'Las contraseñas no coinciden';
  return '';
}

function Registro() {
  const { registrarse } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(FORM_INICIAL);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errorValidacion = validar(form);
    setError(errorValidacion);
    if (errorValidacion) return;

    setEnviando(true);
    try {
      await registrarse({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        celular: form.celular.trim() || undefined,
        password: form.password,
      });
      navigate('/mascotas', { replace: true });
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="tarjeta tarjeta--angosta">
      <h1>Crear cuenta</h1>

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <Alerta>{error}</Alerta>

        <label className="campo">
          <span>Nombre</span>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} autoComplete="name" />
        </label>

        <label className="campo">
          <span>Email</span>
          <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" />
        </label>

        <label className="campo">
          <span>
            Celular <small>(opcional)</small>
          </span>
          <input type="tel" name="celular" value={form.celular} onChange={handleChange} autoComplete="tel" />
        </label>

        <label className="campo">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>

        <label className="campo">
          <span>Repetir contraseña</span>
          <input
            type="password"
            name="confirmarPassword"
            value={form.confirmarPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>

        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>

      <p className="texto-secundario">
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </section>
  );
}

export default Registro;
