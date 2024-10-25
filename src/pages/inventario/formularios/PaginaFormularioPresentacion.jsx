import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS
import { useTranslation } from 'react-i18next'; // Hook de traducción

const PaginaFormularioPresentacion = ({ presentacion, onChange, onSave, error, isEditing, formik }) => {
  const { t } = useTranslation(); // Usar hook de traducción

  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioPresentacion.actualizarTitulo') : t('formularioPresentacion.crearTitulo')}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        {isEditing ? t('formularioPresentacion.actualizarSubtitulo') : t('formularioPresentacion.crearSubtitulo')}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {t('formularioPresentacion.errorCargar')}
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioPresentacion.nombreLabel')}
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

            {/* Campo Descripción */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioPresentacion.descripcionLabel')}
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
                  autoComplete: 'off', // Desactivar autocompletado
                }}
              />
            </Grid>

            {/* Campo Unidades por Presentación */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioPresentacion.unidadesPresentacionLabel')}
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
              {isEditing ? t('formularioPresentacion.botonActualizar') : t('formularioPresentacion.botonCrear')}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioPresentacion;