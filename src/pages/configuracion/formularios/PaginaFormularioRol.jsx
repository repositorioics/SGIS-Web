import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomSelect from '@/components/comun/CustomSelect';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';
import '@/assets/styles/formularios.css';

const PaginaFormularioRol = ({ rol, onChange, onSave, isEditing, formik, permisos }) => {
  const { t } = useTranslation();

  return (
    <Box className="formulario-container">
      
      <CustomTypography variant="h4" className="formulario-titulo" mb={1}>
        {isEditing ? t('paginaFormularioRol.actualizarRol') : t('paginaFormularioRol.crearRol')}
      </CustomTypography>

      {/* Subtítulo descriptivo */}
      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        mb={3}
        textAlign="left"
      >
        {isEditing ? t('paginaFormularioRol.actualizarSubtitulo') : t('paginaFormularioRol.crearSubtitulo')}
      </CustomTypography>

      <form onSubmit={onSave}>
        <Grid container spacing={2} className="formulario-grid">
          {/* Campo para el nombre del rol */}
          <Grid item xs={12}>
            <CustomTextField
              label={t('paginaFormularioRol.nombre')}
              name="nombre"
              value={formik.values.nombre}
              onChange={onChange}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />
          </Grid>

          {/* Campo para la descripción del rol */}
          <Grid item xs={12}>
            <CustomTextField
              label={t('paginaFormularioRol.descripcion')}
              name="descripcion"
              value={formik.values.descripcion}
              onChange={onChange}
              error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
              helperText={formik.touched.descripcion && formik.errors.descripcion}
            />
          </Grid>

          {/* Selector para los permisos asociados al rol */}
          <Grid item xs={12} sm={12}>
            <CustomSelect
              label={t('paginaFormularioRol.permisos')}
              name="permisoIds"
              value={formik.values.permisoIds}
              onChange={onChange}
              options={permisos.map((permiso) => ({ id: permiso.id, nombre: permiso.nombre }))}
              multiple={true}
              error={formik.touched.permisoIds && formik.errors.permisoIds}
              touched={formik.touched.permisoIds}
            />
          </Grid>
        </Grid>

        {/* Botón para enviar el formulario */}
        <Box mt={3} display="flex" justifyContent="center">
          <CustomButton
            type="submit"
            label={isEditing ? t('paginaFormularioRol.botonActualizar') : t('paginaFormularioRol.botonCrear')}
          />
        </Box>
      </form>
    </Box>
  );
};

export default PaginaFormularioRol;