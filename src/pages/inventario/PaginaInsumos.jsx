import React from 'react';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';
import { useTranslation } from 'react-i18next';

/**
 * Renderiza la página de insumos con una tabla y opciones para crear, buscar, actualizar y eliminar insumos.
 */
const PaginaInsumos = ({
  columnas,
  datos,
  cargando,
  error,
  manejarCrear,
  totalPaginas,
  paginaActual,
  setPaginaActual,
  pageSize, // Recibe el tamaño de página
  setPageSize, // Permite cambiar el tamaño de página
  manejarActualizar,
  manejarEliminar,
}) => {
  const { t } = useTranslation(); // Hook de traducción

  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  // Validamos que "datos" sea un array y no undefined
  const datosValidos = Array.isArray(datos) ? datos : [];

  return (
    <div className="seccion-principal">
      {/* Encabezado de la página de gestión de insumos */}
      <div className="cabecera-inicio">
        <h2 className="titulo-inicio">{t('paginaInsumos.titulo')}</h2>
        <p className="subtitulo-inicio">{t('paginaInsumos.subtitulo')}</p>
      </div>
      <div className="seccion-inventario">
        <TablaGenerica
          encabezado={t('paginaInsumos.encabezadoTabla')}
          columnas={columnas}
          datos={datosValidos} // Pasar datos validados
          manejarCrear={manejarCrear}
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          setPagina={setPaginaActual}
          pageSize={pageSize} // Pasar el tamaño de la página
          setPageSize={setPageSize} // Permitir cambiar el tamaño de la página
          manejarActualizar={manejarActualizar}
          manejarEliminar={manejarEliminar}
        />
      </div>
    </div>
  );
};

export default PaginaInsumos;