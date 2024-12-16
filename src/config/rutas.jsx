import { lazy } from 'react';
import RutaProtegida from '@/components/RutaProtegida';  // Componente para protección de rutas

// Importación de páginas con React.lazy para carga diferida
const PaginaCorreo = lazy(() => import('@/containers/autenticacion/ContenedorCorreo'));
const PaginaLogin = lazy(() => import('@/containers/autenticacion/ContenedorLogin'));
const PaginaRestablecerContrasena = lazy(() => import('@/containers/autenticacion/ContenedorRestablecerContrasena'));
const ContenedorInicio = lazy(() => import('@/containers/ContenedorInicio'));

// Módulo de inventario
const ContenedorMarcas = lazy(() => import('@/containers/inventorio/ContenedorMarcas'));
const ContenedorFormularioMarca = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioMarca'));

const ContenedorDistribuidores = lazy(() => import('@/containers/inventorio/ContenedorDistribuidores'));
const ContenedorFormularioDistribuidor = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioDistribuidor'));

const ContenedorCategorias = lazy(() => import('@/containers/inventorio/ContenedorCategorias'));
const ContenedorFormularioCategoria = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioCategoria'));

const ContenedorInsumos = lazy(() => import('@/containers/inventorio/ContenedorInsumos'));
const PaginaFormularioInsumo = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioInsumo'));

const ContenedorMovimientosInventario = lazy(() => import('@/containers/inventorio/ContenedorMovimientosInventario'));

// Módulo de configuración
const ContenedorUsuarios = lazy(() => import('@/containers/configuracion/ContenedorUsuarios'));
const ContenedorFormularioUsuario = lazy(() => import('@/containers/configuracion/formularios/ContenedorFormularioUsuario'));

// Nuevos contenedores para los demás módulos
const ContenedorDonantes = lazy(() => import('@/containers/inventorio/ContenedorDonantes'));
const ContenedorFormularioDonante = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioDonante'));

const ContenedorEstudios = lazy(() => import('@/containers/inventorio/ContenedorEstudios'));
const ContenedorFormularioEstudio = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioEstudio'));

const ContenedorPresentaciones = lazy(() => import('@/containers/inventorio/ContenedorPresentaciones'));
const ContenedorFormularioPresentacion = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioPresentacion'));

const ContenedorSitios = lazy(() => import('@/containers/inventorio/ContenedorSitios'));
const ContenedorFormularioSitio = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioSitio'));

const ContenedorRoles = lazy(() => import('@/containers/configuracion/ContenedorRoles'));
const ContenedorFormularioRol = lazy(() => import('@/containers/configuracion/formularios/ContenedorFormularioRol'));

const ContenedorPermisos = lazy(() => import('@/containers/configuracion/ContenedorPermisos'));
const ContenedorFormularioPermiso = lazy(() => import('@/containers/configuracion/formularios/ContenedorFormularioPermiso'));

const ContenedorBodegas = lazy(() => import('@/containers/inventorio/ContenedorBodegas'));
const ContenedorFormularioBodega = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioBodega'));

const ContenedorUnidades = lazy(() => import('@/containers/inventorio/ContenedorUnidades'));
const ContenedorFormularioUnidad = lazy(() => import('@/containers/inventorio/formularios/ContenedorFormularioUnidad'));

// Módulo de solicitudes y pedidos
const ContenedorSolicitudes = lazy(() => import('@/containers/solicitudes/ContenedorSolicitudes'));
const ContenedorFormularioSolicitud = lazy(() => import('@/containers/solicitudes/formularios/ContenedorFormularioSolicitud'));
const ContenedorPedidos = lazy(() => import('@/containers/solicitudes/ContenedorPedidos'));
const ContenedorAutorizaciones = lazy(() => import('@/containers/solicitudes/ContenedorAutorizaciones'));
const ContenedorAutorizacionSolicitud = lazy(() => import('@/containers/solicitudes/formularios/ContenedorAutorizacionSolicitud'));
const ContenedorFormularioPedido = lazy(() => import('@/containers/solicitudes/formularios/ContenedorFormularioPedido'));

// Módulo de requisas y entregas
import ContenedorRequisas from '@/containers/requisas/ContenedorRequisas';
import ContenedorFormularioRequisa from '@/containers/requisas/formularios/ContenedorFormularioRequisa';
import ContenedorEntregasRequisas from '@/containers/requisas/ContenedorEntregasRequisas';
import ContenedorFormularioEntregaRequisa from '@/containers/requisas/formularios/ContenedorFormularioEntregaRequisa';
import ContenedorNotificaciones from '@/containers/configuracion/ContenedorNotificaciones';


import ContenedorAsignaciones from '@/containers/asignaciones/ContenedorAsignaciones';
import ContenedorFormularioAsignacion from '@/containers/asignaciones/ContenedorFormularioAsignacion';

import ContenedorFormularioVerRequisa from '@/containers/requisas/formularios/ContenedorFormularioVerRequisa';
// Página de error 404
import PaginaNoEncontrada from "@/pages/PaginaNoEncontrada";

const rutas = [
  // Rutas que NO necesitan autenticación
  { path: '/inicio-sesion', element: <PaginaLogin /> },
  { path: '/ingresar-email', element: <PaginaCorreo /> },
  { path: '/cambiar-contra', element: <PaginaRestablecerContrasena /> },
  { path: '*', element: <PaginaNoEncontrada /> }, // Ruta para manejar el 404

  // Rutas que necesitan autenticación
  { 
    path: '/', 
    element: <RutaProtegida><ContenedorInicio /></RutaProtegida> 
  },

  // Rutas del módulo de Inventario
  {
    path: '/inventario/marcas',
    element: <RutaProtegida><ContenedorMarcas /></RutaProtegida>,
  },
  {
    path: '/inventario/marca/crear',
    element: <RutaProtegida><ContenedorFormularioMarca /></RutaProtegida>,
  },
  {
    path: '/inventario/marca/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioMarca /></RutaProtegida>,
  },
  {
    path: '/inventario/distribuidores',
    element: <RutaProtegida><ContenedorDistribuidores /></RutaProtegida>,
  },
  {
    path: '/inventario/distribuidor/crear',
    element: <RutaProtegida><ContenedorFormularioDistribuidor /></RutaProtegida>,
  },
  {
    path: '/inventario/distribuidor/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioDistribuidor /></RutaProtegida>,
  },
  {
    path: '/inventario/categorias',
    element: <RutaProtegida><ContenedorCategorias /></RutaProtegida>,
  },
  {
    path: '/inventario/categoria/crear',
    element: <RutaProtegida><ContenedorFormularioCategoria /></RutaProtegida>,
  },
  {
    path: '/inventario/categoria/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioCategoria /></RutaProtegida>,
  },
  {
    path: '/inventario/insumos',
    element: <RutaProtegida><ContenedorInsumos /></RutaProtegida>,
  },
  {
    path: '/inventario/insumos/crear',
    element: <RutaProtegida><PaginaFormularioInsumo /></RutaProtegida>,
  },
  {
    path: '/inventario/insumos/actualizar/:id',
    element: <RutaProtegida><PaginaFormularioInsumo /></RutaProtegida>,
  },
  {
    path: '/inventario/movimientos-inventario',
    element: <RutaProtegida><ContenedorMovimientosInventario /></RutaProtegida>,
  },

  // Rutas del módulo de Configuraciones
  {
    path: '/configuraciones/usuarios',
    element: <RutaProtegida><ContenedorUsuarios /></RutaProtegida>,
  },
  {
    path: '/configuraciones/usuarios/crear',
    element: <RutaProtegida><ContenedorFormularioUsuario /></RutaProtegida>,
  },
  {
    path: '/configuraciones/usuarios/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioUsuario /></RutaProtegida>,
  },
  {
    path: '/configuraciones/roles',
    element: <RutaProtegida><ContenedorRoles /></RutaProtegida>,
  },
  {
    path: '/configuraciones/roles/crear',
    element: <RutaProtegida><ContenedorFormularioRol /></RutaProtegida>,
  },
  {
    path: '/configuraciones/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioRol /></RutaProtegida>,
  },
  {
    path: '/configuraciones/permisos',
    element: <RutaProtegida><ContenedorPermisos /></RutaProtegida>,
  },
  {
    path: '/configuraciones/permisos/crear',
    element: <RutaProtegida><ContenedorFormularioPermiso/></RutaProtegida>,
  },
  {
    path: '/configuraciones/permisos/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioPermiso/></RutaProtegida>,
  },

  // Rutas del módulo de Donantes, Sitios y Estudios
  {
    path: '/inventario/donantes',
    element: <RutaProtegida><ContenedorDonantes /></RutaProtegida>,
  },
  {
    path: '/inventario/donantes/crear',
    element: <RutaProtegida><ContenedorFormularioDonante /></RutaProtegida>,
  },
  {
    path: '/inventario/donante/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioDonante /></RutaProtegida>,
  },
  {
    path: '/inventario/sitios',
    element: <RutaProtegida><ContenedorSitios /></RutaProtegida>,
  },
  {
    path: '/inventario/sitios/crear',
    element: <RutaProtegida><ContenedorFormularioSitio /></RutaProtegida>,
  },
  {
    path: '/inventario/sitios/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioSitio /></RutaProtegida>,
  },
  {
    path: '/inventario/sitio/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioSitio /></RutaProtegida>,
  },
  {
    path: '/inventario/estudios',
    element: <RutaProtegida><ContenedorEstudios /></RutaProtegida>,
  },
  {
    path: '/inventario/estudio/crear',
    element: <RutaProtegida><ContenedorFormularioEstudio /></RutaProtegida>,
  },
  {
    path: '/inventario/estudio/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioEstudio /></RutaProtegida>,
  },
  
  // Rutas del módulo de Bodegas y Unidades de Medida
  {
    path: '/inventario/bodegas',
    element: <RutaProtegida><ContenedorBodegas /></RutaProtegida>,
  },
  {
    path: '/inventario/bodegas/crear',
    element: <RutaProtegida><ContenedorFormularioBodega /></RutaProtegida>,
  },
  {
    path: '/inventario/bodega/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioBodega /></RutaProtegida>,
  },
  {
    path: '/inventario/unidades',
    element: <RutaProtegida><ContenedorUnidades /></RutaProtegida>,
  },
  {
    path: '/inventario/unidades/crear',
    element: <RutaProtegida><ContenedorFormularioUnidad /></RutaProtegida>,
  },
  {
    path: '/inventario/unidad/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioUnidad /></RutaProtegida>,
  },
  {
    path: '/inventario/presentaciones',
    element: (
      <RutaProtegida>
        <ContenedorPresentaciones />
      </RutaProtegida>
    ),
  },
  {
    path: '/inventario/presentacion/crear',
    element: (
      <RutaProtegida>
        <ContenedorFormularioPresentacion />
      </RutaProtegida>
    ),
  },
  {
    path: '/inventario/presentacion/actualizar/:id',
    element: (
      <RutaProtegida>
        <ContenedorFormularioPresentacion />
      </RutaProtegida>
    ),
  },  

  // Rutas del módulo de Solicitudes
  {
    path: '/solicitudes/consolidar-solicitud',
    element: <RutaProtegida><ContenedorSolicitudes /></RutaProtegida>,
  },
  {
    path: '/solicitudes/solicitud/crear',
    element: <RutaProtegida><ContenedorFormularioSolicitud /></RutaProtegida>,
  },
  {
    path: '/solicitudes/solicitud/actualizar/:id',
    element: <RutaProtegida><ContenedorFormularioSolicitud /></RutaProtegida>,
  },
  {
    path: '/solicitudes/gestion-autorizaciones',
    element: <RutaProtegida><ContenedorAutorizaciones /></RutaProtegida>,
  },
  {
    path: '/solicitudes/gestion-autorizaciones/detalle/:id',
    element: <RutaProtegida><ContenedorAutorizacionSolicitud /></RutaProtegida>,
  },
  {
    path: '/solicitudes/consolidar-pedido',
    element: <RutaProtegida><ContenedorPedidos /></RutaProtegida>,
  },
  {
    path: '/solicitudes/pedidos/crear/:id',
    element: <RutaProtegida><ContenedorFormularioPedido /></RutaProtegida>,
  },
  {
    path: '/solicitudes/pedidos/vermas/:id',
    element: <RutaProtegida><ContenedorFormularioPedido /></RutaProtegida>,
  },

  // Rutas del módulo de Requisas y Entregas
  {
    path: '/requisas/requisas',
    element: <RutaProtegida><ContenedorRequisas /></RutaProtegida>,
  },
  {
    path: '/requisas/crear',
    element: <RutaProtegida><ContenedorFormularioRequisa /></RutaProtegida>,
  },
  {
    path: '/requisas/vermas/:id',
    element: <RutaProtegida><ContenedorFormularioVerRequisa /></RutaProtegida>,
  },
  {
    path: '/requisas/entregas',
    element: <RutaProtegida><ContenedorEntregasRequisas /></RutaProtegida>,
  },
  {
    path: '/requisas/entregas/crear/:id',
    element: <RutaProtegida><ContenedorFormularioEntregaRequisa /></RutaProtegida>,
  },{
    path: '/notificaciones',
    element: <RutaProtegida><ContenedorNotificaciones /></RutaProtegida>,
  },
  {
    path: '/asignaciones',
    element: <RutaProtegida><ContenedorAsignaciones /></RutaProtegida>,
  },
  {
    path: '/asignaciones/asignacion/crear',
    element: <RutaProtegida><ContenedorFormularioAsignacion /></RutaProtegida>,
  },
];

export default rutas;