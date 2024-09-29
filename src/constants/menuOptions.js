import { faHome, faBox, faUser } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
  { icono: faHome, texto: "Inicio", path: "/" },
  {
    icono: faBox,
    texto: "Inventario",
    indice: 0,
    subMenu: [
      { path: "/bodegas", text: "Bodegas" },
      { path: "/categorias", text: "Categorías" },
      { path: "/distribuidores", text: "Distribuidores" },
      { path: "/donantes", text: "Donantes" },
      { path: "/estudios", text: "Estudios" },
      { path: "/insumos", text: "Insumos" },
      { path: "/inventarios", text: "Inventario" },
      { path: "/marcas", text: "Marcas" },
      { path: "/movimientos-inventario", text: "Movimientos de Inventario" },
      { path: "/presentaciones", text: "Presentaciones" },
      { path: "/sitios", text: "Sitios" },
      { path: "/unidades-medida", text: "Unidades de Medida" },
    ],
  },
  {
    icono: faBox,
    texto: "Solicitudes",
    indice: 1,
    subMenu: [
      { path: "/consolidar-solicitud", text: "Solicitud Inicial" },
      { path: "/gestion-autorizaciones", text: "Gestion Autorizaciones" },
      { path: "/consolidar-pedido", text: "Pedidos" },
    ],
  },
  {
    icono: faBox,
    texto: "Compras",
    indice: 2,
    subMenu: [
      { path: "/comprar", text: "Gestionar Comprar" },
      { path: "/entregar", text: "Gestionar Entregar" },
    ],
  },
  {
    icono: faBox,
    texto: "Entregas",
    indice: 3,
    subMenu: [
      { path: "/consolidar-entrega", text: "Entregas" },
      { path: "/crear-paleta", text: "Paletas" },
      { path: "/requisas", text: "Requisas" },
      { path: "/salida", text: "Acta de entregas" },
    ],
  },
  {
    icono: faUser,
    texto: "Configuraciones",
    indice: 4,
    subMenu: [
      { path: "/usuarios", text: "Gestión de Usuarios" }, // Administración de usuarios
      { path: "/roles", text: "Gestión de Roles" }, // Administración de roles
      { path: "/permisos", text: "Gestión de Permisos" }, // Administración de permisos
      // { path: '/departamentos', text: 'Gestión de Departamentos' },  // Si tu sistema tiene departamentos o áreas
      // { path: '/notificaciones', text: 'Gestión de Notificaciones' },  // Configuración y envío de notificaciones
      // { path: '/perfil', text: 'Configuración de Perfil' }, // Cambios de perfil, correo o datos personales
      // { path: '/cambiar-contrasena', text: 'Cambiar Contraseña' },  // Cambiar contraseña del administrador u otros usuarios
    ],
  },
];
