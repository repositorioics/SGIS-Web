import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '@/assets/styles/formularios.css'; // Importar el archivo CSS
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción

const PaginaFormularioEstudio = ({ estudio, onChange, onSave, error, isEditing, formik }) => {
  const { t } = useTranslation(); // Hook para manejar traducciones

  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioEstudio.actualizarTitulo') : t('formularioEstudio.crearTitulo')}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        {isEditing ? t('formularioEstudio.actualizarSubtitulo') : t('formularioEstudio.crearSubtitulo')}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {t('formularioEstudio.errorCargar')}
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12}>
              <TextField
                label={t('formularioEstudio.nombreLabel')}
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
                }}
              />
            </Grid>

            {/* Campo Descripción */}
            <Grid item xs={12}>
              <TextField
                label={t('formularioEstudio.descripcionLabel')}
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
              {isEditing ? t('formularioEstudio.botonActualizar') : t('formularioEstudio.botonCrear')}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioEstudio;