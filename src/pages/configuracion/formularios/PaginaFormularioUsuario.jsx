import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS

const PaginaFormularioUsuario = ({ usuario, onChange, onSave, error, isEditing, formik }) => {
  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        Complete los siguientes campos para {isEditing ? 'actualizar el usuario' : 'crear un nuevo usuario'}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          Error al cargar los datos del usuario
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Primera fila con dos columnas */}
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

            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                name="apellido"
                value={formik.values.apellido}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                helperText={formik.touched.apellido && formik.errors.apellido}
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            {/* Segunda fila con dos columnas */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Usuario"
                name="usuario"
                value={formik.values.usuario}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.usuario && Boolean(formik.errors.usuario)}
                helperText={formik.touched.usuario && formik.errors.usuario}
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Correo"
                name="correo"
                type="email"
                value={formik.values.correo}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.correo && Boolean(formik.errors.correo)}
                helperText={formik.touched.correo && formik.errors.correo}
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            {/* Tercera fila con dos columnas */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Clave"
                name="clave"
                type="password"
                value={formik.values.clave}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.clave && Boolean(formik.errors.clave)}
                helperText={formik.touched.clave && formik.errors.clave}
                disabled={isEditing} // Deshabilitar si estamos editando
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirmar Clave"
                name="confirmarClave"
                type="password"
                value={formik.values.confirmarClave}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.confirmarClave && Boolean(formik.errors.confirmarClave)}
                helperText={formik.touched.confirmarClave && formik.errors.confirmarClave}
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Campo adicional o dejar vacío */}
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="formulario-boton" // Aplicar clase CSS
            >
              {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioUsuario;