import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaEntregas from '@/pages/requisas/PaginaEntregas';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Importar traducción

/**
 * Controlar la lógica de la página de entregas, incluyendo la creación, actualización y eliminación.
 */
const ContenedorEntregas = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar hook de traducción

  // Obtener datos de entregas desde la API con paginación
  const { data, loading, error } = useFetch(
    `${URL}api/v1/entregas?page=${paginaActual}&size=${pageSize}`, 
    {}, 
    [paginaActual, pageSize]
  );

  /**
   * Navegar a la página de creación de una nueva entrega.
   */
  const manejarCrear = () => {
    navigate('/requisas/entrega/crear');
  };

  /**
   * Navegar a la página de actualización de una entrega si tiene un ID válido.
   * @param {object} entrega - La entrega seleccionada para actualizar.
   */
  const manejarActualizar = (entrega) => {
    if (entrega && entrega.id) {
      navigate(`/requisas/entrega/actualizar/${entrega.id}`);
    } else {
      // Mostrar mensaje de error si no hay un ID válido
      toast.error(t('contenedorEntregas.errorActualizar'));
    }
  };

  /**
   * Eliminar una entrega seleccionada y mostrar un mensaje de éxito.
   * @param {object} entrega - La entrega seleccionada para eliminar.
   */
  const manejarEliminar = (entrega) => {
    toast.success(t('contenedorEntregas.entregaEliminada', { id: entrega.id }));
    if (data) {
      const entregasFiltradas = data.data.filter(e => e.id !== entrega.id);
    }
  };

  // Definir las columnas de la tabla
  const columnas = [
    { field: 'id', headerName: t('paginaEntregas.columnaId'), flex: 1 },
    { field: 'fechaEntrega', headerName: t('paginaEntregas.columnaFechaEntrega'), flex: 2 },
    { field: 'recibidoPor', headerName: t('paginaEntregas.columnaRecibidoPor'), flex: 2 },
    { field: 'detallesEntrega', headerName: t('paginaEntregas.columnaDetallesEntrega'), flex: 3, renderCell: (params) => (
      params.value.map(detalle => (
        <div key={detalle.insumoId}>
          <strong>{detalle.insumoNombre}:</strong> {detalle.cantidadPresentacionEntregada} {t('paginaEntregas.entregadas')}
        </div>
      ))
    ) },
    { field: 'acciones', headerName: t('paginaEntregas.columnaAcciones'), flex: 1, sortable: false },
  ];

  return (
    <>
      <PaginaEntregas
        columnas={columnas}
        datos={data ? data.data : []}
        cargando={loading}
        error={error}
        manejarCrear={manejarCrear}
        totalPaginas={data ? data.totalPages : 1}
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

export default ContenedorEntregas;