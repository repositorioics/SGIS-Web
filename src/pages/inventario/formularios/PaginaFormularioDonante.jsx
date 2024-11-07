import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/formularios.css';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';

/**
 * PaginaFormularioDonante - Formulario para crear o actualizar un donante
 * 
 * Muestra un formulario con campos para nombre, dirección, abreviatura e ID de contacto, 
 * adaptándose a los modos de creación y edición.
 * 
 * @param {object} donante - Datos del donante, si está en modo de edición.
 * @param {function} onChange - Función para manejar cambios en los campos del formulario.
 * @param {function} onSave - Función para manejar el envío del formulario.
 * @param {boolean} error - Indica si existe un error general al cargar datos.
 * @param {boolean} isEditing - Determina si el formulario está en modo edición.
 * @param {object} formik - Objeto de Formik para la gestión de los valores y validación de los campos.
 * 
 * @returns {JSX.Element} Formulario de donante con campos de texto y botón de envío.
 */
const PaginaFormularioDonante = ({ donante, onChange, onSave, error, isEditing, formik }) => {
  const { t } = useTranslation();

  return (
    <Box className="formulario-container">
      {/* Título del formulario */}
      <CustomTypography
        variant="h4"
        className="formulario-titulo"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioDonante.actualizarTitulo') : t('formularioDonante.crearTitulo')}
      </CustomTypography>

      {/* Subtítulo del formulario */}
      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        mb={3}
        textAlign="left"
      >
        {isEditing ? t('formularioDonante.actualizarSubtitulo') : t('formularioDonante.crearSubtitulo')}
      </CustomTypography>

      {error ? (
        <CustomTypography variant="h6" color="error" textAlign="center">
          {t('formularioDonante.errorCargar')}
        </CustomTypography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioDonante.nombreLabel')}
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>

            {/* Campo Dirección */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioDonante.direccionLabel')}
                name="direccion"
                value={formik.values.direccion}
                onChange={onChange}
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion}
              />
            </Grid>

            {/* Campo Abreviatura */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioDonante.abreviaturaLabel')}
                name="abreviatura"
                value={formik.values.abreviatura}
                onChange={onChange}
                error={formik.touched.abreviatura && Boolean(formik.errors.abreviatura)}
                helperText={formik.touched.abreviatura && formik.errors.abreviatura}
              />
            </Grid>

            {/* Campo ID de Contacto */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioDonante.contactoIdLabel')}
                name="contactoId"
                type="number"
                value={formik.values.contactoId}
                onChange={onChange}
                error={formik.touched.contactoId && Boolean(formik.errors.contactoId)}
                helperText={formik.touched.contactoId && formik.errors.contactoId}
              />
            </Grid>
          </Grid>

          {/* Botón de guardado */}
          <CustomButton
            label={isEditing ? t('formularioDonante.botonActualizar') : t('formularioDonante.botonCrear')}
          />
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioDonante;