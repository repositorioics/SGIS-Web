import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomSelect from '@/components/comun/CustomSelect';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';
import '@/assets/styles/formularios.css';

const PaginaFormularioUsuario = ({ usuario, onChange, onSave, isEditing, formik, roles }) => {
  const { t } = useTranslation();

  return (
    <Box className="formulario-container">
      
      <CustomTypography variant="h4" className="formulario-titulo" mb={1}>
        {isEditing ? t('paginaFormularioUsuario.actualizarUsuario') : t('paginaFormularioUsuario.crearUsuario')}
      </CustomTypography>

      {/* Subtítulo descriptivo */}
      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        mb={3}
        textAlign="left"
      >
        {isEditing ? t('paginaFormularioUsuario.actualizarSubtitulo') : t('paginaFormularioUsuario.crearSubtitulo')}
      </CustomTypography>

      <form onSubmit={onSave}>
        <Grid container spacing={2} className="formulario-grid">
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label={t('paginaFormularioUsuario.nombre')}
              name="nombre"
              value={formik.values.nombre}
              onChange={onChange}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              label={t('paginaFormularioUsuario.apellido')}
              name="apellido"
              value={formik.values.apellido}
              onChange={onChange}
              error={formik.touched.apellido && Boolean(formik.errors.apellido)}
              helperText={formik.touched.apellido && formik.errors.apellido}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              label={t('paginaFormularioUsuario.usuario')}
              name="usuario"
              value={formik.values.usuario}
              onChange={onChange}
              error={formik.touched.usuario && Boolean(formik.errors.usuario)}
              helperText={formik.touched.usuario && formik.errors.usuario}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              label={t('paginaFormularioUsuario.correo')}
              name="correo"
              value={formik.values.correo}
              onChange={onChange}
              error={formik.touched.correo && Boolean(formik.errors.correo)}
              helperText={formik.touched.correo && formik.errors.correo}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              label={t('paginaFormularioUsuario.clave')}
              name="clave"
              type="password"
              value={formik.values.clave}
              onChange={onChange}
              error={formik.touched.clave && Boolean(formik.errors.clave)}
              helperText={formik.touched.clave && formik.errors.clave}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              label={t('paginaFormularioUsuario.confirmarClave')}
              name="confirmarClave"
              type="password"
              value={formik.values.confirmarClave}
              onChange={onChange}
              error={formik.touched.confirmarClave && Boolean(formik.errors.confirmarClave)}
              helperText={formik.touched.confirmarClave && formik.errors.confirmarClave}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomSelect
              label={t('paginaFormularioUsuario.roles')}
              name="rolIds"
              value={formik.values.rolIds}
              onChange={onChange}
              options={roles.map((rol) => ({ id: rol.id, nombre: rol.nombre }))}
              multiple={true}
              error={formik.touched.rolIds && formik.errors.rolIds}
              touched={formik.touched.rolIds}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="center">
          <CustomButton
            type="submit"
            label={isEditing ? t('paginaFormularioUsuario.botonActualizar') : t('paginaFormularioUsuario.botonCrear')}
          />
        </Box>
      </form>
    </Box>
  );
};

export default PaginaFormularioUsuario;