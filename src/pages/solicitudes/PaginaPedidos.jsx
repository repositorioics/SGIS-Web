import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next';

/**
 * Renderizar la página de pedidos con una tabla de pedidos y opciones para crear, actualizar y eliminar.
 */
const PaginaPedidos = ({
  columnas,
  datos = [], // Establece un arreglo vacío por defecto
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
  const { t } = useTranslation();

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaPedidos.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaPedidos.subtitulo')}</p>
      </div>

      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaPedidos.encabezadoTabla')}
          columnas={columnas}
          datos={datos}
          manejarCrear={manejarCrear}
          manejarBusqueda={manejarBusqueda}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize}
          mostrarCrear={false}
          setPageSize={setPageSize}
          manejarActualizar={manejarActualizar}
          manejarEliminar={manejarEliminar}
        />
      </div>
    </div>
  );
};

export default PaginaPedidos;