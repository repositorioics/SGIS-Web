import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaUnidades from '@/pages/inventario/PaginaUnidades';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

const ContenedorUnidades = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Hook personalizado para obtener los datos
  const { data, loading, error } = useFetch(
    `${URL}api/v1/unidadesmedida?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/inventario/unidades/crear');
  };

  const manejarActualizar = (unidad) => {
    if (unidad && unidad.id) {
      navigate(`/inventario/unidades/actualizar/${unidad.id}`);
    } else {
      toast.error('No se puede actualizar la unidad porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (unidad) => {
    toast.success(`Unidad ${unidad.nombre} desactivada correctamente`);
    if (data) {
      const unidadesFiltradas = data.data.content.filter(u => u.id !== unidad.id);
      // Aquí podrías manejar la actualización de datos si es necesario
    }
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 2 },
    { field: 'abreviatura', headerName: 'Abreviatura', flex: 1 },
    { field: 'activo', headerName: 'Estado', flex: 1 },
    { field: 'acciones', headerName: 'Acciones', flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaUnidades
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

export default ContenedorUnidades;