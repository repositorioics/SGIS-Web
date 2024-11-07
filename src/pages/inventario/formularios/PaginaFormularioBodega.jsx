import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/formularios.css';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomSelect from '@/components/comun/CustomSelect';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';

/**
 * PaginaFormularioBodega - Formulario de gestión de bodegas
 * 
 * Este componente renderiza un formulario para crear o editar una bodega.
 * 
 * @param {object} bodega - Datos de la bodega a gestionar.
 * @param {function} onChange - Función para manejar cambios en los campos del formulario.
 * @param {function} onSave - Función para manejar la acción de guardar el formulario.
 * @param {boolean} error - Indica si hay un error general en la carga de datos.
 * @param {boolean} isEditing - Define si el formulario se utiliza para editar (true) o crear (false).
 * @param {object} formik - Instancia de formik para manejar valores y validaciones.
 * @param {Array} sitios - Lista de sitios disponibles para seleccionar.
 * @param {Array} donantes - Lista de donantes disponibles para seleccionar.
 * 
 * @returns {JSX.Element} Formulario con campos para gestionar la información de una bodega.
 */
const PaginaFormularioBodega = ({ bodega, onChange, onSave, error, isEditing, formik, sitios, donantes }) => {
  const { t } = useTranslation();

  return (
    <Box className="formulario-container">
      {/* Título del formulario, dinámico según la acción (crear o actualizar) */}
      <CustomTypography
        variant="h4"
        className="formulario-titulo"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioBodega.actualizarTitulo') : t('formularioBodega.crearTitulo')}
      </CustomTypography>

      {/* Subtítulo del formulario */}
      <CustomTypography
        variant="subtitle1"
        color="textSecondary"
        className="formulario-subtitulo"
        mb={3}
        textAlign="left"
      >
        {isEditing ? t('formularioBodega.actualizarSubtitulo') : t('formularioBodega.crearSubtitulo')}
      </CustomTypography>

      {error ? (
        <CustomTypography variant="h6" color="error" textAlign="center">
          {t('formularioBodega.errorCargar')}
        </CustomTypography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo de texto para el nombre de la bodega */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioBodega.nombreLabel')}
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>

            {/* Campo de texto para la descripción de la bodega */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioBodega.descripcionLabel')}
                name="descripcion"
                value={formik.values.descripcion}
                onChange={onChange}
                error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                helperText={formik.touched.descripcion && formik.errors.descripcion}
              />
            </Grid>

            {/* Campo de texto para la dirección de la bodega */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label={t('formularioBodega.direccionLabel')}
                name="direccion"
                value={formik.values.direccion}
                onChange={onChange}
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion}
              />
            </Grid>

            {/* Selector de sitio asociado a la bodega */}
            <Grid item xs={12} sm={6}>
              <CustomSelect
                label={t('formularioBodega.sitioLabel')}
                name="sitioId"
                value={formik.values.sitioId || ''}
                onChange={onChange}
                options={sitios}
                error={formik.touched.sitioId && formik.errors.sitioId}
              />
            </Grid>

            {/* Selector de donante asociado a la bodega */}
            <Grid item xs={12} sm={6}>
              <CustomSelect
                label={t('formularioBodega.donanteLabel')}
                name="donanteId"
                value={formik.values.donanteId || ''}
                onChange={onChange}
                options={donantes}
                error={formik.touched.donanteId && formik.errors.donanteId}
              />
            </Grid>
          </Grid>

          {/* Botón para enviar el formulario, dinámico según la acción */}
          <CustomButton
            label={isEditing ? t('formularioBodega.botonActualizar') : t('formularioBodega.botonCrear')}
          />
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioBodega;