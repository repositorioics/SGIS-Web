import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaPedidos from '@/pages/solicitudes/PaginaPedidos';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';
import { FaEye } from 'react-icons/fa';

const ContenedorPedidos = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: pedidosData, loading: pedidosLoading, error: pedidosError } = useFetch(
    `${URL}api/v1/pedidos?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const manejarVerMas = (pedido) => {

    if (pedido && pedido.id) {
      navigate(`/solicitudes/pedidos/vermas/${pedido.id}`);
    } else {
      toast.error(t('contenedorPedidos.errorVerMas'));
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
      renderCell: (params) => <span>{new Date(params.value).toLocaleDateString()}</span>,
    },
    {
      field: 'acciones',
      headerName: t('paginaPedidos.columnaAcciones'),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <button onClick={() => manejarVerMas(params.row)}>
          <FaEye style={{ marginRight: '5px' }} />
          {t('paginaPedidos.botonVerMas')}
        </button>
      ),
    },
  ];

  return (
    <PaginaPedidos
      columnas={columnas}
      datos={pedidosData?.data?.content || []}
      cargando={pedidosLoading}
      error={pedidosError}
      manejarVerMas={manejarVerMas} // Se pasa manejarVerMas
      totalPaginas={pedidosData?.data?.totalPages || 1}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />
  );
};

export default ContenedorPedidos;