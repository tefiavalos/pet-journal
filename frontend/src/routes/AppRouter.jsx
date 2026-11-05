import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Inicio from '../pages/Inicio.jsx';
import NoEncontrada from '../pages/NoEncontrada.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
