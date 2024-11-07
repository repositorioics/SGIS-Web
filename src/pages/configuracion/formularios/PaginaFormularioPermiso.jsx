import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';
import '@/assets/styles/formularios.css';

const PaginaFormularioPermiso = ({ permiso, onChange, onSave, error, isEditing, formik }) => {
  const { t } = useTranslation();

  return (
    <Box className="formulario-container">
      <CustomTypography variant="h4" className="formulario-titulo" mb={1}>
        {isEditing ? t('paginaFormularioPermiso.actualizarPermiso') : t('paginaFormularioPermiso.crearPermiso')}
      </CustomTypography>

       {/* Subtítulo descriptivo */}
       <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        mb={3}
        textAlign="left"
      >
        {isEditing ? t('paginaFormularioPermiso.actualizarSubtitulo') : t('paginaFormularioPermiso.crearSubtitulo')}
      </CustomTypography>

      {error && (
        <CustomTypography variant="h6" color="error" textAlign="center">
          {t('paginaFormularioPermiso.errorCargar')}
        </CustomTypography>
      )}

      {!error && (
        <form onSubmit={onSave}>
          <Grid container spacing={2} className="formulario-grid">
            {/* Campo para el nombre del permiso */}
            <Grid item xs={12}>
              <CustomTextField
                label={t('paginaFormularioPermiso.nombre')}
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>

            {/* Campo para la descripción del permiso */}
            <Grid item xs={12}>
              <CustomTextField
                label={t('paginaFormularioPermiso.descripcion')}
                name="descripcion"
                value={formik.values.descripcion}
                onChange={onChange}
                error={formik.touched.descripcion && formik.errors.descripcion}
                helperText={formik.touched.descripcion && formik.errors.descripcion}
              />
            </Grid>
          </Grid>

          {/* Botón para enviar el formulario */}
          <Box mt={3} display="flex" justifyContent="center">
            <CustomButton
              type="submit"
              label={isEditing ? t('paginaFormularioPermiso.botonActualizar') : t('paginaFormularioPermiso.botonCrear')}
            />
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioPermiso;