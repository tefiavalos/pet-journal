import { useAuth } from '../context/AuthContext.jsx';

function MisMascotas() {
  const { usuario } = useAuth();

  return (
    <section>
      <h1>Mis mascotas</h1>
      <p>Hola, {usuario.nombre}. Acá vas a ver las mascotas que tenés a cargo.</p>
    </section>
  );
}

export default MisMascotas;
