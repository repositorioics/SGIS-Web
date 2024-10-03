import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaMovimientosInventario from '@/pages/inventario/PaginaMovimientosInventario';
import '@/assets/styles/inventario/estilosInventario.css';
import { URL } from '@/constants/url';
import useFetch from '@/hooks/useFetch';

const ContenedorMovimientosInventario = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Hook personalizado para obtener los datos de los movimientos de inventario
  const { data, loading, error } = useFetch(
    `${URL}api/v1/movimientos-inventario?page=${paginaActual}&size=${pageSize}`,
    {},
    [paginaActual, pageSize]
  );

  const columnas = [
    { field: 'tipoMovimiento', headerName: 'Tipo Movimiento', flex: 2 },
    { field: 'insumoNombre', headerName: 'Insumo', flex: 2 },
    { field: 'presentacionNombre', headerName: 'Presentación', flex: 2 },
    { field: 'cantidadPresentacion', headerName: 'Cantidad Presentacion', flex: 2 },
    { field: 'bodegaOrigenNombre', headerName: 'Bodega Origen', flex: 2 },
    { field: 'bodegaDestinoNombre', headerName: 'Bodega Destino', flex: 2 },
    { field: 'fechaMovimiento', headerName: 'Fecha Movimiento', flex: 2 },
  ];

  return (
    <>
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
    </>
  );
};

export default ContenedorMovimientosInventario;