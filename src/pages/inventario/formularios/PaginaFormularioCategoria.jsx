import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/formularios.css';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';

/**
 * PaginaFormularioDistribuidor - Formulario para gestionar distribuidores
 * 
 * Este componente permite crear o actualizar un distribuidor, con campos específicos para su información.
 * 
 * @param {object} distribuidor - Datos del distribuidor a gestionar.
 * @param {function} onChange - Función para manejar cambios en los campos del formulario.
 * @param {function} onSave - Función para manejar el evento de envío del formulario.
 * @param {boolean} error - Indica si hay un error general en la carga de datos.
 * @param {boolean} isEditing - Determina si el formulario está en modo de edición (true) o creación (false).
 * @param {object} formik - Objeto formik que gestiona valores y validaciones de los campos.
 * 
 * @returns {JSX.Element} Formulario con campos para gestionar la información de un distribuidor.
 */
const PaginaFormularioDistribuidor = ({ distribuidor, onChange, onSave, error, isEditing, formik }) => {
  const { t } = useTranslation();

  return (
    <Box className="formulario-container">
      {/* Título del formulario, que se adapta al modo de operación */}
      <CustomTypography
        variant="h4"
        className="formulario-titulo"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioDistribuidor.actualizarTitulo') : t('formularioDistribuidor.crearTitulo')}
      </CustomTypography>

      {/* Subtítulo descriptivo */}
      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        mb={3}
        textAlign="left"
      >
        {isEditing ? t('formularioDistribuidor.actualizarSubtitulo') : t('formularioDistribuidor.crearSubtitulo')}
      </CustomTypography>

      {error ? (
        <CustomTypography variant="h6" color="error" textAlign="center">
          {t('formularioDistribuidor.errorCargar')}
        </CustomTypography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo para el nombre del distribuidor */}
            <Grid item xs={12}>
              <CustomTextField
                label={t('formularioDistribuidor.nombreLabel')}
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>

            {/* Campo para la descripción del distribuidor */}
            <Grid item xs={12}>
              <CustomTextField
                label={t('formularioDistribuidor.descripcionLabel')}
                name="descripcion"
                value={formik.values.descripcion}
                onChange={onChange}
                error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                helperText={formik.touched.descripcion && formik.errors.descripcion}
              />
            </Grid>
          </Grid>

          {/* Botón de acción para guardar el formulario */}
          <CustomButton
            label={isEditing ? t('formularioDistribuidor.botonActualizar') : t('formularioDistribuidor.botonCrear')}
          />
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioDistribuidor;