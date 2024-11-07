import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/formularios.css';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';

/**
 * PaginaFormularioUnidad - Formulario para crear o actualizar una unidad.
 * 
 * @param {object} unidad - Datos actuales de la unidad.
 * @param {function} onChange - Función para manejar los cambios en los campos del formulario.
 * @param {function} onSave - Función para manejar el envío del formulario.
 * @param {boolean} error - Indica si hay un error al cargar los datos.
 * @param {boolean} isEditing - Indica si el formulario está en modo de edición.
 * @param {object} formik - Objeto de Formik que maneja el estado y la validación del formulario.
 * 
 * @returns {JSX.Element} Formulario de creación o edición de una unidad.
 */
const PaginaFormularioUnidad = ({ unidad, onChange, onSave, error, isEditing, formik }) => {
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
        {isEditing ? t('formularioUnidad.actualizarTitulo') : t('formularioUnidad.crearTitulo')}
      </CustomTypography>

      {/* Subtítulo dinámico */}
      <CustomTypography
        variant="subtitle1"
        mb={3}
        className="formulario-subtitulo"
        color="textSecondary"
      >
        {isEditing ? t('formularioUnidad.actualizarSubtitulo') : t('formularioUnidad.crearSubtitulo')}
      </CustomTypography>

      {/* Mensaje de error si existe */}
      {error ? (
        <CustomTypography variant="h6" color="error" textAlign="center">
          {t('formularioUnidad.errorCargar')}
        </CustomTypography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioUnidad.nombreLabel')}
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
                label={t('formularioUnidad.abreviaturaLabel')}
                name="abreviatura"
                value={formik.values.abreviatura}
                onChange={onChange}
                error={formik.touched.abreviatura && Boolean(formik.errors.abreviatura)}
                helperText={formik.touched.abreviatura && formik.errors.abreviatura}
              />
            </Grid>
          </Grid>

          {/* Botón de envío */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CustomButton
              label={isEditing ? t('formularioUnidad.botonActualizar') : t('formularioUnidad.botonCrear')}
              type="submit"
            />
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioUnidad;