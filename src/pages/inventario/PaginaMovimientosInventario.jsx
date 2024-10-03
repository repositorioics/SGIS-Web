import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';

const PaginaMovimientosInventario = ({
  columnas,
  datos,
  cargando,
  error,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize,
  setPageSize,
}) => {
  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">Resumen de Movimientos de Inventario</h2>
        <p className="subtitulo-inicio">Consulta los movimientos registrados en el sistema</p>
      </div>
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado="Listado de movimientos de inventario registrados"
          columnas={columnas}
          datos={datos}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize}
          setPageSize={setPageSize}
          mostrarCrear={false}
        />
      </div>
    </div>
  );
};

export default PaginaMovimientosInventario;