import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Renderiza la página de unidades de medida con una tabla y opciones para crear, buscar, actualizar y eliminar unidades.
 */
const PaginaUnidades = ({
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
  const { t } = useTranslation(); // Hook para traducción

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      {/* Encabezado de la página de gestión de unidades de medida */}
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaUnidades.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaUnidades.subtitulo')}</p>
      </div>

      {/* Sección principal que contiene la tabla de unidades de medida */}
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaUnidades.encabezadoTabla')}
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

export default PaginaUnidades;