import React, { Suspense } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisPrincipal from '@/layout/DisPrincipal';
import 'normalize.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cargador from '@/components/Cargador';
import rutas from '@/config/rutas.jsx';
import { cerrarSesion } from '@/context/slices/autenticacionSlice';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react'
import { useSelector } from 'react-redux';
import i18n from '@/config/i18n';  // Asegúrate de importar correctamente i18n

function App() {
  
  const dispatch = useDispatch();

  const language = useSelector((state) => state.idioma.language);

  useEffect(() => {
    i18n.changeLanguage(language);  // Cambia el idioma dinámicamente
  }, [language]);

  useEffect(() => {
    // Listener para limpiar el estado solo cuando el navegador se cierra o se cierra la pestaña
    const handleUnload = () => {
      dispatch(cerrarSesion()); // Acción que queremos ejecutar solo cuando se cierra el navegador
    };

    // Agregar el listener al evento unload (solo se ejecuta al cerrar el navegador o la pestaña)
    window.addEventListener('unload', handleUnload);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('unload', handleUnload); // Solo para limpiar el listener si el componente se desmonta
    };
  }, [dispatch]);
  
  const rutasSinLayout = [
    "/inicio-sesion",
    "/ingresar-email",
    "/cambiar-contra",
    "/activar-cuenta",
    "*",
  ];

  return (
    <Router>
      <Suspense fallback={<Cargador />}>
        <ToastContainer autoClose={2000} />
        <Routes>
          {rutas.map((ruta, index) => {
            const necesitaLayout = rutasSinLayout.includes(ruta.path);
            return (
              <Route
                key={index}
                path={ruta.path}
                element={necesitaLayout ? ruta.element : <DisPrincipal>{ruta.element}</DisPrincipal>}
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;