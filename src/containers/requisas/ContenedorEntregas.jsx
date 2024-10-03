import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaEntregas from '@/pages/requisas/PaginaEntregas';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

const ContenedorEntregas = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API de entregas
  const { data, loading, error } = useFetch(
    `${URL}api/v1/entregas?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/requisas/entrega/crear');
  };

  const manejarActualizar = (entrega) => {
    if (entrega && entrega.id) {
      navigate(`/requisas/entrega/actualizar/${entrega.id}`);
    } else {
      toast.error('No se puede actualizar la entrega porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (entrega) => {
    toast.success(`Entrega del ID ${entrega.id} eliminada correctamente`);
    if (data) {
      const entregasFiltradas = data.data.filter(e => e.id !== entrega.id);
      // Aquí podrías actualizar el estado local si decides gestionar las entregas filtradas localmente.
    }
  };

  const columnas = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'fechaEntrega', headerName: 'Fecha de Entrega', flex: 2 },
    { field: 'recibidoPor', headerName: 'Recibido Por', flex: 2 },
    { field: 'detallesEntrega', headerName: 'Detalles de Entrega', flex: 3, renderCell: (params) => (
      params.value.map(detalle => (
        <div key={detalle.insumoId}>
          <strong>{detalle.insumoNombre}:</strong> {detalle.cantidadPresentacionEntregada} entregadas
        </div>
      ))
    ) },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaEntregas
        columnas={columnas}
        datos={data ? data.data : []}
        cargando={loading}
        error={error}
        manejarCrear={manejarCrear}
        totalPaginas={data ? data.totalPages : 1}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        pageSize={pageSize}
        setPageSize={setPageSize}
        manejarActualizar={manejarActualizar}
        manejarEliminar={manejarEliminar}
      />
    </>
  );
};

export default ContenedorEntregas;