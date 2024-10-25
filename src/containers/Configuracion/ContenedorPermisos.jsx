import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaPermisos from '@/pages/configuracion/PaginaPermisos';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

/**
 * Controlar la lógica de la página de permisos, como la creación, actualización y desactivación.
 */
const ContenedorPermisos = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Obtener datos de permisos con paginación desde la API
  const { data, loading, error } = useFetch(
    `${URL}api/v1/permisos?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de un nuevo permiso.
   */
  const manejarCrear = () => {
    navigate('/permisos/crear');
  };

  /**
   * Navegar a la página de actualización de un permiso si tiene un ID válido.
   * @param {object} permiso - El permiso seleccionado para actualizar.
   */
  const manejarActualizar = (permiso) => {
    if (permiso && permiso.id) {
      navigate(`/permisos/actualizar/${permiso.id}`);
    } else {
      // Mostrar error si no hay un ID válido
      toast.error(t('paginaPermisos.errorActualizar'));
    }
  };

  /**
   * Desactivar un permiso seleccionado y mostrar un mensaje de éxito.
   * @param {object} permiso - El permiso seleccionado para desactivar.
   */
  const manejarEliminar = (permiso) => {
    toast.success(t('paginaPermisos.exitoDesactivar', { permiso: permiso.nombre }));
    if (data) {
      const permisosFiltrados = data.data.content.filter(p => p.id !== permiso.id);
    }
  };

  const columnas = [
    { field: 'nombre', headerName: t('paginaPermisos.columnaNombre'), flex: 2 },
    { field: 'descripcion', headerName: t('paginaPermisos.columnaDescripcion'), flex: 3 },
    { field: 'activo', headerName: t('paginaPermisos.columnaEstado'), flex: 1 },
    { field: 'acciones', headerName: t('paginaPermisos.columnaAcciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaPermisos
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

export default ContenedorPermisos;