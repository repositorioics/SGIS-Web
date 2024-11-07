import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next';

/**
 * Renderiza la página de autorizaciones o pedidos según el modo proporcionado.
 * @param {string} titulo - Título de la página.
 * @param {string} subtitulo - Subtítulo de la página.
 * @param {string} modo - Define el contexto de la página ('autorizar' o 'pedido').
 */
const PaginaAutorizaciones = ({
  modo,
  titulo,
  subtitulo,
  columnas,
  datos,
  cargando,
  error,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize,
  setPageSize,
  manejarVerMas,
  manejarRealizarPedido
}) => {
  const { t } = useTranslation();

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{titulo}</h2>
        <p className="subtitulo-inicio">{subtitulo}</p>
      </div>

      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaAutorizaciones.encabezadoTabla')}
          columnas={columnas}
          datos={datos}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize}
          setPageSize={setPageSize}
          mostrarCrear={false}
          manejarVerMas={manejarVerMas}
          manejarRealizarPedido={manejarRealizarPedido}
          mostrarSoloVerMas={modo === 'autorizar' || modo === 'pedido'}
        />
      </div>
    </div>
  );
};

export default PaginaAutorizaciones;