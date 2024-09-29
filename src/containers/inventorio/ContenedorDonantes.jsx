import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaDonantes from '@/pages/inventario/PaginaDonantes';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

const ContenedorDonantes = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Hook para obtener datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/donantes?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/donantes/crear');
  };

  const manejarActualizar = (donante) => {
    if (donante && donante.id) {
      navigate(`/donantes/actualizar/${donante.id}`);
    } else {
      toast.error('No se puede actualizar el donante porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (donante) => {
    toast.success(`Donante ${donante.nombre} desactivado correctamente`);
    if (data) {
      const donantesFiltrados = data.data.content.filter(d => d.id !== donante.id);
    }
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'abreviatura', headerName: 'Abreviatura', flex: 1 },
    { field: 'direccion', headerName: 'Dirección', flex: 3 },
    { field: 'activo', headerName: 'Estado', flex: 1 },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaDonantes
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

export default ContenedorDonantes;