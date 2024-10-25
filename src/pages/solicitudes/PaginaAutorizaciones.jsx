import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

/**
 * Renderizar la página de autorizaciones con una tabla de solicitudes pendientes y opciones para autorizar o rechazar.
 */
const PaginaAutorizaciones = ({
  columnas,
  datos,
  cargando,
  error,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize,
  setPageSize,
  manejarAutorizar,
  manejarRechazar,
}) => {
  const { t } = useTranslation(); // Usar hook de traducción

  // Mostrar el componente de cargador mientras se obtienen los datos
  if (cargando) return <Cargador />;

  // Mostrar un mensaje de error si ocurre un problema al cargar los datos
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      {/* Encabezado de la página de autorizaciones */}
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaAutorizaciones.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaAutorizaciones.subtitulo')}</p>
      </div>

      {/* Sección principal que contiene la tabla de solicitudes pendientes */}
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
          manejarAutorizar={manejarAutorizar}
          manejarRechazar={manejarRechazar}
          mostrarCrear={false} // No mostrar el botón de crear
        />
      </div>
    </div>
  );
};

export default PaginaAutorizaciones;