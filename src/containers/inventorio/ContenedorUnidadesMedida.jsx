import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaUnidadesMedida from '@/pages/inventario/PaginaUnidadesMedida';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

const ContenedorUnidadesMedida = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `${URL}api/v1/unidadesmedida?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const manejarCrear = () => {
    navigate('/unidades-medida/crear');
  };

  const manejarActualizar = (unidad) => {
    if (unidad && unidad.id) {
      navigate(`/unidades-medida/actualizar/${unidad.id}`);
    } else {
      toast.error('No se puede actualizar la unidad de medida porque no tiene un ID válido.');
    }
  };

  const manejarEliminar = (unidad) => {
    toast.success(`Unidad de medida ${unidad.nombre} desactivada correctamente`);
    if (data) {
      const unidadesFiltradas = data.data.content.filter(u => u.id !== unidad.id);
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
      <PaginaUnidadesMedida
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

export default ContenedorUnidadesMedida;