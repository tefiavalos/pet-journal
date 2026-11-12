import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import RutaProtegida from './RutaProtegida.jsx';
import RutaPublica from './RutaPublica.jsx';
import Inicio from '../pages/Inicio.jsx';
import Login from '../pages/Login.jsx';
import Registro from '../pages/Registro.jsx';
import MisMascotas from '../pages/MisMascotas.jsx';
import NuevaMascota from '../pages/NuevaMascota.jsx';
import EditarMascota from '../pages/EditarMascota.jsx';
import LayoutMascota from '../components/LayoutMascota.jsx';
import PerfilMascota from '../pages/PerfilMascota.jsx';
import HistorialMascota from '../pages/HistorialMascota.jsx';
import NuevoEventoVeterinario from '../pages/NuevoEventoVeterinario.jsx';
import ActividadesMascota from '../pages/ActividadesMascota.jsx';
import TareasMascota from '../pages/TareasMascota.jsx';
import VincularMascota from '../pages/VincularMascota.jsx';
import NoEncontrada from '../pages/NoEncontrada.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />

        <Route element={<RutaPublica />}>
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
        </Route>

        <Route element={<RutaProtegida />}>
          <Route path="mascotas" element={<MisMascotas />} />
          <Route path="mascotas/nueva" element={<NuevaMascota />} />
          <Route path="mascotas/vincular" element={<VincularMascota />} />
          <Route path="mascotas/:id" element={<LayoutMascota />}>
            <Route index element={<PerfilMascota />} />
            <Route path="tareas" element={<TareasMascota />} />
            <Route path="actividades" element={<ActividadesMascota />} />
            <Route path="historial" element={<HistorialMascota />} />
            <Route path="historial/nuevo" element={<NuevoEventoVeterinario />} />
          </Route>
          <Route path="mascotas/:id/editar" element={<EditarMascota />} />
        </Route>

        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
