import { useNavigate } from 'react-router-dom';
import FormularioMascota from '../components/FormularioMascota.jsx';
import { crearMascota } from '../services/mascotaService.js';

function NuevaMascota() {
  const navigate = useNavigate();

  async function handleGuardar(datos) {
    await crearMascota(datos);
    navigate('/mascotas');
  }

  return (
    <section className="tarjeta tarjeta--media">
      <h1>Nueva mascota</h1>
      <FormularioMascota onGuardar={handleGuardar} textoBoton="Crear mascota" rutaCancelar="/mascotas" />
    </section>
  );
}

export default NuevaMascota;
