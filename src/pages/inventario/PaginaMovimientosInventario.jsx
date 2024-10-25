import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next';

/**
 * Renderiza la página de movimientos de inventario con una tabla para mostrar los movimientos registrados.
 */
const PaginaMovimientosInventario = ({
  columnas,
  datos,
  cargando,
  error,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize,
  setPageSize,
}) => {
  const { t } = useTranslation(); // Hook para traducción

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      {/* Encabezado de la página de movimientos de inventario */}
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaMovimientosInventario.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaMovimientosInventario.subtitulo')}</p>
      </div>

      {/* Tabla con los movimientos de inventario */}
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaMovimientosInventario.encabezadoTabla')}
          columnas={columnas}
          datos={datos}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize}
          setPageSize={setPageSize}
          mostrarCrear={false}
        />
      </div>
    </div>
  );
};

export default PaginaMovimientosInventario;