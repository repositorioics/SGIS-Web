import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS

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
      <Typography component="h1" variant="h4" mb={1} className="formulario-titulo">
        Crear Solicitud
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Número de Solicitud"
            name="numeroSolicitud"
            value={solicitud.numeroSolicitud}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Usuario</InputLabel>
            <Select name="usuarioId" value={solicitud.usuarioId} onChange={onInputChange}>
              {Array.isArray(usuarios) && usuarios.map(usuario => (
                <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Donante</InputLabel>
            <Select name="donanteId" value={solicitud.donanteId} onChange={onInputChange}>
              {Array.isArray(donantes) && donantes.map(donante => (
                <MenuItem key={donante.id} value={donante.id}>{donante.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Estado</InputLabel>
            <Select
              name="estado"
              value={solicitud.estado ? 1 : 0} // Muestra 1 si está activo, 0 si no
              onChange={(e) =>
                onInputChange({
                  target: { name: "estado", value: e.target.value === 1 },
                })
              }
            >
              <MenuItem value={1}>Activo</MenuItem>
              <MenuItem value={0}>Desactivado</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} style={{ marginBottom: '20px' }}> {/* Se agrega marginBottom */}
          <TextField
            label="Observaciones"
            name="observaciones"
            value={solicitud.observaciones}
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
            <InputLabel>Marca</InputLabel>
            <Select name="marcaId" value={detalleActual.marcaId} onChange={onDetalleChange}>
              {Array.isArray(marcas) && marcas.map(marca => (
                <MenuItem key={marca.id} value={marca.id}>{marca.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Distribuidor</InputLabel>
            <Select name="distribuidorId" value={detalleActual.distribuidorId} onChange={onDetalleChange}>
              {Array.isArray(distribuidores) && distribuidores.map(distribuidor => (
                <MenuItem key={distribuidor.id} value={distribuidor.id}>{distribuidor.nombre}</MenuItem>
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
            label="Cantidad de Presentaciones"
            name="cantidadPresentaciones"
            type="number"
            value={detalleActual.cantidadPresentaciones}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            className="formulario-input"
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
            className="formulario-input"
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
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12}  mb={3} mt={3}>
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
        <Button variant="contained" color="primary" onClick={onGuardarSolicitud} className="formulario-boton">
          Crear Solicitud
        </Button>
      </Box>
    </Box>
  );
};

export default PaginaFormularioSolicitud;