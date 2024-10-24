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

  // Validamos que "datos" sea un array y no undefined
  const datosValidos = Array.isArray(datos) ? datos : [];

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">Gestión de Insumos</h2>
        <p className="subtitulo-inicio">Administra los insumos disponibles en el inventario.</p>
      </div>
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado="Listado de insumos registrados en el inventario"
          columnas={columnas}
          datos={datosValidos} // Pasar datos validados
          manejarCrear={manejarCrear}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize} // Pasar el tamaño de la página
          setPageSize={setPageSize} // Permitir cambiar el tamaño de la página
          manejarActualizar={manejarActualizar}
          manejarEliminar={manejarEliminar}
        />
      </div>
    </div>
  );
};

export default PaginaInsumos;