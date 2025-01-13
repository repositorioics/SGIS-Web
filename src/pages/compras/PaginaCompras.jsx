import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import { useTranslation } from 'react-i18next';

/**
 * Página que renderiza las compras y gestiona la lógica de presentación.
 */
const PaginaCompras = ({
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
  manejarVerMas,
}) => {
  const { t } = useTranslation();

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      {/* Encabezado */}
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaCompras.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaCompras.subtitulo')}</p>
      </div>

      {/* Tabla de Compras */}
      <div className="seccion-compras">
        <TablaGenerica
          encabezado={t('paginaCompras.encabezadoTabla')}
          columnas={columnas}
          manejarCrear={manejarCrear}
          datos={datos}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize}
          setPageSize={setPageSize}
          manejarVerMas={manejarVerMas}
          mostrarSoloVerMas={true}
          //manejarActualizar={manejarActualizar}
          //manejarEliminar={manejarEliminar}
        />
      </div>
    </div>
  );
};

export default PaginaCompras;