import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import { FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next';

/**
 * Renderiza la página de distribuidores con una tabla y opciones para crear, buscar, actualizar y eliminar.
 */
const PaginaDistribuidores = ({
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
  const { t } = useTranslation(); // Hook para traducciones

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaDistribuidores.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaDistribuidores.subtitulo')}</p>
      </div>
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaDistribuidores.encabezadoTabla')}
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

export default PaginaDistribuidores;