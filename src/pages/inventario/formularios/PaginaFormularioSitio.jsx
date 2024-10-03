import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS

const PaginaFormularioSitio = ({ sitio, onChange, onSave, error, isEditing, formik, usuarios }) => {
  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? 'Actualizar Sitio' : 'Crear Sitio'}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        Complete los siguientes campos para {isEditing ? 'actualizar el sitio' : 'crear un nuevo sitio'}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          Error al cargar los datos del sitio
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

            {/* Campo Abreviatura */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Abreviatura"
                name="abreviatura"
                value={formik.values.abreviatura}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.abreviatura && Boolean(formik.errors.abreviatura)}
                helperText={formik.touched.abreviatura && formik.errors.abreviatura}
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

            {/* Campo Usuario de Contacto */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Usuario de Contacto</InputLabel>
                <Select
                  name="usuarioContactoId"
                  value={formik.values.usuarioContactoId}
                  onChange={onChange}
                  fullWidth
                  InputProps={{
                    className: 'formulario-input', // Aplicar clase CSS
                  }}
                  error={formik.touched.usuarioContactoId && Boolean(formik.errors.usuarioContactoId)}
                >
                  {usuarios.map(usuario => (
                    <MenuItem key={usuario.id} value={usuario.id}>
                      {`${usuario.nombre} ${usuario.apellido} (${usuario.usuario})`}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.usuarioContactoId && formik.errors.usuarioContactoId && (
                  <Typography color="error">{formik.errors.usuarioContactoId}</Typography>
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
              {isEditing ? 'Actualizar Sitio' : 'Crear Sitio'}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioSitio;