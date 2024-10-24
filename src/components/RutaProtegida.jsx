import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  // Obtener el estado de autenticación desde Redux
  const isAuthenticated = useSelector((state) => state.autenticacion.isAuthenticated);

  if (!isAuthenticated) {
    // Si no está autenticado, redirigimos al inicio de sesión
    return <Navigate to="/inicio-sesion" replace />;
  }

  // Si está autenticado, renderizamos la ruta protegida
  return children;
};

export default RutaProtegida;