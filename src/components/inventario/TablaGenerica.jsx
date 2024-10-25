import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { green, red, blue } from '@mui/material/colors';
import { useTranslation } from 'react-i18next'; // Importar para la traducción
import '@/assets/styles/inventario/estilosInventario.css';

/**
 * Renderizar una tabla genérica con soporte de paginación, ordenación, y acciones de edición y eliminación.
 */
const TablaGenerica = ({ 
  columnas, 
  encabezado, 
  datos, 
  manejarCrear, 
  totalPaginas, 
  paginaActual, 
  setPagina, 
  pageSize, 
  setPageSize, 
  manejarActualizar, 
  manejarEliminar,
  mostrarCrear = true 
}) => {
  const { t } = useTranslation(); // Hook para manejar traducción

  /**
   * Manejar el cambio en el tamaño de la página.
   * @param {number} newPageSize - El nuevo tamaño de página seleccionado por el usuario.
   */
  const manejarCambioPageSize = (newPageSize) => {
    setPageSize(newPageSize); // Actualizar dinámicamente el tamaño de la página
  };

  /**
   * Configurar las columnas, añadiendo personalización a las columnas de estado y acciones.
   */
  const columnasMejoradas = columnas.map((columna) => {
    // Personalizar la columna de 'activo' para mostrar 'Activo' o 'Inactivo' con colores
    if (columna.field === 'activo') {
      return {
        ...columna,
        flex: 1.5,
        renderCell: (params) => {
          const isActive = params.value ? t('tablaGenerica.activo') : t('tablaGenerica.inactivo'); // Traducir 'Activo' e 'Inactivo'
          const color = params.value ? '#50C878' : '#FE6F5E';
          const backgroundColor = params.value ? green[100] : red[100];

          return (
            <span style={{
              color: color,
              fontWeight: 'bold',
              padding: '5px 10px',
              backgroundColor: backgroundColor,
              borderRadius: '12px',
              display: 'inline-block',
              textAlign: 'center',
              width: '70px',
              fontSize: '12px'
            }}>
              {isActive}
            </span>
          );
        }
      };
    }

    // Añadir acciones de edición y eliminación en la columna 'acciones'
    if (columna.field === 'acciones') {
      return {
        ...columna,
        flex: 1,
        renderCell: (params) => (
          <div style={{ display: 'flex', gap: '5px' }}>
            <IconButton
              style={{ color: blue[500], fontSize: '16px', padding: '4px' }}
              onClick={() => manejarActualizar(params.row)}
            >
              <FaEdit />
            </IconButton>
            <IconButton
              style={{ color: red[400], fontSize: '16px', padding: '1px' }}
              onClick={() => manejarEliminar(params.row)}
            >
              <FaTrash />
            </IconButton>
          </div>
        )
      };
    }

    return { ...columna, flex: columna.flex || 1 }; // Asegurar que las demás columnas mantengan sus propiedades
  });

  return (
    <div style={{ height: 'calc(100vh - 150px)', width: '100%' }}>
      {/* Renderizar el componente DataGrid con las columnas mejoradas y el resto de las propiedades */}
      <DataGrid
        rows={datos} // Filas de datos a mostrar en la tabla
        columns={columnasMejoradas} // Columnas con configuraciones personalizadas
        pageSize={pageSize} // Tamaño de la página, definido dinámicamente
        onPageSizeChange={manejarCambioPageSize} // Manejar cambio del tamaño de la página
        rowsPerPageOptions={[10, 20, 30]} // Opciones de filas por página
        rowCount={totalPaginas * pageSize} // Total de registros basado en el tamaño de página
        pagination // Habilitar la paginación
        paginationMode="server" // Activar la paginación en el servidor
        onPageChange={(newPage) => setPagina(newPage)} // Manejar cambio de página
        page={paginaActual} // Establecer la página actual
        sortingMode="server" // Habilitar ordenación en el servidor
        disableSelectionOnClick
        headerHeight={45}
        rowHeight={45}
        components={{
          Toolbar: () => (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "0.5rem" }}>
              <span style={{ fontSize: "1.2em", fontWeight: 'bold', color: '#333' }}>{encabezado}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GridToolbar />
                {mostrarCrear && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={manejarCrear} // Navegar a la página de creación
                    style={{
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      fontWeight: 'bold',
                      boxShadow: 'none',
                      borderRadius: '8px',
                      marginLeft: 'auto'
                    }}
                  >
                    {t('tablaGenerica.crearNuevo')} {/* Traducir "Crear Nuevo" */}
                  </Button>
                )}
              </div>
            </div>
          )
        }}
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
            fontSize: '12px',
            width: '100%',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f0f0f0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          '& .MuiDataGrid-columnHeaders': {
            border: '1px solid #ddd',
            backgroundColor: "#FEFEFA",
            fontSize: '0.9rem',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          '& .MuiDataGrid-footerContainer': {
            minHeight: '40px',
          },
          '& .MuiTablePagination-root': {
            fontSize: '0.9rem',
          },
        }}
      />
    </div>
  );
};

export default TablaGenerica;