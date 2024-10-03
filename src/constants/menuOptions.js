import { faHome, faBox, faUser } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
  { icono: faHome, texto: "Inicio", path: "/" },
  {
    icono: faBox,
    texto: "Inventario",
    indice: 0,
    subMenu: [
      { path: "/inventario/bodegas", text: "Bodegas" },
      { path: "/inventario/categorias", text: "Categorías" },
      { path: "/inventario/distribuidores", text: "Distribuidores" },
      { path: "/inventario/donantes", text: "Donantes" },
      { path: "/inventario/estudios", text: "Estudios" },
      { path: "/inventario/insumos", text: "Insumos" },
      { path: "/inventario/inventarios", text: "Inventario" },
      { path: "/inventario/marcas", text: "Marcas" },
      { path: "/inventario/movimientos-inventario", text: "Movimientos de Inventario" },
      { path: "/inventario/presentaciones", text: "Presentaciones" },
      { path: "/inventario/sitios", text: "Sitios" },
      { path: "/inventario/unidades", text: "Unidades de Medida" },
    ],
  },
  {
    icono: faBox,
    texto: "Solicitudes",
    indice: 1,
    subMenu: [
      { path: "/solicitudes/consolidar-solicitud", text: "Solicitud Inicial" },
      { path: "/solicitudes/gestion-autorizaciones", text: "Gestion Autorizaciones" },
      { path: "/solicitudes/consolidar-pedido", text: "Pedidos" },
    ],
  },
  {
    icono: faBox,
    texto: "Compras",
    indice: 2,
    subMenu: [
      { path: "/compras/comprar", text: "Gestionar Comprar" },
      { path: "/compras/entregar", text: "Gestionar Entregar" },
    ],
  },
  {
    icono: faBox,
    texto: "Requisas",
    indice: 3,
    subMenu: [
     // { path: "/requisas/crear-paleta", text: "Paletas" },
      { path: "/requisas/requisas", text: "Requisas" },
      { path: "/requisas/entregas", text: "Acta de entregas" },
    ],
  },
  {
    icono: faUser,
    texto: "Configuraciones",
    indice: 4,
    subMenu: [
      { path: "/configuraciones/usuarios", text: "Gestión de Usuarios" }, // Administración de usuarios
      { path: "/configuraciones/roles", text: "Gestión de Roles" }, // Administración de roles
      { path: "/configuraciones/permisos", text: "Gestión de Permisos" }, // Administración de permisos
      // { path: '/departamentos', text: 'Gestión de Departamentos' },  // Si tu sistema tiene departamentos o áreas
      // { path: '/notificaciones', text: 'Gestión de Notificaciones' },  // Configuración y envío de notificaciones
      // { path: '/perfil', text: 'Configuración de Perfil' }, // Cambios de perfil, correo o datos personales
      // { path: '/cambiar-contrasena', text: 'Cambiar Contraseña' },  // Cambiar contraseña del administrador u otros usuarios
    ],
  },
];
