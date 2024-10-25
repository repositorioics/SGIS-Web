import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Hook de traducción
import '@/assets/styles/formularios.css'; // Importar el archivo CSS

/**
 * Formulario para crear o actualizar una marca.
 */
const PaginaFormularioMarca = ({ marca, onChange, onSave, error, isEditing, formik }) => {
  const { t } = useTranslation(); // Usar el hook de traducción

  return (
    <Box className="formulario-container">
      {/* Título del formulario basado en si es edición o creación */}
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioMarca.actualizarTitulo') : t('formularioMarca.crearTitulo')}
      </Typography>

      {/* Subtítulo del formulario */}
      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        {isEditing ? t('formularioMarca.actualizarSubtitulo') : t('formularioMarca.crearSubtitulo')}
      </Typography>

      {/* Mensaje de error en caso de haber problemas al cargar los datos */}
      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {t('formularioMarca.errorCargar')}
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12}>
              <TextField
                label={t('formularioMarca.nombreLabel')}
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                fullWidth
                autoComplete="off"  
                margin="normal"
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                  autoComplete: 'off' // Desactivar autocompletado
                }}
              />
            </Grid>

            {/* Campo Descripción */}
            <Grid item xs={12}>
              <TextField
                label={t('formularioMarca.descripcionLabel')}
                name="descripcion"
                value={formik.values.descripcion}
                onChange={onChange}
                fullWidth
                autoComplete="off"  
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
                  autoComplete: 'off' // Desactivar autocompletado
                }}
              />
            </Grid>
          </Grid>

          {/* Botón de enviar para crear o actualizar la marca */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="formulario-boton" // Aplicar clase CSS
            >
              {isEditing ? t('formularioMarca.botonActualizar') : t('formularioMarca.botonCrear')}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioMarca;