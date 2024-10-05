import React from 'react';
import { Box, Button, Grid, TextField, Typography, Autocomplete } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar estilos CSS

const PaginaFormularioUsuario = ({ usuario, onChange, onSave, error, isEditing, formik, roles }) => {
  return (
    <Box className="formulario-container">
      <Typography component="h1" className="formulario-titulo" variant="h4" mb={1} textAlign="left">
        {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
      </Typography>

      <Typography className="formulario-subtitulo" variant="subtitle1" mb={3} textAlign="left" color="textSecondary">
        Complete los siguientes campos para {isEditing ? 'actualizar el usuario' : 'crear un nuevo usuario'}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          Error al cargar los datos del usuario o los roles
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campos de nombre, apellido, usuario, correo, clave */}
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
              />
            </Grid>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Correo"
                name="correo"
                value={formik.values.correo}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.correo && Boolean(formik.errors.correo)}
                helperText={formik.touched.correo && formik.errors.correo}
              />
            </Grid>
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
              />
            </Grid>

            {/* Campo de selección múltiple de roles usando Autocomplete */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={roles} // Los roles que vienen del backend
                getOptionLabel={(option) => option.nombre} // Lo que se muestra en el listado
                value={roles.filter((rol) => formik.values.rolIds.includes(rol.id))} // Filtrar los roles seleccionados
                onChange={(event, newValue) => {
                  const selectedRoleIds = newValue.map((role) => role.id);
                  formik.setFieldValue('rolIds', selectedRoleIds);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Roles"
                    placeholder="Seleccione uno o más roles"
                    error={formik.touched.rolIds && Boolean(formik.errors.rolIds)}
                    helperText={formik.touched.rolIds && formik.errors.rolIds}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button variant="contained" color="primary" type="submit" className="formulario-boton">
              {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioUsuario;