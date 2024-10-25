import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next'; // Hook para traducción

/**
 * Renderiza la página de sitios con una tabla y opciones para crear, actualizar y eliminar.
 */
const PaginaSitios = ({
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
  const { t } = useTranslation(); // Hook de traducción

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaSitios.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaSitios.subtitulo')}</p>
      </div>
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaSitios.encabezado')}
          columnas={columnas}
          datos={datos}
          manejarCrear={manejarCrear}
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

export default PaginaSitios;