import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next'; // Hook para traducciones

/**
 * Renderiza la página de inventario con una tabla y opciones para crear, actualizar y eliminar inventarios.
 */
const PaginaInventario = ({
  columnas,
  datos,
  cargando,
  error,
  manejarCrear,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize, // Tamaño de la página
  setPageSize, // Función para cambiar el tamaño de la página
  manejarActualizar,
  manejarEliminar,
}) => {
  const { t } = useTranslation(); // Usar hook de traducción

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaInventario.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaInventario.subtitulo')}</p>
      </div>
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaInventario.encabezadoTabla')}
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

export default PaginaInventario;