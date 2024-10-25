import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaRequisas from '@/pages/requisas/PaginaRequisas';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Controlar la lógica de la página de requisas, incluyendo la creación, actualización y eliminación.
 */
const ContenedorRequisas = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Obtener datos de requisas desde la API con paginación
  const { data, loading, error } = useFetch(
    `${URL}api/v1/requisas?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de una nueva requisa.
   */
  const manejarCrear = () => {
    navigate('/requisas/crear');
  };

  /**
   * Navegar a la página de actualización de una requisa si tiene un ID válido.
   * @param {object} requisa - La requisa seleccionada para actualizar.
   */
  const manejarActualizar = (requisa) => {
    if (requisa && requisa.id) {
      navigate(`/requisas/actualizar/${requisa.id}`);
    } else {
      // Mostrar mensaje de error si no hay un ID válido
      toast.error(t('contenedorRequisas.errorActualizar'));
    }
  };

  /**
   * Eliminar una requisa seleccionada y mostrar un mensaje de éxito.
   * @param {object} requisa - La requisa seleccionada para eliminar.
   */
  const manejarEliminar = (requisa) => {
    toast.success(t('contenedorRequisas.requisaEliminada', { codigo: requisa.codigoUnico }));
    if (data) {
      const requisasFiltradas = data.data.content.filter(r => r.id !== requisa.id);
    }
  };

  // Definir las columnas de la tabla
  const columnas = [
    { field: 'codigoUnico', headerName: t('paginaRequisas.columnaCodigoUnico'), flex: 2 },
    { field: 'estado', headerName: t('paginaRequisas.columnaEstado'), flex: 1 },
    { field: 'observaciones', headerName: t('paginaRequisas.columnaObservaciones'), flex: 3 },
    { field: 'fechaCreacion', headerName: t('paginaRequisas.columnaFechaCreacion'), flex: 2 },
    { field: 'acciones', headerName: t('paginaRequisas.columnaAcciones'), flex: 1, sortable: false },
  ];

  return (
    <PaginaRequisas
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

export default ContenedorRequisas;