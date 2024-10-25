import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaPresentaciones from '@/pages/inventario/PaginaPresentaciones';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Controla la lógica de la página de presentaciones, incluyendo la creación, actualización y eliminación.
 */
const ContenedorPresentaciones = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Hook de traducción

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
      toast.error(t('contenedorPresentaciones.errorActualizar'));
    }
  };

  const manejarEliminar = (presentacion) => {
    toast.success(t('contenedorPresentaciones.presentacionEliminada', { nombre: presentacion.nombre }));
    if (data) {
    }
  };

  const columnas = [
    { field: 'nombre', headerName: t('contenedorPresentaciones.nombre'), flex: 2 },
    { field: 'descripcion', headerName: t('contenedorPresentaciones.descripcion'), flex: 3 },
    { field: 'unidadesPresentacion', headerName: t('contenedorPresentaciones.unidadesPresentacion'), flex: 2 },
    { field: 'activo', headerName: t('contenedorPresentaciones.estado'), flex: 1, renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorPresentaciones.activo') : t('contenedorPresentaciones.inactivo')}
        </span>
      ),
    },
    { field: 'acciones', headerName: t('contenedorPresentaciones.acciones'), flex: 1, sortable: false },
  ];

  return (
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
  );
};

export default ContenedorPresentaciones;