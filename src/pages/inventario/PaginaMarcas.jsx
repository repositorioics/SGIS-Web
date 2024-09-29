import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
// import TarjetaResumen from '@/components/inventario/TarjetaResumen';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
// import { FaTags, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 
const PaginaMarcas = ({
  columnas,
  datos,
  cargando,
  error,
  manejarCrear,
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
        <h2 className="titulo-inicio">Gestión de Marcas</h2>
        <p className="subtitulo-inicio">Administra las marcas disponibles en el inventario</p>
      </div>
      {/* <div className="contenedor-resumen">
          <TarjetaResumen valor={datos?.length || 0} titulo="Total de Marcas" icono={<FaTags />} />
          <TarjetaResumen valor={datos?.filter(i => i.activo).length || 0} titulo="Marcas Activas" icono={<FaCheckCircle />} />
          <TarjetaResumen valor={datos?.filter(i => !i.activo).length || 0} titulo="Marcas Inactivas" icono={<FaTimesCircle />} />
        </div> */}
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado="Listado de marcas registradas en el inventario"
          columnas={columnas}
          datos={datos}
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

export default PaginaMarcas;