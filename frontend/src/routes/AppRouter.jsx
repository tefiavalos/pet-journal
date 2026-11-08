import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import RutaProtegida from './RutaProtegida.jsx';
import RutaPublica from './RutaPublica.jsx';
import Inicio from '../pages/Inicio.jsx';
import Login from '../pages/Login.jsx';
import Registro from '../pages/Registro.jsx';
import MisMascotas from '../pages/MisMascotas.jsx';
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
        </Route>

        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
