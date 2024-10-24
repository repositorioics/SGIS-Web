import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaPresentaciones from '@/pages/inventario/PaginaPresentaciones';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

const ContenedorPresentaciones = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Hook personalizado para obtener los datos de las presentaciones
  const { data, loading, error } = useFetch(
    `${URL}api/v1/presentaciones?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/inventario/presentacion/crear');
  };

  const manejarActualizar = (presentacion) => {
    if (presentacion && presentacion.id) {
      navigate(`/inventario/presentacion/actualizar/${presentacion.id}`);
    } else {
      toast.error('No se puede actualizar la presentación porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (presentacion) => {
    toast.success(`Presentación ${presentacion.nombre} desactivada correctamente`);
    if (data) {
      const presentacionesFiltradas = data.data.content.filter(p => p.id !== presentacion.id);
      // Aquí podrías manejar la actualización de datos si es necesario
    }
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'descripcion', headerName: 'Descripción', flex: 3 },
    { field: 'unidadesPresentacion', headerName: 'Unidades por Presentación', flex: 2 },
    { field: 'activo', headerName: 'Estado', flex: 1 },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaPresentaciones
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

export default ContenedorPresentaciones;