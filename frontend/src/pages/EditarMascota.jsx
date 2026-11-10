import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioMascota from '../components/FormularioMascota.jsx';
import Alerta from '../components/Alerta.jsx';
import { obtenerMascota, actualizarMascota } from '../services/mascotaService.js';
import { obtenerMensajeError } from '../services/api.js';

// Pasa los datos que devuelve la API al formato que usan los inputs
function aValoresFormulario(mascota) {
  return {
    nombre: mascota.nombre,
    tipo: mascota.tipo,
    raza: mascota.raza ?? '',
    fechaNacimiento: mascota.fechaNacimiento ? mascota.fechaNacimiento.slice(0, 10) : '',
    sexo: mascota.sexo ?? '',
    peso: mascota.peso ?? '',
    foto: mascota.foto ?? '',
    condicionesMedicas: mascota.condicionesMedicas ?? '',
  };
}

function EditarMascota() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [valores, setValores] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerMascota(id)
      .then((mascota) => setValores(aValoresFormulario(mascota)))
      .catch((err) => setError(obtenerMensajeError(err)));
  }, [id]);

  async function handleGuardar(datos) {
    await actualizarMascota(id, datos);
    navigate('/mascotas');
  }

  return (
    <section className="tarjeta tarjeta--media">
      <h1>Editar mascota</h1>

      <Alerta>{error}</Alerta>
      {!valores && !error && <p className="texto-secundario">Cargando...</p>}

      {valores && (
        <FormularioMascota
          valoresIniciales={valores}
          onGuardar={handleGuardar}
          textoBoton="Guardar cambios"
          rutaCancelar="/mascotas"
        />
      )}
    </section>
  );
}

export default EditarMascota;
