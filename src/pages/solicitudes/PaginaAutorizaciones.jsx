import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';

const PaginaAutorizaciones = ({
  columnas,
  datos,
  cargando,
  error,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize,
  setPageSize,
  manejarAutorizar,
  manejarRechazar,
}) => {
  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">Gestión de Autorizaciones</h2>
        <p className="subtitulo-inicio">Autoriza o rechaza las solicitudes pendientes</p>
      </div>
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={"Solicitudes pendientes de autorización"}
          columnas={columnas}
          datos={datos}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize}
          setPageSize={setPageSize}
          manejarAutorizar={manejarAutorizar}
          manejarRechazar={manejarRechazar}
        />
      </div>
    </div>
  );
};

export default PaginaAutorizaciones;