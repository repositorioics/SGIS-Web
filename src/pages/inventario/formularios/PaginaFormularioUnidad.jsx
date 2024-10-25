import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS
import { useTranslation } from 'react-i18next'; // Hook de traducción

const PaginaFormularioUnidad = ({ unidad, onChange, onSave, error, isEditing, formik }) => {
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
        {isEditing ? t('formularioUnidad.actualizarTitulo') : t('formularioUnidad.crearTitulo')}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        {isEditing ? t('formularioUnidad.actualizarSubtitulo') : t('formularioUnidad.crearSubtitulo')}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {t('formularioUnidad.errorCargar')}
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioUnidad.nombreLabel')}
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
                label={t('formularioUnidad.abreviaturaLabel')}
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
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="formulario-boton" // Aplicar clase CSS
            >
              {isEditing ? t('formularioUnidad.botonActualizar') : t('formularioUnidad.botonCrear')}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioUnidad;