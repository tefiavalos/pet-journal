import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { obtenerMensajeError } from '../services/api.js';
import Alerta from '../components/Alerta.jsx';

function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Si llegó desde una ruta protegida, después del login vuelve ahí
  const destino = location.state?.desde?.pathname || '/hoy';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Completá el email y la contraseña');
      return;
    }

    setEnviando(true);
    try {
      await iniciarSesion(form.email, form.password);
      navigate(destino, { replace: true });
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="tarjeta tarjeta--angosta">
      <h1>Iniciar sesión</h1>

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <Alerta>{error}</Alerta>

        <label className="campo">
          <span>Email</span>
          <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" />
        </label>

        <label className="campo">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </label>

        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p className="texto-secundario">
        ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </section>
  );
}

export default Login;
