import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next';

/**
 * Renderiza la página de bodegas con una tabla y opciones para crear, buscar, actualizar y eliminar bodegas.
 */
const PaginaBodegas = ({
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
      {/* Encabezado de la página de gestión de bodegas */}
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaBodegas.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaBodegas.subtitulo')}</p>
      </div>

      {/* Sección principal que contiene la tabla de bodegas */}
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaBodegas.encabezadoTabla')}
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

export default PaginaBodegas;