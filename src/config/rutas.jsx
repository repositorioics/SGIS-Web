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

const ContenedorUsuarios = lazy(() => import('@/containers/configuracion/ContenedorUsuarios'));
const ContenedorFormularioUsuario = lazy(() => import('@/containers/configuracion/formularios/ContenedorFormularioUsuario'));

const ContenedorInventario = lazy(() => import('@/containers/inventorio/ContenedorInventario'));

// Nuevos contenedores para los demás módulos
const ContenedorDonantes = lazy(() => import('@/containers/inventorio/ContenedorDonantes'));
const ContenedorFormularioDonante = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioDonante'));

const ContenedorEstudios = lazy(() => import('@/containers/inventorio/ContenedorEstudios'));
const ContenedorFormularioEstudio = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioEstudio'));

const ContenedorPresentaciones = lazy(() => import('@/containers/inventorio/ContenedorPresentaciones'));

const ContenedorSitios = lazy(() => import('@/containers/inventorio/ContenedorSitios'));
const ContenedorFormularioSitio = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioSitio'));

const ContenedorRoles = lazy(() => import('@/containers/Configuracion/ContenedorRoles'));
const ContenedorPermisos = lazy(() => import('@/containers/Configuracion/ContenedorPermisos'));
const ContenedorUnidadesMedida = lazy(() => import('@/containers/inventorio/ContenedorUnidadesMedida'));

const ContenedorBodegas = lazy(() => import('@/containers/inventorio/ContenedorBodegas'));
const ContenedorFormularioBodega = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioBodega'));

const ContenedorSolicitudes = lazy(() => import('@/containers/solicitudes/ContenedorSolicitudes'));
const ContenedorFormularioSolicitud = lazy(() => import('@/containers/solicitudes/formularios/ContenedorFormularioSolicitud'));
const ContenedorPedidos = lazy(() => import('@/containers/solicitudes/ContenedorPedidos'));
const ContenedorAutorizaciones = lazy(() => import('@/containers/solicitudes/ContenedorAutorizaciones'));

const rutas = [
  { path: '/inicio-sesion', element: <PaginaLogin /> },
  { path: '/ingresar-email', element: <PaginaCorreo /> },
  { path: '/cambiar-contra', element: <PaginaRestablecerContrasena /> },

  // Ruta de inicio
  { path: '/', element: <ContenedorInicio /> },

  // Inventario
  { path: '/marcas', element: <ContenedorMarcas /> },
  { path: '/marca/crear', element: <ContenedorFormularioMarca /> },
  { path: '/marca/actualizar/:id', element: <ContenedorFormularioMarca /> },

  { path: '/distribuidores', element: <ContenedorDistribuidores /> },
  { path: '/distribuidor/crear', element: <ContenedorFormularioDistribuidor /> },
  { path: '/distribuidor/actualizar/:id', element: <ContenedorFormularioDistribuidor /> },

  { path: '/categorias', element: <ContenedorCategorias /> },
  { path: '/categoria/crear', element: <ContenedorFormularioCategoria /> },
  { path: '/categoria/actualizar/:id', element: <ContenedorFormularioCategoria /> },

  { path: '/insumos', element: <ContenedorInsumos /> },
  { path: '/presentaciones', element: <ContenedorPresentaciones /> },
  { path: '/unidades-medida', element: <ContenedorUnidadesMedida /> },
  { path: '/bodegas', element: <ContenedorBodegas /> },
  { path: '/bodegas/crear', element: <ContenedorFormularioBodega /> },
  { path: '/bodegas/actualizar/:id', element: <ContenedorFormularioBodega /> },

  { path: '/inventarios', element: <ContenedorInventario /> },


  { path: '/consolidar-solicitud', element: <ContenedorSolicitudes /> },
  { path: '/solicitudes/crear', element: <ContenedorFormularioSolicitud /> },
  { path: '/gestion-autorizaciones', element: <ContenedorAutorizaciones /> },
  { path: '/consolidar-pedido', element: <ContenedorPedidos /> },

  // Gestión de usuarios y configuración
  { path: '/usuarios', element: <ContenedorUsuarios /> },
  { path: '/usuarios/crear', element: <ContenedorFormularioUsuario /> },
  { path: '/usuarios/actualizar/:id', element: <ContenedorFormularioUsuario /> },

  { path: '/roles', element: <ContenedorRoles /> },
  { path: '/permisos', element: <ContenedorPermisos /> },

  // Sitios y Donantes
  { path: '/donantes', element: <ContenedorDonantes /> },
  { path: '/donantes/crear', element: <ContenedorFormularioDonante /> },
  { path: '/donantes/actualizar/:id', element: <ContenedorFormularioDonante /> },

  { path: '/sitios', element: <ContenedorSitios /> },
  { path: '/sitios/crear', element: <ContenedorFormularioSitio /> },
  { path: '/sitios/actualizar/:id', element: <ContenedorFormularioSitio /> },

  // Estudios
  { path: '/estudios', element: <ContenedorEstudios /> },
  { path: '/estudios/crear', element: <ContenedorFormularioEstudio /> },
  { path: '/estudios/actualizar/:id', element: <ContenedorFormularioEstudio /> },

  // Otras rutas aquí...
];

export default rutas;