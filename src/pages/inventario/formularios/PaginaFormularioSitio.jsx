import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/formularios.css';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomSelect from '@/components/comun/CustomSelect';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';

/**
 * PaginaFormularioSitio - Formulario para crear o actualizar un sitio.
 * 
 * @param {object} sitio - Datos actuales del sitio.
 * @param {function} onChange - Función para manejar los cambios en los campos del formulario.
 * @param {function} onSave - Función para manejar el envío del formulario.
 * @param {boolean} error - Indica si hay un error al cargar los datos.
 * @param {boolean} isEditing - Indica si el formulario está en modo de edición.
 * @param {object} formik - Objeto de Formik que maneja el estado y la validación del formulario.
 * @param {Array} usuarios - Lista de usuarios disponibles para seleccionar como contacto.
 * 
 * @returns {JSX.Element} Formulario de creación o edición de un sitio.
 */
const PaginaFormularioSitio = ({ sitio, onChange, onSave, error, isEditing, formik, usuarios }) => {
  const { t } = useTranslation();

  return (
    <Box className="formulario-container">
      {/* Título dinámico del formulario */}
      <CustomTypography
        component="h1"
        variant="h4"
        mb={1}
        className="formulario-titulo"
      >
        {isEditing ? t('formularioSitio.actualizarTitulo') : t('formularioSitio.crearTitulo')}
      </CustomTypography>

      {/* Subtítulo dinámico */}
      <CustomTypography
        variant="subtitle1"
        mb={3}
        className="formulario-subtitulo"
        color="textSecondary"
      >
        {isEditing ? t('formularioSitio.actualizarSubtitulo') : t('formularioSitio.crearSubtitulo')}
      </CustomTypography>

      {/* Mensaje de error si existe */}
      {error ? (
        <CustomTypography variant="h6" color="error" textAlign="center">
          {t('formularioSitio.errorCargar')}
        </CustomTypography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioSitio.nombreLabel')}
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>

            {/* Campo Abreviatura */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioSitio.abreviaturaLabel')}
                name="abreviatura"
                value={formik.values.abreviatura}
                onChange={onChange}
                error={formik.touched.abreviatura && Boolean(formik.errors.abreviatura)}
                helperText={formik.touched.abreviatura && formik.errors.abreviatura}
              />
            </Grid>

            {/* Campo Dirección */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioSitio.direccionLabel')}
                name="direccion"
                value={formik.values.direccion}
                onChange={onChange}
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion}
              />
            </Grid>

            {/* Campo Usuario de Contacto */}
            <Grid item xs={12} sm={6}>
              <CustomSelect
                label={t('formularioSitio.usuarioContactoLabel')}
                name="usuarioContactoId"
                value={formik.values.usuarioContactoId}
                onChange={onChange}
                options={usuarios.map(usuario => ({
                  id: usuario.id,
                  nombre: `${usuario.nombre} ${usuario.apellido} (${usuario.usuario})`,
                }))}
                error={formik.touched.usuarioContactoId && formik.errors.usuarioContactoId}
              />
            </Grid>
          </Grid>

          {/* Botón de envío */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CustomButton
              label={isEditing ? t('formularioSitio.botonActualizar') : t('formularioSitio.botonCrear')}
              type="submit"
            />
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioSitio;