import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaAsignaciones from '@/pages/asignaciones/PaginaAsignaciones';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url'; 
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

/**
 * Controlador de lógica para la gestión de asignaciones.
 */
const ContenedorAsignaciones = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Obtener datos de asignaciones desde la API con paginación
  const { data, loading, error } = useFetch(
    `${URL}api/v1/asignaciones?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  // Log the fetched data when it changes
  useEffect(() => {
    if (data) {
      console.log('Datos obtenidos:', data);
    }
  }, [data]);

  /**
   * Navegar a la página de creación de una nueva asignación.
   */
  const manejarCrear = () => {
    navigate('/asignaciones/asignacion/crear');
  };

  /**
   * Navegar a la página de detalle de una asignación.
   * @param {object} asignacion - Asignación seleccionada.
   */
  const manejarVerMas = (asignacion) => {
    navigate(`/asignaciones/asignacion/${asignacion.id}`);
};

  // Definir columnas para la tabla
  const columnas = [
    { field: 'numeroAsignacion', headerName: t('paginaAsignaciones.columnaNumeroAsignacion'), flex: 2 },
    { field: 'bioanalistaNombre', headerName: t('paginaAsignaciones.columnaBioanalista'), flex: 2 },
    { field: 'responsableAsignacionNombre', headerName: t('paginaAsignaciones.columnaResponsable'), flex: 2 },
    { field: 'estadoNombre', headerName: t('paginaAsignaciones.columnaEstado'), flex: 1 },
    { field: 'observaciones', headerName: t('paginaAsignaciones.columnaObservaciones'), flex: 3 },
    {
      field: 'fechaEntrega',
      headerName: t('paginaAsignaciones.columnaFechaEntrega'),
      flex: 2,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleDateString()}</span>
      ),
    },
    {
      field: 'acciones',
      headerName: t('paginaAsignaciones.columnaAcciones'),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <button onClick={() => manejarVerMas(params.row)}>
                    <FaEye style={{ marginRight: '5px' }} /> {t('paginaPedidos.botonVerMas')}</button>
      ),
    },
  ];

  return (
    <PaginaAsignaciones
      columnas={columnas}
      datos={data ? data.data.content : []}
      cargando={loading}
      error={error}
      manejarCrear={manejarCrear}
      totalPaginas={data ? data.data.totalPages : 1}
      paginaActual={paginaActual}
      manejarVerMas={manejarVerMas}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />
  );
};

export default ContenedorAsignaciones;