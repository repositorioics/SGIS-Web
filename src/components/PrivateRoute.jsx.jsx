// src/components/PrivateRoute.jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { obtenerUsuarioActual } from '@/utils/tokenUtils';

const PrivateRoute = ({ component: Component, rolesPermitidos, ...rest }) => {
  const currentUser = obtenerUsuarioActual();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          // Si el usuario no está autenticado, redirige al login
          return <Redirect to="/login" />;
        }

        // Verifica si el usuario tiene los roles permitidos
        if (rolesPermitidos && !rolesPermitidos.includes(currentUser.roles)) {
          return <Redirect to="/unauthorized" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;