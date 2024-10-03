import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TablaGenerica from '@/components/inventario/TablaGenerica';

const PaginaFormularioSolicitud = ({
  solicitud,
  detalleActual,
  detalles,
  usuarios,
  donantes,
  insumos,
  marcas,
  distribuidores,
  presentaciones,
  onInputChange,
  onDetalleChange,
  onAgregarDetalle,
  onGuardarSolicitud
}) => {
  const columnasDetalles = [
    { field: 'insumoId', headerName: 'Insumo', flex: 1, renderCell: (params) => insumos.find(i => i.id === params.value)?.nombre || '' },
    { field: 'marcaId', headerName: 'Marca', flex: 1, renderCell: (params) => marcas.find(m => m.id === params.value)?.nombre || '' },
    { field: 'distribuidorId', headerName: 'Distribuidor', flex: 1, renderCell: (params) => distribuidores.find(d => d.id === params.value)?.nombre || '' },
    { field: 'presentacionId', headerName: 'Presentación', flex: 1, renderCell: (params) => presentaciones.find(p => p.id === params.value)?.nombre || '' },
    { field: 'cantidadPresentaciones', headerName: 'Cantidad', flex: 1 },
    { field: 'analistaSolicitante', headerName: 'Analista', flex: 1 },
    { field: 'observacion', headerName: 'Observación', flex: 1 },
  ];

  return (
    <Box className="formulario-container">
      <Typography component="h1" variant="h4" mb={1}>Crear Solicitud</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Número de Solicitud"
            name="numeroSolicitud"
            value={solicitud.numeroSolicitud}
            onChange={onInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Usuario</InputLabel>
            <Select name="usuarioId" value={solicitud.usuarioId} onChange={onInputChange}>
              {Array.isArray(usuarios) && usuarios.map(usuario => (
                <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Donante</InputLabel>
            <Select name="donanteId" value={solicitud.donanteId} onChange={onInputChange}>
              {Array.isArray(donantes) && donantes.map(donante => (
                <MenuItem key={donante.id} value={donante.id}>{donante.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Estado"
            name="estado"
            value={solicitud.estado}
            onChange={onInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Observaciones"
            name="observaciones"
            value={solicitud.observaciones}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h5" mt={3}>Agregar Detalles</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Insumo</InputLabel>
            <Select name="insumoId" value={detalleActual.insumoId} onChange={onDetalleChange}>
              {Array.isArray(insumos) && insumos.map(insumo => (
                <MenuItem key={insumo.id} value={insumo.id}>{insumo.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Marca</InputLabel>
            <Select name="marcaId" value={detalleActual.marcaId} onChange={onDetalleChange}>
              {Array.isArray(marcas) && marcas.map(marca => (
                <MenuItem key={marca.id} value={marca.id}>{marca.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Distribuidor</InputLabel>
            <Select name="distribuidorId" value={detalleActual.distribuidorId} onChange={onDetalleChange}>
              {Array.isArray(distribuidores) && distribuidores.map(distribuidor => (
                <MenuItem key={distribuidor.id} value={distribuidor.id}>{distribuidor.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
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
            label="Cantidad de Presentaciones"
            name="cantidadPresentaciones"
            type="number"
            value={detalleActual.cantidadPresentaciones}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Analista Solicitante"
            name="analistaSolicitante"
            value={detalleActual.analistaSolicitante}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Observación"
            name="observacion"
            value={detalleActual.observacion}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={onAgregarDetalle}>
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
        <Button variant="contained" color="primary" onClick={onGuardarSolicitud}>
          Crear Solicitud
        </Button>
      </Box>
    </Box>
  );
};

export default PaginaFormularioSolicitud;