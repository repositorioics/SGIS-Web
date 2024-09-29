import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';

const PaginaPedidos = ({
  columnas,
  datos,
  cargando,
  error,
  manejarCrear,
  manejarBusqueda,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize,
  setPageSize,
  manejarActualizar,
  manejarEliminar,
}) => {
  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">Gestión de Pedidos</h2>
        <p className="subtitulo-inicio">Administra los pedidos de insumos en el sistema</p>
      </div>
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={"Listado de pedidos registrados en el sistema"}
          columnas={columnas}
          datos={datos}
          manejarCrear={manejarCrear}
          manejarBusqueda={manejarBusqueda}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize}
          setPageSize={setPageSize}
          manejarActualizar={manejarActualizar}
          manejarEliminar={manejarEliminar}
        />
      </div>
    </div>
  );
};

export default PaginaPedidos;