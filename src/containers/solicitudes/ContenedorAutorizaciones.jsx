import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaAutorizaciones from '@/pages/solicitudes/PaginaAutorizaciones';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Controlar la lógica de la página de autorizaciones, incluyendo la autorización y el rechazo de solicitudes.
 */
const ContenedorAutorizaciones = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Obtener datos de solicitudes pendientes desde la API con paginación
  const { data, loading, error } = useFetch(
    `${URL}api/v1/solicitudes/pendientes?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Autorizar una solicitud seleccionada.
   * @param {object} solicitud - La solicitud que se desea autorizar.
   */
  const manejarAutorizar = async (solicitud) => {
    try {
      const response = await fetch(`${URL}api/v1/solicitudes/${solicitud.id}/autorizar`, {
        method: 'PUT',
      });
      if (response.ok) {
        toast.success(t('contenedorAutorizaciones.autorizacionExitosa', { numero: solicitud.numeroSolicitud }));
        navigate(0); // Refrescar la página después de autorizar
      } else {
        toast.error(t('contenedorAutorizaciones.errorAutorizar'));
      }
    } catch (error) {
      toast.error(t('contenedorAutorizaciones.errorAutorizar'));
    }
  };

  /**
   * Rechazar una solicitud seleccionada con una justificación.
   * @param {object} solicitud - La solicitud que se desea rechazar.
   * @param {string} justificacion - La justificación del rechazo.
   */
  const manejarRechazar = async (solicitud, justificacion) => {
    try {
      const response = await fetch(`${URL}api/v1/solicitudes/${solicitud.id}/rechazar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ justificacion }),
      });
      if (response.ok) {
        toast.success(t('contenedorAutorizaciones.rechazoExitoso', { numero: solicitud.numeroSolicitud }));
        navigate(0); // Refrescar la página después de rechazar
      } else {
        toast.error(t('contenedorAutorizaciones.errorRechazar'));
      }
    } catch (error) {
      toast.error(t('contenedorAutorizaciones.errorRechazar'));
    }
  };

  // Definir las columnas de la tabla
  const columnas = [
    { field: 'numeroSolicitud', headerName: t('paginaAutorizaciones.columnaNumeroSolicitud'), flex: 2 },
    { field: 'estado', headerName: t('paginaAutorizaciones.columnaEstado'), flex: 1 },
    { field: 'observaciones', headerName: t('paginaAutorizaciones.columnaObservaciones'), flex: 3 },
    { field: 'acciones', headerName: t('paginaAutorizaciones.columnaAcciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaAutorizaciones
      columnas={columnas}
      datos={data ? data.data.content : []}
      cargando={loading}
      error={error}
      totalPaginas={data ? data.data.totalPages : 1}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize}
      setPageSize={setPageSize}
      manejarAutorizar={manejarAutorizar}
      manejarRechazar={manejarRechazar}
    />
  );
};

export default ContenedorAutorizaciones;