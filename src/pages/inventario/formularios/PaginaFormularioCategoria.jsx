import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción

const PaginaFormularioCategoria = ({ categoria, onChange, onSave, error, isEditing, formik }) => {
  const { t } = useTranslation(); // Usar el hook de traducción

  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioCategoria.actualizarTitulo') : t('formularioCategoria.crearTitulo')}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        {isEditing ? t('formularioCategoria.actualizarSubtitulo') : t('formularioCategoria.crearSubtitulo')}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {t('formularioCategoria.errorCargar')}
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12}>
              <TextField
                label={t('formularioCategoria.nombreLabel')}
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                fullWidth
                margin="normal"
                autoComplete="off"  
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
                label={t('formularioCategoria.descripcionLabel')}
                name="descripcion"
                value={formik.values.descripcion}
                onChange={onChange}
                fullWidth
                margin="normal"
                rows={4}
                autoComplete="off"  
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
              {isEditing ? t('formularioCategoria.botonActualizar') : t('formularioCategoria.botonCrear')}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioCategoria;