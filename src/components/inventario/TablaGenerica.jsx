import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { green, red, blue } from '@mui/material/colors';
import '@/assets/styles/inventario/estilosInventario.css';

const TablaGenerica = ({ 
  columnas, 
  encabezado, 
  datos, 
  manejarCrear, 
  totalPaginas, 
  paginaActual, 
  setPagina, 
  pageSize, // Recibe el tamaño de página
  setPageSize, // Permite cambiar el tamaño de página
  manejarActualizar, 
  manejarEliminar 
}) => {

  const manejarCambioPageSize = (newPageSize) => {
    setPageSize(newPageSize); // Actualiza el tamaño de página dinámicamente
  };

  // Personalización de columnas para incluir las acciones y estados
  const columnasMejoradas = columnas.map((columna) => {
    if (columna.field === 'activo') {
      return {
        ...columna,
        flex: 1.5,
        renderCell: (params) => {
          const isActive = params.value ? 'Activo' : 'Inactivo';
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
              fontSize:'12px'
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

    return { ...columna, flex: columna.flex || 1 };
  });

  return (
    <div style={{ height: 'calc(100vh - 150px)', width: '100%' }}>
      <DataGrid
        rows={datos}
        columns={columnasMejoradas}
        pageSize={pageSize} // Tamaño de página dinámico
        onPageSizeChange={manejarCambioPageSize} // Manejar el cambio del tamaño de página
        rowsPerPageOptions={[10, 20, 30]} // Opciones de filas por página
        rowCount={totalPaginas * pageSize} // Total de registros, basado en el tamaño de página
        pagination
        paginationMode="server" // Habilita la paginación en modo servidor
        onPageChange={(newPage) => setPagina(newPage)}
        page={paginaActual} // Página actual
        sortingMode="server" // Modo de ordenación del servidor
        disableSelectionOnClick
        headerHeight={45}
        rowHeight={45}
        components={{
          Toolbar: () => (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "0.5rem" }}>
              <span style={{ fontSize: "1.2em", fontWeight: 'bold', color: '#333' }}>{encabezado}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GridToolbar />
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
                  Crear Nuevo
                </Button>
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