import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS

const PaginaFormularioRequisa = ({
  requisa,
  detalleActual,
  detalles,
  sitios,
  insumos,
  presentaciones,
  onInputChange,
  onDetalleChange,
  onAgregarDetalle,
  onGuardarRequisa
}) => {
  const columnasDetalles = [
    { field: 'insumoId', headerName: 'Insumo', flex: 1, renderCell: (params) => insumos.find(i => i.id === params.value)?.nombre || '' },
    { field: 'presentacionId', headerName: 'Presentación', flex: 1, renderCell: (params) => presentaciones.find(p => p.id === params.value)?.nombre || '' },
    { field: 'cantidadPresentacionesSolicitada', headerName: 'Cantidad Solicitada', flex: 1 },
    { field: 'observacion', headerName: 'Observación', flex: 1 },
  ];

  return (
    <Box className="formulario-container">
      <Typography component="h1" variant="h4" mb={1} className="formulario-titulo">
        Crear Requisa
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Sitio</InputLabel>
            <Select name="sitioId" value={requisa.sitioId} onChange={onInputChange}>
              {Array.isArray(sitios) && sitios.map(sitio => (
                <MenuItem key={sitio.id} value={sitio.id}>{sitio.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Creado Por"
            name="creadoPor"
            type="number"
            value={requisa.creadoPor}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: '20px' }}> {/* Se agrega marginBottom para espacio debajo del campo Observaciones */}
          <TextField
            label="Observaciones"
            name="observaciones"
            value={requisa.observaciones}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            className="formulario-input"
          />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h5" mt={7} className="formulario-titulo">
        Agregar Detalles
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Insumo</InputLabel>
            <Select name="insumoId" value={detalleActual.insumoId} onChange={onDetalleChange}>
              {Array.isArray(insumos) && insumos.map(insumo => (
                <MenuItem key={insumo.id} value={insumo.id}>{insumo.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Presentación</InputLabel>
            <Select name="presentacionId" value={detalleActual.presentacionId} onChange={onDetalleChange}>
              {Array.isArray(presentaciones) && presentaciones.map(presentacion => (
                <MenuItem key={presentacion.id} value={presentacion.id}>{presentacion.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Cantidad de Presentaciones Solicitada"
            name="cantidadPresentacionesSolicitada"
            type="number"
            value={detalleActual.cantidadPresentacionesSolicitada}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Observación"
            name="observacion"
            value={detalleActual.observacion}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} mb={3} mt={3}>
          <Button variant="contained" color="secondary" onClick={onAgregarDetalle} className="formulario-boton">
            Agregar Detalle
          </Button>
        </Grid>
      </Grid>

      <TablaGenerica
        encabezado="Detalles Agregados"
        columnas={columnasDetalles}
        datos={detalles}
        mostrarCrear={false}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={onGuardarRequisa} className="formulario-boton">
          Crear Requisa
        </Button>
      </Box>
    </Box>
  );
};

export default PaginaFormularioRequisa;