import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS
import { useTranslation } from 'react-i18next'; // Hook de traducción

const PaginaFormularioSitio = ({ sitio, onChange, onSave, error, isEditing, formik, usuarios }) => {
  const { t } = useTranslation(); // Hook de traducción

  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioSitio.actualizarTitulo') : t('formularioSitio.crearTitulo')}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        {isEditing ? t('formularioSitio.actualizarSubtitulo') : t('formularioSitio.crearSubtitulo')}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {t('formularioSitio.errorCargar')}
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioSitio.nombreLabel')}
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
                  autoComplete: 'off', // Desactivar autocompletado
                }}
              />
            </Grid>

            {/* Campo Abreviatura */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioSitio.abreviaturaLabel')}
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
                  autoComplete: 'off', // Desactivar autocompletado
                }}
              />
            </Grid>

            {/* Campo Dirección */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioSitio.direccionLabel')}
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
                  autoComplete: 'off', // Desactivar autocompletado
                }}
              />
            </Grid>

            {/* Campo Usuario de Contacto */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>{t('formularioSitio.usuarioContactoLabel')}</InputLabel>
                <Select
                  name="usuarioContactoId"
                  value={formik.values.usuarioContactoId}
                  onChange={onChange}
                  error={formik.touched.usuarioContactoId && Boolean(formik.errors.usuarioContactoId)}
                  inputProps={{
                    className: 'formulario-input', // Aplicar clase CSS
                    autoComplete: 'off', // Desactivar autocompletado
                  }}
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
              {isEditing ? t('formularioSitio.botonActualizar') : t('formularioSitio.botonCrear')}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioSitio;