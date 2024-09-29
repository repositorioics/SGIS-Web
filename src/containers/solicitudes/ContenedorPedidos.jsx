import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaPedidos from '@/pages/solicitudes/PaginaPedidos';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; // Constante de la URL
import useFetch from '@/hooks/useFetch'; // Importar el hook personalizado

const ContenedorPedidos = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null); // Pedido para mostrar en el modal
  const [modalAbierto, setModalAbierto] = useState(false); // Controlar si el modal está abierto
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/pedidos?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/pedidos/crear');
  };

  const manejarActualizar = (pedido) => {
    if (pedido && pedido.id) {
      navigate(`/pedidos/editar/${pedido.id}`);
    } else {
      toast.error('No se puede editar el pedido porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (pedido) => {
    toast.success(`Pedido ${pedido.codigoPedido} desactivado correctamente`);
    if (data) {
      const pedidosFiltrados = data.data.content.filter(p => p.id !== pedido.id);
      // Aquí podrías actualizar el estado local si decides gestionar los pedidos filtrados localmente.
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPedidoSeleccionado(null);
  };

  const columnas = [
    { field: 'codigoPedido', headerName: 'Código Pedido', flex: 2 },
    { field: 'numeroSolicitud', headerName: 'Número Solicitud', flex: 2 },
    { 
      field: 'autorizadoPor', 
      headerName: 'Autorizado Por', 
      flex: 2,
      renderCell: (params) => (
        `${params.value.nombre} ${params.value.apellido}`
      )
    },
    { 
      field: 'creadoPor', 
      headerName: 'Creado Por', 
      flex: 2,
      renderCell: (params) => (
        `${params.value.nombre} ${params.value.apellido}`
      )
    },
    { field: 'estado', headerName: 'Estado', flex: 1 },
    { field: 'fechaCreacion', headerName: 'Fecha de Creación', flex: 2, renderCell: (params) => (
      <span>{new Date(params.value).toLocaleDateString()}</span>
    ) },
    // {
    //   field: 'detalles', 
    //   headerName: 'Detalles de Insumos', 
    //   flex: 4,
    //   renderCell: (params) => (
    //     params.value.map(detalle => (
    //       <div key={detalle.id}>
    //         <strong>Insumo:</strong> {detalle.insumo.nombre}<br />
    //         <strong>Marca:</strong> {detalle.marca.nombre}<br />
    //         <strong>Distribuidor:</strong> {detalle.distribuidor.nombre}<br />
    //         <strong>Presentación:</strong> {detalle.presentacion.nombre}<br />
    //         <strong>Cantidad:</strong> {detalle.cantidadPresentaciones}<br />
    //         <strong>Clasificación:</strong> {detalle.clasificacion}<br />
    //         <strong>Estado:</strong> {detalle.estado}<br />
    //         <strong>Analista Solicitante:</strong> {detalle.analistaSolicitante}<br />
    //         <strong>Observación:</strong> {detalle.observacion}
    //       </div>
    //     ))
    //   )
    // },
    {
      field: 'acciones', 
      headerName: 'Acciones', 
      flex: 1, 
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => manejarActualizar(params.row)}>Editar</button>
          <button onClick={() => manejarEliminar(params.row)}>Eliminar</button>
        </>
      ),
    }
  ];

  return (
    <>
      <PaginaPedidos
        columnas={columnas}
        datos={data ? data.data.content : []}
        cargando={loading}
        error={error}
        manejarCrear={manejarCrear}
        totalPaginas={data ? data.data.totalPages : 1}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        pageSize={pageSize} // Pasar pageSize como prop
        setPageSize={setPageSize} // Permitir cambiar el tamaño de página
        manejarActualizar={manejarActualizar}
        manejarEliminar={manejarEliminar}
      />
    </>
  );
};

export default ContenedorPedidos;