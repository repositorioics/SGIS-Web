import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaRequisas from '@/pages/requisas/PaginaRequisas';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

const ContenedorRequisas = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Usamos el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/requisas?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/requisas/crear');
  };

  const manejarActualizar = (requisa) => {
    if (requisa && requisa.id) {
      navigate(`/requisas/actualizar/${requisa.id}`);
    } else {
      toast.error('No se puede actualizar la requisa porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (requisa) => {
    toast.success(`Requisa ${requisa.codigoUnico} eliminada correctamente`);
    if (data) {
      const requisasFiltradas = data.data.content.filter(r => r.id !== requisa.id);
      // Aquí podrías actualizar el estado local si decides gestionar las requisas filtradas localmente.
    }
  };

  const columnas = [
    { field: 'codigoUnico', headerName: 'Código Único', flex: 2 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
    { field: 'observaciones', headerName: 'Observaciones', flex: 3 },
    { field: 'fechaCreacion', headerName: 'Fecha de Creación', flex: 2 },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaRequisas
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
    </>
  );
};

export default ContenedorRequisas;