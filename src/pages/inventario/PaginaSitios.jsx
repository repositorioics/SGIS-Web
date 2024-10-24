import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';

const PaginaInsumos = ({
  columnas,
  datos,
  cargando,
  error,
  manejarCrear,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize, // Recibe el tamaño de página
  setPageSize, // Permite cambiar el tamaño de página
  manejarActualizar,
  manejarEliminar,
}) => {
  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">Gestión de Insumos</h2>
        <p className="subtitulo-inicio">Administra los insumos disponibles en el inventario.</p>
        <button onClick={manejarCrear} className="boton-crear">Crear Insumo</button>
      </div>
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado="Listado de insumos registrados en el inventario"
          columnas={columnas}
          datos={datos} // Pasar los datos de insumos
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

export default PaginaInsumos;