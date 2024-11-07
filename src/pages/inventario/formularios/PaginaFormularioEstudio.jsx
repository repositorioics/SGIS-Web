import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/formularios.css';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';

/**
 * PaginaFormularioEstudio - Formulario para crear o actualizar un estudio.
 * 
 * Proporciona campos para el nombre y la descripción del estudio, permitiendo manejar 
 * el formulario en modos de creación y edición.
 * 
 * @param {object} estudio - Datos del estudio, si está en modo de edición.
 * @param {function} onChange - Función para manejar cambios en los campos del formulario.
 * @param {function} onSave - Función para manejar el envío del formulario.
 * @param {boolean} error - Indica si hay un error general al cargar datos.
 * @param {boolean} isEditing - Determina si el formulario está en modo de edición.
 * @param {object} formik - Objeto de Formik para gestionar valores y validación de los campos.
 * 
 * @returns {JSX.Element} Formulario para gestionar datos del estudio.
 */
const PaginaFormularioEstudio = ({ estudio, onChange, onSave, error, isEditing, formik }) => {
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
        {isEditing ? t('formularioEstudio.actualizarTitulo') : t('formularioEstudio.crearTitulo')}
      </CustomTypography>

      {/* Subtítulo del formulario */}
      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        mb={3}
        textAlign="left"
      >
        {isEditing ? t('formularioEstudio.actualizarSubtitulo') : t('formularioEstudio.crearSubtitulo')}
      </CustomTypography>

      {error ? (
        <CustomTypography variant="h6" color="error" textAlign="center">
          {t('formularioEstudio.errorCargar')}
        </CustomTypography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2} className="formulario-grid">
            {/* Campo Nombre */}
            <Grid item xs={12}>
              <CustomTextField
                label={t('formularioEstudio.nombreLabel')}
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>

            {/* Campo Descripción */}
            <Grid item xs={12}>
              <CustomTextField
                label={t('formularioEstudio.descripcionLabel')}
                name="descripcion"
                value={formik.values.descripcion}
                onChange={onChange}
                error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                helperText={formik.touched.descripcion && formik.errors.descripcion}
              />
            </Grid>
          </Grid>

          {/* Botón de guardado */}
          <CustomButton
            label={isEditing ? t('formularioEstudio.botonActualizar') : t('formularioEstudio.botonCrear')}
          />
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioEstudio;