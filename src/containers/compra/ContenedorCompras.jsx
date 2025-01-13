import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaCompras from '@/pages/compras/PaginaCompras';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

const ContenedorCompras = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Obtener datos de compras desde la API con paginación
  const { data, loading, error } = useFetch(
    `${URL}api/v1/compras?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  useEffect(() => {
    if (data) {
      console.log('Datos obtenidos:', data);
    }
  }, [data]);

  /**
   * Navegar a la página de creación de una nueva compra.
   */
  const manejarCrear = () => {
    navigate('/compras/crear');
  };
  /**
   * Navegar a la página de detalle de una compra.
   * @param {object} compra - Compra seleccionada.
   */
  const manejarVerMas = (compra) => {
    navigate(`/compras/compra/${compra.id}`);
  };

  // Definir columnas para la tabla de compras
  const columnas = [
    { field: 'codigoCompra', headerName: t('paginaCompras.columnaCodigoCompra'), flex: 1.5 },
    // { field: 'codigoPedido', headerName: t('paginaCompras.columnaCodigoPedido'), flex: 1.5 },
    { field: 'totalNeto', headerName: t('paginaCompras.columnaTotalNeto'), flex: 1 },
    { field: 'observaciones', headerName: t('paginaCompras.columnaObservaciones'), flex: 3 },
    { field: 'estado', headerName: t('paginaCompras.columnaEstado'), flex:1 },
    {
      field: 'fechaCompra',
      headerName: t('paginaCompras.columnaFechaCompra'),
      flex: 2,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleDateString()}</span>
      ),
    },
    {
      field: 'acciones',
      headerName: t('paginaCompras.columnaAcciones'),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <button onClick={() => manejarVerMas(params.row)}>
          {t('paginaCompras.botonVerMas')}
        </button>
      ),
    },
  ];

  return (
    <PaginaCompras
      columnas={columnas}
      datos={data ? data.data.content : []}
      cargando={loading}
      error={error}
      manejarCrear={manejarCrear}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      totalPaginas={data ? data.data.totalPages : 1}
      pageSize={pageSize}
      setPageSize={setPageSize}
      manejarVerMas={manejarVerMas}
    />
  );
};

export default ContenedorCompras;