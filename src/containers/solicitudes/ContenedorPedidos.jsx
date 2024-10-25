import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaPedidos from '@/pages/solicitudes/PaginaPedidos';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado
import { useTranslation } from 'react-i18next';

/**
 * Controla la lógica de la página de pedidos, incluyendo la creación, actualización y eliminación de pedidos.
 */
const ContenedorPedidos = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null); // Pedido para mostrar en el modal
  const [modalAbierto, setModalAbierto] = useState(false); // Controlar si el modal está abierto
  const navigate = useNavigate();
  const { t } = useTranslation(); // Hook para traducciones

  // Usar el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/pedidos?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de un nuevo pedido.
   */
  const manejarCrear = () => {
    navigate('/pedidos/crear');
  };

  /**
   * Navegar a la página de actualización de un pedido si tiene un ID válido.
   * @param {object} pedido - El pedido seleccionado para actualizar.
   */
  const manejarActualizar = (pedido) => {
    if (pedido && pedido.id) {
      navigate(`/pedidos/editar/${pedido.id}`);
    } else {
      toast.error(t('contenedorPedidos.errorActualizar'));
    }
  };

  /**
   * Manejar la eliminación (desactivación) de un pedido seleccionado.
   * @param {object} pedido - El pedido seleccionado para eliminar.
   */
  const manejarEliminar = (pedido) => {
    toast.success(t('contenedorPedidos.pedidoEliminado', { codigo: pedido.codigoPedido }));
    if (data) {
      const pedidosFiltrados = data.data.content.filter(p => p.id !== pedido.id);
      // Aquí podrías actualizar el estado local si decides gestionar los pedidos filtrados localmente.
    }
  };

  // Cerrar el modal y limpiar la selección del pedido
  const cerrarModal = () => {
    setModalAbierto(false);
    setPedidoSeleccionado(null);
  };

  // Definir columnas de la tabla de pedidos
  const columnas = [
    { field: 'codigoPedido', headerName: t('contenedorPedidos.codigoPedido'), flex: 2 },
    { field: 'numeroSolicitud', headerName: t('contenedorPedidos.numeroSolicitud'), flex: 2 },
    { 
      field: 'autorizadoPor', 
      headerName: t('contenedorPedidos.autorizadoPor'), 
      flex: 2,
      renderCell: (params) => (
        `${params.value.nombre} ${params.value.apellido}`
      )
    },
    { 
      field: 'creadoPor', 
      headerName: t('contenedorPedidos.creadoPor'), 
      flex: 2,
      renderCell: (params) => (
        `${params.value.nombre} ${params.value.apellido}`
      )
    },
    { field: 'estado', headerName: t('contenedorPedidos.estado'), flex: 1 },
    { field: 'fechaCreacion', headerName: t('contenedorPedidos.fechaCreacion'), flex: 2, renderCell: (params) => (
      <span>{new Date(params.value).toLocaleDateString()}</span>
    ) },
    {
      field: 'acciones', 
      headerName: t('contenedorPedidos.acciones'), 
      flex: 1, 
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => manejarActualizar(params.row)}>{t('contenedorPedidos.botonEditar')}</button>
          <button onClick={() => manejarEliminar(params.row)}>{t('contenedorPedidos.botonEliminar')}</button>
        </>
      ),
    }
  ];

  return (
    <PaginaPedidos
      columnas={columnas}
      datos={data ? data.data.content : []}
      cargando={loading}
      error={error}
      manejarCrear={manejarCrear}
      totalPaginas={data ? data.data.totalPages : 1}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize}
      setPageSize={setPageSize}
      manejarActualizar={manejarActualizar}
      manejarEliminar={manejarEliminar}
    />
  );
};

export default ContenedorPedidos;