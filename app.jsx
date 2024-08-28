import React, { Suspense } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisPrincipal from '@/layout/DisPrincipal';
import 'normalize.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cargador from '@/components/Cargador';
import rutas from '@/config/rutas.jsx';

function App() {
  const rutasConLayout = ['/inicio', '/supplies', '/supply/create', '/supply/edit/:id?']; // Define aquí las rutas que necesitan el layout

  return (
    <Router>
      <Suspense fallback={<Cargador />}>
        <ToastContainer autoClose={2500} />
        <Routes>
          {rutas.map((ruta, index) => {
            const necesitaLayout = rutasConLayout.includes(ruta.path);
            return (
              <Route
                key={index}
                path={ruta.path}
                element={necesitaLayout ? <DisPrincipal>{ruta.element}</DisPrincipal> : ruta.element}
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;