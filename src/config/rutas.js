// src/config/rutas.js
import { lazy } from 'react';

// Importaciones de páginas y componentes usando React.lazy
const PaginaPrincipal = lazy(() => import('@/pages/Autenticacion/PaginaInicio'));
const PaginaLogin = lazy(() => import('@/pages/Autenticacion/PaginaLogin'));
const PaginaRestablecerContrasena = lazy(() => import('@/pages/Autenticacion/PaginaRestablecerContrasena'));
const PaginaOTP = lazy(() => import('@/pages/Autenticacion/PaginaOTP'));
const PaginaEmail = lazy(() => import('@/pages/Autenticacion/PaginaEmail'));

const Insumos = lazy(() => import('@/components/inventario/Insumo'));
const ContenedorInsumo = lazy(() => import('@/containers/inventario/insumo/ContenedorInsumo'));

const Marca = lazy(() => import('@/pages/inventario/Marca'));
const ContenedorMarca = lazy(() => import('@/containers/inventario/marca/ContenedorMarca'));

const Categoria = lazy(() => import('@/pages/inventario/Categoria'));
const ContenedorCategoria = lazy(() => import('@/containers/inventario/categoria/ContenedorCategoria'));

const Proveedores = lazy(() => import('@/components/inventario/Proveedores'));
const ContenedorProveedor = lazy(() => import('@/containers/inventario/proveedor/ContenedorProveedor'));

const ConsolidarSolicitud = lazy(() => import('@/components/request/ConsolidarSolicitud'));

const rutas = [
  { path: '/', element: <PaginaPrincipal /> },
  { path: '/inicio-sesion', element: <PaginaLogin /> },
  { path: '/ingresar-email', element: <PaginaEmail /> },
  { path: '/otp', element: <PaginaOTP /> },
  { path: '/cambiar-contra', element: <PaginaRestablecerContrasena /> },
  { path: '/insumos', element: <Insumos /> },
  { path: '/insumo/crear', element: <ContenedorInsumo /> },
  { path: '/insumo/editar/:id?', element: <ContenedorInsumo /> },
  { path: '/marcas', element: <Marca /> },
  { path: '/marca/crear', element: <ContenedorMarca /> },
  { path: '/marca/editar/:id', element: <ContenedorMarca /> },
  { path: '/categorias', element: <Categoria /> },
  { path: '/categoria/crear', element: <ContenedorCategoria /> },
  { path: '/categoria/editar/:id?', element: <ContenedorCategoria /> },
  { path: '/proveedores', element: <Proveedores /> },
  { path: '/proveedor/crear', element: <ContenedorProveedor /> },
  { path: '/proveedor/editar/:id?', element: <ContenedorProveedor /> },
  { path: '/consolidar-solicitud', element: <ConsolidarSolicitud /> },
];

export default rutas;