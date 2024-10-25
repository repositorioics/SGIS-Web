import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaUnidades from '@/pages/inventario/PaginaUnidades';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Controla la lógica de la página de unidades de medida, incluyendo la creación, actualización y eliminación.
 */
const ContenedorUnidades = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Hook de traducción

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
      navigate(`/inventario/unidad/actualizar/${unidad.id}`);
    } else {
      toast.error(t('contenedorUnidades.errorActualizar'));
    }
  };

  const manejarEliminar = (unidad) => {
    toast.success(t('contenedorUnidades.unidadEliminada', { nombre: unidad.nombre }));
    if (data) {
      const unidadesFiltradas = data.data.content.filter(u => u.id !== unidad.id);
      // Aquí podrías manejar la actualización de datos si es necesario
    }
  };

  const columnas = [
    { field: 'nombre', headerName: t('contenedorUnidades.nombre'), flex: 2 },
    { field: 'abreviatura', headerName: t('contenedorUnidades.abreviatura'), flex: 1 },
    { field: 'activo', headerName: t('contenedorUnidades.estado'), flex: 1, renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorUnidades.activo') : t('contenedorUnidades.inactivo')}
        </span>
      ),
    },
    { field: 'acciones', headerName: t('contenedorUnidades.acciones'), flex: 1, sortable: false },
  ];

  return (
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
  );
};

export default ContenedorUnidades;