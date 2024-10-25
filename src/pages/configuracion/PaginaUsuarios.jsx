import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import { useTranslation } from 'react-i18next'; 
import '@/assets/styles/inventario/estilosInventario.css';

/**
 * Renderizar la página de usuarios con una tabla y opciones para crear, actualizar y desactivar usuarios.
 */
const PaginaUsuarios = ({
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
  const { t } = useTranslation(); 

  // Mostrar el componente de cargador mientras se obtienen los datos
  if (cargando) return <Cargador />;

  // Mostrar un mensaje de error si ocurre un problema al cargar los datos
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="seccion-principal">
      {/* Encabezado de la página de gestión de usuarios */}
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaUsuarios.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaUsuarios.subtitulo')}</p>
      </div>

      {/* Sección principal que contiene la tabla de usuarios */}
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaUsuarios.encabezadoTabla')}
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

export default PaginaUsuarios;