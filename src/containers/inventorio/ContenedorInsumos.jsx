import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaInsumos from '@/pages/inventario/PaginaInsumos';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

/**
 * Controla la lógica de la página de insumos, incluyendo la creación, actualización y eliminación de insumos.
 */
const ContenedorInsumos = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Fetch de los datos de insumos
  const { data, loading, error } = useFetch(
    `${URL}api/v1/insumos?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  // Función para manejar la creación de insumos
  const manejarCrear = () => {
    navigate('/inventario/insumos/crear');
  };

  // Función para manejar la actualización de un insumo
  const manejarActualizar = (insumo) => {
    if (insumo && insumo.id) {
      navigate(`/inventario/insumos/actualizar/${insumo.id}`);
    } else {
      toast.error(t('contenedorInsumos.errorActualizar'));
    }
  };

  // Función para manejar la eliminación de un insumo
  const manejarEliminar = (insumo) => {
    if (insumo && insumo.nombre) {
      toast.success(t('contenedorInsumos.insumoEliminado', { nombre: insumo.nombre }));
    } else {
      toast.error(t('contenedorInsumos.errorEliminar'));
    }
  };

  // Definición de las columnas de la tabla
  const columnas = [
    { field: 'nombre', headerName: t('contenedorInsumos.nombre'), flex: 2 },
    { field: 'categoriaNombre', headerName: t('contenedorInsumos.categoria'), flex: 2 },
    { field: 'unidadMedidaNombre', headerName: t('contenedorInsumos.unidadMedida'), flex: 2 },
    { 
      field: 'activo', 
      headerName: t('contenedorInsumos.estado'), 
      flex: 1, 
      renderCell: (params) => (
        <span className={`estado-label ${params.value ? 'activo' : 'inactivo'}`}>
          {params.value ? t('contenedorInsumos.activo') : t('contenedorInsumos.inactivo')}
        </span>
      ),
    },
    { 
      field: 'acciones', 
      headerName: t('contenedorInsumos.acciones'), 
      flex: 1, 
      sortable: false, 
      renderCell: (params) => (
        <>
          <button onClick={() => manejarActualizar(params.row)}>{t('contenedorInsumos.actualizar')}</button>
          <button onClick={() => manejarEliminar(params.row)}>{t('contenedorInsumos.eliminar')}</button>
        </>
      ),
    },
  ];

  // Transformación de los datos obtenidos
  const datosValidos = data?.data?.content.map((insumo) => ({
    id: insumo.id,
    nombre: insumo.nombre,
    descripcion: insumo.descripcion,
    categoriaNombre: insumo.categoria?.nombre || 'N/A',
    unidadMedidaNombre: insumo.unidadMedida?.nombre || 'N/A', // Añadir nombre de unidad de medida
    activo: insumo.activo
  })) || [];

  return (
    <PaginaInsumos
      columnas={columnas}
      datos={datosValidos}
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

export default ContenedorInsumos;