import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "@/assets/styles/formularios.css"; // Importar el archivo CSS

const PaginaFormularioInsumo = ({
  insumo,
  categorias,
  unidadesMedida,
  marcas,
  distribuidores,
  presentaciones,
  onInputChange,
  onGuardarInsumo,
  isUpdating
}) => {
  return (
    <Box className="formulario-container">
      <Typography component="h1" variant="h4" mb={1} className="formulario-titulo">
        {isUpdating ? 'Actualizar Insumo' : 'Crear Insumo'}
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del Insumo"
            name="nombre"
            value={insumo.nombre}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
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
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoriaId"
              value={insumo.categoriaId}
              onChange={onInputChange}
            >
              {Array.isArray(categorias) && categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando categorías...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Unidad de Medida</InputLabel>
            <Select
              name="unidadMedidaId"
              value={insumo.unidadMedidaId}
              onChange={onInputChange}
            >
              {Array.isArray(unidadesMedida) && unidadesMedida.length > 0 ? (
                unidadesMedida.map((unidad) => (
                  <MenuItem key={unidad.id} value={unidad.id}>
                    {unidad.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando unidades de medida...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Marca</InputLabel>
            <Select
              name="marcasId"
              value={insumo.marcasId}
              onChange={onInputChange}
              multiple
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224, // Limita las opciones visibles a 5 con scroll
                    width: 250,
                  },
                },
              }}
            >
              {Array.isArray(marcas) && marcas.length > 0 ? (
                marcas.map((marca) => (
                  <MenuItem key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando marcas...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Distribuidor</InputLabel>
            <Select
              name="distribuidoresId"
              value={insumo.distribuidoresId}
              onChange={onInputChange}
              multiple
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                    width: 250,
                  },
                },
              }}
            >
              {Array.isArray(distribuidores) && distribuidores.length > 0 ? (
                distribuidores.map((distribuidor) => (
                  <MenuItem key={distribuidor.id} value={distribuidor.id}>
                    {distribuidor.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando distribuidores...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Presentación</InputLabel>
            <Select
              name="presentacionesId"
              value={insumo.presentacionesId}
              onChange={onInputChange}
              multiple
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                    width: 250,
                  },
                },
              }}
            >
              {Array.isArray(presentaciones) && presentaciones.length > 0 ? (
                presentaciones.map((presentacion) => (
                  <MenuItem key={presentacion.id} value={presentacion.id}>
                    {presentacion.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando presentaciones...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {isUpdating && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" className="formulario-select">
              <InputLabel>Estado</InputLabel>
              <Select
                name="activo"
                value={insumo.activo ? 1 : 0}
                onChange={(e) =>
                  onInputChange({
                    target: { name: 'activo', value: e.target.value === 1 },
                  })
                }
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={0}>Desactivado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onGuardarInsumo}
          className="formulario-boton"
        >
          {isUpdating ? 'Actualizar Insumo' : 'Crear Insumo'}
        </Button>
      </Box>
    </Box>
  );
};

export default PaginaFormularioInsumo;