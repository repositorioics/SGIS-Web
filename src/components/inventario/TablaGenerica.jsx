import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { FaEdit, FaTrash, FaEye, FaPlusCircle } from 'react-icons/fa'; // Icono para "Crear Pedido"
import { green, red, blue } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/inventario/estilosInventario.css';

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
  manejarVerMas,
  manejarRealizarPedido, // Función para "Crear Pedido"
  mostrarCrear = true,
  pagination = true,
  mostrarSoloVerMas = false // Control para mostrar solo "Ver más" o "Crear Pedido"
}) => {
  const { t } = useTranslation();

  const manejarCambioPageSize = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const columnasMejoradas = columnas.map((columna) => {
    if (columna.field === 'activo') {
      return {
        ...columna,
        flex: 1.5,
        renderCell: (params) => {
          const isActive = params.value ? t('tablaGenerica.activo') : t('tablaGenerica.inactivo');
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

    if (columna.field === 'acciones') {
      return {
        ...columna,
        flex: 1,
        renderCell: (params) => (
          <div style={{ display: 'flex', gap: '5px' }}>
            {mostrarSoloVerMas ? (
              // Mostrar solo el botón "Ver más" o "Crear Pedido" según el modo
              <IconButton
                style={{ color: blue[500], fontSize: '16px', padding: '4px' }}
                onClick={() => 
                  manejarVerMas ? manejarVerMas(params.row) : manejarRealizarPedido(params.row)
                }
              >
                {manejarVerMas ? <FaEye /> : <FaPlusCircle />} {/* Mostrar icono de pedido en modo pedido */}
              </IconButton>
            ) : (
              // Muestra los botones de editar y eliminar si mostrarSoloVerMas es false
              <>
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
              </>
            )}
          </div>
        )
      };
    }

    return { ...columna, flex: columna.flex || 1 };
  });

  return (
    <div style={{ height: 'calc(100vh - 150px)', width: '100%' }}>
      <DataGrid
        rows={datos}
        columns={columnasMejoradas}
        pageSize={pageSize}
        onPageSizeChange={pagination ? manejarCambioPageSize : undefined}
        rowsPerPageOptions={pagination ? [10, 20, 30] : []}
        rowCount={pagination ? totalPaginas * pageSize : datos.length}
        pagination={pagination}
        paginationMode={pagination ? "server" : undefined}
        onPageChange={pagination ? (newPage) => setPagina(newPage) : undefined}
        page={paginaActual}
        sortingMode="server"
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
                    onClick={manejarCrear}
                    style={{
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      fontWeight: 'bold',
                      boxShadow: 'none',
                      borderRadius: '8px',
                      marginLeft: 'auto'
                    }}
                  >
                    {t('tablaGenerica.crearNuevo')}
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
            display: pagination ? 'flex' : 'none',
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