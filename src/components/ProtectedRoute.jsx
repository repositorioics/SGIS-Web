import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, allowedPermissions }) => {
  const { isAuthenticated, roles, permissions } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const hasRolePermission = roles.some((role) => allowedRoles.includes(role));
  const hasSpecificPermission = permissions.some((perm) => allowedPermissions.includes(perm));

  if (!hasRolePermission || !hasSpecificPermission) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;