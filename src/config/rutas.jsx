import { lazy } from 'react';

// Importaciones de páginas usando React.lazy
const PaginaCorreo = lazy(() => import('@/pages/autentication/PaginaCorreo'));
const PaginaLogin = lazy(() => import('@/pages/autentication/PaginaLogin'));
//const PaginaOTP = lazy(() => import('@/pages/autentication/PaginaOTP'));
const PaginaRestablecerContrasena = lazy(() => import('@/pages/autentication/PaginaRestablecerContrasena'));

const rutas = [
  { path: '/inicio-sesion', element: <PaginaLogin /> },
  { path: '/ingresar-email', element: <PaginaCorreo /> },
  //{ path: '/otp', element: <PaginaOTP /> },
  { path: '/cambiar-contra', element: <PaginaRestablecerContrasena /> },
  // Otras rutas pueden ir aquí...
];

export default rutas;