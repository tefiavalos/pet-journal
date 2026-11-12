import { useNavigate, useOutletContext } from 'react-router-dom';
import FormularioEventoFuturo from '../components/FormularioEventoFuturo.jsx';
import { crearEventoFuturo } from '../services/eventoFuturoService.js';

function NuevoEventoFuturo() {
  const { mascota } = useOutletContext();
  const navigate = useNavigate();
  const ruta = `/mascotas/${mascota._id}/eventos`;

  async function handleGuardar(datos) {
    await crearEventoFuturo(mascota._id, datos);
    navigate(ruta, { replace: true });
  }

  return (
    <div className="tarjeta tarjeta--media seccion-mascota">
      <h2>Nuevo turno</h2>
      <FormularioEventoFuturo onGuardar={handleGuardar} textoBoton="Guardar turno" rutaCancelar={ruta} />
    </div>
  );
}

export default NuevoEventoFuturo;
