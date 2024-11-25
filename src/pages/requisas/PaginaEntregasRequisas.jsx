import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next';

/**
 * Renderizar la página de entregas de requisas con una tabla y opciones para crear pedidos.
 */
const PaginaEntregasRequisas = ({
  columnas,
  datos,
  cargando,
  error,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize,
  setPageSize,
  manejarRealizarPedido,
  mostrarSoloVerMas,
}) => {
  const { t } = useTranslation();

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      {/* Encabezado de la página de gestión de entregas */}
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaEntregasRequisas.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaEntregasRequisas.subtitulo')}</p>
      </div>

      {/* Sección principal que contiene la tabla de entregas */}
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaEntregasRequisas.encabezadoTabla')}
          columnas={columnas}
          datos={datos}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize}
          setPageSize={setPageSize}
          mostrarCrear={false}
          manejarRealizarPedido={manejarRealizarPedido} // Pasamos esta función para crear el pedido
          mostrarSoloVerMas={mostrarSoloVerMas} // Control para mostrar solo el botón de acción
          getRowId={(row) => row.id} // Especificar el campo `id` para las filas
        />
      </div>
    </div>
  );
};

export default PaginaEntregasRequisas;