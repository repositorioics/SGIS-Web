import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '@/assets/styles/formularios.css';
import { useTranslation } from 'react-i18next';

/**
 * Renderiza la página de formulario para crear o actualizar entregas.
 */
const PaginaFormularioEntrega = ({ entrega, onChange, onSave, error, isEditing, formik }) => {
  const { t } = useTranslation(); // Hook para las traducciones

  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioEntrega.actualizarTitulo') : t('formularioEntrega.crearTitulo')}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        {isEditing ? t('formularioEntrega.actualizarSubtitulo') : t('formularioEntrega.crearSubtitulo')}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {t('formularioEntrega.errorCargarDatos')}
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioEntrega.detalleRequisaId')}
                name="detalleRequisaId"
                type="number"
                value={formik.values.detalleRequisaId}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.detalleRequisaId && Boolean(formik.errors.detalleRequisaId)}
                helperText={formik.touched.detalleRequisaId && formik.errors.detalleRequisaId}
                InputLabelProps={{ sx: { color: 'text.secondary', fontSize: '16px' }, shrink: true }}
                InputProps={{ className: 'formulario-input' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioEntrega.cantidadPresentacionEntregada')}
                name="cantidadPresentacionEntregada"
                type="number"
                value={formik.values.cantidadPresentacionEntregada}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.cantidadPresentacionEntregada && Boolean(formik.errors.cantidadPresentacionEntregada)}
                helperText={formik.touched.cantidadPresentacionEntregada && formik.errors.cantidadPresentacionEntregada}
                InputLabelProps={{ sx: { color: 'text.secondary', fontSize: '16px' }, shrink: true }}
                InputProps={{ className: 'formulario-input' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioEntrega.recibidoPor')}
                name="recibidoPor"
                type="number"
                value={formik.values.recibidoPor}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.recibidoPor && Boolean(formik.errors.recibidoPor)}
                helperText={formik.touched.recibidoPor && formik.errors.recibidoPor}
                InputLabelProps={{ sx: { color: 'text.secondary', fontSize: '16px' }, shrink: true }}
                InputProps={{ className: 'formulario-input' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={t('formularioEntrega.observaciones')}
                name="observaciones"
                value={formik.values.observaciones}
                onChange={onChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
                InputLabelProps={{ sx: { color: 'text.secondary', fontSize: '16px' }, shrink: true }}
                InputProps={{ className: 'formulario-input' }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="formulario-boton"
            >
              {isEditing ? t('formularioEntrega.actualizarBoton') : t('formularioEntrega.crearBoton')}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioEntrega;