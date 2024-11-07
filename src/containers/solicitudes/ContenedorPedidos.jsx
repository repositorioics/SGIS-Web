import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaPedidos from '@/pages/solicitudes/PaginaPedidos';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

/**
 * Controlar la lógica de la página de pedidos, como la creación, actualización y desactivación.
 */
const ContenedorPedidos = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Obtener datos de pedidos desde la API con paginación
  const { data: pedidosData, loading: pedidosLoading, error: pedidosError } = useFetch(
    `${URL}api/v1/pedidos?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/pedidos/crear');
  };

  const manejarActualizar = (pedido) => {
    if (pedido && pedido.id) {
      navigate(`/pedidos/actualizar/${pedido.id}`);
    } else {
      toast.error(t('contenedorPedidos.errorActualizar'));
    }
  };

  const manejarEliminar = async (pedido) => {
    try {
      const response = await fetch(`${URL}api/v1/pedidos/${pedido.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success(t('contenedorPedidos.pedidoDesactivado', { codigo: pedido.codigoPedido }));
        navigate(0);
      } else {
        toast.error(t('contenedorPedidos.errorDesactivar'));
      }
    } catch (error) {
      toast.error(t('contenedorPedidos.errorDesactivar'));
    }
  };

  const columnas = [
    { field: 'codigoSolicitud', headerName: t('paginaPedidos.columnaCodigoSolicitud'), flex: 2 },
    { field: 'codigoPedido', headerName: t('paginaPedidos.columnaCodigoPedido'), flex: 2 },
    { field: 'nombreUsuario', headerName: t('paginaPedidos.columnaUsuarioCreador'), flex: 2 },
    { field: 'nombreDonante', headerName: t('paginaPedidos.columnaDonante'), flex: 2 },
    { field: 'estado', headerName: t('paginaPedidos.columnaEstado'), flex: 1 },
    {
      field: 'fechaCreacion',
      headerName: t('paginaPedidos.columnaFechaCreacion'),
      flex: 2,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleDateString()}</span>
      ),
    },
    {
      field: 'acciones',
      headerName: t('paginaPedidos.columnaAcciones'),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => manejarActualizar(params.row)}>{t('paginaPedidos.botonEditar')}</button>
          <button onClick={() => manejarEliminar(params.row)}>{t('paginaPedidos.botonEliminar')}</button>
        </>
      ),
    }
  ];

  return (
    <PaginaPedidos
      columnas={columnas}
      datos={pedidosData?.data?.content || []} // Usamos los datos directamente del response
      cargando={pedidosLoading}
      error={pedidosError}
      manejarCrear={manejarCrear}
      totalPaginas={pedidosData?.data?.totalPages || 1}
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