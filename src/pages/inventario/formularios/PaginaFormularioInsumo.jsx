import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import TablaGenerica from '@/components/inventario/TablaGenerica';

const PaginaFormularioInsumo = ({
  insumo,
  varianteActual,
  variantes,
  categorias,
  unidadesMedida,
  marcas,
  distribuidores,
  presentaciones,
  onInputChange,
  onVarianteChange,
  onAgregarVariante,
  onGuardarInsumo
}) => {
  const columnasVariantes = [
    { field: 'marcaId', headerName: 'Marca', flex: 1, renderCell: (params) => marcas.find(m => m.id === params.value)?.nombre || '' },
    { field: 'distribuidorId', headerName: 'Distribuidor', flex: 1, renderCell: (params) => distribuidores.find(d => d.id === params.value)?.nombre || '' },
    { field: 'presentacionId', headerName: 'Presentación', flex: 1, renderCell: (params) => presentaciones.find(p => p.id === params.value)?.nombre || '' },
    { field: 'codigoBarra', headerName: 'Código de Barra', flex: 1 },
    { field: 'modeloMarca', headerName: 'Modelo Marca', flex: 1 },
    { field: 'existencias', headerName: 'Existencias', flex: 1 }
  ];

  return (
    <Box className="formulario-container">
      <Typography component="h1" variant="h4" mb={1}>Crear Insumo</Typography>

      {/* Formulario de Insumo */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del Insumo"
            name="nombre"
            value={insumo.nombre}
            onChange={onInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Descripción"
            name="descripcion"
            value={insumo.descripcion}
            onChange={onInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select name="categoriaId" value={insumo.categoriaId} onChange={onInputChange}>
              {Array.isArray(categorias) && categorias.map(categoria => (
                <MenuItem key={categoria.id} value={categoria.id}>{categoria.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Unidad de Medida</InputLabel>
            <Select name="unidadMedidaId" value={insumo.unidadMedidaId} onChange={onInputChange}>
              {Array.isArray(unidadesMedida) && unidadesMedida.map(unidad => (
                <MenuItem key={unidad.id} value={unidad.id}>{unidad.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Valor de Unidad de Medida"
            name="valorUnidadMedida"
            type="number"
            value={insumo.valorUnidadMedida}
            onChange={onInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={insumo.activo}
                onChange={(e) => onInputChange({ target: { name: 'activo', value: e.target.checked } })}
                name="activo"
                color="primary"
              />
            }
            label="Activo"
          />
        </Grid>
      </Grid>
            {/* Botón para guardar el insumo */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={onGuardarInsumo}>
          Crear Insumo
        </Button>
      </Box>

      {/* Sección para agregar variantes */}
      <Typography component="h2" variant="h5" mt={3}>Agregar Variantes</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Marca</InputLabel>
            <Select name="marcaId" value={varianteActual.marcaId} onChange={onVarianteChange}>
              {Array.isArray(marcas) && marcas.map(marca => (
                <MenuItem key={marca.id} value={marca.id}>{marca.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Distribuidor</InputLabel>
            <Select name="distribuidorId" value={varianteActual.distribuidorId} onChange={onVarianteChange}>
              {Array.isArray(distribuidores) && distribuidores.map(distribuidor => (
                <MenuItem key={distribuidor.id} value={distribuidor.id}>{distribuidor.nombre}</MenuItem>
              ))}
            </Select>
            
          </FormControl>
          
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Presentación</InputLabel>
            <Select name="presentacionId" value={varianteActual.presentacionId} onChange={onVarianteChange}>
              {Array.isArray(presentaciones) && presentaciones.map(presentacion => (
                <MenuItem key={presentacion.id} value={presentacion.id}>{presentacion.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Código de Barra"
            name="codigoBarra"
            value={varianteActual.codigoBarra}
            onChange={onVarianteChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Modelo Marca"
            name="modeloMarca"
            value={varianteActual.modeloMarca}
            onChange={onVarianteChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Existencias"
            name="existencias"
            type="number"
            value={varianteActual.existencias}
            onChange={onVarianteChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={onAgregarVariante}>
            Agregar Variante
          </Button>
        </Grid>
      </Grid>

      {/* Tabla de variantes agregadas */}
      <TablaGenerica
        encabezado="Variantes Agregadas"
        columnas={columnasVariantes}
        datos={variantes}
        mostrarCrear={false}
      />
    </Box>
  );
};

export default PaginaFormularioInsumo;