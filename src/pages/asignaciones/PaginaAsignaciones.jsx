import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next';

/**
 * Renderizar la página de asignaciones con opciones para gestionar.
 */
const PaginaAsignaciones = ({
  columnas,
  datos,
  manejarCrear,
  cargando,
  error,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize,
  manejarVerMas,
  setPageSize,
}) => {
  const { t } = useTranslation();

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      {/* Encabezado */}
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaAsignaciones.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaAsignaciones.subtitulo')}</p>
      </div>

      {/* Tabla */}
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaAsignaciones.encabezadoTabla')}
          columnas={columnas}
          manejarCrear={manejarCrear}
          datos={datos}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize}
          setPageSize={setPageSize}
          manejarVerMas={manejarVerMas}
          mostrarSoloVerMas={true} // Mostrar solo el botón "Ver más"
        />
      </div>
    </div>
  );
};

export default PaginaAsignaciones;