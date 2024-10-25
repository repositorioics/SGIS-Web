import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaMovimientosInventario from '@/pages/inventario/PaginaMovimientosInventario';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Controla la lógica de la página de movimientos de inventario, incluyendo la obtención de datos paginados.
 */
const ContenedorMovimientosInventario = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation(); // Usar hook de traducción

  // Hook personalizado para obtener los datos de los movimientos de inventario
  const { data, loading, error } = useFetch(
    `${URL}api/v1/movimientos-inventario?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const columnas = [
    { field: 'tipoMovimiento', headerName: t('movimientosInventario.tipoMovimiento'), flex: 2 },
    { field: 'insumoNombre', headerName: t('movimientosInventario.insumo'), flex: 2 },
    { field: 'presentacionNombre', headerName: t('movimientosInventario.presentacion'), flex: 2 },
    { field: 'cantidadPresentacion', headerName: t('movimientosInventario.cantidadPresentacion'), flex: 2 },
    { field: 'bodegaOrigenNombre', headerName: t('movimientosInventario.bodegaOrigen'), flex: 2 },
    { field: 'bodegaDestinoNombre', headerName: t('movimientosInventario.bodegaDestino'), flex: 2 },
    { field: 'fechaMovimiento', headerName: t('movimientosInventario.fechaMovimiento'), flex: 2 },
  ];

  return (
    <PaginaMovimientosInventario
      columnas={columnas}
      datos={data ? data.data.content : []}
      cargando={loading}
      error={error}
      totalPaginas={data ? data.data.totalPages : 1}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />
  );
};

export default ContenedorMovimientosInventario;