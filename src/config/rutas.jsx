import { lazy } from 'react';

// Importaciones de páginas usando React.lazy
const PaginaCorreo = lazy(() => import('@/containers/autenticacion/ContenedorCorreo'));
const PaginaLogin = lazy(() => import('@/containers/autenticacion/ContenedorLogin'));
const PaginaRestablecerContrasena = lazy(() => import('@/containers/autenticacion/ContenedorRestablecerContrasena'));
const ContenedorInicio = lazy(() => import('@/containers/ContenedorInicio'));

const ContenedorMarcas = lazy(() => import('@/containers/inventorio/ContenedorMarcas'));
const ContenedorFormularioMarca = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioMarca'));

const ContenedorDistribuidores = lazy(() => import('@/containers/inventorio/ContenedorDistribuidores'));
const ContenedorFormularioDistribuidor = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioDistribuidor'));


const ContenedorCategorias = lazy(() => import('@/containers/inventorio/ContenedorCategorias'));
const ContenedorFormularioCategoria = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioCategoria'));

const ContenedorInsumos = lazy(() => import('@/containers/inventorio/ContenedorInsumos'));
const PaginaFormularioInsumo = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioInsumo'));

const ContenedorMovimientosInventario = lazy(() => import('@/containers/inventorio/ContenedorMovimientosInventario'));

const ContenedorUsuarios = lazy(() => import('@/containers/configuracion/ContenedorUsuarios'));
const ContenedorFormularioUsuario = lazy(() => import('@/containers/configuracion/formularios/ContenedorFormularioUsuario'));

const ContenedorInventario = lazy(() => import('@/containers/inventorio/ContenedorInventario'));

// Nuevos contenedores para los demás módulos
const ContenedorDonantes = lazy(() => import('@/containers/inventorio/ContenedorDonantes'));
const ContenedorFormularioDonante = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioDonante'));

const ContenedorEstudios = lazy(() => import('@/containers/inventorio/ContenedorEstudios'));
const ContenedorFormularioEstudio = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioEstudio'));

const ContenedorPresentaciones = lazy(() => import('@/containers/inventorio/ContenedorPresentaciones'));
const ContenedorFormularioPresentacion = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioPresentacion'));

const ContenedorSitios = lazy(() => import('@/containers/inventorio/ContenedorSitios'));
const ContenedorFormularioSitio = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioSitio'));

const ContenedorRoles = lazy(() => import('@/containers/Configuracion/ContenedorRoles'));
const ContenedorPermisos = lazy(() => import('@/containers/Configuracion/ContenedorPermisos'));

const ContenedorBodegas = lazy(() => import('@/containers/inventorio/ContenedorBodegas'));
const ContenedorFormularioBodega = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioBodega'));

const ContenedorUnidades = lazy(() => import('@/containers/inventorio/ContenedorUnidades'));
const ContenedorFormularioUnidad = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioUnidad'));

const ContenedorSolicitudes = lazy(() => import('@/containers/solicitudes/ContenedorSolicitudes'));
const ContenedorFormularioSolicitud = lazy(() => import('@/containers/solicitudes/formularios/ContenedorFormularioSolicitud'));
const ContenedorPedidos = lazy(() => import('@/containers/solicitudes/ContenedorPedidos'));
const ContenedorAutorizaciones = lazy(() => import('@/containers/solicitudes/ContenedorAutorizaciones'));

import ContenedorRequisas from '@/containers/requisas/ContenedorRequisas';
import ContenedorFormularioRequisa from '@/containers/requisas/formularios/ContenedorFormularioRequisa';
import ContenedorEntregas from '@/containers/requisas/ContenedorEntregas';
import ContenedorFormularioEntrega from '@/containers/requisas/formularios/ContenedorFormularioEntrega';

const rutas = [
  { path: '/inicio-sesion', element: <PaginaLogin /> },
  { path: '/ingresar-email', element: <PaginaCorreo /> },
  { path: '/cambiar-contra', element: <PaginaRestablecerContrasena /> },

  // Ruta de inicio
  { path: '/', element: <ContenedorInicio /> },

  // Inventario
  { path: '/inventario/marcas', element: <ContenedorMarcas /> },
  { path: '/inventario/marca/crear', element: <ContenedorFormularioMarca /> },
  { path: '/inventario/marca/actualizar/:id', element: <ContenedorFormularioMarca /> },

  { path: '/inventario/distribuidores', element: <ContenedorDistribuidores /> },
  { path: '/inventario/distribuidor/crear', element: <ContenedorFormularioDistribuidor /> },
  { path: '/inventario/distribuidor/actualizar/:id', element: <ContenedorFormularioDistribuidor /> },

  { path: '/inventario/categorias', element: <ContenedorCategorias /> },
  { path: '/inventario/categoria/crear', element: <ContenedorFormularioCategoria /> },
  { path: '/inventario/categoria/actualizar/:id', element: <ContenedorFormularioCategoria /> },

  { path: '/inventario/insumos', element: <ContenedorInsumos /> },
  { path: '/inventario/insumos/crear', element: <PaginaFormularioInsumo /> },
  { path: '/inventario/insumos/actualizar/:id', element: <PaginaFormularioInsumo /> },

  { path: '/inventario/movimientos-inventario', element: <ContenedorMovimientosInventario /> },

  { path: '/inventario/presentaciones', element: <ContenedorPresentaciones /> },
  { path: '/inventario/presentaciones/crear', element: <ContenedorFormularioPresentacion /> },
  { path: '/inventario/presentaciones/actualizar/:id', element: <ContenedorFormularioPresentacion /> },

  { path: '/inventario/bodegas', element: <ContenedorBodegas /> },
  { path: '/inventario/bodegas/crear', element: <ContenedorFormularioBodega /> },
  { path: '/inventario/bodegas/actualizar/:id', element: <ContenedorFormularioBodega /> },

  { path: '/inventario/inventarios', element: <ContenedorInventario /> },

  { path: '/solicitudes/consolidar-solicitud', element: <ContenedorSolicitudes /> },
  { path: '/solicitudes/solicitudes/crear', element: <ContenedorFormularioSolicitud /> },
  { path: '/solicitudes/gestion-autorizaciones', element: <ContenedorAutorizaciones /> },
  { path: '/solicitudes/consolidar-pedido', element: <ContenedorPedidos /> },

  // Gestión de usuarios y configuración
  { path: '/configuraciones/usuarios', element: <ContenedorUsuarios /> },
  { path: '/configuraciones/usuarios/crear', element: <ContenedorFormularioUsuario /> },
  { path: '/configuraciones/usuarios/actualizar/:id', element: <ContenedorFormularioUsuario /> },

  { path: '/configuraciones/roles', element: <ContenedorRoles /> },
  { path: '/configuraciones/permisos', element: <ContenedorPermisos /> },

  // Sitios y Donantes
  { path: '/inventario/donantes', element: <ContenedorDonantes /> },
  { path: '/inventario/donantes/crear', element: <ContenedorFormularioDonante /> },
  { path: '/inventario/donantes/actualizar/:id', element: <ContenedorFormularioDonante /> },

  { path: '/inventario/sitios', element: <ContenedorSitios /> },
  { path: '/inventario/sitios/crear', element: <ContenedorFormularioSitio /> },
  { path: '/inventario/sitios/actualizar/:id', element: <ContenedorFormularioSitio /> },

  { path: '/inventario/unidades', element: <ContenedorUnidades /> },
  { path: '/inventario/unidades/crear', element: <ContenedorFormularioUnidad /> },
  { path: '/inventario/unidades/actualizar/:id', element: <ContenedorFormularioUnidad /> },

  // Estudios
  { path: '/inventario/estudios', element: <ContenedorEstudios /> },
  { path: '/inventario/estudios/crear', element: <ContenedorFormularioEstudio /> },
  { path: '/inventario/estudios/actualizar/:id', element: <ContenedorFormularioEstudio /> },

  {path:"/requisas/requisas", element:<ContenedorRequisas />},
  {path:"/requisas/crear", element:<ContenedorFormularioRequisa />},
  {path:"/requisas/actualizar/:id", element:<ContenedorFormularioRequisa />},
  {path:"/requisas/:id", element:<ContenedorFormularioRequisa />},

  {path:"/requisas/entregas", element:<ContenedorEntregas />},
  {path:"/entregas/crear", element:<ContenedorFormularioEntrega />},
  {path:"/entregas/actualizar/:id", element:<ContenedorFormularioEntrega />},
  // Otras rutas aquí...
];

export default rutas;