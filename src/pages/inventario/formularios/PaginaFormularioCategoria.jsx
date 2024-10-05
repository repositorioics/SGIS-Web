import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS

const PaginaFormularioCategoria = ({ categoria, onChange, onSave, error, isEditing, formik }) => {
  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? 'Actualizar Categoría' : 'Crear Categoría'}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        Complete los siguientes campos para {isEditing ? 'actualizar la categoría' : 'crear una nueva categoría'}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          Error al cargar los datos de la categoría
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="formulario-boton" // Aplicar clase CSS
            >
              {isEditing ? 'Actualizar Categoría' : 'Crear Categoría'}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioCategoria;