import { faHome, faBox, faUser } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
  { icono: faHome, texto: "Inicio", indice: 0, path: "/" },
  {
    icono: faBox,
    texto: "Inventario",
    indice: 1,
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
    indice: 2,
    subMenu: [
      { path: "/solicitudes/consolidar-solicitud", text: "Solicitud Inicial" },
      { path: "/solicitudes/gestion-autorizaciones", text: "Gestion Autorizaciones" },
      { path: "/solicitudes/consolidar-pedido", text: "Pedidos" },
    ],
  },
  {
    icono: faBox,
    texto: "Compras",
    indice: 3,
    subMenu: [
      { path: "/compras/comprar", text: "Gestionar Comprar" },
      { path: "/compras/entregar", text: "Gestionar Entregar" },
    ],
  },
  {
    icono: faBox,
    texto: "Requisas",
    indice: 4,
    subMenu: [
     // { path: "/requisas/crear-paleta", text: "Paletas" },
      { path: "/requisas/requisas", text: "Requisas" },
      { path: "/requisas/entregas", text: "Acta de entregas" },
    ],
  },
  {
    icono: faUser,
    texto: "Configuraciones",
    indice: 5,
    subMenu: [
      { path: "/configuraciones/usuarios", text: "Gestión de Usuarios" }, // Administración de usuarios
      { path: "/configuraciones/roles", text: "Gestión de Roles" }, // Administración de roles
      { path: "/configuraciones/permisos", text: "Gestión de Permisos" }, // Administración de permisos
    ],
  },
];
