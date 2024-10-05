import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS

const PaginaFormularioBodega = ({ bodega, onChange, onSave, error, isEditing, formik, sitios, donantes }) => {
  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? 'Actualizar Bodega' : 'Crear Bodega'}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        Complete los siguientes campos para {isEditing ? 'actualizar la bodega' : 'crear una nueva bodega'}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          Error al cargar los datos de la bodega
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            {/* Campo Descripción */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Descripción"
                name="descripcion"
                value={formik.values.descripcion}
                onChange={onChange}
                fullWidth
                margin="normal"
                rows={4}
                error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                helperText={formik.touched.descripcion && formik.errors.descripcion}
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            {/* Campo Dirección */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                name="direccion"
                value={formik.values.direccion}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion}
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            {/* Campo Sitio */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Sitio</InputLabel>
                <Select
                  name="sitioId"
                  value={formik.values.sitioId || ''}
                  onChange={onChange}
                  error={formik.touched.sitioId && Boolean(formik.errors.sitioId)}
                  InputProps={{
                    className: 'formulario-input',
                  }}
                >
                  <MenuItem value="">Seleccionar Sitio</MenuItem>
                  {sitios.map(sitio => (
                    <MenuItem key={sitio.id} value={sitio.id}>
                      {sitio.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.sitioId && formik.errors.sitioId && (
                  <Typography color="error">{formik.errors.sitioId}</Typography>
                )}
              </FormControl>
            </Grid>

            {/* Campo Donante */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Donante</InputLabel>
                <Select
                  name="donanteId"
                  value={formik.values.donanteId || ''}
                  onChange={onChange}
                  error={formik.touched.donanteId && Boolean(formik.errors.donanteId)}
                >
                  <MenuItem value="">Seleccionar Donante</MenuItem>
                  {donantes.map(donante => (
                    <MenuItem key={donante.id} value={donante.id}>
                      {donante.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.donanteId && formik.errors.donanteId && (
                  <Typography color="error">{formik.errors.donanteId}</Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="formulario-boton" // Aplicar clase CSS
            >
              {isEditing ? 'Actualizar Bodega' : 'Crear Bodega'}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioBodega;