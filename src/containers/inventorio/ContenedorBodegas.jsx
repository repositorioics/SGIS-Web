import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaBodegas from '@/pages/inventario/PaginaBodegas';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; 
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

/**
 * Controla la lógica de la página de bodegas, incluyendo la creación, actualización y eliminación de bodegas.
 */
const ContenedorBodegas = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Estado para manejar el tamaño de la página
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Usar el hook personalizado useFetch para obtener los datos de la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/bodegas?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de una nueva bodega.
   */
  const manejarCrear = () => {
    navigate('/inventario/bodegas/crear');
  };

  /**
   * Navegar a la página de actualización de una bodega si tiene un ID válido.
   * @param {object} bodega - La bodega seleccionada para actualizar.
   */
  const manejarActualizar = (bodega) => {
    if (bodega && bodega.id) {
      navigate(`/inventario/bodega/actualizar/${bodega.id}`);
    } else {
      toast.error(t('contenedorBodegas.errorActualizar'));
    }
  };

  /**
   * Manejar la eliminación (desactivación) de una bodega seleccionada.
   * @param {object} bodega - La bodega seleccionada para eliminar.
   */
  const manejarEliminar = (bodega) => {
    toast.success(t('contenedorBodegas.bodegaEliminada', { nombre: bodega.nombre }));
  };

  // Definir columnas de la tabla de bodegas
  const columnas = [
    { field: 'nombre', headerName: t('contenedorBodegas.nombre'), flex: 2 },
    { field: 'descripcion', headerName: t('contenedorBodegas.descripcion'), flex: 3 },
    { field: 'direccion', headerName: t('contenedorBodegas.direccion'), flex: 2 },
    { 
      field: 'Insitución', 
      headerName: t('contenedorBodegas.institucion'), 
      flex: 3, 
      renderCell: (params) => (
        <span>
          {params.row.sitioId ? `${params.row.sitioNombre}` : `${params.row.donanteNombre}`}
        </span>
      ),
    },
    { 
      field: 'activo', 
      headerName: t('contenedorBodegas.estado'), 
      flex: 1, 
      renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorBodegas.activo') : t('contenedorBodegas.inactivo')}
        </span>
      ),
    },
    { field: 'acciones', headerName: t('contenedorBodegas.acciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaBodegas
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

export default ContenedorBodegas;