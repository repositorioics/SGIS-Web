import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS

const PaginaFormularioPresentacion = ({ presentacion, onChange, onSave, error, isEditing, formik }) => {
  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? 'Actualizar Presentación' : 'Crear Presentación'}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        Complete los siguientes campos para {isEditing ? 'actualizar la presentación' : 'crear una nueva presentación'}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          Error al cargar los datos de la presentación
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

            {/* Campo Unidades por Presentación */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Unidades por Presentación"
                name="unidadesPresentacion"
                type="number"
                value={formik.values.unidadesPresentacion}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.unidadesPresentacion && Boolean(formik.errors.unidadesPresentacion)}
                helperText={formik.touched.unidadesPresentacion && formik.errors.unidadesPresentacion}
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
              {isEditing ? 'Actualizar Presentación' : 'Crear Presentación'}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioPresentacion;