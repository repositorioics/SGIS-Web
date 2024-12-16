import React, { useState } from 'react';
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

  /**
   * Navegar a la página de creación de una nueva asignación.
   */
  const manejarCrear = () => {
    navigate('/asignaciones/asignacion/crear');
  };

  /**
   * Navegar a la página de actualización de una asignación.
   * @param {object} asignacion - Asignación seleccionada.
   */
  const manejarActualizar = (asignacion) => {
    if (asignacion && asignacion.id) {
      navigate(`/asignaciones/asignacion/actualizar/${asignacion.id}`);
    } else {
      toast.error(t('contenedorAsignaciones.errorActualizar'));
    }
  };

  /**
   * Desactivar una asignación seleccionada.
   * @param {object} asignacion - Asignación seleccionada.
   */
  const manejarEliminar = async (asignacion) => {
    try {
      const response = await fetch(`${URL}api/v1/asignaciones/${asignacion.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success(t('contenedorAsignaciones.asignacionDesactivada', { numero: asignacion.numeroAsignacion }));
        navigate(0); // Refrescar página
      } else {
        toast.error(t('contenedorAsignaciones.errorDesactivar'));
      }
    } catch (error) {
      toast.error(t('contenedorAsignaciones.errorDesactivar'));
    }
  };

  // Definir columnas para la tabla
  const columnas = [
    { field: 'numeroAsignacion', headerName: t('paginaAsignaciones.columnaNumeroAsignacion'), flex: 2 },
    { field: 'estado', headerName: t('paginaAsignaciones.columnaEstado'), flex: 1 },
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
        <>
          <button onClick={() => manejarActualizar(params.row)}>{t('paginaAsignaciones.botonEditar')}</button>
          <button onClick={() => manejarEliminar(params.row)}>{t('paginaAsignaciones.botonEliminar')}</button>
        </>
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
      setPaginaActual={setPaginaActual}
      pageSize={pageSize}
      setPageSize={setPageSize}
      manejarActualizar={manejarActualizar}
      manejarEliminar={manejarEliminar}
    />
  );
};

export default ContenedorAsignaciones;